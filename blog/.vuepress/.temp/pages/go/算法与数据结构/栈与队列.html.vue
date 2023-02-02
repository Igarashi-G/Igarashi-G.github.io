<template><div><p><strong>Golang</strong> 数据结构，栈与队列相关</p>
<!-- more -->
<h2 id="_1-栈" tabindex="-1"><a class="header-anchor" href="#_1-栈" aria-hidden="true">#</a> 1. 栈</h2>
<p><strong>栈</strong>（<em>stack</em>）：一种 <strong>后进先出</strong>（<em>LIFO</em>）的有序集合，是在操作上受限的线性表，新添加的或者待删除的元素都保存在栈顶，在栈里，新元素靠近栈顶，旧元素都接近栈底</p>
<blockquote>
<p>注意：任何不在栈顶的元素都无法访问，为了得到栈底的元素，必须先拿掉上面的元素</p>
</blockquote>
<p>栈内部的线性 <strong>表尾端叫做栈顶</strong> （<em>top</em>），<strong>表头称为栈底</strong>（<em>bottom</em>），不含元素的栈称为空栈
栈的插入操作，常称为压栈或者入栈，栈的删除操作常称为出栈或者弹栈</p>
<p>栈和线性表一样，具备两种存储方式：</p>
<ul>
<li><strong>顺序栈</strong>：顺序方式存储</li>
<li><strong>链式栈</strong>：链式存储</li>
</ul>
<h3 id="_1-1-顺序栈" tabindex="-1"><a class="header-anchor" href="#_1-1-顺序栈" aria-hidden="true">#</a> 1.1 顺序栈</h3>
<p>利用一组 <strong>地址连续的存储单元</strong> 依次存放自栈底到栈顶的数据元素，同时指定 <strong>top</strong> 指针指向栈顶元素位置</p>
<p>如图所示：</p>
<img src="@source/go/算法与数据结构/img/顺序栈.svg">
<p>通常做法是 <code v-pre>top = 0</code> 表示空栈，下标从 <code v-pre>0</code> 开始。如果设定了栈底指针 <code v-pre>base</code> ，那么 <code v-pre>top = base</code> 则记为空栈</p>
<p>初始化时不推荐限定栈的最大容量，应该先分配基本容量，在使用过程中，如果栈的空间不够大，再逐渐扩大，但为简单起见，不做扩大容量的设计</p>
<p>插入新元素时，<strong>top</strong> 指针 <strong>+1</strong>，删除时 <strong>-1</strong></p>
<h4 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> SqStackCap <span class="token operator">=</span> <span class="token number">5</span>

<span class="token keyword">type</span> SqStack <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	item <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token builtin">cap</span>  <span class="token builtin">int</span>
	top  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewSqStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>SqStack <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>SqStack<span class="token punctuation">{</span>
		item<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> SqStackCap<span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token builtin">cap</span><span class="token punctuation">:</span>  SqStackCap<span class="token punctuation">,</span>
		top<span class="token punctuation">:</span>  <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Push 压栈操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>SqStack<span class="token punctuation">)</span> <span class="token function">Push</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> s<span class="token punctuation">.</span>top <span class="token operator">==</span> s<span class="token punctuation">.</span><span class="token builtin">cap</span><span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"栈已满"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>

	s<span class="token punctuation">.</span>item<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> e
	s<span class="token punctuation">.</span>top<span class="token operator">++</span>
	<span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment">// Pop 弹栈操作</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>SqStack<span class="token punctuation">)</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> s<span class="token punctuation">.</span>top <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"栈为空"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	e <span class="token operator">:=</span> s<span class="token punctuation">.</span>item<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top<span class="token punctuation">]</span>
	s<span class="token punctuation">.</span>item<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">nil</span>
	s<span class="token punctuation">.</span>top<span class="token operator">--</span>
	<span class="token keyword">return</span> e
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>SqStack<span class="token punctuation">)</span> <span class="token function">Top</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> s<span class="token punctuation">.</span>top <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"栈为空"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> s<span class="token punctuation">.</span>item<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	stack <span class="token operator">:=</span> <span class="token function">NewSqStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">876</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>stack<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>stack<span class="token punctuation">)</span><span class="token punctuation">)</span>
	stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">33</span><span class="token punctuation">)</span>
	stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span>
	stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">94</span><span class="token punctuation">)</span>
	stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">137</span><span class="token punctuation">)</span>
	stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">258</span><span class="token punctuation">)</span>
	stack<span class="token punctuation">.</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	stack<span class="token punctuation">.</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>stack<span class="token punctuation">,</span> <span class="token string">"top:"</span><span class="token punctuation">,</span> stack<span class="token punctuation">.</span>top<span class="token punctuation">,</span> stack<span class="token punctuation">.</span><span class="token function">Top</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-链式栈" tabindex="-1"><a class="header-anchor" href="#_1-2-链式栈" aria-hidden="true">#</a> 1.2 链式栈</h3>
