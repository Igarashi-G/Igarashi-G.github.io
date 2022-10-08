<template><div><h1 id="异步编程史回溯" tabindex="-1"><a class="header-anchor" href="#异步编程史回溯" aria-hidden="true">#</a> 异步编程史回溯</h1>
<Alert type="queen"><Font type="info">从`同步`到<Font type="queen">yield from</Font></Font></Alert><p><a href="https://mp.weixin.qq.com/s/GgamzHPyZuSg45LoJKsofA" target="_blank" rel="noopener noreferrer">回溯<ExternalLinkIcon/></a></p>
<h2 id="一、程序执行基础概念" tabindex="-1"><a class="header-anchor" href="#一、程序执行基础概念" aria-hidden="true">#</a> 一、程序执行基础概念：</h2>
<h3 id="_1-1-阻塞" tabindex="-1"><a class="header-anchor" href="#_1-1-阻塞" aria-hidden="true">#</a> <strong>1.1 阻塞</strong></h3>
<ul>
<li>程序未得到所需计算资源时被挂起的状态。</li>
<li><strong>程序在等待某个操作完成期间，自身无法继续干别的事情，则称该程序在该操作上是阻塞的。</strong></li>
<li>常见的阻塞形式有：网络 I/O 阻塞、磁盘 I/O 阻塞、用户输入阻塞等。</li>
</ul>
<p>阻塞是无处不在的，包括 CPU 切换上下文时，所有的进程都无法真正干事情，它们也会被阻塞。（如果是多核 CPU 则正在执行上下文切换操作的核不可被利用）</p>
<h3 id="_1-2-非阻塞" tabindex="-1"><a class="header-anchor" href="#_1-2-非阻塞" aria-hidden="true">#</a> 1.2 非阻塞</h3>
<ul>
<li>
<p>程序在等待某操作过程中，自身不被阻塞，可以继续运行干别的事情，则称该程序在该操作上是非阻塞的。</p>
</li>
<li>
<p>非阻塞并不是在任何程序级别、任何情况下都可以存在的。</p>
</li>
<li>
<p>仅当程序封装的级别可以囊括独立的子程序单元时，它才可能存在非阻塞状态。</p>
</li>
</ul>
<p>非阻塞的存在是因为阻塞存在，正因为某个操作阻塞导致的耗时与效率低下，我们才要把它变成非阻塞的。</p>
<h3 id="_1-3-同步" tabindex="-1"><a class="header-anchor" href="#_1-3-同步" aria-hidden="true">#</a> 1.3 同步</h3>
<ul>
<li>
<p>不同程序单元为了完成某个任务，在执行过程中需靠某种通信方式以协调一致，称这些程序单元是同步执行的。</p>
</li>
<li>
<p>例如购物系统中更新商品库存，需要用“行锁”作为通信信号，让不同的更新请求强制排队顺序执行，那更新库存的操作是同步的。</p>
</li>
<li>
<p>简言之，同步意味着有序。</p>
</li>
</ul>
<h3 id="_1-4-异步" tabindex="-1"><a class="header-anchor" href="#_1-4-异步" aria-hidden="true">#</a> 1.4 异步</h3>
<ul>
<li>为完成某个任务，不同程序单元之间过程中无需通信协调，也能完成任务的方式。</li>
<li>不相关的程序单元之间可以是异步的。
例如，爬虫下载网页。调度程序调用下载程序后，即可调度其他任务，而无需与该下载任务保持通信以协调行为。不同网页的下载、保存等操作
都是无关的，也无需相互通知协调。这些异步操作的完成时刻并不确定。</li>
<li>简言之，异步意味着无序。</li>
<li>
<Badge type="queen">协程</Badge>、<Badge type="error">进程池</Badge>、<Badge type="info">线程池</Badge> 这些方式都能实现</li>
</ul>
<p>上文提到的“通信方式”通常是指异步和并发编程提供的同步原语，如信号量、锁、同步队列等等。我们需知道，虽然这些通信方式是为了让多个程序
在一定条件下同步执行，但正因为是异步的存在，才需要这些通信方式。如果所有程序都是按序执行，其本身就是同步的，又何需这些同步信号呢？</p>
<h3 id="_1-5-并发" tabindex="-1"><a class="header-anchor" href="#_1-5-并发" aria-hidden="true">#</a> 1.5 并发</h3>
<ul>
<li>
<p>并发描述的是程序的组织结构。指程序要被设计成多个可独立执行的子任务。</p>
</li>
<li>
<p>以利用有限的计算机资源使多个任务可以被实时或近实时执行为目的。</p>
</li>
</ul>
<h3 id="_1-6-并行" tabindex="-1"><a class="header-anchor" href="#_1-6-并行" aria-hidden="true">#</a> 1.6 并行</h3>
<ul>
<li>
<p>并行描述的是程序的执行状态。指多个任务同时被执行。</p>
</li>
<li>
<p>以利用富余计算资源（多核 CPU）加速完成多个任务为目的。</p>
</li>
</ul>
<p>并发提供了一种程序组织结构方式，让问题的解决方案可以并行执行，但并行执行不是必须的。</p>
<h3 id="_1-7-概念总结" tabindex="-1"><a class="header-anchor" href="#_1-7-概念总结" aria-hidden="true">#</a> 1.7 概念总结</h3>
<ul>
<li>
<p>[并行]是为了利用多核加速多任务完成的进度</p>
</li>
<li>
<p>[并发]是为了让独立的子任务都有机会被尽快执行，但不一定能加速整体进度</p>
</li>
<li>
<p>[非阻塞]是为了提高程序整体执行效率</p>
</li>
<li>
<p>[异步]是高效地组织非阻塞任务的方式</p>
</li>
</ul>
<p>要支持并发，必须拆分为多任务，不同任务相对而言才有阻塞/非阻塞、同步/异步。所以，并发、异步、非阻塞三个词总是如影随形。</p>
<h3 id="_1-8-异步编程" tabindex="-1"><a class="header-anchor" href="#_1-8-异步编程" aria-hidden="true">#</a> 1.8 异步编程</h3>
<p>以进程、线程、协程、函数/方法作为执行任务程序的基本单位，结合回调、事件循环、信号量等机制，以提高程序整体执行效率和并发能力的编程方式。</p>
<p>如果在某程序的运行时，能根据已经执行的指令准确判断它接下来要进行哪个具体操作，那它是同步程序，反之则为异步程序。（无序与有序的区别）</p>
<p>同步/异步、阻塞/非阻塞并非水火不容，要看讨论的程序所处的封装级别。例如购物程序在处理多个用户的浏览请求可以是异步的，而更新库存时必须是同步的。</p>
<h3 id="_1-9-异步之nan" tabindex="-1"><a class="header-anchor" href="#_1-9-异步之nan" aria-hidden="true">#</a> 1.9 异步之<code v-pre>nán</code></h3>
<p>控制不住“寄几”写的程序，因为其执行顺序不可预料，当下正要发生什么事件不可预料。在并行情况下更为复杂和艰难。</p>
<p>所以，几乎所有的异步框架都将异步编程模型简化：一次只允许处理一个事件。故而有关异步的讨论几乎都集中在了单线程内。</p>
<p>如果某事件处理程序需要长时间执行，所有其他部分都会被阻塞。</p>
<p>所以，一旦采取异步编程，每个异步调用必须“足够小”，不能耗时太久。如何拆分异步任务成了难题。</p>
<p>程序下一步行为往往依赖上一步执行结果，如何知晓上次异步调用已完成并获取结果？</p>
<p>回调（Callback）成了必然选择。那又需要面临“回调地狱”的折磨。</p>
<p>同步代码改为异步代码，必然破坏代码结构。</p>
<p>解决问题的逻辑也要转变，不再是一条路走到黑，需要精心安排异步任务。</p>
<h2 id="_2-苦心异步为哪般" tabindex="-1"><a class="header-anchor" href="#_2-苦心异步为哪般" aria-hidden="true">#</a> 2 苦心异步为哪般</h2>
<p>如上文所述，异步编程面临诸多难点，Python 之父亲自上阵打磨 4 年才使 asyncio 模块在 Python 3.6 中“转正”，如此苦心为什么？答案只有一个：
它值得！下面我们看看为何而值得。</p>
<h3 id="_2-1-cpu-的时间观" tabindex="-1"><a class="header-anchor" href="#_2-1-cpu-的时间观" aria-hidden="true">#</a> 2.1 CPU 的时间观</h3>
<p>我们将一个 2.6GHz 的 CPU 拟人化，假设它执行一条命令的时间，他它感觉上过了一秒钟。CPU 是计算机的处理核心，也是最宝贵的资源，如果有
浪费 CPU 的运行时间，导致其利用率不足，那程序效率必然低下（因为实际上有资源可以使效率更高）。</p>
<pre><code>CPU的时间观：
    操作          真实延迟            CPU的感觉
    执指          0.38纳秒               1秒
   内存寻址        100纳秒             4分20秒
