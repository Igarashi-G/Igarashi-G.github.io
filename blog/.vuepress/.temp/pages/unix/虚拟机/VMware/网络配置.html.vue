<template><div><p>记录本地环境的 <strong>VMware</strong> 网络配置</p>
<!-- more -->
<h2 id="vmware-网络配置" tabindex="-1"><a class="header-anchor" href="#vmware-网络配置"><span>VMware 网络配置</span></a></h2>
<p><a href="https://blog.csdn.net/shunnianlv/article/details/89247215" target="_blank" rel="noopener noreferrer">参考</a></p>
<h2 id="_1-配置模式" tabindex="-1"><a class="header-anchor" href="#_1-配置模式"><span>1. 配置模式</span></a></h2>
<h3 id="_1-1-nat-模式" tabindex="-1"><a class="header-anchor" href="#_1-1-nat-模式"><span>1.1 NAT 模式</span></a></h3>
<p><strong>NAT</strong> 桥接模式，只要主机能上网，虚拟机就能上网，虚拟机直接连通主机本机</p>
<ul>
<li>主机和虚拟机可以 <strong>ping</strong> 通</li>
<li>其他机器 <strong>ping</strong> 不通虚拟机，不能通信</li>
</ul>
<h5 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤"><span><strong>步骤</strong></span></a></h5>
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
<h3 id="_1-2-桥接模式" tabindex="-1"><a class="header-anchor" href="#_1-2-桥接模式"><span>1.2 桥接模式</span></a></h3>
<p>把 <strong>Ubuntu</strong> 当成一个和主机一样独立的电脑</p>
<ul>
<li>你的 <strong>PC</strong> 机、<strong>Ubuntu</strong> 虚拟机、开发板三者可以 <strong>ping</strong> 通，可以相互通信</li>
<li>虚拟机也可以和其他主机 <strong>ping</strong> 通</li>
</ul>
<h5 id="步骤-1" tabindex="-1"><a class="header-anchor" href="#步骤-1"><span><strong>步骤</strong></span></a></h5>
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
<h2 id="_2-不同系统间配置网络" tabindex="-1"><a class="header-anchor" href="#_2-不同系统间配置网络"><span>2. 不同系统间配置网络</span></a></h2>
<h3 id="_2-1-centos-系统下" tabindex="-1"><a class="header-anchor" href="#_2-1-centos-系统下"><span>2.1 CentOS 系统下</span></a></h3>
<p>若有 nmtui 直接使用 nmtui 进行配置</p>
<p>若单机环境下，需修改：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/sysconfig/network-scripts/ifcfg-eth0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">DEVICE</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">eth0</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BOOTPROTO</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">static</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">NAME</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">eth0</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ONBOOT</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">yes</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">IPADDR</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">192.168.15.95</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 需要在NAT中的网段下192.168.15.xxx</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">NETMASK</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">255.255.255.0</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">GATEWAY</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">192.168.15.111</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 需要和NAT中设置的网关一致</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> network即可</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-ubuntu-系统下" tabindex="-1"><a class="header-anchor" href="#_2-2-ubuntu-系统下"><span>2.2 Ubuntu 系统下</span></a></h3>
<h4 id="单机环境下-此为旧版-ubuntu-的配置位置" tabindex="-1"><a class="header-anchor" href="#单机环境下-此为旧版-ubuntu-的配置位置"><span>单机环境下：[此为旧版 Ubuntu 的配置位置]</span></a></h4>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/network/interfaces</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">auto</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lo</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 默认的lo网卡</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">iface</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> inet</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> loopback</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">auto</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ens33</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 实际配置的ens33网卡</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">iface</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ens33</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> inet</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> manual</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> #</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">iface</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ens33</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> inet</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> static</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 设置为静态</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">address</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 172.16.70.118</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">   #</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">netmask</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 255.255.255.0</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">geteway</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 172.16.70.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 然后是DNS，配置 /etc/resolv.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/resolv.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 增加以下内容：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nameserver</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 8.8.8.8</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nameserver</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 172.16.70.1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  #</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 增加默认网关</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">route</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> default</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> gw</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 172.16.70.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 重新启动网络配置</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/init.d/networking</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 若没有 则 sudo ifconfig ens33 up</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>以上配置若在虚拟机环境下依然不行，可尝试以下方法</p>
</blockquote>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 使用 dhcilent 命令</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># dhcilent 使用动态主机配置协议动态的配置网络接口的网络参数</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 语法：</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 	dhclient (选项)(参数)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    选项：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        0：指定dhcp客户端监听的端口号；</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        -d:总是以前台方式运行程序；</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        -q:安静模式，不打印任何错误的提示信息</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        -r:释放IP地址</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    参数：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    	网络接口:操作网络的接</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dhclient</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ens33</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ifconfig</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ens33</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ip a 查看，然后ping</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>若是卡住，继续不行，可以执行以下命令，临时设置 <strong>IP</strong> 但重启后会消失（<em>临时解决办法</em>）</p>
</blockquote>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ifconfig</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> eth0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> inet</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> up</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 192.168.0.1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h4 id="单机环境下-此为新版-ubuntu-的配置位置" tabindex="-1"><a class="header-anchor" href="#单机环境下-此为新版-ubuntu-的配置位置"><span>单机环境下：[此为新版 Ubuntu 的配置位置]</span></a></h4>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/netplan/00-installer-config.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">桥接模式自动获取</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">network:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  ethernets:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    ens33:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">      dhcp4:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">      dhcp6:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  version:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">手动设置</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">network:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    ethernets:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        ens33:</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                # dhcp4: true</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                addresses:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                        -</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 192.168.0.203/24</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                gateway4:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 192.168.0.1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                nameservers:</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 这里配置DNS，貌似没用</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                        addresses:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                                -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 192.168.0.1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                optional:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    version:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> netplan</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apply</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>以上 <strong>yaml</strong> 文件不能有 <strong>tab</strong> 必须全为空格，否则报错</p>
</blockquote>
<p>配置 DNS</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/resolv.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nameserver</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 8.8.8.8</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nameserver</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 114.114.114.114</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>临时配置 DNS，系统重启会自动消失</p>
</blockquote>
<p>映射 <code v-pre>/run/systemd/resolve/stub-resolv.conf</code>  重启不消失</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /run/systemd/resolve/stub-resolv.conf</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nameserver</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 127.0.0.53</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">options</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> edns0</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nameserver</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 8.8.8.8</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nameserver</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 114.114.114.114</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


