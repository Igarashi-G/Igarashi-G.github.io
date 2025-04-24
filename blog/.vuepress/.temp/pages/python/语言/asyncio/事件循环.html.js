import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/python/语言/asyncio/事件循环.html.vue"
const data = JSON.parse("{\"path\":\"/python/%E8%AF%AD%E8%A8%80/asyncio/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.html\",\"title\":\"事件循环\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"事件循环\",\"order\":4,\"description\":\"asyncio ———— 不同线程的事件循环 https://www.cnblogs.com/yanzi-meng/p/8533734.html 不同线程的事件循环 1.同一线程： 【发现问题】： 上述代码在一个线程中执行的事件循环，除非只有我们主动关闭事件 close，事件循环才会结束。否则输出完 534 结果一致会进行阻塞，等待其他协程 任务到达，...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"事件循环\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/asyncio/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"事件循环\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"asyncio ———— 不同线程的事件循环 https://www.cnblogs.com/yanzi-meng/p/8533734.html 不同线程的事件循环 1.同一线程： 【发现问题】： 上述代码在一个线程中执行的事件循环，除非只有我们主动关闭事件 close，事件循环才会结束。否则输出完 534 结果一致会进行阻塞，等待其他协程 任务到达，...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":4.88,\"words\":1465},\"filePathRelative\":\"python/语言/asyncio/事件循环.md\",\"excerpt\":\"\\n<p><a href=\\\"https://www.cnblogs.com/yanzi-meng/p/8533734.html\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://www.cnblogs.com/yanzi-meng/p/8533734.html</a></p>\\n<h2>不同线程的事件循环</h2>\\n<h3>1.同一线程：</h3>\\n<pre><code>import asyncio,time\\n\\nasync def func1(num):\\n    print(num,'before---func1----')\\n    await asyncio.sleep(num)\\n    return \\\"recv num %s\\\"%num\\n\\nif __name__ == \\\"__main__\\\":\\n    begin = time.time()\\n\\n    coroutine1 = func1(5)\\n    coroutine2 = func1(3)\\n    coroutine3 = func1(4)\\n\\n    tasks = [\\n        asyncio.ensure_future(coroutine1),\\n        asyncio.ensure_future(coroutine2),\\n        asyncio.ensure_future(coroutine3),\\n    ]\\n\\n\\n    loop = asyncio.get_event_loop()\\n    loop.run_until_complete(asyncio.wait(tasks))\\n    loop.run_forever()\\n    end = time.time()\\n    print(end-begin)\\n</code></pre>\",\"autoDesc\":true}")
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
