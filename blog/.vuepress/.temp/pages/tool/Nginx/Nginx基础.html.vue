<template><div><p><a href="http://nginx.org/" target="_blank" rel="noopener noreferrer">Nginx</a> 是 <strong>WEB Server</strong>（<em>放置 <strong>Web</strong> 服务的</em>），<strong>C</strong> 语言写的，号称支持百万并发，对 <strong>windows</strong> 支持较差</p>
<!-- more -->
<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx"><span>Nginx</span></a></h1>
<h2 id="_1-web-server" tabindex="-1"><a class="header-anchor" href="#_1-web-server"><span>1. WEB Server</span></a></h2>
<ul>
<li><strong><a href="">WSGI</a></strong>：<strong>Python</strong> 自带网关，功能测试用，无法处理并发，<strong>30 MAX</strong> 服务器崩溃</li>
<li><strong><a href="">Apache</a></strong>：过去市面主流，现占有率下降，多为银行证券，追求稳定性，<strong>每个连接都会开辟1个线程</strong>，<strong>MAX 1k+</strong> 线程</li>
<li><strong><a href="">iis</a></strong>：<strong>Windows</strong> 下是最著名的 <strong>Web</strong> 服务器</li>
<li><a href="http://tengine.taobao.org/" target="_blank" rel="noopener noreferrer"><strong>Tengine</strong></a>：淘宝在 <strong>Nginx</strong> 的基础上进行了二次封装，开源的，针对大访问量网站的需求（<em>没啥区别</em>）</li>
<li><strong><a href="">F5</a></strong>：硬件负载，收购了 <strong>Nginx</strong></li>
<li><strong><a href="">A10</a></strong>：对应 <strong>F5</strong> 的，也是硬件负载</li>
<li><strong><a href="">LVS</a></strong>：<strong>Linux</strong> 下著名的 <strong>负载均衡软件</strong> ，告诉用户在多台服务器的情况下，该访问那台机器（<em>国人开发者：章文嵩，阿里 -&gt; 滴滴</em>，<em>另一个出名的国人开发者是：尤雨溪，前端 <strong>Vue</strong> 框架</em>）</li>
<li><strong><a href="">Nginx</a></strong>：当下最主流，比 <strong>Apache</strong> 轻量，且处理并发的能力还强很多（<em>更能承载高并发</em>）底层用 <strong>epoll</strong>（<em>IO 多路复用</em>）故能处理上万个并发</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<ul>
<li>
<p><strong>Nginx</strong> 可作为静态页面的 <strong>Web</strong> 服务器，支持 <strong>CGI</strong> 协议的动态语言（<em>perl，php等</em>）但不支持 <strong>Java</strong>，<strong>Java</strong> 程序只能通过与 <strong>tomcat</strong> 配合完成</p>
</li>
<li>
<p><strong>Nginx</strong> 专为性能优化而开发，实现上非常注重效率，能经受高负载的考验，有报告表明能支持高达 <strong>50000</strong> 个并发连接数</p>
</li>
</ul>
<p><strong>Nginx 的必要性：</strong> 用专门的 <strong>HTTP Server</strong> 做一层缓冲，避免 <strong>并发量过大</strong> 导致服务宕掉</p>
</div>
<h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装"><span>2. 安装</span></a></h2>
<h3 id="_2-1-流程" tabindex="-1"><a class="header-anchor" href="#_2-1-流程"><span>2.1 流程</span></a></h3>
<Tabs id="75" :data='[{"id":"CentOS"},{"id":"Debain"}]'>
<template #title0="{ value, isActive }">CentOS</template>
<template #title1="{ value, isActive }">Debain</template>
<template #tab0="{ value, isActive }">
<h5 id="源码包安装" tabindex="-1"><a class="header-anchor" href="#源码包安装"><span><strong><a href="http://blog.sikacode.com/article/97" target="_blank" rel="noopener noreferrer">源码包安装</a></strong></span></a></h5>
<p>安装依赖包</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> gcc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> gcc-c++</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> make</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> libtool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> wget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pcre</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pcre-devel</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> zlib</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> zlib-devel</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> openssl-devel</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>下载源码包</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">wget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://nginx.org/download/nginx-1.18.0.tar.gz</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>解压</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -zxvf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nginx-1.18.0.tar.gz</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>安装</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nginx-1.18.0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">./configure</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">make</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x26;&#x26; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">make</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译前，可先 <code v-pre>cat README</code></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">./configure</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --help</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 找到安装路径指令：</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --prefix=PATH</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 找到支持https协议指令：</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --with-http_ssl_module</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 找到查看nginx状态的指令：--with-http_stub_status_module</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">./configure</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --prefix=PATH</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --with-http_ssl_module</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --with-http_stub_status_module</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装后的路径为 <code v-pre>/usr/local/nginx</code></p>
</template>
<template #tab1="{ value, isActive }">
<p>更新并安装基础包</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> update</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> curl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> gnupg2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ca-certificates</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lsb-release</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装 <strong>Nginx</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nginx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>重启并添加开机启动</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nginx</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nginx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看版本</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -v</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## nginx version: nginx/1.18.0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件路径</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/nginx/sites-available/default</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>查看是否已建立软连接，若无手动创建</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ls</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -ahl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/nginx/sites-enabled</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ln</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/nginx/sites-available/default</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/nginx/sites-enabled/default</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>reload</code> 生效</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> reload</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="_2-2-简单配置" tabindex="-1"><a class="header-anchor" href="#_2-2-简单配置"><span>2.2 简单配置</span></a></h3>
<p><strong>Debain</strong> 下的 <strong>Blog</strong> 图片服务器</p>
<ul>
<li>
<p>备份配置文件</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/nginx/sites-available/default</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/nginx/sites-available/default_bak</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>修改配置项</p>
<div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">server {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	listen 8999</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;		# 改为监听 8999 端口</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	listen [::]:8999</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	server_name _</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	location / {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">		# First attempt to serve request as file, then</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">		# as directory, then fall back to displaying a 404.</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">		root /home/igarashi/images/</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;	# 存放图片路径</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        autoindex on</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;					# 打开浏览功能</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 监听多个</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">server {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	listen 443 ssl</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;		# ssl认证</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	listen [::]:443 ssl</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 指定加密证书路径</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	ssl_certificate /home/igarashi/web/ssl/8500011_www.igarashi.icu.pem</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	ssl_certificate_key /home/igarashi/web/ssl/8500011_www.igarashi.icu.key</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">	...</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>重载服务</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> reload</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_3-使用基础" tabindex="-1"><a class="header-anchor" href="#_3-使用基础"><span>3. 使用基础</span></a></h2>
<h3 id="_3-1-目录结构" tabindex="-1"><a class="header-anchor" href="#_3-1-目录结构"><span>3.1 目录结构</span></a></h3>
<ul>
<li>
<p><strong>conf</strong>：配置文件</p>
</li>
<li>
<p><strong>html</strong>：存放静态文件 <code v-pre>index.html</code> 是默认的欢迎页面</p>
</li>
<li>
<p><strong>logs</strong>：日志目录</p>
</li>
<li>
<p><strong>sbin</strong>：二进制文件</p>
</li>
</ul>
<p><strong>Nginx</strong> 启动后会运行一个主进程，跟据配置文件的设置 <code v-pre>worker_processes : 1</code> 生成子进程（<em>工作进程</em>）</p>
<p>主进程不负责处理用户的请求，只用来转发给子进程，真正负责处理用户请求的是子进程</p>
<h3 id="_3-2-命令" tabindex="-1"><a class="header-anchor" href="#_3-2-命令"><span>3.2 命令</span></a></h3>
<ul>
<li>普通启动服务：<code v-pre>/usr/local/nginx/sbin/nginx</code></li>
<li>配置文件启动：<code v-pre>/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf</code></li>
<li>暴力停止服务：<code v-pre>/usr/local/nginx/sbin/nginx -s stop</code></li>
<li>优雅停止服务：<code v-pre>/usr/local/nginx/sbin/nginx -s quit</code></li>
<li>检查配置文件：<code v-pre>/usr/local/nginx/sbin/nginx -t</code></li>
<li>重新加载配置：<code v-pre>/usr/local/nginx/sbin/nginx -s reload</code></li>
<li>查看相关进程：<code v-pre>ps -ef | grep nginx</code></li>
</ul>
<h5 id="帮助" tabindex="-1"><a class="header-anchor" href="#帮助"><span>帮助</span></a></h5>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-?,-h</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">         :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> this</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> help</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-v</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> show</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> version</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> exit</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                                               显示版本号</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-V</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> show</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> version</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> configure</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> options</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> then</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> exit</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> configuration</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> exit</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                                         测试配置文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-T</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> configuration,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dump</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> it</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> and</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> exit</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-q</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> suppress</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> non-error</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> messages</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> during</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> configuration</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> testing</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> signal</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">     :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> send</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> signal</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> master</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> process:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> stop,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> quit,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> reopen,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> reload</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">         停止退出，重启等</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> prefix</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">     :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> prefix</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (default: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/usr/share/nginx/</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> filename</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">   :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> configuration</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> file</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (default: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/etc/nginx/nginx.conf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-g</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> directives</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> global</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> directives</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> out</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> of</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> configuration</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> file</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="开放防火墙" tabindex="-1"><a class="header-anchor" href="#开放防火墙"><span>开放防火墙</span></a></h5>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">/sbin/iptables</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -I</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> INPUT</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tcp</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --dport</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 80</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -j</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ACCEPT</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">/etc/rc.d/init.d/iptables</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> save</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># iptables：将防火墙规则保存到 /etc/sysconfig/iptables：[确定]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># or 暴力关闭防火墙（注：危险操作，清除防火墙规则，但只要没有save还行）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> iptables</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -F</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> setenforce</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-配置文件" tabindex="-1"><a class="header-anchor" href="#_3-3-配置文件"><span>3.3 配置文件</span></a></h3>
<details class="hint-container details"><summary>示例</summary>
<div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#user  nobody;              # 使用哪个用户来启动子进程</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    worker_processes  1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;        # 工作进程的个数，配置cpu的核心数-1或-2，cpu的亲缘性绑定，让nginx的子进程工作再哪个核心上</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    #error_log  logs/error.log;              # 错误日志的存放位置</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    #error_log  logs/error.log  notice;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    #error_log  logs/error.log  info;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    #pid        logs/nginx.pid;              # 启动之后会生成一个pid文件（socket文件）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    events {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        worker_connections  1024</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;           # 每一个子进程工作可以处理的最大连接数，默认1024</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                                            # 还可以设置 use [epoll|select|poll] 默认则是自己选择</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    http {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        include       mime.types</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;                   # 导入</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        default_type  application/octet-stream</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;     # 默认的请求方式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #                  '$status $body_bytes_sent "$http_referer" '</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #                  '"$http_user_agent" "$http_x_forwarded_for"';</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                                                    # log_format main 可以定义日志格式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #access_log  logs/access.log  main;         # 日志用什么格式输出</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        sendfile        on</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #tcp_nopush     on;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #keepalive_timeout  0;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        keepalive_timeout  65</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;                      # 保持长连接的超时时间 65秒</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #gzip  on;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        server {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">            listen       80</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;                        # 监听端口</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">            server_name  localhost</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;                 # 设置域名 此处为域名，直接写是肯定不会有个，除非本地HOSTS设置对应的</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #charset koi8-r;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #access_log  logs/host.access.log  main;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">            location / {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">                root   html</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;                        # 指定静态文件地址</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">                index  index.html index.htm</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;        # 指定默认的index页面</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">            }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #error_page  404              /404.html;    # 错误页面 找不到页面</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # redirect server error pages to the static page /50x.html</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">            error_page   500 502 503 504  /50x.html</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;    # 错误页面 服务端错误（后端代码逻辑性错误等）</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">            location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> /50x.html {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">                root   html</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">            }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">            location /img {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">                root /data/img</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;         # 若为root，那么表示/data/img 这个地址为根，还要有个/img目录才行</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">                alias /data/img</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;        # 若为alias， 那么表示/data/img 这个地址就是/img的所在目录</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">            }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # proxy the PHP scripts to Apache listening on 127.0.0.1:80</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #location ~ \.php$ {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #    proxy_pass   http://127.0.0.1;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #location ~ \.php$ {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #    root           html;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #    fastcgi_pass   127.0.0.1:9000;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #    fastcgi_index  index.php;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #    include        fastcgi_params;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # deny access to .htaccess files, if Apache's document root</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # concurs with nginx's one</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #location ~ /\.ht {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #    deny  all;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            #}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # another virtual host using mix of IP-, name-, and port-based configuration</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #server {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    listen       8000;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    listen       somename:8080;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    server_name  somename  alias  another.alias;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    location / {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #        root   html;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #        index  index.html index.htm;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #}</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # HTTPS server</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #server {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    listen       443 ssl;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    server_name  localhost;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    ssl_certificate      cert.pem;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    ssl_certificate_key  cert.key;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    ssl_session_cache    shared:SSL:1m;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    ssl_session_timeout  5m;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    ssl_ciphers  HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    ssl_prefer_server_ciphers  on;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    location / {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #        root   html;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #        index  index.html index.htm;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #    }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        #}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    }</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="_4-其他操作" tabindex="-1"><a class="header-anchor" href="#_4-其他操作"><span>4. 其他操作</span></a></h2>
<h3 id="_4-1-域名设置" tabindex="-1"><a class="header-anchor" href="#_4-1-域名设置"><span>4.1 域名设置</span></a></h3>
<p><strong>server_name</strong>: <code v-pre>server</code> 下的 <code v-pre>server_name</code> 进行设置，由于没有备案需要更改本地 <code v-pre>HOSTS</code> 才能成功解析。</p>
<div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">server_name www.yukiball.com www.mmmmohime.com mmmmohime.com</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>多域名访问（虚拟主机）</strong>： 在 <strong>Nginx</strong> 的设置里面设置多个 <code v-pre>server</code></p>
<ul>
<li>
<p>基于 <code v-pre>ip</code> 地址的</p>
</li>
<li>
<p>基于端口的</p>
</li>
<li>
<p>基于域名的：最简单的方式</p>
<pre><code>server {
    listen 80 default_server; # 设置 default 当使用 ip 地址访问，默认进入 server 设置的页面
    server_name www.taobao.dom taobao.com;
  location / {
      root /data/taobao;
      index index.html;
  }
  }
</code></pre>
</li>
</ul>
<h1 id="_6-nginx-日志" tabindex="-1"><a class="header-anchor" href="#_6-nginx-日志"><span>6.Nginx 日志</span></a></h1>
<pre><code>#log_format  main  '$remote_addr - $remote_user [$time_local] &quot;$request&quot; '
        #                  '$status $body_bytes_sent &quot;$http_referer&quot; '
        #                  '&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;';

                                                    # log_format main 可以定义日志格式
        #access_log  logs/access.log  main;         # 日志用什么格式输出

把注释去掉即可打开日志
</code></pre>
<p><strong>查看日志</strong></p>
<pre><code>tail -f logs/access.log
remote_addr: 访问ip地址
remote_user: 访问的用户
[$time_local]: 访问的本地时间
request: 包括请求方式、请求地址、请求协议版本
status： 状态码
body_bytes_sent 发送的大小
http_user_agent 用户请求的浏览器
http_x_forwarded_for
</code></pre>
<p><strong>设置网段禁止访问</strong></p>
<pre><code>deny 192.168.21.0/255.255.255.0;    设置这个网段都不能访问，不加子网掩码可以单独设置ip
deny 192.168.21.0/24;  同上
</code></pre>
<p><strong>设置白名单</strong></p>
<pre><code>allow 192.168.21.131;
以上均可写在server或location里面
</code></pre>
<h1 id="_7-反向代理" tabindex="-1"><a class="header-anchor" href="#_7-反向代理"><span>7.反向代理</span></a></h1>
<ul>
<li>
<p><strong>作用</strong>：起到保护网站安全的作用，用户访问的永远是这台反向代理的 nginx 机器，因此只用维护 nginx 这台机器的安全防护即可。</p>
</li>
<li>
<p><strong>动静分离</strong>：动态网站和静态网站分离，nginx 可以直接请求静态文件，而避免请求 Django 和后端交互。直接缓存静态文件即可。</p>
</li>
<li>
<p><strong>负载均衡</strong>：F5、V10、LVS、haproxy（支持 4 层还支持 7 层）nginx 最早出来之前只支持 7 层，新版支持 4 层还支持 UDP 的负载均衡。缓解一台服务器压力，可以承受更多请求。</p>
<p>假设目前在 ip 为 192.168.21.131 的一台主机下 配置文件中添加<br>
upstream django {<br>
server 192.168.21.128:81;<br>
server 192.168.21.131L81; # 若此时再加上一个 131 的 81 端口，当访问 131 的 81 端口，会发现在 128 和 131 之前轮询<br>
}</p>
<p>server{<br>
listen 81;<br>
location / {<br>
root /data/html;<br>
index index.html;<br>
}<br>
}</p>
</li>
</ul>
<h3 id="权重" tabindex="-1"><a class="header-anchor" href="#权重"><span>权重</span></a></h3>
<pre><code>upstream django {
    server 192.168.21.128:81 weight=3; # 表示权重访问3次128才访问一次131
    server 192.168.21.131L81;
}

server{
    listen 80 default_server;
    listem [::]:80 default_server;
    server_name _;

    location {
        proxy_pass http://django; #注意这里一定要加http:// + upstream别名
    }
}
</code></pre>
<h3 id="ip-hash" tabindex="-1"><a class="header-anchor" href="#ip-hash"><span>ip_hash</span></a></h3>
<p>每个请求做 hash 运算，这样每个固定的访客都会被负载到后端固定的机器</p>
<pre><code>upstream django {
    ip_hash;
    server 192.168.21.128:81;
    server 191.168.21.131:81;
}
</code></pre>
<h3 id="backup" tabindex="-1"><a class="header-anchor" href="#backup"><span>backup</span></a></h3>
<p>备份：</p>
</div></template>


