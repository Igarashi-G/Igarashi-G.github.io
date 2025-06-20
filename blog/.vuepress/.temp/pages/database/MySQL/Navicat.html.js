import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/database/MySQL/Navicat.html.vue"
const data = JSON.parse("{\"path\":\"/database/MySQL/Navicat.html\",\"title\":\"Navicat\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Navicat\",\"order\":5,\"description\":\"Navicat： 二、练习题： 练习：http://www.cnblogs.com/wupeiqi/articles/5748496.html 往往那些独立存在的表，如：班级表只有 cid 和班号的，通常称为字典表。可以用于其他表的关联（也就是外键，如学生对班级）而多关联的 则就是多个外键。（如课程对班级和老师、成绩表对应关联了学生和课程） 三、pyt...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Navicat\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/database/MySQL/Navicat.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Navicat\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Navicat： 二、练习题： 练习：http://www.cnblogs.com/wupeiqi/articles/5748496.html 往往那些独立存在的表，如：班级表只有 cid 和班号的，通常称为字典表。可以用于其他表的关联（也就是外键，如学生对班级）而多关联的 则就是多个外键。（如课程对班级和老师、成绩表对应关联了学生和课程） 三、pyt...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":10.87,\"words\":3261},\"filePathRelative\":\"database/MySQL/Navicat.md\",\"excerpt\":\"\\n<pre><code>可视化管理，用于连接数据库，可以帮咱们做各种操作（点点点——&gt;SQL语句）\\n下载：navicat，简化简单操作：创建表、修改表结构、增删改查等等。（但是不能看靠鼠标完成连表等复杂操作，只用于提高效率，因此应掌握各种命令）\\n（对于不太规范的公司，允许直接用navicat直连，进行操作。但大部分公司担心第三方种了木马（不安全，公司不给掏钱买正版而用破解版），可能导致输\\n    入登录数据被发送到黑客邮箱而泄露，从而被删库等等，因此大部分公司不允许用第三方工具，只能用原生的mysql，但初学者不用担心）\\n\\n\\nNavicat复制数据库：\\n    找到目标数据库的表，右键转储SQL数据和结构 -&gt; 新建数据库（名称，字符集utf8）-&gt; 右键运行SQL文件-&gt; 找到转储的文件路径\\n    -&gt; 刷新\\n</code></pre>\",\"autoDesc\":true}")
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
