<template><div><h1 id="centos-的配置问题" tabindex="-1"><a class="header-anchor" href="#centos-的配置问题" aria-hidden="true">#</a> CentOS 的配置问题</h1>
<h2 id="vmware-安装-centos-后的操作流程" tabindex="-1"><a class="header-anchor" href="#vmware-安装-centos-后的操作流程" aria-hidden="true">#</a> VMware 安装 CentOS 后的操作流程</h2>
<p>图形化配置 ip：
命令行输入： mutui</p>
<h3 id="_0-vmware-设置" tabindex="-1"><a class="header-anchor" href="#_0-vmware-设置" aria-hidden="true">#</a> 0.VMware 设置：</h3>
<p>编辑 -&gt; 虚拟网络编辑器 -&gt; 通常是 VMnet8 NAT 模式的</p>
<p>1.通过管理员进行设置，应该会有默认的设置。例：</p>
<pre><code>子网ip：192.168.21.0   子网掩码：255.255.255.0
</code></pre>
<p>2.修改 NAT 设置：</p>
<pre><code>网关：192.168.21.2
</code></pre>
<p>3.安装 CenOS7 镜像经过一系列配置项后，到了安装界面，先上下选择到 Install CentOS7 选项</p>
<p>4.然后点击 tab 键：然后输入 空格 写入如下两个参数：</p>
<pre><code>net.ifnames=0 biosdevname=0 然后加空格 回车再安装
</code></pre>
<p>这两个参数目的是吧网卡名称 ens33 改为 eth0，目的是为了批量操作把名字固定下来，比较方便，通常都是 eth0</p>
<h3 id="_1-配置网卡绑定-ip" tabindex="-1"><a class="header-anchor" href="#_1-配置网卡绑定-ip" aria-hidden="true">#</a> 1.配置网卡绑定 IP</h3>
<h4 id="ip-绑定" tabindex="-1"><a class="header-anchor" href="#ip-绑定" aria-hidden="true">#</a> ip 绑定：</h4>
<ul>
<li>
<p>安装完 CentOS 后，默认是动态 IP，而且开机不会自动启动</p>
</li>
<li>
<p>因此要做的是绑定固定 ip，设置开机自启动网卡【注意】：192.168.21.0 是子网 ip，被占了， 192.168.21.1 应该会被 windows 占掉所以要配个
其他的 ip 地址: - ip 地址：
IPADDR=192.168.21.81 - 子网掩码：</p>
<pre><code>        NETMASK=255.255.255.0
- 网关地址：

        GATWAY=192.168.21.2
- DNS服务器：（可配置多个）

        DNS1=114.114.114.114
</code></pre>
</li>
<li>
<p>需要 cd 到网卡目录：</p>
<pre><code>  vi /etc/sysconfig/network-scripts/ifcfg-eth0    or ifcfg-ens33
</code></pre>
</li>
<li>
<p>修改如下选项：</p>
<ul>
<li>BOOTPROTO
BOOTPROTO=none # 将 dhcp 动态获取改为 none</li>
<li>ONBOOT
ONBOOT=yes # 将 no 改为 yes 应该是开机跟随 boot 启动</li>
<li>UUID：
这个直接把这一行给干掉</li>
<li>然后加上上文的选项</li>
</ul>
</li>
<li>
<p>保存文件，重启网卡
systemctl restart network</p>
</li>
</ul>
<h4 id="安装-net" tabindex="-1"><a class="header-anchor" href="#安装-net" aria-hidden="true">#</a> 安装 net</h4>
<p>若查看端口执行命令 netstat -ntpl 时提示，没有 netstat 命令，则需要安装工具：</p>
<pre><code>yum install net-tools
</code></pre>
<h4 id="关闭防火墙" tabindex="-1"><a class="header-anchor" href="#关闭防火墙" aria-hidden="true">#</a> 关闭防火墙</h4>
<p>1.查看防火墙状态</p>
<pre><code>firewall-cmd --state
</code></pre>
<p>2.若显示 running 则停止 firewall</p>
<pre><code>systemctl stop firewalld.service
</code></pre>
<p>3.禁止 firewall 开机启动</p>
<pre><code>systemctl disable firewalld.service
</code></pre>
</div></template>


