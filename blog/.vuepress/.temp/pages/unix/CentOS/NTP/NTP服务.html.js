import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/unix/CentOS/NTP/NTP服务.html.vue"
const data = JSON.parse("{\"path\":\"/unix/CentOS/NTP/NTP%E6%9C%8D%E5%8A%A1.html\",\"title\":\"网络时区同步\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"网络时区同步\",\"order\":1,\"group\":{\"title\":\"NTP\",\"order\":12},\"description\":\"NTP 一、关于时区与网络校时的通讯协议 1.时区 地球为 360 度 -> 根据 24 小时一自转 -> 分成 24 个时区 -> 每个时区 1 小时即 15 度 已 GMT 为 0 时区（即标准时间，经度为 0 W/E） -> 根据地理位置的经纬度推断中国在东八区 GMT + 8 这也是为什么安装 linux 后可能出现时差 8 小时的原因 GMT...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"网络时区同步\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/unix/CentOS/NTP/NTP%E6%9C%8D%E5%8A%A1.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"网络时区同步\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"NTP 一、关于时区与网络校时的通讯协议 1.时区 地球为 360 度 -> 根据 24 小时一自转 -> 分成 24 个时区 -> 每个时区 1 小时即 15 度 已 GMT 为 0 时区（即标准时间，经度为 0 W/E） -> 根据地理位置的经纬度推断中国在东八区 GMT + 8 这也是为什么安装 linux 后可能出现时差 8 小时的原因 GMT...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":1.04,\"words\":313},\"filePathRelative\":\"unix/CentOS/NTP/NTP服务.md\",\"excerpt\":\"\\n<h3>一、关于时区与网络校时的通讯协议</h3>\\n<h4>1.时区</h4>\\n<p>地球为 360 度 -&gt; 根据 24 小时一自转 -&gt; 分成 24 个时区 -&gt; 每个时区 1 小时即 15 度</p>\\n<p>已 GMT 为 0 时区（即标准时间，经度为 0 W/E） -&gt; 根据地理位置的经纬度推断中国在东八区 GMT + 8</p>\\n<p>这也是为什么安装 linux 后可能出现时差 8 小时的原因</p>\\n<ul>\\n<li>\\n<p>GMT：GMT 时间是以太阳通过格林威治的那一刻来作为计时的标准</p>\\n</li>\\n<li>\\n<p>UTC：最准确的计算应该是使用『原子震荡周期』所计算的物理时钟了 (Atomic Clock, 也被称为原子钟)，<br>\\n这也被定义为标准时间 (International Atomic Time)。而我们常常看见的 UTC 也就是<br>\\nCoordinated Universal Time (协和标准时间)就是利用这种 Atomic Clock 为基准所定义出来的正确时间。<br>\\nUTC 时间与 GMT 时间有差不多 16 分钟的误差呢！</p>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
