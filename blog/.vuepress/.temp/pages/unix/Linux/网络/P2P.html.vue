<template><div><p><strong>Golang P2P</strong> 网络编程</p>
<!-- more -->
<h3 id="_1-网络通信模型" tabindex="-1"><a class="header-anchor" href="#_1-网络通信模型" aria-hidden="true">#</a> 1. 网络通信模型</h3>
<p>网络简化的四层模型</p>
<img src="@source/unix/Linux/网络/img/四层模型.png"> 
<h3 id="_2-ip协议" tabindex="-1"><a class="header-anchor" href="#_2-ip协议" aria-hidden="true">#</a> 2. IP协议</h3>
<p><strong>IP协议（<em>Internet Protocol</em> ）因特网互联协议：</strong> 网络层最核心的协议，它把复杂的实际网络，变为一个 <strong>虚拟互联的网络</strong>，并解决了在虚拟网络中 <strong>数据报传输路径的问题</strong>，即使仅提供了 <strong>不可靠、无连接</strong> 的传送服务，主要功能有：<strong>无连接数据报传输</strong>、<strong>数据报路由选择和差错控制</strong></p>
<p><strong>IPv4：</strong> 该协议其最核心的就是 <strong>源/目的 IP 地址</strong> ，其表现形式为点分十进制**（<em>v4</em>）**，并结合子网掩码来划分区域，如下</p>
<img src="@source/unix/Linux/网络/img/点分十进制.png" />
<p><strong>IP数据报格式：</strong></p>
<img src="@source/unix/Linux/网络/img/IP数据包格式.png" />
<img src="@source/unix/Linux/网络/img/IP协议报文头.png" /> 
<h3 id="_3-tcp协议" tabindex="-1"><a class="header-anchor" href="#_3-tcp协议" aria-hidden="true">#</a> 3. TCP协议</h3>
<p><strong>TCP(<em>Transmission Control Protocol</em> ) 传输控制协议: <strong>, 是计算机网络中非常重要的一个协议, 面向</strong>连接、字节流、同时点对点的全双工可靠</strong> 通信协议</p>
<h5 id="协议格式" tabindex="-1"><a class="header-anchor" href="#协议格式" aria-hidden="true">#</a> 协议格式</h5>
<img src="@source/unix/Linux/网络/img/TCP报文格式.png" /> 
<img src="@source/unix/Linux/网络/img/TCP协议.png" />
<p><strong>TCP</strong> 数据包是封装在 <strong>IP</strong> 数据包的 <strong>Payload(<em>数据负载</em> )</strong> 部分</p>
<img src="@source/unix/Linux/网络/img/TCP封装payload.png" /> 
<p>即如下图的表现形式</p>
<img src="@source/unix/Linux/网络/img/TCP简易图.jpg" />
<h3 id="_4-tun设备" tabindex="-1"><a class="header-anchor" href="#_4-tun设备" aria-hidden="true">#</a> 4. Tun设备</h3>
<p><strong>TUN (<em>TUNnel</em>) 网络隧道：</strong> 是一种工作在三层、模拟了网络层物理硬件 的 <strong>虚拟网络设备</strong>，它像但虚拟网卡不同，它是用于创建网络隧道、VPN、网络代理，即用来处理 **IP层数据包（<em>收发</em> ）**的场景。</p>
<p>当应用程序发送数据到 <strong>TUN</strong> 设备时 ，数据会被内核网络协议栈处理，此时 <strong>TUN</strong> 设备可以读取和写入 <strong>IP数据包</strong> ，故通过 <strong>TUN</strong> 设备，<strong>处于用户空间的程序</strong> 可以接收和发送网络层数据包。</p>
<h4 id="_4-1-传输过程" tabindex="-1"><a class="header-anchor" href="#_4-1-传输过程" aria-hidden="true">#</a> 4.1 传输过程</h4>
<p><strong>从设备 A 的 TUN 接口到设备 B 的 TUN 接口的数据包传输过程如下:</strong></p>
<ol>
<li>
<p><strong>发送端 (<em>设备 A</em>) 封包过程:</strong></p>
<img src="@source/unix/Linux/网络/img/Tun到Tun的发送端.jpg" /> 
</li>
<li>
<p><strong>接收端（<em>设备B</em>）的拆包过程：</strong></p>
<img src="@source/unix/Linux/网络/img/Tun到Tun的接收端.jpg" /> 
</li>
</ol>
<p><strong>1. 发送端封包过程：</strong></p>
<ul>
<li>
<p>应用程序数据先进入 TUN 设备（IP 包）</p>
</li>
<li>
<p>TCP 层添加 TCP 头部（20-60字节）</p>
<ul>
<li>设置源端口、目标端口</li>
<li>设置序列号、确认号</li>
<li>设置控制标志</li>
</ul>
</li>
<li>
<p>IP 层添加 IP 头部（20-60字节）</p>
<ul>
<li>设置源IP、目标IP</li>
<li>设置协议号为 6（TCP）</li>
<li>计算校验和</li>
</ul>
</li>
</ul>
<p><strong>2. 接收端拆包过程：</strong></p>
<ul>
<li>收到完整的 IP 数据包</li>
<li>IP 层处理：
<ul>
<li>验证 IP 头部校验和</li>
<li>检查目标 IP 地址</li>
<li>移除 IP 头部</li>
</ul>
</li>
<li>TCP 层处理：
<ul>
<li>验证 TCP 校验和</li>
<li>检查序列号和确认号</li>
<li>移除 TCP 头部</li>
</ul>
</li>
<li>将原始 IP 数据包传递给 TUN 设备</li>
<li>TUN 设备将数据传递给应用程序</li>
</ul>
<p><strong>关键注意事项：</strong></p>
<ul>
<li>
<p>每一层都会进行必要的校验</p>
</li>
<li>
<p>头部的添加和移除顺序相反</p>
</li>
<li>
<p>TUN 设备工作在 IP 层（第三层）</p>
</li>
<li>
<p>整个过程需要确保数据完整性</p>
</li>
<li>
<p>每一步都需要正确设置相应的协议头部字段</p>
</li>
</ul>
<h5 id="其大致流程图如下" tabindex="-1"><a class="header-anchor" href="#其大致流程图如下" aria-hidden="true">#</a> 其大致流程图如下：</h5>
<Mermaid id="mermaid-64a568e2" code="graph%20LR%0A%20%20%20%20subgraph%20%E8%AE%BE%E5%A4%87A%0A%20%20%20%20%20%20%20%20A1%5B%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%5D%0A%20%20%20%20%20%20%20%20A2%5BTUN%20%E8%AE%BE%E5%A4%87%5D%0A%20%20%20%20%20%20%20%20A3%5BTCP%E5%B1%82%5D%0A%20%20%20%20%20%20%20%20A4%5BIP%E5%B1%82%5D%0A%20%20%20%20%20%20%20%20A5%5B%E9%93%BE%E8%B7%AF%E5%B1%82%5D%0A%20%20%20%20%20%20%20%20A6%5B%E7%89%A9%E7%90%86%E5%B1%82%5D%0A%20%20%20%20%20%20%20%20A1--%3EA2%0A%20%20%20%20%20%20%20%20A2--%3EA3%0A%20%20%20%20%20%20%20%20A3--%3EA4%0A%20%20%20%20%20%20%20%20A4--%3EA5%0A%20%20%20%20%20%20%20%20A5--%3EA6%0A%20%20%20%20end%0A%20%20%20%20%0A%20%20%20%20subgraph%20%E8%AE%BE%E5%A4%87B%0A%20%20%20%20%20%20%20%20B1%5B%E7%89%A9%E7%90%86%E5%B1%82%5D%0A%20%20%20%20%20%20%20%20B2%5B%E9%93%BE%E8%B7%AF%E5%B1%82%5D%0A%20%20%20%20%20%20%20%20B3%5BIP%E5%B1%82%5D%0A%20%20%20%20%20%20%20%20B4%5BTCP%E5%B1%82%5D%0A%20%20%20%20%20%20%20%20B5%5BTUN%20%E8%AE%BE%E5%A4%87%5D%0A%20%20%20%20%20%20%20%20B6%5B%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%5D%0A%20%20%20%20%20%20%20%20B1--%3EB2%0A%20%20%20%20%20%20%20%20B2--%3EB3%0A%20%20%20%20%20%20%20%20B3--%3EB4%0A%20%20%20%20%20%20%20%20B4--%3EB5%0A%20%20%20%20%20%20%20%20B5--%3EB6%0A%20%20%20%20end%0A%20%20%20%20%0A%20%20%20%20A6-.-%3EB1%0A"></Mermaid><p>会发现，<strong>TUN</strong> 设备就像一个 <strong>“包裹处理站”</strong>，它会把 <strong>IP数据包</strong> 给包裹到了**TCP（<em>四层</em> ）**报文中，作为其 <strong>包裹-Data</strong> ，再经过 <strong>IP、链路、物理 -&gt; 另一端物理、链路、IP、TCP层（<em>4-3-2-1 -&gt; 1-2-3-&gt;4层</em> ）</strong> 层层传递最后又解析出 <strong>包裹-Data</strong></p>
<ul>
<li>
<p>应用数据进入 <strong>TUN</strong> 设备</p>
</li>
<li>
<p><strong>TUN</strong> 设备将数据伪装成 <strong>IP 包（<em>上文 &quot;IP数据包 &quot;</em> ）</strong></p>
</li>
<li>
<p>这个 <strong>IP</strong> 包会作为数据被封装进 <strong>TCP</strong> 段</p>
</li>
<li>
<p><strong>TCP</strong> 段再被封装进新的 <strong>IP</strong> 包</p>
</li>
<li>
<p>最后加上链路层帧头</p>
</li>
</ul>
<blockquote>
<p><strong>⚠️ 注意：（<em>与 TAP 的区别</em>）</strong></p>
<ul>
<li>
<p><strong>TUN</strong> 工作在网络层(<em>第三层</em>)，处理 <strong>IP</strong> 数据包</p>
</li>
<li>
<p>而 <strong>TAP</strong> 工作在数据链路层(<em>第二层</em>)，处理以太网数据帧</p>
</li>
</ul>
</blockquote>
<p>UDP 和 TCP 在消息处理上有本质区别，让我解释一下：</p>
<p>UDP 特性</p>
<p>​	1.	报文边界保留</p>
<p>​	▪	UDP 是基于消息的协议，天然保留数据包边界</p>
<p>​	▪	每个 UDP 数据包都是独立的，完整的</p>
<p>​	▪	一个 sendto 对应一个 recvfrom</p>
<p>​	2.	包大小限制</p>
<p>​	▪	UDP 数据包有大小限制（通常建议不超过 MTU，一般是 1500 字节）</p>
<p>​	▪	超过 MTU 的包会被分片，可能导致丢包率增加</p>
<p>​	3.	无连接、不可靠</p>
<p>​	▪	不保证包的到达顺序</p>
<p>​	▪	不保证包是否到达</p>
<p>​	▪	不保证包只到达一次</p>
<p>是否需要 Frame 处理？</p>
<p>答案：UDP 通常不需要 Frame 处理，但在特定场景下可能需要自定义分包协议。</p>
<h3 id="_5-示例" tabindex="-1"><a class="header-anchor" href="#_5-示例" aria-hidden="true">#</a> 5. 示例</h3>
<h4 id="_5-1-tcp服务端示例" tabindex="-1"><a class="header-anchor" href="#_5-1-tcp服务端示例" aria-hidden="true">#</a> 5.1 TCP服务端示例</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"encoding/binary"</span>
    <span class="token string">"encoding/json"</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"io"</span>
    <span class="token string">"net"</span>
    <span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义消息头部长度（用 4 字节表示消息体长度）</span>
