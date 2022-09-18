<template><div><h1 id="字符编码" tabindex="-1"><a class="header-anchor" href="#字符编码" aria-hidden="true">#</a> 字符编码</h1>
<Alert type="info">`Python3` 明确区分了人类可读的 **文本字符串** 和原始的 **字节序列**</Alert><p><a href="https://docs.python.org/zh-cn/3.10/library/codecs.html#module-codecs" target="_blank" rel="noopener noreferrer">编解码器 文档<ExternalLinkIcon/></a></p>
<h2 id="_1-字符" tabindex="-1"><a class="header-anchor" href="#_1-字符" aria-hidden="true">#</a> 1. 字符</h2>
<h3 id="_1-1-编码中的字符串" tabindex="-1"><a class="header-anchor" href="#_1-1-编码中的字符串" aria-hidden="true">#</a> 1.1 编码中的字符串</h3>
<p><strong>“字符串”</strong> 是个相当简单的概念：字符串就是字符组成的序列，问题出现在 “<strong>字符</strong>” 的定义上</p>
<blockquote>
<p><strong>字符：</strong> 2015 年将字符最佳定义为 <strong>Unicode</strong> 字符，因此 <code v-pre>Python3</code> 的 <code v-pre>str</code> 对象获取的元素就是 <strong>Unicode</strong> 字符</p>
</blockquote>
<p><strong>Unicode</strong> 标准把 <strong>字符的标识</strong> 和具体的 <strong>字节表述</strong> 进行了如下区分</p>
<ul>
<li><strong>字符的标识</strong>：即 <code v-pre>码位</code> ，是 <code v-pre>0 ~ 1 114 111</code> 的数字 (十进制)，在 <strong>Unicode</strong> 标准中以 <code v-pre>4 ~ 6</code> 个十六进制数字表示，而且加前缀 <code v-pre>U+</code>
<ul>
<li><code v-pre>A</code> 的码位 为 <code v-pre>U+0041</code></li>
</ul>
</li>
<li><strong>字节表述</strong>：取决于所用的编码，在 <strong>UTF-8</strong> 编码中，<code v-pre>A (U+0041)</code> 的码位编码为单字节 <code v-pre>\x41</code>，而在 <code v-pre>UTF-16LE</code> 编码中编码成两个字节 <code v-pre>\x41\x00</code></li>
<li><strong>编码</strong>：在 <code v-pre>码位</code> 和 <code v-pre>字节序列</code> 之间转换时使用的算法</li>
</ul>
<Alert type="queen">把 `码位`（_字符串_） 转换成 `字节序列` （_字节串_） 的过程是**编码(encode)**，把 `字节序列` 转化为 `码位` 的过程是**解码(decode)**</Alert><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>s <span class="token operator">=</span> <span class="token string">"coffeé"</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span>

b_sequence <span class="token operator">=</span> s<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"utf8"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>b_sequence<span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>b_sequence<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>b_sequence<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token string">"utf8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># 6</span>
<span class="token comment"># b'coffe\xc3\xa9' 7</span>
<span class="token comment"># coffeé</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>字符串 <code v-pre>coffeé</code> 有 <strong>6</strong> 个 <strong>Unicode</strong> 字节</li>
<li><code v-pre>s.encode(&quot;utf8&quot;)</code> 使用 <code v-pre>UTF-8</code> 把 <code v-pre>str</code> 对象 编码为 <code v-pre>bytes</code> 对象，该对象以 <code v-pre>b</code> 开头</li>
<li>字节序列 <code v-pre>b_sequence</code> 有 <strong>7</strong> 个字节（在 <code v-pre>UTF-8</code> 中 <code v-pre>é</code> 的码位编码成 <strong>2</strong> 个字节）</li>
<li>使用 <code v-pre>bytes.decode(&quot;utf-8&quot;)</code> 将 <code v-pre>bytes</code> 对象解码为 <code v-pre>str</code> 对象</li>
</ul>
<h3 id="_1-2-python-编码发展史" tabindex="-1"><a class="header-anchor" href="#_1-2-python-编码发展史" aria-hidden="true">#</a> 1.2 Python 编码发展史</h3>
<h5 id="_1-2-1-ascii-码" tabindex="-1"><a class="header-anchor" href="#_1-2-1-ascii-码" aria-hidden="true">#</a> <strong>1.2.1 ASCII 码</strong></h5>
<p>用 <strong>8</strong> 位，即 <strong>一个字节</strong> 表示字符 <code v-pre>0 ~ 127</code> 已编好的 <strong>英文</strong> 和 <strong>拉丁字符</strong></p>
<blockquote>
<p>后为了扩容，各国根据索引等方式又进行进一步的编码</p>
<p><strong>中国：</strong></p>
<ul>
<li><code v-pre>gb2312</code>: 只收录了约 6700 多个中文 (1980 年)</li>
<li><code v-pre>gbk1.0</code>: 收录了 2 万 多个字符 (1995 年)</li>
<li><code v-pre>gb18030</code>：27000 左右中文 (2000 年)</li>
</ul>
</blockquote>
<h5 id="_1-2-2-unicode-万国码" tabindex="-1"><a class="header-anchor" href="#_1-2-2-unicode-万国码" aria-hidden="true">#</a> <strong>1.2.2 Unicode 万国码</strong></h5>
<p><strong>Unicode</strong>: 兼容各国的编码，是一种国际通用标准， <code v-pre>utf-8</code> 则是 <strong>Unicode</strong> 的子集</p>
<ul>
<li>
<p><code v-pre>utf-32</code>: 即一个字符占 <strong>32</strong> 位 <strong>4</strong> 字节</p>
</li>
<li>
<p><code v-pre>utf-16</code>: 一个字符占 <strong>2</strong> 字节 及以上，<strong>65535</strong></p>
</li>
<li>
<p><code v-pre>utf-8</code>: <strong>Unicode</strong> 的子集，英文用 <strong>ASCII</strong> 码 来存储</p>
<blockquote>
<p>亚洲国家，如: <strong>中 / 日</strong> 用 <strong>3</strong> 个字节</p>
</blockquote>
</li>
</ul>
<h5 id="_1-2-3-python-的编码" tabindex="-1"><a class="header-anchor" href="#_1-2-3-python-的编码" aria-hidden="true">#</a> <strong>1.2.3 Python 的编码</strong></h5>
<p><strong>Python2</strong> 的默认编码为 <strong>ASCII</strong> 码，字符串也都是字节，故文件头通常声明编码方式，如</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment">#-- coding:utf-8 --</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>Python2</strong> 要声明 <code v-pre>coding:utf-8</code>，告诉用 <strong>ASCII</strong> 编码解释器是 <strong>utf-8</strong> 编码的文件
<ul>
<li><strong>解释器：</strong> 打开文件，将一行行代码放到内存解释</li>
</ul>
</li>
<li>而 <strong>Python2</strong> 存储的也是 <strong>utf-8</strong> 编码的文件</li>
<li>解释器 和 <strong>磁盘存盘的编码一致</strong> 才能顺利执行，不会乱码</li>
</ul>
<p><strong>Python3</strong> 则不同于 <strong>2</strong>，默认是 <strong>Unicode</strong> 万国码，<code v-pre>u''</code>（<em>省略</em>）表示，故可以在 <code v-pre>gbk</code> 编码下正常显示中文</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> sys

