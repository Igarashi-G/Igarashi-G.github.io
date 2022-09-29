<template><div><h1 id="django部署" tabindex="-1"><a class="header-anchor" href="#django部署" aria-hidden="true">#</a> Django部署</h1>
<p><strong>Django</strong> 和 <strong>Flask</strong> 项目部署方式很多，采用 <strong>Nginx + uwsgi + Django</strong> 较常见</p>
<!-- more -->
<h2 id="_1-部署说明" tabindex="-1"><a class="header-anchor" href="#_1-部署说明" aria-hidden="true">#</a> 1. 部署说明</h2>
<h3 id="_1-1-uwsgi-服务器" tabindex="-1"><a class="header-anchor" href="#_1-1-uwsgi-服务器" aria-hidden="true">#</a> 1.1 uWSGI 服务器</h3>
<p>它实现了 <strong>WSGI</strong> 、<strong>uwsgi</strong>、<strong>HTTP</strong> 等协议，本身也是 <strong>WEB Server</strong>，可不与 <strong>Nginx</strong> 搭配，就能承载高并发，但通常搭配 <strong>Nginx</strong> 来负载均衡、反向代理、承载前端静态文件等</p>
<ul>
<li><strong>Nginx</strong> 中 <code v-pre>HttpUwsgiModule</code> 模块的作用，是与 <code v-pre>uWSGI</code> 服务器交互</li>
<li><strong><RouterLink to="/tool/Nginx/Nginx%E5%9F%BA%E7%A1%80.html#nginx">WSGI</RouterLink></strong>：是 <strong>Web</strong> 服务器网关接口，不是服务器，是种通信规范</li>
<li><strong>uwsgi</strong> 是 <RouterLink to="/tool/Nginx/Nginx%E5%9F%BA%E7%A1%80.html#nginx">uWSGI 服务器</RouterLink> 独占的一种<strong>线路协议</strong>，不是通信协议，常用于其他网络服务器的数据通信
<ul>
<li>定义了传输信息的类型，每个<code v-pre>uwsgi packet</code> 前 <strong>4byte</strong> 为传输信息类型描述</li>
</ul>
</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">生产环境，就用 uWSGI</p>
</div>
<h3 id="_1-2-uwsgi-特点" tabindex="-1"><a class="header-anchor" href="#_1-2-uwsgi-特点" aria-hidden="true">#</a> 1.2 uWSGI 特点</h3>
<ul>
<li>超快的性能</li>
<li>低内存占用，实测大概 <strong>apache2</strong> 的 <code v-pre>mod_wsgi</code>（模块）一半左右</li>
<li>多 <strong>app</strong> 管理，省去冥思苦想应用的端口号</li>
<li>详尽的日志功能，分析性能瓶颈</li>
<li>高度可定制（<em>内存大小限制，服务一定次数后重启等</em>）</li>
</ul>
<img src="@source/tool/Nginx/img/uwsgi协议性能.png">
<div class="custom-container tip">
<p class="custom-container-title">用户请求到 Django 应用的流程</p>
<ol>
<li>浏览器 将请求发给 <strong>Nginx</strong>  [<code v-pre>user -&gt; Nginx</code>]</li>
<li><strong>Nginx</strong> 通过 <strong>uwsgi</strong> 协议，转发给 <strong>uWSGI</strong> [<code v-pre>Nginx -&gt; uwsgi -&gt; uWSGI</code>]</li>
<li><strong>uWSGI</strong> 再转发给 <strong>Django</strong> 应用 [<code v-pre>uWSGI -&gt; Django</code>]</li>
</ol>
</div>
<div class="custom-container note">
<p class="custom-container-title">注</p>
<p><strong>Nginx</strong> 和 <strong>uWSGI</strong>之间是通过 <code v-pre>unix socket</code>，把请求转到 <code v-pre>socket</code> 上的</p>
</div>
<h3 id="_1-3-uwsgi-安装使用" tabindex="-1"><a class="header-anchor" href="#_1-3-uwsgi-安装使用" aria-hidden="true">#</a> 1.3 uWSGI 安装使用</h3>
<ul>
<li>
<p>安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip <span class="token function">install</span> uwsgi

<span class="token comment"># ... or if you want to install the latest LTS (long term support) release</span>
$ pip <span class="token function">install</span> https://projects.unbit.it/downloads/uwsgi-lts.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>基本测试</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># mkdir uWSGI_test dir and Create a file called test.py:</span>

