import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/database/Redis/性能分析.html.vue"
const data = JSON.parse("{\"path\":\"/database/Redis/%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90.html\",\"title\":\"性能分析\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"性能分析\",\"order\":2,\"description\":\"Redis 性能分析：（一文揭秘单线程的 Redis 为什么这么快） 一、Redis 为啥快 1.纯内存操作 2.单线程 3.高效的数据结构 4.合理的数据编码 5.其他方面的优化 二、SDS: Redis 是 C 语言开发的，但在 Redis 的 String 结构中，并没有使用 C 语言中的字符，而是用一种称为 SDS（Simple Dynamic...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"性能分析\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/database/Redis/%E6%80%A7%E8%83%BD%E5%88%86%E6%9E%90.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"性能分析\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Redis 性能分析：（一文揭秘单线程的 Redis 为什么这么快） 一、Redis 为啥快 1.纯内存操作 2.单线程 3.高效的数据结构 4.合理的数据编码 5.其他方面的优化 二、SDS: Redis 是 C 语言开发的，但在 Redis 的 String 结构中，并没有使用 C 语言中的字符，而是用一种称为 SDS（Simple Dynamic...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":2.5,\"words\":751},\"filePathRelative\":\"database/Redis/性能分析.md\",\"excerpt\":\"\\n<p>一、Redis 为啥快 1.纯内存操作 2.单线程 3.高效的数据结构 4.合理的数据编码 5.其他方面的优化</p>\\n<pre><code>在 Redis 中，常用的 5 种数据结构和应用场景如下：\\n    - String：缓存、计数器、分布式锁等。\\n    - List：链表、队列、微博关注人时间轴列表等。\\n    - Hash：用户信息、Hash 表等。\\n    - Set：去重、赞、踩、共同好友等。\\n    - Zset：访问量排行榜、点击量排行榜等。\\n</code></pre>\\n<p>二、SDS:<br>\\nRedis 是 C 语言开发的，但在 Redis 的 String 结构中，并没有使用 C 语言中的字符，而是用一种称为 SDS（Simple Dynamic String）的结构体来<br>\\n保存字符串。<br>\\nstruct sdshdr {<br>\\nint len; //用于记录 buf 中已使用空间的长度。<br>\\nint free; //buf 中空闲空间的长度。<br>\\nchar buf[]; //存储实际内容。<br>\\n}</p>\",\"autoDesc\":true}")
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
