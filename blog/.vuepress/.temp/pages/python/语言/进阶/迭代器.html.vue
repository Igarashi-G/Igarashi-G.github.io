<template><div><p>迭代是数据处理的基石，<strong>内存放不下数据</strong> 时，需要找到一种 <strong>惰性获取数据项</strong> 的方式，即按需一次获取一个数据项，这就是 <strong>迭代器模式</strong>（<em>Iterator pattern</em>）</p>
<!-- more -->
<h2 id="_1-什么是迭代器" tabindex="-1"><a class="header-anchor" href="#_1-什么是迭代器"><span>1. 什么是迭代器</span></a></h2>
<blockquote>
<p>通常，迭代器是从 <strong>集合</strong> 中取元素，表示集合是有限多个，只是通过迭代器来一个个取</p>
</blockquote>
<p>既然是取集合，那么所有集合都 <strong>可迭代</strong>，场景如下</p>
<ul>
<li>可迭代意味着能 <strong>for</strong> 循环遍历</li>
<li>可构建和扩展集合类型</li>
<li>逐行遍历文本文件</li>
<li>列表、字典、集合推导</li>
<li>元组拆包</li>
<li>调用函数时，使用拆包实例</li>
</ul>
<h3 id="_1-1-可迭代对象-单词序列" tabindex="-1"><a class="header-anchor" href="#_1-1-可迭代对象-单词序列"><span>1.1 可迭代对象（<em>单词序列</em>）</span></a></h3>
<p><strong>实现 Sentence 类：</strong> 向该类的构造方法中，传入一个包含某些文本的字符串，然后可以实现逐个单词的迭代</p>
<ul>
<li>首先，实现一个类，该类包含了 <RouteLink to="/python/%E8%AF%AD%E8%A8%80/%E6%B7%B1%E5%85%A5/%E5%BA%8F%E5%88%97%E8%BF%9B%E9%98%B6.html#_1-%E5%BA%8F%E5%88%97%E5%8D%8F%E8%AE%AE">序列协议</RouteLink></li>
<li>它的实例化对象可迭代（能像序列一样，使用 <strong>for</strong> 循环 遍历出结果）</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> re</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> reprlib</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">RE_WOED</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> re.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">compile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"\w+"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Sentence</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> __init__</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> text</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.text </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> text</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.words </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66"> RE_WOED</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">findall</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(text)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> __getitem__</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> index</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.words[index]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> __repr__</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Sentence</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">reprlib.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">repr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.text)</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">s </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> Sentence</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"hello word!"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> word </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> s:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(word)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">list</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(s))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">### 输出结果：</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># hello</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># word</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ['hello', 'word']</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>默认情况下 <a href="">reprlib.repr()</a> 生成的字符串最多有 <strong>30</strong> 个字符，此处给 <code v-pre>__repr__</code> 使用</p>
</li>
<li>
<p>此时会发现 <strong>Sentence</strong> 的实例化对象 <strong>s</strong> 可直接循环并打印出 <strong>word</strong></p>
</li>
<li>
<p>这是由于 <strong>for</strong> 循环每次迭代的时候会直接去 <code v-pre>__getitem__()</code> 取</p>
</li>
</ul>
<h3 id="_1-2-迭代器" tabindex="-1"><a class="header-anchor" href="#_1-2-迭代器"><span>1.2 迭代器</span></a></h3>
<h4 id="什么是迭代器" tabindex="-1"><a class="header-anchor" href="#什么是迭代器"><span>什么是迭代器</span></a></h4>
<p>利用内置方法 iter() 把 list 、 dict 、 str 等 Iterable（可迭代对象） 进行转换，返回的对象 Iterator</p>
<p>生成器都是迭代器,迭代器不一定都是生成器</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> title </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Python'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Java'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'C++'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] 	</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 列表是一个可迭代对象</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> isinstance</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(title, Iterable)      	</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># True</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> iter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(title) 					</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 由可迭代对象的 iter 方法返回一个迭代器</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> >>></span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> next</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(a)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Python</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> >>></span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> next</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(a)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> Java</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> >>></span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> next</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(a)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> C</span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">++</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> >>></span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> next</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(a)  						</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 抛出 StopIteration 异常</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>Iterator 这个对象就是一个迭代器对象，也就是迭代器了
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
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>for的实质:</span></span>
<span class="line"><span>    生成器可以用for i in s: print(i)这样来取出 这种方式看似没有用到next()内置方法</span></span>
<span class="line"><span>    i能取到s的值是for的功能 for就是对s内部进行了一个next的调用(for循环遍历可迭代对象)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    python的for里面到底做了什么? 其实它就是做了这么一件事情 调用里面的next() 取里面的值(不断的next赋值给i)</span></span>
<span class="line"><span>    之后每次调用新的值赋给了i 之前的便会被垃圾回收 因此空间就出来了(因此占内存的只有这一个数,空间永远自由)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    按理来说调用到最后一个会报异常 然而for会进行检测。 for是利用了异常捕获(except)捕捉到异常(迭代停止)直接</span></span>
<span class="line"><span>    就返回了 不做任何其他处理</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    while True:</span></span>
<span class="line"><span>        i = next(可迭代对象)</span></span>
<span class="line"><span>        捕捉异常 进行处理(返回)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>容器、迭代器、生成器区别： 1.容器：包含常见的列表、元组、字典、集合和字符串，序列存储在内存中，需要的时候可以一并取出</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>2.迭代器：iter(容器)返回的对象，按需存储，可以通过next()进行迭代,但并不是把所有序列放在内存中再迭代取值，而是仅仅将迭代到的某个值取到内存中</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.生成器：算是另一个迭代器，不仅可以迭代按需取数据，还可以通过send()传入数据，并在生成器内部计算</span></span>
<span class="line"><span></span></span>
<span class="line"><span>相同点：都是可迭代对象</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="按位置迭代" tabindex="-1"><a class="header-anchor" href="#按位置迭代"><span>按位置迭代</span></a></h4>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> itertools </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> islice</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">():</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    li </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">7</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">8</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">9</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">11</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">12</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">13</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">14</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> li:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        yield</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> __name__</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '__main__'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    f </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> foo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    limit </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    offset </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> islice</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(f, limit, limit </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> offset):</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(i)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用异步形式</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> aioitertools</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>计算长度（<em>通常来讲，不应计算迭代器的总长度，而是用来省内存</em> ）</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 会改变迭代器的下次迭代位置，需再 new 个对象</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">iter</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">50</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">sum</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> _ </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> iter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ------------</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> more_itertools</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">iter5 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> iter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">([</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">])</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(more_itertools.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">ilen</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(iter5))</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


