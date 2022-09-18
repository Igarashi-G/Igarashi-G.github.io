<template><div><h1 id="序列进阶" tabindex="-1"><a class="header-anchor" href="#序列进阶" aria-hidden="true">#</a> 序列进阶</h1>
<h2 id="_1-序列协议" tabindex="-1"><a class="header-anchor" href="#_1-序列协议" aria-hidden="true">#</a> 1. 序列协议</h2>
<p><strong>Python</strong> 中 <a href="https://docs.python.org/zh-cn/3/c-api/sequence.html" target="_blank" rel="noopener noreferrer">序列协议<ExternalLinkIcon/></a>：指任何类，只要实现 <code v-pre>__len__</code> 和 <code v-pre>__getitem__</code> 两个方法，就能当序列使</p>
<blockquote>
<p>在面向对象编程中，协议是非正式接口，只在文档中定义，代码中不定义</p>
</blockquote>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> collections
<span class="token keyword">from</span> random <span class="token keyword">import</span> choice

Card <span class="token operator">=</span> collections<span class="token punctuation">.</span>namedtuple<span class="token punctuation">(</span><span class="token string">"Card"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"rank"</span><span class="token punctuation">,</span> <span class="token string">"suit"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">FrenchDeck</span><span class="token punctuation">:</span>
    rank <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token string">"JQKA"</span><span class="token punctuation">)</span>

    suit <span class="token operator">=</span> <span class="token string">'spades diamonds clubs hearts'</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>card <span class="token operator">=</span> <span class="token punctuation">[</span>Card<span class="token punctuation">(</span>rank<span class="token operator">=</span>rank<span class="token punctuation">,</span> suit<span class="token operator">=</span>suit<span class="token punctuation">)</span> <span class="token keyword">for</span> suit <span class="token keyword">in</span> self<span class="token punctuation">.</span>suit <span class="token keyword">for</span> rank <span class="token keyword">in</span> self<span class="token punctuation">.</span>rank<span class="token punctuation">]</span>

    <span class="token keyword">def</span> <span class="token function">__len__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">len</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>card<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>card<span class="token punctuation">[</span>item<span class="token punctuation">]</span>


suit_values <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>spades<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span> hearts<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> diamonds<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> clubs<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">spades_high</span><span class="token punctuation">(</span>card<span class="token punctuation">)</span><span class="token punctuation">:</span>
    rank_value <span class="token operator">=</span> FrenchDeck<span class="token punctuation">.</span>rank<span class="token punctuation">.</span>index<span class="token punctuation">(</span>card<span class="token punctuation">.</span>rank<span class="token punctuation">)</span>
    <span class="token keyword">return</span> rank_value <span class="token operator">*</span> <span class="token builtin">len</span><span class="token punctuation">(</span>suit_values<span class="token punctuation">)</span> <span class="token operator">+</span> suit_values<span class="token punctuation">[</span>card<span class="token punctuation">.</span>suit<span class="token punctuation">]</span>


deck <span class="token operator">=</span> FrenchDeck<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>deck<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment"># 切片取最顶层三张</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>deck<span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token number">13</span><span class="token punctuation">]</span><span class="token punctuation">)</span>  <span class="token comment"># 抽出索引12的那张，每隔13张牌抽一张</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>choice<span class="token punctuation">(</span>deck<span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 随机抽一张</span>

<span class="token keyword">for</span> sorted_card <span class="token keyword">in</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>deck<span class="token punctuation">,</span> key<span class="token operator">=</span>spades_high<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>sorted_card<span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># [Card(rank='2', suit='spades'), Card(rank='3', suit='spades'), Card(rank='4', suit='spades')]</span>
<span class="token comment"># [Card(rank='A', suit='spades'), Card(rank='A', suit='diamonds'), Card(rank='A', suit='clubs'), Card(rank='A', suit='hearts')]</span>
<span class="token comment"># Card(rank='10', suit='spades')</span>

