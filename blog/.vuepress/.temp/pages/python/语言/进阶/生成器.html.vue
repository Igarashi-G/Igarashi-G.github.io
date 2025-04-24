<template><div><p>所有的生成器都是 <RouteLink to="/python/%E8%AF%AD%E8%A8%80/%E8%BF%9B%E9%98%B6/%E8%BF%AD%E4%BB%A3%E5%99%A8.html">迭代器</RouteLink>，因为生成器 <strong>完全实现</strong> 了迭代器接口</p>
<!-- more -->
<h1 id="生成器" tabindex="-1"><a class="header-anchor" href="#生成器"><span>生成器</span></a></h1>
<p>迭代器从集合中取元素，而生成器用于 <strong>凭空</strong> 生成元素</p>
<div class="hint-container info">
<p class="hint-container-title">总之</p>
<p>含有 <strong>yield</strong> 关键字的 <strong>函数</strong> 就是 <strong>生成器函数</strong></p>
</div>
<h3 id="_1-1-生成器表达式" tabindex="-1"><a class="header-anchor" href="#_1-1-生成器表达式"><span>1.1 生成器表达式</span></a></h3>
<p><code v-pre>genexpr = (推导式)</code> 的这种形式 <strong>是生成器的语法糖</strong>， 非元组，要区别于 <code v-pre>tuple(推导式)</code></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">s </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">*</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(s)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># &#x3C;generator object &#x3C;genexpr> at 0x0000013EF1BF84A0></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时打印出了 <strong>generator</strong> 对象，它保存的与列表、集合（<em>这种存值的情况</em>）是不同的，存了程序的上下文状态，因此一样不占内存，还可以像迭代器一样，用 <code v-pre>__next__()</code> 来取值，但只能顺序取</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">s.</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">__next__</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">next</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(s)	</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Python3</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="惰性计算" tabindex="-1"><a class="header-anchor" href="#惰性计算"><span>惰性计算</span></a></h4>
<p>生成器表达式前的语句是惰性计算的，即只在真正执行时，才计算表达式，可以避免不必要的计算，提升性能</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">l </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">lf1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (i</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">**</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> l)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">l </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">lf2 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (i</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">**</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> l)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">list</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(lf1)) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 结果 >>> [1, 4, 9]</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">list</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(lf2)) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 结果 >>> [16, 25, 36]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">l </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'ABC'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">l_f1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (l[i] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">l </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'DEF'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">l_f2 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (l[i] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">list</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(l_f1))</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">list</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(l_f2))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ['D', 'E']</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ['D', 'E']</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成器表达式中的 <code v-pre>for</code> 子句是立即计算的，此时 <strong>有闭包环境</strong></p>
<ul>
<li>闭包的 <code v-pre>i</code> 变量存的是 <code v-pre>l</code> 中的值即 <code v-pre>1</code>、<code v-pre>2</code> 的 <strong>int 值</strong> ，<code v-pre>i</code> 是不可变的</li>
<li>表达式 <code v-pre>i**2</code> 是惰性计算的，调用 <code v-pre>list()</code> 时计算 <code v-pre>lf1 = (i**2 for i in l)</code> 此时 <code v-pre>l</code> 重新赋值并不影响 <code v-pre>i</code> 的值，依然未发生改变</li>
</ul>
<p>但生成器表达式的小括号开头的表达式是 <strong>惰性计算</strong> 的</p>
<ul>
<li>闭包的 <code v-pre>i</code> 变量存的是 <code v-pre>[0, 1]</code> 中的值，表达式 <code v-pre>l[i]</code> 同上是惰性计算，但 <code v-pre>l[i]</code> 的 <code v-pre>l</code> 却是列表，是可变的，</li>
<li>在执行 <code v-pre>print(list(lf2))</code> 调用 <code v-pre>list()</code> 计算 <code v-pre>l_f2 = (l[i] for i in range(2))</code> 之前，<code v-pre>l</code> 被重新赋值，发生了改变</li>
</ul>
<p>函数式编程要强调 <strong>immutable</strong>（<em>不可变</em> ）</p>
<pre><code>【特点】：
    1.通过yield替换迭代器两个方法并有中断功能    ——  逐个传出数据
    2.数据需要的时候才存储到内存中               ——  逐个传入数据

yield:(最重要的意义在于协程(跟线程进程并列的))  指的是yield断层(每次执行后的保存状态)
如果一个函数包含yield 那么它就不是一个普通的函数而是一个generator（生成器） --见fibo 包含警告部分
    def foo():
        yield n #这样便创建了一个生成器
    foo()便是一个生成器对象 无论函数内部有什么 只是放在内存中 都不会执行。当然foo还是一个函数但foo()就是生成器了

    def foo():
        print(&quot;ok&quot;);yield 3;
        print(&quot;ok2&quot;);yield 1;#断点测试后无论yield后返回什么值 都能根据next()进行记录上一测程序进入时的位置
    for i in foo():
        print(i)此时会把返回值也一起打印出来 利用next()时返回值实质上返回给了next

什么是可迭代对象:
    现象:
        从现象上看能进行for循环的便是可迭代对象
    本质:
        从本质上来说 内部有iter方法的才是可迭代对象.__iter__()


什么叫同时:
    before, after =after, before + after 当碰到这种情况先想想什么叫同时?
    同时也可以说是并行吖
    什么叫并行？(一个CPU,单核)
        你想让before = after after = before + after 这两件事同时干 那么是谁在干活?-----CPU在干活
        但目前学的都是单线程 一个核在干活(因此它能不能达到同时)它达不到同时
        所以扯淡啊,怎么会有同时执行 单核哪里能同时(顶多分片轮询 但那那是同时啊)
    因此没学线程之前 肯定不会涉及到并发 (因此单核绝无同时的概念)

那么如上是个什么操作?
    是这样,例如
    before = 1;after = 2
    before,after = after, before + after 实质上是先把它们进行计算出来 也就是
    before,after = 2, 3 然后再进行赋值 也就是说是先执行右边

记得上次理解原理是的一些感悟吗?(不是标签哦 虽然文案上并没写--去好好回顾吧)
    得出的结论就是 表达式赋值都是先执行右边的(据上确定) 然后才会赋值给左边
    右边的表达式计算出的结果才会把结果的地址指针赋给左边的标签 因此如上

生成器.send():(和next一样都可以进入函数体)
    当第一次send 前面没有next 只能发送空数据
    生成器.send(None) 等同于next(生成器)
    之后变可以传值 生成器.send(value)
    首先value 可以设置变量利用yield赋值来接收

    程序是如何执行的:
        先.send(None) 在count=yield 1处 先执行右边表达式 yield 1 直接返回(冻结记录) 然后.send(&quot;hhh&quot;)
        count从上次冻结地yield接收&quot;hhh&quot; 此时count 便也在内存中供后续调用。之后到yield时 .send(&quot;&quot;)接收到了yield
        的返回值
    为什么生成器第一次不能传值?
        假设用next(g)执行 走到yield 1此时程序冻结。下一次便可以利用send传值给yield 1 并用count接收
        第一次就传值的话生成器没有办法接收 因为之前并没有yield记录
    用途:
        有时程序是需要进行交互的 需要调用它的时候给一些参数 这是利用send传值便可以值导入

可控制性:
    普通函数执行完便结束了,但生成器不一样 什么时候想调用就再次next一下 便可以计算下一个值
</code></pre>
<p>5.1 生成器伪并发:<br>
论单核如何实现(伪物)并发:<br>
比如同时听歌和看电影 CPU 轮询切换执行(事实上就是先看一段电影在执行一段音乐)只是由于 CPU 切换实在是太快了 0.0...0 几秒<br>
因此感官上感觉是在&quot;同时&quot;执行 或是&quot;并发&quot;的。(人眼处理 == 当每秒帧数&lt;24 当秒速超过 24 时 便意识为连续)<br>
所以是(伪)有先后的<br>
真正的并发还是要有多核多个线程同时执行<br>
下面是一个官方更新的同时模拟多个用户在线看的伪并发(感觉是同时发生的其实不是)<br>
import time</p>
<pre><code>def consumer(name):
    print(&quot;%s 准备看番啦&quot; % name)
    while True:
        animate = yield

        print(&quot;新番第[%s]集出来啦, [%s]点进去看了看！&quot; % (animate, name))

def producer(name):
    c = consumer(&quot;小白&quot;)
    c2 = consumer(&quot;小明&quot;)#两个生成器对象
    c.__next__()#在这里返回之前打印了 小白准备看番啦
    c2.__next__()#在这里执行
    print(&quot;%s准备发布新番&quot; % name)
    for i in range(1,13):
        time.sleep(1)
        print(&quot;%s更新了一集&quot; % name)
        c.send(i)
        c2.send(i)

producer(&quot;官方&quot;)

这里c 和c2 实际上是拿到了两个生成器对象
第一次执行__next__()时先是到了yield (用next 和 send(None)同)进行返回
之后生产者进行生产(也就是打印等一系列操作)之后调用消费者.send()
循环调用消费者 每次循环调用两个生成器对象
第一次时消费者1 从yield开始 把传入的i对animate赋值 消费者2 也从上次中断的yield开始 同时赋值
这里要另谈的是: c 和 c2 这两个生成器分别是在内存中生成两个地址段(它们是不同的)每次分别调用时 各自的生成器都会
记录下自己上次返回的yield

之所以和之前的看上去一次次next()不同,无非就是利用了循环加yield
有点类似协作式的协程 而不是像抢占式的线程
</code></pre>
<h3 id="yield-from" tabindex="-1"><a class="header-anchor" href="#yield-from"><span>yield from</span></a></h3>
<h4 id="yield-from-和-yield-的区别" tabindex="-1"><a class="header-anchor" href="#yield-from-和-yield-的区别"><span>yield from 和 yield 的区别：</span></a></h4>
<ul>
<li>
<p>简化了 yield 的操作:</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> titles:    等价于  </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">yield from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> titles</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    yield</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> title</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>省去了很多异常的处理:</p>
<blockquote>
<p>例如<code v-pre>send(None)</code> 不会报错等</p>
</blockquote>
</li>
<li>
<p>建立调用方和子生成器的通道</p>
</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> generator_1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">():</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    total </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    while</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        x </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> yield</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'加'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, x)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> not</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            break</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        total </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> total</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> generator_2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">():  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 委托生成器</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    while</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        total </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> yield from</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> generator_1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 子生成器</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'加和总数是:'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, total)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">():  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 调用方</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    g1 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> generator_1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    g1.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">send</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">None</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    g1.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">send</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    g1.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">send</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    g1.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">send</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">None</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># g2 = generator_2()</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># g2.send(None)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># g2.send(2)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># g2.send(3)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># g2.send(None)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>【子生成器】：yield from 后的 generator_1()生成器函数是子生成器</p>
</li>
<li>
<p>【委托生成器】：generator_2()是程序中的委托生成器，它负责委托子生成器完成具体任务。</p>
</li>
<li>
<p>【调用方】：main()是程序中的调用方，负责调用委托生成器。</p>
<ul>
<li>在上述代码中 main()每一次在调用 send(value)时，value 不是传递给了委托生成器 generator_2()，而是借助 yield from 传递给了子生成器 generator_1()中的 yield</li>
<li>同理，子生成器中的数据也是通过 yield 直接发送到调用方 main()中。</li>
</ul>
</li>
</ul>
<img src="@source/python/语言/进阶/img/yield_from.png">
</div></template>


