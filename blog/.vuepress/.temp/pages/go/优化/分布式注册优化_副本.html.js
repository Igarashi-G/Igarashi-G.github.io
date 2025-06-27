import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/go/优化/分布式注册优化_副本.html.vue"
const data = JSON.parse("{\"path\":\"/go/%E4%BC%98%E5%8C%96/%E5%88%86%E5%B8%83%E5%BC%8F%E6%B3%A8%E5%86%8C%E4%BC%98%E5%8C%96_%E5%89%AF%E6%9C%AC.html\",\"title\":\"分布式注册引发的ABA问题及优化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"分布式注册引发的ABA问题及优化 问题背景 最近优化边缘端分布式往中心端注册的业务，以前实现很糙，无法支撑大量设备的多节点同时注册场景，由于其每套系统有可能是单机版，也有可能是小集群，若小集群则涉及相同 systemUUID 但不同 machineID 的并发注册请求，且同时请求时较为稀疏，因此诞生了如下问题： 重复创建系统记录 竞态条件 性能瓶颈 请...\"},\"readingTime\":{\"minutes\":14.77,\"words\":4431},\"filePathRelative\":\"go/优化/分布式注册优化_副本.md\",\"excerpt\":\"\\n<blockquote>\\n<h4>问题背景</h4>\\n<p>最近优化边缘端分布式往中心端注册的业务，以前实现很糙，无法支撑大量设备的多节点同时注册场景，由于其每套系统有可能是单机版，也有可能是小集群，若小集群则涉及相同 <code>systemUUID</code> 但不同 <code>machineID</code> 的并发注册请求，且同时请求时较为稀疏，因此诞生了如下问题：</p>\\n<ol>\\n<li>重复创建系统记录</li>\\n<li>竞态条件</li>\\n<li>性能瓶颈</li>\\n<li>请求超时</li>\\n</ol>\\n</blockquote>\\n<p></p>\\n<h2>1. 初步想到的解决方案</h2>\",\"autoDesc\":true}")
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
