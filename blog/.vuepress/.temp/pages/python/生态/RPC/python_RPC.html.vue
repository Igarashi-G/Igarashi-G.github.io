<template><div><p>#python_RPC 服务</p>
<h2 id="一、rpc-的交互过程" tabindex="-1"><a class="header-anchor" href="#一、rpc-的交互过程" aria-hidden="true">#</a> 一、RPC 的交互过程</h2>
<p>常见以 Http 协议为基础的 RPC：</p>
<pre><code>grpc、restfulHTTP
</code></pre>
<p>以 socket 为基础的 RPC：</p>
<pre><code>python自带的xmlrpc、twisted、thrift、pryo
</code></pre>
<h3 id="_1-什么是-rpc" tabindex="-1"><a class="header-anchor" href="#_1-什么是-rpc" aria-hidden="true">#</a> 1.什么是 RPC</h3>
<p>RPC： (Remote Procedure Call)即远程过程调用</p>
<ul>
<li>是分布式系统常见的一种通信方法</li>
<li>有 40 多年历史</li>
<li>两个物理分离的子系统需要建立逻辑上的关联时，RPC 来牵线搭桥，是两个子系统之间进行的直接消息交互</li>
</ul>
<p>注：
除 RPC 之外，常见的多系统数据交互方案还有分布式消息队列、HTTP 请求调用、数据库和分布式缓存等。</p>
<h3 id="_2-rpc-的交互过程" tabindex="-1"><a class="header-anchor" href="#_2-rpc-的交互过程" aria-hidden="true">#</a> 2.RPC 的交互过程</h3>
<p>【载体】：使用操作系统提供的套接字 socket 来作为消息的载体，以特定的消息格式来定义消息内容和边界。</p>
<p>【RPC 一次交互的上半场】</p>
<p>客户端通过 文件描述符的读写 API (read &amp; write) 来访问操作系统内核的网络模块，为当前前套接字分配的发送 (send buffer) 和接收 (recv buffer) 缓存</p>
<pre><code>                kernel:                                         kernel:
  client  -&gt;        send buffer      =&gt; Gateway =&gt;          secv buffer          -&gt;  Server
                    -&gt; NIC                              -&gt;  NIC
</code></pre>
<p>【客户端】：</p>
<p>1.写 RPC 指令消息到内核 Kernel 中</p>
<p>2.内核发送缓存中的数据到硬件物理 NIC 上（网卡 Network Interface Circuit）</p>
<p>3.NIC 负责将翻译出来的模拟信号通过网络硬件传递到服务器硬件的 NIC</p>
<p>【服务端】：</p>
<p>1.服务器的 NIC 再将模拟信号转成字节数据</p>
<p>2.把字节数据存放到内核为套接字分配的接收缓存中</p>
<p>3.服务器进程从接收缓存中读取数据 （此时的数据即为源客户端进程传递过来的 RPC 指令消息）</p>
<p>【下半场】</p>
<p>为一个逆向过程：从服务器进程向客户端进程返回响应数据。</p>
<pre><code># coding: utf-8
# server

import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.bind((&quot;localhost&quot;, 8081))
sock.listen(1)  # 监听客户端连接
while True:
    conn, addr = sock.accept()  # 接收一个客户端连接
    print(conn.recv(1024))  # 从接收缓冲读消息 recv buffer
    conn.sendall(b&quot;world&quot;)  # 将响应发送到发送缓冲 send buffer
    conn.close() # 关闭连接...
    break

# coding: utf-8
# client

import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect((&quot;localhost&quot;, 8081))  # 连接服务器
sock.sendall(b&quot;hello&quot;)  # 将消息输出到发送缓冲 send buffer
print(sock.recv(1024)) # 从接收缓冲 recv buffer 中读响应
sock.close() # 关闭套接字...
</code></pre>
<p>socket 就是其本质，可以用抓包工具来验证 TCP/IP 的三次握手，四次挥手和交互过程。</p>
<pre><code>三次握手：
     [SYN] Seq=0 Win=8192 Len=0 MSS=65495 WS=256 SACK_PERM=1
     [SYN, ACK] Seq=0 Ack =1 Win=8192 Len=0 MSS=65495 WS=256 SACK_PERM=1
     [ACK] Seq=1 ACK=1 Win=8192 Len=0

socket交互过程：
     [PSH, ACK] Seq=1 Ack=1 Win=8192 Len=5   （hello）
     [ACK] Seq=1 Ack=6 Win=7936 Len=0         (win的进程号吗？改变了)
     [PSH, ACK] Seq=1 Ack=6 Win=7936 Len=5
     [ACK] Seq=6 Ack=6 Win=7936 Len=0