<span class="token keyword">const</span> headerLength <span class="token operator">=</span> <span class="token number">4</span>

<span class="token comment">// 基础消息结构</span>
<span class="token keyword">type</span> BaseMessage <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Cmd  <span class="token builtin">string</span>      <span class="token string">`json:"cmd"`</span>
    Data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">`json:"data"`</span>
<span class="token punctuation">}</span>

<span class="token comment">// Frame 处理器</span>
<span class="token keyword">type</span> FrameReader <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    reader io<span class="token punctuation">.</span>Reader
    buffer <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建新的 Frame 读取器</span>
<span class="token keyword">func</span> <span class="token function">NewFrameReader</span><span class="token punctuation">(</span>reader io<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span> <span class="token operator">*</span>FrameReader <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>FrameReader<span class="token punctuation">{</span>
        reader<span class="token punctuation">:</span> reader<span class="token punctuation">,</span>
        buffer<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 读取完整的一帧数据</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>fr <span class="token operator">*</span>FrameReader<span class="token punctuation">)</span> <span class="token function">ReadFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 读取头部（消息长度）</span>
    header <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> headerLength<span class="token punctuation">)</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>fr<span class="token punctuation">.</span>reader<span class="token punctuation">,</span> header<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span>

    <span class="token comment">// 解析消息长度</span>
    messageLength <span class="token operator">:=</span> binary<span class="token punctuation">.</span>BigEndian<span class="token punctuation">.</span><span class="token function">Uint32</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span>

    <span class="token comment">// 检查消息长度是否合理</span>
    <span class="token keyword">if</span> messageLength <span class="token operator">></span> <span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span> <span class="token punctuation">{</span> <span class="token comment">// 设置最大消息大小为 1MB</span>
        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"message too large: %d"</span><span class="token punctuation">,</span> messageLength<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 读取消息体</span>
    message <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> messageLength<span class="token punctuation">)</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>fr<span class="token punctuation">.</span>reader<span class="token punctuation">,</span> message<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> message<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">// Frame 写入器</span>
