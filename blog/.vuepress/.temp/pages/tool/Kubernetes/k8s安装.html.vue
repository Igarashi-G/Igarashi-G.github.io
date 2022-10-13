<template><div><p>记录安装 <strong>Docker</strong> 版（老版本）的 <strong>k8s</strong> 单 <strong>Master</strong> 集群</p>
<!-- more -->
<h2 id="_1-准备工作" tabindex="-1"><a class="header-anchor" href="#_1-准备工作" aria-hidden="true">#</a> 1. 准备工作</h2>
<p><strong>准备如下环境</strong></p>
<ul>
<li><strong>3</strong> 台 <strong>2核4G</strong> 的服务器，一台作为 <strong>Master</strong> 两台作为 <strong>Salve</strong></li>
<li><strong>Cent OS 7.8</strong></li>
<li>提前规划好 <strong>IP</strong>，并设置好可联网的代理</li>
</ul>
<p><strong>安装后的软件版本为</strong></p>
<ul>
<li>Kubernetes v1.16.2
<ul>
<li>flannel 0.11|12.0（<em>有大坑</em>）</li>
</ul>
</li>
<li>Docker 19.03.11</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">关于二进制安装</p>
<p><strong>kubeadm</strong> 是 <strong>Kubernetes</strong> 官方支持的安装方式，“<em>二进制</em>” 不是。本文档采用 <strong><a href="http://kubernetes.io" target="_blank" rel="noopener noreferrer">kubernetes.io<ExternalLinkIcon/></a></strong> 官方推荐的 <strong>kubeadm</strong> 工具安装 <strong>kubernetes</strong> 集群。</p>
</div>
<h4 id="_1-1-设置-yum-源" tabindex="-1"><a class="header-anchor" href="#_1-1-设置-yum-源" aria-hidden="true">#</a> 1.1 <strong>设置 yum 源</strong></h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/yum.repos.d/
<span class="token function">cp</span> ./CentOS-Base.repo ./CentOS-Base-repo.bak
<span class="token function">wget</span> http://mirrors.aliyun.com/repo/Centos-7.repo
yum clean all
<span class="token function">mv</span> Centos-7.repo CentOS-Base.repo
yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-检查-centos-hostname" tabindex="-1"><a class="header-anchor" href="#_1-2-检查-centos-hostname" aria-hidden="true">#</a> 1.2 <strong>检查 centos / hostname</strong></h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 在 master 节点和 worker 节点都要执行</span>
<span class="token function">cat</span> /etc/redhat-release

<span class="token comment"># 此处 hostname 的输出将会是该机器在 Kubernetes 集群中的节点名字</span>
<span class="token comment"># 不能使用 localhost 作为节点的名字</span>
<span class="token function">hostname</span>

<span class="token comment"># 请使用 lscpu 命令，核对 CPU 信息</span>
<span class="token comment"># Architecture: x86_64    本安装文档不支持 arm 架构</span>
<span class="token comment"># CPU(s):       2         CPU 内核数量不能低于 2</span>
lscpu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-修改-hostname" tabindex="-1"><a class="header-anchor" href="#_1-3-修改-hostname" aria-hidden="true">#</a> 1.3 <strong>修改 hostname</strong></h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 建议正常英文数字组合</span>
hostnamectl set-hostname k8s-master-171
hostnamectl set-hostname k8s-salve-172 
hostnamectl set-hostname k8s-salve-173

<span class="token comment"># 查看修改结果</span>
hostnamectl status

<span class="token comment"># 设置 hostname 解析</span>
<span class="token builtin class-name">echo</span> <span class="token string">"127.0.0.1   <span class="token variable"><span class="token variable">$(</span><span class="token function">hostname</span><span class="token variable">)</span></span>"</span> <span class="token operator">>></span> /etc/hosts

<span class="token comment"># 或是三台节点全部加入hosts</span>
<span class="token function">cat</span> <span class="token operator">>></span>/etc/hosts<span class="token operator">&lt;&lt;</span><span class="token string">EOF
192.168.3.171 k8s-master-171
192.168.3.172 k8s-slave-172
192.168.3.173 k8s-slave-173
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-检查网络" tabindex="-1"><a class="header-anchor" href="#_1-4-检查网络" aria-hidden="true">#</a> 1.4 <strong>检查网络</strong></h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8smaster171 ~<span class="token punctuation">]</span>$ <span class="token function">ip</span> route show
default via <span class="token number">192.168</span>.3.1 dev eth0 proto static metric <span class="token number">100</span> 
<span class="token number">172.17</span>.0.0/16 dev docker0 proto kernel scope <span class="token function">link</span> src <span class="token number">172.17</span>.0.1 
<span class="token number">192.168</span>.3.0/24 dev eth0 proto kernel scope <span class="token function">link</span> src <span class="token number">192.168</span>.3.171 metric <span class="token number">100</span> 

<span class="token punctuation">[</span>root@k8smaster171 ~<span class="token punctuation">]</span>$ <span class="token function">ip</span> a
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noqueue state UNKNOWN group default qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">2</span>: eth0: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc pfifo_fast state UP group default qlen <span class="token number">1000</span>
    link/ether 7e:73:42:29:b7:63 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">192.168</span>.3.171/24 brd <span class="token number">192.168</span>.3.255 scope global noprefixroute eth0
       valid_lft forever preferred_lft forever
</code></pre><div class="highlight-lines"><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">kubelet使用的IP地址</p>
<ul>
<li><code v-pre>ip route show</code> 命令中，可以知道机器的默认网卡，通常是 <code v-pre>eth0</code>，如 <strong>default via 172.21.0.23 dev eth0</strong></li>
<li><code v-pre>ip address</code> 命令中，可显示默认网卡的 IP 地址，<strong>Kubernetes</strong> 将使用此 <strong>IP</strong> 地址与集群内的其他节点通信，如 <code v-pre>172.17.216.80</code></li>
<li>所有节点上 <strong>Kubernetes</strong> 所使用的 <strong>IP</strong> 地址必须可以互通（<em>无需 NAT 映射、无安全组或防火墙隔离</em>）</li>
</ul>
</div>
<h4 id="_1-5-通过第三方脚本快速安装" tabindex="-1"><a class="header-anchor" href="#_1-5-通过第三方脚本快速安装" aria-hidden="true">#</a> 1.5 通过第三方脚本快速安装</h4>
<p>在 <strong>Master</strong> 节点和 <strong>Worker</strong> 节点都要执行</p>
<p><a href="https://kuboard.cn/install/history-k8s/install-k8s-1.16.2.html" target="_blank" rel="noopener noreferrer">参考 快速安装<ExternalLinkIcon/></a> 初始化流程貌似会执行失败，也许和 <strong>CentOS</strong> 版本有关，用来参考</p>
<details class="custom-container details"><summary>详情</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 在 master 节点和 worker 节点都要执行</span>

