<template><div><p><strong>vim</strong> 的使用方法 <strong>&amp;</strong> 快捷键</p>
<!-- more -->
<h3 id="_1-查询" tabindex="-1"><a class="header-anchor" href="#_1-查询" aria-hidden="true">#</a> 1. 查询</h3>
<p><strong>vim</strong> 下要查找字符串的时候， 都是输入 <code v-pre>/要查找的字段</code> 或者 <code v-pre>?name</code>，区别是前者是从上往下搜索，后者是从下往上搜索</p>
<ul>
<li>&lt;1&gt; 但最快的方式是让光标停留在想要查找的单词的任意一个字母上面， 然后输入 <kbd>Shift + *</kbd> 即可快速选中该单词，
并且可以通过 <strong>n</strong> 或 <strong>N</strong> 进行上一个或下一个的匹配</li>
<li>&lt;2&gt; 让光标停留在单词的第一个字母上， 然后输入 <strong>yw</strong> 拷贝该单词， 然后输入 / (<kbd>Ctrl + R</kbd>) 0 （即 /”0），回车，
就查找到了第一个匹配的单词， 并且可以通过 <strong>n</strong> 或 <strong>N</strong> 进行上一个或下一个的匹配</li>
<li>&lt;3&gt; 将单词拷贝到系统剪贴板， 然后再从系统剪贴板拿出来。 即选中需要查找的单词， 然后输入 “+y， 然后输入/（<kbd>Shfit + Ctrl + v</kbd>）就查找到了第一个匹配的单词， 并且可以通过 n 或 N 进行上一个或下一个的匹配</li>
</ul>
<h3 id="_2-跳行和换首尾" tabindex="-1"><a class="header-anchor" href="#_2-跳行和换首尾" aria-hidden="true">#</a> 2. 跳行和换首尾</h3>
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
<li>&lt;2&gt; &quot;<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">&quot;</mi><mtext>（</mtext><mo>&lt;</mo><mi>k</mi><mi>b</mi><mi>d</mi><mo>&gt;</mo><mi>S</mi><mi>h</mi><mi>i</mi><mi>f</mi><mi>t</mi><mo>+</mo><mn>4</mn><mo>&lt;</mo><mi mathvariant="normal">/</mi><mi>k</mi><mi>b</mi><mi>d</mi><mo>&gt;</mo><mtext>）使用</mtext><mi mathvariant="normal">&quot;</mi><mn>1</mn></mrow><annotation encoding="application/x-tex">&quot;（&lt;kbd&gt;Shift + 4&lt;/kbd&gt;）使用&quot;1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.7335em;vertical-align:-0.0391em;"></span><span class="mord">&quot;</span><span class="mord cjk_fallback">（</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7335em;vertical-align:-0.0391em;"></span><span class="mord mathnormal">kb</span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mord mathnormal">hi</span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6835em;vertical-align:-0.0391em;"></span><span class="mord">4</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">/</span><span class="mord mathnormal">kb</span><span class="mord mathnormal">d</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord cjk_fallback">）使用</span><span class="mord">&quot;1</span></span></span></span>&quot;表示当前行的行尾，&quot;2$&quot;表示当前行的下一行的行尾。</li>
</ul>
</li>
</ul>
<h3 id="_3-复制和粘贴" tabindex="-1"><a class="header-anchor" href="#_3-复制和粘贴" aria-hidden="true">#</a> 3. 复制和粘贴</h3>
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
<h3 id="vim-配置" tabindex="-1"><a class="header-anchor" href="#vim-配置" aria-hidden="true">#</a> VIM 配置</h3>
<p>下载 <strong>vim-colorschemes、vim-tarbar</strong> 等 <strong>Vim</strong> 插件，将它们解压放置在 <code v-pre>~/.vim</code> 目录中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.com/flazz/vim-colorschemes/archive/master.zip

<span class="token function">wget</span> https://github.com/majutsushi/tagbar/archive/master.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件 <code v-pre>~/.vimrc</code> 内容如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token string">"common setting
set t_Co=256
colorscheme molokai
set autoindent
set smartindent
set tabstop=4
set shiftwidth=4
set softtabstop=4
set number
set nobackup
set noundofile
filetype plugin on
syntax on

"</span>hi Type <span class="token assign-left variable">ctermfg</span><span class="token operator">=</span><span class="token number">118</span> <span class="token assign-left variable">cterm</span><span class="token operator">=</span>none
<span class="token string">"hi Structure ctermfg=118 cterm=none
"</span>hi Macro <span class="token assign-left variable">ctermfg</span><span class="token operator">=</span><span class="token number">161</span> <span class="token assign-left variable">cterm</span><span class="token operator">=</span>bold
<span class="token string">"hi PreCondit ctermfg=161 cterm=bold
set cursorline

"</span><span class="token operator">>></span><span class="token operator">></span>ctags begin
nmap <span class="token operator">&lt;</span>F<span class="token operator"><span class="token file-descriptor important">8</span>></span> :TagbarToggle<span class="token operator">&lt;</span>CR<span class="token operator">></span>
nmap <span class="token operator">&lt;</span>F<span class="token operator"><span class="token file-descriptor important">5</span>></span> :tprev<span class="token operator">&lt;</span>CR<span class="token operator">></span>
nmap <span class="token operator">&lt;</span>F<span class="token operator"><span class="token file-descriptor important">6</span>></span> :tnext<span class="token operator">&lt;</span>CR<span class="token operator">></span>
<span class="token string">"&lt;&lt;&lt;ctags end

"</span><span class="token operator">>></span><span class="token operator">></span>for windows begin 
<span class="token builtin class-name">set</span> <span class="token assign-left variable">encoding</span><span class="token operator">=</span>utf-8
<span class="token builtin class-name">set</span> <span class="token assign-left variable">fileencodings</span><span class="token operator">=</span>utf-8,chinese,latin-1
<span class="token keyword">if</span> has<span class="token punctuation">(</span><span class="token string">"win32"</span><span class="token punctuation">)</span>
  <span class="token builtin class-name">set</span> <span class="token assign-left variable">fileencoding</span><span class="token operator">=</span>chinese
<span class="token keyword">else</span>
  <span class="token builtin class-name">set</span> <span class="token assign-left variable">fileencoding</span><span class="token operator">=</span>utf-8
endif

<span class="token builtin class-name">source</span> <span class="token variable">$VIMRUNTIME</span>/delmenu.vim
<span class="token builtin class-name">source</span> <span class="token variable">$VIMRUNTIME</span>/menu.vim

<span class="token builtin class-name">set</span> <span class="token assign-left variable">guifont</span><span class="token operator">=</span>Consolas:h11
language messages zh_CN.utf-8
<span class="token string">"&lt;&lt;&lt;for windows end 

"</span><span class="token operator">>></span><span class="token operator">></span>set max window bengin
<span class="token keyword">if</span> has<span class="token punctuation">(</span><span class="token string">'win32'</span><span class="token punctuation">)</span>
    au GUIEnter * simalt ~x
<span class="token keyword">else</span>
    au GUIEnter * call MaximizeWindow<span class="token punctuation">(</span><span class="token punctuation">)</span>
endif

function<span class="token operator">!</span> MaximizeWindow<span class="token punctuation">(</span><span class="token punctuation">)</span>
    silent <span class="token operator">!</span>wmctrl <span class="token parameter variable">-r</span> :ACTIVE: <span class="token parameter variable">-b</span> add,maximized_vert,maximized_horz
endfunction
"<span class="token operator">&lt;&lt;&lt;</span>set max window end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