上下文切换/系统调用 1.5微妙             1小时5分钟
Ping通IDC两台主机  0.5毫秒               15天
硬盘读取1M连续数据  20毫秒               20个月
ping通不同城市主机  150毫秒              12.5年
  虚拟机重启         4秒                 200年
  服务器重启        5分钟                2万5千年
</code></pre>
<p>如上文所示，在千兆网上传输 2KB 数据，CPU 感觉过了 14 个小时，如果是在 10M 的公网上呢？那效率会低百倍！如果在这么长的一段时间内，CPU 只是傻
等结果而不能去干其他事情，是不是在浪费 CPU 的青春？</p>
<p>鲁迅说，浪费“CPU”的时间等于谋财害命。而凶手就是程序猿。</p>
<h3 id="_2-2-面临的问题" tabindex="-1"><a class="header-anchor" href="#_2-2-面临的问题" aria-hidden="true">#</a> 2.2 面临的问题</h3>
<ul>
<li>
<p>成本问题:</p>
<pre><code>  如果一个程序不能有效利用一台计算机资源，那必然需要更多的计算机通过运行更多的程序实例来弥补需求缺口。例如我前不久主导重写
  的项目，使用Python异步编程，改版后由原来的7台服务器削减至3台，成本骤降57%。一台AWS m4.xlarge 型通用服务器按需付费实例
  一年价格约 1.2 万人民币。
