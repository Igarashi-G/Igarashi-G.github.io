<template><div><h3 id="_1-uus-部分说明" tabindex="-1"><a class="header-anchor" href="#_1-uus-部分说明" aria-hidden="true">#</a> 1. UUS 部分说明</h3>
<p>这里 N：M 是 uraid 内数据 chunk 和校验 chunk 的比例。
K 是 URAID 对节点失效容忍度的要求。K 不能大于 M，通常选择是 K=0、1、M。
K 选 0 意味着有任意节点失效时，uraid 将不可访问，如果节点不能恢复或修复，则该
uraid 数据将丢失。
K 选 1 意味着同时有且仅有一个节点失效时，uraid 数据仍可正常读写；多于一个节点
同时失效时，情况同上。
K 选 M 意味着 uraid 可以接受至多 M 各节点同时失效，数据读写能正常进行；多于 M
个节点同时失效时，情况同上。</p>
<p>K 的选择还受到集群内节点数量的限制，如果节点数量小于（N+M），那么通常只能选
择 0；否则可以选 M，因此，实际部署时，通常集群的节点数量应该大于 N+M，如 N+M+1
或更多。</p>
<ul>
<li>
<p>创建单个 uraid 的例子: '</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ucli uraid create test-pool test_uraid_1 4000G <span class="token number">256</span> <span class="token number">8</span> <span class="token number">2</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>CAPACITY</strong> 默认是整型，若输入浮点型，则直接取整</li>
<li><strong>URAID-NAME</strong> 设定为 <code v-pre>RANDOM</code> 时，系统会随机选择一个命名，在脚本中反
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
<h3 id="_2-使用-uus-虚拟机的限制" tabindex="-1"><a class="header-anchor" href="#_2-使用-uus-虚拟机的限制" aria-hidden="true">#</a> 2. 使用 UUS 虚拟机的限制</h3>
<h5 id="_2-1-不使用-uus" tabindex="-1"><a class="header-anchor" href="#_2-1-不使用-uus" aria-hidden="true">#</a> 2. -1 不使用 UUS：</h5>
<blockquote>
<p>既然不好用，为什么要用呢？</p>
</blockquote>
<ul>
<li>
<p><strong>卸载命令</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 干掉服务</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">`</span><span class="token function">ls</span> /usr/lib/uraid/scripts/init/<span class="token variable">`</span></span><span class="token punctuation">;</span><span class="token keyword">do</span> systemctl disable <span class="token parameter variable">--now</span> <span class="token variable">$i</span><span class="token punctuation">;</span><span class="token keyword">done</span>

<span class="token comment"># 干掉uraid</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /usr/lib/uraid<span class="token punctuation">;</span><span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/sysconfig/uraid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<hr>
<p>由于 <code v-pre>uus</code> 在虚拟机上运行有诸多的限制，在此将 uus 虚拟机的限制在此列出：</p>
<h5 id="_2-1-serial-number" tabindex="-1"><a class="header-anchor" href="#_2-1-serial-number" aria-hidden="true">#</a> 2.1 serial number</h5>
<ul>
<li>
<p>虚拟的磁盘必须有 serial number，否则 uus 无法识别：</p>
<ul>
<li>
<p>重新生成 uuid (虚拟机克隆模式)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>uuidgen <span class="token operator">></span> /etc/machine-id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h5 id="_2-2-资源占用" tabindex="-1"><a class="header-anchor" href="#_2-2-资源占用" aria-hidden="true">#</a> 2.2 资源占用</h5>
<ul>
<li>
<p>降低 uus 资源占用(虚拟机)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /usr/lib/systemd/system/unfs-server.service  +32
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/nfsd <span class="token parameter variable">-V</span> <span class="token number">3</span> <span class="token parameter variable">-p</span> <span class="token number">3000</span> <span class="token number">3500</span> 把3500改小点 （3000，3500）都改10

systemctl daemon-reload
systemctl stop unfs-server
systemctl start unfs-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>关闭磁盘检测（虚拟机）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">touch</span> /etc/sysconfig/uraid/disable-exp-chk-baddisk
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/sysconfig/uraid/enable-disk-check
<span class="token function">touch</span> /etc/sysconfig/uraid/enable-uvol-vm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>停掉所有 uus 服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ucli svc stop all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h5 id="_2-3-许可" tabindex="-1"><a class="header-anchor" href="#_2-3-许可" aria-hidden="true">#</a> 2.3 许可</h5>
<ul>
<li>
<p>删除 sn，重新生成新的 sn(虚拟机)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/sysconfig/uraid/sn
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/sysconfig/uraid/key
systemctl restart v-meta
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>获取 key</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 1.smb共享 \\172.18.50.50\lic 目录下</span>
username: sn password: sn

<span class="token comment"># 2.获取节点的sn号</span>
/etc/sysconfig/uraid/sn

<span class="token comment"># 3.将sn号重命名为sn+ip的形式，上传至指定目录</span>

<span class="token comment"># 4.目录检测到文件变动后自动生成文件名为key....sn+ip 的key文件，然后上传至如下路径</span>
/etc/sysconfig/uraid/key

<span class="token comment"># 5.重启v-meta服务</span>
$ systemctl restart v-meta

<span class="token comment">### 其他节点重复上述步骤</span>

<span class="token comment"># 6.检测key文件是否生效</span>
$ ucli sysconfig license-show
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>更新 <code v-pre>uraid</code> 的 <code v-pre>udev</code> 文件（1202 版本已更新）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span> /etc/udev/rules.d/90-umd.rules</span>

SUBSYSTEM!="block", GOTO="umd_end"

# handle umd arrays
KERNEL!="umd_d*", GOTO="umd_end"

#IMPORT{program}="/sbin/blkid -o udev -p %N"
IMPORT{builtin}="blkid"
OPTIONS+="link_priority=100"
OPTIONS+="watch"
ENV{ID_FS_USAGE}=="filesystem|other|crypto", ENV{ID_FS_UUID_ENC}=="?*", SYMLINK+="disk/by-uuid/<span class="token variable">$env</span>{ID_FS_UUID_ENC}"
ENV{ID_FS_USAGE}=="filesystem|other", ENV{ID_FS_LABEL_ENC}=="?*", SYMLINK+="disk/by-label/<span class="token variable">$env</span>{ID_FS_LABEL_ENC}"

LABEL="umd_end"

EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="_2-4-系统盘文件系统限制" tabindex="-1"><a class="header-anchor" href="#_2-4-系统盘文件系统限制" aria-hidden="true">#</a> 2.4 系统盘文件系统限制</h5>
<ul>
<li>
<p>当系统盘为 xfs 文件系统时，添加指定行 <code v-pre>return 0</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span>  /usr/lib/uraid/scripts/drivers.shell +174


<span class="token number">171</span>         <span class="token comment">#insmod openfile-by-ino drivers</span>
<span class="token number">172</span>         modprobe xfs
<span class="token number">173</span>         modprobe nfs
<span class="token number">174</span>         insmod /usr/lib/uraid/drivers/u_getpath.ko
		   <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token number">175</span>         <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token number">0</span> <span class="token parameter variable">-eq</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>lsmod <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-c</span> <span class="token string">'^u_getpath'</span><span class="token variable">)</span></span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
<span class="token number">176</span>                 eecho <span class="token string">"Setup u_getpath driver FAIL."</span>
<span class="token number">177</span>                 <span class="token builtin class-name">return</span> <span class="token number">1</span>
<span class="token number">178</span>         <span class="token keyword">fi</span>


systemctl start uraid-driver
systemctl restart v-meta
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


