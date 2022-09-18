<template><div><h1 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h1>
<Alert type="info"> <Font type="info">**Python**: </Font>是 **强类型**（安全，不同类型禁止相加）、**动态**（不显示数据类型）、**脚本**（通过`python 解释器`来执行）的语言，因此 开发效率高、灵活 但不健壮。</Alert><p><a href="https://docs.python.org/zh-cn/3/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
</br>
<p><strong>Python3</strong>上统一编码为 <a href="/back_end/python/base/%E5%88%9D%E8%AF%86/%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81#122-unicode%E4%B8%87%E5%9B%BD%E7%A0%81" target="_blank" rel="noopener noreferrer">Unicode<ExternalLinkIcon/></a> ，部分 <strong>Windows</strong> 系统，<code v-pre>cmd</code> 无法输入中文，请执行如下命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ chcp <span class="token number">936</span>	<span class="token comment"># 改为支持 GBK 编码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_1-数字类-number" tabindex="-1"><a class="header-anchor" href="#_1-数字类-number" aria-hidden="true">#</a> 1. 数字类（<code v-pre>Number</code>）</h2>
<ul>
<li><a href="https://docs.python.org/zh-cn/3.10/library/stdtypes.html#additional-methods-on-integer-types" target="_blank" rel="noopener noreferrer">API 方法 文档<ExternalLinkIcon/></a></li>
<li>此类对象由数字字面值创建，并会被作为<code v-pre>算术运算符</code> 和 <code v-pre>算术内置函数</code> 的返回结果</li>
<li>数字对象<strong>是不可变的</strong>，一旦创建其值就不再改变</li>
</ul>
<blockquote>
<p>数字类的字符串表示形式，由 <a href=""><code v-pre>__repr__()</code></a> 和 <a href=""><code v-pre>__str__()</code></a> 得出</p>
</blockquote>
<h3 id="_1-1-整型-int-——-numbers-integral" tabindex="-1"><a class="header-anchor" href="#_1-1-整型-int-——-numbers-integral" aria-hidden="true">#</a> <strong>1.1 整型（<code v-pre>int</code>）—— <code v-pre>numbers.Integral</code></strong></h3>
<p><strong>Python3</strong> 不区分长、整型，都统一为整型 (<code v-pre>Integral</code>)</p>
<p><strong><code v-pre>Linux</code>下占用长度</strong></p>
<ul>
<li>
<p>通常 <strong>32</strong> 位机器上</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">-</span><span class="token number">2</span><span class="token operator">**</span><span class="token number">31</span><span class="token operator">~</span><span class="token number">2</span><span class="token operator">**</span><span class="token number">31</span><span class="token operator">-</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>64</strong> 位为</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">-</span><span class="token number">2</span><span class="token operator">**</span><span class="token number">63</span><span class="token operator">~</span><span class="token number">2</span><span class="token operator">**</span><span class="token number">63</span><span class="token operator">-</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<blockquote>
<p><strong>注意：</strong></p>
<ul>
<li><strong>Python2</strong> 上超过长度限制后自动转为 <code v-pre>long</code> (<em>长整型</em>)，如 <code v-pre>type(2\*\*31)</code></li>
<li><strong>Python3</strong> 如 <code v-pre>type(2\*\*65)</code>，依然为 <code v-pre>&lt;class 'int'&gt;</code>，因此不用考虑 <strong>大整数溢出</strong> 的问题</li>
<li>但其他语言如：<strong>C/C++</strong>， <strong>Java</strong> 等都严格区分</li>
</ul>
</blockquote>
<h3 id="_1-2-布尔值-bool-——-numbers-integral" tabindex="-1"><a class="header-anchor" href="#_1-2-布尔值-bool-——-numbers-integral" aria-hidden="true">#</a> <strong>1.2 布尔值（<code v-pre>bool</code>）—— <code v-pre>numbers.Integral</code></strong></h3>
<p>表示逻辑值 <strong>True</strong> 和 <strong>False</strong>， 布尔类型是整型的<code v-pre>子类型</code>，两个布尔值在各种场合的行为分别<strong>类似于数值 0 和 1</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">,</span> <span class="token boolean">False</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果："True" "False"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>只有在转为字符串的情况下，才会返回 <code v-pre>&quot;True&quot;</code> 和 <code v-pre>&quot;False&quot;</code> 字符串</li>
</ul>
<blockquote>
<p><strong>注：</strong><code v-pre>print()</code> 会默认执行 <code v-pre>str()</code> 强制类型转换为字符串</p>
</blockquote>
<h3 id="_1-3-浮点型-float-——-numbers-real" tabindex="-1"><a class="header-anchor" href="#_1-3-浮点型-float-——-numbers-real" aria-hidden="true">#</a> <strong>1.3 浮点型（<code v-pre>float</code>）—— <code v-pre>numbers.Real</code></strong></h3>
<p>处理实数，类似<code v-pre>C</code> 的 <code v-pre>double</code>，表示 <strong>机器级的双精度浮点数</strong>，取值范围和溢出处理将受制于底层的机器架构如<code v-pre>Cpython</code> <strong>C</strong> 的实现</p>
<p><strong><code v-pre>Linux</code>下占用长度</strong></p>
<ul>
<li>
<p><strong>64</strong> 位机器下占 <strong>8</strong> 个字节，<strong>52</strong> 位表示底，<strong>11</strong> 位表示指数，<strong>1</strong> 位表示符号</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token number">8</span>个字节<span class="token punctuation">:</span> <span class="token number">52</span>位表示底 <span class="token operator">+</span> <span class="token number">11</span>位表示指数 <span class="token operator">+</span> 一位表示符号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<blockquote>
<p><strong>注：</strong></p>
<ul>
<li>
<p>浮点数 不全是小数，而是所有 <strong>实数和无理数的集合</strong></p>
</li>
<li>
<p><strong>Python</strong> 不支持 <strong>单精度浮点数</strong> (<em>节省 CPU 和内存消耗</em>)，这点开销对于 <strong>Python</strong> 使用对象的开销来说，微不足道</p>
</li>
</ul>
</blockquote>
<h3 id="_1-4-复数-complex-——-numbers-complex" tabindex="-1"><a class="header-anchor" href="#_1-4-复数-complex-——-numbers-complex" aria-hidden="true">#</a> <strong>1.4 复数（<code v-pre>complex</code>）—— <code v-pre>numbers.Complex</code></strong></h3>
<blockquote>
<p><strong>应用领域：</strong> 量子力学 、相对论、信号分析、应用数学 专业工程学等...</p>
</blockquote>
<Alert type="info"> **Tips:** 通过调用 `id()` 方法可以打印任意对象的内存地址 </Alert><h2 id="_2-序列-——-不可变序列" tabindex="-1"><a class="header-anchor" href="#_2-序列-——-不可变序列" aria-hidden="true">#</a> 2. 序列 —— 不可变序列</h2>
<h4 id="什么是序列对象" tabindex="-1"><a class="header-anchor" href="#什么是序列对象" aria-hidden="true">#</a> <strong>什么是序列对象</strong></h4>
<ul>
<li>以非负整数作为索引的<strong>有限有序集</strong>，并可以根据可变性区分</li>
<li>可被 <code v-pre>len()</code> 返回条目数量</li>
<li>大多数序列类型（可/不可变）都支持 <a href="https://docs.python.org/zh-cn/3.9/library/stdtypes.html?highlight=bytes#typesseq-common" target="_blank" rel="noopener noreferrer">通用序列 操作<ExternalLinkIcon/></a> ，如支持 <code v-pre>[:]</code> 切片操作</li>
</ul>
<Alert type="info">**不可变序列** 类型的对象（`不可变对象`）一旦创建就**不能再改变**</Alert><h3 id="_2-1-字节串-bytes-二进制序列" tabindex="-1"><a class="header-anchor" href="#_2-1-字节串-bytes-二进制序列" aria-hidden="true">#</a> <strong>2.1 字节串（<code v-pre>bytes</code> 二进制序列）</strong></h3>
<p><strong>bytes</strong>，十六进制类型，<strong>ASCII</strong> 编码转换，离计算机二进制最近的数据类型，<strong>不可变序列</strong></p>
<p>表示 <code v-pre>bytes</code> 字面值的语法与字符串字面值的大致相同，只是添加了一个 <code v-pre>b</code> 前缀</p>
<p><strong>bytearray</strong>，即字节数组，<code v-pre>bytes</code> 对象的可变对应物，<strong>是可变序列</strong> 写此处方便对应</p>
<p><code v-pre>bytes</code> 和 <code v-pre>bytearray</code> 对象都支持 <a href="https://docs.python.org/zh-cn/3.9/library/stdtypes.html?highlight=bytes#typesseq-common" target="_blank" rel="noopener noreferrer">通用<ExternalLinkIcon/></a> 序列操作</p>
<h4 id="内置常用方法" tabindex="-1"><a class="header-anchor" href="#内置常用方法" aria-hidden="true">#</a> 内置常用方法</h4>
<p><a href="https://docs.python.org/zh-cn/3.10/library/stdtypes.html#bytes-and-bytearray-operations" target="_blank" rel="noopener noreferrer">API 文档<ExternalLinkIcon/></a></p>
<ul>
<li>
<p><strong>转字符串：</strong> <code v-pre>bytes to str</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>foo <span class="token operator">=</span> <span class="token string">b'www.abc.com'</span>

