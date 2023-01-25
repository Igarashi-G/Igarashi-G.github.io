<template><div><p><strong>Golang</strong> 数据结构，数组相关</p>
<!-- more -->
<h2 id="_1-数组" tabindex="-1"><a class="header-anchor" href="#_1-数组" aria-hidden="true">#</a> 1. 数组</h2>
<h3 id="_1-1-golang-中的数组" tabindex="-1"><a class="header-anchor" href="#_1-1-golang-中的数组" aria-hidden="true">#</a> 1.1 Golang 中的数组</h3>
<p>同大多语言的数组一样，Go 的数组长度定义后不可更改，长度使用 <code v-pre>len()</code> 获取。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 数组定义</span>
<span class="token keyword">var</span> arr1 <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token builtin">int</span>     <span class="token comment">//定义长度为10的整型数组，很少这样使用</span>
arr2 <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span> <span class="token comment">//定义并初始化</span>
arr3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span>   <span class="token comment">//自动推导并初始化</span>
arr4 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">}</span>     <span class="token comment">//指定总长度，前几位被初始化，没有的使用零值</span>
arr5 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">:</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">:</span><span class="token number">11</span><span class="token punctuation">}</span>   <span class="token comment">//有选择的初始化，没被初始化的使用零值</span>
arr6 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">}</span>    <span class="token comment">//自动计算长度</span>

<span class="token comment">// 数组的长度</span>
<span class="token function">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>

<span class="token comment">// 数组元素获取操作会引发类型的变化，数组将会转化为 Go 中新的数据类型切片</span>
arr<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span>      <span class="token comment">// 代表所有元素</span>
arr<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">5</span><span class="token punctuation">]</span>     <span class="token comment">// 代表前五个元素，即区间的左闭右开</span>
arr<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">:</span><span class="token punctuation">]</span>     <span class="token comment">// 代表从第5个开始（不包含第5个）</span>

<span class="token comment">// 数组遍历方式一：for 循环遍历</span>
arr <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span>

<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 数组遍历方式二：for-range 遍历</span>
arr <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span>

