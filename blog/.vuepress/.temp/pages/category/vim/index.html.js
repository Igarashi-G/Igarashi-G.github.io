import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/category/vim/index.html.vue"
const data = JSON.parse("{\"path\":\"/category/vim/\",\"title\":\"Vim 分类\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vim 分类\",\"dir\":{\"index\":false},\"index\":false,\"feed\":false,\"sitemap\":false,\"blog\":{\"type\":\"category\",\"name\":\"Vim\",\"key\":\"category\"},\"layout\":\"BlogCategory\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Vim 分类\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/category/vim/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Vim 分类\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
