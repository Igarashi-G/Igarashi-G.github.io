<template><div><p><strong>SNMP</strong> 协议简要说明</p>
<!-- more -->
<h3 id="_1-什么是-snmp-协议" tabindex="-1"><a class="header-anchor" href="#_1-什么是-snmp-协议"><span>1. 什么是 SNMP 协议</span></a></h3>
<p><strong>SNMP （<em>简单网络管理协议</em>）：</strong> 用于网络管理的协议，常用于 <strong>监控工具</strong>，可以 <strong>持续性实时监控</strong>，好处是带宽消耗非常少，因此使用此套件进行监控不会降低网络速度，它和 <strong>DNS</strong> 一样也是基于 <strong>UDP 协议</strong> 实现 （<em>速度快，消息易丢失</em> ）</p>
<p><strong>基本思想：</strong> 为不同种类的设备、不同厂家生产的设备、不同型号的设备，定义为一个统一的接口和协议，<br>
使得管理员可以使用统一的外观，面对这些需要管理的网络设备进行管理</p>
<h3 id="_2-snmp-支持的网管操作" tabindex="-1"><a class="header-anchor" href="#_2-snmp-支持的网管操作"><span>2. SNMP 支持的网管操作</span></a></h3>
<ul>
<li>
<p><strong>Get：</strong> 读取网络设备的状态信息</p>
</li>
<li>
<p><strong>Set：</strong> 远程配置设备参数</p>
</li>
<li>
<p><strong>Trap：</strong> 管理站及时获取设备的重要信息</p>
</li>
</ul>
<h3 id="_3-snmp-的实现结构及定义" tabindex="-1"><a class="header-anchor" href="#_3-snmp-的实现结构及定义"><span>3. SNMP 的实现结构及定义</span></a></h3>
<p><strong>SNMP</strong> 为管理员提供了一个网管平台 <strong>（<em>NMS</em>）</strong>，又称为管理站，负责网管命令的发出、数据存储、及数据分析，<br>
被监管的设备上运行一个 <strong>SNMP</strong> 代理 <strong>（<em>Agent</em>）</strong> ，代理实现设备与管理站的 <strong>SNMP</strong> 通信</p>
<ul>
<li>
<p>SNMP：Simple Network Management Protocol(简单网络管理协议)，是一个标准的用于管理基于 IP 网络上设备的协议。</p>
</li>
<li>
<p>MIB：Management Information Base(管理信息库)，定义代理进程中所有可被查询和修改的参数。</p>
</li>
<li>
<p>SMI：Structure of Management Information(管理信息结构)，SMI 定义了 SNMP 中使用到的 ASN.1 类型、语法，并定义了 SNMP 中使用到的类型、宏、符号等。SMI 用于后续协议的描述和 MIB 的定义。每个版本的 SNMP 都可能定义自己的 SMI。</p>
</li>
<li>
<p>ASN.1：Abstract Syntax Notation One(抽象语法定义)。用于定义语法的正式语言，在 SNMP 中定义 SNMP 的协议数据单元 PDU 和管理对象 MIB 的格式。SNMP 只使用了 ASN.1 中的一部分，而且使用 ASN.1 的语言特性定义了一些自定义类型和类型宏 ，这些组成了 SMI。</p>
</li>
<li>
<p>PDU： Protocol Data Unit(协议数据单元)，它是网络中传送的数据包。每一种 SNMP 操作，物理上都对应一个 PDU。</p>
</li>
<li>
<p>NMS： Network Management System，网络管理系统，又名网络管理站，简称“管理站”。它是 SNMP 的总控机，提供统一的用户界面访问支持 SNMP 的设备，一般提供 UI 界面，并有统计、分析等功能，是网管系统的总控制台。NMS 是网络管理操作的发起者。</p>
</li>
<li>
<p>Agent： 是 SNMP 的访问代理，简称“代理”，为设备提供 SNMP 能力，负责设备与 NMS 的通信。</p>
</li>
<li>
<p>Proxy： 代理服务器，对实现不同协议的设备进行协议转换，使非 IP 协议的设备也能被管理。</p>
</li>
<li>
<p>Trap： 是由设备主动发出的报警数据，用于提示重要的状态的改变。</p>
</li>
<li>
<p>BER： Basic Encoding Rule，基本编码规格。描述如何将 ASN.1 类型的值编码为字符串的方法。它是 ASN.1 标准的一部分。BER 编码将数据分成 TLV 三部分，T 为 Tag 的缩写，是类型标识；L 为 Length 的缩写，标识类型的长度；V 为 Value 的缩写，标识数据内容。按照 TLV 的顺序对数据进行编码，生成字节流。SNMP 使用 BER 将 SNMP 的操作请求和应答编码后进行传输，并用于接收端进行解码。</p>
</li>
</ul>
<h3 id="_4-net-snmp-软件" tabindex="-1"><a class="header-anchor" href="#_4-net-snmp-软件"><span>4. Net-SNMP 软件</span></a></h3>
<ul>
<li>
<p>Net-snmp 提供完整的 API 用于 SNMP 应用程序开发，包括 C 和 Perl 的 API 。</p>
</li>
<li>
<p>一个功能强大且可扩展的 SNMP 代理：snmpd 开发者可以开发动态模块扩展 snmpd，net-snmp 内置扩展子代理与主代理的通信协议。</p>
</li>
<li>
<p>提供众多命令行工具检查和使用 SNMP 协议</p>
</li>
<li>
<p>一个图形化的 MIB 浏览工具</p>
</li>
<li>
<p>一个 Trap 接收进程，用于接收和显示 Trap，并将 Trap 记录到日志文件中。</p>
</li>
</ul>
<p>安装</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> net-snmp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> net-snmp-utils</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>查看一下安装的软件包</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rpm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -qa</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> net-snmp</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    net-snmp-libs-5.7.2-24.el7.x86_64</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    net-snmp-5.7.2-24.el7.x86_64</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    net-snmp-agent-libs-5.7.2-24.el7.x86_64</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    net-snmp-utils-5.7.2-24.el7.x86_64</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主配置文件</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/snmp/snmpd.conf</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>启动和测试</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> snmpd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看一下 net-snmp 版本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> snmpd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -v</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


