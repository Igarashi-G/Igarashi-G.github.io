export const data = JSON.parse("{\"key\":\"v-267ac7e0\",\"path\":\"/unix/%E8%99%9A%E6%8B%9F%E6%9C%BA/VMware/%E6%B7%BB%E5%8A%A0%E7%A3%81%E7%9B%98.html\",\"title\":\"添加磁盘\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"添加磁盘\",\"date\":\"2021-03-12T00:00:00.000Z\",\"category\":[\"虚拟机\"],\"tag\":[\"VMware\"],\"summary\":\"VMware 磁盘 1. 磁盘热插 正常情况下，添加磁盘后 需要重启系统 才能被内核识别，在 /dev/ 下才有对应的设备号 但是有时候不方便重启。可使用如下方法 1. 查看所有设备的总线信息 2. 确定磁盘在哪条总线上后使用一下命令进行总线扫描,新设备会被添加 3. 当总线很多时使用循环对总线扫描完成热插 2. 磁盘热拔 先获取该 scsi 磁盘设备的总线\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/unix/%E8%99%9A%E6%8B%9F%E6%9C%BA/VMware/%E6%B7%BB%E5%8A%A0%E7%A3%81%E7%9B%98.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"五十岚 ▪ 寄\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"添加磁盘\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"VMware\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-03-12T00:00:00.000Z\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":3,\"title\":\"1. 磁盘热插\",\"slug\":\"_1-磁盘热插\",\"link\":\"#_1-磁盘热插\",\"children\":[]},{\"level\":3,\"title\":\"2. 磁盘热拔\",\"slug\":\"_2-磁盘热拔\",\"link\":\"#_2-磁盘热拔\",\"children\":[]},{\"level\":3,\"title\":\"3. 磁盘占用\",\"slug\":\"_3-磁盘占用\",\"link\":\"#_3-磁盘占用\",\"children\":[]},{\"level\":3,\"title\":\"4. 无法识别\",\"slug\":\"_4-无法识别\",\"link\":\"#_4-无法识别\",\"children\":[]}],\"readingTime\":{\"minutes\":1.19,\"words\":357},\"filePathRelative\":\"unix/虚拟机/VMware/添加磁盘.md\",\"localizedDate\":\"2021年3月12日\"}")

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
