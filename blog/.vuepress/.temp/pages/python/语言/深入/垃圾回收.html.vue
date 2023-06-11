<template><div><p><strong>Python</strong> 的垃圾回收机制、循环引用、<strong>gc</strong> 模块、弱引用等</p>
<!-- more -->
<h2 id="_1-垃圾回收机制" tabindex="-1"><a class="header-anchor" href="#_1-垃圾回收机制" aria-hidden="true">#</a> 1. 垃圾回收机制</h2>
<p><strong>Python</strong> 的垃圾回收机制以 <strong>引用计数为主，分代收集为辅</strong></p>
<p>若一个对象的引用计数为 <strong>0</strong>，<strong>Python</strong> 虚拟机就会回收该对象的内存，如下是一个手动销毁对象触发的垃圾回收过程</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ClassA</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"object born, id:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__del__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"object del, id:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    c1 <span class="token operator">=</span> ClassA<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">del</span> c1


f1<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">### 输出结果</span>
<span class="token builtin">object</span> born<span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x1ee7a5d5580</span>
<span class="token builtin">object</span> <span class="token keyword">del</span><span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x1ee7a5d5580</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当执行 <code v-pre>c1 = ClassA()</code> 时，就会创建一个对象，放在一块内存中，<code v-pre>c1</code> 变量指向这块内存，此时这块内存如 <code v-pre>0x1ee7a5d5580</code> 的引用就是 <strong>1</strong></p>
<p><code v-pre>del c1</code>后，<code v-pre>c1</code> 变量不再指向 <code v-pre>0x1ee7a5d5580</code> 内存，所以这块内存的引用计数 <strong>-1</strong> 等于 <strong>0</strong> ，所以就销毁了这个对象，然后释放内存</p>
<h3 id="_1-1-引用计数" tabindex="-1"><a class="header-anchor" href="#_1-1-引用计数" aria-hidden="true">#</a> 1.1 引用计数</h3>
<h5 id="引用计数-1-场景" tabindex="-1"><a class="header-anchor" href="#引用计数-1-场景" aria-hidden="true">#</a> <strong>引用计数+1 场景</strong></h5>
<ol>
<li>
<p>对象被创建，如： <code v-pre>a = 23</code></p>
</li>
<li>
<p>被引用，如： <code v-pre>b = a</code></p>
</li>
<li>
<p>对象被作为参数，传入到一个函数中，如： <code v-pre>func(a)</code></p>
</li>
<li>
<p>作为一个元素，存储在容器中，如 <code v-pre>list1 = [a, a]</code></p>
</li>
</ol>
<h5 id="引用计数-1-场景-1" tabindex="-1"><a class="header-anchor" href="#引用计数-1-场景-1" aria-hidden="true">#</a> <strong>引用计数-1 场景</strong></h5>
<ol>
<li>对象的别名被显式销毁，如 <code v-pre>del a</code></li>
<li>对象的别名被赋予新的对象，如 <code v-pre>a = 24</code></li>
<li>一个对象离开它的作用域，如: <code v-pre>func()</code> 执行完毕时，<code v-pre>func()</code> 中的局部变量 <strong>（<em>全局变量、子线程、协程等不同</em> ）</strong></li>
<li>对象所在的容器被销毁，或从容器中删除对象</li>
</ol>
<h5 id="查看对象引用计数" tabindex="-1"><a class="header-anchor" href="#查看对象引用计数" aria-hidden="true">#</a> <strong>查看对象引用计数</strong></h5>
<p><strong><code v-pre>sys.getrefcount(object) -&gt; int</code></strong></p>
<ul>
<li>参数：待查看的对象</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ClassA</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"object born, id:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__del__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"object del, id:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


