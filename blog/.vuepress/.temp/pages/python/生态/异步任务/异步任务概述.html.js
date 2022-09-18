export const data = JSON.parse("{\"key\":\"v-6f5a6bca\",\"path\":\"/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%A6%82%E8%BF%B0.html\",\"title\":\"异步任务雏形\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"异步任务雏形\",\"order\":1,\"group\":{\"title\":\"异步任务\",\"order\":31},\"summary\":\"异步任务雏形 造轮子： 使用 etcd 作为中间件，自行构建一套异步任务 参考：\\r1. 异步概述; \\r2. 异步编程; 手动实现异步任务（仿 Celery 模型） 刚好最近项目需求：实现一个基于 etcd 的 aio_task 便从零开始造个轮子 异步任务队列： 用来减缓高并发，将任务写入队列，通过一定顺序异步执行，因此需要任务队列作为管道\\r\\\" 目的是为了：\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-v2-demo.mrhope.site/igarashi-blog/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E6%A6%82%E8%BF%B0.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"是五十岚呐~\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"异步任务雏形\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"手动实现异步任务（仿 Celery 模型）\",\"slug\":\"手动实现异步任务-仿-celery-模型\",\"link\":\"#手动实现异步任务-仿-celery-模型\",\"children\":[]}],\"readingTime\":{\"minutes\":5.31,\"words\":1593},\"filePathRelative\":\"python/生态/异步任务/异步任务概述.md\"}")

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
