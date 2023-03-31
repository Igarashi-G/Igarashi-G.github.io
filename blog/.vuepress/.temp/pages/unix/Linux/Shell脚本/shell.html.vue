<template><div><p><strong>Linux Shell</strong> 脚本指南</p>
<!-- more -->
<h2 id="bash" tabindex="-1"><a class="header-anchor" href="#bash" aria-hidden="true">#</a> bash</h2>
<p><strong>bash-shell（<em>Bourne Again Shell</em> ）：</strong> 从 <strong>Unix</strong> 系统中的 <strong>sh</strong> 发展而来， <strong>用户 和 Linux 内核交互的工具</strong>，通过 <strong>bash</strong> 操作内核，可以完成系统的使用和管理，是 <strong>shell</strong> 的一种，每种 <strong>shell</strong> 的功能类似，但语法稍有不同</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 已经被 /bin/bash 代替，如下</span>
/bin/sh

<span class="token comment"># 默认的shell</span>
/bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件 <code v-pre>~/.bashrc</code> 内容如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token builtin class-name">alias</span> <span class="token assign-left variable">cp</span><span class="token operator">=</span><span class="token string">'cp -i'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">egrep</span><span class="token operator">=</span><span class="token string">'egrep --color=auto'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">fgrep</span><span class="token operator">=</span><span class="token string">'fgrep --color=auto'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">grep</span><span class="token operator">=</span><span class="token string">'grep --color=auto'</span>
<span class="token builtin class-name">alias</span> l.<span class="token operator">=</span><span class="token string">'ls -d .* --color=auto'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ll</span><span class="token operator">=</span><span class="token string">'ls -l --color=auto'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ls</span><span class="token operator">=</span><span class="token string">'ls --color=auto'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">mv</span><span class="token operator">=</span><span class="token string">'mv -i'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">rm</span><span class="token operator">=</span><span class="token string">'rm -i'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">which</span><span class="token operator">=</span><span class="token string">'alias | /usr/bin/which --tty-only --read-alias --show-dot --show-tilde'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


