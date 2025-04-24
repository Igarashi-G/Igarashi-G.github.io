<template><div><p>Python下载 &amp; Pycharm 基本使用</p>
<!-- more -->
<h1 id="python-环境安装" tabindex="-1"><a class="header-anchor" href="#python-环境安装"><span>Python 环境安装</span></a></h1>
<h3 id="_1-环境安装" tabindex="-1"><a class="header-anchor" href="#_1-环境安装"><span>1. 环境安装</span></a></h3>
<p><a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Python 下载</a> | <a href="https://docs.conda.io/en/latest/miniconda.html" target="_blank" rel="noopener noreferrer">Miniconda 下载</a></p>
<Tabs id="13" :data='[{"id":"CentOS"}]'>
<template #title0="{ value, isActive }">CentOS</template>
<template #tab0="{ value, isActive }">
<p>安装必要工具</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum-utils</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># yum-builddep 为 Python3 构建环境,安装缺失的软件依赖</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum-builddep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下载 <strong>Python3</strong> 源码包</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -O</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://www.python.org/ftp/python/3.9.6/Python-3.9.6.tgz</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>编译安装，默认的安装目录是 <code v-pre>/usr/local</code> ，若要改成其他目录，可在 <code v-pre>make</code> （<em>编译</em> ）前使用 <code v-pre>configure</code> 命令追加参数来完成修改</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> xf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Python-3.9.6.tgz</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Python-3.9.6</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./configure</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">	# –-prefix=/custom/path --enable-shared</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> make</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> make</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时已经成功安装了 <strong>python3 、pip3、setuptools</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 建立软链</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ln</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/local/bin/python3.9</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/bin/python3</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ln</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/local/bin/pip3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/bin/pip3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看版本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -V</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <strong>python3</strong> 作为 <strong>python</strong> 的默认版本，可以 <code v-pre>~/.bashrc</code> 加入如下</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> alias</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> python='/usr/local/bin/python3.9'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>但 <strong>CentOS 7</strong> 建议不要动 <code v-pre>/etc/bashrc</code> 文件，则可以把用户自定义的配置放入 <code v-pre>/etc/profile.d/</code> 目录中</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/profile.d/python.sh</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> source</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/profile.d/python.sh</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="_2-python-风格指南" tabindex="-1"><a class="header-anchor" href="#_2-python-风格指南"><span>2. python 风格指南</span></a></h3>
<p><a href="https://pep8.org/" target="_blank" rel="noopener noreferrer">PEP 8</a></p>
<h3 id="_3-pycharm" tabindex="-1"><a class="header-anchor" href="#_3-pycharm"><span>3. Pycharm</span></a></h3>
<h4 id="_3-1-通用设置" tabindex="-1"><a class="header-anchor" href="#_3-1-通用设置"><span>3.1 通用设置</span></a></h4>
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
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> keyword </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> kwlist</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">([i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> kwlist])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">### 输出结果：</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ['False', 'None', 'True', '__peg_parser__', 'and', 'as', 'assert', 'async', 'await',</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注：</strong> 区分大小写 不能以保留字命名</p>
</blockquote>
</li>
</ul>
<h4 id="_3-2-快捷键" tabindex="-1"><a class="header-anchor" href="#_3-2-快捷键"><span>3.2 快捷键</span></a></h4>
<blockquote>
<p>注意其他应用 <strong>热键占用</strong>，如 <strong>网易云</strong></p>
</blockquote>
<ul>
<li>子类继承抽象类：<kbd>Ctrl</kbd> + <kbd>O</kbd></li>
<li>批量的快速重命名：<kbd>Shift</kbd> + <kbd>F6</kbd></li>
<li>快速查找文件名：<kbd>Shift</kbd> + <kbd>Ctrl</kbd> + <kbd>N</kbd></li>
</ul>
<p><strong>快捷键大全：</strong> <kbd>Help</kbd> - <kbd>Keymap Reference</kbd></p>
<h4 id="_3-3-配置-sftp" tabindex="-1"><a class="header-anchor" href="#_3-3-配置-sftp"><span>3.3 配置 SFTP</span></a></h4>
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
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">chown</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -R</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ubuntu:ubuntu</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 所有者，递归修改所有所属组</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


