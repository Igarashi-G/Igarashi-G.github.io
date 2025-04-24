<template><div><h1 id="主机规划与磁盘分区" tabindex="-1"><a class="header-anchor" href="#主机规划与磁盘分区"><span>主机规划与磁盘分区</span></a></h1>
<h3 id="硬件设备在-linux-中的文件名" tabindex="-1"><a class="header-anchor" href="#硬件设备在-linux-中的文件名"><span>硬件设备在 Linux 中的文件名</span></a></h3>
<table>
<thead>
<tr>
<th>设备</th>
<th>设备在 Linux 内的文件名</th>
</tr>
</thead>
<tbody>
<tr>
<td>SCSI/SATA/U 盘磁盘驱动器</td>
<td><code v-pre>/dev/sd[a-p]</code></td>
</tr>
<tr>
<td>U 盘</td>
<td><code v-pre>/dev/sd[a-p]</code> （与 SATA 相同）</td>
</tr>
<tr>
<td>Virtio 接口</td>
<td><code v-pre>/dev/vd[a-p]</code>（用于虚拟机内）</td>
</tr>
<tr>
<td>软盘驱动器</td>
<td><code v-pre>/dev/fd[0-1]</code></td>
</tr>
<tr>
<td>打印机</td>
<td><code v-pre>/dev/lp[0-2]</code>（25 针打印机） <code v-pre>/dev/usb/lp[0-15]</code>（USB 接口）</td>
</tr>
<tr>
<td>鼠标</td>
<td><code v-pre>/dev/usb/mouse[0-15]</code> （通用）<code v-pre>/dev/psaux</code> （PS/2 接口）<code v-pre>/dev/mouse</code> （当前 CDROM/DVDROM）</td>
</tr>
<tr>
<td>CDROM/DVDROM</td>
<td><code v-pre>/dev/scd[0-1]</code> （通用） <code v-pre>/dev/sr[0-1]</code> （通用，CentOS 较常见）<code v-pre>/dev/cdrom</code> （当前的 CD-ROM）</td>
</tr>
<tr>
<td>磁带机</td>
<td><code v-pre>/dev/ht0</code> （IDE 接口） <code v-pre>/dev/st0</code> （SATA/SCSI 接口） <code v-pre>/dev/tape</code>（当前磁带）</td>
</tr>
<tr>
<td>IDE 硬盘机</td>
<td><code v-pre>/dev/hd[a-d]</code> （老系统才有）</td>
</tr>
</tbody>
</table>
</div></template>


