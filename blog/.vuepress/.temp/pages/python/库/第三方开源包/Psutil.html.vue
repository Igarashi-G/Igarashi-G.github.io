<template><div><h1 id="psutil" tabindex="-1"><a class="header-anchor" href="#psutil" aria-hidden="true">#</a> psutil</h1>
<p>日常处理运维相关，psutil = process and system utilities 不仅可以通过一两行代码实现系统监控，还可以跨平台使用</p>
<p><a href="https://psutil.readthedocs.io/" target="_blank" rel="noopener noreferrer">https://psutil.readthedocs.io/<ExternalLinkIcon/></a></p>
<h2 id="安装-psutil" tabindex="-1"><a class="header-anchor" href="#安装-psutil" aria-hidden="true">#</a> 安装 psutil</h2>
<pre><code>pip install psutil

import psutil
</code></pre>
<h2 id="一、cpu-相关" tabindex="-1"><a class="header-anchor" href="#一、cpu-相关" aria-hidden="true">#</a> 一、CPU 相关：</h2>
<h3 id="_1-获取-cpu-信息" tabindex="-1"><a class="header-anchor" href="#_1-获取-cpu-信息" aria-hidden="true">#</a> 1. 获取 CPU 信息：</h3>
<h4 id="cpu-逻辑数量" tabindex="-1"><a class="header-anchor" href="#cpu-逻辑数量" aria-hidden="true">#</a> CPU 逻辑数量</h4>
<pre><code>psutil.cpu_count()      # 4则是4核非超线程
</code></pre>
<h4 id="cpu-物理核心" tabindex="-1"><a class="header-anchor" href="#cpu-物理核心" aria-hidden="true">#</a> CPU 物理核心</h4>
<pre><code>psutil.cpu_count(logical=False)     # 2说明是双核超线程
</code></pre>
<h2 id="二、内存相关" tabindex="-1"><a class="header-anchor" href="#二、内存相关" aria-hidden="true">#</a> 二、内存相关：</h2>
<h3 id="_1-获取内存信息" tabindex="-1"><a class="header-anchor" href="#_1-获取内存信息" aria-hidden="true">#</a> 1.获取内存信息：</h3>
<h4 id="获取物理内存信息" tabindex="-1"><a class="header-anchor" href="#获取物理内存信息" aria-hidden="true">#</a> 获取物理内存信息</h4>
<pre><code>psutil.virtual_memory()

svmem(total=8589934592, available=2866520064, percent=66.6, used=7201386496, free=216178688, active=3342192640, inactive=2650341376, wired=1208852480)
</code></pre>
<h4 id="获取交换内存信息" tabindex="-1"><a class="header-anchor" href="#获取交换内存信息" aria-hidden="true">#</a> 获取交换内存信息</h4>
<pre><code>psutil.swap_memory()