<span class="token comment"># Card(rank='2', suit='clubs')</span>
<span class="token comment"># ...</span>
<span class="token comment"># Card(rank='A', suit='spades')</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>如上，实现了 <code v-pre>__len__</code> 和 <code v-pre>__getitem__</code> 方法，该实例化对象可以像序列一样被操作</li>
<li><code v-pre>sorted(*args, **kwargs)</code> 把 <code v-pre>deck</code> 视为列表接收，自动迭代传入 <code v-pre>spades_high</code>，返回排序数值进行排序</li>
</ul>
<h2 id="_2-列表实现原理" tabindex="-1"><a class="header-anchor" href="#_2-列表实现原理" aria-hidden="true">#</a> 2. 列表实现原理</h2>
<h4 id="顺序表" tabindex="-1"><a class="header-anchor" href="#顺序表" aria-hidden="true">#</a> <strong>顺序表</strong></h4>
<p>元素有序的存放再一块连续存储区里，即 <strong>顺序表</strong>，包含 <strong>表头信息</strong>，<strong>存储区</strong>，声明时就会开辟一块固定大小的内存</p>
<img src="@source/python/advanced/img/顺序表.jpg">
<p>第 <code v-pre>i</code> 个元素的 <strong>物理地址</strong> 可通过：<code v-pre>Loc(e-i)</code> = 起始物理地址 <code v-pre>Loc(e-0)</code> + 逻辑地址 <code v-pre>i</code> * 存储单元大小（*开辟的固定大小内存*） <code v-pre>c</code> 获取</p>
<ul>
<li>
<p><strong>表头信息：</strong> 包含数组 <strong>容量</strong>，当前元素 <strong>个数</strong>，表示当前顺序表的整体情况</p>
</li>
<li>
<p><strong>存储区：</strong> 具体数据，我们知道内存的单位是 <strong>字节</strong>，一个 <code v-pre>Bytes</code> 占 <code v-pre>8bit</code></p>
</li>
</ul>
<h5 id="顺序表的实现方式" tabindex="-1"><a class="header-anchor" href="#顺序表的实现方式" aria-hidden="true">#</a> <strong>顺序表的实现方式</strong></h5>
<p>分为如下两种形式</p>
<img src="@source/python/advanced/img/顺序表两种实现方式.jpg">
<p><strong>64</strong> 位机器下，假设 <strong>Python</strong> 一个普通的 <strong>int</strong>型 占 <strong>28</strong> 位，<strong>7</strong> 个字节，那么会有如下列表</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>li <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">200</span><span class="token punctuation">(</span><span class="token number">0x23</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">390</span><span class="token punctuation">(</span><span class="token number">0x30</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">78</span><span class="token punctuation">(</span><span class="token number">0x37</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p><strong>一体式：</strong> 因为当数组元素增加时，一体式将包括头部，一同搬迁到新的物理空间，数组指向的 <strong>起始内存</strong>（<em>起始位置</em>）<strong>会改变</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 之前 &lt;起始位置> 指向 0x23</span>
li<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">200</span><span class="token punctuation">(</span><span class="token number">0x23</span><span class="token punctuation">)</span>	<span class="token operator">-</span><span class="token operator">-</span> <span class="token punctuation">[</span><span class="token number">200</span><span class="token punctuation">(</span><span class="token number">0x23</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">390</span><span class="token punctuation">(</span><span class="token number">0x30</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">78</span><span class="token punctuation">(</span><span class="token number">0x37</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>

<span class="token comment"># 增加后 &lt;起始位置> 指向 0x15</span>
li<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">0x15</span>	<span class="token operator">-</span><span class="token operator">-</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">(</span><span class="token number">0x15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">(</span><span class="token number">0x23</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">390</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>分离式：</strong> 只将内存空间 <strong>指向不同的位置</strong>，数组的起始位置未发生改变</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 之前 &lt;起始位置> 指向 0x23</span>
li<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">0x23</span>	<span class="token operator">-</span><span class="token operator">-</span> <span class="token punctuation">[</span><span class="token number">200</span><span class="token punctuation">(</span><span class="token number">0x23</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">390</span><span class="token punctuation">(</span><span class="token number">0x27</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>

<span class="token comment"># 增加后 &lt;起始位置> 依然指向  0x23</span>
li<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">-</span><span class="token operator">></span> <span class="token number">0x23</span>	<span class="token operator">-</span><span class="token operator">-</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">(</span><span class="token number">0x15</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">0x19</span><span class="token operator">-</span><span class="token operator">></span><span class="token number">0x23</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">390</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python</strong> 的 <strong>list</strong> 官方实现，采用的就是 <strong>分离式动态顺序表</strong>，故 <code v-pre>.append(ele)</code> 后 <code v-pre>id</code> 也不会发生改变</p>
</li>
</ul>
<p>python 的 list 采用的就是分离式存储，当 append 之后 id 不会发生改变（也是为什么用 list.append(x) （或 list.insert(len(list),x)即尾部插入）比在指定位置插入元素效率高的原因）</p>
<p>&lt;1&gt;默认创建空表 - 系统分配一块能容纳 8 个元素的存储区;</p>
<p>&lt;2&gt;执行插入操作(insert | append) - 如果元素存储区满就换一块 4 倍大的存储区;</p>
<p>&lt;3&gt;表已经很大(目前的阀值为 50000) - 则改变策略，采用加一倍的方法</p>
</div></template>