<p><strong>使用链表来实现的栈</strong>，由于是链式存储，链栈基本不存在栈满的情况，除非内存不足！链栈为空其实就是 <code v-pre>top</code> 为空的时候</p>
<p>我们一般认为向链表中添加元素的操作直接往末尾添加即可，但是在栈中其实有更巧妙的操作，如下所示：<br>
<img src="@source/go/算法与数据结构/img/链式栈.svg"></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> LinkNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	next <span class="token operator">*</span>LinkNode
<span class="token punctuation">}</span>

<span class="token keyword">type</span> LinkStack <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	top <span class="token operator">*</span> LinkNode
	length <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewLinkStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>LinkStack <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>LinkStack<span class="token punctuation">{</span>
		top<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span>
		length<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>LinkStack<span class="token punctuation">)</span><span class="token function">Push</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>
	<span class="token comment">// 如下操作是：引用一个结点，然后将结点的后继指针 指向原栈，摞书</span>
	node <span class="token operator">:=</span> <span class="token operator">&amp;</span>LinkNode<span class="token punctuation">{</span>
		data<span class="token punctuation">:</span> e<span class="token punctuation">,</span>
		next<span class="token punctuation">:</span> s<span class="token punctuation">.</span>top<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	s<span class="token punctuation">.</span>top <span class="token operator">=</span> node
	s<span class="token punctuation">.</span>length <span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>LinkStack<span class="token punctuation">)</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> s<span class="token punctuation">.</span>top <span class="token operator">==</span><span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"空栈无法弹"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	e<span class="token operator">:=</span> s<span class="token punctuation">.</span>top<span class="token punctuation">.</span>data
	s<span class="token punctuation">.</span>top <span class="token operator">=</span> s<span class="token punctuation">.</span>top<span class="token punctuation">.</span>next
	s<span class="token punctuation">.</span>length<span class="token operator">--</span>
	<span class="token keyword">return</span> e
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>LinkStack<span class="token punctuation">)</span><span class="token function">Top</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> s<span class="token punctuation">.</span>top <span class="token operator">==</span><span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"空栈无栈顶"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> s<span class="token punctuation">.</span>top
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>LinkStack<span class="token punctuation">)</span><span class="token function">Dispaly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> s<span class="token punctuation">.</span>top
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">" &lt;- "</span><span class="token punctuation">)</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	l_stack <span class="token operator">:=</span> <span class="token function">NewLinkStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">223</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>l_stack<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>l_stack<span class="token punctuation">)</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">56</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">73</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">94</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Dispaly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	l_stack<span class="token punctuation">.</span><span class="token function">Dispaly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-共享空间栈" tabindex="-1"><a class="header-anchor" href="#_1-3-共享空间栈" aria-hidden="true">#</a> 1.3 共享空间栈</h3>
<p>栈的顺序存储结构只允许栈顶进出元素，不存在线性表中插入、删除数据时需要移动数据的问题，但是 <strong>必须预设一个数组的存储空间</strong></p>
<p>虽然 <strong>Golang</strong> 的切片的容量是动态的，但是变更容量带来的内存拷贝消耗也是可观的，如果数组容量过大，又容易出现利用率不足问题</p>
<p>对于两个相同类型的栈，可以通过一个数组来最大限度的利用已经开辟好的空间来进行操作</p>
<p><strong>设计思路</strong>：数组有两个端点， 两个栈有两个栈底， 让一个栈的栈底为数组的始端， 即下标为 <strong>0</strong> 处，另一个栈为数组的末端，即下标为 数组容量 <strong>cap - 1</strong> 处，这样， 两个栈如果增加元素， 就是两端点向中间延伸，（<em>即两个栈在数组的两端，向中间靠拢</em>），<strong>top1</strong> 和 <strong>top2</strong> 是栈顶指针，只要他们不见面，两个栈就可以一直使用</p>
<p>一些边界情况:</p>
<ul>
<li>栈 <strong>1</strong> 为空，即 <code v-pre>top1 = -1</code></li>
<li>栈 <strong>2</strong> 为空，即 <code v-pre>top2 = cap</code></li>
<li>栈 <strong>1</strong> 满，即 <code v-pre>top1 = cap-1</code>，且 栈 <strong>2</strong> 为空</li>
<li>栈 <strong>2</strong> 满，即 <code v-pre>top2 = 0</code>，且栈 <strong>1</strong> 为空</li>
<li>栈满，即 <code v-pre>top+1 == top2</code>，也即两个栈见面，两个指针之间相差 <strong>1</strong></li>
</ul>
<blockquote>
<p>注意：两栈共享空间的数据结构，通常用于两栈空间需求相反（<em>此消彼长</em>），且数据类型一致！！！</p>
</blockquote>
<p>数据结构如图所示：
<img src="@source/go/算法与数据结构/img/共享空间栈.svg"></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> maxCap <span class="token operator">=</span> <span class="token number">10</span>

