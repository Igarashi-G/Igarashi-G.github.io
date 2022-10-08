<template><div><h1 id="协程-coroutine" tabindex="-1"><a class="header-anchor" href="#协程-coroutine" aria-hidden="true">#</a> 协程 Coroutine</h1>
<Alert type="info"> **协程**不是计算机提供的，而是<Badge type="queen">程序员创造</Badge> 的</Alert><h2 id="一、协程概念" tabindex="-1"><a class="header-anchor" href="#一、协程概念" aria-hidden="true">#</a> 一、协程概念：</h2>
<h3 id="_1-1-为什么要有协程" tabindex="-1"><a class="header-anchor" href="#_1-1-为什么要有协程" aria-hidden="true">#</a> 1.1 为什么要有协程？</h3>
<Font type="error">痛点：</Font><ul>
<li><strong>同步编程</strong> 的并发性不高</li>
<li><strong>多进程编程</strong> 效率受 CPU 核数限制，当任务数量远大于 CPU 核数时，执行效率会降低（分片）</li>
<li><strong>多线程编程</strong> 需要线程之间的通信，而且需要<strong>锁机制</strong>来防止<strong>共享变量</strong>被不同线程乱改，有<strong>GIL(全局解释器锁)</strong> 实际上也无法做到真正的并行</li>
</ul>
<Font type="info">需求：</Font><ul>
<li>可不可以采用<strong>同步</strong>的方式来编写<strong>异步功能</strong>代码？</li>
<li>能不能只用<strong>单线程</strong>就能做到不同任务间的切换？
<ul>
<li>这样就没有了<strong>线程切换的时间消耗</strong></li>
<li>也不用使用<strong>锁机制来削弱多任务并发效率</strong></li>
</ul>
</li>
<li>对于<strong>IO 密集型</strong>任务，可否有更高的处理方式来节省 CPU 等待时间？</li>
</ul>
<Font type="queen">结果：</Font><p>产生协程，<strong>多进程和多线程是内核级别</strong>的程序，而协程是<strong>函数级别</strong>的程序，可以通过程序员自己控制，因此：</p>
<ul>
<li>仅定义一个单线程的 <code v-pre>loop</code>，所有 <code v-pre>event </code>均在一个 <code v-pre>loop</code> 中</li>
<li>是否需要锁机制：<strong>否</strong></li>
<li>实现机制：<strong>事件循环</strong> + <strong>协程</strong></li>
<li>总耗时：<strong>最耗时</strong> 事件的时间</li>
<li>应用场景：**IO 密集型 **任务</li>
</ul>
<h3 id="_1-2-什么是协程" tabindex="-1"><a class="header-anchor" href="#_1-2-什么是协程" aria-hidden="true">#</a> 1.2 什么是协程</h3>
<p><strong>协程</strong>，又称<code v-pre>微线程</code>|<code v-pre>纤程</code>。英文：<strong>Coroutine</strong> 可揉挺</p>
<br/>
<p>一句话说明：协程是一种 <code v-pre>用户态</code> 的 <code v-pre>轻量级</code> <strong>线程</strong>。通过一个<code v-pre>线程</code>，实现代码块相互切换执行，实现麻烦但效率极佳。</p>
<ul>
<li>
<p><strong>用户态</strong>：程序员<strong>自己控制什么时候切换</strong>。利用串行，便不存在<code v-pre>锁</code>了（也<code v-pre>不会有数据不安全</code>的情况），因此协程好用的多。</p>
</li>
<li>
<p><strong>轻量级</strong>：实质上不是利用 CPU 轮询执行，而是用一个线程进行切换，无需 CPU 控制（因此协程说白了是一个单线程）</p>
</li>
</ul>
<br/>
<Alert type="miku">以前<Font type="queen">在系统里</Font>开线程，避免 IO，实现并发。 现在<Font type="queen">在一个线程里</Font>切换阻塞代码，避免 IO，实现并发</Alert><h3 id="_1-3-协程的优缺点" tabindex="-1"><a class="header-anchor" href="#_1-3-协程的优缺点" aria-hidden="true">#</a> 1.3 协程的优缺点</h3>
<h4 id="协程の好处" tabindex="-1"><a class="header-anchor" href="#协程の好处" aria-hidden="true">#</a> 协程の好处</h4>
<ul>
<li>
<ol>
<li>
<p>无需像<code v-pre>线程</code>一样需要上下文切换的开销</p>
<blockquote>
<p>例如：执行 100 个字节码，若是计算密集型任务，无 IO 阻塞则会进行<strong>大量的切换</strong>，CPU 资源大幅消耗</p>
</blockquote>
</li>
</ol>
</li>
<li>
<ol start="2">
<li>
<p>无需有原子操作的<code v-pre>锁定</code>及<code v-pre>同步</code>的开销</p>
<blockquote>
<Font type="info" fsize="ss">原子操作(atomic operation) :</Font><ul>
<li>
<p>是不需要<code v-pre>synchronized(同步)</code>的</p>
</li>
<li>
<p>是不会被<code v-pre>线程调度</code>机制打断操作的</p>
<blockquote>
<p>这种操作一旦开始，就一直运行到结束，中间不会有任何 <code v-pre>context switch</code> （上下文切换：切换到另一个线程）</p>
</blockquote>
</li>
<li>
<p>原子操作可以是一个步骤，也可以是多个操作步骤，但是其顺序不能被打乱，不能被切割（只执行部分）一系列操作是一个整体</p>
</li>
</ul>
</blockquote>
</li>
</ol>
</li>
<li>
<ol start="3">
<li>方便切换控制流，简化编程模型</li>
</ol>
</li>
<li>
<ol start="4">
<li>
<p>高并发 + 高扩展性 + 低成本：</p>
<blockquote>
<p>一个 CPU 支持上万的协程都不是问题（理论无限大）。所以很适合用于高并发处理。（因此利用的好完全可以替代线程，效率奇高）</p>
</blockquote>
</li>
</ol>
</li>
</ul>
<h4 id="协程の缺点" tabindex="-1"><a class="header-anchor" href="#协程の缺点" aria-hidden="true">#</a> 协程の缺点</h4>
<ul>
<li>
<ol>
<li>
<p>无法利用<strong>多核</strong>资源：</p>
<blockquote>
<p>协程的本质是个<code v-pre>单线程</code>，它不能同时将 CPU 的多核利用，协程需要和<code v-pre>进程</code> 配合才能运行在多 CPU 上</p>
<ul>
<li>当然我们日常所编写的绝大部分应用都没有这个必要，除非是 cpu 密集型应用。</li>
</ul>
</blockquote>
</li>
</ol>
</li>
<li>
<ol start="2">
<li>
<p><strong>线程阻塞</strong> 操作<code v-pre>IO Blocking</code>时会<strong>阻塞</strong>掉整个程序</p>
<blockquote>
<p>因此<strong>一处协程、处处协程</strong>，使用了 <code v-pre>async/await</code> 便所有的 IO 函数都应该使用 <code v-pre>async/await</code>，不然该程序的同步 IO 部分就会<strong>全局阻塞</strong>，影响性能</p>
</blockquote>
</li>
</ol>
</li>
</ul>
<h2 id="二、协程进化史" tabindex="-1"><a class="header-anchor" href="#二、协程进化史" aria-hidden="true">#</a> 二、协程进化史：</h2>
<p>实现前先给协程一个<code v-pre>标准定义</code>，即符合什么条件就能称之为<code v-pre>协程</code>：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token list punctuation">1.</span> 必须在只有一个<span class="token code-snippet code keyword">`单线程`</span>里实现并发