四次挥手：
     [FIN, ACK] Seq=6 Ack=6 Win=7936 Len=0
     [ACK] Seq=6 Ack=7 Win=7936 Len=0
     [FIN, ACK] Seq=6 Ack=7 Win=7936 Len=0
     [ACK] Seq=7 Ack=7 Win=7936 Len=0
</code></pre>
<h4 id="二、rpc-消息协议的设计" tabindex="-1"><a class="header-anchor" href="#二、rpc-消息协议的设计" aria-hidden="true">#</a> 二、RPC 消息协议的设计</h4>
<p>###深入理解 RPC 消息协议设计
对于一串消息流，我们必须能确定消息边界，提取出单条消息的字节流片段，然后对这个片段按照一定的规则进行反序列化来生成相应的消息对象。</p>
<h4 id="消息边界" tabindex="-1"><a class="header-anchor" href="#消息边界" aria-hidden="true">#</a> 消息边界</h4>
<ul>
<li>RPC 需要在一条 TCP 链接上进行多次消息传递。</li>
<li>在连续的两条消息之间必须有明确的分割规则，以便接收端可以将消息分割开来</li>
</ul>
<p>注：</p>
<ul>
<li>接收端：即可以是 RPC 服务器接收请求，也可以是 RPC 客户端接收响应。</li>
<li>基于 TCP 链接之上的单条消息如果过大，就会被网络协议栈拆分为多个数据包进行传送。</li>
<li>如果消息过小，网络协议栈可能会将多个消息组合成一个数据包进行发送。</li>
</ul>
<p>由于对于接收端来说它看到的只是一串串的字节数组，如果没有明确的消息边界规则，接收端是无从知道这一串字节数组究竟是包含多条消息还是只是某条消息的一部分。</p>
<p>【两种方法】：</p>
<ul>
<li>
<p>特殊分割符法
message body    \r\n     message body    \r\n</p>
<ul>
<li>每条消息的末尾追加\r\n 这个特殊的分割符，并且保证消息中间数据不能有特殊字符</li>
<li>当接收端遍历字节数组时，发现\r\n 就可以断定之前的是一条完整的消息，可以传递到上层逻辑去处理</li>
<li>HTTP 和 Redis 协议 就是大量使用了\r\n 分隔符</li>
<li>此种消息一般要求消息体的内容是文本消息</li>
</ul>
</li>
<li>
<p>长度前缀法。
length    message body    length    message body</p>
<ul>
<li>消息发送端在每条消息开头增加 4 个字符的长度的整数值，来标记消息体的长度。</li>
<li>这样的消息先读取到长度信息，然后再读取相应长度的字节数组就可以将一个完整的消息分离出来，此种消息适合用于二进制消息。</li>
</ul>
</li>
</ul>
<p>【优缺点比较】</p>
<ul>
<li>
<p>特殊分割法：消息的可读性比较强，可以直接看到文本内容，缺点是不适合传递二进制消息，因为二进制的字节数组里面很容易就冒出连续的两个
字节内容正好就是\r\n 分割符的 ascii 值。如果需要传递的话，一般是对二进制进行 base64 编码转变成普通文本消息再进行传送。</p>
</li>
<li>
<p>长度前缀法：与上刚好相反，长度前缀法因为适用于二进制协议，所以可读性很差。但是对传递的内容本身没有特殊限制，文本和内容皆可以传输，
不需要进行特殊处理。HTTP 协议的 Content-Length 头信息用来标记消息体的长度，这个也可以看成是长度前缀法的一种应用。
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/2.7.13
Date: Thu, 10 May 2018 02:38:03 GMT
Content-type: text/html; charset=utf-8
Content-Length: 10393
# 此处省略 10393 字节消息体数据</p>
</li>
</ul>
<h4 id="消息的结构" tabindex="-1"><a class="header-anchor" href="#消息的结构" aria-hidden="true">#</a> 消息的结构</h4>
<p>【Json 协议】：</p>
<p>优点：</p>
<ul>
<li>直接通过内容体现。</li>
<li>直观的消息协议的可读性非常棒。</li>
</ul>
<p>缺点：</p>
<ul>
<li>有太多的冗余信息。连续的多条 json 消息即使结构完全一样，仅仅只是 value 的值不一样，也需要发送同样的 key 字符串信息。</li>
<li>每个字符串都使用双引号来界定边界，key/value 之间必须有冒号分割，对象之间必须使用大括号分割</li>
</ul>
<p>【avro 消息协议】：</p>
<p>消息的结构在同一条消息通道上是可以复用的</p>
<p>1.比如在建立链接的开始 RPC 客户端和服务器之间先交流协商一下消息的结构</p>
<p>2.后续发送消息时只需要发送一系列消息的 value 值</p>
<p>3.接收端会自动将 value 值和相应位置的 key 关联起来，形成一个完成的结构消息</p>
<p>好处：在 RPC 链接建立之处就开始交流消息的结构，后续消息的传递就可以节省很多流量。</p>
<p>【隐式结构】：</p>
<p>指那些结构信息由代码来约定的消息协议，在 RPC 交互的消息数据中只是纯粹的二进制数据，由代码来确定相应位置的二进制是属于哪个字段。</p>
<h4 id="消息压缩" tabindex="-1"><a class="header-anchor" href="#消息压缩" aria-hidden="true">#</a> 消息压缩</h4>
<p>如果消息的内容太大，就要考虑对消息进行压缩处理，这可以减轻网络带宽压力。但是这同时也会加重 CPU 的负担，因为压缩算法是 CPU 计算
密集型操作，会导致操作系统的负载加重。所以，最终是否进行消息压缩，一定要根据业务情况加以权衡。</p>
<p>如果确定压缩，那么在选择压缩算法包时，务必挑选那些底层用 C 语言实现的算法库，因为 Python 的字节码执行起来太慢了。</p>
<p>比较流行的消息压缩算法有 Google 的 snappy 算法，它的运行性能非常好，压缩比例虽然不是最优的，但是离最优的差距已经不是很大。
阿里的 SOFA RPC 就使用了 snappy 作为协议层压缩算法。</p>
<h4 id="流量的极致优化" tabindex="-1"><a class="header-anchor" href="#流量的极致优化" aria-hidden="true">#</a> 流量的极致优化</h4>
<p>开源的流行 RPC 消息协议往往对消息流量优化到了极致，它们通过这种方式来打动用户，吸引用户来使用它们。</p>
<p>比如：</p>
<p>对于一个整形数字，一般使用 4 个字节来表示一个整数值，但是经过研究发现，消息传递中大部分使用的整数值都是很小的非负整数。
如果全部使用 4 个字节来表示一个整数会很浪费。所以就发明了一个类型叫变长整数 varint。
数值非常小时，只需要使用一个字节来存储，数值稍微大一点可以使用 2 个字节，再大一点就是 3 个字节，它还可以超过 4 个字节用来表达长整形数字。</p>
<p>【原理】：（很简单）</p>
<p>就是保留每个字节的最高位的 bit 来标识是否后面还有字节，1 表示还有字节需要继续读，0 表示到读到当前字节就结束。</p>
<pre><code>            0~127：  0 xxxxxxxx
        128~16383：  1 xxxxxxxx 0 xxxxxxxx
    16384~2097151：  1 xxxxxxxx 1 xxxxxxxx 0 xxxxxxxx
