<template><div><h1 id="web-框架" tabindex="-1"><a class="header-anchor" href="#web-框架" aria-hidden="true">#</a> Web 框架</h1>
<h3 id="_1-web-通信" tabindex="-1"><a class="header-anchor" href="#_1-web-通信" aria-hidden="true">#</a> 1. Web 通信</h3>
<p><strong>Web</strong> 框架的通信本质和 <code v-pre>socket</code> 类似，是网络通信，无非是走 <code v-pre>http</code> 协议，或是什么其他协议，故可以当做一个 <code v-pre>socket</code> 服务端，而浏览器则视为 <code v-pre>socket</code> 客户端</p>
<p>那么，<strong>Web 应用</strong> 流程为：</p>
<ul>
<li>浏览器（<em>客户端</em>）发 个 <strong>HTTP</strong> 请求</li>
<li>服务器（<strong>Web 框架</strong>）收到请求，并处理一些列逻辑（<strong>*SQL</strong>、计算、数据处理等*）</li>
<li>生成 <strong>HTML</strong> 文档（<em>若 <strong>SSR</strong> 渲染</em>）</li>
<li>将 <strong>HTML</strong> 作为响应的 <code v-pre>body</code> 返回给浏览器</li>
<li>浏览器收到响应，取到 <strong>HTML</strong> 文档并解析</li>
</ul>
<blockquote>
<p>避免开发者造轮子浪费时间，接触 <strong>TCP</strong> 连接、解析并处理复杂的 <strong>HTML</strong> 通信，只需专注业务实现，<strong>因此诞生了框架</strong>，方便 <strong>Web 应用</strong> 开发</p>
</blockquote>
<h4 id="_1-1-简易-socket-通信示例" tabindex="-1"><a class="header-anchor" href="#_1-1-简易-socket-通信示例" aria-hidden="true">#</a> 1.1 简易 <code v-pre>socket</code> 通信示例</h4>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-内置-wsgi" tabindex="-1"><a class="header-anchor" href="#_2-内置-wsgi" aria-hidden="true">#</a> 2. 内置 WSGI</h3>
<p><strong>WSGI</strong>（<em>Web Server Gateway Interface</em>）网络服务网关接口，是一种规范，定义了 <strong>Web 应用</strong> 与 <strong>Web Server</strong> 间的接口格式（<em>通信规范/协议</em>）</p>
<p>组成部分</p>
<ul>
<li><strong>WSGI server：</strong> 负责从客户端接收请求，将 <code v-pre>request</code> 转发给 <code v-pre>application</code>，将 <code v-pre>application</code> 返回的 <code v-pre>response</code> 返回给客户端</li>
<li><strong>WSGI application：</strong>
<ul>
<li>接收由 <code v-pre>server</code> 转发的 <code v-pre>request</code></li>
<li>处理请求，并将处理结果返回给 <code v-pre>server</code></li>
<li>包括多个栈式的中间件（<code v-pre>middlewares</code>）同时实现 <code v-pre>server</code> 和 <code v-pre>application</code></li>
<li>因此在 <code v-pre>WSGI</code> 服务器 与 <code v-pre>WSGI</code> 应用 中间起调度作用</li>
</ul>
</li>
</ul>
<p>利用 <code v-pre>Python</code> 标准库 <code v-pre>wsgiref</code>，模拟个 <code v-pre>web</code> 框架玩具</p>
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
<p>开发场景不会用 <code v-pre>wsgiref</code> 这种模块写应用，而是使用 <a href="/back_end/python/framework/django/django%E5%9F%BA%E7%A1%80" target="_blank" rel="noopener noreferrer">Django<ExternalLinkIcon/></a> 等框架 + <a href="/operations/nginx/%E5%BA%94%E7%94%A8%E9%83%A8%E7%BD%B2#11-uwsgi-%E6%9C%8D%E5%8A%A1%E5%99%A8" target="_blank" rel="noopener noreferrer">uWSGI 服务器<ExternalLinkIcon/></a></p>
</div></template>


