<template><div><h1 id="进程" tabindex="-1"><a class="header-anchor" href="#进程" aria-hidden="true">#</a> 进程</h1>
<p>首先讨论进程前先要弄清 <strong>并行</strong> 和 <strong>并发</strong> 两个概念</p>
<h2 id="_1-并行与并发" tabindex="-1"><a class="header-anchor" href="#_1-并行与并发" aria-hidden="true">#</a> 1. 并行与并发</h2>
<h3 id="_1-1-并行" tabindex="-1"><a class="header-anchor" href="#_1-1-并行" aria-hidden="true">#</a> 1.1 并行</h3>
<ul>
<li>当计算资源有多个 CPU 时，或一个 CPU 有多核多线程时，每一个 CPU 的线程在同一时刻，都能执行一个进程</li>
<li>两个 CPU 线程同一时刻，可以 <strong>同时执行</strong> 两个不同的进程，且不会相互抢夺资源，这种方式即为并行</li>
<li><strong>并行不一定并发</strong>，也有同步&amp;异步，并行也会阻塞，但异步往往可以提高效率</li>
</ul>
<h3 id="_1-2-并发" tabindex="-1"><a class="header-anchor" href="#_1-2-并发" aria-hidden="true">#</a> 1.2 并发</h3>
<ul>
<li>若只用单 CPU、单核、单线程当做计算资源时，虽然 CPU 的线程在 <strong>同一时刻</strong> 时只能调度一个进程，但在 <strong>一段时间</strong> 内，却能执行不同的 进程 / 线程</li>
<li>并发通常使用 <strong>切片轮询</strong> 的执行方式，快速交替执行，来 <strong>伪造</strong> 出多个进程同时执行的效果</li>
<li>并行只在多处理器资源中存在，而并发在各种处理系统中存在</li>
</ul>
<img src="@source/python/语言/资源调度/img/CPU并发和并行.png" />
<h2 id="_2-什么是进程" tabindex="-1"><a class="header-anchor" href="#_2-什么是进程" aria-hidden="true">#</a> 2. 什么是进程</h2>
<Alert type="info">**进程**(`Process`)： 狭义理解，是 **\*OS** 即操作系统资源分配\* 的<Font type="success">基本单位</Font></Alert><h3 id="_2-1-进程相关的基本概念" tabindex="-1"><a class="header-anchor" href="#_2-1-进程相关的基本概念" aria-hidden="true">#</a> 2.1 进程相关的基本概念</h3>
<ol>
<li>
<p><strong>程序</strong>：是指令的集合，不能单独运行，要装载到内存中(<code v-pre>分配内存</code>),并需要系统为它分配资源(<code v-pre>分配执行环境</code>)</p>
</li>
<li>
<p><strong>进程</strong>：具有独立功能的程序，关于某个数据集合上的，一次执行程序的活动（动态概念）。是系统进行<code v-pre>资源管理分配</code>和<code v-pre>调度</code>的独立单位 <strong>这种可被执行的程序，称为进程</strong></p>
<Font type="orange" fsize="l">进程</Font> = <Badge type="info">程序</Badge> ＋ <Badge type="error">数据</Badge> ＋ <Badge type="queen">PCB</Badge><ul>
<li>
<Badge type="info">程序</Badge>：描述了进程所要完成的功能（<code v-pre>静态描述文本</code>）<blockquote>
<p>理解为代码、做菜的菜谱、说明书...... 而进程就是执行代码的过程、做菜的过程、按照说明书操作的过程...</p>
</blockquote>
</li>
<li>
<Badge type="error">数据</Badge>：是程序在执行时所需要的数据和工作区，这两部分是进程存在的物质基础。</li>
<li>
<Badge type="queen">PCB</Badge>：是最重要的，创建进程实际上是指创建进程实体中的<code v-pre>进程控制块</code>，而撤销进程也是指将这个进程实体中的进程控制块撤消掉。</li>
</ul>
</li>
<li>
<p><strong>多道编程</strong>：允许<strong>多个程序同时加载到内存中</strong>，在操作系统的调度下，可以实现并发地执行。这是这样的设计，大大提高了 CPU 的利用率。</p>
<Alert type="info">**进程**: 就是为了在 CPU 上实现 多道编程 而提出的，利用 CPU 的多核资源，使程序实现 `并发&并行` ，让每个用户感觉自己在独享 CPU</Alert></li>
</ol>
<h2 id="_3-进程的基本状态与转换" tabindex="-1"><a class="header-anchor" href="#_3-进程的基本状态与转换" aria-hidden="true">#</a> 3 进程的基本状态与转换</h2>
<h3 id="_3-1-进程的三种基本状态" tabindex="-1"><a class="header-anchor" href="#_3-1-进程的三种基本状态" aria-hidden="true">#</a> 3.1 进程的三种基本状态</h3>
<ul>
<li>
<p><strong>就绪态</strong></p>
<blockquote>
<p>程序已达到可以运行的状态，只等 CPU 分配资源就可以运行的状态</p>
</blockquote>
</li>
<li>
<p><strong>阻塞态</strong></p>
<blockquote>
<p>程序运行条件没有满足，需要等待条件满足才能执行的状态。如 <code v-pre>等待IO操作</code> 时候</p>
</blockquote>
</li>
<li>
<p><strong>运行态</strong></p>
</li>
</ul>
<blockquote>
<p>进程已抢占到 CPU，并且正在 CPU 上运行时的状态</p>
</blockquote>
<h3 id="_3-2-三种基本状态的转换" tabindex="-1"><a class="header-anchor" href="#_3-2-三种基本状态的转换" aria-hidden="true">#</a> 3.2 三种基本状态的转换</h3>
<p>进程的三种基本状态及其转换，如下:</p>
<p><code v-pre>&lt;img src=&quot;&quot;&gt;</code></p>
</div></template>


