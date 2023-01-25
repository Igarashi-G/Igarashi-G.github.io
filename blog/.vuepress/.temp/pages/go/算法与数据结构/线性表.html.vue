<template><div><p><strong>Golang</strong> 数据结构，各种表结构相关</p>
<!-- more -->
<h2 id="_1-线性表" tabindex="-1"><a class="header-anchor" href="#_1-线性表" aria-hidden="true">#</a> 1. 线性表</h2>
<h3 id="_1-1-线性表概述" tabindex="-1"><a class="header-anchor" href="#_1-1-线性表概述" aria-hidden="true">#</a> 1.1 线性表概述</h3>
<p>线性表（<em>linear_list</em>）是由 <strong>n</strong> 个 相同数据元素 组成的 有限序列，记做：</p>
<p><code v-pre>L = (a_1, a_2, ...,  a_n) (n\geq0)</code></p>
<p><strong>L</strong> 是表名，<strong>a</strong> 是表中的数据元素，也是不可分割的原子数据，称为 <strong>结点</strong> 或者 <strong>记录</strong>，<strong>n</strong> 是表的长度，也是元素的个数，当 <code v-pre>n=0</code> 时，表为空表</p>
<ul>
<li>
<p><strong>位序</strong>：在非空表中，元素按照顺序的位置（<em>从 <strong>1</strong> 开始到第 <strong>i</strong> 个</em>）即为元素的 <strong>位序</strong></p>
</li>
<li>
<p><strong>序列</strong>：元素之间是有序的</p>
</li>
<li>
<p><strong>有限</strong>：元素的数量是有限的，不过计算机中的对象都是有限的，无限数列只存在于数学概念中</p>
</li>
</ul>
<p>线性表的第一个元素称为 <strong>表头（head）</strong>，最后一个元素称为<strong>表尾（tail）</strong></p>
<p>同一个线性表中的 <strong>元素必定有相同的特性</strong>，即属于同一数据对象，且相邻数据元素之间存在序偶关系</p>
<p>在复杂的线性表中，一个数据元素有多个数据项（<em>item</em>）组成，此时常把数据元素称为记录（<em>record</em>），含有大量记录的线性表又称为文件（<em>file</em>）</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 线性表实例</span>
Color <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token char">'red'</span><span class="token punctuation">,</span> <span class="token char">'orange'</span><span class="token punctuation">,</span> <span class="token char">'yellow'</span><span class="token punctuation">,</span> <span class="token char">'green'</span><span class="token punctuation">)</span>
Dept <span class="token operator">=</span> <span class="token punctuation">(</span>建筑学<span class="token punctuation">,</span> 计算机<span class="token punctuation">,</span> 财会<span class="token punctuation">,</span> 生命科学<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-线性表的特点" tabindex="-1"><a class="header-anchor" href="#_1-2-线性表的特点" aria-hidden="true">#</a> 1.2 线性表的特点</h3>
<p>（1）线性表是有限的序列。线性表相邻元素可以构成序对，他们之间是有直接前驱和直接后继的逻辑关系的，当表非空时：</p>
<blockquote>
<p>一般情况下第一个元素无直接前驱，最后一个元素无直接后继
其他每个元素都有且只有一个直接前驱和直接后继，即相邻元素间是一对一关系</p>
</blockquote>
<p>（2）线性表中的每一个元素都有相同的数据类型</p>
<p>（3）线性表中的每一个元素都有 <strong>位置</strong>、<strong>值</strong>，位置也可以称为下标，决定了数据元素在表中的位置、前驱、后继的逻辑关系。<strong><code v-pre>一般定义数据元素位置从</code> 1 开始</strong></p>
<p>（4）线性表默认是无序表。其元素的值和位置之间可以有特定关系，也可以没有。比如有序表中的元素按照值的递增排列，无序表没有这种要求</p>
<h3 id="_1-3-线性表的划分" tabindex="-1"><a class="header-anchor" href="#_1-3-线性表的划分" aria-hidden="true">#</a> 1.3 线性表的划分</h3>
<p>线性表只是一种逻辑结构，在物理上它的存储可以是顺序的也可以是链式的。按照物理存储结构划分，线性表分为:</p>
<ul>
<li><strong>顺序表</strong>：顺序结构存储</li>
<li><strong>链表</strong>：链式结构存储</li>
</ul>
<p>链表的逻辑结构具体实现有两种方式：</p>
<ul>
<li><strong>动态链表</strong>：即常见的单链表、双向链表、循环链表的写法</li>
<li><strong>静态链表</strong>：底层不使用指针，而是使用数组实现结点的增删改查</li>
</ul>
<h3 id="_1-4-线性表与数组的区别" tabindex="-1"><a class="header-anchor" href="#_1-4-线性表与数组的区别" aria-hidden="true">#</a> 1.4 线性表与数组的区别</h3>
<ul>
<li><strong>物理上</strong>：线性表可以使用顺序存储，也可以使用链式存储</li>
<li><strong>逻辑上</strong>：数组并不一定是线性的，因为其元素可以是结构，枚举，类等，而线性表在逻辑上 <strong>必定是线性的</strong>（<em>即元素结构相同</em>）</li>
<li><strong>容量上</strong>：数组的长度一般是固定的，而 <strong>链表的长度支持动态改变（<em>类比动态数组</em>）</strong>，可以随时删减添加，并且能够知道元素个数</li>
<li><strong>维度上</strong>：<strong>数组是有维度</strong> 的，二维数组等明显和线性表不同</li>
</ul>
<hr>
<h2 id="_2-顺序表" tabindex="-1"><a class="header-anchor" href="#_2-顺序表" aria-hidden="true">#</a> 2. 顺序表</h2>
<h3 id="_2-1-顺序表概述" tabindex="-1"><a class="header-anchor" href="#_2-1-顺序表概述" aria-hidden="true">#</a> 2.1 顺序表概述</h3>
<p>顺序表是用一段地址连续的存储单元依次存储线性表的数据元素</p>
<p>顺序表是线性表在物理上顺序存储的具体实践，如图所示：</p>
<img src="@source/go/算法与数据结构/img/顺序表.svg">
<p>从图中看出顺序表的特点：</p>
<p>（1）顺序表的逻辑顺序与物理顺序一致，第 <strong>i</strong> 个元素存储于第 <strong>i - 1</strong> 的物理位置上
（2）顺序表的所有元素都可以进行随机访问、顺序访问（<em>下标访问</em>）
（3）顺序表中数据元素的数据类型即是其内部的数组的数据类型</p>
<p>如果一个数据元素占据了 <strong>c</strong> 个存储单元(<code v-pre>sizeof(ElemType)</code>)，那么第 <strong>i</strong> 个元素的存储位置为</p>
<p><code v-pre>LOC(a_i) = LOC(a_1) + i\times c</code></p>
<p>通过上述公式，可以随时计算出顺序表中任意位置的地址，不管是最后一个还是第一个，都是相同的时间</p>
<h3 id="_2-2-顺序表的结构与存取" tabindex="-1"><a class="header-anchor" href="#_2-2-顺序表的结构与存取" aria-hidden="true">#</a> 2.2 顺序表的结构与存取</h3>
<h4 id="基本结构" tabindex="-1"><a class="header-anchor" href="#基本结构" aria-hidden="true">#</a> 基本结构</h4>
<p>由于顺序表的特性，其底层可以采用数组进行存储，这个底层可以是静态数组，也可以是动态申请的数组</p>
<p>由于底层采用数组，顺序表的插入与删除也和数组的插入删除一样，会造成大量元素的移动</p>
<p>如果元素插入到最后一个位置，或者删除最后一个位置，那么之前的数据元素无需排序，此时是最好的情况，时间复杂度为 <strong>O(1)</strong>，因为不需要移动元素。如果是其他情况，则所有的数据元素都要进行移动，这个时间复杂度为 <strong>O(n)</strong></p>
<h4 id="查找效率" tabindex="-1"><a class="header-anchor" href="#查找效率" aria-hidden="true">#</a> 查找效率</h4>
<p>根据值查找位置时，如果查找的元素正好是第一位，则数据比较次数为 <strong>1</strong>，如果是最后第 <strong>n</strong> 位，则数据比较次数为 <strong>n</strong></p>
<p>若各个元素的查找概率为 <code v-pre>p_i</code>，找到该元素时数据比较次数为 <code v-pre>c_i</code>，那么查找的平均比较次数 <strong>ACN</strong>（<em>Average Comparing Number</em>）为：</p>
<p><code v-pre>ACN = \sum_{i=1}^n p_i \times c_i</code></p>
<p>若仅考虑概率相等的情况，有 <code v-pre>p_1 = p_2 = ... = p_n = 1/n</code>，且查找第一个元素的比较次数为 <strong>1</strong>，第二个元素的比较次数为 <strong>2</strong>，第一个元素的比较次数为 <strong>i</strong>，则：</p>
<p><code v-pre>ACN = \sum_{i=1}^n (\frac{1}{n}) \times i = \frac{1}{n} \sum_{i=1}^n i = (\frac{1}{n})  \times (1+2+...+n) = \frac{1+n}{2}</code></p>
<p>即查找要平均比较 <code v-pre>\frac{1+n}{2}</code> 个元素</p>
<h4 id="插入效率" tabindex="-1"><a class="header-anchor" href="#插入效率" aria-hidden="true">#</a> 插入效率</h4>
<p>插入到第 <strong>i</strong> 个元素位置之前<code v-pre>（1&lt;=i&lt;=n+1）</code>，应该把数组内的 <code v-pre>n - i + 1</code>  个元素向后移动一个位置。最好的情形是在最后一位插入，移动 <strong>0</strong> 个元素，最坏情形是在第一个元素位置插入，移动了 <strong>n</strong> 个元素，平均移动次数为</p>
<p><code v-pre>ACN = \frac{1}{n+1} \sum_{i=1}^{n+1} (n-i+1) = \frac{1}{n+1}  \times \frac{n(n+1)}{2} = \frac{n}{2}</code></p>
<h4 id="删除效率" tabindex="-1"><a class="header-anchor" href="#删除效率" aria-hidden="true">#</a> 删除效率</h4>
<p>删除最后一个元素，移动次数为 <strong>0</strong>，删除第一个元素时，移动次数为 <strong>n - 1</strong>，删除第 <strong>i</strong> 个元素，移动元素为第 <strong>i</strong> 个到第 <strong>n - 1</strong> 个，平均移动次数为：</p>
<p><code v-pre>ACN = \frac{1}{n} \sum_{i=1}^{n} (n-i) = \frac{1}{n}  \times \frac{n(n-1)}{2} = \frac{n-1}{2}</code></p>
<h3 id="_2-3-复杂度总结" tabindex="-1"><a class="header-anchor" href="#_2-3-复杂度总结" aria-hidden="true">#</a> 2.3 复杂度总结</h3>
<table>
<thead>
<tr>
<th>操作名</th>
<th>时间复杂度</th>
<th>空间复杂度</th>
</tr>
</thead>
<tbody>
<tr>
<td>初始化</td>
<td><code v-pre>O(1)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>插入</td>
<td><code v-pre>O(n)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>删除</td>
<td><code v-pre>O(n)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>查找</td>
<td><code v-pre>O(n)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>定位</td>
<td><code v-pre>O(1)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>求长度</td>
<td><code v-pre>O(1)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>清空</td>
<td><code v-pre>O(1)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
</tbody>
</table>
<h3 id="_2-4-实现" tabindex="-1"><a class="header-anchor" href="#_2-4-实现" aria-hidden="true">#</a> 2.4 实现</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> SqlList <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	size <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> maxSize <span class="token operator">=</span> <span class="token number">5</span>

<span class="token keyword">func</span> <span class="token function">NewSqlList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>SqlList <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>SqlList<span class="token punctuation">{</span>
		data<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> maxSize<span class="token punctuation">)</span><span class="token punctuation">,</span>
		size<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>SqlList<span class="token punctuation">)</span> <span class="token function">Insert</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size<span class="token operator">+</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"插入位置不合法"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	l<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token punctuation">:</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>e<span class="token punctuation">}</span><span class="token punctuation">,</span> l<span class="token punctuation">.</span>data<span class="token punctuation">[</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token operator">...</span><span class="token punctuation">)</span>
	l<span class="token punctuation">.</span>size<span class="token operator">++</span>

