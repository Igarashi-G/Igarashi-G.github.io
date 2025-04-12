<template><div><p><strong>Golang</strong> 特性、API、差异点等备忘速记</p>
<!-- more -->
<h5 id="路径" tabindex="-1"><a class="header-anchor" href="#路径" aria-hidden="true">#</a> <strong>路径</strong></h5>
<p><strong>GOROOT = C://Program/go</strong></p>
<p><strong>GOPATH = 编译项目的工作路径</strong></p>
<h5 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> <strong>运行</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 直接运行</span>
go run main.go
 <span class="token variable"><span class="token variable">`</span><span class="token parameter variable">-p</span> <span class="token number">4</span> 资源受限<span class="token variable">`</span></span>

<span class="token comment"># 编译</span>
go build 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-基础类型" tabindex="-1"><a class="header-anchor" href="#_1-基础类型" aria-hidden="true">#</a> 1. 基础类型</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
声明 及 默认值、可海象、类型推导
*/</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	a <span class="token builtin">int</span>			<span class="token comment">// 0</span>
    c float			<span class="token comment">// 0</span>
    d <span class="token builtin">bool</span>			<span class="token comment">// false</span>
	b <span class="token builtin">string</span>		<span class="token comment">// ""</span>
    xx <span class="token punctuation">[</span><span class="token punctuation">]</span> T 		<span class="token comment">// 切片, T 可以是 int、float、bool、[]、map、func() 类比列表</span>
    e <span class="token keyword">struct</span> <span class="token punctuation">{</span>		<span class="token comment">// {}</span>
        x <span class="token operator">*</span><span class="token builtin">int</span>		<span class="token comment">// nil 切片、函数、指针</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>				<span class="token comment">// 常量在编译期确定</span>
    pi <span class="token operator">=</span> <span class="token number">3.1415926</span>
    e  <span class="token operator">=</span> <span class="token number">2.718281</span>
    ONEDAY <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">&lt;&lt;</span> <span class="token boolean">iota</span>
    TWODAY
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">注意</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 不能单个重复定义</span>
a <span class="token operator">:=</span> <span class="token number">1</span>
a <span class="token operator">:=</span> <span class="token number">2</span>				<span class="token comment">// error</span>
a<span class="token punctuation">,</span> err <span class="token operator">:=</span> xxx
b<span class="token punctuation">,</span> err <span class="token operator">:=</span> xxx

<span class="token comment">// 可多变量同时赋值</span>
a<span class="token punctuation">,</span> b <span class="token operator">=</span> b<span class="token punctuation">,</span> a

<span class="token comment">// 匿名变量</span>
a<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h3 id="整型" tabindex="-1"><a class="header-anchor" href="#整型" aria-hidden="true">#</a> <strong>整型</strong></h3>
<p>两大类，对应 <strong>C</strong></p>
<ul>
<li>按长度分类： <code v-pre>int8/16/32/64</code>、<code v-pre>int</code>
<ul>
<li><code v-pre>int16</code> 对应 <code v-pre>short</code> 型</li>
<li><code v-pre>int64</code> 对应 <code v-pre>long</code> 型</li>
</ul>
</li>
<li>对应无符号： <code v-pre>uint8/16/32/64</code>、<code v-pre>uint</code>
<ul>
<li><code v-pre>uint8</code> 对应 <code v-pre>byte</code> 型</li>
</ul>
</li>
</ul>
<p>某些场景下， 若 <strong>64位</strong> 依然满足不了你，可以使用大整数计算 <strong>big.Int</strong> 和 有理数 <strong>big.Rat</strong> 类型</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">注意事项</p>
<ul>
<li><code v-pre>int</code> 和 <code v-pre>uint</code> 自动匹配平台（<em>自动内存对齐</em> ），随平台变化，<strong>二进制传输、读写文件时禁用</strong></li>
</ul>
</div>
<h3 id="浮点型" tabindex="-1"><a class="header-anchor" href="#浮点型" aria-hidden="true">#</a> <strong>浮点型</strong></h3>
<p>遵从<strong>IEEE754</strong> 标准有 <code v-pre>float32/64</code> 可用常量定义 <code v-pre>math.MaxFloat32/64</code></p>
<p><strong>64位为例：</strong> <strong>1</strong> 位 <strong>sign</strong> 表正负，<strong>11</strong>位 <strong>exponent</strong> 表 <strong>-1023~1024</strong> ，<strong>52</strong> 位 表小数</p>
<h5 id="精度问题" tabindex="-1"><a class="header-anchor" href="#精度问题" aria-hidden="true">#</a> <strong>精度问题</strong></h5>
<p>浮点存在 <strong>小数 * 2 = 1</strong> 精度不准问题，可用 <strong>decimal</strong> 解决</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下载</span>
$ go get github.com/shopspring/decimal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> v1 <span class="token operator">=</span> decimal<span class="token punctuation">.</span><span class="token function">NewFromFloat</span><span class="token punctuation">(</span><span class="token number">0.00000018</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> v2 <span class="token operator">=</span> decimal<span class="token punctuation">.</span><span class="token function">NewFromFloat</span><span class="token punctuation">(</span><span class="token number">0.29</span><span class="token punctuation">)</span>

<span class="token comment">// 加减乘除</span>
<span class="token keyword">var</span> ret <span class="token operator">=</span> v1<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>v2<span class="token punctuation">)</span>	<span class="token comment">// .Sub(v2)  .Mul(v2)  .Div(v2)</span>

<span class="token comment">// 保留</span>
<span class="token keyword">var</span> v3 <span class="token operator">=</span> v2<span class="token punctuation">.</span><span class="token function">Round</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>		<span class="token comment">// 四舍五入</span>
<span class="token keyword">var</span> v4 <span class="token operator">=</span> v2<span class="token punctuation">.</span><span class="token function">Truncate</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>		<span class="token comment">// 直接保留</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="布尔" tabindex="-1"><a class="header-anchor" href="#布尔" aria-hidden="true">#</a> <strong>布尔</strong></h3>
<p>分 <code v-pre>ture/flase</code> ，<strong>不允许 整型 强转 布尔</strong> ，无法参加数值运算</p>
<h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> <strong>字符串</strong></h3>
<p><strong>Go</strong> 中为原生类型</p>
<p>常见转义</p>
<table>
<thead>
<tr>
<th style="text-align:center">符号</th>
<th style="text-align:center">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code v-pre>\r</code></td>
<td style="text-align:center">回车（返回行首）</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>\n</code></td>
<td style="text-align:center">回车（返回对齐）</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>\t</code></td>
<td style="text-align:center">tab</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>\'</code></td>
<td style="text-align:center">单引号</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>\&quot;</code></td>
<td style="text-align:center">双引号</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>\\</code></td>
<td style="text-align:center">反斜杠</td>
</tr>
</tbody>
</table>
<ul>
<li>
<p>多行字符串，用于内嵌配置等</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token string">`[gloabl]
xxx={}
xxx2={}
`</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>字符，有两种类型</p>
<ul>
<li><code v-pre>uint8</code> 类型，实际是 <code v-pre>byte</code> 型 代表 <strong>ASCII</strong> 码</li>
<li><code v-pre>rune</code> 类型，实际是 <code v-pre>int32</code>，代表一个 <strong>UTF-8</strong> 字符，处理复合字符，都对应了 <strong>Unicode</strong> 码</li>
</ul>
</li>
</ul>
<h5 id="方法api" tabindex="-1"><a class="header-anchor" href="#方法api" aria-hidden="true">#</a> 方法API</h5>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>str <span class="token operator">:=</span> <span class="token string">"igarashi"</span>

<span class="token comment">// 获取字符串长度</span>
<span class="token function">len</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>						<span class="token comment">//  - ASCII 字符串用 len</span>
utf8<span class="token punctuation">.</span><span class="token function">RuneCountInString</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>		<span class="token comment">//  - Unicode 字符串用 utf8</span>

<span class="token comment">// 查找字符串下标</span>
strings<span class="token punctuation">.</span><span class="token function">Index</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> <span class="token string">"ra"</span><span class="token punctuation">)</span>		<span class="token comment">// 返回下标 index</span>

<span class="token comment">// 去空格</span>
strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>			<span class="token comment">// 去掉字符串两边空格</span>

<span class="token comment">// 拼接字符串</span>
first_name <span class="token operator">:=</span> <span class="token string">"igarashi"</span>
name <span class="token operator">:=</span> <span class="token string">"-G"</span>
first_name <span class="token operator">+</span> name						<span class="token comment">// + 号 直接拼接，</span>

<span class="token keyword">var</span> stringBuilder bytes<span class="token punctuation">.</span>Buffer			<span class="token comment">// 声明字节缓冲</span>
stringBuilder<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>first_name<span class="token punctuation">)</span>	<span class="token comment">// 把字符串写入缓冲</span>
stringBuilder<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
stringBuilder<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span>					<span class="token comment">// 将缓冲以字符串形式输出</span>

<span class="token comment">// 修改字符串（不可变），Go中不能直接修改，只能重新赋值</span>
str <span class="token operator">:=</span> <span class="token string">"igarashi"</span>
str_bytes <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span>				<span class="token comment">// 将字符串转为 字符串数组（字节数组）</span>

<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">4</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">6</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
    str_bytes<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">'w'</span>					<span class="token comment">// 替换 4 ~ 6 字符为 i</span>
<span class="token punctuation">}</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>str_bytes<span class="token punctuation">)</span><span class="token punctuation">)</span>			<span class="token comment">// 转换回去</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>格式化样式，<strong>C</strong> 风格</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>ret <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%d"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>				<span class="token comment">// 通过 下表 动词 格式化</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th style="text-align:center">动  词</th>
<th>功  能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">%v</td>
<td>按值的本来值输出</td>
</tr>
<tr>
<td style="text-align:center">%+v</td>
<td>在 %v 基础上，对结构体字段名和值进行展开</td>
</tr>
<tr>
<td style="text-align:center">%#v</td>
<td>输出 Go 语言语法格式的值</td>
</tr>
<tr>
<td style="text-align:center">%T</td>
<td>输出 Go 语言语法格式的类型和值</td>
</tr>
<tr>
<td style="text-align:center">%%</td>
<td>输出 % 本体</td>
</tr>
<tr>
<td style="text-align:center">%b</td>
<td>整型以二进制方式显示</td>
</tr>
<tr>
<td style="text-align:center">%o</td>
<td>整型以八进制方式显示</td>
</tr>
<tr>
<td style="text-align:center">%d</td>
<td>整型以十进制方式显示</td>
</tr>
<tr>
<td style="text-align:center">%x</td>
<td>整型以十六进制方式显示</td>
</tr>
<tr>
<td style="text-align:center">%X</td>
<td>整型以十六进制、字母大写方式显示</td>
</tr>
<tr>
<td style="text-align:center">%U</td>
<td>Unicode 字符</td>
</tr>
<tr>
<td style="text-align:center">%f</td>
<td>浮点数</td>
</tr>
<tr>
<td style="text-align:center">%p</td>
<td>指针，十六进制方式显示</td>
</tr>
</tbody>
</table>
<p><strong>Base64</strong> 转码</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>message <span class="token operator">:=</span> <span class="token string">"igarashi"</span>
encode64 <span class="token operator">:=</span> base64<span class="token punctuation">.</span>StdEncoding<span class="token punctuation">.</span><span class="token function">EncodeToString</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span> <span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>encode64<span class="token punctuation">)</span>
decode64<span class="token punctuation">,</span> err <span class="token operator">:=</span> base64<span class="token punctuation">.</span>StdEncoding<span class="token punctuation">.</span><span class="token function">DecodeString</span><span class="token punctuation">(</span>encode64<span class="token punctuation">)</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>decode64<span class="token punctuation">)</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>读 <strong>INI</strong> 配置文件示例</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 此时有 example.ini 文件要读</span>
<span class="token keyword">func</span> <span class="token function">getValue</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> expectSection<span class="token punctuation">,</span> expectKey <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	file<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token string">""</span>
	<span class="token punctuation">}</span>

	reader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span>

	<span class="token keyword">var</span> sectionName <span class="token builtin">string</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token comment">// 读取文件的一行</span>
		linestr<span class="token punctuation">,</span> err <span class="token operator">:=</span> reader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"err"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
		linestr <span class="token operator">=</span> strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span>linestr<span class="token punctuation">)</span>

		<span class="token keyword">if</span> linestr <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">if</span> linestr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">';'</span> <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">if</span> linestr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'['</span> <span class="token operator">&amp;&amp;</span> linestr<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>linestr<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">']'</span> <span class="token punctuation">{</span>
			sectionName <span class="token operator">=</span> linestr<span class="token punctuation">[</span><span class="token number">1</span> <span class="token punctuation">:</span> <span class="token function">len</span><span class="token punctuation">(</span>linestr<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> sectionName <span class="token operator">==</span> expectSection <span class="token punctuation">{</span>
			pair <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>linestr<span class="token punctuation">,</span> <span class="token string">"="</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>pair<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">2</span> <span class="token punctuation">{</span>
				key <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span>pair<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
				<span class="token keyword">if</span> key <span class="token operator">==</span> expectKey <span class="token punctuation">{</span>
					<span class="token keyword">return</span> strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span>pair<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">defer</span> file<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token string">""</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token string">"D:\\Program\\GoProjects\\src\\day02\\1.输出\\example.ini"</span><span class="token punctuation">,</span> <span class="token string">"global"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h3>
<p>指针被拆分为如下两个</p>
<ul>
<li><strong>类型指针：</strong> 可以改数据，传递数据用指针，<strong>不用拷贝省内存</strong>，但不能进行偏移和运算
<ul>
<li><strong>Go</strong> 指针不会发生指针偏移，包括垃圾回收</li>
</ul>
</li>
<li><strong>切片：</strong> 由指向其实元素的原始指针、元素数量 和 容量组成</li>
</ul>
<p><strong>&amp;：</strong> 取地址操作符</p>
<p><strong>*：</strong> 取值操作符，与 <strong>&amp;</strong> 互补</p>
<h5 id="声明" tabindex="-1"><a class="header-anchor" href="#声明" aria-hidden="true">#</a> <strong>声明：</strong></h5>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> ptr <span class="token operator">*</span><span class="token builtin">int</span>
str <span class="token operator">:=</span> <span class="token function">new</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>			<span class="token comment">// new 创建的 会有个初始的默认值 如 int 是 0， string 是 ""</span>
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ptr<span class="token punctuation">,</span> <span class="token operator">*</span>str<span class="token punctuation">)</span>
<span class="token comment">// &lt;nil> "" 未显示引号</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自动推导出：整型指针 <strong>a</strong> 指向 <strong>b</strong> 的地址，<strong>*a</strong> 是取 <strong>b</strong> 的值，<strong>a</strong> 是 <strong>b</strong> 的地址， <strong>&amp;a</strong> 是 <strong>a</strong> 的地址</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token number">1</span>
a <span class="token operator">:=</span> <span class="token operator">&amp;</span>b
fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"b:"</span><span class="token punctuation">,</span>b<span class="token punctuation">,</span> <span class="token operator">&amp;</span>b<span class="token punctuation">,</span> <span class="token string">"a:"</span><span class="token punctuation">,</span> <span class="token operator">*</span>a<span class="token punctuation">,</span> a<span class="token punctuation">,</span> <span class="token operator">&amp;</span>a<span class="token punctuation">)</span>
<span class="token comment">// b: 1 0xc00000e0d0 a: 1 0xc00000e0d0 0xc00000a038</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据类型转换" tabindex="-1"><a class="header-anchor" href="#数据类型转换" aria-hidden="true">#</a> 数据类型转换</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token function">T</span><span class="token punctuation">(</span>表达式<span class="token punctuation">)</span>					<span class="token comment">// 通常情况下， 转换的类型(被转换的变量) 这种形式即可</span>

<span class="token keyword">var</span> a <span class="token builtin">int</span> <span class="token number">32</span> <span class="token operator">=</span> <span class="token number">1047483647</span>
b <span class="token operator">:=</span> <span class="token function">int16</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> 				<span class="token comment">// 发生数值截断，32位int 转为 16位int</span>

<span class="token keyword">var</span> c <span class="token builtin">float32</span> <span class="token operator">=</span> math<span class="token punctuation">.</span>Pi
d <span class="token operator">=</span> <span class="token function">int</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>					<span class="token comment">// 发生精度丢失，小数后的被自动舍弃</span>

<span class="token comment">// 数字转字符串</span>

<span class="token comment">// 字符串转数字</span>

<span class="token comment">// 字符串 转 字符数组，直接转</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>

<span class="token comment">// 字符串 转 布尔</span>
ret<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">ParseBool</span><span class="token punctuation">(</span><span class="token string">"True"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container info">
<p class="custom-container-title">数值转换小提示</p>
<ul>
<li>注意不同数值类型之间转换(大转小)可能有截断，比如一个 <strong>int64</strong> 转成 <strong>int32</strong> 类型的数字</li>
<li>可以使用 <strong>int(float)</strong> 转换一个 浮点数到整数，小数部分会丢弃。但是如果浮点数的值超过了整数类型范围，结果是不可预期的</li>
<li>注意计算机使用二进制不能精确表示 <strong>float</strong> 数字，当比较两个浮点数时你要格外小心不能用等号直接比较。(通常作差绝对值小于一个很小的阈值)</li>
<li>业务中经常使用 <strong>float64</strong>，因为 <strong>math</strong> 函数很多接受 <strong>float64</strong> 作为参数</li>
<li>你可以通过 <strong>math.MaxInt32</strong> 类似的定义查看一个类型的最大值</li>
</ul>
</div>
<p>若情况复杂，可以使用 <strong><a href="https://github.com/spf13/cast" target="_blank" rel="noopener noreferrer">cast<ExternalLinkIcon/></a></strong> 转换 , 但注意，<strong>cast</strong> 不能转换自定义类型，比如声明 <code v-pre>type StringType string</code> <strong>ToString()</strong> 无法获取到想转义的字符串</p>
<hr>
<h2 id="_2-容器" tabindex="-1"><a class="header-anchor" href="#_2-容器" aria-hidden="true">#</a> 2. 容器</h2>
<h3 id="数组-array" tabindex="-1"><a class="header-anchor" href="#数组-array" aria-hidden="true">#</a> <RouterLink to="/go/%E7%AE%97%E6%B3%95%E4%B8%8E%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/%E6%95%B0%E7%BB%84.html">数组（array）</RouterLink></h3>
<h3 id="切片-slice" tabindex="-1"><a class="header-anchor" href="#切片-slice" aria-hidden="true">#</a> 切片（slice）</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="变量逃逸" tabindex="-1"><a class="header-anchor" href="#变量逃逸" aria-hidden="true">#</a> 变量逃逸</h3>
<p><strong>变量逃逸(<em>escape analysis</em> )：</strong>  是编译器进行内存分配的一种优化机制。</p>
<blockquote>
<p>需要理解几个关键点:</p>
<ol>
<li>
<p>Go中变量的分配方式有两种:</p>
<ul>
<li>栈分配: 函数调用结束后自动回收,性能好</li>
<li>堆分配: 需要GC回收,性能相对较差</li>
</ul>
</li>
<li>
<p>逃逸分析的目的:</p>
<ul>
<li>决定变量分配在栈还是堆</li>
<li>优化内存分配和回收</li>
<li>提高程序性能</li>
</ul>
</li>
<li>
<p>常见的逃逸场景:</p>
<ul>
<li>返回局部变量的指针</li>
<li>interface{}类型</li>
<li>切片扩容</li>
<li>闭包引用</li>
<li>goroutine中使用的变量</li>
</ul>
</li>
</ol>
</blockquote>
<h5 id="典型的逃逸场景" tabindex="-1"><a class="header-anchor" href="#典型的逃逸场景" aria-hidden="true">#</a> 典型的逃逸场景</h5>
<ol>
<li>
<p>返回局部变量的指针:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 变量x会逃逸到堆</span>
<span class="token keyword">func</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span><span class="token builtin">int</span> <span class="token punctuation">{</span>
    x <span class="token operator">:=</span> <span class="token number">42</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>x
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>interface{}类型:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// i会逃逸到堆</span>
<span class="token keyword">func</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> i <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    i <span class="token operator">=</span> <span class="token number">42</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>切片扩容:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 当切片扩容时,底层数组可能逃逸到堆</span>
<span class="token keyword">func</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    s <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        s <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>闭包引用:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// x会逃逸到堆,因为被闭包引用</span>
<span class="token keyword">func</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
    x <span class="token operator">:=</span> <span class="token number">42</span>
    <span class="token keyword">return</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>goroutine引用:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// x会逃逸到堆,因为被goroutine引用
func foo() {
    x := 42
    go func() {
        println(x)
    }()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>可以通过以下方式查看逃逸分析:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go build <span class="token parameter variable">-gcflags</span><span class="token operator">=</span><span class="token string">"-m"</span> your_file.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="避免不必要的逃逸的建议" tabindex="-1"><a class="header-anchor" href="#避免不必要的逃逸的建议" aria-hidden="true">#</a> 避免不必要的逃逸的建议:</h5>
<ul>
<li>尽量不要返回局部变量的指针</li>
<li>避免过度使用interface{}</li>
<li>合理预估切片容量,避免频繁扩容</li>
<li>注意闭包对变量的引用</li>
<li>对于小对象,优先使用值传递而不是指针</li>
</ul>
</div></template>


