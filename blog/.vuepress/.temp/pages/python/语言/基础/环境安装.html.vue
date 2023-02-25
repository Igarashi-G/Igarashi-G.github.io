<template><div><p>Python下载 &amp; Pycharm 基本使用</p>
<!-- more -->
<h1 id="python-环境安装" tabindex="-1"><a class="header-anchor" href="#python-环境安装" aria-hidden="true">#</a> Python 环境安装</h1>
<h3 id="_1-环境安装" tabindex="-1"><a class="header-anchor" href="#_1-环境安装" aria-hidden="true">#</a> 1. 环境安装</h3>
<p><a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Python 下载<ExternalLinkIcon/></a> | <a href="https://docs.conda.io/en/latest/miniconda.html" target="_blank" rel="noopener noreferrer">Miniconda 下载<ExternalLinkIcon/></a></p>
<Tabs :data='[{"title":"CentOS"}]'>
<template #tab0="{ title, value, isActive }">
<p>安装必要工具</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ yum <span class="token function">install</span> yum-utils

<span class="token comment"># yum-builddep 为 Python3 构建环境,安装缺失的软件依赖</span>
$ yum-builddep python
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下载 <strong>Python3</strong> 源码包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-O</span> https://www.python.org/ftp/python/3.9.6/Python-3.9.6.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译安装，默认的安装目录是 <code v-pre>/usr/local</code> ，若要改成其他目录，可在 <code v-pre>make</code> （<em>编译</em> ）前使用 <code v-pre>configure</code> 命令追加参数来完成修改</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">tar</span> xf Python-3.9.6.tgz
$ <span class="token builtin class-name">cd</span> Python-3.9.6

$ ./configure	<span class="token comment"># –-prefix=/custom/path --enable-shared</span>

$ <span class="token function">make</span>
$ <span class="token function">make</span> <span class="token function">install</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时已经成功安装了 <strong>python3 、pip3、setuptools</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 建立软链</span>
$ <span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/bin/python3.9 /usr/bin/python3
$ <span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/bin/pip3 /usr/bin/pip3

<span class="token comment"># 查看版本</span>
$ python3 <span class="token parameter variable">-V</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <strong>python3</strong> 作为 <strong>python</strong> 的默认版本，可以 <code v-pre>~/.bashrc</code> 加入如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">alias</span> <span class="token assign-left variable">python</span><span class="token operator">=</span><span class="token string">'/usr/local/bin/python3.9'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但 <strong>CentOS 7</strong> 建议不要动 <code v-pre>/etc/bashrc</code> 文件，则可以把用户自定义的配置放入 <code v-pre>/etc/profile.d/</code> 目录中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">vim</span> /etc/profile.d/python.sh
$ <span class="token builtin class-name">source</span> /etc/profile.d/python.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="_2-python-风格指南" tabindex="-1"><a class="header-anchor" href="#_2-python-风格指南" aria-hidden="true">#</a> 2. python 风格指南</h3>
<p><a href="https://pep8.org/" target="_blank" rel="noopener noreferrer">PEP 8<ExternalLinkIcon/></a></p>
<h3 id="_3-pycharm" tabindex="-1"><a class="header-anchor" href="#_3-pycharm" aria-hidden="true">#</a> 3. Pycharm</h3>
<h4 id="_3-1-通用设置" tabindex="-1"><a class="header-anchor" href="#_3-1-通用设置" aria-hidden="true">#</a> 3.1 通用设置</h4>
<p>基本都在 <code v-pre>setting</code> -&gt; <code v-pre>editor</code> 中找</p>
<blockquote>
<p><strong>背景图：</strong> 双击 <kbd>Shift</kbd> -&gt; <code v-pre>set background</code></p>
</blockquote>
<ul>
<li>
<p><strong>lint：</strong> 用于检查代码规范（需下载安装&amp;配置） <strong>Pycharm</strong> 也会自动检查，波浪线表示有问题</p>
</li>
<li>
<p>快捷注释：<kbd>ctrl</kbd> + <kbd>/</kbd></p>
</li>
<li>
<p>查看保留字</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> keyword <span class="token keyword">import</span> kwlist

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">[</span>i <span class="token keyword">for</span> i <span class="token keyword">in</span> kwlist<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token comment"># ['False', 'None', 'True', '__peg_parser__', 'and', 'as', 'assert', 'async', 'await',</span>
<span class="token comment"># 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',</span>
<span class="token comment"># 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',</span>
<span class="token comment"># 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注：</strong> 区分大小写 不能以保留字命名</p>
</blockquote>
</li>
</ul>
<h4 id="_3-2-快捷键" tabindex="-1"><a class="header-anchor" href="#_3-2-快捷键" aria-hidden="true">#</a> 3.2 快捷键</h4>
<blockquote>
<p>注意其他应用 <strong>热键占用</strong>，如 <strong>网易云</strong></p>
</blockquote>
<ul>
<li>子类继承抽象类：<kbd>Ctrl</kbd> + <kbd>O</kbd></li>
<li>批量的快速重命名：<kbd>Shift</kbd> + <kbd>F6</kbd></li>
<li>快速查找文件名：<kbd>Shift</kbd> + <kbd>Ctrl</kbd> + <kbd>N</kbd></li>
</ul>
<p><strong>快捷键大全：</strong> <kbd>Help</kbd> - <kbd>Keymap Reference</kbd></p>
<h4 id="_3-3-配置-sftp" tabindex="-1"><a class="header-anchor" href="#_3-3-配置-sftp" aria-hidden="true">#</a> 3.3 配置 SFTP</h4>
<p><strong>SFTP</strong> 自动同步代码到虚拟机</p>
<ul>
<li>
<p>设置入口</p>
<div class="image-preview">
    <img src="@source/python/语言/基础/img/SFTP设置.png">
</div>
</li>
<li>
<p>进行分组管理</p>
<div class="image-preview">
    <img src="@source/python/语言/基础/img/SFTP分组.png">
</div>
</li>
</ul>
<p><strong>注意：</strong></p>
<p>若出现 <code v-pre>Permission denied</code> 许可被拒绝，可能是 <strong>文件所属者</strong> 不对导致，执行如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chown</span> <span class="token parameter variable">-R</span> ubuntu:ubuntu <span class="token comment"># 所有者，递归修改所有所属组</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


