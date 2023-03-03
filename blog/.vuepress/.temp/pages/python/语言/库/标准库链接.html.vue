<template><div><p><strong>Python</strong> 相关库的一些链接</p>
<!-- more -->
<h3 id="标准库" tabindex="-1"><a class="header-anchor" href="#标准库" aria-hidden="true">#</a> 标准库</h3>
<p><a href="https://docs.python.org/zh-cn/3/library/index.html" target="_blank" rel="noopener noreferrer">官方链接参考<ExternalLinkIcon/></a></p>
<h4 id="时间" tabindex="-1"><a class="header-anchor" href="#时间" aria-hidden="true">#</a> 时间</h4>
<p><strong>time：</strong> 各种函数操纵时间戳</p>
<p><strong>datetime：</strong> 更方便的操作时间</p>
<p><strong>timeit：</strong> 统计小片段代码工具</p>
<hr>
<h4 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h4>
<p><strong>logging</strong></p>
<hr>
<h4 id="文本处理" tabindex="-1"><a class="header-anchor" href="#文本处理" aria-hidden="true">#</a> 文本处理</h4>
<p><strong>re</strong></p>
<hr>
<h4 id="系统" tabindex="-1"><a class="header-anchor" href="#系统" aria-hidden="true">#</a> 系统</h4>
<p><strong>os：</strong> 系统接口、文件、进程管理</p>
<p><strong>sys：</strong> 系统相关函数和参数</p>
<p><strong>argparse：</strong> 命令行、参数解析</p>
<p><strong>subprocess：</strong> 子进程，执行命令</p>
<p><strong>signal：</strong> <strong>信号、异步事件</strong> 处理程序</p>
<p><strong>platform：</strong> 不同平台</p>
<hr>
<h4 id="序列化" tabindex="-1"><a class="header-anchor" href="#序列化" aria-hidden="true">#</a> 序列化</h4>
<p>把 **对象（<em>变量、数据</em> ）**从 <mark>内存</mark> 变为 <font color="orange">可存储 或 传输 的过程</font> 称之为序列化，序列化后，即可将其序列内容 <strong>写入磁盘</strong>，或通过 <strong>网络传输</strong> 到别的机器上</p>
<p>反过来，把变量内容从 <mark>已序列化的对象</mark> 重新  <font color="orange">读到内存里</font> 称之为反序列化</p>
<p><strong>xml：</strong> 过时，<strong>Java</strong> 配置</p>
<p><strong>json：</strong> <strong>Web</strong> 通用，但性能差（<em><strong>文本格式</strong>，字符串，但也比 <strong>xml</strong> 强</em> ）</p>
<p><strong>protobuf：</strong> 高效（<em><strong>1k</strong> 次和 <strong>json</strong> 差不多，<strong>10w</strong> 次大幅提高</em>），数据压缩小（<em>占用内存小，<strong>二进制格式</strong></em> ）</p>
<p><strong>pickle、shelve、configparser、mimetypes、Jinja2、protobuf</strong></p>
<hr>
<h4 id="函数式" tabindex="-1"><a class="header-anchor" href="#函数式" aria-hidden="true">#</a> 函数式</h4>
<p><strong>functools、itertools、operator</strong></p>
<hr>
<h4 id="文件" tabindex="-1"><a class="header-anchor" href="#文件" aria-hidden="true">#</a> 文件</h4>
<p><strong>pathlib、stat、tempfile、mkstemp、mkdtemp</strong></p>
<p>**fcntl：**文件锁</p>
<p><strong>shutil：</strong> 高级文件接口，<strong>copy</strong> 文件，<strong>with</strong> 跨平台寻找环境变量可执行程序</p>
<hr>
<h4 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h4>
<p><strong>collections、Enum</strong></p>
<hr>
<h4 id="运行时" tabindex="-1"><a class="header-anchor" href="#运行时" aria-hidden="true">#</a> 运行时</h4>
<p><strong>abc、atexit、contextlib、traceback</strong></p>
<hr>
<h4 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h4>
<p><strong>random、hashlib、gettext</strong></p>
<h3 id="其他第三方库" tabindex="-1"><a class="header-anchor" href="#其他第三方库" aria-hidden="true">#</a> 其他第三方库</h3>
<ul>
<li><strong>时间：</strong> <strong>arrow</strong></li>
<li><strong>日常运维：</strong> <strong>psutil</strong></li>
<li><strong>异步lib：</strong> <a href="https://github.com/aio-libs" target="_blank" rel="noopener noreferrer">aio-libs<ExternalLinkIcon/></a></li>
</ul>
</div></template>


