export const data = JSON.parse("{\"key\":\"v-73d0f935\",\"path\":\"/python/Base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0.html\",\"title\":\"C级解构\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"C级解构\",\"order\":10,\"summary\":\"实现简化版 asyncio https://zhuanlan.zhihu.com/p/64991670 嗐，要弄懂一个玩意到底是啥，当然少不了一睹 cpython 与 asyncio 的源码。 一、进程、线程与协程 多进程、多线程、协程的模型都是为了解决多个任务同时进行的问题。 多系统任务：关键在于暂停当前任务，保存当前任务现场（状态），选择下一任务，恢复下\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-v2-demo.mrhope.site/igarashi-blog/python/Base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/%E5%BA%95%E5%B1%82%E5%AE%9E%E7%8E%B0.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"是五十岚吖\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"C级解构\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"一、进程、线程与协程\",\"slug\":\"一、进程、线程与协程\",\"link\":\"#一、进程、线程与协程\",\"children\":[]},{\"level\":2,\"title\":\"二、yield 与 yield from\",\"slug\":\"二、yield-与-yield-from\",\"link\":\"#二、yield-与-yield-from\",\"children\":[{\"level\":3,\"title\":\"2.1 yield 例子\",\"slug\":\"_2-1-yield-例子\",\"link\":\"#_2-1-yield-例子\",\"children\":[]},{\"level\":3,\"title\":\"2.2 python 上下文源码\",\"slug\":\"_2-2-python-上下文源码\",\"link\":\"#_2-2-python-上下文源码\",\"children\":[]},{\"level\":3,\"title\":\"2.3 生成器定义\",\"slug\":\"_2-3-生成器定义\",\"link\":\"#_2-3-生成器定义\",\"children\":[]},{\"level\":3,\"title\":\"2.4 send\",\"slug\":\"_2-4-send\",\"link\":\"#_2-4-send\",\"children\":[]},{\"level\":3,\"title\":\"2.5 yield from\",\"slug\":\"_2-5-yield-from\",\"link\":\"#_2-5-yield-from\",\"children\":[]}]},{\"level\":2,\"title\":\"三、从生成器到协程（本文的协程，单指 asyncio 中的协程）\",\"slug\":\"三、从生成器到协程-本文的协程-单指-asyncio-中的协程\",\"link\":\"#三、从生成器到协程-本文的协程-单指-asyncio-中的协程\",\"children\":[{\"level\":3,\"title\":\"future\",\"slug\":\"future\",\"link\":\"#future\",\"children\":[]},{\"level\":3,\"title\":\"eventloop-调度者\",\"slug\":\"eventloop-调度者\",\"link\":\"#eventloop-调度者\",\"children\":[]},{\"level\":3,\"title\":\"结束\",\"slug\":\"结束\",\"link\":\"#结束\",\"children\":[]}]},{\"level\":2,\"title\":\"\",\"slug\":\"\",\"link\":\"#\",\"children\":[]}],\"readingTime\":{\"minutes\":20.37,\"words\":6110},\"filePathRelative\":\"python/Base/异步编程/底层实现.md\"}")

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
