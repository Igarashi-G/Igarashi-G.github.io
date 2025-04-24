<template><div><p><strong>PVE</strong> 虚拟机搭建的一些记录</p>
<!-- more -->
<h1 id="proxmox" tabindex="-1"><a class="header-anchor" href="#proxmox"><span>Proxmox</span></a></h1>
<p><a href="https://www.proxmox.com/en" target="_blank" rel="noopener noreferrer">Proxmox</a> 虚拟环境（简称<strong>PVE</strong>）是用于操作来宾操作系统的基于 <strong>Debian Linux</strong> 和 <strong>KVM</strong> 的虚拟化平台，免费提供，也可购买商业支持。</p>
<h5 id="优势" tabindex="-1"><a class="header-anchor" href="#优势"><span><strong>优势</strong></span></a></h5>
<ul>
<li>几乎可以在 <strong>所有 x86 硬件</strong> 上运行</li>
<li>每台主机 <strong>不到 5 分钟即可</strong> 完成安装</li>
<li><strong>高可用</strong></li>
<li><strong>开源</strong></li>
</ul>
<h5 id="缺陷" tabindex="-1"><a class="header-anchor" href="#缺陷"><span><strong>缺陷</strong></span></a></h5>
<ul>
<li>使用 <a href="http://corosync.github.io/corosync/" target="_blank" rel="noopener noreferrer">corosync</a> 来管理集群。<strong>最多可以管理或控制 32 个节点</strong>。<code v-pre>Proxmox</code> 集群的虚拟化和存储主机的最大数量为<strong>32 台物理服务器</strong>。</li>
</ul>
<h3 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装"><span>1. 安装</span></a></h3>
<p><a href="https://pve.proxmox.com/wiki/Installation" target="_blank" rel="noopener noreferrer">安装 wiki</a></p>
<h3 id="_2-显卡驱动踩大坑" tabindex="-1"><a class="header-anchor" href="#_2-显卡驱动踩大坑"><span>2. 显卡驱动踩大坑</span></a></h3>
<h5 id="下载驱动" tabindex="-1"><a class="header-anchor" href="#下载驱动"><span><strong>下载驱动</strong></span></a></h5>
<ul>
<li>
<p>先搜索显卡型号</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lspci</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> VGA</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>去 <a href="https://www.nvidia.com/Download/index.aspx?lang=zh-cn" target="_blank" rel="noopener noreferrer">NVDIA 官网</a> 下载对应的显卡驱动 <code v-pre>deb</code> 包</p>
</li>
</ul>
<h5 id="关闭图形化界面" tabindex="-1"><a class="header-anchor" href="#关闭图形化界面"><span><strong>关闭图形化界面</strong></span></a></h5>
<ul>
<li>
<p>若有图形化界面，比如 <code v-pre>X server</code> 执行如下命令查看</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ps</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> aux</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> X</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">	# 若有服务则 kill 掉</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>切换回多用户命令行登录：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> init</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 若显示 Q_Q_Q@_ 之类的乱码，或光标无响应，需要更改如下</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/systemd/logind.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[Login]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">NAutoVTs</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">6</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> # 改为 7</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 修改grub</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/default/grub</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 添加 如下一行 注释</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#GRUB_CMDLINE_LINUX_DEFAULT="quiet"</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 将 如下一行 赋值为 "text"</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">GRUB_CMDLINE_LINUX</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"text"</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 取消 如下一行 注释</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">GRUB_TERMINAL</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">console</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 更新上文修改</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> update-grub</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 设置下次开机系统默认 multi-user 模式</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set-default</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> multi-user.target</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 再 执行 init3 或 reboot</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="卸载旧驱动" tabindex="-1"><a class="header-anchor" href="#卸载旧驱动"><span><strong>卸载旧驱动</strong></span></a></h5>
<ul>
<li>
<p>添加如下<strong>黑名单</strong>，禁用核显</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/modprobe.d/blacklist.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># copy如下内容</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">blacklist</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nouveau</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">blacklist</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lbm-nouveau</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">options</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nouveau</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> modeset=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">alias</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nouveau</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> off</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">alias</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lbm-nouveau</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> off</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>修改 <code v-pre>pve</code> 的黑名单</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/modprobe.d/pve-blacklist.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># copy如下内容</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># blacklist nvidiafb</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>执行命令更改</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> update-initramfs</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -u</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>验证是否已禁用</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lspci</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nouveau</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 或是如下, 无返回信息就是禁用了</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> lsmod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nouveau</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>卸载核显或旧驱动</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> remove</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nvidia</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x26;&#x26; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> autoremove</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<h5 id="下载依赖" tabindex="-1"><a class="header-anchor" href="#下载依赖"><span><strong>下载依赖</strong></span></a></h5>
<ul>
<li>
<p>先替换 <strong>Debian</strong> 通用源，见 <strong>Linux</strong> 系统换源部分</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Debian 的软件源配置文件是</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/apt/sources.list</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>替换 <strong>pve</strong> 源，不确定版本尽量用官方源</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># pve 镜像默认的 pve 软件源配置文件如下：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/apt/sources.list.d/pve-enterprise.list</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 备份后将其中内容替换为以下即可：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> deb</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> bullseye</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pve-no-subscription</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 更新软件包</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> update</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>下载一系列依赖</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dkms</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> build-essential</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pve-headers</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pve-headers-x.x.x-x-pve</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>如有异常，需单独下载 <code v-pre>linux-header</code>，参考如下：</p>
<ul>
<li>
<p>从网站上下<strong>deb</strong>包，即 <a href="http://download.proxmox.com/debian/pve/dists/bullseye/pve-no-subscription/binary-amd64/" target="_blank" rel="noopener noreferrer">pve-header</a> 中寻找对应版本号</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看header版本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pveversion</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -v</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 如下表示版本为 -5.13.19-1-pve</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pve-kernel-5.13:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 7.1-4</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pve-kernel-5.13.19-1-pve:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 5.13.19-2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看软件包中是否有对应版本</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-cache</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> search</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pve-headers</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>或直接更新为官方源，先默认下载，然后再指定版本号</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pve-headers-5.13.19-1-pve</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h5 id="_4-安装-nvdia-驱动" tabindex="-1"><a class="header-anchor" href="#_4-安装-nvdia-驱动"><span>4. 安装 NVDIA 驱动</span></a></h5>
<ul>
<li>
<p>修改可执行权限</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">chmod</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 777</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> NVIDIA-Linux-x86_64-390.147.run</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">chown</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> root.root</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> NVIDIA-Linux-x86_64-390.147.run</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>运行 <code v-pre>.run</code> 程序</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">/NVIDIA-Linux-x86_64-390.147.run</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>check</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># nvidia YES!</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">modprobe</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nvidia</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 检查是否安装成功</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nvidia-smi</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>收尾</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 开启图形化界面，参考 步骤1 逆着来</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 恢复默认启动的图形化</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set-default</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> graphical.target</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-指南" tabindex="-1"><a class="header-anchor" href="#_3-指南"><span>3. 指南</span></a></h3>
<p><a href="https://pve.proxmox.com/pve-docs/pve-admin-guide.html" target="_blank" rel="noopener noreferrer">Proxmox VE Administration Guide</a></p>
</div></template>


