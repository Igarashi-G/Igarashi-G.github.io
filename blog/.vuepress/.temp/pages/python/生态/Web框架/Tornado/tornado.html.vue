<template><div><p><strong>Python Tornado</strong> 框架概述</p>
<!--more-->
<p><a href="https://www.osgeo.cn/tornado/" target="_blank" rel="noopener noreferrer">Tornado<ExternalLinkIcon/></a> | <a href="http://shouce.jb51.net/tornado/ch1.html" target="_blank" rel="noopener noreferrer">Book<ExternalLinkIcon/></a></p>
<h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2>
<h3 id="_1-1-各类框架的比较" tabindex="-1"><a class="header-anchor" href="#_1-1-各类框架的比较" aria-hidden="true">#</a> 1.1 各类框架的比较</h3>
<p><strong>Django</strong> 和 <strong>Flask</strong>：传统老牌框架，一个大而全，一个小而精，但并发低</p>
<p><strong>Tornado</strong> 性能高，在底层 <strong>IO</strong> 处理机制上和 <strong>Django</strong> 有很大区别</p>
<ul>
<li><strong>Django</strong>、<strong>Flask</strong>则是传统的 <strong>IO 阻塞</strong> 模型，目前也有异步，生态略差
<ul>
<li>好处是代码容易理解，简单</li>
</ul>
</li>
<li><strong>tronado</strong>、<strong>gevent</strong>、<strong>asyncio</strong>、<strong>aiohttp</strong>底层都是 <strong>事件循环</strong> + <strong>协程</strong></li>
</ul>
<p>因此，未来基于 <strong>asyncio</strong> 的框架，大概率成为主流</p>
<h4 id="_1-2-模型" tabindex="-1"><a class="header-anchor" href="#_1-2-模型" aria-hidden="true">#</a> 1.2 模型</h4>
<ul>
<li>
<p><strong>Twisted 模型：</strong></p>
<ul>
<li>
<p><strong>NodeJs</strong> 借鉴于此，但是 <strong>基于回调的机制</strong>，适用于高 <strong>IO</strong> 低 <strong>CPU</strong> 场景</p>
</li>
<li>
<p>这种模型实现了一个基于回调 <strong>http server （<em>event loop：</em> <em>每个请求都被注册成一个异步函数，然后主循环来不断循环监听</em>）</strong></p>
</li>
<li>
<p><strong>缺点：</strong> 一旦应用程序有大量的 <strong>CPU</strong> 计算，<strong>线程大概率阻塞</strong>，所有的请求都会受到影响，如果应用在处理一个请求时崩溃，<strong>所有请求也都会受影响</strong></p>
</li>
</ul>
</li>
<li>
<p><strong>asyncio、tornado、gevent 模型：</strong></p>
<ul>
<li><strong>回调即不易读又易出错</strong>，于是此类基于协程的框架，将回调的写法改为同步</li>
<li>这种模型与 <strong>nodejs</strong> 的 <strong>koa2</strong> 或是 <strong>GO</strong> 的 <strong>net/http</strong> 差不多</li>
<li><strong>asyncio</strong> 提供了类似 <strong>GO</strong> 的 <strong>goroutine</strong> 的功能和写法，而 <strong>aiohttp</strong> 则提供了类似 <strong>GO</strong> 中 <strong>net/http</strong> 的 <strong>http</strong> 处理库</li>
</ul>
</li>
</ul>
<p><strong>tornado</strong> 底层正在逐步抛弃原有设计，直接使用 <strong>asyncio</strong> 的底层，专注实现 <strong>Web</strong> 框架本身</p>
<h2 id="_2-基础使用" tabindex="-1"><a class="header-anchor" href="#_2-基础使用" aria-hidden="true">#</a> 2. 基础使用</h2>
<h3 id="_2-1-安装" tabindex="-1"><a class="header-anchor" href="#_2-1-安装" aria-hidden="true">#</a> 2.1 安装</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 推荐在类UNIX系统下使用，windows仅作为开发环境</span>
$ pip <span class="token function">install</span> tornado
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-示例" tabindex="-1"><a class="header-anchor" href="#_2-2-示例" aria-hidden="true">#</a> 2.2 示例</h3>
<p>执行 <strong><code v-pre>python demo.py</code></strong> 启动</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> tornado<span class="token punctuation">.</span>web
<span class="token keyword">import</span> tornado<span class="token punctuation">.</span>ioloop

<span class="token keyword">class</span> <span class="token class-name">IndexHandler</span><span class="token punctuation">(</span>tornado<span class="token punctuation">.</span>web<span class="token punctuation">.</span>RequestHandler<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">"""主页处理类"""</span>

    <span class="token keyword">def</span> <span class="token function">get</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">"hello tornado"</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">post</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    app <span class="token operator">=</span> tornado<span class="token punctuation">.</span>web<span class="token punctuation">.</span>Application<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">r"/"</span><span class="token punctuation">,</span> IndexHandler<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    app<span class="token punctuation">.</span>listen<span class="token punctuation">(</span><span class="token number">8000</span><span class="token punctuation">)</span>
    tornado<span class="token punctuation">.</span>ioloop<span class="token punctuation">.</span>IOLoop<span class="token punctuation">.</span>current<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>tornado.web.RequestHandler：</strong> 和 <strong>Django</strong> 不同，它把请求和响应全部封装到 <strong>RequestHandler</strong> 里，因此所有的请求全部继承 <strong>RequestHandler</strong></li>
</ul>
<p>后续查阅 <strong>文档 &amp; github</strong>：</p>
<p><a href="https://www.tornadoweb.org/" target="_blank" rel="noopener noreferrer">Tornado<ExternalLinkIcon/></a>  （<em>最全最新</em>） |  <a href="https://github.com/tornadoweb/tornado" target="_blank" rel="noopener noreferrer">Github: tornado<ExternalLinkIcon/></a></p>
</div></template>


