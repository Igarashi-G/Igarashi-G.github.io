import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/unix/Linux/Troubleshooting/备忘命令.html.vue"
const data = JSON.parse("{\"path\":\"/unix/Linux/Troubleshooting/%E5%A4%87%E5%BF%98%E5%91%BD%E4%BB%A4.html\",\"title\":\"Linux 命令速查\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Linux 命令速查\",\"date\":\"2020-10-16T00:00:00.000Z\",\"category\":[\"Linux\",\"命令\"],\"tag\":[\"Linux\",\"命令\"],\"description\":\"常用命令备忘速查 netstat -ntlp 场景：出现 http500 时，利用 netstat -tnlp 来排查 ps -ef | -aux 场景：查看进程，显示状态 chmod：改权限 场景：更改无法访问的文件权限（修改某个目录或文件的访问权限） chown：改组 场景：更改文件的用户名和用户组 more & less & cat ssh SS...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Linux 命令速查\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2020-10-16T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/unix/Linux/Troubleshooting/%E5%A4%87%E5%BF%98%E5%91%BD%E4%BB%A4.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Linux 命令速查\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"常用命令备忘速查 netstat -ntlp 场景：出现 http500 时，利用 netstat -tnlp 来排查 ps -ef | -aux 场景：查看进程，显示状态 chmod：改权限 场景：更改无法访问的文件权限（修改某个目录或文件的访问权限） chown：改组 场景：更改文件的用户名和用户组 more & less & cat ssh SS...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"命令\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Linux\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2020-10-16T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":4.43,\"words\":1329},\"filePathRelative\":\"unix/Linux/Troubleshooting/备忘命令.md\",\"excerpt\":\"<p>常用命令备忘速查</p>\\n<!--more-->\\n<h5>netstat -ntlp</h5>\\n<p>场景：出现 http500 时，利用 netstat -tnlp 来排查</p>\\n<pre><code>-n或--numeric：直接使用ip地址，而不通过域名服务器\\n-t或--tcp：显示TCP传输协议的连线状况\\n-l或--listening：显示监控中的服务器的Socket\\n-p或--programs：显示正在使用Socket的程序识别码和程序名称（显示进程pid，配合kill杀死）\\n</code></pre>\\n<h4>ps -ef | -aux</h4>\\n<p>场景：查看进程，显示状态</p>\",\"autoDesc\":true}")
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
