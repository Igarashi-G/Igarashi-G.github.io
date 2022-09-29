<template><div><h1 id="screen" tabindex="-1"><a class="header-anchor" href="#screen" aria-hidden="true">#</a> Screen</h1>
<Alert type="info">简单云服务器部署工具，用于远程 `ssh` 断掉的请求，也能一直运行，不会被意外原因而杀掉</Alert><p><strong>安装 screen 工具</strong></p>
<ul>
<li>
<p><strong>Ubuntu</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">screen</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>CentOS</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token function">screen</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p><strong>使用简介</strong></p>
<ul>
<li>
<p>创建 <code v-pre>screen</code> 窗口</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># name 自己起名字，方便管理</span>
<span class="token function">screen</span> <span class="token parameter variable">-S</span> <span class="token operator">&lt;</span>name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>退出：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ctrl a + d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>恢复：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">screen</span> <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查看 <code v-pre>screen</code> 进程：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">screen</span> <span class="token parameter variable">-ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>进入进程：</p>
<ul>
<li>
<p>单个 <code v-pre>screen</code> 进程：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">screen</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>多个 <code v-pre>screen</code> 进程：(通过它的 <strong>PID</strong> 进入)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看进程id号</span>
<span class="token function">screen</span> <span class="token parameter variable">-ls</span>

<span class="token comment"># 进入id为 1805 的 screen 进程</span>
<span class="token function">screen</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-d</span> <span class="token number">1805</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>中断进程：</p>
<ul>
<li>
<p>进入后中断：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 进入要中断的screen</span>
<span class="token function">screen</span> <span class="token parameter variable">-r</span> <span class="token number">30339</span>

<span class="token comment"># 或contorl + c 退出 screen</span>
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>直接中断：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">screen</span> <span class="token parameter variable">-S</span> <span class="token operator">&lt;</span>screenID<span class="token operator">></span> <span class="token parameter variable">-X</span> quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</div></template>