<span class="token keyword">func</span> <span class="token function">WriteFrame</span><span class="token punctuation">(</span>writer io<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token comment">// 准备头部（消息长度）</span>
    header <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> headerLength<span class="token punctuation">)</span>
    binary<span class="token punctuation">.</span>BigEndian<span class="token punctuation">.</span><span class="token function">PutUint32</span><span class="token punctuation">(</span>header<span class="token punctuation">,</span> <span class="token function">uint32</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 写入头部</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> err
    <span class="token punctuation">}</span>

    <span class="token comment">// 写入消息体</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">return</span> err
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handleConnection</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    frameReader <span class="token operator">:=</span> <span class="token function">NewFrameReader</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>

    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token comment">// 读取一帧完整数据</span>
        frame<span class="token punctuation">,</span> err <span class="token operator">:=</span> frameReader<span class="token punctuation">.</span><span class="token function">ReadFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> err <span class="token operator">!=</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
                fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error reading frame:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 解析消息</span>
        <span class="token keyword">var</span> baseMsg BaseMessage
        err <span class="token operator">=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>frame<span class="token punctuation">,</span> <span class="token operator">&amp;</span>baseMsg<span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token function">sendError</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">"Invalid JSON format"</span><span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 处理消息</span>
        <span class="token keyword">switch</span> baseMsg<span class="token punctuation">.</span>Cmd <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">"login"</span><span class="token punctuation">:</span>
            <span class="token function">handleLogin</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> baseMsg<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token string">"chat"</span><span class="token punctuation">:</span>
            <span class="token function">handleChat</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> baseMsg<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token string">"heartbeat"</span><span class="token punctuation">:</span>
            <span class="token function">handleHeartbeat</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> baseMsg<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            <span class="token function">sendError</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">"Unknown command"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 消息处理函数</span>