<span class="token keyword">type</span> ShareStack <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	items <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	top   <span class="token builtin">int</span>
	top2  <span class="token builtin">int</span>
	<span class="token builtin">cap</span>   <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewShareStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>ShareStack <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>ShareStack<span class="token punctuation">{</span>
		items<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> maxCap<span class="token punctuation">)</span><span class="token punctuation">,</span>
		top<span class="token punctuation">:</span>   <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
		top2<span class="token punctuation">:</span>  maxCap<span class="token punctuation">,</span>
		<span class="token builtin">cap</span><span class="token punctuation">:</span>   maxCap<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ShareStack<span class="token punctuation">)</span> <span class="token function">Push</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> stackID <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> stackID <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> stackID <span class="token operator">></span> <span class="token number">2</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"编号选择错误"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> s<span class="token punctuation">.</span>top<span class="token operator">+</span><span class="token number">1</span> <span class="token operator">==</span> s<span class="token punctuation">.</span>top2 <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"栈空间已满"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> stackID <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span> <span class="token comment">// 第一个栈 入栈</span>
		s<span class="token punctuation">.</span>items<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> e
		s<span class="token punctuation">.</span>top<span class="token operator">++</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">// 第二个栈 出栈</span>
		s<span class="token punctuation">.</span>items<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top2<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> e
		s<span class="token punctuation">.</span>top2<span class="token operator">--</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ShareStack<span class="token punctuation">)</span> <span class="token function">Pop</span><span class="token punctuation">(</span>stackID <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> stackID <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> stackID <span class="token operator">></span> <span class="token number">2</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"栈编号选择错误"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>top <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> stackID <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>top2 <span class="token operator">==</span> s<span class="token punctuation">.</span><span class="token builtin">cap</span> <span class="token operator">&amp;&amp;</span> stackID <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"栈空无法弹栈"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">if</span> stackID <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		e <span class="token operator">=</span> s<span class="token punctuation">.</span>items<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top<span class="token punctuation">]</span>
		s<span class="token punctuation">.</span>items<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">nil</span>
		s<span class="token punctuation">.</span>top<span class="token operator">--</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> stackID <span class="token operator">==</span> <span class="token number">2</span> <span class="token punctuation">{</span>
		e <span class="token operator">=</span> s<span class="token punctuation">.</span>items<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top2<span class="token punctuation">]</span>
		s<span class="token punctuation">.</span>items<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top2<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">nil</span>
		s<span class="token punctuation">.</span>top2<span class="token operator">++</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> e
<span class="token punctuation">}</span>

