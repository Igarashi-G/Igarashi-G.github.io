import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/guide/index.html.vue"
const data = JSON.parse("{\"path\":\"/guide/\",\"title\":\"主要功能与配置演示\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"主要功能与配置演示\",\"index\":false,\"icon\":\"creative\",\"category\":[\"使用指南\"],\"description\":\"目录\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"主要功能与配置演示\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/guide/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"主要功能与配置演示\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"目录\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.13,\"words\":40},\"filePathRelative\":\"guide/README.md\",\"excerpt\":\"<h2>目录</h2>\\n<ul>\\n<li>\\n<p><a href=\\\"/guide/markdown.html\\\" target=\\\"_blank\\\">Markdown 展示</a></p>\\n</li>\\n<li>\\n<p><a href=\\\"/guide/page.html\\\" target=\\\"_blank\\\">页面展示</a></p>\\n</li>\\n<li>\\n<p><a href=\\\"/guide/disable.html\\\" target=\\\"_blank\\\">禁用展示</a></p>\\n</li>\\n<li>\\n<p><a href=\\\"/guide/encrypt.html\\\" target=\\\"_blank\\\">加密展示</a></p>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
