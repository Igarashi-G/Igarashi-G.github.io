<template><div><h1 id="asyncio-——-异步-i-o-基础" tabindex="-1"><a class="header-anchor" href="#asyncio-——-异步-i-o-基础" aria-hidden="true">#</a> asyncio —— 异步 I/O 基础</h1>
<p><a href="https://docs.python.org/zh-cn/3/library/asyncio.html" target="_blank" rel="noopener noreferrer">asyncio API 文档<ExternalLinkIcon/></a></p>
<h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> 1. 概述</h2>
<p><strong>asyncio</strong> 是用来编写 <strong>并发代码</strong> 的库，使用 <code v-pre>async/await</code> 语法。</p>
<p><strong>场景</strong>：被用作多个提供高性能 Python 异步框架的基础，包括网络和网站服务，数据库连接库，分布式任务队列等等。往往是构建 IO 密集型和高层级 结构化 网络代码的最佳选择。</p>
<p><code v-pre>asyncio</code> 提供一组 高层级 API 用于：</p>
<ul>
<li><strong>并发地 运行 Python 协程</strong> 并对其执行过程实现<strong>完全控制</strong></li>
<li>执行 网络 IO 和 IPC</li>
<li>控制 子进程</li>
<li>通过 <a href="">队列</a> 实现 <strong>分布式任务</strong></li>
<li>同步 并发代码</li>
</ul>
<p>此外，还有一些 <strong>低层级 API</strong> 以支持 <strong>库</strong> 和 <strong>框架级别</strong> 的开发者实现：</p>
<ul>
<li>创建和管理事件循环，以提供异步 API 用于网络化， 运行子进程，处理 OS 信号 等等</li>
<li>使用 <code v-pre>transports</code> 实现高效率协议</li>
<li>通过 <code v-pre>async/await</code> 语法 桥接 基于回调的库和代码</li>
</ul>
<h2 id="_2-基础使用" tabindex="-1"><a class="header-anchor" href="#_2-基础使用" aria-hidden="true">#</a> 2. 基础使用</h2>
<Alert type="error">虽然协程**底层就是用生成器实现**的，但不要将 协程 和 生成器 **混淆**</Alert><h3 id="_2-1-事件循环" tabindex="-1"><a class="header-anchor" href="#_2-1-事件循环" aria-hidden="true">#</a> 2.1 事件循环</h3>
<Alert type="warning"> 先理解成一个用来`检测`并`执行`某些代码的 **死循环**</Alert><div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> 以下是伪代码：</span>

task_list = [task1, task2, task3, ...]

while True:
pending_tasks, success_tasks = task_list
for pending_task in pending_tasks:
exec pending_task...
for success_task in success_tasks:
task_list.remove(success_task)
if len(task_list) == 0:
break
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取事件循环并执行：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio

<span class="token comment"># 生成 | 获取 一个事件循环</span>
loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 让事件循环检测任务并执行，直到被执行完</span>
loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>asyncio.get_event_loop():</code> 可以创建一个事件循环（即创建一个<code v-pre>event_loop</code>）每个线程有一个事件循环，主线程调用<code v-pre>get_event_loop</code>时会创建事件循环</p>
</li>
<li>
<p><code v-pre>run_until_complete(future/coroutine)</code> 的特点就像该函数的名字，直到循环事件的 <strong>所有事件都处理完</strong> 才能完整结束，可以将协程注册到事件循环，并启动事件循环
内部会将协程包装成为了一个任务（task）对象。（见下）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>new_task <span class="token operator">=</span> <span class="token keyword">not</span> futures<span class="token punctuation">.</span>isfuture<span class="token punctuation">(</span>future<span class="token punctuation">)</span>     <span class="token comment"># 判断传入的是future还是coroutine</span>

future <span class="token operator">=</span> tasks<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>future<span class="token punctuation">,</span> loop<span class="token operator">=</span>self<span class="token punctuation">)</span> <span class="token comment"># 将传入值 future 用 ensure_future 进行转换为task对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>​</p>
<h3 id="_2-2-快速上手" tabindex="-1"><a class="header-anchor" href="#_2-2-快速上手" aria-hidden="true">#</a> 2.2 快速上手</h3>
<h5 id="什么是协程函数" tabindex="-1"><a class="header-anchor" href="#什么是协程函数" aria-hidden="true">#</a> <strong>什么是协程函数？</strong></h5>
<p><code v-pre>async</code> + <code v-pre>def</code> + 函数名</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="什么是协程对象" tabindex="-1"><a class="header-anchor" href="#什么是协程对象" aria-hidden="true">#</a> <strong>什么是协程对象？</strong></h5>
<ul>
<li>执行 <code v-pre>协成函数()</code> 得到的即是 <code v-pre>协成对象</code>, 一个协程对象就是一个原生可被挂起的函数</li>
<li>属于 <a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/asyncio%E5%9F%BA%E7%A1%80#23-await" target="_blank" rel="noopener noreferrer"><em>awaitable</em><ExternalLinkIcon/></a> 对象，<strong>协程的执行</strong> 可通过调用 <code v-pre>__await__()</code> 并迭代其结果来控制
<ul>
<li>迭代结束会引发 <a href="https://docs.python.org/zh-cn/3/library/exceptions.html#StopIteration" target="_blank" rel="noopener noreferrer"><code v-pre>StopIteration</code><ExternalLinkIcon/></a>，该异常的 <code v-pre>value</code> 属性将存放返回值</li>
</ul>
</li>
<li>协程也具有生成器的 <code v-pre>send</code>、<code v-pre>throw</code>、<code v-pre>close</code> 方法，可参考 <a href="/back_end/python/base/%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/%E7%94%9F%E6%88%90%E5%99%A8" target="_blank" rel="noopener noreferrer">生成器<ExternalLinkIcon/></a>，但区别是 <strong>协程不直接支持迭代</strong>（<code v-pre>for</code> 循环需使用 <a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/asyncio%E5%9F%BA%E7%A1%80#51-%E5%BC%82%E6%AD%A5%E8%BF%AD%E4%BB%A3%E5%99%A8" target="_blank" rel="noopener noreferrer">异步迭代器<ExternalLinkIcon/></a>）</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>ret <span class="token operator">=</span> foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># &lt;coroutine object foo at 0x0000024D1B444848></span>
<span class="token comment"># sys:1: RuntimeWarning: coroutine 'foo' was never awaited</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注：</strong> 执行<code v-pre>协成函数</code>创建的<code v-pre>协成对象</code>，函数内部代码<strong>不会执行</strong></p>
</blockquote>
<p>把<code v-pre>协成对象</code>当成一个<code v-pre>任务</code>，即添加 <strong>Task</strong> 到<code v-pre>事件循环</code>中，即可执行</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Fuck me on github"</span><span class="token punctuation">)</span>
    <span class="token keyword">pass</span>


