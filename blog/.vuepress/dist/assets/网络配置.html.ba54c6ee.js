import{_ as r}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as s,a as n,b as o,d as e,f as d,r as i}from"./app.30cb87a4.js";const c={},p=n("h1",{id:"\u865A\u62DF\u673A\u7F51\u7EDC\u914D\u7F6E",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u865A\u62DF\u673A\u7F51\u7EDC\u914D\u7F6E","aria-hidden":"true"},"#"),e(" \u865A\u62DF\u673A\u7F51\u7EDC\u914D\u7F6E")],-1),h=n("h2",{id:"\u4E00\u3001\u914D\u7F6E\u6A21\u5F0F",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4E00\u3001\u914D\u7F6E\u6A21\u5F0F","aria-hidden":"true"},"#"),e(" \u4E00\u3001\u914D\u7F6E\u6A21\u5F0F")],-1),u={href:"https://blog.csdn.net/shunnianlv/article/details/89247215",target:"_blank",rel:"noopener noreferrer"},l=e("https://blog.csdn.net/shunnianlv/article/details/89247215"),f=d(`<h3 id="_1-nat-\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-nat-\u6A21\u5F0F" aria-hidden="true">#</a> 1.NAT \u6A21\u5F0F\uFF1A</h3><p>NAT \u6A21\u5F0F\u4E2D\u53EA\u8981\u4E3B\u673A\u80FD\u4E0A\u7F51\uFF0C\u865A\u62DF\u673A\u5C31\u80FD\u4E0A\u7F51\uFF0C\u800C\u4E14\u4E3B\u673A\u548C\u865A\u62DF\u673A\u53EF\u4EE5 ping \u901A\uFF0C\u5176\u4ED6\u673A\u5668\u4E0D\u53EF\u4EE5 ping \u865A\u62DF\u673A\uFF0C\u4E5F\u5C31\u662F\u4E0D\u80FD\u901A\u4FE1\u3002 \u91C7\u7528 NAT \u6A21\u5F0F\u6865\u63A5\uFF0C\u76F4\u63A5\u5C31\u662F\u865A\u62DF\u673A\u8FDE\u540C\u4E3B\u673A\u672C\u673A</p><pre><code>\u4F8B\uFF1A
    \u6253\u5F00 VMware \u865A\u62DF\u7F51\u7EDC\u914D\u7F6E
    \u9009\u4E00\u4E2AVMnet \u5982Vmnet8
    \u52FE\u9009NAT\u6A21\u5F0F\uFF0C\u4E0B\u65B9\u4E8C\u9009\u9879\u6253\u52FE
    \u5B50\u7F51IP\uFF1A192.168.15.0
    \u5B50\u7F51\u63A9\u7801\uFF1A 255.255.255.0

    [NAT\u8BBE\u7F6E]\uFF1A
    \u7F51\u5173\uFF1A192.168.15.111

    [DCHP\u8BBE\u7F6E]\uFF1A
    \u8D77\u59CBIP\uFF1A192.168.15.0
    \u7ED3\u675FIP\uFF1A192.168.15.254
    \u79DF\u7528\u65F6\u95F4\uFF1A63.23.58
    \u6700\u957F\u79DF\u7528\uFF1A63.23.59

\u6CE8\u610F\u8FD9\u91CC\u88C5\u955C\u50CF\u65F6\u5199\u7684\u7F51\u5173\uFF0C\u8981\u548CNAT\u7684\u7F51\u5173\u4E00\u81F4\uFF0C\u624D\u53EF\u80FD\u88AB\u4E3B\u673Aping\u901A\uFF0C\u4E0D\u7136\u4E3B\u673A\u65E0\u6CD5ping\u901A\u865A\u62DF\u673A

\u5F53\u65F6\u9009\u7684\u662FCentOS\u7CFB\u7EDF\uFF0C\u5173\u673A\u6A21\u5F0F\u4E0B\uFF0C\u7F51\u7EDC\u9002\u914D\u5668\u9009\u81EA\u5B9A\u4E49VMnet8\uFF0C\u542F\u52A8\u65F6\u8FDE\u63A5\u6253\u52FE
</code></pre><h3 id="_2-\u6865\u63A5\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_2-\u6865\u63A5\u6A21\u5F0F" aria-hidden="true">#</a> 2.\u6865\u63A5\u6A21\u5F0F\uFF1A</h3><p>\u5C31\u662F\u628A ubuntu \u5F53\u6210\u4E00\u4E2A\u548C\u4E3B\u673A\u4E00\u6837\u7684\u7535\u8111\uFF0C\u8FD9\u6837\u7684\u8BDD\uFF0C\u4F60\u7684 PC \u673A\u3001ubuntu \u865A\u62DF\u673A\u3001\u5F00\u53D1\u677F\u4E09\u8005\u53EF\u4EE5 ping \u901A\uFF0C\u53EF\u4EE5\u76F8\u4E92\u901A\u4FE1\uFF0C\u865A\u62DF\u673A\u4E5F\u53EF\u4EE5\u548C\u5176\u4ED6\u4E3B\u673A ping \u901A\u3002</p><pre><code>\u4F8B\uFF1A
    \u6253\u5F00 VMware \u865A\u62DF\u7F51\u7EDC\u914D\u7F6E
    \u9009\u4E00\u4E2AVMnet \u5982Vmnet0
    \u52FE\u9009\u6865\u63A5\u6A21\u5F0F\uFF0C\u5DF2\u6865\u63A5\u81F3\u81EA\u52A8

    [\u81EA\u52A8\u8BBE\u7F6E]\uFF1A
    \u5168\u52FE

\u5F53\u65F6\u9009\u7684\u662FUbuntu\u7CFB\u7EDF\uFF0C\u5173\u673A\u6A21\u5F0F\u4E0B\uFF0C\u7F51\u7EDC\u9002\u914D\u5668\u9009\u6865\u63A5\u6A21\u5F0F\u3001\u590D\u5236\u7269\u7406\u7F51\u7EDC\u6253\u52FE\uFF0C\u542F\u52A8\u65F6\u8FDE\u63A5\u6253\u52FE
</code></pre><p>[\u6CE8]\uFF1A\u82E5\u4EE5\u4E0A\u8BBE\u7F6E\u4E0D\u884C\uFF0C\u5219\u590D\u5236\u7269\u7406\u7F51\u7EDC\u4E0D\u80FD\u6253\u52FE\uFF01\u4E14\u8981\u624B\u52A8\u9009\u62E9\u7F51\u5361\u6BD4\u5982\u624B\u52A8\u4E0B\u62C9\u6846\u9009\u62E9 realtek \u745E\u6631\u7F51\u5361</p><h2 id="\u4E8C\u3001\u4E0D\u540C\u7CFB\u7EDF\u95F4\u914D\u7F6E-ip-\u5E76-ping-\u901A" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001\u4E0D\u540C\u7CFB\u7EDF\u95F4\u914D\u7F6E-ip-\u5E76-ping-\u901A" aria-hidden="true">#</a> \u4E8C\u3001\u4E0D\u540C\u7CFB\u7EDF\u95F4\u914D\u7F6E ip \u5E76 ping \u901A</h2><h3 id="_1-centos-\u7CFB\u7EDF\u4E0B" tabindex="-1"><a class="header-anchor" href="#_1-centos-\u7CFB\u7EDF\u4E0B" aria-hidden="true">#</a> 1.CentOS \u7CFB\u7EDF\u4E0B\uFF1A</h3><p>\u82E5\u6709 nmtui \u76F4\u63A5\u4F7F\u7528 nmtui \u8FDB\u884C\u914D\u7F6E</p><p>\u82E5\u5355\u673A\u73AF\u5883\u4E0B\uFF0C\u9700\u4FEE\u6539\uFF1A</p><pre><code>vim /etc/sysconfig/network-scripts/ifcfg-eth0

DEVICE=eth0
BOOTPROTO=static
NAME=eth0
ONBOOT=yes
IPADDR=192.168.15.95    # \u9700\u8981\u5728NAT\u4E2D\u7684\u7F51\u6BB5\u4E0B192.168.15.xxx
NETMASK=255.255.255.0
GATEWAY=192.168.15.111  # \u9700\u8981\u548CNAT\u4E2D\u8BBE\u7F6E\u7684\u7F51\u5173\u4E00\u81F4

systemctl restart network\u5373\u53EF
</code></pre><h3 id="_2-ubuntu-\u7CFB\u7EDF\u4E0B" tabindex="-1"><a class="header-anchor" href="#_2-ubuntu-\u7CFB\u7EDF\u4E0B" aria-hidden="true">#</a> 2.Ubuntu \u7CFB\u7EDF\u4E0B\uFF1A</h3><h4 id="\u5355\u673A\u73AF\u5883\u4E0B-\u6B64\u4E3A\u65E7\u7248-ubuntu-\u7684\u914D\u7F6E\u4F4D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5355\u673A\u73AF\u5883\u4E0B-\u6B64\u4E3A\u65E7\u7248-ubuntu-\u7684\u914D\u7F6E\u4F4D\u7F6E" aria-hidden="true">#</a> \u5355\u673A\u73AF\u5883\u4E0B\uFF1A[\u6B64\u4E3A\u65E7\u7248 Ubuntu \u7684\u914D\u7F6E\u4F4D\u7F6E]</h4><pre><code>sudo vim /etc/network/interfaces


auto lo # \u9ED8\u8BA4\u7684lo\u7F51\u5361
iface lo inet loopback

auto ens33  # \u5B9E\u9645\u914D\u7F6E\u7684ens33\u7F51\u5361
iface ens33 inet manual #
iface ens33 inet static # \u8BBE\u7F6E\u4E3A\u9759\u6001
address 172.16.70.118   #
netmask 255.255.255.0
geteway 172.16.70.1

\u7136\u540E\u662FDNS\uFF0C\u914D\u7F6E /etc/resolv.conf

vim /etc/resolv.conf

\u589E\u52A0\u4EE5\u4E0B\u5185\u5BB9\uFF1A
nameserver 8.8.8.8
nameserver 172.16.70.1  #

\u589E\u52A0\u9ED8\u8BA4\u7F51\u5173

route add default gw 172.16.70.1

\u91CD\u65B0\u542F\u52A8\u7F51\u7EDC\u914D\u7F6E
sudo /etc/init.d/networking restart
\u82E5\u6CA1\u6709 \u5219 sudo ifconfig ens33 up
</code></pre><p>[\u6CE8]\uFF1A\u4EE5\u4E0A\u914D\u7F6E\u82E5\u5728\u865A\u62DF\u673A\u73AF\u5883\u4E0B\u4F9D\u7136\u4E0D\u884C\uFF0C\u53EF\u5C1D\u8BD5\u4EE5\u4E0B\u65B9\u6CD5</p><pre><code>\u4F7F\u7528 dhcilent \u547D\u4EE4
dhcilent \u4F7F\u7528\u52A8\u6001\u4E3B\u673A\u914D\u7F6E\u534F\u8BAE\u52A8\u6001\u7684\u914D\u7F6E\u7F51\u7EDC\u63A5\u53E3\u7684\u7F51\u7EDC\u53C2\u6570
\u8BED\u6CD5\uFF1A
dhclient (\u9009\u9879)(\u53C2\u6570)
\u9009\u9879\uFF1A
0\uFF1A\u6307\u5B9Adhcp\u5BA2\u6237\u7AEF\u76D1\u542C\u7684\u7AEF\u53E3\u53F7\uFF1B
-d:\u603B\u662F\u4EE5\u524D\u53F0\u65B9\u5F0F\u8FD0\u884C\u7A0B\u5E8F\uFF1B
-q:\u5B89\u9759\u6A21\u5F0F\uFF0C\u4E0D\u6253\u5370\u4EFB\u4F55\u9519\u8BEF\u7684\u63D0\u793A\u4FE1\u606F
-r:\u91CA\u653EIP\u5730\u5740
\u53C2\u6570\uFF1A
\u7F51\u7EDC\u63A5\u53E3:\u64CD\u4F5C\u7F51\u7EDC\u7684\u63A5

sudo dhclient ens33
sudo ifconfig ens33

ip a\u67E5\u770B\uFF0C\u7136\u540Eping
</code></pre><p>[\u518D\u6CE8]\uFF1A\u82E5\u662F\u5361\u4F4F\uFF0C\u7EE7\u7EED\u4E0D\u884C\uFF0C\u53EF\u4EE5\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u4E34\u65F6\u8BBE\u7F6E ip \u4F46\u91CD\u542F\u540E\u4F1A\u6D88\u5931\uFF08\u4E34\u65F6\u89E3\u51B3\u529E\u6CD5\uFF09</p><pre><code>ifconfig eth0 inet up 192.168.0.1
</code></pre><h4 id="\u5355\u673A\u73AF\u5883\u4E0B-\u6B64\u4E3A\u65B0\u7248-ubuntu-\u7684\u914D\u7F6E\u4F4D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u5355\u673A\u73AF\u5883\u4E0B-\u6B64\u4E3A\u65B0\u7248-ubuntu-\u7684\u914D\u7F6E\u4F4D\u7F6E" aria-hidden="true">#</a> \u5355\u673A\u73AF\u5883\u4E0B\uFF1A[\u6B64\u4E3A\u65B0\u7248 Ubuntu \u7684\u914D\u7F6E\u4F4D\u7F6E]</h4><pre><code>sudo vim /etc/netplan/00-installer-config.yaml

\u6865\u63A5\u6A21\u5F0F\u81EA\u52A8\u83B7\u53D6

network:
  ethernets:
    ens33:
      dhcp4: true
      dhcp6: true
  version: 2

\u624B\u52A8\u8BBE\u7F6E

network:
    ethernets:
        ens33:
                # dhcp4: true
                addresses:
                        - 192.168.0.203/24
                gateway4: 192.168.0.1
                nameservers:    # \u8FD9\u91CC\u914D\u7F6EDNS\uFF0C\u8C8C\u4F3C\u6CA1\u7528
                        addresses:
                                - 192.168.0.1
                optional: true
    version: 2

sudo netplan apply
</code></pre><p>[\u6CE8\u610F]\uFF1A\u4EE5\u4E0A yaml \u6587\u4EF6\u4E0D\u80FD\u6709 tab \u5FC5\u987B\u5168\u4E3A\u7A7A\u683C\uFF0C\u5426\u5219\u62A5\u9519</p><p>\u914D\u7F6E DNS\uFF1A</p><pre><code>sudo vim /etc/resolv.conf

nameserver 8.8.8.8
nameserver 114.114.114.114
</code></pre><p>[\u6CE8]\uFF1A\u6B64\u4E3A\u4E34\u65F6\u914D\u7F6E DNS\uFF0C\u7CFB\u7EDF\u91CD\u542F\u4F1A\u81EA\u52A8\u6D88\u5931</p><p>\u6620\u5C04 /run/systemd/resolve/stub-resolv.conf \u91CD\u542F\u4E0D\u6D88\u5931</p><pre><code>sudo vim /run/systemd/resolve/stub-resolv.conf
nameserver 127.0.0.53
options edns0
nameserver 8.8.8.8
nameserver 114.114.114.114
</code></pre>`,27);function _(m,b){const t=i("ExternalLinkIcon");return a(),s("div",null,[p,h,n("p",null,[n("a",u,[l,o(t)])]),f])}const N=r(c,[["render",_],["__file","\u7F51\u7EDC\u914D\u7F6E.html.vue"]]);export{N as default};
