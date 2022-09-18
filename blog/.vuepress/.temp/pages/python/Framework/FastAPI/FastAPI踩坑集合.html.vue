<template><div><h1 id="fastapi-踩坑记录" tabindex="-1"><a class="header-anchor" href="#fastapi-踩坑记录" aria-hidden="true">#</a> FastAPI 踩坑记录</h1>
<h3 id="openapi" tabindex="-1"><a class="header-anchor" href="#openapi" aria-hidden="true">#</a> OpenApi</h3>
<p><code v-pre>FastAPI</code> 默认通过 <strong>CDN</strong> 的 <code v-pre>swagger.js</code> 文件，生成对应 <code v-pre>openapi</code> 文档（<em>植入</em>）</p>
<p>若文档出现无法使用，如：变为 <code v-pre>default</code> ，且点不开情况，可能是 <code v-pre>FastAPI</code> 版本升级，更新了 <strong>CDN</strong> 上面的 <code v-pre>swagger.js</code></p>
<ul>
<li>
<p>下载特定版本，本地静态加载 <code v-pre>swagger.js</code></p>
</li>
<li>
<p>一直使用最新的 <code v-pre>FastAPI</code> 版本</p>
</li>
</ul>
<h3 id="文件下载" tabindex="-1"><a class="header-anchor" href="#文件下载" aria-hidden="true">#</a> 文件下载</h3>
<p><code v-pre>Fastapi</code> 返回 <code v-pre>FileResponse</code> 需要：</p>
<ul>
<li>有请求头必须带 <code v-pre>token</code> 验证</li>
<li>指定 <code v-pre>mimetypes</code> 类型，或是返回二进制流等</li>
</ul>
<h3 id="websocket-uvicorn" tabindex="-1"><a class="header-anchor" href="#websocket-uvicorn" aria-hidden="true">#</a> websocket uvicorn</h3>
<blockquote>
<p><strong>场景：</strong></p>
<p>前端通过 <code v-pre>ws://x.x.x.x:xxxx/xxx</code> 的 <code v-pre>websocket</code> 协议请求 <code v-pre>FASTAPI</code> 时</p>
<p>报 <code v-pre>WARNING: Unsupported upgrade request.</code> 的情况</p>
</blockquote>
<p><strong>原因：</strong></p>
<ul>
<li>可能是当前的 <code v-pre>Fastapi</code> 环境中并没有支持 <code v-pre>websocket</code> 的 <code v-pre>upgrade</code> 请求</li>
<li><code v-pre>uvicorn 0.12.2</code> 版本并没有带有 <code v-pre>websockets</code></li>
<li>客户端中的连接 <code v-pre>ws</code> 协议的 <code v-pre>js</code> 代码也报 `handshake: Unexpected response code: 400</li>
</ul>
<p><strong>解决方式：</strong></p>
<p>安装带有 <code v-pre>websockets</code> 功能的 <code v-pre>uvicorn</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip3 uninstall uvicorn  <span class="token comment"># 先把之前安装的不支持websocket的版本给卸载掉</span>

$ pip3 <span class="token function">install</span> uvicorn<span class="token punctuation">[</span>standard<span class="token punctuation">]</span>  <span class="token comment"># 安装[standard]版本的包</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code v-pre>uvicorn[standard]</code> 时有明确的提示，会同时安装 <code v-pre>websockets-8.1</code></p>
<blockquote>
<p><strong>注意</strong></p>
<p>除了安装 <code v-pre>websockets</code> 外，在 <code v-pre>uvloop</code>，<code v-pre>http</code> 协议方面也有变化，会自动增加对 <code v-pre>env</code> 文件的支持， 除此之外，还会对 <code v-pre>--reloader</code> 有影响</p>
<ul>
<li>
<p>之前在进行开发时使用 <code v-pre>unicorn main:app</code> 启动项目添加 <code v-pre>--reloader</code> 选项可以实现项目热更新</p>
</li>
<li>
<p>更换成了 <code v-pre>uvicorn[standard]</code> 后， <code v-pre>--reloader</code> 启动项目会报警</p>
<p><code v-pre>WARNING WatchGodReload detected file change in \*.log</code></p>
<ul>
<li>可能是日志文件在本地开发时放在项目代码里，尝试把日志目录移到项目外</li>
<li>可能导致项目循环重启</li>
</ul>
</li>
<li>
<p>这是因为 <code v-pre>uvicorn[standard]</code> 热加载 依赖于 <code v-pre>watchdog</code> 模块（<em>github 开源项目</em>）</p>
<ul>
<li>采用观察者模式，监控目录下文件、文件夹的变动，从而实现热加载</li>
<li>这个和默认的 <code v-pre>--reloader</code> 的机制也许不同</li>
</ul>
</li>
</ul>
</blockquote>
</div></template>


