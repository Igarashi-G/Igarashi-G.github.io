<template><div><h1 id="虚拟机网络配置" tabindex="-1"><a class="header-anchor" href="#虚拟机网络配置" aria-hidden="true">#</a> 虚拟机网络配置</h1>
<h2 id="一、配置模式" tabindex="-1"><a class="header-anchor" href="#一、配置模式" aria-hidden="true">#</a> 一、配置模式</h2>
<p><a href="https://blog.csdn.net/shunnianlv/article/details/89247215" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/shunnianlv/article/details/89247215<ExternalLinkIcon/></a></p>
<h3 id="_1-nat-模式" tabindex="-1"><a class="header-anchor" href="#_1-nat-模式" aria-hidden="true">#</a> 1.NAT 模式：</h3>
<p>NAT 模式中只要主机能上网，虚拟机就能上网，而且主机和虚拟机可以 ping 通，其他机器不可以 ping 虚拟机，也就是不能通信。
采用 NAT 模式桥接，直接就是虚拟机连同主机本机</p>
<pre><code>例：
    打开 VMware 虚拟网络配置
    选一个VMnet 如Vmnet8
    勾选NAT模式，下方二选项打勾
    子网IP：192.168.15.0
    子网掩码： 255.255.255.0

    [NAT设置]：
    网关：192.168.15.111

    [DCHP设置]：
    起始IP：192.168.15.0
    结束IP：192.168.15.254
    租用时间：63.23.58
    最长租用：63.23.59

注意这里装镜像时写的网关，要和NAT的网关一致，才可能被主机ping通，不然主机无法ping通虚拟机

当时选的是CentOS系统，关机模式下，网络适配器选自定义VMnet8，启动时连接打勾
</code></pre>
<h3 id="_2-桥接模式" tabindex="-1"><a class="header-anchor" href="#_2-桥接模式" aria-hidden="true">#</a> 2.桥接模式：</h3>
<p>就是把 ubuntu 当成一个和主机一样的电脑，这样的话，你的 PC 机、ubuntu 虚拟机、开发板三者可以 ping 通，可以相互通信，虚拟机也可以和其他主机 ping 通。</p>
<pre><code>例：
    打开 VMware 虚拟网络配置
    选一个VMnet 如Vmnet0
    勾选桥接模式，已桥接至自动

    [自动设置]：
    全勾

当时选的是Ubuntu系统，关机模式下，网络适配器选桥接模式、复制物理网络打勾，启动时连接打勾
</code></pre>
<p>[注]：若以上设置不行，则复制物理网络不能打勾！且要手动选择网卡比如手动下拉框选择 realtek 瑞昱网卡</p>
<h2 id="二、不同系统间配置-ip-并-ping-通" tabindex="-1"><a class="header-anchor" href="#二、不同系统间配置-ip-并-ping-通" aria-hidden="true">#</a> 二、不同系统间配置 ip 并 ping 通</h2>
<h3 id="_1-centos-系统下" tabindex="-1"><a class="header-anchor" href="#_1-centos-系统下" aria-hidden="true">#</a> 1.CentOS 系统下：</h3>
<p>若有 nmtui 直接使用 nmtui 进行配置</p>
<p>若单机环境下，需修改：</p>
<pre><code>vim /etc/sysconfig/network-scripts/ifcfg-eth0

DEVICE=eth0
BOOTPROTO=static
NAME=eth0
ONBOOT=yes
IPADDR=192.168.15.95    # 需要在NAT中的网段下192.168.15.xxx
NETMASK=255.255.255.0
GATEWAY=192.168.15.111  # 需要和NAT中设置的网关一致

systemctl restart network即可
</code></pre>
<h3 id="_2-ubuntu-系统下" tabindex="-1"><a class="header-anchor" href="#_2-ubuntu-系统下" aria-hidden="true">#</a> 2.Ubuntu 系统下：</h3>
<h4 id="单机环境下-此为旧版-ubuntu-的配置位置" tabindex="-1"><a class="header-anchor" href="#单机环境下-此为旧版-ubuntu-的配置位置" aria-hidden="true">#</a> 单机环境下：[此为旧版 Ubuntu 的配置位置]</h4>
<pre><code>sudo vim /etc/network/interfaces


auto lo # 默认的lo网卡
iface lo inet loopback

auto ens33  # 实际配置的ens33网卡
iface ens33 inet manual #
iface ens33 inet static # 设置为静态
address 172.16.70.118   #
netmask 255.255.255.0
geteway 172.16.70.1

然后是DNS，配置 /etc/resolv.conf

vim /etc/resolv.conf

增加以下内容：
nameserver 8.8.8.8
nameserver 172.16.70.1  #

增加默认网关

route add default gw 172.16.70.1

重新启动网络配置
sudo /etc/init.d/networking restart
若没有 则 sudo ifconfig ens33 up
</code></pre>
<p>[注]：以上配置若在虚拟机环境下依然不行，可尝试以下方法</p>
<pre><code>使用 dhcilent 命令
dhcilent 使用动态主机配置协议动态的配置网络接口的网络参数
语法：
dhclient (选项)(参数)
选项：
0：指定dhcp客户端监听的端口号；
-d:总是以前台方式运行程序；
-q:安静模式，不打印任何错误的提示信息
-r:释放IP地址
参数：
网络接口:操作网络的接

sudo dhclient ens33
sudo ifconfig ens33

ip a查看，然后ping
</code></pre>
<p>[再注]：若是卡住，继续不行，可以执行以下命令，临时设置 ip 但重启后会消失（临时解决办法）</p>
<pre><code>ifconfig eth0 inet up 192.168.0.1
</code></pre>
<h4 id="单机环境下-此为新版-ubuntu-的配置位置" tabindex="-1"><a class="header-anchor" href="#单机环境下-此为新版-ubuntu-的配置位置" aria-hidden="true">#</a> 单机环境下：[此为新版 Ubuntu 的配置位置]</h4>
<pre><code>sudo vim /etc/netplan/00-installer-config.yaml

桥接模式自动获取

network:
  ethernets:
    ens33:
      dhcp4: true
      dhcp6: true
  version: 2

手动设置

network:
    ethernets:
        ens33:
                # dhcp4: true
                addresses:
                        - 192.168.0.203/24
                gateway4: 192.168.0.1
                nameservers:    # 这里配置DNS，貌似没用
                        addresses:
                                - 192.168.0.1
                optional: true
    version: 2

sudo netplan apply
</code></pre>
<p>[注意]：以上 yaml 文件不能有 tab 必须全为空格，否则报错</p>
<p>配置 DNS：</p>
<pre><code>sudo vim /etc/resolv.conf

nameserver 8.8.8.8
nameserver 114.114.114.114
</code></pre>
<p>[注]：此为临时配置 DNS，系统重启会自动消失</p>
<p>映射 /run/systemd/resolve/stub-resolv.conf 重启不消失</p>
<pre><code>sudo vim /run/systemd/resolve/stub-resolv.conf
nameserver 127.0.0.53
options edns0
nameserver 8.8.8.8
nameserver 114.114.114.114
</code></pre>
</div></template>


