<template><div><h1 id="django部署" tabindex="-1"><a class="header-anchor" href="#django部署"><span>Django部署</span></a></h1>
<p><strong>Django</strong> 和 <strong>Flask</strong> 项目部署方式很多，采用 <strong>Nginx + uwsgi + Django</strong> 较常见</p>
<!-- more -->
<h2 id="_1-部署说明" tabindex="-1"><a class="header-anchor" href="#_1-部署说明"><span>1. 部署说明</span></a></h2>
<h3 id="_1-1-uwsgi-服务器" tabindex="-1"><a class="header-anchor" href="#_1-1-uwsgi-服务器"><span>1.1 uWSGI 服务器</span></a></h3>
<p>它实现了 <strong>WSGI</strong> 、<strong>uwsgi</strong>、<strong>HTTP</strong> 等协议，本身也是 <strong>WEB Server</strong>，可不与 <strong>Nginx</strong> 搭配，就能承载高并发，但通常搭配 <strong>Nginx</strong> 来负载均衡、反向代理、承载前端静态文件等</p>
<ul>
<li><strong>Nginx</strong> 中 <code v-pre>HttpUwsgiModule</code> 模块的作用，是与 <code v-pre>uWSGI</code> 服务器交互</li>
<li><strong><RouteLink to="/tool/Nginx/Nginx%E5%9F%BA%E7%A1%80.html#nginx">WSGI</RouteLink></strong>：是 <strong>Web</strong> 服务器网关接口，不是服务器，是种通信规范</li>
<li><strong>uwsgi</strong> 是 <RouteLink to="/tool/Nginx/Nginx%E5%9F%BA%E7%A1%80.html#nginx">uWSGI 服务器</RouteLink> 独占的一种<strong>线路协议</strong>，不是通信协议，常用于其他网络服务器的数据通信
<ul>
<li>定义了传输信息的类型，每个<code v-pre>uwsgi packet</code> 前 <strong>4byte</strong> 为传输信息类型描述</li>
</ul>
</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">生产环境，就用 uWSGI</p>
</div>
<h3 id="_1-2-uwsgi-特点" tabindex="-1"><a class="header-anchor" href="#_1-2-uwsgi-特点"><span>1.2 uWSGI 特点</span></a></h3>
<ul>
<li>超快的性能</li>
<li>低内存占用，实测大概 <strong>apache2</strong> 的 <code v-pre>mod_wsgi</code>（模块）一半左右</li>
<li>多 <strong>app</strong> 管理，省去冥思苦想应用的端口号</li>
<li>详尽的日志功能，分析性能瓶颈</li>
<li>高度可定制（<em>内存大小限制，服务一定次数后重启等</em>）</li>
</ul>
<img src="@source/tool/Nginx/img/uwsgi协议性能.png">
<div class="hint-container tip">
<p class="hint-container-title">用户请求到 Django 应用的流程</p>
<ol>
<li>浏览器 将请求发给 <strong>Nginx</strong>  [<code v-pre>user -&gt; Nginx</code>]</li>
<li><strong>Nginx</strong> 通过 <strong>uwsgi</strong> 协议，转发给 <strong>uWSGI</strong> [<code v-pre>Nginx -&gt; uwsgi -&gt; uWSGI</code>]</li>
<li><strong>uWSGI</strong> 再转发给 <strong>Django</strong> 应用 [<code v-pre>uWSGI -&gt; Django</code>]</li>
</ol>
</div>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p><strong>Nginx</strong> 和 <strong>uWSGI</strong>之间是通过 <code v-pre>unix socket</code>，把请求转到 <code v-pre>socket</code> 上的</p>
</div>
<h3 id="_1-3-uwsgi-安装使用" tabindex="-1"><a class="header-anchor" href="#_1-3-uwsgi-安装使用"><span>1.3 uWSGI 安装使用</span></a></h3>
<ul>
<li>
<p>安装</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ... or if you want to install the latest LTS (long term support) release</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://projects.unbit.it/downloads/uwsgi-lts.tar.gz</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>基本测试</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># mkdir uWSGI_test dir and Create a file called test.py:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># test.py</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> application</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic">env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> start_response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">    start_response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'200 OK'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, [(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Content-Type'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'text/html'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)])</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Hello World"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># python3</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>运行:</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uwsgi</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --http</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> :8000</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --plugin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --wsgi-file</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test.py</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">##  --plugin python 告诉uWSGI 用python插件，防止出错</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>用 <code v-pre>uwsgi</code> 启动 <strong>Django</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 项目名.wsgi 是 Django 工程的项目名</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uwsgi</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --http</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> :8000</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --module</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --plugin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 项目名.wsgi</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建，配置 <code v-pre>uwsgi</code></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># touch application-uwsgi.ini</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> application-uwsgi.ini</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[uwsgi]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">http</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> :9000</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 								# 与 Nginx 的 socket通信的进程</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">socket</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 127.0.0.1:8001</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 					# 告诉 uWSGI 项目 BASE_DIR</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">chdir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/igarashi/CODE/Application</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">		# 上面写了绝对路径，此时直接写路径即可</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">wsgi-file</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Application/wsgi.py</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">processes</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 4</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> 								# 启 4个 进程</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">threads</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">									# 每个进程 启 俩 线程</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">stats</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 127.0.0.1:9191</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">						# 监控命令，监控后台，启动后会多占个进程</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">vacuum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">          =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">						# 退出时把相关的环境、环境变量清除掉</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">daemonize</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">      =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/log/日志.log</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">		# 日志</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 启动：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/local/bin/uwsgi</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --ini</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> application-uwsgi.ini</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 查看uwsgi启动的进程</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ps</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -ef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 全库搜索和uwsgi相关的包等等</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-cache</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> search</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uwsgi</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uwsgi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 安装uwsgi的监控</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uwsgitop</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # uwsgitop:9191 端口 进行监控</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_1-4-配置-nginx" tabindex="-1"><a class="header-anchor" href="#_1-4-配置-nginx"><span>1.4 配置 Nginx</span></a></h3>
<p>安装配置见：<RouteLink to="/tool/Nginx/Nginx%E5%9F%BA%E7%A1%80.html#_2-%E5%AE%89%E8%A3%85">Nginx 基础</RouteLink></p>
<ul>
<li>
<p>默认为 <code v-pre>/etc/nginx/sites-enabled/default</code> 文件的配置</p>
<div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">server {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # the port your site will be served on</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    listen      80</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # the domain name it will serve for</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    server_name 127.0.0.1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">; # substitute your machine's IP address or FQDN</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    charset     utf-8</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # max upload size</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    client_max_body_size 75M</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;   # adjust to taste</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # Django media</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    location /media  {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        alias /home/ubuntu/blog/media</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;  # your Django project's media files - amend as required</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    location /static {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        alias /home/ubuntu/blog/static</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">; # your Django project's static files - amend as required</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # Finally, send all non-media requests to the Django server.</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    location / {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        include     uwsgi_params</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">; # the uwsgi_params file you installed</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">        uwsgi_pass 127.0.0.1:8001</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>收集 <strong>Django</strong> 静态文件</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Django setting.py</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">STATIC_ROOT</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> os.path.join</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">BASE_DIR,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "static/"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">DEBUG</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> False</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ALLOWED_HOSTS</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'*'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 收集</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manage.py</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> collectstatic</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