sswap(total=1073741824, used=150732800, free=923009024, percent=14.0, sin=10705981440, sout=40353792)
</code></pre>
<h2 id="三、磁盘相关" tabindex="-1"><a class="header-anchor" href="#三、磁盘相关" aria-hidden="true">#</a> 三、磁盘相关：</h2>
<h3 id="_1-获取磁盘信息" tabindex="-1"><a class="header-anchor" href="#_1-获取磁盘信息" aria-hidden="true">#</a> 1.获取磁盘信息</h3>
<p>可以通过 psutil 获取磁盘分区、磁盘使用率和磁盘 IO 信息：</p>
<h4 id="磁盘分区信息" tabindex="-1"><a class="header-anchor" href="#磁盘分区信息" aria-hidden="true">#</a> 磁盘分区信息</h4>
<pre><code>psutil.disk_partitions()
</code></pre>
<h4 id="磁盘使用情况" tabindex="-1"><a class="header-anchor" href="#磁盘使用情况" aria-hidden="true">#</a> 磁盘使用情况</h4>
<pre><code>psutil.disk_usage('/')
</code></pre>
<h4 id="磁盘-io" tabindex="-1"><a class="header-anchor" href="#磁盘-io" aria-hidden="true">#</a> 磁盘 IO</h4>
<pre><code>psutil.disk_io_counters()
</code></pre>
<h2 id="四、网络相关" tabindex="-1"><a class="header-anchor" href="#四、网络相关" aria-hidden="true">#</a> 四、网络相关：</h2>
<p>psutil 可以获取网络接口和网络连接信息：</p>
<h3 id="_1-获取网络信息" tabindex="-1"><a class="header-anchor" href="#_1-获取网络信息" aria-hidden="true">#</a> 1.获取网络信息</h3>
<h4 id="获取网络读写字节-包的个数" tabindex="-1"><a class="header-anchor" href="#获取网络读写字节-包的个数" aria-hidden="true">#</a> 获取网络读写字节／包的个数</h4>
<pre><code>psutil.net_io_counters()
</code></pre>
<h4 id="获取网络接口信息" tabindex="-1"><a class="header-anchor" href="#获取网络接口信息" aria-hidden="true">#</a> 获取网络接口信息</h4>
<pre><code>psutil.net_if_addrs()
</code></pre>
<h4 id="获取网络接口状态" tabindex="-1"><a class="header-anchor" href="#获取网络接口状态" aria-hidden="true">#</a> 获取网络接口状态</h4>
<pre><code>psutil.net_if_stats()
</code></pre>
<h4 id="获取当前网络连接信息" tabindex="-1"><a class="header-anchor" href="#获取当前网络连接信息" aria-hidden="true">#</a> 获取当前网络连接信息</h4>
<pre><code>psutil.net_connections()
</code></pre>
<p>【注意】：</p>
<p>当提示得到一个 AccessDenied 错误，原因是 psutil 获取信息也是要走系统接口，而获取网络连接信息需要 root 权限，这种情况下，
可以退出 Python 交互环境，用 sudo 重新启动：</p>
<h2 id="五、进程相关" tabindex="-1"><a class="header-anchor" href="#五、进程相关" aria-hidden="true">#</a> 五、进程相关：</h2>
<p>通过 psutil 可以获取到所有进程的详细信息：</p>
<h3 id="_1-获取进程信息" tabindex="-1"><a class="header-anchor" href="#_1-获取进程信息" aria-hidden="true">#</a> 1.获取进程信息</h3>
<h4 id="获取所有进程-id" tabindex="-1"><a class="header-anchor" href="#获取所有进程-id" aria-hidden="true">#</a> 获取所有进程 ID</h4>
<pre><code>psutil.pids()
</code></pre>
<h4 id="获取指定进程信息" tabindex="-1"><a class="header-anchor" href="#获取指定进程信息" aria-hidden="true">#</a> 获取指定进程信息：</h4>
<pre><code>p = psutil.Process(3776) # 获取指定进程ID=3776，其实就是当前Python交互环境

p.name() # 进程名称

p.exe() # 进程exe路径

p.cwd() # 进程工作目录

p.cmdline() # 进程启动的命令行

p.ppid() # 父进程ID

p.parent() # 父进程

p.children() # 子进程列表

p.status() # 进程状态

p.username() # 进程用户名

p.create_time() # 进程创建时间

p.terminal() # 进程终端

p.cpu_times() # 进程使用的CPU时间

p.memory_info() # 进程使用的内存

p.open_files() # 进程打开的文件

p.connections() # 进程相关网络连接

p.num_threads() # 进程的线程数量

p.threads() # 所有线程信息

p.environ() # 进程环境变量

p.terminate() # 结束进程
</code></pre>
<p>【注意】：</p>
<p>和获取网络连接类似，获取一个 root 用户的进程需要 root 权限，启动 Python <a href="http://xn--blq9aw45ce2js8vp3q.py" target="_blank" rel="noopener noreferrer">交互环境或者.py<ExternalLinkIcon/></a> 文件时，需要 sudo 权限。</p>
<h2 id="六、使用-popen-类" tabindex="-1"><a class="header-anchor" href="#六、使用-popen-类" aria-hidden="true">#</a> 六、使用 Popen 类：</h2>
<h3 id="popen-类可以获取用户启动的应用程序进程信息。" tabindex="-1"><a class="header-anchor" href="#popen-类可以获取用户启动的应用程序进程信息。" aria-hidden="true">#</a> popen 类可以获取用户启动的应用程序进程信息。</h3>
<pre><code>p = putil.Popen([&quot;/usr/bin/python&quot;,&quot;-c&quot;,&quot;print('Hello')&quot;],stdout=subprocess.PIPE)
p.name()
p.username() # 创建进程的用户
p.communicate() # ('hellon',None)
p.cpu_times() # 得到进程运行的CPU时间
</code></pre>
<h2 id="、测试" tabindex="-1"><a class="header-anchor" href="#、测试" aria-hidden="true">#</a> 、测试</h2>
<p>psutil 还提供了一个 test()函数，可以模拟出 ps 命令的效果：</p>
<h3 id="_1-test-函数" tabindex="-1"><a class="header-anchor" href="#_1-test-函数" aria-hidden="true">#</a> 1. test()函数</h3>
<pre><code> psutil.test()
</code></pre>
</div></template>


