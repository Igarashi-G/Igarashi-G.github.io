<template><div><p><strong>Python</strong> 高性能编程简述</p>
<!-- more --> 
<h2 id="_1-计算机基本系统" tabindex="-1"><a class="header-anchor" href="#_1-计算机基本系统"><span>1. 计算机基本系统</span></a></h2>
<h5 id="思考" tabindex="-1"><a class="header-anchor" href="#思考"><span><strong>思考：</strong></span></a></h5>
<p>实现高性能 <strong>Python</strong> 代码的障碍在哪里？</p>
<p>性能问题有哪些种类？</p>
<p>一台计算机底层组件可分为： <strong>计算单元、存储单元、两者间连接</strong></p>
<h3 id="_1-1-计算单元" tabindex="-1"><a class="header-anchor" href="#_1-1-计算单元"><span><strong>1.1 计算单元</strong></span></a></h3>
<p><strong>计算单元</strong>，即将接收到任意输入（<em>比特</em> ）转为输出（<em>计算后的比特</em> ）的能力，以及改变当前处理状态的能力，即 <strong>CPU</strong> 是最常见的计算单元，当然 之前设计与图形加速的处理单元 <strong>GPU</strong> 如今也更适合用于数值计算了</p>
<p><strong>主要属性：</strong></p>
<ul>
<li><strong>IPC：</strong> 每（<em>指令</em> ）周期完成指令数，影响 <strong>矢量计算</strong> （<em>一次提供多数据给 <strong>一个 CPU</strong> 同时操作</em> ）</li>
<li><strong>时钟速度：</strong> 目前理解为程序的切换速度，速度提高，会立即 <strong>提高计算单元所有程序的运行速度</strong></li>
</ul>
<p>这两个参数是互斥的，但 <strong>GPU</strong> 中，两参数可以都很高（<em>但有别的问题</em> ）</p>
<h5 id="超线程技术" tabindex="-1"><a class="header-anchor" href="#超线程技术"><span><strong>超线程技术：</strong></span></a></h5>
<p>由于晶体管已经缩小至极限， <strong>IPC</strong> 和 时钟 已到达极限，芯片厂商研制了超线程技术，即 <strong>更聪明的乱序执行</strong> 和 <strong>多核操作</strong>，它为 <strong>OS</strong> 虚拟了第二个 <strong>CPU</strong> ，将 <strong>两个 指令线程</strong> 交错插入 <strong>CPU</strong> 的 <strong>不同执行单元（<em>如：一个操纵整数、一个操纵浮点数</em>）</strong>，若插入成功，则计算性能比单线程提升 <strong>30%</strong></p>
<ul>
<li><strong>乱序：</strong> 允许 <strong>编译器</strong> 检测出线性程序 <strong>无依赖</strong> 的部分，各种顺序执行都不会影响正确结果，即 <strong>计算次序与程序设计不同，也能正确运行</strong>，这就使得一些 <strong>指令阻塞</strong> 时（<em>如：等待一次内存访问</em> ）另一些指令也得以执行，以此来提升资源的利用率。</li>
<li><strong>多核架构：</strong> 在同一个计算单元中包含了 <strong>多个 CPU</strong> ，提高了总体计算能力，且无需等待内存屏障，让单个核心跑的更快</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">阿姆达尔定律</p>
<p><strong>多核不一定意味着速度的提升</strong> ，一个可以运行在多核上的程序，有某些 <strong>路径</strong> 必须运行在单核上，那么这些 <strong>路径</strong> 就是瓶颈导致最终速度无法通过 <strong>增加更多核心来提高</strong></p>
<p>因此，任何并行计算的瓶颈最终都会落在顺序执行的那部分任务上</p>
</div>
<p>对于 <strong>Python</strong> 来说，充分利用多核性能的阻碍主要在于 <strong>GIL（<em>Python 的全局解释器锁</em> ）</strong> ，它确保无论有多少核心，<strong>Python</strong> 进程一次也只能执行一条指令，即使代码可使用多核心，但在任意一个时间点上，也仅有一个核心在执行 <strong>Python</strong> 的指令，好在这个问题可以通过标准库的 <strong>multiprocessing</strong> 或 <strong>numexpr</strong> 、 <strong>Cpython</strong> 等技术，或分布式计算模型来解决</p>
<h3 id="_1-2-存储单元" tabindex="-1"><a class="header-anchor" href="#_1-2-存储单元"><span><strong>1.2 存储单元</strong></span></a></h3>
<p>存储单元，用于 <strong>保存比特</strong>，这些比特可能是程序中的变量、一副图片的像素等。其包括了主板上的 <strong>寄存器</strong>  、 <strong>RAM</strong> 以及 <strong>硬盘</strong> ，不同类型、介质、协议的存储单元的区别在于其 <strong>读写数据的速度</strong>，更复杂的问题在于其速度还与 <strong>读写数据的方式（<em>顺序、随机</em> ）</strong> 的方式有关</p>
<blockquote>
<p>如大多数存储单元 一次读一大块数据的性能远好于读多次小块数据，将其想象成一本书中的书页，大多数存储单元的读写速度在连续翻页时高于从一张随机页跳至另一张随即页</p>
</blockquote>
<h3 id="_1-3-通信层" tabindex="-1"><a class="header-anchor" href="#_1-3-通信层"><span><strong>1.3 通信层</strong></span></a></h3>
<p>上述基本单元通信，需要依赖 <strong>总线</strong></p>
</div></template>


