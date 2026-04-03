import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/生态/异步任务/异步任务概述.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%A6%82%E8%BF%B0.html\",\"title\":\"异步任务雏形\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"异步任务雏形\",\"order\":1,\"group\":{\"title\":\"异步任务\",\"order\":31},\"description\":\"异步任务雏形 参考： 异步概述 异步编程 手动实现异步任务（仿 Celery 模型） 刚好最近项目需求：实现一个基于 etcd 的 aio_task 便从零开始造个轮子 异步任务队列： 用来减缓高并发，将任务写入队列，通过一定顺序异步执行，因此需要任务队列作为管道 目的是为了： 有空余资源时执行 指定时间执行 使用后台任务进程执行 celery 模型概...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"异步任务雏形\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%A6%82%E8%BF%B0.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"异步任务雏形\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"异步任务雏形 参考： 异步概述 异步编程 手动实现异步任务（仿 Celery 模型） 刚好最近项目需求：实现一个基于 etcd 的 aio_task 便从零开始造个轮子 异步任务队列： 用来减缓高并发，将任务写入队列，通过一定顺序异步执行，因此需要任务队列作为管道 目的是为了： 有空余资源时执行 指定时间执行 使用后台任务进程执行 celery 模型概...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":5.28,\"words\":1584},\"filePathRelative\":\"python/生态/异步任务/异步任务概述.md\",\"excerpt\":\"\\n<p>参考：</p>\\n<ul>\\n<li>\\n<ol>\\n<li><a href=\\\"/back_end/python/base/%E8%B5%84%E6%BA%90%E8%B0%83%E5%BA%A6/%E5%BC%82%E6%AD%A5%E6%A6%82%E8%BF%B0\\\">异步概述</a></li>\\n</ol>\\n</li>\\n<li>\\n<ol start=\\\"2\\\">\\n<li><a href=\\\"/back_end/python/base/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B/%E5%BC%82%E6%AD%A5%E5%B9%B6%E5%8F%91%E5%BA%93asyncio\\\">异步编程</a></li>\\n</ol>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
