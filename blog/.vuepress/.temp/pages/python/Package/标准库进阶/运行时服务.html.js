export const data = JSON.parse("{\"key\":\"v-091e3760\",\"path\":\"/python/Package/%E6%A0%87%E5%87%86%E5%BA%93%E8%BF%9B%E9%98%B6/%E8%BF%90%E8%A1%8C%E6%97%B6%E6%9C%8D%E5%8A%A1.html\",\"title\":\"运行时服务\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"运行时服务\",\"order\":4,\"summary\":\"运行时服务 abc 抽象基类 ### atexit： 退出处理器, 在程序即将结束之前执行 的代码 使用register函数用于注册程序退出时的回调函数，然后在回调函数中做一些资源清理的操作 内部是通过sys.exitfunc来实现的，它先把注册的回调函数放到一个列表中，当程序退出时，按先进后出的顺序调用注册的回调。 如果回调函数在执行过程中抛出了异常，at\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-v2-demo.mrhope.site/igarashi-blog/python/Package/%E6%A0%87%E5%87%86%E5%BA%93%E8%BF%9B%E9%98%B6/%E8%BF%90%E8%A1%8C%E6%97%B6%E6%9C%8D%E5%8A%A1.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"是五十岚吖\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"运行时服务\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"abc\",\"slug\":\"abc\",\"link\":\"#abc\",\"children\":[{\"level\":3,\"title\":\"\",\"slug\":\"\",\"link\":\"#\",\"children\":[]}]},{\"level\":2,\"title\":\"atexit：\",\"slug\":\"atexit\",\"link\":\"#atexit\",\"children\":[]},{\"level\":2,\"title\":\"contextlib\",\"slug\":\"contextlib\",\"link\":\"#contextlib\",\"children\":[]},{\"level\":2,\"title\":\"traceback\",\"slug\":\"traceback\",\"link\":\"#traceback\",\"children\":[]}],\"readingTime\":{\"minutes\":3.25,\"words\":975},\"filePathRelative\":\"python/Package/标准库进阶/运行时服务.md\"}")

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
