<template><div><p>虚拟机环境下使用 <strong>UUS</strong> 排错及说明</p>
<!-- more -->
<h3 id="_1-uus-部分说明" tabindex="-1"><a class="header-anchor" href="#_1-uus-部分说明"><span>1. UUS 部分说明</span></a></h3>
<p>这里 N：M 是 uraid 内数据 chunk 和校验 chunk 的比例。<br>
K 是 URAID 对节点失效容忍度的要求。K 不能大于 M，通常选择是 K=0、1、M。<br>
K 选 0 意味着有任意节点失效时，uraid 将不可访问，如果节点不能恢复或修复，则该<br>
uraid 数据将丢失。<br>
K 选 1 意味着同时有且仅有一个节点失效时，uraid 数据仍可正常读写；多于一个节点<br>
同时失效时，情况同上。<br>
K 选 M 意味着 uraid 可以接受至多 M 各节点同时失效，数据读写能正常进行；多于 M<br>
个节点同时失效时，情况同上。</p>
<p>K 的选择还受到集群内节点数量的限制，如果节点数量小于（N+M），那么通常只能选<br>
择 0；否则可以选 M，因此，实际部署时，通常集群的节点数量应该大于 N+M，如 N+M+1<br>
或更多。</p>
<ul>
<li>
<p>创建单个 uraid 的例子: '</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ucli</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uraid</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test-pool</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> test_uraid_1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 4000G</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 256</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 8</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong>CAPACITY</strong> 默认是整型，若输入浮点型，则直接取整</li>
<li><strong>URAID-NAME</strong> 设定为 <code v-pre>RANDOM</code> 时，系统会随机选择一个命名，在脚本中反<br>
复创建多个 <code v-pre>uraid</code> 时，可以利用这个特性</li>
</ul>
</li>
</ul>
<p><strong>URAID</strong> 创建后，节点中会有对应的 <code v-pre>/dev/mdX</code> 设备 ( <code v-pre>X</code> 对应 <code v-pre>uraid</code> 的 <strong>ID</strong>，集群内唯一）可以立即使用</p>
<blockquote>
<p><strong>TIPS</strong>：</p>
<ul>
<li>
<p>资源池最小磁盘数量是 <code v-pre>N + M</code> ，资源池的最小节点数量是<code v-pre>((N + M) * K / M）</code></p>
<ul>
<li>
<p>当 <strong>K</strong> 是 0 时，需要一个节点即可</p>
</li>
<li>
<p><strong>K</strong> 为 65000 时，则算法只选择资源池内本节点的磁盘，这意味着本节点离线后，该 <code v-pre>uraid</code> 无法被其它节点接管。</p>
</li>
</ul>
</li>
<li>
<p>使用中文名称创建 uraid 也是支持的，但需要终端使用 utf-8 编码，否则创建可 UUS 虚拟机使用参考指南</p>
</li>
</ul>
</blockquote>
<h3 id="_2-使用-uus-虚拟机的限制" tabindex="-1"><a class="header-anchor" href="#_2-使用-uus-虚拟机的限制"><span>2. 使用 UUS 虚拟机的限制</span></a></h3>
<h5 id="_2-1-不使用-uus" tabindex="-1"><a class="header-anchor" href="#_2-1-不使用-uus"><span>2. -1 不使用 UUS：</span></a></h5>
<blockquote>
<p>既然不好用，为什么要用呢？所以卸载！！</p>
</blockquote>
<ul>
<li>
<p><strong>卸载命令</strong>：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 干掉服务</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> i</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> `</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ls</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/lib/uraid/scripts/init/`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">do</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> systemctl disable --now </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$i</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">done</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 干掉uraid</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -rf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/lib/uraid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -rf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/sysconfig/uraid</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<hr>
<p>由于 <strong>uus</strong> 在虚拟机上运行有诸多的限制，在此将 <strong>uus</strong> 虚拟机的限制在此列出：</p>
<h5 id="_2-1-serial-number" tabindex="-1"><a class="header-anchor" href="#_2-1-serial-number"><span>2.1 serial number</span></a></h5>
<ul>
<li>
<p>虚拟的磁盘必须有 <strong>serial number</strong>，否则 <strong>uus</strong> 无法识别：</p>
<ul>
<li>
<p>重新生成 <code v-pre>uuid</code> (<em>虚拟机克隆模式</em>)</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">uuidgen</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> > </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/etc/machine-id</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h5 id="_2-2-资源占用" tabindex="-1"><a class="header-anchor" href="#_2-2-资源占用"><span>2.2 资源占用</span></a></h5>
<ul>
<li>
<p>降低 uus 资源占用(虚拟机)</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/lib/systemd/system/unfs-server.service</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  +32</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ExecStart</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/usr/bin/nfsd</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> -V</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 3000</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 3500</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 把3500改小点</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> （3000，3500）都改10</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> stop</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> unfs-server</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> start</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> unfs-server</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>关闭磁盘检测（虚拟机）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">touch</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/sysconfig/uraid/disable-exp-chk-baddisk</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/sysconfig/uraid/enable-disk-check</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">touch</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/sysconfig/uraid/enable-uvol-vm</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>停掉所有 uus 服务</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ucli</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> svc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> stop</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> all</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
<h5 id="_2-3-许可" tabindex="-1"><a class="header-anchor" href="#_2-3-许可"><span>2.3 许可</span></a></h5>
<ul>
<li>
<p>删除 <strong>sn</strong>，重新生成新的 <strong>sn</strong>(<em>虚拟机</em>)</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/sysconfig/uraid/sn</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/sysconfig/uraid/key</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> v-meta</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>获取 <strong>key</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 1.smb共享 \\172.18.50.50\lic 目录下</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">username:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sn</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> password:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sn</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 2.获取节点的sn号</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">/etc/sysconfig/uraid/sn</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 3.将sn号重命名为sn+ip的形式，上传至指定目录</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 4.目录检测到文件变动后自动生成文件名为key....sn+ip 的key文件，然后上传至如下路径</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">/etc/sysconfig/uraid/key</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 5.重启v-meta服务</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> v-meta</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">### 其他节点重复上述步骤</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 6.检测key文件是否生效</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ucli</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> sysconfig</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> license-show</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>更新 <code v-pre>uraid</code> 的 <code v-pre>udev</code> 文件（<strong>1202</strong> 版本已更新）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> > </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">/etc/udev/rules.d/90-umd.rules</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">SUBSYSTEM!="block", GOTO="umd_end"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"># handle umd arrays</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">KERNEL!="umd_d*", GOTO="umd_end"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">#IMPORT{program}="/sbin/blkid -o udev -p %N"</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">IMPORT{builtin}="blkid"</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">OPTIONS+="link_priority=100"</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">OPTIONS+="watch"</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ENV{ID_FS_USAGE}=="filesystem|other|crypto", ENV{ID_FS_UUID_ENC}=="?*", SYMLINK+="disk/by-uuid/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$env</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">{ID_FS_UUID_ENC}"</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ENV{ID_FS_USAGE}=="filesystem|other", ENV{ID_FS_LABEL_ENC}=="?*", SYMLINK+="disk/by-label/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">$env</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">{ID_FS_LABEL_ENC}"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">LABEL="umd_end"</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="_2-4-系统盘文件系统限制" tabindex="-1"><a class="header-anchor" href="#_2-4-系统盘文件系统限制"><span>2.4 系统盘文件系统限制</span></a></h5>
<ul>
<li>
<p>当系统盘为 xfs 文件系统时，添加指定行 <code v-pre>return 0</code></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  /usr/lib/uraid/scripts/drivers.shell</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> +174</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">171</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">         #insmod openfile-by-ino drivers</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">172</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">         modprobe</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> xfs</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">173</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">         modprobe</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nfs</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">174</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">         insmod</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /usr/lib/uraid/drivers/u_getpath.ko</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">175</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">         if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -eq</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "$(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">lsmod</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '^u_getpath')"</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">; </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">then</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">176</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                 eecho</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Setup u_getpath driver FAIL."</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">177</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                 return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">178</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">         fi</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> start</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> uraid-driver</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> v-meta</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