<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> arr <span class="token punctuation">{</span>
 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span> <span class="token comment">//元素位置</span>
 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token comment">//元素值</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-可变数组" tabindex="-1"><a class="header-anchor" href="#_2-可变数组" aria-hidden="true">#</a> 2. 可变数组</h2>
<h3 id="_2-1-可变数组概念" tabindex="-1"><a class="header-anchor" href="#_2-1-可变数组概念" aria-hidden="true">#</a> 2.1 可变数组概念</h3>
<p>可变数组是指数组长度可以随着插入数据的增多、减少发生对应变化的数据结构。</p>
<p>注意：<strong>C</strong> 语言中的动态数组并不是可变数组，只是其数组长度可以在运行时确定，而不是可以随时”改变“。</p>
<p>可变数组实现方式：</p>
<ul>
<li>
<p>1）可变数组结构内部维护一个真实数组，用来存储数据；</p>
</li>
<li>
<p>2）插入数据时，如果超过内部数组容量，则重新申请一个新的更大的数组，将原有数据拷贝到新数组，继续执行插入即可，这称为 <strong>扩容</strong>；</p>
</li>
<li>
<p>3）删除数据时，如果内部数组元素变得很少，可以重新申请一个新的更小的数组，将原有数据拷贝到新数组中，这称呼为 <strong>缩容</strong>。</p>
</li>
</ul>
<h3 id="_2-2-扩容缩容机制" tabindex="-1"><a class="header-anchor" href="#_2-2-扩容缩容机制" aria-hidden="true">#</a> 2.2 扩容缩容机制</h3>
<p>如果扩容和缩容的时机设计不当，则会引起 <code v-pre>复杂度震荡</code>。比如在某个结点进行添加数据时需要扩容，而下次操作则是删除该结点，则正好执行缩容，反复增加删除增加删除，那么其时间复杂度会一直维持在最高水平。</p>
<p>复杂度震荡的解决办法：扩容的倍数缩容的时机相乘不等于 <strong>1</strong> 即可。</p>
<p>还有一些引擎如 <strong>V8</strong>，会使用均摊方式进行扩容缩容。比如设定数组容量为 <strong>5</strong>：<code v-pre>cap = 5</code>，那么在长度到 5 时，就需要一次扩容，
扩容时就需要移动 <strong>5</strong> 个数据，这样就会造成插入数据时，因为要扩容会造成该次插入耗时比平时状态更长！。为了避免数组的某次增
减、删除元素操作突然耗时较长，可以进行均摊，比如每次插入元素，都将<code v-pre>cap + 1</code>。</p>
<h3 id="_2-3-可变数组特性" tabindex="-1"><a class="header-anchor" href="#_2-3-可变数组特性" aria-hidden="true">#</a> 2.3 可变数组特性</h3>
<p>可变数组其特点、复杂度与数组没有本质区别，因为其底层也是维护着一个数组，只不过用户可以无视其容量进行数据数目变更</p>
<h3 id="_2-4-实现" tabindex="-1"><a class="header-anchor" href="#_2-4-实现" aria-hidden="true">#</a> 2.4 实现</h3>
<p><strong>Golang</strong> 官方为了解决数组长度不能扩展，以及基本类型数组传递时产生副本的问题，官方包中引入了专有的数据结构切片 <strong>Slice</strong>，使用方式如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 常用创建方式：</span>
<span class="token keyword">var</span> s1 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span>    <span class="token comment">// 和声明没有长度的数组一样，但是无意义，因为底层的数组指针为nil</span>
s2 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span> <span class="token punctuation">{</span><span class="token char">'a'</span><span class="token punctuation">,</span><span class="token char">'b'</span><span class="token punctuation">,</span><span class="token char">'c'</span><span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span>    <span class="token comment">//输出 []</span>
fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span>    <span class="token comment">//输出 [97 98 99]</span>

<span class="token comment">// 使用 make 函数创建：</span>
slice1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span>  <span class="token comment">// 创建长度为5，容量为5，初始值为0的切片</span>
slice2 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">)</span> <span class="token comment">// 创建长度为5，容量为7，初始值为0的切片</span>
slice3 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span> <span class="token comment">// 创建长度为5，容量为5，并已经初始化的切片</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>手动实现一个基础可变数组示例</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>


<span class="token keyword">const</span> MaxSize <span class="token operator">=</span> <span class="token number">5</span> <span class="token comment">// 默认容量，取最小值便于测试</span>

<span class="token keyword">type</span> DynamicArray <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data     <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 可变数组内的真实数组</span>
	capacity <span class="token builtin">int</span>           <span class="token comment">// 可变数组的真实容量</span>
	length   <span class="token builtin">int</span>           <span class="token comment">// 可变数组的元素个数</span>
<span class="token punctuation">}</span>

<span class="token comment">// 数组扩容</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>arr <span class="token operator">*</span>DynamicArray<span class="token punctuation">)</span> <span class="token function">expandCap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> arr<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>capacity <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token comment">//拷贝数据</span>
	newCap <span class="token operator">:=</span> arr<span class="token punctuation">.</span>capacity <span class="token operator">*</span> <span class="token number">2</span>
	newData <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> newCap<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		newData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">.</span>data<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 变更容量</span>
	arr<span class="token punctuation">.</span>data <span class="token operator">=</span> newData
	arr<span class="token punctuation">.</span>capacity <span class="token operator">=</span> newCap
<span class="token punctuation">}</span>

<span class="token comment">// 数组缩容</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>arr <span class="token operator">*</span>DynamicArray<span class="token punctuation">)</span> <span class="token function">reduceCap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> arr<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token function">int</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>capacity<span class="token operator">/</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	newCap <span class="token operator">:=</span> <span class="token function">int</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>capacity <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span>
	newData <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> newCap<span class="token punctuation">)</span>

	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		newData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">.</span>data<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	arr<span class="token punctuation">.</span>data <span class="token operator">=</span> newData
	arr<span class="token punctuation">.</span>capacity <span class="token operator">=</span> newCap
<span class="token punctuation">}</span>