<span class="token comment"># 安装 docker</span>
<span class="token comment"># 参考文档如下</span>
<span class="token comment"># https://docs.docker.com/install/linux/docker-ce/centos/ </span>
<span class="token comment"># https://docs.docker.com/install/linux/linux-postinstall/</span>

<span class="token comment"># 卸载旧版本</span>
yum remove <span class="token parameter variable">-y</span> <span class="token function">docker</span> <span class="token punctuation">\</span>
docker-client <span class="token punctuation">\</span>
docker-client-latest <span class="token punctuation">\</span>
docker-common <span class="token punctuation">\</span>
docker-latest <span class="token punctuation">\</span>
docker-latest-logrotate <span class="token punctuation">\</span>
docker-logrotate <span class="token punctuation">\</span>
docker-selinux <span class="token punctuation">\</span>
docker-engine-selinux <span class="token punctuation">\</span>
docker-engine

<span class="token comment"># 设置 yum repository</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils <span class="token punctuation">\</span>
device-mapper-persistent-data <span class="token punctuation">\</span>
lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

<span class="token comment"># 安装并启动 docker</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce-18.09.7 docker-ce-cli-18.09.7 containerd.io
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
systemctl start <span class="token function">docker</span>

<span class="token comment"># 安装 nfs-utils</span>
<span class="token comment"># 必须先安装 nfs-utils 才能挂载 nfs 网络存储</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span>

<span class="token comment"># 关闭 防火墙</span>
systemctl stop firewalld
systemctl disable firewalld

<span class="token comment"># 关闭 SeLinux</span>
setenforce <span class="token number">0</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s/SELINUX=enforcing/SELINUX=disabled/g"</span> /etc/selinux/config

<span class="token comment"># 关闭 swap</span>
swapoff <span class="token parameter variable">-a</span>
<span class="token function">yes</span> <span class="token operator">|</span> <span class="token function">cp</span> /etc/fstab /etc/fstab_bak
<span class="token function">cat</span> /etc/fstab_bak <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> swap <span class="token operator">></span> /etc/fstab

<span class="token comment"># 修改 /etc/sysctl.conf</span>
<span class="token comment"># 如果有配置，则修改</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s#^net.ipv4.ip_forward.*#net.ipv4.ip_forward=1#g"</span>  /etc/sysctl.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s#^net.bridge.bridge-nf-call-ip6tables.*#net.bridge.bridge-nf-call-ip6tables=1#g"</span>  /etc/sysctl.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s#^net.bridge.bridge-nf-call-iptables.*#net.bridge.bridge-nf-call-iptables=1#g"</span>  /etc/sysctl.conf
<span class="token comment"># 可能没有，追加</span>
<span class="token builtin class-name">echo</span> <span class="token string">"net.ipv4.ip_forward = 1"</span> <span class="token operator">>></span> /etc/sysctl.conf
<span class="token builtin class-name">echo</span> <span class="token string">"net.bridge.bridge-nf-call-ip6tables = 1"</span> <span class="token operator">>></span> /etc/sysctl.conf
<span class="token builtin class-name">echo</span> <span class="token string">"net.bridge.bridge-nf-call-iptables = 1"</span> <span class="token operator">>></span> /etc/sysctl.conf
<span class="token comment"># 执行命令以应用</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span>

<span class="token comment"># 配置K8S的yum源</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

<span class="token comment"># 卸载旧版本</span>
yum remove <span class="token parameter variable">-y</span> kubelet kubeadm kubectl

<span class="token comment"># 安装kubelet、kubeadm、kubectl</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.16.2 kubeadm-1.16.2 kubectl-1.16.2

<span class="token comment"># 修改docker Cgroup Driver为systemd</span>
<span class="token comment"># # 将/usr/lib/systemd/system/docker.service文件中的这一行 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock</span>
<span class="token comment"># # 修改为 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd</span>
<span class="token comment"># 如果不修改，在添加 worker 节点时可能会碰到如下错误</span>
<span class="token comment"># [WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". </span>
<span class="token comment"># Please follow the guide at https://kubernetes.io/docs/setup/cri/</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s#^ExecStart=/usr/bin/dockerd.*#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd#g"</span> /usr/lib/systemd/system/docker.service

<span class="token comment"># 设置 docker 镜像，提高 docker 镜像下载速度和稳定性</span>
<span class="token comment"># 如果您访问 https://hub.docker.io 速度非常稳定，亦可以跳过这个步骤</span>
<span class="token function">curl</span> <span class="token parameter variable">-sSL</span> https://get.daocloud.io/daotools/set_mirror.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> http://f1361db2.m.daocloud.io

<span class="token comment"># 重启 docker，并启动 kubelet</span>
systemctl daemon-reload
systemctl restart <span class="token function">docker</span>
systemctl <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> systemctl start kubelet

<span class="token function">docker</span> version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="_2-初始化配置" tabindex="-1"><a class="header-anchor" href="#_2-初始化配置" aria-hidden="true">#</a> 2. 初始化配置</h2>
<div class="custom-container warning">
<p class="custom-container-title">所有节点执行如下操作</p>
</div>
<h5 id="设置网络相关" tabindex="-1"><a class="header-anchor" href="#设置网络相关" aria-hidden="true">#</a> <strong>设置网络相关</strong></h5>
<p>如果节点间无安全组限制（<em>内网机器间可以任意访问</em>），可以忽略，香、否则，至少保证如下端口可通</p>
<ul>
<li><strong>k8s-master：</strong>
<ul>
<li><strong>TCP：</strong> <strong>6443, 2379, 2380, 60080, 60081</strong></li>
<li><strong>UDP</strong> 协议端口全部时打开</li>
</ul>
</li>
<li><strong>k8s-slave：</strong> <strong>UDP</strong> 协议端口全部打开</li>
</ul>
<h5 id="设置或关闭-iptables" tabindex="-1"><a class="header-anchor" href="#设置或关闭-iptables" aria-hidden="true">#</a> <strong>设置或关闭 iptables</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>iptables <span class="token parameter variable">-P</span> FORWARD ACCEPT

<span class="token comment"># 或是直接关闭 iptables</span>
systemctl stop iptables
systemctl disable iptables
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="关闭swap" tabindex="-1"><a class="header-anchor" href="#关闭swap" aria-hidden="true">#</a> <strong>关闭swap</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>swapoff <span class="token parameter variable">-a</span>

