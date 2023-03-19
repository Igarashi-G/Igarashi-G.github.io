<template><div><p><strong>Docker</strong> 的基础概念和安装说明</p>
<!-- more -->
<div class="custom-container info">
<p class="custom-container-title">Docker</p>
<p>让开发者打包他的应用、及依赖包，到一个轻量级、可移植的容器中，可发布到任何流行的 <strong>Linux</strong> 机器上，也能实现虚拟化，<strong>完全使用沙箱机制</strong>（<em>隔离</em>），相互之间不会有任何接口，且 <strong>开销极低</strong></p>
</div>
<h2 id="_1-docker概述" tabindex="-1"><a class="header-anchor" href="#_1-docker概述" aria-hidden="true">#</a> 1. Docker概述</h2>
<p>旧金山 <strong>dotCloud</strong> 基于 <strong>Linux</strong> 容器技术 <strong>LXC</strong> 封装的内部工具，<strong>13</strong> 年诞生，<strong>15</strong> 年逐步投入生产，后面开源出来改个名字叫 <strong>Docker</strong> ，目的为了节省资源（<em>硬件、虚拟机</em>）</p>
<ul>
<li><a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker 官网<ExternalLinkIcon/></a></li>
<li><a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">Docker 官方文档<ExternalLinkIcon/></a></li>
<li><a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">Docker Hub<ExternalLinkIcon/></a></li>
</ul>
<h3 id="_1-1-教程" tabindex="-1"><a class="header-anchor" href="#_1-1-教程" aria-hidden="true">#</a> 1.1 教程</h3>
<iframe src="//player.bilibili.com/player.html?aid=838132893&bvid=BV1Du411S7Rw&cid=191591478&page=2" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 380px;"> </iframe>
<ul>
<li><a href="https://www.runoob.com/docker/docker-tutorial.html" target="_blank" rel="noopener noreferrer">Docker 教程 | 菜鸟教程<ExternalLinkIcon/></a>
<ul>
<li><a href="https://www.runoob.com/docker/docker-install-redis.html" target="_blank" rel="noopener noreferrer">Docker 安装 Redis | 菜鸟教程<ExternalLinkIcon/></a></li>
</ul>
</li>
<li><a href="https://www.w3cschool.cn/docker/" target="_blank" rel="noopener noreferrer">Docker 教程 | w3cschool<ExternalLinkIcon/></a></li>
<li><a href="https://www.w3cschool.cn/reqsgr/" target="_blank" rel="noopener noreferrer">Docker 从入门到实践 | w3cschool<ExternalLinkIcon/></a></li>
</ul>
<h3 id="_1-2-linux-容器" tabindex="-1"><a class="header-anchor" href="#_1-2-linux-容器" aria-hidden="true">#</a> 1.2 Linux 容器</h3>
<p><strong>Docker</strong> 在 <strong>1.8</strong> 版本之前，全部是封装 <strong>Linux</strong> 的 <a href="https://linuxcontainers.org/lxc/introduction/" target="_blank" rel="noopener noreferrer">LXC<ExternalLinkIcon/></a>，一个 <strong>用户态</strong> 使用容器化特性的 <strong>接口</strong>（<em>调用 Kernel</em>），但不具备跨平台能力</p>
<p>随后为了实现跨平台，抽出了 <a href="https://linuxcontainers.org/lxc/introduction/" target="_blank" rel="noopener noreferrer">libcontainer<ExternalLinkIcon/></a> 项目，把 <strong>namespace</strong>、<strong>cgroup</strong> 的操作封装在该项目里，支持不同的平台类型</p>
<h3 id="_1-3-容器与虚拟机对比" tabindex="-1"><a class="header-anchor" href="#_1-3-容器与虚拟机对比" aria-hidden="true">#</a> 1.3 容器与虚拟机对比</h3>
<img src="@source/tool/Docker/img/为啥使用容器技术.png">
<h5 id="虚拟机" tabindex="-1"><a class="header-anchor" href="#虚拟机" aria-hidden="true">#</a> <strong>虚拟机</strong></h5>
<p>如 <strong>VMware</strong> 、<strong>PVE</strong>、<strong>ESXi</strong>、<strong>Workstation</strong> 等，多台虚拟机都虚拟出了一套 <strong>不同</strong> 的 <strong>虚拟机器硬件资源</strong>、<strong>Kernel</strong>（<em>内核</em> ）和 <strong>Lib 库</strong>，然后在上层运行各自的 <strong>APP</strong>，像是物理机的系统中的子系统一样，从物理虚拟层面进行隔离，占用资源极高</p>
<ul>
<li><strong>Hypervisor：</strong> 一种运行在基础物理服务器和操作系统之间的中间软件层，可允许多个操作系统和应用共享硬件</li>
<li>共享硬件资源，但每起一个虚拟机都需要额外的安装操作系统，从而带来重复的操作系统开销</li>
</ul>
<h5 id="容器" tabindex="-1"><a class="header-anchor" href="#容器" aria-hidden="true">#</a> <strong>容器</strong></h5>
<p>则是多个容器 <strong>共同使用</strong> 一套物理机 <strong>硬件资源</strong>、<strong>Kernel</strong> 然后从运行所需的 <strong>Lib 库</strong> 层面 进行隔离，因此极大的压榨了物理资源，使物理机物尽其用</p>
<ul>
<li><strong>Container Runtime：</strong> 通过 <strong>Linux</strong> 内核虚拟化能力管理多个容器，多个容器共享一套操作系统内核，因此 <strong>摘掉了内核占用的空间</strong> 及运行所需要的耗时，使得容器极其轻量与快速</li>
</ul>
<div class="custom-container note">
<p class="custom-container-title">Docker 解决如下需求</p>
<ul>
<li>环境、依赖不一致</li>
<li>物理硬件资源不够</li>
<li>快速交付介质，直接交付打包后的 <strong>Docker</strong> 镜像，各平台部署</li>
<li>跨平台，方便装任何系统，屏蔽平台间差异</li>
<li>物理资源相互隔离（<em>也可以做到内存、<strong>CPU</strong> 等资源分配与隔离，但安全性不如虚拟机</em>）</li>
<li><strong>Docker</strong> 启动多容器生命周期管理</li>
</ul>
</div>
<h3 id="_1-4-docker-架构" tabindex="-1"><a class="header-anchor" href="#_1-4-docker-架构" aria-hidden="true">#</a> 1.4 Docker 架构</h3>
<p><strong>2015</strong> 年 <strong>6</strong> 月，<strong>Docker</strong> 成立 <a href="https://opencontainers.org/" target="_blank" rel="noopener noreferrer">OCI<ExternalLinkIcon/></a> （<em><strong>Open Container Initiative</strong> 开放容器计划</em> ）组织，建立通用标准并由该组织维护 <strong>libcontainer</strong> 项目，后续由从仅包含 <strong>Kernel</strong> 的库加入了 <strong>CLI</strong> 工具且改名为 <a href="https://github.com/opencontainers/runc" target="_blank" rel="noopener noreferrer">runC<ExternalLinkIcon/></a> （<em>运行容器的轻量级工具</em> ）</p>
<p><strong>Docker</strong> 随后做出了架构调整</p>
<img src="@source/tool/Docker/img/docker架构.png">
<p>将容器运行时相关的程序从 <strong>docker daemon</strong> 剥离出来，形成了 <strong>containerd</strong></p>
<ul>
<li><strong>runC：</strong> 是一个 <strong>Linux CLI</strong>（<em>命令行</em> ）工具， <strong>runC + containerd-shim</strong> 通过 <strong>gRPC</strong> 去调用 <strong>containerd</strong> 来创建和运行容器</li>
<li><strong>containerd：</strong> 一个 <strong>守护程序</strong>，<strong>它管理容器的生命周期</strong>，屏蔽了 <strong>docker deamon</strong> 底层细节（<em>同时解耦升级后的不兼容</em> ），抽象出了一套 <strong>gRPC</strong> 接口，提供了在节点上执行容器和管理镜像的最小功能集</li>
</ul>
<img src="@source/tool/Docker/img/CS架构.png">
<p>因此，<strong>Docker</strong> 演变为了 <strong>CS</strong> 架构的产品</p>
<ul>
<li><strong>Client：</strong> 由 <code v-pre>docker CLI</code> 通过 <code v-pre>REST API</code> 调用 <strong>Server</strong> 端服务</li>
<li><strong>Server：</strong> 为 <code v-pre>docker daemon</code> 守护进程</li>
</ul>
<hr>
<h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装" aria-hidden="true">#</a> 2. 安装</h2>
<p>推荐参考官方文档：<a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer">安装 Docker 引擎（英文）<ExternalLinkIcon/></a></p>
<Tabs :data='[{"title":"CentOS"},{"title":"Debian"},{"title":"Windows"}]'>
<template #tab0="{ title, value, isActive }">
<h3 id="_2-1-centos" tabindex="-1"><a class="header-anchor" href="#_2-1-centos" aria-hidden="true">#</a> 2.1 CentOS</h3>
<h4 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载" aria-hidden="true">#</a> <strong>卸载</strong></h4>
<ul>
<li>
<p>执行如下命令，卸载软件包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum remove <span class="token function">docker</span> <span class="token punctuation">\</span>
    docker-client <span class="token punctuation">\</span>
    docker-client-latest <span class="token punctuation">\</span>
    docker-common <span class="token punctuation">\</span>
    docker-latest <span class="token punctuation">\</span>
    docker-latest-logrotate <span class="token punctuation">\</span>
    docker-logrotate <span class="token punctuation">\</span>
    docker-engine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除 <code v-pre>docker</code> 目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/docker/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> <strong>安装</strong></h4>