<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>SqlList<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"插入位置不合法"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> l<span class="token punctuation">.</span>size <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"空表，无元素可删"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	e <span class="token operator">:=</span> l<span class="token punctuation">.</span>data<span class="token punctuation">[</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>

	l<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token punctuation">:</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> l<span class="token punctuation">.</span>data<span class="token punctuation">[</span>index<span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token operator">...</span><span class="token punctuation">)</span>
	l<span class="token punctuation">.</span>size<span class="token operator">--</span>
	<span class="token keyword">return</span> e
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>SqlList<span class="token punctuation">)</span> <span class="token function">Update</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"插入位置不合法"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	l<span class="token punctuation">.</span>data<span class="token punctuation">[</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> e
	<span class="token keyword">return</span> e
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>SqlList<span class="token punctuation">)</span> <span class="token function">SearchByIndex</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"查询index不合法"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> l<span class="token punctuation">.</span>data<span class="token punctuation">[</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>SqlList<span class="token punctuation">)</span> <span class="token function">SearchByElement</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">.</span>size<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> l<span class="token punctuation">.</span>data<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> e <span class="token punctuation">{</span>
			<span class="token keyword">return</span> i
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>SqlList<span class="token punctuation">)</span> <span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	l<span class="token punctuation">.</span>size <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>SqlList<span class="token punctuation">)</span> <span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span>l<span class="token punctuation">.</span>size<span class="token punctuation">]</span><span class="token punctuation">,</span> l<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	sl <span class="token operator">:=</span> <span class="token function">NewSqlList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">46</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">71</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">}</span>
	sl<span class="token punctuation">.</span>size <span class="token operator">=</span> <span class="token number">6</span>
	sl<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>sl<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>sl<span class="token punctuation">)</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">888</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">999</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token number">777</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token number">777</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	sl<span class="token punctuation">.</span><span class="token function">SearchByIndex</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>sl<span class="token punctuation">.</span><span class="token function">SearchByIndex</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>sl<span class="token punctuation">.</span><span class="token function">SearchByElement</span><span class="token punctuation">(</span><span class="token number">55</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>sl<span class="token punctuation">.</span><span class="token function">SearchByElement</span><span class="token punctuation">(</span><span class="token number">71</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-单链表" tabindex="-1"><a class="header-anchor" href="#_3-单链表" aria-hidden="true">#</a> 3. 单链表</h2>
<h3 id="_3-1-链表概述" tabindex="-1"><a class="header-anchor" href="#_3-1-链表概述" aria-hidden="true">#</a> 3.1 链表概述</h3>
<p>顺序表的底层由数组实现，顺序表逻辑关系上的相邻元素在物理位置上也相邻，这让顺序表可以随机存取表中任一元素，但是在很多编程语言中，数组的长度是固定的，所以当数组已被数据填满时，再要加入新的元素就会非常困难。在数组中，添加和删除元素也很麻烦，因为需要将数组中的其他元素向前或向后移动</p>
<p>上述问题出现的原因是：所有的 <strong>元素存储位置都是相邻的，中间没有缝隙，也就不能快速插入</strong>，同样，删除后留下的空隙也需要弥补上</p>
<h5 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> <strong>链表</strong></h5>
<blockquote>
<p>用一组任意的存储单元存储线性表中的数据元素，其存储单元可以是连续的，也可以是不连续的</p>
</blockquote>
<p>最简单的链式结构就是单向链表，如图所示：<br>
<img src="@source/go/算法与数据结构/img/单链表.svg"></p>
<p>对于 <strong>插入或者删除数据越频繁</strong> 的操作，链表的效率优势越明显</p>
<h3 id="_3-2-链表的结点" tabindex="-1"><a class="header-anchor" href="#_3-2-链表的结点" aria-hidden="true">#</a> 3.2 链表的结点</h3>
<p>链表的定义意味着链表的数据元素可以利用内存中未被占用的任意位置，那么我们需要知道数据元素的前驱、后继时就无法像顺序表那样直接利用索引来查询了，所以在链表的数据结构中，除了要存储数据元素信息外，至少还要存储它的后继元素的存储地址</p>
<p><strong>结点 node</strong>：</p>
<blockquote>
<p>链表中的每个数据元素 <code v-pre>a_i</code>，既要存储本身信息，也要存储后继信息，这两部分组成的数据元素 <code v-pre>a_i</code> 称为结点（<em>node</em>）</p>
</blockquote>
<p>一个结点包含两个域：</p>
<ul>
<li>数据域：存储数据元素信息</li>
<li>指针域：存储直接后继的位置，指针域中存储的信息称为指针或者链</li>
</ul>
<p><strong>n</strong> 个结点链结成了一个链表，即是线性表的链式存储结构</p>
<h3 id="_3-3-头指针" tabindex="-1"><a class="header-anchor" href="#_3-3-头指针" aria-hidden="true">#</a> 3.3 头指针</h3>
<p>头指针即是指向链表第一个元素的指针，沿着头指针可以直接查找到链表中的所有元素位置，所以可以在数据结构中使用头指针来表示链表</p>
<p>如下图所示：</p>
<img src="@source/go/算法与数据结构/img/单链表-头指针.svg">
<p>头指针指向第一个结点（<em>首元结点</em>），是链表的标识，常用头指针冠以链表的名字，所以头结点是链表必备的！</p>
<h3 id="_3-4-头结点" tabindex="-1"><a class="header-anchor" href="#_3-4-头结点" aria-hidden="true">#</a> 3.4 头结点</h3>
<p>为了方便对链表进行操作，有时候会在链表的第一个结点前附设一个结点，称为头结点。<strong>头结点的数据域一般不存储任何信息</strong>，或者存储如线性表的长度等附加信息。<strong>头结点的指针域存储指向第一个结点的指针</strong></p>
<p>如图所示：</p>
<img src="@source/go/算法与数据结构/img/单链表-头结点.svg">
<p>如果一个链表带有头结点，则头指针指向头结点（<em>因为头结点是第一个结点</em>）</p>
<p>头结点不是链表必备的，头结点的存在是为了方便操作，如：第一个结点的插入、第一个结点的删除在有头结点时操作更简单</p>
<p>有些场景下，也会有尾结点，链表最后一个元素指向尾结点 ，尾结点的 <strong>next</strong> 为空，这样的行为均是为了一些操作的简便</p>
<h3 id="_3-5单链表定义总结" tabindex="-1"><a class="header-anchor" href="#_3-5单链表定义总结" aria-hidden="true">#</a> 3.5单链表定义总结</h3>
<h4 id="单链表" tabindex="-1"><a class="header-anchor" href="#单链表" aria-hidden="true">#</a> 单链表</h4>
<blockquote>
<p>链表的指针域中只包含一个指针域，即称为线性链表或者单链表</p>
</blockquote>
<p>单链表的最后一个元素没有直接后继，即其指针为空，带头结点的单链表如下所示：</p>
<img src="@source/go/算法与数据结构/img/单链表-头结点.svg">
<p>但是如果我们不知道第 <strong>i</strong> 个结点的位置，单链表数据结构在插入和删除操作上，与线性表的顺序存储结构相比没有太大优势。一旦知道精确的位置，无论插入多少个元素，找到第 <strong>i</strong> 位置的指针复杂度为 <strong>O(n)</strong>，但是插入只是简单的移动指针，时间复杂度都是 <strong>O(1)</strong>，而顺序表，每次移动都是 <strong>O(n)</strong></p>
<h4 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h4>
<p>1）单链表的数据元素的逻辑顺序与物理顺序可能不一致，只能依靠结点的指针将各个数据元素连接起来</p>
<p>2）单链表的长度是可以扩充的</p>
<p>3）<strong>对单链表的遍历、查找只能从头指针指向的首元结点开始，然后逐个访问</strong></p>
<p>4）插入删除很方便，因为只需要修改相关结点的指针域即可</p>
<p>5）由于表内额外存储了指针域，同样的数据，<strong>比顺序表占据空间更多</strong></p>
<h4 id="抽象数据类型" tabindex="-1"><a class="header-anchor" href="#抽象数据类型" aria-hidden="true">#</a> 抽象数据类型</h4>
<p>定义链单链表每个结点名为 <strong>Node</strong>，其链表名为 <strong>LinkList</strong>，这里采用带头结点的做法</p>
<p>取巧的地方是：<strong>LinkList</strong> 本身其实可以看做一个 <strong>Node</strong>，即头结点，<strong>内部的指针域是链表的首元结点，数据域是链表的长度</strong></p>
<h4 id="常见操作" tabindex="-1"><a class="header-anchor" href="#常见操作" aria-hidden="true">#</a> 常见操作</h4>
<p>插入操作其实是拆除原有两个结点之间的链接，将前一个结点链向插入元素，将插入元素链向后面的元素，如图所示：</p>
<img src="@source/go/算法与数据结构/img/单链表-插入结点.svg">
<p>上面是带头结点的单链表，插入时不会插入在头结点位置，即元素只会插入在 <strong>a1</strong> 处及其之后。</p>
<p>如果是没有头结点的单链表，插入操作较为复杂，需要额外考虑：插入位置为 <strong>1</strong> 号位时，即首元结点位置，需要修改头指针指向新插入元素！</p>
<p>删除算法同理，也是要拆除要删除元素的链条，重新链接其前后 <strong>2</strong> 个元素，如果单链表没有头结点，也要考虑删除首元结点的情况。</p>
<h4 id="复杂度" tabindex="-1"><a class="header-anchor" href="#复杂度" aria-hidden="true">#</a> 复杂度</h4>
<table>
<thead>
<tr>
<th>操作名</th>
<th>时间复杂度</th>
<th>空间复杂度</th>
</tr>
</thead>
<tbody>
<tr>
<td>初始化</td>
<td><code v-pre>O(1)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>插入</td>
<td><code v-pre>O(n)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>删除</td>
<td><code v-pre>O(n)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>查找</td>
<td><code v-pre>O(n)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>定位</td>
<td><code v-pre>O(n)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>求长度</td>
<td><code v-pre>O(1)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
<tr>
<td>清空</td>
<td><code v-pre>O(n)</code></td>
<td><code v-pre>O(1)</code></td>
</tr>
</tbody>
</table>
<p>如果头结点并未保存长度，则求长度时间复杂度为 <code v-pre>O(n)</code></p>
<h3 id="_3-6-实现" tabindex="-1"><a class="header-anchor" href="#_3-6-实现" aria-hidden="true">#</a> 3.6 实现</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token comment">// Node 单链表结点类型</span>
<span class="token keyword">type</span> Node <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	next <span class="token operator">*</span>Node
<span class="token punctuation">}</span>

<span class="token comment">// LinkList 单链表</span>
<span class="token keyword">type</span> LinkList <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	head <span class="token operator">*</span>Node
	size <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// newNode 构造Node</span>
<span class="token keyword">func</span> <span class="token function">newNode</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>Node <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Node<span class="token punctuation">{</span>
		data<span class="token punctuation">:</span> e<span class="token punctuation">,</span>
		next<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewLinkList 构造单链表</span>
<span class="token keyword">func</span> <span class="token function">NewLinkList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>LinkList <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> <span class="token function">newNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>LinkList<span class="token punctuation">{</span>
		head<span class="token punctuation">:</span> p<span class="token punctuation">,</span>
		size<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Locate 定位：根据位置查询结点地址</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LinkList<span class="token punctuation">)</span> <span class="token function">Locate</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>Node <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size<span class="token operator">+</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"获取位置不合法"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> p
<span class="token punctuation">}</span>

<span class="token comment">// Insert 插入节点</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LinkList<span class="token punctuation">)</span> <span class="token function">Insert</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size<span class="token operator">+</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"插入位置不合法"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	node <span class="token operator">:=</span> <span class="token function">newNode</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>

	node<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">.</span>next
	p<span class="token punctuation">.</span>next <span class="token operator">=</span> node
	l<span class="token punctuation">.</span>size<span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LinkList<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"删除位置有误"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 找到删除位置的前一个位置</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 执行删除</span>
	tempData <span class="token operator">:=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>data
	p<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next

	l<span class="token punctuation">.</span>size<span class="token operator">--</span>
	<span class="token keyword">return</span> tempData
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LinkList<span class="token punctuation">)</span> <span class="token function">Update</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"更新位置有误"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>

	node <span class="token operator">:=</span> <span class="token function">newNode</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
	node<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next
	p<span class="token punctuation">.</span>next <span class="token operator">=</span> node
	<span class="token keyword">return</span> e
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LinkList<span class="token punctuation">)</span> <span class="token function">UpdateDate</span><span class="token punctuation">(</span>data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span><span class="token function">Locate</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
	<span class="token keyword">if</span> p <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	p<span class="token punctuation">.</span>data <span class="token operator">=</span> data
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LinkList<span class="token punctuation">)</span> <span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 仅保留头节点</span>
	l<span class="token punctuation">.</span>size <span class="token operator">=</span> <span class="token number">0</span>
	l<span class="token punctuation">.</span>head<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LinkList<span class="token punctuation">)</span> <span class="token function">Search</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>Node <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> p<span class="token punctuation">.</span>data <span class="token operator">==</span> e <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> p<span class="token punctuation">.</span>data <span class="token operator">==</span> e <span class="token punctuation">{</span>
		<span class="token keyword">return</span> p
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>LinkList<span class="token punctuation">)</span> <span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> l<span class="token punctuation">.</span>size <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"空链表"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	pos <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> pos <span class="token operator">==</span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span> <span class="token comment">//最后一位</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">"->"</span><span class="token punctuation">)</span>
			p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
			pos<span class="token operator">++</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	link_l <span class="token operator">:=</span> <span class="token function">NewLinkList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>link_l<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>link_l<span class="token punctuation">)</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token number">888</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">233</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	link_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-循环链表" tabindex="-1"><a class="header-anchor" href="#_4-循环链表" aria-hidden="true">#</a> 4. 循环链表</h2>
