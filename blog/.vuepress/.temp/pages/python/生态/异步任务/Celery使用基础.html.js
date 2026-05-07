import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/生态/异步任务/Celery使用基础.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/Celery%E4%BD%BF%E7%94%A8%E5%9F%BA%E7%A1%80.html\",\"title\":\"Celery使用\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Celery使用\",\"order\":3,\"description\":\"现在远程客户端发起一条命令 cmd sshClient ————————> sshServer 发送命令需要一个队列，交给远程去执行，要等待一个结果。若任务再 Server 端要执行 5 分钟那么就要等 5 分钟。 （rabbitmq 中执行 rpc 双向队列，我们自己也可以搞成异步的，就是麻烦一些。因此用基于它的 celery） what Anime...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Celery使用\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/Celery%E4%BD%BF%E7%94%A8%E5%9F%BA%E7%A1%80.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Celery使用\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"现在远程客户端发起一条命令 cmd sshClient ————————> sshServer 发送命令需要一个队列，交给远程去执行，要等待一个结果。若任务再 Server 端要执行 5 分钟那么就要等 5 分钟。 （rabbitmq 中执行 rpc 双向队列，我们自己也可以搞成异步的，就是麻烦一些。因此用基于它的 celery） what Anime...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":5.18,\"words\":1555},\"filePathRelative\":\"python/生态/异步任务/Celery使用基础.md\",\"excerpt\":\"<pre><code>Celery-分布式任务队列：\\n</code></pre>\\n<p>现在远程客户端发起一条命令 cmd<br>\\nsshClient ————————&gt; sshServer<br>\\n发送命令需要一个队列，交给远程去执行，要等待一个结果。若任务再 Server 端要执行 5 分钟那么就要等 5 分钟。<br>\\n（rabbitmq 中执行 rpc 双向队列，我们自己也可以搞成异步的，就是麻烦一些。因此用基于它的 celery）</p>\\n<p>what Anime ：它后面肯定是用分布式的处理图片这个任务。做一个分布式的运算，之后再把结果统一汇总。<br>\\n那么再 Python 中如何实现分布式的运算效果？———— Celery</p>\",\"autoDesc\":true}")
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
