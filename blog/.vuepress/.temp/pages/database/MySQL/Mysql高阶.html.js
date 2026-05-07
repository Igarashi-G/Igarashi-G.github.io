import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/database/MySQL/Mysql高阶.html.vue"
const data = JSON.parse("{\"path\":\"/database/MySQL/Mysql%E9%AB%98%E9%98%B6.html\",\"title\":\"Mysql高阶\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Mysql高阶\",\"order\":3,\"description\":\"5、函数：（不太重要） MySQL 中提供了许多内置函数，例如：见博客 CHARLENGTH(str)：获取字符串长度 select char_length(\\\"igarashi\\\") CONCAT(str1,str2,...)：字符串拼接 select concat(\\\"igarashi\\\",\\\"xx\\\",\\\"123\\\") CONCAT_WS(separator,s...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Mysql高阶\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/database/MySQL/Mysql%E9%AB%98%E9%98%B6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Mysql高阶\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"5、函数：（不太重要） MySQL 中提供了许多内置函数，例如：见博客 CHARLENGTH(str)：获取字符串长度 select char_length(\\\"igarashi\\\") CONCAT(str1,str2,...)：字符串拼接 select concat(\\\"igarashi\\\",\\\"xx\\\",\\\"123\\\") CONCAT_WS(separator,s...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":16.51,\"words\":4953},\"filePathRelative\":\"database/MySQL/Mysql高阶.md\",\"excerpt\":\"<p>5、函数：（不太重要）<br>\\nMySQL 中提供了许多内置函数，例如：见博客<br>\\nCHAR<em>LENGTH(str)：获取字符串长度 select char_length(\\\"igarashi\\\")<br>\\nCONCAT(str1,str2,...)：字符串拼接 select concat(\\\"igarashi\\\",\\\"xx\\\",\\\"123\\\")<br>\\nCONCAT_WS(separator,str1,str2,...)：字符串拼接（自定义连接符）类似\\\"</em>\\\".join select concat<em>ws(\\\"</em>\\\",\\\"3\\\",\\\"a\\\") ###后面懒得写，见博客<br>\\n创建函数：<br>\\ndelimiter \\\\<br>\\ncreate function f1(i1 int,i2 int) --函数的参数<br>\\nreturns int --多了返回值 数字类型，相当于 java 的 public int func() 指定返回类型<br>\\nBEGIN<br>\\ndeclare num int;<br>\\nset num = i1 + i2;<br>\\nreturn(num);<br>\\nEND \\\\<br>\\ndelimiter ;</p>\",\"autoDesc\":true}")
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