<span class="token comment"># 防止开机启动自动挂载 swap 分区</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'/ swap / s/^\(.*\)$/#\1/g'</span> /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="关闭selinux和防火墙" tabindex="-1"><a class="header-anchor" href="#关闭selinux和防火墙" aria-hidden="true">#</a> <strong>关闭selinux和防火墙</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">'s#(SELINUX=).*#\1disabled#'</span> /etc/selinux/config
setenforce <span class="token number">0</span>
systemctl disable firewalld <span class="token operator">&amp;</span>systemctl stop firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="修改内核参数" tabindex="-1"><a class="header-anchor" href="#修改内核参数" aria-hidden="true">#</a> <strong>修改内核参数</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span> /etc/sysctl.d/k8s.conf</span>
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
vm.max_map_count=262144
EOF</span>

<span class="token comment"># 重新加载配置</span>
$ <span class="token function">sysctl</span> <span class="token parameter variable">-p</span> /etc/sysctl.d/k8s.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="网桥过滤" tabindex="-1"><a class="header-anchor" href="#网桥过滤" aria-hidden="true">#</a> <strong>网桥过滤</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 加载网桥过滤模块</span>
$ modprobe br_netfilter
<span class="token comment"># 查看网桥过滤模块是否加载成功</span>
$ lsmod <span class="token operator">|</span> <span class="token function">grep</span> br_netfilter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="设置时间同步" tabindex="-1"><a class="header-anchor" href="#设置时间同步" aria-hidden="true">#</a> <strong>设置时间同步</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ systemctl restart chronyd	
$ systemctl <span class="token builtin class-name">enable</span> chronyd
$ <span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装基础软件包" tabindex="-1"><a class="header-anchor" href="#_3-安装基础软件包" aria-hidden="true">#</a> 3. 安装基础软件包</h2>
<div class="custom-container warning">
<p class="custom-container-title">所有节点执行如下操作</p>
</div>
<h5 id="安装常用软件包" tabindex="-1"><a class="header-anchor" href="#安装常用软件包" aria-hidden="true">#</a> <strong>安装常用软件包</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils <span class="token function">wget</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>配置 docker 和 k8s 源</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-o</span> /etc/yum.repos.d/docker-ce.repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

<span class="token comment"># 更新源</span>
$ yum clean all <span class="token operator">&amp;&amp;</span> yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-安装docker" tabindex="-1"><a class="header-anchor" href="#_3-1-安装docker" aria-hidden="true">#</a> 3.1 安装docker</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看所有的可用版本</span>
yum list docker-ce <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>

<span class="token comment"># 安装源里配套版本</span>
<span class="token comment"># yum install -y docker-ce-18.09.7 docker-ce-cli-18.09.7 containerd.io </span>
<span class="token comment"># 安装指定版本</span>
yum <span class="token function">install</span> docker-ce-c1i-19.03.13-3.el7 docker-ce-19.03.13-3.el7

<span class="token comment">## 配置docker加速</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">vim</span> /etc/docker/daemon.json
<span class="token punctuation">{</span>
  <span class="token string">"registry-mirrors"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">"https://ubhu1j5h.mirror.aliyuncs.com"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">##启动docker</span>
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl start <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-安装kubeadm-kubelet-和-kubectl" tabindex="-1"><a class="header-anchor" href="#_3-2-安装kubeadm-kubelet-和-kubectl" aria-hidden="true">#</a> 3.2 安装kubeadm，kubelet 和 kubectl</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.16.2 kubeadm-1.16.2 kubectl-1.16.2 <span class="token parameter variable">--disableexcludes</span><span class="token operator">=</span>kubernetes

<span class="token comment"># 查看 kubeadm 版本</span>
kubeadm version

<span class="token comment"># 设置开机启动</span>
systemctl <span class="token builtin class-name">enable</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-初始化集群" tabindex="-1"><a class="header-anchor" href="#_4-初始化集群" aria-hidden="true">#</a> 4. 初始化集群</h2>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p><strong>只在 Master 节点</strong> 执行（<em>k8s-master-171</em>）</p>
</div>
<p>因此需要先改写对应的 <strong>kubeadm.yaml</strong> 配置文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> ./k8s_install
<span class="token builtin class-name">cd</span> k8s_install

<span class="token comment"># 生成配置文件</span>
$ kubeadm config print init-defaults <span class="token operator">></span> kubeadm.yaml

<span class="token comment"># 修改生成的配置文件文件 :set nu</span>
<span class="token function">vim</span> kubeadm.yaml
<span class="token punctuation">..</span>.
<span class="token comment"># -+12   advertiseAddress: 192.168.3.171	# 单master直接替换为master ip地址，貌似高可用是vip</span>
<span class="token punctuation">..</span>.
<span class="token comment"># -+32 imageRepository: registry.aliyuncs.com/google_containers	# 修改为阿里源</span>
<span class="token punctuation">..</span>.
<span class="token comment"># -+34 kubernetesVersion: v1.16.2	# 版本号默认生成错了，改正</span>
<span class="token comment">#   35 networking:</span>
<span class="token comment">#   36   dnsDomain: cluster.local</span>
<span class="token comment">#  +37   podSubnet: 10.244.0.0/16	# pod网段，flannel插件需要这个网段</span>
<span class="token comment">#   38   serviceSubnet: 10.96.0.0/12</span>
<span class="token comment">#   39 scheduler: {}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="下载组件镜像" tabindex="-1"><a class="header-anchor" href="#下载组件镜像" aria-hidden="true">#</a> <strong>下载组件镜像</strong></h5>
<p><strong>k8s</strong> 所运行的 <strong>API</strong> 组件，都是靠容器运行，先列出配置中所需的容器，再 <strong>pull</strong> 下镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master-171 k8s-install<span class="token punctuation">]</span>$ kubeadm config images list <span class="token parameter variable">--config</span> kubeadm.yaml 
registry.aliyuncs.com/google_containers/kube-apiserver:v1.16.2
registry.aliyuncs.com/google_containers/kube-controller-manager:v1.16.2
registry.aliyuncs.com/google_containers/kube-scheduler:v1.16.2
registry.aliyuncs.com/google_containers/kube-proxy:v1.16.2
registry.aliyuncs.com/google_containers/pause:3.1
registry.aliyuncs.com/google_containers/etcd:3.3.15-0
registry.aliyuncs.com/google_containers/coredns:1.6.2

<span class="token comment"># pull 组件镜像，提前下载方便</span>
kubeadm config images pull <span class="token parameter variable">--config</span> kubeadm.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">若出现镜像无法下载情况，如下方式替代</p>
<ol>
<li>
<p>还原 <strong>kubeadm.yaml</strong> 的 <code v-pre>imageRepository</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">imageRepository</span><span class="token punctuation">:</span> k8s.gcr.io
<span class="token punctuation">...</span>

