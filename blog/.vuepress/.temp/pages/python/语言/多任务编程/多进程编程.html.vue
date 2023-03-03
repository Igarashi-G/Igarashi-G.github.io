<template><div><p><strong>Python</strong> 基于进程的并行计算</p>
<!--more-->
<p><strong>multiprocessing</strong>：是一个与 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B#%E5%9F%BA%E4%BA%8E%E7%BA%BF%E7%A8%8B%E7%9A%84%E5%B9%B6%E5%8F%91">threading</a> 模块类似的包，能提供本地和远程的 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E8%BF%9B%E7%A8%8B#12-%E5%B9%B6%E5%8F%91">并发</a> 操作（若多核那么就是 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E8%BF%9B%E7%A8%8B#11-%E5%B9%B6%E8%A1%8C">并行</a> 操作）。它利用子进程来绕过了 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B#%E5%9F%BA%E4%BA%8E%E7%BA%BF%E7%A8%8B%E7%9A%84%E5%B9%B6%E5%8F%91">GIL 锁</a> ，适用于 Unix 和 Windows 系统的 <strong>CPU</strong>(计算)密集型操作（且通常不依赖上次计算结果）</p>
<h2 id="_1-多进程-multiprocessing" tabindex="-1"><a class="header-anchor" href="#_1-多进程-multiprocessing" aria-hidden="true">#</a> 1. 多进程 <a href="https://docs.python.org/zh-cn/3/library/multiprocessing.html?highlight=basemanager#module-multiprocessing" target="_blank" rel="noopener noreferrer">multiprocessing<ExternalLinkIcon/></a></h2>
<h3 id="_1-1-主要功能介绍" tabindex="-1"><a class="header-anchor" href="#_1-1-主要功能介绍" aria-hidden="true">#</a> 1.1 主要功能介绍</h3>
<ul>
<li>主要用于创建 <strong>子进程</strong> 对象，<code v-pre>Process</code>类，然后 start 启动</li>
<li>进程通信，支持 <code v-pre>Queue</code>类 队列和 <code v-pre>Pipe</code> 类管道通信</li>
<li>共享数据，在并发编程时通常 <strong>尽量避免共享状态</strong>，若需要，可使用共享内存 <code v-pre>Value </code> 或 <code v-pre>Array</code> 将数据存在共享内存的映射中。</li>
<li>进程同步，<code v-pre>Lock</code> 类实现进程的同步，避免同时抢占同一资源</li>
<li>进程池，<code v-pre>Pool</code> 类创建进程池</li>
<li>管理器，分布式计算，通过 <code v-pre>managers</code> 实现分布式的进程计算和通信</li>
<li>监听器，通过 <code v-pre>Listener</code> 监听管道来交互</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>使用 <code v-pre>multiprocessing</code> 时，应遵循一些指导原则和习惯 <a href="https://docs.python.org/zh-cn/3/library/multiprocessing.html?highlight=basemanager#multiprocessing-programming" target="_blank" rel="noopener noreferrer">用法<ExternalLinkIcon/></a></p>
</div>
<h4 id="部分摘要" tabindex="-1"><a class="header-anchor" href="#部分摘要" aria-hidden="true">#</a> <strong>部分摘要</strong>：</h4>
<ul>
<li>
<p><code v-pre>multiprocessing</code> 有进程间通信 <strong>IPC</strong> (如：<code v-pre>Pipe</code> 和 <code v-pre>Queue</code>) 因此优先考虑使用它们，效率会高些</p>
</li>
<li>
<p>避免使用 <code v-pre>Lock/Event/Semaphore/Condition</code> 等同步方式，因为它们占据了 <strong>非用户进程的</strong> 资源，多进程应该避免共享资源</p>
<blockquote>
<p>多线程中，以上方式共享资源很容易，比如使用 <strong>全局变量</strong> 或 <strong>传递参数</strong>，但多进程由于每个进程都有自己独立的内存空间，以上方法并不合适</p>
</blockquote>
</li>
<li>
<p>若必须共享，可通过 <strong>共享内存</strong> 和 <code v-pre>Manager</code> 方法来共享资源，但此时程序复杂度大大提高，且因同步而降低了计算效率</p>
</li>
</ul>
<h3 id="_1-2-process-类" tabindex="-1"><a class="header-anchor" href="#_1-2-process-类" aria-hidden="true">#</a> 1.2 Process 类</h3>
<p><strong><Font type="dark"><code v-pre>Process</code>(group=None, target=None, name=None, args=(), kwargs={}, *, daemon=None)</Font></strong></p>
<blockquote>
<p>进程对象表示在单独进程中运行的活动</p>
</blockquote>
<ul>
<li>参数：
<ul>
<li><code v-pre>group: None</code>：应该始终为 None</li>
<li><code v-pre>target</code>：是由 <code v-pre>run()</code> 方法调用的可调用对象</li>
<li><code v-pre>args|kwargs</code>：子进程所需参数</li>
<li><code v-pre>daemon</code>：将进程标志设置为 <code v-pre>True</code> 或是 <code v-pre>False</code> ，若为 None（默认值）则该标志将从创建的</li>
</ul>
</li>
</ul>
<p><code v-pre>Process</code> 和 <code v-pre>threading.Thread</code> API 大致相同，也有两种创建方式：</p>
<p>1.主进程通过实例化 <code v-pre>Process</code> 对象来创建，并执行子进程 <code v-pre>foo()</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">from</span> multiprocessing <span class="token keyword">import</span> Process


