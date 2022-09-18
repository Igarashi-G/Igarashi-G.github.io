<template><div><h1 id="基于进程的并行" tabindex="-1"><a class="header-anchor" href="#基于进程的并行" aria-hidden="true">#</a> 基于进程的并行</h1>
<p><strong>multiprocessing</strong>：是一个与 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B#%E5%9F%BA%E4%BA%8E%E7%BA%BF%E7%A8%8B%E7%9A%84%E5%B9%B6%E5%8F%91" target="_blank" rel="noopener noreferrer">threading<ExternalLinkIcon/></a> 模块类似的包，能提供本地和远程的 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E8%BF%9B%E7%A8%8B#12-%E5%B9%B6%E5%8F%91" target="_blank" rel="noopener noreferrer">并发<ExternalLinkIcon/></a> 操作（若多核那么就是 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E8%BF%9B%E7%A8%8B#11-%E5%B9%B6%E8%A1%8C" target="_blank" rel="noopener noreferrer">并行<ExternalLinkIcon/></a> 操作）。它利用子进程来绕过了 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B#%E5%9F%BA%E4%BA%8E%E7%BA%BF%E7%A8%8B%E7%9A%84%E5%B9%B6%E5%8F%91" target="_blank" rel="noopener noreferrer">GIL 锁<ExternalLinkIcon/></a> ，适用于 Unix 和 Windows 系统的 <strong>CPU</strong>(计算)密集型操作（且通常不依赖上次计算结果）</p>
<h2 id="multiprocessing" tabindex="-1"><a class="header-anchor" href="#multiprocessing" aria-hidden="true">#</a> <a href="https://docs.python.org/zh-cn/3/library/multiprocessing.html?highlight=basemanager#module-multiprocessing" target="_blank" rel="noopener noreferrer">multiprocessing<ExternalLinkIcon/></a></h2>
<h3 id="主要功能介绍" tabindex="-1"><a class="header-anchor" href="#主要功能介绍" aria-hidden="true">#</a> 主要功能介绍</h3>
<ul>
<li>主要用于创建 <strong>子进程</strong> 对象，<code v-pre>Process</code>类，然后 start 启动</li>
<li>进程通信，支持 <code v-pre>Queue</code>类 队列和 <code v-pre>Pipe</code> 类管道通信</li>
<li>共享数据，在并发编程时通常 <strong>尽量避免共享状态</strong>，若需要，可使用共享内存 <code v-pre>Value </code> 或 <code v-pre>Array</code> 将数据存在共享内存的映射中。</li>
<li>进程同步，<code v-pre>Lock</code> 类实现进程的同步，避免同时抢占同一资源</li>
<li>进程池，<code v-pre>Pool</code> 类创建进程池</li>
<li>管理器，分布式计算，通过 <code v-pre>managers</code> 实现分布式的进程计算和通信</li>
<li>监听器，通过 <code v-pre>Listener</code> 监听管道来交互</li>
</ul>
<Alert type="error">使用 `multiprocessing` 时，应遵循一些指导原则和习惯[用法](https://docs.python.org/zh-cn/3/library/multiprocessing.html?highlight=basemanager#multiprocessing-programming)</Alert><h4 id="部分摘要" tabindex="-1"><a class="header-anchor" href="#部分摘要" aria-hidden="true">#</a> <strong>部分摘要</strong>：</h4>
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
<h2 id="_1-process-类" tabindex="-1"><a class="header-anchor" href="#_1-process-类" aria-hidden="true">#</a> 1 Process 类</h2>
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
  <img src="@source/python/Base/资源调度/img/多进程吃满CPU.png">
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
</div></template>