bar <span class="token operator">=</span> <span class="token builtin">str</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token string">"utf-8"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span>
<span class="token comment">## "www.abc.com"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-2-字符串-str-文本序列" tabindex="-1"><a class="header-anchor" href="#_2-2-字符串-str-文本序列" aria-hidden="true">#</a> <strong>2.2 字符串（<code v-pre>str</code> 文本序列）</strong></h3>
<p>字符串为 <a href="https://docs.python.org/zh-cn/3.9/library/stdtypes.html?highlight=bytes#str" target="_blank" rel="noopener noreferrer">文本序列类型<ExternalLinkIcon/></a>， 由 <code v-pre>Unicode</code> 码位构成的不可变序列</p>
<ul>
<li>
<p>声明方式如下：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">""</span> <span class="token operator">/</span> <span class="token operator">=</span> <span class="token string">''</span> <span class="token operator">/</span> <span class="token operator">=</span> <span class="token triple-quoted-string string">""""""</span>  <span class="token comment"># 基本赋值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="内置方法" tabindex="-1"><a class="header-anchor" href="#内置方法" aria-hidden="true">#</a> 内置方法</h4>
<p><a href="https://docs.python.org/zh-cn/3.10/library/stdtypes.html#string-methods" target="_blank" rel="noopener noreferrer">API 文档<ExternalLinkIcon/></a></p>
<ul>
<li>
<p><strong>转字节串：</strong> <code v-pre>str to bytes</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>foo <span class="token operator">=</span> <span class="token string">"www.abc.com"</span>
bar <span class="token operator">=</span> foo<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"utf-8"</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span>
<span class="token comment">## b"www.abc.com"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>切片：</strong> 字符串支持切片 <code v-pre>str[1:]</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token builtin">str</span><span class="token punctuation">[</span>start<span class="token punctuation">:</span>end<span class="token punctuation">:</span>step<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>判断相关：</strong> <code v-pre>str in str2</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token string">"el"</span> <span class="token keyword">in</span> <span class="token string">"Hello"</span> 							<span class="token comment"># 包含	字符串在另一个字符串中</span>

<span class="token string">"abc123嗯"</span><span class="token punctuation">.</span>isalnum<span class="token punctuation">(</span><span class="token punctuation">)</span>  						<span class="token comment"># 仅数字&amp;字母	组成（中文相同） 否则报错</span>
<span class="token string">"614.2"</span><span class="token punctuation">.</span>isdigit<span class="token punctuation">(</span><span class="token punctuation">)</span>  							<span class="token comment"># 仅数字	有小数点则不行</span>
<span class="token string">"614"</span><span class="token punctuation">.</span>isnumeric<span class="token punctuation">(</span><span class="token punctuation">)</span>  							<span class="token comment"># 仅数字	与上一致 遇到小数点返回False</span>

<span class="token string">"abc"</span><span class="token punctuation">.</span>islower<span class="token punctuation">(</span><span class="token punctuation">)</span>  							<span class="token comment"># 仅小写</span>
<span class="token string">"ABC"</span><span class="token punctuation">.</span>isupper<span class="token punctuation">(</span><span class="token punctuation">)</span>  							<span class="token comment"># 仅大写</span>
<span class="token string">"Ryougi Shiki"</span><span class="token punctuation">.</span>istitle<span class="token punctuation">(</span><span class="token punctuation">)</span>  					<span class="token comment"># 全首字母大写		是否为标题</span>
<span class="token string">"Ryougi shiki"</span><span class="token punctuation">.</span>capitalize<span class="token punctuation">(</span><span class="token punctuation">)</span>  				<span class="token comment"># 仅首字母大写</span>

<span class="token string">"   "</span><span class="token punctuation">.</span>isspace<span class="token punctuation">(</span><span class="token punctuation">)</span> 							<span class="token comment"># 仅空格</span>

<span class="token string">"Ryougi Shiki"</span><span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">"K"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>  		<span class="token comment"># 结尾为str	可以输入首尾</span>
<span class="token string">"Ryougi shiki"</span><span class="token punctuation">.</span>startswith<span class="token punctuation">(</span><span class="token string">"Ryo"</span><span class="token punctuation">,</span> <span class="token punctuation">)</span>  		<span class="token comment"># 开头为str</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>查询</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token string">"Ryougi Shiki"</span><span class="token punctuation">.</span>find<span class="token punctuation">(</span><span class="token string">"i"</span><span class="token punctuation">)</span>					<span class="token comment"># 有则返回索引，无则返回-1	默认返回第一个</span>
<span class="token string">"Ryougi Shiki"</span><span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token string">"i"</span><span class="token punctuation">)</span>					<span class="token comment"># 与find几乎一致 区别在于找不到时报错 因此一般用find更好一些</span>
<span class="token string">"Ryougi Shiki"</span><span class="token punctuation">.</span>rfind<span class="token punctuation">(</span><span class="token string">"i"</span><span class="token punctuation">)</span>					<span class="token comment"># 从右向左找 但返回的索引不是逆序的索引</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>转换</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span>  									<span class="token comment"># 转小写	将字符串全部转为小写</span>
<span class="token punctuation">.</span>upper<span class="token punctuation">(</span><span class="token punctuation">)</span>  									<span class="token comment"># 转大写	将字符串全部转为大写</span>
<span class="token punctuation">.</span>title<span class="token punctuation">(</span><span class="token punctuation">)</span>  									<span class="token comment"># 转标题	将字符串转为标题样式，首字母大写</span>
<span class="token punctuation">.</span>swapcase<span class="token punctuation">(</span><span class="token punctuation">)</span>  								<span class="token comment"># 反转	 将字符串字母大小写反转</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>替换分割</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string">"i"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>  							<span class="token comment"># 切指定	按指定的字符串 分割目标字符串</span>
											<span class="token comment"># 返回	分割后的元素列表	可指定分割次数</span>
<span class="token punctuation">.</span>rsplit<span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span>  								<span class="token comment"># 切右向左	从右开始 指定分割</span>

<span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">"Ki"</span><span class="token punctuation">,</span> <span class="token string">"ki"</span><span class="token punctuation">)</span>  						<span class="token comment"># 替换	指定的一段字符串</span>

<span class="token string">"  \tRyougi Shiki\n"</span><span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span>  				<span class="token comment"># 删首尾	空格、换行等</span>
<span class="token string">"\tRyougir "</span><span class="token punctuation">.</span>lstrip<span class="token punctuation">(</span><span class="token punctuation">)</span>  						<span class="token comment"># 删左</span>
<span class="token string">"Ryougi  \n"</span><span class="token punctuation">.</span>rstrip<span class="token punctuation">(</span><span class="token punctuation">)</span>  						<span class="token comment"># 删右</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>不常用</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">.</span>count<span class="token punctuation">(</span><span class="token string">"hi"</span><span class="token punctuation">)</span>								<span class="token comment"># 计算字符串出现次数</span>

<span class="token punctuation">.</span>center<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">)</span>							<span class="token comment"># 根据字符及数量居中显示</span>

<span class="token punctuation">.</span>ljust<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">)</span>								<span class="token comment"># 左显示</span>
<span class="token punctuation">.</span>rjust<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token string">"*"</span><span class="token punctuation">)</span>								<span class="token comment"># 右显示</span>

<span class="token string">"Ryo\tugi ShiKi"</span><span class="token punctuation">.</span>expandtabs<span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span>  			<span class="token comment"># 修改tab的默认空格数量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="字符串输入" tabindex="-1"><a class="header-anchor" href="#字符串输入" aria-hidden="true">#</a> <strong>字符串输入</strong></h5>
<p>当 <code v-pre>b = 'he's happy \n Yes'</code> 一行输出</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>b <span class="token operator">=</span> <span class="token string">r'he\'s happy \n Yes'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre> r：</code> 原生字符串 不再进行转义</li>
<li>转义 <code v-pre>'s：</code> 可以用 <code v-pre>\</code> , 也可以用 <code v-pre>&quot;&quot;</code> 、 <code v-pre>&quot;&quot;&quot; &quot;&quot;&quot;</code></li>
</ul>
<p>若以上是用户输入的话的，可用 <code v-pre>repr</code> 来解决，使其一行输出</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>b <span class="token operator">=</span> <span class="token builtin">repr</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token comment"># 返回便电脑阅读的字符串</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>repr()</code> 转化为供解释器读取的形式</li>
</ul>
<h5 id="字符串拼接与格式化" tabindex="-1"><a class="header-anchor" href="#字符串拼接与格式化" aria-hidden="true">#</a> <strong>字符串拼接与格式化</strong></h5>
<ul>
<li>
<p><strong><code v-pre>% 字符</code> 拼接</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>name <span class="token operator">=</span> <span class="token string">"zz"</span>
age <span class="token operator">=</span> <span class="token string">"17"</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"My name is "</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">" and i am "</span> <span class="token operator">+</span> age <span class="token operator">+</span> <span class="token string">" years old."</span><span class="token punctuation">)</span>

<span class="token comment"># 此时计算机开辟了5块内存，存储字符串</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>此方式效率低，每一个字符串就开辟一块对应内存，禁用</p>
</blockquote>
</li>
<li>
<p><strong><code v-pre>% 字符</code> 格式化输出</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>foo <span class="token operator">=</span> <span class="token string">"zz"</span>
bar <span class="token operator">=</span> <span class="token string">"17"</span>
ret <span class="token operator">=</span> <span class="token string">'{name：%s - age：%s}'</span> <span class="token operator">%</span> <span class="token punctuation">(</span>foo<span class="token punctuation">,</span> bar<span class="token punctuation">)</span>

<span class="token comment">### 占位符说明：</span>
    <span class="token operator">-</span> `<span class="token operator">%</span>s s<span class="token operator">=</span>string` 字符串
    <span class="token operator">-</span> `<span class="token operator">%</span>d d<span class="token operator">=</span>digit` 整数
    <span class="token operator">-</span> `<span class="token operator">%</span>f f<span class="token operator">=</span><span class="token builtin">float</span>` 浮点数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong><code v-pre>format</code> 格式化输出</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>foo <span class="token operator">=</span> <span class="token string">"is"</span>
bar <span class="token operator">=</span> <span class="token string">"apple"</span>
msg <span class="token operator">=</span> <span class="token string">"This {a} an {b}"</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>a<span class="token operator">=</span>foo<span class="token punctuation">,</span> b<span class="token operator">=</span>bar<span class="token punctuation">)</span>

<span class="token comment"># 简化</span>
msg <span class="token operator">=</span> <span class="token string">'This {0} an {1}'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> bar<span class="token punctuation">)</span>

<span class="token comment"># 字典形式</span>
<span class="token string">"Ryougi {name}ki {age}"</span><span class="token punctuation">.</span>format_map<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"Shi"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意</strong>：</p>
<p>转义字符（<em>含有花括号</em>）时, 利用 <strong><code v-pre>{{}}</code></strong> 双重括号转义</p>
<p>处理多个参数和更长的字符串时，显得有些冗长</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>zone <span class="token operator">=</span> <span class="token triple-quoted-string string">"""
zone "{addr}" in {{
        type master;
        file "{addr}";
}};