<span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"pid: </span><span class="token interpolation"><span class="token punctuation">{</span>os<span class="token punctuation">.</span>getpid<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> - num: </span><span class="token interpolation"><span class="token punctuation">{</span>num<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    process <span class="token operator">=</span> Process<span class="token punctuation">(</span>target<span class="token operator">=</span>foo<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    process<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
    process<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"module name: </span><span class="token interpolation"><span class="token punctuation">{</span>__name__<span class="token punctuation">}</span></span><span class="token string"> - pid: </span><span class="token interpolation"><span class="token punctuation">{</span>os<span class="token punctuation">.</span>getpid<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># pid: 34284 - num: 1</span>
<span class="token comment"># module name: __main__ - pid: 26144</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注</strong>：为啥在 <code v-pre>Windows</code> 中必须要使用 <code v-pre>if __name__ == '__main__': </code> ?</p>
<ol>
<li>
<p><code v-pre>if __name__ == '__main__':</code> 表示只有当前运行的 <code v-pre>.py</code>文件， 它的 <code v-pre>__name__</code> 才为<code v-pre>__main__</code> 若不是当前运行的 <code v-pre>.py</code> 文件则不为 <code v-pre>__main__</code> 这个字段</p>
</li>
<li>
<p><code v-pre>Unix</code> 系统中有 <code v-pre>fork()</code> 这个系统调用来创建进程，若普通函数调用，调一次，返回一次。但 <code v-pre>fork()</code> 则是调用一次，返回两次，这是因为操作系统自动把当前进程（父进程）复制了一份（称为子进程），然后父子分别返回了一次</p>
</li>
<li>
<p><code v-pre>Windows</code> 系统中没有 <code v-pre>fork()</code> ，所以暂且理解为 <code v-pre>python</code> 的多进程在<code v-pre>Windows</code>中相当与复制了一个一整套的上下文环境（<code v-pre>.py</code> 文件）为了避免复制的 <code v-pre>.py</code> 文件再次读到全局的 <code v-pre>Process</code> 来重复创建子进程（否则递归，无限创建直到发生 <strong>RuntimeError</strong> 异常）因此要通过 <code v-pre>if __name__ == '__main__':</code> 来区分到谁是主进程，只有主进程才能创建，这样才能有效起到保护作用</p>
</li>
</ol>
</blockquote>
<p>2.通过继承 <code v-pre>Process</code> 类来创建，并复写和执行 <code v-pre>run()</code> 方法</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">import</span> time

<span class="token keyword">from</span> multiprocessing <span class="token keyword">import</span> Process


<span class="token keyword">class</span> <span class="token class-name">NextProcess</span><span class="token punctuation">(</span>Process<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> pro_name<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span>NextProcess<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>pro_name <span class="token operator">=</span> pro_name

    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        start_time <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        total <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">for</span> num <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">100000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            total <span class="token operator">+=</span> num
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"Process ID: </span><span class="token interpolation"><span class="token punctuation">{</span>os<span class="token punctuation">.</span>getpid<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> - Name: </span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>pro_name<span class="token punctuation">}</span></span><span class="token string"> - total: </span><span class="token interpolation"><span class="token punctuation">{</span>total<span class="token punctuation">}</span></span><span class="token string"> - time: </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start_time<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    next_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        p <span class="token operator">=</span> NextProcess<span class="token punctuation">(</span>i<span class="token punctuation">)</span>
        next_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>p<span class="token punctuation">)</span>
        p<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># print("子进程正在执行中...")</span>
    <span class="token comment">#</span>
    <span class="token comment"># for next_pro in next_list:</span>
    <span class="token comment">#     next_pro.join()</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"Main Process Over Time: </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># Main Process Over Time: 0.041664838790893555</span>