<span class="token comment">// Insert 增</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>arr <span class="token operator">*</span>DynamicArray<span class="token punctuation">)</span> <span class="token function">Insert</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> arr<span class="token punctuation">.</span>length <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"插入位置不合法"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 每次插入前执行扩容机制，判断是否需要扩容</span>
	arr<span class="token punctuation">.</span><span class="token function">expandCap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 总长度从后往前遍历，若大于指定位置则其他数组后移，等于则刚好插入</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">>=</span> index<span class="token punctuation">;</span> i<span class="token operator">--</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> i <span class="token operator">==</span> index <span class="token punctuation">{</span>
			arr<span class="token punctuation">.</span>data<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> e
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			arr<span class="token punctuation">.</span>data<span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">.</span>data<span class="token punctuation">[</span>arr<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	arr<span class="token punctuation">.</span>length<span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token comment">// Delete 增</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>arr <span class="token operator">*</span>DynamicArray<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> arr<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// arr.缩容？</span>
	arr<span class="token punctuation">.</span><span class="token function">reduceCap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> i <span class="token operator">>=</span> index <span class="token punctuation">{</span>
			arr<span class="token punctuation">.</span>data<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">.</span>data<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	arr<span class="token punctuation">.</span>length<span class="token operator">--</span>
<span class="token punctuation">}</span>

<span class="token comment">// Update 增</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>arr <span class="token operator">*</span>DynamicArray<span class="token punctuation">)</span> <span class="token function">Update</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> arr<span class="token punctuation">.</span>length <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">//arr.expandCap()</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> i <span class="token operator">==</span> index <span class="token punctuation">{</span>
			arr<span class="token punctuation">.</span>data<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> e
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>arr <span class="token operator">*</span>DynamicArray<span class="token punctuation">)</span> <span class="token function">Length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> arr<span class="token punctuation">.</span>length
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>arr <span class="token operator">*</span>DynamicArray<span class="token punctuation">)</span> <span class="token function">Capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> arr<span class="token punctuation">.</span>capacity

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>arr <span class="token operator">*</span>DynamicArray<span class="token punctuation">)</span> <span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">NewDynamicArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>DynamicArray <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>DynamicArray<span class="token punctuation">{</span>
		data<span class="token punctuation">:</span>     <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> MaxSize<span class="token punctuation">)</span><span class="token punctuation">,</span>
		capacity<span class="token punctuation">:</span> MaxSize<span class="token punctuation">,</span>
		length<span class="token punctuation">:</span>   <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dynamic_arr <span class="token operator">:=</span> <span class="token function">NewDynamicArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	dynamic_arr<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> dynamic_arr<span class="token punctuation">.</span><span class="token function">Capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		dynamic_arr<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span>i<span class="token operator">+</span><span class="token number">100</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	dynamic_arr<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	dynamic_arr<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">88</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
	dynamic_arr<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_3-稀疏矩阵" tabindex="-1"><a class="header-anchor" href="#_3-稀疏矩阵" aria-hidden="true">#</a> 3.稀疏矩阵</h2>
<h3 id="_3-1-问题的引入" tabindex="-1"><a class="header-anchor" href="#_3-1-问题的引入" aria-hidden="true">#</a> 3.1 问题的引入</h3>
<p>如下所示的五子棋程序，有存盘退出和续上盘的功能：</p>
<img src="@source/go/算法与数据结构/img/稀疏矩阵-五子棋.png">
<p>如果使用二维数组来存储，就会如右侧所示存储很多为 0 的浪费空间</p>
<h3 id="_3-2-稀疏数组存储数据" tabindex="-1"><a class="header-anchor" href="#_3-2-稀疏数组存储数据" aria-hidden="true">#</a> 3.2 稀疏数组存储数据</h3>
<p>当一个数组中大部分元素为 0，或者为同一个值的数组时，可以使用稀疏数组来保存该数组，其处理方式为：</p>
<ul>
<li>记录数组一共有几行几列，有多少个不同的值</li>
<li>把具有不同值的元素的行列/值记录在一个小规模数组中</li>
</ul>
<p>如图所示：</p>
<img src="@source/go/算法与数据结构/img/稀疏矩阵-转换.png">
<p>图中的 <strong>row</strong>，<strong>col</strong>，<strong>val</strong> 分别代表有多少行，多少列，对应值，其中第一条数据 <strong>6</strong>，<strong>7</strong>，<strong>10</strong> 存储了左侧数据总计有 <strong>6</strong> 行，<strong>7</strong> 列，<strong>10</strong> 个不同值</p>
<h3 id="_3-3-实现" tabindex="-1"><a class="header-anchor" href="#_3-3-实现" aria-hidden="true">#</a> 3.3 实现</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> SparseNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	row <span class="token builtin">int</span>
	col <span class="token builtin">int</span>
	val <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> SparseArray <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data      <span class="token punctuation">[</span><span class="token punctuation">]</span>SparseNode
	lengthRow <span class="token builtin">int</span>
	lengthCol <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewSparseArray 将二维数组构建为稀疏矩阵</span>