<span class="token list punctuation">2.</span> 修改共享数据不需加锁

<span class="token list punctuation">3.</span> 用户程序里自己保存多个控制流的上下文栈

<span class="token list punctuation">4.</span> 一个协程遇到 IO 操作自动切换到其它协程
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现方式有以下几种：</p>
<blockquote>
<ul>
<li>生成器 <code v-pre>yield</code> 关键字</li>
<li><code v-pre>greenlet/gevent</code> 早期模块</li>
<li><code v-pre>yield from</code> 实现</li>
<li><code v-pre>asyncio</code>装饰器<Badge>py3.4</Badge></li>
<li><code v-pre>async|await</code> 关键字<Badge>py3.5</Badge>[主流实现]</li>
</ul>
</blockquote>
<h3 id="_2-1-yield-生成器实现" tabindex="-1"><a class="header-anchor" href="#_2-1-yield-生成器实现" aria-hidden="true">#</a> 2.1 yield 生成器实现</h3>
<p>因为 <code v-pre>yield</code> 可以实现中断功能，所以起初，协程是用<a href="">生成器</a>来实现的，此时不是 <code v-pre>线程级CPU</code> 的切换，而是 <code v-pre>执行顺序</code> 的切换，但原理依旧</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">yield</span> <span class="token number">1</span>
    <span class="token keyword">yield</span> <span class="token keyword">from</span> func2<span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment"># 切换到func2 执行，并保留上下文</span>
    <span class="token keyword">yield</span> <span class="token number">2</span>


