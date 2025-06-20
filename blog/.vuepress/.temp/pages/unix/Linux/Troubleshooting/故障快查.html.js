import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/unix/Linux/Troubleshooting/故障快查.html.vue"
const data = JSON.parse("{\"path\":\"/unix/Linux/Troubleshooting/%E6%95%85%E9%9A%9C%E5%BF%AB%E6%9F%A5.html\",\"title\":\"快速排错\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"快速排错\",\"date\":\"2021-09-13T00:00:00.000Z\",\"category\":[\"工具\",\"troubleshooting\"],\"tag\":[\"troubleshooting\",\"gdb\"],\"description\":\"快速排查故障、定位问题 1. gdb 对于排查进程、线程故障、死循环、死锁、Hung process 等故障，除了用 strace 跟一下系统调用来猜原因，相比之下用 gdb 来打印 C 的堆栈信息，更加有说服力和说明问题 1.1 安装 首先得有 gdb 才能查 1.2 运行 全新启动一个 Python 程序并进行调试，可以采用交互式方式， 先启动 g...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"快速排错\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-09-13T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/unix/Linux/Troubleshooting/%E6%95%85%E9%9A%9C%E5%BF%AB%E6%9F%A5.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"快速排错\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"快速排查故障、定位问题 1. gdb 对于排查进程、线程故障、死循环、死锁、Hung process 等故障，除了用 strace 跟一下系统调用来猜原因，相比之下用 gdb 来打印 C 的堆栈信息，更加有说服力和说明问题 1.1 安装 首先得有 gdb 才能查 1.2 运行 全新启动一个 Python 程序并进行调试，可以采用交互式方式， 先启动 g...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"gdb\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"troubleshooting\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-09-13T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":3.92,\"words\":1176},\"filePathRelative\":\"unix/Linux/Troubleshooting/故障快查.md\",\"excerpt\":\"<p>快速排查故障、定位问题</p>\\n<!--more-->\\n<h2>1. gdb</h2>\\n<p>对于排查进程、线程故障、死循环、死锁、Hung process 等故障，除了用 <a href=\\\"https://man7.org/linux/man-pages/man1/strace.1.html\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">strace</a> 跟一下系统调用来猜原因，相比之下用 <strong>gdb</strong> 来打印 <strong>C</strong> 的堆栈信息，更加有说服力和说明问题</p>\\n<h3>1.1 安装</h3>\",\"autoDesc\":true}")
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
