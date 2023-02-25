<template><div><p><a href="https://www.samba.org/ftp/rsync/rsync.html" target="_blank" rel="noopener noreferrer">rsync 官方网站<ExternalLinkIcon/></a></p>
<!-- more -->
<h2 id="_1-说明" tabindex="-1"><a class="header-anchor" href="#_1-说明" aria-hidden="true">#</a> 1. 说明</h2>
<h3 id="_1-1-用处" tabindex="-1"><a class="header-anchor" href="#_1-1-用处" aria-hidden="true">#</a> 1.1 用处</h3>
<p>实现 <strong>本地主机</strong> 和 <strong>远程主机</strong> 上的 <strong>文件同步（推拉）</strong> 、<strong>本地不同路径的文件同步</strong>，涉及了 源文件 和 目标文件 的概念，还涉及了以哪边文件为同步基准</p>
<ul>
<li>
<p><strong>实现增量备份的工具：</strong> 配合任务计划，<strong>rsync</strong> 能实现定时或间隔同步，配合 <strong>inotify</strong> 或 <strong>sersync</strong>，可以实现触发式的 <strong>实时同步</strong></p>
</li>
<li>
<p><strong>实现同步 scp、cp、rm、ls -l 等功能（<em>不支持 远程 到 远程 的拷贝，但scp支持</em>）：</strong> 最终/原始目的是 <strong>实现两端主机的文件</strong> 同步</p>
<blockquote>
<p>实现 <strong>scp/cp/rm</strong> 等功能仅仅只是同步的辅助手段，实现基于复杂算法，平时使用其实现简单的备份、同步等功能足矣，可使用 <code v-pre>&quot;-vvvv&quot;</code> 分析执行过程</p>
</blockquote>
</li>
</ul>
<h3 id="_1-2-组成模式" tabindex="-1"><a class="header-anchor" href="#_1-2-组成模式" aria-hidden="true">#</a> 1.2 组成模式</h3>
<p>在同步过程中必然会涉及到源和目标两文件之间 <strong>版本控制问题：</strong></p>
<ul>
<li>是否要删除源主机上没有但目标上多出来的文件？</li>
<li>标文件比源文件更新（<em>newer than source</em>）时是否仍要保持同步？</li>
<li>遇到软链接时是 拷贝软链接本身 还是拷 贝软链接所指向的文件？</li>
<li>目标文件已存在时是否要先对其做个备份？</li>
</ul>
<p><strong>rsync同步过程中由两部分模式组成：以及文件同步时的同步模式。</strong></p>
<ol>
<li>
<p>决定哪些文件需要同步的 <strong>检查模式（<em>特殊需求，影响性能</em>）</strong></p>
<p>按照 <strong>指定规则</strong> 来检查哪些文件需要被同步，例如哪些文件是 <strong>明确被排除不传输的</strong> ，<strong>默认情况下，rsync使用&quot;quick check&quot;算法快速检查源文件和目标文件的大小、mtime（<em>修改时间</em>）是否一致，如果不一致则需要传输</strong></p>
<blockquote>
<p>也可以通过指定选项改变 <strong>quick check</strong> 的检查模式，如 <code v-pre>&quot;--size-only&quot;</code> 选项表示仅检查文件大小不同的文件作为待传输文件，检查模式的自定义性是非常有弹性</p>
</blockquote>
</li>
<li>
<p>文件同步时的 <strong>同步模式（<em>常见</em>）</strong></p>
<p>在文件确定要被同步后，在同步过程 <strong>发生之前要做哪些额外工作</strong>，如是否要先删除 源主机上没有 但 目标主机上有 的文件、是否要先备份 已存在的目标文件，是否要追踪链接文件等额外操作</p>
</li>
</ol>
<h3 id="_1-3-工作方式" tabindex="-1"><a class="header-anchor" href="#_1-3-工作方式" aria-hidden="true">#</a> 1.3 工作方式</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 本地同步（管道sh通信）</span>
Local:  <span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">..</span>.<span class="token punctuation">]</span> SRC<span class="token punctuation">..</span>. <span class="token punctuation">[</span>DEST<span class="token punctuation">]</span>

<span class="token comment"># 本地使用shell 和 远程主机通信（管道sh通信）</span>
Access via remote shell:
  Pull: <span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST:SRC<span class="token punctuation">..</span>. <span class="token punctuation">[</span>DEST<span class="token punctuation">]</span>
  Push: <span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">..</span>.<span class="token punctuation">]</span> SRC<span class="token punctuation">..</span>. <span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST:DEST

