<template><div><h1 id="装饰器" tabindex="-1"><a class="header-anchor" href="#装饰器" aria-hidden="true">#</a> 装饰器</h1>
<h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> 1. 概述</h2>
<p><strong>装饰器（<em>Decorators</em>）</strong> 用于源码 ’标记‘ 函数，以某种方式增强函数的行为，必须先掌握 <strong>以下三个条件</strong></p>
<ul>
<li>作用域</li>
<li>高阶函数</li>
<li><strong>闭包</strong> 的方方面面</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">高阶函数</p>
<p>接受函数为参数，或者把函数作为结果返回的函数</p>
</div>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>严格来说装饰器是 <span style="color: orange; font-weight: 800">语法糖</span>，可以像常规调函数传参形式调用，但尤其是 <strong>元编程</strong> 时，使用 <mark>@装饰器</mark> 的形式更方便</p>
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
<p>说闭包前先看一个 <RouterLink to="/python/%E8%AF%AD%E8%A8%80/%E8%BF%9B%E9%98%B6/%E5%87%BD%E6%95%B0.html#_4-%E5%87%BD%E6%95%B0%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F">作用域</RouterLink> 的栗子</p>
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
<div class="custom-container note">
<p class="custom-container-title">注</p>
<p>这比 <strong>JavaScript</strong> 优秀，因为 <strong>JavaScript</strong> 内部未定义变量 <code v-pre>b</code> 就会自动全局 <code v-pre>var b</code> ，所以常会莫名其妙的拿到个全局作用域的变量，就很离谱</p>
</div>
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
<img src="@source/python/语言/进阶/img/闭包.png">
</li>
<li>
<p>在函数内部，<strong>对外部作用域</strong>（<em>但不是全局作用域</em>）的变量，进行 **引用 ** 的，就是闭包</p>
</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
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
</div>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p>大量使用闭包是很有风险的操作，尤其定义的还是 <strong>可变类型的局部变量</strong>，这常导致 <strong>内存泄露！</strong></p>
</div>
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
<p>故可以配合 <RouterLink to="/python/%E8%AF%AD%E8%A8%80/%E8%BF%9B%E9%98%B6/%E5%87%BD%E6%95%B0.html#_4-3-%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">nonlocal</RouterLink> 来改写，使其不用列表形式，保存所有的历史值</p>
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
<p><span style="color: orange"><strong>装饰器:</strong></span> 区别于《设计模式》中的装饰器模式，但其描述的：“动态的给一个对象添加一些额外的职责” 的理念是一致的，但在实现层面，与装饰器模式，毫无关系。它符合 <strong>开放封闭</strong> 及 <strong>AOP</strong></p>
<ul>
<li>
<p><strong>开放封闭原则：</strong> 不修改内部函数的情况下，增加新功能，类似补丁一样</p>
</li>
<li>
<p><strong>AOP（<em>面向切面式编程</em>）：</strong> 即横向插入一段逻辑，可以减少大量重复代码</p>
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
<p>装饰器的典型行为就是 <strong>把被装饰的函数替换成新函数</strong>，且二者接收到了相同的参数，再做些额外操作，并返回 <mark>加工|未加工</mark> 的值</p>
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
<li><code v-pre>@functools.wraps(func)</code> 详见 <RouterLink to="/python/%E5%BA%93/%E6%A0%87%E5%87%86%E5%BA%93%E8%BF%9B%E9%98%B6/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B.html#_1-functools">标准库</RouterLink>，用来还原被装饰器覆盖的 <code v-pre>__name__</code> 和 <code v-pre>__doc__</code> 等属性</li>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>装饰 <code v-pre>fx()</code> 的 <strong>句法</strong> 等同于： <code v-pre>f1 = register(active=False)(f)</code></p>
</div>
<p>参数化且万能参数的装饰工厂</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> functools

DEFAULT_FMT <span class="token operator">=</span> <span class="token string">"[{elapsed:.8f}s] {name} ({_args}) -> {result}"</span>


