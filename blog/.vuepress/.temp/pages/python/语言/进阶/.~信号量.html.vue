<template><div><p><strong>信号：</strong> 是 <strong>Unix</strong> 系统中常见的一种进程间通信方式（<em><strong>IPC</strong></em>）</p>
<!-- more -->
<h1 id="信号量signal" tabindex="-1"><a class="header-anchor" href="#信号量signal" aria-hidden="true">#</a> 信号量signal</h1>
<p>我们经常操作的 <code v-pre>kill -9 pid</code>，这里的  <code v-pre>-9</code> 对应的就是 <strong>SIGKILL</strong> 信号，<strong>9</strong> 就是这个信号的编号，<strong>SIGKILL</strong> 是它的名称。 由于不同版本的 *<strong>nux</strong> 的实现会有差异，具体请参照系统 <strong>API</strong>，可以使用 <code v-pre>man 7 signal</code> 查看所有信号的定义</p>
<p><strong>使用场景：</strong></p>
<p>与其他进程间通信方式（例如管道、共享内存等）相比，信号所能传递的信息比较粗糙，只是一个整数。但正是由于传递的信息量少，信号也更便于管理和使用，可以用于系统管理相关的任务</p>
<p>例如 <strong>通知进程终结、中止 或者 恢复</strong> ，每种信号用一个 <strong>整型常量宏</strong> 表示，以 <strong>SIG</strong> 开头，如 <strong>SIGCHLD</strong>、<strong>SIGINT</strong> 等</p>
<h2 id="_1-接收信号" tabindex="-1"><a class="header-anchor" href="#_1-接收信号" aria-hidden="true">#</a> 1. 接收信号</h2>
<p><strong>Python</strong> 中使用 <strong>signal</strong> 模块来处理信号相关的操作，定义如下：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>signal<span class="token punctuation">.</span>signal<span class="token punctuation">(</span>signalnum<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>signalnum：</strong> 表示某个信号</li>
<li><strong>handler</strong> 表示该信号的处理函数</li>
</ul>
<p>进程可以无视信号，可以采取默认操作，还可以自定义操作。</p>
<ul>
<li></li>
<li></li>
<li>进程可以无视信号，可以采取默认操作，还可以自定义操作。</li>
<li>当 handler 为 signal.SIG_IGN 时，信号被无视（ignore）；当 handler 为 singal.SIG_DFL，进程采取默认操作（default）；当 handler 为一个函数名时，进程采取函数中定义的操作。</li>
</ul>
<p>写一个小程序，来处理 <code v-pre>ctrl+c</code>事件和 <code v-pre>SIGHUP</code>，也就是 1 和 2 信号。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment">#coding:utf-8</span>

<span class="token keyword">import</span> signal
<span class="token keyword">import</span> time
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> os

<span class="token keyword">def</span> <span class="token function">handle_int</span><span class="token punctuation">(</span>sig<span class="token punctuation">,</span> frame<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span> <span class="token string">"get signal: %s, I will quit"</span><span class="token operator">%</span>sig
    sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">handle_hup</span><span class="token punctuation">(</span>sig<span class="token punctuation">,</span> frame<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span> <span class="token string">"get signal: %s"</span><span class="token operator">%</span>sig


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    signal<span class="token punctuation">.</span>signal<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> handle_int<span class="token punctuation">)</span>
    signal<span class="token punctuation">.</span>signal<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> handle_hup<span class="token punctuation">)</span>
    <span class="token keyword">print</span> <span class="token string">"My pid is %s"</span><span class="token operator">%</span>os<span class="token punctuation">.</span>getpid<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来测试下，首先启动程序（根据打印的 pid），在另外的窗口输入 <code v-pre>kill -1 21838</code> 和 <code v-pre>kill -HUP 21838</code>, 最后使用 <code v-pre>ctrl+c</code>关闭程序。 程序的输出如下：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># python recv_signal.py</span>
My pid <span class="token keyword">is</span> <span class="token number">21838</span>
get signal<span class="token punctuation">:</span> <span class="token number">1</span>
get signal<span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token operator">^</span>Cget signal<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span> I will quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来看另一个函数，可以对信号理解的更加透彻：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>signal<span class="token punctuation">.</span>getsignal<span class="token punctuation">(</span>signalnum<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>根据 signalnum 返回信号对应的 handler，可能是一个可以调用的 Python 对象，或者是 <code v-pre>signal.SIG_IGN</code>（表示被忽略）, <code v-pre>signal.SIG_DFL</code>（默认行为已经被使用）或 <code v-pre>None</code>（Python 的 handler 还没被定义）。</p>
<p>看下面这个例子，获取 signal 中定义的信号 num 和名称，还有它的 handler 是什么。</p>
<div class="language-python3 ext-python3 line-numbers-mode"><pre v-pre class="language-python3"><code>#coding:utf-8

import signal

def handle_hup(sig, frame):
    print &quot;get signal: %s&quot;%sig

signal.signal(1, handle_hup)