<span class="token comment"># 检测系统编码</span>
sys<span class="token punctuation">.</span>getdefaultencoding<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 'utf-8'</span>

str_a <span class="token operator">=</span> <span class="token string">u"中文字符串"</span>
str_a<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"utf-8"</span><span class="token punctuation">)</span>
<span class="token comment">## b'\xe4\xb8\xad\xe6\x96\x87\xe5\xad\x97\xe7\xac\xa6\xe4\xb8\xb2'</span>

bytes_b <span class="token operator">=</span> str_a<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token string">"gbk"</span><span class="token punctuation">)</span>
<span class="token comment">## b'\xd6\xd0\xce\xc4\xd7\xd6\xb7\xfb\xb4\xae'</span>

bytes_b<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token string">"gbk"</span><span class="token punctuation">)</span>
<span class="token comment">## '中文字符串'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>str_a</code> 定义了一串中文字符串，不同编码形式的下的字节串不同</li>
<li><code v-pre>b''</code> 即 <strong>bytes</strong> 字节，为 <strong>16</strong> 进制 <code v-pre>[0-255]</code> 的数字，每个国家都有自己的 <strong>bytes</strong></li>
<li><code v-pre>str_a.encode(&quot;gbk&quot;)</code> 返回了按 <strong>gbk</strong> 编码后， <strong>bytes</strong> 类型的字节串码（<em>密文</em>）</li>
<li><code v-pre>bytes_b.decode(&quot;gbk&quot;)</code> 按照 <strong>gbk</strong> 编码，又解码回为原来的 <strong>Unicode</strong> 字符串</li>
</ul>
<p>编码、转码通常在 <strong>数据传输</strong>、<strong>交互</strong> 等使用</p>
<p>若需要查看中文字符的万国码，可使用</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>s <span class="token operator">=</span> <span class="token string">"你好hello"</span>

json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>s<span class="token punctuation">)</span>
<span class="token comment">## '"\\u4f60\\u597dhello"'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python3</strong> 下 <code v-pre>.py</code> 存储的文件，的确是 <strong>utf-8</strong> 编码，但内存生成时会变为 <strong>Unicode</strong> 编码，这是为了符合 <strong>ISO</strong> 统一标准，传给 <strong>解释器</strong> 执行</p>
<hr>
<h2 id="_2-常见问题" tabindex="-1"><a class="header-anchor" href="#_2-常见问题" aria-hidden="true">#</a> 2. 常见问题</h2>
<h3 id="_2-1-操作系统编码" tabindex="-1"><a class="header-anchor" href="#_2-1-操作系统编码" aria-hidden="true">#</a> 2.1 操作系统编码</h3>
<p>查看 <strong>Linux</strong> 操作系统语言环境变量</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">echo</span> <span class="token environment constant">$LANG</span>
<span class="token comment"># zh_CN.UTF-8 或 en_US.UTF-8 之类的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当出现中文时，可能会导致引用的库，执行命令异常，如 <strong>nmcli</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 源码: nmcli._syscmd = SystemCommand().nmcli</span>
<span class="token comment"># 默认 'LAN' 为 C</span>

r <span class="token operator">=</span> self<span class="token punctuation">.</span>_run<span class="token punctuation">(</span>commands<span class="token punctuation">,</span> capture_output<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> check<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> env<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">'LANG'</span><span class="token punctuation">:</span> <span class="token string">'zh_CN.UTF-8'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>此时需对源码进行继承和改写</p>
</li>
<li>
<p>或若允许，可直接设置环境变量为 <code v-pre>C.UTF-8</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">LANG</span></span><span class="token operator">=</span>C.UTF-8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</div></template>


