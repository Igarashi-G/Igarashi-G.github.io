import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/语言/网络编程/回调.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E8%AF%AD%E8%A8%80/%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B/%E5%9B%9E%E8%B0%83.html\",\"title\":\"事件の起源——回调\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"事件の起源——回调\",\"order\":1,\"description\":\"接口的调用通常分为三类： 1.同步调用： 是一种阻塞式调用，调用方要等待对方执行完毕才返回，它是一种单向调用 回调思想: 假设爱丽丝（Arisu）想让薇尔莉特（Violet）去帮自己写并寄几封信，便把信的内容和自己的身份信息告诉了薇尔莉特（假设寄信要用身份信息才能 寄），薇尔莉特明白了传达的内容。并获取了爱丽丝（对象）的身份，然后调用了（爱丽丝）的代笔...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"事件の起源——回调\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B/%E5%9B%9E%E8%B0%83.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"事件の起源——回调\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"接口的调用通常分为三类： 1.同步调用： 是一种阻塞式调用，调用方要等待对方执行完毕才返回，它是一种单向调用 回调思想: 假设爱丽丝（Arisu）想让薇尔莉特（Violet）去帮自己写并寄几封信，便把信的内容和自己的身份信息告诉了薇尔莉特（假设寄信要用身份信息才能 寄），薇尔莉特明白了传达的内容。并获取了爱丽丝（对象）的身份，然后调用了（爱丽丝）的代笔...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":2.33,\"words\":699},\"filePathRelative\":\"python/语言/网络编程/回调.md\",\"excerpt\":\"<p>接口的调用通常分为三类： 1.同步调用：<br>\\n是一种阻塞式调用，调用方要等待对方执行完毕才返回，它是一种单向调用</p>\\n<pre><code>2.回调：\\n    回调是一种双向调用模式，也就是说，被调用方在接口被调用时也会调用对方的接口。你把函数作为参数传过去，传过去的回调函数同时也\\n    需要接收执行一方的参数。（我有肉你有刀，我要调用你的刀再传入我的肉）\\n\\n    定义：把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。\\n\\n3.异步调用：\\n    异步调用是一种类似消息或事件的机制，不过它的调用方向刚好相反，接口的服务在收到某种讯息或发生某种事件时，会主动通知客户方\\n    （即调用客户方的接口）见6.4\\n\\n下面进入正题：\\n</code></pre>\",\"autoDesc\":true}")
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
