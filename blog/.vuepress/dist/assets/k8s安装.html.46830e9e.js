import{_ as p}from"./plugin-vueexport-helper.2444895f.js";import{o as u,c as m,e as v,a as n,b as s,d as a,w as l,f as e,r as t}from"./app.f50e8185.js";const b={},k=n("p",null,[s("\u8BB0\u5F55\u5B89\u88C5 "),n("strong",null,"Docker"),s(" \u7248\uFF08\u8001\u7248\u672C\uFF09\u7684 "),n("strong",null,"k8s"),s(" \u5355 "),n("strong",null,"Master"),s(" \u96C6\u7FA4")],-1),g=e('<h2 id="_1-\u51C6\u5907\u5DE5\u4F5C" tabindex="-1"><a class="header-anchor" href="#_1-\u51C6\u5907\u5DE5\u4F5C" aria-hidden="true">#</a> 1. \u51C6\u5907\u5DE5\u4F5C</h2><p><strong>\u51C6\u5907\u5982\u4E0B\u73AF\u5883</strong></p><ul><li><strong>3</strong> \u53F0 <strong>2\u68384G</strong> \u7684\u670D\u52A1\u5668\uFF0C\u4E00\u53F0\u4F5C\u4E3A <strong>Master</strong> \u4E24\u53F0\u4F5C\u4E3A <strong>Salve</strong></li><li><strong>Cent OS 7.8</strong></li><li>\u63D0\u524D\u89C4\u5212\u597D <strong>IP</strong>\uFF0C\u5E76\u8BBE\u7F6E\u597D\u53EF\u8054\u7F51\u7684\u4EE3\u7406</li></ul><p><strong>\u5B89\u88C5\u540E\u7684\u8F6F\u4EF6\u7248\u672C\u4E3A</strong></p><ul><li>Kubernetes v1.16.2 <ul><li>flannel 0.11|12.0\uFF08<em>\u6709\u5927\u5751</em>\uFF09</li></ul></li><li>Docker 19.03.11</li></ul>',5),h={class:"custom-container tip"},f=n("p",{class:"custom-container-title"},"\u5173\u4E8E\u4E8C\u8FDB\u5236\u5B89\u88C5",-1),y=n("strong",null,"kubeadm",-1),_=n("strong",null,"Kubernetes",-1),x=n("em",null,"\u4E8C\u8FDB\u5236",-1),E={href:"http://kubernetes.io",target:"_blank",rel:"noopener noreferrer"},S=n("strong",null,"kubeadm",-1),R=n("strong",null,"kubernetes",-1),N=e(`<h4 id="_1-1-\u8BBE\u7F6E-yum-\u6E90" tabindex="-1"><a class="header-anchor" href="#_1-1-\u8BBE\u7F6E-yum-\u6E90" aria-hidden="true">#</a> 1.1 <strong>\u8BBE\u7F6E yum \u6E90</strong></h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /etc/yum.repos.d/
<span class="token function">cp</span> ./CentOS-Base.repo ./CentOS-Base-repo.bak
<span class="token function">wget</span> http://mirrors.aliyun.com/repo/Centos-7.repo
yum clean all
<span class="token function">mv</span> Centos-7.repo CentOS-Base.repo
yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-\u68C0\u67E5-centos-hostname" tabindex="-1"><a class="header-anchor" href="#_1-2-\u68C0\u67E5-centos-hostname" aria-hidden="true">#</a> 1.2 <strong>\u68C0\u67E5 centos / hostname</strong></h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728 master \u8282\u70B9\u548C worker \u8282\u70B9\u90FD\u8981\u6267\u884C</span>
<span class="token function">cat</span> /etc/redhat-release

<span class="token comment"># \u6B64\u5904 hostname \u7684\u8F93\u51FA\u5C06\u4F1A\u662F\u8BE5\u673A\u5668\u5728 Kubernetes \u96C6\u7FA4\u4E2D\u7684\u8282\u70B9\u540D\u5B57</span>
<span class="token comment"># \u4E0D\u80FD\u4F7F\u7528 localhost \u4F5C\u4E3A\u8282\u70B9\u7684\u540D\u5B57</span>
<span class="token function">hostname</span>

<span class="token comment"># \u8BF7\u4F7F\u7528 lscpu \u547D\u4EE4\uFF0C\u6838\u5BF9 CPU \u4FE1\u606F</span>
<span class="token comment"># Architecture: x86_64    \u672C\u5B89\u88C5\u6587\u6863\u4E0D\u652F\u6301 arm \u67B6\u6784</span>
<span class="token comment"># CPU(s):       2         CPU \u5185\u6838\u6570\u91CF\u4E0D\u80FD\u4F4E\u4E8E 2</span>
lscpu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-\u4FEE\u6539-hostname" tabindex="-1"><a class="header-anchor" href="#_1-3-\u4FEE\u6539-hostname" aria-hidden="true">#</a> 1.3 <strong>\u4FEE\u6539 hostname</strong></h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5EFA\u8BAE\u6B63\u5E38\u82F1\u6587\u6570\u5B57\u7EC4\u5408</span>
hostnamectl set-hostname k8s-master-171
hostnamectl set-hostname k8s-salve-172 
hostnamectl set-hostname k8s-salve-173

<span class="token comment"># \u67E5\u770B\u4FEE\u6539\u7ED3\u679C</span>
hostnamectl status

<span class="token comment"># \u8BBE\u7F6E hostname \u89E3\u6790</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;127.0.0.1   <span class="token variable"><span class="token variable">$(</span><span class="token function">hostname</span><span class="token variable">)</span></span>&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/hosts

<span class="token comment"># \u6216\u662F\u4E09\u53F0\u8282\u70B9\u5168\u90E8\u52A0\u5165hosts</span>
<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span>/etc/hosts<span class="token operator">&lt;&lt;</span><span class="token string">EOF
192.168.3.171 k8s-master-171
192.168.3.172 k8s-slave-172
192.168.3.173 k8s-slave-173
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-\u68C0\u67E5\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#_1-4-\u68C0\u67E5\u7F51\u7EDC" aria-hidden="true">#</a> 1.4 <strong>\u68C0\u67E5\u7F51\u7EDC</strong></h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8smaster171 ~<span class="token punctuation">]</span>$ <span class="token function">ip</span> route show
default via <span class="token number">192.168</span>.3.1 dev eth0 proto static metric <span class="token number">100</span> 
<span class="token number">172.17</span>.0.0/16 dev docker0 proto kernel scope <span class="token function">link</span> src <span class="token number">172.17</span>.0.1 
<span class="token number">192.168</span>.3.0/24 dev eth0 proto kernel scope <span class="token function">link</span> src <span class="token number">192.168</span>.3.171 metric <span class="token number">100</span> 

<span class="token punctuation">[</span>root@k8smaster171 ~<span class="token punctuation">]</span>$ <span class="token function">ip</span> a
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue state UNKNOWN group default qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">2</span>: eth0: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc pfifo_fast state UP group default qlen <span class="token number">1000</span>
    link/ether 7e:73:42:29:b7:63 brd ff:ff:ff:ff:ff:ff
    inet <span class="token number">192.168</span>.3.171/24 brd <span class="token number">192.168</span>.3.255 scope global noprefixroute eth0
       valid_lft forever preferred_lft forever
</code></pre><div class="highlight-lines"><br><div class="highlight-line">\xA0</div><br><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><br><div class="highlight-line">\xA0</div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">kubelet\u4F7F\u7528\u7684IP\u5730\u5740</p><ul><li><code>ip route show</code> \u547D\u4EE4\u4E2D\uFF0C\u53EF\u4EE5\u77E5\u9053\u673A\u5668\u7684\u9ED8\u8BA4\u7F51\u5361\uFF0C\u901A\u5E38\u662F <code>eth0</code>\uFF0C\u5982 <strong>default via 172.21.0.23 dev eth0</strong></li><li><code>ip address</code> \u547D\u4EE4\u4E2D\uFF0C\u53EF\u663E\u793A\u9ED8\u8BA4\u7F51\u5361\u7684 IP \u5730\u5740\uFF0C<strong>Kubernetes</strong> \u5C06\u4F7F\u7528\u6B64 <strong>IP</strong> \u5730\u5740\u4E0E\u96C6\u7FA4\u5185\u7684\u5176\u4ED6\u8282\u70B9\u901A\u4FE1\uFF0C\u5982 <code>172.17.216.80</code></li><li>\u6240\u6709\u8282\u70B9\u4E0A <strong>Kubernetes</strong> \u6240\u4F7F\u7528\u7684 <strong>IP</strong> \u5730\u5740\u5FC5\u987B\u53EF\u4EE5\u4E92\u901A\uFF08<em>\u65E0\u9700 NAT \u6620\u5C04\u3001\u65E0\u5B89\u5168\u7EC4\u6216\u9632\u706B\u5899\u9694\u79BB</em>\uFF09</li></ul></div><h4 id="_1-5-\u901A\u8FC7\u7B2C\u4E09\u65B9\u811A\u672C\u5FEB\u901F\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_1-5-\u901A\u8FC7\u7B2C\u4E09\u65B9\u811A\u672C\u5FEB\u901F\u5B89\u88C5" aria-hidden="true">#</a> 1.5 \u901A\u8FC7\u7B2C\u4E09\u65B9\u811A\u672C\u5FEB\u901F\u5B89\u88C5</h4><p>\u5728 <strong>Master</strong> \u8282\u70B9\u548C <strong>Worker</strong> \u8282\u70B9\u90FD\u8981\u6267\u884C</p>`,11),I={href:"https://kuboard.cn/install/history-k8s/install-k8s-1.16.2.html",target:"_blank",rel:"noopener noreferrer"},P=n("strong",null,"CentOS",-1),q=e(`<details class="custom-container details"><summary>\u8BE6\u60C5</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># \u5728 master \u8282\u70B9\u548C worker \u8282\u70B9\u90FD\u8981\u6267\u884C</span>

<span class="token comment"># \u5B89\u88C5 docker</span>
<span class="token comment"># \u53C2\u8003\u6587\u6863\u5982\u4E0B</span>
<span class="token comment"># https://docs.docker.com/install/linux/docker-ce/centos/ </span>
<span class="token comment"># https://docs.docker.com/install/linux/linux-postinstall/</span>

<span class="token comment"># \u5378\u8F7D\u65E7\u7248\u672C</span>
yum remove <span class="token parameter variable">-y</span> <span class="token function">docker</span> <span class="token punctuation">\\</span>
docker-client <span class="token punctuation">\\</span>
docker-client-latest <span class="token punctuation">\\</span>
docker-common <span class="token punctuation">\\</span>
docker-latest <span class="token punctuation">\\</span>
docker-latest-logrotate <span class="token punctuation">\\</span>
docker-logrotate <span class="token punctuation">\\</span>
docker-selinux <span class="token punctuation">\\</span>
docker-engine-selinux <span class="token punctuation">\\</span>
docker-engine

<span class="token comment"># \u8BBE\u7F6E yum repository</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils <span class="token punctuation">\\</span>
device-mapper-persistent-data <span class="token punctuation">\\</span>
lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

<span class="token comment"># \u5B89\u88C5\u5E76\u542F\u52A8 docker</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce-18.09.7 docker-ce-cli-18.09.7 containerd.io
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
systemctl start <span class="token function">docker</span>

<span class="token comment"># \u5B89\u88C5 nfs-utils</span>
<span class="token comment"># \u5FC5\u987B\u5148\u5B89\u88C5 nfs-utils \u624D\u80FD\u6302\u8F7D nfs \u7F51\u7EDC\u5B58\u50A8</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span>

<span class="token comment"># \u5173\u95ED \u9632\u706B\u5899</span>
systemctl stop firewalld
systemctl disable firewalld

<span class="token comment"># \u5173\u95ED SeLinux</span>
setenforce <span class="token number">0</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/SELINUX=enforcing/SELINUX=disabled/g&quot;</span> /etc/selinux/config

<span class="token comment"># \u5173\u95ED swap</span>
swapoff <span class="token parameter variable">-a</span>
<span class="token function">yes</span> <span class="token operator">|</span> <span class="token function">cp</span> /etc/fstab /etc/fstab_bak
<span class="token function">cat</span> /etc/fstab_bak <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> swap <span class="token operator">&gt;</span> /etc/fstab

<span class="token comment"># \u4FEE\u6539 /etc/sysctl.conf</span>
<span class="token comment"># \u5982\u679C\u6709\u914D\u7F6E\uFF0C\u5219\u4FEE\u6539</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#^net.ipv4.ip_forward.*#net.ipv4.ip_forward=1#g&quot;</span>  /etc/sysctl.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#^net.bridge.bridge-nf-call-ip6tables.*#net.bridge.bridge-nf-call-ip6tables=1#g&quot;</span>  /etc/sysctl.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#^net.bridge.bridge-nf-call-iptables.*#net.bridge.bridge-nf-call-iptables=1#g&quot;</span>  /etc/sysctl.conf
<span class="token comment"># \u53EF\u80FD\u6CA1\u6709\uFF0C\u8FFD\u52A0</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.ipv4.ip_forward = 1&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.bridge.bridge-nf-call-ip6tables = 1&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.bridge.bridge-nf-call-iptables = 1&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.conf
<span class="token comment"># \u6267\u884C\u547D\u4EE4\u4EE5\u5E94\u7528</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span>

<span class="token comment"># \u914D\u7F6EK8S\u7684yum\u6E90</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

<span class="token comment"># \u5378\u8F7D\u65E7\u7248\u672C</span>
yum remove <span class="token parameter variable">-y</span> kubelet kubeadm kubectl

<span class="token comment"># \u5B89\u88C5kubelet\u3001kubeadm\u3001kubectl</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.16.2 kubeadm-1.16.2 kubectl-1.16.2

<span class="token comment"># \u4FEE\u6539docker Cgroup Driver\u4E3Asystemd</span>
<span class="token comment"># # \u5C06/usr/lib/systemd/system/docker.service\u6587\u4EF6\u4E2D\u7684\u8FD9\u4E00\u884C ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock</span>
<span class="token comment"># # \u4FEE\u6539\u4E3A ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd</span>
<span class="token comment"># \u5982\u679C\u4E0D\u4FEE\u6539\uFF0C\u5728\u6DFB\u52A0 worker \u8282\u70B9\u65F6\u53EF\u80FD\u4F1A\u78B0\u5230\u5982\u4E0B\u9519\u8BEF</span>
<span class="token comment"># [WARNING IsDockerSystemdCheck]: detected &quot;cgroupfs&quot; as the Docker cgroup driver. The recommended driver is &quot;systemd&quot;. </span>
<span class="token comment"># Please follow the guide at https://kubernetes.io/docs/setup/cri/</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#^ExecStart=/usr/bin/dockerd.*#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd#g&quot;</span> /usr/lib/systemd/system/docker.service

<span class="token comment"># \u8BBE\u7F6E docker \u955C\u50CF\uFF0C\u63D0\u9AD8 docker \u955C\u50CF\u4E0B\u8F7D\u901F\u5EA6\u548C\u7A33\u5B9A\u6027</span>
<span class="token comment"># \u5982\u679C\u60A8\u8BBF\u95EE https://hub.docker.io \u901F\u5EA6\u975E\u5E38\u7A33\u5B9A\uFF0C\u4EA6\u53EF\u4EE5\u8DF3\u8FC7\u8FD9\u4E2A\u6B65\u9AA4</span>
<span class="token function">curl</span> <span class="token parameter variable">-sSL</span> https://get.daocloud.io/daotools/set_mirror.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> http://f1361db2.m.daocloud.io

<span class="token comment"># \u91CD\u542F docker\uFF0C\u5E76\u542F\u52A8 kubelet</span>
systemctl daemon-reload
systemctl restart <span class="token function">docker</span>
systemctl <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> systemctl start kubelet

<span class="token function">docker</span> version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="_2-\u521D\u59CB\u5316\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#_2-\u521D\u59CB\u5316\u914D\u7F6E" aria-hidden="true">#</a> 2. \u521D\u59CB\u5316\u914D\u7F6E</h2><div class="custom-container warning"><p class="custom-container-title">\u6240\u6709\u8282\u70B9\u6267\u884C\u5982\u4E0B\u64CD\u4F5C</p></div><h5 id="\u8BBE\u7F6E\u7F51\u7EDC\u76F8\u5173" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u7F51\u7EDC\u76F8\u5173" aria-hidden="true">#</a> <strong>\u8BBE\u7F6E\u7F51\u7EDC\u76F8\u5173</strong></h5><p>\u5982\u679C\u8282\u70B9\u95F4\u65E0\u5B89\u5168\u7EC4\u9650\u5236\uFF08<em>\u5185\u7F51\u673A\u5668\u95F4\u53EF\u4EE5\u4EFB\u610F\u8BBF\u95EE</em>\uFF09\uFF0C\u53EF\u4EE5\u5FFD\u7565\uFF0C\u9999\u3001\u5426\u5219\uFF0C\u81F3\u5C11\u4FDD\u8BC1\u5982\u4E0B\u7AEF\u53E3\u53EF\u901A</p><ul><li><strong>k8s-master\uFF1A</strong><ul><li><strong>TCP\uFF1A</strong> <strong>6443, 2379, 2380, 60080, 60081</strong></li><li><strong>UDP</strong> \u534F\u8BAE\u7AEF\u53E3\u5168\u90E8\u65F6\u6253\u5F00</li></ul></li><li><strong>k8s-slave\uFF1A</strong> <strong>UDP</strong> \u534F\u8BAE\u7AEF\u53E3\u5168\u90E8\u6253\u5F00</li></ul><h5 id="\u8BBE\u7F6E\u6216\u5173\u95ED-iptables" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u6216\u5173\u95ED-iptables" aria-hidden="true">#</a> <strong>\u8BBE\u7F6E\u6216\u5173\u95ED iptables</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>iptables <span class="token parameter variable">-P</span> FORWARD ACCEPT

<span class="token comment"># \u6216\u662F\u76F4\u63A5\u5173\u95ED iptables</span>
systemctl stop iptables
systemctl disable iptables
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u5173\u95EDswap" tabindex="-1"><a class="header-anchor" href="#\u5173\u95EDswap" aria-hidden="true">#</a> <strong>\u5173\u95EDswap</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>swapoff <span class="token parameter variable">-a</span>

<span class="token comment"># \u9632\u6B62\u5F00\u673A\u542F\u52A8\u81EA\u52A8\u6302\u8F7D swap \u5206\u533A</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/ swap / s/^\\(.*\\)$/#\\1/g&#39;</span> /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u5173\u95EDselinux\u548C\u9632\u706B\u5899" tabindex="-1"><a class="header-anchor" href="#\u5173\u95EDselinux\u548C\u9632\u706B\u5899" aria-hidden="true">#</a> <strong>\u5173\u95EDselinux\u548C\u9632\u706B\u5899</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">&#39;s#(SELINUX=).*#\\1disabled#&#39;</span> /etc/selinux/config
setenforce <span class="token number">0</span>
systemctl disable firewalld <span class="token operator">&amp;</span>systemctl stop firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u4FEE\u6539\u5185\u6838\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539\u5185\u6838\u53C2\u6570" aria-hidden="true">#</a> <strong>\u4FEE\u6539\u5185\u6838\u53C2\u6570</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/sysctl.d/k8s.conf</span>
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
vm.max_map_count=262144
EOF</span>

<span class="token comment"># \u91CD\u65B0\u52A0\u8F7D\u914D\u7F6E</span>
$ <span class="token function">sysctl</span> <span class="token parameter variable">-p</span> /etc/sysctl.d/k8s.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u7F51\u6865\u8FC7\u6EE4" tabindex="-1"><a class="header-anchor" href="#\u7F51\u6865\u8FC7\u6EE4" aria-hidden="true">#</a> <strong>\u7F51\u6865\u8FC7\u6EE4</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u52A0\u8F7D\u7F51\u6865\u8FC7\u6EE4\u6A21\u5757</span>
$ modprobe br_netfilter
<span class="token comment"># \u67E5\u770B\u7F51\u6865\u8FC7\u6EE4\u6A21\u5757\u662F\u5426\u52A0\u8F7D\u6210\u529F</span>
$ lsmod <span class="token operator">|</span> <span class="token function">grep</span> br_netfilter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u8BBE\u7F6E\u65F6\u95F4\u540C\u6B65" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u65F6\u95F4\u540C\u6B65" aria-hidden="true">#</a> <strong>\u8BBE\u7F6E\u65F6\u95F4\u540C\u6B65</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ systemctl restart chronyd	
$ systemctl <span class="token builtin class-name">enable</span> chronyd
$ <span class="token function">date</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-\u5B89\u88C5\u57FA\u7840\u8F6F\u4EF6\u5305" tabindex="-1"><a class="header-anchor" href="#_3-\u5B89\u88C5\u57FA\u7840\u8F6F\u4EF6\u5305" aria-hidden="true">#</a> 3. \u5B89\u88C5\u57FA\u7840\u8F6F\u4EF6\u5305</h2><div class="custom-container warning"><p class="custom-container-title">\u6240\u6709\u8282\u70B9\u6267\u884C\u5982\u4E0B\u64CD\u4F5C</p></div><h5 id="\u5B89\u88C5\u5E38\u7528\u8F6F\u4EF6\u5305" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5\u5E38\u7528\u8F6F\u4EF6\u5305" aria-hidden="true">#</a> <strong>\u5B89\u88C5\u5E38\u7528\u8F6F\u4EF6\u5305</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils <span class="token function">wget</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u914D\u7F6E docker \u548C k8s \u6E90</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-o</span> /etc/yum.repos.d/docker-ce.repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

<span class="token comment"># \u66F4\u65B0\u6E90</span>
$ yum clean all <span class="token operator">&amp;&amp;</span> yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-\u5B89\u88C5docker" tabindex="-1"><a class="header-anchor" href="#_3-1-\u5B89\u88C5docker" aria-hidden="true">#</a> 3.1 \u5B89\u88C5docker</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u6240\u6709\u7684\u53EF\u7528\u7248\u672C</span>
yum list docker-ce <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>

<span class="token comment"># \u5B89\u88C5\u6E90\u91CC\u914D\u5957\u7248\u672C</span>
<span class="token comment"># yum install -y docker-ce-18.09.7 docker-ce-cli-18.09.7 containerd.io </span>
<span class="token comment"># \u5B89\u88C5\u6307\u5B9A\u7248\u672C</span>
yum <span class="token function">install</span> docker-ce-c1i-19.03.13-3.el7 docker-ce-19.03.13-3.el7

<span class="token comment">## \u914D\u7F6Edocker\u52A0\u901F</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">vim</span> /etc/docker/daemon.json
<span class="token punctuation">{</span>
  <span class="token string">&quot;registry-mirrors&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;https://ubhu1j5h.mirror.aliyuncs.com&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token comment">##\u542F\u52A8docker</span>
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span> <span class="token operator">&amp;&amp;</span> systemctl start <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-\u5B89\u88C5kubeadm-kubelet-\u548C-kubectl" tabindex="-1"><a class="header-anchor" href="#_3-2-\u5B89\u88C5kubeadm-kubelet-\u548C-kubectl" aria-hidden="true">#</a> 3.2 \u5B89\u88C5kubeadm\uFF0Ckubelet \u548C kubectl</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.16.2 kubeadm-1.16.2 kubectl-1.16.2 <span class="token parameter variable">--disableexcludes</span><span class="token operator">=</span>kubernetes

<span class="token comment"># \u67E5\u770B kubeadm \u7248\u672C</span>
kubeadm version

<span class="token comment"># \u8BBE\u7F6E\u5F00\u673A\u542F\u52A8</span>
systemctl <span class="token builtin class-name">enable</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-\u521D\u59CB\u5316\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#_4-\u521D\u59CB\u5316\u96C6\u7FA4" aria-hidden="true">#</a> 4. \u521D\u59CB\u5316\u96C6\u7FA4</h2><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p><strong>\u53EA\u5728 Master \u8282\u70B9</strong> \u6267\u884C\uFF08<em>k8s-master-171</em>\uFF09</p></div><p>\u56E0\u6B64\u9700\u8981\u5148\u6539\u5199\u5BF9\u5E94\u7684 <strong>kubeadm.yaml</strong> \u914D\u7F6E\u6587\u4EF6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> ./k8s_install
<span class="token builtin class-name">cd</span> k8s_install

<span class="token comment"># \u751F\u6210\u914D\u7F6E\u6587\u4EF6</span>
$ kubeadm config print init-defaults <span class="token operator">&gt;</span> kubeadm.yaml

<span class="token comment"># \u4FEE\u6539\u751F\u6210\u7684\u914D\u7F6E\u6587\u4EF6\u6587\u4EF6 :set nu</span>
<span class="token function">vim</span> kubeadm.yaml
<span class="token punctuation">..</span>.
<span class="token comment"># -+12   advertiseAddress: 192.168.3.171	# \u5355master\u76F4\u63A5\u66FF\u6362\u4E3Amaster ip\u5730\u5740\uFF0C\u8C8C\u4F3C\u9AD8\u53EF\u7528\u662Fvip</span>
<span class="token punctuation">..</span>.
<span class="token comment"># -+32 imageRepository: registry.aliyuncs.com/google_containers	# \u4FEE\u6539\u4E3A\u963F\u91CC\u6E90</span>
<span class="token punctuation">..</span>.
<span class="token comment"># -+34 kubernetesVersion: v1.16.2	# \u7248\u672C\u53F7\u9ED8\u8BA4\u751F\u6210\u9519\u4E86\uFF0C\u6539\u6B63</span>
<span class="token comment">#   35 networking:</span>
<span class="token comment">#   36   dnsDomain: cluster.local</span>
<span class="token comment">#  +37   podSubnet: 10.244.0.0/16	# pod\u7F51\u6BB5\uFF0Cflannel\u63D2\u4EF6\u9700\u8981\u8FD9\u4E2A\u7F51\u6BB5</span>
<span class="token comment">#   38   serviceSubnet: 10.96.0.0/12</span>
<span class="token comment">#   39 scheduler: {}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u4E0B\u8F7D\u7EC4\u4EF6\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u4E0B\u8F7D\u7EC4\u4EF6\u955C\u50CF" aria-hidden="true">#</a> <strong>\u4E0B\u8F7D\u7EC4\u4EF6\u955C\u50CF</strong></h5><p><strong>k8s</strong> \u6240\u8FD0\u884C\u7684 <strong>API</strong> \u7EC4\u4EF6\uFF0C\u90FD\u662F\u9760\u5BB9\u5668\u8FD0\u884C\uFF0C\u5148\u5217\u51FA\u914D\u7F6E\u4E2D\u6240\u9700\u7684\u5BB9\u5668\uFF0C\u518D <strong>pull</strong> \u4E0B\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master-171 k8s-install<span class="token punctuation">]</span>$ kubeadm config images list <span class="token parameter variable">--config</span> kubeadm.yaml 
registry.aliyuncs.com/google_containers/kube-apiserver:v1.16.2
registry.aliyuncs.com/google_containers/kube-controller-manager:v1.16.2
registry.aliyuncs.com/google_containers/kube-scheduler:v1.16.2
registry.aliyuncs.com/google_containers/kube-proxy:v1.16.2
registry.aliyuncs.com/google_containers/pause:3.1
registry.aliyuncs.com/google_containers/etcd:3.3.15-0
registry.aliyuncs.com/google_containers/coredns:1.6.2

<span class="token comment"># pull \u7EC4\u4EF6\u955C\u50CF\uFF0C\u63D0\u524D\u4E0B\u8F7D\u65B9\u4FBF</span>
kubeadm config images pull <span class="token parameter variable">--config</span> kubeadm.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u82E5\u51FA\u73B0\u955C\u50CF\u65E0\u6CD5\u4E0B\u8F7D\u60C5\u51B5\uFF0C\u5982\u4E0B\u65B9\u5F0F\u66FF\u4EE3</p><ol><li><p>\u8FD8\u539F <strong>kubeadm.yaml</strong> \u7684 <code>imageRepository</code></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">imageRepository</span><span class="token punctuation">:</span> k8s.gcr.io
<span class="token punctuation">...</span>

<span class="token comment"># \u67E5\u770B\u955C\u50CF\u6E90</span>
kubeadm config images list <span class="token punctuation">-</span><span class="token punctuation">-</span>config kubeadm.yaml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u4F7F\u7528 <strong>docker hub</strong> \u4E2D\u7684\u955C\u50CF\u6E90\u6765\u4E0B\u8F7D\uFF0C\u6CE8\u610F\u4E0A\u8FF0\u5217\u8868\u6DFB\u52A0\u5904\u7406\u5668\u67B6\u6784\uFF0C\u901A\u5E38\u4F7F\u7528\u7684\u865A\u62DF\u673A\u90FD\u662F <strong>amd64</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">docker</span> pull mirrorgooglecontainers/kube-scheduler-amd64:v1.16.0
$ <span class="token function">docker</span> pull mirrorgooglecontainers/etcd-amd64:3.3.15-0
<span class="token punctuation">..</span>.
$ <span class="token function">docker</span> tag mirrorgooglecontainers/etcd-amd64:3.3.15-0 k8s.gcr.io/etcd3.3.15-0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol></div><h5 id="\u521D\u59CB\u5316master" tabindex="-1"><a class="header-anchor" href="#\u521D\u59CB\u5316master" aria-hidden="true">#</a> <strong>\u521D\u59CB\u5316Master</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubeadm init <span class="token parameter variable">--config</span> kubeadm.yaml

<span class="token comment">#... \u76F4\u5230\u51FA\u73B0\u5982\u4E0B\u663E\u793A\uFF0C\u8868\u793A\u5B89\u88C5\u6210\u529F</span>
Your Kubernetes control-plane has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config

<span class="token comment">#...</span>
<span class="token comment"># \u6267\u884C\u5982\u4E0A\u547D\u4EE4\uFF0C\u5373\u53EF\u521D\u59CB\u5316\u6210\u529F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u6B64\u65F6\u901A\u8FC7 <code>kubectl get no</code> \u547D\u4EE4\u67E5\u770B\u8FD8\u662F <strong>notReady</strong> \u72B6\u6001\uFF0C\u8FD9\u662F\u56E0\u4E3A\u8FD8\u6CA1\u6709\u521D\u59CB\u5316\u7F51\u7EDC\u63D2\u4EF6\uFF0C\u82E5\u521D\u59CB\u5316\u8FC7\u7A0B\u4E2D\u51FA\u9519\uFF0C\u6839\u636E\u9519\u8BEF\u4FE1\u606F\u8C03\u6574\u540E\uFF0C\u6267\u884C <code>kubeadm reset</code> \u540E\u518D\u6B21\u521D\u59CB\u5316\u5373\u53EF</p></div><h5 id="slave-\u52A0\u5165\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#slave-\u52A0\u5165\u96C6\u7FA4" aria-hidden="true">#</a> <strong>Slave \u52A0\u5165\u96C6\u7FA4</strong></h5><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u5728 <strong>Slave</strong> \u8282\u70B9\u4E0A\u6267\u884C\uFF0C\u52A0\u5165 <strong>k8s-master-171</strong> \u96C6\u7FA4\uFF08<em>\u8FD9\u91CC\u662F\u590D\u5236\u6267\u884C\u521D\u59CB\u5316 master \u540E\u63D0\u793A\u7684\u547D\u4EE4</em>\uFF09</p></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.3.171:6443 <span class="token parameter variable">--token</span> abcdef.0123456789abcdef <span class="token punctuation">\\</span>
    --discovery-token-ca-cert-hash sha256:55bd1bedd08121c1c4f92e93673e7e8e8dd4460927fc93bd059606d768a7c17a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u67E5\u770B\u96C6\u7FA4\u72B6\u6001</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master-171 k8s-install<span class="token punctuation">]</span>$ kubectl get nodes
NAME             STATUS     ROLES    AGE   VERSION
k8s-master-171   NotReady   master   24m   v1.16.2
k8s-slave-172    NotReady   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   18s   v1.16.2
k8s-slave-173    NotReady   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>   16s   v1.16.2

kubectl <span class="token parameter variable">-n</span> kube-system get po
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-\u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#_5-\u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6" aria-hidden="true">#</a> 5. \u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6</h2><div class="custom-container warning"><p class="custom-container-title">\u53EA\u5728 Master \u8282\u70B9\u6267\u884C</p></div><h3 id="_5-1-\u7F51\u7EDC\u63D2\u4EF6-flannel" tabindex="-1"><a class="header-anchor" href="#_5-1-\u7F51\u7EDC\u63D2\u4EF6-flannel" aria-hidden="true">#</a> 5.1 \u7F51\u7EDC\u63D2\u4EF6 flannel</h3><p><strong>flannel</strong> \u8FD9\u4E2A\u63D2\u4EF6\u6BD4\u8F83\u8001\uFF0C\u4F46\u662F\u901A\u7528\u6027\u51D1\u5408\uFF0C\u9002\u914D\u8FD8\u884C\uFF0C\u5148\u4E0B\u8F7D <strong>yaml</strong> \u6587\u4EF6\uFF08<em>\u4E00\u6B21\u4E0B\u8F7D\u4E0D\u6210\u529F\uFF0C\u591A\u8BD5\u51E0\u6B21</em>\uFF09</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">wget</span> https://raw.githubusercontent.com/coreos/flannel/2140ac876ef134e0ed5af15c65e414cf26827915/Documentation/kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4FEE\u6539\u914D\u7F6E\uFF0C\u6307\u5B9A\u7F51\u5361\u540D\uFF08<em>\u6CE8\u610F\u7528\u7A7A\u683C\u66FF\u6362\uFF0C\u4E0D\u8981\u7528 tab</em>\uFF09</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vim</span> kube-flannel.yml
<span class="token punctuation">..</span>.

<span class="token comment">#   189         args:</span>
<span class="token comment">#   190         - --ip-masq</span>
<span class="token comment">#   191         - --kube-subnet-mgr</span>
<span class="token comment">#  +192         - --iface=eth0	# \u82E5\u673A\u5668\u5B58\u5728\u591A\u7F51\u5361\u7684\u8BDD\uFF0C\u6307\u5B9A\u5185\u7F51\u7F51\u5361\u540D\uFF0C\u9ED8\u8BA4\u4E0D\u6307\u5B9A\u4F1A\u627E\u7B2C\u4E00\u5757\u7F51\u5361</span>
<span class="token comment">#   193         resources:</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u82E5\u51FA\u73B0 <code>quay.io/coreos/flannel:v0.11.0-amd64</code> \u5730\u5740\u7684\u955C\u50CF\u62C9\u4E0D\u4E0B\u6765\uFF0C\u5219\u4FEE\u6539\u4E0B\u8F7D\u5730\u5740</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">170       initContainers</span><span class="token punctuation">:</span>
<span class="token key atrule">171       - name</span><span class="token punctuation">:</span> install<span class="token punctuation">-</span>cni
<span class="token key atrule">172         image</span><span class="token punctuation">:</span> quay.io/coreos/flannel<span class="token punctuation">:</span>v0.11.0<span class="token punctuation">-</span>amd64 <span class="token comment"># \u8FD9\u91CC</span>
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
<span class="token key atrule">186         image</span><span class="token punctuation">:</span> quay.io/coreos/flannel<span class="token punctuation">:</span>v0.11.0<span class="token punctuation">-</span>amd64 <span class="token comment"># \u8FD9\u91CC</span>
<span class="token key atrule">187         command</span><span class="token punctuation">:</span>
188         <span class="token punctuation">-</span> /opt/bin/flanneld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><h5 id="\u6267\u884C\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u6267\u884C\u5B89\u88C5" aria-hidden="true">#</a> <strong>\u6267\u884C\u5B89\u88C5</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u53EF\u4EE5\u5148\u62C9\u53D6\u56FD\u5185\u955C\u50CF</span>
<span class="token function">docker</span> pull quay.io/coreos/flannel:v0.11.0-amd64

<span class="token comment"># \u6267\u884C\u5B89\u88C5\u547D\u4EE4</span>
kubectl create <span class="token parameter variable">-f</span> kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u9A8C\u8BC1\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#\u9A8C\u8BC1\u96C6\u7FA4" aria-hidden="true">#</a> <strong>\u9A8C\u8BC1\u96C6\u7FA4</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl get nodes <span class="token comment"># \u89C2\u5BDF\u96C6\u7FA4\u8282\u70B9\u662F\u5426\u5168\u90E8Ready</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,56),w={class:"custom-container danger"},A=e('<p class="custom-container-title">\u5F02\u5E38</p><p>\u6B64\u65F6\u53D1\u73B0\u4E24\u4E2A <strong>coredns</strong> \u670D\u52A1\u6CA1\u6709 <strong>Running</strong> \uFF0C\u8BE5\u95EE\u9898\u5BFC\u81F4\u6D41\u7A0B\u963B\u585E\uFF01</p><p>\u8BE5\u95EE\u9898\u662F\u7531\u4E8E <strong>flannel</strong> \u4F9D\u8D56\u4E8E <strong>cni</strong> \u63D2\u4EF6\uFF0C\u800C\u8FD9\u8BE5\u6B7B\u7684\u63D2\u4EF6\u65B0\u7248\u79FB\u9664\u4E86 <strong>flannel</strong> \uFF0C\u5BFC\u81F4\u7F51\u7EDC\u542F\u52A8\u5931\u8D25</p>',3),O=n("li",null,[n("p",null,[s("\u6362\u7528\u63D2\u4EF6 "),n("strong",null,"calico"),s(" , \u89C1\u4E0B\u6587")])],-1),V={href:"https://github.com/containernetworking/plugins/releases/tag/v0.9.0",target:"_blank",rel:"noopener noreferrer"},T=n("em",null,[s("\u6B64\u5904\u662F "),n("strong",null,"0.9.0"),s(" \u7248\u672C\uFF0C\u5B98\u65B9\u6700\u540E\u4E2A\u672A\u79FB\u9664 "),n("strong",null,"flannel"),s(" \u7248")],-1),Z={href:"https://github.com/containernetworking/plugins/releases/download/v0.9.0/cni-plugins-linux-amd64-v0.9.0.tgz",target:"_blank",rel:"noopener noreferrer"},M=e(`<p>\u6267\u884C\u89E3\u538B\uFF0C\u5373\u53EF\u770B\u89C1 <strong>flannel</strong> \uFF0C\u7136\u540E\u5206\u53D1\u5230\u6240\u6709\u8282\u70B9\uFF0C\u7F51\u7EDC\u5373\u53EF\u6062\u590D</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xvf</span> cni-plugins-linux-amd64-v0.9.1.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),U=e(`<h5 id="\u6E05\u7406\u73AF\u5883" tabindex="-1"><a class="header-anchor" href="#\u6E05\u7406\u73AF\u5883" aria-hidden="true">#</a> <strong>\u6E05\u7406\u73AF\u5883</strong></h5><p>\u5982\u679C\u96C6\u7FA4\u5B89\u88C5\u8FC7\u7A0B\u4E2D\u9047\u5230\u4E86\u5176\u4ED6\u95EE\u9898\uFF0C\u4F7F\u7528\u5982\u4E0B\u547D\u4EE4\u91CD\u7F6E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubeadm reset
kubectl delete <span class="token parameter variable">-f</span> kube-flannel.yml
kubectl apply <span class="token parameter variable">-f</span> kube-flannel.yml
 
<span class="token function">ifconfig</span> cni0 down <span class="token operator">&amp;&amp;</span> <span class="token function">ip</span> <span class="token function">link</span> delete coni0
<span class="token function">ifconfig</span> flannel.1 down <span class="token operator">&amp;&amp;</span> <span class="token function">ip</span> <span class="token function">link</span> delete flannel.1
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/cni/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-\u7F51\u7EDC\u63D2\u4EF6-calico" tabindex="-1"><a class="header-anchor" href="#_5-2-\u7F51\u7EDC\u63D2\u4EF6-calico" aria-hidden="true">#</a> 5.2 \u7F51\u7EDC\u63D2\u4EF6 calico</h3>`,4),W={href:"https://docs.projectcalico.org/v3.9/getting-started/kubernetes/",target:"_blank",rel:"noopener noreferrer"},j=e(`<p>\u6267\u884C\u5982\u4E0B\u547D\u4EE4\u5B89\u88C5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-f</span> calico-3.9.2.yaml

<span class="token function">wget</span> https://kuboard.cn/install-script/calico/calico-3.9.2.yaml

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#192\\.168\\.0\\.0/16#<span class="token variable">\${POD_SUBNET}</span>#&quot;</span> calico-3.9.2.yaml

kubectl apply <span class="token parameter variable">-f</span> calico-3.9.2.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-\u521B\u5EFA\u6D4B\u8BD5-nginx-\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#_5-3-\u521B\u5EFA\u6D4B\u8BD5-nginx-\u670D\u52A1" aria-hidden="true">#</a> 5.3 \u521B\u5EFA\u6D4B\u8BD5 Nginx \u670D\u52A1</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl run test-nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B <strong>pod</strong> \u662F\u5426\u521B\u5EFA\u6210\u529F\uFF0C\u5E76\u8BBF\u95EE <strong>pod ip</strong> \u6D4B\u8BD5\u662F\u5426\u53EF\u7528</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl get po <span class="token parameter variable">-o</span> wide <span class="token parameter variable">-w</span> <span class="token comment"># \u76F4\u5230 STATUS \u72B6\u6001\u7531 ContainerCreating \u53D8\u4E3A Running \u5373\u6210\u529F</span>

NAME                          READY   STATUS    RESTARTS   AGE    IP           NODE            NOMINATED NODE   READINESS GATES
test-nginx-5bd8859b98-thscs   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          3m3s   <span class="token number">10.244</span>.1.2   k8s-slave-172   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u663E\u793A\u4E86 <strong>IP</strong> \u548C\u5BB9\u5668\u6240\u5728\u7684\u8282\u70B9\uFF0C\u5207\u6362\u5230\u5BF9\u5E94\u673A\u5668\u6267\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token number">10.244</span>.1.2 <span class="token comment"># \u5373\u53EF\u770B\u5230 nginx welcome \u6587\u6863</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-4-\u8BBE\u7F6Emaster\u8282\u70B9\u662F\u5426\u53EF\u8C03\u5EA6-\u53EF\u9009" tabindex="-1"><a class="header-anchor" href="#_5-4-\u8BBE\u7F6Emaster\u8282\u70B9\u662F\u5426\u53EF\u8C03\u5EA6-\u53EF\u9009" aria-hidden="true">#</a> 5.4 \u8BBE\u7F6Emaster\u8282\u70B9\u662F\u5426\u53EF\u8C03\u5EA6\uFF08\u53EF\u9009\uFF09</h3><div class="custom-container warning"><p class="custom-container-title">\u53EA\u5728 Master \u8282\u70B9\u6267\u884C</p></div><p>\u9ED8\u8BA4\u90E8\u7F72\u6210\u529F\u540E\uFF0C<strong>Master</strong> \u8282\u70B9\u65E0\u6CD5\u8C03\u5EA6\u4E1A\u52A1 <strong>pod</strong>\uFF0C\u5982\u9700\u8BBE\u7F6E\u5176\u53C2\u4E0E <strong>pod</strong> \u8C03\u5EA6\uFF0C\u9700\u6267\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl taint <span class="token function">node</span> k8s-master node-role.kubernetes.io/master:Noschedule-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_6-\u5B89\u88C5dashboard" tabindex="-1"><a class="header-anchor" href="#_6-\u5B89\u88C5dashboard" aria-hidden="true">#</a> 6. \u5B89\u88C5Dashboard</h2><p>\u63A8\u8350\u4F7F\u7528\u4E0B\u9762\u8FD9\u79CD\u65B9\u5F0F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">wget</span> https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc5/aio/deploy/recommended.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6DFB\u52A0 <strong>service</strong> \u4E3A <code>NodePort</code> \u7C7B\u578B\uFF0C\u53D8\u4E3A <code>NodePort</code> \u7C7B\u578B\u7684\u670D\u52A1\uFF0C\u6587\u4EF6\u7684 <strong>45</strong> \u884C\u4E0A\u4E0B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vim</span> recommended.yaml
<span class="token punctuation">..</span>.
<span class="token comment">#  +45   type: NodePort </span>

<span class="token punctuation">..</span>.
spec:
  ports:
    - port: <span class="token number">443</span>
      targetPort: <span class="token number">8443</span>
  selector:
    k8s-app: kubernetes-dashboard
  type: NodePort <span class="token comment"># \u6CE8\u610F\u7A7A\u683C\u662F\u4E24\u4E2A</span>
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u90E8\u7F72\u5E76\u67E5\u770B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> recommended.yaml

<span class="token comment"># \u67E5\u770B dashboard \u670D\u52A1</span>
kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get svc
NAME                        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>         AGE
dashboard-metrics-scraper   ClusterIP   <span class="token number">10.96</span>.54.184   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">8000</span>/TCP        35s
kubernetes-dashboard        NodePort    <span class="token number">10.97</span>.63.15    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">443</span>:30100/TCP   35s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),C={href:"https://192.168.3.171:30100/",target:"_blank",rel:"noopener noreferrer"},Y=n("strong",null,"kubernetes-dashboard",-1),D=e(`<h4 id="\u4F7F\u7528-serviceaccent-\u8BBF\u95EE" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-serviceaccent-\u8BBF\u95EE" aria-hidden="true">#</a> \u4F7F\u7528 ServiceAccent \u8BBF\u95EE</h4><p>\u521B\u5EFA <code>admin</code> \u767B\u5F55\u8D26\u6237</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code>$ vim admin.conf

<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">rbac.authorization.kubernetes.io/autoupdate</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u521B\u5EFA\u767B\u5F55\u7528\u6237\u4FE1\u606F\uFF0C\u914D\u7F6E\u4EE4\u724C</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> admin.conf	<span class="token comment"># kubectl apply -f admin.yaml</span>
<span class="token comment"># serviceaccount/admin created</span>
<span class="token comment">#clusterrolebinding.rbac.authorization.k8s.io/admin created</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u67E5\u770B-kubernetes-dashboard-\u4E0B\u9762\u7684-secret" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B-kubernetes-dashboard-\u4E0B\u9762\u7684-secret" aria-hidden="true">#</a> <strong>\u67E5\u770B kubernetes-dashboard \u4E0B\u9762\u7684 secret</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get secret<span class="token operator">|</span><span class="token function">grep</span> admin-token
<span class="token comment"># admin-token-764m5                  kubernetes.io/service-account-token   3      2m13s</span>

<span class="token comment"># \u6216\u67E5\u770B\u5168\u90E8\u7684</span>
$ kubectl get secret <span class="token parameter variable">-n</span> kubernetes-dashboard
NAME                               TYPE                                  DATA   AGE
admin-token-764m5                  kubernetes.io/service-account-token   <span class="token number">3</span>      3m27s
default-token-2726l                kubernetes.io/service-account-token   <span class="token number">3</span>      7m57s
kubernetes-dashboard-certs         Opaque                                <span class="token number">0</span>      7m57s
kubernetes-dashboard-csrf          Opaque                                <span class="token number">1</span>      7m57s
kubernetes-dashboard-key-holder    Opaque                                <span class="token number">2</span>      7m57s
kubernetes-dashboard-token-9fs8x   kubernetes.io/service-account-token   <span class="token number">3</span>      7m58s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u67E5\u770B\u767B\u5F55-token" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u767B\u5F55-token" aria-hidden="true">#</a> <strong>\u67E5\u770B\u767B\u5F55 token</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4F7F\u7528\u8BE5\u547D\u4EE4\u62FF\u5230token, \u7136\u540E\u7C98\u8D34\u5230</span>
kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get secret admin-token-764m5 <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token punctuation">{</span>.data.token<span class="token punctuation">}</span><span class="token operator">|</span>base64 <span class="token parameter variable">-d</span>

eyJhbGciOiJSUzI1NiIsImtpZCI6Ilo3QTR5ckxaOXZrYUc4emZKTWpFQkNBMEVkaktPeGdTR25rbW41UjluLVUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi10b2tlbi03NjRtNSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJhZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImJlZjZjMWM0LWU0ZDktNGE4OC1hMzdkLTBjMzVlZGQ2ZmZhZSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbiJ9.p0_tioIGZShZlsfafLWO2irYSAo6A3FGJSvfk9gbIjj8YP_Wif4lPUv8kDkl_3YgH7k2q15Bw_mcQGShOLMc-KlRp5FizlxT4aJc74lVPntzinAufN4QHX_5a5wj5CIvYiTH-U71ZECY_eDzn0SBlEVctCm3cVpiwxhUMrPKcSzO9hGYm9xI1ZCgo4fkpgsvNyzPD6QLPQjqelAmMpTcujEkIm5DzdzZAgOgU58wx6bUowhBqKt7hrMkDk5nXPJ-o7W8M0_3KxKRJO4fEMAAeanajfJ4RiBrVha9Ln23F_Q5zzroNcnV5vsdUMS3px50u70NaNCVOy32n4aeAFX4Xg

<span class="token comment"># \u6216\u5982\u4E0B</span>
$ kubectl describe secret admin-token-764m5 <span class="token parameter variable">-n</span> kubernetes-dashboard
Name:         admin-token-764m5
Namespace:    kubernetes-dashboard
Labels:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:  kubernetes.io/service-account.name: admin
              kubernetes.io/service-account.uid: bef6c1c4-e4d9-4a88-a37d-0c35edd6ffae

Type:  kubernetes.io/service-account-token

Data
<span class="token operator">==</span><span class="token operator">==</span>
ca.crt:     <span class="token number">1025</span> bytes
namespace:  <span class="token number">20</span> bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6Ilo3QTR5ckxaOXZrYUc4emZKTWpFQkNBMEVkaktPeGdTR25rbW41UjluLVUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi10b2tlbi03NjRtNSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJhZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImJlZjZjMWM0LWU0ZDktNGE4OC1hMzdkLTBjMzVlZGQ2ZmZhZSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbiJ9.p0_tioIGZShZlsfafLWO2irYSAo6A3FGJSvfk9gbIjj8YP_Wif4lPUv8kDkl_3YgH7k2q15Bw_mcQGShOLMc-KlRp5FizlxT4aJc74lVPntzinAufN4QHX_5a5wj5CIvYiTH-U71ZECY_eDzn0SBlEVctCm3cVpiwxhUMrPKcSzO9hGYm9xI1ZCgo4fkpgsvNyzPD6QLPQjqelAmMpTcujEkIm5DzdzZAgOgU58wx6bUowhBqKt7hrMkDk5nXPJ-o7W8M0_3KxKRJO4fEMAAeanajfJ4RiBrVha9Ln23F_Q5zzroNcnV5vsdUMS3px50u70NaNCVOy32n4aeAFX4Xg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-\u8BB0\u5F55k8s-v1-22-3-\u7248\u672C\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_7-\u8BB0\u5F55k8s-v1-22-3-\u7248\u672C\u5B89\u88C5" aria-hidden="true">#</a> 7. \u8BB0\u5F55k8s v1.22.3 \u7248\u672C\u5B89\u88C5</h2>`,10),$={href:"https://kuboard.cn/install/history-k8s/install-k8s-1.22.x.html",target:"_blank",rel:"noopener noreferrer"},z=e(`<p>\u521D\u59CB\u5316\u6B65\u9AA4\u53C2\u8003 <mark>1.\u51C6\u5907\u5DE5\u4F5C</mark> \u6CA1\u6709\u533A\u522B\uFF0C<strong>1.22</strong> \u7248\u672C\u7684 <strong>k8s</strong> \u5DF2\u7ECF\u6539\u4E3A\u652F\u6301 <strong>containerd</strong> \u5BB9\u5668\u8FD0\u884C\u65F6\u4E86\uFF0C\u6545\u7A0D\u6709\u533A\u522B\uFF0C\u4EE5\u4E0B\u5217\u51FA\u6CE8\u610F\u7684\u70B9</p><details class="custom-container details"><summary>\u8BE6\u60C5</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u963F\u91CC\u4E91 docker hub \u955C\u50CF</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">REGISTRY_MIRROR</span><span class="token operator">=</span>https://registry.aliyuncs.com
<span class="token comment"># \u5728 master \u8282\u70B9\u548C worker \u8282\u70B9\u90FD\u8981\u6267\u884C</span>

<span class="token comment"># \u5B89\u88C5 containerd</span>
<span class="token comment"># \u53C2\u8003\u6587\u6863\u5982\u4E0B</span>
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

<span class="token comment"># \u5378\u8F7D\u65E7\u7248\u672C</span>
yum remove <span class="token parameter variable">-y</span> containerd.io

<span class="token comment"># \u8BBE\u7F6E yum repository</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

<span class="token comment"># \u5B89\u88C5 containerd</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> containerd.io-1.4.3

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/containerd
containerd config default <span class="token operator">&gt;</span> /etc/containerd/config.toml

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#k8s.gcr.io#registry.aliyuncs.com/k8sxio#g&quot;</span>  /etc/containerd/config.toml
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/containerd.runtimes.runc.options/a\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ SystemdCgroup = true&#39;</span> /etc/containerd/config.toml
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#https://registry-1.docker.io#<span class="token variable">\${REGISTRY_MIRROR}</span>#g&quot;</span>  /etc/containerd/config.toml


systemctl daemon-reload
systemctl <span class="token builtin class-name">enable</span> containerd
systemctl restart containerd

<span class="token comment"># \u5B89\u88C5 nfs-utils</span>
<span class="token comment"># \u5FC5\u987B\u5148\u5B89\u88C5 nfs-utils \u624D\u80FD\u6302\u8F7D nfs \u7F51\u7EDC\u5B58\u50A8</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span>

<span class="token comment"># \u5173\u95ED \u9632\u706B\u5899</span>
systemctl stop firewalld
systemctl disable firewalld

<span class="token comment"># \u5173\u95ED SeLinux</span>
setenforce <span class="token number">0</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/SELINUX=enforcing/SELINUX=disabled/g&quot;</span> /etc/selinux/config

<span class="token comment"># \u5173\u95ED swap</span>
swapoff <span class="token parameter variable">-a</span>
<span class="token function">yes</span> <span class="token operator">|</span> <span class="token function">cp</span> /etc/fstab /etc/fstab_bak
<span class="token function">cat</span> /etc/fstab_bak <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> swap <span class="token operator">&gt;</span> /etc/fstab

<span class="token comment"># \u914D\u7F6EK8S\u7684yum\u6E90</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

<span class="token comment"># \u5378\u8F7D\u65E7\u7248\u672C</span>
yum remove <span class="token parameter variable">-y</span> kubelet kubeadm kubectl

<span class="token comment"># \u5B89\u88C5kubelet\u3001kubeadm\u3001kubectl</span>
<span class="token comment"># \u5C06 \${1} \u66FF\u6362\u4E3A kubernetes \u7248\u672C\u53F7\uFF0C\u4F8B\u5982 1.20.1</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.22.3 kubeadm-1.22.3 kubectl-1.22.3

crictl config runtime-endpoint /run/containerd/containerd.sock

<span class="token comment"># \u91CD\u542F docker\uFF0C\u5E76\u542F\u52A8 kubelet</span>
systemctl daemon-reload
systemctl <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> systemctl start kubelet

containerd <span class="token parameter variable">--version</span>
kubelet <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="_7-1-\u521D\u59CB\u5316-master-\u8282\u70B9" tabindex="-1"><a class="header-anchor" href="#_7-1-\u521D\u59CB\u5316-master-\u8282\u70B9" aria-hidden="true">#</a> 7.1 \u521D\u59CB\u5316 master \u8282\u70B9</h3><div class="custom-container danger"><p class="custom-container-title">\u91CD\u8981\uFF01</p><p>\u9700\u8981\u5148\u914D\u7F6E <strong>containerd</strong> \u7684\u4EE3\u7406</p><h4 id="\u6CE8\u610F-\u6240\u6709\u8282\u70B9\u5747\u9700\u8981\u914D\u7F6E-\u5426\u5219-kube-proxy-\u4F1A-create\u5931\u8D25" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u610F-\u6240\u6709\u8282\u70B9\u5747\u9700\u8981\u914D\u7F6E-\u5426\u5219-kube-proxy-\u4F1A-create\u5931\u8D25" aria-hidden="true">#</a> <strong>\u6CE8\u610F\uFF01\uFF01\u6240\u6709\u8282\u70B9\u5747\u9700\u8981\u914D\u7F6E\uFF0C\u5426\u5219 kube-proxy \u4F1A Create\u5931\u8D25</strong></h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">vim</span> /usr/lib/systemd/system/containerd.service 

<span class="token comment"># \u6DFB\u52A0</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">&quot;HTTP_PROXY=http://172.16.70.104:808/&quot;</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">&quot;HTTPS_PROXY=http://172.16.70.104:808/&quot;</span>
<span class="token assign-left variable">Environment</span><span class="token operator">=</span><span class="token string">&quot;NO_PROXY=10.96.0.0/16,127.0.0.1,172.16.0.0/16,localhost&quot;</span>

<span class="token comment"># NO_PROXY\u7684\u8BBE\u7F6E\u4E5F\u662F\u5FC5\u987B\u7684\u300210.96.0.0\u4E0E192.168.0.0\u5206\u522B\u662FclusterIP\u4E0EPod\u7684\u5185\u7F51\u7F51\u6BB5\uFF0C\u5982\u679C\u4E0D\u8BBE\u7F6ENO_PROXY Pod\u4E0EPod\u4E4B\u95F4\u7684\u901A\u4FE1\u4F1A\u51FA\u73B0\u95EE\u9898\u3002</span>


<span class="token comment"># \u91CD\u542F</span>
systemctl daemon-reload
systemctl restart containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u518D\u53BB\u6267\u884C\u4E0B\u6587\u7684\u62C9\u955C\u50CF\u4E1A\u52A1</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubeadm config images pull <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><h5 id="\u5148\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF" tabindex="-1"><a class="header-anchor" href="#\u5148\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF" aria-hidden="true">#</a> <strong>\u5148\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u53EA\u5728 master \u8282\u70B9\u6267\u884C</span>
<span class="token comment"># \u66FF\u6362 x.x.x.x \u4E3A master \u8282\u70B9\u5B9E\u9645 IP\uFF08\u8BF7\u4F7F\u7528\u5185\u7F51 IP\uFF09</span>
<span class="token comment"># export \u547D\u4EE4\u53EA\u5728\u5F53\u524D shell \u4F1A\u8BDD\u4E2D\u6709\u6548\uFF0C\u5F00\u542F\u65B0\u7684 shell \u7A97\u53E3\u540E\uFF0C\u5982\u679C\u8981\u7EE7\u7EED\u5B89\u88C5\u8FC7\u7A0B\uFF0C\u8BF7\u91CD\u65B0\u6267\u884C\u6B64\u5904\u7684 export \u547D\u4EE4</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MASTER_IP</span><span class="token operator">=</span><span class="token number">172.16</span>.120.171
<span class="token comment"># \u66FF\u6362 apiserver.demo \u4E3A \u60A8\u60F3\u8981\u7684 dnsName</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">APISERVER_NAME</span><span class="token operator">=</span>apiserver.uit
<span class="token comment"># Kubernetes \u5BB9\u5668\u7EC4\u6240\u5728\u7684\u7F51\u6BB5\uFF0C\u8BE5\u7F51\u6BB5\u5B89\u88C5\u5B8C\u6210\u540E\uFF0C\u7531 kubernetes \u521B\u5EFA\uFF0C\u4E8B\u5148\u5E76\u4E0D\u5B58\u5728\u4E8E\u60A8\u7684\u7269\u7406\u7F51\u7EDC\u4E2D</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">POD_SUBNET</span><span class="token operator">=</span><span class="token number">10.100</span>.0.0/16
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${MASTER_IP}</span>    <span class="token variable">\${APISERVER_NAME}</span>&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u518D\u53BB\u901A\u8FC7-kubeadm-\u521D\u59CB\u5316" tabindex="-1"><a class="header-anchor" href="#\u518D\u53BB\u901A\u8FC7-kubeadm-\u521D\u59CB\u5316" aria-hidden="true">#</a> <strong>\u518D\u53BB\u901A\u8FC7 kubeadm \u521D\u59CB\u5316</strong></h5><details class="custom-container details"><summary>\u8BE6\u60C5</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u53EA\u5728 master \u8282\u70B9\u6267\u884C</span>

<span class="token comment"># \u811A\u672C\u51FA\u9519\u65F6\u7EC8\u6B62\u6267\u884C</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">\${<span class="token operator">#</span>POD_SUBNET}</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token variable">\${<span class="token operator">#</span>APISERVER_NAME}</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[31;1m\u8BF7\u786E\u4FDD\u60A8\u5DF2\u7ECF\u8BBE\u7F6E\u4E86\u73AF\u5883\u53D8\u91CF POD_SUBNET \u548C APISERVER_NAME <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>
  <span class="token builtin class-name">echo</span> \u5F53\u524DPOD_SUBNET<span class="token operator">=</span><span class="token variable">$POD_SUBNET</span>
  <span class="token builtin class-name">echo</span> \u5F53\u524DAPISERVER_NAME<span class="token operator">=</span><span class="token variable">$APISERVER_NAME</span>
  <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>


<span class="token comment"># \u67E5\u770B\u5B8C\u6574\u914D\u7F6E\u9009\u9879 https://godoc.org/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2</span>
<span class="token function">rm</span> <span class="token parameter variable">-f</span> ./kubeadm-config.yaml
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> ./kubeadm-config.yaml</span>
---
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: v1.22.3
imageRepository: registry.aliyuncs.com/k8sxio
controlPlaneEndpoint: &quot;apiserver.uit:6443&quot;
networking:
  serviceSubnet: &quot;10.96.0.0/16&quot;
  podSubnet: &quot;10.100.0.0/16&quot;
  dnsDomain: &quot;cluster.local&quot;
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
<span class="token comment"># \u6839\u636E\u60A8\u670D\u52A1\u5668\u7F51\u901F\u7684\u60C5\u51B5\uFF0C\u60A8\u9700\u8981\u7B49\u5019 3 - 10 \u5206\u949F</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;\u6293\u53D6\u955C\u50CF\uFF0C\u8BF7\u7A0D\u5019...&quot;</span>
kubeadm config images pull <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm-config.yaml
<span class="token comment"># !!\u6B64\u5904\u82E5\u662F\u5185\u7F51\u73AF\u5883\uFF0C\u9700\u8981\u5982\u4E0A\u6587\u90A3\u6837\u8BBE\u7F6E containerd \u4EE3\u7406\uFF0C\u5426\u5219\u4E0B\u8F7D\u62A5\u9519</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;\u521D\u59CB\u5316 Master \u8282\u70B9&quot;</span>
kubeadm init <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm-config.yaml --upload-certs

<span class="token comment"># \u914D\u7F6E kubectl</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /root/.kube/
<span class="token function">mkdir</span> /root/.kube/
<span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf /root/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><strong>\u68C0\u67E5 master \u521D\u59CB\u5316\u7ED3\u679C</strong></p><p><strong>coredns</strong> \u5C06\u5904\u4E8E\u542F\u52A8\u5931\u8D25\u7684\u72B6\u6001\uFF08<em>\u8001\u73B0\u8C61\u4E86</em>\uFF09\uFF0C\u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6\u540E\uFF0C<strong>coredns</strong> \u5C06\u6B63\u5E38\u542F\u52A8</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u53EA\u5728 master \u8282\u70B9\u6267\u884C</span>

<span class="token comment"># \u6267\u884C\u5982\u4E0B\u547D\u4EE4\uFF0C\u7B49\u5F85 3-10 \u5206\u949F\uFF0C\u76F4\u5230\u6240\u6709\u7684\u5BB9\u5668\u7EC4\u5904\u4E8E Running \u72B6\u6001</span>
<span class="token function">watch</span> kubectl get pod <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> wide

<span class="token comment"># \u67E5\u770B master \u8282\u70B9\u521D\u59CB\u5316\u7ED3\u679C</span>
kubectl get nodes <span class="token parameter variable">-o</span> wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-\u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#_7-2-\u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6" aria-hidden="true">#</a> 7.2 \u5B89\u88C5\u7F51\u7EDC\u63D2\u4EF6</h3><p>\u7F51\u7EDC\u63D2\u4EF6\u53EF\u4EE5\u9009\u62E9 <strong>calico</strong> \u6216\u8005 <strong>flannel</strong>\uFF08\u4EFB\u610F\u9009\u62E9\u5176\u4E00\u5373\u53EF\uFF09</p>`,13),L=n("blockquote",null,[n("p",null,[s("\u5982\u679C\u963F\u91CC\u4E91\u4E0A\u5B89\u88C5\uFF0C\u5EFA\u8BAE\u4F7F\u7528 "),n("strong",null,"flannel"),s("\uFF0C\u6709\u591A\u4E2A\u6848\u4F8B\u8868\u660E "),n("strong",null,"calico"),s(" \u4E0E\u963F\u91CC\u4E91\u5B58\u5728\u517C\u5BB9\u6027\u95EE\u9898")])],-1),J=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token builtin class-name"},"export"),s(),n("span",{class:"token assign-left variable"},"POD_SUBNET"),n("span",{class:"token operator"},"="),n("span",{class:"token number"},"10.100"),s(`.0.0/16
kubectl apply `),n("span",{class:"token parameter variable"},"-f"),s(` https://kuboard.cn/install-script/v1.22.x/calico-operator.yaml
`),n("span",{class:"token function"},"wget"),s(` https://kuboard.cn/install-script/v1.22.x/calico-custom-resources.yaml
`),n("span",{class:"token function"},"sed"),s(),n("span",{class:"token parameter variable"},"-i"),s(),n("span",{class:"token string"},[s('"s#192.168.0.0/16#'),n("span",{class:"token variable"},"${POD_SUBNET}"),s('#"')]),s(` calico-custom-resources.yaml
kubectl apply `),n("span",{class:"token parameter variable"},"-f"),s(` calico-custom-resources.yaml 
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),G=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token builtin class-name"},"export"),s(),n("span",{class:"token assign-left variable"},"POD_SUBNET"),n("span",{class:"token operator"},"="),n("span",{class:"token number"},"10.100"),s(`.0.0/16
`),n("span",{class:"token function"},"wget"),s(` https://kuboard.cn/install-script/flannel/flannel-v0.14.0.yaml
`),n("span",{class:"token function"},"sed"),s(),n("span",{class:"token parameter variable"},"-i"),s(),n("span",{class:"token string"},[s('"s#10.244.0.0/16#'),n("span",{class:"token variable"},"${POD_SUBNET}"),s('#"')]),s(` flannel-v0.14.0.yaml
kubectl apply `),n("span",{class:"token parameter variable"},"-f"),s(` ./flannel-v0.14.0.yaml
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),F=e(`<h3 id="_7-3-\u521D\u59CB\u5316-worker\u8282\u70B9" tabindex="-1"><a class="header-anchor" href="#_7-3-\u521D\u59CB\u5316-worker\u8282\u70B9" aria-hidden="true">#</a> 7.3 \u521D\u59CB\u5316 worker\u8282\u70B9</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u53EA\u5728 master \u8282\u70B9\u6267\u884C,\u83B7\u5F97 join \u547D\u4EE4\u53C2\u6570</span>
kubeadm token create --print-join-command

<span class="token comment"># \u53EF\u83B7\u53D6kubeadm join \u547D\u4EE4\u53CA\u53C2\u6570\uFF0C\u8F93\u51FA\u5982\u4E0B</span>
kubeadm <span class="token function">join</span> apiserver.uit:6443 <span class="token parameter variable">--token</span> jp5cyz.3tcmv8cr8xd8nhj3 --discovery-token-ca-cert-hash sha256:3520937aaab1f2abfd17334b7409ad293b2cc916dcdb33085e18cfa8a08281bf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BE5 <strong>token</strong> \u7684\u6709\u6548\u65F6\u95F4\u4E3A 2 \u4E2A\u5C0F\u65F6\uFF0C<strong>2</strong> \u5C0F\u65F6\u5185\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u6B64 <strong>token</strong> \u521D\u59CB\u5316\u4EFB\u610F\u6570\u91CF\u7684 <strong>worker</strong> \u8282\u70B9</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5728 worker \u8282\u70B9\u6267\u884C</span>
<span class="token comment"># \u66FF\u6362 x.x.x.x \u4E3A master \u8282\u70B9\u7684\u5185\u7F51 IP</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">MASTER_IP</span><span class="token operator">=</span>x.x.x.x
<span class="token comment"># \u66FF\u6362 apiserver.demo \u4E3A\u521D\u59CB\u5316 master \u8282\u70B9\u65F6\u6240\u4F7F\u7528\u7684 APISERVER_NAME</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">APISERVER_NAME</span><span class="token operator">=</span>apiserver.demo
<span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${MASTER_IP}</span>    <span class="token variable">\${APISERVER_NAME}</span>&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/hosts

<span class="token comment"># \u66FF\u6362\u4E3A master \u8282\u70B9\u4E0A kubeadm token create \u547D\u4EE4\u7684\u8F93\u51FA</span>
kubeadm <span class="token function">join</span> apiserver.demo:6443 xxxx

<span class="token comment"># master \u8282\u70B9\u67E5\u770B\uFF0C\u8F93\u51FA\u5982\u4E0B\u8868\u793A\u5B89\u88C5\u6210\u529F</span>
$ kubectl get nodes
NAME             STATUS   ROLES                  AGE   VERSION
k8s-master-171   Ready    control-plane,master   34m   v1.22.3
k8s-salve-172    Ready    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 24m   v1.22.3
k8s-salve-173    Ready    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                 24m   v1.22.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-4-\u5B89\u88C5dashboard" tabindex="-1"><a class="header-anchor" href="#_7-4-\u5B89\u88C5dashboard" aria-hidden="true">#</a> 7.4 \u5B89\u88C5Dashboard</h3><p>\u5B89\u88C5\u53EF\u540C\u4E0A\u4E00\u81F4\uFF0C\u4F9D\u7136\u4F7F\u7528 <strong>v2</strong> \u7248\u672C\u7684 <strong>dashboard</strong></p><h4 id="\u4F7F\u7528-serviceaccent-\u8BBF\u95EE\u6709\u6539\u52A8" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-serviceaccent-\u8BBF\u95EE\u6709\u6539\u52A8" aria-hidden="true">#</a> \u4F7F\u7528 ServiceAccent \u8BBF\u95EE\u6709\u6539\u52A8</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA \u6587\u4EF6</span>
<span class="token function">vim</span> admin-user.yaml

<span class="token comment"># \u952E\u5165\u5982\u4E0B</span>
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
  
<span class="token comment"># \u6267\u884C\u521B\u5EFA\u547D\u4EE4</span>
$ kubectl create <span class="token parameter variable">-f</span> admin-user.yaml
<span class="token comment"># serviceaccount/admin-user created</span>

<span class="token comment"># \u518D\u521B\u5EFA\u5982\u4E0B</span>
<span class="token function">vim</span> bind.yaml

<span class="token comment"># \u5E76\u952E\u5165</span>
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
  
<span class="token comment"># \u6DFB\u52A0</span>
$ kubectl create <span class="token parameter variable">-f</span> bind.yaml 
<span class="token comment"># clusterrolebinding.rbac.authorization.k8s.io/admin-user created</span>

<span class="token comment"># \u521B\u5EFAtoken</span>
$ kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard create token admin-user

<span class="token comment"># \u590D\u5236\u5982\u4E0B token \u5373\u53EF\u767B\u5165\uFF0C\u8C8C\u4F3C\u6709\u65F6\u95F4\u9650\u5236\uFF0C\u4E0B\u6B21\u767B\u5F55\u662F\u751F\u6210\u5373\u53EF</span>
eyJhbGciOiJSUzI1NiIsImtpZCI6IjBnekNxQnRWV2tkUTA2eE5YWFE3VkRQcFh5ZTR5c19JZldZTm94eExqak0i<span class="token punctuation">..</span><span class="token punctuation">..</span>
se4BNIbTvZwXY4_D_6bwqU2Y2SbsmHuSkhe5AUc-H7m-sd5jJSojpXA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function X(B,K){const i=t("ExternalLinkIcon"),c=t("Tabs");return u(),m("div",null,[k,v(" more "),g,n("div",h,[f,n("p",null,[y,s(" \u662F "),_,s(" \u5B98\u65B9\u652F\u6301\u7684\u5B89\u88C5\u65B9\u5F0F\uFF0C\u201C"),x,s("\u201D \u4E0D\u662F\u3002\u672C\u6587\u6863\u91C7\u7528 "),n("strong",null,[n("a",E,[s("kubernetes.io"),a(i)])]),s(" \u5B98\u65B9\u63A8\u8350\u7684 "),S,s(" \u5DE5\u5177\u5B89\u88C5 "),R,s(" \u96C6\u7FA4\u3002")])]),N,n("p",null,[n("a",I,[s("\u53C2\u8003 \u5FEB\u901F\u5B89\u88C5"),a(i)]),s(" \u521D\u59CB\u5316\u6D41\u7A0B\u8C8C\u4F3C\u4F1A\u6267\u884C\u5931\u8D25\uFF0C\u4E5F\u8BB8\u548C "),P,s(" \u7248\u672C\u6709\u5173\uFF0C\u7528\u6765\u53C2\u8003")]),q,n("div",w,[A,n("ol",null,[O,n("li",null,[n("p",null,[s("\u53BB "),n("a",V,[s("github\u5B98\u65B9\u4E0B\u8F7D\u538B\u7F29\u5305"),a(i)]),s(" \uFF08"),T,s("\uFF09"),n("a",Z,[s("cni-plugins-linux-amd64-v0.9.0.tgz"),a(i)])]),M])])]),U,n("p",null,[n("a",W,[s("\u6587\u6863"),a(i)])]),j,n("blockquote",null,[n("p",null,[s("\u4F7F\u7528\u6D4F\u89C8\u5668\u8BBF\u95EE "),n("a",C,[s("https://192.168.3.171:30100/"),a(i)]),s(" \u5373\u53EF\u6253\u5F00 "),Y,s(" \u9875\u9762")])]),D,n("p",null,[n("a",$,[s("\u6587\u6863\u53C2\u8003"),a(i)])]),z,a(c,{data:[{title:"Calico"},{title:"Flannel"}]},{tab0:l(({title:r,value:o,isActive:d})=>[L,J]),tab1:l(({title:r,value:o,isActive:d})=>[G]),_:1}),F])}const nn=p(b,[["render",X],["__file","k8s\u5B89\u88C5.html.vue"]]);export{nn as default};