<span class="token keyword">def</span> <span class="token function">clock</span><span class="token punctuation">(</span>fmt<span class="token operator">=</span>DEFAULT_FMT<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">decorate</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token decorator annotation punctuation">@functools<span class="token punctuation">.</span>wraps</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
        <span class="token keyword">def</span> <span class="token function">clocked</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
            start_time <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
            name <span class="token operator">=</span> func<span class="token punctuation">.</span>__name__
            _args <span class="token operator">=</span> <span class="token string">","</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> args<span class="token punctuation">)</span>
            _kwargs <span class="token operator">=</span> <span class="token string">","</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f" </span><span class="token interpolation"><span class="token punctuation">{</span>k<span class="token punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token punctuation">{</span>v<span class="token punctuation">}</span></span><span class="token string">"</span></span> <span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> kwargs<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            result <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
            elapsed <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start_time
            <span class="token keyword">print</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token operator">**</span><span class="token builtin">locals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> result

        <span class="token keyword">return</span> clocked

    <span class="token keyword">return</span> decorate


CUSTOM_FMT <span class="token operator">=</span> <span class="token string">"[{elapsed:.3f}s] {name}({_args},{_kwargs}): -> {result}"</span>


<span class="token decorator annotation punctuation">@clock</span><span class="token punctuation">(</span>CUSTOM_FMT<span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">snooze</span><span class="token punctuation">(</span>seconds<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>seconds<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f"sleep: </span><span class="token interpolation"><span class="token punctuation">{</span>seconds<span class="token punctuation">}</span></span><span class="token string">s </span><span class="token interpolation"><span class="token punctuation">{</span>a <span class="token operator">+</span> b<span class="token punctuation">}</span></span><span class="token string">"</span></span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    ret <span class="token operator">=</span> snooze<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> a<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>ret<span class="token punctuation">,</span> snooze<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        snooze<span class="token punctuation">(</span><span class="token number">.123</span><span class="token punctuation">,</span> a<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">=</span>i<span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>装饰工厂句法：<code v-pre>snooze(1, a=1, b=2) = clock(fmt=DEFAULT_FMT)(snooze)(*args, **kwargs)</code></p>
<p>装饰器最好通过实现 <strong>__call__</strong> 方法的类实现，使用函数的语言特性更容易理解</p>
<p><a href="https://github.com/GrahamDumpleton/wrapt/blob/develop/blog/01-how-you-implemented-your-python-decorator-is-wrong.md" target="_blank" rel="noopener noreferrer">参考<ExternalLinkIcon/></a></p>
</div>
<h2 id="_3-类装饰器" tabindex="-1"><a class="header-anchor" href="#_3-类装饰器" aria-hidden="true">#</a> 3. 类装饰器</h2>
<p>根据 <strong>类的特性</strong> 封装的装饰器</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time


<span class="token keyword">class</span> <span class="token class-name">Clock</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>fmt <span class="token operator">=</span> kwargs<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"fmt"</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> func<span class="token punctuation">)</span><span class="token punctuation">:</span>

        <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
            start_time <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
            name <span class="token operator">=</span> func<span class="token punctuation">.</span>__name__
            _args <span class="token operator">=</span> <span class="token string">","</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> args<span class="token punctuation">)</span>
            _kwargs <span class="token operator">=</span> <span class="token string">","</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f" </span><span class="token interpolation"><span class="token punctuation">{</span>k<span class="token punctuation">}</span></span><span class="token string">=</span><span class="token interpolation"><span class="token punctuation">{</span>v<span class="token punctuation">}</span></span><span class="token string">"</span></span> <span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> kwargs<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            result <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
            elapsed <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start_time
            <span class="token keyword">if</span> self<span class="token punctuation">.</span>fmt<span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>fmt<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token operator">**</span><span class="token builtin">locals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> result

        <span class="token keyword">return</span> inner


CUSTOM_FMT <span class="token operator">=</span> <span class="token string">"[{elapsed:.3f}s] {name}({_args},{_kwargs}): -> {result}"</span>


