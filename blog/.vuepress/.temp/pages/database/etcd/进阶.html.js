import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/database/etcd/进阶.html.vue"
const data = JSON.parse("{\"path\":\"/database/etcd/%E8%BF%9B%E9%98%B6.html\",\"title\":\"etcd 进阶\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"etcd 进阶 1. etcd 的请求是如何执行的？ 1.1 读请求 client -> api -> KVServer 拦截器 -> read index -> read status （一致性返回状态机） -> MVCC (b tree 内存（key -> restore ）{2（）, 0 (版本号)} + boltdb b+tree burket...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"etcd 进阶\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/database/etcd/%E8%BF%9B%E9%98%B6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"etcd 进阶\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"etcd 进阶 1. etcd 的请求是如何执行的？ 1.1 读请求 client -> api -> KVServer 拦截器 -> read index -> read status （一致性返回状态机） -> MVCC (b tree 内存（key -> restore ）{2（）, 0 (版本号)} + boltdb b+tree burket...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.27,\"words\":82},\"filePathRelative\":\"database/etcd/进阶.md\",\"excerpt\":\"\\n<h3>1. etcd 的请求是如何执行的？</h3>\\n<h4>1.1 读请求</h4>\\n<p>client -&gt; api -&gt; KVServer 拦截器 -&gt; read index -&gt; read status （一致性返回状态机） -&gt; MVCC (b tree 内存（key -&gt; restore ）{2（）, 0 (版本号)} + boltdb b+tree burket 页 （二分 value 磁盘 IO）) -&gt; 返回客户端</p>\\n<h4>1.2 写请求</h4>\\n<hr>\\n<h3>2. 如何实现高可用、数据强一致性？</h3>\\n\",\"autoDesc\":true}")
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
