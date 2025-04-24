<template><div><p><strong>Docker</strong> 的基础概念和安装说明</p>
<!-- more -->
<div class="hint-container info">
<p class="hint-container-title">Docker</p>
<p>让开发者打包他的应用、及依赖包，到一个轻量级、可移植的容器中，可发布到任何流行的 <strong>Linux</strong> 机器上，也能实现虚拟化，<strong>完全使用沙箱机制</strong>（<em>隔离</em>），相互之间不会有任何接口，且 <strong>开销极低</strong></p>
</div>
<h2 id="_1-docker概述" tabindex="-1"><a class="header-anchor" href="#_1-docker概述"><span>1. Docker概述</span></a></h2>
<p>旧金山 <strong>dotCloud</strong> 基于 <strong>Linux</strong> 容器技术 <strong>LXC</strong> 封装的内部工具，<strong>13</strong> 年诞生，<strong>15</strong> 年逐步投入生产，后面开源出来改个名字叫 <strong>Docker</strong> ，目的为了节省资源（<em>硬件、虚拟机</em>）</p>
<ul>
<li><a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker 官网</a></li>
<li><a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">Docker 官方文档</a></li>
<li><a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">Docker Hub</a></li>
</ul>
<h3 id="_1-1-教程" tabindex="-1"><a class="header-anchor" href="#_1-1-教程"><span>1.1 教程</span></a></h3>
<iframe src="//player.bilibili.com/player.html?aid=838132893&bvid=BV1Du411S7Rw&cid=191591478&page=2" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 100%; height: 380px;"> </iframe>
<ul>
<li><a href="https://www.runoob.com/docker/docker-tutorial.html" target="_blank" rel="noopener noreferrer">Docker 教程 | 菜鸟教程</a>
<ul>
<li><a href="https://www.runoob.com/docker/docker-install-redis.html" target="_blank" rel="noopener noreferrer">Docker 安装 Redis | 菜鸟教程</a></li>
</ul>
</li>
<li><a href="https://www.w3cschool.cn/docker/" target="_blank" rel="noopener noreferrer">Docker 教程 | w3cschool</a></li>
<li><a href="https://www.w3cschool.cn/reqsgr/" target="_blank" rel="noopener noreferrer">Docker 从入门到实践 | w3cschool</a></li>
</ul>
<h3 id="_1-2-linux-容器" tabindex="-1"><a class="header-anchor" href="#_1-2-linux-容器"><span>1.2 Linux 容器</span></a></h3>
<p><strong>Docker</strong> 在 <strong>1.8</strong> 版本之前，全部是封装 <strong>Linux</strong> 的 <a href="https://linuxcontainers.org/lxc/introduction/" target="_blank" rel="noopener noreferrer">LXC</a>，一个 <strong>用户态</strong> 使用容器化特性的 <strong>接口</strong>（<em>调用 Kernel</em>），但不具备跨平台能力</p>
<p>随后为了实现跨平台，抽出了 <a href="https://linuxcontainers.org/lxc/introduction/" target="_blank" rel="noopener noreferrer">libcontainer</a> 项目，把 <strong>namespace</strong>、<strong>cgroup</strong> 的操作封装在该项目里，支持不同的平台类型</p>
<h3 id="_1-3-容器与虚拟机对比" tabindex="-1"><a class="header-anchor" href="#_1-3-容器与虚拟机对比"><span>1.3 容器与虚拟机对比</span></a></h3>
<img src="@source/tool/Docker/img/为啥使用容器技术.png">
<h5 id="虚拟机" tabindex="-1"><a class="header-anchor" href="#虚拟机"><span><strong>虚拟机</strong></span></a></h5>
<p>如 <strong>VMware</strong> 、<strong>PVE</strong>、<strong>ESXi</strong>、<strong>Workstation</strong> 等，多台虚拟机都虚拟出了一套 <strong>不同</strong> 的 <strong>虚拟机器硬件资源</strong>、<strong>Kernel</strong>（<em>内核</em> ）和 <strong>Lib 库</strong>，然后在上层运行各自的 <strong>APP</strong>，像是物理机的系统中的子系统一样，从物理虚拟层面进行隔离，占用资源极高</p>
<ul>
<li><strong>Hypervisor：</strong> 一种运行在基础物理服务器和操作系统之间的中间软件层，可允许多个操作系统和应用共享硬件</li>
<li>共享硬件资源，但每起一个虚拟机都需要额外的安装操作系统，从而带来重复的操作系统开销</li>
</ul>
<h5 id="容器" tabindex="-1"><a class="header-anchor" href="#容器"><span><strong>容器</strong></span></a></h5>
<p>则是多个容器 <strong>共同使用</strong> 一套物理机 <strong>硬件资源</strong>、<strong>Kernel</strong> 然后从运行所需的 <strong>Lib 库</strong> 层面 进行隔离，因此极大的压榨了物理资源，使物理机物尽其用</p>
<ul>
<li><strong>Container Runtime：</strong> 通过 <strong>Linux</strong> 内核虚拟化能力管理多个容器，多个容器共享一套操作系统内核，因此 <strong>摘掉了内核占用的空间</strong> 及运行所需要的耗时，使得容器极其轻量与快速</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">Docker 解决如下需求</p>
<ul>
<li>环境、依赖不一致</li>
<li>物理硬件资源不够</li>
<li>快速交付介质，直接交付打包后的 <strong>Docker</strong> 镜像，各平台部署</li>
<li>跨平台，方便装任何系统，屏蔽平台间差异</li>
<li>物理资源相互隔离（<em>也可以做到内存、<strong>CPU</strong> 等资源分配与隔离，但安全性不如虚拟机</em>）</li>
<li><strong>Docker</strong> 启动多容器生命周期管理</li>
</ul>
</div>
<h3 id="_1-4-docker-架构" tabindex="-1"><a class="header-anchor" href="#_1-4-docker-架构"><span>1.4 Docker 架构</span></a></h3>
<p><strong>2015</strong> 年 <strong>6</strong> 月，<strong>Docker</strong> 成立 <a href="https://opencontainers.org/" target="_blank" rel="noopener noreferrer">OCI</a> （<em><strong>Open Container Initiative</strong> 开放容器计划</em> ）组织，建立通用标准并由该组织维护 <strong>libcontainer</strong> 项目，后续由从仅包含 <strong>Kernel</strong> 的库加入了 <strong>CLI</strong> 工具且改名为 <a href="https://github.com/opencontainers/runc" target="_blank" rel="noopener noreferrer">runC</a> （<em>运行容器的轻量级工具</em> ）</p>
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
<h2 id="_2-安装" tabindex="-1"><a class="header-anchor" href="#_2-安装"><span>2. 安装</span></a></h2>
<p>推荐参考官方文档：<a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer">安装 Docker 引擎（英文）</a></p>
<Tabs id="186" :data='[{"id":"CentOS"},{"id":"Debian"},{"id":"Windows"}]'>
<template #title0="{ value, isActive }">CentOS</template>
<template #title1="{ value, isActive }">Debian</template>
<template #title2="{ value, isActive }">Windows</template>
<template #tab0="{ value, isActive }">
<h3 id="_2-1-centos" tabindex="-1"><a class="header-anchor" href="#_2-1-centos"><span>2.1 CentOS</span></a></h3>
<h4 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载"><span><strong>卸载</strong></span></a></h4>
<ul>
<li>
<p>执行如下命令，卸载软件包</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> remove</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-client</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-client-latest</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-common</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-latest</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-latest-logrotate</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-logrotate</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    docker-engine</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除 <code v-pre>docker</code> 目录</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -rf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/lib/docker/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span><strong>安装</strong></span></a></h4>
<p><strong>必要：配置宿主机网卡转发</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 改系统配置，需要root执行，写如下系统配置到 `docker.conf` 中</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> > </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/etc/sysctl.d/docker.conf</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">net.bridge.bridge-nf-call-ip6tables = 1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">net.bridge.bridge-nf-call-iptables = 1</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">net.ipv4.ip_forward=1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 加载配置使其生效</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sysctl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/sysctl.d/docker.conf</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>net.ipv4.ip_forward = 1</code> <strong>重要</strong>，控制机器间 <strong>网卡流量的传递开关</strong> ，需要打开，<mark>否则一个机器多块网卡无法传递流量</mark></li>
</ul>
<h5 id="yum-安装配置-docker" tabindex="-1"><a class="header-anchor" href="#yum-安装配置-docker"><span>yum 安装配置 docker</span></a></h5>
<ul>
<li>
<p>安装 <code v-pre>yum-utils</code> 包（<em>提供 <code v-pre>yum-config-manager</code> 实用程序</em>）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum-utils</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>设置稳定的存储库（<em>下载阿里源 repo 文件</em>）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 下载阿里源repo文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/yum.repos.d/Centos-7.repo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://mirrors.aliyun.com/repo/Centos-7.repo</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/yum.repos.d/docker-ce.repo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ll</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/yum.repos.d</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> clean</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> all</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x26;&#x26; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> makecache</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看源中可用的版本</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> list</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker-ce</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --showduplicates</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sort</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>安装 <code v-pre>docker-ce</code></p>
<ul>
<li><code v-pre>ce</code> 为社区免费版， <code v-pre>ee</code> 为收费企业版</li>
</ul>
<div class="language-powershell line-numbers-mode" data-highlighter="shiki" data-ext="powershell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 会自动列出最新版依赖，否则需要手动指定各依赖版本</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">yum install docker</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">ce </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">y</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看安装的 <strong>Docker</strong> 软件</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> list</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> installed</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>配置镜像源加速（<em>可注册阿里云账号 - 容器获取</em>）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mkdir</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tee</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/docker/daemon.json</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;&#x3C;-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">'EOF'</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">{</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  "registry-mirrors": ["https://ubhu1j5h.mirror.aliyuncs.com"]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">}</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>后续一系列操作</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## reload &#x26; 开机自启</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 查看版本号和信息</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> version</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> info</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## docker-client （就是一个 go 编写的 docker二进制文件）</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">which</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## docker daemon (查看 dockerd 守护进程)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ps</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> aux</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dockerd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## containerd （独立服务，被dockerd拉起来的 独立进程）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ps</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> aux</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> conrainerd</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> status</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> containerd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 查看docker系统日志</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">journalctl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -fu</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> docker</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</template>
<template #tab1="{ value, isActive }">
<h3 id="_2-2-debian" tabindex="-1"><a class="header-anchor" href="#_2-2-debian"><span>2.2 Debian</span></a></h3>
<ul>
<li>
<p>安装必备的基础系统工具</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> update</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-transport-https</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ca-certificates</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> curl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> gnupg</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lsb-release</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> software-properties-common</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>安装 <strong>Docker</strong> 的阿里 <strong>GPG</strong> 密钥证书</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">curl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -fsSL</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> gpg</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --no-default-keyring</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --keyring</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> gnupg-ring:/etc/apt/trusted.gpg.d/NAME.gpg</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --import</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># import</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># gpg: keyring '/etc/apt/trusted.gpg.d/NAME.gpg' created</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># gpg: directory '/root/.gnupg' created</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># gpg: /root/.gnupg/trustdb.gpg: trustdb created</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># gpg: key 8D81803C0EBFCD88: public key "Docker Release (CE deb) &#x3C;docker@docker.com>" # imported</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># gpg: Total number processed: 1</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># gpg:               imported: 1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>写入 <strong>Docker</strong> 镜像源地址，若失败请从</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">add-apt-repository</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/debian $(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">lsb_release</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -cs</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">) stable"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>再更新，并安装 <strong>Docker</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>sudo apt-get update</span></span>
<span class="line"><span>sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>后续同 <RouteLink to="/tool/Docker/docker%E5%AE%B9%E5%99%A8.html#_2-%E5%AE%89%E8%A3%85">CentOS 安装</RouteLink></p>
</li>
</ul>
<p><strong>注意：</strong> <strong>PVE</strong> 上禁止安装 <strong>Docker</strong> 若需要，开个虚拟机上装</p>
</template>
<template #tab2="{ value, isActive }">
<h3 id="_2-3-windows" tabindex="-1"><a class="header-anchor" href="#_2-3-windows"><span>2.3 Windows</span></a></h3>
<p>推荐参考官方文档 <a href="https://docs.docker.com/docker-for-windows/install/" target="_blank" rel="noopener noreferrer">在 Windows 上安装 Docker Desktop（英文）</a></p>
<p>首先，确保满足先决条件：</p>
<ul>
<li>
<p><strong>- Windows 10 64 位 专业版、企业版、教育版</strong></p>
<ul>
<li><img src="@source/tool/Docker/img/see_windows_version.jpg" alt="查看 Windows 版本">
<blockquote>
<ul>
<li>
<Alert type="error">~~Igarashi：如果是家庭版建议重装系统~~ `→_→`</Alert></li>
<li><a href="https://docs.docker.com/docker-for-windows/install-windows-home/" target="_blank" rel="noopener noreferrer">在 Windows 10 家庭版上安装 Docker Hub（英文）</a></li>
</ul>
</blockquote>
</li>
</ul>
</li>
<li>
<p><strong>已开启 Windows 虚拟化</strong></p>
<ul>
<li><img src="@source/tool/Docker/img/see_windows_HV.jpg" alt="查看是否开启虚拟化"></li>
</ul>
</li>
</ul>
<p>然后，<a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener noreferrer">从官网下载 Docker Desktop 安装包</a></p>
<p>安装时会自动打开 Windows 功能——虚拟机平台，如果勾选了<br>
<abbr title="适用于 Linux 的 Windows 子系统">WSL</abbr><br>
可能会要求安装 <a href="https://docs.microsoft.com/zh-cn/windows/wsl/install-win10#step-4---download-the-linux-kernel-update-package" target="_blank" rel="noopener noreferrer">适用于 x64 计算机的 WSL2 Linux 内核更新包</a><br>
下载安装后在 PowerShell 中使用以下指令将 WSL2 设为默认：</p>
<div class="language-ps line-numbers-mode" data-highlighter="shiki" data-ext="ps" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">wsl </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">--</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">set-default</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">version </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>最后重启计算机即可。</p>
<p><strong>安装完成：</strong><br>
<img src="@source/tool/Docker/img/docker_desktop.jpg" alt="主界面"></p>
</template>
</Tabs>
<h2 id="_3-实现原理" tabindex="-1"><a class="header-anchor" href="#_3-实现原理"><span>3. 实现原理</span></a></h2>
<p>虚拟化核心需要解决的问题：<strong>资源隔离</strong> 与 <strong>资源限制</strong></p>
<ul>
<li>虚拟机硬件虚拟化技术，通过一个 <strong>hypervisor</strong> 层实现对资源的彻底隔离</li>
<li>容器时操作系统级别的虚拟化，利用的是内核的 <strong>Cgroup</strong> 和 <strong>Namespace</strong> 特性，此功能完全通过软件实现</li>
</ul>
<h3 id="_3-1-namespace-资源隔离" tabindex="-1"><a class="header-anchor" href="#_3-1-namespace-资源隔离"><span>3.1 Namespace 资源隔离</span></a></h3>
<p>命名空间是全局资源的一种抽象，将资源放到不同的命名空间中，各个 <strong>命名空间中的资源是相互隔离的</strong></p>
<p><strong>Docker 容器</strong> 对操作系统来说是个进程， 实现如下</p>
<div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// Linux里，用clone() 实现进程创建的系统调用</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> clone</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">*</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">child_func</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">void</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> *</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> *</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">child_stack</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> flags</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> *</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">arg</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
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
<div class="language-c line-numbers-mode" data-highlighter="shiki" data-ext="c" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">#define</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> _GNU_SOURCE</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> &#x3C;sys/mount.h></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> &#x3C;sys/types.h></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> &#x3C;sys/wait.h></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> &#x3C;stdio.h></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> &#x3C;sched.h></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> &#x3C;signal.h></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> &#x3C;unistd.h></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">/* 定义一个给 clone 用的栈，栈大小1M */</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">#define</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> STACK_SIZE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1024</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> *</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1024</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> char</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> container_stack</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[STACK_SIZE];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">char*</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> container_args</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">[]</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    "/bin/bash"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">    NULL</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> container_main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">void*</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> arg</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    printf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"容器进程[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">%5d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">] ----进入容器!</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getpid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    sethostname</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"container"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 设置 hostname</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    /**执行/bin/bash */</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    execv</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">container_args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">], container_args);</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    printf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Something's Error!</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    printf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"宿主机进程[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">%5d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">] - 开始一个容器!</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getpid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    /* 调用clone函数 新的进程、挂载、空间*/</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> container_pid </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> clone</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(container_main, container_stack</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">STACK_SIZE,  CLONE_NEWPID </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">|</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> CLONE_NEWUTS </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">|</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> SIGCHLD, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    /* 等待子进程结束 */</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    waitpid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(container_pid, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">NULL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    printf</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"宿主机 - 容器结束!</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行编译并测试</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> container.c</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">gcc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> container.c</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -o</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  container</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">./container</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 宿主机进程[11660] - 开始一个容器!</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 容器进程[    1] ----进入容器!</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看hostname，发现是 container</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">hostname</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看当前进程号，发现是 1号进程</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">echo</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> $$</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code v-pre>proc</code> 对比</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看子进程(打印出来的)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pstree</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 11660</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## container2(11660)───bash(11661)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ll</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /proc/11661/ns/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ll</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /proc/11660/ns/</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Ctrl + d 退出</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="@source/tool/Docker/img/proc对比.jpg">
<p>发现和父进程不同，故<code v-pre>pid</code> 和 <code v-pre>uts</code> 具有不同的命名空间</p>
<p>因此 <strong>Docker</strong> 在启动一个容器的时候，会调用 <strong>Linux Kernel Namespace</strong> 的接口，创建一块虚拟空间，<code v-pre>user</code> 通常相同用一样的，不会新建</p>
<h3 id="_3-2-cgroup-资源限制" tabindex="-1"><a class="header-anchor" href="#_3-2-cgroup-资源限制"><span>3.2 CGroup 资源限制</span></a></h3>
<p><strong>Namespace：</strong> 可以保证容器间的隔离，但无法限制占用资源，若容器中执行 <strong>CPU</strong> 密集型任务，或内存泄漏，此时无法控制，因此需要 <strong>Control Groups</strong></p>
<p><strong>CGroup：</strong> 可以隔离宿主机上的物理资源：<strong>CPU</strong>、内存、磁盘 <strong>I/O</strong>、网络带宽，每一个 <strong>CGroup</strong> 都是一组被相同标准的参数限制的进程，我们只需把容器和进程加入到中指定的 <strong>CGroup</strong> 中</p>
<h3 id="_3-3-unionfs-联合文件系统" tabindex="-1"><a class="header-anchor" href="#_3-3-unionfs-联合文件系统"><span>3.3 UnionFS 联合文件系统</span></a></h3>
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
<div class="language-dockerfile line-numbers-mode" data-highlighter="shiki" data-ext="dockerfile" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">FROM</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ubuntu:15.04</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">COPY</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> . /app</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">RUN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> make /app</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CMD</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> python /app/app.py</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每一行就创建一层，<strong>Dockerfile</strong> 构建出来的镜像运行的容器结构如下</p>
<img src="@source/tool/Docker/img/unionFS结构.jpg">
<p>镜像就是如上一层层堆叠起来的，而且都是只读的，运行时才会在基础层上添加新的可写层（<em>容器层</em>），对于运行中的容器所做的所有更改（<em>CUD操作</em>）都将写入容器层</p>
<h5 id="如何写入" tabindex="-1"><a class="header-anchor" href="#如何写入"><span>如何写入</span></a></h5>
<p><img src="@source/tool/Docker/img/CoW技术.jpg">当写入时</p>
<ul>
<li>容器层用了写时复制 <strong>CoW</strong> 技术（<em>copy-on-write</em>），故所有数据都从 <strong>image</strong> 里读，让容器共享 <strong>image</strong> 的文件系统</li>
<li>写时才去进行复制到自己文件系统上的副本操作，也不会影响到 <strong>image</strong> 的源文件，提高磁盘利用率</li>
</ul>
<h5 id="如何合并层到一起" tabindex="-1"><a class="header-anchor" href="#如何合并层到一起"><span><strong>如何合并层到一起</strong></span></a></h5>
<p><strong>UnionFS</strong> 是为了 <strong>Linux</strong> 系统设计的，用来把多个文件系统联合到同一个挂载点的文件系统服务。能够将<strong>不同文件夹中的层</strong> 联合（<em>Union</em>） 到 <strong>同一个文件夹</strong> 中，整个联合的过程成为联合挂载 <strong>Union Mount</strong></p>
<img src="@source/tool/Docker/img/AUFS实现.jpg">
<div class="hint-container info">
<p class="hint-container-title">说明</p>
<p>上述即 <strong>AUFS</strong> （<em>Docker存储驱动</em>）的一种实现</p>
<p>此外还支持不同驱动 <strong>devicemapper</strong> 、 <strong>overlay2</strong>、 <strong>zfs</strong> 和 <strong>Btrfs</strong> 等... 新版已经使用 <strong>overlay2</strong> 取代了<strong>AUFS</strong>，但在没有 <strong>overlay2</strong> 驱动的机器上，依然使用 <strong>AUFS</strong></p>
</div>
</div></template>


