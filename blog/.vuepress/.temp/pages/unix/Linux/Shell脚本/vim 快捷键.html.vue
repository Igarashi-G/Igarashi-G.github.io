<template><div><p><strong>vim</strong> 的使用方法 <strong>&amp;</strong> 快捷键</p>
<!-- more -->
<h3 id="_1-查询" tabindex="-1"><a class="header-anchor" href="#_1-查询"><span>1. 查询</span></a></h3>
<p><strong>vim</strong> 下要查找字符串的时候， 都是输入 <code v-pre>/要查找的字段</code> 或者 <code v-pre>?name</code>，区别是前者是从上往下搜索，后者是从下往上搜索</p>
<ul>
<li>&lt;1&gt; 但最快的方式是让光标停留在想要查找的单词的任意一个字母上面， 然后输入 <kbd>Shift + *</kbd> 即可快速选中该单词，<br>
并且可以通过 <strong>n</strong> 或 <strong>N</strong> 进行上一个或下一个的匹配</li>
<li>&lt;2&gt; 让光标停留在单词的第一个字母上， 然后输入 <strong>yw</strong> 拷贝该单词， 然后输入 / (<kbd>Ctrl + R</kbd>) 0 （即 /”0），回车，<br>
就查找到了第一个匹配的单词， 并且可以通过 <strong>n</strong> 或 <strong>N</strong> 进行上一个或下一个的匹配</li>
<li>&lt;3&gt; 将单词拷贝到系统剪贴板， 然后再从系统剪贴板拿出来。 即选中需要查找的单词， 然后输入 “+y， 然后输入/（<kbd>Shfit + Ctrl + v</kbd>）就查找到了第一个匹配的单词， 并且可以通过 n 或 N 进行上一个或下一个的匹配</li>
</ul>
<h3 id="_2-跳行和换首尾" tabindex="-1"><a class="header-anchor" href="#_2-跳行和换首尾"><span>2. 跳行和换首尾</span></a></h3>
<ul>
<li>跳到第一行
<ul>
<li>&lt;1&gt; 输入 :0 或 :1</li>
<li>&lt;2&gt; 按下小写键 gg</li>
</ul>
</li>
<li>跳至尾行
<ul>
<li>&lt;1&gt; 输入 😒 回车</li>
<li>&lt;2&gt; 键盘按下大写 G （跳至 66 行 66 + G）</li>
</ul>
</li>
<li>换至行首
<ul>
<li>&lt;1&gt; 编辑键 Home</li>
<li>&lt;2&gt; &quot;^&quot;（即 <kbd>Shift + 6</kbd>）或 0（数字 0）</li>
</ul>
</li>
<li>换至行尾
<ul>
<li>&lt;1&gt; 编辑键 End</li>
<li>&lt;2&gt; &quot;$&quot;（<kbd>Shift + 4</kbd>）使用&quot;1$&quot;表示当前行的行尾，&quot;2$&quot;表示当前行的下一行的行尾。</li>
</ul>
</li>
</ul>
<h3 id="_3-复制和粘贴" tabindex="-1"><a class="header-anchor" href="#_3-复制和粘贴"><span>3. 复制和粘贴</span></a></h3>
<p>最简单的办法 鼠标选中 <kbd>ctrl/shift + insert</kbd> 但是这样看上去就会很傻</p>
<ul>
<li>
<p>复制命令： y</p>
<ul>
<li>yy 复制整行 nyy 复制 n 行</li>
<li>y^/y$ 复制当前到行头/行尾的内容</li>
<li>yw 复制一个 word</li>
<li>yG 复制至档尾 nyG 复制到第 n 行档尾</li>
</ul>
</li>
<li>
<p>剪切命令： d</p>
<ul>
<li>dd 剪切整行 ndd 剪切 n 行</li>
<li>后续同上 y 命令</li>
</ul>
</li>
<li>
<p>粘贴命令： p</p>
<ul>
<li>p 小写 p 代表粘贴到游标尺之后</li>
<li>P 大写 P 代表粘贴到游标尺之前</li>
</ul>
</li>
<li>
<p>撤销上一次操作： u</p>
<ul>
<li>u 小写 u 撤销刚才的操作</li>
<li>U 大写 U 撤销某一行最近的所有更改</li>
</ul>
</li>
<li>
<p>恢复上一次操作：<kbd>ctrl + r</kbd></p>
</li>
</ul>
<h3 id="vim-配置" tabindex="-1"><a class="header-anchor" href="#vim-配置"><span>VIM 配置</span></a></h3>
<p>下载 <strong>vim-colorschemes、vim-tarbar</strong> 等 <strong>Vim</strong> 插件，将它们解压放置在 <code v-pre>~/.vim</code> 目录中</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">wget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://github.com/flazz/vim-colorschemes/archive/master.zip</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">wget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://github.com/majutsushi/tagbar/archive/master.zip</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件 <code v-pre>~/.vimrc</code> 内容如下</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"common setting</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set t_Co=256</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">colorscheme molokai</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set autoindent</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set smartindent</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set tabstop=4</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set shiftwidth=4</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set softtabstop=4</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set number</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set nobackup</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set noundofile</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">filetype plugin on</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">syntax on</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">hi</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ctermfg=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">118</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cterm=none</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"hi Structure ctermfg=118 cterm=none</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">hi</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Macro</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ctermfg=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">161</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cterm=bold</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"hi PreCondit ctermfg=161 cterm=bold</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">set cursorline</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>>></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ctags</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> begin</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nmap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">F</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">8> </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:TagbarToggle</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">C</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">R></span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nmap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">F</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">5> </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:tprev</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">C</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">R></span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nmap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">F</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">6> </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:tnext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">C</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">R></span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"&#x3C;&#x3C;&#x3C;ctags end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>>></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">for</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> windows</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> begin</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> encoding=utf-8</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> fileencodings=utf-8,chinese,latin-1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> has(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"win32"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">  set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> fileencoding=chinese</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">  set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> fileencoding=utf-8</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">endif</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">source</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $VIMRUNTIME</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/delmenu.vim</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">source</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $VIMRUNTIME</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/menu.vim</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> guifont=Consolas:h11</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">language</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> messages</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> zh_CN.utf-8</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"&#x3C;&#x3C;&#x3C;for windows end </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>>></span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> max</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> window</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> bengin</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> has(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">'win32'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    au</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> GUIEnter</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> *</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> simalt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ~x</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    au</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> GUIEnter</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> *</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> call</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> MaximizeWindow</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">endif</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">!</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> MaximizeWindow</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    silent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> !wmctrl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> :ACTIVE:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> add,maximized_vert,maximized_horz</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">endfunction</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"&#x3C;&#x3C;&#x3C;set max window end</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


