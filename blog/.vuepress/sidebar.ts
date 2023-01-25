import { sidebar } from "vuepress-theme-hope";

// export default sidebar([
//   "/",
//   "/home",
//   "/slides",
//   {
//     text: "如何使用",
//     icon: "creative",
//     prefix: "/guide/",
//     link: "/guide/",
//     children: "structure",
//   },

//   {
//     text: "文章",
//     icon: "note",
//     prefix: "/posts/",
//     children: [
//       {
//         text: "文章 1-4",
//         icon: "note",
//         collapsable: true,
//         prefix: "article/",
//         children: ["article1", "article2", "article3", "article4"],
//       },
//       {
//         text: "文章 5-12",
//         icon: "note",
//         children: [
//           {
//             text: "文章 5-8",
//             icon: "note",
//             collapsable: true,
//             prefix: "article/",
//             children: ["article5", "article6", "article7", "article8"],
//           },
//           {
//             text: "文章 9-12",
//             icon: "note",
//             children: ["article9", "article10", "article11", "article12"],
//           },
//         ],
//       },
//     ],
//   },
// ]);
export default sidebar({
  "/unix/Linux": [
    {
      text: "Linux",
      icon: "linux",
      prefix: "/unix/Linux/",
      children: [
        {
          text: "Linux基础指引",
          collapsable: true,
          prefix: "Linux基础指引/",
          children: ["计算机概论", "主机规划与磁盘分区", "Linux是什么与如何学习"],
        },
        {
          text: "Linux文件",
          collapsable: true,
          prefix: "Linux文件/",
          children: ["文件权限与目录配置", "文件与文件系统压缩", "Linux磁盘与文件系统管理"],
        },
        {
          text: "Shell脚本",
          collapsable: true,
          prefix: "Shell脚本/",
          children: ["vim程序编辑器", "vim 快捷键"],
        },
        {
          text: "Linux使用者管理",
          collapsable: true,
          prefix: "Linux使用者管理/",
          children: ["账号管理与ACL权限"],
        },
        {
          text: "Linux系统管理员",
          collapsable: true,
          prefix: "Linux系统管理员/",
          children: ["认识系统服务"],
        },
        {
          text: "网络",
          collapsable: true,
          prefix: "网络/",
          children: ["网络基础", "命令", "CURL", "SSL协议", "Restful"],
        },
        {
          text: "备忘命令",
          collapsable: true,
          prefix: "备忘命令/",
          children: ["常复习"],
        },
      ]
    }
  ],
  "/unix/CentOS": [
    {
      text: "CentOS",
      icon: "centos",
      prefix: "/unix/CentOS/",
      children: [
        {
          text: "安装",
          collapsable: true,
          prefix: "安装/",
          children: ["CentOS的安装", "RPM包管理"],
        },
        {
          text: "UFS",
          collapsable: true,
          prefix: "UFS/",
          children: ["ufs管理平台", "ufs核心组件", "ufscli工具", "uus虚拟机排错", "iso构建以及发布"],
        },
        {
          text: "NFS",
          collapsable: true,
          prefix: "NFS/",
          children: ["NFS服务"],
        },
        {
          text: "Samba",
          collapsable: true,
          prefix: "Samba/",
          children: ["Samba服务"],
        },
        {
          text: "LDAP",
          collapsable: true,
          prefix: "LDAP/",
          children: ["AD域", "LDAP", "Python对接AD域"],
        },
      ]
    }
  ],
  "/unix/Ubuntu": [
    {
      text: "Ubuntu",
      icon: "ubuntu",
      prefix: "/unix/Ubuntu/",
      children: [
        {
          text: "常用命令",
          collapsable: true,
          prefix: "常用命令/",
          children: ["Ubuntu系列操作"],
        },
      ]
    }
  ],
  "/unix/虚拟机": [
    {
      text: "虚拟机",
      icon: "pve",
      prefix: "/unix/虚拟机/",
      children: [
        {
          text: "PVE",
          icon: "pve",
          collapsable: true,
          prefix: "PVE/",
          children: ["PVE"],
        },
        {
          text: "VMware",
          icon: "vmware",
          collapsable: true,
          prefix: "VMware/",
          children: ["网络配置", "添加磁盘"],
        },
      ]
    }
  ],
  "/python": [
    {
      text: "python",
      icon: "python",
      prefix: "/python/",
      link: "/python/",
      children: [
        {
          text: "语言",
          icon: "guide",
          collapsable: true,
          prefix: "语言/",
          children: [
            {
              text: "基础",
              collapsable: true,
              prefix: "基础/",
              children: ["环境安装", "pip", "数据类型", "流程控制", "字符编码", "文件基础"],
            },
            {
              text: "进阶",
              collapsable: true,
              prefix: "进阶/",
              children: ["变量机制", "函数", "模块和包", "装饰器", "迭代器", "生成器", "错误和异常", "面向对象"],
            },
            {
              text: "深入",
              collapsable: true,
              prefix: "深入/",
              children: ["垃圾回收", "序列进阶", "映射进阶", "设计模式", "Cpython对象"],
            },
            {
              text: "网络编程",
              collapsable: true,
              prefix: "网络编程/",
              children: ["回调", "事件模型", "Socket", "WebSocket"],
            },
            {
              text: "多任务编程",
              collapsable: true,
              prefix: "多任务编程/",
              children: ["进程", "多进程编程", "线程", "多线程编程", "同步队列", "协程"],
            },
            {
              text: "asyncio",
              collapsable: true,
              prefix: "asyncio/",
              children: ["asyncio基础", "asyncio进阶", "底层实现", "事件循环"],
            },
            {
              text: "库",
              collapsable: true,
              prefix: "库/",
              children: ["标准库链接"],
            },
          ],
        },
        // {
        //   text: "框架",
        //   icon: "frame",
        //   collapsable: true,
        //   prefix: "框架/",
        //   children: []
        // },
        // {
        //   text: "生态",
        //   icon: "autumn",
        //   collapsable: true,
        //   prefix: "生态/",
        //   children: []
        // },
      ],
    },
  ],
  "/go": [
    {
      text: "go",
      icon: "go",
      prefix: "/go/",
      link: "/go/",
      children: [
        {
          text: "基础",
          collapsable: true,
          prefix: "基础/",
          children: [
            "go语言速记"
          ]
        },
        {
          text: "算法与数据结构",
          collapsable: true,
          prefix: "算法与数据结构/",
          children: [
            "数组",
            "线性表",
            "栈与队列"
          ]
        },
      ]
    },
  ],
  "/database/etcd": [
    {
      text: "etcd",
      icon: "etcd",
      prefix: "/database/etcd/",
      link: "/database/etcd/",
      children: ["etcd"]
    }
  ],
  "/database/MySQL": [
    {
      text: "MySQL",
      icon: "mysql",
      prefix: "/database/MySQL/",
      link: "/database/MySQL/",
      children: ["MySQL"]
    }
  ],
  "/database/PostgreSQL": [
    {
      text: "PostgreSQL",
      icon: "postgresql",
      prefix: "/database/PostgreSQL/",
      link: "/database/PostgreSQL/",
      children: ["PostgreSQL"]
    }
  ],
  "/database/Redis": [
    {
      text: "Redis",
      icon: "redis",
      prefix: "/database/Redis/",
      link: "/database/Redis/",
      children: ["redis"]
    }
  ],
  "/tool/Git": [
    {
      text: "版本控制",
      icon: "git",
      prefix: "/tool/Git/",
      link: "/tool/Git/",
      children: ["Git", "GIt提交规则", "安装Gitlab"]
    }
  ],
  "/tool/Docker": [
    {
      text: "Docker",
      icon: "docker",
      prefix: "/tool/Docker/",
      link: "/tool/Docker/",
      children: ["docker容器", "使用基础", "命令"] // "网络",
    }
  ],
  "/tool/Kubernetes": [
    {
      text: "Kubernetes",
      icon: "kubernetes",
      prefix: "/tool/Kubernetes/",
      link: "/tool/Kubernetes/",
      children: ["k8s安装", "k8s资源Pod", "k8s工作负载", "k8s服务", "k8s存储", "k8s进阶", "Helm安装使用"]
    }
  ],
  "/tool/Prometheus": [
    {
      text: "Prometheus",
      icon: "prometheus",
      prefix: "/tool/Prometheus/",
      link: "/tool/Prometheus/",
      children: ["安装", "基本使用"]
    }
  ],
  "/tool/Nginx": [
    {
      text: "Nginx",
      icon: "nginx",
      prefix: "/tool/Nginx/",
      link: "/tool/Nginx/",
      children: ["Nginx基础", "应用部署"]
    }
  ],
  "/tool/Other": [
    {
      text: "Other",
      icon: "other",
      prefix: "/tool/Other/",
      link: "/tool/Other/",
      children: ["rdesktop", "screen", "网络代理"]
    }
  ],
  "/book": [
    {
      text: "书籍",
      icon: "book",
      prefix: "/book/",
      link: "/book/",
      children: ["艺术", "社会学", "金融学", "心理学", "python", "技术"],
    }
  ],
  "/guide": [
    {
      text: "如何使用",
      icon: "creative",
      prefix: "/guide/",
      link: "/guide/",
      children: ["disable", "encrypt", "markdown", "page"],
    },
  ],
})
