import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/语言/深入/设计模式.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E8%AF%AD%E8%A8%80/%E6%B7%B1%E5%85%A5/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.html\",\"title\":\"设计模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"设计模式\",\"order\":20,\"description\":\"Python 设计模式 一、单例模式 使用场景 配置信息： 服务端配置信息存在一个文件中，通过一个Config 类来读取时，频繁 new Config 类会严重占内存，整个系统中只存了一份 Config 的实例即可反复读取 数据库连接: 若未使用连接池来复用连接， 全局仅创建一个数据库连接实例，反复复用即可，起码比创建一堆无用连接实例强，但依然建议构建...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"设计模式\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E6%B7%B1%E5%85%A5/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"设计模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Python 设计模式 一、单例模式 使用场景 配置信息： 服务端配置信息存在一个文件中，通过一个Config 类来读取时，频繁 new Config 类会严重占内存，整个系统中只存了一份 Config 的实例即可反复读取 数据库连接: 若未使用连接池来复用连接， 全局仅创建一个数据库连接实例，反复复用即可，起码比创建一堆无用连接实例强，但依然建议构建...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":6.39,\"words\":1918},\"filePathRelative\":\"python/语言/深入/设计模式.md\",\"excerpt\":\"\\n<h2>一、单例模式</h2>\\n<h3>使用场景</h3>\\n<ol>\\n<li>\\n<p><strong>配置信息</strong>：</p>\\n<blockquote>\\n<p>服务端配置信息存在一个文件中，通过一个<code>Config</code> 类来读取时，频繁 <code>new Config</code> 类会严重占内存，整个系统中只存了一份 <code>Config</code> 的实例即可反复读取</p>\\n</blockquote>\\n</li>\\n<li>\\n<p><strong>数据库连接:</strong></p>\\n<blockquote>\\n<p>若未使用连接池来复用连接， 全局仅创建一个数据库连接实例，反复复用即可，起码比创建一堆无用连接实例强，但依然建议构建连接池复用</p>\\n</blockquote>\\n</li>\\n<li>\\n<p><strong><code>WebSocket</code>等其他线程轮询数据</strong>：</p>\\n<blockquote>\\n<p>当需要另开辟线程并写个类去轮询取数据时（比如控制固定秒数去数据库更新数据，并只读内存中的一份数据时）每次请求都拿到 <strong>同一个实例</strong> 并在实例内存取数据即可</p>\\n</blockquote>\\n</li>\\n</ol>\",\"autoDesc\":true}")
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
