<template><div><h1 id="tornado-框架" tabindex="-1"><a class="header-anchor" href="#tornado-框架" aria-hidden="true">#</a> Tornado 框架</h1>
<p><a href="https://www.osgeo.cn/tornado/" target="_blank" rel="noopener noreferrer">Tornado<ExternalLinkIcon/></a> | <a href="http://shouce.jb51.net/tornado/ch1.html" target="_blank" rel="noopener noreferrer">Book<ExternalLinkIcon/></a></p>
<h3 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1.简介</h3>
<h4 id="_1-1-各类框架的比较" tabindex="-1"><a class="header-anchor" href="#_1-1-各类框架的比较" aria-hidden="true">#</a> 1.1 各类框架的比较</h4>
<p><strong>Django</strong> 和 <strong>Flask</strong>：传统老牌框架，一个大而全，一个小而精，但并发低</p>
<p><strong>Tornado</strong> 性能高，在底层 <code v-pre>IO</code> 处理机制上和 <code v-pre>Django</code> 有很大区别：</p>
<ul>
<li><code v-pre>Django</code>、<code v-pre>Flask</code>则是传统模型，即：<strong>IO 阻塞</strong> 模型
<ul>
<li>好处是代码容易理解，简单</li>
</ul>
</li>
<li><code v-pre>tronado</code>、<code v-pre>gevent</code>、<code v-pre>asyncio</code>、<code v-pre>aiohttp</code>底层都是 <strong>事件循环</strong> + <strong>协程</strong></li>
</ul>
<p>因此，未来基于 <code v-pre>asyncio</code> 的框架，大概率成为主流</p>
<h4 id="_1-2-模型" tabindex="-1"><a class="header-anchor" href="#_1-2-模型" aria-hidden="true">#</a> 1.2 模型</h4>
<ul>
<li>
<p><strong>Twisted 模型</strong>：</p>
<ul>
<li>
<p><strong>NodeJs</strong> 借鉴这种魔性，基于回调，适用于高 <code v-pre>IO</code> 低 <code v-pre>CPU</code> 的场景</p>
</li>
<li>
<p>这种模型实现了一个基于回调 <code v-pre>http server</code>(<em>event loop</em>)，即：每个请求都被注册成一个异步函数，然后主循环来不断循环监听</p>
</li>
<li>
<p>有很明显的 <strong>缺点</strong>：一旦应用程序有大量的 <strong>CPU</strong> 计算，<strong>该线程大概率阻塞</strong>，所有的请求都会受到影响，如果应用在处理一个请求时崩溃，所有的请求也都会受影响</p>
</li>
</ul>
</li>
<li>
<p><strong><code v-pre>asyncio</code>、<code v-pre>tornado</code>、<code v-pre>gevent</code> 模型</strong></p>
<ul>
<li>回调写法不易读也易出错，于是将回调的写法改成了同步的写法</li>
<li>这种模型与 <strong>NodeJS</strong> 的 <code v-pre>koa2</code> 和 <strong>GO</strong> 的 <code v-pre>net/http</code> 差不多</li>
<li><code v-pre>asyncio</code> 提供了类似 <strong>GO</strong> 的 <code v-pre>goroutine</code> 的功能和写法，而 <code v-pre>aiohttp</code> 则提供了类似 <strong>GO</strong> 中 <code v-pre>net/http</code> 的 <code v-pre>http</code> 处理库</li>
</ul>
</li>
</ul>
<p><code v-pre>tornado</code> 底层正在逐步抛弃原有设计，直接使用 <code v-pre>asyncio</code> 的底层，专注实现 <strong>Web</strong> 框架本身</p>
<h3 id="_2-使用" tabindex="-1"><a class="header-anchor" href="#_2-使用" aria-hidden="true">#</a> 2. 使用</h3>
<h4 id="_2-1-安装" tabindex="-1"><a class="header-anchor" href="#_2-1-安装" aria-hidden="true">#</a> 2.1 安装</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> tornado
<span class="token comment"># 推荐在类UNIX系统下使用，windows仅作为开发环境</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-示例" tabindex="-1"><a class="header-anchor" href="#_2-2-示例" aria-hidden="true">#</a> 2.2 示例</h3>
<p>执行 <code v-pre>python demo.py</code> 启动 <code v-pre>demo</code></p>
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
<li><code v-pre>tornado.web.RequestHandler</code>：和 <code v-pre>Django</code> 不同，它把请求和响应全部封装到 <code v-pre>RequestHandler</code> 里，因此所有的请求全部继承 <code v-pre>RequestHandler</code></li>
</ul>
</div></template>


