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
      {
        text: "生态",
        icon: "edit",
        prefix: "生态/",
        children: [
          { text: "Web框架", link: "Web框架/网络框架基础/WEB框架本质", icon: "framework"},
          { text: "远程调用", link: "远程调用/gRPC", icon: "rpc"},
          { text: "消息队列", link: "消息队列/kafka" , icon: "kafka"},
          { text: "异步任务", link: "异步任务/Celery", icon: "tasks"},
        ],
      },
    ],
  },
  {
    text: "Golang",
    icon: "go",
    prefix: "/go/",
    children: [
      {
        text: "基础",
        prefix: "基础/",
        children: [
          { text: "go语言速记", link: "go语言速记" },
          { text: "go工具速用", link: "go工具速用" },
        ],
      },
      {
        text: "算法与数据结构",
        prefix: "算法与数据结构/",
        children: [
          { text: "概述", link: "概述" },
        ],
      },
      {
        text: "优化",
        prefix: "优化/",
        children: [
          { text: "优化", link: "关于MapReduce" },
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
      { text: "Ubuntu", link: "Ubuntu/下载/Ubuntu系统", icon: "ubuntu"},
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
      { text: "Prometheus", link: "Prometheus/安装" , icon: "prometheus"},
      { text: "Tailscale", link: "Tailscale/tailscale" , icon: "tailscale"},
      { text: "工具", link: "Other/网络代理" , icon: "other"},
    ],
  },
  {
    text: "漫漫全干卷的苦",
    children: [
      { text: "GO语言设计与实现", icon: "go", link: "https://draveness.me/golang/" },
      { text: "GO备忘", icon: "go", link: "https://pegasuswang.github.io/LetsGo/basics/01_go_basic_types/basic_types/" },
      { text: "前端内卷不归路", icon: "javascript", link: "https://notes.fe-mm.com/interview/base/types.html" },
    ],
  },
  {
    text: "AI",
    icon: "ai",
    prefix: "/ai/",
    children: [
      { text: "HelloAgents", icon: "agentic", link: "HelloAgents/Decoder-Only架构" },
      ],
  },
]);