<p>循环链表（<em>circular linked list</em>）是另外一种形式的线性链表，其特征是：最后一个结点的指针域不再指向 NULL，而是指向首元结点，整个链表形成了一个闭合的环</p>
<p>由上可得知：在循环链表中从任意一个结点出发，均可以找到其他的结点。如图所示一个带头结点的循环链表：</p>
<img src="@source/go/算法与数据结构/img/循环链表.svg">
<h3 id="_4-1-循环链表制作思路" tabindex="-1"><a class="header-anchor" href="#_4-1-循环链表制作思路" aria-hidden="true">#</a> 4.1 循环链表制作思路</h3>
<p>循环链表的操作和线性表一致，差别进在于算法中循环的条件不再是 <code v-pre>p-&gt;next == NULL</code> ，而是 <code v-pre>p-&gt;next == head</code></p>
<p>对于空表来说：首元结点指针域指向自己</p>
<p>有时，循环链表中还会设定尾指针，可以让一些操作简化，如合并两个链表时，仅需要将一个表的表尾和另一个表的表头相接，如果有尾指针，其时间复杂度就是 O(1)。同样插入头部、尾部的时间复杂度也都降低到了 O(1)</p>
<h3 id="_4-2-实现" tabindex="-1"><a class="header-anchor" href="#_4-2-实现" aria-hidden="true">#</a> 4.2 实现</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token comment">// CircleNode 循环链表结点类型</span>
<span class="token keyword">type</span> CircleNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	next <span class="token operator">*</span>CircleNode
<span class="token punctuation">}</span>