<span class="token comment"># Process ID: 30308 - Name: 5 - total: 4999999950000000 - time: 12.864246606826782</span>
<span class="token comment"># Process ID: 36596 - Name: 1 - total: 4999999950000000 - time: 12.899959325790405</span>
<span class="token comment"># Process ID: 29976 - Name: 6 - total: 4999999950000000 - time: 12.89797592163086</span>
<span class="token comment"># Process ID: 32604 - Name: 2 - total: 4999999950000000 - time: 12.918310642242432</span>
<span class="token comment"># Process ID: 27108 - Name: 4 - total: 4999999950000000 - time: 13.050273895263672</span>
<span class="token comment"># Process ID: 36772 - Name: 7 - total: 4999999950000000 - time: 13.054712533950806</span>
<span class="token comment"># Process ID: 35380 - Name: 0 - total: 4999999950000000 - time: 13.098359823226929</span>
<span class="token comment"># Process ID: 9352 - Name: 3 - total: 4999999950000000 - time: 13.09786581993103</span>

<span class="token comment">### 若去除.join()相关部分注释，让主进程等待子进程执行，则主进程结果如下：</span>
<span class="token comment"># 子进程正在执行中...</span>
<span class="token comment"># Process ID: 28740 - Name: 0 - total: 4999999950000000 - time: 12.804229497909546</span>
<span class="token comment"># ...</span>
<span class="token comment"># Process ID: 35624 - Name: 2 - total: 4999999950000000 - time: 13.160359382629395</span>
<span class="token comment"># Main Process Over Time: 13.237204313278198</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>若不使用 <code v-pre>.join()</code> 方法，主进程则不会阻塞，此时多个子进程异步执行</p>
</li>
<li>
<p>若使用<code v-pre>.join()</code> 方法，需要注意避免一个 <code v-pre>for</code> 循环中每个子进程依次阻塞，应另起循环批量 <code v-pre>join</code> 即可实现主进程阻塞下的子进程并行</p>
</li>
<li>
<p>以 <strong>CPU</strong> <strong>i7-7700HQ</strong> <code v-pre>4核心8线程</code> 为例，开启 8 个子进程<strong>并行</strong>，做 1 亿数字相加来跑满核心，执行过程图示如下：</p>
  <img src="@source/python/语言/多任务编程/img/多进程吃满CPU.png">
