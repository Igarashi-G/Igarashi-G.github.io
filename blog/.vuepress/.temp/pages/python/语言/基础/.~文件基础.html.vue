<template><div><h1 id="文件" tabindex="-1"><a class="header-anchor" href="#文件" aria-hidden="true">#</a> 文件</h1>
<h2 id="_1-文件基础" tabindex="-1"><a class="header-anchor" href="#_1-文件基础" aria-hidden="true">#</a> 1. 文件基础</h2>
<p><strong>Unix</strong> 理念：一切皆文件</p>
<ul>
<li>包括操作系统，所有的一切都是文件</li>
<li>因此对于所有，无非涉及：<strong>打开</strong> 、<strong>操作</strong> 、 <strong>关闭</strong> 这 <strong>3</strong> 个动作，即文件操作的雏形</li>
</ul>
<h3 id="_1-1-文件操作" tabindex="-1"><a class="header-anchor" href="#_1-1-文件操作" aria-hidden="true">#</a> 1.1 文件操作</h3>
<p><strong>Python</strong> 操作文件使用 <a href="https://docs.python.org/zh-cn/3.10/library/functions.html#open" target="_blank" rel="noopener noreferrer">open()<ExternalLinkIcon/></a></p>
<p><strong>open(file, mode='r', buffering=- 1, encoding=None, errors=None, newline=None, closefd=True, opener=None)</strong></p>
<p>打开 文件 <strong>file</strong>，并返回对应的 <strong>文件对象</strong>，有如下三种</p>
<ol>
<li>
<p>原始 <a href="https://docs.python.org/zh-cn/3.10/glossary.html#term-binary-file" target="_blank" rel="noopener noreferrer">二进制文件<ExternalLinkIcon/></a></p>
</li>
<li>
<p>缓冲 <a href="https://docs.python.org/zh-cn/3.10/glossary.html#term-binary-file" target="_blank" rel="noopener noreferrer">二进制文件<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://docs.python.org/zh-cn/3.10/glossary.html#term-text-file" target="_blank" rel="noopener noreferrer">文本文件<ExternalLinkIcon/></a></p>
</li>
</ol>
<ul>
<li><a href="https://docs.python.org/zh-cn/3.10/library/io.html#io-overview" target="_blank" rel="noopener noreferrer">参考 I/O<ExternalLinkIcon/></a></li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 假设有文本文件 1.txt</span>
filename <span class="token operator">=</span> <span class="token string">"1.txt"</span>