c1 <span class="token operator">=</span> ClassA<span class="token punctuation">(</span><span class="token punctuation">)</span>
d <span class="token operator">=</span> c1
<span class="token keyword">print</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>getrefcount<span class="token punctuation">(</span>c1<span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment"># 3</span>
<span class="token keyword">del</span> c1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 <strong>c1 对象的引用计数为3</strong> ，比预期引用计数多 <strong>1</strong>，这是由于调用 <code v-pre>sys.getrefcount</code> 函数时又传入 <strong>c1</strong>， 因此引用 <strong>+1</strong></p>
<h3 id="_2-1-循环引用" tabindex="-1"><a class="header-anchor" href="#_2-1-循环引用" aria-hidden="true">#</a> 2.1 循环引用</h3>
<p>循环引用是很严重的问题，它会导致内存泄露</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ClassA</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"object born, id:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__del__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"object del, id:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">f2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    c1 <span class="token operator">=</span> ClassA<span class="token punctuation">(</span><span class="token punctuation">)</span>
    c2 <span class="token operator">=</span> ClassA<span class="token punctuation">(</span><span class="token punctuation">)</span>
    c1<span class="token punctuation">.</span>t <span class="token operator">=</span> c2
    c2<span class="token punctuation">.</span>t <span class="token operator">=</span> c1
    <span class="token keyword">del</span> c1
    <span class="token keyword">del</span> c2


f2<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"globals： </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">globals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token builtin">object</span> born<span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x2726f4155b0</span>
<span class="token builtin">object</span> born<span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x2726f415040</span>
<span class="token builtin">globals</span>： <span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token string">'sys'</span><span class="token punctuation">:</span> <span class="token operator">&lt;</span>module <span class="token string">'sys'</span> <span class="token punctuation">(</span>built<span class="token operator">-</span><span class="token keyword">in</span><span class="token punctuation">)</span><span class="token operator">></span><span class="token punctuation">,</span> <span class="token string">'ClassA'</span><span class="token punctuation">:</span> <span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token string">'__main__.ClassA'</span><span class="token operator">></span><span class="token punctuation">,</span> <span class="token string">'f2'</span><span class="token punctuation">:</span> <span class="token operator">&lt;</span>function f2 at <span class="token number">0x000002726F42B550</span><span class="token operator">></span><span class="token punctuation">}</span>
<span class="token builtin">object</span> <span class="token keyword">del</span><span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x2726f4155b0</span>
<span class="token builtin">object</span> <span class="token keyword">del</span><span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x2726f415040</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时发现，再调用完 <code v-pre>f2()</code> 后，也依然没有触发 <code v-pre>del c1</code> 和 <code v-pre>del c2</code> ，此时全局变量中依然可以发现对 <code v-pre>c1</code> 和 <code v-pre>c2</code> 的引用</p>
<p>这是由于 执行 <code v-pre>c1.t = c2</code> 和 <code v-pre>c2.t = c1</code> 后，这两块内存相互引用，引用计数变为了 <strong>2</strong></p>
<ul>
<li>在 <code v-pre>del c1</code>后，内存中 <strong>c1对象</strong> 的引用计数变为 <strong>1</strong>，由于不为 <strong>0</strong>，所以内存中 <strong>c1对象</strong> 不会被销毁</li>
<li>所以 <code v-pre>del c2</code> 同理</li>
<li>即使上述两对象都是可以被销毁的，但由于循环引用，导致垃圾回收器不会回收，故引发内存泄露</li>
</ul>
<h2 id="_2-垃圾回收-gc" tabindex="-1"><a class="header-anchor" href="#_2-垃圾回收-gc" aria-hidden="true">#</a> 2. 垃圾回收（gc）</h2>
<p><strong>Python</strong> 的垃圾回收有 **gc (<em>Garbage Collector interface</em> ) ** 模块，它提供一个接口给开发者设置垃圾回收的选项</p>
<p>上文采用引用计数的方法管理内存的一个缺陷是 <strong>循环引用</strong>，而 <strong>gc</strong> 模块其中一个主要功能，就是解决循环引用的问题</p>
<p><strong>Python</strong> 有三种情况会触发垃圾回收</p>
<ol>
<li>调用 <code v-pre>gc.collect()</code></li>
<li>当 <strong>gc</strong> 模块的计数器达到阀值的时候</li>
<li>程序退出时</li>
</ol>
<p><strong>示例：</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> gc