ret <span class="token operator">=</span> foo<span class="token punctuation">(</span><span class="token punctuation">)</span>

loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>ret<span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># Fuck me on github</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><Font type="info" fsize="m">py3.7 之后，有了更简便的写法</Font><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>ret<span class="token punctuation">)</span> <span class="token comment"># 即可</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>管理 <code v-pre>asyncio</code> 事件循环，<strong>终结异步生成器，并关闭线程池</strong></li>
<li>总会创建一个新的事件循环，并在结束时关闭，用于 <code v-pre>asyncio</code> 程序的<strong>入口</strong></li>
<li>本质还是调用了 <code v-pre>loop.run_until_complete(main)</code>，直到 <a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/asyncio%E5%9F%BA%E7%A1%80#4-future%E5%AF%B9%E8%B1%A1" target="_blank" rel="noopener noreferrer">Future<ExternalLinkIcon/></a> 对象执行完成</li>
</ul>
<blockquote>
<p>注：<code v-pre>asyncio.run()</code> 本质上和声明 <strong>loop</strong> 再执行相同，只是<code v-pre>简化写法</code>而已，理想情况应该只被调用一次</p>
</blockquote>
<h3 id="_2-3-await" tabindex="-1"><a class="header-anchor" href="#_2-3-await" aria-hidden="true">#</a> 2.3 await</h3>
<h4 id="可等待对象-awaitable" tabindex="-1"><a class="header-anchor" href="#可等待对象-awaitable" aria-hidden="true">#</a> <strong>可等待对象(<code v-pre>awaitable</code>)</strong></h4>
<Alert type="info">_可等待_ 对象有**三种:** <Badge>**协程**</Badge><Badge>**任务** </Badge><Badge>**Future**</Badge></Alert><ul>
<li>
<p>能在 <a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/asyncio%E5%9F%BA%E7%A1%80#23-await" target="_blank" rel="noopener noreferrer">await<ExternalLinkIcon/></a> 表达式中使用的对象</p>
</li>
<li>
<p>可等待对象 主要实现了 <code v-pre>__await__()</code>方法</p>
<blockquote>
<p><strong>注：</strong> 带有 <a href="https://docs.python.org/zh-cn/3/library/types.html#types.coroutine" target="_blank" rel="noopener noreferrer"><code v-pre>types.coroutine()</code><ExternalLinkIcon/></a> 或 <a href="https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.coroutine" target="_blank" rel="noopener noreferrer"><code v-pre>asyncio.coroutine()</code><ExternalLinkIcon/></a> 装饰器的生成器返回的 <a href="https://docs.python.org/zh-cn/3/glossary.html#term-generator-iterator" target="_blank" rel="noopener noreferrer">generator iterator<ExternalLinkIcon/></a> 对象也属于可等待对象，但它们并未实现 <a href="https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__await__" target="_blank" rel="noopener noreferrer"><code v-pre>__await__()</code><ExternalLinkIcon/></a>。</p>
</blockquote>
</li>
<li>
<p>从 <code v-pre>async def </code> 函数返回的 <a href="">协程对象</a> 即属于可等待对象，因此可以在其他协程中被等待</p>
</li>
</ul>
<p><strong><code v-pre>object.__await__(self)</code></strong></p>
<blockquote>
<p>用来实现可迭代对象，如：<a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%8D%8F%E7%A8%8B#35-future%E5%AF%B9%E8%B1%A1" target="_blank" rel="noopener noreferrer">asyncio.Future<ExternalLinkIcon/></a> 对象实现了此方法，从而可以和 <code v-pre>await</code> 表达式兼容</p>
</blockquote>
<ul>
<li>
<p>返回值：</p>
<ul>
<li><code v-pre>迭代器: iterator</code>:</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">__await__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>done<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_asyncio_future_blocking <span class="token operator">=</span> <span class="token boolean">True</span>
        <span class="token keyword">yield</span> self  <span class="token comment"># This tells Task to wait for completion.</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>done<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> RuntimeError<span class="token punctuation">(</span><span class="token string">"await wasn't used with future"</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> self<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># May raise too.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>使用 <strong>await</strong> 等待协程返回值：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">io_func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"start io block"</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"end io block"</span><span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Fuck me on github"</span><span class="token punctuation">)</span>

    ret1 <span class="token operator">=</span> <span class="token keyword">await</span> io_func<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>ret1<span class="token punctuation">)</span>

    ret2 <span class="token operator">=</span> <span class="token keyword">await</span> io_func<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>ret2<span class="token punctuation">)</span>

