import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as d,f as a}from"./app.3e57035c.js";const i={},s=a(`<h1 id="centos-\u7F51\u7EDC\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#centos-\u7F51\u7EDC\u547D\u4EE4" aria-hidden="true">#</a> CentOS \u7F51\u7EDC\u547D\u4EE4</h1><h2 id="_1-\u7F51\u7EDC-ip-\u6307\u4EE4\u96C6\u5408" tabindex="-1"><a class="header-anchor" href="#_1-\u7F51\u7EDC-ip-\u6307\u4EE4\u96C6\u5408" aria-hidden="true">#</a> 1. \u7F51\u7EDC IP \u6307\u4EE4\u96C6\u5408</h2><blockquote><p><code>CentOS7</code> \u6B63\u5F0F\u5E9F\u5F03\u4E86\u65E7\u5DE5\u5177\u5305\uFF1A<code>ifconfig</code>\u3001<code>netstat</code>\u3001<code>locate</code> \u7B49\u547D\u4EE4\uFF08\u4E5F\u53EF\u4EE5\u7528\uFF0C\u4E0D\u63A8\u8350\uFF09\uFF0C\u65B0\u7CFB\u7EDF\u4F7F\u7528 <code>ip</code>\u3001<code>ss</code>\u3001<code>net</code> \u7B49\u547D\u4EE4\u4EE3\u66FF</p></blockquote><h3 id="_1-\u7F51\u7EDC\u53C2\u6570\u8BBE\u5B9A" tabindex="-1"><a class="header-anchor" href="#_1-\u7F51\u7EDC\u53C2\u6570\u8BBE\u5B9A" aria-hidden="true">#</a> 1.\u7F51\u7EDC\u53C2\u6570\u8BBE\u5B9A\uFF1A</h3><p>\u4EFB\u4F55\u6642\u523B\u5982\u679C\u4F60\u60F3\u8981\u505A\u597D\u4F60\u7684\u7F51\u7EDC\u53C2\u6570\u8BBE\u5B9A\uFF08<code>IP</code>\u3001\u8DEF\u7531\u3001\u65E0\u7EBF\u7F51\u7EDC\uFF09\u5C31\u8981\u4E86\u89E3\u5982\u4E0B\u6307\u4EE4</p><ul><li><strong>ifconfig</strong> \uFF1A\u67E5\u8A62\u3001\u8BBE\u5B9A\u7F51\u5361\u4E0E <code>IP</code> \u7F51\u57DF\u7B49\u76F8\u5173\u53C2\u6570</li><li><strong>ifup, ifdown</strong>\uFF1A\u901A\u8FC7\u547D\u4EE4\u6267\u884C\u7684\u811A\u672C<code>script</code>\uFF0C\u66F4\u7B80\u5355\u7684\u65B9\u5F0F\u4E0A\u4E0B\u7EBF</li><li><strong>route</strong> \uFF1A\u67E5\u8BE2\u3001\u8BBE\u7F6E\u8DEF\u7531\u8868 (route table)</li><li><strong>ip</strong> \uFF1A\u590D\u5408\u5F0F\u7684\u65B0\u6307\u4EE4\uFF0C \u53EF\u4EE5\u76F4\u63A5\u4FEE\u6539\u4E0A\u8FF0\u63D0\u5230\u7684\u529F\u80FD\uFF1B</li></ul><h3 id="_1-1-\u624B\u52A8-\u81EA\u52A8\u8BBE\u7F6E\u542F\u505C-ip" tabindex="-1"><a class="header-anchor" href="#_1-1-\u624B\u52A8-\u81EA\u52A8\u8BBE\u7F6E\u542F\u505C-ip" aria-hidden="true">#</a> 1.1 \u624B\u52A8/\u81EA\u52A8\u8BBE\u7F6E\u542F\u505C IP\uFF1A</h3><p><code>ifup</code> \u548C <code>ifdown</code> \u53EA\u80FD\u542F\u52A8 <code>/etc/sysconfig/network-scripts</code> \u4E0B\u7684 <code>ifcfg-ethX</code> (X \u70BA\u6578\u5B57) \uFF0C\u5E76\u4E0D\u80FD\u76F4\u63A5\u4FEE\u6539\u7F51\u7EDC\u53C2\u6570\uFF0C\u9664\u975E\u624B\u52A8\u8C03\u6574 <code>ifcfg-ethX</code> \u914D\u7F6E\u6587\u4EF6\u624D\u884C\u3002\u4F46 <code>ifconfig</code> \u53EF\u4EE5\u624B\u52A8\u8C03\u53C2\u3002</p><hr><h4 id="ifconfig" tabindex="-1"><a class="header-anchor" href="#ifconfig" aria-hidden="true">#</a> **ifconfig: **</h4><p>\u53EF\u4EE5\u624B\u52A8\u542F\u52A8\u3001\u89C2\u5BDF\u4E0E\u4FEE\u6539\u7F51\u7EDC\u754C\u9762\u7684\u76F8\u5173\u53C2\u6570\uFF0C\u8A9E\u6CD5\u5982\u4E0B\uFF1A</p><p><strong>\u5217\u6240\u6709\u7F51\u5361</strong>\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ifconfig</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5217\u51FA\u5DF2\u7ECF\u542F\u52A8\u7684\u7F51\u5361\uFF0C\u65E0\u8BBA\u8BE5\u7F51\u5361\u662F\u5426\u5206\u914D\u4E86<code>IP</code>\uFF0C\u5747\u663E\u793A</p><p>\u5404\u53C2\u6570\u542B\u4E49\u5982\u4E0B\uFF1A</p><ul><li><strong>HWaddr</strong>\uFF1A\u7F51\u5361\u7684\u786C\u4EF6\u5730\u5740\uFF0C\u5373 <code>MAC</code> \u5730\u5740</li><li><strong>inet addr</strong>\uFF1A<code>IPv4</code> \u7684 <code>IP</code> \u4F4D\u5740\uFF0C\u540E\u7EED\u7684 <code>Bcast</code>, <code>Mask</code> \u5206\u5225\u4EE3\u8868\u7684\u662F <code>Broadcast</code> \u4E0E <code>netmask</code></li><li><strong>inet6 addr</strong>\uFF1A\u662F <code>IPv6</code> \u7684\u7248\u672C\u7684 <code>IP</code></li><li><strong>MTU</strong>\uFF1A\u6700\u5927\u4F20\u8F93\u5355\u4F4D\uFF0C</li><li>\u6700\u5927\u554A\uFF01\u5305\u63A5\u6536\u60C5\u6CC1\uFF0C packets \u4EE3\u8868\u5C01\u5305\u6578\u3001errors \u4EE3\u8868\u5C01\u5305\u767C\u751F\u932F\u8AA4\u7684\u6578\u91CF\u3001 dropped \u4EE3\u8868\u5C01\u5305\u7531\u65BC\u6709\u554F\u984C\u800C\u906D\u4E1F\u68C4\u7684\u6578\u91CF\u7B49\u7B49</li><li><strong>TX</strong>\uFF1A\u8207 RX \u76F8\u53CD\uFF0C\u70BA\u7DB2\u8DEF\u7531\u555F\u52D5\u5230\u76EE\u524D\u70BA\u6B62\u7684\u50B3\u9001\u60C5\u6CC1\uFF1B</li><li><strong>collisions</strong>\uFF1A\u4EE3\u8868\u5C01\u5305\u78B0\u649E\u7684\u60C5\u6CC1\uFF0C\u5982\u679C\u767C\u751F\u592A\u591A\u6B21\uFF0C \u8868\u793A\u4F60\u7684\u7DB2\u8DEF\u72C0\u6CC1\u4E0D\u592A\u597D\uFF1B</li><li><strong>txqueuelen</strong>\uFF1A\u4EE3\u8868\u7528\u4F86\u4F20\u8F93\u8D44\u6599\u7684\u7F13\u5B58\u533A\u7684\u50A8\u5B58\u957F\u5EA6</li><li><strong>RX bytes, TX bytes</strong>\uFF1A\u7E3D\u63A5\u6536\u3001\u50B3\u9001\u7684\u4F4D\u5143\u7D44\u7E3D\u91CF</li></ul><p><strong>\u5217\u51FA\u6307\u5B9A\u7F51\u5361\u4FE1\u606F</strong>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ifconfig {interface}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>interface</code>\uFF1A\u7F51\u5361\uFF0C \u5982 <code>lo\uFF1A</code> \uFF08<code>loopback</code> \u8868\u793A\u672C\u673A\u56DE\u73AF\u5730\u5740\uFF09\u3001<code>eth0</code>\u3001<code>eth1</code> \u7B49\u7F51\u5361\u4EE3\u53F7</li></ul><p><strong>\u5F00\u542F\uFF0C\u5173\u95ED\u7F51\u5361</strong>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ifconfig {interface} {up|down}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u8BBE\u7F6E\u5176\u4ED6\u9009\u9879</span>
<span class="token function">ifconfig</span> interface <span class="token punctuation">{</span>options<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li></li></ul><p>\u4E8C\u7EA7\u547D\u4EE4\u975E\u5E38\u591A\uFF0C\u5F88\u96BE\u8BB0\u3002\u6700\u5E38\u7528\u7684\u662F ip addr \u4E5F\u53EF\u4EE5\u7B80\u5199\u4E3A ip a . \u64CD\u4F5C\u7F51\u7EDC\u5730\u5740\u76F8\u5173\u5185\u5BB9\uFF0C\u6BD4\u5982\u5217\u51FA ip \u5730\u5740\uFF0C\u6DFB\u52A0 ip \u5730\u5740\uFF0C\u5220\u9664 ip \u7B49\u5F85</p><pre><code>\u5217\u51FAip\u5730\u5740\uFF1A addr \u5E38\u7528 a \u4EE3\u66FF
ip addr show    -&gt;  \u7B80\u5316 ip a

\u663E\u793A V4 \u3001V6 \u5730\u5740
ip -4 a     /   ip -6 a

# \u663E\u793A eth0 \u7F51\u5361
ip a show eth0

# \u663E\u793A\u6B63\u5728\u8FD0\u884C\u7F51\u5361
ip link ls up

# \u6DFB\u52A0 ip \u5730\u5740
ip a add {ip_addr/mask} dev {intereface} [label label_name] // \u53EF\u9009\u7684\u8BBE\u7F6E\u4E00\u4E2Alabel
ip addr add 192.168.0.123/24 dev eth0
</code></pre><ul><li><p>\u5982\u679C\u8FD4\u56DE\u503C\u4E3A 0 \u6267\u884C arping -I $dev -c 3 -b -s $ip 1.1.1.1</p><pre><code>  arping -I eth0 -c 3 -b -s 192.168.10.23 1.1.1.1
</code></pre><p>\u200B</p><h1 id="\u5220\u9664-ip-\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664-ip-\u5730\u5740" aria-hidden="true">#</a> \u5220\u9664 ip \u5730\u5740</h1><p>ip a del {ip_addr} dev {interface} ip addr del 192.168.0.123 dev eth0</p><h1 id="flush-ip-address-delete-all-the-ip-addresses-matches" tabindex="-1"><a class="header-anchor" href="#flush-ip-address-delete-all-the-ip-addresses-matches" aria-hidden="true">#</a> flush ip address; delete all the IP addresses matches</h1><h1 id="\u53EF\u4EE5-flush-\u4E00\u4E2A\u5730\u5740\u6216\u8005\u4E00\u4E2A-label-\u6807\u8BB0\u7684\u6240\u6709\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#\u53EF\u4EE5-flush-\u4E00\u4E2A\u5730\u5740\u6216\u8005\u4E00\u4E2A-label-\u6807\u8BB0\u7684\u6240\u6709\u5730\u5740" aria-hidden="true">#</a> \u53EF\u4EE5 flush \u4E00\u4E2A\u5730\u5740\u6216\u8005\u4E00\u4E2A label \u6807\u8BB0\u7684\u6240\u6709\u5730\u5740</h1><p>ip a flush label &quot;label&quot; ip -s a f to 192.168.2.0/24 // -s \u8F93\u51FA\u7EDF\u8BA1\u4FE1\u606F to limit to given IP address/prefix</p><h1 id="up-or-down-a-device" tabindex="-1"><a class="header-anchor" href="#up-or-down-a-device" aria-hidden="true">#</a> up or down a device</h1><p>ip link set dev {interface} {up|down} ip l set dev eth0 down</p></li></ul><p>ip link set \u547D\u4EE4\u53EF\u4EE5\u8BBE\u7F6E\u5F88\u591A\u7684\u503C\uFF0C\u770B\u4E00\u4E0B\u81EA\u52A8\u8865\u5168\u63D0\u793A\uFF1A link \u7B80\u5316 l</p><pre><code>$ ip l set &lt;tab&gt;
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
</code></pre><p>\u4E00\u822C\u7528\u6CD5\u90FD\u662F ip link set {cmd} dev {interface}\u3002\u6BD4\u5982\u8BBE\u7F6E mtu\uFF1A</p><pre><code>ip link set mtu 3000 dev eth0
</code></pre><p>ip \u547D\u4EE4\u8FD8\u80FD\u67E5\u770B\u4E0E\u90BB\u8FD1\u8282\u70B9\uFF08neighbour\uFF09\u7684\u53EF\u8FBE\u6027\uFF1A</p><pre><code>ip n show         // same as ip neigh show
ip n add {ip_addr} lladdr {MAC/LLADDRESS} dev {interface} nud {perm|noarp|stale|reachable}
ip n del {ip_addr} dev eth0
</code></pre><p>\u4F1A\u8F93\u51FA\u9644\u8FD1\u8282\u70B9\u7684 arp \u4FE1\u606F\u3002\u53EF\u4EE5\u624B\u52A8\u6DFB\u52A0\u8FD9\u4E9B arp \u6761\u76EE\u3002</p><p>\u8DEF\u7531\u8868\u4FE1\u606F\u4E5F\u7531 ip \u547D\u4EE4\u63D0\u4F9B\uFF0C\u4F7F\u7528 route/r \u5B50\u547D\u4EE4\u64CD\u4F5C\uFF1A</p><pre><code># list route table
ip r
ip r list 192.168.0.0/24
ip r add {default} {network/mask} dev {interface}
ip r add (default) {network/mask} via {gateway_ip}
ip r del default
ip r del network/mask dev wth0
</code></pre><h3 id="_2-ss-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_2-ss-\u547D\u4EE4" aria-hidden="true">#</a> 2.ss \u547D\u4EE4</h3><p>ss \u662F\u53E6\u4E00\u4E2A\u5F88\u91CD\u8981\u7684\u5DE5\u5177\uFF0Css \u662F socket statistics \u7684\u7F29\u5199\uFF0C\u7528\u4E8E\u4EE3\u66FF\u4E4B\u524D\u4F7F\u7528 netstat \u547D\u4EE4\u3002ss \u80FD\u591F\u663E\u793A\u6BD4 netstat \u66F4\u591A\u7684\u4FE1\u606F\u5E76\u4E14\u901F\u5EA6\u4E5F\u66F4\u5FEB\u3002</p><p>netstat \u662F\u4ECE /proc \u4E0B\u7684\u6587\u4EF6\u4E2D\u8BFB\u53D6\u4FE1\u606F\u518D\u6574\u7406\u663E\u793A\u7684\uFF0C\u800C ss \u547D\u4EE4\u76F4\u63A5\u4ECE\u5185\u6838\u7A7A\u95F4\u83B7\u53D6\u4FE1\u606F\u3002</p><pre><code>-n \u2013numeric\uFF0C\u663E\u793A\u7AEF\u53E3\u6570\u5B57\u800C\u4E0D\u662F\u670D\u52A1\u540D\u5B57\uFF0C\u6BD4\u5982\u663E\u793A 80 \u800C\u4E0D\u662F http
-t \u2013tcp\uFF0C \u5373\u663E\u793A tcp \u5957\u63A5\u5B57\uFF0C\u540C\u7406\u5E38\u7528 -u \u8868\u793A udo \u5957\u63A5\u5B57
-l \u2013listening\uFF0C\u4E5F\u597D\u7406\u89E3\uFF0C\u9ED8\u8BA4\u4E0D\u663E\u793A\u76D1\u542C\u7684\u5957\u63A5\u5B57\uFF0C\u8FD9\u4E2A\u53C2\u6570\u6307\u660E\u53EA\u663E\u793A\u76D1\u542C\u4E2D\u7684\u5957\u63A5\u5B57
-4 \u2013ipv4\u4E5F\u662F\u5E38\u7528\u7684\uFF0C\u5728\u67E5\u770B\u670D\u52A1\u76D1\u542C\u72B6\u6001\u65F6\uFF0C\u5E38\u6307\u5B9A -4 \u6216\u8005 -6 \u7ED3\u679C\u66F4\u52A0\u6E05\u6670
-p \u2013processes,\u663E\u793A\u4F7F\u7528\u8FD9\u4E2A\u5957\u63A5\u5B57\u7684\u8FDB\u7A0Bid\uFF0C\u8FD9\u4E2A\u53C2\u6570\u9700\u8981 sudo \u6743\u9650
-s \u2013summary\uFF0C\u663E\u793A\u5957\u63A5\u5B57\u4F7F\u7528\u7684\u7EDF\u8BA1\u4FE1\u606F
-o \u2013options\uFF0C\u663E\u793A\u76F8\u5173\u7684\u65F6\u95F4\u4FE1\u606F

netstat -ntpl -&gt;  ss -ntpl
</code></pre><p>\u8FD8\u53EF\u4EE5\u66F4\u5177\u5957\u63A5\u5B57\u72B6\u6001\u8FC7\u6EE4\u8F93\u51FA\uFF0C\u6BD4\u5982\u4E0B\u9762\u7684\u547D\u4EE4\uFF1A</p><pre><code>ss -t4 state established
ss -t4 state time-wait
</code></pre><p>\u8FDE\u63A5\u7684\u72B6\u6001\u6709\u5F88\u591A\u4E2D\uFF0C\u5E38\u7528\u5982\u4E0B\uFF1A</p><pre><code>established
syn-sent
syn-recv
time-wait
closed
closing
all
connected
</code></pre><p>\u8FD8\u53EF\u4EE5\u901A\u8FC7\u6307\u5B9A dport \u548C sport \u8FC7\u6EE4\u8F93\u51FA\uFF1A</p><pre><code># \u8FD8\u53EF\u4EE5\u4F7F\u7528 or\uFF0C666
ss -nt dst :443 or dst :80
// dport \u5927\u4E8E1024\u7684\u8FDE\u63A5
ss -nt dst gt :1024
</code></pre><p>\u8981\u76D1\u63A7\u7F51\u7EDC\u6D41\u91CF\u7684\u52A8\u6001\uFF0C\u53EF\u4EE5\u7528 top \u76F8\u5173\u547D\u4EE4\uFF0C\u4E5F\u53EF\u4EE5\u7528 watch \u5DE5\u5177\uFF1A</p><pre><code>watch -n 1 &quot;ss -t4&quot;
\u8FD9\u6837\u6BCF\u79D2\u4E2D\u4F1A\u5237\u65B0\u4E00\u6B21ss\u7684\u7ED3\u679C\u3002
</code></pre><p>\u200B<br> \u200B<br> \u200B<br> \u200B<br> \u200B<br> \u200B<br> \u200B<br> \u200B<br> \u200B</p>`,48),t=[s];function o(r,c){return n(),d("div",null,t)}const h=e(i,[["render",o],["__file","\u547D\u4EE4.html.vue"]]);export{h as default};
