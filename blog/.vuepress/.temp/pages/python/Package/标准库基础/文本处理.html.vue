<template><div><h1 id="文本处理" tabindex="-1"><a class="header-anchor" href="#文本处理" aria-hidden="true">#</a> 文本处理</h1>
<p><a href="https://docs.python.org/zh-cn/3/library/text.html" target="_blank" rel="noopener noreferrer">文档参考<ExternalLinkIcon/></a></p>
<h2 id="_1-re-正则表达式" tabindex="-1"><a class="header-anchor" href="#_1-re-正则表达式" aria-hidden="true">#</a> 1. re 正则表达式</h2>
<Alert type="info">正则表达式都是 **贪婪** 的!</Alert><h3 id="_1-1" tabindex="-1"><a class="header-anchor" href="#_1-1" aria-hidden="true">#</a> 1.1</h3>
<p><strong>re</strong> 模块嵌入<strong>Python</strong> 的编程语言，re 模块使该模式被编译成一系列字节码，然后由用 C 编写的匹配引擎执行，比原生慢些，但容易写。</p>
<p>可模糊匹配 <a href="/back_end/python/base/%E5%88%9D%E8%AF%86/%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81" target="_blank" rel="noopener noreferrer">Unicode<ExternalLinkIcon/></a> <strong>字符串</strong>（<code v-pre>str</code>）、<strong>8 位字节串</strong>（<code v-pre>bytes</code>），但 <code v-pre>str</code> 和 <code v-pre>bytes</code> 不能混用</p>
<p>.findall(pattern, string, flags) 顾名思义
pattern 匹配的规则 以哪一种方式去匹配 此处的规则也为字符串
flag 修改
如 findall(&quot;Fuuka&quot;,&quot;safjFasklFuukajlasdsFuukafew&quot;) 可以实现 完全匹配 但是杀鸡用牛刀 它可以找到多个符合结果</p>
<p>字符匹配（普通字符，元字符）：</p>
<p>1 普通字符：大多数字符和字母都会和自身匹配 &gt;&gt;&gt; re.findall('alvin','yuanaleSxalexwupeiqi')
['alvin']</p>
<p>2 元字符：. ^ $ * + ? { } [ ] | ( ) \</p>
<p>元字符之. ^ $ _ + ? { }
. 通配符，所有字符都可以匹配成功(代表任意字符 只能匹配一位 代指任意一个字符)除了没转义的换行符 \t 都可以
^ 尖角符，只会在开始部分匹配
$ 只会在结尾部分匹配
_ 重复匹配 只重复前面要匹配的字符 0 次到无穷 + 重复匹配 与上区别为 1 次到无穷
? 值能匹配前面的字符 0 次到 1
{} 可指定前面字符的匹配次数 如 {1,3}可以匹配一次到 3 次 但这是贪婪匹配 返回最多的结果 虽然可以替代前面的
但依然推荐使用* + ? 结构直白明了 {}里面什么都不加表示正无穷 例：{1,}等价于+</p>
<p>元字符之 不怎么好理解的四个 [ ] | ( ) <br>
[ ] 字符集，可以把要匹配的字符集填入其中 例:[u,w,k, ] 但中间是或的关系只能匹配成功其中 u,w,k,空格的一个
[a-z]表示 a-z 的这个范围 但也是或的关系。
[]:可以取消元字符的特殊功能 也可以找标点符号例如逗号什么的。
但有三个符号例外( \ ^ - ) 如代表范围的 [0-9a-zA-Z] [0-9,a-z,A-Z]但是这两个就结果而言是一样的 只是
判断情况不一样，
[^]意味着取反 例 [^a]除了 a 以外的 但是 [^4,5]则是除了 4,5 的 此处 4,5 才是一组（而不是^4 是一组）是所有的非
注：此处的 4,5 是非了 3 个分别是&quot;4&quot; &quot;,&quot; &quot;5&quot;这三个
\ 反斜杠后面跟元字符去除特殊功能
反斜杠后面跟普通字符实现特殊功能
\d 匹配任何十进制数；它相当于类 [0-9]。
\D 匹配任何非数字字符；它相当于类 [^0-9]。
\s 匹配任何空白字符；它相当于类 [ \t\n\r\f\v]。
\S 匹配任何非空白字符；它相当于类 [^ \t\n\r\f\v]。
\w 匹配任何字母数字字符；它相当于类 [a-zA-Z0-9_]。
\W 匹配任何非字母数字字符；它相当于类 [^a-za-z0-9_]
\b 匹配一个特殊字符边界，比如空格 ，&amp;，#等 (这里特殊字符有很多 注意前面+r)</p>
<p>.search() 匹配出第一个满足条件的结果 但区别在于 返回的是一个对象包含范围 而且不能找多个
若想要去到里面的内容可以用.group()来取出匹配的内容 参数分别为正则表达式和目标字符串</p>
<pre><code>\   若想实现匹配&quot;\&quot; 则有两种方式 1.r&quot;\\&quot; 2.&quot;\\\\&quot; 匹配成功后返回的是两个&quot;\\&quot; 这才是对的
    在正则表达式规范中 若想匹配&quot;\&quot;它是有特殊意义的 因此可以利用\来去除特殊意义 所以
    利用re -----&gt; &quot;\\&quot;----&gt;&quot;\&quot; 但此时python解释器中&quot;\&quot;也是有特殊意义的 也需要转义
    因此 需要两个单纯的re &quot;\&quot;需要四个python转义前的&quot;\&quot;转义 或是r&quot;\\&quot;让解释器识别
()  用来分组 可以指定匹配组里的字符 例 (Fuuka)+匹配所有Fuuka的字符串
|   或的意思 例(as)|3 或的是左右两边整体的内容
(?p&lt;id&gt;) 可以利用?p&lt;&gt;这种方式去根据组名来用.group(&quot;id&quot;) 取到对应组的内容
</code></pre>
<p>正则表达式的方法:
.findall 见上 所有结果都返回到列表中
若是有组的话则返回组里面的内容 (组是有优先级的 会优先返回组的内容)
?: 取消组权限 上文前面加后返回正常匹配结果
.search 返回匹配到的第一个对象 对象可以调用.group 方法获取返回结果
.match 只在字符串开始(头部)匹配 也只返回匹配到的第一个对象 也能调用.group
.split 利用 split 进行分割 例 re.split(&quot;[j,k]&quot;,&quot;jo9pkp&quot;) 先分 j 再分 k 若无分空 先按一个分割再依次
.sub 参数 替换的表达式 被替换内容 被替换字符串 替换的次数 可用于计算器替代
.compile 一种规则应用多次 把表达式封装成对象利用变量接收 下次直接调用无需写表达式
.finditer 返回结果封装成迭代器 通过 next(ret).group()取 也可以利用 for 遍历</p>
<p>如何变为惰性匹配:
后面加?使其变为惰性匹配
例 ret = re.findall(&quot;abc*?&quot;,&quot;abccccccc&quot;)
print(ret) # [&quot;ab&quot;]变为惰性匹配</p>
</div></template>


