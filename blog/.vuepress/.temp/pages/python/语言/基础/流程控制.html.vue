<template><div><p>if - else 等流程控制</p>
<!-- more -->
<h1 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制"><span>流程控制</span></a></h1>
<h2 id="_1-条件判断" tabindex="-1"><a class="header-anchor" href="#_1-条件判断"><span>1. 条件判断</span></a></h2>
<h3 id="_1-1-if-语句" tabindex="-1"><a class="header-anchor" href="#_1-1-if-语句"><span>1.1 if 语句</span></a></h3>
<p><code v-pre>if</code> / <code v-pre>if-else</code> / <code v-pre>if-elif-else</code> 用于对条件的判断，若找到真值，则执行子句体，书写格式如下</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># pass 语句，表示不执行任何操作，通常用来占位</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> condition:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">	pass</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">elif</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> condition_b:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p><strong>Python</strong> 中 没有 <code v-pre>switch - case</code> 语句，通常用字典 <strong>dict</strong> 模拟，<strong>3.10</strong> 后出现 <a href="https://docs.python.org/zh-cn/3.10/reference/compound_stmts.html#the-match-statement" target="_blank" rel="noopener noreferrer">match</a> 语句，替代<code v-pre>switch</code></p>
</div>
<h3 id="_1-2-判断运算符" tabindex="-1"><a class="header-anchor" href="#_1-2-判断运算符"><span>1.2 判断运算符</span></a></h3>
<p>常用的语义化运算符</p>
<ul>
<li><strong>身份运算符:</strong> <code v-pre>is</code> / <code v-pre>is not</code> ，表示 <strong>是 、不是</strong></li>
<li><strong>成员运算符:</strong> <code v-pre>in</code> / <code v-pre>not in</code> ，表示 <strong>包含 、包含取反</strong></li>
</ul>
<h4 id="is-和-的区别" tabindex="-1"><a class="header-anchor" href="#is-和-的区别"><span>is 和 == 的区别</span></a></h4>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">a,b </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">a </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">is</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> not</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> True</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## True</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> True</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## True</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(a) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">==</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(b) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">and</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> a </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">is</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> b</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## True</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">c,d </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(c) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">==</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(d) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">or</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> c </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">is</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> d</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## False</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>is</code> 也称为<strong>同一性运算符</strong>，它比较的是 <strong>对象唯一身份标识</strong>，即 <code v-pre>id</code>（<em>在内存中的地址</em>）</p>
</li>
<li>
<p><code v-pre>==</code> 仅 比较 <strong>值是否相同</strong></p>
</li>
</ul>
<h5 id="python-的特殊赋值" tabindex="-1"><a class="header-anchor" href="#python-的特殊赋值"><span><strong>Python 的特殊赋值</strong></span></a></h5>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">a,b </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"a = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">a</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">, b = </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">b</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># a = 1, b = 3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">a, b </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># too many values to unpack (expected 2)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">a, b, _ </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解构赋值</strong>，通常需要对位，即可解构解析，否则可能报错</p>
<hr>
<h2 id="_2-循环" tabindex="-1"><a class="header-anchor" href="#_2-循环"><span>2. 循环</span></a></h2>
<h3 id="_2-1-for-语句" tabindex="-1"><a class="header-anchor" href="#_2-1-for-语句"><span>2.1 for 语句</span></a></h3>
<p>循环，对 <strong>序列</strong> 或 <strong>可迭代对象</strong> 中的元素进行迭代，书写格式如下</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">	print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(i)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">	print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"over"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">##</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 1</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 2</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 3</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 4</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 5</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># over</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>每次从 <code v-pre>range</code> 序列对象中，取元素，赋值给变量 <code v-pre>i</code></li>
<li>可以指定 <code v-pre>else</code> ，作为迭代结束 （<a href="https://docs.python.org/zh-cn/3.10/library/exceptions.html#StopIteration" target="_blank" rel="noopener noreferrer"><code v-pre>StopIteration</code></a>）后的执行的子句，并结束循环</li>
</ul>
<h4 id="enumerate" tabindex="-1"><a class="header-anchor" href="#enumerate"><span>enumerate</span></a></h4>
<p><code v-pre>for</code> 循环十分强大，不仅可遍历，甚至能用 <strong>多个参数接收</strong> 迭代对象返回的 <strong>多个值</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">li </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"dawei"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"ker"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"marry"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lilisi"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> index, name </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> enumerate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(li, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"name is </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">name</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\t</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> - index is </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">index</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> index </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        continue</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    elif</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "lili"</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> name:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"强制终止"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        break</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"next loop"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"正常结束"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">##</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># name is dawei    - index is 1</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># name is ker      - index is 2</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># name is marry    - index is 3</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># name is lilisi   - index is 4</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 强制终止</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
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
<h3 id="_2-2-while-语句" tabindex="-1"><a class="header-anchor" href="#_2-2-while-语句"><span>2.2 while 语句</span></a></h3>
<p>重复地检验表达式，来触发循环，通常在 <strong>病毒</strong>、某种 <strong>监控</strong>、<strong>定时任务</strong>、<strong>异步回调</strong> 等机制使用，书写格式如下</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">while</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:	</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># condition</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> condition:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        continue</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">	else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        break</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">	pass</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    pass</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h5 id="linux-下执行解释器" tabindex="-1"><a class="header-anchor" href="#linux-下执行解释器"><span><strong>Linux 下执行解释器</strong></span></a></h5>
<p>额外，在 <strong>Linux</strong> 系统中，若出现编写脚本，不能运行的情况，多半未在环境变量中指定 <strong>Python</strong> 解释器，因此开头键入如下，即可帮内核找到解释器（<em>导入模块时会自动忽略</em>）</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#!/usr/bin/env python3</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


