<template><div><h1 id="实现简化版-asyncio" tabindex="-1"><a class="header-anchor" href="#实现简化版-asyncio" aria-hidden="true">#</a> 实现简化版 asyncio</h1>
<p><a href="https://zhuanlan.zhihu.com/p/64991670" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/64991670<ExternalLinkIcon/></a>
嗐，要弄懂一个玩意到底是啥，当然少不了一睹 cpython 与 asyncio 的源码。</p>
<h2 id="一、进程、线程与协程" tabindex="-1"><a class="header-anchor" href="#一、进程、线程与协程" aria-hidden="true">#</a> 一、进程、线程与协程</h2>
<p>多进程、多线程、协程的模型都是为了解决多个任务同时进行的问题。</p>
<p>多系统任务：关键在于暂停当前任务，保存当前任务现场（状态），选择下一任务，恢复下一任务的现场，执行下一任务。但在计算机当中，我们不
称为现场 or 状态 or 环境，而是称为上下文。</p>
<h4 id="在《深入理解操作系统》中-开篇就是" tabindex="-1"><a class="header-anchor" href="#在《深入理解操作系统》中-开篇就是" aria-hidden="true">#</a> 在《深入理解操作系统》中，开篇就是：</h4>
<ul>
<li>
<p>信息 = 位 + 上下文</p>
</li>
<li>
<p>程序 = 指令序列 + 上下文</p>
</li>
</ul>
<p>注： 个人对上下文的理解，指当前执行时的各种能访问到的环境变量，数据之类的</p>
<h4 id="指令序列-上下文" tabindex="-1"><a class="header-anchor" href="#指令序列-上下文" aria-hidden="true">#</a> 指令序列 &amp; 上下文</h4>
<p>指令序列的含义是固定的：在计算机中 PC 寄存器的地址指向的值，也就是 CPU 要执行的指令。
但是对于计算机的不同层次，上下文的含义也不同。</p>
<ul>
<li>
<p>对于 CPU 来说：上下文是操作数寄存器，栈寄存器，状态寄存器等各类寄存器。</p>
</li>
<li>
<p>对于进程来说：上下文是寄存器、信号、分配的内存空间、文件描述符等各类由 CPU 抽象出来的硬件资源。</p>
</li>
<li>
<p>对于线程来说：上下文是寄存器，线程堆栈...</p>
</li>
<li>
<p>对于一个函数来说：上下文就是当前的命名空间。（因此我的浅薄理解只能到这里）</p>
</li>
<li>
<p>那么对于协程来说：上下文是什么？？？</p>
</li>
</ul>
<h4 id="各种程的切换" tabindex="-1"><a class="header-anchor" href="#各种程的切换" aria-hidden="true">#</a> 各种程的切换</h4>
<p>进程的切换时，操作系统控制，也就是由操作系统来执行</p>
<p>Python 线程的切换，是 python 虚拟机的控制，通过一个系统调用，来进行线程的切换。协程的切换过程完全由程序自身控制。</p>
<ul>
<li>
<p>进程的切换：需要切换系统资源的指令，消耗时间最长。</p>
</li>
<li>
<p>线程的切换：不需要切换系统资源，只需要切换指令、线程堆栈。但这个过程也需要系统调用。</p>
</li>
<li>
<p>协程的切换：都在用户内进行，不需要进行系统调用。</p>
</li>
</ul>
<h4 id="系统调用" tabindex="-1"><a class="header-anchor" href="#系统调用" aria-hidden="true">#</a> 系统调用</h4>
<p>现代 CPU 通常分 4 中级别，ring0 到 ring3 代表内核态和用户态。普通应用程序都是运行再用户态下，多种操作都会受到限制，比如访问硬件资源等。
特权高的代码，可以将自己降至低等级的级别，反之不行。</p>
<p>系统调用是运行在内核态的，那么运行用户态的程序如何运行内核态的代码呢？ ———— 操作系统一般是通过中断来从用户态切换到内核态的。</p>
<p>中断：中断号 + 中断处理程序， 分为软件中断和硬件中断。</p>
<p>内核有个中断向量表，当中断到来，CPU 会暂停正在执行的代码，根据中断号到向量表找出中断处理程序并调用。中断处理程序执行完成后，会继续执行
之前暂停的代码。</p>
<p>注：中断号是有限的，因此不会一个中断号对应一个系统调用。（系统调用有很多</p>
<p>其中各种指令，如执行 int $0x08 会让 CPU 陷入中断，并执行对应 $0x08 的中断处理函数。不过在那之前，CPU 会进行栈切换（程序需要由用户态
切换到内核态，程序会当前栈会从用户栈切换到内核栈）与之对应，当中断程序结束后，当前栈要从内核栈切换回用户栈。</p>
<h4 id="协程的优势" tabindex="-1"><a class="header-anchor" href="#协程的优势" aria-hidden="true">#</a> 协程的优势</h4>
<p>协程优于线程的主要在于</p>
<ul>
<li>
<p>python 线程的调度方式是，每执行 100 个字节码或者遇到阻塞就停止当前的线程，然后进行系统调用，让 OS 内核选出下一个线程。但是协程只会在
阻塞的时候，切换到下一个协程。100 个字节码，说多不多，说少不少，你调用两个库函数说不定就没了，因此线程很多切换其实是无效切换，当线程
数量越大，这种因为调度策略的先天不足 带来的性能损耗会越大。（目前最新版本改为通过时间来进行调度，一样垃圾）</p>
</li>
<li>
<p>线程需要进行系统调度（中断、用户/内核态、栈 切换那套），但协程不需要。系统调用需要进入内核态，无效的调度会让这部分开销显得更大。</p>
</li>
<li>
<p>协程可以自主调度，而线程只能决定适合退出，但是下一个线程是谁则依赖于操作系统。</p>
</li>
</ul>
<h4 id="协程的种类" tabindex="-1"><a class="header-anchor" href="#协程的种类" aria-hidden="true">#</a> 协程的种类</h4>
<p>协程有两种：一种无栈协程，python 中以 asyncio 为代表， 一种是有栈协程，python 中以 gevent 为代表</p>
<p>两者如何保存切换上下文的方式不大一样。我们先看看 asyncio ，以后有机会再补上 gevent 相关的内容。</p>
<h2 id="二、yield-与-yield-from" tabindex="-1"><a class="header-anchor" href="#二、yield-与-yield-from" aria-hidden="true">#</a> 二、yield 与 yield from</h2>
<p>最新版的 python 已经<strong>不采用基于 <code v-pre>yield</code> 的协程</strong>了。但此处用 <code v-pre>yield</code> 和 <code v-pre>yield from</code> 来实现协程，而不用 <code v-pre>async</code> 与 <code v-pre>await</code></p>
<p>以便于更好的展示<strong>生成器</strong> 到 <strong>协程</strong> 的完整历史，原理是相通的</p>
<h3 id="_2-1-yield-例子" tabindex="-1"><a class="header-anchor" href="#_2-1-yield-例子" aria-hidden="true">#</a> 2.1 yield 例子</h3>
<p>我们先看一个最简单的 <strong>yield 例子:</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">ex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"yield 1"</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token number">1</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"yield 2"</span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token number">2</span>

