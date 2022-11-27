import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
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
          { text: "深入", link: "深入/垃圾回收" },
          { text: "网络编程", link: "网络编程/Socket" },
          { text: "多任务编程", link: "多任务编程/进程" },
          { text: "asyncio", link: "asyncio/asyncio基础" },
          { text: "库", link: "库/标准库链接" },
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
      {
        text: "生态",
        icon: "edit",
        prefix: "生态/",
        children: [
          { text: "远程调用", link: "远程调用/gRPC", icon: "rpc"},
          { text: "消息队列", link: "消息队列/kafka" , icon: "kafka"},
          { text: "异步任务", link: "异步任务/Celery", icon: "tasks"},
        ],
      },
    ],
  },
  {
    text: "数据库",
    icon: "database",
    prefix: "/database/",
    children: [
      { text: "etcd", link: "etcd/etcd", icon: "etcd"},
      { text: "MySQL", link: "MySQL/MySQL", icon: "mysql"},
      { text: "Redis", link: "Redis/redis", icon: "redis"},
      { text: "PostgreSQL", link: "PostgreSQL/PostgreSQL", icon: "postgresql"},
    ],
  },
  {
    text: "操作系统",
    icon: "os",
    prefix: "/unix/",
    children: [
      { text: "Linux", link: "Linux/Linux基础指引/计算机概论", icon: "linux"},
      { text: "CentOS", link: "CentOS/安装/CentOS的安装", icon: "centos"},
      { text: "Ubuntu", link: "Ubuntu/常用命令/Ubuntu系列操作", icon: "ubuntu"},
      { text: "虚拟机", link: "虚拟机/PVE/PVE", icon: "pve"},
    ],
  },
  {
    text: "运维工具",
    icon: "devops",
    prefix: "/tool/",
    children: [
      { text: "Git", link: "Git/Git" , icon: "git"},
      { text: "Nginx", link: "Nginx/Nginx基础" , icon: "nginx"},
      { text: "Docker", link: "Docker/docker容器" , icon: "docker"},
      { text: "Kubernetes", link: "Kubernetes/k8s资源Pod" , icon: "kubernetes"},
      { text: "工具", link: "Other/网络代理" , icon: "other"},
    ],
  },
  {
    text: "漫漫全干卷的苦",
    children: [
      { text: "GO", icon: "go", link: "https://draveness.me/golang/" },
      { text: "GO备忘", icon: "go", link: "https://pegasuswang.github.io/LetsGo/basics/01_go_basic_types/basic_types/" },
      { text: "前端内卷不归路", icon: "javascript", link: "https://notes.fe-mm.com/interview/base/types.html" },
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