<span class="token comment">// 获取栈顶元素</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>ShareStack<span class="token punctuation">)</span><span class="token function">Top</span><span class="token punctuation">(</span>stackID <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>

	<span class="token keyword">if</span> stackID <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> stackID <span class="token operator">></span> <span class="token number">2</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"栈编号选择错误"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span>stackID <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span>top <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>top2 <span class="token operator">==</span> s<span class="token punctuation">.</span><span class="token builtin">cap</span> <span class="token operator">&amp;&amp;</span> stackID <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"空栈无法pop"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token keyword">if</span> stackID <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		e <span class="token operator">=</span> s<span class="token punctuation">.</span>items <span class="token punctuation">[</span>s<span class="token punctuation">.</span>top<span class="token punctuation">]</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		e <span class="token operator">=</span> s<span class="token punctuation">.</span>items<span class="token punctuation">[</span>s<span class="token punctuation">.</span>top2<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> e
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s_stack <span class="token operator">:=</span> <span class="token function">NewShareStack</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s_stack<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>s_stack<span class="token punctuation">)</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">56</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s_stack<span class="token punctuation">,</span> s_stack<span class="token punctuation">.</span><span class="token function">Top</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> s_stack<span class="token punctuation">.</span><span class="token function">Top</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">345</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">89</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Push</span><span class="token punctuation">(</span><span class="token number">888</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	s_stack<span class="token punctuation">.</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s_stack<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-队列" tabindex="-1"><a class="header-anchor" href="#_2-队列" aria-hidden="true">#</a> 2. 队列</h2>
<p><strong>队列</strong>（<em>Queue</em>）：只允许在一端进行插入操作，在另一端进行删除操作的线性表，队列也是特殊的线性表，遵循 <strong>FIFO</strong>（<em>先进先出，First In First Out</em>）规则，即在尾部添加元素，并从顶部移除元素，最新添加的元素必须排在队列的末尾</p>
<p>队列一般包含两个索引/指针：</p>
<ul>
<li><strong>front</strong>：表示队首</li>
<li><strong>rear</strong>：表示队尾</li>
</ul>
<img src="@source/go/算法与数据结构/img/队列.svg">
<p>由于队列也是线性表，队列也有两种存储方式：</p>
<ul>
<li><strong>顺序存储</strong>：使用数组存储数据</li>
<li><strong>链式存储</strong>：其实就是一个单链表，只不过只能尾进头出，称之为链队列</li>
</ul>
<h3 id="_2-1-链式存储" tabindex="-1"><a class="header-anchor" href="#_2-1-链式存储" aria-hidden="true">#</a> 2.1 链式存储</h3>
<p>此处使用不带头结点的链表来实现的队列，其特点有：</p>
<ul>
<li>空队列时，<strong>front</strong> 和 <strong>rear</strong> 都指向 <strong>nil</strong></li>
<li>入队即链表尾部插入结点
<ul>
<li>若是第一次入队，则 <strong>front</strong> 和 <strong>rear</strong> 同时指向第一个元素</li>
</ul>
</li>
<li>出队即将链表的第一个元素删除，将其后继元素作为 <strong>front</strong> 结点
<ul>
<li>若链表只有一个结点时，则需将 <strong>rear</strong> 指向 <strong>front</strong> 结点</li>
</ul>
</li>
</ul>
<h4 id="实现-1" tabindex="-1"><a class="header-anchor" href="#实现-1" aria-hidden="true">#</a> 实现</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> QueueNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	next <span class="token operator">*</span>QueueNode
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewQueueNode</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>QueueNode <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>QueueNode<span class="token punctuation">{</span>
		data<span class="token punctuation">:</span> e<span class="token punctuation">,</span>
		next<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> QueueLink <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	rear   <span class="token operator">*</span>QueueNode
	front  <span class="token operator">*</span>QueueNode
	length <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewQueueLink</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>QueueLink <span class="token punctuation">{</span>

	<span class="token keyword">return</span> <span class="token operator">&amp;</span>QueueLink<span class="token punctuation">{</span>
		rear<span class="token punctuation">:</span>   <span class="token boolean">nil</span><span class="token punctuation">,</span>
		front<span class="token punctuation">:</span>  <span class="token boolean">nil</span><span class="token punctuation">,</span>
		length<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>QueueLink<span class="token punctuation">)</span> <span class="token function">Put</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> <span class="token function">NewQueueNode</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
	<span class="token keyword">if</span> q<span class="token punctuation">.</span>front <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> q<span class="token punctuation">.</span>rear <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		q<span class="token punctuation">.</span>rear <span class="token operator">=</span> p
		q<span class="token punctuation">.</span>front <span class="token operator">=</span> q<span class="token punctuation">.</span>rear
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		q<span class="token punctuation">.</span>rear<span class="token punctuation">.</span>next <span class="token operator">=</span> p
		q<span class="token punctuation">.</span>rear <span class="token operator">=</span> p
	<span class="token punctuation">}</span>

	q<span class="token punctuation">.</span>length<span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>QueueLink<span class="token punctuation">)</span> <span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> q<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"队列为空，无法出队"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	q<span class="token punctuation">.</span>front <span class="token operator">=</span> q<span class="token punctuation">.</span>front<span class="token punctuation">.</span>next
	<span class="token keyword">if</span> q<span class="token punctuation">.</span>front <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		q<span class="token punctuation">.</span>rear <span class="token operator">=</span> q<span class="token punctuation">.</span>front
	<span class="token punctuation">}</span>

	q<span class="token punctuation">.</span>length<span class="token operator">--</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>QueueLink<span class="token punctuation">)</span> <span class="token function">Search</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>QueueNode <span class="token punctuation">{</span>
	<span class="token keyword">if</span> q<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"队列为空，无法出队"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	pos <span class="token operator">:=</span> q<span class="token punctuation">.</span>front
	<span class="token keyword">for</span> pos<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>pos<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
		<span class="token keyword">if</span> pos<span class="token punctuation">.</span>data <span class="token operator">==</span> e <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		pos <span class="token operator">=</span> pos<span class="token punctuation">.</span>next
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> pos
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>QueueLink<span class="token punctuation">)</span> <span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> q<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"队列为空，无法出队"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	pos <span class="token operator">:=</span> q<span class="token punctuation">.</span>front
	<span class="token keyword">for</span> pos<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>pos<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">"->"</span><span class="token punctuation">)</span>
		pos <span class="token operator">=</span> pos<span class="token punctuation">.</span>next
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>pos<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	queueLink <span class="token operator">:=</span> <span class="token function">NewQueueLink</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>queueLink<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>queueLink<span class="token punctuation">)</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token number">87</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token number">57</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token number">233</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>queueLink<span class="token punctuation">.</span>rear<span class="token punctuation">,</span> queueLink<span class="token punctuation">.</span>front<span class="token punctuation">,</span> queueLink<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
	queueLink<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-顺序存储" tabindex="-1"><a class="header-anchor" href="#_2-2-顺序存储" aria-hidden="true">#</a> 2.2 顺序存储</h3>
