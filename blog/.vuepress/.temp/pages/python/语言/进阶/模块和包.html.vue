<template><div><p>导入模块、包和构建项目目录</p>
<!-- more -->
<h1 id="模块和包" tabindex="-1"><a class="header-anchor" href="#模块和包" aria-hidden="true">#</a> 模块和包</h1>
<h2 id="_1-模块" tabindex="-1"><a class="header-anchor" href="#_1-模块" aria-hidden="true">#</a> 1. 模块</h2>
<div class="custom-container tip">
<p class="custom-container-title">用一砣代码实现了某个功能的代码集合</p>
</div>
<p>类似于 <strong>函数式编程</strong> 和 <strong>面向过程编程</strong></p>
<ul>
<li><strong>函数式编程：</strong> 也叫 <strong>无副作用</strong> 编程，它不会改变外部变量</li>
<li><strong>面向过程</strong>：函数的堆砌，<strong>不断调用</strong>函数来完成一个功能，提供了代码的 <strong>重用性</strong> 和 <strong>代码间的耦合</strong></li>
</ul>
<p>模块分为三种</p>
<ul>
<li>
<p><strong>自定义</strong>模块：自己写的模块</p>
</li>
<li>
<p><strong>内置标准模块</strong>：又称<a href="https://docs.python.org/zh-cn/3/library/index.html" target="_blank" rel="noopener noreferrer">标准库<ExternalLinkIcon/></a></p>
</li>
<li>
<p>开源模块</p>
</li>
</ul>
<h3 id="_1-1-模块的调用" tabindex="-1"><a class="header-anchor" href="#_1-1-模块的调用" aria-hidden="true">#</a> 1.1 模块的调用</h3>
<p>使用 <code v-pre>import module</code> 的形式，来引入模块</p>
<ul>
<li>
<p>引入标准库</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>import os, sys
import re
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>引入自定义模块</p>
<p>创建一个 <code v-pre>test.py</code> 文件</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> test

<span class="token comment"># 通过如上形式，即可以引入自定义的模块，解释器通过搜索路径找到 test.py</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>引入第三方模块</p>
<p>下载第三方库 <code v-pre>nmcli</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip <span class="token function">install</span> nmcli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>直接引入</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> nmcli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p>使用 <code v-pre>from module import ... </code> 的形式，来引入模块中所需的对象</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> os <span class="token keyword">import</span> environ			<span class="token comment"># 引入系统环境 变量</span>

<span class="token keyword">from</span> test <span class="token keyword">import</span> add 			<span class="token comment"># 引入自定义 test 模块中 add 方法</span>

<span class="token keyword">from</span> asyncio <span class="token keyword">import</span> Queue		<span class="token comment"># 引入异步标准库的 队列类</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>若需要重命名，通常用于同名模块、方法、类等</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> fibo <span class="token keyword">import</span> fib <span class="token keyword">as</span> fibonacci

