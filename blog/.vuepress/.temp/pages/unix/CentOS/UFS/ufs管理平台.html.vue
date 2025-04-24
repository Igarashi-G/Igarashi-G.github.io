<template><div><p><strong>UFS</strong> 管理平台常用快捷命令</p>
<!-- more -->
<h1 id="ufs-快捷命令" tabindex="-1"><a class="header-anchor" href="#ufs-快捷命令"><span>UFS 快捷命令</span></a></h1>
<h3 id="_1-部署相关" tabindex="-1"><a class="header-anchor" href="#_1-部署相关"><span>1. 部署相关</span></a></h3>
<h4 id="_1-1-更新集群代码" tabindex="-1"><a class="header-anchor" href="#_1-1-更新集群代码"><span>1.1 更新集群代码</span></a></h4>
<ul>
<li>
<p>免密认证</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ssh-keygen</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ssh-copy-id</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ~/.ssh/id_rsa.pub</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 22</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> root@172.16.120.142</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>远程拷贝</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> scp</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> agent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> conf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dashboard</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> monitor</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mounter</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rook</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> static</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> version.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ubind</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> watchdog</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> root@172.16.120.142:/opt/uxs</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>远程执行命令</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ssh</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 172.16.120.142</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "systemctl restart uxs-agent"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>重启服务</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxs-dashboard</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxs-agent</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxs-monitor</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> status</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxs-dashboard</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> status</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxs-agent</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> status</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxs-monitor</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>手动启动服务</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /opt/uxs/dashboard/uxsdashboard.py</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /opt/uxs/agent/uxsagent.py</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /opt/uxs/monitor/uxsmonitor.py</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看服务进程</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ps</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -ef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxsdashboard</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ps</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -ef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxsagent</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ps</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -ef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxsmonitor</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除服务 PID 文件</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -rf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/run/uxsagent.pid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -rf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/run/uxsmonitor.pid</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看各个服务日志</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tailf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/log/uxs/uxsdashboard.log</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tailf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/log/uxs/uxsagent.log</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tailf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/log/uxs/uxsmonitor.log</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-2-etcd-相关" tabindex="-1"><a class="header-anchor" href="#_1-2-etcd-相关"><span>1.2 ETCD 相关</span></a></h4>
<ul>
<li>
<p>重置 <strong>etcd</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 修改 new</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/uxs/config.json</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 重置endpoints</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/uxs/etcd.json</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    "etcd_endpoints"</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "ipv4:///127.0.0.1:22379"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 清空etcd</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> stop</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uxsetcd</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -rf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/lib/etcd/uxs_default.etcd</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-3-生成许可" tabindex="-1"><a class="header-anchor" href="#_1-3-生成许可"><span>1.3 生成许可</span></a></h4>
<ul>
<li>
<p>生成许可证</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ufs_make_license</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --serial_number</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 17A179CFF629D10322E69AF61A959E013DCE5075</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">  --chunkservers=1000</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --clients=10000</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --expire_date=2099-01-01</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --capcity=2PiB</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-4-mss-服务相关" tabindex="-1"><a class="header-anchor" href="#_1-4-mss-服务相关"><span>1.4 MSS 服务相关</span></a></h4>
<h5 id="解决-mss-无法启动问题" tabindex="-1"><a class="header-anchor" href="#解决-mss-无法启动问题"><span>解决 <code v-pre>MSS</code> 无法启动问题</span></a></h5>
<ul>
<li>
<p><code v-pre>-a</code> 参数</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ufsmetaserver</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -a</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 然后再执行 stop，并去管理平台手动启动</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ufsmetaserver</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> stop</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>test</code> 参数</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">查看</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ufsmetaserver</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 当前情况</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>-f</code> 参数</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看服务错误日志</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ufsmetaserver</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -f</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<blockquote>
<p><strong>备注</strong>： 终极解决办法: <code v-pre>ufsmeatserver -e</code></p>
<p>此方式会将所有 <code v-pre>meta</code>、<code v-pre>chunk</code> 都重新启动，可能会导致丢数据！！！！</p>
<p>仅有十分十分特殊情况下，也应该先确认，再使用</p>
</blockquote>
<h4 id="_1-5-css-服务相关" tabindex="-1"><a class="header-anchor" href="#_1-5-css-服务相关"><span>1.5 CSS 服务相关</span></a></h4>
<h5 id="解决-css-无法启动问题" tabindex="-1"><a class="header-anchor" href="#解决-css-无法启动问题"><span>解决 <code v-pre>CSS</code> 无法启动问题</span></a></h5>
<ul>
<li>
<p><code v-pre>-f</code> 参数</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看服务错误日志</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ufschunkserver</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -f</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-x-挂载相关" tabindex="-1"><a class="header-anchor" href="#_1-x-挂载相关"><span>1.x 挂载相关</span></a></h4>
<ul>
<li>
<p>挂载子目录</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/bin/ufsmount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ufsioretries=3,ufstimeout=1,ufsdelayedinit,internal</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /export/nas/Users</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>挂载回收站目录</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/bin/ufsmount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /export/meta/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>远程挂载</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ufsmount</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -H</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<hr>
<h3 id="_2-调度相关" tabindex="-1"><a class="header-anchor" href="#_2-调度相关"><span>2. 调度相关</span></a></h3>
<h4 id="_2-1-节点高可用" tabindex="-1"><a class="header-anchor" href="#_2-1-节点高可用"><span>2.1 节点高可用</span></a></h4>
<h4 id="_2-2-nas-服务高可用" tabindex="-1"><a class="header-anchor" href="#_2-2-nas-服务高可用"><span>2.2 NAS 服务高可用</span></a></h4>
<ul>
<li>
<p>监听 IP</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> watch</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -n</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "ip a"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>秒 <code v-pre>ping</code> IP</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 目前用于高可用检测网卡是否ping通，由于上锁同步导致至少需1s</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ping</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 192.16.120.175</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -c</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -W</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>添加网卡 IP</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> addr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.171/24</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> broadcast</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 172.16.120.255</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dev</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> eth1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>删除网卡 IP</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> addr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> del</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.171/24</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dev</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> eth1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>刷新网卡</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> addr</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> flush</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> eth1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>设置网卡状态</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> link</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> eth1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> down</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> link</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> eth1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> up</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<hr>
<h3 id="_3-基础排错相关" tabindex="-1"><a class="header-anchor" href="#_3-基础排错相关"><span>3. 基础排错相关</span></a></h3>
<h4 id="_3-1-基础服务无法启动" tabindex="-1"><a class="header-anchor" href="#_3-1-基础服务无法启动"><span>3.1 基础服务无法启动</span></a></h4>
<ul>
<li>
<p><code v-pre>systemctl</code> 无法启动</p>
<blockquote>
<p>例: <code v-pre>systemctl restart smb.service</code> 无法启动</p>
</blockquote>
</li>
<li></li>
</ul>
</div></template>