2097152~268435455：  1 xxxxxxxx 1 xxxxxxxx 1 xxxxxxxx 0 xxxxxxxx
</code></pre>
<p>那如果是负数该怎么办呢？-1 的 16 进制数是 0xFFFFFFFF，如果要按照这个编码那岂不是要 6 个字节才能存的下。-1 也是非常常见的整数啊。</p>
<p>于是 zigzag 编码来了，专门用来解决负数问题。zigzag 编码将整数范围一一映射到自然数范围，然后再进行 varint 编码。</p>
<pre><code>0 =&gt; 0
-1 =&gt; 1
1 =&gt; 2
-2 =&gt; 3
2 =&gt; 4
-3 =&gt; 5
3 =&gt; 6
</code></pre>
<p>zigzag 将负数编码成正奇数，正数编码成偶数。解码的时候遇到偶数直接除 2 就是原值，遇到奇数就加 1 除 2 再取负就是原值。</p>
<p>实现一下 varint 和 zigzag 编码转换器:</p>
<pre><code># zigzag
def zigzag_encode(x):
    return x * 2 if x &gt;= 0 else -2 * x - 1

def zigzag_decode(x):
    # x &amp; 1 判断奇偶
    # (x+1) &gt;&gt; 1 除以2
    return x &gt;&gt; 1 if not x &amp; 1 else -1 * (x+1) &gt;&gt; 1

# varint
def varint_encode(x):
    result = 0
    tail = x &amp; 0x7f # 保留低位

    i = 1
    r = x &gt;&gt; 7      # 隔7位取
    while r &gt; 0:
        n = (r &amp; 0x7f) | 0x80   # 7bit高位加1bits
        result |= n &lt;&lt; (8 * i)
        r = r &gt;&gt; 7
        i += 1

    return result | tail

def varint_decode(x):
    result = 0
    tail = x &amp; 0xff

    i = 1
    r = x &gt;&gt; 8
    while r &gt; 0:
        n = r &amp; 0x7f
        result |= n &lt;&lt; (7 * i)
        r = r &gt;&gt; 8
        i += 1

    return result | tail
</code></pre>
<h4 id="三、rpc-消息协议的设计" tabindex="-1"><a class="header-anchor" href="#三、rpc-消息协议的设计" aria-hidden="true">#</a> 三、RPC 消息协议的设计</h4>
</div></template>


