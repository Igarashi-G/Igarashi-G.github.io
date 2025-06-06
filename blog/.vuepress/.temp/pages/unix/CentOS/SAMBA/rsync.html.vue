<template><div><p><a href="https://www.samba.org/ftp/rsync/rsync.html" target="_blank" rel="noopener noreferrer">rsync 官方网站</a></p>
<!-- more -->
<h2 id="_1-说明" tabindex="-1"><a class="header-anchor" href="#_1-说明"><span>1. 说明</span></a></h2>
<h3 id="_1-1-用处" tabindex="-1"><a class="header-anchor" href="#_1-1-用处"><span>1.1 用处</span></a></h3>
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
<h3 id="_1-2-组成模式" tabindex="-1"><a class="header-anchor" href="#_1-2-组成模式"><span>1.2 组成模式</span></a></h3>
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
<h3 id="_1-3-工作方式" tabindex="-1"><a class="header-anchor" href="#_1-3-工作方式"><span>1.3 工作方式</span></a></h3>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 本地同步（管道sh通信）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Local:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  rsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [OPTION...] SRC... [DEST]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 本地使用shell 和 远程主机通信（管道sh通信）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Access</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> via</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> remote</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> shell:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  Pull:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [OPTION...] [USER@]HOST:SRC... [DEST]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  Push:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [OPTION...] SRC... [USER@]HOST:DEST</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 本地主机通过网络套接字 连接 远程主机上的rsync daemon（远程需 rsync 起端口）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Access</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> via</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> daemon:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  Pull:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [OPTION...] [USER@]HOST::SRC... [DEST]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        rsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [OPTION...] rsync://[USER@]HOST[:PORT]/SRC... [DEST]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  Push:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [OPTION...] SRC... [USER@]HOST::DEST</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        rsync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [OPTION...] SRC... rsync://[USER@]HOST[:PORT]/DEST</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个路径参数 <strong>一定是源文件路径</strong>，即作为同步基准的一方，可 <strong>指定多个</strong></p>
<p>最后一个路径参数 <strong>是目标文件路径</strong>，也就是被同步的，可本地、远程</p>
<p>若只有一个路径，等效于 <code v-pre>ls -l</code></p>
<h2 id="_2-基础使用" tabindex="-1"><a class="header-anchor" href="#_2-基础使用"><span>2. 基础使用</span></a></h2>
<h3 id="_2-1-简单示例" tabindex="-1"><a class="header-anchor" href="#_2-1-简单示例"><span>2.1 简单示例</span></a></h3>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 在本地同步</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/fstab</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 将本地/etc 目录 拷远程 /tmp 下，保远程 /tmp 和本地 /etc 同步</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.10.5:/tmp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 将远程 /etc 目录 拷本地 /tmp 下，保本地 /tmp 和远程 /etc 同步</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.10.5:/etc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 列出 本地 /etc/ 目录下的文件列表</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                          </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 列出 远程主机上 /tmp/ 目录下的文件列表</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.10.5:/tmp/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">关于尾斜线</p>
<div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>不带尾斜线是包含整个目录，即 <strong>etc</strong> 本身</p>
<p>带尾斜线是只动 <strong>/etc</strong> 目录下的文件</p>
</div>
<h2 id="_2-2-选项说明" tabindex="-1"><a class="header-anchor" href="#_2-2-选项说明"><span>2.2 选项说明</span></a></h2>
<p><a href="https://www.cnblogs.com/f-ck-need-u/p/7221713.html" target="_blank" rel="noopener noreferrer">翻译手册</a></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-v：显示rsync过程中详细信息。可以使用</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"-vvvv"</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">获取更详细信息。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-P：显示文件传输的进度信息。(实际上</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"-P"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"--partial --progress"</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">，其中的</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"--progress"</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">才是显示进度信息的</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-n</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --dry-run</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  ：仅测试传输，而不实际传输。常和"-vvvv"配合使用来查看rsync是如何工作的。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-a</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --archive</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  ：归档模式，表示递归传输并保持文件属性。等同于"-rtopgDl"。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-r</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --recursive：递归到目录中去。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-t</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --times：保持mtime属性。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-o</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --owner：保持owner属性(属主</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-g</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --group：保持group属性(属组</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-p</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --perms：保持perms属性(权限，不包括特殊权限</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        ：是"--device --specials"选项的组合，即也拷贝设备文件和特殊文件。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-l</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --links：如果文件是软链接文件，则拷贝软链接本身而非软链接所指向的对象。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-z</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        ：传输时进行压缩提高效率。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-R</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --relative：使用相对路径。意味着将命令行中指定的全路径而非路径最尾部的文件名发送给服务端，包括它们的属性。用法见下文示例。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--size-only</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ：默认算法是检查文件大小和mtime不同的文件，使用此选项将只检查文件大小。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-u</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --update</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ：仅在源mtime比目标已存在文件的mtime新时才拷贝。注意，该选项是接收端判断的，不会影响删除行为。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-d</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --dirs</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">   ：以不递归的方式拷贝目录本身。默认递归时，如果源为"dir1/file1"，则不会拷贝dir1目录，使用该选项将拷贝dir1但不拷贝file1。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--max-size</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  ：限制rsync传输的最大文件大小。可以使用单位后缀，还可以是一个小数值</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">例如：</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"--max-size=1.5m"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--min-size</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  ：限制rsync传输的最小文件大小。这可以用于禁止传输小文件或那些垃圾文件。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--exclude</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">   ：指定排除规则来排除不需要传输的文件。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--delete</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    ：以SRC为主，对DEST进行同步。多则删之，少则补之。注意"--delete"是在接收端执行的，所以它是在</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            ：exclude/include规则生效之后才执行的。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-b</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --backup</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ：对目标上已存在的文件做一个备份，备份的文件名后默认使用"~"做后缀。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--backup-dir：指定备份文件的保存路径。不指定时默认和待备份文件保存在同一目录下。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-e</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">          ：指定所要使用的远程shell程序，默认为ssh。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--port</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">      ：连接daemon时使用的端口号，默认为873端口。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--password-file：daemon模式时的密码文件，可以从中读取密码实现非交互式。注意，这不是远程shell认证的密码，而是rsync模块认证的密码。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-W</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --whole-file：rsync将不再使用增量传输，而是全量传输。在网络带宽高于磁盘带宽时，该选项比增量传输更高效。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--existing</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  ：要求只更新目标端已存在的文件，目标端还不存在的文件不传输。注意，使用相对路径时如果上层目录不存在也不会传输。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--ignore-existing：要求只更新目标端不存在的文件。和</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"--existing"</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">结合使用有特殊功能，见下文示例。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">--remove-source-files：要求删除源端已经成功传输的文件。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最常用的选项组合是 <code v-pre>&quot;avz&quot;</code>，即压缩和显示部分信息，并以归档模式传输</p>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>强烈建议任何时候都加上<code v-pre>&quot;-t&quot;</code>，否则目标文件 <strong>mtime</strong> 会设置为系统时间，导致下次更新检查出 **mtime ** 不同从而导致增量传输无效</p>
</div>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BASE_ISO_PATH</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/media/cdrom"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ISO_BUILD_PATH</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"/tmp/iso-build"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 以 /media/cdrom 为源，增量（更新）同步到 /tmp/iso-build 下，用归档模式传输</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -au</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --exclude=repodata</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --exclude=Packages</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BASE_ISO_PATH</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ISO_BUILD_PATH</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 同步 并 清空无效的 release 文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -au</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --delete</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "release"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ISO_BUILD_PATH</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 将 /var/log/anaconda 下的文件为源，备份到 /tmp 目录下</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -R</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --backup</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/log/anaconda</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">若不使用</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "--suffix" 指定后缀，备份文件默认使用 "~" 做后缀</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 可以使用 "--backup-dir" 指定备份文件保存路径，但要求保存路径必须存在</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mkdir /tmp/log_back</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rsync </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">-R</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --backup</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --backup-dir=/tmp/log_back</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/log/anaconda /tmp</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tree /tmp/log_back/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    /tmp/log_back/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    └──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> log</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        └──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> anaconda</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            ├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> anaconda.log</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            ├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ifcfg.log</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            ├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> journal.log</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            ├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ks-script-1uLekR.log</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            ├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ks-script-iGpl4q.log</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            ├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> packaging.log</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            ├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> program.log</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            ├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> storage.log</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            └──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> syslog</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