<span class="token comment"># 查看镜像源</span>
kubeadm config images list <span class="token punctuation">-</span><span class="token punctuation">-</span>config kubeadm.yaml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>使用 <strong>docker hub</strong> 中的镜像源来下载，注意上述列表添加处理器架构，通常使用的虚拟机都是 <strong>amd64</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> pull mirrorgooglecontainers/kube-scheduler-amd64:v1.16.0
$ <span class="token function">docker</span> pull mirrorgooglecontainers/etcd-amd64:3.3.15-0
<span class="token punctuation">..</span>.
$ <span class="token function">docker</span> tag mirrorgooglecontainers/etcd-amd64:3.3.15-0 k8s.gcr.io/etcd3.3.15-0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</div>
<h5 id="初始化master" tabindex="-1"><a class="header-anchor" href="#初始化master" aria-hidden="true">#</a> <strong>初始化Master</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm init <span class="token parameter variable">--config</span> kubeadm.yaml

<span class="token comment">#... 直到出现如下显示，表示安装成功</span>
Your Kubernetes control-plane has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config

<span class="token comment">#...</span>
<span class="token comment"># 执行如上命令，即可初始化成功</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>此时通过 <code v-pre>kubectl get no</code> 命令查看还是 <strong>notReady</strong> 状态，这是因为还没有初始化网络插件，若初始化过程中出错，根据错误信息调整后，执行 <code v-pre>kubeadm reset</code> 后再次初始化即可</p>
</div>
<h5 id="slave-加入集群" tabindex="-1"><a class="header-anchor" href="#slave-加入集群" aria-hidden="true">#</a> <strong>Slave 加入集群</strong></h5>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<p>在 <strong>Slave</strong> 节点上执行，加入 <strong>k8s-master-171</strong> 集群（<em>这里是复制执行初始化 master 后提示的命令</em>）</p>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.3.171:6443 <span class="token parameter variable">--token</span> abcdef.0123456789abcdef <span class="token punctuation">\</span>
    --discovery-token-ca-cert-hash sha256:55bd1bedd08121c1c4f92e93673e7e8e8dd4460927fc93bd059606d768a7c17a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看集群状态</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master-171 k8s-install<span class="token punctuation">]</span>$ kubectl get nodes
NAME             STATUS     ROLES    AGE   VERSION
k8s-master-171   NotReady   master   24m   v1.16.2
k8s-slave-172    NotReady   <span class="token operator">&lt;</span>none<span class="token operator">></span>   18s   v1.16.2
k8s-slave-173    NotReady   <span class="token operator">&lt;</span>none<span class="token operator">></span>   16s   v1.16.2

kubectl <span class="token parameter variable">-n</span> kube-system get po
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-安装网络插件" tabindex="-1"><a class="header-anchor" href="#_5-安装网络插件" aria-hidden="true">#</a> 5. 安装网络插件</h2>
<div class="custom-container warning">
<p class="custom-container-title">只在 Master 节点执行</p>
</div>
<h3 id="_5-1-网络插件-flannel" tabindex="-1"><a class="header-anchor" href="#_5-1-网络插件-flannel" aria-hidden="true">#</a> 5.1 网络插件 flannel</h3>
<p><strong>flannel</strong> 这个插件比较老，但是通用性凑合，适配还行，先下载 <strong>yaml</strong> 文件（<em>一次下载不成功，多试几次</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://raw.githubusercontent.com/coreos/flannel/2140ac876ef134e0ed5af15c65e414cf26827915/Documentation/kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改配置，指定网卡名（<em>注意用空格替换，不要用 tab</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> kube-flannel.yml
<span class="token punctuation">..</span>.

<span class="token comment">#   189         args:</span>
<span class="token comment">#   190         - --ip-masq</span>
<span class="token comment">#   191         - --kube-subnet-mgr</span>
<span class="token comment">#  +192         - --iface=eth0	# 若机器存在多网卡的话，指定内网网卡名，默认不指定会找第一块网卡</span>
<span class="token comment">#   193         resources:</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>若出现 <code v-pre>quay.io/coreos/flannel:v0.11.0-amd64</code> 地址的镜像拉不下来，则修改下载地址</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">170       initContainers</span><span class="token punctuation">:</span>
<span class="token key atrule">171       - name</span><span class="token punctuation">:</span> install<span class="token punctuation">-</span>cni
<span class="token key atrule">172         image</span><span class="token punctuation">:</span> quay.io/coreos/flannel<span class="token punctuation">:</span>v0.11.0<span class="token punctuation">-</span>amd64 <span class="token comment"># 这里</span>
<span class="token key atrule">173         command</span><span class="token punctuation">:</span>
174         <span class="token punctuation">-</span> cp
<span class="token key atrule">175         args</span><span class="token punctuation">:</span>
176         <span class="token punctuation">-</span> <span class="token punctuation">-</span>f
177         <span class="token punctuation">-</span> /etc/kube<span class="token punctuation">-</span>flannel/cni<span class="token punctuation">-</span>conf.json
178         <span class="token punctuation">-</span> /etc/cni/net.d/10<span class="token punctuation">-</span>flannel.conflist
<span class="token key atrule">179         volumeMounts</span><span class="token punctuation">:</span>
<span class="token key atrule">180         - name</span><span class="token punctuation">:</span> cni
<span class="token key atrule">181           mountPath</span><span class="token punctuation">:</span> /etc/cni/net.d
<span class="token key atrule">182         - name</span><span class="token punctuation">:</span> flannel<span class="token punctuation">-</span>cfg
<span class="token key atrule">183           mountPath</span><span class="token punctuation">:</span> /etc/kube<span class="token punctuation">-</span>flannel/
<span class="token key atrule">184       containers</span><span class="token punctuation">:</span>
<span class="token key atrule">185       - name</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>flannel
<span class="token key atrule">186         image</span><span class="token punctuation">:</span> quay.io/coreos/flannel<span class="token punctuation">:</span>v0.11.0<span class="token punctuation">-</span>amd64 <span class="token comment"># 这里</span>
<span class="token key atrule">187         command</span><span class="token punctuation">:</span>
188         <span class="token punctuation">-</span> /opt/bin/flanneld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h5 id="执行安装" tabindex="-1"><a class="header-anchor" href="#执行安装" aria-hidden="true">#</a> <strong>执行安装</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 可以先拉取国内镜像</span>
<span class="token function">docker</span> pull quay.io/coreos/flannel:v0.11.0-amd64

<span class="token comment"># 执行安装命令</span>
kubectl create <span class="token parameter variable">-f</span> kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="验证集群" tabindex="-1"><a class="header-anchor" href="#验证集群" aria-hidden="true">#</a> <strong>验证集群</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get nodes <span class="token comment"># 观察集群节点是否全部Ready</span>