<span class="token keyword">def</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">yield</span> <span class="token number">3</span>
    <span class="token keyword">yield</span> <span class="token number">4</span>


f1 <span class="token operator">=</span> func1<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> item <span class="token keyword">in</span> f1<span class="token punctuation">:</span>		<span class="token comment"># 返回了生成器</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># 1</span>
<span class="token comment"># 3</span>
<span class="token comment"># 4</span>
<span class="token comment"># 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><Alert type="error">**注**： 此时的生成器主要用来解决占存大量数据问题，<Font type="info" fsize="ss">并没有实现遇到<Font type="error">IO 阻塞</Font>自动切换</Font></Alert><h3 id="_2-2-greenlet-实现协程" tabindex="-1"><a class="header-anchor" href="#_2-2-greenlet-实现协程" aria-hidden="true">#</a> 2.2 greenlet 实现协程</h3>
<p>是一个用 <code v-pre>c</code> 实现的 <code v-pre>协程模块</code>，相比与<code v-pre>python</code>自带的<code v-pre>yield</code>，它能在任意函数之间随意切换，而不需把这个函数先声明为 <code v-pre>generator|生成器</code></p>
<p>安装 <code v-pre>greenlet</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> greenlet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> greenlet <span class="token keyword">import</span> greenlet


<span class="token keyword">def</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>            <span class="token comment"># 第2步：打印1</span>
    gr2<span class="token punctuation">.</span>switch<span class="token punctuation">(</span><span class="token punctuation">)</span>        <span class="token comment"># 第3步：切换到 func2 函数</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>            <span class="token comment"># 第6步：打印2</span>
    gr2<span class="token punctuation">.</span>switch<span class="token punctuation">(</span><span class="token punctuation">)</span>        <span class="token comment"># 第7步：切换到 func2 函数，从上一次位置继续</span>


<span class="token keyword">def</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>            <span class="token comment"># 第4步：打印3</span>
    gr1<span class="token punctuation">.</span>switch<span class="token punctuation">(</span><span class="token punctuation">)</span>        <span class="token comment"># 第5步：切换到 func1 函数，从上一次位置继续</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>            <span class="token comment"># 第8步：打印4</span>


gr1 <span class="token operator">=</span> greenlet<span class="token punctuation">(</span>func1<span class="token punctuation">)</span>
gr2 <span class="token operator">=</span> greenlet<span class="token punctuation">(</span>func2<span class="token punctuation">)</span>

gr1<span class="token punctuation">.</span>switch<span class="token punctuation">(</span><span class="token punctuation">)</span>            <span class="token comment"># 第1步：执行 func1 函数</span>

<span class="token comment">## 输出结果:</span>
<span class="token comment"># 1</span>
<span class="token comment"># 3</span>
<span class="token comment"># 2</span>
<span class="token comment"># 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与生成器相同，此时未实现遇见 <strong>IO 阻塞</strong> 自动切换，这在 <a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/%E5%BC%82%E6%AD%A5%E5%9B%9E%E6%BA%AF#%E9%99%84%EF%BC%9A%E4%BD%BF%E7%94%A8%E4%B8%8A%E5%8F%A4%E7%A5%9E%E5%99%A8gevent%E5%B9%B6%E5%8F%91" target="_blank" rel="noopener noreferrer">gevent<ExternalLinkIcon/></a> 中实现了<code v-pre>sleep</code>自动切换</p>
<h3 id="_2-3-yield-from-和装饰器实现" tabindex="-1"><a class="header-anchor" href="#_2-3-yield-from-和装饰器实现" aria-hidden="true">#</a> 2.3 yield from 和装饰器实现</h3>
<p><strong><a href="">yield from</a></strong> 和 <strong>@asyncio.coroutine</strong> 是官方<Badge>python 3.4</Badge>之后专门提供用于实现<code v-pre>异步I/O</code>的模块</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio


