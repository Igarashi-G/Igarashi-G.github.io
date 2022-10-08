<template><div><p>所有的生成器都是 <RouterLink to="/python/%E8%AF%AD%E8%A8%80/%E8%BF%9B%E9%98%B6/%E8%BF%AD%E4%BB%A3%E5%99%A8.html">迭代器</RouterLink>，因为生成器 <strong>完全实现</strong> 了迭代器接口</p>
<!-- more -->
<h1 id="生成器" tabindex="-1"><a class="header-anchor" href="#生成器" aria-hidden="true">#</a> 生成器</h1>
<p>迭代器从集合中取元素，而生成器用于 <strong>凭空</strong> 生成元素</p>
<div class="custom-container info">
<p class="custom-container-title">总之</p>
<p>含有 <strong>yield</strong> 关键字的 <strong>函数</strong> 就是 <strong>生成器函数</strong></p>
</div>
<h3 id="_1-1-生成器表达式" tabindex="-1"><a class="header-anchor" href="#_1-1-生成器表达式" aria-hidden="true">#</a> 1.1 生成器表达式</h3>
<p><code v-pre>genexpr = (推导式)</code> 的这种形式 <strong>是生成器的语法糖</strong>， 非元组，要区别于 <code v-pre>tuple(推导式)</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>s <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">*</span> <span class="token number">2</span> <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>

<span class="token comment"># &lt;generator object &lt;genexpr> at 0x0000013EF1BF84A0></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时打印出了 <strong>generator</strong> 对象，它保存的与列表、集合（<em>这种存值的情况</em>）是不同的，存了程序的上下文状态，因此一样不占内存，还可以像迭代器一样，用 <code v-pre>__next__()</code> 来取值，但只能顺序取</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>s<span class="token punctuation">.</span>__next__<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 0</span>

<span class="token builtin">next</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>	<span class="token comment"># Python3</span>
<span class="token comment"># 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>for的实质:
    生成器可以用for i in s: print(i)这样来取出 这种方式看似没有用到next()内置方法
    i能取到s的值是for的功能 for就是对s内部进行了一个next的调用(for循环遍历可迭代对象)

    python的for里面到底做了什么? 其实它就是做了这么一件事情 调用里面的next() 取里面的值(不断的next赋值给i)
    之后每次调用新的值赋给了i 之前的便会被垃圾回收 因此空间就出来了(因此占内存的只有这一个数,空间永远自由)

    按理来说调用到最后一个会报异常 然而for会进行检测。 for是利用了异常捕获(except)捕捉到异常(迭代停止)直接
    就返回了 不做任何其他处理

    while True:
        i = next(可迭代对象)
        捕捉异常 进行处理(返回)

【创建方式】:
    1.(x for x in range(n)) ： 生成器表达式（有别于列表生成式）
    2.yield(语法糖)

【特点】：
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
<p>5.1 生成器之伪并发:
论单核如何实现(伪物)并发:
比如同时听歌和看电影 CPU 轮询切换执行(事实上就是先看一段电影在执行一段音乐)只是由于 CPU 切换实在是太快了 0.0...0 几秒
因此感官上感觉是在&quot;同时&quot;执行 或是&quot;并发&quot;的。(人眼处理 == 当每秒帧数&lt;24 当秒速超过 24 时 便意识为连续)
所以是(伪)有先后的
真正的并发还是要有多核多个线程同时执行
下面是一个官方更新的同时模拟多个用户在线看的伪并发(感觉是同时发生的其实不是)
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
<p>6.迭代器:
生成器都是迭代器,迭代器不一定都是生成器
例：</p>
<pre><code>    title = ['Python','Java','C++'] # 列表是一个可迭代对象
    isinstance(title,Iterable)      # True
    a = iter(title) # 由可迭代对象的iter方法返回一个迭代器
    &gt;&gt;&gt; next(a)
    Python
    &gt;&gt;&gt; next(a)
    Java
    &gt;&gt;&gt; next(a)
    C++
    &gt;&gt;&gt; next(a)  # 抛出StopIteration异常

【什么是迭代器？】
    利用内置方法 iter() 把 list 、 dict 、 str 等 Iterable（可迭代对象） 进行转换，返回的对象 Iterator

    Iterator 这个对象就是一个迭代器对象，也就是迭代器了


