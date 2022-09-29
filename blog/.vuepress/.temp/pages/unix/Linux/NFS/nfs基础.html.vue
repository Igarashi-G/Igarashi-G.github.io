<template><div><h1 id="nfs" tabindex="-1"><a class="header-anchor" href="#nfs" aria-hidden="true">#</a> NFS</h1>
<h3 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h3>
<h3 id="_2-配置" tabindex="-1"><a class="header-anchor" href="#_2-配置" aria-hidden="true">#</a> 2. 配置</h3>
<h4 id="_2-1-软件配置" tabindex="-1"><a class="header-anchor" href="#_2-1-软件配置" aria-hidden="true">#</a> 2.1 软件配置</h4>
<h4 id="_2-2-共享配置" tabindex="-1"><a class="header-anchor" href="#_2-2-共享配置" aria-hidden="true">#</a> 2.2 共享配置</h4>
<h3 id="_3-使用及说明" tabindex="-1"><a class="header-anchor" href="#_3-使用及说明" aria-hidden="true">#</a> 3. 使用及说明</h3>
<h4 id="_3-1-exportfs-工具" tabindex="-1"><a class="header-anchor" href="#_3-1-exportfs-工具" aria-hidden="true">#</a> 3.1 exportfs 工具</h4>
<p><strong>语法格式</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>exportfs <span class="token punctuation">[</span>必要参数<span class="token punctuation">]</span> <span class="token punctuation">[</span>选择参数<span class="token punctuation">]</span> <span class="token punctuation">[</span>目录<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>功能描述</strong></p>
<p><a href="https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/8/html/managing_file_systems/the-exportfs-utility_exporting-nfs-shares" target="_blank" rel="noopener noreferrer">exportfs 命令<ExternalLinkIcon/></a> ：可以在不直接编辑 <code v-pre>/etc/exports</code> 文件的情况下，使 <code v-pre>root</code> 用户能够有选择的导出或取消导出目录，而无需重启服务</p>
<ul>
<li><code v-pre>exportfs</code> 会将导出的文件系统写到 <code v-pre>/var/lib/nfs/xtab</code></li>
<li><code v-pre>nfs-mountd</code> 服务在决定访问文件系统的特权时，会参考 <code v-pre>xtab</code> 文件，因此对导出的文件系统列表的更改，会立即生效</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># reload 导出</span>
$ exportfs <span class="token parameter variable">-rv</span>  <span class="token operator">||</span>  <span class="token parameter variable">-arv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-2-发现-nfs-导出" tabindex="-1"><a class="header-anchor" href="#_3-2-发现-nfs-导出" aria-hidden="true">#</a> 3.2 发现 NFS 导出</h4>
<ul>
<li>
<p>对于支持 <strong>NFSv3</strong> 的任何服务器，请使用 <code v-pre>showmount</code> 工具</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ showmount <span class="token parameter variable">-e</span> <span class="token number">172.16</span>.120.141
<span class="token comment"># Export list for 172.16.120.141:</span>
<span class="token comment"># /exports/zz              *</span>
<span class="token comment"># /share/Users/grpc-master *</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>对于支持 <strong>NFSv4</strong> 的任何服务器，挂载根目录并查找</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">mount</span> <span class="token number">172.16</span>.120.141:/share /mnt/zz
$ <span class="token function">ls</span> /mnt/zz
<span class="token comment"># exports</span>

<span class="token variable">$ls</span> /mnt/zz/exports/
<span class="token comment"># foo</span>
<span class="token comment"># bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_3-3-挂载" tabindex="-1"><a class="header-anchor" href="#_3-3-挂载" aria-hidden="true">#</a> 3.3 挂载</h4>
<p>请使用如下形式的命令去挂载：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">mount</span> <span class="token parameter variable">-t</span> nfs <span class="token parameter variable">-o</span> options host:/remote/export /local/directory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>通过 <code v-pre>ip</code> 挂载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># v3版本</span>
$ mount.nfs <span class="token parameter variable">-vvv</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">vers</span><span class="token operator">=</span><span class="token number">3</span> <span class="token number">172.16</span>.120.141:/share/Users/zz /home/zz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>通过 <strong>域名</strong> 挂载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># v4版本</span>
$ mount.nfs <span class="token parameter variable">-vvv</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">vers</span><span class="token operator">=</span><span class="token number">4</span> nas.local:/share/zz /home/zz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><a href="https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/8/html/managing_file_systems/common-nfs-mount-options_mounting-nfs-shares" target="_blank" rel="noopener noreferrer">常用挂载选项<ExternalLinkIcon/></a></p>
<h4 id="_3-4-卸载" tabindex="-1"><a class="header-anchor" href="#_3-4-卸载" aria-hidden="true">#</a> 3.4 卸载</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">umount</span> /home/zz

<span class="token comment"># 若提示 umount.nfs4: /home/zz: device is busy</span>

<span class="token comment"># 执行如下命令，强制卸载</span>
$ <span class="token function">umount</span> <span class="token parameter variable">-fl</span> /home/zz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-获取挂载-nfs-客户端" tabindex="-1"><a class="header-anchor" href="#_3-5-获取挂载-nfs-客户端" aria-hidden="true">#</a> 3.5 获取挂载 <code v-pre>nfs</code> 客户端:</h4>
<blockquote>
<p>查询默认服务端口 <code v-pre>cat /etc/services| grep nfs</code></p>
</blockquote>
<ul>
<li>
<p>命令快速查: （<em>不一定好用</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ss <span class="token operator">|</span> <span class="token function">grep</span> :nfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用 <strong>python</strong>:</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> psutil

<span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string">"laddr"</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>net<span class="token punctuation">.</span>laddr<span class="token punctuation">.</span>ip<span class="token punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">{</span>net<span class="token punctuation">.</span>laddr<span class="token punctuation">.</span>port<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span>
        <span class="token string">"raddr"</span><span class="token punctuation">:</span> <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>net<span class="token punctuation">.</span>raddr<span class="token punctuation">.</span>ip<span class="token punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">{</span>net<span class="token punctuation">.</span>raddr<span class="token punctuation">.</span>port<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">}</span>
    <span class="token keyword">for</span> net <span class="token keyword">in</span> psutil<span class="token punctuation">.</span>net_connections<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> net<span class="token punctuation">.</span>laddr<span class="token punctuation">.</span>port <span class="token operator">==</span> <span class="token number">2049</span> <span class="token keyword">and</span>
    <span class="token builtin">isinstance</span><span class="token punctuation">(</span>net<span class="token punctuation">.</span>laddr<span class="token punctuation">,</span> psutil<span class="token punctuation">.</span>_common<span class="token punctuation">.</span>addr<span class="token punctuation">)</span> <span class="token keyword">and</span>
    <span class="token builtin">isinstance</span><span class="token punctuation">(</span>net<span class="token punctuation">.</span>raddr<span class="token punctuation">,</span> psutil<span class="token punctuation">.</span>_common<span class="token punctuation">.</span>addr<span class="token punctuation">)</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_4-v4-无法直接挂载问题" tabindex="-1"><a class="header-anchor" href="#_4-v4-无法直接挂载问题" aria-hidden="true">#</a> 4. V4 无法直接挂载问题</h3>
<p>由于 <code v-pre>v4</code> 的挂载和 <code v-pre>v3</code> 不同，要先导出根目录，才能挂子目录</p>
<p>若希望无需导出根目录，实现用户通过 <code v-pre>v4</code> 可自由挂载子目录，其解决办法如下：</p>
<Alert type="info"> 针对 `NFSv4` 版本 `Linux` 客户端二次共享: <Badge type="error">fsid</Badge> + <Badge type="info">bind</Badge></Alert><p>使用 <code v-pre>--bind</code> 建立挂载链接</p>
<p><a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/5/html/deployment_guide/s1-nfs-server-config-exports" target="_blank" rel="noopener noreferrer">参考<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 若用户需要挂载 /share/Users/zz 这个子目录:</span>
<span class="token function">mkdir</span> /exports/nfs/Users/zz

<span class="token comment"># 使用 bind 创建绑定</span>
<span class="token function">mount</span> <span class="token parameter variable">--bind</span> /share/Users/zz /exports/nfs/Users/zz

<span class="token comment"># /etc/exports 文件中添加导出，如：</span>
/exports/nfs/Users/zz		*<span class="token punctuation">(</span>fsid<span class="token operator">=</span><span class="token number">17</span>,async,root_squash,no_all_squash,anonuid<span class="token operator">=</span><span class="token number">65534</span>,anongid<span class="token operator">=</span><span class="token number">65534</span>,rw<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注意：</strong></p>
<ul>
<li>貌似也需要先导出对应的子目录，才能挂载 <code v-pre>bind</code> 目录</li>
<li><code v-pre>fsid</code> 若一致，有无影响，有参考说会影响高可用、或出现不同目录 但同一个挂载的问题</li>
<li>用此方式，会增加开机自动挂载等流程的复杂度</li>
</ul>
</blockquote>
</div></template>