<span class="token comment">// CircleList 循环链表</span>
<span class="token keyword">type</span> CircleList <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	head <span class="token operator">*</span>CircleNode
	size <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// newCircleNode 构造循环节点</span>
<span class="token keyword">func</span> <span class="token function">newCircleNode</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>CircleNode <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>CircleNode<span class="token punctuation">{</span>
		data<span class="token punctuation">:</span> e<span class="token punctuation">,</span>
		next<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewCircleList 构造循环链表</span>
<span class="token keyword">func</span> <span class="token function">NewCircleList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>CircleList <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> <span class="token function">newCircleNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
	p<span class="token punctuation">.</span>next <span class="token operator">=</span> p <span class="token comment">// 尾指针指向头</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>CircleList<span class="token punctuation">{</span>
		head<span class="token punctuation">:</span> p<span class="token punctuation">,</span>
		size<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Locate 定位：根据位置查询结点地址</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>CircleList<span class="token punctuation">)</span> <span class="token function">Locate</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>CircleNode <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size<span class="token operator">+</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"获取位置不合法"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token comment">// 循环链表，判断是否下个指针域指向头结点</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> l<span class="token punctuation">.</span>head <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> p
<span class="token punctuation">}</span>

<span class="token comment">// Insert 插入节点</span>
<span class="token comment">// 带头结点的链表，插入时只能在头结点之后插入，也不允许插入超过最大元素个数的位置</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>CircleList<span class="token punctuation">)</span> <span class="token function">Insert</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size<span class="token operator">+</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"插入位置不合法"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 找到插入位置的前一个位置</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> l<span class="token punctuation">.</span>head <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 创建要插入的结点</span>
	node <span class="token operator">:=</span> <span class="token function">newCircleNode</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
	node<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">.</span>next
	p<span class="token punctuation">.</span>next <span class="token operator">=</span> node

	l<span class="token punctuation">.</span>size<span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>CircleList<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"删除位置有误"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 找到删除位置的前一个位置</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> l<span class="token punctuation">.</span>head <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 执行删除</span>
	tempData <span class="token operator">:=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>data
	p<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next

	l<span class="token punctuation">.</span>size<span class="token operator">--</span>
	<span class="token keyword">return</span> tempData
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>CircleList<span class="token punctuation">)</span> <span class="token function">UpdateDate</span><span class="token punctuation">(</span>data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span><span class="token function">Locate</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
	<span class="token keyword">if</span> p <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	p<span class="token punctuation">.</span>data <span class="token operator">=</span> data
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>CircleList<span class="token punctuation">)</span> <span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 仅保留头节点</span>
	l<span class="token punctuation">.</span>size <span class="token operator">=</span> <span class="token number">0</span>
	l<span class="token punctuation">.</span>head<span class="token punctuation">.</span>next <span class="token operator">=</span> l<span class="token punctuation">.</span>head
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>CircleList<span class="token punctuation">)</span> <span class="token function">Search</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>CircleNode <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> l<span class="token punctuation">.</span>head <span class="token punctuation">{</span>
		<span class="token keyword">if</span> p<span class="token punctuation">.</span>data <span class="token operator">==</span> e <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> p<span class="token punctuation">.</span>data <span class="token operator">==</span> e <span class="token punctuation">{</span>
		<span class="token keyword">return</span> p
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>CircleList<span class="token punctuation">)</span> <span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> l<span class="token punctuation">.</span>size <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"空循环链表"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	pos <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> p <span class="token punctuation">{</span>
		<span class="token keyword">if</span> pos <span class="token operator">==</span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span> <span class="token comment">//最后一位</span>
			fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">"->"</span><span class="token punctuation">,</span> l<span class="token punctuation">.</span>head<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">"->...\n"</span><span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">"->"</span><span class="token punctuation">)</span>
			p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
			pos<span class="token operator">++</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	circle_l <span class="token operator">:=</span> <span class="token function">NewCircleList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>circle_l<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>circle_l<span class="token punctuation">)</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">UpdateDate</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">888</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">233</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	circle_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-双向链表" tabindex="-1"><a class="header-anchor" href="#_5-双向链表" aria-hidden="true">#</a> 5. 双向链表</h2>
<h3 id="_5-1-双向链表概述" tabindex="-1"><a class="header-anchor" href="#_5-1-双向链表概述" aria-hidden="true">#</a> 5.1 双向链表概述</h3>
<p>单链表和循环链表的结点都仅仅只有一个指示后继的指针域，查找后继的时间复杂度为 O(1)，而查找前驱的时间复杂度为 O(n)，因为每次都要从头开始遍历查找</p>
<p>为了解决链表中访问直接前驱问题，单链表中的每个节点可以使用两个指针：</p>
<ul>
<li><strong>next</strong>：后继指针，这是单链表节点原有的指针</li>
<li><strong>prev</strong>：前驱指针，额外引入的指向上一个结点的指针</li>
</ul>
<img src="@source/go/算法与数据结构/img/双链表.svg">
<p>有了这两个指针的链表可以称为双向链表（<em>简称双链表</em>），<strong>在双链表中，查找前驱、后继的时间复杂度都为 <code v-pre>O(1)</code></strong></p>
<h3 id="_5-2-双向循环链表概述" tabindex="-1"><a class="header-anchor" href="#_5-2-双向循环链表概述" aria-hidden="true">#</a> 5.2 双向循环链表概述</h3>
<p>双向链表通常使用带头结点的方式实现，为了查找其节点的前驱、后继，首元节点的 <strong>prev</strong> 指针指向其最后一个元素，最后一个元素的 <strong>next</strong> 指针指向首元节点，这样的链表称为 <strong>双向循环链表</strong></p>
<p>如图所示：</p>
<img src="@source/go/算法与数据结构/img/双向循环链表.svg">
<p>如果一个双向循环链表为空，则其头节点的前驱、后继都是自己</p>
<p><strong>实际开发中，双向循环链表由于各项性能较高，使用较为广泛</strong></p>
<h3 id="_5-3-实现" tabindex="-1"><a class="header-anchor" href="#_5-3-实现" aria-hidden="true">#</a> 5.3 实现</h3>
<p>循环链表比起单链表的改变，大多情况下都是 <strong>for、while循环</strong> 中判断结点 <strong>next 是否为空</strong>，改为 <strong>结点 next 是否为头结点</strong> ，所以下略简单的循环链表等数据结构</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"reflect"</span>
<span class="token punctuation">)</span>