gen <span class="token operator">=</span> ex<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"启动生成器"</span><span class="token punctuation">)</span>
a <span class="token operator">=</span> gen<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'从生成器中获取一个值'</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span>
b <span class="token operator">=</span> gen<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'获取到的第二个值'</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span>

<span class="token comment"># out</span>
<span class="token comment"># 启动生成器</span>
<span class="token comment"># yield 1</span>
<span class="token comment"># 从生成器中获取一个值 1</span>
<span class="token comment"># yield 2</span>
<span class="token comment"># 获取到的第二个值 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>程序运行到了第一个 <code v-pre>yield</code> 的时候 保存了函数的上下文，并退出了。</p>
<p>接下来 又通过 next() / .send(None) / .<strong>next</strong>() 方法再次进入这个 函数，继续运行。在这里，被保存的上下文得到了恢复。</p>
<p>这几行代码里已经展示了一个协程所需要的的全部。</p>
<ul>
<li>1.保存上下文</li>
<li>2.切换运行程序</li>
<li>3.恢复上下文</li>
<li>4.重新进入程序。</li>
</ul>
<h3 id="_2-2-python-上下文源码" tabindex="-1"><a class="header-anchor" href="#_2-2-python-上下文源码" aria-hidden="true">#</a> 2.2 python 上下文<a href="/back_end/python/base/%E8%BF%9B%E9%98%B6%E6%A6%82%E5%BF%B5/cpython%E5%AF%B9%E8%B1%A1%E6%8F%AD%E7%A7%98" target="_blank" rel="noopener noreferrer">源码<ExternalLinkIcon/></a></h3>
<p>python 中的上下文，被封装成了一个叫做 PyFrameObject 的结构，又称之为栈帧，看一下他的源码。</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_frame</span> <span class="token punctuation">{</span>   <span class="token comment">/*这玩意即是栈帧，*f_back就存着上一个栈帧，构成类似链表的形式*/</span>
    PyObject_VAR_HEAD
    <span class="token keyword">struct</span> <span class="token class-name">_frame</span> <span class="token operator">*</span>f_back<span class="token punctuation">;</span>      <span class="token comment">/* previous frame, or NULL  上一个栈帧*/</span>
    PyCodeObject <span class="token operator">*</span>f_code<span class="token punctuation">;</span>       <span class="token comment">/* code segment 代码段*/</span>
    PyObject <span class="token operator">*</span>f_builtins<span class="token punctuation">;</span>       <span class="token comment">/* builtin symbol table (PyDictObject) 内建变量表*/</span>
    PyObject <span class="token operator">*</span>f_globals<span class="token punctuation">;</span>        <span class="token comment">/* global symbol table (PyDictObject)  全局变量表*/</span>
    PyObject <span class="token operator">*</span>f_locals<span class="token punctuation">;</span>         <span class="token comment">/* local symbol table (any mapping)  局部变量表*/</span>
    PyObject <span class="token operator">*</span><span class="token operator">*</span>f_valuestack<span class="token punctuation">;</span>    <span class="token comment">/* points after the last local  栈底*/</span>
    <span class="token comment">/* Next free slot in f_valuestack.  Frame creation sets to f_valuestack.
       Frame evaluation usually NULLs it, but a frame that yields sets it
       to the current stack top. */</span>
    PyObject <span class="token operator">*</span><span class="token operator">*</span>f_stacktop<span class="token punctuation">;</span>    <span class="token comment">/*  栈顶 */</span>
    PyObject <span class="token operator">*</span>f_trace<span class="token punctuation">;</span>          <span class="token comment">/* Trace function */</span>
    <span class="token keyword">char</span> f_trace_lines<span class="token punctuation">;</span>         <span class="token comment">/* Emit per-line trace events? */</span>
    <span class="token keyword">char</span> f_trace_opcodes<span class="token punctuation">;</span>       <span class="token comment">/* Emit per-opcode trace events? */</span>

    <span class="token comment">/* Borrowed reference to a generator, or NULL  专为生成器设计的指针*/</span>
    PyObject <span class="token operator">*</span>f_gen<span class="token punctuation">;</span>

    <span class="token keyword">int</span> f_lasti<span class="token punctuation">;</span>                <span class="token comment">/* Last instruction if called   运行的上一个字节码位置*/</span>
    <span class="token comment">/* Call PyFrame_GetLineNumber() instead of reading this field
       directly.  As of 2.3 f_lineno is only valid when tracing is
       active (i.e. when f_trace is set).  At other times we use
       PyCode_Addr2Line to calculate the line from the current
       bytecode index. */</span>
    <span class="token keyword">int</span> f_lineno<span class="token punctuation">;</span>               <span class="token comment">/* Current line number   运行字节码对应的python源代码的行数*/</span>
    <span class="token keyword">int</span> f_iblock<span class="token punctuation">;</span>               <span class="token comment">/* index in f_blockstack */</span>
    <span class="token keyword">char</span> f_executing<span class="token punctuation">;</span>           <span class="token comment">/* whether the frame is still executing */</span>
    PyTryBlock f_blockstack<span class="token punctuation">[</span>CO_MAXBLOCKS<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">/* for try and loop blocks */</span>
    PyObject <span class="token operator">*</span>f_localsplus<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>  <span class="token comment">/* locals+stack, dynamically sized */</span>
<span class="token punctuation">}</span> PyFrameObject<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>做了简单的注释。</p>
<p>在 Python 实际的执行中，会产生很多 PyFrameObject 对象，而这些对象会被链接起来，形成一条执行环境链表。这正是对 x86 机器上栈帧间关系的模拟。
在 x86 上，栈帧间通过 esp 指针和 ebp 指针建立了关系，使新的栈帧在结束之后能顺利回到旧的栈帧中，而 Python 正是利用 f_back 来完成这个动作。</p>
<p>[注]：esp 是堆栈指针，ebp 是基址指针（通常 32 位的机器上有两个指针寄存器，即 sp/bp）主要用于存放堆栈内 存储单元的偏移量，可实现多种存储器
操作数的寻址方式。</p>
<ul>
<li>BP 为基指针寄存器，用它可以直接 存取 堆栈顶中的数据。</li>
<li>SP 为堆栈指针寄存器，用它只可 访问 栈顶。</li>
</ul>
<p>另外比较重要的两点就是各种环境变量表，以及程序运行必不可少的堆栈。f_lasti 记录了字节码运行的位置，这也就意味着在 PyFrameObject 中，
我们可以随时恢复代码的运行。</p>
<h3 id="_2-3-生成器定义" tabindex="-1"><a class="header-anchor" href="#_2-3-生成器定义" aria-hidden="true">#</a> 2.3 生成器定义</h3>
<p>接下来看一下 <strong>Cpython</strong> 中对 <code v-pre>生成器</code>的定义</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>define <span class="token function">_PyGenObject_HEAD</span><span class="token punctuation">(</span>prefix<span class="token punctuation">)</span>    \\ 是一个宏而不是一个 <span class="token keyword">struct</span> 结构体
    PyObject_HEAD
    <span class="token comment">/* Note: gi_frame can be NULL if the generator is "finished"  生成器的上下文 PyFrame 指针*/</span>
    <span class="token keyword">struct</span> <span class="token class-name">_frame</span> <span class="token operator">*</span>prefix##_frame<span class="token punctuation">;</span>
    <span class="token comment">/* True if generator is being executed. */</span>
    <span class="token keyword">char</span> prefix##_running<span class="token punctuation">;</span>       \\ 运行状态
    <span class="token comment">/* The code object backing the generator */</span>
    PyObject <span class="token operator">*</span>prefix##_code<span class="token punctuation">;</span>                  \\ 字节码
    <span class="token comment">/* List of weak reference. */</span>
    PyObject <span class="token operator">*</span>prefix##_weakreflist<span class="token punctuation">;</span>
    <span class="token comment">/* Name of the generator. */</span>
    PyObject <span class="token operator">*</span>prefix##_name<span class="token punctuation">;</span>
    <span class="token comment">/* Qualified name of the generator. */</span>
    PyObject <span class="token operator">*</span>prefix##_qualname<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 python 中，生成器的语法规则比较特殊，长得像个函数，但是调用之后却返回一个生成器对象。所以他的结构体定义也比较特殊，是一个宏。
其中最重要的 是 prefix_frame, ## 是连接符。它指向了一个 PyFrameObject 对象，就是该生成器的上下文。
（大概是指，prefix_frame 指针这玩意存了生成器的上下文）</p>
<p>这个结构体中，有三个最重要的成员</p>
<ul>
<li>
<p>指向生成器上下文的 指针</p>
</li>
<li>
<p>一个指示生成器状态的字符串 未启动，停止，运行，结束</p>
</li>
<li>
<p>生成器的字节码</p>
</li>
</ul>
<p>也就是 上下文 + 指令序列 + 状态</p>
<h3 id="_2-4-send" tabindex="-1"><a class="header-anchor" href="#_2-4-send" aria-hidden="true">#</a> 2.4 send</h3>
<p>next 与 send 作用是一致的，只是 send 可以传入一个参数，我们来看一下 send 的实现。</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">static</span> PyObject <span class="token operator">*</span>
<span class="token function">gen_send_ex</span><span class="token punctuation">(</span>PyGenObject <span class="token operator">*</span>gen<span class="token punctuation">,</span> PyObject <span class="token operator">*</span>arg<span class="token punctuation">,</span> <span class="token keyword">int</span> exc<span class="token punctuation">,</span> <span class="token keyword">int</span> closing<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    PyThreadState <span class="token operator">*</span>tstate <span class="token operator">=</span> <span class="token function">PyThreadState_GET</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    PyFrameObject <span class="token operator">*</span>f <span class="token operator">=</span> gen<span class="token operator">-></span>gi_frame<span class="token punctuation">;</span>
    PyObject <span class="token operator">*</span>result<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ ·······
​</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>    <span class="token keyword">if</span> <span class="token punctuation">(</span>f<span class="token operator">-></span>f_lasti <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>arg <span class="token operator">&amp;&amp;</span> arg <span class="token operator">!=</span> Py_None<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>msg <span class="token operator">=</span> <span class="token string">"can't send non-None value to a "</span>
                              <span class="token string">"just-started generator"</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">PyCoro_CheckExact</span><span class="token punctuation">(</span>gen<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                msg <span class="token operator">=</span> NON_INIT_CORO_MSG<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">PyAsyncGen_CheckExact</span><span class="token punctuation">(</span>gen<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                msg <span class="token operator">=</span> <span class="token string">"can't send non-None value to a "</span>
                      <span class="token string">"just-started async generator"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token function">PyErr_SetString</span><span class="token punctuation">(</span>PyExc_TypeError<span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">/* Push arg onto the frame's value stack */</span>
        result <span class="token operator">=</span> arg <span class="token operator">?</span> arg <span class="token operator">:</span> Py_None<span class="token punctuation">;</span>
        <span class="token function">Py_INCREF</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>            <span class="token comment">/* 如果有参数 就将其压栈*/</span>
        <span class="token operator">*</span><span class="token punctuation">(</span>f<span class="token operator">-></span>f_stacktop<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token operator">=</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/* Generators always return to their most recent caller, not
     * necessarily their creator. */</span>
    <span class="token function">Py_XINCREF</span><span class="token punctuation">(</span>tstate<span class="token operator">-></span>frame<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">assert</span><span class="token punctuation">(</span>f<span class="token operator">-></span>f_back <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    f<span class="token operator">-></span>f_back <span class="token operator">=</span> tstate<span class="token operator">-></span>frame<span class="token punctuation">;</span>

    gen<span class="token operator">-></span>gi_running <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>         <span class="token comment">/* 将生成器设置为运行状态 */</span>
    gen<span class="token operator">-></span>gi_exc_state<span class="token punctuation">.</span>previous_item <span class="token operator">=</span> tstate<span class="token operator">-></span>exc_info<span class="token punctuation">;</span>
    tstate<span class="token operator">-></span>exc_info <span class="token operator">=</span> <span class="token operator">&amp;</span>gen<span class="token operator">-></span>gi_exc_state<span class="token punctuation">;</span>
    result <span class="token operator">=</span> <span class="token function">PyEval_EvalFrameEx</span><span class="token punctuation">(</span>f<span class="token punctuation">,</span> exc<span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">/* 正式运行 生成器 得到返回值*/</span>
    tstate<span class="token operator">-></span>exc_info <span class="token operator">=</span> gen<span class="token operator">-></span>gi_exc_state<span class="token punctuation">.</span>previous_item<span class="token punctuation">;</span>
    gen<span class="token operator">-></span>gi_exc_state<span class="token punctuation">.</span>previous_item <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    gen<span class="token operator">-></span>gi_running <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    ········

    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>省略了一些代码，不过关键的代码也就这些。 如果有传入参数，就将参数入栈，用这种方式来向生成器传递值。然后更改生成器运行状态。通过
PyEval_EvalFrameEx 函数运行生成器保存的栈帧，返回值。</p>
<h3 id="_2-5-yield-from" tabindex="-1"><a class="header-anchor" href="#_2-5-yield-from" aria-hidden="true">#</a> 2.5 yield from</h3>
<p>在生成器中，可以用 return 返回值，但如果 send 走到 return 语句的时候会报一个 StopIteration。 return 返回值的 就在 exception 的
value 中。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">ex2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">yield</span> <span class="token number">1</span>
    <span class="token keyword">return</span> <span class="token number">2</span>

gen <span class="token operator">=</span> ex2<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">try</span><span class="token punctuation">:</span>
    gen<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
    gen<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> StopIteration <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>value<span class="token punctuation">)</span>

<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>
StopIteration<span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>yield from 有两重性质：</p>
<p>1、一方面，它是一个表达式，表达式自然是有值的，他的值，就是 yield from 后面生成器 return 的返回值。
非常关键的一点，生成器的 yield 语句会向外产出值，但是 return 的值并不会向外产出。想要获得 return 的返回值，要么用 try 语句捕获异常
要么用 yield from 表达式获取值。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">ex2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">yield</span> <span class="token number">1</span>
    <span class="token keyword">return</span> <span class="token number">2</span>


<span class="token keyword">def</span> <span class="token function">ex1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    ret <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token keyword">from</span> ex2<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"yield from 表达式的值：</span><span class="token interpolation"><span class="token punctuation">{</span>ret<span class="token punctuation">}</span></span><span class="token string">, yield from 可以替代try-except来获取到value"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token boolean">None</span>


gen <span class="token operator">=</span> ex1<span class="token punctuation">(</span><span class="token punctuation">)</span>

send_result <span class="token operator">=</span> gen<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>send_result<span class="token punctuation">)</span>

send_result <span class="token operator">=</span> gen<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>send_result<span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># 1</span>
<span class="token comment"># yield from 表达式的值：2, yield from 可以替代try-except来获取到value</span>
<span class="token comment"># None</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、yield from 另外一点就是，能将内层的生成器的返回值，传到外层。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">ex2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">yield</span> <span class="token number">1</span>
    <span class="token keyword">yield</span> <span class="token number">2</span>
    <span class="token keyword">return</span> <span class="token number">3</span>

<span class="token keyword">def</span> <span class="token function">ex3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    ret <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token keyword">from</span> ex2<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"yield from 表达式的值：</span><span class="token interpolation"><span class="token punctuation">{</span>ret<span class="token punctuation">}</span></span><span class="token string">, 内层生成器 ex2() 通过 yield from，可以在最外层取出来"</span></span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> ex3<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内层生成器 ex2() 通过 yield from，可以在最外层取出来。</p>
<p>关于 yield from，我觉得讲的最清楚的是 流畅的 python 16 章 协程的有关内容，各位有兴趣可以看看，我这里不做深入展开。</p>
<p>有了 yield from 这个工具，我们便可以将多个生成器串联起来。</p>
<p>我尝试用树形结构来描述一个生成器，也许对协程的理解会有帮助。我们将 yield 的返回值视为 子节点，将生成器本身和 return 的值视为父节点。
可以用一个图来描述。</p>
<pre><code>                   ↗ 1
-&gt; gen1_result ————→  2
                   ↘ 3
</code></pre>
<p>yield from 的意义在于，将这些生成器串联起来形成一颗树，并且提供了一种便捷的方法，将这颗树的叶子节点依次返回。</p>
<pre><code>                        ↗ 1
gen3 ——→ gen1_result ————→ 2
     |                  ↘ 3
     |↘ gen2_result ————&gt; 4
      ↘—————————————————— 5
</code></pre>
<p>yield from 将多个生成器连接起来的方式，我们可以使用很简单的方式就可以将所有的 yield 返回值一一提取出来。不断的对根节点的生成器
进行 send 操作即可。也就是 gen3.send(None)。（会从 gen1 开始 yield from 1、2、3.... 5）</p>
<h2 id="三、从生成器到协程-本文的协程-单指-asyncio-中的协程" tabindex="-1"><a class="header-anchor" href="#三、从生成器到协程-本文的协程-单指-asyncio-中的协程" aria-hidden="true">#</a> 三、从生成器到协程（本文的协程，单指 asyncio 中的协程）</h2>
<p>生成器可以描述为一颗树，生成器是协程实现的基础，那么协程自然也可以描述为一颗树。</p>
<p>在 asyncio 的实现中，协程与生成器最大的区别，就是生成器的叶节点可以是 数字、函数、字符串等各种对象，但是 asyncio 的协程实现中，叶
节点只能是 None 或者 future。</p>
<h3 id="future" tabindex="-1"><a class="header-anchor" href="#future" aria-hidden="true">#</a> future</h3>
<p>future 本质上是一个用生成器实现的 回调管理器!</p>
<p>我们之所以使用协程就是为了，在遇到 io、阻塞的时候，将运行的权利交出去，当阻塞事件完成的时候，通过一个回调来唤醒程序继续往下走，
并且返回 io 事件的值。 future 就是对这个过程的包装。可以简单写一个伪代码。</p>
<pre><code>def future():
    callback = future.send  # 回调函数为 生成器的 send 方法，当然这种写法有问题，此时生成器还未形成
    do_something(callback)  # 进行io操作， 并将 callback 注册为回调函数
    result = yield
    return result
</code></pre>
<p>我们需要将生成器用 yield 送出去，以便回调函数使用，一个 函数不能满足我们的需求，我们将它扩充为一个类，用 yield 返回 self。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">InvalidStateError</span><span class="token punctuation">(</span>Exception<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>msg <span class="token operator">=</span> msg

<span class="token keyword">class</span> <span class="token class-name">Future</span><span class="token punctuation">:</span>
    _FINISHED <span class="token operator">=</span> <span class="token string">'finished'</span>
    _PENDING <span class="token operator">=</span> <span class="token string">'pending'</span>
    _CANCELLED <span class="token operator">=</span> <span class="token string">'cancelled'</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>status <span class="token operator">=</span> self<span class="token punctuation">.</span>_PENDING

    <span class="token keyword">def</span> <span class="token function">set_result</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 给future设置结果， 并将 future 设置为结束状态</span>
        self<span class="token punctuation">.</span>status <span class="token operator">=</span> self<span class="token punctuation">.</span>_FINISHED
        self<span class="token punctuation">.</span>_result <span class="token operator">=</span> result

    <span class="token keyword">def</span> <span class="token function">done</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>status <span class="token operator">!=</span> self<span class="token punctuation">.</span>_PENDING

    <span class="token keyword">def</span> <span class="token function">result</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 获取future 的结果</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>status <span class="token operator">!=</span> self<span class="token punctuation">.</span>_FINISHED<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> InvalidStateError<span class="token punctuation">(</span><span class="token string">"future is not ready"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_result

    <span class="token keyword">def</span> <span class="token function">__iter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>done<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_blocking <span class="token operator">=</span> <span class="token boolean">True</span>
        <span class="token keyword">yield</span> self  <span class="token comment"># 返回自身</span>
        <span class="token keyword">assert</span> self<span class="token punctuation">.</span>done<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'future not done'</span>  <span class="token comment"># 下次运行 future 的时候，要确定 future 对应的事件已经运行完毕</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>result<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最关键的就是这个<strong>iter</strong> 方法，第一次启动的时候，会将自身的状态设置为 阻塞状态，然后返回 self。暴露出 set_result 方法让回调函数
可以给 future 设置返回值，并且将 future 更改为结束状态。</p>
<p>[执行]：</p>
<pre><code>fu = Future()
print(fu)
print(fu.__iter__().send(None), fu == fu.__iter__().send(None))
</code></pre>
<p>可以看出，调用<strong>iter</strong> 方法后，是执行了一段迭代代码后返回了自身（这段代码就是为了阻塞并抛出执行权）</p>
<p>现在可以描绘出的协程树状结构：所有叶子节点返回值为 self，驱使协程往下走的回调函数，统一变成了最外层的 coro3.send(None). Coroutine
指代协程。</p>
<pre><code> {&quot;协程3&quot;:
    [
        {&quot;协程2&quot;: [&quot;future -&gt; self&quot;, &quot;future -&gt; self&quot;, &quot;future -&gt; self&quot;]},
        {&quot;协程1&quot;: [&quot;future -&gt; self&quot;, &quot;future -&gt; self&quot;, &quot;future -&gt; self&quot;]},
        [&quot;future -&gt; self&quot;]
    ]
}
</code></pre>
<p>那么协程的运行路线就已经很清楚了。coro 通过 coro.send(None) 启动，遇到 io 操作，会用 yield 返回一个 future。io 操作完成之后，
回调函数通过 coro.send(None) 继续往下进行。 直到 coro.send(None) 爆出 StopIteration 异常，协程运行完毕。</p>
<h3 id="eventloop-调度者" tabindex="-1"><a class="header-anchor" href="#eventloop-调度者" aria-hidden="true">#</a> eventloop-调度者</h3>
<p>然而我们不会只运行一个协程，当一个 coro 将自己的控制权交出去之后，谁来接接管呢？</p>
<p>我们需要有一个调度者 也就是 eventloop ，看名字就知道，这是一个事件循环。</p>
<p>所谓的事件驱动模式其实也很简单。事件，就是函数。</p>
<p>事件驱动模式，就是有一个队列，里面存放着一堆函数，从第一个函数开始执行，在函数执行的过程中，可能会有新的函数继续加入到这个队列中。
一直到队列中所有的函数被执行完毕，并且再也不会有新的函数被添加到这个队列中。</p>
<p>协程非常适合这种模式，协程的启动就是将 coro.send(None) 加入到 eventloop 的队列中。future 回调完成之后，再将 coro.send(None)
加入到队列中就可以驱使协程继续往下走。</p>
<p>我们来写一个 eventloop.</p>
<pre><code>import collections

class EventLoopError(Exception):
    def __init__(self, msg):
        self.msg = msg

class Handle:
    def __init__(self, callback, loop, *args):
        self._callback = callback
        self._args = args

    def _run(self):
        self._callback(*self._args)

class EventLoop:
    def __init__(self):
        self._ready = collections.deque()  # 事件队列
        self._stopping = False

    def stop(self):
        self._stopping = True

    def call_soon(self, callback, *args):
        # 将事件添加到队列里
        handle = Handle(callback, self)
        self._ready.append(handle)

    def add_ready(self, handle):
        # 将事件添加到队列里
        if isinstance(handle, Handle):
            self._ready.append(handle)
        else:
            raise EventLoopError(&quot;only handle is allowed to join in ready&quot;)

    def run_once(self):
        # 执行队列里的事件
        ntodo = len(self._ready)
        for i in range(ntodo):
            handle = self._ready.popleft()
            handle._run()

    def run_forever(self):
        while True:
            self.run_once()
            if self._stopping:
                break
</code></pre>
<p>handle 是对函数和参数的一个简单封装。通过 run_forever 不断执行队列里的函数，通过 stop 来停止 eventloop。通过 add_ready 将事件
添加到自身的队列里。</p>
<p>因为 协程的推动需要将 coro.send(None) 添加到 eventloop 里，所以将 eventloop 设置为一个全局变量，用一个函数来获取他。</p>
<pre><code>_event_loop = None

def get_event_loop():
    global _event_loop
    if _event_loop is None:
        _event_loop = Eventloop()
    return _event_loop

class Eventloop:
    pass
</code></pre>
<p>这样写的坏处是，所有线程的 eventloop 都是同一个，不能支持多线程。如果想支持多线程，那么 get_event_loop 获取的应该是一个线程里的
全局变量。为了简单起见，我们暂时采用简单的实现，多线程版本后期再加上。</p>
<p>[运行]：</p>
<pre><code>loop = EventLoop()
h1 = Handler(func, loop, 1) # func 是回调函数
h2 = Handler(func, loop, 2)
loop.add_ready(h1)
loop.add_ready(h2)
loop.run_forver()
</code></pre>
<p>因为有了 eventloop, future 也需要改变一下。 主要是增加了 add_done_callback 接口，为 future 增加回调函数。</p>
<p>当为 future 的 set_result 的时候，会执行 _schedule_callbacks。 他的作用是将回调函数列表添加到 eventloop 的函数运行队列里，
通过 eventloop，来运行回调函数。</p>
<pre><code>class Future:

    _FINISHED = 'finished'
    _PENDING = 'pending'
    _CANCELLED = 'CANCELLED'

    def __init__(self, loop=None):
        if loop is None:
            self._loop = get_event_loop() # 获取当前的 eventloop
        else:
            self._loop = loop
        self._callbacks = []
        self.status = self._PENDING
        self._blocking = False
        self._result = None

    def _schedule_callbacks(self):
        # 将回调函数添加到事件队列里，eventloop 稍后会运行
        for callbacks in self._callbacks:
            self._loop.add_ready(callbacks)
        self._callbacks = []

    def set_result(self, result):
        self.status = self._FINISHED
        self._result = result
        self._schedule_callbacks()  # future 完成后，执行回调函数

    def add_done_callback(self, callback, *args):
        # 为 future 增加回调函数
        if self.done():
            self._loop.call_soon(callback, *args)
        else:
            handle = Handle(callback, self._loop, *args)
            self._callbacks.append(handle)

    def done(self):
        return self.status != self._PENDING

    def result(self):
        if self.status != self._FINISHED:
            raise InvalidStateError('future is not ready')
        return self._result

    def __iter__(self):
        if not self.done():
            self._blocking = True
        yield self
        assert self.done(), 'future not done'
        return self.result()
</code></pre>
<p>我们还需要用 task 来对协程本身做一层封装。task 是 future 的子类。</p>
<pre><code>class Task(Future):
    def __init__(self, coro, loop=None):
        super().__init__(loop=loop)
        self._coro = coro    # 协程
        self._loop.call_soon(self._step) # 启动协程

    def _step(self, exc=None):
        try:
            if exc is None:
                result = self._coro.send(None)
            else:
                result = self._coro.throw(exc)   # 有异常，则抛出异常
        except StopIteration as exc:   # 说明协程已经执行完毕，为协程设置值
            self.set_result(exc.value)
        else:
            if isinstance(result, Future):
                if result._blocking:
                    self._blocking = False
                    result.add_done_callback(self._wakeup, result)
                else:
                    self._loop.call_soon(
                        self._step, RuntimeError('你是不是用了 yield 才导致这个error?')
                    )
            elif result is None:
                self._loop.call_soon(self._step)
            else:
                self._loop.call_soon(self._step, RuntimeError('你产生了一个不合规范的值'))

    def _wakeup(self, future):
        try:
            future.result()  # 查看future 运行是否有异常
        except Exception as exc:
            self._step(exc)
        else:
            self._step()
</code></pre>
<p>task 的 _coro 就是协程。 task 只有两个方法。 _step 实际上就是执行 _coro.send(None)，根据协程的产出值来进行下一步。当返回了一个
future，如果是阻塞中的状态 _blocking ，就将唤醒自己作为 future 的回调函数。future 回调完毕之后，就会唤醒协程进行下一步。</p>
<p>如果产出一个 None，那么就无须阻塞，继续往下进行。 将 self._step 添加到 eventloop 的事件队列里。等待 eventloop 稍后执行。</p>
<p>比较有意思的是他的异常处理方式， _step() 可以接受一个异常，并将其抛出。如果 yield 返回了不规范的值，并不会直接爆出异常，而是将异常
作为 _step 的参数，在下一次运行的时候抛出来。</p>
<p><a href="%E9%82%A3%E4%BB%96%E5%A6%88%E7%9A%84%E6%98%AF%E5%9B%A0%E4%B8%BA%EF%BC%8C%E5%82%BB%E9%80%BC%E4%BD%9C%E8%80%85%E5%86%99%E4%BA%86%E4%B8%80%E5%8D%8A%EF%BC%8C%E4%B8%8D%E7%BB%99%E8%BF%90%E8%A1%8C%E4%BB%A3%E7%A0%81.%E5%BC%94%E4%B8%9C%E8%A5%BF%E8%BF%98%E5%8F%AA%E8%B0%83%E5%BA%A6%E4%B8%AA%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%EF%BC%8C%E6%8B%BF%E4%B8%8D%E5%87%BA%E5%AE%9E%E9%99%85%E8%BF%94%E5%9B%9E%E5%80%BC%EF%BC%8C%E8%BF%98%E8%A6%81%E5%A1%ABtam%E7%9A%84%E5%85%B6%E4%BB%96%E6%96%B9%E6%B3%95%E6%89%8D%E8%83%BD%E6%BB%A1%E8%B6%B3">吐槽</a>：
这弔东西没写怎么调度，花了老子半天时间，弔玩意垃圾，整东西整一半</p>
<ul>
<li>
<p>eventloop 是调度器，就是开启了之后一直循环调队列里注册的 handle（其实是 tmd self._step）</p>
</li>
<li>
<p>future 大概是为了模仿 asyncio，整的一个弔东西，貌似例子中没啥卵用，因为要用外部的协程对象才好看出效果</p>
</li>
</ul>
<p>步骤大概是：</p>
<pre><code>def sleep():
print(&quot;sleep()&quot;)
yield
return &quot;sleep的返回值&quot;


def compute(x, y):
    print(&quot;compute()&quot;)
    result = yield from sleep()
    print(&quot;compute_result: &quot;, result)
    return x + y
</code></pre>
<p>​<br>
​ def print_sum(x, y):
​ print(&quot;print_sum()&quot;)
​ result = yield from compute(x, y)
​ print(&quot;%s + %s = %s&quot; % (x, y, result))
​ return result
​<br>
def _complete_eventloop(future):
future._loop.stop()</p>
<pre><code>future = Task(print_sum(1, 2))
future.add_done_callback(_complete_eventloop, future)

get_event_loop().run_forever()
</code></pre>
<ul>
<li>
<p>1.初始化一个 Task 对象，这个对象在初始化的时候就在生成的 eventloop 里面注册了自己的 _step() 函数</p>
</li>
<li>
<p>2.然后弔玩意 run_forver() 了,一直在 _ready 事件队列里面找 handle （handle(_step)上一步注册的弔东西）</p>
</li>
<li>
<p>3.执行 _step()，走到 self.coro.send(None) 其实就是正常你执行协程的 .send(None) 方法，然后 result 拿到 yield 的结果</p>
</li>
<li>
<p>4.弔东西还进行了个傻逼判断 result 的结果要是 None 就继续 去把自己的 _setp() 给注册了</p>
</li>
<li>
<p>4.1.另一个判断看 yield 拿到的是不是 Future 对象，要是的话 还要判断他是不是阻塞了，要是弔东西是默认的阻塞 你没改的的话，还给你报个错</p>
</li>
<li>
<p>4.2.还有一个判断，就是看 yield 拿到的是个异类，就他妈的报个错</p>
</li>
<li>
<ol start="5">
<li>注册完之后，这弔玩意是个回调，算是运行结束了一轮，然后屁返回值也没有，此时 Handler 的 run() 算是运行完了，然后继续 forever()</li>
</ol>
</li>
<li>
<p>6.之后就是一直重复循环 2、3、4、5 知道判断出了 4.1 或是 4.2，或是 eventloop 进行了 stop 动作， forever() break 循环</p>
</li>
<li>
<p>7.若执行完成，正常就是会报 StopIteration 的异常（一个 yield 对应一个 send，若 send 多了就会报异常），捕获后来设置 future 的状态为
执行完成。然后核心来了，会执行 _schedule_callback() 这玩意来检查 Future 中还有没有未执行的 callback 找出来然后循环 add_ready
添加到 eventloop 中等待执行</p>
</li>
</ul>
<p>以上就是整个异步事件循环的核心机制，绕的一匹！！</p>
<h3 id="结束" tabindex="-1"><a class="header-anchor" href="#结束" aria-hidden="true">#</a> 结束</h3>
<p>asyncio 中协程最核心的设计大概就是这样。加起来不到两百行代码。</p>
<p>当然，这些还远远不够。</p>
<p>以此为框架，我会慢慢增添定时任务的处理方式, 就像 asyncio.sleep()就是通过定时任务实现的 , 添加多线程支持（基于 threeding），
添加对 socket 事件的监听(基于 selector 模块)，我们还可以此基础上实现 http 的 request(get\post 等) 功能，原版的 asyncio 模块
都没有这个功能。这才算实现了一个简单的异步。</p>
<h1 id="这他妈是啥-2-————asyncio-实现定时任务" tabindex="-1"><a class="header-anchor" href="#这他妈是啥-2-————asyncio-实现定时任务" aria-hidden="true">#</a> 这他妈是啥 - 2 ？————asyncio 实现定时任务</h1>
<p><a href="https://zhuanlan.zhihu.com/p/65175411" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/65175411<ExternalLinkIcon/></a>
我们逐步实现一个 asyncio 这样的协程库。首先来实现协程的定时任务</p>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<p>这是 asyncio 官方文档给出的一个范例。这篇文章的任务就是，用我们自己写的 asyio 模块，来实现这个范例。（不会起名字，就直接叫 asyio 了）</p>
</div></template>