ret <span class="token operator">=</span> foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>ret<span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># Fuck me on github</span>
<span class="token comment"># start io block</span>
<span class="token comment"># end io block</span>
<span class="token comment"># None</span>
<span class="token comment"># start io block</span>
<span class="token comment"># end io block</span>
<span class="token comment"># None</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>等到协程返回结果之后，再继续执行，变为 <code v-pre>同步阻塞</code> 式，但会 <code v-pre>挂起</code> 当前阻塞协程</li>
</ul>
<blockquote>
<p>当遇到 <code v-pre>IO操作</code> 时挂起当前协程，等 IO 操作完之后 <code v-pre>再继续</code> 往下执行，此时 <code v-pre>事件循环</code> 可以去执行 <code v-pre>其他协程任务</code></p>
</blockquote>
<h2 id="_3-task-对象" tabindex="-1"><a class="header-anchor" href="#_3-task-对象" aria-hidden="true">#</a> 3. Task 对象</h2>
<h5 id="class-asyncio-task-coro-loop-none-name-none-py3-9" tabindex="-1"><a class="header-anchor" href="#class-asyncio-task-coro-loop-none-name-none-py3-9" aria-hidden="true">#</a> <Font type="dark">class asyncio.Task(<em>coro</em>, *, loop=None, name=None)</Font><Badge>py3.9</Badge></h5>
<p><code v-pre>Task</code> 任务，是 <code v-pre>Future</code> 类的子类，对 <code v-pre>coroutine</code> 的进一步封装，相比 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%8D%8F%E7%A8%8B" target="_blank" rel="noopener noreferrer">协程<ExternalLinkIcon/></a>，保存了协程运行后的状态，用于来获取协程的结果</p>
<ul>
<li><code v-pre>Pending</code>: 创建时</li>
<li><code v-pre>Running</code>: 调用执行时</li>
<li><code v-pre>Done</code>: 调用完毕</li>
<li><code v-pre>Cancelled</code>: 调用停止，task 取消</li>
</ul>
<blockquote>
<p>通常被用于运行协程，<strong>非线程安全</strong>的对象。<strong>强烈不推荐</strong> 手动实例化 <code v-pre>Task</code> 对象来创建 <code v-pre>task</code>，即使可以工作，但没必要</p>
</blockquote>
<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h1>
<p><em>3.10 版后已移除:</em> 如果未指定 <em>loop</em> 并且没有正在运行的事件循环则会发出弃用警告。</p>
<h3 id="_3-1-创建任务" tabindex="-1"><a class="header-anchor" href="#_3-1-创建任务" aria-hidden="true">#</a> 3.1 创建任务</h3>
<h5 id="asyncio-ensure-future-obj-loop-none" tabindex="-1"><a class="header-anchor" href="#asyncio-ensure-future-obj-loop-none" aria-hidden="true">#</a> <Font type="dark">asyncio.ensure_future(obj, *, loop=None)</Font></h5>
<blockquote>
<p>将 <code v-pre>coroutine </code>封装成一个 <code v-pre>task任务</code> 对象，<Font type="info" size="ss">低版本的创建方式，在所有版本有效，但可读性差</Font>，推荐使用下文 <a href="/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/asyncio%E5%9F%BA%E7%A1%80#-1" target="_blank" rel="noopener noreferrer">asyncio.create_task<ExternalLinkIcon/></a></p>
</blockquote>
<ul>
<li>
<p>参数：</p>
<ul>
<li><code v-pre>obj: &lt;coroutine object&gt;</code>： 若是 <code v-pre> isfuture()</code> 对象，则保持原样，若是 <code v-pre>iscoroutine()</code> 则会加入<code v-pre>loop</code> 执行，若是可等待对象，则等待结果，其他对象则引发 <code v-pre>TypeError</code> 异常</li>
<li><code v-pre>loop: = None</code>：事件循环</li>
</ul>
</li>
<li>
<p>返回值：</p>
<ul>
<li><code v-pre>task对象: &lt;class '_asyncio.Task'&gt;</code>：返回一个作为 <code v-pre>asyncio任务</code> 可并发执行的 <code v-pre>task对象</code></li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> time


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">do_some_work</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Waiting: '</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>x<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">'Done after {}s'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    coroutine1 <span class="token operator">=</span> do_some_work<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    coroutine2 <span class="token operator">=</span> do_some_work<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    coroutine3 <span class="token operator">=</span> do_some_work<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

    tasks <span class="token operator">=</span> <span class="token punctuation">[</span>
        asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>coroutine1<span class="token punctuation">)</span><span class="token punctuation">,</span>
        asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>coroutine2<span class="token punctuation">)</span><span class="token punctuation">,</span>
        asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>coroutine3<span class="token punctuation">)</span>
    <span class="token punctuation">]</span>

    start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>wait<span class="token punctuation">(</span>tasks<span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'TIME: '</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span>


asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># Waiting:  1</span>
<span class="token comment"># Waiting:  2</span>
<span class="token comment"># Waiting:  2</span>
<span class="token comment"># TIME:  2.0020179748535156</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="asyncio-create-task-coro-name-none-py3-7" tabindex="-1"><a class="header-anchor" href="#asyncio-create-task-coro-name-none-py3-7" aria-hidden="true">#</a> <Font type="dark">asyncio.create_task(coro, *, name=None)</Font><Badge>py3.7</Badge></h5>
<blockquote>
<p>将协程封装成一个 <code v-pre>task任务</code> 对象，在 <code v-pre>事件循环</code> 中<strong>添加多个任务</strong>，并能够 <strong>并发调度地执行</strong>，该任务会在 <code v-pre>get_running_loop</code>返回的 loop 中执行，若当前线程没有 loop，则会引发 <code v-pre>RuntimeError</code></p>
</blockquote>
<ul>
<li>
<p>参数：</p>
<ul>
<li><code v-pre>coro: &lt;coroutine object&gt;</code>： 传入协程对象</li>
<li><code v-pre>name: str = None</code>：3.8 中添加 <em>name 形参</em>，调用 <code v-pre>Task.set_name()</code> 创建任务名</li>
</ul>
</li>
<li>
<p>返回值：</p>
<ul>
<li><code v-pre>task对象: &lt;class '_asyncio.Task'&gt;</code>：返回一个作为 <code v-pre>asyncio任务</code> 可并发执行的 <code v-pre>task对象</code></li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token operator">*</span><span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> c


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 会将当前执行的 foo(...)函数任务 立即添加到事件循环当中</span>
    task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>foo<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> c<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">"task1"</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>task<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">)</span>
    ret <span class="token operator">=</span> <span class="token keyword">await</span> task
    <span class="token keyword">print</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>


asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># &lt;Task pending name='task1' coro=&lt;foo() running at task_file_path> &lt;class '_asyncio.Task'></span>
<span class="token comment"># 6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>当调用<code v-pre>asyncio.run()</code>后，执行到<code v-pre>create_task</code>时，当前主线程里面有一个<code v-pre>main</code>任务，一个<code v-pre>foo</code>任务</li>
<li>此时并不会执行<code v-pre>foo</code>任务，因为此时异步任务<code v-pre>main</code>并没有遇到阻塞</li>
<li>直到执行到 <code v-pre>await task</code> 时，主线程 <code v-pre>main</code> 遇到阻塞，才回切换到 <code v-pre>foo</code> 去执行</li>
</ol>
</li>
<li>
<p>其他方式：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>loop<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>coro<span class="token punctuation">,</span> <span class="token operator">*</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span>	<span class="token comment"># asyncio.create_task 就是调用该方法创建的(快捷方式)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>coro<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment"># 低版本的创建方式，在所有版本有效，但可读性差</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-2-执行任务" tabindex="-1"><a class="header-anchor" href="#_3-2-执行任务" aria-hidden="true">#</a> 3.2 执行任务</h3>
<h5 id="asyncio-wait-aws-loop-none-timeout-none-return-when-all-completed" tabindex="-1"><a class="header-anchor" href="#asyncio-wait-aws-loop-none-timeout-none-return-when-all-completed" aria-hidden="true">#</a> <Font type="dark">asyncio.wait(aws, *, loop=None, timeout=None, return_when=ALL_COMPLETED)</Font></h5>
<blockquote>
<p>并发地运行 <em>fs</em> 可迭代对象中的 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%8D%8F%E7%A8%8B#33-await" target="_blank" rel="noopener noreferrer">可等待对象<ExternalLinkIcon/></a> 并进入阻塞状态直到满足 <em>return_when</em> 所指定的条件。</p>
</blockquote>
<ul>
<li>
<p>参数：</p>
<ul>
<li><code v-pre>aws: List[&lt;coroutine object&gt;]</code>： 必须是可迭代的 <code v-pre>协程对象 | Tasks | Futures</code>，不能为空</li>
<li><code v-pre>loop: str = None</code>：事件循环</li>
<li><code v-pre>timeout: int = None</code>: 超时时间</li>
<li><code v-pre>return_when: str = ALL_COMPLETED</code>: 返回条件，默认值为 <strong>ALL_COMPLETED</strong> 全部完成，还有第一个完成 <strong>FIRST_COMPLETED</strong> 和第一个异常 <strong>FIRST_EXCEPTION</strong></li>
</ul>
</li>
<li>
<p>返回值：</p>
<ul>
<li><code v-pre>两个Task/Future集合：(done, pending) </code>:
<ul>
<li><code v-pre>done: Set</code>: 包含所有任务的返回值的集合</li>
<li><code v-pre>pending</code>：只有传入 <em>timeout</em> 超时参数时，才有可能产生 <code v-pre>pending</code> 列表</li>
</ul>
</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    task_list <span class="token operator">=</span> <span class="token punctuation">[</span>
        asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>foo<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> c<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">"task1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>foo<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> b<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">,</span> c<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">"task2"</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
    done<span class="token punctuation">,</span> pending <span class="token operator">=</span> <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>wait<span class="token punctuation">(</span>task_list<span class="token punctuation">,</span> timeout<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token comment"># 修改超时，得到不同结果</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>done<span class="token punctuation">,</span> pending<span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># 未超时正常输出结果：</span>
<span class="token comment"># {&lt;Task finished name='task1' coro=&lt;foo() done, defined at file_path> result=6>,</span>
<span class="token comment"># &lt;Task finished name='task2' coro=&lt;foo() done, defined at file_path> result=15>}</span>

<span class="token comment"># 超时状态，pending结果：</span>
<span class="token comment"># {&lt;Task pending name='task1' coro=&lt;foo() running at file_path> wait_for=&lt;Future pending cb=[&lt;TaskWakeupMethWrapper object at 0x0000019F8D6F52E0>()]>>,</span>
<span class="token comment"># &lt;Task pending name='task2' coro=&lt;foo() running at file_path> wait_for=&lt;Future pending cb=[&lt;TaskWakeupMethWrapper object at 0x0000019F8D6F52B0>()]>>}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<Alert type="info">返回的 **结果集** 是按照事件循环中的 **任务完成顺序** 排列的，所以和原始任务顺序可能不同 </Alert><h5 id="asyncio-gather-aws-loop-none-return-exceptions-false" tabindex="-1"><a class="header-anchor" href="#asyncio-gather-aws-loop-none-return-exceptions-false" aria-hidden="true">#</a> <Font type="dark">asyncio.gather(*aws, loop=None, return_exceptions=False)</Font></h5>
<blockquote>
<p><em>并发</em> 运行 <Font fsize="ss">*aws</Font> 序列中的 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%8D%8F%E7%A8%8B#33-await" target="_blank" rel="noopener noreferrer">可等待对象<ExternalLinkIcon/></a>，协程并发运行后会顺序返回，<strong>适合有序结果集</strong></p>
</blockquote>
<ul>
<li>
<p>参数：</p>
<ul>
<li><code v-pre>*aws:*list</code>：若序列中某个可等待对象为协程，它将自动被作为一个任务调度（传协程也变任务）</li>
<li><code v-pre>loop</code>: 可传入事件循环</li>
<li><code v-pre>return_exceptions = False</code>: 为 <strong>True</strong> 时，异常会和成功的结果一样处理，并聚合至结果列表。若序列中的任一对象被取消，等同于触发 <code v-pre>CancelledError</code>，但 <code v-pre>gather()</code> <strong>不会被取消</strong></li>
</ul>
</li>
<li>
<p>返回值：</p>
<ul>
<li><code v-pre>result:List</code>: 返回一个 <strong>聚合所有可等待对象的返回值</strong> 的列表</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> asyncio


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">taskIO_1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'开始运行IO任务1...'</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'IO任务1已完成，耗时3s'</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> taskIO_1<span class="token punctuation">.</span>__name__


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">taskIO_2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'开始运行IO任务2...'</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'IO任务2已完成，耗时2s'</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> taskIO_2<span class="token punctuation">.</span>__name__


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    resualts <span class="token operator">=</span> <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span>taskIO_1<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> taskIO_2<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 子生成器</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>resualts<span class="token punctuation">)</span>


start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'所有IO任务总耗时%.5f秒'</span> <span class="token operator">%</span> <span class="token builtin">float</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># 开始运行IO任务1...</span>
<span class="token comment"># 开始运行IO任务2...</span>
<span class="token comment"># IO任务2已完成，耗时2s</span>
<span class="token comment"># IO任务1已完成，耗时3s</span>
<span class="token comment"># ['taskIO_1', 'taskIO_2']</span>
<span class="token comment"># 所有IO任务总耗时3.00378秒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<Alert type="info">不仅通过 `await` 返回仅一个 **结果集**，且顺序是 **传入任务的原始顺序** </Alert><h5 id="asyncio-ascompleted-aws-loop-none-timeout-none" tabindex="-1"><a class="header-anchor" href="#asyncio-ascompleted-aws-loop-none-timeout-none" aria-hidden="true">#</a> <Font type="dark"><a href="http://asyncio.as" target="_blank" rel="noopener noreferrer">asyncio.as<ExternalLinkIcon/></a><em>completed`(_aws</em>, *, <em>loop=None</em>, *timeout=None*)</Font></h5>
<blockquote>
<p><em>并发</em> 运行 <Font fsize="ss">aws</Font> 可迭代对象中的 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%8D%8F%E7%A8%8B#33-await" target="_blank" rel="noopener noreferrer">可等待对象<ExternalLinkIcon/></a>，返回一个协程的 <strong>迭代器</strong>，会优先 <strong>得到最快执行完的任务结果</strong></p>
</blockquote>
<ul>
<li>
<p>参数：</p>
<ul>
<li><code v-pre>aws: List[&lt;coroutine object&gt;]</code>： 必须是可迭代的 <code v-pre>协程对象 | Tasks | Futures</code>，不能为空</li>
<li><code v-pre>loop: str = None</code>：事件循环</li>
<li><code v-pre>timeout: int = None</code>: 超时时间，发生超时则引发 <a href="https://docs.python.org/zh-cn/3/library/asyncio-exceptions.html#asyncio.TimeoutError" target="_blank" rel="noopener noreferrer"><code v-pre>asyncio.TimeoutError</code><ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li>
<p>返回值：</p>
<ul>
<li><code v-pre>result:generator</code>: 返回一个生成器对象，可迭代获取结果</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    task_list <span class="token operator">=</span> <span class="token punctuation">[</span>
        asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>foo<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> c<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">"task1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>foo<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> b<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">,</span> c<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">"task2"</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
    <span class="token keyword">for</span> task <span class="token keyword">in</span> asyncio<span class="token punctuation">.</span>as_completed<span class="token punctuation">(</span>task_list<span class="token punctuation">,</span> timeout<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        ret <span class="token operator">=</span> <span class="token keyword">await</span> task
        <span class="token keyword">print</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># 6</span>
<span class="token comment"># 15</span>

<span class="token comment">### or</span>
<span class="token comment"># asyncio.exceptions.TimeoutError</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<Alert type="info">和 `wait()` 一样，是按照 **任务完成顺序** 排列的，不同之处是 `as_completed(tasks)` 可实时返回当前完成的结果，而 `wait(tasks)` 要等待所有协程结束后，去返回的 `done` 中获得结果</Alert><h3 id="_3-3-获取结果" tabindex="-1"><a class="header-anchor" href="#_3-3-获取结果" aria-hidden="true">#</a> 3.3 获取结果</h3>
<h5 id="task-adddone-callback-callback-context-none" tabindex="-1"><a class="header-anchor" href="#task-adddone-callback-callback-context-none" aria-hidden="true">#</a> <Font type="dark">task.add<em>done_callback(_callback</em>, *, *context=None*)</Font></h5>
<blockquote>
<p>添加一个回调，将在 <code v-pre>Task</code> 对象 <strong>完成</strong> 时被运行，此方法应仅在低层级、基于回调的代码中使用</p>
</blockquote>
<h5 id="task-result" tabindex="-1"><a class="header-anchor" href="#task-result" aria-hidden="true">#</a> <Font type="dark">task.result()</Font></h5>
<blockquote>
<p>返回 <code v-pre>Task</code> 的结果</p>
</blockquote>
<ul>
<li>
<p>返回值：</p>
<ul>
<li>如果 <code v-pre>task</code> 状态为 <code v-pre>Done</code>，其封包的协程的结果会被返回 (或者当协程引发异常时，该异常会被重新引发)</li>
<li>如果 <code v-pre>task</code> 状态为 <code v-pre>Cancelled</code>，会引发一个 <a href="https://docs.python.org/zh-cn/3/library/asyncio-exceptions.html#asyncio.CancelledError" target="_blank" rel="noopener noreferrer"><code v-pre>CancelledError</code><ExternalLinkIcon/></a> 异常。</li>
<li>如果 <code v-pre>task</code> 状态为 <code v-pre>Pending</code> or <code v-pre>Running</code> ，会引发一个 <a href="https://docs.python.org/zh-cn/3/library/asyncio-exceptions.html#asyncio.InvalidStateError" target="_blank" rel="noopener noreferrer"><code v-pre>InvalidStateError</code><ExternalLinkIcon/></a> 异常。</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f'Run foo() num is </span><span class="token interpolation"><span class="token punctuation">{</span>num<span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f"return num is </span><span class="token interpolation"><span class="token punctuation">{</span>num<span class="token punctuation">}</span></span><span class="token string">"</span></span>


<span class="token keyword">def</span> <span class="token function">callback</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"callback: </span><span class="token interpolation"><span class="token punctuation">{</span>task<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>

    coroutine <span class="token operator">=</span> foo<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>

    task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>coroutine<span class="token punctuation">)</span>
    task<span class="token punctuation">.</span>add_done_callback<span class="token punctuation">(</span>callback<span class="token punctuation">)</span>  <span class="token comment"># 添加执行完之后的回调</span>

    loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>task<span class="token punctuation">)</span>
    loop<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

    end <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>end <span class="token operator">-</span> start<span class="token punctuation">)</span>

