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
          text: "LDAP",
          collapsable: true,
          prefix: "LDAP/",
          children: ["LDAP"],
        },
      ]
    }
  ],
  "/unix/CentOS": [
    {
      text: "CentOS",
      icon: "centoS",
      prefix: "/unix/CentOS/",
      children: [
        {
          text: "安装",
          collapsable: true,
          prefix: "安装/",
          children: ["CentOS的安装"],
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
      icon: "snow",
      prefix: "/unix/虚拟机/",
      children: [
        {
          text: "PVE",
          collapsable: true,
          prefix: "PVE/",
          children: ["PVE"],
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
            // {
            //   text: "高级",
            //   collapsable: true,
            //   prefix: "高级/",
            //   children: ["设计模式", "垃圾回收", "序列进阶", "映射进阶", "Cpython对象"],
            // },
          ],
        },
        // {
        //   text: "库",
        //   icon: "customize",
        //   collapsable: true,
        //   prefix: "库/",
        //   children: [
        //     {
        //       text: "标准库基础",
        //       collapsable: true,
        //       prefix: "标准库基础/",
        //       children: ["时间", "系统相关", "序列化", "文本处理", "日志", "其他"],
        //     },
        //     {
        //       text: "标准库进阶",
        //       collapsable: true,
        //       prefix: "标准库进阶/",
        //       children: ["数据类型", "函数式编程", "文件操作", "运行时服务", "国际化", "SMTP", "其他"],
        //     },
        //     {
        //       text: "开源库",
        //       collapsable: true,
        //       prefix: "开源库/",
        //       children: ["arrow", "psutil"],
        //     },
        //   ]
        // },
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
      icon: "hot",
      prefix: "/tool/Docker/",
      link: "/tool/Docker/",
      children: ["docker容器", "使用基础", "网络", "命令"]
    }
  ],
  "/tool/Kubernets": [
    {
      text: "Kubernets",
      icon: "hot",
      prefix: "/tool/Kubernets/",
      link: "/tool/Kubernets/",
      children: ["K8s基础", "k8s安装"]
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
      icon: "operate",
      prefix: "/tool/Other/",
      link: "/tool/Other/",
      children: ["网络代理", "Screen", "rdesktop"]
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
