<template><div><p><strong>Web</strong> 框架基础，网络框架的本质</p>
<!--more-->
<h2 id="_1-web-通信框架" tabindex="-1"><a class="header-anchor" href="#_1-web-通信框架" aria-hidden="true">#</a> 1. Web 通信框架</h2>
<p><strong>Web</strong> 框架，其网络通信本质是对 <strong>socket</strong> 的封装，然后走 <strong>HTTP1.0/1.1/2.0</strong> 协议，或是什么其他协议，故其本质是一个封装了 <strong>socket</strong> 的服务端，而浏览器则是 <strong>socket</strong> 通信的客户端</p>
<p>那么，<strong>Web 应用</strong> 流程为：</p>
<ul>
<li>
<p>浏览器（<em>客户端</em> ）发起 <strong>HTTP</strong> 请求， 如</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用 netcat 发送 HTTP/2 数据包 HTTP/1.0 | /1.1 ，会发现，百度将整个html资源返回回来</span>
$ <span class="token function">nc</span> www.baidu.com <span class="token number">80</span> 
GET / HTTP/2.0	<span class="token punctuation">\</span>n<span class="token punctuation">\</span>n

<span class="token comment"># 查看网络连接，就会发现此时向百度 14.215.177.38:80 地址建立了TCP连接</span>
<span class="token function">netstat</span> -natp<span class="token operator">|</span><span class="token function">grep</span> <span class="token function">nc</span>
tcp        <span class="token number">0</span>      <span class="token number">0</span> <span class="token number">192.168</span>.3.141:33802     <span class="token number">14.215</span>.177.38:80        ESTABLISHED <span class="token number">14637</span>/nc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>经过一系列 <strong>DNS</strong> 解析和内核网络协议栈</p>
</li>
<li>
<p>服务器（<strong>Web 框架</strong>）收到请求，并处理一些列逻辑（<em><strong>SQL</strong>、计算、数据处理等</em>）</p>
</li>
<li>
<p>生成 <strong>HTML</strong> 文档（<em>若 <strong>SSR</strong> 渲染</em>）</p>
</li>
<li>
<p>将 <strong>HTML</strong> 作为响应的 <strong>Body</strong> 返回给浏览器</p>
</li>
<li>
<p>浏览器收到响应，取到 <strong>HTML</strong> 文档并解析、渲染</p>
</li>
</ul>
<h5 id="为什么设计网络框架" tabindex="-1"><a class="header-anchor" href="#为什么设计网络框架" aria-hidden="true">#</a> <strong>为什么设计网络框架</strong></h5>
<p>避免开发者重复造轮子浪费时间，去接触底层 <strong>TCP</strong> 连接、解析，并处理复杂的 <strong>HTML</strong> 通信，<strong>Web</strong> 框架只需专注业务实现，因此方便了 <strong>Web 应用</strong> 开发，其本质就是对 <strong>socket（<em>套接字</em> ）</strong> 的封装</p>
<p>先参考： <RouterLink to="/python/%E8%AF%AD%E8%A8%80/%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B/Socket.html">socket 通信</RouterLink></p>
<h4 id="_1-1-简易-socket-通信示例" tabindex="-1"><a class="header-anchor" href="#_1-1-简易-socket-通信示例" aria-hidden="true">#</a> 1.1 简易 socket 通信示例</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> socket


<span class="token keyword">def</span> <span class="token function">handle_requset</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">:</span>
    buf <span class="token operator">=</span> client<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span>

    <span class="token comment"># 拿到的是 get 请求发送过来的 http 协议请求头</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>buf<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    client<span class="token punctuation">.</span>sendall<span class="token punctuation">(</span><span class="token builtin">bytes</span><span class="token punctuation">(</span><span class="token string">"HTTP/127.0.0.说明.md 201 OK\r\n\r\n"</span><span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    client<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token string">"&lt;h1 style='color:red'>Hello, Igarashi&lt;/h1>"</span><span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    sock <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>AF_INET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SOCK_STREAM<span class="token punctuation">)</span>
    sock<span class="token punctuation">.</span>bind<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"127.0.0.说明.md"</span><span class="token punctuation">,</span> <span class="token number">8200</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    sock<span class="token punctuation">.</span>listen<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        connection<span class="token punctuation">,</span> address <span class="token operator">=</span> sock<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>
        handle_requset<span class="token punctuation">(</span>connection<span class="token punctuation">)</span>
        connection<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-内置-wsgi" tabindex="-1"><a class="header-anchor" href="#_2-内置-wsgi" aria-hidden="true">#</a> 2. 内置 WSGI</h2>
