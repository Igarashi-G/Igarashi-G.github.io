<template><div><p><strong>Golang</strong> 常用库方法、小工具，等开箱即用</p>
<!-- more -->
<h2 id="_1-常用方法" tabindex="-1"><a class="header-anchor" href="#_1-常用方法" aria-hidden="true">#</a> 1. 常用方法</h2>
<h3 id="随机数" tabindex="-1"><a class="header-anchor" href="#随机数" aria-hidden="true">#</a> 随机数</h3>
<h4 id="伪随机数-math-rand" tabindex="-1"><a class="header-anchor" href="#伪随机数-math-rand" aria-hidden="true">#</a> <strong>伪随机数 math/rand</strong></h4>
<ul>
<li><strong>无种子：</strong> 默认种子为 <strong>1</strong>， <code v-pre>Seek(1)</code></li>
<li><strong>有种子：</strong> 以时钟，输入输出等作为参数，比无种子 <strong>重复概率低</strong></li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">randomSeed</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> max <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	source <span class="token operator">:=</span> rand<span class="token punctuation">.</span><span class="token function">NewSource</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UnixNano</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 时间种子</span>
	r <span class="token operator">:=</span> rand<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
	<span class="token keyword">return</span> min <span class="token operator">+</span> r<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span>max<span class="token operator">-</span>min<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">randomNoSeed</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> max <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> min <span class="token operator">+</span> rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span>max<span class="token operator">-</span>min<span class="token punctuation">)</span>	<span class="token comment">// 无种子</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Intn</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment">//会产生0到100之间的随机整数</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span><span class="token function">Float64</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment">//会产生0到1之间的随机数</span>
    
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span>i<span class="token operator">++</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d "</span><span class="token punctuation">,</span> <span class="token function">randomNoSeed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span>i<span class="token operator">++</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>	<span class="token comment">// 种子延时</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d "</span><span class="token punctuation">,</span> <span class="token function">randomSeed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="真随机数-crypto-rand" tabindex="-1"><a class="header-anchor" href="#真随机数-crypto-rand" aria-hidden="true">#</a> <strong>真随机数 crypto/rand</strong></h4>
<p>比伪随机慢，但满足密码学安全需求（<em>无法预测</em>）</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"crypto/rand"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"math/big"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">random</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> max <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	ret<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> rand<span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span>rand<span class="token punctuation">.</span>Reader<span class="token punctuation">,</span> big<span class="token punctuation">.</span><span class="token function">NewInt</span><span class="token punctuation">(</span><span class="token function">int64</span><span class="token punctuation">(</span>max<span class="token operator">-</span>min<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token function">int</span><span class="token punctuation">(</span>ret<span class="token punctuation">.</span><span class="token function">Int64</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> min
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	li <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		li<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">random</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"li:"</span><span class="token punctuation">,</span> li<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


