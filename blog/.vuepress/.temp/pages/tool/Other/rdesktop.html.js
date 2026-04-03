import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/tool/Other/rdesktop.html.vue"
const data = JSON.parse("{\"path\":\"/tool/Other/rdesktop.html\",\"title\":\"远程桌面\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"远程桌面\",\"date\":\"2022-02-21T00:00:00.000Z\",\"category\":[\"工具\"],\"tag\":[\"远程\"],\"description\":\"rdesktop 是微软 RDP 协议的开源客户端\"},\"readingTime\":{\"minutes\":1.59,\"words\":478},\"filePathRelative\":\"tool/Other/rdesktop.md\",\"excerpt\":\"<p><a href=\\\"https://github.com/rdesktop\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">rdesktop</a> 是微软 <strong>RDP</strong> 协议的开源客户端</p>\\n\",\"autoDesc\":true}")
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
