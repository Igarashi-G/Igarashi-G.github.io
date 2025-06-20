import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/语言/多任务编程/协程.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E5%8D%8F%E7%A8%8B.html\",\"title\":\"协程\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"协程\",\"date\":\"2021-07-03T00:00:00.000Z\",\"category\":[\"Python\",\"协程\"],\"tag\":[\"Python\",\"协程\"],\"description\":\"协程 Coroutine 一、协程概念： 1.1 为什么要有协程？ 同步编程 的并发性不高 多进程编程 效率受 CPU 核数限制，当任务数量远大于 CPU 核数时，执行效率会降低（分片） 多线程编程 需要线程之间的通信，而且需要锁机制来防止共享变量被不同线程乱改，有GIL(全局解释器锁) 实际上也无法做到真正的并行 可不可以采用同步的方式来编写异步功能...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"协程\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2021-07-03T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E5%A4%9A%E4%BB%BB%E5%8A%A1%E7%BC%96%E7%A8%8B/%E5%8D%8F%E7%A8%8B.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"协程\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"协程 Coroutine 一、协程概念： 1.1 为什么要有协程？ 同步编程 的并发性不高 多进程编程 效率受 CPU 核数限制，当任务数量远大于 CPU 核数时，执行效率会降低（分片） 多线程编程 需要线程之间的通信，而且需要锁机制来防止共享变量被不同线程乱改，有GIL(全局解释器锁) 实际上也无法做到真正的并行 可不可以采用同步的方式来编写异步功能...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"协程\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"Python\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2021-07-03T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":6.86,\"words\":2059},\"filePathRelative\":\"python/语言/多任务编程/协程.md\",\"excerpt\":\"\\n<h2>一、协程概念：</h2>\\n<h3>1.1 为什么要有协程？</h3>\\n<ul>\\n<li><strong>同步编程</strong> 的并发性不高</li>\\n<li><strong>多进程编程</strong> 效率受 CPU 核数限制，当任务数量远大于 CPU 核数时，执行效率会降低（分片）</li>\\n<li><strong>多线程编程</strong> 需要线程之间的通信，而且需要<strong>锁机制</strong>来防止<strong>共享变量</strong>被不同线程乱改，有<strong>GIL(全局解释器锁)</strong> 实际上也无法做到真正的并行</li>\\n</ul>\",\"autoDesc\":true}")
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