<span class="token keyword">class</span> <span class="token class-name">ClassA</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"object born, id:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__del__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"object del, id:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">f3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    c1 <span class="token operator">=</span> ClassA<span class="token punctuation">(</span><span class="token punctuation">)</span>
    c2 <span class="token operator">=</span> ClassA<span class="token punctuation">(</span><span class="token punctuation">)</span>
    c1<span class="token punctuation">.</span>t <span class="token operator">=</span> c2
    c2<span class="token punctuation">.</span>t <span class="token operator">=</span> c1
    <span class="token keyword">del</span> c1
    <span class="token keyword">del</span> c2
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"当前垃圾回收列表：</span><span class="token interpolation"><span class="token punctuation">{</span>gc<span class="token punctuation">.</span>garbage<span class="token punctuation">}</span></span><span class="token string">\n"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"显式执行垃圾回收, 回收引用: </span><span class="token interpolation"><span class="token punctuation">{</span>gc<span class="token punctuation">.</span>collect<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">\n"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"显式执行后的回收列表：</span><span class="token interpolation"><span class="token punctuation">{</span>gc<span class="token punctuation">.</span>garbage<span class="token punctuation">}</span></span><span class="token string">\n"</span></span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    gc<span class="token punctuation">.</span>set_debug<span class="token punctuation">(</span>gc<span class="token punctuation">.</span>DEBUG_LEAK<span class="token punctuation">)</span>  <span class="token comment"># 设置gc模块的日志</span>
    f3<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token builtin">object</span> born<span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x146dfe04fd0</span>
<span class="token builtin">object</span> born<span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x146dfe04fa0</span>
gc<span class="token punctuation">:</span> collectable <span class="token operator">&lt;</span>ClassA <span class="token number">0x00000146DFE04FD0</span><span class="token operator">></span>
gc<span class="token punctuation">:</span> collectable <span class="token operator">&lt;</span>ClassA <span class="token number">0x00000146DFE04FA0</span><span class="token operator">></span>
gc<span class="token punctuation">:</span> collectable <span class="token operator">&lt;</span><span class="token builtin">dict</span> <span class="token number">0x00000146DFAF4F40</span><span class="token operator">></span>
gc<span class="token punctuation">:</span> collectable <span class="token operator">&lt;</span><span class="token builtin">dict</span> <span class="token number">0x00000146DFDE1640</span><span class="token operator">></span>
当前垃圾回收列表：<span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token builtin">object</span> <span class="token keyword">del</span><span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x146dfe04fd0</span>
<span class="token builtin">object</span> <span class="token keyword">del</span><span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">:</span><span class="token number">0x146dfe04fa0</span>
显式执行垃圾回收<span class="token punctuation">,</span> 回收引用<span class="token punctuation">:</span> <span class="token number">4</span>

