import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/database/MySQL/Mysql进阶.html.vue"
const data = JSON.parse("{\"path\":\"/database/MySQL/Mysql%E8%BF%9B%E9%98%B6.html\",\"title\":\"MySQL执行计划\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MySQL执行计划\",\"date\":\"2019-01-08T00:00:00.000Z\",\"category\":[\"数据库\"],\"tag\":[\"MySQL\"],\"description\":\"Mysql调优 1. 执行计划分析 1.1 什么是执行计划 执行计划: 指一条 SQL 语句在经过 MySQL 查询优化器 的优化后，具体的执行方式，常用于 SQL 性能分析、优化 等场景。 通过 EXPLAIN 的结果，能看到目标SQL 可 命中那些 索引、是什么 type、多少行记录被查询 等 支持 SELECT、DELETE、INSERT、REP...\"},\"readingTime\":{\"minutes\":1.22,\"words\":367},\"filePathRelative\":\"database/MySQL/Mysql进阶.md\",\"excerpt\":\"\\n<h3>1. 执行计划分析</h3>\\n<h4>1.1 什么是执行计划</h4>\\n<p><strong>执行计划:</strong>  指一条 SQL 语句在经过 <strong>MySQL 查询优化器</strong> 的优化后，具体的执行方式，常用于 <strong>SQL 性能分析、优化</strong> 等场景。</p>\\n<div class=\\\"language-sql line-numbers-mode\\\" data-highlighter=\\\"shiki\\\" data-ext=\\\"sql\\\" style=\\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\\"><pre class=\\\"shiki shiki-themes one-light one-dark-pro vp-code\\\"><code><span class=\\\"line\\\"><span style=\\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\\">EXPLAIN + </span><span style=\\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\\">SELECT</span><span style=\\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\\"> / </span><span style=\\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\\">UPDATE</span><span style=\\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\\"> / </span><span style=\\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\\">DELETE</span><span style=\\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\\">... 查询语句；</span></span></code></pre>\\n<div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\" style=\\\"counter-reset:line-number 0\\\"><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")
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