<span class="token keyword">func</span> <span class="token function">handleLogin</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    jsonData<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">sendError</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">"Data conversion error"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> loginMsg <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        Username <span class="token builtin">string</span> <span class="token string">`json:"username"`</span>
        Password <span class="token builtin">string</span> <span class="token string">`json:"password"`</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>jsonData<span class="token punctuation">,</span> <span class="token operator">&amp;</span>loginMsg<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">sendError</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">"Invalid login message format"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Processing login for user: %s\n"</span><span class="token punctuation">,</span> loginMsg<span class="token punctuation">.</span>Username<span class="token punctuation">)</span>
    response <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token string">"status"</span><span class="token punctuation">:</span> <span class="token string">"success"</span><span class="token punctuation">,</span>
        <span class="token string">"msg"</span><span class="token punctuation">:</span>    <span class="token string">"Login successful"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token function">sendResponse</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> response<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handleChat</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 类似 handleLogin 的实现</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handleHeartbeat</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 类似 handleLogin 的实现</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sendError</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    response <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token string">"status"</span><span class="token punctuation">:</span> <span class="token string">"error"</span><span class="token punctuation">,</span>
        <span class="token string">"msg"</span><span class="token punctuation">:</span>    message<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token function">sendResponse</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> response<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sendResponse</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> response <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    jsonResponse<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error marshaling response:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    err <span class="token operator">=</span> <span class="token function">WriteFrame</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> jsonResponse<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error sending response:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    listener<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">":8080"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error listening:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> listener<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"TCP Server listening on :8080"</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> listener<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error accepting connection:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">go</span> <span class="token function">handleConnection</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-tcp-客户端示例" tabindex="-1"><a class="header-anchor" href="#_5-2-tcp-客户端示例" aria-hidden="true">#</a> 5.2 TCP 客户端示例</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ExampleClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"localhost:8080"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error connecting:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 发送登录消息</span>
    loginMsg <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token string">"cmd"</span><span class="token punctuation">:</span> <span class="token string">"login"</span><span class="token punctuation">,</span>
        <span class="token string">"data"</span><span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
            <span class="token string">"username"</span><span class="token punctuation">:</span> <span class="token string">"testuser"</span><span class="token punctuation">,</span>
            <span class="token string">"password"</span><span class="token punctuation">:</span> <span class="token string">"testpass"</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    jsonData<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>loginMsg<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error marshaling:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 发送消息</span>
    err <span class="token operator">=</span> <span class="token function">WriteFrame</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> jsonData<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error sending:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 读取响应</span>
    frameReader <span class="token operator">:=</span> <span class="token function">NewFrameReader</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    response<span class="token punctuation">,</span> err <span class="token operator">:=</span> frameReader<span class="token punctuation">.</span><span class="token function">ReadFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error reading response:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Received response: %s\n"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-3-udp-服务端示例" tabindex="-1"><a class="header-anchor" href="#_5-3-udp-服务端示例" aria-hidden="true">#</a> 5.3 UDP 服务端示例</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"encoding/binary"</span>
    <span class="token string">"encoding/json"</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"io"</span>
    <span class="token string">"net"</span>
    <span class="token string">"sync"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义消息头部长度（用 4 字节表示消息体长度）</span>
