<template><div><h1 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制" aria-hidden="true">#</a> 流程控制</h1>
<h2 id="_1-条件判断" tabindex="-1"><a class="header-anchor" href="#_1-条件判断" aria-hidden="true">#</a> 1. 条件判断</h2>
<h3 id="_1-1-if-语句" tabindex="-1"><a class="header-anchor" href="#_1-1-if-语句" aria-hidden="true">#</a> 1.1 if 语句</h3>
<p><code v-pre>if</code> / <code v-pre>if-else</code> / <code v-pre>if-elif-else</code> 用于对条件的判断，若找到真值，则执行子句体，书写格式如下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># pass 语句，表示不执行任何操作，通常用来占位</span>

<span class="token keyword">if</span> condition<span class="token punctuation">:</span>
	<span class="token keyword">pass</span>
<span class="token keyword">elif</span> condition_b<span class="token punctuation">:</span>
    <span class="token keyword">pass</span>
<span class="token keyword">else</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p><strong>Python</strong> 中 没有 <code v-pre>switch - case</code> 语句，通常用字典 <strong>dict</strong> 模拟，<strong>3.10</strong> 后出现 <a href="https://docs.python.org/zh-cn/3.10/reference/compound_stmts.html#the-match-statement" target="_blank" rel="noopener noreferrer">match<ExternalLinkIcon/></a> 语句，替代<code v-pre>switch</code></p>
</div>
<h3 id="_1-2-判断运算符" tabindex="-1"><a class="header-anchor" href="#_1-2-判断运算符" aria-hidden="true">#</a> 1.2 判断运算符</h3>
<p>常用的语义化运算符</p>
<ul>
<li><strong>身份运算符:</strong> <code v-pre>is</code> / <code v-pre>is not</code> ，表示 <strong>是 、不是</strong></li>
<li><strong>成员运算符:</strong> <code v-pre>in</code> / <code v-pre>not in</code> ，表示 <strong>包含 、包含取反</strong></li>
</ul>
<h4 id="is-和-的区别" tabindex="-1"><a class="header-anchor" href="#is-和-的区别" aria-hidden="true">#</a> is 和 == 的区别</h4>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>a<span class="token punctuation">,</span>b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span>

a <span class="token keyword">is</span> <span class="token keyword">not</span> <span class="token boolean">True</span>
<span class="token comment">## True</span>

a <span class="token operator">==</span> <span class="token boolean">True</span>
<span class="token comment">## True</span>

<span class="token builtin">id</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token builtin">id</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token keyword">and</span> a <span class="token keyword">is</span> b
<span class="token comment">## True</span>

c<span class="token punctuation">,</span>d <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>

<span class="token builtin">id</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token builtin">id</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token keyword">or</span> c <span class="token keyword">is</span> d
<span class="token comment">## False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>is</code> 也称为<strong>同一性运算符</strong>，它比较的是 <strong>对象唯一身份标识</strong>，即 <code v-pre>id</code>（<em>在内存中的地址</em>）</p>
</li>
<li>
<p><code v-pre>==</code> 仅 比较 <strong>值是否相同</strong></p>
</li>
</ul>
<h5 id="python-的特殊赋值" tabindex="-1"><a class="header-anchor" href="#python-的特殊赋值" aria-hidden="true">#</a> <strong>Python 的特殊赋值</strong></h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>a<span class="token punctuation">,</span>b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"a = </span><span class="token interpolation"><span class="token punctuation">{</span>a<span class="token punctuation">}</span></span><span class="token string">, b = </span><span class="token interpolation"><span class="token punctuation">{</span>b<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token comment"># a = 1, b = 3</span>

a<span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span>
<span class="token comment"># too many values to unpack (expected 2)</span>

a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> _ <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解构赋值</strong>，通常需要对位，即可解构解析，否则可能报错</p>
<hr>
<h2 id="_2-循环" tabindex="-1"><a class="header-anchor" href="#_2-循环" aria-hidden="true">#</a> 2. 循环</h2>
<h3 id="_2-1-for-语句" tabindex="-1"><a class="header-anchor" href="#_2-1-for-语句" aria-hidden="true">#</a> 2.1 for 语句</h3>
<p>循环，对 <strong>序列</strong> 或 <strong>可迭代对象</strong> 中的元素进行迭代，书写格式如下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
	<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"over"</span><span class="token punctuation">)</span>

