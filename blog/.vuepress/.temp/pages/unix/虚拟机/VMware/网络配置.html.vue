<template><div><p>记录本地环境的 <strong>VMware</strong> 网络配置</p>
<!-- more -->
<h2 id="vmware-网络配置" tabindex="-1"><a class="header-anchor" href="#vmware-网络配置" aria-hidden="true">#</a> VMware 网络配置</h2>
<p><a href="https://blog.csdn.net/shunnianlv/article/details/89247215" target="_blank" rel="noopener noreferrer">参考<ExternalLinkIcon/></a></p>
<h2 id="_1-配置模式" tabindex="-1"><a class="header-anchor" href="#_1-配置模式" aria-hidden="true">#</a> 1. 配置模式</h2>
<h3 id="_1-1-nat-模式" tabindex="-1"><a class="header-anchor" href="#_1-1-nat-模式" aria-hidden="true">#</a> 1.1 NAT 模式</h3>
<p><strong>NAT</strong> 桥接模式，只要主机能上网，虚拟机就能上网，虚拟机直接连通主机本机</p>
<ul>
<li>主机和虚拟机可以 <strong>ping</strong> 通</li>
<li>其他机器 <strong>ping</strong> 不通虚拟机，不能通信</li>
</ul>
<h5 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> <strong>步骤</strong></h5>
<ol>
<li>打开 <strong>VMware</strong> 虚拟网络配置</li>
<li>选一个<strong>VMnet</strong> ，如: <strong>Vmnet8</strong></li>
<li>勾选 <strong>NAT</strong> 模式，下方二选项打勾
<ul>
<li>子网IP：192.168.15.0</li>
<li>子网掩码： 255.255.255.0</li>
</ul>
</li>
<li>[NAT设置]
<ul>
<li>网关：192.168.15.111</li>
</ul>
</li>
<li>[DCHP设置]
<ul>
<li>起始IP：192.168.15.0</li>
<li>结束IP：192.168.15.254</li>
<li>租用时间：63.23.58</li>
<li>最长租用：63.23.59</li>
</ul>
</li>
</ol>
<blockquote>
<p>注意这里装镜像时写的网关，要和 <strong>NAT</strong> 的网关一致，才可能被主机 <strong>ping</strong> 通，不然主机无法 <strong>ping</strong> 通虚拟机</p>
<p>当时选的是 <strong>CentOS</strong> 系统，关机模式下，网络适配器选自定义 <strong>VMnet8</strong>，启动时连接打勾</p>
</blockquote>
<h3 id="_1-2-桥接模式" tabindex="-1"><a class="header-anchor" href="#_1-2-桥接模式" aria-hidden="true">#</a> 1.2 桥接模式</h3>
<p>把 <strong>Ubuntu</strong> 当成一个和主机一样独立的电脑</p>
<ul>
<li>你的 <strong>PC</strong> 机、<strong>Ubuntu</strong> 虚拟机、开发板三者可以 <strong>ping</strong> 通，可以相互通信</li>
<li>虚拟机也可以和其他主机 <strong>ping</strong> 通</li>
</ul>
<h5 id="步骤-1" tabindex="-1"><a class="header-anchor" href="#步骤-1" aria-hidden="true">#</a> <strong>步骤</strong></h5>
<ol>
<li>打开 <strong>VMware</strong> 虚拟网络配置</li>
<li>选一个 <strong>VMnet</strong>  ，如：<strong>Vmnet0</strong></li>
<li>勾选桥接模式，已桥接至自动</li>
<li><strong>[自动设置] 相关选项</strong>，全勾</li>
</ol>
<blockquote>
<p>关机模式下，网络适配器选桥接模式、复制物理网络打勾，启动时连接打勾</p>
<p>若以上设置不行，则复制物理网络不能打勾！且要手动选择网卡比如手动下拉框选择 <strong>realtek</strong> 瑞昱网卡</p>
</blockquote>
<h2 id="_2-不同系统间配置网络" tabindex="-1"><a class="header-anchor" href="#_2-不同系统间配置网络" aria-hidden="true">#</a> 2. 不同系统间配置网络</h2>
<h3 id="_2-1-centos-系统下" tabindex="-1"><a class="header-anchor" href="#_2-1-centos-系统下" aria-hidden="true">#</a> 2.1 CentOS 系统下</h3>
<p>若有 nmtui 直接使用 nmtui 进行配置</p>
<p>若单机环境下，需修改：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/sysconfig/network-scripts/ifcfg-eth0

