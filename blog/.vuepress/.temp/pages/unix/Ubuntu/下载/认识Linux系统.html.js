import comp from "D:/Program/Igarashi-G.github.io/blog/.vuepress/.temp/pages/unix/Ubuntu/下载/认识Linux系统.html.vue"
const data = JSON.parse("{\"path\":\"/unix/Ubuntu/%E4%B8%8B%E8%BD%BD/%E8%AE%A4%E8%AF%86Linux%E7%B3%BB%E7%BB%9F.html\",\"title\":\"认识Linux系统二\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"认识Linux系统二\",\"order\":3,\"description\":\"linux 系统下一切皆文件,就是说一切都是文件这个概念 /所有文件都源于\\\"/\\\"根 从根开始以下均为树形目录 /boot 存放 boot 配置文件、内核及其他启动文件 /etc 存放系统配置有关的文件 /home 存放普通用户的文件 /mnt 硬盘上手动挂载的文件系统 /opt 存放一些可选程序 入某个程序的测试版本,安装到该目录的程序的所有数据,库文...\"},\"readingTime\":{\"minutes\":12.64,\"words\":3791},\"filePathRelative\":\"unix/Ubuntu/下载/认识Linux系统.md\",\"excerpt\":\"<p>linux 系统下一切皆文件,就是说一切都是文件这个概念<br>\\n/所有文件都源于\\\"/\\\"根<br>\\n从根开始以下均为树形目录<br>\\n/boot 存放 boot 配置文件、内核及其他启动文件<br>\\n/etc 存放系统配置有关的文件<br>\\n/home 存放普通用户的文件<br>\\n/mnt 硬盘上手动挂载的文件系统<br>\\n/opt 存放一些可选程序 入某个程序的测试版本,安装到该目录的程序的所有数据,库文件都存在于同个目录下<br>\\n/media 自动挂载的硬盘分区以及类似 cd、数码相机等可移动介质<br>\\n/root 系统管理员的目录 root 如上帝 一般情况不要使用<br>\\n/bin 存放常用的应用程序(命令文件)<br>\\n/tmp 临时目录存放临时文件<br>\\n/usr 这个目录下,你可以找到那些不适合放在/bin 或/etc 目录下的额外工具<br>\\n/var 存放那些经常被修改的文件,包括各种日志,数据文件<br>\\n/lib 存放程序运行等等所需要的文件<br>\\n/lost+found 突然断电时存放的临时文件<br>\\n/dev 存放设备文件(光驱、硬盘什么的)<br>\\n/proc /sys 虚拟文件相关 系统的一些信息 如 cat /proc/cpuinfo 伪文件系统、</p>\",\"autoDesc\":true}")
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
