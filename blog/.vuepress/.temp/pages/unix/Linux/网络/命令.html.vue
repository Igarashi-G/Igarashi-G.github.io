<template><div><h1 id="centos-网络命令" tabindex="-1"><a class="header-anchor" href="#centos-网络命令" aria-hidden="true">#</a> CentOS 网络命令</h1>
<h2 id="_1-网络-ip-指令集合" tabindex="-1"><a class="header-anchor" href="#_1-网络-ip-指令集合" aria-hidden="true">#</a> 1. 网络 IP 指令集合</h2>
<blockquote>
<p><code v-pre>CentOS7</code> 正式废弃了旧工具包：<code v-pre>ifconfig</code>、<code v-pre>netstat</code>、<code v-pre>locate</code> 等命令（也可以用，不推荐），新系统使用 <code v-pre>ip</code>、<code v-pre>ss</code>、<code v-pre>net</code> 等命令代替</p>
</blockquote>
<h3 id="_1-网络参数设定" tabindex="-1"><a class="header-anchor" href="#_1-网络参数设定" aria-hidden="true">#</a> 1.网络参数设定：</h3>
<p>任何時刻如果你想要做好你的网络参数设定（<code v-pre>IP</code>、路由、无线网络）就要了解如下指令</p>
<ul>
<li><strong>ifconfig</strong> ：查詢、设定网卡与 <code v-pre>IP</code> 网域等相关参数</li>
<li><strong>ifup, ifdown</strong>：通过命令执行的脚本<code v-pre>script</code>，更简单的方式上下线</li>
<li><strong>route</strong> ：查询、设置路由表 (route table)</li>
<li><strong>ip</strong> ：复合式的新指令， 可以直接修改上述提到的功能；</li>
</ul>
<h3 id="_1-1-手动-自动设置启停-ip" tabindex="-1"><a class="header-anchor" href="#_1-1-手动-自动设置启停-ip" aria-hidden="true">#</a> 1.1 手动/自动设置启停 IP：</h3>
<p><code v-pre>ifup</code> 和 <code v-pre>ifdown</code> 只能启动 <code v-pre>/etc/sysconfig/network-scripts</code> 下的 <code v-pre>ifcfg-ethX</code> (X 為數字) ，并不能直接修改网络参数，除非手动调整 <code v-pre>ifcfg-ethX</code> 配置文件才行。但 <code v-pre>ifconfig</code> 可以手动调参。</p>
<hr>
<h4 id="ifconfig" tabindex="-1"><a class="header-anchor" href="#ifconfig" aria-hidden="true">#</a> **ifconfig: **</h4>
<p>可以手动启动、观察与修改网络界面的相关参数，語法如下：</p>
<p><strong>列所有网卡</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ifconfig</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>列出已经启动的网卡，无论该网卡是否分配了<code v-pre>IP</code>，均显示</p>
<p>各参数含义如下：</p>
<ul>
<li><strong>HWaddr</strong>：网卡的硬件地址，即 <code v-pre>MAC</code> 地址</li>
<li><strong>inet addr</strong>：<code v-pre>IPv4</code> 的 <code v-pre>IP</code> 位址，后续的 <code v-pre>Bcast</code>, <code v-pre>Mask</code> 分別代表的是 <code v-pre>Broadcast</code> 与 <code v-pre>netmask</code></li>
<li><strong>inet6 addr</strong>：是 <code v-pre>IPv6</code> 的版本的 <code v-pre>IP</code></li>
<li><strong>MTU</strong>：最大传输单位，</li>
<li>最大啊！包接收情況， packets 代表封包數、errors 代表封包發生錯誤的數量、 dropped 代表封包由於有問題而遭丟棄的數量等等</li>
<li><strong>TX</strong>：與 RX 相反，為網路由啟動到目前為止的傳送情況；</li>
<li><strong>collisions</strong>：代表封包碰撞的情況，如果發生太多次， 表示你的網路狀況不太好；</li>
<li><strong>txqueuelen</strong>：代表用來传输资料的缓存区的储存长度</li>
<li><strong>RX bytes, TX bytes</strong>：總接收、傳送的位元組總量</li>
</ul>
<p><strong>列出指定网卡信息</strong>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ifconfig {interface}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>interface</code>：网卡， 如 <code v-pre>lo：</code> （<code v-pre>loopback</code> 表示本机回环地址）、<code v-pre>eth0</code>、<code v-pre>eth1</code> 等网卡代号</li>
</ul>
<p><strong>开启，关闭网卡</strong>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ifconfig {interface} {up|down}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 设置其他选项</span>
<span class="token function">ifconfig</span> interface <span class="token punctuation">{</span>options<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li></li>
</ul>
<p>二级命令非常多，很难记。最常用的是 ip addr 也可以简写为 ip a . 操作网络地址相关内容，比如列出 ip 地址，添加 ip 地址，删除 ip 等待</p>
<pre><code>列出ip地址： addr 常用 a 代替
ip addr show    -&gt;  简化 ip a

显示 V4 、V6 地址
ip -4 a     /   ip -6 a

# 显示 eth0 网卡
ip a show eth0

# 显示正在运行网卡
ip link ls up

# 添加 ip 地址
ip a add {ip_addr/mask} dev {intereface} [label label_name] // 可选的设置一个label
ip addr add 192.168.0.123/24 dev eth0
</code></pre>
<ul>
<li>
<p>如果返回值为 0 执行 arping -I $dev -c 3 -b -s $ip 1.1.1.1</p>
<pre><code>  arping -I eth0 -c 3 -b -s 192.168.10.23 1.1.1.1
</code></pre>
<p>​</p>
<h1 id="删除-ip-地址" tabindex="-1"><a class="header-anchor" href="#删除-ip-地址" aria-hidden="true">#</a> 删除 ip 地址</h1>
<p>ip a del {ip_addr} dev {interface}
ip addr del 192.168.0.123 dev eth0</p>
<h1 id="flush-ip-address-delete-all-the-ip-addresses-matches" tabindex="-1"><a class="header-anchor" href="#flush-ip-address-delete-all-the-ip-addresses-matches" aria-hidden="true">#</a> flush ip address; delete all the IP addresses matches</h1>
<h1 id="可以-flush-一个地址或者一个-label-标记的所有地址" tabindex="-1"><a class="header-anchor" href="#可以-flush-一个地址或者一个-label-标记的所有地址" aria-hidden="true">#</a> 可以 flush 一个地址或者一个 label 标记的所有地址</h1>
<p>ip a flush label &quot;label&quot;
ip -s a f to 192.168.2.0/24 // -s 输出统计信息 to limit to given IP address/prefix</p>
<h1 id="up-or-down-a-device" tabindex="-1"><a class="header-anchor" href="#up-or-down-a-device" aria-hidden="true">#</a> up or down a device</h1>
<p>ip link set dev {interface} {up|down}
ip l set dev eth0 down</p>
</li>
</ul>
<p>ip link set 命令可以设置很多的值，看一下自动补全提示： link 简化 l</p>
<pre><code>$ ip l set &lt;tab&gt;
address     -- specify unicast link layer (MAC) ad
arp         -- change ARP flag on device
brd         -- specify broadcast link layer (MAC)
broadcast   -- specify broadcast link layer (MAC)
dev         -- specify device
down        -- change state do down
dynamic     -- change DYNAMIC flag on device
mtu         -- specify maximum transmit unit
multicast   -- change MULTICAST flag on device
name        -- change name of device
peer        -- specify peer link layer (MAC) addre
promisc     -- set promiscious mode
txqlen      -- specify length of transmit queue
txqueuelen  -- specify length of transmit queue
up          -- change state to up
</code></pre>
<p>一般用法都是 ip link set {cmd} dev {interface}。比如设置 mtu：</p>
<pre><code>ip link set mtu 3000 dev eth0
</code></pre>
<p>ip 命令还能查看与邻近节点（neighbour）的可达性：</p>
<pre><code>ip n show         // same as ip neigh show
ip n add {ip_addr} lladdr {MAC/LLADDRESS} dev {interface} nud {perm|noarp|stale|reachable}
ip n del {ip_addr} dev eth0
</code></pre>
<p>会输出附近节点的 arp 信息。可以手动添加这些 arp 条目。</p>
<p>路由表信息也由 ip 命令提供，使用 route/r 子命令操作：</p>
<pre><code># list route table
ip r
ip r list 192.168.0.0/24
ip r add {default} {network/mask} dev {interface}
ip r add (default) {network/mask} via {gateway_ip}
ip r del default
ip r del network/mask dev wth0
</code></pre>
<h3 id="_2-ss-命令" tabindex="-1"><a class="header-anchor" href="#_2-ss-命令" aria-hidden="true">#</a> 2.ss 命令</h3>
<p>ss 是另一个很重要的工具，ss 是 socket statistics 的缩写，用于代替之前使用 netstat 命令。ss 能够显示比 netstat 更多的信息并且速度也更快。</p>
<p>netstat 是从 /proc 下的文件中读取信息再整理显示的，而 ss 命令直接从内核空间获取信息。</p>
<pre><code>-n –numeric，显示端口数字而不是服务名字，比如显示 80 而不是 http
-t –tcp， 即显示 tcp 套接字，同理常用 -u 表示 udo 套接字
-l –listening，也好理解，默认不显示监听的套接字，这个参数指明只显示监听中的套接字
-4 –ipv4也是常用的，在查看服务监听状态时，常指定 -4 或者 -6 结果更加清晰
-p –processes,显示使用这个套接字的进程id，这个参数需要 sudo 权限
-s –summary，显示套接字使用的统计信息
-o –options，显示相关的时间信息

netstat -ntpl -&gt;  ss -ntpl
</code></pre>
<p>还可以更具套接字状态过滤输出，比如下面的命令：</p>
<pre><code>ss -t4 state established
ss -t4 state time-wait
</code></pre>
<p>连接的状态有很多中，常用如下：</p>
<pre><code>established
syn-sent
syn-recv
time-wait
closed
closing
all
connected
</code></pre>
<p>还可以通过指定 dport 和 sport 过滤输出：</p>
<pre><code># 还可以使用 or，666
ss -nt dst :443 or dst :80
// dport 大于1024的连接
ss -nt dst gt :1024
</code></pre>
<p>要监控网络流量的动态，可以用 top 相关命令，也可以用 watch 工具：</p>
<pre><code>watch -n 1 &quot;ss -t4&quot;
这样每秒中会刷新一次ss的结果。
</code></pre>
<p>​<br>
​<br>
​<br>
​<br>
​<br>
​<br>
​<br>
​<br>
​</p>
</div></template>


