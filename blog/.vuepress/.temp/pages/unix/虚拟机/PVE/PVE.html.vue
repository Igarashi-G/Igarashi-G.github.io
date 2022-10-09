<template><div><p><strong>PVE</strong> 虚拟机搭建的一些记录</p>
<!-- more -->
<h1 id="proxmox" tabindex="-1"><a class="header-anchor" href="#proxmox" aria-hidden="true">#</a> Proxmox</h1>
<p><a href="https://www.proxmox.com/en" target="_blank" rel="noopener noreferrer">Proxmox<ExternalLinkIcon/></a> 虚拟环境（简称<strong>PVE</strong>）是用于操作来宾操作系统的基于 <strong>Debian Linux</strong> 和 <strong>KVM</strong> 的虚拟化平台，免费提供，也可购买商业支持。</p>
<h5 id="优势" tabindex="-1"><a class="header-anchor" href="#优势" aria-hidden="true">#</a> <strong>优势</strong></h5>
<ul>
<li>几乎可以在 <strong>所有 x86 硬件</strong> 上运行</li>
<li>每台主机 <strong>不到 5 分钟即可</strong> 完成安装</li>
<li><strong>高可用</strong></li>
<li><strong>开源</strong></li>
</ul>
<h5 id="缺陷" tabindex="-1"><a class="header-anchor" href="#缺陷" aria-hidden="true">#</a> <strong>缺陷</strong></h5>
<ul>
<li>使用 <a href="http://corosync.github.io/corosync/" target="_blank" rel="noopener noreferrer">corosync<ExternalLinkIcon/></a> 来管理集群。<strong>最多可以管理或控制 32 个节点</strong>。<code v-pre>Proxmox</code> 集群的虚拟化和存储主机的最大数量为<strong>32 台物理服务器</strong>。</li>
</ul>
<h3 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装" aria-hidden="true">#</a> 1. 安装</h3>
<p><a href="https://pve.proxmox.com/wiki/Installation" target="_blank" rel="noopener noreferrer">安装 wiki<ExternalLinkIcon/></a></p>
<h3 id="_2-显卡驱动踩大坑" tabindex="-1"><a class="header-anchor" href="#_2-显卡驱动踩大坑" aria-hidden="true">#</a> 2. 显卡驱动踩大坑</h3>
<h5 id="下载驱动" tabindex="-1"><a class="header-anchor" href="#下载驱动" aria-hidden="true">#</a> <strong>下载驱动</strong></h5>
<ul>
<li>
<p>先搜索显卡型号</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ lspci <span class="token operator">|</span> <span class="token function">grep</span> VGA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>去 <a href="https://www.nvidia.com/Download/index.aspx?lang=zh-cn" target="_blank" rel="noopener noreferrer">NVDIA 官网<ExternalLinkIcon/></a> 下载对应的显卡驱动 <code v-pre>deb</code> 包</p>
</li>
</ul>
<h5 id="关闭图形化界面" tabindex="-1"><a class="header-anchor" href="#关闭图形化界面" aria-hidden="true">#</a> <strong>关闭图形化界面</strong></h5>
<ul>
<li>
<p>若有图形化界面，比如 <code v-pre>X server</code> 执行如下命令查看</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> X	<span class="token comment"># 若有服务则 kill 掉</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>切换回多用户命令行登录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ init <span class="token number">3</span>

<span class="token comment"># 若显示 Q_Q_Q@_ 之类的乱码，或光标无响应，需要更改如下</span>
$ <span class="token function">vim</span> /etc/systemd/logind.conf

<span class="token punctuation">[</span>Login<span class="token punctuation">]</span>
<span class="token assign-left variable">NAutoVTs</span><span class="token operator">=</span><span class="token number">6</span> <span class="token comment"># 改为 7</span>

<span class="token comment"># 修改grub</span>
$ <span class="token function">vim</span> /etc/default/grub
<span class="token comment"># 添加 如下一行 注释</span>
<span class="token comment">#GRUB_CMDLINE_LINUX_DEFAULT="quiet"</span>
<span class="token comment"># 将 如下一行 赋值为 "text"</span>
<span class="token assign-left variable">GRUB_CMDLINE_LINUX</span><span class="token operator">=</span><span class="token string">"text"</span>
<span class="token comment"># 取消 如下一行 注释</span>
<span class="token assign-left variable">GRUB_TERMINAL</span><span class="token operator">=</span>console

<span class="token comment"># 更新上文修改</span>
$ <span class="token function">update-grub</span>

<span class="token comment"># 设置下次开机系统默认 multi-user 模式</span>
$ systemctl set-default multi-user.target