<p><strong>必要：配置宿主机网卡转发</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 改系统配置，需要root执行，写如下系统配置到 `docker.conf` 中</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span> /etc/sysctl.d/docker.conf</span>
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
EOF</span>

<span class="token comment">## 加载配置使其生效</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span> /etc/sysctl.d/docker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>net.ipv4.ip_forward = 1</code> <strong>重要</strong>，控制机器间 <strong>网卡流量的传递开关</strong> ，需要打开，<mark>否则一个机器多块网卡无法传递流量</mark></li>
</ul>
<h5 id="yum-安装配置-docker" tabindex="-1"><a class="header-anchor" href="#yum-安装配置-docker" aria-hidden="true">#</a> yum 安装配置 docker</h5>
<ul>
<li>
<p>安装 <code v-pre>yum-utils</code> 包（<em>提供 <code v-pre>yum-config-manager</code> 实用程序</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>设置稳定的存储库（<em>下载阿里源 repo 文件</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 下载阿里源repo文件</span>
<span class="token function">curl</span> <span class="token parameter variable">-o</span> /etc/yum.repos.d/Centos-7.repo http://mirrors.aliyun.com/repo/Centos-7.repo
<span class="token function">curl</span> <span class="token parameter variable">-o</span> /etc/yum.repos.d/docker-ce.repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

