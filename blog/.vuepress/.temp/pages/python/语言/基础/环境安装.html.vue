<template><div><p>Python下载 &amp; Pycharm 基本使用</p>
<!-- more -->
<h1 id="python-环境安装" tabindex="-1"><a class="header-anchor" href="#python-环境安装" aria-hidden="true">#</a> Python 环境安装</h1>
<h3 id="_1-环境安装" tabindex="-1"><a class="header-anchor" href="#_1-环境安装" aria-hidden="true">#</a> 1. 环境安装</h3>
<p><a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Python 下载<ExternalLinkIcon/></a> | <a href="https://docs.conda.io/en/latest/miniconda.html" target="_blank" rel="noopener noreferrer">Miniconda 下载<ExternalLinkIcon/></a></p>
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


