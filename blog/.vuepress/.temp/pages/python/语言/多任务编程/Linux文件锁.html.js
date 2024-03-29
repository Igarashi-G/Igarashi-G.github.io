export const data = JSON.parse("{\"key\":\"v-47f320ce\",\"path\":\"/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/Linux%E6%96%87%E4%BB%B6%E9%94%81.html\",\"title\":\"Linux文件锁\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Linux文件锁\",\"date\":\"2021-06-27T00:00:00.000Z\",\"category\":[\"Python\",\"文件锁\"],\"tag\":[\"Python\",\"文件锁\"],\"summary\":\"Linux 下 Python 文件锁的使用 在并发情况下，多个线程/进程池 对同一文件进行读写，如 grpc 线程池收到多个请求同时改写一份文件的情况， 此时需要用到 fcntl 来对文件的读写加锁 Linux 中的文件锁 在 Linux 中，flock 和 fcntl 都是系统调用，而 lockf 则是库函数， lockf 则是 fcntl 的封装，因此 \",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/Linux%E6%96%87%E4%BB%B6%E9%94%81.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"五十岚 ▪ 寄\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Linux文件锁\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Python\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"文件锁\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-06-27T00:00:00.000Z\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"Linux 中的文件锁\",\"slug\":\"linux-中的文件锁\",\"link\":\"#linux-中的文件锁\",\"children\":[]},{\"level\":2,\"title\":\"系统调用 fcntl 和 ioctl\",\"slug\":\"系统调用-fcntl-和-ioctl\",\"link\":\"#系统调用-fcntl-和-ioctl\",\"children\":[{\"level\":3,\"title\":\"Linux\",\"slug\":\"linux\",\"link\":\"#linux\",\"children\":[]},{\"level\":3,\"title\":\"Python 的 fcntl 模块\",\"slug\":\"python-的-fcntl-模块\",\"link\":\"#python-的-fcntl-模块\",\"children\":[]}]}],\"readingTime\":{\"minutes\":6.83,\"words\":2048},\"filePathRelative\":\"python/语言/多任务编程/Linux文件锁.md\",\"localizedDate\":\"2021年6月27日\"}")

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
