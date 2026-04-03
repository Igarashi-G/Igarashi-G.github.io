import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/语言/多任务编程/线程进程辅助机制.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E7%BA%BF%E7%A8%8B%E8%BF%9B%E7%A8%8B%E8%BE%85%E5%8A%A9%E6%9C%BA%E5%88%B6.html\",\"title\":\"辅助机制\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"辅助机制\",\"order\":3,\"description\":\"一、线程辅助 一.信号量(Semaphore)： 首先，它也是一把锁。和 RLock()类似的是它内部也是维护这多把锁，但区别在于它是并行的锁，而不是像递归锁那样嵌套的。假设现在的锁的数量 count = 4 那么此时开辟一百个线程只有 4 个线程可以进来。（这不是真正的并行，也有先后进入，就好似 CPU 只让它在先进入的四个线程中切换执行， 因此达到...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"辅助机制\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E7%BA%BF%E7%A8%8B%E8%BF%9B%E7%A8%8B%E8%BE%85%E5%8A%A9%E6%9C%BA%E5%88%B6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"辅助机制\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"一、线程辅助 一.信号量(Semaphore)： 首先，它也是一把锁。和 RLock()类似的是它内部也是维护这多把锁，但区别在于它是并行的锁，而不是像递归锁那样嵌套的。假设现在的锁的数量 count = 4 那么此时开辟一百个线程只有 4 个线程可以进来。（这不是真正的并行，也有先后进入，就好似 CPU 只让它在先进入的四个线程中切换执行， 因此达到...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":11.82,\"words\":3547},\"filePathRelative\":\"python/语言/多任务编程/线程进程辅助机制.md\",\"excerpt\":\"\\n<h2>一.信号量(Semaphore)：</h2>\\n<p>首先，它也是一把锁。和 RLock()类似的是它内部也是维护这多把锁，但区别在于它是并行的锁，而不是像递归锁那样嵌套的。假设现在的锁的数量<br>\\ncount = 4 那么此时开辟一百个线程只有 4 个线程可以进来。（这不是真正的并行，也有先后进入，就好似 CPU 只让它在先进入的四个线程中切换执行，<br>\\n因此达到控制 100 个线程中的 4 个线程进行并发执行）一旦 count 变为 0，此时其他的线程不能在进去（CPU 只执行这四个线程的切换）。</p>\\n<p>线程不是越多越好，撑死开到一千多个了，再开下去效率反而会大打折扣<br>\\n信号量用来控制线程并发数的，BoundedSemaphore 或 Semaphore 管理一个内置的计数 器，每当调用 acquire()时-1，调用 release()时+1。</p>\",\"autoDesc\":true}")
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
