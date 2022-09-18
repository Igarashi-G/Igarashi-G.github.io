<template><div><h1 id="文件操作" tabindex="-1"><a class="header-anchor" href="#文件操作" aria-hidden="true">#</a> 文件操作</h1>
<h2 id="pathlib" tabindex="-1"><a class="header-anchor" href="#pathlib" aria-hidden="true">#</a> pathlib</h2>
<p>基本可以代替 os.path 来处理路径。它采用了完全面向对象的编程方式。</p>
<hr>
<h2 id="tempfile" tabindex="-1"><a class="header-anchor" href="#tempfile" aria-hidden="true">#</a> tempfile</h2>
<p>用于创建临时文件和目录，它可以跨平台使用，通常有以下多个接口</p>
<pre><code>https://docs.python.org/zh-cn/3.8/library/tempfile.html
</code></pre>
<h3 id="_1-temporaryfile" tabindex="-1"><a class="header-anchor" href="#_1-temporaryfile" aria-hidden="true">#</a> 1.TemporaryFile</h3>
<pre><code>tempfile.TemporaryFile(
mode='w+b', buffering=None, encoding=None, newline=None, suffix=None, prefix=None, dir=None, *, errors=None)
</code></pre>
<p>返回一个文件类对象，类似 with open as f 中的 f（但底层不是真实文件，不能像 f 一样使用）
创建该文件使用了与 mkstemp() 相同的安全规则。它将在关闭后立即销毁（包括垃圾回收机制关闭该对象时）。</p>
<h3 id="_2-namedtemporaryfile" tabindex="-1"><a class="header-anchor" href="#_2-namedtemporaryfile" aria-hidden="true">#</a> 2.NamedTemporaryFile</h3>
<pre><code>tempfile.NamedTemporaryFile(mode='w+b', buffering=None, encoding=None, newline=None, suffix=None, prefix=None,
                            dir=None, delete=True, *, errors=None)
</code></pre>
<p>与上唯一区别就是有 delete 参数 True/False 来控制文件是否会销毁，它的 file 属性底层是真实的文件对象，可以像普通文件一样再 with 中使用</p>
<h3 id="_3-spooledtemporaryfile" tabindex="-1"><a class="header-anchor" href="#_3-spooledtemporaryfile" aria-hidden="true">#</a> 3.SpooledTemporaryFile</h3>
<pre><code>tempfile.SpooledTemporaryFile(max_size=0, mode='w+b', buffering=None, encoding=None, newline=None, suffix=None,
                                prefix=None, dir=None, *, errors=None)
</code></pre>
<p>此函数执行的操作与 TemporaryFile() 完全相同，但会将数据缓存在内存中，直到文件大小超过 max_size，或调用文件的 fileno() 方法为止，
此时数据会被写入磁盘，并且写入操作与 TemporaryFile() 相同。</p>
<p>此函数生成的文件对象有一个额外的方法——rollover()，可以忽略文件大小，让文件立即写入磁盘。</p>
<h3 id="_4-mkstemp-temporarydirectory" tabindex="-1"><a class="header-anchor" href="#_4-mkstemp-temporarydirectory" aria-hidden="true">#</a> 4.mkstemp（TemporaryDirectory）</h3>
<pre><code>tempfile.mkstemp(suffix=None, prefix=None, dir=None, text=False)
</code></pre>
<p>以最安全的方式创建一个临时文件。假设所在平台正确实现了 os.open() 的 os.O_EXCL 标志，则创建文件时不会有竞争的情况。
该文件只能由创建者读写，如果所在平台用权限位来标记文件是否可执行，那么没有人有执行权。文件描述符不会过继给子进程。</p>
<p>如果 suffix、prefix 和 dir 中的任何一个不是 None，就要保证它们是同一数据类型。如果它们是 bytes，则返回的名称的类型就是 bytes
而不是 str。如果确实要用默认参数，但又想要返回值是 bytes 类型，请传入 suffix=b''。
dir 参数现在可接受一个路径类对象 (path-like object)。</p>
<p>[注意]：这种方式创建出来的文件，不会出现多对象同时读写引发的错乱，因此保证唯一。推荐！</p>
<h3 id="_5-mkdtemp" tabindex="-1"><a class="header-anchor" href="#_5-mkdtemp" aria-hidden="true">#</a> 5.mkdtemp</h3>
<pre><code>tempfile.mkdtemp(suffix=None, prefix=None, dir=None)
</code></pre>
<p>以最安全的方式创建一个临时目录，创建该目录时不会有竞争的情况。该目录只能由创建者读取、写入和搜索。
prefix、suffix 和 dir 的含义与它们在 mkstemp() 中的相同。mkdtemp() 返回新目录的绝对路径。</p>
<p>[注意]：</p>
<ul>
<li>
<p>唯一性同上，推荐</p>
</li>
<li>
<p>mkdtemp() 用户用完临时目录后需要自行将其删除。</p>
</li>
</ul>
<h2 id="fcntl" tabindex="-1"><a class="header-anchor" href="#fcntl" aria-hidden="true">#</a> fcntl</h2>
<p>Unix 专用
--- The fcntl and ioctl system calls
文件锁</p>
<h2 id="shutil" tabindex="-1"><a class="header-anchor" href="#shutil" aria-hidden="true">#</a> shutil</h2>
<p>shutil 模块提供了一系列对文件和文件集合的高阶操作。 特别是提供了一些支持文件拷贝和删除的函数。 对于单个文件的操作，请参阅 os 模块。</p>
</div></template>