<span class="token comment"># test.py</span>
<span class="token keyword">def</span> <span class="token function">application</span><span class="token punctuation">(</span>env<span class="token punctuation">,</span> start_response<span class="token punctuation">)</span><span class="token punctuation">:</span>
    start_response<span class="token punctuation">(</span><span class="token string">'200 OK'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">'Content-Type'</span><span class="token punctuation">,</span><span class="token string">'text/html'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">b"Hello World"</span><span class="token punctuation">]</span> <span class="token comment"># python3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>运行:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ uwsgi <span class="token parameter variable">--http</span> :8000 <span class="token parameter variable">--plugin</span> python --wsgi-file test.py
<span class="token comment">##  --plugin python 告诉uWSGI 用python插件，防止出错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>用 <code v-pre>uwsgi</code> 启动 <strong>Django</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 项目名.wsgi 是 Django 工程的项目名</span>
$ uwsgi <span class="token parameter variable">--http</span> :8000 <span class="token parameter variable">--module</span> <span class="token parameter variable">--plugin</span> python 项目名.wsgi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>创建，配置 <code v-pre>uwsgi</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># touch application-uwsgi.ini</span>
$ <span class="token function">cat</span> application-uwsgi.ini

<span class="token punctuation">[</span>uwsgi<span class="token punctuation">]</span>

http <span class="token operator">=</span> :9000 								<span class="token comment"># 与 Nginx 的 socket通信的进程</span>
socket <span class="token operator">=</span> <span class="token number">127.0</span>.0.1:8001 					<span class="token comment"># 告诉 uWSGI 项目 BASE_DIR</span>

chdir <span class="token operator">=</span> /home/igarashi/CODE/Application		<span class="token comment"># 上面写了绝对路径，此时直接写路径即可</span>

wsgi-file <span class="token operator">=</span> Application/wsgi.py

processes <span class="token operator">=</span> <span class="token number">4</span> 								<span class="token comment"># 启 4个 进程</span>
threads <span class="token operator">=</span> <span class="token number">2</span>									<span class="token comment"># 每个进程 启 俩 线程</span>

stats <span class="token operator">=</span> <span class="token number">127.0</span>.0.1:9191						<span class="token comment"># 监控命令，监控后台，启动后会多占个进程</span>
vacuum          <span class="token operator">=</span> <span class="token boolean">true</span>						<span class="token comment"># 退出时把相关的环境、环境变量清除掉</span>

daemonize      <span class="token operator">=</span> /var/log/日志.log		<span class="token comment"># 日志</span>

<span class="token comment"># 启动：</span>
$ /usr/local/bin/uwsgi <span class="token parameter variable">--ini</span> application-uwsgi.ini

<span class="token comment">## 查看uwsgi启动的进程</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> uwsgi

<span class="token comment">## 全库搜索和uwsgi相关的包等等</span>
<span class="token function">sudo</span> <span class="token function">apt-cache</span> search uwsgi <span class="token operator">|</span><span class="token function">grep</span> uwsgi

<span class="token comment">## 安装uwsgi的监控</span>
pip3 <span class="token function">install</span> uwsgitop  <span class="token comment"># uwsgitop:9191 端口 进行监控</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_1-4-配置-nginx" tabindex="-1"><a class="header-anchor" href="#_1-4-配置-nginx" aria-hidden="true">#</a> 1.4 配置 Nginx</h3>
<p>安装配置见：<RouterLink to="/tool/Nginx/Nginx%E5%9F%BA%E7%A1%80.html#_2-%E5%AE%89%E8%A3%85">Nginx 基础</RouterLink></p>
<ul>
<li>
<p>默认为 <code v-pre>/etc/nginx/sites-enabled/default</code> 文件的配置</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>server {
    <span class="token comment"># the port your site will be served on</span>
    listen      80;
    <span class="token comment"># the domain name it will serve for</span>
    server_name 127.0.0.1; # substitute your machine's IP address or FQDN
    charset     utf-8;

    <span class="token comment"># max upload size</span>
    client_max_body_size 75M;   # adjust to taste

    <span class="token comment"># Django media</span>
    location /media  {
        alias /home/ubuntu/blog/media;  # your Django project's media files - amend as required
    }

    location /static {
        alias /home/ubuntu/blog/static; # your Django project's static files - amend as required
    }

    <span class="token comment"># Finally, send all non-media requests to the Django server.</span>
    location / {
        include     uwsgi_params; # the uwsgi_params file you installed
        uwsgi_pass 127.0.0.1:8001;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>收集 <strong>Django</strong> 静态文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Django setting.py</span>
STATIC_ROOT <span class="token operator">=</span> os.path.join<span class="token punctuation">(</span>BASE_DIR, <span class="token string">"static/"</span><span class="token punctuation">)</span>
DEBUG <span class="token operator">=</span> False
ALLOWED_HOSTS <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'*'</span><span class="token punctuation">]</span>

<span class="token comment"># 收集</span>
$ python manage.py collectstatic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