<span class="token comment">// DblNode 双向循环链表结点类型</span>
<span class="token keyword">type</span> DblNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	next <span class="token operator">*</span>DblNode
	prev <span class="token operator">*</span>DblNode
<span class="token punctuation">}</span>

<span class="token comment">// DblList 双向循环链表</span>
<span class="token keyword">type</span> DblList <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	head <span class="token operator">*</span>DblNode
	size <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// newDblNode 构造双向循环链表节点</span>
<span class="token keyword">func</span> <span class="token function">newDblNode</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>DblNode <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>DblNode<span class="token punctuation">{</span>
		data<span class="token punctuation">:</span> e<span class="token punctuation">,</span>
		next<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span>
		prev<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// NewDblList 构造双向循环链表</span>
<span class="token keyword">func</span> <span class="token function">NewDblList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>DblList <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> <span class="token function">newDblNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
	p<span class="token punctuation">.</span>next <span class="token operator">=</span> p <span class="token comment">// 后/尾指针指向头</span>
	p<span class="token punctuation">.</span>prev <span class="token operator">=</span> p <span class="token comment">// 前指针指向头</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>DblList<span class="token punctuation">{</span>
		head<span class="token punctuation">:</span> p<span class="token punctuation">,</span>
		size<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>DblList<span class="token punctuation">)</span> <span class="token function">Locate</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>DblNode <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size<span class="token operator">+</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"查询位置有误"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> p <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> p
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>DblList<span class="token punctuation">)</span> <span class="token function">Insert</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size<span class="token operator">+</span><span class="token number">1</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"插入位置有误"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token comment">// 插入的前一个位置</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> l<span class="token punctuation">.</span>head <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>

	node <span class="token operator">:=</span> <span class="token function">newDblNode</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
	<span class="token comment">// 新结点后继 指向原下个节点</span>
	node<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">.</span>next
	<span class="token comment">// 新结点前驱 指向插入前一个位置的结点</span>
	node<span class="token punctuation">.</span>prev <span class="token operator">=</span> p
	<span class="token comment">// 之前的下个结点的前驱 指向插入结点</span>
	p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>prev <span class="token operator">=</span> node

	<span class="token comment">// 执行插入 前置节点后继 指向新结点</span>
	p<span class="token punctuation">.</span>next <span class="token operator">=</span> node

	l<span class="token punctuation">.</span>size<span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>DblList<span class="token punctuation">)</span> <span class="token function">Delete</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"删除位置有误"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token comment">// 删除的前一个位置</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> l<span class="token punctuation">.</span>head <span class="token operator">&amp;&amp;</span> k <span class="token operator">&lt;</span> index<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>

	tempDate <span class="token operator">:=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>data
	<span class="token comment">// 执行删除 后继的后继的前驱 指向删除前一个位置的节点</span>
	p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">.</span>prev <span class="token operator">=</span> p
	<span class="token comment">// 后继指向 后继的后继结点</span>
	p<span class="token punctuation">.</span>next <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next

	l<span class="token punctuation">.</span>size<span class="token operator">--</span>
	<span class="token keyword">return</span> tempDate
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>DblList<span class="token punctuation">)</span> <span class="token function">UpdateDate</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	p <span class="token operator">:=</span> l<span class="token punctuation">.</span><span class="token function">Locate</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span>
	<span class="token keyword">if</span> p <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	p<span class="token punctuation">.</span>data <span class="token operator">=</span> e
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>DblList<span class="token punctuation">)</span> <span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	l<span class="token punctuation">.</span>head<span class="token punctuation">.</span>next <span class="token operator">=</span> l<span class="token punctuation">.</span>head
	l<span class="token punctuation">.</span>head<span class="token punctuation">.</span>prev <span class="token operator">=</span> l<span class="token punctuation">.</span>head
	l<span class="token punctuation">.</span>size <span class="token operator">=</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>DblList<span class="token punctuation">)</span> <span class="token function">Search</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>DblNode <span class="token punctuation">{</span>
	<span class="token keyword">if</span> l<span class="token punctuation">.</span>size <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"空双循环链表不存在结点"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> l<span class="token punctuation">.</span>head <span class="token punctuation">{</span>
		<span class="token keyword">if</span> p<span class="token punctuation">.</span>data <span class="token operator">==</span> e <span class="token punctuation">{</span>
			<span class="token keyword">return</span> p
		<span class="token punctuation">}</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
	<span class="token punctuation">}</span>
	<span class="token comment">// 针对尾结点的判断</span>
	<span class="token keyword">if</span> p<span class="token punctuation">.</span>data <span class="token operator">==</span> e <span class="token punctuation">{</span>
		<span class="token keyword">return</span> p
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>DblList<span class="token punctuation">)</span><span class="token function">prevElement</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>DblNode  <span class="token punctuation">{</span>
	node <span class="token operator">:=</span> l<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
	<span class="token keyword">if</span> node <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"未找到该元素"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> node<span class="token punctuation">.</span>prev
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>DblList<span class="token punctuation">)</span><span class="token function">nextElement</span><span class="token punctuation">(</span>e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">*</span>DblNode  <span class="token punctuation">{</span>
	node <span class="token operator">:=</span> l<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
	<span class="token keyword">if</span> node <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"未找到该元素"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> node<span class="token punctuation">.</span>next
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>DblList<span class="token punctuation">)</span> <span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> l<span class="token punctuation">.</span>size <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"空双循环链表"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	p <span class="token operator">:=</span> l<span class="token punctuation">.</span>head
	k <span class="token operator">:=</span> <span class="token number">0</span>
	<span class="token keyword">for</span> p<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> k <span class="token operator">==</span> l<span class="token punctuation">.</span>size <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">" &lt;-> "</span><span class="token punctuation">,</span> l<span class="token punctuation">.</span>head<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">" &lt;-> ...\n"</span><span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>data<span class="token punctuation">,</span> <span class="token string">" &lt;-> "</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		p <span class="token operator">=</span> p<span class="token punctuation">.</span>next
		k<span class="token operator">++</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dbl_l <span class="token operator">:=</span> <span class="token function">NewDblList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>dbl_l<span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">TypeOf</span><span class="token punctuation">(</span>dbl_l<span class="token punctuation">)</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">23</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">UpdateDate</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">888</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Insert</span><span class="token punctuation">(</span><span class="token number">233</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	node <span class="token operator">:=</span> dbl_l<span class="token punctuation">.</span><span class="token function">Search</span><span class="token punctuation">(</span><span class="token number">233</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"node:"</span><span class="token punctuation">,</span> node<span class="token punctuation">)</span>
	prev_node <span class="token operator">:=</span> dbl_l<span class="token punctuation">.</span><span class="token function">prevElement</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"prev_node:"</span><span class="token punctuation">,</span> prev_node<span class="token punctuation">)</span>
	next_node <span class="token operator">:=</span> dbl_l<span class="token punctuation">.</span><span class="token function">nextElement</span><span class="token punctuation">(</span><span class="token number">22</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"next_node:"</span><span class="token punctuation">,</span> next_node<span class="token punctuation">)</span>
	dbl_l<span class="token punctuation">.</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-静态链表" tabindex="-1"><a class="header-anchor" href="#_6-静态链表" aria-hidden="true">#</a> 6. 静态链表</h2>
<h3 id="_6-1-静态链表概述" tabindex="-1"><a class="header-anchor" href="#_6-1-静态链表概述" aria-hidden="true">#</a> 6.1 静态链表概述</h3>
<p>在具备指针概念的语言，如 <strong>Go</strong>、<strong>C</strong>、<strong>C++</strong> 中，由于指针的存在，能够灵活的操作内存中的地址和数据。<strong>Java</strong>、<strong>JavaScript</strong> 等语言虽然不具备指针，但是其对象引用机制其实也间接具备了指针的很多功能。但对于一些上古语言，如 <strong>Basic</strong>、<strong>Fortran</strong>，完全没有指针的概念，链表的实现就会出现困难。</p>
<p>我们可以另辟蹊径，使用数组描述单链表及其元素，即：数组中每个元素可以看做一个结点结构，包含数据 <strong>data</strong> 与指针 <strong>cur</strong>：</p>
<ul>
<li><strong>data</strong>：存储该结点存储的数据</li>
<li><strong>cur</strong>：其实就是数组下标，表示直接后继元素所在数组中的位置</li>
</ul>
<p>这种用数组的游标描述的链表叫做<strong>静态链表</strong>，也叫链表的<strong>游标实现法</strong>。</p>
<p>静态链表需要预先分配一个较大的空间，但是在做插入和删除时无需移动数组内部的元素，仅需要修改元素的游标即可！故仍具有链式存储结构的优点</p>
<h3 id="_6-2-静态链表的实现解释" tabindex="-1"><a class="header-anchor" href="#_6-2-静态链表的实现解释" aria-hidden="true">#</a> 6.2 静态链表的实现解释</h3>
<h4 id="静态链表基本结构" tabindex="-1"><a class="header-anchor" href="#静态链表基本结构" aria-hidden="true">#</a> 静态链表基本结构</h4>
<p>静态链表结构如图：</p>
<img src="@source/go/算法与数据结构/img/静态链表结构.svg">
<p>解释如下：</p>
<ul>
<li>通常静态链表会将第一个数据元素放到数组下标为 1 的位置中</li>
<li>数组索引 0 位置的 cur 存储的是没有存放数据的第一个元素，即下标为 4 的元素</li>
<li>其他元素的游标都是直接指向它的下一个元素的下标</li>
<li>末尾元素的 cur 可以存放首个有值数据的索引</li>
</ul>
<h4 id="备用链表" tabindex="-1"><a class="header-anchor" href="#备用链表" aria-hidden="true">#</a> 备用链表</h4>
<p>静态链表中，除了数据本身通过游标组成的链表外，还需要有一条连接各个空闲位置的链表，称为备用链表。备用链表的作用是回收数组中未使用或之前使用过（<em>目前未使用</em>）的存储空间，留待后期使用</p>
<p>也就是说，静态链表使用数组申请的物理空间中，存有两个链表，一条连接数据，另一条连接数组中未使用的空间</p>
<p>通常，备用链表的表头位于数组下标为 <strong>0</strong> 的位置，而数据链表的表头位于数组下标为 <strong>1</strong> 的位置</p>
<h3 id="_6-3-静态链表初始化与数据变更" tabindex="-1"><a class="header-anchor" href="#_6-3-静态链表初始化与数据变更" aria-hidden="true">#</a> 6.3 静态链表初始化与数据变更</h3>
<p>在数据链表未初始化之前，数组中所有位置都处于空闲状态，因此都应被链接在备用链表上，当向静态链表中添加数据时，需提前从备用链表中摘除节点，以供新数据使用</p>
<p>备用链表摘除节点最简单的方法是摘除 索引 0 的直接后继节点；同样，向备用链表中添加空闲节点也是添加作为 索引 0 新的直接后继节点。因为 索引 0 是备用链表的第一个节点，我们知道它的位置，操作它的直接后继节点相对容易，无需遍历备用链表，耗费的时间复杂度为 O(1)</p>
<h3 id="_6-4-静态链表实际演示" tabindex="-1"><a class="header-anchor" href="#_6-4-静态链表实际演示" aria-hidden="true">#</a> 6.4 静态链表实际演示</h3>
<p>假设现在要存储 <code v-pre>{'A', 'B'}</code>：</p>
<p>第一步：初始化一个静态链表，其实是创建了一个长度为 7 的备用链表，用于存储 5 个数据。如图：</p>
<img src="@source/go/算法与数据结构/img/静态链表1.svg">
<p>第二步：插入元素 'A'，第一个元素位于数组索引 1 上，如图修改备用链表表头索引：</p>
<img src="@source/go/算法与数据结构/img/静态链表2.svg">
<p>第三步：插入元素 'B'：</p>
<img src="@source/go/算法与数据结构/img/静态链表3.svg">
<h3 id="_6-5-静态链表的优缺点" tabindex="-1"><a class="header-anchor" href="#_6-5-静态链表的优缺点" aria-hidden="true">#</a> 6.5 静态链表的优缺点</h3>
<p><strong>优点</strong>：在插入和删除时，只需要修改游标，不需要移动元素，改进了顺序存储结构中插入和删除元素需要移动大量元素的缺点</p>
<p><strong>缺点</strong>：</p>
<ul>
<li>没有解决连续存储分配带来的表长难以确定问题</li>
<li>失去了顺序存储结构随机存取的特性</li>
</ul>
<h3 id="_6-6-实现" tabindex="-1"><a class="header-anchor" href="#_6-6-实现" aria-hidden="true">#</a> 6.6 实现</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/**
 *  静态链表：StaticList
 * 链表内部结构应该杜绝指针，因为静态链表本就是为了无指针场景
 *  一般静态链表内部的数组第一个元素、最后一个元素不存储数据
 *  游标cur为0时，表示无指向
 *  下标为0的元素的cur存放备用链表的第一个结点的下标（备用链表即未被使用的数组元素）
 */</span>

<span class="token keyword">package</span> staticlist

<span class="token keyword">import</span> <span class="token punctuation">(</span>
 <span class="token string">"errors"</span>
 <span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 静态链表中元素结点</span>
<span class="token keyword">type</span> node <span class="token keyword">struct</span> <span class="token punctuation">{</span>
 data  <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
 cur   <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token comment">// 静态链表结构体</span>
<span class="token keyword">type</span> StaticList <span class="token keyword">struct</span> <span class="token punctuation">{</span>
 size  <span class="token builtin">int</span>
 length  <span class="token builtin">int</span>
 arr   <span class="token punctuation">[</span><span class="token punctuation">]</span>node
<span class="token punctuation">}</span>

 <span class="token comment">// 构造实例：其实是构造一个备用链表</span>
<span class="token keyword">func</span> <span class="token function">NewStaticList</span><span class="token punctuation">(</span>size <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>StaticList <span class="token punctuation">{</span>

 <span class="token keyword">if</span> size <span class="token operator">&lt;</span> <span class="token number">3</span> <span class="token punctuation">{</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"数组长度最少为3"</span><span class="token punctuation">)</span>
  <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"数组长度最少为3"</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span>

 arr <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>node<span class="token punctuation">,</span> size<span class="token punctuation">)</span>
 <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
  arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>cur <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 数组的最后一位的cur为0</span>
 arr<span class="token punctuation">[</span>size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cur <span class="token operator">=</span> <span class="token number">0</span>

 <span class="token keyword">return</span> <span class="token operator">&amp;</span>StaticList<span class="token punctuation">{</span>
  size<span class="token punctuation">:</span>  size<span class="token punctuation">,</span>
  length<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  arr<span class="token punctuation">:</span> arr<span class="token punctuation">,</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 打印线性表</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>StaticList<span class="token punctuation">)</span> <span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

 fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"数据结构长度：%d，容量：%d\n"</span><span class="token punctuation">,</span> l<span class="token punctuation">.</span>length<span class="token punctuation">,</span> l<span class="token punctuation">.</span>size<span class="token punctuation">)</span>

 <span class="token keyword">if</span> l<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span>
 <span class="token punctuation">}</span>

 fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"数据元素显示："</span><span class="token punctuation">)</span>
 <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> l<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
  fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%d "</span><span class="token punctuation">,</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>data<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
 fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 增：任意位置插入元素</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>StaticList<span class="token punctuation">)</span> <span class="token function">Insert</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">,</span> e <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>

 <span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">{</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"位序不合法"</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"位序不合法"</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span>

 <span class="token comment">// 获取空闲分量的下标:取出一个元素，并将数组第一位的cur修改为数组的下一个元素的cur</span>
 freeIndex <span class="token operator">:=</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cur
 l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cur <span class="token operator">=</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>freeIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>cur  <span class="token comment">// 必须用下一个分量作为备用</span>


 <span class="token comment">// 将数据赋值给取出的这个分量</span>
 l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>freeIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>data <span class="token operator">=</span> e

 <span class="token comment">// 找到第index个元素之前的位置</span>
 <span class="token keyword">var</span> updIndex <span class="token operator">=</span> l<span class="token punctuation">.</span>size <span class="token operator">-</span> <span class="token number">1</span>
 <span class="token keyword">for</span> preIndex <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> preIndex <span class="token operator">&lt;=</span> index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> preIndex<span class="token operator">++</span> <span class="token punctuation">{</span>
  updIndex <span class="token operator">=</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>updIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>cur
 <span class="token punctuation">}</span>

 <span class="token comment">// 把第i个元素之前的cur赋值给新元素的cur</span>
 l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>freeIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>cur <span class="token operator">=</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>updIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>cur
 l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>updIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>cur <span class="token operator">=</span> freeIndex

 l<span class="token punctuation">.</span>length<span class="token operator">++</span>
 <span class="token keyword">return</span> <span class="token boolean">nil</span>

<span class="token punctuation">}</span>