$ kubectl <span class="token parameter variable">-n</span> kube-system get po
NAME                                     READY   STATUS    RESTARTS   AGE
coredns-58cc8c89f4-bhqrs                 <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          76m
coredns-58cc8c89f4-g4lkj                 <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          76m
etcd-k8s-master-171                      <span class="token number">1</span>/1     Running   <span class="token number">0</span>          75m
kube-apiserver-k8s-master-171            <span class="token number">1</span>/1     Running   <span class="token number">0</span>          75m
kube-controller-manager-k8s-master-171   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          75m
kube-flannel-ds-amd64-4xm2h              <span class="token number">1</span>/1     Running   <span class="token number">0</span>          7m10s
kube-flannel-ds-amd64-lltcc              <span class="token number">1</span>/1     Running   <span class="token number">0</span>          7m10s
kube-flannel-ds-amd64-s62tq              <span class="token number">1</span>/1     Running   <span class="token number">0</span>          7m10s
kube-proxy-c496s                         <span class="token number">1</span>/1     Running   <span class="token number">0</span>          76m
kube-proxy-h7d6s                         <span class="token number">1</span>/1     Running   <span class="token number">0</span>          52m
kube-proxy-vs5nc                         <span class="token number">1</span>/1     Running   <span class="token number">0</span>          52m
kube-scheduler-k8s-master-171            <span class="token number">1</span>/1     Running   <span class="token number">0</span>          75m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger">
<p class="custom-container-title">异常</p>
<p>此时发现两个 <strong>coredns</strong> 服务没有 <strong>Running</strong> ，该问题导致流程阻塞！</p>
<p>该问题是由于 <strong>flannel</strong> 依赖于 <strong>cni</strong> 插件，而这该死的插件新版移除了 <strong>flannel</strong> ，导致网络启动失败</p>
<ol>
<li>
<p>换用插件 <strong>calico</strong> , 见下文</p>
</li>
<li>
<p>去 <a href="https://github.com/containernetworking/plugins/releases/tag/v0.9.0" target="_blank" rel="noopener noreferrer">github官方下载压缩包<ExternalLinkIcon/></a> （<em>此处是 <strong>0.9.0</strong> 版本，官方最后个未移除 <strong>flannel</strong> 版</em>）<a href="https://github.com/containernetworking/plugins/releases/download/v0.9.0/cni-plugins-linux-amd64-v0.9.0.tgz" target="_blank" rel="noopener noreferrer">cni-plugins-linux-amd64-v0.9.0.tgz<ExternalLinkIcon/></a></p>
<p>执行解压，即可看见 <strong>flannel</strong> ，然后分发到所有节点，网络即可恢复</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xvf</span> cni-plugins-linux-amd64-v0.9.1.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
</div>
<h5 id="清理环境" tabindex="-1"><a class="header-anchor" href="#清理环境" aria-hidden="true">#</a> <strong>清理环境</strong></h5>
<p>如果集群安装过程中遇到了其他问题，使用如下命令重置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm reset
kubectl delete <span class="token parameter variable">-f</span> kube-flannel.yml
kubectl apply <span class="token parameter variable">-f</span> kube-flannel.yml
 
<span class="token function">ifconfig</span> cni0 down <span class="token operator">&amp;&amp;</span> <span class="token function">ip</span> <span class="token function">link</span> delete coni0
<span class="token function">ifconfig</span> flannel.1 down <span class="token operator">&amp;&amp;</span> <span class="token function">ip</span> <span class="token function">link</span> delete flannel.1
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/cni/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-网络插件-calico" tabindex="-1"><a class="header-anchor" href="#_5-2-网络插件-calico" aria-hidden="true">#</a> 5.2 网络插件 calico</h3>
<p><a href="https://docs.projectcalico.org/v3.9/getting-started/kubernetes/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<p>执行如下命令安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-f</span> calico-3.9.2.yaml

<span class="token function">wget</span> https://kuboard.cn/install-script/calico/calico-3.9.2.yaml

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s#192\.168\.0\.0/16#<span class="token variable">${POD_SUBNET}</span>#"</span> calico-3.9.2.yaml

kubectl apply <span class="token parameter variable">-f</span> calico-3.9.2.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-创建测试-nginx-服务" tabindex="-1"><a class="header-anchor" href="#_5-3-创建测试-nginx-服务" aria-hidden="true">#</a> 5.3 创建测试 Nginx 服务</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl run test-nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 <strong>pod</strong> 是否创建成功，并访问 <strong>pod ip</strong> 测试是否可用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get po <span class="token parameter variable">-o</span> wide <span class="token parameter variable">-w</span> <span class="token comment"># 直到 STATUS 状态由 ContainerCreating 变为 Running 即成功</span>

NAME                          READY   STATUS    RESTARTS   AGE    IP           NODE            NOMINATED NODE   READINESS GATES
test-nginx-5bd8859b98-thscs   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          3m3s   <span class="token number">10.244</span>.1.2   k8s-slave-172   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时显示了 <strong>IP</strong> 和容器所在的节点，切换到对应机器执行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token number">10.244</span>.1.2 <span class="token comment"># 即可看到 nginx welcome 文档</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-4-设置master节点是否可调度-可选" tabindex="-1"><a class="header-anchor" href="#_5-4-设置master节点是否可调度-可选" aria-hidden="true">#</a> 5.4 设置master节点是否可调度（可选）</h3>
<div class="custom-container warning">
<p class="custom-container-title">只在 Master 节点执行</p>
</div>
<p>默认部署成功后，<strong>Master</strong> 节点无法调度业务 <strong>pod</strong>，如需设置其参与 <strong>pod</strong> 调度，需执行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl taint <span class="token function">node</span> k8s-master node-role.kubernetes.io/master:Noschedule-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-安装dashboard" tabindex="-1"><a class="header-anchor" href="#_6-安装dashboard" aria-hidden="true">#</a> 6. 安装Dashboard</h2>
<p>推荐使用下面这种方式</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc5/aio/deploy/recommended.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加 <strong>service</strong> 为 <code v-pre>NodePort</code> 类型，变为 <code v-pre>NodePort</code> 类型的服务，文件的 <strong>45</strong> 行上下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> recommended.yaml
<span class="token punctuation">..</span>.
<span class="token comment">#  +45   type: NodePort </span>

<span class="token punctuation">..</span>.
spec:
  ports:
    - port: <span class="token number">443</span>
      targetPort: <span class="token number">8443</span>
  selector:
    k8s-app: kubernetes-dashboard
  type: NodePort <span class="token comment"># 注意空格是两个</span>
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署并查看</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> recommended.yaml

<span class="token comment"># 查看 dashboard 服务</span>
kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get svc
NAME                        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>         AGE
dashboard-metrics-scraper   ClusterIP   <span class="token number">10.96</span>.54.184   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">8000</span>/TCP        35s
kubernetes-dashboard        NodePort    <span class="token number">10.97</span>.63.15    <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">443</span>:30100/TCP   35s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>使用浏览器访问 <a href="https://192.168.3.171:30100/" target="_blank" rel="noopener noreferrer">https://192.168.3.171:30100/<ExternalLinkIcon/></a> 即可打开 <strong>kubernetes-dashboard</strong> 页面</p>
</blockquote>
<h4 id="使用-serviceaccent-访问" tabindex="-1"><a class="header-anchor" href="#使用-serviceaccent-访问" aria-hidden="true">#</a> 使用 ServiceAccent 访问</h4>
<p>创建 <code v-pre>admin</code> 登录账户</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ vim admin.conf

