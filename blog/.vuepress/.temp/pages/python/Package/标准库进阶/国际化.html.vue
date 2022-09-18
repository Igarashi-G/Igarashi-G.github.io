<template><div><h1 id="gettext" tabindex="-1"><a class="header-anchor" href="#gettext" aria-hidden="true">#</a> gettext</h1>
<p>用于处理国际化、类 i18n、本地化，Localization，可以将一套语言处理转化为不同语言</p>
<h2 id="一、创建步骤" tabindex="-1"><a class="header-anchor" href="#一、创建步骤" aria-hidden="true">#</a> 一、创建步骤</h2>
<h3 id="_1-先建立源代码文件-用于安装和转义" tabindex="-1"><a class="header-anchor" href="#_1-先建立源代码文件-用于安装和转义" aria-hidden="true">#</a> 1.先建立源代码文件，用于安装和转义</h3>
<pre><code>创建文件 - 文件名：translate.py

import gettext
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
print(BASE_DIR)

# install domain(为了与上面保持一致, domain值为project_name), 实际为.mo文件的名字
gettext.install('messages', BASE_DIR + '/locale')   # 这个是要找到对应的locale目录名字
gettext.translation('messages', BASE_DIR + '/locale', languages=['zh_Hans', &quot;zh_CN&quot;]).install(True)

# 假设.po文件中有This is a test, 并翻译为: 这是一个测试
print(_(&quot;This is another test&quot;))   # 必填，下一步要抽取出来
# 输出: 这是另一个测试.
</code></pre>
<h3 id="_2-从源代码中抽取需要国际化的文本消息" tabindex="-1"><a class="header-anchor" href="#_2-从源代码中抽取需要国际化的文本消息" aria-hidden="true">#</a> 2.从源代码中抽取需要国际化的文本消息</h3>
<p>转换创建.pot 文件, 可以使用的工具为 <a href="http://pygettext.py" target="_blank" rel="noopener noreferrer">pygettext.py<ExternalLinkIcon/></a> 或者 GNU 工具 xgettext，进行创建</p>
<pre><code>终端运行如下命令

python pygettext.py -o messages.pot translate.py

注意生成的pot文件这行：

&quot;Content-Type: text/plain; charset=utf-8\n&quot;

charset是否为 utf-8 （很可能生成cp968的，要改，否则后续使用mo文件会报出编码异常）
</code></pre>
<ul>
<li>
<p><a href="http://pygettext.py" target="_blank" rel="noopener noreferrer">pygettext.py<ExternalLinkIcon/></a>: 该文件通常在 python 安装目录下 \Tools\i18n 文件夹里</p>
</li>
<li>
<p>使用 <a href="http://pygettext.py" target="_blank" rel="noopener noreferrer">pygettext.py<ExternalLinkIcon/></a> 目的是从 <a href="http://translate.py" target="_blank" rel="noopener noreferrer">translate.py<ExternalLinkIcon/></a> 文件中提取所有被标记成需要本地化的字符串，也就是在_()里面的字符串</p>
<p>执行命令后会得到文件 messages.pot</p>
<p>需要注意的关键地方如下：</p>
<p>#: <a href="http://translate.py:13" target="_blank" rel="noopener noreferrer">translate.py:13<ExternalLinkIcon/></a>
msgid &quot;This is another test&quot;
msgstr &quot;&quot;</p>
</li>
<li>
<p>msgid: 大概是为了转义而识别的同意 键名</p>
</li>
<li>
<p>msgstr：键名对应的值</p>
</li>
<li>
<p>改文件无需额外改动</p>
</li>
</ul>
<h3 id="_3-修改-po-文件-重要" tabindex="-1"><a class="header-anchor" href="#_3-修改-po-文件-重要" aria-hidden="true">#</a> 3.修改 po 文件（重要）</h3>
<p>把 messages.pot 改名为 messages.po，为每种语言拷贝一份 messages.po，zh-CN 的 <a href="http://messages.mo" target="_blank" rel="noopener noreferrer">messages.mo<ExternalLinkIcon/></a> 内容修改如下：</p>
<pre><code>#: translate.py:13
msgid &quot;This is another test&quot;
msgstr &quot;这是另一个测试&quot;
</code></pre>
<p>若要生成其他语言，直接如上 copy 出另一份，改 msgstr 即可</p>
<pre><code>#: translate.py:13
msgid &quot;This is another test&quot;
msgstr &quot;これはもう一つのテスト&quot;
</code></pre>
<h3 id="_4-创建-gettext-可读的-mo-文件-重要" tabindex="-1"><a class="header-anchor" href="#_4-创建-gettext-可读的-mo-文件-重要" aria-hidden="true">#</a> 4.创建 gettext <a href="http://xn--jprs81f8wo.mo" target="_blank" rel="noopener noreferrer">可读的.mo<ExternalLinkIcon/></a> 文件（重要）</h3>
<p>为各种语言创建 gettext <a href="http://xn--jprs81f8wo.mo" target="_blank" rel="noopener noreferrer">可读的.mo<ExternalLinkIcon/></a> 文件，使用 <a href="http://msgfmt.py" target="_blank" rel="noopener noreferrer">msgfmt.py<ExternalLinkIcon/></a></p>
<pre><code>终端运行如下命令

python msgfmt.py -o messages.mo messages.po     # 生成 messages.mo 文件
</code></pre>
<ul>
<li><a href="http://msgfmt.py" target="_blank" rel="noopener noreferrer">msgfmt.py<ExternalLinkIcon/></a>: 该文件通常在 python 安装目录下 \Tools\i18n 文件夹里</li>
</ul>
<h3 id="_5-把所有文件按照以下文件夹结构放置即可" tabindex="-1"><a class="header-anchor" href="#_5-把所有文件按照以下文件夹结构放置即可" aria-hidden="true">#</a> 5.把所有文件按照以下文件夹结构放置即可</h3>
<pre><code>locale:
    zh_CN：
        LC_MESSAGES:
            messages.mo
            messages.po
    ja-JP:
        LC_MESSAGES:
            messages.mo
            messages.po
</code></pre>
<h3 id="_6-在其他文件使用时-引入-translate-py-即可" tabindex="-1"><a class="header-anchor" href="#_6-在其他文件使用时-引入-translate-py-即可" aria-hidden="true">#</a> 6.在其他文件使用时，引入 <a href="http://translate.py" target="_blank" rel="noopener noreferrer">translate.py<ExternalLinkIcon/></a> 即可</h3>
<pre><code>from xx.xx import translate

print(_(&quot;This is another test&quot;))
</code></pre>
<p>​<br>
​<br>
​<br>
​<br>
​<br>
​</p>
</div></template>


