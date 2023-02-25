<template><div><p><strong>Linux</strong> 下 <strong>Python</strong> 文件锁的使用</p>
<!--more-->
<p>在并发情况下，多个线程/进程池 对同一文件进行读写，如 <strong>grpc</strong> 线程池收到多个请求同时改写一份文件的情况，</p>
<p>此时需要用到 <strong>fcntl</strong> 来对文件的读写加锁</p>
<h2 id="linux-中的文件锁" tabindex="-1"><a class="header-anchor" href="#linux-中的文件锁" aria-hidden="true">#</a> Linux 中的文件锁</h2>
<p>在 <strong>Linux</strong> 中，<strong>flock</strong> 和 <strong>fcntl</strong> 都是系统调用，而 <strong>lockf</strong> 则是库函数， <strong>lockf</strong> 则是 <strong>fcntl</strong> 的封装，因此 <strong>lockf</strong> 和 <strong>fcntl</strong> 在底层实现是一样的，对文件加锁的效果也是一样的</p>
<p>首先说一些概念：</p>
<ul>
<li><strong>文件锁：</strong> 针对整个文件的锁，如 <strong>flock</strong></li>
<li><strong>记录锁：</strong> 针对整个文件和文件部分字节的锁，如 <strong>fcntl</strong>、<strong>lockf</strong></li>
<li><strong>排他锁：</strong> 也可以称为写锁、独占锁，同一时间只有一个进程可以加锁</li>
<li><strong>共享锁：</strong> 也可以称为读锁，支持多个进程并发读文件内容，但不可以写</li>
<li><strong>睡眠锁：</strong> 一般和等待队列同时存在，当无法获取锁的时候会在等待队列中睡眠，直到满足条件被唤醒，如 <strong>semaphore</strong>、<strong>mutex</strong></li>
<li><strong>自旋锁：</strong> 自旋锁在被持有时，其它进程再申请时将 <strong>不断” 自旋 ”（死循环）</strong> ，不会陷入睡眠，直到持有者释放，为保证性能，自旋锁不应被持有时间过长</li>
<li><strong>劝告锁（建议锁）：</strong> 不要求进程一定要遵守，是一种约定俗成的规则，某进程持有建议锁的时候，其它进程依然可以强制操作，如 <strong>flock</strong>、<strong>fcntl</strong></li>
<li><strong>强制锁：</strong> 是 <strong>内核行为</strong>，在系统调用违反约束条件时，内核将直接阻拦，如 <strong>fcntl</strong>（<em><strong>fcntl</strong>也可实现强制锁，但不建议使用</em> ）</li>
</ul>
<h2 id="系统调用-fcntl-和-ioctl" tabindex="-1"><a class="header-anchor" href="#系统调用-fcntl-和-ioctl" aria-hidden="true">#</a> 系统调用 fcntl 和 ioctl</h2>
<p><a href="https://docs.python.org/zh-cn/3/library/fcntl.html?highlight=fcntl" target="_blank" rel="noopener noreferrer">文档参考<ExternalLinkIcon/></a></p>
<h3 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> Linux</h3>
<p><strong>Linux</strong> 的 <code v-pre>flock()</code> 的函数原型如下</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">flock</span><span class="token punctuation">(</span><span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token keyword">int</span> operation<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，参数 <code v-pre>fd</code> 表示文件描述符；参数 <code v-pre>operation</code> 指定要进行的锁操作，该参数的取值有如下几种</p>
<ul>
<li><strong>LOCK_SH：</strong> 创建一个 <strong>共享锁</strong>，在任意时间内，一个文件的共享锁 <strong>可以被多个进程拥有</strong></li>
<li><strong>LOCK_EX：</strong> 创建一个 <strong>排他锁</strong>，在任意时间内，一个文件的排他锁 <strong>只能被一个进程拥有</strong></li>
<li><strong>LOCK_UN：</strong>  <strong>解锁</strong>，删除该进程创建的锁</li>
<li><strong>LOCK_MAND：</strong> 用于 <strong>共享模式的强制锁</strong>，它可以与 <strong>LOCK_READ</strong> 或者 <strong>LOCK_WRITE</strong> 联合使用，表示 <strong>是否允许 并发读 或 并发写</strong> 操作</li>
</ul>
<p>通常情况下，如果加锁请求 <strong>不能被立即满足</strong>，那么系统调用 <code v-pre>flock()</code> <strong>阻塞当前进程</strong></p>
<blockquote>
<p>若进程要请求一个排他锁，但此时已经被其他进程获取了这个锁，那么该进程将会被阻塞</p>
</blockquote>
<h4 id="lockf-和-fcntl" tabindex="-1"><a class="header-anchor" href="#lockf-和-fcntl" aria-hidden="true">#</a> lockf 和 fcntl</h4>
<p>函数：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">fcntl</span><span class="token punctuation">(</span><span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token keyword">int</span> ⌘<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token comment">/* arg */</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">struct</span> <span class="token class-name">flock</span> <span class="token punctuation">{</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  
<span class="token keyword">short</span> l_type<span class="token punctuation">;</span> 		<span class="token comment">/* Type of lock: F_RDLCK, F_WRLCK, F_UNLCK */</span>
<span class="token keyword">short</span> l_whence<span class="token punctuation">;</span> 	<span class="token comment">/* How to interpret l_start: SEEK_SET, SEEK_CUR, SEEK_END */</span>
<span class="token class-name">off_t</span> l_start<span class="token punctuation">;</span>   	<span class="token comment">/* Starting offset for lock */</span> 
<span class="token class-name">off_t</span> l_len<span class="token punctuation">;</span>     	<span class="token comment">/* Number of bytes to lock */</span> 
<span class="token class-name">pid_t</span> l_pid<span class="token punctuation">;</span> 		<span class="token comment">/* PID of process blocking our lock (F_GETLK only) */</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>         
<span class="token punctuation">}</span><span class="token punctuation">;</span> `
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相关的 <strong>cmd</strong> 有三种</p>
<ul>
<li><strong>F_SETLK：</strong> 设置文件锁（<em><strong>非阻塞</strong></em> ）</li>
<li><strong>F_SETLKW：</strong> 设置文件锁（<em><strong>阻塞</strong></em> ）</li>
<li><strong>F_GETLK：</strong> 获取锁信息，会修改我们传入的 <strong>struct flock</strong></li>
</ul>
<p><strong>fcntl/lockf</strong> 的特性有</p>
<ul>
<li>上锁可以递归</li>
<li>加读锁（<em>共享锁</em>）<strong>必须是读</strong>打开的，加写锁（<em>排他锁</em>）文件 <strong>必须是写</strong> 打开的</li>
<li>由 <strong>fork</strong> 产生的子进程 <strong>不继承</strong> 父进程所设置的锁</li>
<li><strong>支持强制性锁：</strong> 对一个特定文件打开其设置 <strong>组ID位（<em>S_ISGID</em>）</strong> ，并关闭其 <strong>组执行位（<em>S_IXGRP</em>）</strong> ，则对该文件开启了强制性锁机制，在 <strong>Linux</strong> 中若使用强制性锁，则要在文件系统 <strong>mount</strong> 时，使用 <code v-pre>-o mand</code> 打开该机制（<em>用得少</em>）</li>
</ul>
<h3 id="python-的-fcntl-模块" tabindex="-1"><a class="header-anchor" href="#python-的-fcntl-模块" aria-hidden="true">#</a> Python 的 fcntl 模块</h3>
<p>函数：<code v-pre>fcntl.flock(fd, operation)</code></p>
<p><code v-pre>fd</code> 是系统调用 <strong>open</strong> 返回的文件描述符，<code v-pre>operation</code> 的可选项有：</p>
<ul>
<li><strong>LOCK_SH：</strong> 共享锁</li>
<li><strong>LOCK_EX：</strong> 排他锁</li>
<li><strong>LOCK_UN：</strong> 解锁</li>
<li><strong>LOCK_NB：</strong> 非阻塞（<em>与上述三种操作一起使用</em>）</li>
</ul>
<p>想在 <strong>未获得排他锁情况下不阻塞该进程</strong>，可以将 <strong>LOCK_NB</strong> 和 <strong>LOCK_SH</strong> 或 <strong>LOCK_EX</strong> 联合使用，那么系统就不会阻塞该进程</p>
<h5 id="简单示例" tabindex="-1"><a class="header-anchor" href="#简单示例" aria-hidden="true">#</a> 简单示例</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># flock 生成的是劝告锁，因此进程可以正常打开文件，此时语句均可被执行</span>
fd <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span>  					

<span class="token comment"># 检测文件是否被加锁，如果已经上了锁，那么这里就会被阻塞，若多线程，此时会阻塞线程后续执行（lll_futex_wait）</span>
fcntl<span class="token punctuation">.</span>flock<span class="token punctuation">(</span>fd<span class="token punctuation">,</span> fcntl<span class="token punctuation">.</span>LOCK_EX<span class="token punctuation">)</span>  

<span class="token comment"># 用 LOCK_NB 就不会被阻塞（线程会继续执行，如抢锁操作等）</span>
fcntl<span class="token punctuation">.</span>flock<span class="token punctuation">(</span>fd<span class="token punctuation">,</span> fcntl<span class="token punctuation">.</span>LOCK_EX <span class="token operator">|</span> fcntl<span class="token punctuation">.</span>LOCK_NB<span class="token punctuation">)</span>  

<span class="token comment"># 对文件进行解锁</span>
fcntl<span class="token punctuation">.</span>flock<span class="token punctuation">(</span>fd<span class="token punctuation">.</span>fcntl<span class="token punctuation">.</span>LOCK_UN<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>对文件 <code v-pre>close()</code> 后文件锁会失效</li>
<li>进程结束后文件锁会失效</li>
</ul>
<h4 id="flock-和-lockf-的区别" tabindex="-1"><a class="header-anchor" href="#flock-和-lockf-的区别" aria-hidden="true">#</a> <strong>flock 和 lockf 的区别</strong></h4>
<ol>
<li>
<p><strong>flock</strong> 只能对 <strong>整个文件</strong> 起作用，而不能对文件的某一部分上锁，<strong>lockf</strong> 可以对文件的某个区域进行上锁</p>
</li>
<li>
<p><strong>flock</strong> 只能产生劝告性锁，<strong>flock</strong> 可以有共享锁和排他锁，而 <strong>lockf</strong> 只支持排他锁</p>
</li>
<li>
<p>在 <strong>fork/dup</strong> 的情况不同，<strong>flock</strong> 锁可以递归，即通过 <strong>fork</strong> 或者 <strong>dup</strong> 产生的两个 <strong>fd</strong>，都可以进行加锁而不会死锁</p>
</li>
<li>
<p><strong>flock</strong> 不能在 <strong>NFS</strong> 文件系统上使用，要在 <strong>NFS</strong> 上使用需要用 <strong>fcntl</strong></p>
</li>
</ol>
<p>如果 <code v-pre>flock()</code> 调用失败，就会触发 <a href="https://docs.python.org/zh-cn/3/library/exceptions.html#OSError" target="_blank" rel="noopener noreferrer"><code v-pre>OSError</code><ExternalLinkIcon/></a> 异常</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> fcntl
<span class="token keyword">import</span> os<span class="token punctuation">,</span> time
<span class="token keyword">import</span> uuid

FILE <span class="token operator">=</span> <span class="token string">"counter.txt"</span>

<span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span>FILE<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># create the counter file if it doesn't exist</span>
    <span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>FILE<span class="token punctuation">,</span> <span class="token string">"w"</span><span class="token punctuation">)</span>
    vnc_line <span class="token operator">=</span> <span class="token string">'123cajfg: 127.0.0.1:15900'</span>
    <span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span>vnc_line <span class="token operator">+</span> <span class="token string">'\n'</span><span class="token punctuation">)</span>
    <span class="token builtin">file</span><span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 由于flock生成的是劝告锁，不能阻止进程对文件的操作，所以这里可以正常打开文件</span>
    <span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>FILE<span class="token punctuation">,</span> <span class="token string">"a+"</span><span class="token punctuation">)</span> 
    
    <span class="token comment"># 为了避免同时操作文件，需要程序自己来检查该文件是否已经被加锁,若检查到加锁，进程会被阻塞</span>
    fcntl<span class="token punctuation">.</span>flock<span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">.</span>fileno<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> fcntl<span class="token punctuation">.</span>LOCK_EX<span class="token punctuation">)</span>   
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'acquire lock'</span><span class="token punctuation">)</span>
    now_port <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">.</span>readlines<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">':'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    new_port <span class="token operator">=</span> now_port <span class="token operator">+</span> <span class="token number">1</span>
    token <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>uuid<span class="token punctuation">.</span>uuid4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># file.seek(0)</span>
    vnc_line <span class="token operator">=</span> <span class="token string">':'</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">[</span>token<span class="token punctuation">,</span> <span class="token string">' 127.0.0.1'</span><span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>new_port<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span>vnc_line <span class="token operator">+</span> <span class="token string">'\n'</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span> os<span class="token punctuation">.</span>getpid<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"=>"</span><span class="token punctuation">,</span> new_port
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token builtin">file</span><span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># unlocks the file</span>
    <span class="token keyword">print</span> <span class="token string">'release lock'</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="多线程" tabindex="-1"><a class="header-anchor" href="#多线程" aria-hidden="true">#</a> 多线程</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> fcntl
<span class="token keyword">import</span> threading
<span class="token keyword">import</span> time

<span class="token keyword">def</span> <span class="token function">writetoTxt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token builtin">id</span> <span class="token operator">=</span> threading<span class="token punctuation">.</span>currentThread<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>getName<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">"aaa.txt"</span><span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        <span class="token comment"># fcntl.flock(f.fileno(), fcntl.LOCK_EX)  # 加锁</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"{} acquire lock"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">'"write from" + str(i) + {} \n'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	<span class="token comment"># 在 with 块外，文件关闭，自动解锁</span>
	<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"{} exit"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        t <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>writetoTxt<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        t<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在多个终端中启动上面的程序，会发现它们相互阻塞</p>
<div class="custom-container tip">
<p class="custom-container-title">注意</p>
<ul>
<li>对于文件的 <code v-pre>close()</code> 操作会使文件锁失效</li>
<li>同理，进程结束后文件锁失效</li>
<li><code v-pre>flock()</code> 的 <strong>LOCK_EX</strong> 是 <strong>“劝告锁”</strong>，系统内核不会强制检查锁的状态，需要在代码中进行文件操作的地方显式检查才能生效</li>
</ul>
</div>
<p>若跨平台，可自己实现或使用 <strong>portalocker</strong> 魔改</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token comment"># import fcntl</span>

<span class="token keyword">import</span> portalocker


<span class="token keyword">def</span> <span class="token function">acquire</span><span class="token punctuation">(</span>lock_file<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> open_mode<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> timeout<span class="token punctuation">:</span> <span class="token builtin">float</span> <span class="token operator">=</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    fd <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>lock_file<span class="token punctuation">,</span> open_mode<span class="token punctuation">)</span>

    lock_file_fd <span class="token operator">=</span> <span class="token boolean">None</span>
    start_time <span class="token operator">=</span> current_time <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> current_time <span class="token operator">&lt;</span> start_time <span class="token operator">+</span> timeout<span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token comment"># 仅同步使用: 使用互斥锁是阻塞式的，若多线程中含异步操作切换上下文会死锁</span>
            portalocker<span class="token punctuation">.</span>lock<span class="token punctuation">(</span>fd<span class="token punctuation">,</span> portalocker<span class="token punctuation">.</span>LockFlags<span class="token punctuation">.</span>EXCLUSIVE<span class="token punctuation">)</span>
            <span class="token comment"># fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)</span>
        <span class="token comment"># except (IOError, OSError):</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            <span class="token keyword">pass</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            lock_file_fd <span class="token operator">=</span> fd
            <span class="token keyword">break</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.2</span><span class="token punctuation">)</span>
        current_time <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> lock_file_fd <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        fd<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> lock_file_fd


<span class="token keyword">def</span> <span class="token function">release</span><span class="token punctuation">(</span>lock_file_fd<span class="token punctuation">)</span><span class="token punctuation">:</span>
    portalocker<span class="token punctuation">.</span>unlock<span class="token punctuation">(</span>lock_file_fd<span class="token punctuation">)</span>
    <span class="token comment"># fcntl.flock(lock_file_fd, fcntl.LOCK_UN)</span>
    lock_file_fd<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token boolean">None</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    fp <span class="token operator">=</span> acquire<span class="token punctuation">(</span><span class="token string">'/opt/ufs/xxx.json'</span><span class="token punctuation">,</span> <span class="token string">"r+"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> fp <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> OSError<span class="token punctuation">(</span>
            <span class="token string">"Resource temporarily unavailable"</span>
        <span class="token punctuation">)</span>
    fp<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
    release<span class="token punctuation">(</span>fp<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger">
<p class="custom-container-title">需要注意</p>
<p>若异步框架，其中混用了多线程同步操作，使用文件锁时，此时一旦 <strong>遇见异步阻塞，自动切换上下文，则会出死锁</strong> （多线程）若使用 <strong>fcntl.LOCK_NB</strong> 非阻塞，则会超时至抢锁失败，故需要避免</p>
<img src="@source/python/语言/多任务编程/img/多线程文件死锁.jpg">
</div>
<h5 id="使用示例-json-解析" tabindex="-1"><a class="header-anchor" href="#使用示例-json-解析" aria-hidden="true">#</a> <strong>使用示例 json 解析</strong></h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">JsonConfigWithRWLock</span><span class="token punctuation">(</span>ConfigInterface<span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">:</span> Path<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_config_file <span class="token operator">=</span> path
        self<span class="token punctuation">.</span>kv <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        self<span class="token punctuation">.</span>fp_lock <span class="token operator">=</span> self<span class="token punctuation">.</span>_acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_parse_data<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">_acquire</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>_config_file<span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_config_file <span class="token operator">=</span> Path<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_config_file<span class="token punctuation">)</span>
        parent_path <span class="token operator">=</span> Path<span class="token punctuation">.</span>absolute<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_config_file<span class="token punctuation">.</span>parent<span class="token punctuation">)</span>
        file_name <span class="token operator">=</span> <span class="token string">".{}.lock"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>_config_file<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span>
        abs_path <span class="token operator">=</span> Path<span class="token punctuation">.</span>joinpath<span class="token punctuation">(</span>parent_path<span class="token punctuation">,</span> file_name<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> abs_path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>abs_path<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"w"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">pass</span>

        fp_lock <span class="token operator">=</span> acquire<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>abs_path<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"r+"</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> fp_lock <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> OSError<span class="token punctuation">(</span>
                <span class="token string">"File Acquire Failed, Resource temporarily unavailable"</span>
            <span class="token punctuation">)</span>
        <span class="token keyword">return</span> fp_lock

    <span class="token keyword">def</span> <span class="token function">release</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>fp_lock<span class="token punctuation">:</span>
            release<span class="token punctuation">(</span>self<span class="token punctuation">.</span>fp_lock<span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>fp_lock <span class="token operator">=</span> <span class="token boolean">None</span>

    <span class="token keyword">def</span> <span class="token function">__exit__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> exc_type<span class="token punctuation">,</span> exc_val<span class="token punctuation">,</span> exc_tb<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__enter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self

    <span class="token keyword">def</span> <span class="token function">_parse_data</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>_config_file<span class="token punctuation">)</span> <span class="token keyword">as</span> fp<span class="token punctuation">:</span>
                data <span class="token operator">=</span> fp<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> FileNotFoundError<span class="token punctuation">:</span>
            data <span class="token operator">=</span> <span class="token string">"{}"</span>
        <span class="token keyword">if</span> data<span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>kv <span class="token operator">=</span> json<span class="token punctuation">.</span>loads<span class="token punctuation">(</span>data<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">reload</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>kv <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        self<span class="token punctuation">.</span>_parse_data<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">get_key</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>kv<span class="token punctuation">.</span>get<span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">set_key</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>kv<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">{</span>key<span class="token punctuation">:</span> value<span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">get_all</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token builtin">dict</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>kv

    <span class="token keyword">def</span> <span class="token function">save</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        data <span class="token operator">=</span> json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>self<span class="token punctuation">.</span>kv<span class="token punctuation">,</span> indent<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">)</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>_config_file<span class="token punctuation">,</span> <span class="token string">"w"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> fp<span class="token punctuation">:</span>
            fp<span class="token punctuation">.</span>write<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