</code></pre>
</li>
<li>
<p>效率问题:</p>
<pre><code>  如果不在乎钱的消耗，那也会在意效率问题。当服务器数量堆叠到一定规模后，如果不改进软件架构和实现，加机器是徒劳，而且运维成本
  会骤然增加。比如别人家的电商平台支持6000单/秒支付，而自家在下单量才支撑2000单/秒，在双十一这种活动的时候，钱送上门也赚不到。
</code></pre>
</li>
<li>
<p>C10k/C10M 挑战</p>
<pre><code>  C10k（concurrently handling 10k connections）是一个在1999年被提出来的技术挑战，如何在一颗1GHz CPU，2G内存，1gbps网络
  环境下，让单台服务器同时为1万个客户端提供FTP服务。而到了2010年后，随着硬件技术的发展，这个问题被延伸为C10M，即如何利用8核
  心CPU，64G内存，在10gbps的网络上保持1000万并发连接，或是每秒钟处理100万的连接。（两种类型的计算机资源在各自的时代都约为
  1200美元）
</code></pre>
</li>
</ul>
<p>成本和效率问题是从企业经营角度讲，C10k/C10M 问题则是从技术角度出发挑战软硬件极限。C10k/C10M 问题得解，成本问题和效率问题迎刃而解。</p>
<h3 id="_2-3-解决方案" tabindex="-1"><a class="header-anchor" href="#_2-3-解决方案" aria-hidden="true">#</a> 2.3 解决方案</h3>
<p>《约束理论与企业优化》中指出：“除了瓶颈之外，任何改进都是幻觉。”</p>
<p>CPU 告诉我们，它自己很快，而上下文切换慢、内存读数据慢、磁盘寻址与取数据慢、网络传输慢……总之，离开 CPU 后的一切，除了一级高速缓存，都很慢。我们观察计算机的组成可以知道，主要由运算器、控制器、存储器、输入设备、输出设备五部分组成。运算器和控制器主要集成在 CPU 中，除此之外全是 I/O，包括读写内存、读写磁盘、读写网卡全都是 I/O。I/O 成了最大的瓶颈。</p>
<p>异步程序可以提高效率，而最大的瓶颈在 I/O，业界诞生的解决方案没出意料：异步 I/O 吧，异步 I/O 吧，异步 I/O 吧吧！</p>
<h2 id="_3-异步-i-o-进化之路" tabindex="-1"><a class="header-anchor" href="#_3-异步-i-o-进化之路" aria-hidden="true">#</a> 3 异步 I/O 进化之路</h2>
<p>如今，地球上最发达、规模最庞大的计算机程序，莫过于因特网。而从 CPU 的时间观中可知，网络 I/O 是最大的 I/O 瓶颈，除了宕机没有比它更慢的
。所以，诸多异步框架都对准的是网络 I/O。</p>
<p>我们从一个爬虫例子说起，从因特网上下载 10 篇网页。</p>
<h3 id="_3-1-同步阻塞方式" tabindex="-1"><a class="header-anchor" href="#_3-1-同步阻塞方式" aria-hidden="true">#</a> 3.1 同步阻塞方式</h3>
<p>最容易想到的解决方案就是依次下载，从建立 socket 连接到发送网络请求再到读取响应数据，顺序进行。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> socket