<p><strong>WSGI</strong>（<em>Web Server Gateway Interface</em>）网络服务 <strong>网关接口</strong>，是一种 <strong>规范</strong>，定义了 <strong>Web 应用</strong> 与 <strong>Web Server</strong> 间的接口格式（<em>通信规范/协议</em>）</p>
<p>组成部分</p>
<ul>
<li><strong>WSGI server：</strong> 负责从客户端接收请求，将 <strong>request</strong> 转发给 <strong>application</strong>，将 <strong>application</strong> 返回的 <strong>response</strong> 返回给客户端</li>
<li><strong>WSGI application：</strong>
<ul>
<li>接收由 <strong>server</strong> 转发的 <strong>request</strong></li>
<li>处理请求，并将处理结果返回给 <strong>server</strong></li>
<li>包括多个栈式的中间件（<em><strong>middlewares</strong></em>）同时实现 <strong>server</strong> 和 <strong>application</strong></li>
<li>因此在 <strong>WSGI</strong> 服务器 与 <strong>WSGI</strong> 应用 中间起调度作用</li>
</ul>
</li>
</ul>
<p>利用 <strong>Python</strong> 标准库 <strong>wsgiref</strong>，模拟一个 <strong>web</strong> 框架玩具</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time

<span class="token keyword">from</span> wsgiref<span class="token punctuation">.</span>simple_server <span class="token keyword">import</span> make_server


<span class="token keyword">def</span> <span class="token function">current_time</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">:</span>
    f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">"current_time.html"</span><span class="token punctuation">,</span> <span class="token string">"rb"</span><span class="token punctuation">)</span>
    data <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
    cur_time <span class="token operator">=</span> time<span class="token punctuation">.</span>ctime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># 拼接到 html 中 -- 用模板语言，这里自创</span>
    data <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">"!cur_time!"</span><span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>cur_time<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 这个后端规定好的替换就类似模板</span>
	<span class="token keyword">return</span> <span class="token punctuation">[</span>data<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">]</span>


<span class="token comment"># 模拟每个路由执行的功能</span>
<span class="token keyword">def</span> <span class="token function">f1</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">b'&lt;h1>Hello Book!&lt;/h1>'</span><span class="token punctuation">]</span>

<span class="token keyword">def</span> <span class="token function">f2</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">b'&lt;h1>Hello Web!&lt;/h1>'</span><span class="token punctuation">]</span>

<span class="token keyword">def</span> <span class="token function">login</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">b'&lt;h1>Hello Login!&lt;/h1>'</span><span class="token punctuation">]</span>


<span class="token keyword">def</span> <span class="token function">routers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">""" 路由层 """</span>
    urlpatters <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token punctuation">(</span><span class="token string">"/book"</span><span class="token punctuation">,</span> f1<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token string">"/web"</span><span class="token punctuation">,</span> f2<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">,</span> login<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token punctuation">(</span><span class="token string">"/current_time"</span><span class="token punctuation">,</span> current_time<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> urlpatters

<span class="token keyword">def</span> <span class="token function">application</span><span class="token punctuation">(</span>environ<span class="token punctuation">,</span> start_response<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">"""
    应用层：封装socket对象
    environ: 封装 HTTP 请求对象
    start_response：发送 HTTP 响应
    """</span>
	start_response<span class="token punctuation">(</span><span class="token string">"200 OK"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">"Content-Type"</span><span class="token punctuation">,</span> <span class="token string">"text/html"</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    path <span class="token operator">=</span> environ<span class="token punctuation">[</span><span class="token string">"PATH_INFO"</span><span class="token punctuation">]</span>
    urlpatters <span class="token operator">=</span> routers<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 找路由，找到执行，找不到404</span>
    func <span class="token operator">=</span> <span class="token boolean">None</span>
    <span class="token keyword">for</span> item <span class="token keyword">in</span> urlpatters<span class="token punctuation">:</span>
        <span class="token keyword">if</span> path <span class="token operator">==</span> item<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
            func <span class="token operator">=</span> item<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
            <span class="token keyword">break</span>
    <span class="token keyword">if</span> func<span class="token punctuation">:</span>
        <span class="token keyword">return</span> func<span class="token punctuation">(</span>environ<span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">b"&lt;h1>404!&lt;h1>"</span><span class="token punctuation">]</span>

<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment"># 构建 http对象，类似 socket，有 http解析能力</span>
    httpd <span class="token operator">=</span> make_server<span class="token punctuation">(</span><span class="token string">"127.0.0.说明.md"</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">,</span> application<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Server HTTP on port 8000 ...."</span><span class="token punctuation">)</span>

    <span class="token comment"># 循环监听 HTTP 请求</span>
    httpd<span class="token punctuation">.</span>serve_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>如上，无需考虑底层 <strong>HTTP</strong> 通信</li>
<li>解耦了 <strong>HTTP</strong> 请求，路由是路由，功能是功能</li>
</ul>
<h4 id="_2-2-uwsgi" tabindex="-1"><a class="header-anchor" href="#_2-2-uwsgi" aria-hidden="true">#</a> 2.2 uWSGI</h4>
<p>开发场景不会用 <strong>wsgiref</strong> 这种模块写应用，而是使用 <a href="/python/%E7%94%9F%E6%80%81/Web%E6%A1%86%E6%9E%B6/Django/Django%E6%A6%82%E8%BF%B0">Django</a> 等框架 + <RouterLink to="/tool/Nginx/%E5%BA%94%E7%94%A8%E9%83%A8%E7%BD%B2.html#_1-1-uwsgi-%E6%9C%8D%E5%8A%A1%E5%99%A8">uWSGI 服务器</RouterLink></p>
</div></template>