<p>顺序存储的操作复杂度：</p>
<ul>
<li><strong>入队</strong>：只是给数组数据最后一位添加一个元素，时间复杂度为 <strong>O(1)</strong></li>
<li><strong>出队</strong>：为了保证队头正确性，需要将当前头部及以后所有元素向后移动，时间复杂度为 <strong>O(n)</strong></li>
</ul>
<p>顺序存储的 <strong>出队性能很差</strong>，在实际开发中，其实不一定必须移动队列元素，只要将 <strong>队头的位置后移一位</strong> 即可，此时出队性能将会大幅增加：</p>
<img src="@source/go/算法与数据结构/img/队列-顺序存储.svg">
<p><strong>假溢出</strong>：在出队时，<strong>front</strong> 索引位置会不断后移，那么此时会产生新的问题：当 <strong>front</strong> 索引后的位置都被占满，新插入的元素该往哪存放？明明数组在 front 之前还有空位，但是造成了数组满的假象，称之为假溢出！</p>
<p>假溢出问题如果不能得到解决，那么栈的顺序存储就没有任何意义，所以一般情况下顺序存储用于实现循环队列</p>
<h3 id="_2-3-循环队列" tabindex="-1"><a class="header-anchor" href="#_2-3-循环队列" aria-hidden="true">#</a> 2.3 循环队列</h3>
<p><strong>循环队列</strong>：（<em>CircleQueue</em>），底层一般使用数组实现，可以解决顺序存储队列的不足</p>
<p><strong>假溢出的解决办法</strong>：后面满了，再从头开始，也就是头尾相接的循环，这种头尾相接的顺序存储结构队列即循环队列。</p>
<p>如图所示，当 <strong>a7</strong> 入队时，<strong>rear</strong> 指针到达索引 <strong>0</strong> 位置：<br>
<img src="@source/go/算法与数据结构/img/循环队列.svg"></p>
<p>如果在 <strong>a7</strong> 入队后，再次入队 <strong>1</strong> 个元素，则空间被占满，<strong>front</strong> 和 <strong>rear</strong> 紧紧相邻</p>
<p>很显然在入队出队的时候，我们需要重新计算其真实索引：</p>
<ul>
<li>入队时，<strong>rear</strong> 的计算公式：<code v-pre>rear = (front + length) % cap</code></li>
<li>出队时，<strong>front</strong> 的计算公式：<code v-pre>front = (front + 1) % cap</code></li>
</ul>
<p>最终可以得到一个通用公式：<strong><code v-pre>realIndex = (front + i) % cap</code></strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 获取队列容量</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>CircleQueue<span class="token punctuation">)</span><span class="token function">Cap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> q<span class="token punctuation">.</span><span class="token builtin">cap</span>	<span class="token comment">// maxSize</span>
<span class="token punctuation">}</span>

<span class="token comment">// 获取在循环队列数组中的真实索引</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>CircleQueue<span class="token punctuation">)</span><span class="token function">realIndex</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span><span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span>q<span class="token punctuation">.</span>head <span class="token operator">+</span> index<span class="token punctuation">)</span> <span class="token operator">%</span> q<span class="token punctuation">.</span><span class="token function">Cap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实现如下</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/* 直接 取模 + 1 未通过如上叙述实现*/</span>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> maxSize <span class="token operator">=</span> <span class="token number">4</span>