<span class="token assign-left variable">DEVICE</span><span class="token operator">=</span>eth0
<span class="token assign-left variable">BOOTPROTO</span><span class="token operator">=</span>static
<span class="token assign-left variable">NAME</span><span class="token operator">=</span>eth0
<span class="token assign-left variable">ONBOOT</span><span class="token operator">=</span>yes
<span class="token assign-left variable">IPADDR</span><span class="token operator">=</span><span class="token number">192.168</span>.15.95    <span class="token comment"># 需要在NAT中的网段下192.168.15.xxx</span>
<span class="token assign-left variable">NETMASK</span><span class="token operator">=</span><span class="token number">255.255</span>.255.0
<span class="token assign-left variable">GATEWAY</span><span class="token operator">=</span><span class="token number">192.168</span>.15.111  <span class="token comment"># 需要和NAT中设置的网关一致</span>

systemctl restart network即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-ubuntu-系统下" tabindex="-1"><a class="header-anchor" href="#_2-2-ubuntu-系统下" aria-hidden="true">#</a> 2.2 Ubuntu 系统下</h3>
<h4 id="单机环境下-此为旧版-ubuntu-的配置位置" tabindex="-1"><a class="header-anchor" href="#单机环境下-此为旧版-ubuntu-的配置位置" aria-hidden="true">#</a> 单机环境下：[此为旧版 Ubuntu 的配置位置]</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/network/interfaces
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>auto lo <span class="token comment"># 默认的lo网卡</span>
iface lo inet loopback

auto ens33  <span class="token comment"># 实际配置的ens33网卡</span>
iface ens33 inet manual <span class="token comment">#</span>
iface ens33 inet static <span class="token comment"># 设置为静态</span>
address <span class="token number">172.16</span>.70.118   <span class="token comment">#</span>
netmask <span class="token number">255.255</span>.255.0
geteway <span class="token number">172.16</span>.70.1

<span class="token comment"># 然后是DNS，配置 /etc/resolv.conf</span>

<span class="token function">vim</span> /etc/resolv.conf

<span class="token comment"># 增加以下内容：</span>
nameserver <span class="token number">8.8</span>.8.8
nameserver <span class="token number">172.16</span>.70.1  <span class="token comment">#</span>

<span class="token comment"># 增加默认网关</span>

route <span class="token function">add</span> default gw <span class="token number">172.16</span>.70.1

<span class="token comment"># 重新启动网络配置</span>
<span class="token function">sudo</span> /etc/init.d/networking restart

<span class="token comment"># 若没有 则 sudo ifconfig ens33 up</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>以上配置若在虚拟机环境下依然不行，可尝试以下方法</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用 dhcilent 命令</span>
<span class="token comment"># dhcilent 使用动态主机配置协议动态的配置网络接口的网络参数</span>
<span class="token comment"># 语法：</span>
<span class="token comment"># 	dhclient (选项)(参数)</span>
    选项：
        <span class="token number">0</span>：指定dhcp客户端监听的端口号；
        -d:总是以前台方式运行程序；
        -q:安静模式，不打印任何错误的提示信息
        -r:释放IP地址
    参数：
    	网络接口:操作网络的接

<span class="token function">sudo</span> dhclient ens33
<span class="token function">sudo</span> <span class="token function">ifconfig</span> ens33

<span class="token comment"># ip a 查看，然后ping</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>若是卡住，继续不行，可以执行以下命令，临时设置 <strong>IP</strong> 但重启后会消失（<em>临时解决办法</em>）</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ifconfig</span> eth0 inet up <span class="token number">192.168</span>.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="单机环境下-此为新版-ubuntu-的配置位置" tabindex="-1"><a class="header-anchor" href="#单机环境下-此为新版-ubuntu-的配置位置" aria-hidden="true">#</a> 单机环境下：[此为新版 Ubuntu 的配置位置]</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/netplan/00-installer-config.yaml

桥接模式自动获取

network:
  ethernets:
    ens33:
      dhcp4: <span class="token boolean">true</span>
      dhcp6: <span class="token boolean">true</span>
  version: <span class="token number">2</span>

手动设置

network:
    ethernets:
        ens33:
                <span class="token comment"># dhcp4: true</span>
                addresses:
                        - <span class="token number">192.168</span>.0.203/24
                gateway4: <span class="token number">192.168</span>.0.1
                nameservers:    <span class="token comment"># 这里配置DNS，貌似没用</span>
                        addresses:
                                - <span class="token number">192.168</span>.0.1
                optional: <span class="token boolean">true</span>
    version: <span class="token number">2</span>

<span class="token function">sudo</span> netplan apply
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>以上 <strong>yaml</strong> 文件不能有 <strong>tab</strong> 必须全为空格，否则报错</p>
</blockquote>
<p>配置 DNS</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/resolv.conf

nameserver <span class="token number">8.8</span>.8.8
nameserver <span class="token number">114.114</span>.114.114
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>临时配置 DNS，系统重启会自动消失</p>
</blockquote>
<p>映射 <code v-pre>/run/systemd/resolve/stub-resolv.conf</code>  重启不消失</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /run/systemd/resolve/stub-resolv.conf
nameserver <span class="token number">127.0</span>.0.53
options edns0
nameserver <span class="token number">8.8</span>.8.8
nameserver <span class="token number">114.114</span>.114.114
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


