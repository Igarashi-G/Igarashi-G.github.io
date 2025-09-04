import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/tool/Tailscale/tailscale.html.vue"
const data = JSON.parse("{\"path\":\"/tool/Tailscale/tailscale.html\",\"title\":\"tailscale\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"tailscale tailscale 常用命令 中继 列节点 边侧 注册 验证连通性 网络检查 显示当前设备的物理网络状况, 会列出中继服务器（DERP）列表，及当前设备连接到每个服务器所需的时间。\"},\"readingTime\":{\"minutes\":0.49,\"words\":146},\"filePathRelative\":\"tool/Tailscale/tailscale.md\",\"excerpt\":\"\\n<p><a href=\\\"https://tailscale.com/blog/how-tailscale-works\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">tailscale</a></p>\\n<!--more-->\\n<h3>常用命令</h3>\\n<h4>中继</h4>\\n<h5><strong>列节点</strong></h5>\\n<div class=\\\"language- line-numbers-mode\\\" data-highlighter=\\\"shiki\\\" data-ext=\\\"\\\" style=\\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\\"><pre class=\\\"shiki shiki-themes one-light one-dark-pro vp-code\\\"><code><span class=\\\"line\\\"><span>$ docker exec -ti headscale headscale nodes list</span></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")
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