<span class="token keyword">const</span> headerLength <span class="token operator">=</span> <span class="token number">4</span>

<span class="token comment">// 基础消息结构</span>
<span class="token keyword">type</span> BaseMessage <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Cmd  <span class="token builtin">string</span>      <span class="token string">`json:"cmd"`</span>
    Data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token string">`json:"data"`</span>
<span class="token punctuation">}</span>

<span class="token comment">// Frame 处理器</span>
<span class="token keyword">type</span> FrameReader <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    reader io<span class="token punctuation">.</span>Reader
    buffer <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
<span class="token punctuation">}</span>

<span class="token comment">// 创建新的 Frame 读取器</span>
<span class="token keyword">func</span> <span class="token function">NewFrameReader</span><span class="token punctuation">(</span>reader io<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span> <span class="token operator">*</span>FrameReader <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>FrameReader<span class="token punctuation">{</span>
        reader<span class="token punctuation">:</span> reader<span class="token punctuation">,</span>
        buffer<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 读取完整的一帧数据</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>fr <span class="token operator">*</span>FrameReader<span class="token punctuation">)</span> <span class="token function">ReadFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 读取头部（消息长度）</span>
    header <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> headerLength<span class="token punctuation">)</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>fr<span class="token punctuation">.</span>reader<span class="token punctuation">,</span> header<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span>

    <span class="token comment">// 解析消息长度</span>
    messageLength <span class="token operator">:=</span> binary<span class="token punctuation">.</span>BigEndian<span class="token punctuation">.</span><span class="token function">Uint32</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span>

    <span class="token comment">// 检查消息长度是否合理</span>
    <span class="token keyword">if</span> messageLength <span class="token operator">></span> <span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span> <span class="token punctuation">{</span> <span class="token comment">// 设置最大消息大小为 1MB</span>
        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"message too large: %d"</span><span class="token punctuation">,</span> messageLength<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 读取消息体</span>
    message <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> messageLength<span class="token punctuation">)</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> io<span class="token punctuation">.</span><span class="token function">ReadFull</span><span class="token punctuation">(</span>fr<span class="token punctuation">.</span>reader<span class="token punctuation">,</span> message<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> message<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">// Frame 写入器</span>
<span class="token keyword">func</span> <span class="token function">WriteFrame</span><span class="token punctuation">(</span>writer io<span class="token punctuation">.</span>Writer<span class="token punctuation">,</span> data <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token comment">// 准备头部（消息长度）</span>
    header <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> headerLength<span class="token punctuation">)</span>
    binary<span class="token punctuation">.</span>BigEndian<span class="token punctuation">.</span><span class="token function">PutUint32</span><span class="token punctuation">(</span>header<span class="token punctuation">,</span> <span class="token function">uint32</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 写入头部</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> err
    <span class="token punctuation">}</span>

    <span class="token comment">// 写入消息体</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> writer<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">return</span> err
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handleConnection</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    frameReader <span class="token operator">:=</span> <span class="token function">NewFrameReader</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>

    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token comment">// 读取一帧完整数据</span>
        frame<span class="token punctuation">,</span> err <span class="token operator">:=</span> frameReader<span class="token punctuation">.</span><span class="token function">ReadFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> err <span class="token operator">!=</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span>
                fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error reading frame:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 解析消息</span>
        <span class="token keyword">var</span> baseMsg BaseMessage
        err <span class="token operator">=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>frame<span class="token punctuation">,</span> <span class="token operator">&amp;</span>baseMsg<span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token function">sendError</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">"Invalid JSON format"</span><span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 处理消息</span>
        <span class="token keyword">switch</span> baseMsg<span class="token punctuation">.</span>Cmd <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">"login"</span><span class="token punctuation">:</span>
            <span class="token function">handleLogin</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> baseMsg<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token string">"chat"</span><span class="token punctuation">:</span>
            <span class="token function">handleChat</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> baseMsg<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token string">"heartbeat"</span><span class="token punctuation">:</span>
            <span class="token function">handleHeartbeat</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> baseMsg<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            <span class="token function">sendError</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">"Unknown command"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 消息处理函数</span>
<span class="token keyword">func</span> <span class="token function">handleLogin</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    jsonData<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">sendError</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">"Data conversion error"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">var</span> loginMsg <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        Username <span class="token builtin">string</span> <span class="token string">`json:"username"`</span>
        Password <span class="token builtin">string</span> <span class="token string">`json:"password"`</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>jsonData<span class="token punctuation">,</span> <span class="token operator">&amp;</span>loginMsg<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">sendError</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> <span class="token string">"Invalid login message format"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Processing login for user: %s\n"</span><span class="token punctuation">,</span> loginMsg<span class="token punctuation">.</span>Username<span class="token punctuation">)</span>
    response <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token string">"status"</span><span class="token punctuation">:</span> <span class="token string">"success"</span><span class="token punctuation">,</span>
        <span class="token string">"msg"</span><span class="token punctuation">:</span>    <span class="token string">"Login successful"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token function">sendResponse</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> response<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handleChat</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 类似 handleLogin 的实现</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">handleHeartbeat</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> data <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 类似 handleLogin 的实现</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sendError</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> message <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    response <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token string">"status"</span><span class="token punctuation">:</span> <span class="token string">"error"</span><span class="token punctuation">,</span>
        <span class="token string">"msg"</span><span class="token punctuation">:</span>    message<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token function">sendResponse</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> response<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">sendResponse</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> response <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    jsonResponse<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error marshaling response:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    err <span class="token operator">=</span> <span class="token function">WriteFrame</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> jsonResponse<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error sending response:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    listener<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">":8080"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error listening:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> listener<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"TCP Server listening on :8080"</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> listener<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error accepting connection:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">go</span> <span class="token function">handleConnection</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-4-udp-客户端端示例" tabindex="-1"><a class="header-anchor" href="#_5-4-udp-客户端端示例" aria-hidden="true">#</a> 5.4 UDP 客户端端示例</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ExampleClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"localhost:8080"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error connecting:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 发送登录消息</span>
    loginMsg <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
        <span class="token string">"cmd"</span><span class="token punctuation">:</span> <span class="token string">"login"</span><span class="token punctuation">,</span>
        <span class="token string">"data"</span><span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
            <span class="token string">"username"</span><span class="token punctuation">:</span> <span class="token string">"testuser"</span><span class="token punctuation">,</span>
            <span class="token string">"password"</span><span class="token punctuation">:</span> <span class="token string">"testpass"</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    jsonData<span class="token punctuation">,</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>loginMsg<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error marshaling:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 发送消息</span>
    err <span class="token operator">=</span> <span class="token function">WriteFrame</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> jsonData<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error sending:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 读取响应</span>
    frameReader <span class="token operator">:=</span> <span class="token function">NewFrameReader</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    response<span class="token punctuation">,</span> err <span class="token operator">:=</span> frameReader<span class="token punctuation">.</span><span class="token function">ReadFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error reading response:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Received response: %s\n"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-tun-tap设备" tabindex="-1"><a class="header-anchor" href="#_6-tun-tap设备" aria-hidden="true">#</a> 6. tun/tap设备</h3>