<span class="token keyword">def</span> <span class="token function">blocking_way</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    sock <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># blocking</span>
    sock<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"example.com"</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    request <span class="token operator">=</span> <span class="token string">"GET HTTP:1.0/\r\n Host: example.com\r\n\r\n"</span>
    sock<span class="token punctuation">.</span>send<span class="token punctuation">(</span>request<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"ascii"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    response <span class="token operator">=</span> <span class="token string">b''</span>
    chunk <span class="token operator">=</span> sock<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>chunk<span class="token punctuation">)</span>
    <span class="token keyword">while</span> chunk<span class="token punctuation">:</span>
        response <span class="token operator">+=</span> chunk
        <span class="token comment"># blocking</span>
        chunk <span class="token operator">=</span> sock<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> response


<span class="token keyword">def</span> <span class="token function">sync_way</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        res<span class="token punctuation">.</span>append<span class="token punctuation">(</span>blocking_way<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token builtin">len</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    <span class="token keyword">import</span> time

    start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    sync_way<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>[注]：总体耗时约为 4.5 秒。（因网络波动每次测试结果有所变动，本文取多次平均值）</p>
<p>如上代码所示，blocking_way() 的作用是建立 socket 连接，发送 HTTP 请求，然后从 socket 读取 HTTP 响应并返回数据。示例中我们请求了
<a href="http://example.com" target="_blank" rel="noopener noreferrer">example.com<ExternalLinkIcon/></a> 的首页。在 sync_way() 执行了 10 次，即下载 <a href="http://example.com" target="_blank" rel="noopener noreferrer">example.com<ExternalLinkIcon/></a> 首页 10 次。</p>
<p>在示例代码中有两个关键点。一是第 10 行的 sock.connect((‘<a href="http://example.com" target="_blank" rel="noopener noreferrer">example.com<ExternalLinkIcon/></a>’, 80))，该调用的作用是向 <a href="http://example.com" target="_blank" rel="noopener noreferrer">example.com<ExternalLinkIcon/></a> 主机的 80 端口发起网络连接
请求。 二是第 14 行、第 18 行的 sock.recv(4096)，该调用的作用是从 socket 上读取 4K 字节数据。</p>
<p>我们知道，创建网络连接，多久能创建完成不是客户端决定的，而是由网络状况和服务端处理能力共同决定。服务端什么时候返回了响应数据并被客户
端接收到可供程序读取，也是不可预测的。所以 sock.connect()和 sock.recv()这两个调用在默认情况下是阻塞的。</p>
<p>[注]：sock.send()函数并不会阻塞太久，它只负责将请求数据拷贝到 TCP/IP 协议栈的系统缓冲区中就返回，并不等待服务端返回的应答确认。</p>
<p>假设网络环境很差，创建网络连接需要 1 秒钟，那么 sock.connect()就得阻塞 1 秒钟，等待网络连接成功。这 1 秒钟对一颗 2.6GHz 的 CPU 来讲，仿佛过去
了 83 年，然而它不能干任何事情。sock.recv()也是一样的必须得等到服务端的响应数据已经被客户端接收。我们下载 10 篇网页，这个阻塞过程就得
重复 10 次。如果一个爬虫系统每天要下载 1000 万篇网页呢？！</p>
<p>上面说了很多，我们力图说明一件事：同步阻塞的网络交互方式，效率低十分低下。特别是在网络交互频繁的程序中。这种方式根本不可能挑
战 C10K/C10M。</p>
<h3 id="_3-2-改进方式-多进程" tabindex="-1"><a class="header-anchor" href="#_3-2-改进方式-多进程" aria-hidden="true">#</a> 3.2 改进方式：多进程</h3>
<p>在一个程序内，依次执行 10 次太耗时，那开 10 个一样的程序同时执行不就行了。于是我们想到了多进程编程。为什么会先想到多进程呢？发展脉络
如此。在更早的操作系统（Linux 2.4）及其以前，进程是 OS 调度任务的实体，是面向进程设计的 OS。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> socket

<span class="token keyword">from</span> concurrent <span class="token keyword">import</span> futures


<span class="token keyword">def</span> <span class="token function">blocking_way</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    sock <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># blocking</span>
    sock<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"example.com"</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    request <span class="token operator">=</span> <span class="token string">"GET HTTP:1.0/\r\n Host: example.com\r\n\r\n"</span>
    sock<span class="token punctuation">.</span>send<span class="token punctuation">(</span>request<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"ascii"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    response <span class="token operator">=</span> <span class="token string">b''</span>
    chunk <span class="token operator">=</span> sock<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>chunk<span class="token punctuation">)</span>
    <span class="token keyword">while</span> chunk<span class="token punctuation">:</span>
        response <span class="token operator">+=</span> chunk
        <span class="token comment"># blocking</span>
        chunk <span class="token operator">=</span> sock<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> response


<span class="token keyword">def</span> <span class="token function">process_way</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    workers <span class="token operator">=</span> <span class="token number">10</span>
    <span class="token keyword">with</span> futures<span class="token punctuation">.</span>ProcessPoolExecutor<span class="token punctuation">(</span>workers<span class="token punctuation">)</span> <span class="token keyword">as</span> executor<span class="token punctuation">:</span>
        futs <span class="token operator">=</span> <span class="token punctuation">{</span>executor<span class="token punctuation">.</span>submit<span class="token punctuation">(</span>blocking_way<span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token builtin">len</span><span class="token punctuation">(</span><span class="token punctuation">[</span>fut<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">for</span> fut <span class="token keyword">in</span> futs<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>[注]：总体耗时约为 0.6 秒。(自测，windows 下并没有，也要 2~3s)</p>
<p>改善效果立竿见影。但仍然有问题。总体耗时并没有缩减到原来的十分之一，而是九分之一左右，还有一些时间耗到哪里去了？进程切换开销。</p>
<p>进程切换开销不止像“CPU 的时间观”所列的“上下文切换”那么低。CPU 从一个进程切换到另一个进程，需要把旧进程运行时的寄存器状态、内存状态全部
保存好，再将另一个进程之前保存的数据恢复。对 CPU 来讲，几个小时就干等着。当进程数量大于 CPU 核心数量时，进程切换是必然需要的。</p>
<p>除了切换开销，多进程还有另外的缺点。一般的服务器在能够稳定运行的前提下，可以同时处理的进程数在数十个到数百个规模。如果进程数量规模
更大，系统运行将不稳定，而且可用内存资源往往也会不足。</p>
<p>多进程解决方案在面临每天需要成百上千万次下载任务的爬虫系统，或者需要同时搞定数万并发的电商系统来说，并不适合。</p>
<p>除了切换开销大，以及可支持的任务规模小之外，多进程还有其他缺点，如状态共享等问题，后文会有提及，此处不再细究。</p>
<h3 id="_3-3-继续改进-多线程" tabindex="-1"><a class="header-anchor" href="#_3-3-继续改进-多线程" aria-hidden="true">#</a> 3.3 继续改进：多线程</h3>
<p>由于线程的数据结构比进程更轻量级，同一个进程可以容纳多个线程，从进程到线程的优化由此展开。后来的 OS 也把调度单位由进程转为线程，进
程只作为线程的容器，用于管理进程所需的资源。而且 OS 级别的线程是可以被分配到不同的 CPU 核心同时运行的。</p>
<pre><code>def thread_way():
    workers = 10
    with futures.ThreadPoolExecutor(workers) as executor:
        futs = {executor.submit(blocking_way) for i in range(10)}
    return len([fut.result() for fut in futs])
</code></pre>
<p>[注]：总体运行时间约 0.43 秒。(我承认，是快了不少)</p>
<p>结果符合预期，比多进程耗时要少些。从运行时间上看，多线程似乎已经解决了切换开销大的问题。而且可支持的任务数量规模，也变成了数百个到数千个。</p>
<p>但是，多线程仍有问题，特别是 Python 里的多线程。首先，Python 中的多线程因为 GIL 的存在，它们并不能利用 CPU 多核优势，一个 Python 进程中，
只允许有一个线程处于运行状态。那为什么结果还是如预期，耗时缩减到了十分之一？</p>
<p>因为在做阻塞的系统调用时，例如 sock.connect(),sock.recv()时，当前线程会释放 GIL，让别的线程有执行机会。但是单个线程内，在阻塞调用上
还是阻塞的。</p>
<p>小提示：Python 中 time.sleep 是阻塞的，都知道使用它要谨慎，但在多线程编程中，time.sleep 并不会阻塞其他线程。</p>
<p>除了 GIL 之外，所有的多线程还有通病。它们是被 OS 调度，调度策略是抢占式的，以保证同等优先级的线程都有均等的执行机会，那带来的问题是：并
不知道下一时刻是哪个线程被运行，也不知道它正要执行的代码是什么。所以就可能存在竞态条件。</p>
<p>例如爬虫工作线程从任务队列拿待抓取 URL 的时候，如果多个爬虫线程同时来取，那这个任务到底该给谁？那就需要用到“锁”或“同步队列”来保证下载
任务不会被重复执行。</p>
<p>而且线程支持的多任务规模，在数百到数千的数量规模。在大规模的高频网络交互系统中，仍然有些吃力。当然，多线程最主要的问题还是竞态条件。</p>
<h3 id="_3-4-非阻塞方式" tabindex="-1"><a class="header-anchor" href="#_3-4-非阻塞方式" aria-hidden="true">#</a> 3.4 非阻塞方式</h3>
<p>终于，我们来到了非阻塞解决方案。先来看看最原始的非阻塞如何工作的。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">nonblocking_way</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    sock <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span><span class="token punctuation">)</span>
    sock<span class="token punctuation">.</span>setblocking<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        sock<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"example.com"</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> BlockingIOError<span class="token punctuation">:</span>
        <span class="token comment"># 非阻塞连接过程中 也会 抛出异常</span>
        <span class="token keyword">pass</span>
    request <span class="token operator">=</span> <span class="token string">"GET HTTP:1.0/\r\n Host: example.com\r\n\r\n"</span>
    data <span class="token operator">=</span> request<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"ascii"</span><span class="token punctuation">)</span>
    <span class="token comment"># 不直到socket何时就绪，所以不断尝试发送</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            sock<span class="token punctuation">.</span>send<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
            <span class="token comment"># 直到send不抛异常，则发送完成</span>
            <span class="token keyword">break</span>
        <span class="token keyword">except</span> OSError<span class="token punctuation">:</span>
            <span class="token keyword">pass</span>

    response <span class="token operator">=</span> <span class="token string">b''</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            chunk <span class="token operator">=</span> sock<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span>
            <span class="token keyword">while</span> chunk<span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span>chunk<span class="token punctuation">)</span>
                response <span class="token operator">+=</span> chunk
                chunk <span class="token operator">=</span> sock<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">4096</span><span class="token punctuation">)</span>
            <span class="token keyword">break</span>
        <span class="token keyword">except</span> OSError<span class="token punctuation">:</span>
            <span class="token keyword">pass</span>
    <span class="token keyword">return</span> response
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">sync_way</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        res<span class="token punctuation">.</span>append<span class="token punctuation">(</span>nonblocking_way<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token builtin">len</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>[注]：总体耗时约 4.3 秒。
首先注意到两点，就感觉被骗了。一是耗时与同步阻塞相当，二是代码更复杂。要非阻塞何用？且慢。</p>
<p>上图第 9 行代码 sock.setblocking(False)告诉 OS，让 socket 上阻塞调用都改为非阻塞的方式。之前我们说到，非阻塞就是在做一件事的时候，不阻碍
调用它的程序做别的事情。上述代码在执行完 sock.connect() 和 sock.recv() 后的确不再阻塞，可以继续往下执行请求准备的代码或者是执行
下一次读取。</p>
<p>代码变得更复杂也是上述原因所致。第 11 行要放在 try 语句内，是因为 socket 在发送非阻塞连接请求过程中，系统底层也会抛出异常。connect()被
调用之后，立即可以往下执行第 15 和 16 行的代码。</p>
<p>需要 while 循环不断尝试 send()，是因为 connect()已经非阻塞，在 send()之时并不知道 socket 的连接是否就绪，只有不断尝试，尝试成功为止，
即发送数据成功了。recv()调用也是同理。</p>
<p>虽然 connect() 和 recv() 不再阻塞主程序，空出来的时间段 CPU 没有空闲着，但并没有利用好这空闲去做其他有意义的事情，而是在循环尝试读写
socket （不停判断非阻塞调用的状态是否就绪）。还得处理来自底层的可忽略的异常。也不能同时处理多个 socket 。</p>
<p>然后 10 次下载任务仍然按序进行。所以总体执行时间和同步阻塞相当。如果非得这样子，那还不如同步阻塞算了。</p>
<h5 id="附-使用上古神器gevent并发" tabindex="-1"><a class="header-anchor" href="#附-使用上古神器gevent并发" aria-hidden="true">#</a> <strong>附：使用上古神器<code v-pre>gevent</code>并发</strong></h5>
<p>使用<code v-pre>gevent</code> 库，该库借助于 <code v-pre>greenlet</code> 获得了还行的并发性能，但 <code v-pre>gevent</code> 只能在 <code v-pre>Unix/Linux</code> 下正常运行，<code v-pre>windows </code> 无法保证</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>安装 gevent：

pip <span class="token function">install</span> gevent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>服务端：</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> gevent

<span class="token keyword">from</span> gevent <span class="token keyword">import</span> socket<span class="token punctuation">,</span> monkey

monkey<span class="token punctuation">.</span>patch_all<span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment"># monkey补丁，用来最大程度监听IO阻塞</span>


<span class="token keyword">def</span> <span class="token function">start_server</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">:</span>
    sk <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span><span class="token punctuation">)</span>
    sk<span class="token punctuation">.</span>bind<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">)</span>
    sk<span class="token punctuation">.</span>listen<span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>

    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        conn<span class="token punctuation">,</span> addr <span class="token operator">=</span> sk<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"client accept address:"</span><span class="token punctuation">,</span> addr<span class="token punctuation">)</span>
        gevent<span class="token punctuation">.</span>spawn<span class="token punctuation">(</span>handle_request<span class="token punctuation">,</span> conn<span class="token punctuation">)</span>  <span class="token comment"># 每次连接成功都创建一个Greenlet对象</span>


