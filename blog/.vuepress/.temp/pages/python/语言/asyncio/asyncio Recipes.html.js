import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/语言/asyncio/asyncio Recipes.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E8%AF%AD%E8%A8%80/asyncio/asyncio%20Recipes.html\",\"title\":\"异步IO食谱\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"异步IO食谱\",\"order\":11,\"group\":{\"title\":\"异步编程\",\"order\":6},\"description\":\"asyncio Recipes Working with Event Loops 一、处理事件循环 1.定位事件循环问题 并发框架必须能够告诉您事件循环当前是否正在运行，以及它是哪个是。 例如：你写的代码中应该断言只有一个循环在执行任务。因此只有一项任务可以更改某些共享资源或确保回调派遣。 2.创建新循环实例问题： get_event_loop API...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"异步IO食谱\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/asyncio/asyncio%20Recipes.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"异步IO食谱\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"asyncio Recipes Working with Event Loops 一、处理事件循环 1.定位事件循环问题 并发框架必须能够告诉您事件循环当前是否正在运行，以及它是哪个是。 例如：你写的代码中应该断言只有一个循环在执行任务。因此只有一项任务可以更改某些共享资源或确保回调派遣。 2.创建新循环实例问题： get_event_loop API...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.69,\"words\":208},\"filePathRelative\":\"python/语言/asyncio/asyncio Recipes.md\",\"excerpt\":\"\\n<pre><code>————————A Problem-Solution Approach\\n</code></pre>\\n<h2>Working with&nbsp;Event Loops</h2>\\n<h3>一、处理事件循环</h3>\\n<h4>1.定位事件循环问题</h4>\\n<p>并发框架必须能够告诉您事件循环当前是否正在运行，以及它是哪个是。</p>\\n<p>例如：你写的代码中应该断言只有一个循环在执行任务。因此只有一项任务可以更改某些共享资源或确保回调派遣。</p>\\n<h4>2.创建新循环实例问题：</h4>\\n<p>get_event_loop API 只实例化从主线程调用的循环。 不要使用任何方便包装来创建循环并自己存储它，如所示。 这肯定是 在任何线程上 ORK，并使循环的创建无副作用（除了异步的全局创建之外）。 默认循环策略</p>\",\"autoDesc\":true}")
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