<span class="token comment"># 本地主机通过网络套接字 连接 远程主机上的rsync daemon（远程需 rsync 起端口）</span>
Access via <span class="token function">rsync</span> daemon:
  Pull: <span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST::SRC<span class="token punctuation">..</span>. <span class="token punctuation">[</span>DEST<span class="token punctuation">]</span>
        <span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">..</span>.<span class="token punctuation">]</span> rsync://<span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST<span class="token punctuation">[</span>:PORT<span class="token punctuation">]</span>/SRC<span class="token punctuation">..</span>. <span class="token punctuation">[</span>DEST<span class="token punctuation">]</span>
  Push: <span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">..</span>.<span class="token punctuation">]</span> SRC<span class="token punctuation">..</span>. <span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST::DEST
        <span class="token function">rsync</span> <span class="token punctuation">[</span>OPTION<span class="token punctuation">..</span>.<span class="token punctuation">]</span> SRC<span class="token punctuation">..</span>. rsync://<span class="token punctuation">[</span><span class="token environment constant">USER</span>@<span class="token punctuation">]</span>HOST<span class="token punctuation">[</span>:PORT<span class="token punctuation">]</span>/DEST
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个路径参数 <strong>一定是源文件路径</strong>，即作为同步基准的一方，可 <strong>指定多个</strong></p>
<p>最后一个路径参数 <strong>是目标文件路径</strong>，也就是被同步的，可本地、远程</p>
<p>若只有一个路径，等效于 <code v-pre>ls -l</code></p>
<h2 id="_2-基础使用" tabindex="-1"><a class="header-anchor" href="#_2-基础使用" aria-hidden="true">#</a> 2. 基础使用</h2>
<h3 id="_2-1-简单示例" tabindex="-1"><a class="header-anchor" href="#_2-1-简单示例" aria-hidden="true">#</a> 2.1 简单示例</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 在本地同步</span>
$ <span class="token function">rsync</span> <span class="token parameter variable">-r</span> /etc/fstab /tmp                

<span class="token comment"># 将本地/etc 目录 拷远程 /tmp 下，保远程 /tmp 和本地 /etc 同步</span>
$ <span class="token function">rsync</span> <span class="token parameter variable">-r</span> /etc <span class="token number">172.16</span>.10.5:/tmp       

<span class="token comment"># 将远程 /etc 目录 拷本地 /tmp 下，保本地 /tmp 和远程 /etc 同步</span>
$ <span class="token function">rsync</span> <span class="token parameter variable">-r</span> <span class="token number">172.16</span>.10.5:/etc /tmp       

<span class="token comment"># 列出 本地 /etc/ 目录下的文件列表</span>
$ <span class="token function">rsync</span> /etc/                          

<span class="token comment"># 列出 远程主机上 /tmp/ 目录下的文件列表</span>
$ <span class="token function">rsync</span> <span class="token number">172.16</span>.10.5:/tmp/              
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container info">
<p class="custom-container-title">关于尾斜线</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">rsync</span> <span class="token parameter variable">-a</span> /etc/ /tmp
$ <span class="token function">rsync</span> <span class="token parameter variable">-a</span> /etc /tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>不带尾斜线是包含整个目录，即 <strong>etc</strong> 本身</p>
<p>带尾斜线是只动 <strong>/etc</strong> 目录下的文件</p>
</div>
<h2 id="_2-2-选项说明" tabindex="-1"><a class="header-anchor" href="#_2-2-选项说明" aria-hidden="true">#</a> 2.2 选项说明</h2>
<p><a href="https://www.cnblogs.com/f-ck-need-u/p/7221713.html" target="_blank" rel="noopener noreferrer">翻译手册<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>-v：显示rsync过程中详细信息。可以使用<span class="token string">"-vvvv"</span>获取更详细信息。
-P：显示文件传输的进度信息。<span class="token punctuation">(</span>实际上<span class="token string">"-P"</span><span class="token operator">=</span><span class="token string">"--partial --progress"</span>，其中的<span class="token string">"--progress"</span>才是显示进度信息的<span class="token punctuation">)</span>。
<span class="token parameter variable">-n</span> --dry-run  ：仅测试传输，而不实际传输。常和<span class="token string">"-vvvv"</span>配合使用来查看rsync是如何工作的。
<span class="token parameter variable">-a</span> <span class="token parameter variable">--archive</span>  ：归档模式，表示递归传输并保持文件属性。等同于<span class="token string">"-rtopgDl"</span>。
<span class="token parameter variable">-r</span> --recursive：递归到目录中去。
<span class="token parameter variable">-t</span> --times：保持mtime属性。
<span class="token parameter variable">-o</span> --owner：保持owner属性<span class="token punctuation">(</span>属主<span class="token punctuation">)</span>。
<span class="token parameter variable">-g</span> --group：保持group属性<span class="token punctuation">(</span>属组<span class="token punctuation">)</span>。
<span class="token parameter variable">-p</span> --perms：保持perms属性<span class="token punctuation">(</span>权限，不包括特殊权限<span class="token punctuation">)</span>。
<span class="token parameter variable">-D</span>        ：是<span class="token string">"--device --specials"</span>选项的组合，即也拷贝设备文件和特殊文件。
<span class="token parameter variable">-l</span> --links：如果文件是软链接文件，则拷贝软链接本身而非软链接所指向的对象。
<span class="token parameter variable">-z</span>        ：传输时进行压缩提高效率。
<span class="token parameter variable">-R</span> --relative：使用相对路径。意味着将命令行中指定的全路径而非路径最尾部的文件名发送给服务端，包括它们的属性。用法见下文示例。
--size-only ：默认算法是检查文件大小和mtime不同的文件，使用此选项将只检查文件大小。
<span class="token parameter variable">-u</span> <span class="token parameter variable">--update</span> ：仅在源mtime比目标已存在文件的mtime新时才拷贝。注意，该选项是接收端判断的，不会影响删除行为。
<span class="token parameter variable">-d</span> <span class="token parameter variable">--dirs</span>   ：以不递归的方式拷贝目录本身。默认递归时，如果源为<span class="token string">"dir1/file1"</span>，则不会拷贝dir1目录，使用该选项将拷贝dir1但不拷贝file1。
--max-size  ：限制rsync传输的最大文件大小。可以使用单位后缀，还可以是一个小数值<span class="token punctuation">(</span>例如：<span class="token string">"--max-size=1.5m"</span><span class="token punctuation">)</span>
--min-size  ：限制rsync传输的最小文件大小。这可以用于禁止传输小文件或那些垃圾文件。
<span class="token parameter variable">--exclude</span>   ：指定排除规则来排除不需要传输的文件。
<span class="token parameter variable">--delete</span>    ：以SRC为主，对DEST进行同步。多则删之，少则补之。注意<span class="token string">"--delete"</span>是在接收端执行的，所以它是在
            ：exclude/include规则生效之后才执行的。
