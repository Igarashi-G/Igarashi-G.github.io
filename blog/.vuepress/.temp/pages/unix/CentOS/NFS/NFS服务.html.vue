<template><div><p><strong>NFS</strong> 服务基础</p>
<!-- more -->
<h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介"><span>1. 简介</span></a></h2>
<h2 id="_2-安装及配置" tabindex="-1"><a class="header-anchor" href="#_2-安装及配置"><span>2. 安装及配置</span></a></h2>
<h3 id="_2-1-安装nfs客户端" tabindex="-1"><a class="header-anchor" href="#_2-1-安装nfs客户端"><span>2.1 安装NFS客户端</span></a></h3>
<p>通过 <strong>yum</strong> 或者 <strong>apt</strong> 工具安装 <strong>nfs</strong> 客户端软件包</p>
<Tabs id="16" :data='[{"id":"CentOS 7.x"},{"id":"Ubuntu 20.04 / Debian 11.x"},{"id":"openSUSE-Leap-15.x"}]'>
<template #title0="{ value, isActive }">CentOS 7.x</template>
<template #title1="{ value, isActive }">Ubuntu 20.04 / Debian 11.x</template>
<template #title2="{ value, isActive }">openSUSE-Leap-15.x</template>
<template #tab0="{ value, isActive }">
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nfs-utils</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nfs-common</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> zypper</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nfs-utils</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="_2-2-基本配置" tabindex="-1"><a class="header-anchor" href="#_2-2-基本配置"><span>2.2 基本配置</span></a></h3>
<p><strong>软件配置：</strong></p>
<p><strong>导出配置:</strong> <a href="https://insights-core.readthedocs.io/en/latest/shared_parsers_catalog/nfs_exports.html#insights.parsers.nfs_exports.NFSExportsBase" target="_blank" rel="noopener noreferrer">NFS Export Config</a></p>
<h2 id="_3-使用及说明" tabindex="-1"><a class="header-anchor" href="#_3-使用及说明"><span>3. 使用及说明</span></a></h2>
<h3 id="_3-1-exportfs-工具" tabindex="-1"><a class="header-anchor" href="#_3-1-exportfs-工具"><span>3.1 exportfs 工具</span></a></h3>
<p><strong>语法格式</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">exportfs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [必要参数] [选择参数] [目录]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>功能描述</strong></p>
<p><a href="https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/8/html/managing_file_systems/the-exportfs-utility_exporting-nfs-shares" target="_blank" rel="noopener noreferrer">exportfs 命令</a> ：可以在不直接编辑 <code v-pre>/etc/exports</code> 文件的情况下，使 <code v-pre>root</code> 用户能够有选择的导出或取消导出目录，而无需重启服务</p>
<ul>
<li><code v-pre>exportfs</code> 会将导出的文件系统写到 <code v-pre>/var/lib/nfs/xtab</code></li>
<li><code v-pre>nfs-mountd</code> 服务在决定访问文件系统的特权时，会参考 <code v-pre>xtab</code> 文件，因此对导出的文件系统列表的更改，会立即生效</li>
</ul>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># reload 导出</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> exportfs</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -rv</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ||  </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-arv</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-发现-nfs-导出" tabindex="-1"><a class="header-anchor" href="#_3-2-发现-nfs-导出"><span>3.2 发现 NFS 导出</span></a></h3>
<ul>
<li>
<p>对于支持 <strong>NFSv3</strong> 的任何服务器，请使用 <code v-pre>showmount</code> 工具</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> showmount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -e</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 172.16.120.141</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Export list for 172.16.120.141:</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># /exports/zz              *</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># /share/Users/grpc-master *</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>对于支持 <strong>NFSv4</strong> 的任何服务器，挂载根目录并查找</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mount</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.141:/share</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /mnt/zz</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ls</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /mnt/zz</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># exports</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$ls</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /mnt/zz/exports/</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># foo</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># bar</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-3-挂载-nfs-文件系统" tabindex="-1"><a class="header-anchor" href="#_3-3-挂载-nfs-文件系统"><span>3.3 挂载 NFS 文件系统</span></a></h3>
<p>其挂载形式命令如下</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nfs</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> options</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> host:/remote/export</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /local/directory</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h5 id="nfs-v3" tabindex="-1"><a class="header-anchor" href="#nfs-v3"><span><strong>NFS v3</strong></span></a></h5>
<p>使用 <strong>NFS v3</strong> 协议挂载文件系统</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># v3版本通过简易 IP 挂载</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mount.nfs</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -vvv</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vers=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.141:/share/Users/zz</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/zz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nfs</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -vvv</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vers=3,nolock,noacl,proto=tcp,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nas.uds.local:/share</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /mnt/nfs</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="nfs-v4" tabindex="-1"><a class="header-anchor" href="#nfs-v4"><span><strong>NFS v4</strong></span></a></h5>
<p>使用 <strong>NFS v4</strong> 协议挂载文件系统</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># v4 版本通过简易 域名 挂载</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mount.nfs</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -vvv</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vers=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nas.local:/share/zz</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/zz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nfs</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -vvv</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vers=4,minorversion=0,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nas.uds.local:/share</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /mnt/nfs</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重要参数：</strong></p>
<ul>
<li><span style="color: blue"><strong>nas.uds.local:/share /mnt/nfs：</strong></span>  表示 <mark><em>&lt;挂载地址&gt;：&lt;NAS文件系统目录&gt; &lt;当前服务器上待挂载的本地路径&gt;</em></mark>，请根据实际情况替换
<ul>
<li><mark><em>&lt;挂载地址&gt;：</em></mark> <strong>NAS</strong> 共享的服务器 <strong>IP</strong> 地址或 <strong>DNS</strong> 域名，本例的 <code v-pre>nas.uds.local</code> 为 <strong>DNS</strong> 域名</li>
<li><mark><em>&lt;NAS文件系统目录&gt;：</em></mark> <strong>NAS 导出（<em>exports</em>）</strong> 的根目录 <code v-pre>&quot;/&quot;</code> 或任意子目录，如 <code v-pre>&quot;/share&quot;</code>，请您确保子目录已存在</li>
<li><mark><em>&lt;当前服务器上待挂载的本地路径&gt;</em></mark>：<strong>Linux ECS</strong> 实例的根目录 <code v-pre>&quot;/&quot;</code> 或任意子目录，如 <code v-pre>&quot;/mnt/nfs&quot;</code> ， 请您确保子目录已存在</li>
</ul>
</li>
<li><span style="color: blue"><strong>vers=3/4：</strong></span> 指定文件系统版本，用 <strong>v3 or v4</strong> 协议挂载文件系统</li>
</ul>
<p><strong>其他挂载参数：</strong> 挂载文件系统时，可选择多种挂载选项，挂载选项使用英文逗号 <code v-pre>&quot;,&quot;</code> 分隔</p>
<ul>
<li><span style="color: blue"><strong>rsize：</strong></span>定义数据块的大小，用于客户端与文件系统之间读取数据，建议值 <strong>1048576</strong></li>
<li><span style="color: blue"><strong>wsize：</strong></span>定义数据块的大小，用于客户端与文件系统之间写入数据，建议值 <strong>1048576</strong>
<ul>
<li>若需要更改 <strong>IO</strong> 大小参数（<em>rsize 和 wsize</em>），建议尽可能使用最大值（<em><strong>即：1048576</strong></em>），以避免性能下降</li>
</ul>
</li>
<li><span style="color: blue"><strong>hard：</strong></span>在文件存储 <strong>NAS</strong> 暂时不可用的情况下，使用文件系统上某个文件的本地应用程序时会停止并等待至该文件系统恢复在线状态，建议启用</li>
<li><span style="color: blue"><strong>timeo：</strong></span>指定时长，单位为 <strong>0.1</strong> 秒，即 <strong>NFS</strong> 客户端在重试向文件系统发送请求之前等待响应的时间。建议值：<strong>600</strong>（<em><strong>60秒</strong></em>）
<ul>
<li>若必须更改超时参数（<em><strong>timeo</strong></em>），建议您使用 <strong>150</strong> 或更大的值，该参数的单位为 <strong>0.1</strong> 秒，因此 <strong>150</strong> 表示的时间为 <strong>15</strong> 秒</li>
</ul>
</li>
<li><span style="color: blue"><strong>retrans：</strong></span> <strong>NFS</strong> 客户端重试请求的次数，建议值，<strong>2</strong></li>
<li><span style="color: blue"><strong>noresvport：</strong></span>在网络重连时使用新的 <strong>TCP</strong> 端口，保障在网络发生故障恢复时不会中断连接，建议启用
<ul>
<li>不建议使用 <strong>soft</strong> 选项，有数据一致性风险，若必须使用，相关风险需自行承担</li>
</ul>
</li>
<li>避免设置不同于默认值的任何其他挂载选项。如果更改读或写缓冲区大小或禁用属性缓存，可能会导致性能下降</li>
</ul>
<h5 id="查看挂载结果" tabindex="-1"><a class="header-anchor" href="#查看挂载结果"><span><strong>查看挂载结果</strong></span></a></h5>
<p>执行如下命令，查看挂载结果，若包含如下类似返回信息，说明挂载成功</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -l</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><img src="@source/unix/CentOS/NFS/img/查看挂载结果.png" /> 
<p>挂载成功后，查看当前文件系统的容量信息</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> df</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -h</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/PQ35O8KY3xeyq9Vb/img/8c54ed06-c146-4acf-9410-af6198777e0f.png" alt="image"></p>
<p>若挂载失败，请进行错误排查</p>
<h5 id="访问nfs" tabindex="-1"><a class="header-anchor" href="#访问nfs"><span><strong>访问NFS</strong></span></a></h5>
<p>挂载成功后，可在 <strong>Linux</strong> 上访问 <strong>NAS</strong> 文件系统，执行 读取 或 写入 操作，可把其当作一个普通的目录来访问和使用</p>
<p><img src="https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/PQ35O8KY3xeyq9Vb/img/59929e17-cafa-49b6-bd15-6a49e3b43dd5.png" alt="image"></p>
<h5 id="自动挂载nfs客户端" tabindex="-1"><a class="header-anchor" href="#自动挂载nfs客户端"><span><strong>自动挂载NFS客户端</strong></span></a></h5>
<p>为避免已挂载 <strong>NFS</strong> 文件系统的服务器重启后，挂载信息丢失，可在 <strong>Linux</strong> 系统中配置 <code v-pre>/etc/fstab</code> 文件，实现服务器设置重启时，<strong>NFS</strong> 文件系统自动挂载</p>
<p>打开 <code v-pre>/etc/fstab</code> 配置文件，添加挂载配置</p>
<ul>
<li>
<p>使用 <strong>NFS v3</strong> 协议挂载文件系统</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nas.uds.local:/share</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /mnt/nfs</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nfs</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vers=3,nolock,proto=tcp,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,_netdev</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>使用NFS v4协议挂载文件系统</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nas.uds.local:/share</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /mnt/nfs</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nfs</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vers=4,minorversion=0,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,_netdev</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<p>其参数说明如上挂载，其余参数说明如下：</p>
<ul>
<li><span style="color: blue"><strong>_netdev：</strong></span> 防止客户端在网络就绪之前开始挂载文件系统</li>
<li><span style="color: blue"><strong>0（_netdev 后第一项）：</strong></span>  非零值表示文件系统应由 <strong>dump</strong> 备份，对于 <strong>NAS</strong> 文件系统而言，此值默认为 <strong>0</strong></li>
<li><span style="color: blue"><strong>0（_netdev 后第二项）:</strong></span> 该值表示 <strong>fsck</strong> 在启动时检查文件系统的顺序，对于 <strong>NAS</strong> 文件系统而言，此值默认为 <strong>0</strong>，表示 <strong>fsck</strong> 不应在启动时运行</li>
</ul>
<h5 id="验证自动挂载" tabindex="-1"><a class="header-anchor" href="#验证自动挂载"><span><strong>验证自动挂载</strong></span></a></h5>
<p>执行重启命令，重启应用服务器，验证 <strong>NFS</strong> 客户端自动挂载</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> reboot</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>在重启服务器前，请确认手动挂载成功，避免服务器重启耗时过久</p>
<p>另外，若自动挂载配置成功，在重启后的一分钟内，可以通过 <strong><code v-pre>df -h</code></strong> 命令查看挂载的 <strong>NFS</strong> 文件系统</p>
</div>
<p><strong>附（<em>Redhat</em>）：</strong> <a href="https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/8/html/managing_file_systems/common-nfs-mount-options_mounting-nfs-shares" target="_blank" rel="noopener noreferrer">常用挂载选项</a></p>
<h3 id="_3-4-卸载" tabindex="-1"><a class="header-anchor" href="#_3-4-卸载"><span>3.4 卸载</span></a></h3>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> umount</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/zz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 若提示 umount.nfs4: /home/zz: device is busy</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 执行如下命令，强制卸载</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> umount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -fl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/zz</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-获取挂载-nfs-客户端" tabindex="-1"><a class="header-anchor" href="#_3-5-获取挂载-nfs-客户端"><span>3.5 获取挂载 NFS 客户端</span></a></h3>
<blockquote>
<p>查询默认服务端口 <code v-pre>cat /etc/services| grep nfs</code></p>
</blockquote>
<ul>
<li>
<p>命令快速查: （<em>不一定好用</em>）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ss</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> :nfs</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>使用 <strong>python</strong>:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> psutil</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "laddr"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">net.laddr.ip</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">net.laddr.port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        "raddr"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">net.raddr.ip</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">net.raddr.port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> net </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> psutil.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">net_connections</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> net.laddr.port </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2049</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> and</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    isinstance</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(net.laddr, psutil._common.addr) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">and</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    isinstance</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(net.raddr, psutil._common.addr)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_4-v4-无法直接挂载问题" tabindex="-1"><a class="header-anchor" href="#_4-v4-无法直接挂载问题"><span>4. V4 无法直接挂载问题</span></a></h2>
<p>由于 <strong>v4</strong> 的挂载和 <strong>v3</strong> 不同，要先导出根目录，才能挂子目录</p>
<p>若希望无需导出根目录，实现用户通过 <strong>v4</strong> 可自由挂载子目录，其解决办法如下：</p>
<p>针对 <code v-pre>NFSv4</code> 版本 <code v-pre>Linux</code> 客户端二次共享: <Badge type="error">fsid</Badge> + <Badge type="info">bind</Badge></p>
<p>使用 <code v-pre>--bind</code> 建立挂载链接</p>
<p><a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/5/html/deployment_guide/s1-nfs-server-config-exports" target="_blank" rel="noopener noreferrer">参考</a></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 若用户需要挂载 /share/Users/zz 这个子目录:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mkdir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /exports/nfs/Users/zz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 使用 bind 创建绑定</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --bind</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /share/Users/zz</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /exports/nfs/Users/zz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># /etc/exports 文件中添加导出，如：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">/exports/nfs/Users/zz</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">		*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">fsid</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">17,async,root_squash,no_all_squash,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">anonuid</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">65534,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">anongid</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">65534,rw</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注意：</strong></p>
<ul>
<li>貌似也需要先导出对应的子目录，才能挂载 <code v-pre>bind</code> 目录</li>
<li><code v-pre>fsid</code> 若一致，有无影响，有参考说会影响高可用、或出现不同目录 但同一个挂载的问题</li>
<li>用此方式，会增加开机自动挂载等流程的复杂度</li>
</ul>
</blockquote>
</div></template>