<blockquote>
<p>此时<strong>CPU 占用 100%</strong>，<strong>8 线程跑满接近极限 3.5GHz 睿频</strong>，以上才是通过多进程，真正充分利用 CPU 的多核性能 <strong>进行计算密集型任务</strong></p>
</blockquote>
</li>
</ul>
<h3 id="上下文和启动方法" tabindex="-1"><a class="header-anchor" href="#上下文和启动方法" aria-hidden="true">#</a> 上下文和启动方法：</h3>
<p>根据不同的平台，<code v-pre>multiprocessing</code> 支持三种启动进程的方法：</p>
<ul>
<li><strong>spawn</strong>：<Badge type="success">Windows 默认</Badge><Badge type="queen">Unix</Badge><Badge type="warning">macOS 默认</Badge>
<ul>
<li>父进程启动一个全新的 <code v-pre>python</code> 解释器进程，子进程只继承那些运行进程对象的 <code v-pre>run()</code> 方法所必须的资源。</li>
<li>来自父进程的非必须文件描述符黑句柄将不会被继承。使用此方法启动进程相比 <code v-pre>fork</code> 或 <code v-pre>forkserver</code> 要慢上许多</li>
</ul>
</li>
<li><strong>fork</strong>：<Badge type="queen">Unix 默认</Badge>
<ul>
<li>父进程使用 <code v-pre>os.fork()</code> 来产生 <code v-pre>Python</code> 解释器分叉。子进程初始化资源和继承于父进程，和父进程一样。</li>
<li>注意：安全分叉多线程进程？</li>
</ul>
</li>
<li><strong>forkserver</strong>: <Badge type="queen">Unix</Badge>
<ul>
<li>该方式会启动服务器进程，每次要创建进程时，父进程都会连接到服务器去请求它来创建一个新进程</li>
<li>这种方式貌似是 <strong>OS 线程级别</strong> 的进程，因此使用 <code v-pre>os.fork()</code> 是安全的，也没有不必要的资源被继承</li>
</ul>
</li>
</ul>
<blockquote>
<p>注意：</p>
<ul>
<li><code v-pre>spawn</code> 在 <code v-pre>macOS</code> 上可能导致 <code v-pre>subprocess</code> 崩溃，因此不安全</li>
<li><code v-pre>Unix</code>上 使用 <code v-pre>spawn</code> 或 <code v-pre>forkserver</code> 时，会多一个 <strong>资源追踪</strong> 进程，它追踪 <strong>当前进程产生且不用</strong> 的系统资源 (如：命名信号量以及 <a href="https://docs.python.org/zh-cn/3/library/multiprocessing.shared_memory.html#multiprocessing.shared_memory.SharedMemory" target="_blank" rel="noopener noreferrer"><code v-pre>SharedMemory</code><ExternalLinkIcon/></a> 对象)。所有进程退出后，资源追踪释放追踪对象。通常不会有这种对象，但一个子进程被某个信号杀死，就会 <strong>内存泄露</strong> 到下次重启</li>
<li><code v-pre>spawn</code> 或 <code v-pre>forkserver</code> 有诸多限制，请参考文档</li>
</ul>
</blockquote>
<p>要选择启动方法，应该在 <code v-pre>if __name__ == '__main__'</code> 中调用 <code v-pre>set_start_method('method')</code> 来指定，仅指定一次</p>
<h2 id="_2-多进程通讯-队列和管道" tabindex="-1"><a class="header-anchor" href="#_2-多进程通讯-队列和管道" aria-hidden="true">#</a> 2. 多进程通讯：队列和管道</h2>
<p>进程彼此间的资源是不共享的，上下文相互隔离。因此实现进程间通信，队列和管道这两种方式可以传递消息。</p>
<p><strong>class multiprocessing.Queue([maxsize])</strong></p>
<blockquote>
<p>与标准库中的 <a href="">queue.Queue</a> 模块类似，实现多生产者，多消费者队列。返回了 <strong>一个管道</strong> 、 <strong>少量锁</strong> 和 <strong>信号量</strong> 构成的共享队列的实例。</p>
<p>当一个进程将一个对象放进队列中时，一个写入线程会启动，并将对象从缓冲区写入管道中去</p>
</blockquote>
<ul>
<li>参数：
<ul>
<li><code v-pre>maxsize：int = -1</code>：队列中允许的最大数量，若小于等于零则大小为无限</li>
</ul>
</li>
</ul>
<h2 id="_3-subprocess" tabindex="-1"><a class="header-anchor" href="#_3-subprocess" aria-hidden="true">#</a> 3. subprocess</h2>
<p><a href="https://docs.python.org/zh-cn/3/library/subprocess.html#module-subprocess" target="_blank" rel="noopener noreferrer"><code v-pre>subprocess</code><ExternalLinkIcon/></a> 模块允许你生成新的进程，连接它们的输入、输出、错误管道，并且获取它们的返回码，但该模块在 <strong>WebAssembly</strong> 无法使用</p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>用于替代老旧模块 如</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>os<span class="token punctuation">.</span>systm
os<span class="token punctuation">.</span>spawn<span class="token operator">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-关于-os-system-os-popen-和-subprocess-的区别" tabindex="-1"><a class="header-anchor" href="#_3-1-关于-os-system-os-popen-和-subprocess-的区别" aria-hidden="true">#</a> 3.1 <strong>关于 os.system os.popen 和 subprocess 的区别</strong></h3>
<p><strong>os.system()</strong></p>
<p>返回命令执行结果的返回值，有如下三步操作</p>
<ol>
<li><strong>fork</strong> 一个子进程</li>
<li>子进程中调用 <strong>exec</strong> 函数执行命令</li>
<li>父进程中调用 <strong>wait</strong> 阻塞等待子进程结果</li>
</ol>
<p><strong>os.popen()</strong></p>
<p>它先创建了一个管道，然后 <strong>fork</strong>一个子进程，子进程执行命令，但返回值在标准 <strong>IO</strong> 流中，该管道用于父子进程间通信</p>
<p>父进程要么从管道读信息，要么向管道写信息，至于是读还是写取决于父进程调用 <strong>popen</strong> 时传递的参数（<em><strong>w</strong> 或 <strong>r</strong></em> ）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> os

