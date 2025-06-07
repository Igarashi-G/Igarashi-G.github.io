import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/go/基础/Metux.html.vue"
const data = JSON.parse("{\"path\":\"/go/%E5%9F%BA%E7%A1%80/Metux.html\",\"title\":\"sync.Mutex 发展史\",\"lang\":\"zh-CN\",\"frontmatter\":{\"description\":\"sync.Mutex 发展史 1. First Commit 2008 年，@rsc 提交了 sync.Mutex 的初始版本代码 ，早期实现相对简单，结合了 CAS（比较并交换）和信号量。 2. 抢占&计数优化 2011 年，@dvyukov 提交了第一个 sync 优化：改进 Mutex 以允许连续获取，引入了 mutexWoken （唤醒状态）和...\"},\"readingTime\":{\"minutes\":7.78,\"words\":2335},\"filePathRelative\":\"go/基础/Metux.md\",\"excerpt\":\"\\n<h2>1. First Commit</h2>\\n<p>2008 年，@rsc 提交了 <a href=\\\"https://github.com/golang/go/commit/bf3dd3f0efe5b45947a991e22660c62d4ce6b671#diff-a8c424f9dc7e3acf3f180a5cbf3f7748e6fd39c6f1eab0b4fd7ec11c548cdbeb\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">sync.Mutex 的初始版本代码</a> ，早期实现相对简单，结合了 CAS（比较并交换）和信号量。</p>\",\"autoDesc\":true}")
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
