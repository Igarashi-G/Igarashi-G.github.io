<template><div><h1 id="vmware-磁盘" tabindex="-1"><a class="header-anchor" href="#vmware-磁盘" aria-hidden="true">#</a> VMware 磁盘</h1>
<h2 id="磁盘热插" tabindex="-1"><a class="header-anchor" href="#磁盘热插" aria-hidden="true">#</a> 磁盘热插</h2>
<p>正常情况下，添加磁盘后需要重启系统才能被内核识别，在/dev/下才有对应的设备号，使用 fdisk -l 才会显示出来。但是有时候不方便重启。此时可以使用下面的方法。</p>
<blockquote>
<p>查看所有设备的总线信息
<code v-pre>ls /sys/class/scsi_host/</code>
确定磁盘在哪条总线上后使用一下命令进行总线扫描,新设备会被添加
<code v-pre>echo &quot;- - -&quot; &gt; /sys/class/scsi_host/host0/scan</code>
当总线很多时使用循环对总线扫描完成热插
<code v-pre>for i in /sys/class/scsi_host/host*/scan;do echo &quot;- - -&quot; &gt;$i;done</code></p>
</blockquote>
<h2 id="磁盘热拔" tabindex="-1"><a class="header-anchor" href="#磁盘热拔" aria-hidden="true">#</a> 磁盘热拔</h2>
<blockquote>
<p>先获取该 scsi 磁盘设备的总线号</p>
<p><code v-pre>lsscsi</code></p>
<p><code v-pre>ls /sys/bus/scsi/drivers/sd/2\:0\:1\:0/</code></p>
<p>在其中有 3 个文件：delete、rescan 和 state。其中 state 记录了该设备是否正在运行中。而 delete 和 rescan 文件则用于删除和重新扫描该设备。</p>
<p><code v-pre>echo 1 &gt; /sys/bus/scsi/drivers/sd/2\:0\:1\:0/delete</code></p>
</blockquote>
<p>作者: 骏马金龙
链接: <a href="https://www.junmajinlong.com/linux/fsmgr_mkpart_mkfs/" target="_blank" rel="noopener noreferrer">https://www.junmajinlong.com/linux/fsmgr_mkpart_mkfs/<ExternalLinkIcon/></a></p>
<p>SIZE is an integer and optional unit (example: 10M is 10 _ 1024 _ 1024). Units are K, M, G, T, P, E, Z, Y (powers of 1024) or KB, MB, ... (powers of 1000).</p>
<h2 id="磁盘占用" tabindex="-1"><a class="header-anchor" href="#磁盘占用" aria-hidden="true">#</a> 磁盘占用</h2>
<p>ps aux | grep <code v-pre>disk name/sda</code></p>
<h2 id="二、无法识别" tabindex="-1"><a class="header-anchor" href="#二、无法识别" aria-hidden="true">#</a> 二、无法识别</h2>
<pre><code>[root ~]# cd /sys/class/scsi_host/
[root scsi_host]# ls
host0  host1  host2
[root scsi_host]# echo &quot;- - -&quot; &gt; host0/scan
</code></pre>
<p>此处应该写 sh 批量循环执行扫描
之后虚拟磁盘即可识别</p>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
</div></template>


