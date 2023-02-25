<template><div><p>快速排查故障、定位问题</p>
<!--more-->
<h2 id="_1-gdb" tabindex="-1"><a class="header-anchor" href="#_1-gdb" aria-hidden="true">#</a> 1. gdb</h2>
<p>对于排查进程、线程故障、死循环、死锁、Hung process 等故障，除了用 <a href="https://man7.org/linux/man-pages/man1/strace.1.html" target="_blank" rel="noopener noreferrer">strace<ExternalLinkIcon/></a> 跟一下系统调用来猜原因，相比之下用 <strong>gdb</strong> 来打印 <strong>C</strong> 的堆栈信息，更加有说服力和说明问题</p>
<h3 id="_1-1-安装" tabindex="-1"><a class="header-anchor" href="#_1-1-安装" aria-hidden="true">#</a> 1.1 安装</h3>
<p>首先得有 <a href="https://man7.org/linux/man-pages/man1/gdb.1.html" target="_blank" rel="noopener noreferrer">gdb<ExternalLinkIcon/></a> 才能查</p>
<Tabs :data='[{"title":"CentOS"},{"title":"Debian"}]'>
<template #tab0="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ yum <span class="token parameter variable">-y</span> <span class="token function">install</span> yum-utils

$ debuginfo-install glibc

<span class="token comment"># 会出现如下包的提示</span>
Package                                Arch        Version               Repository           Size
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span>
Installing:
 glibc-debuginfo                        x86_64      <span class="token number">2.17</span>-326.el7_9        base-debuginfo      <span class="token number">9.5</span> M
 nss-softokn-debuginfo                  x86_64      <span class="token number">3.44</span>.0-8.el7_7        base-debuginfo      <span class="token number">2.1</span> M
 yum-plugin-auto-update-debug-info      noarch      <span class="token number">1.1</span>.31-54.el7_8       base                 <span class="token number">29</span> k
Installing <span class="token keyword">for</span> dependencies:
 glibc-debuginfo-common                 x86_64      <span class="token number">2.17</span>-326.el7_9        base-debuginfo      <span class="token number">9.7</span> M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若报错，则需要执行如下改动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 不存在该文件则创建，有则改写如下</span>
$ <span class="token function">vim</span> /etc/yum.repos.d/CentOS-Debuginfo.repo

