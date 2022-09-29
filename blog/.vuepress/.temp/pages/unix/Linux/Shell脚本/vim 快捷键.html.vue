<template><div><h2 id="vim-的使用方法-快捷键" tabindex="-1"><a class="header-anchor" href="#vim-的使用方法-快捷键" aria-hidden="true">#</a> vim 的使用方法&amp;快捷键：</h2>
<h3 id="_1-查询" tabindex="-1"><a class="header-anchor" href="#_1-查询" aria-hidden="true">#</a> 1.查询：</h3>
<p>vim 下要查找字符串的时候， 都是输入 /name 或者 ?name。区别是前者是从上往下搜索，后者是从下往上搜索。</p>
<ul>
<li>&lt;1&gt;但最快的方式是让光标停留在想要查找的单词的任意一个字母上面， 然后输入 Shift + * 即可快速选中该单词，
并且可以通过 n 或 N 进行上一个或下一个的匹配。</li>
<li>&lt;2&gt;让光标停留在单词的第一个字母上， 然后输入 yw 拷贝该单词， 然后输入 / (Ctrl + R) 0 （即 /”0），回车，
就查找到了第一个匹配的单词， 并且可以通过 n 或 N 进行上一个或下一个的匹配。</li>
<li>&lt;3&gt;将单词拷贝到系统剪贴板， 然后再从系统剪贴板拿出来。 即选中需要查找的单词， 然后输入 “+y， 然后输入/（Shfit + Ctrl + v）
就查找到了第一个匹配的单词， 并且可以通过 n 或 N 进行上一个或下一个的匹配。</li>
</ul>
<h3 id="_2-跳行和换首尾" tabindex="-1"><a class="header-anchor" href="#_2-跳行和换首尾" aria-hidden="true">#</a> 2.跳行和换首尾：</h3>
<ul>
<li>跳到第一行：
<ul>
<li>&lt;1&gt; 输入 :0 或 :1</li>
<li>&lt;2&gt; 按下小写键 gg</li>
</ul>
</li>
<li>跳至尾行：
<ul>
<li>&lt;1&gt; 输入 😒 回车</li>
<li>&lt;2&gt; 键盘按下大写 G （跳至 66 行 66 + G）</li>
</ul>
</li>
<li>换至行首：
<ul>
<li>&lt;1&gt; 编辑键 Home</li>
<li>&lt;2&gt; &quot;^&quot;（即 Shift+6）或 0（数字 0）</li>
</ul>
</li>
<li>换至行尾：
<ul>
<li>&lt;1&gt; 编辑键 End</li>
<li>&lt;2&gt; &quot;<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">&quot;</mi><mtext>（</mtext><mi>S</mi><mi>h</mi><mi>i</mi><mi>f</mi><mi>t</mi><mo>+</mo><mn>4</mn><mtext>）使用</mtext><mi mathvariant="normal">&quot;</mi><mn>1</mn></mrow><annotation encoding="application/x-tex">&quot;（Shift+4）使用&quot;1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord">&quot;</span><span class="mord cjk_fallback">（</span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mord mathnormal">hi</span><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord">4</span><span class="mord cjk_fallback">）使用</span><span class="mord">&quot;1</span></span></span></span>&quot;表示当前行的行尾，&quot;2$&quot;表示当前行的下一行的行尾。</li>
</ul>
</li>
</ul>
<h3 id="_3-复制和粘贴" tabindex="-1"><a class="header-anchor" href="#_3-复制和粘贴" aria-hidden="true">#</a> 3.复制和粘贴：</h3>
<p>最简单的办法 鼠标选中 ctrl/shift + insert 但是这样看上去就会很傻</p>
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
<p>恢复上一次操作：ctrl + r</p>
</li>
</ul>
</div></template>