p <span class="token operator">=</span> os<span class="token punctuation">.</span>popen<span class="token punctuation">(</span><span class="token string">"exec command"</span><span class="token punctuation">)</span>
s <span class="token operator">=</span> p<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
p<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h3 id="_3-2-popen" tabindex="-1"><a class="header-anchor" href="#_3-2-popen" aria-hidden="true">#</a> 3.2 Popen</h3>
<p>通常可使用 <code v-pre>run()</code> 接口 传入 <strong>arg</strong> 指令等待其完成，并拿到返回的  <a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.CompletedProcess" target="_blank" rel="noopener noreferrer"><code v-pre>CompletedProcess</code><ExternalLinkIcon/></a> 实例解析</p>
<p>进阶用例请使用底层 <a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.Popen" target="_blank" rel="noopener noreferrer">Popen<ExternalLinkIcon/></a> 接口，其构造如下</p>
<p><code v-pre>class subprocess.Popen(args, bufsize=-1, executable=None, stdin=None, stdout=None, stderr=None, preexec_fn=None, close_fds=True, shell=False, cwd=None, env=None, universal_newlines=None, startupinfo=None, creationflags=0, restore_signals=True, start_new_session=False, pass_fds=(), *, group=None, extra_groups=None, user=None, umask=- 1, encoding=None, errors=None, text=None, pipesize=-1, process_group=None)</code></p>
<p>在一个新的进程，执行子程序</p>
<ul>
<li><strong>args：</strong> 参数序列、字符串（<em>必须 <code v-pre>shell=True</code></em> ），<strong>推荐序列形式</strong>，若字符串，则被作为将 <strong>被执行的程序的命名</strong> 或 <strong>路径</strong> 解释</li>
<li><strong>shell：</strong> 在 <strong>POSIX</strong>，当 <code v-pre>shell=True</code>， <strong>shell</strong> 默认为 <code v-pre>/bin/sh</code> ，若 <strong>args</strong> 是字符串，则将通过 <strong>shell</strong> 执行</li>
</ul>
<div class="custom-container danger">
<p class="custom-container-title">Shell 注入漏洞</p>
<p>关于为啥不推荐 <strong>shell=True</strong> 以及 <strong>subprocess</strong> 替代 <strong>os</strong> 模块，是由于 <strong>shell 注入漏洞</strong></p>
<p>针对 <strong>popen</strong> 其实现是不会隐式调用系统 <strong>shell</strong> 的（<em>不用 <code v-pre>/bin/sh</code> 解析命令</em> ），它是可以将所有字符（<em>包括 <strong>shell</strong> 元字符</em> ）安全传递给子进程</p>
<p>但指定 <strong>shell=True</strong> 时，则是显式发起调用（<em><strong>等效 os.system</strong></em> ）此时需要 <strong>应用程序本身</strong> 来保证字符串安全转义</p>
<p>不然攻击输入类似如下这种危险的命令，会引发严重事故</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> -l<span class="token punctuation">;</span><span class="token function">touch</span> <span class="token number">1</span>.txt	<span class="token comment"># ;rm -rf ~ | rm -rf / </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>防止操作系统命令注入漏洞的 <strong>最有效方法是永远不要从应用层代码中调用操作系统命令</strong></p>
<p>使用 <strong>shell=True</strong> 显示调用，尽管可以方便的直接使用 <strong>&quot;|&quot;</strong> 管道符或 <strong>”&gt;“</strong>，如 <strong>SMB</strong> 的录入用户数据</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>echo -e "12345\n12345\n" | pdbedit -t -a zz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>cmd <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"echo -e '</span><span class="token interpolation"><span class="token punctuation">{</span>password<span class="token punctuation">}</span></span><span class="token string">\n</span><span class="token interpolation"><span class="token punctuation">{</span>password<span class="token punctuation">}</span></span><span class="token string">\n' | </span><span class="token interpolation"><span class="token punctuation">{</span>PDBEDIT<span class="token punctuation">}</span></span><span class="token string"> -t -a </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">"</span></span>
out<span class="token punctuation">,</span> err<span class="token punctuation">,</span> rc <span class="token operator">=</span> <span class="token keyword">await</span> run_command<span class="token punctuation">(</span>cmd<span class="token punctuation">,</span> shell<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此时若将内嵌的参数 如 <code v-pre>{password}、{PDBEDIT}、{name}</code> 替换为危险的字符指令，则会引发跑路的后果，所以它不够安全，使用 <code v-pre>stdin=x.stdout</code> 输入则能安全的规避</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">df</span> <span class="token parameter variable">-h</span> <span class="token operator">|</span><span class="token function">grep</span> sda1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以将第一条指令的管道输出作为第二条指令的输入</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>In <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">:</span> p1 <span class="token operator">=</span> subprocess<span class="token punctuation">.</span>Popen<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'df'</span><span class="token punctuation">,</span><span class="token string">'-h'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> stdout<span class="token operator">=</span>subprocess<span class="token punctuation">.</span>PIPE<span class="token punctuation">)</span>
In <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">:</span> p2 <span class="token operator">=</span> subprocess<span class="token punctuation">.</span>Popen<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"grep"</span><span class="token punctuation">,</span> <span class="token string">"sda1"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> stdin<span class="token operator">=</span>p1<span class="token punctuation">.</span>stdout<span class="token punctuation">,</span> stdout<span class="token operator">=</span>subprocess<span class="token punctuation">.</span>PIPE<span class="token punctuation">)</span>
In <span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">:</span> p1<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
In <span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">:</span> output <span class="token operator">=</span> p2<span class="token punctuation">.</span>communicate<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
In <span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">:</span> output
Out<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token string">b'/dev/sda1       259M  119M  122M  50% /boot\n'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动 <code v-pre>p2</code> 之后再执行 <code v-pre>p1.stdout.close()</code> 调用很重要，这是为了让 <code v-pre>p1</code> 能在 <code v-pre>p2</code> 先于 <code v-pre>p1</code> 退出时接收到 <code v-pre>SIGPIPE</code></p>
</div>
<div class="custom-container warning">
<p class="custom-container-title">shlex</p>
<p>若真的必须用 <strong>shell=True</strong> 调用子进程，并使用 <strong>Python</strong> 调用用户输入，还有一种方法可以安全地做到这一点</p>
<p><a href="https://docs.python.org/zh-cn/3/library/shlex.html" target="_blank" rel="noopener noreferrer">shlex.quote()<ExternalLinkIcon/></a></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> shlex
<span class="token keyword">import</span> subprocess