<span class="token keyword">def</span> <span class="token function">handle_request</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            data <span class="token operator">=</span> conn<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"Received:"</span><span class="token punctuation">,</span> <span class="token builtin">repr</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
            conn<span class="token punctuation">.</span>send<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
    <span class="token keyword">finally</span><span class="token punctuation">:</span>
        conn<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>


start_server<span class="token punctuation">(</span><span class="token number">8004</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>客户端：</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> threading
<span class="token keyword">import</span> socket


<span class="token keyword">def</span> <span class="token function">sock_conn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    client <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span><span class="token punctuation">)</span>

    client<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">8004</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    count <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>  <span class="token comment"># 死循环，不断发送 hello + 次数</span>
        client<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"hello %s"</span> <span class="token operator">%</span> count<span class="token punctuation">)</span><span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"utf-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        data <span class="token operator">=</span> client<span class="token punctuation">.</span>recv<span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span>

        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"[%s]recv from server:"</span> <span class="token operator">%</span> threading<span class="token punctuation">.</span>get_ident<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 结果</span>
        count <span class="token operator">+=</span> <span class="token number">1</span>

    <span class="token comment"># client.close()</span>


<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># 并发100个socket连接</span>
    t <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>sock_conn<span class="token punctuation">)</span>
    t<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-非阻塞改进" tabindex="-1"><a class="header-anchor" href="#_3-5-非阻塞改进" aria-hidden="true">#</a> 3.5 非阻塞改进</h3>
