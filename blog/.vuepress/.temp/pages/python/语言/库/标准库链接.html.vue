<template><div><p><strong>Python</strong> 相关库的一些链接</p>
<!-- more -->
<h3 id="标准库" tabindex="-1"><a class="header-anchor" href="#标准库"><span>标准库</span></a></h3>
<p><a href="https://docs.python.org/zh-cn/3/library/index.html" target="_blank" rel="noopener noreferrer">官方链接参考</a></p>
<h4 id="时间" tabindex="-1"><a class="header-anchor" href="#时间"><span>时间</span></a></h4>
<p><strong>time：</strong> 各种函数操纵时间戳</p>
<p><strong>datetime：</strong> 更方便的操作时间</p>
<p><strong>timeit：</strong> 统计小片段代码工具</p>
<hr>
<h4 id="日志" tabindex="-1"><a class="header-anchor" href="#日志"><span>日志</span></a></h4>
<p><strong>logging</strong></p>
<hr>
<h4 id="文本处理" tabindex="-1"><a class="header-anchor" href="#文本处理"><span>文本处理</span></a></h4>
<p><strong>re</strong></p>
<hr>
<h4 id="系统" tabindex="-1"><a class="header-anchor" href="#系统"><span>系统</span></a></h4>
<p><strong>os：</strong> 系统接口、文件、进程管理</p>
<p><strong>sys：</strong> 系统相关函数和参数</p>
<p><strong>argparse：</strong> 命令行、参数解析</p>
<p><strong>subprocess：</strong> 子进程，执行命令</p>
<p><strong>signal：</strong> <strong>信号、异步事件</strong> 处理程序</p>
<p><strong>platform：</strong> 不同平台</p>
<hr>
<h4 id="序列化" tabindex="-1"><a class="header-anchor" href="#序列化"><span>序列化</span></a></h4>
<p>把 <strong>对象（<em>变量、数据</em> ）</strong> 从 <mark>内存</mark> 变为 <font color="orange">可存储 或 传输 的过程</font> 称之为序列化，序列化后，即可将其序列内容 <strong>写入磁盘</strong>，或通过 <strong>网络传输</strong> 到别的机器上</p>
<p>反过来，把变量内容从 <mark>已序列化的对象</mark> 重新  <font color="orange">读到内存里</font> 称之为反序列化</p>
<p><strong>xml：</strong> 过时，<strong>Java</strong> 配置</p>
<p><strong>json：</strong> <strong>Web</strong> 通用，但性能差（<em><strong>文本格式</strong>，字符串，但也比 <strong>xml</strong> 强</em> ）</p>
<p><strong>protobuf：</strong> 高效（<em><strong>1k</strong> 次和 <strong>json</strong> 差不多，<strong>10w</strong> 次大幅提高</em>），数据压缩小（<em>占用内存小，<strong>二进制格式</strong></em> ）</p>
<p><strong>pickle、shelve、configparser、mimetypes、Jinja2</strong></p>
<hr>
<h4 id="函数式" tabindex="-1"><a class="header-anchor" href="#函数式"><span>函数式</span></a></h4>
<p><strong>functools：</strong> 如缓存 <strong>lru_cache</strong>，装饰  <strong>warp</strong> ，函数式 <strong>partial</strong></p>
<p><strong>itertools、operator</strong></p>
<hr>
<h4 id="文件" tabindex="-1"><a class="header-anchor" href="#文件"><span>文件</span></a></h4>
<p><strong>pathlib、stat、tempfile、mkstemp、mkdtemp</strong></p>
<p><strong>fcntl：</strong> <RouteLink to="/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/Linux%E6%96%87%E4%BB%B6%E9%94%81.html">文件锁</RouteLink></p>
<p><strong>shutil：</strong> 高级文件接口，<strong>copy</strong> 文件，<strong>with</strong> 跨平台寻找环境变量可执行程序</p>
<hr>
<h4 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型"><span>数据类型</span></a></h4>
<p><strong>collections：</strong> 自定义数据类型接口，具名元组，排序字典等</p>
<p><strong>enum：</strong> 定义枚举</p>
<hr>
<h4 id="运行时" tabindex="-1"><a class="header-anchor" href="#运行时"><span>运行时</span></a></h4>
<p><strong>abc、atexit、contextlib、traceback</strong></p>
<hr>
<h4 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h4>
<p><strong>random：</strong> 随机数</p>
<p><strong>gettext：</strong> 国际化 <strong>i18</strong> 转义</p>
<p><strong>hashlib：</strong> 哈希，<strong>md5</strong> 校验， <strong>sha</strong> 加密</p>
<h3 id="其他第三方库" tabindex="-1"><a class="header-anchor" href="#其他第三方库"><span>其他第三方库</span></a></h3>
<ul>
<li><strong>时间：</strong> <strong>arrow</strong></li>
<li><strong>日常运维：</strong> <strong>psutil</strong></li>
<li><strong>异步lib：</strong> <a href="https://github.com/aio-libs" target="_blank" rel="noopener noreferrer">aio-libs</a></li>
</ul>
</div></template>


