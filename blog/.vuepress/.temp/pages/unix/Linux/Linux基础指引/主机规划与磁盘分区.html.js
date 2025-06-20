import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/unix/Linux/Linux基础指引/主机规划与磁盘分区.html.vue"
const data = JSON.parse("{\"path\":\"/unix/Linux/Linux%E5%9F%BA%E7%A1%80%E6%8C%87%E5%BC%95/%E4%B8%BB%E6%9C%BA%E8%A7%84%E5%88%92%E4%B8%8E%E7%A3%81%E7%9B%98%E5%88%86%E5%8C%BA.html\",\"title\":\"主机规划与磁盘分区\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"主机规划与磁盘分区\",\"order\":3,\"description\":\"主机规划与磁盘分区 硬件设备在 Linux 中的文件名\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"主机规划与磁盘分区\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/unix/Linux/Linux%E5%9F%BA%E7%A1%80%E6%8C%87%E5%BC%95/%E4%B8%BB%E6%9C%BA%E8%A7%84%E5%88%92%E4%B8%8E%E7%A3%81%E7%9B%98%E5%88%86%E5%8C%BA.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"主机规划与磁盘分区\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"主机规划与磁盘分区 硬件设备在 Linux 中的文件名\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.54,\"words\":163},\"filePathRelative\":\"unix/Linux/Linux基础指引/主机规划与磁盘分区.md\",\"excerpt\":\"\\n<h3>硬件设备在 Linux 中的文件名</h3>\\n<table>\\n<thead>\\n<tr>\\n<th>设备</th>\\n<th>设备在 Linux 内的文件名</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>SCSI/SATA/U 盘磁盘驱动器</td>\\n<td><code>/dev/sd[a-p]</code></td>\\n</tr>\\n<tr>\\n<td>U 盘</td>\\n<td><code>/dev/sd[a-p]</code> （与 SATA 相同）</td>\\n</tr>\\n<tr>\\n<td>Virtio 接口</td>\\n<td><code>/dev/vd[a-p]</code>（用于虚拟机内）</td>\\n</tr>\\n<tr>\\n<td>软盘驱动器</td>\\n<td><code>/dev/fd[0-1]</code></td>\\n</tr>\\n<tr>\\n<td>打印机</td>\\n<td><code>/dev/lp[0-2]</code>（25 针打印机） <code>/dev/usb/lp[0-15]</code>（USB 接口）</td>\\n</tr>\\n<tr>\\n<td>鼠标</td>\\n<td><code>/dev/usb/mouse[0-15]</code> （通用）<code>/dev/psaux</code> （PS/2 接口）<code>/dev/mouse</code> （当前 CDROM/DVDROM）</td>\\n</tr>\\n<tr>\\n<td>CDROM/DVDROM</td>\\n<td><code>/dev/scd[0-1]</code> （通用） <code>/dev/sr[0-1]</code> （通用，CentOS 较常见）<code>/dev/cdrom</code> （当前的 CD-ROM）</td>\\n</tr>\\n<tr>\\n<td>磁带机</td>\\n<td><code>/dev/ht0</code> （IDE 接口） <code>/dev/st0</code> （SATA/SCSI 接口） <code>/dev/tape</code>（当前磁带）</td>\\n</tr>\\n<tr>\\n<td>IDE 硬盘机</td>\\n<td><code>/dev/hd[a-d]</code> （老系统才有）</td>\\n</tr>\\n</tbody>\\n</table>\",\"autoDesc\":true}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