<span class="token keyword">func</span> <span class="token function">NewSparseArray</span><span class="token punctuation">(</span>originArr <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>SparseArray <span class="token punctuation">{</span>
	<span class="token keyword">var</span> sparseArr <span class="token punctuation">[</span><span class="token punctuation">]</span>SparseNode
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> originArr <span class="token punctuation">{</span>
		<span class="token keyword">for</span> k2<span class="token punctuation">,</span> v2 <span class="token operator">:=</span> <span class="token keyword">range</span> v <span class="token punctuation">{</span>
			<span class="token keyword">if</span> v2 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				tempNode <span class="token operator">:=</span> SparseNode<span class="token punctuation">{</span>
					k<span class="token punctuation">,</span>
					k2<span class="token punctuation">,</span>
					v2<span class="token punctuation">,</span>
				<span class="token punctuation">}</span>
				sparseArr <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>sparseArr<span class="token punctuation">,</span> tempNode<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>

		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>SparseArray<span class="token punctuation">{</span>
		data<span class="token punctuation">:</span>      sparseArr<span class="token punctuation">,</span>
		lengthRow<span class="token punctuation">:</span> <span class="token function">len</span><span class="token punctuation">(</span>originArr<span class="token punctuation">)</span><span class="token punctuation">,</span>
		lengthCol<span class="token punctuation">:</span> <span class="token function">len</span><span class="token punctuation">(</span>originArr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// TransToArray 稀疏矩阵转二维数组</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>sa <span class="token operator">*</span>SparseArray<span class="token punctuation">)</span> <span class="token function">TransToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token comment">// 构建一个二维切片</span>
	originArr <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> sa<span class="token punctuation">.</span>lengthRow<span class="token punctuation">)</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> <span class="token keyword">range</span> originArr <span class="token punctuation">{</span>
		resultArr <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> sa<span class="token punctuation">.</span>lengthCol<span class="token punctuation">)</span>
		originArr<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> resultArr
	<span class="token punctuation">}</span>

	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> sa<span class="token punctuation">.</span>data <span class="token punctuation">{</span>
		originArr<span class="token punctuation">[</span>v<span class="token punctuation">.</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>v<span class="token punctuation">.</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> v<span class="token punctuation">.</span>val
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> originArr

<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	originArr <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span>
		<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>originArr<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>originArr<span class="token punctuation">)</span><span class="token punctuation">)</span>

	originArrI <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token operator">:=</span><span class="token keyword">range</span> originArrI <span class="token punctuation">{</span>
		inner <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
		originArrI<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> inner
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> originArr<span class="token punctuation">{</span>
		<span class="token keyword">for</span> k2<span class="token punctuation">,</span> v2 <span class="token operator">:=</span> <span class="token keyword">range</span> v <span class="token punctuation">{</span>
			originArrI<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">[</span>k2<span class="token punctuation">]</span> <span class="token operator">=</span> v2
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>originArrI<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>originArrI<span class="token punctuation">)</span><span class="token punctuation">)</span>

	sa <span class="token operator">:=</span> <span class="token function">NewSparseArray</span><span class="token punctuation">(</span>originArrI<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>sa<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>sa<span class="token punctuation">)</span><span class="token punctuation">)</span>

	reArr <span class="token operator">:=</span> sa<span class="token punctuation">.</span><span class="token function">TransToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>reArr<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>reArr<span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>reArr <span class="token operator">==</span> <span class="token operator">&amp;</span>originArrI<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


