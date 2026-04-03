import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/ai/HelloAgents/各种疑问.html.vue"
const data = JSON.parse("{\"path\":\"/ai/HelloAgents/%E5%90%84%E7%A7%8D%E7%96%91%E9%97%AE.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"预测「明天穿不穿外套」 假设输入只有两个数（已经是你手工算好的特征）： x1x1：今天最高气温（摄氏度） x2x2：降雨概率（0～1） 模型极简：穿外套分数 = w1 * x1 + w2 * x2 + b 这里 (w1, w2, b) 就是三个参数（三个浮点数）。 它们背后的含义可以很直白： w1w1 通常是负数：越热越不想穿外套。 w2w2 通常是正...\"},\"readingTime\":{\"minutes\":41.02,\"words\":12306},\"filePathRelative\":\"ai/HelloAgents/各种疑问.md\",\"excerpt\":\"<h2>预测「明天穿不穿外套」</h2>\\n<p>假设输入只有两个数（已经是你手工算好的特征）：</p>\\n<ul>\\n<li>\\n<p>x1<em>x</em>1：今天最高气温（摄氏度）</p>\\n</li>\\n<li>\\n<p>x2<em>x</em>2：降雨概率（0～1）</p>\\n</li>\\n</ul>\\n<p>模型极简：穿外套分数 = w1 * x1 + w2 * x2 + b</p>\\n<p>这里 (w1, w2, b) 就是三个参数（三个浮点数）。</p>\\n<p>它们背后的含义可以很直白：</p>\\n<ul>\\n<li>\\n<p>w1<em>w</em>1 通常是负数：越热越不想穿外套。</p>\\n</li>\\n<li>\\n<p>w2<em>w</em>2 通常是正数：越容易下雨越想穿。</p>\\n</li>\\n<li>\\n<p>b<em>b</em>：整体偏「穿」还是「不穿」。</p>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
