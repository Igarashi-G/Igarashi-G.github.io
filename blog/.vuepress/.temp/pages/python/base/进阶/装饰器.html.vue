<template><div><h1 id="装饰器" tabindex="-1"><a class="header-anchor" href="#装饰器" aria-hidden="true">#</a> 装饰器</h1>
<h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> 1. 概述</h2>
<p><strong>装饰器（<em>Decorators</em>）</strong> 用于源码 ’标记‘ 函数，以某种方式增强函数的行为，必须先掌握 <strong>以下三个条件</strong></p>
<ul>
<li>作用域</li>
<li>高阶函数</li>
<li><strong>闭包</strong> 的方方面面</li>
</ul>
<h3 id="_1-1-基础知识" tabindex="-1"><a class="header-anchor" href="#_1-1-基础知识" aria-hidden="true">#</a> 1.1 基础知识</h3>
<p>装饰器是可调用对象，其参数是<strong>另一个函数</strong>（<em>被装饰的函数</em>）。装饰器可能会处理被装饰的函数，然后把它返回，或者将其替换成另一个函数或可调用对象</p>
<p>假如有名为 <strong>decorate</strong> 的装饰器</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token decorator annotation punctuation">@decirate</span>
<span class="token keyword">def</span> <span class="token function">target</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running target()"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述写法等价于</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">target</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running target()"</span><span class="token punctuation">)</span>

target <span class="token operator">=</span> decorate<span class="token punctuation">(</span>target<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>上述代码执行后得到的 <code v-pre>target</code> 不一定是原来的 <code v-pre>target</code> 函数，而是 <code v-pre>decorate(target)</code> 返回的函数</li>
</ul>
<p>为了确认装饰器函数会被替换</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">deco</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
	<span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running inner()"</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> inner

<span class="token decorator annotation punctuation">@deco</span>
<span class="token keyword">def</span> <span class="token function">target</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running target()"</span><span class="token punctuation">)</span>

target<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
<span class="token comment"># 故意不写打印，盲猜试试？</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>严格来说装饰器是 <span style="color: orange; font-weight: 800">语法糖</span>，可以像常规调函数传参形式调用，但尤其是 <strong>元编程</strong> 时，使用 <code v-pre>@装饰器</code> 的形式更方便</p>
<h3 id="_1-2-python-何时执行装饰器" tabindex="-1"><a class="header-anchor" href="#_1-2-python-何时执行装饰器" aria-hidden="true">#</a> 1.2 Python 何时执行装饰器</h3>
<p>装饰器有两个特性</p>
<ol>
<li>能把被装饰的函数替换为其他函数</li>
<li><strong>装饰器在模块加载时立即执行</strong>，这个如何理解？如下</li>
</ol>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>registry <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>	<span class="token comment"># 保存的是被 @register 装饰的函数引用</span>


<span class="token keyword">def</span> <span class="token function">register</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"running register(</span><span class="token interpolation"><span class="token punctuation">{</span>func<span class="token punctuation">}</span></span><span class="token string">)"</span></span><span class="token punctuation">)</span>
    registry<span class="token punctuation">.</span>append<span class="token punctuation">(</span>func<span class="token punctuation">)</span>
    <span class="token keyword">return</span> func


<span class="token decorator annotation punctuation">@register</span>
<span class="token keyword">def</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running f1()"</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@register</span>
<span class="token keyword">def</span> <span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running f2()"</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">f3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running f3()"</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running main()"</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"registry -> "</span><span class="token punctuation">,</span> registry<span class="token punctuation">)</span>
    f1<span class="token punctuation">(</span><span class="token punctuation">)</span>
    f2<span class="token punctuation">(</span><span class="token punctuation">)</span>
    f3<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    main<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># running register(&lt;function f1 at 0x00000206AFD66E58>)</span>
