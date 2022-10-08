<template><div><p>迭代是数据处理的基石，<strong>内存放不下数据</strong> 时，需要找到一种 <strong>惰性获取数据项</strong> 的方式，即按需一次获取一个数据项，这就是 <strong>迭代器模式</strong>（<em>Iterator pattern</em>）</p>
<!-- more -->
<h1 id="迭代器" tabindex="-1"><a class="header-anchor" href="#迭代器" aria-hidden="true">#</a> 迭代器</h1>
<h2 id="_1-什么是迭代器" tabindex="-1"><a class="header-anchor" href="#_1-什么是迭代器" aria-hidden="true">#</a> 1. 什么是迭代器</h2>
<blockquote>
<p>通常，迭代器是从 <strong>集合</strong> 中取元素，表示集合是有限多个，只是通过迭代器来一个个取</p>
</blockquote>
<p>既然是取集合，那么所有集合都 <strong>可迭代</strong>，场景如下</p>
<ul>
<li>首先可迭代意味着可以 <strong>for</strong> 循环</li>
<li>构建和扩展集合类型</li>
<li>逐行遍历文本文件</li>
<li>列表、字典、集合推导</li>
<li>元组拆包</li>
<li>调用函数时，使用拆包实例</li>
</ul>
<h3 id="_1-1-可迭代对象-单词序列" tabindex="-1"><a class="header-anchor" href="#_1-1-可迭代对象-单词序列" aria-hidden="true">#</a> 1.1 可迭代对象：单词序列</h3>
<p><strong>实现 Sentence 类：</strong> 向该类的构造方法中，传入一个包含某些文本的字符串，然后可以实现逐个单词的迭代。</p>
<ul>
<li>首先，实现一个类，该类包含了<a href="">序列协议</a></li>
<li>它的实例化对象可迭代（能像序列一样，使用 <strong>for</strong> 循环 遍历出结果）</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> re
<span class="token keyword">import</span> reprlib

RE_WOED <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">"\w+"</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Sentence</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>text <span class="token operator">=</span> text
        self<span class="token punctuation">.</span>words <span class="token operator">=</span> RE_WOED<span class="token punctuation">.</span>findall<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>words<span class="token punctuation">[</span>index<span class="token punctuation">]</span>

    <span class="token keyword">def</span> <span class="token function">__repr__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string-interpolation"><span class="token string">f'Sentence</span><span class="token interpolation"><span class="token punctuation">{</span>reprlib<span class="token punctuation">.</span><span class="token builtin">repr</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">'</span></span>


s <span class="token operator">=</span> Sentence<span class="token punctuation">(</span><span class="token string">"hello word!"</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> word <span class="token keyword">in</span> s<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># hello</span>
<span class="token comment"># word</span>
<span class="token comment"># ['hello', 'word']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>默认情况下 <a href="">reprlib.repr()</a> 生成的字符串最多有 30 个字符，此处给 <code v-pre>__repr__</code> 使用</li>
</ul>
<p>首次使用 reprlib 在 109 页</p>
</div></template>


