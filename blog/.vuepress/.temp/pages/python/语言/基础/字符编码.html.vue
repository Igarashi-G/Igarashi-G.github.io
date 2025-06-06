<template><div><p>是否重要取决于编程场景，对只处理 <strong>ASCII</strong> 文本的程序员没有影响</p>
<!-- more -->
<h1 id="字符编码" tabindex="-1"><a class="header-anchor" href="#字符编码"><span>字符编码</span></a></h1>
<p><strong>Python3</strong> 明确区分了人类可读的 <strong>文本字符串</strong> 和原始的 <strong>字节序列</strong></p>
<p><a href="https://docs.python.org/zh-cn/3.10/library/codecs.html#module-codecs" target="_blank" rel="noopener noreferrer">编解码器 文档</a></p>
<h2 id="_1-字符" tabindex="-1"><a class="header-anchor" href="#_1-字符"><span>1. 字符</span></a></h2>
<h3 id="_1-1-编码中的字符串" tabindex="-1"><a class="header-anchor" href="#_1-1-编码中的字符串"><span>1.1 编码中的字符串</span></a></h3>
<p><strong>字符串：</strong> 字符组成的序列，问题出现在 “<strong>字符</strong>” 的定义上</p>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p><strong>字符：</strong> 2015 年将字符最佳定义为 <strong>Unicode</strong> 字符，因此 <strong>Python3</strong> 的 <code v-pre>str</code> 对象获取的元素就是 <strong>Unicode</strong> 字符</p>
</div>
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
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>把 <code v-pre>码位</code>（<em>字符串</em>） 转换成 <code v-pre>字节序列</code> （<em>字节串</em>） 的过程是<strong>编码(encode)</strong>，把 <code v-pre>字节序列</code> 转化为 <code v-pre>码位</code> 的过程是<strong>解码(decode)</strong></p>
</div>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">s </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "coffeé"</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(s))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">b_sequence </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> s.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">encode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"utf8"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(b_sequence, </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(b_sequence))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(b_sequence.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">decode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"utf8"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">### 输出结果</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 6</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># b'coffe\xc3\xa9' 7</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># coffeé</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>字符串 <code v-pre>coffeé</code> 有 <strong>6</strong> 个 <strong>Unicode</strong> 字节</li>
<li><code v-pre>s.encode(&quot;utf8&quot;)</code> 使用 <code v-pre>UTF-8</code> 把 <code v-pre>str</code> 对象 编码为 <code v-pre>bytes</code> 对象，该对象以 <code v-pre>b</code> 开头</li>
<li>字节序列 <code v-pre>b_sequence</code> 有 <strong>7</strong> 个字节（在 <code v-pre>UTF-8</code> 中 <code v-pre>é</code> 的码位编码成 <strong>2</strong> 个字节）</li>
<li>使用 <code v-pre>bytes.decode(&quot;utf-8&quot;)</code> 将 <code v-pre>bytes</code> 对象解码为 <code v-pre>str</code> 对象</li>
</ul>
<h3 id="_1-2-python-编码发展史" tabindex="-1"><a class="header-anchor" href="#_1-2-python-编码发展史"><span>1.2 Python 编码发展史</span></a></h3>
<h5 id="_1-2-1-ascii-码" tabindex="-1"><a class="header-anchor" href="#_1-2-1-ascii-码"><span><strong>1.2.1 ASCII 码</strong></span></a></h5>
<p>用 <strong>8</strong> 位，即 <strong>一个字节</strong> 表示字符 <code v-pre>0 ~ 127</code> 已编好的 <strong>英文</strong> 和 <strong>拉丁字符</strong></p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>后为了扩容，各国根据索引等方式又进行进一步的编码</p>
<p><strong>中国：</strong></p>
<ul>
<li><code v-pre>gb2312</code>: 只收录了约 6700 多个中文 (1980 年)</li>
<li><code v-pre>gbk1.0</code>: 收录了 2 万 多个字符 (1995 年)</li>
<li><code v-pre>gb18030</code>：27000 左右中文 (2000 年)</li>
</ul>
</div>
<h5 id="_1-2-2-unicode-万国码" tabindex="-1"><a class="header-anchor" href="#_1-2-2-unicode-万国码"><span><strong>1.2.2 Unicode 万国码</strong></span></a></h5>
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
<h5 id="_1-2-3-python-的编码" tabindex="-1"><a class="header-anchor" href="#_1-2-3-python-的编码"><span><strong>1.2.3 Python 的编码</strong></span></a></h5>
<p><strong>Python2</strong> 的默认编码为 <strong>ASCII</strong> 码，字符串也都是字节，故文件头通常声明编码方式，如</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#-- coding:utf-8 --</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong>Python2</strong> 要声明 <code v-pre>coding:utf-8</code>，告诉用 <strong>ASCII</strong> 编码解释器是 <strong>utf-8</strong> 编码的文件
<ul>
<li><strong>解释器：</strong> 打开文件，将一行行代码放到内存解释</li>
</ul>
</li>
<li>而 <strong>Python2</strong> 存储的也是 <strong>utf-8</strong> 编码的文件</li>
<li>解释器 和 <strong>磁盘存盘的编码一致</strong> 才能顺利执行，不会乱码</li>
</ul>
<p><strong>Python3</strong> 则不同于 <strong>2</strong>，默认是 <strong>Unicode</strong> 万国码，<code v-pre>u''</code>（<em>省略</em>）表示，故可以在 <code v-pre>gbk</code> 编码下正常显示中文</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sys</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 检测系统编码</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sys.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">getdefaultencoding</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 'utf-8'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">str_a </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> u</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"中文字符串"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">str_a.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">encode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"utf-8"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## b'\xe4\xb8\xad\xe6\x96\x87\xe5\xad\x97\xe7\xac\xa6\xe4\xb8\xb2'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">bytes_b </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> str_a.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">encode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"gbk"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## b'\xd6\xd0\xce\xc4\xd7\xd6\xb7\xfb\xb4\xae'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">bytes_b.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">decode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"gbk"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## '中文字符串'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>str_a</code> 定义了一串中文字符串，不同编码形式的下的字节串不同</li>
<li><code v-pre>b''</code> 即 <strong>bytes</strong> 字节，为 <strong>16</strong> 进制 <code v-pre>[0-255]</code> 的数字，每个国家都有自己的 <strong>bytes</strong></li>
<li><code v-pre>str_a.encode(&quot;gbk&quot;)</code> 返回了按 <strong>gbk</strong> 编码后， <strong>bytes</strong> 类型的字节串码（<em>密文</em>）</li>
<li><code v-pre>bytes_b.decode(&quot;gbk&quot;)</code> 按照 <strong>gbk</strong> 编码，又解码回为原来的 <strong>Unicode</strong> 字符串</li>
</ul>
<p>编码、转码通常在 <strong>数据传输</strong>、<strong>交互</strong> 等使用</p>
<p>若需要查看中文字符的万国码，可使用</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">s </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "你好hello"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">json.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">dumps</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(s)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## '"\\u4f60\\u597dhello"'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Python3</strong> 下 <code v-pre>.py</code> 存储的文件，的确是 <strong>utf-8</strong> 编码，但内存生成时会变为 <strong>Unicode</strong> 编码，这是为了符合 <strong>ISO</strong> 统一标准，传给 <strong>解释器</strong> 执行</p>
<hr>
<h2 id="_2-常见问题" tabindex="-1"><a class="header-anchor" href="#_2-常见问题"><span>2. 常见问题</span></a></h2>
<h3 id="_2-1-操作系统编码" tabindex="-1"><a class="header-anchor" href="#_2-1-操作系统编码"><span>2.1 操作系统编码</span></a></h3>
<p>查看 <strong>Linux</strong> 操作系统语言环境变量</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> echo</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $LANG</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># zh_CN.UTF-8 或 en_US.UTF-8 之类的</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>当出现中文时，可能会导致引用的库，执行命令异常，如 <strong>nmcli</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 源码: nmcli._syscmd = SystemCommand().nmcli</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 默认 'LAN' 为 C</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">r </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">_run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(commands, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">capture_output</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">check</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">env</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'LANG'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'zh_CN.UTF-8'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">})</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>此时需对源码进行继承和改写</p>
</li>
<li>
<p>或若允许，可直接设置环境变量为 <code v-pre>C.UTF-8</code></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> export</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> LANG=C.UTF-8</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</div></template>