<span class="token comment"># 将 fibo 模块下的 fib方法 重命名为 fibonacci</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_1-2-脚本执行模块" tabindex="-1"><a class="header-anchor" href="#_1-2-脚本执行模块" aria-hidden="true">#</a> 1.2 脚本执行模块</h3>
<p>假设有 <code v-pre>fibo.py</code> 文件</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token triple-quoted-string string">"""-- fibo.py --"""</span>

<span class="token keyword">def</span> <span class="token function">fib</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
	a<span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span>
    <span class="token keyword">while</span> a <span class="token operator">&lt;</span> n<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token string">' '</span><span class="token punctuation">)</span>
        a<span class="token punctuation">,</span> b <span class="token operator">=</span> b<span class="token punctuation">,</span> a<span class="token operator">+</span>b
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用如下方式运行 <strong>Python</strong> 模块</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python fibo.py <span class="token operator">&lt;</span>arguments<span class="token operator">></span>

<span class="token comment"># 如 python fibo.py 50</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会直接视为将代码添加到模块末尾 <code v-pre>if __name__ == '__main__':</code> 下</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    <span class="token keyword">import</span> sys
    fib<span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常用于快捷测试，也是程序执行的入口</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if __name__ == '__main__':
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>__name__</code> 的特性是在本模块值为 <code v-pre>'__main__'</code>，而在其他模块声明后，则是其他模块名</li>
<li>通常用来模块内测试代码功能，使功能模块的功能部分，和逻辑执行分离</li>
</ul>
<h3 id="_1-3-模块搜索路径" tabindex="-1"><a class="header-anchor" href="#_1-3-模块搜索路径" aria-hidden="true">#</a> 1.3 模块搜索路径</h3>
<p><span style="color: blue"><strong>标准库</strong>:</span> <strong>Python</strong> 自带的标准模块，内嵌到编译器中，提供操作系统等的基本调用接口，如 <code v-pre>sys</code></p>
<p>对于非内嵌库（<em>自定义</em>），当模块导入后（如: <code v-pre>import fibo</code>）</p>
<ol>
<li>解释器首先搜索具有 <code v-pre>fibo</code> 名称的内置模块，<code v-pre>sys.builtin_module_names</code> 中</li>
<li>若没找到，则会在 <code v-pre>sys.path</code> 给出的目录列表中搜索</li>
</ol>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> sys

sys<span class="token punctuation">.</span>path

<span class="token comment">## 输出结果</span>
<span class="token punctuation">[</span><span class="token string">'C:\\ProgramData\\Miniconda3\\Scripts\\ipython.exe'</span><span class="token punctuation">,</span>
 <span class="token string">'c:\\programdata\\miniconda3\\python39.zip'</span><span class="token punctuation">,</span>
 <span class="token string">'c:\\programdata\\miniconda3\\DLLs'</span><span class="token punctuation">,</span>
 <span class="token string">'c:\\programdata\\miniconda3\\lib'</span><span class="token punctuation">,</span>
 <span class="token string">'c:\\programdata\\miniconda3'</span><span class="token punctuation">,</span>
 <span class="token string">''</span><span class="token punctuation">,</span>
 <span class="token string">'c:\\programdata\\miniconda3\\lib\\site-packages'</span><span class="token punctuation">,</span>
 <span class="token string">'c:\\programdata\\miniconda3\\lib\\site-packages\\win32'</span><span class="token punctuation">,</span>
 <span class="token string">'c:\\programdata\\miniconda3\\lib\\site-packages\\win32\\lib'</span><span class="token punctuation">,</span>
 <span class="token string">'c:\\programdata\\miniconda3\\lib\\site-packages\\Pythonwin'</span><span class="token punctuation">,</span>
 <span class="token string">'c:\\programdata\\miniconda3\\lib\\site-packages\\IPython\\extensions'</span><span class="token punctuation">,</span>
 <span class="token string">'C:\\Users\\Igarashi\\.ipython'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若自定义模块无法找到（<em>所在目录不在系统环境变量</em>），可以修改 <code v-pre>path</code> 告诉编译器目录位置</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>append<span class="token punctuation">(</span>abs_path<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="dir" tabindex="-1"><a class="header-anchor" href="#dir" aria-hidden="true">#</a> <strong>dir()</strong></h5>
<p>用于查找某个模块下定义的所有名称（<em>变量、模块、函数等</em>），无参时列出当前定义的名称</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> sys<span class="token punctuation">,</span> builtins

<span class="token builtin">dir</span><span class="token punctuation">(</span>sys<span class="token punctuation">)</span>
<span class="token comment">## 输出结果</span>
<span class="token punctuation">[</span><span class="token string">'__breakpointhook__'</span><span class="token punctuation">,</span> <span class="token string">'__displayhook__'</span><span class="token punctuation">,</span> <span class="token string">'__doc__'</span><span class="token punctuation">,</span> <span class="token string">'__excepthook__'</span><span class="token punctuation">,</span> <span class="token string">'__interactivehook__'</span><span class="token punctuation">,</span> <span class="token string">'__loader__'</span><span class="token punctuation">,</span> <span class="token string">'__name__'</span><span class="token punctuation">,</span> <span class="token string">'__package__'</span><span class="token punctuation">,</span> <span class="token string">'__spec__'</span><span class="token punctuation">,</span> <span class="token string">'__stderr__'</span><span class="token punctuation">,</span> <span class="token string">'__stdin__'</span><span class="token punctuation">,</span> <span class="token string">'__stdout__'</span><span class="token punctuation">,</span>
 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
 <span class="token string">'stderr'</span><span class="token punctuation">,</span> <span class="token string">'stdin'</span><span class="token punctuation">,</span> <span class="token string">'stdout'</span><span class="token punctuation">,</span> <span class="token string">'thread_info'</span><span class="token punctuation">,</span> <span class="token string">'unraisablehook'</span><span class="token punctuation">,</span> <span class="token string">'version'</span><span class="token punctuation">,</span> <span class="token string">'version_info'</span><span class="token punctuation">,</span> <span class="token string">'warnoptions'</span><span class="token punctuation">,</span> <span class="token string">'winver'</span><span class="token punctuation">]</span>

<span class="token builtin">dir</span><span class="token punctuation">(</span>builtins<span class="token punctuation">)</span>	<span class="token comment"># 查看内置函数和变量名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>模块的查找顺序：</strong> 内存中加载 &gt; 内置模块 &gt; <code v-pre>sys.path</code> 路径中包含的模块</p>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p><strong>Pycharm</strong> 中，可能会出现正确执行假象，<strong>IDE</strong> 将路径自动添加到了父包，但其实该路径并不在 <code v-pre>sys.path</code> 中</p>
</div>
<h5 id="利用-file-相对路径找绝对路径" tabindex="-1"><a class="header-anchor" href="#利用-file-相对路径找绝对路径" aria-hidden="true">#</a> <strong>利用 <code v-pre>__file__</code> 相对路径找绝对路径</strong></h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">import</span> sys

os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>abspath<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span>		<span class="token comment"># 把当前文件的相对路径变为绝对路径</span>

os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span>				<span class="token comment"># 找到当前路径所在的文件夹</span>

<span class="token comment"># 上 上 级 父路径 加入到环境变量</span>
sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>insert<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>abspath<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">".."</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 同上，经常出现在配置文件中</span>
BASE_DIR <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>abspath<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-python-编译" tabindex="-1"><a class="header-anchor" href="#_1-4-python-编译" aria-hidden="true">#</a> 1.4 Python &quot;编译&quot;</h3>
<p>为了快速加载模块，<strong>Python</strong> 把模块的编译版缓存在文件名为 <mark><code v-pre>module.version.pyc</code></mark> 的 <code v-pre>__pycache__</code> 目录中， 对编译文件格式进行编码</p>
<ul>
<li>
<p><code v-pre>version</code> 一般为 <strong>Python</strong> 的版本号</p>
<ul>
<li>如，<strong>CPython</strong> 的 <strong>3.3</strong> 发行版，<code v-pre>spam.py</code> 的编译版本缓存为 <code v-pre>__pycache__/spam.cpython-33.pyc </code></li>
<li>使用这种命名惯例，可让不同 <strong>Python</strong> 发行版，及不同版本的已编译模块，<strong>共存</strong></li>
</ul>
</li>
<li>
<p><strong>Python</strong> 会对比编译版本与源码的 <strong>修改日期</strong>，查看它是否已过期，是否要重新编译，此过程完全自动化</p>
</li>
<li>
<p>编译模块与平台无关，可在不同架构系统之间共享相同的支持库</p>
</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p><strong>Python</strong> 在两种情况下不检查缓存</p>
<ol>
<li>从命令行直接载入模块，只重新编译，不存储编译结果</li>
<li>没有源模块，就不会检查缓存
<ul>
<li>为了支持无源文件（仅编译）发行版本， 编译模块必须在源目录下，并且绝不能有源模块</li>
</ul>
</li>
</ol>
</div>
<p><a href="https://docs.python.org/3.10/library/compileall.html#module-compileall" target="_blank" rel="noopener noreferrer">编译库 文档<ExternalLinkIcon/></a></p>
<br/>
<h2 id="_2-包" tabindex="-1"><a class="header-anchor" href="#_2-包" aria-hidden="true">#</a> 2. 包</h2>
<p>解释型语言的 <strong>包</strong> 并不是编译成低级语言（像 <strong>Java</strong> 编译为 <code v-pre>.class</code> 字节码文件）而后打包的意思，而是用 <code v-pre>.module</code> 构造模块命名空间的方法，是利用包按目录的形式，更加方便模块化和管理模块间的依赖</p>
<h3 id="_2-1-init-py" tabindex="-1"><a class="header-anchor" href="#_2-1-init-py" aria-hidden="true">#</a> 2.1 __init__.py</h3>
<p>导入包时，<strong>Python</strong> 会搜索 <code v-pre>sys.path</code> 里的目录，查找包的子目录，会只将含有 <strong>__init__.py</strong> 文件的目录当成包</p>
<p>最简情况的 <code v-pre>__init__.py</code> 是一个空文件，其也可以执行包的初始化代码，或设置 <code v-pre>__all__</code> 变量</p>
<Tree title="/">
  <ul>
      <li>
          sound
          <small>顶级包</small>
          <ul>
              <li>
                  <code>__init__.py</code>
              </li>
              <li>
                  formats
                  <small>格式化的包</small>
                  <ul>
                      <li>
                          <code>__init__.py</code>
                      </li>
                      <li>
                          wavread.py
                      </li>
                      <li>
                          ...
                      </li>
                  </ul>
              </li>
              <li>
                  effects
                  <small>声音效果的包</small>
                  <ul>
                      <li>
                          <code>__init__.py</code>
                      </li>
                      <li>
                          echo.py
                      </li>
                      <li>
                          surround.py
                      </li>
                      <li>
                          reverse.py
                      </li>
                      <li>
                          ...
                      </li>
                  </ul>
              </li>
             <li>
                  filters
                  <small>过滤器包</small>
                  <ul>
                      <li>
                          <code>__init__.py</code>
                      </li>
                      <li>
                          ...
                      </li>
                  </ul>
              </li>
          </ul>
      </li>
  </ul>
</Tree>
<p>此时从包中导入单个模块</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> sound<span class="token punctuation">.</span>effects<span class="token punctuation">.</span>echo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但通常不用全名形式写，而是</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> sound<span class="token punctuation">.</span>effects <span class="token keyword">import</span> echo				<span class="token comment"># 导入包</span>

<span class="token keyword">from</span> sound<span class="token punctuation">.</span>effects<span class="token punctuation">.</span>echo <span class="token keyword">import</span> echofilter	<span class="token comment"># 从包中导入函数或变量</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当一个包被 <code v-pre>import</code> 时，首先加载它的 <code v-pre>__init__.py</code> 文件，故也可在 <code v-pre>__init__.py</code> 文件下进行初始化</p>
<p>如，在 <strong>effects</strong> 文件下的 <code v-pre>__init__.py</code> 引入同级目录 <strong>format</strong> 文件下 <code v-pre>wavread.py</code> 的所有</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token triple-quoted-string string">""" __init__.py """</span>

<span class="token keyword">from</span> sound<span class="token punctuation">.</span>formats<span class="token punctuation">.</span>wavread <span class="token keyword">import</span> <span class="token operator">*</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时 <code v-pre>from.sound.effects import *</code> 同时会包含 <strong>formats</strong> 下的 <code v-pre>wavread</code> 模块</p>
<h3 id="_2-2-all-变量" tabindex="-1"><a class="header-anchor" href="#_2-2-all-变量" aria-hidden="true">#</a> 2.2 <strong>__all__</strong> 变量</h3>
<p>如果包的 <code v-pre>__init__.py</code> 代码定义了列表 <code v-pre>__all__</code>，运行 <code v-pre>from package import *</code> 时，会从 <code v-pre>__all__</code> 列表中导入</p>
<ul>
<li>
<p>如作者在 <code v-pre>sound/effects/__init__.py</code> 下指定</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>__all__ <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"echo"</span><span class="token punctuation">,</span> <span class="token string">"surround"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>意味执行 <code v-pre>from sound.effects import *</code> 时，会导入 <code v-pre>echo</code> 和 <code v-pre>surround</code> 这两个子模块</p>
</li>
</ul>
<p>简单来说就是 <strong>不想引入文件中的所有模块</strong> 或是 <strong>模块中的所有变量</strong> 而进行 <strong>限制</strong> 导入</p>
<h3 id="_2-3-path-变量" tabindex="-1"><a class="header-anchor" href="#_2-3-path-变量" aria-hidden="true">#</a> 2.3 <strong>__path__</strong> 变量</h3>
<p>包支持一个更特殊的属性 <a href="https://docs.python.org/zh-cn/3.10/reference/import.html#path__" target="_blank" rel="noopener noreferrer">__path__<ExternalLinkIcon/></a> ，在 <code v-pre>__init__.py</code> 文件的代码被执行前，该属性会被初始化为自身所在的目录的列表</p>
<ul>
<li>
<p>默认情况下只有一个元素，就是当前包的路径</p>
</li>
<li>
<p>修改 <code v-pre>__path__</code>，就会改到此包内的搜索路径</p>
</li>
<li>
<p>不常用，但可用于扩展包中的模块集</p>
</li>
</ul>
<br/>
<h2 id="_3-调用解释器" tabindex="-1"><a class="header-anchor" href="#_3-调用解释器" aria-hidden="true">#</a> 3. 调用解释器</h2>
<p><strong>Python</strong> 解释器（<em>Linux 环境</em>）通常安装在 <code v-pre>/usr/local/bin/python3.10</code> 路径下，将 <code v-pre>/usr/local/bin</code> 加入系统变量，即可键入 <code v-pre>python3</code> 启动，<strong>Windows</strong> 同理</p>
<p><a href="https://docs.python.org/zh-cn/3.10/using/cmdline.html#using-on-general" target="_blank" rel="noopener noreferrer">命令行 文档<ExternalLinkIcon/></a></p>
<h3 id="_3-1-调用模块" tabindex="-1"><a class="header-anchor" href="#_3-1-调用模块" aria-hidden="true">#</a> 3.1 调用模块</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python <span class="token parameter variable">-m</span> fibo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种形式即可调用 <code v-pre>module</code> 运行指定的 <code v-pre>package</code>（<em>包</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 若需运行某项目的 main.py 入口命令如下</span>
$ python <span class="token parameter variable">-m</span> etutorservice <span class="token parameter variable">-c</span> etc/default.yml <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>-m</code> 即执行 <code v-pre>etutorservice</code> 项目下的 <code v-pre>main.py</code> 文件，此外，还可以运行 <strong>zip</strong> 的压缩文件</li>
<li><code v-pre>-c</code> 配置文件的路径，用 <a href="">argparse</a>（<em>参数解析器</em>）来获取执行脚本需要的参数</li>
<li><code v-pre>-r</code> 默认 <code v-pre>True</code> ，用于初始化的判断</li>
</ul>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p><strong><code v-pre>python main.py</code> 和 <code v-pre>python -m main.py</code> 区别</strong></p>
<ol>
<li>前者是直接运行，后者是把模块当脚本来启动，此时 <code v-pre>__name__</code> 为脚本名称，而非 <code v-pre>__main__</code></li>
<li>影响 <code v-pre>sys.path</code> 中的环境变量，<code v-pre>-m</code> 方式默认缺少当下目录路径，直接启动会将当前路径加入环境变量中</li>
</ol>
</div>
<br/>
<h2 id="_4-目录规范" tabindex="-1"><a class="header-anchor" href="#_4-目录规范" aria-hidden="true">#</a> 4. 目录规范</h2>
<p>假设项目名为 <code v-pre>Foo</code>，最方便快捷目录结构如下足够</p>
<pre><code>Foo/
|-- bin/
|   |-- foo
|
|-- src/
|   |-- tests/
|   |   |-- __init__.py
|   |   |-- test_main.py
|   |
|   |-- __init__.py
|   |-- main.py
|
|-- docs/
|   |-- conf.py
|   |-- abc.rst
|
|-- setup.py
|-- requirements.txt
|-- README
</code></pre>
<ul>
<li>
<p><code v-pre>bin/</code> 存放项目的一些 <strong>可执行文件</strong>，起名 <code v-pre>script/</code> 之类的也行</p>
</li>
<li>
<p><code v-pre>src/</code> 存放项目的所有 <strong>源代码</strong></p>
<ul>
<li>源代码中的所有模块、包都应该放在此目录，不要置于顶层目录</li>
<li>子目录 <code v-pre>tests/ </code> 用来存放 <strong>单元测试</strong> 代码</li>
<li>程序的入口通常命名为 <code v-pre>main.py</code></li>
</ul>
</li>
<li>
<p><code v-pre>docs/</code> 存放一些文档</p>
</li>
<li>
<p><code v-pre>setup.py</code> 安装、部署、打包的脚本，项目必须，为了 <strong>快速部署 &amp; run</strong> 起来</p>
<ul>
<li>过去常用 <strong>setuptools</strong> 打包工具，如 <a href="https://github.com/pallets/flask/blob/main/setup.py" target="_blank" rel="noopener noreferrer">flask<ExternalLinkIcon/></a></li>
<li>目前主流则是 <a href="/operations/docker/docker%E5%9F%BA%E7%A1%80" target="_blank" rel="noopener noreferrer">Docker<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>
<p><code v-pre>requirements.txt</code> 存放软件依赖的外部 <strong>Python</strong> 包列表，类似前端的 <code v-pre>package.json</code></p>
<ul>
<li>
<p>即可通过如下命令将所有的 <strong>Python</strong> 包依赖安装好</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><code v-pre>README.md</code> 项目说明文件，通常使用 <strong>MarkDown</strong> 形式</p>
<ol>
<li>软件定位，软件的基本功能</li>
<li>运行代码的方法: 安装环境、启动命令等</li>
<li>简要的使用说明</li>
<li>代码目录结构说明，更详细点可以说明软件的基本原理</li>
<li>常见问题说明</li>
</ol>
<blockquote>
<p>除外，如 <code v-pre>LICENSE.txt</code> 、<code v-pre>ChangeLog.txt</code> 等，主要用来项目开源，写开源目录怎么组织，自行查阅</p>
</blockquote>
</li>
</ul>
<h3 id="_4-1-关于配置文件" tabindex="-1"><a class="header-anchor" href="#_4-1-关于配置文件" aria-hidden="true">#</a> <strong>4.1 关于配置文件</strong></h3>
<h5 id="很多项目对配置文件的使用做法是" tabindex="-1"><a class="header-anchor" href="#很多项目对配置文件的使用做法是" aria-hidden="true">#</a> <strong>很多项目对配置文件的使用做法是</strong></h5>
<ol>
<li>配置文件写在一个或多个 <strong>Python</strong> 文件中，比如此处的 <code v-pre>conf.py</code></li>
<li>项目中哪个模块用到这个配置文件就直接通过 <code v-pre>import conf</code> 形式在代码引入</li>
</ol>
<div class="custom-container warning">
<p class="custom-container-title">如上做法问题</p>
<ol>
<li>
<p><strong>单元测试变得困难</strong>（<em>因为模块内部依赖了外部配置</em>）</p>
</li>
<li>
<p>配置文件作为用户控制程序的接口，应当 <strong>可由用户自由指定</strong> 该文件的路径</p>
</li>
<li>
<p>程序组件 <strong>可复用性太差</strong>，为这种贯穿所有模块的代码硬编码方式，使得大部分模块都依赖 <code v-pre>conf.py</code> 这个文件</p>
</li>
</ol>
</div>
<h5 id="配置使用更好的方式" tabindex="-1"><a class="header-anchor" href="#配置使用更好的方式" aria-hidden="true">#</a> <strong>配置使用更好的方式：</strong></h5>
<ol>
<li>模块的配置都可 <strong>灵活配置</strong> ，不受外部配置文件的影响</li>
<li>程序的配置都 <strong>灵活控制</strong>，如 <strong>Nginx</strong>、<strong>MySQL</strong> 这种软件的配置文件，可用户自由指定</li>
<li>故不应代码中 <code v-pre>import conf</code> 来使用配置文件</li>
</ol>
<p>故如上目录结构中，没有将 <code v-pre>conf.py</code> 放在源码目录下，而是放在 <code v-pre>docs/</code> 目录下，给出的一个配置样例，而不是写死程序中</p>
<p>可通过给 <code v-pre>main.py</code> 设置启动参数指定配置路径的方式来让程序读取配置内容</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python <span class="token parameter variable">-m</span> program <span class="token parameter variable">-c</span> doc/settings.py <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>conf.py</code> 可换个类似名称，如 <code v-pre>settings.py</code></li>
<li>当然，也可用其他格式来编写配置文件，如 <code v-pre>settings.yml</code>、<code v-pre>default.yml</code></li>
</ul>
<br/>
</div></template>