ll /etc/yum.repos.d

yum clean all <span class="token operator">&amp;&amp;</span> yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看源中可用的版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum list docker-ce <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>安装 <code v-pre>docker-ce</code></p>
<ul>
<li><code v-pre>ce</code> 为社区免费版， <code v-pre>ee</code> 为收费企业版</li>
</ul>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 会自动列出最新版依赖，否则需要手动指定各依赖版本</span>
yum install docker-ce <span class="token operator">-</span>y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看安装的 <strong>Docker</strong> 软件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum list installed <span class="token operator">|</span><span class="token function">grep</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>配置镜像源加速（<em>可注册阿里云账号 - 容器获取</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker

<span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">'EOF'
{
  "registry-mirrors": ["https://ubhu1j5h.mirror.aliyuncs.com"]
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>后续一系列操作</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## reload &amp; 开机自启</span>
systemctl daemon-reload
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
systemctl restart <span class="token function">docker</span>

<span class="token comment">## 查看版本号和信息</span>
<span class="token function">docker</span> version
<span class="token function">docker</span> info

<span class="token comment">## docker-client （就是一个 go 编写的 docker二进制文件）</span>
<span class="token function">which</span> <span class="token function">docker</span>

<span class="token comment">## docker daemon (查看 dockerd 守护进程)</span>
<span class="token function">ps</span> aux <span class="token operator">|</span><span class="token function">grep</span> dockerd

<span class="token comment">## containerd （独立服务，被dockerd拉起来的 独立进程）</span>
<span class="token function">ps</span> aux<span class="token operator">|</span><span class="token function">grep</span> conrainerd
systemctl status containerd

<span class="token comment">## 查看docker系统日志</span>
journalctl <span class="token parameter variable">-fu</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</template>
<template #tab1="{ title, value, isActive }">
<h3 id="_2-2-debian" tabindex="-1"><a class="header-anchor" href="#_2-2-debian" aria-hidden="true">#</a> 2.2 Debian</h3>
<ul>
<li>
<p>安装必备的基础系统工具</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> apt-transport-https ca-certificates <span class="token function">curl</span> gnupg lsb-release software-properties-common
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>安装 <strong>Docker</strong> 的阿里 <strong>GPG</strong> 密钥证书</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> gpg --no-default-keyring <span class="token parameter variable">--keyring</span> gnupg-ring:/etc/apt/trusted.gpg.d/NAME.gpg <span class="token parameter variable">--import</span>

<span class="token comment"># import</span>
<span class="token comment"># gpg: keyring '/etc/apt/trusted.gpg.d/NAME.gpg' created</span>
<span class="token comment"># gpg: directory '/root/.gnupg' created</span>
<span class="token comment"># gpg: /root/.gnupg/trustdb.gpg: trustdb created</span>
<span class="token comment"># gpg: key 8D81803C0EBFCD88: public key "Docker Release (CE deb) &lt;docker@docker.com>" # imported</span>
<span class="token comment"># gpg: Total number processed: 1</span>
<span class="token comment"># gpg:               imported: 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>写入 <strong>Docker</strong> 镜像源地址</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>add-apt-repository <span class="token string">"deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/debian <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> stable"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>再更新，并安装 <strong>Docker</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>后续同 <RouterLink to="/tool/Docker/docker%E5%AE%B9%E5%99%A8.html#_2-%E5%AE%89%E8%A3%85">CentOS 安装</RouterLink></p>
</li>
</ul>
<p><strong>注意：</strong> <strong>PVE</strong> 上禁止安装 <strong>Docker</strong> 若需要，开个虚拟机上装</p>
</template>
<template #tab2="{ title, value, isActive }">
<h3 id="_2-3-windows" tabindex="-1"><a class="header-anchor" href="#_2-3-windows" aria-hidden="true">#</a> 2.3 Windows</h3>
<p>推荐参考官方文档 <a href="https://docs.docker.com/docker-for-windows/install/" target="_blank" rel="noopener noreferrer">在 Windows 上安装 Docker Desktop（英文）<ExternalLinkIcon/></a></p>
<p>首先，确保满足先决条件：</p>
<ul>
<li>
<p><strong>- Windows 10 64 位 专业版、企业版、教育版</strong></p>
<ul>
<li><img src="@source/tool/Docker/img/see_windows_version.jpg" alt="查看 Windows 版本" loading="lazy">
<blockquote>
<ul>
<li>
<Alert type="error">~~Igarashi：如果是家庭版建议重装系统~~ `→_→`</Alert></li>
<li><a href="https://docs.docker.com/docker-for-windows/install-windows-home/" target="_blank" rel="noopener noreferrer">在 Windows 10 家庭版上安装 Docker Hub（英文）<ExternalLinkIcon/></a></li>
</ul>
</blockquote>
</li>
</ul>
</li>
<li>
<p><strong>已开启 Windows 虚拟化</strong></p>
<ul>
<li><img src="@source/tool/Docker/img/see_windows_HV.jpg" alt="查看是否开启虚拟化" loading="lazy"></li>
</ul>
</li>
</ul>
<p>然后，<a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener noreferrer">从官网下载 Docker Desktop 安装包<ExternalLinkIcon/></a></p>
<p>安装时会自动打开 Windows 功能——虚拟机平台，如果勾选了
<abbr title="适用于 Linux 的 Windows 子系统">WSL</abbr>
可能会要求安装 <a href="https://docs.microsoft.com/zh-cn/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package" target="_blank" rel="noopener noreferrer">适用于 x64 计算机的 WSL2 Linux 内核更新包<ExternalLinkIcon/></a>
下载安装后在 PowerShell 中使用以下指令将 WSL2 设为默认：</p>
<div class="language-ps ext-ps line-numbers-mode"><pre v-pre class="language-ps"><code>wsl --set-default-version 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后重启计算机即可。</p>
<p><strong>安装完成：</strong>
<img src="@source/tool/Docker/img/docker_desktop.jpg" alt="主界面" loading="lazy"></p>
</template>
</Tabs>
<h2 id="_3-实现原理" tabindex="-1"><a class="header-anchor" href="#_3-实现原理" aria-hidden="true">#</a> 3. 实现原理</h2>
<p>虚拟化核心需要解决的问题：<strong>资源隔离</strong> 与 <strong>资源限制</strong></p>
<ul>
<li>虚拟机硬件虚拟化技术，通过一个 <strong>hypervisor</strong> 层实现对资源的彻底隔离</li>
<li>容器时操作系统级别的虚拟化，利用的是内核的 <strong>Cgroup</strong> 和 <strong>Namespace</strong> 特性，此功能完全通过软件实现</li>
</ul>
<h3 id="_3-1-namespace-资源隔离" tabindex="-1"><a class="header-anchor" href="#_3-1-namespace-资源隔离" aria-hidden="true">#</a> 3.1 Namespace 资源隔离</h3>
<p>命名空间是全局资源的一种抽象，将资源放到不同的命名空间中，各个 <strong>命名空间中的资源是相互隔离的</strong></p>
<p><strong>Docker 容器</strong> 对操作系统来说是个进程， 实现如下</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>// Linux里，用clone() 实现进程创建的系统调用
int clone(int (*child_func)(void *), void *child_stack, int flags, void *arg);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>child_func:</code> 传入子进程运行的程序主函数</li>
<li><code v-pre>child_stack:</code> 子进程使用的栈空间</li>
<li><code v-pre>flags：</code> 表示使用那些 <code v-pre>CLONE_*</code> 标志位</li>
<li><code v-pre>args：</code> 用于传入用户参数</li>
</ul>
<table>
<thead>
<tr>
<th>分类</th>
<th style="text-align:center">系统调用参数</th>
<th style="text-align:center">相关内核版本</th>
</tr>
</thead>
<tbody>
<tr>
<td>Mount namespaces</td>
<td style="text-align:center">CLONE_NEWNS</td>
<td style="text-align:center">Linux 2.4.19</td>
</tr>
<tr>
<td>UTS namespaces</td>
<td style="text-align:center">CLONE_NEWUTS</td>
<td style="text-align:center">Linux 2.6.19</td>
</tr>
<tr>
<td>IPC namespaces</td>
<td style="text-align:center">CLONE_NEWIPC</td>
<td style="text-align:center">Linux 2.6.19</td>
</tr>
<tr>
<td>PID namespaces</td>
<td style="text-align:center">CLONE_NEWPID</td>
<td style="text-align:center">Linux 2.6.24</td>
</tr>
<tr>
<td>Network namespaces</td>
<td style="text-align:center">CLONE_NEWNET</td>
<td style="text-align:center">Linux 2.6.24 ~ 29</td>
</tr>
<tr>
<td>User namespaces</td>
<td style="text-align:center">CLONE_NEWUSER</td>
<td style="text-align:center">Linux 2.6.23 ~ 3.8</td>
</tr>
</tbody>
</table>
<ul>
<li><code v-pre>pid:</code> 用于进程隔离（<em>PID：进程 ID</em>）</li>
<li><code v-pre>net:</code> 管理网络接口（<em>NET：网络</em>）</li>
<li><code v-pre>ipc：</code> 管理对 <code v-pre>IPC</code> 资源的访问（<em>IPC：进程间通信，信号量，消息队列和共享内存</em>）</li>
<li><code v-pre>mnt：</code> 管理文件系统挂载点（<em>MNT： 挂载</em>）</li>
<li><code v-pre>uts：</code> 隔离主机名和域名</li>
<li><code v-pre>user：</code> 隔离用户、用户组</li>
</ul>
<p>实现容器独立的主机名和进程空间</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_GNU_SOURCE</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/mount.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/wait.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sched.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;signal.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>

<span class="token comment">/* 定义一个给 clone 用的栈，栈大小1M */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STACK_SIZE</span> <span class="token expression"><span class="token punctuation">(</span><span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span></span></span>
<span class="token keyword">static</span> <span class="token keyword">char</span> container_stack<span class="token punctuation">[</span>STACK_SIZE<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">char</span><span class="token operator">*</span> <span class="token keyword">const</span> container_args<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"/bin/bash"</span><span class="token punctuation">,</span>
    <span class="token constant">NULL</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">container_main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> arg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"容器进程[%5d] ----进入容器!\n"</span><span class="token punctuation">,</span><span class="token function">getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sethostname</span><span class="token punctuation">(</span><span class="token string">"container"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 设置 hostname</span>
    <span class="token comment">/**执行/bin/bash */</span>
    <span class="token function">execv</span><span class="token punctuation">(</span>container_args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> container_args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Something's Error!\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"宿主机进程[%5d] - 开始一个容器!\n"</span><span class="token punctuation">,</span><span class="token function">getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/* 调用clone函数 新的进程、挂载、空间*/</span>
    <span class="token keyword">int</span> container_pid <span class="token operator">=</span> <span class="token function">clone</span><span class="token punctuation">(</span>container_main<span class="token punctuation">,</span> container_stack<span class="token operator">+</span>STACK_SIZE<span class="token punctuation">,</span>  CLONE_NEWPID <span class="token operator">|</span> CLONE_NEWUTS <span class="token operator">|</span> SIGCHLD<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/* 等待子进程结束 */</span>
    <span class="token function">waitpid</span><span class="token punctuation">(</span>container_pid<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"宿主机 - 容器结束!\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行编译并测试</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> container.c
gcc container.c <span class="token parameter variable">-o</span>  container
./container
<span class="token comment">## 宿主机进程[11660] - 开始一个容器!</span>
<span class="token comment">## 容器进程[    1] ----进入容器!</span>

<span class="token comment"># 查看hostname，发现是 container</span>
<span class="token function">hostname</span>

<span class="token comment"># 查看当前进程号，发现是 1号进程</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$$</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code v-pre>proc</code> 对比</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看子进程(打印出来的)</span>
pstree <span class="token parameter variable">-p</span> <span class="token number">11660</span>
<span class="token comment">## container2(11660)───bash(11661)</span>

ll /proc/11661/ns/
ll /proc/11660/ns/
<span class="token comment"># Ctrl + d 退出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="@source/tool/Docker/img/proc对比.jpg">
<p>发现和父进程不同，故<code v-pre>pid</code> 和 <code v-pre>uts</code> 具有不同的命名空间</p>
<p>因此 <strong>Docker</strong> 在启动一个容器的时候，会调用 <strong>Linux Kernel Namespace</strong> 的接口，创建一块虚拟空间，<code v-pre>user</code> 通常相同用一样的，不会新建</p>
<h3 id="_3-2-cgroup-资源限制" tabindex="-1"><a class="header-anchor" href="#_3-2-cgroup-资源限制" aria-hidden="true">#</a> 3.2 CGroup 资源限制</h3>
<p><strong>Namespace：</strong> 可以保证容器间的隔离，但无法限制占用资源，若容器中执行 <strong>CPU</strong> 密集型任务，或内存泄漏，此时无法控制，因此需要 <strong>Control Groups</strong></p>
<p><strong>CGroup：</strong> 可以隔离宿主机上的物理资源：<strong>CPU</strong>、内存、磁盘 <strong>I/O</strong>、网络带宽，每一个 <strong>CGroup</strong> 都是一组被相同标准的参数限制的进程，我们只需把容器和进程加入到中指定的 <strong>CGroup</strong> 中</p>
<h3 id="_3-3-unionfs-联合文件系统" tabindex="-1"><a class="header-anchor" href="#_3-3-unionfs-联合文件系统" aria-hidden="true">#</a> 3.3 UnionFS 联合文件系统</h3>
<p>每台机器若运行上百容器，若都去全量 <code v-pre>copy</code> 文件系统，那么再轻量也会占用大量存储空间，导致</p>
<ul>
<li>运行容器速度慢</li>
<li>占用大量磁盘物理空间</li>
</ul>
<p>因此 <strong>Docker</strong> 用如下手段解决这个问题</p>
<ul>
<li>镜像分层存储</li>
<li><strong>UnionFS</strong></li>
</ul>
<p>每个镜像是有一系列的层组成，一层代表 <strong>Dockerfile</strong> 中的一条指令，如下文件，就包含了 <strong>4</strong> 条指令</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:15.04</span>
<span class="token instruction"><span class="token keyword">COPY</span> . /app</span>
<span class="token instruction"><span class="token keyword">RUN</span> make /app</span>
<span class="token instruction"><span class="token keyword">CMD</span> python /app/app.py</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每一行就创建一层，<strong>Dockerfile</strong> 构建出来的镜像运行的容器结构如下</p>
<img src="@source/tool/Docker/img/unionFS结构.jpg">
<p>镜像就是如上一层层堆叠起来的，而且都是只读的，运行时才会在基础层上添加新的可写层（<em>容器层</em>），对于运行中的容器所做的所有更改（<em>CUD操作</em>）都将写入容器层</p>
<h5 id="如何写入" tabindex="-1"><a class="header-anchor" href="#如何写入" aria-hidden="true">#</a> 如何写入</h5>
<p><img src="@source/tool/Docker/img/CoW技术.jpg">当写入时</p>
<ul>
<li>容器层用了写时复制 <strong>CoW</strong> 技术（<em>copy-on-write</em>），故所有数据都从 <strong>image</strong> 里读，让容器共享 <strong>image</strong> 的文件系统</li>
<li>写时才去进行复制到自己文件系统上的副本操作，也不会影响到 <strong>image</strong> 的源文件，提高磁盘利用率</li>
</ul>
<h5 id="如何合并层到一起" tabindex="-1"><a class="header-anchor" href="#如何合并层到一起" aria-hidden="true">#</a> <strong>如何合并层到一起</strong></h5>
<p><strong>UnionFS</strong> 是为了 <strong>Linux</strong> 系统设计的，用来把多个文件系统联合到同一个挂载点的文件系统服务。能够将<strong>不同文件夹中的层</strong> 联合（<em>Union</em>） 到 <strong>同一个文件夹</strong> 中，整个联合的过程成为联合挂载 <strong>Union Mount</strong></p>
<img src="@source/tool/Docker/img/AUFS实现.jpg">
<div class="custom-container info">
<p class="custom-container-title">说明</p>
<p>上述即 <strong>AUFS</strong> （<em>Docker存储驱动</em>）的一种实现</p>
<p>此外还支持不同驱动 <strong>devicemapper</strong> 、 <strong>overlay2</strong>、 <strong>zfs</strong> 和 <strong>Btrfs</strong> 等... 新版已经使用 <strong>overlay2</strong> 取代了<strong>AUFS</strong>，但在没有 <strong>overlay2</strong> 驱动的机器上，依然使用 <strong>AUFS</strong></p>
</div>
</div></template>