<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">rbac.authorization.kubernetes.io/autoupdate</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
 
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建登录用户信息，配置令牌</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> admin.conf	<span class="token comment"># kubectl apply -f admin.yaml</span>
<span class="token comment"># serviceaccount/admin created</span>
<span class="token comment">#clusterrolebinding.rbac.authorization.k8s.io/admin created</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="查看-kubernetes-dashboard-下面的-secret" tabindex="-1"><a class="header-anchor" href="#查看-kubernetes-dashboard-下面的-secret" aria-hidden="true">#</a> <strong>查看 kubernetes-dashboard 下面的 secret</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get secret<span class="token operator">|</span><span class="token function">grep</span> admin-token
<span class="token comment"># admin-token-764m5                  kubernetes.io/service-account-token   3      2m13s</span>

<span class="token comment"># 或查看全部的</span>
$ kubectl get secret <span class="token parameter variable">-n</span> kubernetes-dashboard
NAME                               TYPE                                  DATA   AGE
admin-token-764m5                  kubernetes.io/service-account-token   <span class="token number">3</span>      3m27s
default-token-2726l                kubernetes.io/service-account-token   <span class="token number">3</span>      7m57s
kubernetes-dashboard-certs         Opaque                                <span class="token number">0</span>      7m57s
kubernetes-dashboard-csrf          Opaque                                <span class="token number">1</span>      7m57s
kubernetes-dashboard-key-holder    Opaque                                <span class="token number">2</span>      7m57s
kubernetes-dashboard-token-9fs8x   kubernetes.io/service-account-token   <span class="token number">3</span>      7m58s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="查看登录-token" tabindex="-1"><a class="header-anchor" href="#查看登录-token" aria-hidden="true">#</a> <strong>查看登录 token</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用该命令拿到token, 然后粘贴到</span>
kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get secret admin-token-764m5 <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token punctuation">{</span>.data.token<span class="token punctuation">}</span><span class="token operator">|</span>base64 <span class="token parameter variable">-d</span>

eyJhbGciOiJSUzI1NiIsImtpZCI6Ilo3QTR5ckxaOXZrYUc4emZKTWpFQkNBMEVkaktPeGdTR25rbW41UjluLVUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi10b2tlbi03NjRtNSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJhZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImJlZjZjMWM0LWU0ZDktNGE4OC1hMzdkLTBjMzVlZGQ2ZmZhZSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbiJ9.p0_tioIGZShZlsfafLWO2irYSAo6A3FGJSvfk9gbIjj8YP_Wif4lPUv8kDkl_3YgH7k2q15Bw_mcQGShOLMc-KlRp5FizlxT4aJc74lVPntzinAufN4QHX_5a5wj5CIvYiTH-U71ZECY_eDzn0SBlEVctCm3cVpiwxhUMrPKcSzO9hGYm9xI1ZCgo4fkpgsvNyzPD6QLPQjqelAmMpTcujEkIm5DzdzZAgOgU58wx6bUowhBqKt7hrMkDk5nXPJ-o7W8M0_3KxKRJO4fEMAAeanajfJ4RiBrVha9Ln23F_Q5zzroNcnV5vsdUMS3px50u70NaNCVOy32n4aeAFX4Xg

<span class="token comment"># 或如下</span>
$ kubectl describe secret admin-token-764m5 <span class="token parameter variable">-n</span> kubernetes-dashboard
Name:         admin-token-764m5
Namespace:    kubernetes-dashboard
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">></span>
Annotations:  kubernetes.io/service-account.name: admin
              kubernetes.io/service-account.uid: bef6c1c4-e4d9-4a88-a37d-0c35edd6ffae

Type:  kubernetes.io/service-account-token

Data
<span class="token operator">==</span><span class="token operator">==</span>
ca.crt:     <span class="token number">1025</span> bytes
namespace:  <span class="token number">20</span> bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6Ilo3QTR5ckxaOXZrYUc4emZKTWpFQkNBMEVkaktPeGdTR25rbW41UjluLVUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi10b2tlbi03NjRtNSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJhZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImJlZjZjMWM0LWU0ZDktNGE4OC1hMzdkLTBjMzVlZGQ2ZmZhZSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbiJ9.p0_tioIGZShZlsfafLWO2irYSAo6A3FGJSvfk9gbIjj8YP_Wif4lPUv8kDkl_3YgH7k2q15Bw_mcQGShOLMc-KlRp5FizlxT4aJc74lVPntzinAufN4QHX_5a5wj5CIvYiTH-U71ZECY_eDzn0SBlEVctCm3cVpiwxhUMrPKcSzO9hGYm9xI1ZCgo4fkpgsvNyzPD6QLPQjqelAmMpTcujEkIm5DzdzZAgOgU58wx6bUowhBqKt7hrMkDk5nXPJ-o7W8M0_3KxKRJO4fEMAAeanajfJ4RiBrVha9Ln23F_Q5zzroNcnV5vsdUMS3px50u70NaNCVOy32n4aeAFX4Xg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-记录k8s-v1-22-3-版本安装" tabindex="-1"><a class="header-anchor" href="#_7-记录k8s-v1-22-3-版本安装" aria-hidden="true">#</a> 7. 记录k8s v1.22.3 版本安装</h2>
<p><a href="https://kuboard.cn/install/history-k8s/install-k8s-1.22.x.html" target="_blank" rel="noopener noreferrer">文档参考<ExternalLinkIcon/></a></p>
<p>初始化步骤参考 <mark>1.准备工作</mark> 没有区别，<strong>1.22</strong> 版本的 <strong>k8s</strong> 已经改为支持 <strong>containerd</strong> 容器运行时了，故稍有区别，以下列出注意的点</p>
<details class="custom-container details"><summary>详情</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 阿里云 docker hub 镜像</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">REGISTRY_MIRROR</span><span class="token operator">=</span>https://registry.aliyuncs.com
<span class="token comment"># 在 master 节点和 worker 节点都要执行</span>

<span class="token comment"># 安装 containerd</span>
<span class="token comment"># 参考文档如下</span>
<span class="token comment"># https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd</span>

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/modules-load.d/containerd.conf</span>
overlay
br_netfilter
EOF</span>

<span class="token function">sudo</span> modprobe overlay
<span class="token function">sudo</span> modprobe br_netfilter

<span class="token comment"># Setup required sysctl params, these persist across reboots.</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/sysctl.d/99-kubernetes-cri.conf</span>
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF</span>

