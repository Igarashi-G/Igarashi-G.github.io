export const data = JSON.parse("{\"key\":\"v-fb214f78\",\"path\":\"/database/etcd/%E8%BF%9B%E9%98%B6.html\",\"title\":\"etcd 进阶\",\"lang\":\"zh-CN\",\"frontmatter\":{\"summary\":\"etcd 进阶 1. etcd 的请求是如何执行的？ 1.1 读请求 client -> api -> KVServer 拦截器 -> read index -> read status （一致性返回状态机） -> MVCC (b tree 内存（key -> restore ）{2（）, 0 (版本号)} + boltdb b+tree burket 页 \",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/igarashi-blog/igarashi-blog/database/etcd/%E8%BF%9B%E9%98%B6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"五十岚呐~\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"etcd 进阶\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":3,\"title\":\"1. etcd 的请求是如何执行的？\",\"slug\":\"_1-etcd-的请求是如何执行的\",\"link\":\"#_1-etcd-的请求是如何执行的\",\"children\":[]},{\"level\":3,\"title\":\"2. 如何实现高可用、数据强一致性？\",\"slug\":\"_2-如何实现高可用、数据强一致性\",\"link\":\"#_2-如何实现高可用、数据强一致性\",\"children\":[]}],\"readingTime\":{\"minutes\":0.28,\"words\":83},\"filePathRelative\":\"database/etcd/进阶.md\"}")

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