<span class="token comment"># running register(&lt;function f2 at 0x00000206AFD66EE8>)</span>
<span class="token comment"># running main()</span>
<span class="token comment"># registry -> registry ->  [&lt;function f1 at 0x000001B5924DB310>, &lt;function f2 at 0x000001B592502EE0>]</span>
<span class="token comment"># running f1()</span>
<span class="token comment"># running f2()</span>
<span class="token comment"># running f3()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>会发现 <code v-pre>register()</code> 函数先执行并打印了 <code v-pre>running register</code></li>
<li><strong>Python</strong> 加载模块时，会先将定义好的函数占块地址加载到内存，然后解释器顺序执行</li>
<li>看似直接执行了装饰器，但不是，而是在调用 <code v-pre>@register</code> 时，相当于执行了 <code v-pre>func= register(func)</code> ，解释器顺便执行了 <code v-pre>register()</code> 而已</li>
<li>这样直接接收函数，并 <strong>原样返回</strong> 的装饰器，并非没用。很多 <strong>Python Web</strong> 框架使用这种装饰器，把函数添加到某种中央注册处
<ul>
<li>如：把 <strong>URL</strong> 模式映射到生成 <strong>HTTP</strong> 响应的函数上的注册处</li>
</ul>
</li>
</ul>
<h3 id="_1-3-函数的作用域" tabindex="-1"><a class="header-anchor" href="#_1-3-函数的作用域" aria-hidden="true">#</a> 1.3 函数的作用域</h3>
<p>说闭包前先看一个 <a href="/back_end/python/base/%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/%E5%87%BD%E6%95%B0#4-%E5%87%BD%E6%95%B0%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F" target="_blank" rel="noopener noreferrer">作用域<ExternalLinkIcon/></a> 的栗子</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    c <span class="token operator">=</span> <span class="token number">6</span>

f<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里能拿到 <code v-pre>c</code> 的值么? 当然不能，函数在 <code v-pre>f()</code> 调用后便在内存中销毁了，因此全局中拿不到局部的变量 <code v-pre>c</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>b <span class="token operator">=</span> <span class="token number">6</span>

<span class="token keyword">def</span> <span class="token function">f3</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># global b</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
    b <span class="token operator">=</span> <span class="token number">9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时会报错，为啥 <code v-pre>print(b)</code> 时显示 <code v-pre>b</code> 尚未赋值报错？</p>
<ul>
<li>
<p>由于 <strong>字节码</strong> 中，<strong>Python</strong> 定义了 <strong>b 是局部作用域，而并非全局作用域</strong></p>
</li>
<li>
<p>解决办法可以再 <code v-pre>print(b)</code> 前添加 <code v-pre>global b</code> 指定字节码解析时 <code v-pre>b</code> 为全局作用域</p>
<blockquote>
<p>这比 <strong>JavaScript</strong> 优秀，因为 <strong>JavaScript</strong> 内部未定义变量 <code v-pre>b</code> 就会自动全局 <code v-pre>var b</code> ，所以常会莫名其妙的拿到个全局作用域的变量，就很离谱</p>
</blockquote>
</li>
</ul>
<p>关于 <strong>字节码</strong>，可使用反汇编 <strong>dis</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> dis <span class="token keyword">import</span> dis

