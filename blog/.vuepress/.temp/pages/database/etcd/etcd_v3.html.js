export const data = JSON.parse("{\"key\":\"v-3ed6ed11\",\"path\":\"/database/etcd/etcd_v3.html\",\"title\":\"etcd v3\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"etcd v3\",\"order\":2,\"summary\":\"ETCD V3 基础使用 一、区别 1.兼容性： etcd2 和 etcd3 是不兼容的，两者的 api 参数也不一样，详细请查看 etcdctl -h 2.写入： 可以使用 api2 和 api3 写入 etcd3 数据，但是需要注意，使用不同的 api 版本写入数据需要使用相应的 api 版本读取数据 3.列目录： etcd3 没有 ls 使用 get \",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://igarashi-g.github.io/igarashi-blog/igarashi-blog/database/etcd/etcd_v3.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"五十岚呐~\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"etcd v3\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"一、区别\",\"slug\":\"一、区别\",\"link\":\"#一、区别\",\"children\":[]}],\"readingTime\":{\"minutes\":0.82,\"words\":247},\"filePathRelative\":\"database/etcd/etcd_v3.md\"}")

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