<ul>
<li>
<p><a href="https://github.com/WireGuard/wireguard-go" target="_blank" rel="noopener noreferrer">WireGuard<ExternalLinkIcon/></a></p>
</li>
<li>
<p>数据分层传输</p>
<p><img src="img/wps1.jpg" alt="img" loading="lazy"></p>
</li>
<li>
<p>分析数据包： <a href="https://github.com/google/gopacket" target="_blank" rel="noopener noreferrer">gopacket<ExternalLinkIcon/></a></p>
</li>
</ul>
<h4 id="tcp编程缺点" tabindex="-1"><a class="header-anchor" href="#tcp编程缺点" aria-hidden="true">#</a> TCP编程缺点</h4>
<p>tcp/udp是传输层协议</p>
<ul>
<li>
<p><strong>TCP</strong> 是 <strong>stream</strong> 流式无边界的：无 <strong>frame</strong> , 如果要在上面实现拆包处理消息，需要是先实现 <strong>frame</strong>;</p>
</li>
<li>
<p><strong>UDP</strong> 是数据报 <strong>Dgram</strong> 有边界，但是不可靠;</p>
</li>
</ul>
<p>http, grpc，ws，quic, sctp是应用层，自带frame(按帧传输)</p>
<p>http grpc,ws是tcp之上的</p>
<p>quic,stcp, 都是udp之上，但是应用层实现了可靠性</p>
<p>下面就分别用这些协议实现p2p编程</p>
<p>实现p2p编程，一般在server端需要实现两步</p>
<p>1 信令交换</p>
<p>2 适当的时机流转发</p>
<p>可以用用两个server,监听两个端口，或者listen一个端口。但是 listen 一个端口时client/server 需要按frame 传数据包的。 因为要区分上面两个步骤</p>
<p><a href="http://192.168.0.232/dwu/wire" target="_blank" rel="noopener noreferrer">http://192.168.0.232/dwu/wire<ExternalLinkIcon/></a></p>
</div></template>