zone "{ip}.in-addr.arpa" in {{
        type master;
        file "{ip}";
}};
"""</span>

add_conf <span class="token operator">=</span> zone<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>addr<span class="token operator">=</span>addr<span class="token punctuation">,</span> ip<span class="token operator">=</span>ip<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong><code v-pre>join</code> 拼接</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>a<span class="token operator">=</span><span class="token string">"www"</span>
b<span class="token operator">=</span><span class="token string">"deadline"</span>
c<span class="token operator">=</span><span class="token string">"cn"</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment"># www.deadline.cn</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><strong><code v-pre>F-strings</code> 拼接 ( python3.6.2/PEP 498)</strong></p>
<p><code v-pre>python3.6</code> 引入的一种便捷的，字符串拼接方式</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>s1 <span class="token operator">=</span> <span class="token string">"hello"</span>
s2 <span class="token operator">=</span> <span class="token string">"world"</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f'</span><span class="token interpolation"><span class="token punctuation">{</span>s1<span class="token punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token punctuation">{</span>s2<span class="token punctuation">}</span></span><span class="token string">!'</span></span><span class="token punctuation">)</span>	<span class="token comment"># hello world!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>甚至可以执行函数</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>x <span class="token operator">=</span> <span class="token number">5</span>

<span class="token keyword">def</span> <span class="token function">power</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> x<span class="token operator">*</span>x

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f'</span><span class="token interpolation"><span class="token punctuation">{</span>x<span class="token punctuation">}</span></span><span class="token string"> * </span><span class="token interpolation"><span class="token punctuation">{</span>x<span class="token punctuation">}</span></span><span class="token string"> = </span><span class="token interpolation"><span class="token punctuation">{</span>power<span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">'</span></span><span class="token punctuation">)</span>	<span class="token comment"># 5 * 5 = 25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>和拼字符串一样简单：（括号转义与 <code v-pre>format</code> 相同）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>addr <span class="token operator">=</span> <span class="token string">'mytest1.com'</span>
ip <span class="token operator">=</span> <span class="token string">'192.168.1.1'</span>

zone <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"""
    zone "</span><span class="token interpolation"><span class="token punctuation">{</span>addr<span class="token punctuation">}</span></span><span class="token string">" in {{
            type master;
            file "</span><span class="token interpolation"><span class="token punctuation">{</span>addr<span class="token punctuation">}</span></span><span class="token string">";
    }};

    zone "</span><span class="token interpolation"><span class="token punctuation">{</span>ip<span class="token punctuation">}</span></span><span class="token string">.in-addr.arpa" in {{
            type master;
            file "</span><span class="token interpolation"><span class="token punctuation">{</span>ip<span class="token punctuation">}</span></span><span class="token string">";
    }};
    """</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>保留小数后 <strong>n</strong> 位，<code v-pre>:.2f</code> 这种形式</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>position <span class="token operator">=</span> <span class="token number">3</span>
<span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>number<span class="token punctuation">:</span><span class="token punctuation">.</span><span class="token punctuation">{</span>position<span class="token punctuation">}</span>f<span class="token punctuation">}</span></span><span class="token string">"</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>转义 <strong><code v-pre>{}</code></strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token string-interpolation"><span class="token string">f"\"YKB\" </span><span class="token interpolation"><span class="token punctuation">{</span>a<span class="token punctuation">}</span></span><span class="token string">"</span></span>

name <span class="token operator">=</span> <span class="token string">"YKB!"</span>
<span class="token string-interpolation"><span class="token string">f"my name is {{</span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">}}"</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>lambda</code> 表达式</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x <span class="token operator">*</span> <span class="token number">37</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种形式加了括号，可以保证万无一失</p>
</li>
</ul>
<h3 id="_2-3-元组-tuple" tabindex="-1"><a class="header-anchor" href="#_2-3-元组-tuple" aria-hidden="true">#</a> <strong>2.3 元组（<code v-pre>tuple</code>）</strong></h3>
<p><strong>只读列表</strong>，除了不能 <strong>增、删、改</strong>，其他与列表大同小异（<em>列表方法均适用</em>）</p>
<ul>
<li><strong>元组</strong> 用 <code v-pre>(,)</code> 声明，虽然元素不能改变，但能包含 <a href="/back_end/python/base/%E5%88%9D%E8%AF%86/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B#3-%E5%8F%AF%E5%8F%98%E5%BA%8F%E5%88%97" target="_blank" rel="noopener noreferrer">可变序列 list<ExternalLinkIcon/></a> ，也能切片</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># tuple 构造包含 0 个或 1 个元素的元组比较特殊</span>
tuple1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span>
tuple2 <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>元组</strong>可以在 <a href="/back_end/python/base/%E5%88%9D%E8%AF%86/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B#5-%E6%98%A0%E5%B0%84" target="_blank" rel="noopener noreferrer">映射 dict<ExternalLinkIcon/></a> 和 <a href="/back_end/python/base/%E5%88%9D%E8%AF%86/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B#4-%E9%9B%86%E5%90%88%E7%B1%BB%E5%9E%8B" target="_blank" rel="noopener noreferrer">集合 set<ExternalLinkIcon/></a> 中当作 <strong>key 键</strong> 使用（<em>不可变类型</em>）， 而列表不行（<em>可变</em>）</p>
</li>
<li>
<p><strong>元组</strong> 常作为很多 <strong>内联函数</strong> 和方法的 <strong>返回值</strong></p>
</li>
</ul>
<h3 id="_2-4-range-对象" tabindex="-1"><a class="header-anchor" href="#_2-4-range-对象" aria-hidden="true">#</a> <strong>2.4 range 对象</strong></h3>
<p>表示不可变的数字序列，常伴随 <code v-pre>for</code> 循环 指定次数</p>
<p><code v-pre>class range(start, stop[, step])</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">[</span>i <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token comment">## [1, 4, 7, 10]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>从 <strong>1</strong> 开始到 <strong>11</strong> 结束，步长为 <strong>3</strong> 的列表</p>
<hr>
<h2 id="_3-可变序列" tabindex="-1"><a class="header-anchor" href="#_3-可变序列" aria-hidden="true">#</a> 3. 可变序列</h2>
<h3 id="_3-1-列表-list" tabindex="-1"><a class="header-anchor" href="#_3-1-列表-list" aria-hidden="true">#</a> <strong>3.1 列表（<code v-pre>list</code>）</strong></h3>
<p><strong>list</strong>（<em>列表</em>）通常用于存放同类项目的集合，<strong>有序</strong></p>
<h5 id="class-list-iterable" tabindex="-1"><a class="header-anchor" href="#class-list-iterable" aria-hidden="true">#</a> <Font type="dark">class list([iterable])</Font></h5>
<ul>
<li>方括号表示，<code v-pre>[]</code>、<code v-pre>[a, b, c]</code></li>
<li>列表推导式，<code v-pre>[x for x in iterable]</code></li>
<li>类型构造器，<code v-pre>list()</code>、<code v-pre>list(iterable)</code></li>
</ul>
<h4 id="内置方法-1" tabindex="-1"><a class="header-anchor" href="#内置方法-1" aria-hidden="true">#</a> 内置方法</h4>
<ul>
<li>
<p><strong>查找</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>li <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"apple"</span><span class="token punctuation">,</span> <span class="token string">"banana"</span><span class="token punctuation">,</span> <span class="token string">"apple"</span><span class="token punctuation">,</span> <span class="token string">"orange"</span><span class="token punctuation">]</span>

li<span class="token punctuation">.</span>count<span class="token punctuation">(</span><span class="token string">"apple"</span><span class="token punctuation">)</span> 				<span class="token comment"># 次数	计算列表中元素次数</span>

li<span class="token punctuation">.</span>index<span class="token punctuation">(</span><span class="token string">"banana"</span><span class="token punctuation">)</span> 				<span class="token comment"># 位置	获取列表中元素位置</span>

<span class="token string">"orange"</span> <span class="token keyword">in</span> li 					<span class="token comment"># 判存在	检查列表中是否存在该元素</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>增加</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>li<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">"pear"</span><span class="token punctuation">)</span> 				<span class="token comment"># 追加	向列表尾部追加元素</span>

li<span class="token punctuation">.</span>insert<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"pineapple"</span><span class="token punctuation">)</span>		<span class="token comment"># 前插	向指定列表位置前面插入元素</span>

list_a<span class="token punctuation">.</span>extend<span class="token punctuation">(</span>list_b<span class="token punctuation">)</span> 			<span class="token comment"># 扩容 	列表a 合并 列表b 的所有元素</span>

a<span class="token operator">+</span>b 有些时候不想用 a<span class="token punctuation">.</span>extend<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>因为 a 会改变 因此用<span class="token operator">+</span>，但它会返回一个全新的列表

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong></p>
<p><code v-pre>list_a.extend(list_b)</code> 会改变原有 <code v-pre>list_a</code>，虽然 使用 <code v-pre>list_a + list_b</code> 可以直接扩容，但一次还好，多次会影响效率</p>
<ul>
<li>每次 <code v-pre>+=</code> 操作，都会 <code v-pre>malloc</code> 动态开辟一块内存区，高频次循环会导致大量消耗内存，影响效率</li>
</ul>
</li>
<li>
<p><strong>修改</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>li<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"new_value"</span> 			<span class="token comment"># 直接赋值</span>
li<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">]</span>				<span class="token comment"># 切片赋值	不推荐</span>

<span class="token comment"># 如下，则会删除第三索引的元素（三个位置用两个值赋）</span>
a<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"A"</span><span class="token punctuation">,</span><span class="token string">"B"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>删除</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>li<span class="token punctuation">.</span>remove<span class="token punctuation">(</span><span class="token string">"element"</span><span class="token punctuation">)</span> 			<span class="token comment"># 删除	指定元素删除 若相同删第一</span>
li<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> 						<span class="token comment"># 出栈	指定索引删除 并返回删除的元素 默认栈尾 last 出栈</span>

li<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span> 						<span class="token comment"># 清空	清空所有元素</span>

<span class="token keyword">del</span> a 							<span class="token comment"># 擦除	直接从内存中删除对象</span>
<span class="token keyword">del</span> a<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>排序</strong></p>
<p>排序 <strong>数据类型要相同</strong>（<em>如：<code v-pre>str</code> 和 <code v-pre>int</code> 是无法进行排序的</em>）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>li<span class="token punctuation">.</span>sort<span class="token punctuation">(</span><span class="token punctuation">)</span> 						<span class="token comment"># 排序	根据 ASCII 码排序 可以指定 reverse=True 逆序</span>

li<span class="token punctuation">.</span>reserve<span class="token punctuation">(</span><span class="token punctuation">)</span> 					<span class="token comment"># 逆序	列表元素逆序</span>

<span class="token builtin">sorted</span><span class="token punctuation">(</span>li<span class="token punctuation">)</span>						<span class="token comment"># 排序	不改变原有列表 返回新排序后的 list 对象</span>
								<span class="token comment"># sorted() 对所有的可迭代序列都有效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="/back_end/python/base/%E5%88%9D%E8%AF%86/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B#%E5%AD%97%E5%85%B8%E6%8E%92%E5%BA%8F" target="_blank" rel="noopener noreferrer">复杂排序<ExternalLinkIcon/></a></p>
</li>
<li>
<p><strong>类型判断</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token builtin">type</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token keyword">is</span> <span class="token builtin">list</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>解包<code v-pre>zip()</code></strong></p>
<p>在 <strong>Python3</strong> 中，<code v-pre>zip</code> 为了减少内存，会返回一个对象</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 可迭代的对象为参 -- 对应的元素打包为一个个元组, 元素个数与最短的列表一致</span>
a <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
b <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span>

zipped <span class="token operator">=</span> <span class="token builtin">zip</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token comment">## python2: [(1,4),(2,5),(3,6)]</span>
<span class="token comment">## python3: &lt;zip at 0x7fb34fe38540></span>
<span class="token comment">## [i for i in zipped]	=> [(1,4),(2,5),(3,6)]</span>

<span class="token comment"># 解压，返回二维矩阵式</span>
ss <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">zip</span><span class="token punctuation">(</span><span class="token operator">*</span>zipped<span class="token punctuation">)</span><span class="token punctuation">)</span>	<span class="token comment"># zip(*zipped) = [(1,2,3),(4,5,6)]</span>
<span class="token comment">## ss [(1,2,3),(4,5,6)]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="进阶" tabindex="-1"><a class="header-anchor" href="#进阶" aria-hidden="true">#</a> <strong>进阶</strong></h4>
<p><a href="/back_end/python/base/%E8%BF%9B%E9%98%B6%E6%A6%82%E5%BF%B5/%E5%BA%8F%E5%88%97%E8%BF%9B%E9%98%B6#1-%E5%BA%8F%E5%88%97%E5%8D%8F%E8%AE%AE" target="_blank" rel="noopener noreferrer">序列协议<ExternalLinkIcon/></a> | <a href="/back_end/python/base/%E8%BF%9B%E9%98%B6%E6%A6%82%E5%BF%B5/%E5%BA%8F%E5%88%97%E8%BF%9B%E9%98%B6#2-%E5%88%97%E8%A1%A8%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86" target="_blank" rel="noopener noreferrer">顺序表<ExternalLinkIcon/></a></p>
<hr>
<h2 id="_4-集合类型" tabindex="-1"><a class="header-anchor" href="#_4-集合类型" aria-hidden="true">#</a> 4. 集合类型</h2>
<h5 id="包含-set-和-frozenset" tabindex="-1"><a class="header-anchor" href="#包含-set-和-frozenset" aria-hidden="true">#</a> 包含 <Font type="info" size="s">set</Font> 和 <Font type="info" size="s">frozenset</Font></h5>
<h3 id="_4-1-集合-set" tabindex="-1"><a class="header-anchor" href="#_4-1-集合-set" aria-hidden="true">#</a> 4.1 集合（<code v-pre>set</code>）</h3>
<h5 id="class-set-iterable" tabindex="-1"><a class="header-anchor" href="#class-set-iterable" aria-hidden="true">#</a> <Font type="dark">class set([iterable])</Font></h5>
<blockquote>
<p><strong>set</strong> 对象是由具有唯一性的 <a href="https://docs.python.org/zh-cn/3.10/glossary.html#term-hashable" target="_blank" rel="noopener noreferrer">hashable 对象<ExternalLinkIcon/></a> 所组成的 <strong>无序多项集</strong>，常用于 <strong>成员检测</strong>、<strong>去重</strong>、集合类 <strong>交、并、补、差</strong> 运算</p>
</blockquote>
<ul>
<li>集合不记录顺序，因此不支持索引</li>
<li>支持 <code v-pre>in</code> 、<code v-pre>len</code>、<code v-pre>for</code> 循环迭代操作</li>
<li>可变类型，无哈希值， <strong>不能作为字典键</strong> 或其他集合的元素</li>
<li>可使用 <code v-pre>add()</code>、<code v-pre>remove()</code> 来增删</li>
<li>哈希，故很快 <strong>O(1)</strong>， 比 <strong>list</strong> 遍历查找快太多</li>
</ul>
<h4 id="集合的创建" tabindex="-1"><a class="header-anchor" href="#集合的创建" aria-hidden="true">#</a> <strong>集合的创建</strong></h4>
<ul>
<li>
<p>使用 <strong>花括号</strong> 内以逗号分隔元素来创建: <code v-pre>{'jack', 'sjoerd'}</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>set_a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"apple"</span><span class="token punctuation">,</span> <span class="token string">"banana"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用 <strong>集合推导式</strong> 来创建: <code v-pre>{c for c in 'abracadabra' if c not in 'abc'}</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>set_a <span class="token operator">=</span> <span class="token punctuation">{</span>i <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token string">'apple'</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用 <strong>类型构造器</strong> 来创建: <code v-pre>set()</code>, <code v-pre>set('foobar')</code>, <code v-pre>set(['a', 'b', 'foo'])</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>li <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>
set_a <span class="token operator">=</span> <span class="token builtin">set</span><span class="token punctuation">(</span>li<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="集合操作" tabindex="-1"><a class="header-anchor" href="#集合操作" aria-hidden="true">#</a> <strong>集合操作</strong></h4>
<ul>
<li>
<p><strong>CURD 操作</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>set_a<span class="token punctuation">.</span>add<span class="token punctuation">(</span><span class="token string">"pear"</span><span class="token punctuation">)</span> 						<span class="token comment"># 添加	向集合中增加一个元素</span>

set_a<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"orange"</span><span class="token punctuation">,</span> <span class="token string">"pineapple"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>	<span class="token comment"># 批量加	向集合中增加可迭代对象</span>
  										<span class="token comment"># set_a.update(iterable) 有去重，无加入</span>

set_a<span class="token punctuation">.</span>remove<span class="token punctuation">(</span><span class="token string">"orange"</span><span class="token punctuation">)</span>					<span class="token comment"># 移除	集合中移除指定元素，不存在会报错</span>
set_a<span class="token punctuation">.</span>discard<span class="token punctuation">(</span><span class="token string">"orange"</span><span class="token punctuation">)</span>					<span class="token comment"># 移除	集合中移除指定元素，不会报错</span>

set_a<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span> 							<span class="token comment"># 随机删除	并返回删除的值</span>

set_a<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span> 							<span class="token comment"># 清空	清空集合</span>

<span class="token keyword">del</span> set_a								<span class="token comment"># 擦除	直接从内存中删除集合对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>特有操作</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">'apple'</span><span class="token punctuation">,</span> <span class="token string">'banana'</span><span class="token punctuation">,</span> <span class="token string">'pineapple'</span><span class="token punctuation">}</span>
b <span class="token operator">=</span> <span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"apple"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

a<span class="token punctuation">.</span>isdisjoint<span class="token punctuation">(</span>b<span class="token punctuation">)</span>						<span class="token comment"># 空集	集合A 和 集合B 的交集为空，不相干</span>

b<span class="token punctuation">.</span>issubset<span class="token punctuation">(</span>a<span class="token punctuation">)</span>						<span class="token comment"># 子集	集合B 是 A 的子集</span>
b <span class="token operator">&lt;=</span> a
b <span class="token operator">&lt;</span> a								<span class="token comment"># 真子集</span>

a<span class="token punctuation">.</span>issuperset<span class="token punctuation">(</span>b<span class="token punctuation">)</span>						<span class="token comment"># 父集	集合A 是 B 的父集</span>
a <span class="token operator">>=</span> b
a <span class="token operator">></span> b								<span class="token comment"># 真超集</span>

a<span class="token punctuation">.</span>intersection<span class="token punctuation">(</span>b<span class="token punctuation">)</span>					<span class="token comment"># 交集	取集合A 和 B 共有部分</span>
a <span class="token operator">&amp;</span> b

a<span class="token punctuation">.</span>union<span class="token punctuation">(</span>b<span class="token punctuation">)</span>							<span class="token comment"># 并集	取集合A 和 B 所有部分</span>
a <span class="token operator">|</span> b

a<span class="token punctuation">.</span>difference<span class="token punctuation">(</span>b<span class="token punctuation">)</span>						<span class="token comment"># 差集	取在集合A 中，但不在集合 B 的部分</span>
a <span class="token operator">-</span> b

a<span class="token punctuation">.</span>symmetric_difference<span class="token punctuation">(</span>b<span class="token punctuation">)</span>			<span class="token comment"># 对称差集 取（集合A 有 B没有的） 和 （B有 A没有的）</span>
a <span class="token operator">^</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><strong>注意：</strong> 使用方法可以接收 <strong>iterable</strong> （<em>可迭代对象</em>），但使用运算符 <strong>只能为集合对象</strong></p>
<h3 id="_4-2-冻结集合-frozenset" tabindex="-1"><a class="header-anchor" href="#_4-2-冻结集合-frozenset" aria-hidden="true">#</a> <strong>4.2 冻结集合（<code v-pre>frozenset</code>）</strong></h3>
<h5 id="class-frozenset-iterable" tabindex="-1"><a class="header-anchor" href="#class-frozenset-iterable" aria-hidden="true">#</a> <Font type="dark">class frozenset([iterable])</Font></h5>
<blockquote>
<p>集合的元素必须为 <a href="https://docs.python.org/zh-cn/3.10/glossary.html#term-hashable" target="_blank" rel="noopener noreferrer">hashable<ExternalLinkIcon/></a>。 要表示由集合对象构成的集合，所有的内层集合必须为 <a href="https://docs.python.org/zh-cn/3.10/library/stdtypes.html?highlight=set#frozenset" target="_blank" rel="noopener noreferrer"><code v-pre>frozenset</code><ExternalLinkIcon/></a> 对象。 如果未指定 <code v-pre>iterable</code>，则将返回一个新的空集合</p>
</blockquote>
<ul>
<li>类型是不可变的，并且为 <code v-pre>hashable</code></li>
<li>其内容在被创建后不能再改变，因此它 <strong>可被用作字典的键</strong> 或其他集合的元素</li>
</ul>
<hr>
<h2 id="_5-映射" tabindex="-1"><a class="header-anchor" href="#_5-映射" aria-hidden="true">#</a> 5. 映射</h2>
<p><strong>Dictionary</strong>（<em>字典</em>） 是 <strong>Python</strong> 除 <strong>list</strong> 外，最灵活的内置数据结构类型，是 <strong>无序可变对象集合</strong></p>
<h3 id="_5-1-字典-dict" tabindex="-1"><a class="header-anchor" href="#_5-1-字典-dict" aria-hidden="true">#</a> <strong>5.1 字典（<code v-pre>dict</code>）</strong></h3>
<h5 id="class-dict-kwargs" tabindex="-1"><a class="header-anchor" href="#class-dict-kwargs" aria-hidden="true">#</a> <Font type="dark">class dict(**kwargs)</Font></h5>
<h5 id="class-dict-mapping-kwargs" tabindex="-1"><a class="header-anchor" href="#class-dict-mapping-kwargs" aria-hidden="true">#</a> <Font type="dark">class dict(mapping, **kwargs)</Font></h5>
<h5 id="class-dict-iterable-kwargs" tabindex="-1"><a class="header-anchor" href="#class-dict-iterable-kwargs" aria-hidden="true">#</a> <Font type="dark">class dict(iterable, **kwargs)</Font></h5>
<ul>
<li>采用 <code v-pre>key-value</code> 存储数据，对 <code v-pre>key</code> 进行哈希运算，根据计算结果决定 <code v-pre>value</code> 的存储地址，因此 <a href="https://docs.python.org/zh-cn/3.10/glossary.html#term-hashable" target="_blank" rel="noopener noreferrer">hashable<ExternalLinkIcon/></a> 可以为键</li>
<li>因为索引必须唯一，故 <code v-pre>key值</code> 唯一，通过 <code v-pre>key</code> 来存取，不是像 <strong>C</strong> 的数组那样，通过偏移</li>
</ul>
<h4 id="字典的创建" tabindex="-1"><a class="header-anchor" href="#字典的创建" aria-hidden="true">#</a> <strong>字典的创建</strong></h4>
<ul>
<li>
<p>使用 <strong>花括号</strong> 内以逗号分隔 <code v-pre>键: 值</code> 对的方式</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dict1 <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"ShiKi"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token string">"hobby"</span><span class="token punctuation">:</span> <span class="token string">"hagendas"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用 <strong>字典推导式</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dict_a <span class="token operator">=</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> x <span class="token operator">**</span> <span class="token number">2</span> <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用 <strong>类型构造器</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dict_a <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
dict_a <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
dict_a <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>foo<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">,</span> bar<span class="token operator">=</span><span class="token number">200</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>直接使 <code v-pre>{}</code> 效率较高</p>
<h4 id="字典操作" tabindex="-1"><a class="header-anchor" href="#字典操作" aria-hidden="true">#</a> <strong>字典操作</strong></h4>
<ul>
<li>
<p><strong>CURD 操作</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dict_a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"zz"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">}</span>

dict_a<span class="token punctuation">[</span><span class="token string">"drink"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"coffee"</span> 				<span class="token comment"># 增加	指定 键值对 直接添加（改同）</span>
dict_a<span class="token punctuation">.</span>setdefault<span class="token punctuation">(</span><span class="token string">"drink"</span><span class="token punctuation">,</span> <span class="token string">"coffee"</span><span class="token punctuation">)</span> 	<span class="token comment"># 增加	通过方法添加，若存在则返回 value</span>

name <span class="token operator">=</span> dict_a<span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">]</span>					<span class="token comment"># 取值	直接通过 key 取 value</span>

age <span class="token operator">=</span> dict_a<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">)</span>				<span class="token comment"># 取值	通过方法，可指定默认值 未指定默认值则报错</span>

keys_view <span class="token operator">=</span> dict_a<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span> 				<span class="token comment"># 取所有 key	拿到所有key 值构建的视图</span>
values_view <span class="token operator">=</span> dict_a<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span> 			<span class="token comment"># 取所有 value	拿到所有value 值构建的视图</span>
items_view <span class="token operator">=</span> dict_a<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span> 			<span class="token comment"># 取所有 k-v对	拿到所有key - value 键值对构建的视图</span>
<span class="token comment"># 可用 list(dict|dictview) 返回列表</span>

dict_a<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"drink"</span><span class="token punctuation">:</span> <span class="token string">"java"</span><span class="token punctuation">}</span><span class="token punctuation">)</span> 		<span class="token comment"># 修改	有则改，无增加 参数为字典</span>

dict_a<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span> 				<span class="token comment"># 删除	指定 key 删对应键值对，可给默认 无则报错</span>
dict_a<span class="token punctuation">.</span>popitem<span class="token punctuation">(</span><span class="token punctuation">)</span> 						<span class="token comment"># 随机删除	无参随机删 并返回删除的 key-value</span>

dict_a<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span>							<span class="token comment"># 清空</span>
<span class="token keyword">del</span> dict_a								<span class="token comment"># 擦除</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>其他方法</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> i <span class="token keyword">in</span> dict_a<span class="token punctuation">:</span>						<span class="token comment"># 遍历	i 为 key	效率高</span>
	<span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> dict_a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> key<span class="token punctuation">,</span>value <span class="token keyword">in</span> <span class="token builtin">dict</span><span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> 			<span class="token comment"># .items()转换效率太低, 比索引 O(1) 效率低，不推荐</span>
	<span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> dict_a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># 类方法 classmethod</span>
<span class="token builtin">dict</span><span class="token punctuation">.</span>fromkeys<span class="token punctuation">(</span>iterable<span class="token punctuation">,</span> value<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span>
	<span class="token comment"># iterable -> 字典生成的每个 key</span>
  	<span class="token comment"># value -> 每个key键 相同的值，多用于 通过迭代对象 初始化一个空字典，注意深浅拷贝</span>

create_dict_a <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">.</span>fromkeys<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"key1"</span><span class="token punctuation">,</span> <span class="token string">"key2"</span><span class="token punctuation">,</span> <span class="token string">"key3"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>create_dict_a<span class="token punctuation">)</span>
<span class="token comment">## {'key1': None, 'key2': None, 'key3': None}</span>

create_dict_b <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">.</span>fromkeys<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"key1"</span><span class="token punctuation">,</span> <span class="token string">"key2"</span><span class="token punctuation">,</span> <span class="token string">"key3"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"value1"</span><span class="token punctuation">,</span> <span class="token string">"value2"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>create_dict_b<span class="token punctuation">)</span>
<span class="token comment">## {'key1': ['value1', 'value2'], 'key2': ['value1', 'value2'], 'key3': ['value1', 'value2']}</span>

<span class="token comment">## 深浅拷贝 故几乎不用 同 li = [[]] * 3</span>
create_dict_b<span class="token punctuation">[</span><span class="token string">"key2"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">=</span><span class="token string">"new_value"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>create_dict_b<span class="token punctuation">)</span>

<span class="token comment">## {'key1': ['value1', 'new_value'], 'key2': ['value1', 'new_value'], 'key3': ['value1', 'new_value']}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>新增功能</strong>（<em>多为 3.8/9 版后</em>）</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># d | other 和 d |= other</span>
dict_a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"zz"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">}</span>
dict_b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"first_name"</span><span class="token punctuation">:</span> <span class="token string">"igr"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">19</span><span class="token punctuation">}</span>

dict_a <span class="token operator">|</span> dict_b				<span class="token comment"># 合并	融合 dict_a 和 dict_b 中的键值对，</span>
dict_a <span class="token operator">|</span><span class="token operator">=</span> dict_b			<span class="token comment"># 更新	通过 dict_b 的键值对 来更新 dict_a</span>

<span class="token comment"># 当 dict_a 和 dict_b 有相同键时 dict_b 优先</span>
<span class="token comment">## {'name': 'zz', 'age': 19, 'first_name': 'igr'}</span>


<span class="token builtin">list</span><span class="token punctuation">(</span><span class="token builtin">reversed</span><span class="token punctuation">(</span>dict_a<span class="token punctuation">)</span><span class="token punctuation">)</span>		<span class="token comment"># 逆序键迭代	获取字典键、值或项 与插入时 相反的 key键的 迭代器</span>
<span class="token comment">## ['age', 'name']</span>
<span class="token comment"># 与 list(iter(dict_a)) 相反</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="字典排序" tabindex="-1"><a class="header-anchor" href="#字典排序" aria-hidden="true">#</a> <strong>字典排序</strong></h4>
<p><strong>字典是无序的</strong>，因为散列哈希，就不会有序，哪怕 <strong>排序后再转字典依旧无序</strong>，但某些场景又需要字典顺序获取，故</p>
<ul>
<li>
<p><strong><code v-pre>sorted()</code></strong> 可用其来对字典的 <strong>键/值排序</strong> ，并返回 <strong>list</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dict_a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"banana"</span><span class="token punctuation">:</span> <span class="token number">11.2</span><span class="token punctuation">,</span> <span class="token string">"apple"</span><span class="token punctuation">:</span> <span class="token number">5.6</span><span class="token punctuation">,</span> <span class="token string">"pear"</span><span class="token punctuation">:</span> <span class="token number">17.1</span><span class="token punctuation">}</span>

result <span class="token operator">=</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>dict_a<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span>x<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>   <span class="token comment"># x[0]/[1] 键/值</span>

<span class="token comment">## [('pear', 17.1), ('banana', 11.2), ('apple', 5.6)]</span>

<span class="token comment"># 如上是根据 key 值首字母逆序，返回了 元素为 元组 tuple类型 的 list 列表</span>
<span class="token comment"># 若 lambda 用 值value 则是根据价格排序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>实质：</strong> 字典本无序，当使用了 <code v-pre>.items()</code> 返回 <code v-pre>iterable</code> 的 <code v-pre>dictview</code> 时，就已经转化为<strong>对列表的排序</strong></li>
</ul>
</li>
<li>
<p><strong><code v-pre>.sort()</code></strong> 故使用 <code v-pre>sort()</code> 也相同，<strong>排序后再转字典依旧无序</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 先按key排序</span>
key_list <span class="token operator">=</span> <span class="token punctuation">[</span>i <span class="token keyword">for</span> i <span class="token keyword">in</span> dict_a<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
key_list<span class="token punctuation">.</span>sort<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## ['apple', 'banana', 'pear']</span>

<span class="token comment"># 利用字典生成式，再构造字典，此时看似有序，其实依旧无序</span>
result <span class="token operator">=</span> <span class="token punctuation">{</span>key<span class="token punctuation">:</span> dict_a<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token keyword">for</span> key <span class="token keyword">in</span> key_sort<span class="token punctuation">}</span>
<span class="token comment">## {'apple': 5.6, 'banana': 11.2, 'pear': 17.1}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>此时会发现，有些场景 <strong>需要返回的也是字典</strong>，而不是如上列表</p>
</blockquote>
</li>
<li>
<p><strong><code v-pre>OrderedDict</code></strong> 使用 <strong>有序字典</strong></p>
</li>
</ul>
<h5 id="operator复杂排序" tabindex="-1"><a class="header-anchor" href="#operator复杂排序" aria-hidden="true">#</a> <strong><a href="https://docs.python.org/zh-cn/3/library/operator.html?highlight=getitem#module-operator" target="_blank" rel="noopener noreferrer">operator<ExternalLinkIcon/></a>复杂排序</strong></h5>
<p>若对某些较为复杂的数据结构排序，可使用 <code v-pre>operator</code> 模块提供的 <code v-pre>itemgetter()</code>、<code v-pre>attrgetter()</code> 快速字段提取器，来简化操作</p>
<ul>
<li>
<p><strong><code v-pre>itemgetter()</code></strong> 通常用于 <strong>tuple</strong> ，<strong>dict</strong> 等取值</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>itemgetter<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token comment"># 通常用于元组、字典</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong><code v-pre>sorted()</code></strong> 直接用 <code v-pre>itemgetter()</code> 对字典 <strong>key</strong> 或 <strong>value</strong> 排序</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>teacher_map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"teacher1"</span><span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">"teacher2"</span><span class="token punctuation">:</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token string">"teacher3"</span><span class="token punctuation">:</span> <span class="token number">11</span><span class="token punctuation">}</span>

<span class="token comment"># 对 key键 排序</span>
result <span class="token operator">=</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>teacher_map<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token operator">=</span>itemgetter<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## [('teacher1', 10), ('teacher2', 9), ('teacher3', 11)]</span>

<span class="token comment"># 对 值value 排序</span>
result <span class="token operator">=</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>teacher_map<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token operator">=</span>itemgetter<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## [('teacher2', 9), ('teacher1', 10), ('teacher3', 11)]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong><code v-pre>.sort()</code></strong> 嵌套内层排序</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 透过字典，对列表中的字典排序</span>
<span class="token keyword">from</span> operator <span class="token keyword">import</span> itemgetter

class_map <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"class1"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"teacher2"</span><span class="token punctuation">,</span> <span class="token string">"rank"</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"teacher1"</span><span class="token punctuation">,</span> <span class="token string">"rank"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"teacher3"</span><span class="token punctuation">,</span> <span class="token string">"rank"</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string">"class2"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"teacher2"</span><span class="token punctuation">,</span> <span class="token string">"rank"</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"teacher1"</span><span class="token punctuation">,</span> <span class="token string">"rank"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"teacher1"</span><span class="token punctuation">,</span> <span class="token string">"rank"</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string">"class3"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"teacher3"</span><span class="token punctuation">,</span> <span class="token string">"rank"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"teacher1"</span><span class="token punctuation">,</span> <span class="token string">"rank"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"teacher1"</span><span class="token punctuation">,</span> <span class="token string">"rank"</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment"># 解构 出待排序的列表</span>
<span class="token comment"># 若对象为dict，itemgetter("rank") 则取到字典的键 "rank"</span>
<span class="token keyword">for</span> k<span class="token punctuation">,</span>v  <span class="token keyword">in</span> class_map<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    v<span class="token punctuation">.</span>sort<span class="token punctuation">(</span>key<span class="token operator">=</span>itemgetter<span class="token punctuation">(</span><span class="token string">'rank'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 支持 多级排序，若 条件 'rank' 相同， 可根据 "name" 再排序</span>
<span class="token keyword">for</span> k<span class="token punctuation">,</span>v  <span class="token keyword">in</span> class_map<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    v<span class="token punctuation">.</span>sort<span class="token punctuation">(</span>key<span class="token operator">=</span>itemgetter<span class="token punctuation">(</span><span class="token string">'rank'</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>多权重排序</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 加入 teacher 有如 (年限, 带班数, 人数, 等级) 的权值</span>
  teacher_map <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token string">"teacher1"</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token string">"teacher2"</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token string">"teacher3"</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token string">"teacher4"</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment"># 转化数据结构 为多重字典形式</span>
  teacher_items <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">for</span> name<span class="token punctuation">,</span> weights <span class="token keyword">in</span> teacher_map<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
      <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> weights<span class="token punctuation">)</span>
      teacher_items<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">{</span>
          <span class="token string">"name"</span><span class="token punctuation">:</span> name<span class="token punctuation">,</span>
          <span class="token string">"YEAR"</span><span class="token punctuation">:</span> weights<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token string">"CNUM"</span><span class="token punctuation">:</span> weights<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token string">"PNUM"</span><span class="token punctuation">:</span> weights<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token string">"RANK"</span><span class="token punctuation">:</span> weights<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>


  <span class="token comment"># 表示先按 'PNUM' 排序，再按 'RANK' 排序</span>
  <span class="token builtin">sorted</span><span class="token punctuation">(</span>teacher_items <span class="token punctuation">,</span>key<span class="token operator">=</span>itemgetter<span class="token punctuation">(</span><span class="token string">'PNUM'</span><span class="token punctuation">,</span> <span class="token string">'RANK'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token comment"># 改用 lambda 可控制条件，按人数少，且级别高的 逆序输出</span>
  <span class="token builtin">sorted</span><span class="token punctuation">(</span>teacher_items<span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token operator">-</span>x<span class="token punctuation">[</span><span class="token string">'PNUM'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> x<span class="token punctuation">[</span><span class="token string">'RANK'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> reverse<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

  <span class="token comment"># 若用 itemgetter 需两次，先按人数少的排，再逆序级别高的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong><code v-pre>attrgetter()</code></strong> 通过对象属性名，获取指定属性</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> operator <span class="token keyword">import</span> attrgetter
<span class="token keyword">from</span> collections <span class="token keyword">import</span> namedtuple

Student <span class="token operator">=</span> namedtuple<span class="token punctuation">(</span><span class="token string">"Student"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

s1 <span class="token operator">=</span> Student<span class="token punctuation">(</span><span class="token string">"zz"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span>

get_attr <span class="token operator">=</span> attrgetter<span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">)</span>
get_attr<span class="token punctuation">(</span>s1<span class="token punctuation">)</span>
<span class="token comment">## 18</span>

get_attr2 <span class="token operator">=</span> attrgetter<span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">)</span>
get_attr2<span class="token punctuation">(</span>s1<span class="token punctuation">)</span>
<span class="token comment">## ('zz', 18)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong><code v-pre>max()/min()</code></strong> 求迭代器的 <strong>最大/小</strong> 值</p>
<p><code v-pre>max(iterable, key, default)</code> 使用 <code v-pre>for i in …</code> 遍历，将迭代器每个返回值，当做参数传给 <code v-pre>key=lambda_func</code>，进行大小的判断</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>student_list <span class="token operator">=</span> <span class="token punctuation">[</span>
    Student<span class="token punctuation">(</span><span class="token string">"zz"</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    Student<span class="token punctuation">(</span><span class="token string">"bb"</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    Student<span class="token punctuation">(</span><span class="token string">"cc"</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

get_attr <span class="token operator">=</span> attrgetter<span class="token punctuation">(</span><span class="token string">"age"</span><span class="token punctuation">)</span>
<span class="token builtin">max</span><span class="token punctuation">(</span>student_list<span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> get_attr<span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## Student(name='cc', age=20)</span>

get_attr2 <span class="token operator">=</span> attrgetter<span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">)</span>
<span class="token builtin">max</span><span class="token punctuation">(</span>student_list<span class="token punctuation">,</span> key<span class="token operator">=</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> get_attr2<span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">## Student(name='zz', age=18)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="进阶-1" tabindex="-1"><a class="header-anchor" href="#进阶-1" aria-hidden="true">#</a> <strong>进阶</strong></h4>
<p><a href="">映射协议</a> | <a href="">散列表</a></p>
<hr>
</div></template>


