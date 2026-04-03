<template><div><p>NAT映射与内网穿透</p>
<!-- more -->
<h2 id="_1-基本概念" tabindex="-1"><a class="header-anchor" href="#_1-基本概念"><span>1. 基本概念</span></a></h2>
<h3 id="_1-1-相关基础" tabindex="-1"><a class="header-anchor" href="#_1-1-相关基础"><span>1.1 相关基础</span></a></h3>
<p>首先需要了解如下相关基础概念:</p>
<ul>
<li>
<p><RouteLink to="/unix/Linux/%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80.html#ip%E5%8D%8F%E8%AE%AE"><strong>IPv4</strong></RouteLink></p>
</li>
<li>
<p><RouteLink to="/unix/Linux/%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80.html#%E4%BF%9D%E7%95%99%E5%9C%B0%E5%9D%80"><strong>保留地址</strong></RouteLink></p>
</li>
<li>
<p>发送数据的过程</p>
<p><img src="@source/unix/Linux/网络/img/外网服务器通信.png" alt="外网服务器通信"></p>
<ul>
<li><strong>IP</strong> + <strong>端口:</strong> 4层协议，通过 <strong>源、目标的 IP地址 + port 端口</strong> 进行不同计算机进程间的通信</li>
</ul>
</li>
</ul>
<h3 id="_1-2-nat基本概念" tabindex="-1"><a class="header-anchor" href="#_1-2-nat基本概念"><span>1.2 NAT基本概念</span></a></h3>
<p><strong>网络地址转换 NAT（<em>Network Address Translation</em>）</strong> 本身就是路由器的一个功能，是为了解决 <mark>IPv4地址不够用</mark> 而提出的，除了路由器之外，三层交换机也带 <strong>NAT</strong> 功能，但二层交换机不带（<em>因为没有 IP地址 的概念</em> ）</p>
<p><strong>简单NAT</strong> 如下图所示:</p>
<p><img src="@source/unix/Linux/网络/img/简单NAT通信流程.jpg" alt="简单NAT通信流程"></p>
<p>上述实际带了 <strong>端口Port</strong> 因此称为 <strong>NPAT（<em>Network Address Port Translation</em>）</strong> 因为 <strong>NAT</strong> 本身太拉了（<em>一对一转换，用途不广</em> ），但大家叫 <strong>NPAT</strong> 又觉着麻烦，因此管 <strong>NPAT</strong> 也称 <strong>NAT</strong> 了</p>
<p><img src="@source/unix/Linux/网络/img/华为easynat.jpg" alt="华为easynat示意"></p>
<p><strong>参考资料：</strong></p>
<ul>
<li><a href="https://support.huawei.com/enterprise/zh/doc/EDOC1100086644/7989a4c3" target="_blank" rel="noopener noreferrer">华为NAT</a></li>
</ul>
<h3 id="_1-3-断开-nat-连接后" tabindex="-1"><a class="header-anchor" href="#_1-3-断开-nat-连接后"><span>1.3 断开 NAT 连接后</span></a></h3>
<p>若通信完成后， <strong>NAT</strong> 的连接断开，此时：</p>
<p><img src="@source/unix/Linux/网络/img/NAT断开连接之后.jpg" alt="NAT断开连接之后"></p>
<p><strong>服务器B</strong> 在 <strong>断开NAT连接</strong> 之后是不能 主动 和 <strong>设备A</strong> 建立连接的，即 <strong>设备A</strong> 只能往外面发送数据，但不能接收数据。</p>
<p>当 <strong>服务器B</strong> 往 <code v-pre>30.0.0.1:1883</code> 地址发送数据包时，<strong>1883 端口</strong> 被路由器认为什么都没有，然后丢弃包不处理</p>
<h3 id="_1-4-端口映射" tabindex="-1"><a class="header-anchor" href="#_1-4-端口映射"><span>1.4 端口映射</span></a></h3>
<p>即声明 <strong>路由器 持续监听 1883 端口（<em>不再随机分配一个端口了</em> ）</strong> 而是固定将 <strong>1883端口 绑定到 设备A</strong>，只要路由器发现 <strong>1883端口</strong> 有数据，就会将消息转发到 <strong>设备A</strong> 上，所以在做完端口映射之后，<strong>服务器B</strong> 就可以在广域网上主动访问 <strong>设备A</strong> 了</p>
<h3 id="_1-5-内网穿透" tabindex="-1"><a class="header-anchor" href="#_1-5-内网穿透"><span>1.5 内网穿透</span></a></h3>
<p>上述还是较为友好的场景，只有一端做了 <strong>NAT</strong>，现实生活中是，<strong>双方都做了 NAT</strong>，均在一个 <strong>NAT</strong> 的环境中，因此两边均无法相互访问</p>
<p><img src="@source/unix/Linux/网络/img/双边NAT环境.jpg" alt="双边NAT环境"></p>
<p>但若想让两台服务器之间可以主动发起请求的话，又该怎么办呢，于是有了第三台作为中继的云服务器来帮助两台内网的设备进行一个 <mark>“ 穿透 ”</mark></p>
<p><img src="@source/unix/Linux/网络/img/内网穿透.jpg" alt="内网穿透"></p>
<p><strong>中继：</strong> 内网穿透的中间商，但中继的带宽会严重影响内网穿透的速度</p>
<p><img src="@source/unix/Linux/网络/img/内网穿透网速瓶颈.png" alt="内网穿透网速瓶颈"></p>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>通常情况下，国内网络环境复杂，一般是是用不到端口映射的，存在着很多问题，因此才会有内网穿透</p>
<p><img src="@source/unix/Linux/网络/img/国内糟糕网络环境.jpg" alt="国内糟糕网络环境"></p>
<p><strong>比如:</strong> 你将自己家里的路由器端口映射开放出去接入小区的机房，但小区的机房可能就是一个 <strong>NAT 环境</strong> ，然后小区又把网线接到了移动的机房里面去（移动大内网很著名），相当于又接入到了一个 <strong>NAT</strong> 环境里面去，而且你没办法协调上层路由器来改规则。</p>
</div>
<h2 id="_2-内网穿透是怎么实现的" tabindex="-1"><a class="header-anchor" href="#_2-内网穿透是怎么实现的"><span>2. 内网穿透是怎么实现的</span></a></h2>
<h3 id="_2-1-中继转发" tabindex="-1"><a class="header-anchor" href="#_2-1-中继转发"><span>2.1 中继转发</span></a></h3>
<p>若<strong>A</strong> 想与 <strong>B</strong> 通信，此时设备A、服务器B 都需要先和云服务器建立连接，然后每次 <strong>A</strong> 想与 <strong>B</strong> 通信，都要先发送给 <strong>C</strong>，由 <strong>C</strong> 转发给 <strong>B</strong> ,这样每次都由 <strong>云服务器C</strong> 进行流量转发 <mark>效率很低</mark> ，且带宽瓶颈就是 <strong>C</strong> 带宽的上限</p>
<p><img src="@source/unix/Linux/网络/img/中继转发效率问题.jpg" alt="中继转发效率问题"></p>
<p>因此有没有一种可能，<strong>A</strong> 通过 <strong>C</strong> 进行了某种协商之后，就可以直接与 <strong>B</strong> 进行通信呢？</p>
<h3 id="_2-2-nat类型" tabindex="-1"><a class="header-anchor" href="#_2-2-nat类型"><span>2.2 NAT类型</span></a></h3>
<p><strong>NAT</strong> 通常分为两大类， <strong>锥型</strong> 和 <strong>对称型</strong> ，其中 <strong>锥型</strong> 又可以分为 <strong>完全锥型</strong> 和 <strong>限制型锥型</strong>（分类而非实际存在） ，<strong>限制型锥型</strong> 又可分为 <strong>IP 限制型锥型</strong> 和 <strong>端口 限制型锥型</strong> ， 如下图：</p>
<p><img src="@source/unix/Linux/网络/img/NAT类型.jpg" alt="NAT类型"></p>
<p>因此去除分类的话，子集就是通常说的 <strong>4 +1 种NAT类型：</strong></p>
<ul>
<li>
<p><strong>NAT0（Open Internet 开放型/无NAT ）:</strong>  设备 <strong>直接拥有公网IP地址</strong> ，没有NAT网关。任何外网主机只要知道该设备的 公网IP地址 和 端口号，都可以直接向其发送数据包，无需经过NAT转换。</p>
<ul>
<li><strong>特点：</strong>  开放性高，但安全性低；无NAT转换，通信效率高；适合需要外网直接访问的场景</li>
<li><strong>场景：</strong> 测试环境（开发调试）、早期的P2P文件共享应用、云服务器、VPS等直接暴露在公网的服务、需要外网直接访问的服务器应用</li>
</ul>
</li>
<li>
<p><strong>NAT1（Full Cone NAT 完全锥型 NAT）:</strong>   同一个内网（IP，端口）对的所有出站请求，都会被映射到同一个外网（IP，端口）。一旦映射建立，任何外网主机都可以通过该映射的外网（IP，端口）访问内网设备，即使内网设备未先向该外网主机发送过数据包。</p>
<p><img src="@source/unix/Linux/网络/img/完全锥型NAT.jpg" alt="完全锥型NAT"></p>
<ul>
<li><strong>特点：</strong> <strong>外网设备可以主动连接内网设备；</strong> 映射关系不受目标地址限制；**安全性低； **行为类似静态NAT，但映射是动态建立的 一对一映射
<ul>
<li>一个内网（IP，端口）对  →  一个外网（IP，端口）映射</li>
</ul>
</li>
<li><strong>场景：</strong> P2P 应用（如 BitTorrent、某些游戏联机）简单穿透（打洞成功率较高）需要外网主动访问内网服务的场景</li>
</ul>
</li>
<li>
<p><strong>NAT2（Restricted Cone NAT IP地址限制锥型 NAT）:</strong> 当内网设备向某个外网IP地址发送数据包后，会建立 NAT 映射。只有该 <strong>特定外网IP地址的主机</strong> 可以通过该映射访问内网设备（端口可以不同）。其他 外网IP 地址的主机 即使知道该 映射的外网（IP，端口），也无法建立连接。</p>
<p><img src="@source/unix/Linux/网络/img/IP地址限制型NAT.jpg" alt="IP地址限制型NAT"></p>
<ul>
<li><strong>特点：</strong> 只允许 <strong>特定外网IP地址通信（端口可不同）</strong> ；安全性比 <strong>NAT1（Full Cone）</strong> 高，比 <strong>NAT3（Port Restricted）</strong> 低；限制了可连接的外网IP范围，但特定IP 仍可能被恶意利用</li>
<li><strong>场景：</strong> 家庭网络（多数家用路由器）、小型办公网络、需要一定安全性的 P2P应用</li>
</ul>
</li>
<li>
<p><strong>NAT3（Port Restricted Cone NAT 端口限制锥型 NAT）:</strong> 当内网设备向某个外网（IP，端口）发送数据包后，会建立NAT映射。只有该特定外网（IP，端口）的主机可以通过该映射访问内网设备。对外部连接的限制更严格：<strong>即使是 相同IP地址 但 不同端口号 的外网设备，也无法主动建立新连接</strong> 。</p>
<p><img src="@source/unix/Linux/网络/img/端口限制锥型NAT.jpg" alt="端口限制锥型NAT"></p>
<ul>
<li><strong>特点：</strong> <mark><strong>IP 限制 同时 端口 限制</strong></mark> 只允许 <strong>特定（IP，端口）通信</strong> ；在 锥型NAT 中安全性最高；通常允许已建立的连接响应，但 <strong>主动发起新连接必须精确匹配（IP，端口）对</strong></li>
<li><strong>场景：</strong> 公共网络环境（咖啡馆、机场、酒店等提供的WiFi），企业网络（需要高安全性的场景），保护用户设备安全的网络环境</li>
</ul>
</li>
<li>
<p><strong>NAT4（Symmetric NAT 对称型 NAT）:</strong>  比 <strong>NAT3</strong> 更严格的网络地址转换类型，<strong>同样对 IP 和 端口 均限制，且每次 内网设备 向不同的 外网（IP，端口）建立连接时，NAT网关 都会分配一个 新的外网（IP，端口）映射</strong> 。同一个内网（IP，端口）对，向不同的目标（IP，端口）建立连接，会得到不同的外网映射，只有与特定（内网IP，内网端口，目标IP，目标端口）四元组对应的映射才能通信。换句话说，（SIP，Sport，DIP，Dport）只要有一个发生变化，都会使用不同的映射条目，即此 NAT映射 与 报文四元组绑定。</p>
<p><img src="@source/unix/Linux/网络/img/对称型NAT.jpg" alt="对称型NAT"></p>
<ul>
<li><strong>特点：</strong> <strong>安全性极高</strong>，几乎可杜绝外部的恶意攻击；对网络应用的兼容性极差，很多常见的网络应用可能无法正常工作；配置和管理复杂，需要专业的网络技术人员进行操作；P2P打洞成功率低</li>
<li><strong>场景：</strong> 高度敏感的政府机构、军事单位；金融核心系统等对网络安全有极致要求的特殊环境；企业内网的核心安全区域。</li>
</ul>
</li>
</ul>
<h5 id="对称型与全锥型的显著区别" tabindex="-1"><a class="header-anchor" href="#对称型与全锥型的显著区别"><span><strong>对称型与全锥型的显著区别</strong></span></a></h5>
<p><img src="@source/unix/Linux/网络/img/锥型和对称型NAT的区别.jpg" alt="锥型和对称型NAT的区别"></p>
<div class="hint-container tip">
<p class="hint-container-title"><strong>总结（NAT映射规则）</strong></p>
<ul>
<li>全锥型、地址受限锥型、端口受限锥型NAT中，相同 内网IP 和 端口 的请求会被映射到同一个 外网IP 和 端口（即SPORT固定）。</li>
<li>对称型NAT 则根据四元组 动态生成映射表，同一 内网IP 访问 不同外网地址时，会分配 不同的 SPORT。</li>
</ul>
</div>
<h3 id="_2-3-nat-打洞" tabindex="-1"><a class="header-anchor" href="#_2-3-nat-打洞"><span>2.3 NAT 打洞</span></a></h3>
<p>内网穿透的目标是将两台处于NAT后的主机建立直连。前面介绍了四种NAT类型，两两组合共有10种情况。不同组合的穿透方法不同，穿透成功率也不同。</p>
<h4 id="不同nat的穿透性" tabindex="-1"><a class="header-anchor" href="#不同nat的穿透性"><span>不同NAT的穿透性</span></a></h4>
<p><strong>NAT 一共有如下 10种 组合</strong></p>
<table>
<thead>
<tr>
<th>左侧NAT类型</th>
<th>右侧NAT类型</th>
<th>穿透性</th>
</tr>
</thead>
<tbody>
<tr>
<td>全锥型</td>
<td>全锥型</td>
<td>✓</td>
</tr>
<tr>
<td>全锥型</td>
<td>受限锥型</td>
<td>✓</td>
</tr>
<tr>
<td>全锥型</td>
<td>端口受限锥型</td>
<td>✓</td>
</tr>
<tr>
<td>全锥型</td>
<td>对称型</td>
<td>✓</td>
</tr>
<tr>
<td>受限锥型</td>
<td>受限锥型</td>
<td>✓</td>
</tr>
<tr>
<td>受限锥型</td>
<td>端口受限锥型</td>
<td>✓</td>
</tr>
<tr>
<td>受限锥型</td>
<td>对称型</td>
<td>✓</td>
</tr>
<tr>
<td>端口受限锥型</td>
<td>端口受限锥型</td>
<td>✓</td>
</tr>
<tr>
<td>端口受限锥型</td>
<td>对称型</td>
<td>✗ 无法打通</td>
</tr>
<tr>
<td>对称型</td>
<td>对称型</td>
<td>✗ 无法打通</td>
</tr>
</tbody>
</table>
<p><strong>无法穿透的组合：</strong></p>
<ul>
<li>
<p>端口受限锥型 + 对称型</p>
</li>
<li>
<p>对称型 + 对称型</p>
</li>
</ul>
<p><strong>当无法穿透时，全程用服务器进行转发理论上是100%可以的</strong> ，但这里不考虑这种方法。当有还有一些实验性方式也可以实现这两种的内网穿透，只不过目前还不成熟（成功率较低）。事实上不只是目前，未来也许也不会成熟， 因为这两种组合无法穿透是 NAT在设计上就存在的逻辑限制，而非实现问题，或者说设计之初就没考虑这两种的穿透问题。</p>
</div></template>


