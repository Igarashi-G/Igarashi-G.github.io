<template><div><h1 id="基于线程的并发" tabindex="-1"><a class="header-anchor" href="#基于线程的并发"><span>基于线程的并发</span></a></h1>
<p><strong>threading</strong>：在 py2 中曾废弃了 <code v-pre>thread</code> 模块，在 py3 中作为底层模块 <code v-pre>_thread</code>，通常在其基础上建立更高级的线程接口</p>
<p><strong>GIL 锁</strong>：又称<strong>全局解释器锁</strong>，Cpython 解释器采用的一种垃圾机制，它限制了同一时刻，只有一个线程被执行，使得解释器运行多线程方便，但多核处理器上不能够并行运作，因此多核密集型计算应该使用 <a href="/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%A4%9A%E8%BF%9B%E7%A8%8B%E7%BC%96%E7%A8%8B#1-multiprocessing-%E6%A6%82%E8%BF%B0">多进程</a> 或 <a href="https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor" target="_blank" rel="noopener noreferrer">进程池</a></p>
</div></template>