str list tuple dict:Iterable (可迭代对象)
什么是迭代器？(迭代器协议)
    Iterable定义了可返回迭代器的__iter__()方法、__next__() 方法
        1.有iter方法:__iter__()
        2.有next方法:__next__()

        为什么必须有iter方法?
            首先这是一个规定:好多iter方法return的是self(自身)（这里是说__iter__()内部return self 见下：for循环的第一件事）
            但想for循环只有next方法没有iter方法就不能进行循环(就是自定义迭代器没有iter方法的话如何循环)
            因此内置的iter方法实际是调用__iter__()方法 如int类自身没有__iter__()方法则无法调用
            'int' object is not iterable

        迭代器调用next()方法调用做的两件事：
            1.为下一次调用next()方法修改状态
            2.生成当前调用的返回结果

    生成器比迭代器更优雅 因为是用yield实现的(满足迭代器协议 本身也是一个迭代器对象)

for循环探讨后续:(三件事)
    已知for循环in后面接的是可迭代对象 但是可迭代对象并不具有iter方法 如:
    [1,2,34] 我们不能把它next([1,2,34]) 因为它是list对象啊
    1.因此for循环 第一件干的事就是把 “可迭代对象变成迭代器” ---用了iter()方法（实质上是去找可迭代对象里的__iter__方法，当有for循环时
    便会自动执行对象中的__iter__方法，此方法只会返回迭代器，详情见4.3特殊方法）
    2.第二件干的事就是不断调用迭代器对象的next方法进行迭代
    3.第三便是前面说的捕获异常并处理StopIteration

isinstance(o,t):
    判断前一个对象是不是后面的类型 返回True False
    导入collections中的Iterator和Iterable模块便可进行辨析 主要见代码

现在在来看文件:
    f = open(&quot;xx.txt&quot;,r+,encoding=&quot;utf8&quot;)
    for i in f.readlines(): 此时是把文件复制之后每一行当成一个元素放到列表中存储，再返回
    若利用for i in f:则压根没有复制f 而是把f直接利用iter(f)返回了迭代器对象，之后f.read()
    每次调用(next)时才占一行的内存 因此这就是不用readlines的原因（迭代器不占内存的好处，用时next一条）
</code></pre>
<p>容器、迭代器、生成器区别： 1.容器：包含常见的列表、元组、字典、集合和字符串，序列存储在内存中，需要的时候可以一并取出</p>
<pre><code>2.迭代器：iter(容器)返回的对象，按需存储，可以通过next()进行迭代,但并不是把所有序列放在内存中再迭代取值，而是仅仅将迭代到的某个值取到内存中

3.生成器：算是另一个迭代器，不仅可以迭代按需取数据，还可以通过send()传入数据，并在生成器内部计算

相同点：都是可迭代对象
</code></pre>
<h2 id="yield-from" tabindex="-1"><a class="header-anchor" href="#yield-from" aria-hidden="true">#</a> yield from</h2>
<h3 id="yield-from-和-yield-的区别" tabindex="-1"><a class="header-anchor" href="#yield-from-和-yield-的区别" aria-hidden="true">#</a> yield from 和 yield 的区别：</h3>
<ul>
<li>
<p>简化了 yield 的操作:</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> i <span class="token keyword">in</span> titles<span class="token punctuation">:</span>    等价于  <span class="token keyword">yield</span> <span class="token keyword">from</span> titles
    <span class="token keyword">yield</span> title
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
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
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">generator_1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    total <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        x <span class="token operator">=</span> <span class="token keyword">yield</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'加'</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> x<span class="token punctuation">:</span>
            <span class="token keyword">break</span>
        total <span class="token operator">+=</span> x
    <span class="token keyword">return</span> total


<span class="token keyword">def</span> <span class="token function">generator_2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># 委托生成器</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        total <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token keyword">from</span> generator_1<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 子生成器</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'加和总数是:'</span><span class="token punctuation">,</span> total<span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># 调用方</span>
    g1 <span class="token operator">=</span> generator_1<span class="token punctuation">(</span><span class="token punctuation">)</span>
    g1<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
    g1<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    g1<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    g1<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>


<span class="token comment"># g2 = generator_2()</span>
<span class="token comment"># g2.send(None)</span>
<span class="token comment"># g2.send(2)</span>
<span class="token comment"># g2.send(3)</span>
<span class="token comment"># g2.send(None)</span>

main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
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