<span class="token punctuation">[</span>base-debuginfo<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>CentOS-7 - Debuginfo
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>http://debuginfo.centos.org/7/<span class="token variable">$basearch</span>/
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">gpgkey</span><span class="token operator">=</span>file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-Debug-7
- <span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">0</span>
+ <span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再安装 <strong>gdb</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装 gdb python3-debuginfo 注意是 python3</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gdb python3-debuginfo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行 <code v-pre>gdb python</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ gdb python3
GNU gdb <span class="token punctuation">(</span>GDB<span class="token punctuation">)</span> Red Hat Enterprise Linux <span class="token number">7.6</span>.1-120.el7
Copyright <span class="token punctuation">(</span>C<span class="token punctuation">)</span> <span class="token number">2013</span> Free Software Foundation, Inc.
License GPLv3+: GNU GPL version <span class="token number">3</span> or later <span class="token operator">&lt;</span>http://gnu.org/licenses/gpl.html<span class="token operator">></span>
<span class="token punctuation">..</span>.
Reading symbols from /opt/miniconda3/bin/python3.9<span class="token punctuation">..</span>.done.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> 
<span class="token comment"># 注意最后的版本号</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> gdb python3-dbg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还需要装一个包  <code v-pre>python3-dbg</code> ， 这个包有什么作用呢？ 前面不是抱怨过 <code v-pre>C</code> 堆栈对于调试一个 <code v-pre>Python</code> 有何用？ 我们更需要的是 <code v-pre>Python</code> 堆栈信息， <code v-pre>python-dbg</code> 就是为了完成这个使命</p>
</template>
</Tabs>
<h3 id="_1-2-运行" tabindex="-1"><a class="header-anchor" href="#_1-2-运行" aria-hidden="true">#</a> 1.2 运行</h3>
<p>全新启动一个 <code v-pre>Python</code> 程序并进行调试，可以采用交互式方式， 先启动 <a href="https://man7.org/linux/man-pages/man1/gdb.1.html" target="_blank" rel="noopener noreferrer">gdb<ExternalLinkIcon/></a> 然后在 <code v-pre>gdb shell</code> 中启动 <code v-pre>Python</code> 程序</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 启动 </span>
$ gdb python
<span class="token punctuation">..</span>.
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> run <span class="token operator">&lt;</span>programname<span class="token operator">></span>.py <span class="token operator">&lt;</span>arguments<span class="token operator">></span>

<span class="token comment"># 一条命令</span>
$ gdb <span class="token parameter variable">-ex</span> r <span class="token parameter variable">--args</span> python <span class="token operator">&lt;</span>programname<span class="token operator">></span>.py <span class="token operator">&lt;</span>arguments<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正在运行的程序突然异常，需要调试它，若去给它发个信号，出一个 <code v-pre>coredump</code> 文件，然后用 <code v-pre>gdb</code> 来调试 <code v-pre>coredump</code> 文件，像这样</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 调试 coredump 文件</span>
$ gdb <span class="token operator">&lt;</span>coredump_file<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>显然易见，不是种好的方式，若捕获进程调试，效率才高</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 获取 python 进程id</span>
$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> python
$ pstree <span class="token parameter variable">-p</span> pid
$ <span class="token function">strace</span> <span class="token parameter variable">-p</span> pid

<span class="token comment"># 进入调试</span>
$ gdb python <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>process id<span class="token operator">></span> 
$ gdb attach <span class="token operator">&lt;</span>process id<span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两种方式都可以让 <code v-pre>gdb</code> 捕获一个进程。 因此，需要做的只是确定问题进程的 <code v-pre>pid</code> ，如使用 <code v-pre>top</code> 、 <code v-pre>ps</code> 等命令确定 <strong>Python</strong> 进程</p>
<h3 id="_1-3-使用" tabindex="-1"><a class="header-anchor" href="#_1-3-使用" aria-hidden="true">#</a> 1.3 使用</h3>
<h4 id="堆栈查看" tabindex="-1"><a class="header-anchor" href="#堆栈查看" aria-hidden="true">#</a> <strong>堆栈查看</strong></h4>
<p>查看 <code v-pre>C</code> 堆栈信息使用 <code v-pre>bt</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> bt
<span class="token comment">#0 0x0000002a95b3b705 in raise () from /lib/libc.so.6</span>
<span class="token comment">#1 0x0000002a95b3ce8e in abort () from /lib/libc.so.6</span>
<span class="token comment">#2 0x00000000004c164f in posix_abort (self=0x0, noargs=0x0) at ../Modules/posixmodule.c:7158</span>
<span class="token comment">#3 0x0000000000489fac in call_function (pp_stack=0x7fbffff110, oparg=0) at ../Python/ceval.c:3531</span>
<span class="token comment">#4 0x0000000000485fc2 in PyEval_EvalFrame (f=0x66ccd8) at ../Python/ceval.c:2163</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么查看 <strong>Python</strong> 堆栈则要在安装 <code v-pre>python-gdb</code> 之后， <code v-pre>gdb</code> 才会提供若干相关的操作</p>
<p>使用 <code v-pre>py-bt</code> 就是用来查看 <code v-pre>Python</code> 堆栈</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> py-bt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p>若提示 <code v-pre>Undefined command: &quot;py-bt&quot;. Try &quot;help&quot;</code> ，这多半是 <strong>gdb</strong> 绑定的是老版的 <strong>python2.7</strong>，对于 <strong>CentOS</strong> 需要手动导入 <code v-pre>libpython.py</code> 让 <strong>gdb</strong> 读取（<em><strong>Debian 是 <a href="http://pythonx.x-gdb.py" target="_blank" rel="noopener noreferrer">pythonx.x-gdb.py<ExternalLinkIcon/></a></strong></em> ）</p>
<p>故需手动下载 <a href="https://github.com/python/cpython/blob/master/Tools/gdb/libpython.py" target="_blank" rel="noopener noreferrer">libpython.py<ExternalLinkIcon/></a> 文件到本地</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://raw.githubusercontent.com/python/cpython/main/Tools/gdb/libpython.py

<span class="token comment"># 连不通需要使用自己的代理</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">all_proxy</span><span class="token operator">=</span><span class="token string">"https://192.168.3.97:7890"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若 <strong>DNS</strong> 解析失败需，去网站三方工具查 <strong>DNS</strong> ，然后修改 <code v-pre>/etc/hosts</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="@source/unix/Linux/Troubleshooting/img/rawgithosts.jpg">  
<p>若需要搜索某些文件，则</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">find</span> / <span class="token parameter variable">-name</span> <span class="token string">"*libpython*"</span>

<span class="token comment"># 或安装快速查找工具</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">locate</span>

<span class="token comment"># 更新数据库</span>
updatedb

<span class="token comment"># 查找某些文件</span>
<span class="token function">locate</span> <span class="token string">"*libpython*"</span> <span class="token operator">|</span><span class="token function">grep</span> /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>手动关联 <strong><a href="http://libpython.py" target="_blank" rel="noopener noreferrer">libpython.py<ExternalLinkIcon/></a></strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> python
<span class="token operator">></span>import sys
<span class="token operator">></span>sys.path.insert<span class="token punctuation">(</span><span class="token number">0</span>, <span class="token string">"/home/zz/CODE"</span><span class="token punctuation">)</span>
<span class="token operator">></span>import libpython
<span class="token operator">></span>end
<span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> py-bt
Traceback <span class="token punctuation">(</span>most recent call first<span class="token punctuation">)</span>
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="@source/unix/Linux/Troubleshooting/img/py-bt.jpg"> 
</div>
<h4 id="线程查看" tabindex="-1"><a class="header-anchor" href="#线程查看" aria-hidden="true">#</a> 线程查看</h4>
<p>调试多线程程序，使用 <code v-pre>info threads</code>，但总得搞清楚到底有哪些线程</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> info threads
<span class="token punctuation">..</span>.
* <span class="token number">1</span>    Thread 0x7fce6e201740 <span class="token punctuation">(</span>LWP <span class="token number">2314</span><span class="token punctuation">)</span> <span class="token string">"python"</span> 0x00007fce6db070e3 <span class="token keyword">in</span> epoll_wait <span class="token punctuation">(</span><span class="token punctuation">)</span>
    at <span class="token punctuation">..</span>/sysdeps/unix/syscall-template.S:81
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="@source/unix/Linux/Troubleshooting/img/info-thrads.jpg"> 
<p>请注意 <strong>*号</strong> 哦——它标识的是当前线程</p>
<p>切换线程，如切换到 <strong>2</strong> 号线程（<em>将其设置为当前线程进行调试</em> ）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> thread <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="@source/unix/Linux/Troubleshooting/img/select-thread.jpg"> 
<p>查看当前线程的相关信息，则使用 <code v-pre>py-list</code> ，可以清楚看到当前执行到代码的第几行， 还有前后若干行的代码可以对照</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>gdb<span class="token punctuation">)</span> py-list
<span class="token number">2025</span>         <span class="token comment"># Open external files with our Mac app</span>
<span class="token number">2026</span>         <span class="token keyword">if</span> sys.platform <span class="token operator">==</span> <span class="token string">"darwin"</span> and <span class="token string">'Spyder.app'</span> <span class="token keyword">in</span> __file__:
<span class="token number">2027</span>             main.connect<span class="token punctuation">(</span>app, SIGNAL<span class="token punctuation">(</span><span class="token string">'open_external_file(QString)'</span><span class="token punctuation">)</span>,
<span class="token number">2028</span>                          lambda fname: main.open_external_file<span class="token punctuation">(</span>fname<span class="token punctuation">))</span>
<span class="token number">2029</span>
<span class="token operator">></span><span class="token number">2030</span>        app.exec_<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token number">2031</span>         <span class="token builtin class-name">return</span> main
<span class="token number">2032</span>
<span class="token number">2033</span>
<span class="token number">2034</span>     def __remove_temp_session<span class="token punctuation">(</span><span class="token punctuation">)</span>:
<span class="token number">2035</span>         <span class="token keyword">if</span> osp.isfile<span class="token punctuation">(</span>TEMP_SESSION_PATH<span class="token punctuation">)</span>:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看所有进程执行位置</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>(gdb) thread apply all py-list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令如下：</p>
<ul>
<li>
<p><code v-pre>py-bt :</code> 输出 <strong>python</strong> 应用程序调用堆栈</p>
</li>
<li>
<p><code v-pre>py-bt-full :</code> 查看当前 <strong>python</strong> 应用程序调用堆栈，并且显示每个 <strong>frame</strong> 的详细情况</p>
</li>
<li>
<p><code v-pre>py-list:</code>  显示代码查看当前 <strong>python</strong> 应用程序上下文</p>
</li>
<li>
<p><code v-pre>py-print:</code> 查看 <strong>python</strong> 变量</p>
</li>
<li>
<p><code v-pre>py-locals:</code> 查看 <strong>locals</strong> 变量</p>
</li>
<li>
<p><code v-pre>py-up:</code> 调用栈 <strong>frame</strong> 向上一级</p>
</li>
<li>
<p><code v-pre>py-down:</code> 调用栈向下一级</p>
</li>
</ul>
</div></template>


