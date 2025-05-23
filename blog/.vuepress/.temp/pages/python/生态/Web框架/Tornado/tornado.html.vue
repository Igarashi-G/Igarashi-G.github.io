<template><div><p><strong>Python Tornado</strong> 框架概述</p>
<!--more-->
<p><a href="https://www.osgeo.cn/tornado/" target="_blank" rel="noopener noreferrer">Tornado</a> | <a href="http://shouce.jb51.net/tornado/ch1.html" target="_blank" rel="noopener noreferrer">Book</a></p>
<h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介"><span>1. 简介</span></a></h2>
<h3 id="_1-1-各类框架的比较" tabindex="-1"><a class="header-anchor" href="#_1-1-各类框架的比较"><span>1.1 各类框架的比较</span></a></h3>
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
<h4 id="_1-2-模型" tabindex="-1"><a class="header-anchor" href="#_1-2-模型"><span>1.2 模型</span></a></h4>
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
<h2 id="_2-基础使用" tabindex="-1"><a class="header-anchor" href="#_2-基础使用"><span>2. 基础使用</span></a></h2>
<h3 id="_2-1-安装" tabindex="-1"><a class="header-anchor" href="#_2-1-安装"><span>2.1 安装</span></a></h3>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 推荐在类UNIX系统下使用，windows仅作为开发环境</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tornado</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-示例" tabindex="-1"><a class="header-anchor" href="#_2-2-示例"><span>2.2 示例</span></a></h3>
<p>执行 <strong><code v-pre>python demo.py</code></strong> 启动</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> tornado.web</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> tornado.ioloop</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> IndexHandler</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">tornado</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">web</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">RequestHandler</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    """主页处理类"""</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">write</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"hello tornado"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> post</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> __name__</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '__main__'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    app </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> tornado.web.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Application</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">([(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">r</span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75">"/"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, IndexHandler)])</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    app.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">listen</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">8000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    tornado.ioloop.IOLoop.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">current</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">start</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>tornado.web.RequestHandler：</strong> 和 <strong>Django</strong> 不同，它把请求和响应全部封装到 <strong>RequestHandler</strong> 里，因此所有的请求全部继承 <strong>RequestHandler</strong></li>
</ul>
<p>后续查阅 <strong>文档 &amp; github</strong>：</p>
<p><a href="https://www.tornadoweb.org/" target="_blank" rel="noopener noreferrer">Tornado</a>  （<em>最全最新</em>） |  <a href="https://github.com/tornadoweb/tornado" target="_blank" rel="noopener noreferrer">Github: tornado</a></p>
</div></template>


