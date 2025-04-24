import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/paint/index.html.vue"
const data = JSON.parse("{\"path\":\"/paint/\",\"title\":\"Paint\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Paint\",\"article\":false,\"date\":\"2022-09-19T00:00:00.000Z\",\"icon\":\"like\",\"category\":[\"兴趣\"],\"tag\":[\"板绘\"],\"description\":\"目录\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Paint\\\",\\\"description\\\":\\\"目录\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/paint/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Paint\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"目录\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"板绘\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-09-19T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":0.11,\"words\":32},\"filePathRelative\":\"paint/README.md\",\"excerpt\":\"<h2>目录</h2>\\n<ul>\\n<li>\\n<p><a href=\\\"/paint/PS%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.html\\\" target=\\\"_blank\\\">PS</a></p>\\n</li>\\n<li>\\n<p><a href=\\\"/paint/SAI%E6%93%8D%E4%BD%9C%E5%9F%BA%E7%A1%80.html\\\" target=\\\"_blank\\\">SAI</a></p>\\n</li>\\n</ul>\\n\",\"autoDesc\":true}")
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