<span class="token comment">// 删除</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>StaticList<span class="token punctuation">)</span><span class="token function">Delete</span><span class="token punctuation">(</span>index <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>

 <span class="token keyword">if</span> index <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>length <span class="token punctuation">{</span>
  fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"位序不合法"</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"位序不合法"</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span>

 i <span class="token operator">:=</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>l<span class="token punctuation">.</span>size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cur
 j <span class="token operator">:=</span> <span class="token number">1</span>
 <span class="token keyword">for</span> i <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> j <span class="token operator">&lt;</span> index <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">{</span>
  j<span class="token operator">++</span>
  i <span class="token operator">=</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>cur
 <span class="token punctuation">}</span>

 temp <span class="token operator">:=</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>cur
 l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>cur <span class="token operator">=</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>temp<span class="token punctuation">]</span><span class="token punctuation">.</span>cur

 <span class="token comment">// 回收链表</span>
 <span class="token comment">// 把第一个元素的cur值付给要删除的分量cur</span>
 l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span>temp<span class="token punctuation">]</span><span class="token punctuation">.</span>cur <span class="token operator">=</span> l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cur
 <span class="token comment">// 把要删除的分量下标赋值给第一个元素的cur</span>
 l<span class="token punctuation">.</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>cur <span class="token operator">=</span> temp


 l<span class="token punctuation">.</span>length<span class="token operator">--</span>
 <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-链表的应用" tabindex="-1"><a class="header-anchor" href="#_7-链表的应用" aria-hidden="true">#</a> 7. 链表的应用</h2>
