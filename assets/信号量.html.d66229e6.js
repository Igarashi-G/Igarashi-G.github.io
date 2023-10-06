import{_ as a}from"./plugin-vueexport-helper.2444895f.js";import{o as l,c as d,e as r,a as n,b as i,d as s,f as t,r as c}from"./app.c84c9b2a.js";const v={},u=n("p",null,[n("strong",null,"\u4FE1\u53F7\uFF1A"),i(" \u662F "),n("strong",null,"Unix"),i(" \u7CFB\u7EDF\u4E2D\u5E38\u89C1\u7684\u4E00\u79CD\u8FDB\u7A0B\u95F4\u901A\u4FE1\u65B9\u5F0F\uFF08"),n("em",null,[n("strong",null,"IPC")]),i("\uFF09")],-1),o=t(`<h1 id="\u4FE1\u53F7\u91CFsignal" tabindex="-1"><a class="header-anchor" href="#\u4FE1\u53F7\u91CFsignal" aria-hidden="true">#</a> \u4FE1\u53F7\u91CFsignal</h1><p>\u6211\u4EEC\u7ECF\u5E38\u64CD\u4F5C\u7684 <code>kill -9 pid</code>\uFF0C\u8FD9\u91CC\u7684 <code>-9</code> \u5BF9\u5E94\u7684\u5C31\u662F <strong>SIGKILL</strong> \u4FE1\u53F7\uFF0C<strong>9</strong> \u5C31\u662F\u8FD9\u4E2A\u4FE1\u53F7\u7684\u7F16\u53F7\uFF0C<strong>SIGKILL</strong> \u662F\u5B83\u7684\u540D\u79F0\u3002 \u7531\u4E8E\u4E0D\u540C\u7248\u672C\u7684 *<strong>nux</strong> \u7684\u5B9E\u73B0\u4F1A\u6709\u5DEE\u5F02\uFF0C\u5177\u4F53\u8BF7\u53C2\u7167\u7CFB\u7EDF <strong>API</strong>\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>man 7 signal</code> \u67E5\u770B\u6240\u6709\u4FE1\u53F7\u7684\u5B9A\u4E49</p><p><strong>\u4F7F\u7528\u573A\u666F\uFF1A</strong></p><p>\u4E0E\u5176\u4ED6\u8FDB\u7A0B\u95F4\u901A\u4FE1\u65B9\u5F0F\uFF08\u4F8B\u5982\u7BA1\u9053\u3001\u5171\u4EAB\u5185\u5B58\u7B49\uFF09\u76F8\u6BD4\uFF0C\u4FE1\u53F7\u6240\u80FD\u4F20\u9012\u7684\u4FE1\u606F\u6BD4\u8F83\u7C97\u7CD9\uFF0C\u53EA\u662F\u4E00\u4E2A\u6574\u6570\u3002\u4F46\u6B63\u662F\u7531\u4E8E\u4F20\u9012\u7684\u4FE1\u606F\u91CF\u5C11\uFF0C\u4FE1\u53F7\u4E5F\u66F4\u4FBF\u4E8E\u7BA1\u7406\u548C\u4F7F\u7528\uFF0C\u53EF\u4EE5\u7528\u4E8E\u7CFB\u7EDF\u7BA1\u7406\u76F8\u5173\u7684\u4EFB\u52A1</p><p>\u4F8B\u5982 <strong>\u901A\u77E5\u8FDB\u7A0B\u7EC8\u7ED3\u3001\u4E2D\u6B62 \u6216\u8005 \u6062\u590D</strong> \uFF0C\u6BCF\u79CD\u4FE1\u53F7\u7528\u4E00\u4E2A <strong>\u6574\u578B\u5E38\u91CF\u5B8F</strong> \u8868\u793A\uFF0C\u4EE5 <strong>SIG</strong> \u5F00\u5934\uFF0C\u5982 <strong>SIGCHLD</strong>\u3001<strong>SIGINT</strong> \u7B49</p><h2 id="_1-\u63A5\u6536\u4FE1\u53F7" tabindex="-1"><a class="header-anchor" href="#_1-\u63A5\u6536\u4FE1\u53F7" aria-hidden="true">#</a> 1. \u63A5\u6536\u4FE1\u53F7</h2><p><strong>Python</strong> \u4E2D\u4F7F\u7528 <strong>signal</strong> \u6A21\u5757\u6765\u5904\u7406\u4FE1\u53F7\u76F8\u5173\u7684\u64CD\u4F5C\uFF0C\u5B9A\u4E49\u5982\u4E0B\uFF1A</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code>signal<span class="token punctuation">.</span>signal<span class="token punctuation">(</span>signalnum<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>signalnum\uFF1A</strong> \u8868\u793A\u67D0\u4E2A\u4FE1\u53F7</li><li><strong>handler</strong> \u8868\u793A\u8BE5\u4FE1\u53F7\u7684\u5904\u7406\u51FD\u6570</li></ul><p>\u8FDB\u7A0B\u53EF\u4EE5\u65E0\u89C6\u4FE1\u53F7\uFF0C\u53EF\u4EE5\u91C7\u53D6\u9ED8\u8BA4\u64CD\u4F5C\uFF0C\u8FD8\u53EF\u4EE5\u81EA\u5B9A\u4E49\u64CD\u4F5C\u3002</p><ul><li></li><li></li><li>\u8FDB\u7A0B\u53EF\u4EE5\u65E0\u89C6\u4FE1\u53F7\uFF0C\u53EF\u4EE5\u91C7\u53D6\u9ED8\u8BA4\u64CD\u4F5C\uFF0C\u8FD8\u53EF\u4EE5\u81EA\u5B9A\u4E49\u64CD\u4F5C\u3002</li><li>\u5F53 handler \u4E3A signal.SIG_IGN \u65F6\uFF0C\u4FE1\u53F7\u88AB\u65E0\u89C6\uFF08ignore\uFF09\uFF1B\u5F53 handler \u4E3A singal.SIG_DFL\uFF0C\u8FDB\u7A0B\u91C7\u53D6\u9ED8\u8BA4\u64CD\u4F5C\uFF08default\uFF09\uFF1B\u5F53 handler \u4E3A\u4E00\u4E2A\u51FD\u6570\u540D\u65F6\uFF0C\u8FDB\u7A0B\u91C7\u53D6\u51FD\u6570\u4E2D\u5B9A\u4E49\u7684\u64CD\u4F5C\u3002</li></ul><p>\u5199\u4E00\u4E2A\u5C0F\u7A0B\u5E8F\uFF0C\u6765\u5904\u7406 <code>ctrl+c</code>\u4E8B\u4EF6\u548C <code>SIGHUP</code>\uFF0C\u4E5F\u5C31\u662F 1 \u548C 2 \u4FE1\u53F7\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment">#coding:utf-8</span>

<span class="token keyword">import</span> signal
<span class="token keyword">import</span> time
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> os

<span class="token keyword">def</span> <span class="token function">handle_int</span><span class="token punctuation">(</span>sig<span class="token punctuation">,</span> frame<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span> <span class="token string">&quot;get signal: %s, I will quit&quot;</span><span class="token operator">%</span>sig
    sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">handle_hup</span><span class="token punctuation">(</span>sig<span class="token punctuation">,</span> frame<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span> <span class="token string">&quot;get signal: %s&quot;</span><span class="token operator">%</span>sig


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    signal<span class="token punctuation">.</span>signal<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> handle_int<span class="token punctuation">)</span>
    signal<span class="token punctuation">.</span>signal<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> handle_hup<span class="token punctuation">)</span>
    <span class="token keyword">print</span> <span class="token string">&quot;My pid is %s&quot;</span><span class="token operator">%</span>os<span class="token punctuation">.</span>getpid<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u6765\u6D4B\u8BD5\u4E0B\uFF0C\u9996\u5148\u542F\u52A8\u7A0B\u5E8F\uFF08\u6839\u636E\u6253\u5370\u7684 pid\uFF09\uFF0C\u5728\u53E6\u5916\u7684\u7A97\u53E3\u8F93\u5165 <code>kill -1 21838</code> \u548C <code>kill -HUP 21838</code>, \u6700\u540E\u4F7F\u7528 <code>ctrl+c</code>\u5173\u95ED\u7A0B\u5E8F\u3002 \u7A0B\u5E8F\u7684\u8F93\u51FA\u5982\u4E0B\uFF1A</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token comment"># python recv_signal.py</span>
My pid <span class="token keyword">is</span> <span class="token number">21838</span>
get signal<span class="token punctuation">:</span> <span class="token number">1</span>
get signal<span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token operator">^</span>Cget signal<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span> I will quit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u518D\u6765\u770B\u53E6\u4E00\u4E2A\u51FD\u6570\uFF0C\u53EF\u4EE5\u5BF9\u4FE1\u53F7\u7406\u89E3\u7684\u66F4\u52A0\u900F\u5F7B\uFF1A</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code>signal<span class="token punctuation">.</span>getsignal<span class="token punctuation">(</span>signalnum<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6839\u636E signalnum \u8FD4\u56DE\u4FE1\u53F7\u5BF9\u5E94\u7684 handler\uFF0C\u53EF\u80FD\u662F\u4E00\u4E2A\u53EF\u4EE5\u8C03\u7528\u7684 Python \u5BF9\u8C61\uFF0C\u6216\u8005\u662F <code>signal.SIG_IGN</code>\uFF08\u8868\u793A\u88AB\u5FFD\u7565\uFF09, <code>signal.SIG_DFL</code>\uFF08\u9ED8\u8BA4\u884C\u4E3A\u5DF2\u7ECF\u88AB\u4F7F\u7528\uFF09\u6216 <code>None</code>\uFF08Python \u7684 handler \u8FD8\u6CA1\u88AB\u5B9A\u4E49\uFF09\u3002</p><p>\u770B\u4E0B\u9762\u8FD9\u4E2A\u4F8B\u5B50\uFF0C\u83B7\u53D6 signal \u4E2D\u5B9A\u4E49\u7684\u4FE1\u53F7 num \u548C\u540D\u79F0\uFF0C\u8FD8\u6709\u5B83\u7684 handler \u662F\u4EC0\u4E48\u3002</p><div class="language-python3 ext-python3 line-numbers-mode"><pre class="language-python3"><code>#coding:utf-8

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\u7684\u7ED3\u679C\uFF1A\u53EF\u4EE5\u770B\u5230\u5927\u90E8\u5206\u4FE1\u53F7\u90FD\u662F\u90FD\u6709\u9ED8\u8BA4\u7684\u884C\u4E3A\u3002</p><div class="language-python3 ext-python3 line-numbers-mode"><pre class="language-python3"><code>SIG_IGN 1
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5E38\u7528\u7684\u51E0\u4E2A\u4FE1\u53F7\uFF1A</p><p>\u7F16\u53F7\u540D\u79F0\u4F5C\u75281SIGHUP\u7EC8\u7AEF\u6302\u8D77\u6216\u8005\u7EC8\u6B62\u8FDB\u7A0B\u3002\u9ED8\u8BA4\u52A8\u4F5C\u4E3A\u7EC8\u6B62\u8FDB\u7A0B2SIGINT\u952E\u76D8\u4E2D\u65AD<code>&lt;ctrl+c&gt;</code>\u7ECF\u5E38\u4F1A\u7528\u5230\u3002\u9ED8\u8BA4\u52A8\u4F5C\u4E3A\u7EC8\u6B62\u8FDB\u7A0B3SIGQUIT\u952E\u76D8\u9000\u51FA\u952E\u88AB\u6309\u4E0B\u3002\u4E00\u822C\u7528\u6765\u54CD\u5E94<code>&lt;ctrl+d&gt;</code>\u3002 \u9ED8\u8BA4\u52A8\u4F5C\u7EC8\u6B62\u8FDB\u7A0B9SIGKILL\u5F3A\u5236\u9000\u51FA\u3002 shell\u4E2D\u7ECF\u5E38\u4F7F\u752814SIGALRM\u5B9A\u65F6\u5668\u8D85\u65F6\uFF0C\u9ED8\u8BA4\u4E3A\u7EC8\u6B62\u8FDB\u7A0B15SIGTERM\u7A0B\u5E8F\u7ED3\u675F\u4FE1\u53F7\uFF0C\u7A0B\u5E8F\u4E00\u822C\u4F1A\u6E05\u7406\u5B8C\u72B6\u6001\u5728\u9000\u51FA\uFF0C\u6211\u4EEC\u4E00\u822C\u8BF4\u7684\u4F18\u96C5\u7684\u9000\u51FA</p><h2 id="\u53D1\u9001\u4FE1\u53F7" tabindex="-1"><a class="header-anchor" href="#\u53D1\u9001\u4FE1\u53F7" aria-hidden="true">#</a> \u53D1\u9001\u4FE1\u53F7</h2><p>signal \u5305\u7684\u6838\u5FC3\u662F\u8BBE\u7F6E\u4FE1\u53F7\u5904\u7406\u51FD\u6570\u3002\u9664\u4E86 <code>signal.alarm()</code> \u5411\u81EA\u8EAB\u53D1\u9001\u4FE1\u53F7\u4E4B\u5916\uFF0C\u5E76\u6CA1\u6709\u5176\u4ED6\u53D1\u9001\u4FE1\u53F7\u7684\u529F\u80FD\u3002\u4F46\u5728 os \u5305\u4E2D\uFF0C\u6709\u7C7B\u4F3C\u4E8E Linux \u7684 kill \u547D\u4EE4\u7684\u51FD\u6570\uFF0C\u5206\u522B\u4E3A\uFF1A</p><div class="language-python3 ext-python3 line-numbers-mode"><pre class="language-python3"><code>os.kill(pid, sid)
os.killpg(pgid, sid)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5206\u522B\u5411\u8FDB\u7A0B\u548C\u8FDB\u7A0B\u7EC4\u53D1\u9001\u4FE1\u53F7\u3002sid \u4E3A\u4FE1\u53F7\u6240\u5BF9\u5E94\u7684\u6574\u6570\u6216\u8005 singal.SIG*\u3002</p><h2 id="\u5B9A\u65F6\u53D1\u51FA-sigalrm-\u4FE1\u53F7" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u65F6\u53D1\u51FA-sigalrm-\u4FE1\u53F7" aria-hidden="true">#</a> \u5B9A\u65F6\u53D1\u51FA SIGALRM \u4FE1\u53F7</h2><p>\u5B83\u88AB\u7528\u4E8E\u5728\u4E00\u5B9A\u65F6\u95F4\u4E4B\u540E\uFF0C\u5411\u8FDB\u7A0B\u81EA\u8EAB\u53D1\u9001 SIGALRM \u4FE1\u53F7\uFF0C\u8FD9\u5BF9\u4E8E\u907F\u514D\u65E0\u9650\u671F\u5730\u963B\u585E I/O \u64CD\u4F5C\u6216\u5176\u4ED6\u7CFB\u7EDF\u8C03\u7528\u5F88\u6709\u7528\u3002</p><div class="language-python3 ext-python3 line-numbers-mode"><pre class="language-python3"><code>import signal
import time


def receive_alarm(signum, stack):
    print(&#39;Alarm :&#39;, time.ctime())


# Call receive_alarm in 2 seconds
signal.signal(signal.SIGALRM, receive_alarm)
signal.alarm(2)

print(&#39;Before:&#39;, time.ctime())
time.sleep(4)
print(&#39;After :&#39;, time.ctime())

# output
# Before: Sat Apr 22 14:48:57 2017
# Alarm : Sat Apr 22 14:48:59 2017
# After : Sat Apr 22 14:49:01 2017
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u6B64\u793A\u4F8B\u4E2D\uFF0C\u8C03\u7528 <code>sleep()</code> \u88AB\u4E2D\u65AD\uFF0C\u4F46\u5728\u4FE1\u53F7\u5904\u7406\u540E\u7EE7\u7EED\uFF0C\u56E0\u6B64<code>sleep()</code>\u8FD4\u56DE\u540E\u6253\u5370\u7684\u6D88\u606F\u663E\u793A\u7A0B\u5E8F\u6267\u884C\u65F6\u95F4\u4E0E\u7761\u7720\u6301\u7EED\u65F6\u95F4\u4E00\u6837\u957F\u3002</p><h2 id="\u5FFD\u7565\u4FE1\u53F7" tabindex="-1"><a class="header-anchor" href="#\u5FFD\u7565\u4FE1\u53F7" aria-hidden="true">#</a> \u5FFD\u7565\u4FE1\u53F7</h2><p>\u8981\u5FFD\u7565\u4FE1\u53F7\uFF0C\u8BF7\u6CE8\u518C SIG_IGN \u4E3A\u5904\u7406\u7A0B\u5E8F\u3002</p><p>\u4E0B\u9762\u8FD9\u4E2A\u4F8B\u5B50\u6CE8\u518C\u4E86\u4E24\u4E2A\u7A0B\u5E8F\uFF0C\u5206\u522B\u662F SIGINT \u548C SIGUSR1\uFF0C\u7136\u540E\u7528 <code>signal.pause()</code> \u7B49\u5F85\u63A5\u6536\u4FE1\u53F7\u3002</p><div class="language-python3 ext-python3 line-numbers-mode"><pre class="language-python3"><code>import signal
import os
import time


def do_exit(sig, stack):
    raise SystemExit(&#39;Exiting&#39;)


signal.signal(signal.SIGINT, signal.SIG_IGN)
signal.signal(signal.SIGUSR1, do_exit)

print(&#39;My PID:&#39;, os.getpid())

signal.pause()

# output
# My PID: 72598
# ^C^C^C^CExiting
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u901A\u5E38 SIGINT\uFF08\u5F53\u7528\u6237\u6309\u4E0B <code>Ctrl-C</code> \u65F6\u7531 shell \u53D1\u9001\u5230\u7A0B\u5E8F\u7684\u4FE1\u53F7\uFF09\u4F1A\u5F15\u53D1 <code>KeyboardInterrupt</code>\u3002\u8FD9\u4E2A\u4F8B\u5B50\u5728\u5B83\u770B\u5230 SIGINT \u65F6\u76F4\u63A5\u5FFD\u7565\u4E86\u3002\u8F93\u51FA\u4E2D\u7684\u6BCF\u4E2A <code>^C</code> \u8868\u793A\u5C1D\u8BD5\u4ECE\u7EC8\u7AEF\u7EC8\u6B62\u811A\u672C\u3002</p><p>\u4ECE\u53E6\u4E00\u4E2A\u7EC8\u7AEF\u4F7F\u7528 <code>kill -USR1 72598</code> \u5C06\u811A\u672C\u9000\u51FA\u3002</p><h2 id="\u4FE1\u53F7\u4E0E\u7EBF\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u4FE1\u53F7\u4E0E\u7EBF\u7A0B" aria-hidden="true">#</a> \u4FE1\u53F7\u4E0E\u7EBF\u7A0B</h2><p>\u591A\u7EBF\u7A0B\u73AF\u5883\u4E0B\u4F7F\u7528\u4FE1\u53F7\uFF0C\u53EA\u6709 main thread \u53EF\u4EE5\u8BBE\u7F6E signal \u7684 handler\uFF0C\u4E5F\u53EA\u6709\u5B83\u80FD\u63A5\u6536\u5230 signal. \u4E0B\u9762\u7528\u4E00\u4E2A\u4F8B\u5B50\u770B\u770B\u6548\u679C\uFF0C\u5728\u4E00\u4E2A\u7EBF\u7A0B\u4E2D\u7B49\u5F85\u4FE1\u53F7\uFF0C\u5E76\u4ECE\u53E6\u4E00\u4E2A\u7EBF\u7A0B\u53D1\u9001\u4FE1\u53F7\u3002</p><div class="language-python3 ext-python3 line-numbers-mode"><pre class="language-python3"><code>#coding:utf-8
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
    #\u5982\u679C\u5728\u5B50\u7EBF\u7A0B\u4E2D\u8BBE\u7F6Esignal\u7684handler \u4F1A\u62A5\u9519
    #ValueError: signal only works in main thread
    #signal.signal(signal.SIGUSR2, usr1_handler)

    print &quot;waiting for signal in&quot;, threading.currentThread()
    #sleep \u8FDB\u7A0B\u76F4\u5230\u63A5\u6536\u5230\u4FE1\u53F7
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

print &#39;pid&#39;, os.getpid()
# \u8FD9\u91CC\u662F\u4E3A\u4E86\u8BA9\u7A0B\u5E8F\u7ED3\u675F\uFF0C\u5524\u9192 pause
signal.alarm(2)
receiver.join()

# output
# waiting for signal in &lt;Thread(receiver, started 123145306509312)&gt;
# sending signal in  &lt;Thread(sender, started 123145310715904)&gt;
# received signal 30 &lt;_MainThread(MainThread, started 140735138967552)&gt;
# pid 23188
# [1]    23188 alarm      python thread_signal.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Python \u7684 signal \u6A21\u5757\u8981\u6C42\uFF0C\u6240\u6709\u7684 handlers \u5FC5\u9700\u5728 main thread \u4E2D\u6CE8\u518C\uFF0C\u5373\u4F7F\u5E95\u5C42\u5E73\u53F0\u652F\u6301\u7EBF\u7A0B\u548C\u4FE1\u53F7\u6DF7\u5408\u7F16\u7A0B\u3002\u5373\u4F7F\u63A5\u6536\u7EBF\u7A0B\u8C03\u7528\u4E86 <code>signal.pause()</code>\uFF0C\u4F46\u8FD8\u662F\u6CA1\u6709\u63A5\u6536\u5230\u4FE1\u53F7\u3002\u4EE3\u7801\u7ED3\u5C3E\u5904\u7684 <code>signal.alarm(2)</code> \u662F\u4E3A\u4E86\u5524\u9192\u63A5\u6536\u7EBF\u7A0B\u7684 <code>pause()</code>\uFF0C\u5426\u5219\u63A5\u6536\u7EBF\u7A0B\u6C38\u8FDC\u4E0D\u4F1A\u9000\u51FA\u3002</p><p>\u5C3D\u7BA1 alarms \u53EF\u4EE5\u5728\u4EFB\u610F\u7684\u7EBF\u7A0B\u4E2D\u8BBE\u7F6E\uFF0C\u4F46\u4ED6\u4EEC\u53EA\u80FD\u5728 main thread \u63A5\u6536\u3002</p><div class="language-python3 ext-python3 line-numbers-mode"><pre class="language-python3"><code>import signal
import time
import threading


def signal_handler(num, stack):
    print(time.ctime(), &#39;Alarm in&#39;,
          threading.currentThread().name)


signal.signal(signal.SIGALRM, signal_handler)


def use_alarm():
    t_name = threading.currentThread().name
    print(time.ctime(), &#39;Setting alarm in&#39;, t_name)
    signal.alarm(1)
    print(time.ctime(), &#39;Sleeping in&#39;, t_name)
    time.sleep(3)
    print(time.ctime(), &#39;Done with sleep in&#39;, t_name)


# Start a thread that will not receive the signal
alarm_thread = threading.Thread(
    target=use_alarm,
    name=&#39;alarm_thread&#39;,
)
alarm_thread.start()
time.sleep(0.1)

# Wait for the thread to see the signal (not going to happen!)
print(time.ctime(), &#39;Waiting for&#39;, alarm_thread.name)
alarm_thread.join()

print(time.ctime(), &#39;Exiting normally&#39;)

# output
# Sat Apr 22 14:49:01 2017 Setting alarm in alarm_thread
# Sat Apr 22 14:49:01 2017 Sleeping in alarm_thread
# Sat Apr 22 14:49:01 2017 Waiting for alarm_thread
# Sat Apr 22 14:49:02 2017 Alarm in MainThread
# Sat Apr 22 14:49:04 2017 Done with sleep in alarm_thread
# Sat Apr 22 14:49:04 2017 Exiting normally
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>alarm \u5E76\u6CA1\u6709\u4E2D\u65AD <code>use_alarm()</code> \u4E2D\u7684 <code>sleep</code>\u3002</p><p>\u76F8\u5173\u6587\u6863\uFF1A</p>`,46),p={href:"https://link.zhihu.com/?target=https%3A//pymotw.com/3/signal/index.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://link.zhihu.com/?target=http%3A//orangleliu.info/2016/03/06/python-signal-module-simple-use/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://link.zhihu.com/?target=http%3A//www.cnblogs.com/vamei/archive/2012/10/06/2712683.html",target:"_blank",rel:"noopener noreferrer"};function b(h,I){const e=c("ExternalLinkIcon");return l(),d("div",null,[u,r(" more "),o,n("p",null,[n("a",p,[i("https://pymotw.com/3/signal/index.html"),s(e)])]),n("p",null,[n("a",m,[i("http://orangleliu.info/2016/03/06/python-signal-module-simple-use/"),s(e)])]),n("p",null,[n("a",g,[i("http://www.cnblogs.com/vamei/archi"),s(e)])])])}const S=a(v,[["render",b],["__file","\u4FE1\u53F7\u91CF.html.vue"]]);export{S as default};