<span class="token parameter variable">-b</span> <span class="token parameter variable">--backup</span> ：对目标上已存在的文件做一个备份，备份的文件名后默认使用<span class="token string">"~"</span>做后缀。
--backup-dir：指定备份文件的保存路径。不指定时默认和待备份文件保存在同一目录下。
<span class="token parameter variable">-e</span>          ：指定所要使用的远程shell程序，默认为ssh。
<span class="token parameter variable">--port</span>      ：连接daemon时使用的端口号，默认为873端口。
--password-file：daemon模式时的密码文件，可以从中读取密码实现非交互式。注意，这不是远程shell认证的密码，而是rsync模块认证的密码。
<span class="token parameter variable">-W</span> --whole-file：rsync将不再使用增量传输，而是全量传输。在网络带宽高于磁盘带宽时，该选项比增量传输更高效。
<span class="token parameter variable">--existing</span>  ：要求只更新目标端已存在的文件，目标端还不存在的文件不传输。注意，使用相对路径时如果上层目录不存在也不会传输。
--ignore-existing：要求只更新目标端不存在的文件。和<span class="token string">"--existing"</span>结合使用有特殊功能，见下文示例。
--remove-source-files：要求删除源端已经成功传输的文件。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最常用的选项组合是 <code v-pre>&quot;avz&quot;</code>，即压缩和显示部分信息，并以归档模式传输</p>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p>强烈建议任何时候都加上<code v-pre>&quot;-t&quot;</code>，否则目标文件 <strong>mtime</strong> 会设置为系统时间，导致下次更新检查出 **mtime ** 不同从而导致增量传输无效</p>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">BASE_ISO_PATH</span><span class="token operator">=</span><span class="token string">"/media/cdrom"</span>
<span class="token assign-left variable">ISO_BUILD_PATH</span><span class="token operator">=</span><span class="token string">"/tmp/iso-build"</span>

<span class="token comment"># 以 /media/cdrom 为源，增量（更新）同步到 /tmp/iso-build 下，用归档模式传输</span>
$ <span class="token function">rsync</span> <span class="token parameter variable">-au</span> <span class="token parameter variable">--exclude</span><span class="token operator">=</span>repodata <span class="token parameter variable">--exclude</span><span class="token operator">=</span>Packages <span class="token string">"<span class="token variable">${BASE_ISO_PATH}</span>/"</span> <span class="token string">"<span class="token variable">${ISO_BUILD_PATH}</span>"</span>

<span class="token comment"># 同步 并 清空无效的 release 文件</span>
$ <span class="token function">rsync</span> <span class="token parameter variable">-au</span> <span class="token parameter variable">--delete</span> <span class="token string">"release"</span> <span class="token string">"<span class="token variable">${ISO_BUILD_PATH}</span>"</span> 

<span class="token comment"># 将 /var/log/anaconda 下的文件为源，备份到 /tmp 目录下</span>
$ <span class="token function">rsync</span> <span class="token parameter variable">-R</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">--backup</span> /var/log/anaconda /tmp
`若不使用 <span class="token string">"--suffix"</span> 指定后缀，备份文件默认使用 <span class="token string">"~"</span> 做后缀

<span class="token comment"># 可以使用 "--backup-dir" 指定备份文件保存路径，但要求保存路径必须存在</span>
$ <span class="token function">mkdir</span> /tmp/log_back
$ <span class="token function">rsync</span> <span class="token parameter variable">-R</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">--backup</span> --backup-dir<span class="token operator">=</span>/tmp/log_back /var/log/anaconda /tmp
$ tree /tmp/log_back/
    /tmp/log_back/
    └── log
        └── anaconda
            ├── anaconda.log
            ├── ifcfg.log
            ├── journal.log
            ├── ks-script-1uLekR.log
            ├── ks-script-iGpl4q.log
            ├── packaging.log
            ├── program.log
            ├── storage.log
            └── syslog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


