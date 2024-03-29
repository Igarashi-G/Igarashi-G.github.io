export const data = JSON.parse("{\"key\":\"v-5086e723\",\"path\":\"/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E5%A4%9A%E8%BF%9B%E7%A8%8B%E7%BC%96%E7%A8%8B.html\",\"title\":\"多进程编程\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"多进程编程\",\"date\":\"2021-01-03T00:00:00.000Z\",\"category\":[\"Python\",\"多进程\"],\"tag\":[\"Python\",\"多进程\",\"subprocess\"],\"summary\":\"Python 基于进程的并行计算 multiprocessing：是一个与 threading 模块类似的包，能提供本地和远程的 并发 操作（若多核那么就是 并行 操作）。它利用子进程来绕过了 GIL 锁 ，适用于 Unix 和 Windows 系统的 CPU(计算)密集型操作（且通常不依赖上次计算结果） 1. 多进程 multiprocessing 1.1\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E5%A4%9A%E8%BF%9B%E7%A8%8B%E7%BC%96%E7%A8%8B.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"五十岚 ▪ 寄\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"多进程编程\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Python\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"多进程\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"subprocess\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-01-03T00:00:00.000Z\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"1. 多进程 multiprocessing\",\"slug\":\"_1-多进程-multiprocessing\",\"link\":\"#_1-多进程-multiprocessing\",\"children\":[{\"level\":3,\"title\":\"1.1 主要功能介绍\",\"slug\":\"_1-1-主要功能介绍\",\"link\":\"#_1-1-主要功能介绍\",\"children\":[]},{\"level\":3,\"title\":\"1.2 Process 类\",\"slug\":\"_1-2-process-类\",\"link\":\"#_1-2-process-类\",\"children\":[]},{\"level\":3,\"title\":\"上下文和启动方法：\",\"slug\":\"上下文和启动方法\",\"link\":\"#上下文和启动方法\",\"children\":[]}]},{\"level\":2,\"title\":\"2. 多进程通讯：队列和管道\",\"slug\":\"_2-多进程通讯-队列和管道\",\"link\":\"#_2-多进程通讯-队列和管道\",\"children\":[]},{\"level\":2,\"title\":\"3. subprocess\",\"slug\":\"_3-subprocess\",\"link\":\"#_3-subprocess\",\"children\":[{\"level\":3,\"title\":\"3.1 关于 os.system os.popen 和 subprocess 的区别\",\"slug\":\"_3-1-关于-os-system-os-popen-和-subprocess-的区别\",\"link\":\"#_3-1-关于-os-system-os-popen-和-subprocess-的区别\",\"children\":[]},{\"level\":3,\"title\":\"3.2 Popen\",\"slug\":\"_3-2-popen\",\"link\":\"#_3-2-popen\",\"children\":[]}]}],\"readingTime\":{\"minutes\":13.9,\"words\":4170},\"filePathRelative\":\"python/语言/多任务编程/多进程编程.md\",\"localizedDate\":\"2021年1月3日\"}")

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