显式执行后的回收列表：<span class="token punctuation">[</span><span class="token operator">&lt;</span>__main__<span class="token punctuation">.</span>ClassA <span class="token builtin">object</span> at <span class="token number">0x00000146DFE04FD0</span><span class="token operator">></span><span class="token punctuation">,</span> <span class="token operator">&lt;</span>__main__<span class="token punctuation">.</span>ClassA <span class="token builtin">object</span> at <span class="token number">0x00000146DFE04FA0</span><span class="token operator">></span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string">'t'</span><span class="token punctuation">:</span> <span class="token operator">&lt;</span>__main__<span class="token punctuation">.</span>ClassA <span class="token builtin">object</span> at <span class="token number">0x00000146DFE04FA0</span><span class="token operator">></span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string">'t'</span><span class="token punctuation">:</span> <span class="token operator">&lt;</span>__main__<span class="token punctuation">.</span>ClassA <span class="token builtin">object</span> at <span class="token number">0x00000146DFE04FD0</span><span class="token operator">></span><span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>gc.garbage:</code> 垃圾回收后的对象会放在 <code v-pre>gc.garbage</code> 列表里面</li>
<li><code v-pre>gc.collect() :</code>会返回不可达（<em>未能回收</em>）的对象数目，此时为 <strong>4</strong> ，表示是<strong>c1 c2两个对象、及其循环引用的属性t</strong></li>
</ul>
<h4 id="其他api" tabindex="-1"><a class="header-anchor" href="#其他api" aria-hidden="true">#</a> 其他API</h4>
<p><strong><code v-pre>gc.set_debug(flags) </code></strong></p>
<p>设置 <strong>gc</strong> 的 <strong>debug</strong> 日志，一般设置为 <code v-pre>gc.DEBUG_LEAK</code></p>
<p><strong><code v-pre>gc.collect(*args, **kwargs) -&gt; int # real signature unknown</code></strong></p>
<ul>
<li>参数：如果没有参数，则运行完整收集，可选参数可以是指定要收集的代数的整数，默认传入 <strong>2</strong>
<ul>
<li><strong>0：</strong> 代表检查 <strong>第1代</strong> 对象</li>
<li><strong>1：</strong> 代表检查 <strong>第1、2代</strong> 对象</li>
<li>....</li>
<li><strong>无参：</strong> 执行一个 <strong>full collection</strong></li>
<li><strong>代数编号无效：</strong> 引发 <code v-pre>ValueError</code> 错误</li>
</ul>
</li>
<li>返回值：不可达对象的数量</li>
</ul>
<h3 id="_2-2-gc模块自动垃圾回收" tabindex="-1"><a class="header-anchor" href="#_2-2-gc模块自动垃圾回收" aria-hidden="true">#</a> 2.2 gc模块自动垃圾回收</h3>
<p>必须要 <code v-pre>import gc</code>模块，并且 <code v-pre>is_enable()=True</code> 才会启动自动垃圾回收</p>
<p>该作用就是发现并处理不可达的垃圾对象，<strong>垃圾回收 = 垃圾检查 + 垃圾回收</strong></p>
<p>在 <strong>Python</strong> 中，采用分代收集的方法，把对象分为三代</p>
<ol>
<li>对象在创建的时候，放在一代中</li>
<li>如果在一次一代的垃圾检查中，该对象存活下来，就会被放到二代中</li>
<li>在一次二代的垃圾检查中，该对象存活下来，就会被放到三代中</li>
</ol>
<p>因此 <strong>gc</strong> 模块里面会有一个长度为 <strong>3</strong> 的列表的计数器，可通过</p>
<p><strong><code v-pre>gc.get_count()</code></strong></p>
<p>获取当前自动执行垃圾回收的计数器，返回一个长度为 <strong>3</strong> 的元组</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>gc<span class="token punctuation">.</span>get_count<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># (35, 6, 1)</span>
c1 <span class="token operator">=</span> ClassA<span class="token punctuation">(</span><span class="token punctuation">)</span>
c2 <span class="token operator">=</span> ClassA<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>gc<span class="token punctuation">.</span>get_count<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># (37, 6, 1) 此时分配内存数目 +2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>(35, 6, 1)</code> 其中<strong>35</strong> 是指距离上一次一代垃圾检查，<strong>Python</strong> 分配内存的数目减去释放内存的数目，<strong>注意是内存分配，而不是引用计数的增加</strong> ，每位对应每一代的垃圾检查内存分配的次数</p>
<h4 id="自动垃圾回收阀值" tabindex="-1"><a class="header-anchor" href="#自动垃圾回收阀值" aria-hidden="true">#</a> 自动垃圾回收阀值</h4>
<p><strong><code v-pre>gc.get_threshold()</code></strong></p>
<p><strong>函数说明：</strong> 获取到的长度为 <strong>3</strong> 的元组，即 <strong>gc</strong> 模块获取到自动回收的频率，如： <code v-pre>(700,10,10)</code> 表示当前阀值</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>gc<span class="token punctuation">.</span>get_threshold<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment"># (700, 10, 10)</span>
gc<span class="token punctuation">.</span>set_threshold<span class="token punctuation">(</span><span class="token number">700</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>gc<span class="token punctuation">.</span>get_threshold<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment"># (700, 3, 0)</span>

<span class="token comment">### 输出结果</span>
<span class="token punctuation">(</span><span class="token number">700</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token number">700</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于 <code v-pre>(700, 10, 10)</code> 阈值和计数规则</p>
<ul>
<li>当计数器从 <code v-pre>(699,3,0)</code> 增加到 <code v-pre>(700,3,0)</code> 时，<strong>gc</strong> 模块就会执行<code v-pre>gc.collect(0)</code>， 即检查一代对象的垃圾，并重置计数器为 <code v-pre>(0,4,0)</code></li>
<li>当计数器从 <code v-pre>(699,9,0)</code> 增加到 <code v-pre>(700,9,0)</code>，<strong>gc</strong> 模块就会执行<code v-pre>gc.collect(1)</code> 即检查一、二代对象的垃圾，并重置计数器为 <code v-pre>(0,0,1)</code></li>
<li>当计数器从 <code v-pre>(699,9,9)</code> 增加到 <code v-pre>(700,9,9)</code>，<strong>gc</strong> 模块就会执行<code v-pre>gc.collect(2)</code> 即检查一、二、三代对象的垃圾，并重置计数器为 <code v-pre>(0,0,0)</code></li>
</ul>
<p><strong><code v-pre>set_threshold(threshold0, threshold1=None, threshold2=None)</code></strong></p>
<p>**函数说明：**设置垃圾回收的阈值。将 <strong>threshold0</strong> 设置为 <strong>0</strong> 将禁用垃圾回收</p>
<p><strong>参数：</strong></p>
<ul>
<li><strong>threshold: int</strong>  设置第一代垃圾回收的阈值，若设置为 <strong>0</strong>，则禁止第一代垃圾回收</li>
<li><strong>threshold1: int</strong>  设置第二代垃圾回收的阈值，若未指定则使用默认值</li>
<li><strong>threshold2: int</strong>  设置第三代垃圾回收的阈值，若未指定则使用默认值</li>
</ul>
<p>**返回值：**无</p>
<p><strong>解释：</strong> 这个函数用于设置 <strong>Python</strong> 中自动垃圾回收的阈值。<strong>Python</strong> 自带的垃圾回收器会在对象数量达到一定程度时自动启动，清除不再被引用的对象。通过设置阈值，我们可以控制垃圾回收的时机和频率。其中，第一代垃圾回收是最频繁的，第三代垃圾回收是最少的。将某一代的阈值设置为 <strong>0</strong> 就可以禁用该代的垃圾回收</p>
<blockquote>
<p><strong>注意：</strong> 如果循环引用中，两个对象都定义了<code v-pre>__del__()</code> 方法，<strong>gc</strong> 模块不会销毁这些不可达对象，因为 <strong>gc</strong> 模块不知道应该先调用哪个对象的 <code v-pre>__del__()</code> ，故安全起见，<strong>gc</strong> 会把对象放到 <code v-pre>gc.garbage</code> 中，但是不会销毁对象，因此出现上文所示的打印</p>
</blockquote>
<h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> <strong>总结：</strong></h4>
<ol>
<li>
<p>项目中避免循环引用</p>
</li>
<li>
<p>引入 <strong>gc</strong> 模块，启动 <strong>gc</strong> 模块的自动清理循环引用的对象机制</p>
</li>
<li>
<p>由于分代收集，所以把需要长期使用的变量集中管理，并尽快移到二代以后，减少 <strong>GC</strong> 检查时的消耗</p>
</li>
<li>
<p><strong>gc</strong> 模块唯一处理不了的是循环引用的类都有 <code v-pre>__del__()</code> ，故项目中要避免定义 <code v-pre>__del__()</code> 方法，如果一定要使用该方法，同时导致循环引用，需要代码显式调用 <code v-pre>gc.collect()</code> 将 <code v-pre>gc.garbage</code> 里面的对象的显式回收调</p>
</li>
<li>
<p>启动 <strong>gc</strong> 模块的自动清理功能会带来一些性能上的损失，因此在需要关注性能的场景下需要谨慎使用该功能</p>
</li>
</ol>
<h2 id="_2-弱引用" tabindex="-1"><a class="header-anchor" href="#_2-弱引用" aria-hidden="true">#</a> 2. 弱引用</h2>
<p><strong>场景：</strong> 经常会使用 <strong>cache dict</strong> 这类功能，需要将一些信息存入一个全局的缓存字典中，如下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>players <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">Player</span><span class="token punctuation">:</span>
    <span class="token comment"># 玩家类，若该玩家ID，不在缓存字典，则写入全局缓存</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> i <span class="token keyword">not</span> <span class="token keyword">in</span> players<span class="token punctuation">:</span>
                self<span class="token punctuation">.</span><span class="token builtin">id</span> <span class="token operator">=</span> i
                <span class="token keyword">break</span>
        players<span class="token punctuation">[</span>self<span class="token punctuation">.</span><span class="token builtin">id</span><span class="token punctuation">]</span> <span class="token operator">=</span> self


<span class="token keyword">def</span> <span class="token function">game</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">""" 游戏初始化两个玩家 """</span>
    player1 <span class="token operator">=</span> Player<span class="token punctuation">(</span><span class="token punctuation">)</span>
    player2 <span class="token operator">=</span> Player<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># p1 and p2 do something</span>


<span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    game<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>players<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># 20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时发现有 <strong>20</strong> 个缓存的玩家，尽管游戏结束，也一直存放于全局中未回收</p>
<p>当游戏源源不断进行，随着时间增长，缓存中的对象也会随之增长</p>
<h3 id="_2-1-weakref-弱引用" tabindex="-1"><a class="header-anchor" href="#_2-1-weakref-弱引用" aria-hidden="true">#</a> 2.1 weakref 弱引用</h3>
<p>如果 <strong>player 实例</strong> 已经没有任何游戏的部分引用它了，即object 身上其他的引用都没有了，就可以触发引用垃圾回收被 <strong>release</strong> 掉了</p>
<p><strong><code v-pre>weakref.WeakValueDictionary()</code></strong></p>
<p>通常对字典的值使用 <code v-pre>WeakValueDictionary()</code> ，和字典的使用一致，但 <strong>对每个字典的值是弱引用，当该值上的其他引用归零时，会将值和key一起扔掉</strong> ，若打印时，则需要将其转为 <strong>dict</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> weakref

players <span class="token operator">=</span> weakref<span class="token punctuation">.</span>WeakValueDictionary<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Player</span><span class="token punctuation">:</span>
    <span class="token comment"># 玩家类，若该玩家ID，不在缓存字典，则写入全局缓存</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> i <span class="token keyword">not</span> <span class="token keyword">in</span> players<span class="token punctuation">:</span>
                self<span class="token punctuation">.</span><span class="token builtin">id</span> <span class="token operator">=</span> i
                <span class="token keyword">break</span>
        players<span class="token punctuation">[</span>self<span class="token punctuation">.</span><span class="token builtin">id</span><span class="token punctuation">]</span> <span class="token operator">=</span> self


<span class="token keyword">def</span> <span class="token function">game</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">""" 游戏初始化两个玩家 """</span>
    player1 <span class="token operator">=</span> Player<span class="token punctuation">(</span><span class="token punctuation">)</span>
    player2 <span class="token operator">=</span> Player<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment"># p1 and p2 do something</span>


<span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    game<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>players<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>players<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">### 输出结果：</span>
<span class="token comment"># 0 {}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code v-pre>weakref.WeakKeyDictionary()</code></strong></p>
<p>对字典的键进行弱引用，但对于 <strong>int、str 等 object，无法进行弱引用</strong></p>
<p>有不少的 <strong>C level 的 builtin object</strong> 都是不支持弱引用的，对其（<em>如：一个整数</em> ）做弱引用也没有任何意义的</p>
<blockquote>
<p>基本上，在 <strong>Python level</strong> 定义的 <strong>object</strong> 都是支持弱引用的，每个 <strong>instance</strong> 实例的方法、集合、生成器等都是可以被弱引用的</p>
</blockquote>
<h3 id="_2-2-关于-slots" tabindex="-1"><a class="header-anchor" href="#_2-2-关于-slots" aria-hidden="true">#</a> 2.2 关于 <code v-pre>__slots__</code></h3>
<p>若 <strong>class</strong> 中定义了 <code v-pre> __slots__ = [&quot;id&quot;]</code> ，若还想让其支持弱引用，需要增加 <code v-pre>&quot;__weakref__&quot;</code> 这一项，它会保存弱引用相关的一些信息</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Player</span><span class="token punctuation">:</span>
    <span class="token keyword">class</span> <span class="token class-name">Player</span><span class="token punctuation">:</span>
    __slots__ <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"id"</span><span class="token punctuation">,</span> <span class="token string">"__weakref__"</span><span class="token punctuation">]</span>
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