<span class="token comment"># or</span>

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>

    coroutine <span class="token operator">=</span> foo<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

    task <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>coroutine<span class="token punctuation">)</span>
    <span class="token keyword">await</span> task
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"callback: </span><span class="token interpolation"><span class="token punctuation">{</span>task<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    end <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>end <span class="token operator">-</span> start<span class="token punctuation">)</span>


asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># Run foo() num is 1</span>
<span class="token comment"># callback: return num is 1</span>
<span class="token comment"># 0.0009970664978027344</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>task.add_done_callback(callback):</code> 绑定回调，当 <code v-pre>coroutine</code> 执行结束时调用回调函数的 <code v-pre>task.result()</code> 打印任务结果</p>
</li>
</ul>
<h3 id="_3-4-取消任务" tabindex="-1"><a class="header-anchor" href="#_3-4-取消任务" aria-hidden="true">#</a> 3.4 取消任务</h3>
<p>如果需要停止事件循环，就需要先把 task 取消。可以使用 asyncio.Task 获取事件循环的 task</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> time


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">do_some_work</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Waiting: '</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>x<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">'Done after {}s'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    coroutine1 <span class="token operator">=</span> do_some_work<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    coroutine2 <span class="token operator">=</span> do_some_work<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    coroutine3 <span class="token operator">=</span> do_some_work<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

    tasks <span class="token operator">=</span> <span class="token punctuation">[</span>
        asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>coroutine1<span class="token punctuation">)</span><span class="token punctuation">,</span>
        asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>coroutine2<span class="token punctuation">)</span><span class="token punctuation">,</span>
        asyncio<span class="token punctuation">.</span>ensure_future<span class="token punctuation">(</span>coroutine3<span class="token punctuation">)</span>
    <span class="token punctuation">]</span>

    now <span class="token operator">=</span> <span class="token keyword">lambda</span><span class="token punctuation">:</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    start <span class="token operator">=</span> now<span class="token punctuation">(</span><span class="token punctuation">)</span>

    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        loop<span class="token punctuation">.</span>run_until_complete<span class="token punctuation">(</span>asyncio<span class="token punctuation">.</span>wait<span class="token punctuation">(</span>tasks<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> KeyboardInterrupt <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"all_tasks"</span><span class="token punctuation">,</span> asyncio<span class="token punctuation">.</span>all_tasks<span class="token punctuation">(</span>loop<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> task <span class="token keyword">in</span> asyncio<span class="token punctuation">.</span>all_tasks<span class="token punctuation">(</span>loop<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>task<span class="token punctuation">.</span>cancel<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token comment"># print("gather", asyncio.gather(*asyncio.all_tasks(loop)).cancel())  # 或使用这种方式cancel也一样</span>
        loop<span class="token punctuation">.</span>stop<span class="token punctuation">(</span><span class="token punctuation">)</span>
        loop<span class="token punctuation">.</span>run_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">finally</span><span class="token punctuation">:</span>
        loop<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'TIME: '</span><span class="token punctuation">,</span> now<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span>


main<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># Waiting:  1</span>
<span class="token comment"># Waiting:  2</span>
<span class="token comment"># Waiting:  2</span>
<span class="token comment"># all_tasks {&lt;Task pending name='Task-4' coro=&lt;wait() running at D:\Miniconda3\lib\asyncio\tasks.py:413> wait_for=&lt;Future pending cb=[&lt;TaskWakeupMethWrapper object at 0x0000016826BFCAC0>()]>>, &lt;Task pending name='Task-2' coro=&lt;do_some_work() running at path> wait_for=&lt;Future pending cb=[&lt;TaskWakeupMethWrapper object at 0x0000016826BFC970>()]> cb=[_wait.&lt;locals>._on_completion() at D:\Minicond</span>
<span class="token comment"># a3\lib\asyncio\tasks.py:513]>, &lt;Task pending name='Task-3' coro=&lt;do_some_work() running at D:\Python Program\huan-plan\backend\huan\utils\tests\test_zz.py:365> wait_for=&lt;Future pending cb=[&lt;TaskWakeupMethWrapper object at 0x0000</span>
<span class="token comment"># 016826BFC9A0>()]> cb=[_wait.&lt;locals>._on_completion() at path]>, &lt;Task pending name='Task-1' coro=&lt;do_some_work() running at path></span>
<span class="token comment"># wait_for=&lt;Future pending cb=[&lt;TaskWakeupMethWrapper object at 0x0000016826BFC940>()]> cb=[_wait.&lt;locals>._on_completion() at poath]>}</span>
<span class="token comment"># True</span>
<span class="token comment"># True</span>
<span class="token comment"># True</span>
<span class="token comment"># True</span>
<span class="token comment"># TIME:  0.6261041164398193</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>asyncio.Task.all_tasks():取到所有 task</p>
</li>
<li>
<p>task.cancel(): 关于停止协程：</p>
<ul>
<li>需要先取消 task，利用 for task in asyncio.Task.all_tasks(): task.cancel()</li>
<li>停止 loop 事件循环。利用 loop.stop()</li>
</ul>
</li>
</ul>
<p>注：
启动事件循环之后，马上 ctrl+c，会触发 run_until_complete 的执行异常 KeyBorardInterrupt。然后通过循环 asyncio.Task 取消 future。</p>
<h2 id="_4-future-对象" tabindex="-1"><a class="header-anchor" href="#_4-future-对象" aria-hidden="true">#</a> 4. Future 对象</h2>
<p><a href="https://docs.python.org/zh-cn/3/library/asyncio-future.html#asyncio-futures" target="_blank" rel="noopener noreferrer">Futures<ExternalLinkIcon/></a></p>
<ol>
<li>
<p><code v-pre>Task</code> 对象的基类，用来链接<strong>底层回调式代码</strong> 和 高层<code v-pre>异步|等待式</code>代码，是更底层接口，帮助等待异步的结果</p>
</li>
<li>
<p>一个<code v-pre>Future</code>代表一个异步运算的最终结果，线程不安全</p>
</li>
<li>
<p>代表<strong>将来执行</strong> 或 <strong>没有执行</strong> 的任务的结果，它和 <code v-pre>task</code> 没有本质的区别</p>
<blockquote>
<p>可以说：future 就是存放着众多 task 或 future 的容器，或是包含众多协程的一个大协程</p>
</blockquote>
</li>
</ol>
<h3 id="_4-1-创建-future" tabindex="-1"><a class="header-anchor" href="#_4-1-创建-future" aria-hidden="true">#</a> 4.1 创建 Future</h3>
<p><strong>loop.create_future()</strong></p>
<blockquote>
<p>创建一个 <strong>附加到事件循环中</strong> 的 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%8D%8F%E7%A8%8B#35-future%E5%AF%B9%E8%B1%A1" target="_blank" rel="noopener noreferrer">asyncio.Future<ExternalLinkIcon/></a> 对象，创建 Futures 的<strong>首选方式</strong>。</p>
</blockquote>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 获取当前的事件循环</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_running_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 创建了一个 future对象，不执行任务，什么也没干</span>
    future <span class="token operator">=</span> loop<span class="token punctuation">.</span>create_future<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 等待执行任务 (future对象)的结果，没有结果会一直阻塞</span>
    ret <span class="token operator">=</span> <span class="token keyword">await</span> future
    <span class="token keyword">print</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>


asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果： 卡死，无</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>协程会等待 Future 对象<Font>直到它有结果、或有异常、或被取消</Font>，因此示例程序会阻塞</li>
</ul>
<Alert type="warning">经验：面向用户的接口（造出的轮子）不要暴露 Future 对象，使用[loop.create_future()](/back_end/python/base/资源调度/协程#351-创建future)创建 Future，可以让 Future 对象使用其他事件循环实现，可以注入自己的优化实现</Alert><h3 id="_4-2-设置-future-结果" tabindex="-1"><a class="header-anchor" href="#_4-2-设置-future-结果" aria-hidden="true">#</a> 4.2 设置 Future 结果</h3>
<Font type="dark">set_result(self, \*args, \*\*kwargs)</Font><blockquote>
<p>将 Future 标记为 <strong>完成</strong> 并设置结果，若 <em>在标记前就已完成</em> 则抛出一个 <code v-pre>InvalidStateError</code> 异常。</p>
</blockquote>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">set_future</span><span class="token punctuation">(</span>future<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"执行任务前的Future对象:"</span><span class="token punctuation">,</span> future<span class="token punctuation">)</span>
    ret <span class="token operator">=</span> <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    future<span class="token punctuation">.</span>set_result<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"设置返回值后的Future对象:"</span><span class="token punctuation">,</span> future<span class="token punctuation">)</span>
    <span class="token keyword">return</span> ret


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_running_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>

    fut <span class="token operator">=</span> loop<span class="token punctuation">.</span>create_future<span class="token punctuation">(</span><span class="token punctuation">)</span>

    task_result <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>set_future<span class="token punctuation">(</span>fut<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"获取任务对象（未执行）:"</span><span class="token punctuation">,</span> task_result<span class="token punctuation">)</span>

    <span class="token comment"># 此时主线程阻塞，事件循环自动切换到task任务并执行，直到等到了future的返回结果</span>
    future_result <span class="token operator">=</span> <span class="token keyword">await</span> fut
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"获取Future返回值:"</span><span class="token punctuation">,</span> future_result<span class="token punctuation">)</span>


asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># 获取任务对象（未执行）: &lt;Task pending name='Task-2' coro=&lt;set_future() running at path>></span>
<span class="token comment"># 执行任务前的Future对象: &lt;Future pending cb=[&lt;TaskWakeupMethWrapper object at 0x000001F20E5B5430>()]></span>
<span class="token comment"># 设置返回值后的Future对象: &lt;Future finished result=1></span>
<span class="token comment"># 获取Future返回值: 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>future</code>对象用于等待结果，然后让<code v-pre>task</code>来处理过程，<code v-pre>task</code>内部会自动执行 <code v-pre>set_result</code> 来使任务完成</li>
</ul>
<h3 id="_4-3-进线程、协程混用" tabindex="-1"><a class="header-anchor" href="#_4-3-进线程、协程混用" aria-hidden="true">#</a> 4.3 进线程、协程混用</h3>
<Alert type="info"> 实际开发过程中，经常会遇到第三方库无 asyncio，已同步的形式存在，因此需要改写为异步协程来提高并发</Alert><h4 id="同步变-future" tabindex="-1"><a class="header-anchor" href="#同步变-future" aria-hidden="true">#</a> 同步变 Future</h4>
<Font type="dark">loop.run_in_executor(executor, func, \*args)</Font><blockquote>
<p>使用<code v-pre>concurrent.futures.Executor</code>的执行器 调度 <em>func</em>，并返回 <strong>协程的 Future 对象</strong></p>
</blockquote>
<ul>
<li>
<p>参数：</p>
<ul>
<li><code v-pre>executor = None</code>：必须是 <a href=""><code v-pre>concurrent.futures.Executor</code></a> 实例, 如果为 None，则使用默认的 <code v-pre>Executor</code> 即 <code v-pre>ThreadPoolExecutor</code></li>
<li><code v-pre>func|*args</code>: 本质是作为 调用 Executor 中 <a href=""><code v-pre>submit(fn, /, *args, **kwargs)</code></a> 所需的参数</li>
</ul>
</li>
<li>
<p>返回值：</p>
<ul>
<li><code v-pre>协程对象: &lt;class '_asyncio.Future'&gt;</code>: 返回了 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%8D%8F%E7%A8%8B#%E5%8F%AF%E7%AD%89%E5%BE%85%E5%AF%B9%E8%B1%A1awaitable" target="_blank" rel="noopener noreferrer"><em>awaitable</em><ExternalLinkIcon/></a> 的 Future 对象</li>
</ul>
</li>
<li>
<p>示例:</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> asyncio


<span class="token keyword">def</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 某个耗时操作</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">"over"</span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_running_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 使用.run_in_executor() 返回一个 asyncio.Future对象，将普通function 变为 Future对象</span>
    future <span class="token operator">=</span> loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">,</span> func1<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"future"</span><span class="token punctuation">,</span> future<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>future<span class="token punctuation">)</span><span class="token punctuation">)</span>

    ret <span class="token operator">=</span> <span class="token keyword">await</span> future
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"result:"</span><span class="token punctuation">,</span> ret<span class="token punctuation">,</span> future<span class="token punctuation">)</span>


asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># future &lt;Future pending cb=[_chain_future.&lt;locals>._call_check_cancel() at path> &lt;class '_asyncio.Future'></span>
<span class="token comment"># result: over &lt;Future finished result='over'></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>step1：内部会先默认使用<code v-pre>ThreadPoolExecutor</code> 的实例，通过<code v-pre>submit()</code>去线程池申请一个线程执行<code v-pre>func1</code> ，并返回一个 <code v-pre>concurrent.futures.Future</code> 对象</li>
<li>setp2：调用 <Font fsize="ss">asyncio.wrap_future</Font> 将 <code v-pre>concurrent.futures.Future</code> 对象包装为<code v-pre>asyncio.Future</code> 对象并返回</li>
</ul>
</li>
<li>
<p>含实例示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_running_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 2. Run in a custom thread pool:</span>
    <span class="token keyword">with</span> concurrent<span class="token punctuation">.</span>futures<span class="token punctuation">.</span>ThreadPoolExecutor<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> pool<span class="token punctuation">:</span>
        future <span class="token operator">=</span> loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span>
            pool<span class="token punctuation">,</span> func1<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'custom thread pool'</span><span class="token punctuation">,</span> future<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>future<span class="token punctuation">)</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token keyword">await</span> future
        <span class="token keyword">print</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>

    <span class="token comment"># 3. Run in a custom process pool:</span>
    <span class="token keyword">with</span> concurrent<span class="token punctuation">.</span>futures<span class="token punctuation">.</span>ProcessPoolExecutor<span class="token punctuation">(</span>max_workers<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span> <span class="token keyword">as</span> pool<span class="token punctuation">:</span>
        future <span class="token operator">=</span> loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span>
            pool<span class="token punctuation">,</span> func1<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'custom process pool'</span><span class="token punctuation">,</span> future<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>future<span class="token punctuation">)</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> <span class="token keyword">await</span> future
        <span class="token keyword">print</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>

asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># custom thread pool &lt;Future pending cb=[_chain_future.&lt;locals>._call_check_cancel() at path]> &lt;class '_asyncio.Future'></span>
<span class="token comment"># over</span>
<span class="token comment"># custom process pool &lt;Future pending cb=[_chain_future.&lt;locals>._call_check_cancel() at path]> &lt;class '_asyncio.Future'></span>
<span class="token comment"># over</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注：windows 环境下，进程池执行也许会出现异常，但 linux 下运行正常</p>
</blockquote>
</li>
</ul>
<h4 id="_3-6-2-混用示例" tabindex="-1"><a class="header-anchor" href="#_3-6-2-混用示例" aria-hidden="true">#</a> 3.6.2 混用示例</h4>
<p>写一个同步 <code v-pre>request</code> 变异步的例子</p>
<ul>
<li>
<p>示例:</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">import</span> time
<span class="token keyword">import</span> concurrent<span class="token punctuation">.</span>futures
<span class="token keyword">import</span> requests


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">download</span><span class="token punctuation">(</span>url<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"start download:"</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span>
    loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_running_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># requests模块默认不支持异步操作，此处使用线程池改为协程Future</span>
    data <span class="token operator">=</span> <span class="token keyword">await</span> loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">,</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">,</span> url<span class="token punctuation">)</span>

    file_name <span class="token operator">=</span> data<span class="token punctuation">.</span>url<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>file_name<span class="token punctuation">,</span> <span class="token string">"wb"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data<span class="token punctuation">.</span>content<span class="token punctuation">)</span>
    <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f"end download: </span><span class="token interpolation"><span class="token punctuation">{</span>file_name<span class="token punctuation">}</span></span><span class="token string">"</span></span>


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    url_list <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string">"http://www.deadly-exception.icu:8999/img/Django.png"</span><span class="token punctuation">,</span>
        <span class="token string">"http://www.deadly-exception.icu:8999/img/antd.png"</span><span class="token punctuation">,</span>
        <span class="token string">"http://www.deadly-exception.icu:8999/img/etcd.png"</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>

    <span class="token comment"># 创建多个协程</span>
    tasks <span class="token operator">=</span> <span class="token punctuation">[</span>asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>download<span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">for</span> url <span class="token keyword">in</span> url_list<span class="token punctuation">]</span>

    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">except_foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> RuntimeError

    tasks<span class="token punctuation">.</span>append<span class="token punctuation">(</span>asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>except_foo<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    ret <span class="token operator">=</span> <span class="token keyword">await</span> asyncio<span class="token punctuation">.</span>gather<span class="token punctuation">(</span><span class="token operator">*</span>tasks<span class="token punctuation">,</span> return_exceptions<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"ret"</span><span class="token punctuation">,</span> ret<span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span>


asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># start download: http://www.deadly-exception.icu:8999/img/Django.png</span>
<span class="token comment"># start download: http://www.deadly-exception.icu:8999/img/antd.png</span>
<span class="token comment"># start download: http://www.deadly-exception.icu:8999/img/etcd.png</span>
<span class="token comment"># ret ['end download: Django.png', 'end download: antd.png', 'end download: etcd.png', RuntimeError()]</span>
<span class="token comment"># 2.351871967315674</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<Alert type="info">如果 `gather()` _被取消_，所有被提交 (尚未完成) 的可等待对象也会 _被取消_</Alert><h2 id="_5-异步迭代器" tabindex="-1"><a class="header-anchor" href="#_5-异步迭代器" aria-hidden="true">#</a> 5. 异步迭代器</h2>
<h3 id="_5-1-异步迭代器" tabindex="-1"><a class="header-anchor" href="#_5-1-异步迭代器" aria-hidden="true">#</a> 5.1 异步迭代器</h3>
<p><strong>回顾</strong>：什么是 <a href="/back_end/python/base/%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/%E8%BF%AD%E4%BB%A3%E5%99%A8" target="_blank" rel="noopener noreferrer">迭代器<ExternalLinkIcon/></a></p>
<h5 id="什么是异步迭代器" tabindex="-1"><a class="header-anchor" href="#什么是异步迭代器" aria-hidden="true">#</a> <strong>什么是异步迭代器</strong></h5>
<ul>
<li>实现了<code v-pre>__aiter__()</code> 和 <code v-pre>__anext__()</code> 方法的对象
<ul>
<li><code v-pre>__aiter__()</code> 必须返回一个 <em>异步迭代器</em> 对象</li>
<li><code v-pre>__anext__()</code> 必须返回一个 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%8D%8F%E7%A8%8B#%E5%8F%AF%E7%AD%89%E5%BE%85%E5%AF%B9%E8%B1%A1awaitable" target="_blank" rel="noopener noreferrer"><em>awaitable</em><ExternalLinkIcon/></a> 对象输出迭代器下一结果的值，迭代结束会引发 <code v-pre>StopAsyncIteration</code> 异常</li>
</ul>
</li>
<li><code v-pre>async_for</code> 会处理异步迭代器的 <code v-pre>__anext__()</code> 方法所返回的可等待对象，直到其引发一个 <code v-pre>StopAsyncIteration</code> 异常</li>
</ul>
<h5 id="什么是异步可迭代对象" tabindex="-1"><a class="header-anchor" href="#什么是异步可迭代对象" aria-hidden="true">#</a> <strong>什么是异步可迭代对象</strong></h5>
<ul>
<li>可在 <code v-pre>async_for</code> 语句中被使用的对象</li>
<li>必须通过它的 <code v-pre>__aiter__()</code> 方法返回一个 <code v-pre>asynchronous iterator</code></li>
</ul>
<h2 id="_6-异步上下文管理器" tabindex="-1"><a class="header-anchor" href="#_6-异步上下文管理器" aria-hidden="true">#</a> 6. 异步上下文管理器</h2>
<h3 id="_6-1-async-with" tabindex="-1"><a class="header-anchor" href="#_6-1-async-with" aria-hidden="true">#</a> 6.1 async with</h3>
<p>异步上下文管理器指的是在 enter 和 exit 方法处能够暂停执行的上下文管理器。
为了实现这样的功能，需要加入两个新的方法：<strong>aenter</strong> 和<strong>aexit</strong>。这两个方法都要返回一个 awaitable 类型的值。</p>
<p>异步上下文管理器的一种使用方法是:</p>
<pre><code>class AsyncContextManager:
    async def __aenter__(self):
        await log('entering context')

    async def __aexit__(self, exc_type, exc, tb):
        await log('exiting context')
</code></pre>
<p>【新语法】：
异步上下文管理器使用一种新的语法:</p>
<pre><code>async with EXPR as VAR:
    BLOCK
</code></pre>
<p>这段代码在语义上等同于：</p>
<pre><code>mgr = (EXPR)
aexit = type(mgr).__aexit__
aenter = type(mgr).__aenter__(mgr)
exc = True

VAR = await aenter
try:
    BLOCK
except:
    if not await aexit(mgr, *sys.exc_info()):
        raise
else:
    await aexit(mgr, None, None, None)
</code></pre>
<ul>
<li>和常规的 with 表达式一样，可以在一个 async with 表达式中指定多个上下文管理器。</li>
<li>如果向 async with 表达式传入的上下文管理器中没有<strong>aenter</strong> 和<strong>aexit</strong>方法，这将引起一个错误 。</li>
<li>如果在 async def 函数外面使用 async with，将引起一个 SyntaxError（语法错误）。</li>
</ul>
<p>例子：
使用 async with 能够很容易地实现一个数据库事务管理器。</p>
<pre><code>async def commit(session, data):
    ...

    async with session.transaction():
        ...
        await session.update(data)
        ...
</code></pre>
<p>需要使用锁的代码也很简单：</p>
<pre><code>async with lock:
    ...
</code></pre>
<p>而不是：</p>
<pre><code>with (yield from lock):
    ...
</code></pre>
<h4 id="协程嵌套-2" tabindex="-1"><a class="header-anchor" href="#协程嵌套-2" aria-hidden="true">#</a> 协程嵌套 2</h4>
<p>将多个协程封装到一个主协程中（更详细见 aiohttp）</p>
<pre><code>import asyncio,aiohttp

async def fetch_async(url):
    print(url)
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            print(resp.status)
            print(await resp.text())

tasks = [fetch_async('http://www.baidu.com/'), fetch_async('http://www.cnblogs.com/ssyfj/')]

event_loop = asyncio.get_event_loop()
results = event_loop.run_until_complete(asyncio.gather(*tasks))
event_loop.close()
</code></pre>
<p>关于 aiohttp 模块的协程嵌套，嵌套更加明显</p>
<h3 id="_6-异常处理" tabindex="-1"><a class="header-anchor" href="#_6-异常处理" aria-hidden="true">#</a> 6. 异常处理</h3>
<p><strong>回顾</strong>：<a href="">异常与捕获</a></p>
<Alert type="error"> 异步的异常若捕获不当，会造成难以发现的 **bug！！**</Alert><blockquote>
<p><strong>背景描述：</strong></p>
<ul>
<li>协程可通过 <code v-pre>asyncio.Task</code> 作为独立单元启动，其中的 <code v-pre>cancel()</code> 可以使任务中途强制停止。</li>
<li>类似的异步生成器也可以通过 <code v-pre>aclose()</code> 强制结束。</li>
<li>当一个 <code v-pre>任务</code> 或 <code v-pre>异步生成器</code> 被外部强制终止的时候，会从当前的 <code v-pre>await</code> 或 <code v-pre>yield</code> 语句抛出 <code v-pre>asyncio.CancelledError</code>，接下来从这个错误说起...</li>
</ul>
</blockquote>
<p><strong>asyncio.CancelledError</strong></p>
<Alert type="queen">该错误基类已在<Badge>py3.8</Badge> 中更改为 `BaseException`</Alert><blockquote>
<p>取消 <code v-pre>asyncio</code> 任务时，可以捕获此异常以执行自定义操作。</p>
</blockquote>
<p>在<Badge>py3.8</Badge> 以下的版本，和 <code v-pre>concurrent.futures.CancelledError</code> 一致，基类为 <code v-pre>Exception</code></p>
</div></template>


