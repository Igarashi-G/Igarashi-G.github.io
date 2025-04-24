import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/生态/异步任务/Celery.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/Celery.html\",\"title\":\"Celery基础\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Celery基础\",\"order\":2,\"description\":\"Celery Task Celery 是一个简单、灵活且可靠的，处理大量消息的分布式系统， 专注于实时处理的异步任务队列 支持任务调度等定时任务 一、celery 概述： 1.celery 组成： Celery 的架构由三部分组成，消息中间件（message broker），任务执行单元（worker）和任务执行结果存储（task result sto...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Celery基础\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/Celery.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Celery基础\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Celery Task Celery 是一个简单、灵活且可靠的，处理大量消息的分布式系统， 专注于实时处理的异步任务队列 支持任务调度等定时任务 一、celery 概述： 1.celery 组成： Celery 的架构由三部分组成，消息中间件（message broker），任务执行单元（worker）和任务执行结果存储（task result sto...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":3.29,\"words\":988},\"filePathRelative\":\"python/生态/异步任务/Celery.md\",\"excerpt\":\"\\n<p>Celery 是一个简单、灵活且可靠的，处理大量消息的分布式系统，</p>\\n<ul>\\n<li>专注于实时处理的异步任务队列</li>\\n<li>支持任务调度等定时任务</li>\\n</ul>\\n<h2>一、celery 概述：</h2>\\n<h3>1.celery 组成：</h3>\\n<p>Celery 的架构由三部分组成，消息中间件（message broker），任务执行单元（worker）和任务执行结果存储（task result store）组成。</p>\\n<ul>\\n<li>消息中间件\\n<ul>\\n<li>Celery 本身不提供消息服务，但是可以方便的和第三方提供的消息中间件集成。包括，RabbitMQ, Redis 等等</li>\\n</ul>\\n</li>\\n<li>任务执行单元\\n<ul>\\n<li>Worker 是 Celery 提供的任务执行的单元，worker 并发的运行在分布式的系统节点中。</li>\\n</ul>\\n</li>\\n<li>任务结果存储\\n<ul>\\n<li>Task result store 用来存储 Worker 执行的任务的结果，Celery 支持以不同方式存储任务的结果，包括 AMQP、redis、rbmq 等</li>\\n</ul>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