<h3 id="_7-1-lru-缓存淘汰算法" tabindex="-1"><a class="header-anchor" href="#_7-1-lru-缓存淘汰算法" aria-hidden="true">#</a> 7.1 LRU 缓存淘汰算法</h3>
<p>缓存是基于内存的高效存取技术，我们最常见的缓存使用是利用 <strong>Map</strong> 对象来存储键值对数据</p>
<p>缓存的大小有限，当缓存被用满时，使用率较低的缓存数据就应该被清理下来，热点数据应该保留。决定缓存去留的算法一般称为缓存淘汰策略，常见的策略有：</p>
<ul>
<li><strong>FIFO</strong>（<em>First In，FirstOut</em>）</li>
<li><strong>最少使用策略 LFU</strong>（<em>Least Frequently Used</em>）</li>
<li><strong>最近最少使用策略 LRU</strong>（<em>LeastRecently Used</em>）</li>
</ul>
<p>使用链表来存储缓存数据时，约定：</p>
<ul>
<li>访问一个缓存数据时，从表头开始顺序遍历</li>
<li>靠近链表尾部的结点是较早时间之前访问的</li>
</ul>
<p>实现 <strong>LRU</strong>：根据实际业务情况，限制链表的长度，也即缓存大小，<strong>当数据没有在缓存中时，则插入链表头部，若此时链表已满，则删除尾结点</strong>，如果<strong>再引入哈希表来记录数据的存储位置，那么查询缓存的效率就会接近 O(1)</strong></p>
</div></template>