<span class="token decorator annotation punctuation">@asyncio<span class="token punctuation">.</span>coroutine</span>	<span class="token comment"># 装饰一下，变为协程函数</span>
<span class="token keyword">def</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token keyword">from</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>	<span class="token comment"># 当遇到IO操作时，会自动化切换到tasks中的其他任务执行</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@asyncio<span class="token punctuation">.</span>coroutine</span>
<span class="token keyword">def</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token keyword">from</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>	<span class="token comment"># 当遇到IO操作时，会自动化切换到tasks中的其他任务执行</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>


tasks <span class="token operator">=</span> <span class="token punctuation">[</span>
    asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>func1<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>func2<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">]</span>	<span class="token comment"># 打包任务</span>

loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>asyncio<span class="token punctuation">.</span>wait<span class="token punctuation">(</span>tasks<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># 1</span>
<span class="token comment"># 3</span>
<span class="token comment"># 2</span>
<span class="token comment"># 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>以上为基于生成器的协程，<strong>已弃用</strong> 并计划在 Python 3.10 中移除。</p>
</blockquote>
<ul>
<li><code v-pre>@asyncio.coroutine</code> 装饰器是协程函数的标志，等同下文 <code v-pre>async</code></li>
<li><code v-pre>yield from</code> 等同下文 <code v-pre>await</code></li>
</ul>
<h3 id="_2-4-async-await-实现" tabindex="-1"><a class="header-anchor" href="#_2-4-async-await-实现" aria-hidden="true">#</a> 2.4 async/await 实现</h3>
<p>把上文的 <code v-pre>装饰器</code> 替换为 <code v-pre>async</code> , <code v-pre> yield from</code> 替换为 <code v-pre>await</code> 即可</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体见<a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/asyncio%E5%9F%BA%E7%A1%80" target="_blank" rel="noopener noreferrer">异步 I/O<ExternalLinkIcon/></a></p>
<h3 id="_2-5-协程本质" tabindex="-1"><a class="header-anchor" href="#_2-5-协程本质" aria-hidden="true">#</a> 2.5 协程本质</h3>
<h5 id="本质" tabindex="-1"><a class="header-anchor" href="#本质" aria-hidden="true">#</a> <strong>[本质]</strong>：</h5>
<ul>
<li>协程拥有自己的 <code v-pre>寄存器上下文</code> 和 <code v-pre>栈</code> 。协程调度切换时，<strong>将寄存器上下文和栈保存到其他地方</strong>，在切回来的时候，<strong>恢复</strong>先前保存的寄存器上下文和栈。</li>
<li>函数上下文通常是自己的命名空间，而 <a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0#22-python%E4%B8%8A%E4%B8%8B%E6%96%87%E6%BA%90%E7%A0%81" target="_blank" rel="noopener noreferrer"><strong>Cpython</strong><ExternalLinkIcon/></a> 中上下文是用了<code v-pre>结构体</code>来存的，通过 <strong>*f_back</strong> 指针进行<code v-pre>链式</code>构成。</li>
<li><strong>协程</strong>则是用了一个 <a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0#23-%E7%94%9F%E6%88%90%E5%99%A8%E5%AE%9A%E4%B9%89" target="_blank" rel="noopener noreferrer"><strong>宏</strong><ExternalLinkIcon/></a> 来定义，里面存着上下文的<strong>栈帧</strong>，<Font type="queen" fsize="s">通过栈帧就能访问到当时记录的命名空间，从而恢复之前的代码状态继续执行</Font></li>
</ul>
<Alert>协程是<Font type="info">栈结构</Font>实现的，是将<Font type="info">上下文出入栈</Font>的过程，`生成器` 占内存少也是因为<Font type="info">只返回了栈帧</Font>，见[底层实现](/back_end/python/base/异步编程/底层实现#22-python上下文源码)</Alert></div></template>


