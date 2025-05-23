import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/语言/多任务编程/多线程编程.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B.html\",\"title\":\"多线程编程\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"多线程编程\",\"order\":4,\"description\":\"基于线程的并发 threading：在 py2 中曾废弃了 thread 模块，在 py3 中作为底层模块 _thread，通常在其基础上建立更高级的线程接口 GIL 锁：又称全局解释器锁，Cpython 解释器采用的一种垃圾机制，它限制了同一时刻，只有一个线程被执行，使得解释器运行多线程方便，但多核处理器上不能够并行运作，因此多核密集型计算应该使用 ...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"多线程编程\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"多线程编程\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"基于线程的并发 threading：在 py2 中曾废弃了 thread 模块，在 py3 中作为底层模块 _thread，通常在其基础上建立更高级的线程接口 GIL 锁：又称全局解释器锁，Cpython 解释器采用的一种垃圾机制，它限制了同一时刻，只有一个线程被执行，使得解释器运行多线程方便，但多核处理器上不能够并行运作，因此多核密集型计算应该使用 ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.53,\"words\":158},\"filePathRelative\":\"python/语言/多任务编程/多线程编程.md\",\"excerpt\":\"\\n<p><strong>threading</strong>：在 py2 中曾废弃了 <code>thread</code> 模块，在 py3 中作为底层模块 <code>_thread</code>，通常在其基础上建立更高级的线程接口</p>\\n<p><strong>GIL 锁</strong>：又称<strong>全局解释器锁</strong>，Cpython 解释器采用的一种垃圾机制，它限制了同一时刻，只有一个线程被执行，使得解释器运行多线程方便，但多核处理器上不能够并行运作，因此多核密集型计算应该使用 <a href=\\\"/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%A4%9A%E8%BF%9B%E7%A8%8B%E7%BC%96%E7%A8%8B#1-multiprocessing-%E6%A6%82%E8%BF%B0\\\">多进程</a> 或 <a href=\\\"https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">进程池</a></p>\",\"autoDesc\":true}")
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