<span class="token comment"># Apply sysctl params without reboot</span>
<span class="token function">sysctl</span> <span class="token parameter variable">--system</span>

<span class="token comment"># 卸载旧版本</span>
yum remove <span class="token parameter variable">-y</span> containerd.io

<span class="token comment"># 设置 yum repository</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

<span class="token comment"># 安装 containerd</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> containerd.io-1.4.3

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/containerd
containerd config default <span class="token operator">></span> /etc/containerd/config.toml

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s#k8s.gcr.io#registry.aliyuncs.com/k8sxio#g"</span>  /etc/containerd/config.toml
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'/containerd.runtimes.runc.options/a\ \ \ \ \ \ \ \ \ \ \ \ SystemdCgroup = true'</span> /etc/containerd/config.toml
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s#https://registry-1.docker.io#<span class="token variable">${REGISTRY_MIRROR}</span>#g"</span>  /etc/containerd/config.toml


systemctl daemon-reload
systemctl <span class="token builtin class-name">enable</span> containerd
systemctl restart containerd

<span class="token comment"># 安装 nfs-utils</span>
<span class="token comment"># 必须先安装 nfs-utils 才能挂载 nfs 网络存储</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span>

<span class="token comment"># 关闭 防火墙</span>
systemctl stop firewalld
systemctl disable firewalld

<span class="token comment"># 关闭 SeLinux</span>
setenforce <span class="token number">0</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s/SELINUX=enforcing/SELINUX=disabled/g"</span> /etc/selinux/config

<span class="token comment"># 关闭 swap</span>
swapoff <span class="token parameter variable">-a</span>
<span class="token function">yes</span> <span class="token operator">|</span> <span class="token function">cp</span> /etc/fstab /etc/fstab_bak
<span class="token function">cat</span> /etc/fstab_bak <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> swap <span class="token operator">></span> /etc/fstab

<span class="token comment"># 配置K8S的yum源</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

<span class="token comment"># 卸载旧版本</span>
yum remove <span class="token parameter variable">-y</span> kubelet kubeadm kubectl

<span class="token comment"># 安装kubelet、kubeadm、kubectl</span>
<span class="token comment"># 将 ${1} 替换为 kubernetes 版本号，例如 1.20.1</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.22.3 kubeadm-1.22.3 kubectl-1.22.3

crictl config runtime-endpoint /run/containerd/containerd.sock

<span class="token comment"># 重启 docker，并启动 kubelet</span>
systemctl daemon-reload
systemctl <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> systemctl start kubelet

containerd <span class="token parameter variable">--version</span>
kubelet <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="_7-1-初始化-master-节点" tabindex="-1"><a class="header-anchor" href="#_7-1-初始化-master-节点" aria-hidden="true">#</a> 7.1 初始化 master 节点</h3>
<div class="custom-container danger">
<p class="custom-container-title">重要！</p>
<p>需要先配置 <strong>containerd</strong> 的代理</p>
<h4 id="注意-所有节点均需要配置-否则-kube-proxy-会-create失败" tabindex="-1"><a class="header-anchor" href="#注意-所有节点均需要配置-否则-kube-proxy-会-create失败" aria-hidden="true">#</a> <strong>注意！！所有节点均需要配置，否则 kube-proxy 会 Create失败</strong></h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /usr/lib/systemd/system/containerd.service 

<span class="token comment"># 添加</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">"HTTP_PROXY=http://172.16.70.104:808/"</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">"HTTPS_PROXY=http://172.16.70.104:808/"</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">"NO_PROXY=10.96.0.0/16,127.0.0.1,172.16.0.0/16,localhost"</span>

<span class="token comment"># NO_PROXY的设置也是必须的。10.96.0.0与192.168.0.0分别是clusterIP与Pod的内网网段，如果不设置NO_PROXY Pod与Pod之间的通信会出现问题。</span>


<span class="token comment"># 重启</span>
systemctl daemon-reload
systemctl restart containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再去执行下文的拉镜像业务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm config images pull <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<h5 id="先设置环境变量" tabindex="-1"><a class="header-anchor" href="#先设置环境变量" aria-hidden="true">#</a> <strong>先设置环境变量</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 只在 master 节点执行</span>
<span class="token comment"># 替换 x.x.x.x 为 master 节点实际 IP（请使用内网 IP）</span>
<span class="token comment"># export 命令只在当前 shell 会话中有效，开启新的 shell 窗口后，如果要继续安装过程，请重新执行此处的 export 命令</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MASTER_IP</span><span class="token operator">=</span><span class="token number">172.16</span>.120.171
<span class="token comment"># 替换 apiserver.demo 为 您想要的 dnsName</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">APISERVER_NAME</span><span class="token operator">=</span>apiserver.uit
<span class="token comment"># Kubernetes 容器组所在的网段，该网段安装完成后，由 kubernetes 创建，事先并不存在于您的物理网络中</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">POD_SUBNET</span><span class="token operator">=</span><span class="token number">10.100</span>.0.0/16
<span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${MASTER_IP}</span>    <span class="token variable">${APISERVER_NAME}</span>"</span> <span class="token operator">>></span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="再去通过-kubeadm-初始化" tabindex="-1"><a class="header-anchor" href="#再去通过-kubeadm-初始化" aria-hidden="true">#</a> <strong>再去通过 kubeadm 初始化</strong></h5>
<details class="custom-container details"><summary>详情</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 只在 master 节点执行</span>

<span class="token comment"># 脚本出错时终止执行</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">${<span class="token operator">#</span>POD_SUBNET}</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token variable">${<span class="token operator">#</span>APISERVER_NAME}</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">"<span class="token entity" title="\033">\033</span>[31;1m请确保您已经设置了环境变量 POD_SUBNET 和 APISERVER_NAME <span class="token entity" title="\033">\033</span>[0m"</span>
  <span class="token builtin class-name">echo</span> 当前POD_SUBNET<span class="token operator">=</span><span class="token variable">$POD_SUBNET</span>
  <span class="token builtin class-name">echo</span> 当前APISERVER_NAME<span class="token operator">=</span><span class="token variable">$APISERVER_NAME</span>
  <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>


<span class="token comment"># 查看完整配置选项 https://godoc.org/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2</span>
<span class="token function">rm</span> <span class="token parameter variable">-f</span> ./kubeadm-config.yaml
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span> ./kubeadm-config.yaml</span>
---
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: v1.22.3
imageRepository: registry.aliyuncs.com/k8sxio
controlPlaneEndpoint: "apiserver.uit:6443"
networking:
  serviceSubnet: "10.96.0.0/16"
  podSubnet: "10.100.0.0/16"
  dnsDomain: "cluster.local"
dns:
  type: CoreDNS
  imageRepository: swr.cn-east-2.myhuaweicloud.com/coredns
  imageTag: 1.8.0

---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
cgroupDriver: systemd
EOF</span>