if __name__ == &quot;__main__&quot;:

    ign = signal.SIG_IGN
    dfl = signal.SIG_DFL
    print &quot;SIG_IGN&quot;, ign
    print &quot;SIG_DFL&quot;, dfl
    print &quot;*&quot;*40

    for name in dir(signal):
        if name[:3] == &quot;SIG&quot; and name[3] != &quot;_&quot;:
            signum = getattr(signal, name)
            gsig = signal.getsignal(signum)

            print name, signum, gsig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行的结果：可以看到大部分信号都是都有默认的行为。</p>
<div class="language-python3 ext-python3 line-numbers-mode"><pre v-pre class="language-python3"><code>SIG_IGN 1
SIG_DFL 0
****************************************
SIGABRT 6 0
SIGALRM 14 0
SIGBUS 10 0
SIGCHLD 20 0
SIGCONT 19 0
SIGEMT 7 0
SIGFPE 8 0
SIGHUP 1 &lt;function handle_hup at 0x109371c80&gt;
SIGILL 4 0
SIGINFO 29 0
SIGINT 2 &lt;built-in function default_int_handler&gt;
SIGIO 23 0
SIGIOT 6 0
SIGKILL 9 None
SIGPIPE 13 1
SIGPROF 27 0
SIGQUIT 3 0
SIGSEGV 11 0
SIGSTOP 17 None
SIGSYS 12 0
SIGTERM 15 0
SIGTRAP 5 0
SIGTSTP 18 0
SIGTTIN 21 0
SIGTTOU 22 0
SIGURG 16 0
SIGUSR1 30 0
SIGUSR2 31 0
SIGVTALRM 26 0
SIGWINCH 28 0
SIGXCPU 24 0
SIGXFSZ 25 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常用的几个信号：</p>
<p>编号名称作用1SIGHUP终端挂起或者终止进程。默认动作为终止进程2SIGINT键盘中断<code v-pre>&lt;ctrl+c&gt;</code>经常会用到。默认动作为终止进程3SIGQUIT键盘退出键被按下。一般用来响应<code v-pre>&lt;ctrl+d&gt;</code>。 默认动作终止进程9SIGKILL强制退出。 shell中经常使用14SIGALRM定时器超时，默认为终止进程15SIGTERM程序结束信号，程序一般会清理完状态在退出，我们一般说的优雅的退出</p>
<h2 id="发送信号" tabindex="-1"><a class="header-anchor" href="#发送信号" aria-hidden="true">#</a> 发送信号</h2>
<p>signal 包的核心是设置信号处理函数。除了 <code v-pre>signal.alarm()</code> 向自身发送信号之外，并没有其他发送信号的功能。但在 os 包中，有类似于 Linux 的 kill 命令的函数，分别为：</p>
<div class="language-python3 ext-python3 line-numbers-mode"><pre v-pre class="language-python3"><code>os.kill(pid, sid)
os.killpg(pgid, sid)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>分别向进程和进程组发送信号。sid 为信号所对应的整数或者 singal.SIG*。</p>
<h2 id="定时发出-sigalrm-信号" tabindex="-1"><a class="header-anchor" href="#定时发出-sigalrm-信号" aria-hidden="true">#</a> 定时发出 SIGALRM 信号</h2>
<p>它被用于在一定时间之后，向进程自身发送 SIGALRM 信号，这对于避免无限期地阻塞 I/O 操作或其他系统调用很有用。</p>
<div class="language-python3 ext-python3 line-numbers-mode"><pre v-pre class="language-python3"><code>import signal
import time


def receive_alarm(signum, stack):
    print('Alarm :', time.ctime())


# Call receive_alarm in 2 seconds
signal.signal(signal.SIGALRM, receive_alarm)
signal.alarm(2)

print('Before:', time.ctime())
time.sleep(4)
print('After :', time.ctime())

# output
# Before: Sat Apr 22 14:48:57 2017
# Alarm : Sat Apr 22 14:48:59 2017
# After : Sat Apr 22 14:49:01 2017
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此示例中，调用 <code v-pre>sleep()</code> 被中断，但在信号处理后继续，因此<code v-pre>sleep()</code>返回后打印的消息显示程序执行时间与睡眠持续时间一样长。</p>
<h2 id="忽略信号" tabindex="-1"><a class="header-anchor" href="#忽略信号" aria-hidden="true">#</a> 忽略信号</h2>
<p>要忽略信号，请注册 SIG_IGN 为处理程序。</p>
<p>下面这个例子注册了两个程序，分别是 SIGINT 和 SIGUSR1，然后用 <code v-pre>signal.pause()</code> 等待接收信号。</p>
<div class="language-python3 ext-python3 line-numbers-mode"><pre v-pre class="language-python3"><code>import signal
import os
import time


def do_exit(sig, stack):
    raise SystemExit('Exiting')


signal.signal(signal.SIGINT, signal.SIG_IGN)
signal.signal(signal.SIGUSR1, do_exit)

print('My PID:', os.getpid())

signal.pause()

