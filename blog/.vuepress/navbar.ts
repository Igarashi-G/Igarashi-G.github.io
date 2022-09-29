import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "运维",
    icon: "shell",
    prefix: "/unix/",
    children: [
      { text: "Linux", link: "Linux/Linux基础指引/计算机概论", icon: "linux"},
      { text: "CentOS", link: "CentOS/安装/CentOS的安装", icon: "centos"},
      { text: "Ubuntu", link: "Ubuntu/常用命令/Ubuntu系列操作", icon: "ubuntu"},
      { text: "虚拟机", link: "虚拟机/PVE/PVE", icon: "snow"},
    ],
  },
  {
    text: "Python",
    icon: "python",
    prefix: "/python/",
    children: [
      {
        text: "语言",
        icon: "guide",
        prefix: "语言/",
        children: [
          { text: "基础", link: "基础/环境安装" },
          { text: "进阶", link: "进阶/变量机制" },
          // { text: "高级", link: "高级/设计模式" },
          // { text: "网络编程", link: "网络编程" },
          // { text: "资源调度", link: "资源调度" },
          // { text: "异步编程", link: "异步编程" },
        ],
      },
      // {
      //   text: "库",
      //   icon: "edit",
      //   prefix: "库/",
      //   children: [
      //     { text: "标准库基础", link: "标准库基础" },
      //     { text: "高级", link: "高级" },
      //     { text: "第三方库", link: "第三方库" },
      //   ],
      // },
      // {
      //   text: "框架",
      //   icon: "edit",
      //   prefix: "框架/",
      //   children: [
      //     { text: "网络框架基础", link: "网络框架基础" },
      //     { text: "Django", link: "Django" },
      //     { text: "Tronado", link: "Tronado" },
      //     { text: "FastAPI", link: "FastAPI" },
      //   ],
      // },
    ],
  },
  {
    text: "漫漫全干卷的苦",
    children: [
      { text: "GO", icon: "hot", link: "https://draveness.me/golang/" },
      { text: "前端内卷不归路", icon: "html", link: "https://notes.fe-mm.com/interview/base/types.html" },
    ],
  },
  {
    text: "工具",
    icon: "tool",
    prefix: "/tool/",
    children: [
      { text: "Git", link: "Git/Git" , icon: "git"},
      { text: "Docker", link: "Docker/docker容器" , icon: "hot"},
      { text: "Kubernets", link: "Kubernets/K8s基础" , icon: "hot"},
      { text: "Nginx", link: "Nginx/Nginx基础" , icon: "nginx"},
      { text: "其他", link: "Other/网络代理" , icon: "operate"},
    ],
  },
  // "/home",
  // { text: "使用指南", icon: "creative", link: "/guide/" },
  // {
  //   text: "博文",
  //   icon: "edit",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "文章 1-4",
  //       icon: "edit",
  //       prefix: "article/",
  //       children: [
  //         { text: "文章 1", icon: "edit", link: "article1" },
  //         { text: "文章 2", icon: "edit", link: "article2" },
  //         "article3",
  //         "article4",
  //       ],
  //     },
  //     {
  //       text: "文章 5-12",
  //       icon: "edit",
  //       children: [
  //         {
  //           text: "文章 5",
  //           icon: "edit",
  //           link: "article/article5",
  //         },
  //         {
  //           text: "文章 6",
  //           icon: "edit",
  //           link: "article/article6",
  //         },
  //         "article/article7",
  //         "article/article8",
  //       ],
  //     },
  //     { text: "文章 9", icon: "edit", link: "article9" },
  //     { text: "文章 10", icon: "edit", link: "article10" },
  //     "article11",
  //     "article12",
  //   ],
  // },
  // {
  //   text: "主题文档",
  //   icon: "note",
  //   link: "https://vuepress-theme-hope.github.io/v2/zh/",
  // },
]);
