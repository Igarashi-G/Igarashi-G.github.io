<template><div><h1 id="变量机制" tabindex="-1"><a class="header-anchor" href="#变量机制" aria-hidden="true">#</a> 变量机制</h1>
<h2 id="_1-深浅拷贝" tabindex="-1"><a class="header-anchor" href="#_1-深浅拷贝" aria-hidden="true">#</a> 1. 深浅拷贝</h2>
<h3 id="_1-1-变量实现原理" tabindex="-1"><a class="header-anchor" href="#_1-1-变量实现原理" aria-hidden="true">#</a> 1.1 变量实现原理</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>a <span class="token operator">=</span> <span class="token number">1</span>
b <span class="token operator">=</span> a
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"b: </span><span class="token interpolation"><span class="token punctuation">{</span>b<span class="token punctuation">}</span></span><span class="token string"> - id: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"a: </span><span class="token interpolation"><span class="token punctuation">{</span>a<span class="token punctuation">}</span></span><span class="token string"> - id: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

b <span class="token operator">=</span> <span class="token number">2</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"b: </span><span class="token interpolation"><span class="token punctuation">{</span>b<span class="token punctuation">}</span></span><span class="token string"> - id: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># b: 1 - id: 1938697316656</span>
<span class="token comment"># a: 1 - id: 1938697316656</span>
<span class="token comment"># b: 2 - id: 1938697316688</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>暂将 <strong>Python</strong> 中的变量理解为标签，首先，<code v-pre>a = 1</code> 就是将不可变的整型 <strong>1</strong> ，赋值给了 <code v-pre>a</code> ，即：标签名为 <code v-pre>a</code> 的变量，给内存中的整型对象 <strong>1</strong> 贴上了标签
<ul>
<li>变量 <code v-pre>a</code> 存放了 <strong>1</strong> 的地址 （<em>1938697316656</em>）</li>
<li><code v-pre>print(a)</code> 时， <code v-pre>a</code> 中存放的地址指针，就会指向了（<em>1938697316656</em>）这块内存地址，并取出 <strong>1</strong> 这个值</li>
</ul>
</li>
<li>当然 <code v-pre>b</code> 也如此，<code v-pre>b = a</code> 就是又在整型对象 <strong>1</strong> 上，再贴个 <code v-pre>b</code> 的标签
<ul>
<li>此时变量 <code v-pre>b</code> 同 <code v-pre>a</code>，一样存放（<em>1938697316656</em>）</li>
</ul>
</li>
<li>然后 <code v-pre>b = 2</code> 则是将对象 <strong>1</strong> 的 <code v-pre>b</code> 标签取了下来，转贴给了整型 <strong>2</strong>
<ul>
<li>变量 <code v-pre>b</code> 存放了 <strong>2</strong> 的地址 （<em>1938697316688</em>）</li>
</ul>
</li>
</ul>
<blockquote>
<p><strong>注意：</strong></p>
<p>理解赋值，容易走入以下误区</p>
<ul>
<li><strong>误解 1</strong>，<code v-pre>a</code> 、<code v-pre>b</code> 都有有自己的地址</li>
<li><strong>误解 2</strong>，<code v-pre>b = a</code> 是在 <code v-pre>b</code> 中存放了 <code v-pre>a</code> 的地址（误以为 <code v-pre>a</code> 有地址），然后是通过 <code v-pre>b</code> 指向<code v-pre>-&gt;</code> <code v-pre>a</code> 指向<code v-pre>-&gt;</code> <strong>1</strong> 得来 <strong>1</strong> 的值</li>
</ul>
<p><strong>Python</strong> 的变量，其实是一种 <strong>堆内存的引用</strong>，更详细的需了解内存机制，因此</p>
<ol>
<li>赋值的过程，就是 <strong>改变标签指向</strong> 的过程</li>
<li>参数传递的过程，就是 <strong>交换标签指向</strong> 的过程</li>
</ol>
</blockquote>
<h3 id="_1-2-浅拷贝" tabindex="-1"><a class="header-anchor" href="#_1-2-浅拷贝" aria-hidden="true">#</a> 1.2 浅拷贝</h3>
<p>创建一个如下列表</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"所有地址: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token comment">## 所有地址: 1938767455680, 1938766586816, 1938697316720, 1938697316752, 1938697316656, 1938697316688</span>
<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"查看地址： </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> - </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> and </span><span class="token interpolation"><span class="token punctuation">{</span>a<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token keyword">is</span> <span class="token number">3</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token comment">## 查看地址： 1938697316720 - 1938697316720 and True</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>变量为 <code v-pre>a</code> 的列表，共开辟了 <strong>6</strong> 个内存地址空间，打上了 <code v-pre>a</code> 标签，此时
<ul>
<li><code v-pre>a</code> 中存放了 <code v-pre>[[1, 2], 3, 4]</code> 即 （<em>1938767455680</em>）</li>
<li><code v-pre>[[1, 2], 3, 4]</code> 中又囊括了 <code v-pre>[1, 2]</code> 、<code v-pre>3</code> 、<code v-pre>4</code> （<em>1938766586816, 1938697316720, 1938697316752</em>）三块地址</li>
<li><code v-pre>[1, 2]</code> 又囊括了 （<em>1938697316656, 1938697316688</em>）两块地址</li>
</ul>
</li>
</ul>
<p>此时对 <code v-pre>a</code>，进行浅拷贝</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>b <span class="token operator">=</span> a<span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"b: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">, b is a: </span><span class="token interpolation"><span class="token punctuation">{</span>b <span class="token keyword">is</span> a<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token comment">## b: 1938766113856, b is a: False</span>
<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>
c <span class="token operator">=</span> a

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"c: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">, c is a: </span><span class="token interpolation"><span class="token punctuation">{</span>c <span class="token keyword">is</span> a<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token comment">## c: 1938767455680, c is a: True</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>此时发现，直接赋值的 <code v-pre>c</code> 是和 <code v-pre>a</code> 一模一样的存放了同一块地址，而变量 <code v-pre>b</code> ，经过 <code v-pre>.copy()</code> 而地址不同</li>
<li>那么此时变量 <code v-pre>b</code> <strong>是独立的吗？</strong></li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>b<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">5</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token comment">## [[1, 2], 3, 4]</span>

c<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">6</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token comment">## [[1, 2], 3, 6]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>此时发现，<code v-pre>b</code> 改变了列表中的不可变对象 <strong>3</strong> （<em>位置为<strong>1</strong>的元素</em>）貌似没有影响到 <code v-pre>a</code></li>
<li>同时，未经过 <code v-pre>.copy()</code> 操作，而直接赋值的 <code v-pre>c</code> 任意改动，都会影响 <code v-pre>a</code> 中存放的值</li>
<li>那么变量 <code v-pre>b</code> <strong>真的是独立的吗？</strong></li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>b<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">7</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token comment">## [[1, 7], 3, 6]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>b</code> 改变了列表中的可变对象 <strong>[1, 2]</strong> 里的元素，此时一下子影响到了 <code v-pre>a</code></li>
<li>一旦发生 <code v-pre>b[0][1] = 7</code> 这样的操作，实质上改变的是 <code v-pre>a[0]</code> 里面的列表存放的地址 <code v-pre>[1938697316656, 1938697316688]</code> 为 <code v-pre>[1938697316656, 1938697316848]</code> ，此时 <code v-pre>a[0]</code> 的地址，仍是未发生任何变化的</li>
</ul>
<p>故如上拷贝操作，即是 <strong>浅拷贝</strong>，它只浅层拷贝各元素的单层地址 （<em>第一层的地址指针</em>）一旦存在可变对象，且变化，源也随之变化</p>
<blockquote>
<p><strong>注意：</strong></p>
<p>对于列表来说，<code v-pre>.copy()</code> 操作等同于 <code v-pre>[:]</code> 这种切片操作，即 <code v-pre>b = a.copy()</code> <code v-pre>is</code> <code v-pre>b = a[:]</code></p>
</blockquote>
<h4 id="_1-3-深拷贝" tabindex="-1"><a class="header-anchor" href="#_1-3-深拷贝" aria-hidden="true">#</a> 1.3 深拷贝</h4>
<p>通常情况，使用 <strong>浅拷贝</strong> 足矣，<strong>深拷贝</strong> 会实打实地拷贝了一份新的数据，会<strong>完完全全地</strong> 开辟新的内存空间，这就<strong>十分消耗内存</strong> 了</p>
<h5 id="使用-文档" tabindex="-1"><a class="header-anchor" href="#使用-文档" aria-hidden="true">#</a> <strong>使用</strong> <a href="https://docs.python.org/zh-cn/3.10/library/copy.html?highlight=deepcopy#module-copy" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> copy <span class="token keyword">import</span> deepcopy

a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>

b <span class="token operator">=</span> deepcopy<span class="token punctuation">(</span>a<span class="token punctuation">)</span>
b<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">5</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"a: </span><span class="token interpolation"><span class="token punctuation">{</span>a<span class="token punctuation">}</span></span><span class="token string"> - b: </span><span class="token interpolation"><span class="token punctuation">{</span>b<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># a: [[1, 2], 3, 4] - b: [[1, 5], 3, 4]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>深拷贝</strong> <code v-pre>deepcopy()</code> 会拷贝出一份，<strong>涉及到动态数据类型就地址完全不同的</strong> 对象赋值给变量 <code v-pre>b</code></li>
<li>此时变量 <code v-pre>b</code> 与变量 <code v-pre>a</code> 毫不相干</li>
</ul>
</div></template>