f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> mode <span class="token operator">=</span> <span class="token string">"r"</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">"utf-8"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>mode: str</code> 可指定如下，可 <strong>任意组合</strong></p>
<table>
<thead>
<tr>
<th style="text-align:left">mode 字符</th>
<th style="text-align:left">含意</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>'r'</code></td>
<td style="text-align:left"><strong>读取</strong>（默认），以文本模式打开并读取</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>'w'</code></td>
<td style="text-align:left"><strong>写入</strong>，存在则清空等待写入，无则创建</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>'x'</code></td>
<td style="text-align:left">排它性创建，如果文件已存在则失败</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>'a'</code></td>
<td style="text-align:left">打开文件用于写入，如果文件存在则在末尾<strong>追加</strong></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>'b'</code></td>
<td style="text-align:left">用二进制的模式打开文件，返回 <strong>bytes</strong>，不解码</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>'t'</code></td>
<td style="text-align:left">用文本模式（默认）打开，返回 <strong>str</strong>，指定解码</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>'+'</code></td>
<td style="text-align:left">打开用于更新（<strong>读取与写入</strong>）</td>
</tr>
</tbody>
</table>
<ul>
<li><code v-pre>r+</code> 最常用，即可读写模式</li>
<li><code v-pre>w+</code> 写读模式，与 <code v-pre>r+</code> 区别在，会 <strong>先执行</strong> 一次 <code v-pre>.trancate()</code> 操作</li>
<li><code v-pre>a+</code> 追加写模式，用的少</li>
</ul>
</li>
<li>
<p><code v-pre>encoding: str</code> 指定编码方式</p>
</li>
<li>
<p><code v-pre>f = open(...)</code> 获取文件对象（<em>句柄</em> / <em>文件描述符</em>）</p>
</li>
</ul>
<h5 id="常用方法" tabindex="-1"><a class="header-anchor" href="#常用方法" aria-hidden="true">#</a> <strong>常用方法</strong></h5>
<p>此时返回的文件对象 <code v-pre>f</code> 具有如下常用方法</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>f<span class="token punctuation">.</span>read<span class="token punctuation">(</span>size<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>				<span class="token comment"># 读取	读取文件的 5个字符(中英同)，省略、负数，则是读所有</span>

f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">"\t 2333\n"</span><span class="token punctuation">)</span>		<span class="token comment"># 写入	往文件中写入字符串 "\t 2333\n"</span>

f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span> 					<span class="token comment"># 关闭	关闭文件句柄，若不关闭，python默认机制也会关闭，但不可靠</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>执行 <code v-pre>write()</code> 操作时，<strong>会将写入的字符串暂存到缓冲区</strong>，只有执行 <code v-pre>close()</code> 操作后，才会落盘</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>f<span class="token punctuation">.</span>readline<span class="token punctuation">(</span><span class="token punctuation">)</span> 				<span class="token comment"># 读取一行	从文件中读取单行数据，会保留换行符 `\n`</span>

f<span class="token punctuation">.</span>readlines<span class="token punctuation">(</span><span class="token punctuation">)</span> 				<span class="token comment"># 读取所有	将所有内容返回为列表（1行 == 1个元素)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>使用 <code v-pre>readlines()</code> 很快，但<strong>有内存开销</strong>，因此对于大容量文件，常用无内存开销的 <strong>迭代器</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> line <span class="token keyword">in</span> f<span class="token punctuation">:</span>
	<span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token string">''</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>f<span class="token punctuation">.</span>tell<span class="token punctuation">(</span><span class="token punctuation">)</span> 					<span class="token comment"># 取位置	返回游标整数，给出文件对象在文件中的当前位置</span>

f<span class="token punctuation">.</span>seek<span class="token punctuation">(</span>offset<span class="token punctuation">,</span> whence<span class="token punctuation">)</span> 		<span class="token comment"># 改位置	修改文件对象的游标</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>通常用于客户端向服务端发送文件，断网后的 <strong>断点续传</strong>，<code v-pre>tell()</code> 返回游标，再用 <code v-pre>seek(index)</code> 指定断点，继续传输</p>
</li>
<li>
<p><code v-pre>seek(0)</code> 表示文件头</p>
</li>
<li>
<p>通过向 <code v-pre>whence</code> （<em>参考点</em>），添加 <code v-pre>offset</code>（<em>偏移</em>） 计算位置， <code v-pre>whence</code> 值如下</p>
<ul>
<li>默认值为 <strong>0</strong> ，表示从文件开头计算</li>
<li>指定 <strong>1</strong> ，表示使用当前文件位置</li>
<li>指定 <strong>2</strong>， 表示从文件末尾计算</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">'1.txt'</span><span class="token punctuation">,</span> <span class="token string">'rb+'</span><span class="token punctuation">)</span>
f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">b'0123456789abcdef'</span><span class="token punctuation">)</span>

f<span class="token punctuation">.</span>seek<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>		<span class="token comment"># 将文件对象的游标指向 第6顺位</span>
<span class="token comment">## 5</span>
f<span class="token punctuation">.</span>tell<span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment"># 返回游标</span>
<span class="token comment">## 5</span>
f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>		<span class="token comment"># 读取 文件对象的第1个字节</span>
<span class="token comment">## b'5'</span>

f<span class="token punctuation">.</span>seek<span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>	<span class="token comment"># 尾部参考点, 将文件对象的游标指向 第3逆位</span>
<span class="token comment">## 13</span>
f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment">## b'd'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="不常用方法" tabindex="-1"><a class="header-anchor" href="#不常用方法" aria-hidden="true">#</a> 不常用方法</h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>f<span class="token punctuation">.</span>flush<span class="token punctuation">(</span><span class="token punctuation">)</span>			<span class="token comment"># 刷新	刷新文件内部缓冲，将缓冲区的文件立即写入文件，.close()会自动刷新缓冲区</span>
    <span class="token comment"># - 常用来提前落盘，防止断电内存丢数据</span>
    <span class="token comment"># - 写命令行显示的 进度条 sys.stdout.write("*")  sys.stdout.flush()</span>
	<span class="token comment"># - .close()会自动刷新缓冲区</span>


f<span class="token punctuation">.</span>trancate<span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment"># 截断	从指定长度进行截断，此时只能获取截断前的字符</span>
	<span class="token comment"># - 空参为0，此时截取 0个字符串，即清空</span>
    <span class="token comment"># - "w" 则是默认执行一次</span>


f<span class="token punctuation">.</span>flieno<span class="token punctuation">(</span><span class="token punctuation">)</span>			<span class="token comment"># 返回一个整型的文件描述符 (文件在内存中 唯一创建 的文件编号)</span>
f<span class="token punctuation">.</span>isatty<span class="token punctuation">(</span><span class="token punctuation">)</span>			<span class="token comment"># 检测文件对象 是否连接到一个 终端设备 (如打印机)</span>

f<span class="token punctuation">.</span>readable<span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment"># 是否可读</span>
f<span class="token punctuation">.</span>writeable<span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment"># 是否可写</span>
f<span class="token punctuation">.</span>seekable<span class="token punctuation">(</span><span class="token punctuation">)</span>		<span class="token comment"># 是否可追踪</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="_2-上下文管理器" tabindex="-1"><a class="header-anchor" href="#_2-上下文管理器" aria-hidden="true">#</a> 2. 上下文管理器</h2>
<p><strong>Python</strong> 通过 <a href="https://docs.python.org/zh-cn/3.10/reference/compound_stmts.html#with" target="_blank" rel="noopener noreferrer">with 语句<ExternalLinkIcon/></a>，支持 <strong>上下文管理器</strong> 所定义的，<strong>运行时上下文</strong></p>
<ul>
<li>上下文管理器，是个实现了<strong>上下文管理协议</strong>（<em>context management protocol</em>）的对象，实现它需要<code v-pre>__enter__</code> / <code v-pre>__exit__</code> 俩方法，本质是装饰器</li>
<li>它允许用户 <strong>自定义类</strong> 来 <strong>定义运行时的上下文</strong></li>
<li>它会在 <strong>语句体被执行前</strong>（<em>代码执行前</em>） 进入该上下文，并在 <strong>语句执行完毕时</strong> （<em>代码执行后</em>） 退出该上下文</li>
</ul>
<h3 id="_2-1-管理协议" tabindex="-1"><a class="header-anchor" href="#_2-1-管理协议" aria-hidden="true">#</a> 2.1 管理协议</h3>
<p>实现管理协议，需要实现如下 <strong>两个方法</strong></p>
<p><strong>contextmanager.<code v-pre>__enter__()</code></strong></p>
<p>调用 <code v-pre>with</code> 时，会通过该方法 <strong>进入运行时上下文</strong>，若 <code v-pre>with</code> 语句中有 <code v-pre>as</code> 子句，<strong>返回值</strong> 会绑定给 <code v-pre>as</code> 后的变量</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">"/etc/hosts"</span><span class="token punctuation">,</span> <span class="token string">"r"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
    <span class="token builtin">dir</span><span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">)</span>

<span class="token comment">## [..., '__enter__', '__exit__', ...]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>文件对象会从 <code v-pre>__enter__()</code> 返回当前对象（<em>自己</em>），让 <code v-pre>open()</code> 作为 <code v-pre>with</code> 语句的上下文表达式</li>
<li>返回的文件对象会赋值给 <code v-pre>file</code> 变量，该对象的文件类实现了上下文管理协议</li>
</ul>
<br/>
<p><strong>contextmanager.<code v-pre>__exit__</code>(exc_type, exc_val, exc_tb) -&gt; bool</strong></p>
<p><strong>退出运行时的上下文</strong>，若运行时发生异常，则会退出上下文管理器，并 <strong>调用此方法</strong>，它返回一个 <strong>bool</strong> 标识，来检测是否有需要处理的异常，退出时参数如下</p>
<ul>
<li><code v-pre>exc_type</code> <strong>异常类型</strong></li>
<li><code v-pre>exc_val</code> <strong>异常值</strong></li>
<li><code v-pre>exc_tb</code> <strong>异常追踪信息</strong></li>
</ul>
<p>若未发生异常，则三个参数都为 <code v-pre>None</code></p>
<h3 id="_2-2-with-语句" tabindex="-1"><a class="header-anchor" href="#_2-2-with-语句" aria-hidden="true">#</a> 2.2 with 语句</h3>
<p>为了 <strong>支持上下文管理器存在的</strong>，使用上下文管理协议的方法包裹一个代码块，可为 <code v-pre>try - except - finally</code> 提供方便的封装，写法如下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">with</span> EXPRESSION  <span class="token keyword">as</span> TARGET<span class="token punctuation">:</span>
	BLOCK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>with</code> 和 <code v-pre>as</code> 是 <strong>关键词</strong>， 其中 <code v-pre>as</code> 可选</li>
<li><code v-pre>EXPRESSION</code> 是 <strong>上下文表达式</strong></li>
<li><code v-pre>TARGET</code> 是赋值的目标变量</li>
<li><code v-pre>BLOCK</code> 被包裹的代码块</li>
</ul>
<p>语义上，等同于</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>manager <span class="token operator">=</span> <span class="token punctuation">(</span>EXPRESSION<span class="token punctuation">)</span>						<span class="token comment"># 上下文管理器的表达式</span>
enter <span class="token operator">=</span> <span class="token builtin">type</span><span class="token punctuation">(</span>manager<span class="token punctuation">)</span><span class="token punctuation">.</span>__enter__				<span class="token comment"># 通过 __enter__ 初始化 exit</span>
exit <span class="token operator">=</span> <span class="token builtin">type</span><span class="token punctuation">(</span>manager<span class="token punctuation">)</span><span class="token punctuation">.</span>__exit__  				<span class="token comment"># 通过 __exit__ 初始化 exit</span>
value <span class="token operator">=</span> enter<span class="token punctuation">(</span>manager<span class="token punctuation">)</span>						<span class="token comment"># 调用 enter() 执行上下文</span>
hit_except <span class="token operator">=</span> <span class="token boolean">False</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>
    TARGET <span class="token operator">=</span> value							<span class="token comment"># 如果有 "as TARGET"</span>
    BLOCK

<span class="token keyword">except</span><span class="token punctuation">:</span>
    hit_except <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> exit<span class="token punctuation">(</span>manager<span class="token punctuation">,</span> <span class="token operator">*</span>sys<span class="token punctuation">.</span>exc_info<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>	<span class="token comment"># 捕获异常则执行 exit()， 尝试退出</span>
        <span class="token keyword">raise</span>
        <span class="token comment"># 若__exit__()返回 False，异常将被传播（无法处理）;若返回 True，异常将被终止（正常解决）</span>

<span class="token keyword">finally</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> hit_except<span class="token punctuation">:</span>
        exit<span class="token punctuation">(</span>manager<span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span>		<span class="token comment"># 无异常发生，则执行 exit() 正常退出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3.1</strong> 后可以组合 <strong>多种</strong> 表达式</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">with</span> A<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> a<span class="token punctuation">,</span> B<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> b<span class="token punctuation">:</span>
    BLOCK

<span class="token comment"># 等价于</span>
<span class="token keyword">with</span> A<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> a<span class="token punctuation">:</span>
    <span class="token keyword">with</span> B<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> b<span class="token punctuation">:</span>
        BLOCK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-自定义上下文管理器" tabindex="-1"><a class="header-anchor" href="#_2-3-自定义上下文管理器" aria-hidden="true">#</a> 2.3 自定义上下文管理器</h3>
<p>当 <code v-pre>with</code> 语句不使用 <code v-pre>as</code> 关键词，会直接返回当前对象</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ContextManager</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"__init__()"</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__enter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"__enter__()"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> self

    <span class="token keyword">def</span> <span class="token function">__exit__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> exc_type<span class="token punctuation">,</span> exc_val<span class="token punctuation">,</span> exc_tb<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"__exit__() - param: </span><span class="token interpolation"><span class="token punctuation">{</span>exc_type<span class="token punctuation">,</span> exc_val<span class="token punctuation">,</span> exc_tb<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token keyword">with</span> ContextManager<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"被自定义上下文 包裹的代码块"</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># __init__()</span>
<span class="token comment"># __enter__()</span>
<span class="token comment"># 被自定义上下文 包裹的代码块</span>
<span class="token comment"># __exit__() - param: (None, None, None)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于异常处理</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">InnerContext</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"InnerContext.__init__(</span><span class="token interpolation"><span class="token punctuation">{</span>obj<span class="token punctuation">}</span></span><span class="token string">)"</span></span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">do_something</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"InnerContext.do_something()"</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__del__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"InnerContext.__del__()"</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">ContextManager</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> flag<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"ContextManager.__init__(flag)"</span></span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>flag <span class="token operator">=</span> flag

    <span class="token keyword">def</span> <span class="token function">__enter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"ContextManager.__enter__()"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> InnerContext<span class="token punctuation">(</span>self<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__exit__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> exc_type<span class="token punctuation">,</span> exc_val<span class="token punctuation">,</span> exc_tb<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"ContextManager.__exit__(</span><span class="token interpolation"><span class="token punctuation">{</span>exc_type<span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span>exc_val<span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span>exc_tb<span class="token punctuation">}</span></span><span class="token string">)"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>flag

<span class="token keyword">with</span> ContextManager<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span> <span class="token keyword">as</span> obj<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"obj = </span><span class="token interpolation"><span class="token punctuation">{</span>obj<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
    obj<span class="token punctuation">.</span>do_something<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">raise</span> RuntimeError<span class="token punctuation">(</span><span class="token string">'error message handled'</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># ContextManager.__init__(flag)</span>
<span class="token comment"># ContextManager.__enter__()</span>
<span class="token comment"># InnerContext.__init__(&lt;__main__.ContextManager object at 0x000001C3676978E0>)</span>
<span class="token comment"># InnerContext.__del__()</span>
<span class="token comment"># obj = &lt;__main__.InnerContext object at 0x000001C367703820></span>
<span class="token comment"># InnerContext.do_something()</span>
<span class="token comment"># ContextManager.__exit__(&lt;class 'RuntimeError'>, error message handled, &lt;traceback object at 0x000001C3677B4BC0>)</span>
<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>

<span class="token keyword">with</span> ContextManager<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span> <span class="token keyword">as</span> obj<span class="token punctuation">:</span>
    <span class="token keyword">raise</span> RuntimeError<span class="token punctuation">(</span><span class="token string">'error message propagated'</span><span class="token punctuation">)</span>	<span class="token comment"># 异常传播</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># ContextManager.__init__(flag)</span>
<span class="token comment"># ContextManager.__enter__()</span>
<span class="token comment"># InnerContext.__init__(&lt;__main__.ContextManager object at 0x000001C3677D67F0>)</span>
<span class="token comment"># InnerContext.__del__()</span>
<span class="token comment"># ContextManager.__exit__(&lt;class 'RuntimeError'>, error message propagated, &lt;traceback object at 0x000001C367755900>)</span>
<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>
<span class="token comment"># RuntimeError                              Traceback (most recent call last)</span>
<span class="token comment"># &lt;ipython-input-125-02e252020534> in &lt;module></span>
<span class="token comment">#       1 with ContextManager(False) as obj:</span>
<span class="token comment"># ----> 2     raise RuntimeError('error message propagated')</span>
<span class="token comment">#       3</span>

<span class="token comment"># RuntimeError: error message propagated</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>对于 <code v-pre>__exit__()</code> 的返回值为 <code v-pre>True</code> ，表示正常退出，不会继续 <code v-pre>raise</code> 传播</li>
</ul>
<hr>
<h2 id="_3-进阶" tabindex="-1"><a class="header-anchor" href="#_3-进阶" aria-hidden="true">#</a> 3. 进阶</h2>
<ul>
<li>
<p><RouterLink to="/python/%E5%BA%93/%E6%A0%87%E5%87%86%E5%BA%93%E8%BF%9B%E9%98%B6/%E8%BF%90%E8%A1%8C%E6%97%B6%E6%9C%8D%E5%8A%A1.html#contextlib">contextlib 模块</RouterLink> : 通过 <strong>生成器 / 装饰器</strong> 来实现 <strong>上下文管理器</strong></p>
</li>
<li>
<p><a href="https://docs.python.org/zh-cn/3.10/library/contextlib.html?highlight=contextlib#module-contextlib" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


