import comp from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/blog/.vuepress/.temp/pages/unix/CentOS/DNS/脚本说明.html.vue"
const data = JSON.parse("{\"path\":\"/unix/CentOS/DNS/%E8%84%9A%E6%9C%AC%E8%AF%B4%E6%98%8E.html\",\"title\":\"DNS脚本说明\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"DNS脚本说明\",\"order\":4,\"description\":\"说明 文件路径： 命令参数: 通过 sh 启动：/usr/lib/uraid/scripts/dns/dns-bind.sh 首先要从 utecd 中导入数据,启动 bind: /usr/lib/uraid/scripts/dns/dns-bind.sh -method start_bind 添加配置项: 删除配置项: 列出所有域名： /usr/lib...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"DNS脚本说明\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"悦·宝宝\\\",\\\"url\\\":\\\"https://github.com/Igarashi-G\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/unix/CentOS/DNS/%E8%84%9A%E6%9C%AC%E8%AF%B4%E6%98%8E.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"悦 ▪ 宝宝\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"DNS脚本说明\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"说明 文件路径： 命令参数: 通过 sh 启动：/usr/lib/uraid/scripts/dns/dns-bind.sh 首先要从 utecd 中导入数据,启动 bind: /usr/lib/uraid/scripts/dns/dns-bind.sh -method start_bind 添加配置项: 删除配置项: 列出所有域名： /usr/lib...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":2.1,\"words\":631},\"filePathRelative\":\"unix/CentOS/DNS/脚本说明.md\",\"excerpt\":\"\\n<h4>文件路径：</h4>\\n<pre><code>测试环境：172.18.70.203\\n路径：\\n    /usr/lib/uraid/scripts/dns\\n</code></pre>\\n<h4>命令参数:</h4>\\n<p>通过 sh 启动：/usr/lib/uraid/scripts/dns/dns-bind.sh</p>\\n<pre><code>optional arguments:\\n  -h, --help        show this help message and exit\\n  -method METHOD    方法包含\\n                        start_bind：同步uetcdc中数据，启动bind\\n                        add_conf：添加配置项\\n                        del_conf：删除配置项\\n                        list: 显示所有域名\\n                            若指定 -addr 则显示对应域名的所有ip\\n\\n  -ip IP            ip地址\\n  -addr ADDR        域名\\n</code></pre>\",\"autoDesc\":true}")
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