<span class="token comment"># 再 执行 init3 或 reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="卸载旧驱动" tabindex="-1"><a class="header-anchor" href="#卸载旧驱动" aria-hidden="true">#</a> <strong>卸载旧驱动</strong></h5>
<ul>
<li>
<p>添加如下<strong>黑名单</strong>，禁用核显</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">vim</span> /etc/modprobe.d/blacklist.conf

<span class="token comment"># copy如下内容</span>
blacklist nouveau
blacklist lbm-nouveau
options nouveau <span class="token assign-left variable">modeset</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token builtin class-name">alias</span> nouveau off
<span class="token builtin class-name">alias</span> lbm-nouveau off
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>修改 <code v-pre>pve</code> 的黑名单</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">vim</span> /etc/modprobe.d/pve-blacklist.conf

<span class="token comment"># copy如下内容</span>
<span class="token comment"># blacklist nvidiafb</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>执行命令更改</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ update-initramfs <span class="token parameter variable">-u</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>验证是否已禁用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ lspci<span class="token operator">|</span><span class="token function">grep</span> nouveau

<span class="token comment"># 或是如下, 无返回信息就是禁用了</span>

$ lsmod<span class="token operator">|</span><span class="token function">grep</span> nouveau
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>卸载核显或旧驱动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">apt-get</span> remove nvidia* <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">apt</span> autoremove
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h5 id="下载依赖" tabindex="-1"><a class="header-anchor" href="#下载依赖" aria-hidden="true">#</a> <strong>下载依赖</strong></h5>
<ul>
<li>
<p>先替换 <strong>Debian</strong> 通用源，见 <strong>Linux</strong> 系统换源部分</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Debian 的软件源配置文件是</span>
$ <span class="token function">vim</span> /etc/apt/sources.list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>替换 <strong>pve</strong> 源，不确定版本尽量用官方源</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># pve 镜像默认的 pve 软件源配置文件如下：</span>
$ <span class="token function">vim</span> /etc/apt/sources.list.d/pve-enterprise.list

<span class="token comment"># 备份后将其中内容替换为以下即可：</span>
$ deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian bullseye pve-no-subscription

<span class="token comment"># 更新软件包</span>

$ <span class="token function">apt-get</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>下载一系列依赖</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> dkms build-essential pve-headers pve-headers-x.x.x-x-pve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>如有异常，需单独下载 <code v-pre>linux-header</code>，参考如下：</p>
<ul>
<li>
<p>从网站上下<strong>deb</strong>包，即 <a href="http://download.proxmox.com/debian/pve/dists/bullseye/pve-no-subscription/binary-amd64/" target="_blank" rel="noopener noreferrer">pve-header<ExternalLinkIcon/></a> 中寻找对应版本号</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看header版本</span>
$ pveversion <span class="token parameter variable">-v</span>

<span class="token comment"># 如下表示版本为 -5.13.19-1-pve</span>
pve-kernel-5.13: <span class="token number">7.1</span>-4
pve-kernel-5.13.19-1-pve: <span class="token number">5.13</span>.19-2

<span class="token comment"># 查看软件包中是否有对应版本</span>
$ <span class="token function">apt-cache</span> search pve-headers*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>或直接更新为官方源，先默认下载，然后再指定版本号</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">apt-get</span> <span class="token function">install</span> pve-headers-5.13.19-1-pve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h5 id="_4-安装-nvdia-驱动" tabindex="-1"><a class="header-anchor" href="#_4-安装-nvdia-驱动" aria-hidden="true">#</a> 4. 安装 NVDIA 驱动</h5>
<ul>
<li>
<p>修改可执行权限</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">777</span> NVIDIA-Linux-x86_64-390.147.run
<span class="token function">chown</span> root.root NVIDIA-Linux-x86_64-390.147.run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>运行 <code v-pre>.run</code> 程序</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/NVIDIA-Linux-x86_64-390.147.run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>check</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># nvidia YES!</span>
modprobe nvidia

<span class="token comment"># 检查是否安装成功</span>
nvidia-smi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>收尾</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 开启图形化界面，参考 步骤1 逆着来</span>

<span class="token comment"># 恢复默认启动的图形化</span>
$ <span class="token function">sudo</span> systemctl set-default graphical.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-指南" tabindex="-1"><a class="header-anchor" href="#_3-指南" aria-hidden="true">#</a> 3. 指南</h3>
<p><a href="https://pve.proxmox.com/pve-docs/pve-admin-guide.html" target="_blank" rel="noopener noreferrer">Proxmox VE Administration Guide<ExternalLinkIcon/></a></p>
</div></template>