# output
# My PID: 72598
# ^C^C^C^CExiting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常 SIGINT（当用户按下 <code v-pre>Ctrl-C</code> 时由 shell 发送到程序的信号）会引发 <code v-pre>KeyboardInterrupt</code>。这个例子在它看到 SIGINT 时直接忽略了。输出中的每个 <code v-pre>^C</code> 表示尝试从终端终止脚本。</p>
<p>从另一个终端使用 <code v-pre>kill -USR1 72598</code> 将脚本退出。</p>
<h2 id="信号与线程" tabindex="-1"><a class="header-anchor" href="#信号与线程" aria-hidden="true">#</a> 信号与线程</h2>
<p>多线程环境下使用信号，只有 main thread 可以设置 signal 的 handler，也只有它能接收到 signal. 下面用一个例子看看效果，在一个线程中等待信号，并从另一个线程发送信号。</p>
<div class="language-python3 ext-python3 line-numbers-mode"><pre v-pre class="language-python3"><code>#coding:utf-8
#orangleliu py2.7
#thread_signal.py

import signal
import threading
import os
import time

def usr1_handler(num, frame):
    print &quot;received signal %s %s&quot;%(num, threading.currentThread())

signal.signal(signal.SIGUSR1, usr1_handler)

def thread_get_signal():
    #如果在子线程中设置signal的handler 会报错
    #ValueError: signal only works in main thread
    #signal.signal(signal.SIGUSR2, usr1_handler)

    print &quot;waiting for signal in&quot;, threading.currentThread()
    #sleep 进程直到接收到信号
    signal.pause()
    print &quot;waiting done&quot;

receiver = threading.Thread(target=thread_get_signal, name=&quot;receiver&quot;)
receiver.start()
time.sleep(0.1)

def send_signal():
    print &quot;sending signal in &quot;, threading.currentThread()
    os.kill(os.getpid(), signal.SIGUSR1)

sender = threading.Thread(target=send_signal, name=&quot;sender&quot;)
sender.start()
sender.join()

print 'pid', os.getpid()
# 这里是为了让程序结束，唤醒 pause
signal.alarm(2)
receiver.join()

# output
# waiting for signal in &lt;Thread(receiver, started 123145306509312)&gt;
# sending signal in  &lt;Thread(sender, started 123145310715904)&gt;
# received signal 30 &lt;_MainThread(MainThread, started 140735138967552)&gt;
# pid 23188
# [1]    23188 alarm      python thread_signal.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Python 的 signal 模块要求，所有的 handlers 必需在 main thread 中注册，即使底层平台支持线程和信号混合编程。即使接收线程调用了 <code v-pre>signal.pause()</code>，但还是没有接收到信号。代码结尾处的 <code v-pre>signal.alarm(2)</code> 是为了唤醒接收线程的 <code v-pre>pause()</code>，否则接收线程永远不会退出。</p>
<p>尽管 alarms 可以在任意的线程中设置，但他们只能在 main thread 接收。</p>
<div class="language-python3 ext-python3 line-numbers-mode"><pre v-pre class="language-python3"><code>import signal
import time
import threading


def signal_handler(num, stack):
    print(time.ctime(), 'Alarm in',
          threading.currentThread().name)


signal.signal(signal.SIGALRM, signal_handler)


def use_alarm():
    t_name = threading.currentThread().name
    print(time.ctime(), 'Setting alarm in', t_name)
    signal.alarm(1)
    print(time.ctime(), 'Sleeping in', t_name)
    time.sleep(3)
    print(time.ctime(), 'Done with sleep in', t_name)


# Start a thread that will not receive the signal
alarm_thread = threading.Thread(
    target=use_alarm,
    name='alarm_thread',
)
alarm_thread.start()
time.sleep(0.1)

# Wait for the thread to see the signal (not going to happen!)
print(time.ctime(), 'Waiting for', alarm_thread.name)
alarm_thread.join()

print(time.ctime(), 'Exiting normally')

# output
# Sat Apr 22 14:49:01 2017 Setting alarm in alarm_thread
# Sat Apr 22 14:49:01 2017 Sleeping in alarm_thread
# Sat Apr 22 14:49:01 2017 Waiting for alarm_thread
# Sat Apr 22 14:49:02 2017 Alarm in MainThread
# Sat Apr 22 14:49:04 2017 Done with sleep in alarm_thread
# Sat Apr 22 14:49:04 2017 Exiting normally
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>alarm 并没有中断 <code v-pre>use_alarm()</code> 中的 <code v-pre>sleep</code>。</p>
<p>相关文档：</p>
<p><a href="https://link.zhihu.com/?target=https%3A//pymotw.com/3/signal/index.html" target="_blank" rel="noopener noreferrer">https://pymotw.com/3/signal/index.html<ExternalLinkIcon/></a></p>
<p><a href="https://link.zhihu.com/?target=http%3A//orangleliu.info/2016/03/06/python-signal-module-simple-use/" target="_blank" rel="noopener noreferrer">http://orangleliu.info/2016/03/06/python-signal-module-simple-use/<ExternalLinkIcon/></a></p>
<p><a href="https://link.zhihu.com/?target=http%3A//www.cnblogs.com/vamei/archive/2012/10/06/2712683.html" target="_blank" rel="noopener noreferrer">http://www.cnblogs.com/vamei/archi<ExternalLinkIcon/></a></p>
</div></template>


