export const data = JSON.parse("{\"key\":\"v-60196284\",\"path\":\"/python/%E8%AF%AD%E8%A8%80/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E7%BA%BF%E7%A8%8B%E8%BF%9B%E7%A8%8B%E8%BE%85%E5%8A%A9%E6%9C%BA%E5%88%B6.html\",\"title\":\"辅助机制\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"辅助机制\",\"order\":3,\"summary\":\"一、线程辅助 一.信号量(Semaphore)： 首先，它也是一把锁。和 RLock()类似的是它内部也是维护这多把锁，但区别在于它是并行的锁，而不是像递归锁那样嵌套的。假设现在的锁的数量 count = 4 那么此时开辟一百个线程只有 4 个线程可以进来。（这不是真正的并行，也有先后进入，就好似 CPU 只让它在先进入的四个线程中切换执行， 因此达到控制 \",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-v2-demo.mrhope.site/igarashi-blog/python/%E8%AF%AD%E8%A8%80/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E7%BA%BF%E7%A8%8B%E8%BF%9B%E7%A8%8B%E8%BE%85%E5%8A%A9%E6%9C%BA%E5%88%B6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"是五十岚呐~\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"辅助机制\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"一.信号量(Semaphore)：\",\"slug\":\"一-信号量-semaphore\",\"link\":\"#一-信号量-semaphore\",\"children\":[]},{\"level\":2,\"title\":\"线程变量利器----ThreadLocal：\",\"slug\":\"线程变量利器-threadlocal\",\"link\":\"#线程变量利器-threadlocal\",\"children\":[]}],\"readingTime\":{\"minutes\":11.87,\"words\":3560},\"filePathRelative\":\"python/语言/资源调度/线程进程辅助机制.md\"}")

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