<h4 id="_3-5-1-epoll" tabindex="-1"><a class="header-anchor" href="#_3-5-1-epoll" aria-hidden="true">#</a> 3.5.1 epoll</h4>
<p>判断非阻塞调用是否就绪如果 OS 能做，是不是应用程序就可以不用自己去等待和判断了，就可以利用这个空闲去做其他事情以提高效率。</p>
<p>所以 OS 将 I/O 状态的变化都封装成了事件，如可读事件、可写事件。并且提供了专门的系统模块让应用程序可以接收事件通知。这个模块就是 select。
让应用程序可以通过 select 注册文件描述符和回调函数。当文件描述符的状态发生变化时，select 就调用事先注册的回调函数。</p>
<p>select 因其算法效率比较低，后来改进成了 poll，再后来又有进一步改进，BSD 内核改进成了 kqueue 模块，而 Linux 内核改进成了 epoll 模块。这四个
模块的作用都相同，暴露给程序员使用的 API 也几乎一致，区别在于 kqueue 和 epoll 在处理大量文件描述符时效率更高。</p>
<p>鉴于 Linux 服务器的普遍性，以及为了追求更高效率，所以我们常常听闻被探讨的模块都是 epoll 。</p>
<h4 id="_3-5-2-回调-callback" tabindex="-1"><a class="header-anchor" href="#_3-5-2-回调-callback" aria-hidden="true">#</a> 3.5.2 回调(Callback)</h4>
<p>把 I/O 事件的等待和监听任务交给了 OS，那 OS 在知道 I/O 状态发生改变后（例如 socket 连接已建立成功可发送数据），它又怎么知道接下来该干嘛
呢？只能回调。</p>
<p>需要我们将发送数据与读取数据封装成独立的函数，让 epoll 代替应用程序监听 socket 状态时，得告诉 epoll：“如果 socket 状态变为可以往里写数据
（连接建立成功了），请调用 HTTP 请求发送函数。如果 socket 变为可以读数据了（客户端已收到响应），请调用响应处理函数。”</p>
<p>于是我们利用 epoll 结合回调机制重构爬虫代码：</p>
</div></template>


