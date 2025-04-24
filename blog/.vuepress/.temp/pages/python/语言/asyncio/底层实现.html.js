import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/语言/asyncio/底层实现.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E8%AF%AD%E8%A8%80/asyncio/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0.html\",\"title\":\"C级解构\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"C级解构\",\"order\":10,\"description\":\"实现简化版 asyncio https://zhuanlan.zhihu.com/p/64991670 嗐，要弄懂一个玩意到底是啥，当然少不了一睹 cpython 与 asyncio 的源码。 一、进程、线程与协程 多进程、多线程、协程的模型都是为了解决多个任务同时进行的问题。 多系统任务：关键在于暂停当前任务，保存当前任务现场（状态），选择下一任务，...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"C级解构\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/asyncio/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"C级解构\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"实现简化版 asyncio https://zhuanlan.zhihu.com/p/64991670 嗐，要弄懂一个玩意到底是啥，当然少不了一睹 cpython 与 asyncio 的源码。 一、进程、线程与协程 多进程、多线程、协程的模型都是为了解决多个任务同时进行的问题。 多系统任务：关键在于暂停当前任务，保存当前任务现场（状态），选择下一任务，...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":20.5,\"words\":6151},\"filePathRelative\":\"python/语言/asyncio/底层实现.md\",\"excerpt\":\"\\n<p><a href=\\\"https://zhuanlan.zhihu.com/p/64991670\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://zhuanlan.zhihu.com/p/64991670</a><br>\\n嗐，要弄懂一个玩意到底是啥，当然少不了一睹 cpython 与 asyncio 的源码。</p>\\n<h2>一、进程、线程与协程</h2>\\n<p>多进程、多线程、协程的模型都是为了解决多个任务同时进行的问题。</p>\\n<p>多系统任务：关键在于暂停当前任务，保存当前任务现场（状态），选择下一任务，恢复下一任务的现场，执行下一任务。但在计算机当中，我们不<br>\\n称为现场 or 状态 or 环境，而是称为上下文。</p>\",\"autoDesc\":true}")
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
