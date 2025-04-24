import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/语言/多任务编程/Linux文件锁.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/Linux%E6%96%87%E4%BB%B6%E9%94%81.html\",\"title\":\"Linux文件锁\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Linux文件锁\",\"date\":\"2021-06-27T00:00:00.000Z\",\"category\":[\"Python\",\"文件锁\"],\"tag\":[\"Python\",\"文件锁\"],\"description\":\"Linux 下 Python 文件锁的使用 在并发情况下，多个线程/进程池 对同一文件进行读写，如 grpc 线程池收到多个请求同时改写一份文件的情况， 此时需要用到 fcntl 来对文件的读写加锁 Linux 中的文件锁 在 Linux 中，flock 和 fcntl 都是系统调用，而 lockf 则是库函数， lockf 则是 fcntl 的封装，...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Linux文件锁\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-06-27T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/Linux%E6%96%87%E4%BB%B6%E9%94%81.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Linux文件锁\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Linux 下 Python 文件锁的使用 在并发情况下，多个线程/进程池 对同一文件进行读写，如 grpc 线程池收到多个请求同时改写一份文件的情况， 此时需要用到 fcntl 来对文件的读写加锁 Linux 中的文件锁 在 Linux 中，flock 和 fcntl 都是系统调用，而 lockf 则是库函数， lockf 则是 fcntl 的封装，...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"文件锁\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Python\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-06-27T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":6.79,\"words\":2037},\"filePathRelative\":\"python/语言/多任务编程/Linux文件锁.md\",\"excerpt\":\"<p><strong>Linux</strong> 下 <strong>Python</strong> 文件锁的使用</p>\\n<!--more-->\\n<p>在并发情况下，多个线程/进程池 对同一文件进行读写，如 <strong>grpc</strong> 线程池收到多个请求同时改写一份文件的情况，</p>\\n<p>此时需要用到 <strong>fcntl</strong> 来对文件的读写加锁</p>\\n<h2>Linux 中的文件锁</h2>\\n<p>在 <strong>Linux</strong> 中，<strong>flock</strong> 和 <strong>fcntl</strong> 都是系统调用，而 <strong>lockf</strong> 则是库函数， <strong>lockf</strong> 则是 <strong>fcntl</strong> 的封装，因此 <strong>lockf</strong> 和 <strong>fcntl</strong> 在底层实现是一样的，对文件加锁的效果也是一样的</p>\",\"autoDesc\":true}")
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