<span class="token comment"># kubeadm init</span>
<span class="token comment"># 根据您服务器网速的情况，您需要等候 3 - 10 分钟</span>
<span class="token builtin class-name">echo</span> <span class="token string">""</span>
<span class="token builtin class-name">echo</span> <span class="token string">"抓取镜像，请稍候..."</span>
kubeadm config images pull <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm-config.yaml
<span class="token comment"># !!此处若是内网环境，需要如上文那样设置 containerd 代理，否则下载报错</span>

<span class="token builtin class-name">echo</span> <span class="token string">""</span>
<span class="token builtin class-name">echo</span> <span class="token string">"初始化 Master 节点"</span>
kubeadm init <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm-config.yaml --upload-certs

<span class="token comment"># 配置 kubectl</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /root/.kube/
<span class="token function">mkdir</span> /root/.kube/
<span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf /root/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><strong>检查 master 初始化结果</strong></p>
<p><strong>coredns</strong> 将处于启动失败的状态（<em>老现象了</em>），安装网络插件后，<strong>coredns</strong> 将正常启动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 只在 master 节点执行</span>

<span class="token comment"># 执行如下命令，等待 3-10 分钟，直到所有的容器组处于 Running 状态</span>
<span class="token function">watch</span> kubectl get pod <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> wide

<span class="token comment"># 查看 master 节点初始化结果</span>
kubectl get nodes <span class="token parameter variable">-o</span> wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-安装网络插件" tabindex="-1"><a class="header-anchor" href="#_7-2-安装网络插件" aria-hidden="true">#</a> 7.2 安装网络插件</h3>
<p>网络插件可以选择 <strong>calico</strong> 或者 <strong>flannel</strong>（任意选择其一即可）</p>
<Tabs :data='[{"title":"Calico"},{"title":"Flannel"}]'>
<template #tab0="{ title, value, isActive }">
<blockquote>
<p>如果阿里云上安装，建议使用 <strong>flannel</strong>，有多个案例表明 <strong>calico</strong> 与阿里云存在兼容性问题</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">POD_SUBNET</span><span class="token operator">=</span><span class="token number">10.100</span>.0.0/16
kubectl apply <span class="token parameter variable">-f</span> https://kuboard.cn/install-script/v1.22.x/calico-operator.yaml
<span class="token function">wget</span> https://kuboard.cn/install-script/v1.22.x/calico-custom-resources.yaml
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s#192.168.0.0/16#<span class="token variable">${POD_SUBNET}</span>#"</span> calico-custom-resources.yaml
kubectl apply <span class="token parameter variable">-f</span> calico-custom-resources.yaml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">POD_SUBNET</span><span class="token operator">=</span><span class="token number">10.100</span>.0.0/16
<span class="token function">wget</span> https://kuboard.cn/install-script/flannel/flannel-v0.14.0.yaml
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">"s#10.244.0.0/16#<span class="token variable">${POD_SUBNET}</span>#"</span> flannel-v0.14.0.yaml
kubectl apply <span class="token parameter variable">-f</span> ./flannel-v0.14.0.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="_7-3-初始化-worker节点" tabindex="-1"><a class="header-anchor" href="#_7-3-初始化-worker节点" aria-hidden="true">#</a> 7.3 初始化 worker节点</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 只在 master 节点执行,获得 join 命令参数</span>
kubeadm token create --print-join-command

<span class="token comment"># 可获取kubeadm join 命令及参数，输出如下</span>
kubeadm <span class="token function">join</span> apiserver.uit:6443 <span class="token parameter variable">--token</span> jp5cyz.3tcmv8cr8xd8nhj3 --discovery-token-ca-cert-hash sha256:3520937aaab1f2abfd17334b7409ad293b2cc916dcdb33085e18cfa8a08281bf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该 <strong>token</strong> 的有效时间为 2 个小时，<strong>2</strong> 小时内，您可以使用此 <strong>token</strong> 初始化任意数量的 <strong>worker</strong> 节点</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 在 worker 节点执行</span>
<span class="token comment"># 替换 x.x.x.x 为 master 节点的内网 IP</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MASTER_IP</span><span class="token operator">=</span>x.x.x.x
<span class="token comment"># 替换 apiserver.demo 为初始化 master 节点时所使用的 APISERVER_NAME</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">APISERVER_NAME</span><span class="token operator">=</span>apiserver.demo
<span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${MASTER_IP}</span>    <span class="token variable">${APISERVER_NAME}</span>"</span> <span class="token operator">>></span> /etc/hosts

<span class="token comment"># 替换为 master 节点上 kubeadm token create 命令的输出</span>
kubeadm <span class="token function">join</span> apiserver.demo:6443 xxxx

<span class="token comment"># master 节点查看，输出如下表示安装成功</span>
$ kubectl get nodes
NAME             STATUS   ROLES                  AGE   VERSION
k8s-master-171   Ready    control-plane,master   34m   v1.22.3
k8s-salve-172    Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>                 24m   v1.22.3
k8s-salve-173    Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>                 24m   v1.22.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-4-安装dashboard" tabindex="-1"><a class="header-anchor" href="#_7-4-安装dashboard" aria-hidden="true">#</a> 7.4 安装Dashboard</h3>
<p>安装可同上一致，依然使用 <strong>v2</strong> 版本的 <strong>dashboard</strong></p>
<h4 id="使用-serviceaccent-访问有改动" tabindex="-1"><a class="header-anchor" href="#使用-serviceaccent-访问有改动" aria-hidden="true">#</a> 使用 ServiceAccent 访问有改动</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建 文件</span>
<span class="token function">vim</span> admin-user.yaml

<span class="token comment"># 键入如下</span>
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
  
<span class="token comment"># 执行创建命令</span>
$ kubectl create <span class="token parameter variable">-f</span> admin-user.yaml
<span class="token comment"># serviceaccount/admin-user created</span>

<span class="token comment"># 再创建如下</span>
<span class="token function">vim</span> bind.yaml

<span class="token comment"># 并键入</span>
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
  
<span class="token comment"># 添加</span>
$ kubectl create <span class="token parameter variable">-f</span> bind.yaml 
<span class="token comment"># clusterrolebinding.rbac.authorization.k8s.io/admin-user created</span>

<span class="token comment"># 创建token</span>
$ kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard create token admin-user

<span class="token comment"># 复制如下 token 即可登入，貌似有时间限制，下次登录是生成即可</span>
eyJhbGciOiJSUzI1NiIsImtpZCI6IjBnekNxQnRWV2tkUTA2eE5YWFE3VkRQcFh5ZTR5c19JZldZTm94eExqak0i<span class="token punctuation">..</span><span class="token punctuation">..</span>
se4BNIbTvZwXY4_D_6bwqU2Y2SbsmHuSkhe5AUc-H7m-sd5jJSojpXA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


