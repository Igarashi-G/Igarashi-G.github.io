import{_ as n}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as a,d as i,o as e}from"./app-CRw80d8Q.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<p><strong>信号：</strong> 是 <strong>Unix</strong> 系统中常见的一种进程间通信方式（<em><strong>IPC</strong></em>）</p><h1 id="信号量signal" tabindex="-1"><a class="header-anchor" href="#信号量signal"><span>信号量signal</span></a></h1><p>我们经常操作的 <code>kill -9 pid</code>，这里的 <code>-9</code> 对应的就是 <strong>SIGKILL</strong> 信号，<strong>9</strong> 就是这个信号的编号，<strong>SIGKILL</strong> 是它的名称。 由于不同版本的 *<strong>nux</strong> 的实现会有差异，具体请参照系统 <strong>API</strong>，可以使用 <code>man 7 signal</code> 查看所有信号的定义</p><p><strong>使用场景：</strong></p><p>与其他进程间通信方式（例如管道、共享内存等）相比，信号所能传递的信息比较粗糙，只是一个整数。但正是由于传递的信息量少，信号也更便于管理和使用，可以用于系统管理相关的任务</p><p>例如 <strong>通知进程终结、中止 或者 恢复</strong> ，每种信号用一个 <strong>整型常量宏</strong> 表示，以 <strong>SIG</strong> 开头，如 <strong>SIGCHLD</strong>、<strong>SIGINT</strong> 等</p><h2 id="_1-接收信号" tabindex="-1"><a class="header-anchor" href="#_1-接收信号"><span>1. 接收信号</span></a></h2><p><strong>Python</strong> 中使用 <strong>signal</strong> 模块来处理信号相关的操作，定义如下：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">signal.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">signal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(signalnum, handler)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><strong>signalnum：</strong> 表示某个信号</li><li><strong>handler</strong> 表示该信号的处理函数</li></ul><p>进程可以无视信号，可以采取默认操作，还可以自定义操作。</p><ul><li></li><li></li><li>进程可以无视信号，可以采取默认操作，还可以自定义操作。</li><li>当 handler 为 signal.SIG_IGN 时，信号被无视（ignore）；当 handler 为 singal.SIG_DFL，进程采取默认操作（default）；当 handler 为一个函数名时，进程采取函数中定义的操作。</li></ul><p>写一个小程序，来处理 <code>ctrl+c</code>事件和 <code>SIGHUP</code>，也就是 1 和 2 信号。</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#coding:utf-8</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> signal</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> time</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> sys</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> os</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> handle_int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;">sig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> frame</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">):</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    print</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;get signal: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">%s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">, I will quit&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">%</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">sig</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    sys.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">exit</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> handle_hup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;">sig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic;"> frame</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">):</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    print</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;get signal: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">%s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">%</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">sig</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> __name__</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;__main__&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    signal.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">signal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, handle_int)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    signal.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">signal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, handle_hup)</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">    print</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;My pid is </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">%s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">%</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">os.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">getpid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    while</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        time.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">sleep</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来测试下，首先启动程序（根据打印的 pid），在另外的窗口输入 <code>kill -1 21838</code> 和 <code>kill -HUP 21838</code>, 最后使用 <code>ctrl+c</code>关闭程序。 程序的输出如下：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># python recv_signal.py</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">My pid </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">is</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 21838</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">get signal: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">get signal: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">^</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">Cget signal: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, I will </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">quit</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再来看另一个函数，可以对信号理解的更加透彻：</p><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">signal.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">getsignal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(signalnum)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>根据 signalnum 返回信号对应的 handler，可能是一个可以调用的 Python 对象，或者是 <code>signal.SIG_IGN</code>（表示被忽略）, <code>signal.SIG_DFL</code>（默认行为已经被使用）或 <code>None</code>（Python 的 handler 还没被定义）。</p><p>看下面这个例子，获取 signal 中定义的信号 num 和名称，还有它的 handler 是什么。</p><div class="language-python3 line-numbers-mode" data-highlighter="shiki" data-ext="python3" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#coding:utf-8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import signal</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def handle_hup(sig, frame):</span></span>
<span class="line"><span>    print &quot;get signal: %s&quot;%sig</span></span>
<span class="line"><span></span></span>
<span class="line"><span>signal.signal(1, handle_hup)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ign = signal.SIG_IGN</span></span>
<span class="line"><span>    dfl = signal.SIG_DFL</span></span>
<span class="line"><span>    print &quot;SIG_IGN&quot;, ign</span></span>
<span class="line"><span>    print &quot;SIG_DFL&quot;, dfl</span></span>
<span class="line"><span>    print &quot;*&quot;*40</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    for name in dir(signal):</span></span>
<span class="line"><span>        if name[:3] == &quot;SIG&quot; and name[3] != &quot;_&quot;:</span></span>
<span class="line"><span>            signum = getattr(signal, name)</span></span>
<span class="line"><span>            gsig = signal.getsignal(signum)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            print name, signum, gsig</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行的结果：可以看到大部分信号都是都有默认的行为。</p><div class="language-python3 line-numbers-mode" data-highlighter="shiki" data-ext="python3" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>SIG_IGN 1</span></span>
<span class="line"><span>SIG_DFL 0</span></span>
<span class="line"><span>****************************************</span></span>
<span class="line"><span>SIGABRT 6 0</span></span>
<span class="line"><span>SIGALRM 14 0</span></span>
<span class="line"><span>SIGBUS 10 0</span></span>
<span class="line"><span>SIGCHLD 20 0</span></span>
<span class="line"><span>SIGCONT 19 0</span></span>
<span class="line"><span>SIGEMT 7 0</span></span>
<span class="line"><span>SIGFPE 8 0</span></span>
<span class="line"><span>SIGHUP 1 &lt;function handle_hup at 0x109371c80&gt;</span></span>
<span class="line"><span>SIGILL 4 0</span></span>
<span class="line"><span>SIGINFO 29 0</span></span>
<span class="line"><span>SIGINT 2 &lt;built-in function default_int_handler&gt;</span></span>
<span class="line"><span>SIGIO 23 0</span></span>
<span class="line"><span>SIGIOT 6 0</span></span>
<span class="line"><span>SIGKILL 9 None</span></span>
<span class="line"><span>SIGPIPE 13 1</span></span>
<span class="line"><span>SIGPROF 27 0</span></span>
<span class="line"><span>SIGQUIT 3 0</span></span>
<span class="line"><span>SIGSEGV 11 0</span></span>
<span class="line"><span>SIGSTOP 17 None</span></span>
<span class="line"><span>SIGSYS 12 0</span></span>
<span class="line"><span>SIGTERM 15 0</span></span>
<span class="line"><span>SIGTRAP 5 0</span></span>
<span class="line"><span>SIGTSTP 18 0</span></span>
<span class="line"><span>SIGTTIN 21 0</span></span>
<span class="line"><span>SIGTTOU 22 0</span></span>
<span class="line"><span>SIGURG 16 0</span></span>
<span class="line"><span>SIGUSR1 30 0</span></span>
<span class="line"><span>SIGUSR2 31 0</span></span>
<span class="line"><span>SIGVTALRM 26 0</span></span>
<span class="line"><span>SIGWINCH 28 0</span></span>
<span class="line"><span>SIGXCPU 24 0</span></span>
<span class="line"><span>SIGXFSZ 25 1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常用的几个信号：</p><p>编号名称作用1SIGHUP终端挂起或者终止进程。默认动作为终止进程2SIGINT键盘中断<code>&lt;ctrl+c&gt;</code>经常会用到。默认动作为终止进程3SIGQUIT键盘退出键被按下。一般用来响应<code>&lt;ctrl+d&gt;</code>。 默认动作终止进程9SIGKILL强制退出。 shell中经常使用14SIGALRM定时器超时，默认为终止进程15SIGTERM程序结束信号，程序一般会清理完状态在退出，我们一般说的优雅的退出</p><h2 id="发送信号" tabindex="-1"><a class="header-anchor" href="#发送信号"><span>发送信号</span></a></h2><p>signal 包的核心是设置信号处理函数。除了 <code>signal.alarm()</code> 向自身发送信号之外，并没有其他发送信号的功能。但在 os 包中，有类似于 Linux 的 kill 命令的函数，分别为：</p><div class="language-python3 line-numbers-mode" data-highlighter="shiki" data-ext="python3" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>os.kill(pid, sid)</span></span>
<span class="line"><span>os.killpg(pgid, sid)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>分别向进程和进程组发送信号。sid 为信号所对应的整数或者 singal.SIG*。</p><h2 id="定时发出-sigalrm-信号" tabindex="-1"><a class="header-anchor" href="#定时发出-sigalrm-信号"><span>定时发出 SIGALRM 信号</span></a></h2><p>它被用于在一定时间之后，向进程自身发送 SIGALRM 信号，这对于避免无限期地阻塞 I/O 操作或其他系统调用很有用。</p><div class="language-python3 line-numbers-mode" data-highlighter="shiki" data-ext="python3" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import signal</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def receive_alarm(signum, stack):</span></span>
<span class="line"><span>    print(&#39;Alarm :&#39;, time.ctime())</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># Call receive_alarm in 2 seconds</span></span>
<span class="line"><span>signal.signal(signal.SIGALRM, receive_alarm)</span></span>
<span class="line"><span>signal.alarm(2)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&#39;Before:&#39;, time.ctime())</span></span>
<span class="line"><span>time.sleep(4)</span></span>
<span class="line"><span>print(&#39;After :&#39;, time.ctime())</span></span>
<span class="line"><span></span></span>
<span class="line"><span># output</span></span>
<span class="line"><span># Before: Sat Apr 22 14:48:57 2017</span></span>
<span class="line"><span># Alarm : Sat Apr 22 14:48:59 2017</span></span>
<span class="line"><span># After : Sat Apr 22 14:49:01 2017</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此示例中，调用 <code>sleep()</code> 被中断，但在信号处理后继续，因此<code>sleep()</code>返回后打印的消息显示程序执行时间与睡眠持续时间一样长。</p><h2 id="忽略信号" tabindex="-1"><a class="header-anchor" href="#忽略信号"><span>忽略信号</span></a></h2><p>要忽略信号，请注册 SIG_IGN 为处理程序。</p><p>下面这个例子注册了两个程序，分别是 SIGINT 和 SIGUSR1，然后用 <code>signal.pause()</code> 等待接收信号。</p><div class="language-python3 line-numbers-mode" data-highlighter="shiki" data-ext="python3" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import signal</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def do_exit(sig, stack):</span></span>
<span class="line"><span>    raise SystemExit(&#39;Exiting&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>signal.signal(signal.SIGINT, signal.SIG_IGN)</span></span>
<span class="line"><span>signal.signal(signal.SIGUSR1, do_exit)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&#39;My PID:&#39;, os.getpid())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>signal.pause()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># output</span></span>
<span class="line"><span># My PID: 72598</span></span>
<span class="line"><span># ^C^C^C^CExiting</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常 SIGINT（当用户按下 <code>Ctrl-C</code> 时由 shell 发送到程序的信号）会引发 <code>KeyboardInterrupt</code>。这个例子在它看到 SIGINT 时直接忽略了。输出中的每个 <code>^C</code> 表示尝试从终端终止脚本。</p><p>从另一个终端使用 <code>kill -USR1 72598</code> 将脚本退出。</p><h2 id="信号与线程" tabindex="-1"><a class="header-anchor" href="#信号与线程"><span>信号与线程</span></a></h2><p>多线程环境下使用信号，只有 main thread 可以设置 signal 的 handler，也只有它能接收到 signal. 下面用一个例子看看效果，在一个线程中等待信号，并从另一个线程发送信号。</p><div class="language-python3 line-numbers-mode" data-highlighter="shiki" data-ext="python3" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>#coding:utf-8</span></span>
<span class="line"><span>#orangleliu py2.7</span></span>
<span class="line"><span>#thread_signal.py</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import signal</span></span>
<span class="line"><span>import threading</span></span>
<span class="line"><span>import os</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def usr1_handler(num, frame):</span></span>
<span class="line"><span>    print &quot;received signal %s %s&quot;%(num, threading.currentThread())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>signal.signal(signal.SIGUSR1, usr1_handler)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def thread_get_signal():</span></span>
<span class="line"><span>    #如果在子线程中设置signal的handler 会报错</span></span>
<span class="line"><span>    #ValueError: signal only works in main thread</span></span>
<span class="line"><span>    #signal.signal(signal.SIGUSR2, usr1_handler)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    print &quot;waiting for signal in&quot;, threading.currentThread()</span></span>
<span class="line"><span>    #sleep 进程直到接收到信号</span></span>
<span class="line"><span>    signal.pause()</span></span>
<span class="line"><span>    print &quot;waiting done&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>receiver = threading.Thread(target=thread_get_signal, name=&quot;receiver&quot;)</span></span>
<span class="line"><span>receiver.start()</span></span>
<span class="line"><span>time.sleep(0.1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def send_signal():</span></span>
<span class="line"><span>    print &quot;sending signal in &quot;, threading.currentThread()</span></span>
<span class="line"><span>    os.kill(os.getpid(), signal.SIGUSR1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sender = threading.Thread(target=send_signal, name=&quot;sender&quot;)</span></span>
<span class="line"><span>sender.start()</span></span>
<span class="line"><span>sender.join()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print &#39;pid&#39;, os.getpid()</span></span>
<span class="line"><span># 这里是为了让程序结束，唤醒 pause</span></span>
<span class="line"><span>signal.alarm(2)</span></span>
<span class="line"><span>receiver.join()</span></span>
<span class="line"><span></span></span>
<span class="line"><span># output</span></span>
<span class="line"><span># waiting for signal in &lt;Thread(receiver, started 123145306509312)&gt;</span></span>
<span class="line"><span># sending signal in  &lt;Thread(sender, started 123145310715904)&gt;</span></span>
<span class="line"><span># received signal 30 &lt;_MainThread(MainThread, started 140735138967552)&gt;</span></span>
<span class="line"><span># pid 23188</span></span>
<span class="line"><span># [1]    23188 alarm      python thread_signal.py</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Python 的 signal 模块要求，所有的 handlers 必需在 main thread 中注册，即使底层平台支持线程和信号混合编程。即使接收线程调用了 <code>signal.pause()</code>，但还是没有接收到信号。代码结尾处的 <code>signal.alarm(2)</code> 是为了唤醒接收线程的 <code>pause()</code>，否则接收线程永远不会退出。</p><p>尽管 alarms 可以在任意的线程中设置，但他们只能在 main thread 接收。</p><div class="language-python3 line-numbers-mode" data-highlighter="shiki" data-ext="python3" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>import signal</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span>import threading</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def signal_handler(num, stack):</span></span>
<span class="line"><span>    print(time.ctime(), &#39;Alarm in&#39;,</span></span>
<span class="line"><span>          threading.currentThread().name)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>signal.signal(signal.SIGALRM, signal_handler)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def use_alarm():</span></span>
<span class="line"><span>    t_name = threading.currentThread().name</span></span>
<span class="line"><span>    print(time.ctime(), &#39;Setting alarm in&#39;, t_name)</span></span>
<span class="line"><span>    signal.alarm(1)</span></span>
<span class="line"><span>    print(time.ctime(), &#39;Sleeping in&#39;, t_name)</span></span>
<span class="line"><span>    time.sleep(3)</span></span>
<span class="line"><span>    print(time.ctime(), &#39;Done with sleep in&#39;, t_name)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># Start a thread that will not receive the signal</span></span>
<span class="line"><span>alarm_thread = threading.Thread(</span></span>
<span class="line"><span>    target=use_alarm,</span></span>
<span class="line"><span>    name=&#39;alarm_thread&#39;,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>alarm_thread.start()</span></span>
<span class="line"><span>time.sleep(0.1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Wait for the thread to see the signal (not going to happen!)</span></span>
<span class="line"><span>print(time.ctime(), &#39;Waiting for&#39;, alarm_thread.name)</span></span>
<span class="line"><span>alarm_thread.join()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(time.ctime(), &#39;Exiting normally&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># output</span></span>
<span class="line"><span># Sat Apr 22 14:49:01 2017 Setting alarm in alarm_thread</span></span>
<span class="line"><span># Sat Apr 22 14:49:01 2017 Sleeping in alarm_thread</span></span>
<span class="line"><span># Sat Apr 22 14:49:01 2017 Waiting for alarm_thread</span></span>
<span class="line"><span># Sat Apr 22 14:49:02 2017 Alarm in MainThread</span></span>
<span class="line"><span># Sat Apr 22 14:49:04 2017 Done with sleep in alarm_thread</span></span>
<span class="line"><span># Sat Apr 22 14:49:04 2017 Exiting normally</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>alarm 并没有中断 <code>use_alarm()</code> 中的 <code>sleep</code>。</p><p>相关文档：</p><p><a href="https://link.zhihu.com/?target=https%3A//pymotw.com/3/signal/index.html" target="_blank" rel="noopener noreferrer">https://pymotw.com/3/signal/index.html</a></p><p><a href="https://link.zhihu.com/?target=http%3A//orangleliu.info/2016/03/06/python-signal-module-simple-use/" target="_blank" rel="noopener noreferrer">http://orangleliu.info/2016/03/06/python-signal-module-simple-use/</a></p><p><a href="https://link.zhihu.com/?target=http%3A//www.cnblogs.com/vamei/archive/2012/10/06/2712683.html" target="_blank" rel="noopener noreferrer">http://www.cnblogs.com/vamei/archi</a></p>`,50)]))}const c=n(l,[["render",p]]),h=JSON.parse('{"path":"/python/%E8%AF%AD%E8%A8%80/%E8%BF%9B%E9%98%B6/%E4%BF%A1%E5%8F%B7%E9%87%8F.html","title":"信号量","lang":"zh-CN","frontmatter":{"title":"信号量","date":"2023-09-05T00:00:00.000Z","category":["Python"],"tag":["Python","信号量"],"star":true,"description":"信号： 是 Unix 系统中常见的一种进程间通信方式（IPC）","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"信号量\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-05T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-19T13:52:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E8%BF%9B%E9%98%B6/%E4%BF%A1%E5%8F%B7%E9%87%8F.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"信号量"}],["meta",{"property":"og:description","content":"信号： 是 Unix 系统中常见的一种进程间通信方式（IPC）"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T13:52:15.000Z"}],["meta",{"property":"article:tag","content":"信号量"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:published_time","content":"2023-09-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-19T13:52:15.000Z"}]]},"git":{"createdTime":1695131535000,"updatedTime":1695131535000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":1,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":6.25,"words":1875},"filePathRelative":"python/语言/进阶/信号量.md","excerpt":"<p><strong>信号：</strong> 是 <strong>Unix</strong> 系统中常见的一种进程间通信方式（<em><strong>IPC</strong></em>）</p>\\n","autoDesc":true}');export{c as comp,h as data};