subprocess<span class="token punctuation">.</span>call<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f'echo </span><span class="token interpolation"><span class="token punctuation">{</span>shlex<span class="token punctuation">.</span>quote<span class="token punctuation">(</span>user_string<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> >> user_string.txt'</span></span><span class="token punctuation">,</span> shell<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<ul>
<li>
<p><strong>bufsize：</strong> 给 <strong>open()</strong> 函数提供参数的，此时会创建 <strong>stdin/stdout/stderr</strong> 管道文件对象</p>
<ul>
<li><strong>0</strong> 表示不使用缓冲区（<em>读写是一个系统调用</em> ）可返回短内容</li>
<li><strong>1</strong> 表示一行 缓冲（<em>仅在 <code v-pre>text=True</code> 或 <code v-pre>universal_newlines=True</code> 中能用</em>）</li>
<li>任何 <strong>其他正值</strong>，表示使用约为对应大小的缓冲区</li>
<li>负值（<em>默认</em>）表示使用系统默认的 <code v-pre>io.DEFAULT_BUFFER_SIZE</code> ，即默认启用系统缓冲</li>
</ul>
</li>
<li>
<p><strong>executable：</strong> 指定一个要执行的替换程序，通常替换默认的 <strong>shell</strong> 即 <code v-pre>/bin/sh</code></p>
</li>
<li>
<p><strong>stdin/stdout/stderr：</strong> 指定被执行程序的 <strong>标准输入、标准输出、和标准错误 文件句柄</strong>，合法的值包括 <a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.PIPE" target="_blank" rel="noopener noreferrer"><code v-pre>PIPE</code><ExternalLinkIcon/></a>、<a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.DEVNULL" target="_blank" rel="noopener noreferrer"><code v-pre>DEVNULL</code><ExternalLinkIcon/></a>、现存的 <strong>文件描述符</strong>（<em>正整数</em> ）、现存的带有合法文件描述符的 <a href="https://docs.python.org/zh-cn/3/glossary.html#term-file-object" target="_blank" rel="noopener noreferrer">file object<ExternalLinkIcon/></a> 以及 <code v-pre>None</code></p>
<ul>
<li><strong>PIPE：</strong> 新建一个连接子进程的管道</li>
<li><strong>DEVNULL：</strong> 使用特殊的文件 <a href="https://docs.python.org/zh-cn/3/library/os.html#os.devnull" target="_blank" rel="noopener noreferrer"><code v-pre>os.devnull</code><ExternalLinkIcon/></a></li>
<li><strong>None：</strong> 将不会进行任何重定向，子进程的文件流将 <strong>继承自父进程</strong></li>
</ul>
<blockquote>
<p><strong>stderr</strong> 可以为 <a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.STDOUT" target="_blank" rel="noopener noreferrer"><code v-pre>STDOUT</code><ExternalLinkIcon/></a>，这表示来自子进程的 <strong>stderr</strong> 数据应当被捕获到与 <strong>stdout</strong> 相同的文件句柄中</p>
<p>若要在结果中同时捕获标准错误，请使用 <code v-pre>stderr=subprocess.STDOUT</code></p>
</blockquote>
</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p><strong>Popen</strong> 对象支持通过 <a href="https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with" target="_blank" rel="noopener noreferrer"><code v-pre>with</code><ExternalLinkIcon/></a> 语句作为上下文管理器，在退出时关闭文件描述符并等待进程</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">with</span> Popen<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"ifconfig"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> stdout<span class="token operator">=</span>PIPE<span class="token punctuation">)</span> <span class="token keyword">as</span> proc<span class="token punctuation">:</span>
    log<span class="token punctuation">.</span>write<span class="token punctuation">(</span>proc<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，如果您要做的事情比较复杂而又不能容纳在一行中，那么就需要 <code v-pre>devnull</code> 在 <code v-pre>Popen</code> 对象的整个生命中保持开放，而不仅仅是其构造。（<em>即将整个内容放入 <code v-pre>with</code> 语句</em>）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>devnull<span class="token punctuation">,</span> <span class="token string">'w'</span><span class="token punctuation">)</span> <span class="token keyword">as</span> devnull<span class="token punctuation">:</span>
    subprocess<span class="token punctuation">.</span>check_call<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'java'</span><span class="token punctuation">,</span> <span class="token string">'-jar'</span><span class="token punctuation">,</span> <span class="token string">'foo.jar'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> stdout<span class="token operator">=</span>devnull<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>POSIX</strong> 中重定向到 <code v-pre>/dev/null</code> 或 <strong>Windows</strong> 中的 <code v-pre>NUL</code></p>
