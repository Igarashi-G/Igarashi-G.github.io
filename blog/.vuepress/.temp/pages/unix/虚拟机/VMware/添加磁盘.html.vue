<template><div><h1 id="vmware-磁盘" tabindex="-1"><a class="header-anchor" href="#vmware-磁盘" aria-hidden="true">#</a> VMware 磁盘</h1>
<h3 id="_1-磁盘热插" tabindex="-1"><a class="header-anchor" href="#_1-磁盘热插" aria-hidden="true">#</a> 1. 磁盘热插</h3>
<p>正常情况下，添加磁盘后 <strong>需要重启系统</strong> 才能被内核识别，在 <code v-pre>/dev/</code> 下才有对应的设备号</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用如下命令，才会显示</span>
$ <span class="token function">fdisk</span> <span class="token parameter variable">-l</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是有时候不方便重启。可使用如下方法</p>
<ol>
<li>
<p>查看所有设备的总线信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> /sys/class/scsi_host/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>确定磁盘在哪条总线上后使用一下命令进行总线扫描,新设备会被添加</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">"- - -"</span> <span class="token operator">></span> /sys/class/scsi_host/host0/scan
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>当总线很多时使用循环对总线扫描完成热插</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> /sys/class/scsi_host/host*/scan<span class="token punctuation">;</span><span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token string">"- - -"</span> <span class="token operator">></span><span class="token variable">$i</span><span class="token punctuation">;</span><span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h3 id="_2-磁盘热拔" tabindex="-1"><a class="header-anchor" href="#_2-磁盘热拔" aria-hidden="true">#</a> 2. 磁盘热拔</h3>
<p>先获取该 <strong>scsi</strong> 磁盘设备的总线号</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ lsscsi

<span class="token function">ls</span> /sys/bus/scsi/drivers/sd/2<span class="token punctuation">\</span>:0<span class="token punctuation">\</span>:1<span class="token punctuation">\</span>:0/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在其中有 <strong>3</strong> 个文件：<strong>delete</strong>、<strong>rescan</strong> 和 <strong>state</strong></p>
<ul>
<li><strong>state：</strong> 记录了该设备是否正在运行中</li>
<li><strong>delete 和 rescan：</strong> 用于删除和重新扫描该设备</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token number">1</span> <span class="token operator">></span> /sys/bus/scsi/drivers/sd/2<span class="token punctuation">\</span>:0<span class="token punctuation">\</span>:1<span class="token punctuation">\</span>:0/delete
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a href="https://www.junmajinlong.com/linux/fsmgr_mkpart_mkfs/" target="_blank" rel="noopener noreferrer">参考<ExternalLinkIcon/></a></p>
<blockquote>
<p>SIZE is an integer and optional unit (example: 10M is 10 _ 1024 _ 1024). Units are K, M, G, T, P, E, Z, Y (powers of 1024) or KB, MB, ... (powers of 1000).</p>
</blockquote>
<h3 id="_3-磁盘占用" tabindex="-1"><a class="header-anchor" href="#_3-磁盘占用" aria-hidden="true">#</a> 3. 磁盘占用</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> disk name/sda
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-无法识别" tabindex="-1"><a class="header-anchor" href="#_4-无法识别" aria-hidden="true">#</a> 4. 无法识别</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /sys/class/scsi_host/
<span class="token punctuation">[</span>root scsi_host<span class="token punctuation">]</span><span class="token comment"># ls</span>
host0  host1  host2

<span class="token punctuation">[</span>root scsi_host<span class="token punctuation">]</span><span class="token comment"># echo "- - -" > host0/scan </span>
<span class="token comment"># 改为 sh 批量循环执行扫描，之后虚拟磁盘即可识别</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


