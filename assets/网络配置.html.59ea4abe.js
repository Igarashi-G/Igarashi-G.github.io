import{_ as a}from"./plugin-vueexport-helper.2444895f.js";import{o as i,c as l,e as r,a as n,b as s,d as t,f as d,r as c}from"./app.37986ebc.js";const o={},u=n("p",null,[s("\u8BB0\u5F55\u672C\u5730\u73AF\u5883\u7684 "),n("strong",null,"VMware"),s(" \u7F51\u7EDC\u914D\u7F6E")],-1),v=n("h2",{id:"vmware-\u7F51\u7EDC\u914D\u7F6E",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#vmware-\u7F51\u7EDC\u914D\u7F6E","aria-hidden":"true"},"#"),s(" VMware \u7F51\u7EDC\u914D\u7F6E")],-1),p={href:"https://blog.csdn.net/shunnianlv/article/details/89247215",target:"_blank",rel:"noopener noreferrer"},m=d(`<h2 id="_1-\u914D\u7F6E\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-\u914D\u7F6E\u6A21\u5F0F" aria-hidden="true">#</a> 1. \u914D\u7F6E\u6A21\u5F0F</h2><h3 id="_1-1-nat-\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-1-nat-\u6A21\u5F0F" aria-hidden="true">#</a> 1.1 NAT \u6A21\u5F0F</h3><p><strong>NAT</strong> \u6865\u63A5\u6A21\u5F0F\uFF0C\u53EA\u8981\u4E3B\u673A\u80FD\u4E0A\u7F51\uFF0C\u865A\u62DF\u673A\u5C31\u80FD\u4E0A\u7F51\uFF0C\u865A\u62DF\u673A\u76F4\u63A5\u8FDE\u901A\u4E3B\u673A\u672C\u673A</p><ul><li>\u4E3B\u673A\u548C\u865A\u62DF\u673A\u53EF\u4EE5 <strong>ping</strong> \u901A</li><li>\u5176\u4ED6\u673A\u5668 <strong>ping</strong> \u4E0D\u901A\u865A\u62DF\u673A\uFF0C\u4E0D\u80FD\u901A\u4FE1</li></ul><h5 id="\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA4" aria-hidden="true">#</a> <strong>\u6B65\u9AA4</strong></h5><ol><li>\u6253\u5F00 <strong>VMware</strong> \u865A\u62DF\u7F51\u7EDC\u914D\u7F6E</li><li>\u9009\u4E00\u4E2A<strong>VMnet</strong> \uFF0C\u5982: <strong>Vmnet8</strong></li><li>\u52FE\u9009 <strong>NAT</strong> \u6A21\u5F0F\uFF0C\u4E0B\u65B9\u4E8C\u9009\u9879\u6253\u52FE <ul><li>\u5B50\u7F51IP\uFF1A192.168.15.0</li><li>\u5B50\u7F51\u63A9\u7801\uFF1A 255.255.255.0</li></ul></li><li>[NAT\u8BBE\u7F6E] <ul><li>\u7F51\u5173\uFF1A192.168.15.111</li></ul></li><li>[DCHP\u8BBE\u7F6E] <ul><li>\u8D77\u59CBIP\uFF1A192.168.15.0</li><li>\u7ED3\u675FIP\uFF1A192.168.15.254</li><li>\u79DF\u7528\u65F6\u95F4\uFF1A63.23.58</li><li>\u6700\u957F\u79DF\u7528\uFF1A63.23.59</li></ul></li></ol><blockquote><p>\u6CE8\u610F\u8FD9\u91CC\u88C5\u955C\u50CF\u65F6\u5199\u7684\u7F51\u5173\uFF0C\u8981\u548C <strong>NAT</strong> \u7684\u7F51\u5173\u4E00\u81F4\uFF0C\u624D\u53EF\u80FD\u88AB\u4E3B\u673A <strong>ping</strong> \u901A\uFF0C\u4E0D\u7136\u4E3B\u673A\u65E0\u6CD5 <strong>ping</strong> \u901A\u865A\u62DF\u673A</p><p>\u5F53\u65F6\u9009\u7684\u662F <strong>CentOS</strong> \u7CFB\u7EDF\uFF0C\u5173\u673A\u6A21\u5F0F\u4E0B\uFF0C\u7F51\u7EDC\u9002\u914D\u5668\u9009\u81EA\u5B9A\u4E49 <strong>VMnet8</strong>\uFF0C\u542F\u52A8\u65F6\u8FDE\u63A5\u6253\u52FE</p></blockquote><h3 id="_1-2-\u6865\u63A5\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-2-\u6865\u63A5\u6A21\u5F0F" aria-hidden="true">#</a> 1.2 \u6865\u63A5\u6A21\u5F0F</h3><p>\u628A <strong>Ubuntu</strong> \u5F53\u6210\u4E00\u4E2A\u548C\u4E3B\u673A\u4E00\u6837\u72EC\u7ACB\u7684\u7535\u8111</p><ul><li>\u4F60\u7684 <strong>PC</strong> \u673A\u3001<strong>Ubuntu</strong> \u865A\u62DF\u673A\u3001\u5F00\u53D1\u677F\u4E09\u8005\u53EF\u4EE5 <strong>ping</strong> \u901A\uFF0C\u53EF\u4EE5\u76F8\u4E92\u901A\u4FE1</li><li>\u865A\u62DF\u673A\u4E5F\u53EF\u4EE5\u548C\u5176\u4ED6\u4E3B\u673A <strong>ping</strong> \u901A</li></ul><h5 id="\u6B65\u9AA4-1" tabindex="-1"><a class="header-anchor" href="#\u6B65\u9AA4-1" aria-hidden="true">#</a> <strong>\u6B65\u9AA4</strong></h5><ol><li>\u6253\u5F00 <strong>VMware</strong> \u865A\u62DF\u7F51\u7EDC\u914D\u7F6E</li><li>\u9009\u4E00\u4E2A <strong>VMnet</strong> \uFF0C\u5982\uFF1A<strong>Vmnet0</strong></li><li>\u52FE\u9009\u6865\u63A5\u6A21\u5F0F\uFF0C\u5DF2\u6865\u63A5\u81F3\u81EA\u52A8</li><li><strong>[\u81EA\u52A8\u8BBE\u7F6E] \u76F8\u5173\u9009\u9879</strong>\uFF0C\u5168\u52FE</li></ol><blockquote><p>\u5173\u673A\u6A21\u5F0F\u4E0B\uFF0C\u7F51\u7EDC\u9002\u914D\u5668\u9009\u6865\u63A5\u6A21\u5F0F\u3001\u590D\u5236\u7269\u7406\u7F51\u7EDC\u6253\u52FE\uFF0C\u542F\u52A8\u65F6\u8FDE\u63A5\u6253\u52FE</p><p>\u82E5\u4EE5\u4E0A\u8BBE\u7F6E\u4E0D\u884C\uFF0C\u5219\u590D\u5236\u7269\u7406\u7F51\u7EDC\u4E0D\u80FD\u6253\u52FE\uFF01\u4E14\u8981\u624B\u52A8\u9009\u62E9\u7F51\u5361\u6BD4\u5982\u624B\u52A8\u4E0B\u62C9\u6846\u9009\u62E9 <strong>realtek</strong> \u745E\u6631\u7F51\u5361</p></blockquote><h2 id="_2-\u4E0D\u540C\u7CFB\u7EDF\u95F4\u914D\u7F6E\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#_2-\u4E0D\u540C\u7CFB\u7EDF\u95F4\u914D\u7F6E\u7F51\u7EDC" aria-hidden="true">#</a> 2. \u4E0D\u540C\u7CFB\u7EDF\u95F4\u914D\u7F6E\u7F51\u7EDC</h2><h3 id="_2-1-centos-\u7CFB\u7EDF\u4E0B" tabindex="-1"><a class="header-anchor" href="#_2-1-centos-\u7CFB\u7EDF\u4E0B" aria-hidden="true">#</a> 2.1 CentOS \u7CFB\u7EDF\u4E0B</h3><p>\u82E5\u6709 nmtui \u76F4\u63A5\u4F7F\u7528 nmtui \u8FDB\u884C\u914D\u7F6E</p><p>\u82E5\u5355\u673A\u73AF\u5883\u4E0B\uFF0C\u9700\u4FEE\u6539\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vim</span> /etc/sysconfig/network-scripts/ifcfg-eth0

<span class="token assign-left variable">DEVICE</span><span class="token operator">=</span>eth0
<span class="token assign-left variable">BOOTPROTO</span><span class="token operator">=</span>static
<span class="token assign-left variable">NAME</span><span class="token operator">=</span>eth0
<span class="token assign-left variable">ONBOOT</span><span class="token operator">=</span>yes
<span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token number">192.168</span>.15.95    <span class="token comment"># \u9700\u8981\u5728NAT\u4E2D\u7684\u7F51\u6BB5\u4E0B192.168.15.xxx</span>
<span class="token assign-left variable">NETMASK</span><span class="token operator">=</span><span class="token number">255.255</span>.255.0
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token number">192.168</span>.15.111  <span class="token comment"># \u9700\u8981\u548CNAT\u4E2D\u8BBE\u7F6E\u7684\u7F51\u5173\u4E00\u81F4</span>

systemctl restart network\u5373\u53EF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-ubuntu-\u7CFB\u7EDF\u4E0B" tabindex="-1"><a class="header-anchor" href="#_2-2-ubuntu-\u7CFB\u7EDF\u4E0B" aria-hidden="true">#</a> 2.2 Ubuntu \u7CFB\u7EDF\u4E0B</h3><h4 id="\u5355\u673A\u73AF\u5883\u4E0B-\u6B64\u4E3A\u65E7\u7248-ubuntu-\u7684\u914D\u7F6E\u4F4D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5355\u673A\u73AF\u5883\u4E0B-\u6B64\u4E3A\u65E7\u7248-ubuntu-\u7684\u914D\u7F6E\u4F4D\u7F6E" aria-hidden="true">#</a> \u5355\u673A\u73AF\u5883\u4E0B\uFF1A[\u6B64\u4E3A\u65E7\u7248 Ubuntu \u7684\u914D\u7F6E\u4F4D\u7F6E]</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/network/interfaces
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>auto lo <span class="token comment"># \u9ED8\u8BA4\u7684lo\u7F51\u5361</span>
iface lo inet loopback

auto ens33  <span class="token comment"># \u5B9E\u9645\u914D\u7F6E\u7684ens33\u7F51\u5361</span>
iface ens33 inet manual <span class="token comment">#</span>
iface ens33 inet static <span class="token comment"># \u8BBE\u7F6E\u4E3A\u9759\u6001</span>
address <span class="token number">172.16</span>.70.118   <span class="token comment">#</span>
netmask <span class="token number">255.255</span>.255.0
geteway <span class="token number">172.16</span>.70.1

<span class="token comment"># \u7136\u540E\u662FDNS\uFF0C\u914D\u7F6E /etc/resolv.conf</span>

<span class="token function">vim</span> /etc/resolv.conf

<span class="token comment"># \u589E\u52A0\u4EE5\u4E0B\u5185\u5BB9\uFF1A</span>
nameserver <span class="token number">8.8</span>.8.8
nameserver <span class="token number">172.16</span>.70.1  <span class="token comment">#</span>

<span class="token comment"># \u589E\u52A0\u9ED8\u8BA4\u7F51\u5173</span>

route <span class="token function">add</span> default gw <span class="token number">172.16</span>.70.1

<span class="token comment"># \u91CD\u65B0\u542F\u52A8\u7F51\u7EDC\u914D\u7F6E</span>
<span class="token function">sudo</span> /etc/init.d/networking restart

<span class="token comment"># \u82E5\u6CA1\u6709 \u5219 sudo ifconfig ens33 up</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u4EE5\u4E0A\u914D\u7F6E\u82E5\u5728\u865A\u62DF\u673A\u73AF\u5883\u4E0B\u4F9D\u7136\u4E0D\u884C\uFF0C\u53EF\u5C1D\u8BD5\u4EE5\u4E0B\u65B9\u6CD5</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4F7F\u7528 dhcilent \u547D\u4EE4</span>
<span class="token comment"># dhcilent \u4F7F\u7528\u52A8\u6001\u4E3B\u673A\u914D\u7F6E\u534F\u8BAE\u52A8\u6001\u7684\u914D\u7F6E\u7F51\u7EDC\u63A5\u53E3\u7684\u7F51\u7EDC\u53C2\u6570</span>
<span class="token comment"># \u8BED\u6CD5\uFF1A</span>
<span class="token comment"># 	dhclient (\u9009\u9879)(\u53C2\u6570)</span>
    \u9009\u9879\uFF1A
        <span class="token number">0</span>\uFF1A\u6307\u5B9Adhcp\u5BA2\u6237\u7AEF\u76D1\u542C\u7684\u7AEF\u53E3\u53F7\uFF1B
        -d:\u603B\u662F\u4EE5\u524D\u53F0\u65B9\u5F0F\u8FD0\u884C\u7A0B\u5E8F\uFF1B
        -q:\u5B89\u9759\u6A21\u5F0F\uFF0C\u4E0D\u6253\u5370\u4EFB\u4F55\u9519\u8BEF\u7684\u63D0\u793A\u4FE1\u606F
        -r:\u91CA\u653EIP\u5730\u5740
    \u53C2\u6570\uFF1A
    	\u7F51\u7EDC\u63A5\u53E3:\u64CD\u4F5C\u7F51\u7EDC\u7684\u63A5

<span class="token function">sudo</span> dhclient ens33
<span class="token function">sudo</span> <span class="token function">ifconfig</span> ens33

<span class="token comment"># ip a \u67E5\u770B\uFF0C\u7136\u540Eping</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u82E5\u662F\u5361\u4F4F\uFF0C\u7EE7\u7EED\u4E0D\u884C\uFF0C\u53EF\u4EE5\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u4E34\u65F6\u8BBE\u7F6E <strong>IP</strong> \u4F46\u91CD\u542F\u540E\u4F1A\u6D88\u5931\uFF08<em>\u4E34\u65F6\u89E3\u51B3\u529E\u6CD5</em>\uFF09</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ifconfig</span> eth0 inet up <span class="token number">192.168</span>.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u5355\u673A\u73AF\u5883\u4E0B-\u6B64\u4E3A\u65B0\u7248-ubuntu-\u7684\u914D\u7F6E\u4F4D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5355\u673A\u73AF\u5883\u4E0B-\u6B64\u4E3A\u65B0\u7248-ubuntu-\u7684\u914D\u7F6E\u4F4D\u7F6E" aria-hidden="true">#</a> \u5355\u673A\u73AF\u5883\u4E0B\uFF1A[\u6B64\u4E3A\u65B0\u7248 Ubuntu \u7684\u914D\u7F6E\u4F4D\u7F6E]</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/netplan/00-installer-config.yaml

\u6865\u63A5\u6A21\u5F0F\u81EA\u52A8\u83B7\u53D6

network:
  ethernets:
    ens33:
      dhcp4: <span class="token boolean">true</span>
      dhcp6: <span class="token boolean">true</span>
  version: <span class="token number">2</span>

\u624B\u52A8\u8BBE\u7F6E

network:
    ethernets:
        ens33:
                <span class="token comment"># dhcp4: true</span>
                addresses:
                        - <span class="token number">192.168</span>.0.203/24
                gateway4: <span class="token number">192.168</span>.0.1
                nameservers:    <span class="token comment"># \u8FD9\u91CC\u914D\u7F6EDNS\uFF0C\u8C8C\u4F3C\u6CA1\u7528</span>
                        addresses:
                                - <span class="token number">192.168</span>.0.1
                optional: <span class="token boolean">true</span>
    version: <span class="token number">2</span>

<span class="token function">sudo</span> netplan apply
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u4EE5\u4E0A <strong>yaml</strong> \u6587\u4EF6\u4E0D\u80FD\u6709 <strong>tab</strong> \u5FC5\u987B\u5168\u4E3A\u7A7A\u683C\uFF0C\u5426\u5219\u62A5\u9519</p></blockquote><p>\u914D\u7F6E DNS</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/resolv.conf

nameserver <span class="token number">8.8</span>.8.8
nameserver <span class="token number">114.114</span>.114.114
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u4E34\u65F6\u914D\u7F6E DNS\uFF0C\u7CFB\u7EDF\u91CD\u542F\u4F1A\u81EA\u52A8\u6D88\u5931</p></blockquote><p>\u6620\u5C04 <code>/run/systemd/resolve/stub-resolv.conf</code> \u91CD\u542F\u4E0D\u6D88\u5931</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /run/systemd/resolve/stub-resolv.conf
nameserver <span class="token number">127.0</span>.0.53
options edns0
nameserver <span class="token number">8.8</span>.8.8
nameserver <span class="token number">114.114</span>.114.114
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34);function b(h,g){const e=c("ExternalLinkIcon");return i(),l("div",null,[u,r(" more "),v,n("p",null,[n("a",p,[s("\u53C2\u8003"),t(e)])]),m])}const _=a(o,[["render",b],["__file","\u7F51\u7EDC\u914D\u7F6E.html.vue"]]);export{_ as default};