<ul>
<li>
<p>优点是不会创建不必要的管道，更重要的是，<strong>不会在子进程写入时阻塞该管道</strong></p>
</li>
<li>
<p>缺点是  <code v-pre>os.devnull</code> 可能无法在某些平台上运行，若只关心 <strong>POSIX</strong> 和 <strong>Windows</strong> 上的<strong>CPython</strong>，<strong>PyPy</strong> 和 <strong>Jython</strong>，就没有问题</p>
</li>
</ul>
</div>
<ul>
<li>
<p><strong>cwd：</strong> 字符串、字节串、路径类对象，若 <strong>cwd</strong> 不为 <code v-pre>None</code>，此函数在执行子进程前会将当前工作目录改为 <strong>cwd</strong></p>
</li>
<li>
<p><strong>env：</strong> 可指定环境变量，映射格式如下（<em>字符串、字节串</em>）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>fake_env <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>environ<span class="token punctuation">)</span>
fake_env<span class="token punctuation">[</span><span class="token string">"LANG"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"en_US.UTF-8"</span>
<span class="token comment"># subprocess.Popen(..., env=fake_env)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>pipesize：</strong> 当 <code v-pre>subprocess.PIPE</code> 作为输入输出时，可指定管道大小（<em><strong>3.10</strong> 仅 <strong>Linux</strong></em>）</p>
</li>
</ul>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>Popen.poll()</code></td>
<td>检查子进程是否已终止</td>
</tr>
<tr>
<td><code v-pre>Popen.wait()</code></td>
<td>等待子进程终止（<em>小心死锁</em> ）</td>
</tr>
<tr>
<td><code v-pre>Popen.communicate()</code></td>
<td>允许与进程交互（<em>规避死锁</em> ）</td>
</tr>
<tr>
<td><code v-pre>Popen.send_signal()</code></td>
<td>向子进程发送信号</td>
</tr>
<tr>
<td><code v-pre>Popen.terminate()</code></td>
<td>停止子进程</td>
</tr>
<tr>
<td><code v-pre>Popen.kill()</code></td>
<td>终止（<em>杀死</em> ）子进程</td>
</tr>
</tbody>
</table>
<div class="custom-container info">
<p class="custom-container-title">说明</p>
<p>使用 <a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.Popen.communicate" target="_blank" rel="noopener noreferrer"><code v-pre>communicate()</code><ExternalLinkIcon/></a> 而非 <a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.Popen.stdin" target="_blank" rel="noopener noreferrer"><code v-pre>.stdin.write</code><ExternalLinkIcon/></a>， <a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.Popen.stdout" target="_blank" rel="noopener noreferrer"><code v-pre>.stdout.read</code><ExternalLinkIcon/></a> 或者 <a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.Popen.stderr" target="_blank" rel="noopener noreferrer"><code v-pre>.stderr.read</code><ExternalLinkIcon/></a> 来避免由于任意其他 <strong>OS</strong> 管道 <strong>缓冲区被子进程填满阻塞</strong> 而导致的 <strong>死锁</strong></p>
<p>它可以向 <strong>stdin</strong> 发送数据，或从 <strong>stdout</strong> 和 <strong>stderr</strong> 中读取数据</p>
<p><strong>Popen.communicate(input=None, timeout=None)</strong></p>
<ul>
<li><strong>input：</strong> 可以发送数据到 <strong>子进程</strong>，若流是以文本模式打开的，则为字符串，否则为字节串</li>
<li><strong>timeout：</strong> 若进程超时未终止，则 <strong>raise</strong> 一个 <a href="https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.TimeoutExpired" target="_blank" rel="noopener noreferrer"><code v-pre>TimeoutExpired</code><ExternalLinkIcon/></a> 异常，捕获此异常并重新等待将不会丢失任何输出</li>
</ul>
<p>如果超时到期，子进程不会被杀死，所以为了正确清理一个行为良好的应用程序应该杀死子进程并完成通讯</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>proc <span class="token operator">=</span> subprocess<span class="token punctuation">.</span>Popen<span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
<span class="token keyword">try</span><span class="token punctuation">:</span>
    outs<span class="token punctuation">,</span> errs <span class="token operator">=</span> proc<span class="token punctuation">.</span>communicate<span class="token punctuation">(</span>timeout<span class="token operator">=</span><span class="token number">15</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> TimeoutExpired<span class="token punctuation">:</span>
    proc<span class="token punctuation">.</span>kill<span class="token punctuation">(</span><span class="token punctuation">)</span>
    outs<span class="token punctuation">,</span> errs <span class="token operator">=</span> proc<span class="token punctuation">.</span>communicate<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> 内存里数据读取是缓冲的，<strong>若数据尺寸过大或无限，不要使用此方法</strong></p>
</div>
<h4 id="简单封装" tabindex="-1"><a class="header-anchor" href="#简单封装" aria-hidden="true">#</a> 简单封装</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">run_command_sync</span><span class="token punctuation">(</span>cmd<span class="token punctuation">,</span> shell<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> stdin<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>subprocess<span class="token punctuation">.</span>PIPE<span class="token punctuation">,</span> stdout<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>subprocess<span class="token punctuation">.</span>PIPE<span class="token punctuation">,</span>
                     stderr<span class="token operator">=</span>asyncio<span class="token punctuation">.</span>subprocess<span class="token punctuation">.</span>PIPE<span class="token punctuation">,</span> log<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> <span class="token builtin">input</span><span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> throw<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">"utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">"""Usage:
        shell:
            run_command_sync("ls -l", shell=True)
            run_command_sync("/usr/bin/ls -l", shell=True)
        program:
            run_command_sync("/usr/local/bin/your_program", shell=False)
            run_command_sync(["/usr/local/bin/your_program"], shell=False)
            run_command_sync(["/usr/bin/ls", "-l", "-a"], shell=False)
    """</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token comment"># We force run_command to always use en_US</span>
        <span class="token comment"># to avoid issues on date and number formats</span>
        <span class="token comment"># on not Anglo-Saxon systems (ex. it, es, fr, de, etc)</span>
        fake_env <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>environ<span class="token punctuation">)</span>
        fake_env<span class="token punctuation">[</span><span class="token string">"LANG"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"en_US.UTF-8"</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> shell<span class="token punctuation">:</span>
            cmd <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">,</span> cmd<span class="token punctuation">)</span>
        proc <span class="token operator">=</span> subprocess<span class="token punctuation">.</span>Popen<span class="token punctuation">(</span>
            cmd<span class="token punctuation">,</span>
            shell<span class="token operator">=</span>shell<span class="token punctuation">,</span>
            stdout<span class="token operator">=</span>stdout<span class="token punctuation">,</span>
            stderr<span class="token operator">=</span>stderr<span class="token punctuation">,</span>
            stdin<span class="token operator">=</span>stdin<span class="token punctuation">,</span>
            env<span class="token operator">=</span>fake_env<span class="token punctuation">,</span>
        <span class="token punctuation">)</span>
        out<span class="token punctuation">,</span> err <span class="token operator">=</span> proc<span class="token punctuation">.</span>communicate<span class="token punctuation">(</span><span class="token builtin">input</span><span class="token operator">=</span><span class="token builtin">input</span><span class="token punctuation">)</span>
        rc <span class="token operator">=</span> proc<span class="token punctuation">.</span>returncode
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> why<span class="token punctuation">:</span>
        err<span class="token punctuation">,</span> rc <span class="token operator">=</span> <span class="token string">"Exception while running command({}): {}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>cmd<span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>why<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span>
        logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token keyword">if</span> throw<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> why
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> rc
    <span class="token keyword">if</span> log<span class="token punctuation">:</span>
        logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">"Run command: {} => out, err, rc = {}, {}, {} ======="</span>
                    <span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>cmd<span class="token punctuation">,</span> out<span class="token punctuation">,</span> err<span class="token punctuation">,</span> rc<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> out<span class="token punctuation">.</span>decode<span class="token punctuation">(</span>encoding<span class="token operator">=</span>encoding<span class="token punctuation">)</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span>decode<span class="token punctuation">(</span>encoding<span class="token operator">=</span>encoding<span class="token punctuation">)</span><span class="token punctuation">,</span> rc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="bandit" tabindex="-1"><a class="header-anchor" href="#bandit" aria-hidden="true">#</a> Bandit</h4>
<p><strong>Bandit</strong> 这款工具可以用来搜索 <strong>Python</strong> 代码中常见的安全问题，在检测过程中，<strong>Bandit</strong> 会对每一份 <strong>Python</strong> 代码文件进行处理，并构建 <strong>AST</strong>，然后针对每一个 <strong>AST</strong> 节点运行相应的检测插件。完成安全扫描之后，**Bandit **会直接给用户生成检测报告（建议 <strong>CI/CD</strong> 时使用）</p>
</div></template>