dis<span class="token punctuation">(</span>f3<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行字节码的 <strong>Cpython VM</strong> 是栈机器，<strong>LOAD</strong> 和 <strong>POP</strong> 操作引用的是栈</p>
<h3 id="_1-4-闭包" tabindex="-1"><a class="header-anchor" href="#_1-4-闭包" aria-hidden="true">#</a> 1.4 闭包</h3>
<p>通常会将闭包和匿名函数弄混，因为在 <strong>函数里写函数不常见</strong>，通常使用匿名函数才会这么做，且只有涉及到嵌套函数时才有闭包问题，很多人是同时知道这两个概念的</p>
<p>闭包，即 <strong>延伸了作用域</strong> 的函数，函数式实现一个计算平均值的 <strong>高阶函数</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">make_averager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    series <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token keyword">def</span> <span class="token function">averager</span><span class="token punctuation">(</span>new_value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        series<span class="token punctuation">.</span>append<span class="token punctuation">(</span>new_value<span class="token punctuation">)</span>
        total <span class="token operator">=</span> <span class="token builtin">sum</span><span class="token punctuation">(</span>series<span class="token punctuation">)</span>
        <span class="token keyword">return</span> total <span class="token operator">/</span> <span class="token builtin">len</span><span class="token punctuation">(</span>series<span class="token punctuation">)</span>

    <span class="token keyword">return</span> averager


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    avg <span class="token operator">=</span> make_averager<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 输出结果</span>
<span class="token number">10.0</span>
<span class="token number">10.5</span>
<span class="token number">11.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会发现每次调用 <code v-pre>avg()</code> 函数，都会将上一次调用的值存储起来，如何做到的？</p>
<ul>
<li>
<p>首先 <code v-pre>series</code> 是 <code v-pre>make_averager()</code> 的局部变量，按理说 <code v-pre>make_averager()</code> 返回后<strong>局部变量及作用域应该被销毁才对</strong>，但其实不然</p>
<ul>
<li>此时 <code v-pre>series</code> 是个 <strong>自由变量</strong>（<em>free variable</em>）：指在本地作用域中绑定的变量</li>
<li>此时不会触发垃圾回收</li>
</ul>
<img src="@source/python/Base/进阶/img/闭包.png">
</li>
<li>
<p>在函数内部，<strong>对外部作用域</strong>（<em>但不是全局作用域</em>）的变量，进行 **引用 ** 的，就是闭包</p>
</li>
</ul>
<p>审查 <code v-pre>make_averager()</code> 创建的函数， 使用 <code v-pre>__code__</code> （<em>编译后的函数定义体</em>）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">.</span>__code__<span class="token punctuation">.</span>co_varnames<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">.</span>__code__<span class="token punctuation">.</span>co_freevars<span class="token punctuation">)</span>

<span class="token comment"># ('new_value', 'total')</span>
<span class="token comment"># ('series',)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>series</code> 的绑定，在返回的 <code v-pre>avg</code> 函数的 <code v-pre>__closure__</code> 属性中，各元素对应于 <code v-pre>avg.__code__.co_freevars</code> 中的一个名称，这些元素是 <strong>cell</strong> 对象，有 <code v-pre>cell_contents</code> 属性保存真正的值</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">.</span>__closure__<span class="token punctuation">)</span>
<span class="token comment"># (&lt;cell at 0x000001B3A5EBBFD0: list object at 0x000001B3A5B84D80>,)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">.</span>__closure__<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cell_contents<span class="token punctuation">)</span>
<span class="token comment"># [10, 11, 12]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>综上，闭包是种函数，会保留定义函数时，存在的自由变量的绑定，虽然作用域不可用，但 <strong>绑定依然可用</strong></p>
<blockquote>
<p><strong>注意：</strong> 大量使用闭包是很有风险的操作，尤其定义的还是 <strong>可变类型的局部变量</strong>，这常导致 <strong>内存泄露！</strong></p>
</blockquote>
<h3 id="_1-5-结合-nonlocal-声明" tabindex="-1"><a class="header-anchor" href="#_1-5-结合-nonlocal-声明" aria-hidden="true">#</a> 1.5 结合 nonlocal 声明</h3>
<p>上文已经造成了内存泄露，此时为了优化，更好思路如下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">make_averager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    count <span class="token operator">=</span> <span class="token number">0</span>
    total <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">def</span> <span class="token function">averager</span><span class="token punctuation">(</span>new_value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        count <span class="token operator">+=</span> <span class="token number">1</span>
        total <span class="token operator">+=</span> new_value
        <span class="token keyword">return</span> total <span class="token operator">/</span> count

    <span class="token keyword">return</span> averager

<span class="token comment">## 输出结果</span>
<span class="token comment"># count += 1</span>
<span class="token comment"># UnboundLocalError: local variable 'count' referenced before assignment</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>此时发现，解释器报错，局部变量 <code v-pre>count</code> 未定义前引用</li>
<li>这是由于 <code v-pre>count += 1</code> 本质是 <code v-pre>count = count + 1</code> 解释器先执行右边，再未声明 <code v-pre>count</code> 前就进行了 <code v-pre>+1</code> 操作</li>
<li>这时会有疑问，为啥上文 <code v-pre>series</code> 不会报错 <strong>?</strong>
<ul>
<li>是因为 <code v-pre>count</code> 是不可变对象，不能进行增删改操作，只可读</li>
<li><code v-pre>series</code> 也没有进行赋值前引用操作，而是调用了 <code v-pre>.append()</code> 进行了增加操作，此时不会影响变量本身的地址</li>
</ul>
</li>
</ul>
<p>故可以配合 <a href="/back_end/python/base/%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/%E5%87%BD%E6%95%B0#42-%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F%E5%92%8C%E5%B1%80%E9%83%A8%E5%8F%98%E9%87%8F" target="_blank" rel="noopener noreferrer">nonlocal<ExternalLinkIcon/></a> 来改写，使其不用列表形式，保存所有的历史值</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">make_averager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    count <span class="token operator">=</span> <span class="token number">0</span>
    total <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">def</span> <span class="token function">averager</span><span class="token punctuation">(</span>new_value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">nonlocal</span> count<span class="token punctuation">,</span> total
        count <span class="token operator">+=</span> <span class="token number">1</span>
        total <span class="token operator">+=</span> new_value
        <span class="token keyword">return</span> total <span class="token operator">/</span> count

    <span class="token keyword">return</span> averager


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    avg <span class="token operator">=</span> make_averager<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>avg<span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token number">10.0</span>
<span class="token number">10.5</span>
<span class="token number">11.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时 <strong>内存同样泄露</strong>，但泄露的起码比 <strong>list</strong> （<em>列表</em>）少太多，稍微变得 <strong>相对可控</strong></p>
<h2 id="_2-实现装饰器" tabindex="-1"><a class="header-anchor" href="#_2-实现装饰器" aria-hidden="true">#</a> 2. 实现装饰器</h2>
<h3 id="_2-1-理念" tabindex="-1"><a class="header-anchor" href="#_2-1-理念" aria-hidden="true">#</a> 2.1 理念</h3>
<p>**装饰器：**区别于《设计模式》中的装饰器模式，但其描述的：“动态的给一个对象添加一些额外的职责” 的理念是一致的，但在实现层面，与装饰器模式，毫无关系。它符合 <strong>开放封闭</strong> 及 <strong>AOP</strong></p>
<ul>
<li>
<p><strong>开放封闭原则：</strong> 不修改内部函数的情况下，增加新功能，类似补丁一样</p>
</li>
<li>
<p>**AOP（<em>面向切面式编程</em>）：**即横向插入一段逻辑，可以减少大量重复代码</p>
<ul>
<li>常用场景：插入日志、性能测试、事务处理等</li>
</ul>
</li>
</ul>
<h3 id="_2-2-简单装饰器" tabindex="-1"><a class="header-anchor" href="#_2-2-简单装饰器" aria-hidden="true">#</a> 2.2 简单装饰器</h3>
<p>实现一个简单装饰器：被装饰的函数可以每次调用后，将花费的 <strong>时间</strong>、<strong>传参</strong>、<strong>结果</strong> 都打印出来</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time


<span class="token keyword">def</span> <span class="token function">clock</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">clocked</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">)</span><span class="token punctuation">:</span>
        start_time <span class="token operator">=</span> time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">)</span>	<span class="token comment"># 闭包</span>
        end_time <span class="token operator">=</span> time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start_time
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"[</span><span class="token interpolation"><span class="token punctuation">{</span>end_time<span class="token punctuation">:</span><span class="token format-spec">.8f</span><span class="token punctuation">}</span></span><span class="token string">μs], </span><span class="token interpolation"><span class="token punctuation">{</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">}</span></span><span class="token string">(</span><span class="token interpolation"><span class="token punctuation">{</span>args<span class="token punctuation">}</span></span><span class="token string">) -> </span><span class="token interpolation"><span class="token punctuation">{</span>ret<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> ret

    <span class="token keyword">return</span> clocked


<span class="token decorator annotation punctuation">@clock</span>
<span class="token keyword">def</span> <span class="token function">snooze</span><span class="token punctuation">(</span>seconds<span class="token punctuation">)</span><span class="token punctuation">:</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>seconds<span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@clock</span>
<span class="token keyword">def</span> <span class="token function">factorial</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token number">1</span> <span class="token keyword">if</span> n <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token keyword">else</span> n <span class="token operator">*</span> factorial<span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    snooze<span class="token punctuation">(</span><span class="token number">.123</span><span class="token punctuation">)</span>
    factorial<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>factorial<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token punctuation">[</span><span class="token number">0.11668170</span>μs<span class="token punctuation">]</span><span class="token punctuation">,</span> snooze<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">0.123</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token boolean">None</span>
<span class="token punctuation">[</span><span class="token number">0.00000230</span>μs<span class="token punctuation">]</span><span class="token punctuation">,</span> factorial<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">1</span>
<span class="token punctuation">[</span><span class="token number">0.00008320</span>μs<span class="token punctuation">]</span><span class="token punctuation">,</span> factorial<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">2</span>
<span class="token punctuation">[</span><span class="token number">0.00013500</span>μs<span class="token punctuation">]</span><span class="token punctuation">,</span> factorial<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">6</span>
<span class="token punctuation">[</span><span class="token number">0.00018600</span>μs<span class="token punctuation">]</span><span class="token punctuation">,</span> factorial<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">24</span>
<span class="token punctuation">[</span><span class="token number">0.00022760</span>μs<span class="token punctuation">]</span><span class="token punctuation">,</span> factorial<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">120</span>
<span class="token punctuation">[</span><span class="token number">0.00028440</span>μs<span class="token punctuation">]</span><span class="token punctuation">,</span> factorial<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">720</span>
clocked
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>查看<code v-pre>__name__</code> 属性，会发现输出 <code v-pre>clocked</code>，这是由于被装饰后 <code v-pre>factorial</code> 保存了 <code v-pre>clocked</code> 函数的引用</p>
</li>
<li>
<p>装饰器的典型行为就是 <strong>把被装饰的函数替换成新函数</strong>，且二者接收到了相同的参数，再做些额外操作，并返回 加工|未加工 的值</p>
</li>
</ul>
<p>如上存在许多缺点，故需要改写</p>
<ol>
<li>属性 <code v-pre>__name__</code> 不是想要的值</li>
<li>不支持关键字参数</li>
<li>其实还遮盖了 <code v-pre>__doc__</code> 属性</li>
</ol>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> functools


<span class="token keyword">def</span> <span class="token function">clock</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token decorator annotation punctuation">@functools<span class="token punctuation">.</span>wraps</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">clocked</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        start_time <span class="token operator">=</span> time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span>
        ret <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        end_time <span class="token operator">=</span> time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start_time
        arg_lst <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">if</span> args<span class="token punctuation">:</span>
            arg_lst<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token builtin">repr</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token keyword">for</span> arg <span class="token keyword">in</span> args<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> kwargs<span class="token punctuation">:</span>
            pairs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>k<span class="token punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token punctuation">{</span>v<span class="token punctuation">}</span></span><span class="token string">"</span></span> <span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>kwargs<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
            arg_lst<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">", "</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>pairs<span class="token punctuation">)</span><span class="token punctuation">)</span>
        arg_str <span class="token operator">=</span> <span class="token string">", "</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>arg_lst<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"[</span><span class="token interpolation"><span class="token punctuation">{</span>end_time<span class="token punctuation">:</span><span class="token format-spec">.8f</span><span class="token punctuation">}</span></span><span class="token string">μs], </span><span class="token interpolation"><span class="token punctuation">{</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">}</span></span><span class="token string">(</span><span class="token interpolation"><span class="token punctuation">{</span>arg_str<span class="token punctuation">}</span></span><span class="token string">) -> </span><span class="token interpolation"><span class="token punctuation">{</span>ret<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> ret

    <span class="token keyword">return</span> clocked
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>@functools.wraps(func)</code> 详见 <a href="/back_end/python/package/%E6%A0%87%E5%87%86%E5%BA%93%E8%BF%9B%E9%98%B6/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B#1-functools" target="_blank" rel="noopener noreferrer">标准库<ExternalLinkIcon/></a>，用来还原被装饰器覆盖的 <code v-pre>__name__</code> 和 <code v-pre>__doc__</code> 等属性</li>
</ul>
<h3 id="_2-3-标准库中的装饰器" tabindex="-1"><a class="header-anchor" href="#_2-3-标准库中的装饰器" aria-hidden="true">#</a> 2.3 标准库中的装饰器</h3>
<p><strong>Python</strong> 内置了三个用于装饰器方法的函数，<code v-pre>property</code>、<code v-pre>classmethod</code> 和 <code v-pre>staticmethod</code>， 都是和面向对象相关，其他还有 <code v-pre>lru_cache</code> 做轻量缓存加速、<code v-pre>singledispatch</code> 做单分派泛函数等</p>
<h3 id="_2-4-叠放装饰器" tabindex="-1"><a class="header-anchor" href="#_2-4-叠放装饰器" aria-hidden="true">#</a> 2.4 叠放装饰器</h3>
<p>装饰器可以叠放，如下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token decorator annotation punctuation">@d1</span>
<span class="token decorator annotation punctuation">@d2</span>
<span class="token keyword">def</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这种将 <code v-pre>@d1</code> 和 <code v-pre>@d2</code> 两个装饰器顺序叠放到函数 <code v-pre>f()</code> 上，等同于如下</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">pass</span>

f <span class="token operator">=</span> d1<span class="token punctuation">(</span>d2<span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-参数化装饰器" tabindex="-1"><a class="header-anchor" href="#_2-5-参数化装饰器" aria-hidden="true">#</a> 2.5 参数化装饰器</h3>
<p>装饰器可以接收被装饰的函数和他的参数，那么如何让装饰器自身来接收额外的参数呢？答案是创建一个 <strong>装饰器工厂函数</strong>，这个工厂的目的是，一调用这个工厂就能 <strong>返回</strong> 一个真正的 <strong>装饰器</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>registry <span class="token operator">=</span> <span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">register</span><span class="token punctuation">(</span>active<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">decorate</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"running register </span><span class="token interpolation"><span class="token punctuation">{</span>active<span class="token punctuation">}</span></span><span class="token string"> -> decorate(</span><span class="token interpolation"><span class="token punctuation">{</span>func<span class="token punctuation">}</span></span><span class="token string">)"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> active<span class="token punctuation">:</span>
            registry<span class="token punctuation">.</span>add<span class="token punctuation">(</span>func<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            registry<span class="token punctuation">.</span>discard<span class="token punctuation">(</span>func<span class="token punctuation">)</span>
        <span class="token keyword">return</span> func

    <span class="token keyword">return</span> decorate


<span class="token decorator annotation punctuation">@register</span><span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running f1()"</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@register</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running f2()"</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">f3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running f3()"</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running main()"</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"registry -> </span><span class="token interpolation"><span class="token punctuation">{</span>registry<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="工作案例-rpc-异步装饰器" tabindex="-1"><a class="header-anchor" href="#工作案例-rpc-异步装饰器" aria-hidden="true">#</a> 工作案例 - rpc 异步装饰器</h4>
<p>1.server 端 defer 装饰器（defer 自带异步，非 async-await 形式）
【环境】</p>
<p>将 Twised 的 server 端 线程异步化后的方法添加装饰器，避免每次手写 threads.deferToThread 以及手写偏函数封装</p>
<pre><code>import functools

from twisted.internet import threads
from twisted.web import xmlrpc

from app.agent.components.service.license import LicenseService

license_service = LicenseService()
# 这个是实例化后的具体服务，Twisted的XMLRPC类 都是根据 实例化的LicenseService() 来找方法的

def defer_to_thread(func):
    def inner(*args, **kwargs):
        cb = functools.partial(func(*args, **kwargs), args, kwargs)  # 此处错误应该在传入参数 self
        return threads.deferToThread(cb)

    return inner

# 以上为threads.deferToThread 装饰器， 避免了后续每次手写

class LicenseResource(xmlrpc.XMLRPC):

    def xmlrpc_start(self):     # 未使用装饰器的函数
        return threads.deferToThread(license_service.start)


    @defer_to_thread
    def xmlrpc_get_license_info(self, *args, **kwargs):     # 使用defer装饰器的函数
        return license_service.get_license_info
</code></pre>
<p>@defer_to_thread 是装饰在 xmlrpc_get_license_info 上的，但改写都是在其执行的返回值 license_service.get_license_info 上的</p>
<p>【因此】：</p>
<ul>
<li>
<p>func(*args, **kwargs) : 错误，正确应该为 func(self, *args, **kwargs)， 见下</p>
</li>
<li>
<p>inner(*args, **kwargs): 若函数是带有参数的，因此用 inner(*args, **kwargs) 来接收参数</p>
</li>
<li>
<p>functools.partial: 偏函数，为了分步传参，方便审查 传入第一个参数为 func 因此需要 执行 func(*args, **kwargs)返回</p>
</li>
<li>
<p>return threads.deferToThread(cb): defer 异步化，并返回结果给 RPC 的 client</p>
</li>
<li>
<p>inner(*args, **kwargs): 原则上带参数可以装饰一切函数，带参的 func 传入后会指向 inner</p>
</li>
</ul>
<p>【二次优化】</p>
<pre><code>from functools import wraps
from twisted.internet import threads

def defer_to_thread(*params, **kwparams):
    def wapper(func):
        @wraps(func)
        def decorator(self, *args, **kwargs):
            cb = func(self, *args, **kwargs)

            def inner(*fargs, **fkeywords):
                newkeywords = kwargs.copy()
                newkeywords.update(fkeywords)
                newfunc = cb(*(args + fargs), **newkeywords)
                return newfunc

            return threads.deferToThread(inner, *params, **kwparams)

        return decorator

    return wapper
</code></pre>
<ul>
<li>
<p>装饰器带参： 想装饰器带参数，则需要装饰器外部再封装一层函数，用来接收装饰器的参数给内部函数使用</p>
</li>
<li>
<p>@wraps(func)： 添加了@wraps(func)装饰器，来消除函数名属性被装饰后改变的副作用，保留原有函数的名称和 docstring</p>
</li>
<li>
<p>func(self, *args, **kwargs)：上面错误版改正，是执行了传入的 xmlrpc_get_license_info 为了返回 license_service.get_license_info</p>
</li>
<li>
<p>inner：去掉 partial，进而改为内部 inner 再次封装，inner 用于接收 func 的新参数。即 cb 获取到的 license_service.get_license_info，之前
是通过 partial 来接收参数，但看着不够好看规范，用 inner 这个内部函数来 对 cb（即 license_service.get_license_info）传入装饰器的新参数
当然也可以仅仅返回 cb(*args, **kwargs) 来接收 license_service.get_license_info 执行并当做参数传入 get_license_info 的 rpc</p>
</li>
<li>
<p>threads.deferToThread(inner, *params, **kwparams)：这里传入的 inner 即是回调了 params、kwparams 为装饰器传入的参数</p>
</li>
</ul>
<p>#####2. client 端 async 异步装饰器</p>
<pre><code>import asyncio
from functools import wraps
from xmlrpc import client


class RpcProxy:
    def __init__(self, host: str = &quot;localhost&quot;, port: int = 9000):
        self.proxy = client.ServerProxy(f&quot;http://{host}:{port}&quot;)


def async_executor(func):
    @wraps(func)
    async def inner(self, *args):
        loop = asyncio.get_event_loop()
        method = func(self, *args) # 若get_license_info加了async 前缀，此处要改为 await func(self, *args)
        return await loop.run_in_executor(None, method, *args)

    return inner

class LicenseRpc(RpcProxy):
    def __init__(self, host: str = &quot;localhost&quot;, port: int = 9000):
        super(LicenseRpc, self).__init__(host, port)

    @async_executor
    def get_license_info(self, *args):  # 若此处加上async 上文method
        return self.proxy.LICENSE.get_license_info
</code></pre>
<ul>
<li>
<p>RpcProxy：该类为 rpc 的客户端初始化，和装饰器无关（此处 RPC 优化见抽象工厂）</p>
</li>
<li>
<p>LicenseRpc：改类为 rpc 客户端子类，包含了 rpc 客户端的具体方法，但需要将其每次执行异步化，即将同步的 urllib 这个同步库的请求异步化，因此
需要装饰器来简化代码，遵循开放封闭原则</p>
</li>
<li>
<p>run_in_executor：将同步方法异步化的异步执行器，本案例即对此方法进行了封装</p>
</li>
<li>
<p>注意配合异步化，装饰器装饰的内部要使用 async - await</p>
</li>
<li>
<p>method = func(self, *args)：其实是调用了传入的 get_license_info 并返回 self.proxy.LICENSE.get_license_info 这个同步请求作为回调</p>
</li>
</ul>
<p>【注意】：</p>
<ul>
<li>
<p>被装饰函数 get_license_info 绝不能为协程（即加前缀 async）否则会报错： TypeError: 'coroutine' object is not callable。这是由于
此时的 method 为 &lt;coroutine object LicenseRpc.get_license_info at 0x000000000564E3C8&gt; 协程对象，不能当做 executor 的回调函数，
func(self, *args) 实际上执行的是 async def get_license_info(self, *args): 只要加了 async 前缀，它就会返回一个协程，除非将
method = func(self, *args) 改为 method = await func(self, *args) 才能正常拿到 self.proxy.LICENSE.get_license_info，但其实
没必要，直接不用协程获取返回值即可。</p>
</li>
<li>
<p>对于 def get_license_info(self, *args) 中不用的 *args ，目前未找到合适的处理办法，这是为了用装饰器时，可以方便传或不传任意数量
的参数。</p>
</li>
</ul>
<p>###三、类装饰器
和普通装饰器的区别就是这个是类，因此也有类相关的特性</p>
<pre><code>class ServiceName:
    def __init__(self, *aliases):       #这里初始化时传参的，因此类装饰器在初始化时传参
        self.aliases = set(aliases)

    def __call__(self, f):              #当 对象+ () 时触发，类装饰器意味着只要用了语法糖@就已经触发了
        f._aliases = self.aliases
        f.name = &quot;haha&quot;
        return f

    def show(self):
        print(self.name)

@ServiceName(&quot;传参&quot;)
def foo():
    print(&quot;被装饰的函数&quot;)
</code></pre>
<p>此时@ServiceName 等价：</p>
<pre><code>foo = ServiceName(&quot;参数&quot;)(foo)    # 此时就即执行了初始化操作，也完成了__call__方法的执行
                                  # 并把要装饰的函数传入其中，在call方法里添加一系列操作
</code></pre>
<p>####工作案例：
def service_handler(aliased_class):
original_methods = aliased_class.<strong>dict</strong>.copy()</p>
<pre><code>    for name, method in original_methods.items():
        if hasattr(method, '_aliases'):

            for alias in method._aliases - set(original_methods):
                setattr(aliased_class, alias, method)

    return aliased_class

@service_handler
def foo():
    print(&quot;foo&quot;)

此时会发现，它和之前的装饰器不怎么像啊。这不是装饰器，则是运用了语法糖@。凡是加上@的都等同于
foo = service_handler(foo)这种形式。
-- 不管你执没执行foo()，凡是加上这个语法糖的方法在解释器初始化时都会先执行一遍语法糖代表的方法或是类。

但为什么之前的装饰器好像没有这种效果呢？其实是有的，只是没写出来，若把之前的装饰器改为如下

def show_time(func):
    print(&quot;装饰器外部执行&quot;)
    def inner():
        func()
        print(&quot;装饰器内部执行&quot;)
    return inner

@show_time
def foo():
    print(&quot;foo&quot;)

此时，会发现刚初始化时就会执行装饰器内部的print，这就是为啥@语法糖等同于foo = show_time(foo)了
通常，装饰器的目的是为了不改变函数名的情况下添加新的功能，故通常不会在装饰器外部进行操作。

注：活用两个装饰语法糖@目的就是为了把每个服务在注册时就进行重命名，为了规范而牺牲部分可读性，理解这个感觉就是在
    弯路上越走越远。但是，我又想不出更好的方法来代替。
</code></pre>
<p>修正误解：
带有@符号的 不一定是装饰器，@只是装饰器简化书写而使用的一种语法糖
如： @wrapper
def foo(): pass 仅仅等同于 foo = wrapper(foo) 的形式 （为了简化书写）</p>
<p>作业 login:
不写就不能发现问题啊 见代码啊见代码！！！
发现如下问题---global 问题 注意为什么要写在 inner 的 if login_status is False 之上
是因为 被装饰函数实质上执行的是 inner 全局变量相当于就是在 inner 之外 在函数内部最好第一句就声明要修改的全局变量
才不会和之后的语句引起冲突 name 'login_status' is used prior to global declaration(在全局声明之前使用名称&quot;login_status&quot;)
或者什么都不加直接引用报错 local variable 'login_status' referenced before assignment(赋值之前引用局部变量&quot;login_status&quot;)</p>
</div></template>


