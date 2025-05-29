import{_ as s,a as t,b as r}from"./IP协议报文头-BECf7gYj.js";import{_ as i}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as o,d as a,o as e}from"./app-BhrB-knK.js";const g="/assets/%E4%B8%83%E5%B1%82%E6%A8%A1%E5%9E%8B-Bso537Wz.png",p="/assets/%E5%90%84%E5%B1%82%E8%A7%A3%E8%80%A6-CvwswPKO.jpg",l="/assets/%E7%BD%91%E7%BB%9C%E4%BC%A0%E8%BE%93-w3BHemRt.jpg",h="/assets/%E4%B8%AD%E7%BB%A7%E5%99%A8-D1oCfrQH.jpg",c="/assets/%E9%9B%86%E7%BA%BF%E5%99%A8-BAKteP-A.jpg",d="/assets/%E6%95%B0%E6%8D%AE%E6%88%90%E5%B8%A7-OZEMBFSd.png",m="/assets/%E6%97%A0%E7%BA%BF%E7%BD%91%E6%A1%A5-CdiFGvcK.jpg",k="/assets/%E4%BB%A5%E5%A4%AA%E7%BD%91%E4%BA%A4%E6%8D%A2%E6%9C%BA-B9CwLsfx.jpg",A="/assets/%E4%BB%A5%E5%A4%AA%E7%BD%91%E5%8D%8F%E8%AE%AE-BxawLHmP.png",P="/assets/%E4%BB%A5%E5%A4%AA%E7%BD%91%E5%8D%8F%E8%AE%AE%E6%A0%BC%E5%BC%8F-dhcL0DCQ.png",C="/assets/%E4%BA%A4%E6%8D%A2%E6%9C%BA%E6%B5%81%E7%A8%8B-CELcrxUA.png",u="/assets/%E4%BA%A4%E6%8D%A2%E6%9C%BA%E6%B5%81%E7%A8%8B%E7%89%B9%E6%AE%8A%E6%83%85%E5%86%B5-CUl0lZXS.png",I="/assets/%E8%B7%AF%E7%94%B1%E5%99%A8-JV8_2-Tu.jpg",F="/assets/%E7%BD%91%E5%85%B3-BN2JszwR.jpg",E="/assets/%E7%BD%91%E7%BB%9C%E5%B1%82%E5%8D%8F%E8%AE%AE-ChwmBSuJ.png",B="/assets/ARP%E8%BF%87%E7%A8%8B-CEWRq4KC.png",b="/assets/ARP%E6%98%A0%E5%B0%84%E5%85%B3%E7%B3%BB-B7ajjB9v.png",y="/assets/nc%E5%8F%91%E8%B5%B7http-B-1l9TAW.jpg",T="/assets/tcpdump-BYmZQo8I.jpg",v={};function M(f,n){return e(),o("div",null,n[0]||(n[0]=[a('<p>一些简单的网络基础</p><h2 id="_1-网络基础" tabindex="-1"><a class="header-anchor" href="#_1-网络基础"><span>1. 网络基础</span></a></h2><h3 id="_1-1-网络通信" tabindex="-1"><a class="header-anchor" href="#_1-1-网络通信"><span>1.1 网络通信</span></a></h3><p>应用软件，是通过和操作系统 <strong>OS</strong> ，来和硬件打交道的，那么软件和软件之间，机器和机器之间，则需要利用 <strong>Internet</strong>（<em>网络</em> ）进行通信，互联网本质就是一系列的 <strong>网络协议</strong></p><h4 id="基本术语" tabindex="-1"><a class="header-anchor" href="#基本术语"><span><strong>基本术语</strong></span></a></h4><ul><li><strong>结点（node）：</strong> 网络中的结点可以是计算机、集线器、交换机和路由器等</li><li><strong>链路（link）：</strong> 从一个结点到另一个结点的一段物理链路，中间没有任何其他交点</li><li><strong>主机（host）：</strong> 连接在因特网上的计算机</li><li><strong>ISP（Internet Service Provider）：</strong> 因特网服务提供者（<em>提供商，如中国电信、移动等</em> ）</li><li><strong>IXP（Internet Exchange Point） ：</strong> 互联网交换点，允许两个网络 <strong>直接相连</strong> 并 <strong>交换分组</strong>，而不需要再通过第三个网络来转发分组</li><li><strong>RFC（Request For Comments）：</strong> 意思是 <strong>“请求评议”</strong>，包含了关于 <strong>Internet</strong> 几乎所有的重要的文字资料</li><li><strong>分组（packet ）：</strong> 因特网中传送的数据单元。由首部 <strong>header</strong> 和数据段组成，分组又称为包，首部可称为包头</li><li><strong>存储转发（store and forward ）：</strong> 路由器收到一个分组，先检查分组是否正确，并过滤掉冲突包错误，确定包正确后，取出目的地址，通过查找表找到想要发送的输出端口地址，然后将该包发送出去</li></ul><h3 id="_1-2-网络分类" tabindex="-1"><a class="header-anchor" href="#_1-2-网络分类"><span>1.2 网络分类</span></a></h3><h4 id="作用范围分类" tabindex="-1"><a class="header-anchor" href="#作用范围分类"><span><strong>作用范围分类</strong></span></a></h4><ul><li><strong>广域网 WAN（Wide Area Network）：</strong> 任务是通过长距离运送主机发送的数据</li><li><strong>城域网 MAN（Metropolitan Area Network）：</strong> 用来将多个局域网进行互连</li><li><strong>局域网 LAN（Local Area Network）：</strong> 学校或企业大多拥有多个互连的局域网</li><li><strong>个人区域网 PAN（Personal Area Network）：</strong> 在个人工作的地方，个人的电子设备用无线技术连接起来的网络</li></ul><h4 id="使用者分类" tabindex="-1"><a class="header-anchor" href="#使用者分类"><span><strong>使用者分类</strong></span></a></h4><ul><li><strong>公用网络：</strong> 对所有的人提供服务，只要符合网络拥有者的要求就能使用这个网</li><li><strong>专用网络：</strong> 专用网为一个或几个部门所拥有，它只为拥有者提供服务，这种网络不向拥有者以外的人提供服务，局域网一般都是专用网</li></ul><h3 id="_1-3-性能指标" tabindex="-1"><a class="header-anchor" href="#_1-3-性能指标"><span>1.3 性能指标</span></a></h3><ul><li><strong>带宽（bandwidth）：</strong> 计算机网络中，表示在 <strong>单位时间内</strong>，<strong>从</strong> 网络中的 <strong>某一点</strong> 到 <strong>另一点</strong> 所能通过的 <strong>“最高数据率”</strong>，来表示网络的通信线路所能传送数据的能力。单位是 <strong>“比特每秒”</strong>，记为 <strong>bit/s</strong> 即 <strong>bps</strong></li><li><strong>吞吐量（throughput）：</strong> 表示在 <strong>单位时间内</strong>，<strong>通过</strong> 某个 <strong>网络（<em>信道、接口</em> ）</strong> 的 <strong>数据量</strong>，吞吐量常用于测量现实世界中的网络，以便知道实际上到底有多少数据量能够通过网络，吞吐量 <strong>受网络的带宽</strong> 或 <strong>网络的额定速率</strong> 的限制</li><li><strong>时延：</strong> 发送时延、传播时延、排队时延、处理时延</li><li><strong>往返时间（RTT）：</strong> 数据报文在端到端通信中来回一次的时间</li></ul><h2 id="_2-网络七层模型" tabindex="-1"><a class="header-anchor" href="#_2-网络七层模型"><span>2. 网络七层模型</span></a></h2><p>如今网络按照 <strong>OSI</strong> 体系实现的七层模型</p><img src="'+g+'"><p>如图是一个基础的 <strong>网络协议栈</strong>，它是栈结构，因此上层都是基于下层的 <strong>层层封装</strong> ，故网络连接都是按照栈的 <strong>先入后出</strong> 来层层拆包</p><p>除七层模型外，还有简化的四层模型</p><img src="'+s+'"><p><strong>TCP/IP 四层模型：</strong></p><ul><li><strong>应用层：</strong> 它将上层（<em><strong>5/6/7 层</strong></em> ）并为应用层，是 <strong>在用户层实现</strong> 的，对不同应用协议的封装，核心是通过 <strong>socket</strong> 接口</li><li><strong>TCP/IP及下层：</strong> <strong>是在内核中实现</strong> 的，归操作系统调度，使用者无需关心</li><li><strong>网络接口层：</strong> 将 <strong>数据链路层、物理层</strong> 合并为网络接口层</li></ul><p>这么做也是为了各层之间可以相互独立、每层都有足够的灵活性，并在各层之间完全解耦</p><img src="'+p+'"><img src="'+l+'"><h3 id="_2-1-物理层" tabindex="-1"><a class="header-anchor" href="#_2-1-物理层"><span>2.1 物理层</span></a></h3><p><strong>物理层：</strong> 连接不同的物理设备，传输 <span style="color:blue;"><strong>0/1 比特流（<em>流式传输</em> ）</strong></span> ，该层为上层协议提供了一个 <strong>传输数据可靠的物理媒体</strong></p><p>最早，计算机间的通信，和打电话通信的原理一致</p><ol><li><strong>底层需要建立物理链接：</strong> 如 电话线 &gt; 网线、路由器等等</li><li><strong>点到点的通信：</strong> 如电话的一端，通过电话线，连通另一端</li></ol><p>此时，会发现，一旦通信变多，类似电话通信的机制，非常消耗线路资源，于是诞生了中间设备</p><h4 id="物理设备" tabindex="-1"><a class="header-anchor" href="#物理设备"><span><strong>物理设备</strong></span></a></h4><p><strong>双绞线：</strong> 简单认为 <strong>家用网线</strong>，将两个单独的绝缘导线，按不同标准缠绕，减少磁效应和外部的干扰信号</p><p><strong>中继器（<em>Repeater</em>）：</strong> 连接网络线路的装置，用于两个节点间物理信号的双向转发工作，为 <strong>解决 转发 线路上的 损耗问题</strong> 而诞生的，内部工作原理即 <strong>信号放大器</strong> 使信号传的更远</p><img src="'+h+'"><p><strong>集线器（<em>Hub</em>）：</strong> 多端口中继器，可以整合两头物理线路资源的 <strong>黑盒子</strong>，并以 <strong>广播的形式</strong> 转发到目标端，<strong>半双工（<em>不能隔离冲突域及广播域</em> ）</strong>，解决 <strong>同一局域网 多机互联</strong> 的问题</p><img src="'+c+'"><div class="hint-container tip"><p class="hint-container-title">集线器硬件解析流程</p><p>集线器是连接 <strong>N 台通信设备</strong> ，无脑将数据 <strong>复制 N 份广播</strong>，内部从网口经过中继电路会转发到 <strong>PHY</strong> 模块（<em>用来统一传输通用格式，想象成翻译</em> ）然后以电信号 <strong>BCD</strong> 网口的格式传入各各连接网口</p><p><strong>传输：</strong> 会受到噪声干扰，导致信号形变出错，但出错也依然 <strong>原封不动</strong> 的广播（<em>无纠错</em> ），故会有如上信号放大器（<em><strong>中继器</strong></em> ）诞生，也会有如下链路层 <strong>MAC</strong> 报文头末尾的 <strong>FCS（<em>存放 CRC 冗余校验</em> ）字段</strong> 进行纠错</p></div><h4 id="其他概念" tabindex="-1"><a class="header-anchor" href="#其他概念"><span><strong>其他概念</strong></span></a></h4><p><strong>信道：</strong> 只一个方向传输信息的媒体，一条通信电路包含一个 <strong>发送信道</strong> 和一个 <strong>接收信道</strong></p><ul><li><strong>单工：</strong> 只能一个方向通信，没有反方向反馈的信道</li><li><strong>半双工：</strong> 双方都可以发送和接受信息，但 <strong>不能同时</strong> 发送也不能同时接收</li><li><strong>全双工：</strong> 双方都可以 <strong>同时发送和接收</strong></li></ul><p><strong>协议：</strong> 互联网间的 <strong>通信</strong> 也需要有 <strong>标准（<em>规则</em> ）</strong>，双方才能 “听懂”，因此该标准即是协议</p><h3 id="_2-2-数据链路层" tabindex="-1"><a class="header-anchor" href="#_2-2-数据链路层"><span>2.2 数据链路层</span></a></h3><p>物理层基础上提供的服务，任务就是将网络层过来的数据，能够 <strong>可靠的传输到目标网络层</strong> ，即数据链路层 <strong>在不可靠的物理介质上，提供了可靠的传输</strong></p><p>因此它需要解决如下问题：<strong>物理地址寻址、数据的成帧、流量控制、数据的检错、重发</strong></p><h4 id="数据成帧" tabindex="-1"><a class="header-anchor" href="#数据成帧"><span><strong>数据成帧</strong></span></a></h4><p><mark><strong>帧</strong></mark>，是数据链路层的基本单位</p><img src="'+d+`"><h4 id="数据检错" tabindex="-1"><a class="header-anchor" href="#数据检错"><span><strong>数据检错</strong></span></a></h4><ol><li><strong>奇偶校验码：</strong> 当出错两位时，检测不到错误</li><li><strong>循环冗余检验码（<em>CRC</em> ）：</strong> 根据传输或保存的数据产生固定位数的校验码</li></ol><h4 id="最大传输单元mtu" tabindex="-1"><a class="header-anchor" href="#最大传输单元mtu"><span><strong>最大传输单元MTU</strong></span></a></h4><p><strong>MTU（<em>Maximum Transmission Unit</em>）：</strong> 数据帧不是无限大的，长度受 <strong>MTU</strong> 限制</p><ul><li><strong>路径 MTU：</strong> 由链路中 <strong>MTU</strong> 的最小值决定</li></ul><div class="hint-container tip"><p class="hint-container-title">关于速率</p><p>如万兆光纤网卡，使用 <strong>iperf3</strong> 测速时，经常发现速率达到 <strong>9.3 Gbit/sec</strong> 左右，未能跑满，这就是由于缺省网卡的设定中，<strong>MTU</strong> 为 <strong>1500</strong>，即一个 <strong>IP</strong> 包大小为 <strong>1500</strong>，这对于万兆网来说包太小，数量更多，其头部数据会消耗大量的带宽，因此可以将 <strong>MTU</strong> 设置为 <strong>9000</strong></p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ifconfig</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> eth1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mtu</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 9000</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> iperf3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> iperf3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -t10</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -c</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 172.16.120.253</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时多半会发现速率可几乎跑满带宽为 <strong>9.9Gbits/sec</strong> 左右，此后性能瓶颈多半会出现与磁盘 <strong>IO</strong></p></div><h4 id="物理设备-1" tabindex="-1"><a class="header-anchor" href="#物理设备-1"><span><strong>物理设备</strong></span></a></h4><ul><li><p><strong>网桥（<em>Bridge</em>）：</strong> 也称桥接器，<strong>两端口</strong>，连接 <strong>两个</strong> 局域网的 <strong>存储/转发 桥梁（<em>设备</em>）</strong> ，基于 <strong>MAC</strong> 地址转发，将输入与输出桥接，与 <strong>集线器 （<em>hub</em>）</strong> 的区别在于会过滤 <strong>MAC</strong> ，作用是拓展网络距离、在各种传输介质中转发数据信号</p><img src="`+m+'"></li><li><p><strong>以太网交换机（<em>Switch 二层交换机</em>）：</strong> 早期的交换机可看做多个 <strong>Bridge</strong> 的集成设备（<em><strong>多端口网桥</strong></em> ） ，即添加了 <strong>MAC</strong> 地址学习功能的设备，系统内部集成了 <strong>动态查找表</strong> ，若 <strong>MAC</strong> 不在查找表中，则会加入记录，并将数据帧发送给目的端口，<strong>其消息传递是 转发，无需广播</strong></p><img src="'+k+'"><div class="hint-container tip"><p class="hint-container-title">交换机硬件解析流程</p><p>其内部结构和集线器类似，<strong>消息以电信号的形式从网口进入</strong>，也是通过 <strong>PHY</strong> 转成通用格式的电信号，由于交换机多了 <strong>MAC</strong> 模块 ，其作用是将<strong>电信号 转为 数字信号</strong>，就能提取 <strong>MAC</strong> 包头，然后通过上文所述的 <strong>FCS 校验</strong> 包有无问题，若没有，则将数据放入 <strong>内存缓冲区</strong>，否则 <strong>丢弃</strong></p><blockquote><p>交换机的 <strong>MAC模块 没有 MAC地址</strong> ，因此其端口不核对接收方 <strong>MAC</strong> 地址，而是直接将所有包接收并存入缓冲区，然后 <strong>查表、转发</strong> ，详细流程见下</p></blockquote></div></li><li><p><strong>网卡（<em>Network Interface Card</em>）：</strong> 也叫 <strong>NIC</strong> 卡，是一种允许计算机网络连接的硬件设备</p></li></ul><h4 id="以太网协议" tabindex="-1"><a class="header-anchor" href="#以太网协议"><span><strong>以太网协议</strong></span></a></h4><img src="'+A+'"><p><strong>MAC地址：</strong> 每一个设备都有唯一的 <strong>MAC 地址</strong>，共 <strong>16进制 的 48 位 长度为 <code>6 * 8bit = 6bytes</code> 即 6个字节，用 - 或 : 连接</strong>，它具有唯一性的对应每个网络适配器，其广播地址为 <strong>FF-FF-FF-FF-FF-FF</strong></p><p><strong>局域网：</strong> <strong>Ethernet</strong> 以太网 <strong>IEEE802.3</strong></p><ul><li>以太网第一个广泛部署的高速局域网</li><li>以太网数据速率快</li><li>以太网硬件价格便宜，网络造价成本低</li></ul><p><strong>以太网协议：</strong> 是种广泛的局域网技术，用于完成相邻设备的 <strong>数据帧</strong> 传输，其包含 <strong>源/目的 地址</strong> 如下</p><img src="'+P+'"><p><strong>以太网帧结构：</strong></p><ul><li><strong>类型：</strong> 标识上层协议（<em><strong>2</strong>字节，后续同图</em> ）</li><li><strong>源/目的地址：</strong> 即通信双方的 <strong>MAC 地址</strong></li><li><strong>数据：</strong> 封装的上层协议的分组</li><li><strong>CRC：</strong> 循环冗余码</li><li><strong>以太网最短帧：</strong> 为 <strong>64 个字节</strong> ，数据部分 <strong>18</strong> 个固定字节 <strong>+</strong> 数据最短 <strong>46</strong> 个字节</li></ul><p><strong>MAC 模块：</strong></p><p>消息是以 <strong>光/电信号</strong> 的形式从网口进入，到了 <strong>PHY</strong> 会转成通用格式的电信号，<strong>MAC模块</strong> 的作用就是将 <strong>电信号转为数字信号</strong> ，这样就能提取出 <strong>MAC</strong> 包头，并通过 <strong>MAC</strong> 数据帧末尾的 <strong>FCS</strong> 校验包有无问题</p><h4 id="交换机传输流程" tabindex="-1"><a class="header-anchor" href="#交换机传输流程"><span><strong>交换机传输流程</strong></span></a></h4><img src="'+C+'"><h5 id="主机a-向-主机b-发送流程" tabindex="-1"><a class="header-anchor" href="#主机a-向-主机b-发送流程"><span><strong>主机A 向 主机B 发送流程：</strong></span></a></h5><ul><li><strong>A</strong> 准备向 <strong>B</strong> 发送消息，先会把 <strong>B</strong> 的 <strong>MAC</strong> 地址和要发送的数据写入以太网协议的帧里，顺着网线发出</li><li>交换机从端口收到数据，会拆帧将 <strong>源 和 目的 MAC 地址提取</strong> 出来，和 <strong>MAC</strong> 地址表进行对比</li><li>发现表中 <strong>B</strong> 的 <strong>MAC</strong> 地址在 <strong>2</strong> 号端口，则将数据封帧再转发给 <strong>2</strong> 号端口</li><li>随后 <strong>主机B</strong> 从网线接收到来自交换机 <strong>2</strong> 号端口的数据</li></ul><h5 id="特殊情况" tabindex="-1"><a class="header-anchor" href="#特殊情况"><span><strong>特殊情况：</strong></span></a></h5><p><strong>情况一：</strong> 交换机查询地址表时，发现目的 <strong>MAC</strong> 地址的目标端口和包的源端口一致，此时会 <strong>直接丢弃这个包</strong> ，过程如下图</p><img src="'+u+'"><ul><li>此时 <strong>主机A</strong> 和 <strong>主机B</strong> 是通过集线器连接的，集线器再接入交换机，此时消息会经过集线器广播到 <strong>主机B</strong> 和 <strong>交换机</strong></li><li><strong>B</strong> 通过广播收到 <strong>A</strong> 的消息</li><li>交换机从 <strong>1</strong> 号端口拆包查表，发现是同一端口，若不丢弃，则 <strong>B</strong> 会收到 <strong>A</strong> 同样消息两次</li></ul><p><strong>情况二：</strong> 地址表中查无此设备，如下几种情况</p><ul><li>具有该地址的设备，从未向交换机发送过包，故交换机无记录端口号</li><li>该设备一段时间没有工作，被交换机从地址表中删除</li></ul><p>此时，交换机无法判断该包应该转发至那个端口，则会和集线器一样处理，<strong>进行广播</strong>，发送包后目标会进行响应，只要返回响应包，交换机就会 <strong>重新写入地址表</strong></p><h3 id="_2-3-网络层" tabindex="-1"><a class="header-anchor" href="#_2-3-网络层"><span>2.3 网络层</span></a></h3><p>其目的是实现 <strong>两个端系统之间的数据透明传送</strong>，具体功能包括 <strong>寻址 和 路由选择、连接的建立、保持和终止等</strong></p><ol><li><p>网络层负责对子网间的数据包进行路由选择，此外，网络层还可以实现 <strong>拥塞控制</strong>、<strong>网际互连</strong> 等功能</p></li><li><p>基本数据单位为 <strong>IP数据报（<em>报文</em> ）</strong></p></li><li><p>其实现了数据交换，即 <strong>报文交换</strong> （<em>基本上被分组所替代</em> ）采用 <strong>储存转发</strong> 方式</p></li></ol><h4 id="物理设备-2" tabindex="-1"><a class="header-anchor" href="#物理设备-2"><span><strong>物理设备</strong></span></a></h4><ul><li><p><strong>路由器：</strong> <strong>IP</strong> 地址转发的设备，<strong>“三层交换机”</strong>， 家中常见的网络设备，通过网段的方式定位要将消息转发到哪儿，无需像 <strong>二层交换机</strong> 那样记录 <strong>MAC</strong> 地址</p><img src="'+I+'"></li></ul><p><strong>网关（<em>Gateway</em>）：</strong> 网关不只具体的特定设备，而是 <strong>连接不同网络</strong> 的设备都具备网关意义，即 <strong>网络信息达到网关，可被重加工</strong> ，因此路由器也可以实现网关功能，但不仅仅能实现网关，网关也不仅被路由器实现</p><img src="'+F+'"><div class="hint-container info"><p class="hint-container-title">关于Mbps 和 MB/s</p><p><strong>MB/s：</strong> 这个是 <strong>网络吞吐量</strong> 的非标准单位，之所以常用是因为文件大小通常以 <strong>KB、MB</strong> 来表示</p><p><strong>MB和MiB：</strong> <strong>MB</strong> 是 <strong>10</strong> 进制的，即 <strong>1MB = 1000KB</strong> （<em>日常</em> ），<strong>MiB</strong> 是 <strong>2</strong> 进制的 <strong>1MiB = 1024KiB</strong></p><p><strong>Mbps（<em>Million bits per second</em>）：</strong> 意为传输 <strong>1,000,000</strong> 百万位（<em>比特</em> ）=每= =秒=，网络是比特流的传输，是路由器和交换机等网络设备的带宽测量标准</p><p>所以万兆网换算 <strong>MB/s：</strong> 则 <strong>10000 Mbps = 1250 MB/s</strong> ，<strong>3000Mbps</strong> 理论上限 <strong>375MB/s</strong></p><p>若换算成 <strong>MiB/s：</strong> 则 <strong>10000 Mbps ÷ 8 = 1250 MB/s = 1, 250, 000, 000 bit/s</strong></p><p>再转为 <strong>2</strong> 进制，即 <strong>1, 250, 000, 000 ÷ 1024 ÷ 1024 = 1192 MiB/s</strong></p></div><h4 id="网络层协议" tabindex="-1"><a class="header-anchor" href="#网络层协议"><span>网络层协议</span></a></h4><img src="'+E+'"><p>路由选择协议</p><p>分为两大类：</p><p>自治系统内部的路由选择：RIP 和 OSPF</p><p>自治系统间的路由选择：BGP</p><h4 id="ip协议" tabindex="-1"><a class="header-anchor" href="#ip协议"><span>IP协议</span></a></h4><p><strong>IP协议（<em>Internet Protocol</em> ）因特网互联协议：</strong> 网络层最核心的协议，它把复杂的实际网络，变为一个 <strong>虚拟互联的网络</strong>，并解决了在虚拟网络中 <strong>数据报传输路径的问题</strong>，即使仅提供了 <strong>不可靠、无连接</strong> 的传送服务，主要功能有：<strong>无连接数据报传输</strong>、<strong>数据报路由选择和差错控制</strong></p><p><strong>IPv4：</strong> 该协议其最核心的就是 <strong>源/目的 IP 地址</strong> ，其表现形式为点分十进制**（<em>v4</em>）**，并结合子网掩码来划分区域，如下</p><img src="'+t+'"><ul><li><strong>子网掩码：</strong> 其尾缀 <strong>/24</strong> 即为 <strong>3</strong> 个 <strong>8位</strong> 补全<strong>1</strong>，即 <strong>255.255.255.0</strong> ，它会认为 <strong>192.168.0.x</strong> 上的 <strong>IP</strong> 都属于 <strong>一个局域网</strong> ，这 <strong>十分重要（<em>如：高可用 IP 漂移时，不指定掩码也许会带来灾难</em> ）</strong></li></ul><p><strong>数据报格式：</strong> 其格式如下</p><img src="'+r+'"><ul><li><strong>版本：</strong> 为 <strong>v4/6</strong> 协议版本</li><li><strong>首部长度：</strong> 表示 <strong>IP首部</strong> 的长度，最值 <strong>15</strong></li><li><strong>总长度：</strong> 表示 <strong>IP 数据报</strong> 总长度，最值 <strong>65535</strong></li><li><strong>TTL：</strong> 生存时间， <strong>IP数据报</strong> 在网络中的寿命</li><li><strong>协议：</strong> 即 <strong>上层协议</strong>，表明 <strong>IP数据</strong> 所携带的具体数据是什么协议 <strong>（<em>TCP、UDP</em>）</strong></li></ul><div class="hint-container note"><p class="hint-container-title">配套协议</p><p>光有 <strong>IP协议</strong> 是不够的，与 <strong>IP协议</strong> 配套使用实现其功能的还有 <strong>地址解析协议ARP、逆地址解析协议RARP、因特网报文协议ICMP、因特网组管理协议IGMP</strong></p></div><h4 id="r-arp协议" tabindex="-1"><a class="header-anchor" href="#r-arp协议"><span><strong>R/ARP协议</strong></span></a></h4><p><strong>R/ARP（<em>Reverse/Address Resolution Protocal</em>）逆/地址解析协议：</strong> 用于将 <strong>网卡</strong>（<em>网络适配器</em> ）的 <strong>IP（<em>32位地址</em> ）</strong> 解析为以太网 <strong>MAC（<em>48位地址</em> ）</strong> 的协议（<em>提供动态映射</em> ），逆解析即反着解析为 <strong>IP</strong></p><p>在局域网中，当 <strong>主机 A</strong> 有数据要发送给 <strong>主机 B</strong> 时，仅有IP地址是不够的，还需要将 <strong>IP 数据报文</strong> 在数据链路层 <strong>封装成帧</strong> 才能通过物理网络发送，发送端必须有接收端的 <strong>MAC</strong> 地址，因此需要一个从 <strong>IP 地址</strong> 到 <strong>MAC 地址</strong> 的 <strong>映射</strong>，即 <strong>ARP</strong></p><img src="'+B+'"><h5 id="arp过程" tabindex="-1"><a class="header-anchor" href="#arp过程"><span><strong>ARP过程</strong></span></a></h5><ul><li><strong>主机A</strong> 查本地 <strong>ARP 表</strong> 发现 <strong>主机B</strong> 的 <strong>IP</strong> 和 <strong>MAC</strong> 映射关系不存在</li><li><strong>主机A</strong> 通过 <strong>ARP 广播</strong> 的形式向局域网发出消息，询问某 <strong>IP</strong> 对应的 <strong>MAC</strong> 地址是多少 <ul><li>比如 <strong>主机A</strong> 此时知道 <strong>主机B</strong> 的 <strong>IP</strong>，但并不知道 <strong>主机B</strong> 的 <strong>MAC地址</strong> 是多少，就尝试在局域网内发起 <strong>ARP广播</strong>，询问局域网下所有机器，<strong>哪个机器的IP</strong> 与 <strong>主机B 的 IP 一致</strong></li></ul></li><li><strong>主机B</strong> 收到这个 <strong>ARP 消息</strong> ，发现 <strong>主机A</strong> 要问的 <strong>IP</strong> 与自己的 <strong>IP</strong> 一致，就会 <strong>把 自己的 MAC 地址 作为应答</strong> 返回给 <strong>主机A</strong></li><li>此时 <strong>主机A</strong> 就知道了 <strong>主机B</strong> 的 <strong>MAC 地址</strong>，顺便把消息 <strong>记录到本地 ARP 表</strong> 里，下次直接调表里的关系即可，无需再广播</li></ul><p>之后即是从数据链路层到物理层，把数据转为 <strong>0/1 的比特流</strong></p><div class="hint-container info"><p class="hint-container-title">即插即用</p><p>由于 <strong>ARP</strong> 是即插即用的，其 <strong>ARP 表</strong> 是自动建立的，无需系统管理员来配置</p><p>因此在 <strong>NAS 高可用 IP 漂移（<em>频繁改变 IP</em> ）后</strong> ，需要手动执行 <strong>ARP</strong> 命令，来帮助各网络设备自动更新 <strong>ARP 映射关系</strong></p><img src="'+b+`"></div><h4 id="icmp协议" tabindex="-1"><a class="header-anchor" href="#icmp协议"><span><strong>ICMP协议</strong></span></a></h4><p><strong>ICMP（<em>Internet Control Message Protocol</em> ）因特网控制报文协议：</strong></p><pre><code>        每层运行常见物理设备：
            传输层     ————&gt;   四层交换机、四层路由器
</code></pre><p>​<br> ​<br> ​ 2.3 tcp/ip五层模型讲解：<br> ​ 我们将应用层，表示层，会话层并作应用层，从tcp／ip五层协议的角度来阐述每层的由来与功能，搞清楚了每层的主要协议<br> ​<br> ​ 就理解了整个互联网通信的原理。<br> ​<br> 首先，用户感知到的只是最上面一层应用层，自上而下每层都依赖于下一层，所以我们从最下一层开始切入，比较好理解</p><pre><code>        每层都运行特定的协议，越往上越靠近用户，越往下越靠近硬件

        2.3.1 物理层：
            物理层由来：上面提到，孤立的计算机之间要想一起玩，就必须接入internet，言外之意就是计算机之间必须完成组网

            物理层功能：主要是基于电器特性发送高低电压(电信号)，高电压对应数字1，低电压对应数字0

        2.3.2 数据链路层：
            数据链路层由来：单纯的电信号0和1没有任何意义，必须规定电信号多少位一组，每组什么意思

            数据链路层的功能：定义了电信号的分组方式

            以太网协议：
                早期的时候各个公司都有自己的分组方式，后来形成了统一的标准，即以太网协议ethernet

            ethernet规定

            一组电信号构成一个数据包，叫做‘帧’（根据以太网协议）
            每一数据帧分成：报头head和数据data两部分
                   head	                       data

            head包含：(固定18个字节)（以太网头）
                发送者／源地址，6个字节 （源mac）
                接收者／目标地址，6个字节 （目标mac）
                数据类型，6个字节 （data）

            data包含：(最短46字节，最长1500字节)

            数据包的具体内容
            head长度＋data长度＝最短64字节，最长1518字节，超过最大限制就分片发送

            mac地址：
                出厂时定义死的，你不能改 mac地址：每块网卡出厂时都被烧制上一个世界唯一的mac地址，长度为48位2进制，通常由12位16进
                制数表示（前六位是厂商编号，后六位是流水线号）————身份证
                那么为什么要48位呢？————————字节：即6个字节   在python中ord()可以查看对应的ASCII码
                48位表示趋于无尽的扩展，位数越多代表的变换越多，保证流水线独一无二

            广播：
                有了mac地址，同一网络内的两台主机就可以通信了（一台主机通过arp协议(ip层的mac层的是以太协议)获取另外一台主机的mac地址）
                ethernet采用最原始的方式，广播的方式进行通信，即计算机通信基本靠吼

                也就是说，先告诉所有人我是快递员，我找Igarashi，有他的快递。源地址：快递员、目标地址：Igarashi、数据：有他的快递
                其他人拿到数据报进行分析、丢弃，Igarashi分析接收

        2.3.3 网络层:
            网络层由来：有了ethernet、mac地址、广播的发送方式，世界上的计算机就可以彼此通信了，问题是世界范围的互联网是由
            一个个彼此隔离的小的局域网组成的，那么如果所有的通信都采用以太网的广播方式，那么一台机器发送的包全世界都会收到，
            这就不仅仅是效率低的问题了，这会是一种灾难

            因此，就必须找出一种方法来区分哪些计算机属于同一广播域，哪些不是，如果是就采用广播的方式发送，如果不是，就采用路由的方式
            （向不同广播域／子网分发数据包），mac地址是无法区分的，它只跟厂商有关

            网络层功能：引入一套新的地址用来区分不同的广播域／子网，这套地址即网络地址

        IP协议：
            规定网络地址的协议叫ip协议，它定义的地址称之为ip地址，广泛采用的v4版本即ipv4，它规定网络地址由32位2进制表示
            范围0.0.0.0-255.255.255.255
            一个ip地址通常写成四段十进制数(每一段八位)，例：172.16.10.1
            利用bin()将点分十进制的每一段转化为二进制数据

        ip地址分成两部分：
            网络部分：标识子网
            主机部分：标识主机
            注意：单纯的ip地址段只是标识了ip地址的种类，从网络部分或主机部分都无法辨识一个ip所处的子网

            例：172.16.10.1与172.16.10.2并不能确定二者处于同一子网

        子网掩码：
            就是划分那几位是网络部分（网段），那几位是主机部分。规定网络部分为1，主机部分为0

            比如，已知IP地址172.16.10.1和172.16.10.2的子网掩码都是255.255.255.0，请问它们是否在同一个子网络？两者与子网掩码分别进行AND运算，
            172.16.10.1：10101100.00010000.00001010.000000001
            255.255.255.0:11111111.11111111.11111111.00000000
            AND运算得网络地址结果：10101100.00010000.00001010.000000001-&gt;172.16.10.0

            172.16.10.2：10101100.00010000.00001010.000000010
            255.255.255.0:11111111.11111111.11111111.00000000
            AND运算得网络地址结果：10101100.00010000.00001010.000000010-&gt;172.16.10.2

            结果都是172.16.10.0，因此它们在同一个子网络。
        总结一下，IP协议的作用主要有两个，一个是为每一台计算机分配IP地址，另一个是确定哪些地址在同一个子网络。

        ip数据包：
            ip数据包也分为head和data部分，无须为ip包定义单独的栏位，直接放入以太网包的data部分
            head：长度为20到60字节

            data：最长为65,515字节。

            而以太网数据包的”数据”部分，最长只有1500字节。因此，如果IP数据包超过了1500字节，它就需要分割成几个以太网数据包，分开发送了。

            以太网头   	            ip 头 	                                   ip数据
            （以太网头就是之前含源和目的mac的head）
        ARP协议：
            arp协议由来：计算机通信基本靠吼，即广播的方式，所有上层的包到最后都要封装上以太网头，然后通过以太网协议发送，在谈及以
            太网协议时候，我门了解到：
                通信是基于mac的广播方式实现，计算机在发包时，获取自身的mac是容易的，如何获取目标主机的mac，就需要通过arp协议

            例如：主机172.16.10.10/24访问172.16.10.11/24

            执行过程：
                1.网络层先计算它们的网络地址，得出的地址是172.16.10.0(证明它们在同一个网段里面，即同一广播域)。
                2.第一次发包，先用arp封装。arp封装格式:[有自己的mac，目标mac不知道就用广播喊一下，有自己的ip和目标的ip（这是发包之前就肯定
                    知道的，你不知道发给谁，那还发什么包？），还有封装好的数据]
                3.广播发送给在这个网段下的所有人，之后它们接收并拆包。当拆到FFF时它们就知道了是来要自己的mac地址的，但是给不给呢，它们便向下读
                    读到ip地址，当看到目标地址是11时知道是给自己的，便把自己的mac地址写入目标mac中（回给他）
                4.此时回给它的这个数据包就利用以太网广播出去啦。重复2、3 源主机得到后把之前FFF的mac地址再重新替换为目标mac
                ##之后两台主机就可以正常发包啦

            若两台主机不再同一网段（跨网络通信）则底层光吼没有用啊（在隔壁教室），此时就要借助网关。
                网关：负责跨网络通信，发包的。配置到本地的配置死的，貌似通常254结尾。

            执行过程：
                1.因此需要找网关的mac地址。
                2.网关识别ip的网关是否对应自己的网关。
                3.对应后把网关的mac地址返回给发送端，此时的发送端改目的mac就是返回的网关mac
                4.之后每次数据包发送给网关，网关接收后再在网段里进行上面的转发
            *：网关不是路由，网关之间的通信工具才是路由

            arp协议功能：广播的方式发送数据包，获取目标主机的mac地址

            协议工作方式：每台主机ip都是已知的

            一：首先通过ip地址和子网掩码区分出自己所处的子网
            场景      	数据包地址
            同一子网	    目标主机mac，目标主机ip
            不同子网    	网关mac，目标主机ip

            二：分析172.16.10.10/24与172.16.10.11/24处于同一网络(如果不是同一网络，那么下表中目标ip为172.16.10.1,通过arp获取的是网关的mac)

                        源mac	    目标mac	            源ip         	 目标ip	            数据部分
            发送端主机	发送端mac	FF:FF:FF:FF:FF:FF	172.16.10.10/24	 172.16.10.11/24	数据

            三：这个包会以广播的方式在发送端所处的自网内传输，所有主机接收后拆开包，发现目标ip为自己的，就响应，返回自己的mac

            ##Tips：假设两台交换机处于不同网段，一堆计算机通过交换机连接起来（这堆计算机在一个网段中，吼也是靠交换机吼），交换机通过路
                由器进行转发（路由器即是桥梁），不然不同网段下（子网划分的）是不能像直连那样进行通信的


        ICMP协议：
            （Internet Control Message Protocol）Internet控制报文协议。它是TCP/IP协议簇的一个子协议，
            用于在IP主机、路由器之间传递控制消息。控制消息是指网络通不通、主机是否可达、路由是否可用等网络本身的消息。
            这些控制消息虽然并不传输用户数据，但是对于用户数据的传递起着重要的作用。

            1.使用场景
                - 我们经常使用的用于检查网络通不通的Ping命令的过程，实际上就是ICMP协议工作的过程
                - 路由分析诊断程序 tracert 使用了 ICMP时间超过报文。tracert 命令主要用来显示数据包到达目的主机所经过的路径。
                  通过执行一个 tracert 到对方主机的命令，返回数据包到达目的主机所经历的路径详细信息，并显示每个路径所消耗的时间。


            2.ICMP攻击与抵御方法：
                可以利用操作系统规定的ICMP数据包最大尺寸不超过64KB这一规定，向主机发起“Ping of Death”（死亡之Ping）攻击。
                如果ICMP数据包的尺寸超过64KB上限时，主机就会出现内存分配错误，导致TCP/IP堆栈崩溃，致使主机死机。

                对于“Ping of Death”攻击，可以采取两种方法进行防范：
                第一种：方法是在路由器上对ICMP数据包进行带宽限制，将ICMP占用的带宽控制在一定的范围内，这样即使有ICMP攻击，
                    它所占用的带宽也是非常有限的，对整个网络的影响非常少；

                第二种：方法就是在主机上设置ICMP数据包的处理规则，最好是设定拒绝所有的ICMP数据包。（安装防火墙）


    2.3.4 传输层:
        传输层的由来：1.网络层的ip：帮我们区分子网。2.以太网层的mac帮我们找到具体那一台主机。然后大家使用的都是应用程序，你的电脑上可能同时开启
        qq，暴风影音，等多个应用程序，（也就是说前两层撑死只能帮我们在不同子网下定位到某一主机，若想要Wechat之类的则需要传输层）

        那么我们通过ip和mac找到了一台特定的主机，如何标识这台主机上的应用程序，答案就是端口，端口即应用程序与网卡关联的编号。

        端口是个啥：
            假设现在有两台机器，两台机器都要有网卡（在linux下通常叫eth0[ethernet：以太网协议0]）网卡走的是以太网。
            端口范围0-65535，0-1023为系统占用端口（因此传输层都是基于端口的）。后面的就是各个应用程序的唯一的编号，这个编号做的事就是和网卡
            绑定起来了（网卡会绑定一堆端口号）因此开启的每一个程序在网卡上都有自己唯一的一个端口号。因此左边机器上通过端口号发到右边机器的对
            应端口号既可以实现两个应用之间的通信。那么源端口和目的端口是谁负责的？————传输层

        传输层功能：建立端口到端口的通信（规定：一个端口号标识一台机器上的一个网络服务）

        （若有两个应用端口号相同，则会产生冲突，必定有一个应用启动不了，毕竟只到65535，这台机器上只能有一个程序去占用这个端口）
        不拿QQ举例了（不同于两台主机通信），因为QQ有服务器，所有的QQ软件都是客户端，全都连到了腾讯的服务端去了（因此只要服务端没改端口就没问题）

        tcp协议：
            可靠传输，TCP数据包没有长度限制，理论上可以无限长，但是为了保证网络的效率，通常TCP数据包的长度不会超过IP数据包的
            长度，以确保单个TCP数据包不必再分割。（面向连接的，需要应答，稳定）

            以太网头	    ip头              	tcp头              	数据

            tcp报文：
                头（TCP首部）：源端口和目标端口（占32位，后同以&quot;|&quot;分割）
                序号（此包的ID号）|
                确认号（对方包序号+1，左边计算机收到右边的包+1的确认号了便确认了确实收到自己刚刚发的包了，基于之前报的基础之上的响应操作）|
                数据偏移（告诉计算机哪一位代表什么，从&quot;头&quot;数多少位才到数据部分）
                保留位（留着TCP协议扩展来用的）
                六个标志位（确定包的一个状态，或是功能，通常需掌握三个SYN：为1时请求发起新连接、ACK：代表确认[通常左边发起时SYN为1 右边
                    回ACK为1连接就建立了，一个请求一个相应]、FIN：请求断开连接[与前同]）
                窗口（规定发时按多大尺寸发）|
                校验和（哈希校验 防止篡改）
                紧急指针（URE为1，此包会被优先处理）|
                选项和填充（不管）|数据（不管）|

            以上就是TCP的报文结构

            tcp三次握手和四次挥手：（链接是双向建立的）
                1.左边发一个包过来，此时syn = 1 seq（序列号）= x
                2.右边收到以后相应这个包，回应一个ack = 1（ack就是等于1，同意建立连接，但通常也会给它加一个x，为了让左边明白发的包确实收到了）
                3.右边再发一个syn = 1 seq = y
                4.左边接收再ack = 1 + y（再加个y）
                此时是四次握手，然而2、3次握手时右边响应了一个请求，不喘气又发起了一个新的连接，多不多余？非常多余，因此2、3合并，一次即可
                2、3：响应的同时发起一个新的连接，ack = 1+x syn = 1 seq = y

                左边即是客户端：开始时即SYN_SENT状态（connect()）。然后右边即服务端：接收前为监听LISTEN 状态（listen()）,并回复SYN_RCVD。
                客户端收到后为ESTABLISHED（建立成功）状态，在发给服务端。随后服务端收到也为ESTABLISHED（建立成功）状态。

                1.之后数据传输：客户端write（写）状态seq = x+1 ack = y+1
                2.服务端read（读）状态ack = x+2

                断链接四次挥手：（左边的没法决定右边断不断，左边只能决定左边和右边的断，不能决定右边是否和左边断，双向！）
                1.客户端发送fin = 1 seq = x+2 ack = y+1 ————FIN_WAIT1（close()）状态
                2.服务器收到后响应 ack = 1  （ack = x+3）——————CLOSE_WAIT、客户端变为FIN_WAIT2
                3.服务器发送 fin = 1  seq = y+1         ——————LAST_ACK（close()）状态
                4.客户端接收后响应 ack = 1  （ack = y+2）——————TIME_WAIT
                为什么建立建立用三次，而断开连接用四次呢？
                    因为TCP在建立连接（三次握手）之前没有数据再传，为了节省效率4步并作3步，把通路先建好。但是若用三次握手的方式去断
                    会有什么效果？客户端发一个fin，服务端收到响应ack同时在发送fin。看似没错，但左边发完了的时候，右边一定发完数据了么，
                    没有。因此需要等右边发完了数据给客户端后，服务器再开始断开连接。所以断开链接一定要用四次

                    数据通道是两条双向的，客户端说我不想和你通信了，然后把客户端对服务端发送信息的通道关闭了。然后服务端总不能
                    被迫就在回答我知道的时候，就必须和客户端断开连接吧，服务端也是有自主选择权的，会在不想和客户端通信的时候
                    再去告诉客户端，我不和你通信了。而不是被迫再客户端不和服务端通信时，就立即响应自己也不和客户端通信。

            抓包过程：（参考python_RPC.md）
             三次握手：
                 [SYN] Seq=0 Win=8192 Len=0 MSS=65495 WS=256 SACK_PERM=1
                 [SYN, ACK] Seq=0 Ack =1 Win=8192 Len=0 MSS=65495 WS=256 SACK_PERM=1
                 [ACK] Seq=1 ACK=1 Win=8192 Len=0

             socket交互过程：
                 [PSH, ACK] Seq=1 Ack=1 Win=8192 Len=5   （hello）
                 [ACK] Seq=1 Ack=6 Win=7936 Len=0         (win的进程号吗？改变了)
                 [PSH, ACK] Seq=1 Ack=6 Win=7936 Len=5
                 [ACK] Seq=6 Ack=6 Win=7936 Len=0


             四次挥手
                 [FIN, ACK] Seq=6 Ack=6 Win=7936 Len=0
                 [ACK] Seq=6 Ack=7 Win=7936 Len=0
                 [FIN, ACK] Seq=6 Ack=7 Win=7936 Len=0
                 [ACK] Seq=7 Ack=7 Win=7936 Len=0

        udp协议：
            不可靠传输，”报头”部分一共只有8个字节，总长度不超过65,535字节，正好放进一个IP数据包。（无连接的，只负责不停的发）

            以太网头	    ip头                 udp头               数据

       （光这个TCP协议就辣么厚一本书才入门，学个两三年python再一换代，还玩不玩了）因此python有很多库（别人封装好的一大堆接口）因此一调用
            接口就ok了。套接字（Socket抽象层）：就是TCP和UDP的封装。因此只要遵循套接字的规范就相当于遵循了TC/UDP、网络层、链路层的规范了

    2.3.5 应用层:
        应用层由来：用户使用的都是应用程序，均工作于应用层，互联网是开放的，大家都可以开发自己的应用程序，数据多种多样，必须规定好数据的组织形式

        应用层功能：规定应用程序的数据格式。

        例：TCP协议可以为各种各样的程序传递数据，比如Email、WWW、FTP等等。那么，必须有不同协议规定电子邮件、网页、FTP数据的格式，这些
        应用程序协议就构成了&quot;应用层&quot;。

        应用层也有应用头，封装了用户数据。之后把这个（应用层首部+用户数据）封装成应用数据交给第四层协议

    2.3.6 socket:（套接字起源于Unix 即ip地址+端口）
        我们知道两个进程如果需要进行通讯最基本的一个前提能能够唯一的标示一个进程，在本地进程通讯中我们可以使用PID来唯一标示一个进程，但PID只在
        本地唯一，网络中的两个进程PID冲突几率很大，这时候我们需要另辟它径了，我们知道IP层的ip地址可以唯一标示主机，而TCP层协议和端口号可以唯
        一标示主机的一个进程，这样我们可以利用ip地址＋协议＋端口号唯一标示网络中的一个进程。

        能够唯一标识网络中的进程后，它们就可以利用socket进行通信了，什么是socket呢？我们经常把socket翻译为套接字，socket是在应用层和传输
        层之间的一个抽象层，它把TCP/IP层复杂的操作抽象为几个简单的接口供应用层调用已实现进程在网络中通信。


        socket起源于UNIX，在Unix一切皆文件哲学的思想下，socket是一种&quot;打开—读/写—关闭&quot;模式的实现，服务器和客户端各自维护一个&quot;文件&quot;，在建
        立连接打开后，可以向自己文件写入内容供对方读取或者读取对方内容，通讯结束时关闭文件。

三.网络通信实现
    一台机器想上网（实现网络通信）访问网站，需具备四要素：
        本机的IP地址、
        子网掩码、
        网关的IP地址、
        DNS的IP地址

    获取这四要素分两种方式：

    1.静态获取：
        即手动配置（如手动到ipv4，改DNS为114.114.114.114等等）

    2.动态获取：
        通过dhcp（协议）获取：
        以太网头	        ip头	        udp头	    dhcp数据包

        通常有装dhcp软件，负责分配网络信息的。首先它是基于UDP协议的。

        （1）最前面的”以太网标头”，设置发出方（本机）的MAC地址和接收方（DHCP服务器）的MAC地址。前者就是本机网卡的MAC地址，后者这时
            不知道，就填入一个广播地址：FF-FF-FF-FF-FF-FF。

        （2）后面的”IP标头”，设置发出方的IP地址和接收方的IP地址。这时（由于是电脑刚开启还未获取），因此对于这两者，本机都不知道。于
            是，发出方的IP地址就设为0.0.0.0，接收方的IP地址设为255.255.255.255。

        （3）最后的”UDP标头”，设置发出方的端口和接收方的端口。这一部分是DHCP协议规定好的，发出方是68端口，接收方是67端口。（这个是软件定义死的）

        这个数据包构造完成后，就可以发出了。以太网是广播发送，同一个子网络的每台计算机都收到了这个包。因为接收方的MAC地址是
        FF-FF-FF-FF-FF-FF，看不出是发给谁的，所以每台收到这个包的计算机，还必须分析这个包的IP地址，才能确定是不是发给自己的。当
        看到发出方IP地址是0.0.0.0，接收方是255.255.255.255，于是DHCP服务器知道”这个包是发给我的”，而其他计算机就可以丢弃这个包。
        （因为网络当中全是0的你不能用，全是255的也不能用，为什么？就是为了干这个事的）因此只有dhcp响应了

        接下来，DHCP服务器读出这个包的数据内容，分配好IP地址，发送回去一个”DHCP响应”数据包。这个响应包的结构也是类似的，以太网标
        头的MAC地址是双方的网卡地址，IP标头的IP地址是DHCP服务器的IP地址（发出方）和255.255.255.255（接收方），UDP标头的端口是67（发
        出方）和68（接收方），分配给请求端的IP地址和本网络的具体参数则包含在Data部分。

         新加入的计算机收到这个响应包，于是就知道了自己的IP地址、子网掩码、网关地址、DNS服务器等等参数

         还有租约过期时间：因为你申请的IP地址是跟我租的（因为你是一个动态的，每次机器连上网线，ip地址都不是固定的，可能偶尔有段时间
         会固定，因为他有一个租约时间，一旦过期了就又无效了，只能再重新通过dhcp协议申请获取）

    那么dhcp在哪？
        1.可以单独拿一台机器，值台机器上面装好dhcp软件，这个软件里面你定义好一堆地址池， 如172.16.10.2~172.16.10.254这中间这一对地址。
            来人就从这堆地址里面分。
        2.通常网络设备都集成这个功能，平时在家上网，你的ip地址也是动态的，因此肯定会有一个dhcp服务，那么这个dhcp集成在哪里————路由器上，还
            有交换机也分成二层交换机（基于mac地址传输的，工作在数据链路层的————这种特别2B的这种，相当便宜）比较高端的公司用的三层交换机，它
            集成了路由的功能（可以路由转发）。还有四层交换机（基于端口，但很少）

四.网络通信流程：
    大体上经历过程如下：（见网络请求过程.png）
        重定向 → 拉取缓存 → DNS 查询 → 建立 TCP 链接 → 发起请求 → 接收响应 → 处理 HTML 元素 → 元素加载完成
    1.本机获取：
        本机的IP地址：192.168.1.100
        子网掩码：255.255.255.0
        网关的IP地址：192.168.1.1
        DNS的IP地址：8.8.8.8

    2.打开浏览器，想要访问Google，在地址栏输入了网址：www.google.com。
     2.1：浏览器缓存：（见浏览器缓存机制.jpg）
            浏览器在向服务器发起请求前，会先查询本地是否有相同的文件，如果有，就会直接拉取本地缓存，这和我们在后台部属的 Redis
            和 Memcache 等类似，都是起到了中间缓冲的作用。

            在我们进行缓存调试时，需要去除 network 面板顶部的Disable cache 勾选项，否则浏览器将始终不会从缓存中拉取数据。

        &lt;1&gt;内存：
                浏览器默认的缓存是放在内存内的，但我们知道，内存里的缓存会因为进程的结束或者说浏览器的关闭而被清除，而存在硬盘
                里的缓存才能够被长期保留下去。

            在 network 面板中各请求的 size 项里，会看到两种不同的状态：from memory cache 和 from disk cache。
            - from memory cache：
                指缓存来自内存。是浏览器为了加快读取缓存速度而进行的自身的优化行为，不受开发者控制，也不受 HTTP 协议头的约束，
                算是一个黑盒。

                一般脚本、字体、图片会存在内存当中。快速读取，一旦关闭就会清除。

                1.preloader：
                    浏览器的预加载器。打开网页时会预先请求html资源解析。若发现了css、js等资源就调度cpu执行。07年前，多是利用
                    cpu串行解析的，此时网络请求是空闲的，因此出来了perloader（不同浏览器不同）因此在加载的同时，perloader请求
                    下一批待加载的网络资源，放入memory cache。
                2.preload：
                    &lt;link rel=&quot;preload&quot;&gt;，显式的指定预加载资源，也放入memory cache

                memory的机制保证了一个页面若有两个相同的请求，都实际只请求一次，避免浪费。
                memory获取缓存时会忽视例如 max-age=0（不要在下次浏览时使用）, no-cache 等头部配置。这是因为 memory cache
                    只是短期使用，大部分情况生命周期只有一次浏览而已。
                如果站长是真心不想让一个资源进入缓存，就连短期也不行，那就需要使用 no-store。

            - from disk cache：
                指缓存来自硬盘。disk cache 会严格根据 HTTP 头信息中的各类字段 来判定哪些资源可以缓存、哪些资源不可以缓存、哪些
                资源是仍然可用的，哪些资源是过时需要重新请求的。当命中缓存之后，浏览器会从硬盘中读取资源（比网络快）。

                一般非脚本会存在硬盘中，如HTTP协议开头、css、mp4等，因为css样式加载一次即可渲染出网页。
                脚本不在硬盘，是因为加载的IO开销较大，导致浏览器失去响应。（不同浏览器有差异，快慢原因）

            - Service Worker：
                由开发者编写的额外的脚本，可以绕过浏览器判断，自行设置。Chrome 的 F12 中，Application -&gt; Cache Storage找到。
                这个缓存是永久性的。只有手动调用清除api或容量上限才会清空。通过fetch()来获取资源若没有命中走的网络，也会标注
                为 from ServiceWorker。

            优先级：
                Service Worker &gt;  Memory Cache &gt; Disk Cache &gt; 网络请求

        &lt;2&gt;强制缓存：（见8.2 其他响应头）
            强制缓存直接减少请求数，是提升最大的缓存策略。 它的优化覆盖了文章开头提到过的请求数据的全部三个步骤。
            如果考虑使用缓存来优化网页性能的话，强制缓存应该是首先被考虑的。

        &lt;3&gt;对比缓存：
            当强制缓存失效(超过规定时间)时，就需要使用对比缓存，由服务器决定缓存内容是否失效。
            流程：
                1.浏览器先请求缓存数据库，返回一个缓存标识。
                2.浏览器拿这个标识和服务器通讯。
                3.如果缓存未失效，则返回 HTTP 状态码 304 表示继续使用，于是客户端继续使用缓存
                4.如果失效，则返回新的数据和缓存规则，浏览器响应数据后，再把规则写入到缓存数据库。

            对比缓存在请求数上和没有缓存是一致的，但如果是 304 的话，返回的仅仅是一个状态码而已，并没有实际的文件内容，因此
            在响应体体积上的节省是它的优化点。（优化的是响应部分，通过减少响应体体积，来缩短网络传输时间，相比提升幅度较小）

            - Last-Modified &amp; If-Modified-Since：
                1.服务器通过 Last-Modified 字段告知客户端，资源最后一次被修改的时间，例如
                    Last-Modified: Mon, 10 Nov 2018 09:10:11 GMT
                2.浏览器将这个值和内容一起记录在缓存数据库中。
                3.下一次请求相同资源时时，浏览器从自己的缓存中找出“不确定是否过期的”缓存。因此在请求头中将上次的 Last-Modified
                    的值写入到请求头的 If-Modified-Since 字段
                4.服务器会将 If-Modified-Since 的值与 Last-Modified 字段进行对比。如果相等，则表示未修改，响应 304；反之，
                    则表示修改了，响应 200 状态码，并返回数据。
                缺陷：
                    1.如果资源更新的速度是秒以下单位，那么该缓存是不能被使用的，因为它的时间单位最低是秒。
                    2.如果文件是通过服务器动态生成的，那么该方法的更新时间永远是生成的时间，尽管文件可能没有变化，所以起不到缓存的作用。

            - Etag &amp;  If-None-Match：
                Etag为了解决上述缺陷，流程和 Last-Modified 一致。控制缓存存放位置的，不是别人，就是我们在服务器上设置的 Etag 字段。
                资源的内容标识。（不唯一，通常为文件的md5或者一段hash值，只要保证写入和验证时的方法一致即可）
                在浏览器接收到服务器响应后，会检测响应头部（Header），如果有 Etag 字段，那么浏览器就会将本次缓存写入硬盘中。

                Etag 的优先级高于 Last-Modified

        缓存小结：
            1.调用 Service Worker 的 fetch 事件响应
            2.查看 memory cache
            3.查看 disk cache。这里又细分：
            4.如果有强制缓存且未失效，则使用强制缓存，不请求服务器。这时的状态码全部是 200
            5.如果有强制缓存但已失效，使用对比缓存，比较后确定 304 还是 200
            6.发送网络请求，等待网络响应
            7.把响应内容存入 disk cache (如果 HTTP 头信息配置可以存的话)
            8.把响应内容 的引用 存入 memory cache (无视 HTTP 头信息的配置)
            9.把响应内容存入 Service Worker 的 Cache Storage (如果 Service Worker 的脚本调用了 cache.put())


    3.dns协议(基于udp协议)：
        若想在网络上通信，则需要解析域名（用DNS），Domain Name System，专门用来解析域的。实际上是一个翻译者（域名--&gt;ip）
    13台根dns：
        A.root-servers.net198.41.0.4美国
        B.root-servers.net192.228.79.201美国（另支持IPv6）
        C.root-servers.net192.33.4.12法国
        D.root-servers.net128.8.10.90美国
        E.root-servers.net192.203.230.10美国
        F.root-servers.net192.5.5.241美国（另支持IPv6）
        G.root-servers.net192.112.36.4美国
        H.root-servers.net128.63.2.53美国（另支持IPv6）
        I.root-servers.net192.36.148.17瑞典
        J.root-servers.net192.58.128.30美国
        K.root-servers.net193.0.14.129英国（另支持IPv6）
        L.root-servers.net198.32.64.12美国
        M.root-servers.net202.12.27.33日本（另支持IPv6）

        因此若想攻击全世界的网络，只需要攻击DNS根域（DNS攻击事件）一般一个done掉了，其他的也都要done。（现在没人这么干）
        注意：因为dns已经重要到忽略的一个东西。没有它就上不了网，除非能记住全世界的网址，那么你就成为一个dns了

    域名定义：http://jingyan.baidu.com/article/1974b289a649daf4b1f774cb.html
    uri地址：https://github.com/IgarashiToure
    url地址：https://github.com/
    协议部分：http://
    域名部分：github.com     其实所有的域名部分最后都省略了一个点如 xx.com. 根域：. ，根域下授权分配顶级域（掌管着全世界的顶级域）
    资源部分：/IgarashiToure

    顶级域名：以.com,.net,.org,.cn等等属于国际顶级域名，根据目前的国际互联网域名体系，国际顶级域名分为两类：类别顶级域名(gTLD)和地
       理顶级域名(ccTLD)两种。类别顶级域名是以&quot;COM&quot;、&quot;NET&quot;、&quot;ORG&quot;、&quot;BIZ&quot;、&quot;INFO&quot;等结尾的域名，均由国外公司负责管理。地理顶级域名
       是以国家或地区代码为结尾的域名，如&quot;CN&quot;代表中国，&quot;UK&quot;代表英国。地理顶级域名一般由各个国家或地区负责管理。

    二级域名：二级域名是以顶级域名为基础的地理域名，比喻中国的二级域有，.com.cn,.net.cn,.org.cn,.gd.cn等.子域名是其父域名的子域名，比
        喻父域名是abc.com,子域名就是www.abc.com或者*.abc.com. 一般来说，二级域名是域名的一条记录，比如alidiedie.com是一个域名，
        www.alidiedie.com是其中比较常用的记录，一般默认是用这个，但是类似*.alidiedie.com的域名全部称作是alidiedie.com的二级

    若申请域名，根域先授权一个顶级域名（com），顶级再授权给（cnblogs），二级再授权给（www），诸如此类

    DNS的解析过程：
        1.输入网址后，在解析时，首先会解析uri地址的域名部分（知道域名对应的ip地址是谁），发送到本地的DNS服务器（向服务器寻求要访问ip地址）。
        2.此时会在本地服务器的缓存中去寻找（DNS的递归查询），（本地服务器会有一堆解析记录）每访问一个网址都会有一条正向解析记录（把网址翻
        译为一个具体的地址，并把ip地址返回主机）客户端便把其当做ip地址进行通信。若不知道ip地址则（进行迭代查询）
        3.访问13个根服务器（如M.root-servers.net）询问域名（日本网速比中国快很多的原因，因为它有根DNS服务器）
        4.根服务器返回是由.com顶级域名管理（根服务器只解析到顶级域名）
        5.访问顶级域名服务器 .com域服务器
        6.顶级域名只解析到二级域名，它返回cnblogs.com二级域名
        7.向cnblogs.com二级域名的DNS服务器访问
        8.cnblogs.com的DNS服务器返回给它自己的ip地址是1.1.1.1（www就是这个地址下域名，因此可以直接解析，www就是为了好记之类的）
        9.解析成功，本地服务器告诉网络客户端（主机）ip为1.1.1.1。同时写入缓存以便后续递归查询。

    还有主从dns，主的在工作，从的做备份。主从DNS之间互相同步数据是基于TCP协议做的

    当本地服务器进行迭代查询时，要先访问13台根域DNS
        那么它怎么知道13台根域服务器地址在哪，封装到了UDP协议里面了。而13台根域服务器地址已经是极限了，这也就是为啥只有13台根DNS服务器的缘故
    换个协议？————那么你相当于把全世界的网络都摧毁了，毁了在建？（等你统一全世界了再这么干）

    4.HTTP部分的内容，类似于下面这样：（它是应用层协议，封装好后就会交给下一层）
        GET / HTTP/1.1
        Host: www.google.com
        Connection: keep-alive
        User-Agent: Mozilla/5.0 (Windows NT 6.1) ……
        Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
        Accept-Encoding: gzip,deflate,sdch
        Accept-Language: zh-CN,zh;q=0.8
        Accept-Charset: GBK,utf-8;q=0.7,*;q=0.3
        Cookie: … …

    我们假定这个部分的长度为4960字节，它会被嵌在TCP数据包之中。

    5 TCP协议：
        TCP数据包需要设置端口，接收方（Google）的HTTP端口默认是80，发送方（本机）的端口是一个随机生成的1024-65535之间的整数，假定为51775。

        TCP数据包的标头长度为20字节，加上嵌入HTTP的数据包，总长度变为4980字节。

    6 IP协议：
        然后，TCP数据包再嵌入IP数据包。IP数据包需要设置双方的IP地址，这是已知的，发送方是192.168.1.100（本机），接收方是172.194.72.105（Google）。

        IP数据包的标头长度为20字节，加上嵌入的TCP数据包，总长度变为5000字节。

    7 以太网协议：
        最后，IP数据包嵌入以太网数据包。以太网数据包需要设置双方的MAC地址，发送方为本机的网卡MAC地址，接收方为网关192.168.1.1的MAC地
            址（通过ARP协议得到）。

        当到以太网时，前面封装的放于以太网的Data部分，因此要进行分片。（以太网有效传输数据最大是1500字节）linux上ifconfig信息的网卡上面有
        一个MTU值（网卡的最大传输单元，默认1500字节）
        以太网数据包的数据部分，最大长度为1500字节，而现在的IP数据包长度为5000字节。因此，IP数据包必须分割成四个包。因为每个包都有自
            己的IP标头（20字节），所以四个包的IP数据包的长度分别为1500、1500、1500、560。

    8 服务器端响应：
        经过多个网关的转发，Google的服务器172.194.72.105，收到了这四个以太网数据包。

        根据IP标头的序号，Google将四个包拼起来，取出完整的TCP数据包，然后读出里面的”HTTP请求”，接着做出”HTTP响应”，再用TCP协议发回来。

        本机收到HTTP响应以后，就可以将网页显示出来，完成一次网络通信。
</code></pre><hr><pre><code>因此每次浏览器输入域名后。它就解析完，相当于根文件夹下面的Igarashi目录，把Igarashi文件夹下面所有的信息都会返回回来，然后就相当于
你把所有文件（就Igarashi写的这些垃圾博客、文件）全部下载到本地来看。也就是说上网，全都是一个下载的过程。
</code></pre><p>一.ip 地址基本知识<br> 1.1 ip 地址的结构和分类：<br> 根据 tcp／ip 协议，连接在 internet 上的每个设备都必须有一个 ip 地址，他是一个 32 位二进制数，也可以用点分十进制表示，每八位一组，用一个十<br> 进制表示即 0 ～ 255，每组用&quot;.&quot;分隔开，例如 172.16.45.10</p><pre><code>ip地址表示：
    一个ip地址包含两方面的信息（网络号 + 主机号）4*8位表示

将ip地址中的网络位和主机位固定下来后，ip地址被分成了不同的积累：A类，B类，C类，D类，E类
A类：网络位前八位，开头0固定（1~126）127表示本地回环地址（开头结尾不能要）
B类：网络位前十六位，开头10固定（128—~191）
C类：网络位前二十四位，开头110固定（192~223）
D类：开头1110固定（224~239）————组播使用
E类：开头11110固定（240~255）————保留试验使用

1.2 特殊ip地址
    网络地址：用于表示网络本身，具有正常的网络号部分，而主机号部分全部为0的ip地址称之为网络地址，如172.16.45.0就是一个B类网络地址

    广播地址：用于向网络中的所有的设备进行广播。具有正常的网络号部分，而主机号部分全为1(即255)的ip地址称之为广播地址，如172.16.45.255就是
        一个B类的网络地址

    有限广播地址：指的是32位全位1(即255.255.255.255)的ip地址，用于本网广播

    回送地址：网络地址不能以十进制的127作为开头，在地址中数字127保留给系统作为诊断用，称为欢送地址，如127.0.0.1用于回路测试

    私有地址：只能在局域网内使用，不能在internet上使用的ip地址称为私有ip地址，私有ip地址有：
    10.0.0.0～10.255.255.255，表示一个A类地址
    172.16.0.0~172.31.255.255,表示16个B类地址
    192.168.0.0～192.168.255.255，表示256个C类地址
    0.0.0.0:指已经不是真正意义上的ip地址，它表示的是所有不清楚主机和目的网络，这里的不清楚指的是在本机路由表里没有特定条目指明如何到达

若想公司内网pc想访问百度（跨子网通信）先会进行判断（DNS解析判断目的ip），若目的ip不在同一个子网下就会把包交给网关（网关这个地方都会有一个
公网ip，还有NAT）。互联网上跑的都是公网地址，是看不到子网的。当你发包出去了时，另一个子网的网关会接收（两个网关通过路由器交换机）。查找路由
表，SNAT这步就是把私网地址的源地址的私有地址换成了网关地址的公有地址。另一边的网关接收后负责把数据转发给内网的服务器（DNAT这步把目标ip换了）

若只想在公司的内网通讯的话，就使用内网IP地址，不要使用公网的ip地址，不然最后在NAT转换会产生冲突

1.3 子网掩码
    子网掩码用于识别ip地址中的网络地址和主机地址。
    子网掩码也是32位二进制数字，在子网掩码中，对应于网络地址部分全用1表示，主机部分全用0表示
    还可以用网络前缀表示子网掩码，即&quot;／&lt;网络地址位数&gt;&quot;，如172.16.45.0/24表示B类网络172.16.45.0的子网掩码为255.255.255.0

1.4 ip地址申请
    https://www.processon.com/mindmap/57fdad47e4b08d4fe9b3d7e2
    全球IANA：有三个地区（北美、欧洲、亚太：APNIC）————CNNIC————ISP运营商

二.子网划分
    2.1 子网划分概念：
        子网划分是通过借用ip地址的若干位主机位来充当子网地址的从而将原来的网络分为若干个彼此隔离的子网实现的（简言：借主机位充当网络位）
    注意：
        arp协议通过ip地址获取目标主机的mac地址这一过程使用的是广播的方式，这个广播地址就是通过子网地址于子网掩码计算而来的，只有计算出
        的这一子网内的主机才能收到这个arp广播包
        子网划分与vlan都可以做到隔离广播域，只是子网划分是三层隔离，vlan是二层（二层隔离，物理层面上进行隔离，如10接口连载一台交换机的valn1）

    2.2 c类子网划分初探：
        若有C类网11111111 11111111 11111111 11000000 ————借了两位主机位给网络位 则每个子网的主机数为62（254-192）（此时有00/10/11/01四种变化）
        因此可以分成四个子网，因此依次类推 八个子网每个子网主机数为30（254-224），16个为14（254-240）。。。

    2.3 子网划分步骤：
        确定要划分的子网数以及每个子网的主机数
        求出子网数目对应的二进制的位数N及主机数目对应的二进制数的位数M
        对该ip地址的原子网掩码，将其主机地址部分的前N位置1(其余全部置0)或后M位置0(其余全置1)即得出该ip地址划分子网后的子网掩码

    2.4 子网划分案例：（先理解2.3）
        给C类网络211.168.10.0划分5个子网

        2**2-2&lt;5&lt;2**3-2所以需要3位网络号，主机号为8-3=5

        子网掩码为255.255.255.224

        每个子网可容纳2**5-2=30台主机

    2.5 划分子网注意事项：
        在子网划分时不仅需要考虑目前需要，还应该了解将来需要多说子网和主机。子网掩码使用较多的主机位，可以得到更多子网，节约了ip地址
        资源，若将来需要更多的子网时，不用再重新分配ip地址，但每个子网的主机数量有限；反之，子网掩码使用较少的主机位，每个子网的主机数
        允许有更大的增长，但可用子网数有限

        一般来说，一个网络中的节点数太多，网络会因为广播通信而饱和，所以网络中的主机数量的增长是有限的，也就是说，在条件允许的情况下，应
        将更多的主机位用于子网位

    2.6 为何要子网划分及其优点：
        2.6.1 为什么要子网划分：
            Internet组织机构定义了五种IP地址，用于主机的有A、B、C三类地址。其中A类网络有126个，每个A类网络可能有16，777，214台主机，它们
            处于同一广播域。而在同一广播域中有这么多结点是不可能的，网络会因为广播通信而饱和，结果造成16，777，214个地址大部分没有分配出去，
            形成了浪费。而另一方面，随着互连网应用的不断扩大，IP地址资源越来越少。为了实现更小的广播域并更好地利用主机地址中的每一位，可以把
            基于类的IP网络进一步分成更小的网络，每个子网由路由器界定并分配一个新的子网网络地址,子网地址是借用基于类的网络地址的主机部分创建的。
            划分子网后，通过使用掩码，把子网隐藏起来，使得从外部看网络没有变化，这就是子网掩码。

            很简单的说  就是，一个公司不可能使用254个公网地址，A公司想用6个地址，B公司也想用6个地址，如果把这两个公司的地址都放在一个大网
            段里面，这两个公司的地址就能够直接互通

        2.6.2 子网划分优点：
            减少网络流量（广播包发送，减少了广播包流量）
            提高网络性能
            简化管理
            易于扩大地理范围
</code></pre><p>网络编程：<br> 网络通信三要素:<br> 若要通信，只要根据 ip 地址和端口号，则可以确定是对某个机器的某个进程（指应用）进行通信。通常操作系统是会开辟 65535 个进程提供使用，<br> 那么每个应用都会有相对应的进程 ID<br> 进程 ID（PID）是由操作系统内核进行分配和管理的，而端口号是由通讯协议内核分配并进行管理的。<br> （网络服务的程序会需要打开端口监听，此时你看到的则是进程打开一个端口。其实进程和端口间无联系，可以通过进程查看开启的那些端口）</p><pre><code>    A.IP地址：
    （1）标识网络上的一台独立的主机（在网络上每台主机的IP地址肯定不一样）
    （2） IP地址 = 网络地址 + 主机地址（网络号：用于识别主机所在的网络/网段。主机号：用于识别该网络中的主机）
    （3） 特殊的IP地址：127.0.0.1（本地回环地址、保留地址，点分十进制）可用于简单的测试网卡是否故障。表示本机。

    B:端口号:（cmd下netstat -nao开查看PID进程号对应的端口号，linux下sudo netstat -antup）
    （1） 用于标识进程的逻辑地址。不同的进程都有不同的端口标识（端口号不一样）。
    （2） 端口：要将数据发送到对方指定的应用程序上，为了标识这些应用程序，所以给这些网络应用程序都用数字进行标识。
            为了方便称呼这些数字，则将这些数字称为端口。（此端口是一个逻辑端口）

    C: 传输协议：
      通讯的规则。例如：TCP、UDP协议（好比两个人得用同一种语言进行交流）

    ①、UDP：User Datagram Protocol用户数据报协议
        特点：
        面向无连接：传输数据之前源端和目的端不需要建立连接。
        每个数据报的大小都限制在64K（8个字节）以内。
        面向报文的不可靠协议。（即：发送出去的数据不一定会接收得到）
        传输速率快，效率高。
        现实生活实例：邮局寄件、实时在线聊天（要求速度，例如QQ）、视频会议…等。（一般都是求效率不求不安全）

    ②、TCP：Transmission Control Protocol传输控制协议
        特点：
        面向连接：传输数据之前需要建立连接。
        在连接过程中进行大量数据传输。
        通过“三次握手”的方式完成连接，是安全可靠协议。
        传输速度慢，效率低。（求安全不求效率）
        注意：在TCP/IP协议中，TCP协议通过三次握手建立一个可靠的连接（TCP协议已经封装好，可以直接调接口）

         # “我能给你讲个关于tcp的笑话吗?”
         #   “行,给我讲个tcp笑话.”
         #   “好吧那我就给你讲个tcp笑话.”

        A ——————&gt;B syn:（我要给你发送信息了）
        B ——————&gt;A ack:应答（我知道了）
        A ——————&gt;B （我知道 你知道我要给你发送信息了）

网络通讯步骤：
    知道对方的IP地址 → 知道通信对象的程序端口 →  确定通讯协议(重点)

     总结：网络通讯的过程其实就是一个（源端）不断封装数据包和（目的端）不断拆数据包的过程。

     简单来说就是：发送方利用应用软件将上层应用程序产生的数据前后加上相应的层标识不断的往下层传输（封包过程），最终到达物理层通过看
     得见摸得着的物理层设备，例如：网线、光纤…等将数据包传输到数据接收方，然后接收方则通过完全相反的操作不断的读取和去除每一层的标识
     信息（拆包过程），最终将数据传递到最高层的指定的应用程序端口，并进行处理。
</code></pre><hr><h3 id="http-抓包演示" tabindex="-1"><a class="header-anchor" href="#http-抓包演示"><span>HTTP 抓包演示</span></a></h3><p>针对于 <strong>CentOS</strong> 需要先确认 <strong>nc 、ncat</strong> 和 <strong>netcat</strong> 软件，是否为软链 的 <strong>nmap 的 nc</strong></p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> whereis</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> nc</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># nc: /usr/bin/nc /usr/share/man/man1/nc.1.gz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ls</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /usr/bin/nc</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -ahl</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># lrwxrwxrwx. 1 root root 22 Feb 21 14:19 /usr/bin/nc -&gt; /etc/alternatives/nmap</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若是，需要检查有无 <strong>ncat</strong> 或者重装 <strong>netcat</strong> ，如下是通过 <strong>ncat</strong> 访问 <strong>HTTP/1.1</strong> 的演示</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 开启终端1，输入,若需代理则 --proxy=&quot;ip_addr:port&quot;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ncat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> www.baidu.com</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 80</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 开启终端2，ncat 会起个监听端口和 www.baidu.com 80 端口建立连接，通过 netstat 查看</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> netstat</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -natp</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ncat</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Proto</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">	Recv-Q</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">	Send-Q</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">	Local</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Address</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">		Foreign</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Address</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">			state</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">		PID/Program</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> name</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">tcp</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">        0</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">	  0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 192.168.3.141:44060</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">     14.215.177.38:80</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">        ESTABLISHED</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 17538/ncat</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># nc进程ID为 17538 ,此时即是和百度建立了socket连接，状态是 ESTABLISHED 为连通</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 开启终端3，此时发现，监听的是 40764 端口，可以通过 tcpdump 抓包工具，抓取 tcp 协议的包</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tcpdump</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -nn</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> eth0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> port</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 44060</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 终端1, 输入如下，通过 HTTP1.1 协议建立连接，请求跟路由的 index 静态资源 </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">GET</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HTTP/1.1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> # \\n \\n  </span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">此为</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> HTTP </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1.1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 的请求格式\`</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时返回如下图所示</p><img src="`+y+'"><p>响应的是 <code>www.baidu.com</code> 的静态资源，此时观察 <strong>tcpdump</strong> 的抓包信息如下所示</p><img src="'+T+'"><p>可看见 通过 <strong>TCP/IP</strong> 协议，以及本地 <code>172.16.120.141:44060</code> 端口对其发送了 <strong>HTTP1.1</strong> 请求信息，服务端响应了其静态资源和 <strong>HTTP/1.1 200 OK</strong> ，这个收发来回就是一次 <strong>HTTP</strong> 的请求</p>',129)]))}const x=i(v,[["render",M]]),N=JSON.parse('{"path":"/unix/Linux/%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80.html","title":"网络基础","lang":"zh-CN","frontmatter":{"title":"网络基础","date":"2022-07-03T00:00:00.000Z","category":["网络通信","Linux"],"tag":["网络通信","Linux"],"star":true,"description":"一些简单的网络基础","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"网络基础\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-07-03T00:00:00.000Z\\",\\"dateModified\\":\\"2025-04-24T08:16:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/unix/Linux/%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"网络基础"}],["meta",{"property":"og:description","content":"一些简单的网络基础"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-24T08:16:32.000Z"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"网络通信"}],["meta",{"property":"article:published_time","content":"2022-07-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-24T08:16:32.000Z"}]]},"git":{"createdTime":1664462137000,"updatedTime":1745482592000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":8,"url":"https://github.com/Igarashi"},{"name":"Igarashi-G","username":"Igarashi-G","email":"2545369032@qq.com","commits":1,"url":"https://github.com/Igarashi-G"}]},"readingTime":{"minutes":60.11,"words":18032},"filePathRelative":"unix/Linux/网络/网络基础.md","excerpt":"<p>一些简单的网络基础</p>\\n","autoDesc":true}');export{x as comp,N as data};