<span class="token decorator annotation punctuation">@Clock</span><span class="token punctuation">(</span>fmt<span class="token operator">=</span>CUSTOM_FMT<span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b


foo<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> b<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当类实例化为 <code v-pre>Clock</code> 对象时，即 <code v-pre>Clock()</code> 会触发类的 <strong>__init__()</strong>  和 <strong>__call__()</strong>  此时意味着装饰器已调用，句法为 <code v-pre>foo(1, b=2) = Clock(fmt)(foo)(1, b=2)</code></p>
<ul>
<li>其中 <strong>__init__()</strong>  ，会实例化装饰器的参数</li>
<li><strong>__call__()</strong> ，会调用被装饰的 <code v-pre>foo()</code></li>
</ul>
<h2 id="_4-异步装饰器" tabindex="-1"><a class="header-anchor" href="#_4-异步装饰器" aria-hidden="true">#</a> 4. 异步装饰器</h2>
<p>一个 <strong>xmlrpc</strong> 的例子，如何通过装饰器，实现将同步的客户端请求改为异步，避免阻塞</p>
<p><strong>server端：</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> datetime
<span class="token keyword">import</span> sys
<span class="token keyword">from</span> xmlrpc<span class="token punctuation">.</span>server <span class="token keyword">import</span> SimpleXMLRPCServer


<span class="token keyword">class</span> <span class="token class-name">ExampleService</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">getData</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">'42'</span>

    <span class="token keyword">class</span> <span class="token class-name">currentTime</span><span class="token punctuation">:</span>
        <span class="token decorator annotation punctuation">@staticmethod</span>
        <span class="token keyword">def</span> <span class="token function">getCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>

    <span class="token keyword">with</span> SimpleXMLRPCServer<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"localhost"</span><span class="token punctuation">,</span> <span class="token number">9000</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">as</span> server<span class="token punctuation">:</span>
        server<span class="token punctuation">.</span>register_instance<span class="token punctuation">(</span>ExampleService<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> allow_dotted_names<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        server<span class="token punctuation">.</span>register_multicall_functions<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Serving XML-RPC on localhost port 8000'</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'It is advisable to run this example server within a secure, closed network.'</span><span class="token punctuation">)</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            server<span class="token punctuation">.</span>serve_forever<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> KeyboardInterrupt<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"\nKeyboard interrupt received, exiting."</span><span class="token punctuation">)</span>
            sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>client端：</strong> 通过装饰器改为异步</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> functools <span class="token keyword">import</span> wraps
<span class="token keyword">from</span> xmlrpc <span class="token keyword">import</span> client


<span class="token keyword">def</span> <span class="token function">async_executor</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token decorator annotation punctuation">@wraps</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
    <span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        loop <span class="token operator">=</span> asyncio<span class="token punctuation">.</span>get_event_loop<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token keyword">await</span> loop<span class="token punctuation">.</span>run_in_executor<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">,</span> func<span class="token punctuation">,</span> self<span class="token punctuation">)</span>

    <span class="token keyword">return</span> inner


<span class="token keyword">class</span> <span class="token class-name">RpcProxy</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> host<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">"localhost"</span><span class="token punctuation">,</span> port<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">9000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>proxy <span class="token operator">=</span> client<span class="token punctuation">.</span>ServerProxy<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"http://</span><span class="token interpolation"><span class="token punctuation">{</span>host<span class="token punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">{</span>port<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>  <span class="token comment"># noqa</span>


<span class="token keyword">class</span> <span class="token class-name">ClientRpc</span><span class="token punctuation">(</span>RpcProxy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> host<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">"localhost"</span><span class="token punctuation">,</span> port<span class="token punctuation">:</span> <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">9000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span>ClientRpc<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@async_executor</span>
    <span class="token keyword">def</span> <span class="token function">get_server_time</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># 若此处加上async 上文method</span>
        <span class="token triple-quoted-string string">""" 同步改异步 """</span>
        result <span class="token operator">=</span> self<span class="token punctuation">.</span>proxy<span class="token punctuation">.</span>currentTime<span class="token punctuation">.</span>getCurrentTime<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"server time: </span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> result


<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># ClientRpc().get_server_time()</span>
        asyncio<span class="token punctuation">.</span>create_task<span class="token punctuation">(</span>ClientRpc<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>get_server_time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"running main()"</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">如上，通过装饰器，将同步函数包装，改写为异步形式</p>
</div>
</div></template>