<span class="token comment">##</span>
<span class="token comment"># 1</span>
<span class="token comment"># 2</span>
<span class="token comment"># 3</span>
<span class="token comment"># 4</span>
<span class="token comment"># 5</span>
<span class="token comment"># over</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>每次从 <code v-pre>range</code> 序列对象中，取元素，赋值给变量 <code v-pre>i</code></li>
<li>可以指定 <code v-pre>else</code> ，作为迭代结束 （<a href="https://docs.python.org/zh-cn/3.10/library/exceptions.html#StopIteration" target="_blank" rel="noopener noreferrer"><code v-pre>StopIteration</code><ExternalLinkIcon/></a>）后的执行的子句，并结束循环</li>
</ul>
<h4 id="enumerate" tabindex="-1"><a class="header-anchor" href="#enumerate" aria-hidden="true">#</a> enumerate</h4>
<p><code v-pre>for</code> 循环十分强大，不仅可遍历，甚至能用 <strong>多个参数接收</strong> 迭代对象返回的 <strong>多个值</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>li <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"dawei"</span><span class="token punctuation">,</span> <span class="token string">"ker"</span><span class="token punctuation">,</span> <span class="token string">"marry"</span><span class="token punctuation">,</span> <span class="token string">"lilisi"</span><span class="token punctuation">]</span>

<span class="token keyword">for</span> index<span class="token punctuation">,</span> name <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>li<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"name is </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">\t - index is </span><span class="token interpolation"><span class="token punctuation">{</span>index<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">4</span><span class="token punctuation">:</span>
        <span class="token keyword">continue</span>
    <span class="token keyword">elif</span> <span class="token string">"lili"</span> <span class="token keyword">in</span> name<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"强制终止"</span><span class="token punctuation">)</span>
        <span class="token keyword">break</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"next loop"</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"正常结束"</span><span class="token punctuation">)</span>

<span class="token comment">##</span>
<span class="token comment"># name is dawei    - index is 1</span>
<span class="token comment"># name is ker      - index is 2</span>
<span class="token comment"># name is marry    - index is 3</span>
<span class="token comment"># name is lilisi   - index is 4</span>
<span class="token comment"># 强制终止</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>enumerate</code> 可以返回可迭代对象的 <strong>索引</strong> 和 <strong>元素</strong> ，<code v-pre>for</code> 循环可以指定多个参数接收</p>
</li>
<li>
<p><code v-pre>continue</code> 若满足条件，则 <strong>跳过后续逻辑 继续下次循环</strong></p>
</li>
<li>
<p><code v-pre>break</code> 若满足条件，则 <strong>强制终止 并 跳出循环</strong></p>
</li>
</ul>
<h3 id="_2-2-while-语句" tabindex="-1"><a class="header-anchor" href="#_2-2-while-语句" aria-hidden="true">#</a> 2.2 while 语句</h3>
<p>重复地检验表达式，来触发循环，通常在 <strong>病毒</strong>、某种 <strong>监控</strong>、<strong>定时任务</strong>、<strong>异步回调</strong> 等机制使用，书写格式如下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>	<span class="token comment"># condition</span>
    <span class="token keyword">if</span> condition<span class="token punctuation">:</span>
        <span class="token keyword">continue</span>
	<span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">break</span>
	<span class="token keyword">pass</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h5 id="linux-下执行解释器" tabindex="-1"><a class="header-anchor" href="#linux-下执行解释器" aria-hidden="true">#</a> <strong>Linux 下执行解释器</strong></h5>
<p>额外，在 <strong>Linux</strong> 系统中，若出现编写脚本，不能运行的情况，多半未在环境变量中指定 <strong>Python</strong> 解释器，因此开头键入如下，即可帮内核找到解释器（<em>导入模块时会自动忽略</em>）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/env python3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