<span class="token keyword">type</span> CircleQueue <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	rear   <span class="token builtin">int</span>
	front  <span class="token builtin">int</span>
	length <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">NewCircleQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>CircleQueue <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>CircleQueue<span class="token punctuation">{</span>
		data<span class="token punctuation">:</span>   <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> maxSize<span class="token punctuation">)</span><span class="token punctuation">,</span>
		rear<span class="token punctuation">:</span>   <span class="token number">0</span><span class="token punctuation">,</span>
		front<span class="token punctuation">:</span>  <span class="token number">0</span><span class="token punctuation">,</span>
		length<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>CircleQueue<span class="token punctuation">)</span> <span class="token function">EnQueue</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> q<span class="token punctuation">.</span>length <span class="token operator">==</span> maxSize <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"队列已满，无法入队"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> q<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		q<span class="token punctuation">.</span>data<span class="token punctuation">[</span>q<span class="token punctuation">.</span>rear<span class="token punctuation">]</span> <span class="token operator">=</span> e
		q<span class="token punctuation">.</span>data<span class="token punctuation">[</span>q<span class="token punctuation">.</span>front<span class="token punctuation">]</span> <span class="token operator">=</span> e
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		q<span class="token punctuation">.</span>rear <span class="token operator">=</span> q<span class="token punctuation">.</span>rear<span class="token operator">%</span>maxSize <span class="token operator">+</span> <span class="token number">1</span>
		q<span class="token punctuation">.</span>data<span class="token punctuation">[</span>q<span class="token punctuation">.</span>rear<span class="token punctuation">]</span> <span class="token operator">=</span> e
	<span class="token punctuation">}</span>
	q<span class="token punctuation">.</span>length<span class="token operator">++</span>
	<span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>CircleQueue<span class="token punctuation">)</span> <span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> q<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"队列为空, 无法出队"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	q<span class="token punctuation">.</span>front <span class="token operator">=</span> q<span class="token punctuation">.</span>front<span class="token operator">%</span>maxSize <span class="token operator">+</span> <span class="token number">1</span>

	<span class="token keyword">if</span> q<span class="token punctuation">.</span>front <span class="token operator">==</span> q<span class="token punctuation">.</span>rear <span class="token punctuation">{</span>
		q<span class="token punctuation">.</span>front <span class="token operator">=</span> <span class="token number">0</span>
		q<span class="token punctuation">.</span>rear <span class="token operator">=</span> <span class="token number">0</span>
	<span class="token punctuation">}</span>
	q<span class="token punctuation">.</span>length<span class="token operator">--</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>CircleQueue<span class="token punctuation">)</span> <span class="token function">Dispaly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> q<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"queue null"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	start <span class="token operator">:=</span> q<span class="token punctuation">.</span>front
	<span class="token keyword">for</span> start <span class="token operator">!=</span> q<span class="token punctuation">.</span>rear <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>q<span class="token punctuation">.</span>data<span class="token punctuation">[</span>start<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">" &lt;- "</span><span class="token punctuation">)</span>
		start<span class="token operator">++</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>q<span class="token punctuation">.</span>data<span class="token punctuation">[</span>start<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	circleQueue <span class="token operator">:=</span> <span class="token function">NewCircleQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>circleQueue<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>circleQueue<span class="token punctuation">)</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">EnQueue</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">EnQueue</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">EnQueue</span><span class="token punctuation">(</span><span class="token number">75</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">EnQueue</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">EnQueue</span><span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">EnQueue</span><span class="token punctuation">(</span><span class="token number">92</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">Dispaly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">Dispaly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//circleQueue.Dispaly()</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">DeQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circleQueue<span class="token punctuation">.</span><span class="token function">Dispaly</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-双端队列" tabindex="-1"><a class="header-anchor" href="#_2-4-双端队列" aria-hidden="true">#</a> 2.4 双端队列</h3>
<p><strong>双端队列</strong>：（<em>Double Ended Dqueue</em>)，能够在头尾两端添加、删除元素的队列</p>
<h2 id="_3-栈的应用" tabindex="-1"><a class="header-anchor" href="#_3-栈的应用" aria-hidden="true">#</a> 3.栈的应用</h2>
<h3 id="_3-1-函数调用栈" tabindex="-1"><a class="header-anchor" href="#_3-1-函数调用栈" aria-hidden="true">#</a> 3.1 函数调用栈</h3>
<p>栈最经典的应用场景是 <strong>函数调用栈</strong>，操作系统为每个线程分配了一块独立内存空间，该内存内部会被构建为类似栈的结构，用于存储函数调用时的临时变量</p>
<p>每进入一个函数，就会将临时变量作为一个栈帧入栈，当被调用函数执行完成，返回之后，将这个函数对应的栈帧出栈。</p>
<h3 id="_1-2-表达式求值" tabindex="-1"><a class="header-anchor" href="#_1-2-表达式求值" aria-hidden="true">#</a> 1.2 表达式求值</h3>
<p>对于常见的四则运算，如：<code v-pre>34+13*9+44-12/3</code>，计算机是很难理解的，编译器通常通过两个栈来实现：</p>
<ul>
<li>一个栈用来保存 <strong>操作数</strong></li>
<li>一个栈用来保存 <strong>运算符</strong></li>
</ul>
<p>从左向右遍历表达式，当遇到数字，会直接压入操作数栈；当遇到运算符，就与运算符栈的栈顶元素进行比较如果比运算符栈顶元素的优先级高，就将当前运算符压入栈；如果比运算符栈顶元素的优先级低或者相同，从运算符栈中取栈顶运算符，从操作数栈的栈顶取 2 个操作数，然后进行计算，再把计算完的结果压入操作数栈，继续比较。</p>
<h3 id="_1-3-栈匹配括号" tabindex="-1"><a class="header-anchor" href="#_1-3-栈匹配括号" aria-hidden="true">#</a> 1.3 栈匹配括号</h3>
<p>栈还用于表达式、代码中的括号匹配。</p>
<p>假设表达式中只包含三种括号，圆括号 <code v-pre>()</code>、方括号 <code v-pre>[]</code> 和花括号<code v-pre>{}</code>，并且它们可以任意嵌套。比如，<code v-pre>{[{}]}</code>或 <code v-pre>[{()}([])]</code> 等都为合法格式，而 <code v-pre>{[}()]</code>  或 <code v-pre>[({)]</code> 为不合法的格式。那我现在给你一个包含三种括号的表达式字符串，如何检查它是否合法呢？</p>
<ul>
<li>
<p>栈来保存未匹配的左括号，从左到右依次扫描字符串，当扫描到左括号时，则将其压入栈中；</p>
</li>
<li>
<p>当扫描到右括号时，从栈顶取出一个左括号。如果能够匹配，比如 <code v-pre>“(”</code> 跟 <code v-pre>“)”</code> 匹配，<code v-pre>“[”</code> 跟 <code v-pre>“]”</code> 匹配，<code v-pre>“{”</code> 跟 <code v-pre>“}”</code> 匹配，则继续扫描剩下的字符串</p>
</li>
<li>
<p>如果扫描的过程中，遇到不能配对的右括号，或者栈中没有数据，则说明为非法格式</p>
</li>
</ul>
<p>当所有的括号都扫描完成之后，如果栈为空，则说明字符串为合法格式；否则，说明有未匹配的左括号，为非法格式</p>
<h3 id="_1-4-浏览器历史记录" tabindex="-1"><a class="header-anchor" href="#_1-4-浏览器历史记录" aria-hidden="true">#</a> 1.4 浏览器历史记录</h3>
<p>使用两个栈，<strong>X</strong> 和 <strong>Y</strong>，我们把首次浏览的页面依次压入栈 <strong>X</strong>，当点击后退按钮时，再依次从栈 <strong>X</strong> 中出栈，并将出栈的数据依次放入栈 <strong>Y</strong>。当我们点击前进按钮时，我们依次从栈 <strong>Y</strong> 中取出数据，放入栈 <strong>X</strong> 中。当栈 <strong>X</strong> 中没有数据时，那就说明没有页面可以继续后退浏览了。当栈 <strong>Y</strong> 中没有数据，那就说明没有页面可以点击前进按钮浏览了。</p>
<h3 id="_1-5-栈与递归" tabindex="-1"><a class="header-anchor" href="#_1-5-栈与递归" aria-hidden="true">#</a> 1.5 栈与递归</h3>
<p>递归是栈的重要应用。在以前澳洲的兔子泛滥成灾，因为兔子具有惊人的繁殖能力，一对兔子每个月能生出一对兔子，以这对父母为开始，总共生出的后代数目：第一个月小兔子没有繁殖能力，所以还是一对；两个月后， 生下一对小兔子数共有两对； 三个月以后，老兔子又生下一对， 因为小兔子还没有繁殖能力， 所以一共是三对，依次类推。这就是递归现象，用数学公式演示：</p>
<img src="@source/go/算法与数据结构/img/栈的应用.png">   
<p>使用递归实现：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Fbi</span><span class="token punctuation">(</span><span class="token builtin">int</span> i<span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"非法参数"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> i <span class="token operator">&lt;</span> <span class="token number">2</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> i
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token function">Fbi</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">Fbi</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">40</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"%d "</span><span class="token punctuation">,</span> <span class="token function">Fbi</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述案例中，最重要的思想就是斐波那契函数 <code v-pre>Fbi()</code> 调用了自己，这便是递归。递归最需要注意的地方是，<strong>必须给递归制作一个退出条件</strong>，否则无限循环下去，将会是一场噩梦</p>
<p>递归的代码一般都可以无缝转化为迭代方式实现</p>
<p>递归虽然让程序的结构更清晰、简洁，但是大量的递归调用会建立函数的副本，<strong>会耗费大量的时间和内存</strong>，迭代则不需要反复调用函数和占用额外的内存，因此我们应该视不同情况选择不同的代码实现方式</p>
<h2 id="_4-队列的应用" tabindex="-1"><a class="header-anchor" href="#_4-队列的应用" aria-hidden="true">#</a> 4. 队列的应用</h2>
<h3 id="_2-1-阻塞对垒" tabindex="-1"><a class="header-anchor" href="#_2-1-阻塞对垒" aria-hidden="true">#</a> 2.1 阻塞对垒</h3>
<p><strong>阻塞队列：</strong> 其实就是在队列基础上增加了阻塞操作</p>
<ul>
<li>在 <strong>队列为空</strong> 的时候，从队头取数据会被阻塞，因为此时还没有数据可取，直到队列中有了数据才能返回</li>
<li>如果 <strong>队列已满</strong> ，那么插入数据的操作就会被阻塞，直到队列中有空闲位置后再插入数据，然后再返回</li>
</ul>
<p>该定义其实就是一个 <strong>生产者 - 消费者模型</strong>，可以有效地协调生产和消费的速度。当“生产者”生产数据的速度过快，“消费者”来不及消费时，存储数据的队列很快就会满，此时，生产者就阻塞等待，直到 <strong>消费者</strong> 消费了数据，<strong>生产者</strong> 才会被唤醒继续 <strong>生产</strong></p>
<p>而且不仅如此，基于阻塞队列，我们还可以通过协调 <strong>生产者</strong> 和 <strong>消费者</strong> 的个数，来提高数据的处理效率。比如前面的例子，我们可以多配置几个 <strong>消费者</strong>，来应对一个 <strong>生产者</strong></p>
<h3 id="_1-2-并发队列" tabindex="-1"><a class="header-anchor" href="#_1-2-并发队列" aria-hidden="true">#</a> 1.2 并发队列</h3>
<p><strong>线程安全的队列</strong> 我们叫作并发队列</p>
<p>最简单直接的实现方式是直接在 <code v-pre>EnQueue()</code>、<code v-pre>DeQueue()</code> 方法上加锁，但是锁粒度大并发度会比较低，同一时刻仅允许一个存或者取操作</p>
<p>实际上，基于数组的循环队列，利用 <strong>CAS</strong> 原子操作，可以实现非常高效的并发队列，这也是循环队列比链式队列应用更加广泛的原因</p>
<h3 id="_1-3-线程池实现" tabindex="-1"><a class="header-anchor" href="#_1-3-线程池实现" aria-hidden="true">#</a> 1.3 线程池实现</h3>
<p>线程池没有空闲线程时，新的任务请求线程资源时，线程池该如何处理？各种处理策略又是如何实现的呢？</p>
<p>我们一般有两种处理策略。</p>
<ul>
<li>第一种是非阻塞的处理方式，直接拒绝任务请求</li>
<li>另一种是阻塞的处理方式，<strong>将请求排队</strong>，等到有空闲线程时，取出排队的请求继续处理，那如何存储排队的请求呢？</li>
</ul>
<h5 id="存储排队的请求" tabindex="-1"><a class="header-anchor" href="#存储排队的请求" aria-hidden="true">#</a> 存储排队的请求</h5>
<p>我们希望公平地处理每个排队的请求，<strong>先进者先服务</strong>，所以队列这种数据结构很适合来存储排队请求，我们前面说过，队列有基于链表和基于数组这两种实现方式。这两种实现方式对于排队请求又有什么区别呢？</p>
<ul>
<li>
<p><strong>基于链表</strong> 的实现方式，可以实现一个 <strong>支持无限排队的无界队列</strong>（<em>unbounded queue</em>），但是可能会导致过多的请求排队等待，请求处理的<strong>响应时间过长</strong>，所以，针对响应时间比较敏感的系统，<strong>基于链表实现的无限排队的线程池是不合适的</strong></p>
</li>
<li>
<p>而基于数组实现的有界队列（<em>bounded queue</em>），队列的 <strong>大小有限</strong>，所以线程池中排队的请求超过队列大小时，接下来的 <strong>请求就会被拒绝</strong>，这种方式 <strong>对响应时间敏感的系统来说，就相对更加合理</strong>，不过，设置一个合理的队列大小，也是非常有讲究的，队列太大导致等待的请求太多，队列太小会导致无法充分利用系统资源、发挥最大性能</p>
</li>
</ul>
<p>除了前面讲到队列应用在线程池请求排队的场景之外，队列可以应用在任何有限资源池中，用于排队请求，比如数据库连接池等，实际上，对于大部分资源有限的场景，当没有空闲资源时，基本上都可以通过 <strong>队列</strong> 这种数据结构来实现请求排队</p>
<h3 id="为什么引入-栈-与-队列-这样的数据结构" tabindex="-1"><a class="header-anchor" href="#为什么引入-栈-与-队列-这样的数据结构" aria-hidden="true">#</a> 为什么引入 栈 与 队列 这样的数据结构</h3>
<p>数组和链表基本可以完整实现栈/队列的功能，但是计算机中额外引入了这些受限的数据结构，原因是这样做 <strong>简化了程序设计的问题</strong>，划分了不同关注层次，使得思考范围缩小，更加 <strong>聚焦于我们要解决的问题核心</strong>，反之像数组等，因为要分散精力去考虑数组的下标增减等细节问题，反而掩盖了问题的本质</p>
</div></template>


