// blog/.vuepress/config.ts
import { defineUserConfig } from "vuepress";

// blog/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// blog/.vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";
var navbar_default = navbar([
  "/",
  {
    text: "Python",
    icon: "python",
    prefix: "/python/",
    children: [
      {
        text: "\u8BED\u8A00",
        icon: "guide",
        prefix: "\u8BED\u8A00/",
        children: [
          { text: "\u57FA\u7840", link: "\u57FA\u7840/\u73AF\u5883\u5B89\u88C5" },
          { text: "\u8FDB\u9636", link: "\u8FDB\u9636/\u53D8\u91CF\u673A\u5236" },
          { text: "\u6DF1\u5165", link: "\u6DF1\u5165/\u5783\u573E\u56DE\u6536" },
          { text: "\u7F51\u7EDC\u7F16\u7A0B", link: "\u7F51\u7EDC\u7F16\u7A0B/Socket" },
          { text: "\u591A\u4EFB\u52A1\u7F16\u7A0B", link: "\u591A\u4EFB\u52A1\u7F16\u7A0B/\u8FDB\u7A0B" },
          { text: "asyncio", link: "asyncio/asyncio\u57FA\u7840" },
          { text: "\u5E93", link: "\u5E93/\u6807\u51C6\u5E93\u94FE\u63A5" }
        ]
      },
      {
        text: "\u751F\u6001",
        icon: "edit",
        prefix: "\u751F\u6001/",
        children: [
          { text: "Web\u6846\u67B6", link: "Web\u6846\u67B6/\u7F51\u7EDC\u6846\u67B6\u57FA\u7840/WEB\u6846\u67B6\u672C\u8D28", icon: "framework" },
          { text: "\u8FDC\u7A0B\u8C03\u7528", link: "\u8FDC\u7A0B\u8C03\u7528/gRPC", icon: "rpc" },
          { text: "\u6D88\u606F\u961F\u5217", link: "\u6D88\u606F\u961F\u5217/kafka", icon: "kafka" },
          { text: "\u5F02\u6B65\u4EFB\u52A1", link: "\u5F02\u6B65\u4EFB\u52A1/Celery", icon: "tasks" }
        ]
      }
    ]
  },
  {
    text: "Golang",
    icon: "go",
    prefix: "/go/",
    children: [
      {
        text: "\u57FA\u7840",
        prefix: "\u57FA\u7840/",
        children: [
          { text: "go\u8BED\u8A00\u901F\u8BB0", link: "go\u8BED\u8A00\u901F\u8BB0" },
          { text: "go\u5DE5\u5177\u901F\u7528", link: "go\u5DE5\u5177\u901F\u7528" }
        ]
      },
      {
        text: "\u7B97\u6CD5\u4E0E\u6570\u636E\u7ED3\u6784",
        prefix: "\u7B97\u6CD5\u4E0E\u6570\u636E\u7ED3\u6784/",
        children: [
          { text: "\u6982\u8FF0", link: "\u6982\u8FF0" }
        ]
      },
      {
        text: "\u4F18\u5316",
        prefix: "\u4F18\u5316/",
        children: [
          { text: "\u4F18\u5316", link: "\u5173\u4E8EMapReduce" }
        ]
      }
    ]
  },
  {
    text: "\u6570\u636E\u5E93",
    icon: "database",
    prefix: "/database/",
    children: [
      { text: "etcd", link: "etcd/etcd", icon: "etcd" },
      { text: "MySQL", link: "MySQL/MySQL", icon: "mysql" },
      { text: "Redis", link: "Redis/redis", icon: "redis" },
      { text: "PostgreSQL", link: "PostgreSQL/PostgreSQL", icon: "postgresql" }
    ]
  },
  {
    text: "\u64CD\u4F5C\u7CFB\u7EDF",
    icon: "os",
    prefix: "/unix/",
    children: [
      { text: "Linux", link: "Linux/Linux\u57FA\u7840\u6307\u5F15/\u8BA1\u7B97\u673A\u6982\u8BBA", icon: "linux" },
      { text: "CentOS", link: "CentOS/\u5B89\u88C5/CentOS\u7684\u5B89\u88C5", icon: "centos" },
      { text: "Ubuntu", link: "Ubuntu/\u4E0B\u8F7D/Ubuntu\u7CFB\u7EDF", icon: "ubuntu" },
      { text: "\u865A\u62DF\u673A", link: "\u865A\u62DF\u673A/PVE/PVE", icon: "pve" }
    ]
  },
  {
    text: "\u8FD0\u7EF4\u5DE5\u5177",
    icon: "devops",
    prefix: "/tool/",
    children: [
      { text: "Git", link: "Git/Git", icon: "git" },
      { text: "Nginx", link: "Nginx/Nginx\u57FA\u7840", icon: "nginx" },
      { text: "Docker", link: "Docker/docker\u5BB9\u5668", icon: "docker" },
      { text: "Kubernetes", link: "Kubernetes/k8s\u8D44\u6E90Pod", icon: "kubernetes" },
      { text: "Prometheus", link: "Prometheus/\u5B89\u88C5", icon: "prometheus" },
      { text: "\u5DE5\u5177", link: "Other/\u7F51\u7EDC\u4EE3\u7406", icon: "other" }
    ]
  },
  {
    text: "\u6F2B\u6F2B\u5168\u5E72\u5377\u7684\u82E6",
    children: [
      { text: "GO\u8BED\u8A00\u8BBE\u8BA1\u4E0E\u5B9E\u73B0", icon: "go", link: "https://draveness.me/golang/" },
      { text: "GO\u5907\u5FD8", icon: "go", link: "https://pegasuswang.github.io/LetsGo/basics/01_go_basic_types/basic_types/" },
      { text: "\u524D\u7AEF\u5185\u5377\u4E0D\u5F52\u8DEF", icon: "javascript", link: "https://notes.fe-mm.com/interview/base/types.html" }
    ]
  }
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

// blog/.vuepress/sidebar.ts
import { sidebar } from "vuepress-theme-hope";
var sidebar_default = sidebar({
  "/unix/Linux": [
    {
      text: "Linux",
      icon: "linux",
      prefix: "/unix/Linux/",
      children: [
        {
          text: "Linux\u57FA\u7840\u6307\u5F15",
          collapsable: true,
          prefix: "Linux\u57FA\u7840\u6307\u5F15/",
          children: ["\u8BA1\u7B97\u673A\u6982\u8BBA", "\u4E3B\u673A\u89C4\u5212\u4E0E\u78C1\u76D8\u5206\u533A", "Linux\u662F\u4EC0\u4E48\u4E0E\u5982\u4F55\u5B66\u4E60"]
        },
        {
          text: "Linux\u6587\u4EF6",
          collapsable: true,
          prefix: "Linux\u6587\u4EF6/",
          children: ["\u6587\u4EF6\u6743\u9650\u4E0E\u76EE\u5F55\u914D\u7F6E", "\u6587\u4EF6\u4E0E\u6587\u4EF6\u7CFB\u7EDF\u538B\u7F29", "Linux\u78C1\u76D8\u4E0E\u6587\u4EF6\u7CFB\u7EDF\u7BA1\u7406"]
        },
        {
          text: "Shell\u811A\u672C",
          collapsable: true,
          prefix: "Shell\u811A\u672C/",
          children: ["shell", "vim \u5FEB\u6377\u952E"]
        },
        {
          text: "Linux\u4F7F\u7528\u8005\u7BA1\u7406",
          collapsable: true,
          prefix: "Linux\u4F7F\u7528\u8005\u7BA1\u7406/",
          children: ["\u8D26\u53F7\u7BA1\u7406\u4E0EACL\u6743\u9650"]
        },
        {
          text: "Linux\u7CFB\u7EDF\u7BA1\u7406\u5458",
          collapsable: true,
          prefix: "Linux\u7CFB\u7EDF\u7BA1\u7406\u5458/",
          children: ["\u8BA4\u8BC6\u7CFB\u7EDF\u670D\u52A1"]
        },
        {
          text: "\u64CD\u4F5C\u7CFB\u7EDF",
          collapsable: true,
          prefix: "\u64CD\u4F5C\u7CFB\u7EDF/",
          children: ["\u64CD\u4F5C\u7CFB\u7EDF"]
        },
        {
          text: "\u7F51\u7EDC",
          collapsable: true,
          prefix: "\u7F51\u7EDC/",
          children: ["\u7F51\u7EDC\u57FA\u7840", "\u547D\u4EE4", "CURL", "P2P"]
        },
        {
          text: "Troubleshooting",
          collapsable: true,
          prefix: "Troubleshooting/",
          children: ["\u5907\u5FD8\u547D\u4EE4", "\u6545\u969C\u5FEB\u67E5"]
        }
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
          text: "\u5B89\u88C5",
          collapsable: true,
          prefix: "\u5B89\u88C5/",
          children: ["CentOS\u7684\u5B89\u88C5", "RPM\u5305\u7BA1\u7406"]
        },
        {
          text: "UFS",
          collapsable: true,
          prefix: "UFS/",
          children: ["ufs\u7BA1\u7406\u5E73\u53F0", "ufs\u6838\u5FC3\u7EC4\u4EF6", "ufscli\u5DE5\u5177", "uus\u865A\u62DF\u673A\u6392\u9519", "iso\u6784\u5EFA\u4EE5\u53CA\u53D1\u5E03"]
        },
        {
          text: "NFS",
          collapsable: true,
          prefix: "NFS/",
          children: ["NFS\u670D\u52A1"]
        },
        {
          text: "Samba",
          collapsable: true,
          prefix: "Samba/",
          children: ["Samba\u670D\u52A1", "rsync"]
        },
        {
          text: "LDAP",
          collapsable: true,
          prefix: "LDAP/",
          children: ["AD\u57DF", "LDAP", "Python\u5BF9\u63A5AD\u57DF"]
        },
        {
          text: "SNMP",
          collapsable: true,
          prefix: "SNMP/",
          children: ["SNMP\u670D\u52A1", "SNMP\u8BBE\u8BA1\u6587\u6863"]
        }
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
          text: "\u4E0B\u8F7D",
          collapsable: true,
          prefix: "\u4E0B\u8F7D/",
          children: ["Ubuntu\u7CFB\u7EDF"]
        }
      ]
    }
  ],
  "/unix/\u865A\u62DF\u673A": [
    {
      text: "\u865A\u62DF\u673A",
      icon: "pve",
      prefix: "/unix/\u865A\u62DF\u673A/",
      children: [
        {
          text: "PVE",
          icon: "pve",
          collapsable: true,
          prefix: "PVE/",
          children: ["PVE"]
        },
        {
          text: "VMware",
          icon: "vmware",
          collapsable: true,
          prefix: "VMware/",
          children: ["\u7F51\u7EDC\u914D\u7F6E", "\u6DFB\u52A0\u78C1\u76D8"]
        }
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
          text: "\u8BED\u8A00",
          icon: "guide",
          collapsable: true,
          prefix: "\u8BED\u8A00/",
          children: [
            {
              text: "\u57FA\u7840",
              collapsable: true,
              prefix: "\u57FA\u7840/",
              children: ["\u73AF\u5883\u5B89\u88C5", "pip", "\u6570\u636E\u7C7B\u578B", "\u6D41\u7A0B\u63A7\u5236", "\u5B57\u7B26\u7F16\u7801", "\u6587\u4EF6\u57FA\u7840", "Python\u9879\u76EE\u6253\u5305"]
            },
            {
              text: "\u8FDB\u9636",
              collapsable: true,
              prefix: "\u8FDB\u9636/",
              children: ["\u53D8\u91CF\u673A\u5236", "\u51FD\u6570", "\u6A21\u5757\u548C\u5305", "\u88C5\u9970\u5668", "\u8FED\u4EE3\u5668", "\u751F\u6210\u5668", "\u9519\u8BEF\u548C\u5F02\u5E38", "\u9762\u5411\u5BF9\u8C61", "\u4FE1\u53F7\u91CF"]
            },
            {
              text: "\u6DF1\u5165",
              collapsable: true,
              prefix: "\u6DF1\u5165/",
              children: ["\u5783\u573E\u56DE\u6536", "\u5E8F\u5217\u8FDB\u9636", "\u6620\u5C04\u8FDB\u9636", "\u8BBE\u8BA1\u6A21\u5F0F", "Cpython\u5BF9\u8C61"]
            },
            {
              text: "\u7F51\u7EDC\u7F16\u7A0B",
              collapsable: true,
              prefix: "\u7F51\u7EDC\u7F16\u7A0B/",
              children: ["\u56DE\u8C03", "\u4E8B\u4EF6\u6A21\u578B", "Socket", "WebSocket"]
            },
            {
              text: "\u591A\u4EFB\u52A1\u7F16\u7A0B",
              collapsable: true,
              prefix: "\u591A\u4EFB\u52A1\u7F16\u7A0B/",
              children: ["\u8FDB\u7A0B", "\u591A\u8FDB\u7A0B\u7F16\u7A0B", "\u7EBF\u7A0B", "\u591A\u7EBF\u7A0B\u7F16\u7A0B", "\u540C\u6B65\u961F\u5217", "\u534F\u7A0B", "Linux\u6587\u4EF6\u9501", "\u9AD8\u6027\u80FD\u7F16\u7A0B"]
            },
            {
              text: "asyncio",
              collapsable: true,
              prefix: "asyncio/",
              children: ["asyncio\u57FA\u7840", "asyncio\u8FDB\u9636", "\u5E95\u5C42\u5B9E\u73B0", "\u4E8B\u4EF6\u5FAA\u73AF"]
            },
            {
              text: "\u5E93",
              collapsable: true,
              prefix: "\u5E93/",
              children: ["\u6807\u51C6\u5E93\u94FE\u63A5"]
            }
          ]
        },
        {
          text: "\u751F\u6001",
          icon: "guide",
          collapsable: true,
          prefix: "\u751F\u6001/",
          children: [
            {
              text: "Web\u6846\u67B6",
              icon: "framework",
              collapsable: true,
              prefix: "Web\u6846\u67B6/",
              children: [
                {
                  text: "\u7F51\u7EDC\u6846\u67B6\u57FA\u7840",
                  collapsable: true,
                  prefix: "\u7F51\u7EDC\u6846\u67B6\u57FA\u7840/",
                  children: [
                    "WEB\u6846\u67B6\u672C\u8D28",
                    "\u72B6\u6001\u7BA1\u7406"
                  ]
                },
                {
                  text: "FastAPI",
                  icon: "fastapi",
                  collapsable: true,
                  prefix: "FastAPI/",
                  children: [
                    "FastAPI\u57FA\u7840",
                    "FastAPI\u57FA\u7840\u4E8C"
                  ]
                },
                {
                  text: "Django",
                  icon: "django",
                  collapsable: true,
                  prefix: "Django/",
                  children: [
                    "Django\u6982\u8FF0",
                    "Django\u57FA\u7840"
                  ]
                },
                {
                  text: "Tornado",
                  icon: "tornado",
                  collapsable: true,
                  prefix: "Tornado/",
                  children: [
                    "tornado"
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "/go": [
    {
      text: "go",
      icon: "go",
      prefix: "/go/",
      link: "/go/",
      children: [
        {
          text: "\u57FA\u7840",
          collapsable: true,
          prefix: "\u57FA\u7840/",
          children: [
            "go\u8BED\u8A00\u901F\u8BB0",
            "go\u5DE5\u5177\u901F\u7528",
            "\u95ED\u5305"
          ]
        },
        {
          text: "\u7B97\u6CD5\u4E0E\u6570\u636E\u7ED3\u6784",
          collapsable: true,
          prefix: "\u7B97\u6CD5\u4E0E\u6570\u636E\u7ED3\u6784/",
          children: [
            "\u6982\u8FF0",
            "\u6570\u7EC4",
            "\u7EBF\u6027\u8868",
            "\u6808\u4E0E\u961F\u5217",
            "\u6811"
          ]
        },
        {
          text: "\u4F18\u5316",
          collapsable: true,
          prefix: "\u4F18\u5316/",
          children: [
            "\u5173\u4E8EMapReduce",
            "H2O\u5F15\u53D1\u7684\u4F18\u5316"
          ]
        }
      ]
    }
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
      text: "\u7248\u672C\u63A7\u5236",
      icon: "git",
      prefix: "/tool/Git/",
      link: "/tool/Git/",
      children: ["Git", "GIt\u63D0\u4EA4\u89C4\u5219", "\u5B89\u88C5Gitlab"]
    }
  ],
  "/tool/Docker": [
    {
      text: "Docker",
      icon: "docker",
      prefix: "/tool/Docker/",
      link: "/tool/Docker/",
      children: ["docker\u5BB9\u5668", "\u4F7F\u7528\u57FA\u7840", "\u547D\u4EE4"]
      // "网络",
    }
  ],
  "/tool/Kubernetes": [
    {
      text: "Kubernetes",
      icon: "kubernetes",
      prefix: "/tool/Kubernetes/",
      link: "/tool/Kubernetes/",
      children: ["k8s\u5B89\u88C5", "k8s\u8D44\u6E90Pod", "k8s\u5DE5\u4F5C\u8D1F\u8F7D", "k8s\u670D\u52A1", "k8s\u5B58\u50A8", "k8s\u8FDB\u9636", "Helm\u5B89\u88C5\u4F7F\u7528"]
    }
  ],
  "/tool/Prometheus": [
    {
      text: "Prometheus",
      icon: "prometheus",
      prefix: "/tool/Prometheus/",
      link: "/tool/Prometheus/",
      children: ["\u5B89\u88C5", "\u57FA\u672C\u4F7F\u7528"]
    }
  ],
  "/tool/Nginx": [
    {
      text: "Nginx",
      icon: "nginx",
      prefix: "/tool/Nginx/",
      link: "/tool/Nginx/",
      children: ["Nginx\u57FA\u7840", "\u5E94\u7528\u90E8\u7F72"]
    }
  ],
  "/tool/Other": [
    {
      text: "Other",
      icon: "other",
      prefix: "/tool/Other/",
      link: "/tool/Other/",
      children: ["rdesktop", "screen", "\u7F51\u7EDC\u4EE3\u7406"]
    }
  ],
  "/book": [
    {
      text: "\u4E66\u7C4D",
      icon: "book",
      prefix: "/book/",
      link: "/book/",
      children: ["\u827A\u672F", "\u793E\u4F1A\u5B66", "\u91D1\u878D\u5B66", "\u5FC3\u7406\u5B66", "python", "\u6280\u672F"]
    }
  ],
  "/guide": [
    {
      text: "\u5982\u4F55\u4F7F\u7528",
      icon: "creative",
      prefix: "/guide/",
      link: "/guide/",
      children: ["disable", "encrypt", "markdown", "page"]
    }
  ]
});

// blog/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://igarashi-g.github.io/",
  author: {
    name: "\u60A6\xB7\u5B9D\u5B9D",
    url: "https://github.com/Igarashi-G"
  },
  iconAssets: "//at.alicdn.com/t/c/font_3654399_3ntst5bj8ws.css",
  logo: "avatar.jpg",
  repo: "Igarashi-G",
  docsDir: "demo/src",
  // navbar
  navbar: navbar_default,
  // sidebar
  sidebar: sidebar_default,
  footer: "\u9ED8\u8BA4\u9875\u811A",
  displayFooter: true,
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
  blog: {
    name: "\u60A6\xB7\u5B9D\u5B9D",
    avatar: "avatar.jpg",
    roundAvatar: true,
    description: "\u5565\u4E5F\u4E0D\u4F1A\u6EF4\u597D\u725B\u9A6C\uFF0C\u597D\u5403\u61D2\u505A\u7684\u5927\u6446\u9524",
    intro: "/intro",
    medias: {
      // Baidu: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Email: "https://example.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      GitHub: "https://github.com/Igarashi-G",
      Gitee: "https://gitee.com/igarashi"
      // Gitlab: "https://example.com",
      // Gmail: "https://example.com",
      // Instagram: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
    },
    //默认每个分页的文章数
    //https://vuepress-theme-hope.gitee.io/v2/zh/guide/blog/intro.html#%E5%A4%9A%E8%AF%AD%E8%A8%80%E6%94%AF%E6%8C%81
    articlePerPage: 12,
    // 在移动视图下访问非博客相关的页面时，你也可以在侧边栏看到它
    // https://vuepress-theme-hope.github.io/v2/zh/guide/blog/intro.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F
    sidebarDisplay: "mobile"
  },
  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
      "/paint/PS\u64CD\u4F5C\u57FA\u7840.html": ["1234"]
    }
  },
  plugins: {
    blog: {
      autoExcerpt: true,
      article: "/article/",
      // 文章列表
      category: "/category/",
      // 分类地图页
      categoryItem: "/category/:name/",
      // 特定分类列表
      tag: "/tag/",
      // 标签地图页
      tagItem: "/tag/:name/",
      // 特定标签列表
      encrypted: "/encrypted/",
      // 加密文章列表	
      slide: "/slide/",
      // 幻灯片列表
      star: "/star/",
      // 星标文章列表	
      timeline: "/timeline/"
      // 时间线列表	
    },
    copyCode: {},
    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    // comment: {
    //   /**
    //    * Using Giscus
    //    */
    //   provider: "Giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",
    //   /**
    //    * Using Twikoo
    //    */
    //   // provider: "Twikoo",
    //   // envId: "https://twikoo.ccknbc.vercel.app",
    //   /**
    //    * Using Waline
    //    */
    //   // provider: "Waline",
    //   // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    // },
    // 禁用不需要的配置
    mdEnhance: {
      // 自定义对齐
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/align.html
      align: true,
      // Markdown 元素添加属性
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/attrs.html
      attrs: true,
      chart: true,
      codetabs: true,
      // 添加提示、注释、信息、注意、警告和详情自定义容器的支持
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/container.html
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      // 启用图片标记
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/image.html#%E9%85%8D%E7%BD%AE
      imageMark: true,
      // 启用图片大小
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/image.html#%E9%85%8D%E7%BD%AE
      imageSize: true,
      // 支持导入其他文件
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/include.html#%E9%85%8D%E7%BD%AE
      include: true,
      lazyLoad: true,
      // 支持标记
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/mark.html
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"]
      },
      // 支持幻灯片
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/presentation.html
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"]
      },
      // 样式化
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/stylize.html
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded"
              };
          }
        }
      ],
      // 启用下角标
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/sup-sub.html#%E9%85%8D%E7%BD%AE
      sub: true,
      // 启用上角标
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/sup-sub.html#%E9%85%8D%E7%BD%AE
      sup: true,
      // 添加选项卡支持
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/tabs.html
      tabs: true,
      tex: true,
      vpre: true,
      vuePlayground: true
    },
    // 组件
    // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/components.html
    components: ["Badge", "PDF"]
    // 版权信息
    // https://vuepress-theme-hope.gitee.io/v2/zh/guide/feature/copyright.html
    // copyright: {
    //   global: true,
    //   hostname: "https://wemchao.ren",
    //   author: "xkrivzooh(https://wenchao.ren)",
    //   triggerWords: 20,
    // },
  },
  //主题色选择器 https://vuepress-theme-hope.gitee.io/v2/zh/guide/interface/theme-color.html#%E4%B8%BB%E9%A2%98%E8%89%B2%E9%80%89%E6%8B%A9%E5%99%A8
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f"
  },
  //全屏按钮：https://vuepress-theme-hope.gitee.io/v2/zh/guide/interface/others.html#%E5%85%A8%E5%B1%8F%E6%8C%89%E9%92%AE
  fullscreen: true,
  //深色模式 https://vuepress-theme-hope.gitee.io/v2/zh/guide/interface/darkmode.html
  darkmode: "switch",
  // switch enable
  //纯净模式 https://vuepress-theme-hope.gitee.io/v2/zh/guide/interface/pure.html
  pure: false,
  // 全局禁用是否展示编辑此页链接
  // https://vuepress-theme-hope.gitee.io/v2/zh/guide/feature/meta.html#%E5%9F%BA%E4%BA%8E-git-%E7%9A%84%E4%BF%A1%E6%81%AF
  editLink: false,
  //全局禁用是否显示页面贡献者
  // https://vuepress-theme-hope.gitee.io/v2/zh/guide/feature/meta.html#%E5%9F%BA%E4%BA%8E-git-%E7%9A%84%E4%BF%A1%E6%81%AF
  contributors: false
});

// blog/.vuepress/config.ts
import { viteBundler } from "@vuepress/bundler-vite";
import { searchPlugin } from "@vuepress/plugin-search";
var INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
var DRIVE_LETTER_REGEX = /^[a-z]:/i;
var config_default = defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "\u60A6 \u25AA \u5B9D\u5B9D",
  description: "\u60A6\u5B9D\u5B9D\u306E\u535A\u5BA2",
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/c/font_3654399_e6xix4avjkd.css"
      }
    ]
  ],
  theme: theme_default,
  //是否开启页面预拉取，如果服务器宽带足够，可改为 true，会提升其他页面加载速度
  shouldPrefetch: true,
  plugins: [
    // algolia 全文搜索：没设置爬虫的话，需删除 docsearchPlugin 区块以使用节点搜索
    // docsearchPlugin({
    // }),
    // 本地搜索：默认情况下，该插件会将页面标题和小标题作为搜索索引。
    searchPlugin({
      // 你的选项
      locales: {
        "/": {
          placeholder: "Search"
        }
      }
    })
  ],
  pagePatterns: [
    "**/*.md",
    "!**/*.snippet.md",
    "!.vuepress",
    "!node_modules"
  ],
  define: () => ({
    IS_NETLIFY: "NETLIFY" in process.env
  }),
  bundler: viteBundler({
    vuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "center"
        }
      }
    },
    viteOptions: {
      build: {
        // gitPage部署小坑，不识别打包后的 下划线开头的 _*.js 文件
        rollupOptions: {
          output: {
            // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
            sanitizeFileName(name) {
              const match = DRIVE_LETTER_REGEX.exec(name);
              const driveLetter = match ? match[0] : "";
              return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "");
            }
          }
        }
      }
    }
  })
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYmxvZy8udnVlcHJlc3MvY29uZmlnLnRzIiwgImJsb2cvLnZ1ZXByZXNzL3RoZW1lLnRzIiwgImJsb2cvLnZ1ZXByZXNzL25hdmJhci50cyIsICJibG9nLy52dWVwcmVzcy9zaWRlYmFyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDovUHJvZ3JhbS9JZ2FyYXNoaS1HLmdpdGh1Yi5pby9ibG9nLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvZ3JhbVxcXFxJZ2FyYXNoaS1HLmdpdGh1Yi5pb1xcXFxibG9nXFxcXC52dWVwcmVzc1xcXFxjb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2dyYW0vSWdhcmFzaGktRy5naXRodWIuaW8vYmxvZy8udnVlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lVXNlckNvbmZpZyB9IGZyb20gXCJ2dWVwcmVzc1wiO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSBcIi4vdGhlbWUuanNcIjtcclxuaW1wb3J0IHsgdml0ZUJ1bmRsZXIgfSBmcm9tIFwiQHZ1ZXByZXNzL2J1bmRsZXItdml0ZVwiO1xyXG5pbXBvcnQgeyBzZWFyY2hQbHVnaW4gfSBmcm9tIFwiQHZ1ZXByZXNzL3BsdWdpbi1zZWFyY2hcIjtcclxuXHJcbmNvbnN0IElOVkFMSURfQ0hBUl9SRUdFWCA9IC9bXFx4MDAtXFx4MUZcXHg3Rjw+KiNcInt9fF5bXFxdYDs/OiY9KyQsXS9nO1xyXG5jb25zdCBEUklWRV9MRVRURVJfUkVHRVggPSAvXlthLXpdOi9pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XHJcbiAgYmFzZTogXCIvXCIsXHJcblxyXG4gIGxhbmc6IFwiemgtQ05cIixcclxuICB0aXRsZTogXCJcdTYwQTYgXHUyNUFBIFx1NUI5RFx1NUI5RFwiLFxyXG4gIGRlc2NyaXB0aW9uOiBcIlx1NjBBNlx1NUI5RFx1NUI5RFx1MzA2RVx1NTM1QVx1NUJBMlwiLFxyXG5cclxuICBoZWFkOiBbXHJcbiAgICBbXHJcbiAgICAgIFwibGlua1wiLFxyXG4gICAgICB7XHJcbiAgICAgICAgcmVsOiBcInN0eWxlc2hlZXRcIixcclxuICAgICAgICBocmVmOiBcIi8vYXQuYWxpY2RuLmNvbS90L2MvZm9udF8zNjU0Mzk5X2U2eGl4NGF2amtkLmNzc1wiLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICBdLFxyXG5cclxuICB0aGVtZSxcclxuICBcclxuICAvL1x1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRlx1OTg3NVx1OTc2Mlx1OTg4NFx1NjJDOVx1NTNENlx1RkYwQ1x1NTk4Mlx1Njc5Q1x1NjcwRFx1NTJBMVx1NTY2OFx1NUJCRFx1NUUyNlx1OERCM1x1NTkxRlx1RkYwQ1x1NTNFRlx1NjUzOVx1NEUzQSB0cnVlXHVGRjBDXHU0RjFBXHU2M0QwXHU1MzQ3XHU1MTc2XHU0RUQ2XHU5ODc1XHU5NzYyXHU1MkEwXHU4RjdEXHU5MDFGXHU1RUE2XHJcbiAgc2hvdWxkUHJlZmV0Y2g6IHRydWUsXHJcbiAgXHJcbiAgcGx1Z2luczogW1xyXG4gICAgLy8gYWxnb2xpYSBcdTUxNjhcdTY1ODdcdTY0MUNcdTdEMjJcdUZGMUFcdTZDQTFcdThCQkVcdTdGNkVcdTcyMkNcdTg2NkJcdTc2ODRcdThCRERcdUZGMENcdTk3MDBcdTUyMjBcdTk2NjQgZG9jc2VhcmNoUGx1Z2luIFx1NTMzQVx1NTc1N1x1NEVFNVx1NEY3Rlx1NzUyOFx1ODI4Mlx1NzBCOVx1NjQxQ1x1N0QyMlxyXG4gICAgLy8gZG9jc2VhcmNoUGx1Z2luKHtcclxuICAgIC8vIH0pLFxyXG4gICAgLy8gXHU2NzJDXHU1NzMwXHU2NDFDXHU3RDIyXHVGRjFBXHU5RUQ4XHU4QkE0XHU2MEM1XHU1MUI1XHU0RTBCXHVGRjBDXHU4QkU1XHU2M0QyXHU0RUY2XHU0RjFBXHU1QzA2XHU5ODc1XHU5NzYyXHU2ODA3XHU5ODk4XHU1NDhDXHU1QzBGXHU2ODA3XHU5ODk4XHU0RjVDXHU0RTNBXHU2NDFDXHU3RDIyXHU3RDIyXHU1RjE1XHUzMDAyXHJcbiAgICBzZWFyY2hQbHVnaW4oe1xyXG4gICAgICAvLyBcdTRGNjBcdTc2ODRcdTkwMDlcdTk4NzlcclxuICAgICAgbG9jYWxlczoge1xyXG4gICAgICAgICcvJzoge1xyXG4gICAgICAgICAgcGxhY2Vob2xkZXI6ICdTZWFyY2gnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG5cclxuICBwYWdlUGF0dGVybnM6IFtcclxuICAgIFwiKiovKi5tZFwiLFxyXG4gICAgXCIhKiovKi5zbmlwcGV0Lm1kXCIsXHJcbiAgICBcIiEudnVlcHJlc3NcIixcclxuICAgIFwiIW5vZGVfbW9kdWxlc1wiLFxyXG4gIF0sXHJcblxyXG4gIGRlZmluZTogKCkgPT4gKHtcclxuICAgIElTX05FVExJRlk6IFwiTkVUTElGWVwiIGluIHByb2Nlc3MuZW52LFxyXG4gIH0pLFxyXG4gIFxyXG4gIGJ1bmRsZXI6IHZpdGVCdW5kbGVyKHtcclxuICAgIHZ1ZVBsdWdpbk9wdGlvbnM6IHtcclxuICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcclxuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogKHRhZykgPT4gdGFnID09PSAnY2VudGVyJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICB2aXRlT3B0aW9uczoge1xyXG4gICAgICBidWlsZDogeyAgLy8gZ2l0UGFnZVx1OTBFOFx1N0Y3Mlx1NUMwRlx1NTc1MVx1RkYwQ1x1NEUwRFx1OEJDNlx1NTIyQlx1NjI1M1x1NTMwNVx1NTQwRVx1NzY4NCBcdTRFMEJcdTUyMTJcdTdFQkZcdTVGMDBcdTU5MzRcdTc2ODQgXyouanMgXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2Jsb2IvbWFzdGVyL3NyYy91dGlscy9zYW5pdGl6ZUZpbGVOYW1lLnRzXHJcbiAgICAgICAgICAgIHNhbml0aXplRmlsZU5hbWUobmFtZSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gRFJJVkVfTEVUVEVSX1JFR0VYLmV4ZWMobmFtZSk7XHJcbiAgICAgICAgICAgICAgY29uc3QgZHJpdmVMZXR0ZXIgPSBtYXRjaCA/IG1hdGNoWzBdIDogJyc7XHJcbiAgICAgICAgICAgICAgLy8gc3Vic3RyIFx1NjYyRlx1ODhBQlx1NkREOFx1NkM3MFx1OEE5RVx1NkNENVx1RkYwQ1x1NTZFMFx1NkI2NFx1ODk4MVx1NjUzOSBzbGljZVxyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBkcml2ZUxldHRlciArXHJcbiAgICAgICAgICAgICAgICBuYW1lLnNsaWNlKGRyaXZlTGV0dGVyLmxlbmd0aCkucmVwbGFjZShJTlZBTElEX0NIQVJfUkVHRVgsIFwiXCIpXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9KSxcclxuXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6L1Byb2dyYW0vSWdhcmFzaGktRy5naXRodWIuaW8vYmxvZy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2dyYW1cXFxcSWdhcmFzaGktRy5naXRodWIuaW9cXFxcYmxvZ1xcXFwudnVlcHJlc3NcXFxcdGhlbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2dyYW0vSWdhcmFzaGktRy5naXRodWIuaW8vYmxvZy8udnVlcHJlc3MvdGhlbWUudHNcIjtpbXBvcnQgeyBob3BlVGhlbWUgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiXHJcbmltcG9ydCBuYXZiYXIgZnJvbSBcIi4vbmF2YmFyLmpzXCJcclxuaW1wb3J0IHNpZGViYXIgZnJvbSBcIi4vc2lkZWJhci5qc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBob3BlVGhlbWUoe1xyXG4gIGhvc3RuYW1lOiBcImh0dHBzOi8vaWdhcmFzaGktZy5naXRodWIuaW8vXCIsXHJcblxyXG4gIGF1dGhvcjoge1xyXG4gICAgbmFtZTogXCJcdTYwQTZcdTAwQjdcdTVCOURcdTVCOURcIixcclxuICAgIHVybDogXCJodHRwczovL2dpdGh1Yi5jb20vSWdhcmFzaGktR1wiLFxyXG4gIH0sXHJcblxyXG4gIGljb25Bc3NldHM6IFwiLy9hdC5hbGljZG4uY29tL3QvYy9mb250XzM2NTQzOTlfM250c3Q1Ymo4d3MuY3NzXCIsXHJcblxyXG4gIGxvZ286IFwiYXZhdGFyLmpwZ1wiLFxyXG5cclxuICByZXBvOiBcIklnYXJhc2hpLUdcIixcclxuXHJcbiAgZG9jc0RpcjogXCJkZW1vL3NyY1wiLFxyXG5cclxuICAvLyBuYXZiYXJcclxuICBuYXZiYXI6IG5hdmJhcixcclxuXHJcbiAgLy8gc2lkZWJhclxyXG4gIHNpZGViYXI6IHNpZGViYXIsXHJcblxyXG4gIGZvb3RlcjogXCJcdTlFRDhcdThCQTRcdTk4NzVcdTgxMUFcIixcclxuXHJcbiAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcclxuXHJcbiAgcGFnZUluZm86IFtcIkF1dGhvclwiLCBcIk9yaWdpbmFsXCIsIFwiRGF0ZVwiLCBcIkNhdGVnb3J5XCIsIFwiVGFnXCIsIFwiUmVhZGluZ1RpbWVcIl0sXHJcblxyXG4gIGJsb2c6IHtcclxuICAgIG5hbWU6IFwiXHU2MEE2XHUwMEI3XHU1QjlEXHU1QjlEXCIsXHJcbiAgICBhdmF0YXI6IFwiYXZhdGFyLmpwZ1wiLFxyXG4gICAgcm91bmRBdmF0YXI6IHRydWUsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJcdTU1NjVcdTRFNUZcdTRFMERcdTRGMUFcdTZFRjRcdTU5N0RcdTcyNUJcdTlBNkNcdUZGMENcdTU5N0RcdTU0MDNcdTYxRDJcdTUwNUFcdTc2ODRcdTU5MjdcdTY0NDZcdTk1MjRcIixcclxuICAgIGludHJvOiBcIi9pbnRyb1wiLFxyXG4gICAgbWVkaWFzOiB7XHJcbiAgICAgIC8vIEJhaWR1OiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gQml0YnVja2V0OiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gRGluZ2Rpbmc6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxyXG4gICAgICAvLyBEaXNjb3JkOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gRHJpYmJibGU6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxyXG4gICAgICAvLyBFbWFpbDogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXHJcbiAgICAgIC8vIEV2ZXJub3RlOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gRmFjZWJvb2s6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxyXG4gICAgICAvLyBGbGlwYm9hcmQ6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxyXG4gICAgICBHaXRIdWI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0lnYXJhc2hpLUdcIixcclxuICAgICAgR2l0ZWU6IFwiaHR0cHM6Ly9naXRlZS5jb20vaWdhcmFzaGlcIixcclxuICAgICAgLy8gR2l0bGFiOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gR21haWw6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxyXG4gICAgICAvLyBJbnN0YWdyYW06IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxyXG4gICAgICAvLyBMaW5lczogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXHJcbiAgICAgIC8vIExpbmtlZGluOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gUGludGVyZXN0OiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gUG9ja2V0OiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gUVE6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxyXG4gICAgICAvLyBRem9uZTogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXHJcbiAgICAgIC8vIFJlZGRpdDogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXHJcbiAgICAgIC8vIFJzczogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXHJcbiAgICAgIC8vIFN0ZWFtOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gVHdpdHRlcjogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXHJcbiAgICAgIC8vIFdlY2hhdDogXCJodHRwczovL2V4YW1wbGUuY29tXCIsXHJcbiAgICAgIC8vIFdlaWJvOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gV2hhdHNhcHA6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxyXG4gICAgICAvLyBZb3V0dWJlOiBcImh0dHBzOi8vZXhhbXBsZS5jb21cIixcclxuICAgICAgLy8gWmhpaHU6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbVwiLFxyXG4gICAgfSxcclxuICAgIC8vXHU5RUQ4XHU4QkE0XHU2QkNGXHU0RTJBXHU1MjA2XHU5ODc1XHU3Njg0XHU2NTg3XHU3QUUwXHU2NTcwXHJcbiAgICAvL2h0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRlZS5pby92Mi96aC9ndWlkZS9ibG9nL2ludHJvLmh0bWwjJUU1JUE0JTlBJUU4JUFGJUFEJUU4JUE4JTgwJUU2JTk0JUFGJUU2JThDJTgxXHJcbiAgICBhcnRpY2xlUGVyUGFnZTogMTIsXHJcblxyXG4gICAgLy8gXHU1NzI4XHU3OUZCXHU1MkE4XHU4OUM2XHU1NkZFXHU0RTBCXHU4QkJGXHU5NUVFXHU5NzVFXHU1MzVBXHU1QkEyXHU3NkY4XHU1MTczXHU3Njg0XHU5ODc1XHU5NzYyXHU2NUY2XHVGRjBDXHU0RjYwXHU0RTVGXHU1M0VGXHU0RUU1XHU1NzI4XHU0RkE3XHU4RkI5XHU2ODBGXHU3NzBCXHU1MjMwXHU1QjgzXHJcbiAgICAvLyBodHRwczovL3Z1ZXByZXNzLXRoZW1lLWhvcGUuZ2l0aHViLmlvL3YyL3poL2d1aWRlL2Jsb2cvaW50cm8uaHRtbCMlRTQlQkUlQTclRTglQkUlQjklRTYlQTAlOEZcclxuICAgIHNpZGViYXJEaXNwbGF5OiBcIm1vYmlsZVwiXHJcbiAgfSxcclxuXHJcbiAgZW5jcnlwdDoge1xyXG4gICAgY29uZmlnOiB7XHJcbiAgICAgIFwiL2d1aWRlL2VuY3J5cHQuaHRtbFwiOiBbXCIxMjM0XCJdLFxyXG4gICAgICBcIi9wYWludC9QU1x1NjRDRFx1NEY1Q1x1NTdGQVx1Nzg0MC5odG1sXCI6IFtcIjEyMzRcIl0sXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHBsdWdpbnM6IHtcclxuICAgIGJsb2c6IHtcclxuICAgICAgYXV0b0V4Y2VycHQ6IHRydWUsXHJcbiAgICAgIGFydGljbGU6IFwiL2FydGljbGUvXCIsICAgICAgICAgICAgICAgICAvLyBcdTY1ODdcdTdBRTBcdTUyMTdcdTg4NjhcclxuICAgICAgY2F0ZWdvcnk6IFwiL2NhdGVnb3J5L1wiLCAgICAgICAgICAgICAgIC8vIFx1NTIwNlx1N0M3Qlx1NTczMFx1NTZGRVx1OTg3NVxyXG4gICAgICBjYXRlZ29yeUl0ZW06IFwiL2NhdGVnb3J5LzpuYW1lL1wiLCAgICAgLy8gXHU3Mjc5XHU1QjlBXHU1MjA2XHU3QzdCXHU1MjE3XHU4ODY4XHJcbiAgICAgIHRhZzogXCIvdGFnL1wiLCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcdTY4MDdcdTdCN0VcdTU3MzBcdTU2RkVcdTk4NzVcclxuICAgICAgdGFnSXRlbTogXCIvdGFnLzpuYW1lL1wiLCAgICAgICAgICAgICAgIC8vIFx1NzI3OVx1NUI5QVx1NjgwN1x1N0I3RVx1NTIxN1x1ODg2OFxyXG4gICAgICBlbmNyeXB0ZWQ6IFwiL2VuY3J5cHRlZC9cIiwgICAgICAgICAgICAgLy8gXHU1MkEwXHU1QkM2XHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XHRcclxuICAgICAgc2xpZGU6IFwiL3NsaWRlL1wiLCAgICAgICAgICAgICAgICAgICAgIC8vIFx1NUU3Qlx1NzA2Rlx1NzI0N1x1NTIxN1x1ODg2OFxyXG4gICAgICBzdGFyOiBcIi9zdGFyL1wiLCAgICAgICAgICAgICAgICAgICAgICAgLy8gXHU2NjFGXHU2ODA3XHU2NTg3XHU3QUUwXHU1MjE3XHU4ODY4XHRcclxuICAgICAgdGltZWxpbmU6IFwiL3RpbWVsaW5lL1wiLCAgICAgICAgICAgICAgIC8vIFx1NjVGNlx1OTVGNFx1N0VCRlx1NTIxN1x1ODg2OFx0XHJcbiAgICB9LFxyXG4gICAgY29weUNvZGU6IHt9LFxyXG5cclxuICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NEY2MFx1NEUwRFx1OTcwMFx1ODk4MVx1OEJDNFx1OEJCQVx1RkYwQ1x1NTNFRlx1NEVFNVx1NzZGNFx1NjNBNVx1NTIyMFx1OTY2NCBjb21tZW50IFx1OTE0RFx1N0Y2RVx1RkYwQ1xyXG4gICAgLy8gXHU0RUU1XHU0RTBCXHU5MTREXHU3RjZFXHU0RUM1XHU0RjlCXHU0RjUzXHU5QThDXHVGRjBDXHU1OTgyXHU2NzlDXHU0RjYwXHU5NzAwXHU4OTgxXHU4QkM0XHU4QkJBXHVGRjBDXHU4QkY3XHU4MUVBXHU4ODRDXHU5MTREXHU3RjZFXHU1RTc2XHU0RjdGXHU3NTI4XHU4MUVBXHU1REYxXHU3Njg0XHU3M0FGXHU1ODgzXHVGRjBDXHU4QkU2XHU4OUMxXHU2NTg3XHU2ODYzXHUzMDAyXHJcbiAgICAvLyBcdTRFM0FcdTRFODZcdTkwN0ZcdTUxNERcdTYyNTNcdTYyNzBcdTRFM0JcdTk4OThcdTVGMDBcdTUzRDFcdTgwMDVcdTRFRTVcdTUzQ0FcdTZEODhcdTgwMTdcdTRFRDZcdTc2ODRcdThENDRcdTZFOTBcdUZGMENcdThCRjdcdTRFMERcdTg5ODFcdTU3MjhcdTRGNjBcdTc2ODRcdTZCNjNcdTVGMEZcdTczQUZcdTU4ODNcdTRFMkRcdTc2RjRcdTYzQTVcdTRGN0ZcdTc1MjhcdTRFMEJcdTUyMTdcdTkxNERcdTdGNkUhISEhIVxyXG4gICAgLy8gY29tbWVudDoge1xyXG4gICAgLy8gICAvKipcclxuICAgIC8vICAgICogVXNpbmcgR2lzY3VzXHJcbiAgICAvLyAgICAqL1xyXG4gICAgLy8gICBwcm92aWRlcjogXCJHaXNjdXNcIixcclxuICAgIC8vICAgcmVwbzogXCJ2dWVwcmVzcy10aGVtZS1ob3BlL2dpc2N1cy1kaXNjdXNzaW9uc1wiLFxyXG4gICAgLy8gICByZXBvSWQ6IFwiUl9rZ0RPR19QdDJBXCIsXHJcbiAgICAvLyAgIGNhdGVnb3J5OiBcIkFubm91bmNlbWVudHNcIixcclxuICAgIC8vICAgY2F0ZWdvcnlJZDogXCJESUNfa3dET0dfUHQyTTRDT0Q2OVwiLFxyXG5cclxuICAgIC8vICAgLyoqXHJcbiAgICAvLyAgICAqIFVzaW5nIFR3aWtvb1xyXG4gICAgLy8gICAgKi9cclxuICAgIC8vICAgLy8gcHJvdmlkZXI6IFwiVHdpa29vXCIsXHJcbiAgICAvLyAgIC8vIGVudklkOiBcImh0dHBzOi8vdHdpa29vLmNja25iYy52ZXJjZWwuYXBwXCIsXHJcblxyXG4gICAgLy8gICAvKipcclxuICAgIC8vICAgICogVXNpbmcgV2FsaW5lXHJcbiAgICAvLyAgICAqL1xyXG4gICAgLy8gICAvLyBwcm92aWRlcjogXCJXYWxpbmVcIixcclxuICAgIC8vICAgLy8gc2VydmVyVVJMOiBcImh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS1jb21tZW50LnZlcmNlbC5hcHBcIixcclxuICAgIC8vIH0sXHJcblxyXG4gICAgLy8gXHU3OTgxXHU3NTI4XHU0RTBEXHU5NzAwXHU4OTgxXHU3Njg0XHU5MTREXHU3RjZFXHJcbiAgICBtZEVuaGFuY2U6IHtcclxuICAgICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU1QkY5XHU5RjUwXHJcbiAgICAgIC8vIGh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRlZS5pby92Mi96aC9ndWlkZS9tYXJrZG93bi9hbGlnbi5odG1sXHJcbiAgICAgIGFsaWduOiB0cnVlLFxyXG5cclxuICAgICAgLy8gTWFya2Rvd24gXHU1MTQzXHU3RDIwXHU2REZCXHU1MkEwXHU1QzVFXHU2MDI3XHJcbiAgICAgIC8vIGh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRlZS5pby92Mi96aC9ndWlkZS9tYXJrZG93bi9hdHRycy5odG1sXHJcbiAgICAgIGF0dHJzOiB0cnVlLFxyXG5cclxuICAgICAgY2hhcnQ6IHRydWUsXHJcbiAgICAgIGNvZGV0YWJzOiB0cnVlLFxyXG5cclxuICAgICAgLy8gXHU2REZCXHU1MkEwXHU2M0QwXHU3OTNBXHUzMDAxXHU2Q0U4XHU5MUNBXHUzMDAxXHU0RkUxXHU2MDZGXHUzMDAxXHU2Q0U4XHU2MTBGXHUzMDAxXHU4QjY2XHU1NDRBXHU1NDhDXHU4QkU2XHU2MEM1XHU4MUVBXHU1QjlBXHU0RTQ5XHU1QkI5XHU1NjY4XHU3Njg0XHU2NTJGXHU2MzAxXHJcbiAgICAgIC8vIGh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRlZS5pby92Mi96aC9ndWlkZS9tYXJrZG93bi9jb250YWluZXIuaHRtbFxyXG4gICAgICBjb250YWluZXI6IHRydWUsXHJcblxyXG4gICAgICBkZW1vOiB0cnVlLFxyXG4gICAgICBlY2hhcnRzOiB0cnVlLFxyXG4gICAgICBmbG93Y2hhcnQ6IHRydWUsXHJcbiAgICAgIGdmbTogdHJ1ZSxcclxuXHJcbiAgICAgIC8vIFx1NTQyRlx1NzUyOFx1NTZGRVx1NzI0N1x1NjgwN1x1OEJCMFxyXG4gICAgICAvLyBodHRwczovL3Z1ZXByZXNzLXRoZW1lLWhvcGUuZ2l0ZWUuaW8vdjIvemgvZ3VpZGUvbWFya2Rvd24vaW1hZ2UuaHRtbCMlRTklODUlOEQlRTclQkQlQUVcclxuICAgICAgaW1hZ2VNYXJrOiB0cnVlLFxyXG4gICAgICAvLyBcdTU0MkZcdTc1MjhcdTU2RkVcdTcyNDdcdTU5MjdcdTVDMEZcclxuICAgICAgLy8gaHR0cHM6Ly92dWVwcmVzcy10aGVtZS1ob3BlLmdpdGVlLmlvL3YyL3poL2d1aWRlL21hcmtkb3duL2ltYWdlLmh0bWwjJUU5JTg1JThEJUU3JUJEJUFFXHJcbiAgICAgIGltYWdlU2l6ZTogdHJ1ZSxcclxuXHJcbiAgICAgIC8vIFx1NjUyRlx1NjMwMVx1NUJGQ1x1NTE2NVx1NTE3Nlx1NEVENlx1NjU4N1x1NEVGNlxyXG4gICAgICAvLyBodHRwczovL3Z1ZXByZXNzLXRoZW1lLWhvcGUuZ2l0ZWUuaW8vdjIvemgvZ3VpZGUvbWFya2Rvd24vaW5jbHVkZS5odG1sIyVFOSU4NSU4RCVFNyVCRCVBRVxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgICBsYXp5TG9hZDogdHJ1ZSxcclxuXHJcbiAgICAgIC8vIFx1NjUyRlx1NjMwMVx1NjgwN1x1OEJCMFxyXG4gICAgICAvLyBodHRwczovL3Z1ZXByZXNzLXRoZW1lLWhvcGUuZ2l0ZWUuaW8vdjIvemgvZ3VpZGUvbWFya2Rvd24vbWFyay5odG1sXHJcbiAgICAgIG1hcms6IHRydWUsXHJcblxyXG4gICAgICBtZXJtYWlkOiB0cnVlLFxyXG4gICAgICBwbGF5Z3JvdW5kOiB7XHJcbiAgICAgICAgcHJlc2V0czogW1widHNcIiwgXCJ2dWVcIl0sXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyBcdTY1MkZcdTYzMDFcdTVFN0JcdTcwNkZcdTcyNDdcclxuICAgICAgLy8gaHR0cHM6Ly92dWVwcmVzcy10aGVtZS1ob3BlLmdpdGVlLmlvL3YyL3poL2d1aWRlL21hcmtkb3duL3ByZXNlbnRhdGlvbi5odG1sXHJcbiAgICAgIHByZXNlbnRhdGlvbjoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcImhpZ2hsaWdodFwiLCBcIm1hdGhcIiwgXCJzZWFyY2hcIiwgXCJub3Rlc1wiLCBcInpvb21cIl0sXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAvLyBcdTY4MzdcdTVGMEZcdTUzMTZcclxuICAgICAgLy8gaHR0cHM6Ly92dWVwcmVzcy10aGVtZS1ob3BlLmdpdGVlLmlvL3YyL3poL2d1aWRlL21hcmtkb3duL3N0eWxpemUuaHRtbFxyXG4gICAgICBzdHlsaXplOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbWF0Y2hlcjogXCJSZWNvbW1hbmRlZFwiLFxyXG4gICAgICAgICAgcmVwbGFjZXI6ICh7IHRhZyB9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0YWcgPT09IFwiZW1cIilcclxuICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkJhZGdlXCIsXHJcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInRpcFwiIH0sXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlJlY29tbWFuZGVkXCIsXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG5cclxuICAgICAgLy8gXHU1NDJGXHU3NTI4XHU0RTBCXHU4OUQyXHU2ODA3XHJcbiAgICAgIC8vIGh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRlZS5pby92Mi96aC9ndWlkZS9tYXJrZG93bi9zdXAtc3ViLmh0bWwjJUU5JTg1JThEJUU3JUJEJUFFXHJcbiAgICAgIHN1YjogdHJ1ZSxcclxuICAgICAgLy8gXHU1NDJGXHU3NTI4XHU0RTBBXHU4OUQyXHU2ODA3XHJcbiAgICAgIC8vIGh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRlZS5pby92Mi96aC9ndWlkZS9tYXJrZG93bi9zdXAtc3ViLmh0bWwjJUU5JTg1JThEJUU3JUJEJUFFXHJcbiAgICAgIHN1cDogdHJ1ZSxcclxuXHJcbiAgICAgIC8vIFx1NkRGQlx1NTJBMFx1OTAwOVx1OTg3OVx1NTM2MVx1NjUyRlx1NjMwMVxyXG4gICAgICAvLyBodHRwczovL3Z1ZXByZXNzLXRoZW1lLWhvcGUuZ2l0ZWUuaW8vdjIvemgvZ3VpZGUvbWFya2Rvd24vdGFicy5odG1sXHJcbiAgICAgIHRhYnM6IHRydWUsXHJcbiAgICAgIHRleDogdHJ1ZSxcclxuICAgICAgdnByZTogdHJ1ZSxcclxuICAgICAgdnVlUGxheWdyb3VuZDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTdFQzRcdTRFRjZcclxuICAgIC8vIGh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRlZS5pby92Mi96aC9ndWlkZS9tYXJrZG93bi9jb21wb25lbnRzLmh0bWxcclxuICAgIGNvbXBvbmVudHM6IFtcIkJhZGdlXCIsIFwiUERGXCJdLFxyXG5cclxuICAgIC8vIFx1NzI0OFx1Njc0M1x1NEZFMVx1NjA2RlxyXG4gICAgLy8gaHR0cHM6Ly92dWVwcmVzcy10aGVtZS1ob3BlLmdpdGVlLmlvL3YyL3poL2d1aWRlL2ZlYXR1cmUvY29weXJpZ2h0Lmh0bWxcclxuICAgIC8vIGNvcHlyaWdodDoge1xyXG4gICAgLy8gICBnbG9iYWw6IHRydWUsXHJcbiAgICAvLyAgIGhvc3RuYW1lOiBcImh0dHBzOi8vd2VtY2hhby5yZW5cIixcclxuICAgIC8vICAgYXV0aG9yOiBcInhrcml2em9vaChodHRwczovL3dlbmNoYW8ucmVuKVwiLFxyXG4gICAgLy8gICB0cmlnZ2VyV29yZHM6IDIwLFxyXG4gICAgLy8gfSxcclxuICB9LFxyXG5cclxuICAvL1x1NEUzQlx1OTg5OFx1ODI3Mlx1OTAwOVx1NjJFOVx1NTY2OCBodHRwczovL3Z1ZXByZXNzLXRoZW1lLWhvcGUuZ2l0ZWUuaW8vdjIvemgvZ3VpZGUvaW50ZXJmYWNlL3RoZW1lLWNvbG9yLmh0bWwjJUU0JUI4JUJCJUU5JUEyJTk4JUU4JTg5JUIyJUU5JTgwJTg5JUU2JThCJUE5JUU1JTk5JUE4XHJcbiAgdGhlbWVDb2xvcjoge1xyXG4gICAgYmx1ZTogXCIjMjE5NmYzXCIsXHJcbiAgICByZWQ6IFwiI2YyNmQ2ZFwiLFxyXG4gICAgZ3JlZW46IFwiIzNlYWY3Y1wiLFxyXG4gICAgb3JhbmdlOiBcIiNmYjliNWZcIixcclxuICB9LFxyXG5cclxuICAvL1x1NTE2OFx1NUM0Rlx1NjMwOVx1OTRBRVx1RkYxQWh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRlZS5pby92Mi96aC9ndWlkZS9pbnRlcmZhY2Uvb3RoZXJzLmh0bWwjJUU1JTg1JUE4JUU1JUIxJThGJUU2JThDJTg5JUU5JTkyJUFFXHJcbiAgZnVsbHNjcmVlbjogdHJ1ZSxcclxuXHJcbiAgLy9cdTZERjFcdTgyNzJcdTZBMjFcdTVGMEYgaHR0cHM6Ly92dWVwcmVzcy10aGVtZS1ob3BlLmdpdGVlLmlvL3YyL3poL2d1aWRlL2ludGVyZmFjZS9kYXJrbW9kZS5odG1sXHJcbiAgZGFya21vZGU6IFwic3dpdGNoXCIsIC8vIHN3aXRjaCBlbmFibGVcclxuXHJcbiAgLy9cdTdFQUZcdTUxQzBcdTZBMjFcdTVGMEYgaHR0cHM6Ly92dWVwcmVzcy10aGVtZS1ob3BlLmdpdGVlLmlvL3YyL3poL2d1aWRlL2ludGVyZmFjZS9wdXJlLmh0bWxcclxuICBwdXJlOiBmYWxzZSxcclxuXHJcbiAgLy8gXHU1MTY4XHU1QzQwXHU3OTgxXHU3NTI4XHU2NjJGXHU1NDI2XHU1QzU1XHU3OTNBXHU3RjE2XHU4RjkxXHU2QjY0XHU5ODc1XHU5NEZFXHU2M0E1XHJcbiAgLy8gaHR0cHM6Ly92dWVwcmVzcy10aGVtZS1ob3BlLmdpdGVlLmlvL3YyL3poL2d1aWRlL2ZlYXR1cmUvbWV0YS5odG1sIyVFNSU5RiVCQSVFNCVCQSU4RS1naXQtJUU3JTlBJTg0JUU0JUJGJUExJUU2JTgxJUFGXHJcbiAgZWRpdExpbms6IGZhbHNlLFxyXG5cclxuICAvL1x1NTE2OFx1NUM0MFx1Nzk4MVx1NzUyOFx1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQVx1OTg3NVx1OTc2Mlx1OEQyMVx1NzMyRVx1ODAwNVxyXG4gIC8vIGh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRlZS5pby92Mi96aC9ndWlkZS9mZWF0dXJlL21ldGEuaHRtbCMlRTUlOUYlQkElRTQlQkElOEUtZ2l0LSVFNyU5QSU4NCVFNCVCRiVBMSVFNiU4MSVBRlxyXG4gIGNvbnRyaWJ1dG9yczogZmFsc2UsXHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDovUHJvZ3JhbS9JZ2FyYXNoaS1HLmdpdGh1Yi5pby9ibG9nLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvZ3JhbVxcXFxJZ2FyYXNoaS1HLmdpdGh1Yi5pb1xcXFxibG9nXFxcXC52dWVwcmVzc1xcXFxuYXZiYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2dyYW0vSWdhcmFzaGktRy5naXRodWIuaW8vYmxvZy8udnVlcHJlc3MvbmF2YmFyLnRzXCI7aW1wb3J0IHsgbmF2YmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5hdmJhcihbXHJcbiAgXCIvXCIsXHJcbiAge1xyXG4gICAgdGV4dDogXCJQeXRob25cIixcclxuICAgIGljb246IFwicHl0aG9uXCIsXHJcbiAgICBwcmVmaXg6IFwiL3B5dGhvbi9cIixcclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1OEJFRFx1OEEwMFwiLFxyXG4gICAgICAgIGljb246IFwiZ3VpZGVcIixcclxuICAgICAgICBwcmVmaXg6IFwiXHU4QkVEXHU4QTAwL1wiLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1N0ZBXHU3ODQwXCIsIGxpbms6IFwiXHU1N0ZBXHU3ODQwL1x1NzNBRlx1NTg4M1x1NUI4OVx1ODhDNVwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU4RkRCXHU5NjM2XCIsIGxpbms6IFwiXHU4RkRCXHU5NjM2L1x1NTNEOFx1OTFDRlx1NjczQVx1NTIzNlwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU2REYxXHU1MTY1XCIsIGxpbms6IFwiXHU2REYxXHU1MTY1L1x1NTc4M1x1NTczRVx1NTZERVx1NjUzNlwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU3RjUxXHU3RURDXHU3RjE2XHU3QTBCXCIsIGxpbms6IFwiXHU3RjUxXHU3RURDXHU3RjE2XHU3QTBCL1NvY2tldFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1OTFBXHU0RUZCXHU1MkExXHU3RjE2XHU3QTBCXCIsIGxpbms6IFwiXHU1OTFBXHU0RUZCXHU1MkExXHU3RjE2XHU3QTBCL1x1OEZEQlx1N0EwQlwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiYXN5bmNpb1wiLCBsaW5rOiBcImFzeW5jaW8vYXN5bmNpb1x1NTdGQVx1Nzg0MFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1RTkzXCIsIGxpbms6IFwiXHU1RTkzL1x1NjgwN1x1NTFDNlx1NUU5M1x1OTRGRVx1NjNBNVwiIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHU3NTFGXHU2MDAxXCIsXHJcbiAgICAgICAgaWNvbjogXCJlZGl0XCIsXHJcbiAgICAgICAgcHJlZml4OiBcIlx1NzUxRlx1NjAwMS9cIixcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgeyB0ZXh0OiBcIldlYlx1Njg0Nlx1NjdCNlwiLCBsaW5rOiBcIldlYlx1Njg0Nlx1NjdCNi9cdTdGNTFcdTdFRENcdTY4NDZcdTY3QjZcdTU3RkFcdTc4NDAvV0VCXHU2ODQ2XHU2N0I2XHU2NzJDXHU4RDI4XCIsIGljb246IFwiZnJhbWV3b3JrXCJ9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1OEZEQ1x1N0EwQlx1OEMwM1x1NzUyOFwiLCBsaW5rOiBcIlx1OEZEQ1x1N0EwQlx1OEMwM1x1NzUyOC9nUlBDXCIsIGljb246IFwicnBjXCJ9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1NkQ4OFx1NjA2Rlx1OTYxRlx1NTIxN1wiLCBsaW5rOiBcIlx1NkQ4OFx1NjA2Rlx1OTYxRlx1NTIxNy9rYWZrYVwiICwgaWNvbjogXCJrYWZrYVwifSxcclxuICAgICAgICAgIHsgdGV4dDogXCJcdTVGMDJcdTZCNjVcdTRFRkJcdTUyQTFcIiwgbGluazogXCJcdTVGMDJcdTZCNjVcdTRFRkJcdTUyQTEvQ2VsZXJ5XCIsIGljb246IFwidGFza3NcIn0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiBcIkdvbGFuZ1wiLFxyXG4gICAgaWNvbjogXCJnb1wiLFxyXG4gICAgcHJlZml4OiBcIi9nby9cIixcclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1NTdGQVx1Nzg0MFwiLFxyXG4gICAgICAgIHByZWZpeDogXCJcdTU3RkFcdTc4NDAvXCIsXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgIHsgdGV4dDogXCJnb1x1OEJFRFx1OEEwMFx1OTAxRlx1OEJCMFwiLCBsaW5rOiBcImdvXHU4QkVEXHU4QTAwXHU5MDFGXHU4QkIwXCIgfSxcclxuICAgICAgICAgIHsgdGV4dDogXCJnb1x1NURFNVx1NTE3N1x1OTAxRlx1NzUyOFwiLCBsaW5rOiBcImdvXHU1REU1XHU1MTc3XHU5MDFGXHU3NTI4XCIgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTdCOTdcdTZDRDVcdTRFMEVcdTY1NzBcdTYzNkVcdTdFRDNcdTY3ODRcIixcclxuICAgICAgICBwcmVmaXg6IFwiXHU3Qjk3XHU2Q0Q1XHU0RTBFXHU2NTcwXHU2MzZFXHU3RUQzXHU2Nzg0L1wiLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU2OTgyXHU4RkYwXCIsIGxpbms6IFwiXHU2OTgyXHU4RkYwXCIgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTRGMThcdTUzMTZcIixcclxuICAgICAgICBwcmVmaXg6IFwiXHU0RjE4XHU1MzE2L1wiLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU0RjE4XHU1MzE2XCIsIGxpbms6IFwiXHU1MTczXHU0RThFTWFwUmVkdWNlXCIgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6IFwiXHU2NTcwXHU2MzZFXHU1RTkzXCIsXHJcbiAgICBpY29uOiBcImRhdGFiYXNlXCIsXHJcbiAgICBwcmVmaXg6IFwiL2RhdGFiYXNlL1wiLFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAgeyB0ZXh0OiBcImV0Y2RcIiwgbGluazogXCJldGNkL2V0Y2RcIiwgaWNvbjogXCJldGNkXCJ9LFxyXG4gICAgICB7IHRleHQ6IFwiTXlTUUxcIiwgbGluazogXCJNeVNRTC9NeVNRTFwiLCBpY29uOiBcIm15c3FsXCJ9LFxyXG4gICAgICB7IHRleHQ6IFwiUmVkaXNcIiwgbGluazogXCJSZWRpcy9yZWRpc1wiLCBpY29uOiBcInJlZGlzXCJ9LFxyXG4gICAgICB7IHRleHQ6IFwiUG9zdGdyZVNRTFwiLCBsaW5rOiBcIlBvc3RncmVTUUwvUG9zdGdyZVNRTFwiLCBpY29uOiBcInBvc3RncmVzcWxcIn0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogXCJcdTY0Q0RcdTRGNUNcdTdDRkJcdTdFREZcIixcclxuICAgIGljb246IFwib3NcIixcclxuICAgIHByZWZpeDogXCIvdW5peC9cIixcclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgIHsgdGV4dDogXCJMaW51eFwiLCBsaW5rOiBcIkxpbnV4L0xpbnV4XHU1N0ZBXHU3ODQwXHU2MzA3XHU1RjE1L1x1OEJBMVx1N0I5N1x1NjczQVx1Njk4Mlx1OEJCQVwiLCBpY29uOiBcImxpbnV4XCJ9LFxyXG4gICAgICB7IHRleHQ6IFwiQ2VudE9TXCIsIGxpbms6IFwiQ2VudE9TL1x1NUI4OVx1ODhDNS9DZW50T1NcdTc2ODRcdTVCODlcdTg4QzVcIiwgaWNvbjogXCJjZW50b3NcIn0sXHJcbiAgICAgIHsgdGV4dDogXCJVYnVudHVcIiwgbGluazogXCJVYnVudHUvXHU0RTBCXHU4RjdEL1VidW50dVx1N0NGQlx1N0VERlwiLCBpY29uOiBcInVidW50dVwifSxcclxuICAgICAgeyB0ZXh0OiBcIlx1ODY1QVx1NjJERlx1NjczQVwiLCBsaW5rOiBcIlx1ODY1QVx1NjJERlx1NjczQS9QVkUvUFZFXCIsIGljb246IFwicHZlXCJ9LFxyXG4gICAgXSxcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6IFwiXHU4RkQwXHU3RUY0XHU1REU1XHU1MTc3XCIsXHJcbiAgICBpY29uOiBcImRldm9wc1wiLFxyXG4gICAgcHJlZml4OiBcIi90b29sL1wiLFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAgeyB0ZXh0OiBcIkdpdFwiLCBsaW5rOiBcIkdpdC9HaXRcIiAsIGljb246IFwiZ2l0XCJ9LFxyXG4gICAgICB7IHRleHQ6IFwiTmdpbnhcIiwgbGluazogXCJOZ2lueC9OZ2lueFx1NTdGQVx1Nzg0MFwiICwgaWNvbjogXCJuZ2lueFwifSxcclxuICAgICAgeyB0ZXh0OiBcIkRvY2tlclwiLCBsaW5rOiBcIkRvY2tlci9kb2NrZXJcdTVCQjlcdTU2NjhcIiAsIGljb246IFwiZG9ja2VyXCJ9LFxyXG4gICAgICB7IHRleHQ6IFwiS3ViZXJuZXRlc1wiLCBsaW5rOiBcIkt1YmVybmV0ZXMvazhzXHU4RDQ0XHU2RTkwUG9kXCIgLCBpY29uOiBcImt1YmVybmV0ZXNcIn0sXHJcbiAgICAgIHsgdGV4dDogXCJQcm9tZXRoZXVzXCIsIGxpbms6IFwiUHJvbWV0aGV1cy9cdTVCODlcdTg4QzVcIiAsIGljb246IFwicHJvbWV0aGV1c1wifSxcclxuICAgICAgeyB0ZXh0OiBcIlx1NURFNVx1NTE3N1wiLCBsaW5rOiBcIk90aGVyL1x1N0Y1MVx1N0VEQ1x1NEVFM1x1NzQwNlwiICwgaWNvbjogXCJvdGhlclwifSxcclxuICAgIF0sXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiBcIlx1NkYyQlx1NkYyQlx1NTE2OFx1NUU3Mlx1NTM3N1x1NzY4NFx1ODJFNlwiLFxyXG4gICAgY2hpbGRyZW46IFtcclxuICAgICAgeyB0ZXh0OiBcIkdPXHU4QkVEXHU4QTAwXHU4QkJFXHU4QkExXHU0RTBFXHU1QjlFXHU3M0IwXCIsIGljb246IFwiZ29cIiwgbGluazogXCJodHRwczovL2RyYXZlbmVzcy5tZS9nb2xhbmcvXCIgfSxcclxuICAgICAgeyB0ZXh0OiBcIkdPXHU1OTA3XHU1RkQ4XCIsIGljb246IFwiZ29cIiwgbGluazogXCJodHRwczovL3BlZ2FzdXN3YW5nLmdpdGh1Yi5pby9MZXRzR28vYmFzaWNzLzAxX2dvX2Jhc2ljX3R5cGVzL2Jhc2ljX3R5cGVzL1wiIH0sXHJcbiAgICAgIHsgdGV4dDogXCJcdTUyNERcdTdBRUZcdTUxODVcdTUzNzdcdTRFMERcdTVGNTJcdThERUZcIiwgaWNvbjogXCJqYXZhc2NyaXB0XCIsIGxpbms6IFwiaHR0cHM6Ly9ub3Rlcy5mZS1tbS5jb20vaW50ZXJ2aWV3L2Jhc2UvdHlwZXMuaHRtbFwiIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbiAgLy8gXCIvaG9tZVwiLFxyXG4gIC8vIHsgdGV4dDogXCJcdTRGN0ZcdTc1MjhcdTYzMDdcdTUzNTdcIiwgaWNvbjogXCJjcmVhdGl2ZVwiLCBsaW5rOiBcIi9ndWlkZS9cIiB9LFxyXG4gIC8vIHtcclxuICAvLyAgIHRleHQ6IFwiXHU1MzVBXHU2NTg3XCIsXHJcbiAgLy8gICBpY29uOiBcImVkaXRcIixcclxuICAvLyAgIHByZWZpeDogXCIvcG9zdHMvXCIsXHJcbiAgLy8gICBjaGlsZHJlbjogW1xyXG4gIC8vICAgICB7XHJcbiAgLy8gICAgICAgdGV4dDogXCJcdTY1ODdcdTdBRTAgMS00XCIsXHJcbiAgLy8gICAgICAgaWNvbjogXCJlZGl0XCIsXHJcbiAgLy8gICAgICAgcHJlZml4OiBcImFydGljbGUvXCIsXHJcbiAgLy8gICAgICAgY2hpbGRyZW46IFtcclxuICAvLyAgICAgICAgIHsgdGV4dDogXCJcdTY1ODdcdTdBRTAgMVwiLCBpY29uOiBcImVkaXRcIiwgbGluazogXCJhcnRpY2xlMVwiIH0sXHJcbiAgLy8gICAgICAgICB7IHRleHQ6IFwiXHU2NTg3XHU3QUUwIDJcIiwgaWNvbjogXCJlZGl0XCIsIGxpbms6IFwiYXJ0aWNsZTJcIiB9LFxyXG4gIC8vICAgICAgICAgXCJhcnRpY2xlM1wiLFxyXG4gIC8vICAgICAgICAgXCJhcnRpY2xlNFwiLFxyXG4gIC8vICAgICAgIF0sXHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIHtcclxuICAvLyAgICAgICB0ZXh0OiBcIlx1NjU4N1x1N0FFMCA1LTEyXCIsXHJcbiAgLy8gICAgICAgaWNvbjogXCJlZGl0XCIsXHJcbiAgLy8gICAgICAgY2hpbGRyZW46IFtcclxuICAvLyAgICAgICAgIHtcclxuICAvLyAgICAgICAgICAgdGV4dDogXCJcdTY1ODdcdTdBRTAgNVwiLFxyXG4gIC8vICAgICAgICAgICBpY29uOiBcImVkaXRcIixcclxuICAvLyAgICAgICAgICAgbGluazogXCJhcnRpY2xlL2FydGljbGU1XCIsXHJcbiAgLy8gICAgICAgICB9LFxyXG4gIC8vICAgICAgICAge1xyXG4gIC8vICAgICAgICAgICB0ZXh0OiBcIlx1NjU4N1x1N0FFMCA2XCIsXHJcbiAgLy8gICAgICAgICAgIGljb246IFwiZWRpdFwiLFxyXG4gIC8vICAgICAgICAgICBsaW5rOiBcImFydGljbGUvYXJ0aWNsZTZcIixcclxuICAvLyAgICAgICAgIH0sXHJcbiAgLy8gICAgICAgICBcImFydGljbGUvYXJ0aWNsZTdcIixcclxuICAvLyAgICAgICAgIFwiYXJ0aWNsZS9hcnRpY2xlOFwiLFxyXG4gIC8vICAgICAgIF0sXHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIHsgdGV4dDogXCJcdTY1ODdcdTdBRTAgOVwiLCBpY29uOiBcImVkaXRcIiwgbGluazogXCJhcnRpY2xlOVwiIH0sXHJcbiAgLy8gICAgIHsgdGV4dDogXCJcdTY1ODdcdTdBRTAgMTBcIiwgaWNvbjogXCJlZGl0XCIsIGxpbms6IFwiYXJ0aWNsZTEwXCIgfSxcclxuICAvLyAgICAgXCJhcnRpY2xlMTFcIixcclxuICAvLyAgICAgXCJhcnRpY2xlMTJcIixcclxuICAvLyAgIF0sXHJcbiAgLy8gfSxcclxuICAvLyB7XHJcbiAgLy8gICB0ZXh0OiBcIlx1NEUzQlx1OTg5OFx1NjU4N1x1Njg2M1wiLFxyXG4gIC8vICAgaWNvbjogXCJub3RlXCIsXHJcbiAgLy8gICBsaW5rOiBcImh0dHBzOi8vdnVlcHJlc3MtdGhlbWUtaG9wZS5naXRodWIuaW8vdjIvemgvXCIsXHJcbiAgLy8gfSxcclxuXSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDovUHJvZ3JhbS9JZ2FyYXNoaS1HLmdpdGh1Yi5pby9ibG9nLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvZ3JhbVxcXFxJZ2FyYXNoaS1HLmdpdGh1Yi5pb1xcXFxibG9nXFxcXC52dWVwcmVzc1xcXFxzaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9ncmFtL0lnYXJhc2hpLUcuZ2l0aHViLmlvL2Jsb2cvLnZ1ZXByZXNzL3NpZGViYXIudHNcIjtpbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IHNpZGViYXIoW1xyXG4vLyAgIFwiL1wiLFxyXG4vLyAgIFwiL2hvbWVcIixcclxuLy8gICBcIi9zbGlkZXNcIixcclxuLy8gICB7XHJcbi8vICAgICB0ZXh0OiBcIlx1NTk4Mlx1NEY1NVx1NEY3Rlx1NzUyOFwiLFxyXG4vLyAgICAgaWNvbjogXCJjcmVhdGl2ZVwiLFxyXG4vLyAgICAgcHJlZml4OiBcIi9ndWlkZS9cIixcclxuLy8gICAgIGxpbms6IFwiL2d1aWRlL1wiLFxyXG4vLyAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXHJcbi8vICAgfSxcclxuXHJcbi8vICAge1xyXG4vLyAgICAgdGV4dDogXCJcdTY1ODdcdTdBRTBcIixcclxuLy8gICAgIGljb246IFwibm90ZVwiLFxyXG4vLyAgICAgcHJlZml4OiBcIi9wb3N0cy9cIixcclxuLy8gICAgIGNoaWxkcmVuOiBbXHJcbi8vICAgICAgIHtcclxuLy8gICAgICAgICB0ZXh0OiBcIlx1NjU4N1x1N0FFMCAxLTRcIixcclxuLy8gICAgICAgICBpY29uOiBcIm5vdGVcIixcclxuLy8gICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuLy8gICAgICAgICBwcmVmaXg6IFwiYXJ0aWNsZS9cIixcclxuLy8gICAgICAgICBjaGlsZHJlbjogW1wiYXJ0aWNsZTFcIiwgXCJhcnRpY2xlMlwiLCBcImFydGljbGUzXCIsIFwiYXJ0aWNsZTRcIl0sXHJcbi8vICAgICAgIH0sXHJcbi8vICAgICAgIHtcclxuLy8gICAgICAgICB0ZXh0OiBcIlx1NjU4N1x1N0FFMCA1LTEyXCIsXHJcbi8vICAgICAgICAgaWNvbjogXCJub3RlXCIsXHJcbi8vICAgICAgICAgY2hpbGRyZW46IFtcclxuLy8gICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgdGV4dDogXCJcdTY1ODdcdTdBRTAgNS04XCIsXHJcbi8vICAgICAgICAgICAgIGljb246IFwibm90ZVwiLFxyXG4vLyAgICAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuLy8gICAgICAgICAgICAgcHJlZml4OiBcImFydGljbGUvXCIsXHJcbi8vICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCJhcnRpY2xlNVwiLCBcImFydGljbGU2XCIsIFwiYXJ0aWNsZTdcIiwgXCJhcnRpY2xlOFwiXSxcclxuLy8gICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgIHRleHQ6IFwiXHU2NTg3XHU3QUUwIDktMTJcIixcclxuLy8gICAgICAgICAgICAgaWNvbjogXCJub3RlXCIsXHJcbi8vICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCJhcnRpY2xlOVwiLCBcImFydGljbGUxMFwiLCBcImFydGljbGUxMVwiLCBcImFydGljbGUxMlwiXSxcclxuLy8gICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgXSxcclxuLy8gICAgICAgfSxcclxuLy8gICAgIF0sXHJcbi8vICAgfSxcclxuLy8gXSk7XHJcbmV4cG9ydCBkZWZhdWx0IHNpZGViYXIoe1xyXG4gIFwiL3VuaXgvTGludXhcIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIkxpbnV4XCIsXHJcbiAgICAgIGljb246IFwibGludXhcIixcclxuICAgICAgcHJlZml4OiBcIi91bml4L0xpbnV4L1wiLFxyXG4gICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiTGludXhcdTU3RkFcdTc4NDBcdTYzMDdcdTVGMTVcIixcclxuICAgICAgICAgIGNvbGxhcHNhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgcHJlZml4OiBcIkxpbnV4XHU1N0ZBXHU3ODQwXHU2MzA3XHU1RjE1L1wiLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtcIlx1OEJBMVx1N0I5N1x1NjczQVx1Njk4Mlx1OEJCQVwiLCBcIlx1NEUzQlx1NjczQVx1ODlDNFx1NTIxMlx1NEUwRVx1NzhDMVx1NzZEOFx1NTIwNlx1NTMzQVwiLCBcIkxpbnV4XHU2NjJGXHU0RUMwXHU0RTQ4XHU0RTBFXHU1OTgyXHU0RjU1XHU1QjY2XHU0RTYwXCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJMaW51eFx1NjU4N1x1NEVGNlwiLFxyXG4gICAgICAgICAgY29sbGFwc2FibGU6IHRydWUsXHJcbiAgICAgICAgICBwcmVmaXg6IFwiTGludXhcdTY1ODdcdTRFRjYvXCIsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1wiXHU2NTg3XHU0RUY2XHU2NzQzXHU5NjUwXHU0RTBFXHU3NkVFXHU1RjU1XHU5MTREXHU3RjZFXCIsIFwiXHU2NTg3XHU0RUY2XHU0RTBFXHU2NTg3XHU0RUY2XHU3Q0ZCXHU3RURGXHU1MzhCXHU3RjI5XCIsIFwiTGludXhcdTc4QzFcdTc2RDhcdTRFMEVcdTY1ODdcdTRFRjZcdTdDRkJcdTdFREZcdTdCQTFcdTc0MDZcIl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIlNoZWxsXHU4MTFBXHU2NzJDXCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJTaGVsbFx1ODExQVx1NjcyQy9cIixcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXCJzaGVsbFwiLCBcInZpbSBcdTVGRUJcdTYzNzdcdTk1MkVcIl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIkxpbnV4XHU0RjdGXHU3NTI4XHU4MDA1XHU3QkExXHU3NDA2XCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJMaW51eFx1NEY3Rlx1NzUyOFx1ODAwNVx1N0JBMVx1NzQwNi9cIixcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXCJcdThEMjZcdTUzRjdcdTdCQTFcdTc0MDZcdTRFMEVBQ0xcdTY3NDNcdTk2NTBcIl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIkxpbnV4XHU3Q0ZCXHU3RURGXHU3QkExXHU3NDA2XHU1NDU4XCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJMaW51eFx1N0NGQlx1N0VERlx1N0JBMVx1NzQwNlx1NTQ1OC9cIixcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXCJcdThCQTRcdThCQzZcdTdDRkJcdTdFREZcdTY3MERcdTUyQTFcIl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIlx1NjRDRFx1NEY1Q1x1N0NGQlx1N0VERlwiLFxyXG4gICAgICAgICAgY29sbGFwc2FibGU6IHRydWUsXHJcbiAgICAgICAgICBwcmVmaXg6IFwiXHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGL1wiLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtcIlx1NjRDRFx1NEY1Q1x1N0NGQlx1N0VERlwiXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiXHU3RjUxXHU3RURDXCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJcdTdGNTFcdTdFREMvXCIsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1wiXHU3RjUxXHU3RURDXHU1N0ZBXHU3ODQwXCIsIFwiXHU1NDdEXHU0RUU0XCIsIFwiQ1VSTFwiLCBcIlAyUFwiXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiVHJvdWJsZXNob290aW5nXCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJUcm91Ymxlc2hvb3RpbmcvXCIsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1wiXHU1OTA3XHU1RkQ4XHU1NDdEXHU0RUU0XCIsIFwiXHU2NTQ1XHU5NjlDXHU1RkVCXHU2N0U1XCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiL3VuaXgvQ2VudE9TXCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJDZW50T1NcIixcclxuICAgICAgaWNvbjogXCJjZW50b3NcIixcclxuICAgICAgcHJlZml4OiBcIi91bml4L0NlbnRPUy9cIixcclxuICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIlx1NUI4OVx1ODhDNVwiLFxyXG4gICAgICAgICAgY29sbGFwc2FibGU6IHRydWUsXHJcbiAgICAgICAgICBwcmVmaXg6IFwiXHU1Qjg5XHU4OEM1L1wiLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtcIkNlbnRPU1x1NzY4NFx1NUI4OVx1ODhDNVwiLCBcIlJQTVx1NTMwNVx1N0JBMVx1NzQwNlwiXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiVUZTXCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJVRlMvXCIsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1widWZzXHU3QkExXHU3NDA2XHU1RTczXHU1M0YwXCIsIFwidWZzXHU2ODM4XHU1RkMzXHU3RUM0XHU0RUY2XCIsIFwidWZzY2xpXHU1REU1XHU1MTc3XCIsIFwidXVzXHU4NjVBXHU2MkRGXHU2NzNBXHU2MzkyXHU5NTE5XCIsIFwiaXNvXHU2Nzg0XHU1RUZBXHU0RUU1XHU1M0NBXHU1M0QxXHU1RTAzXCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJORlNcIixcclxuICAgICAgICAgIGNvbGxhcHNhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgcHJlZml4OiBcIk5GUy9cIixcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXCJORlNcdTY3MERcdTUyQTFcIl0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIlNhbWJhXCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJTYW1iYS9cIixcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXCJTYW1iYVx1NjcwRFx1NTJBMVwiLCBcInJzeW5jXCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJMREFQXCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJMREFQL1wiLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtcIkFEXHU1N0RGXCIsIFwiTERBUFwiLCBcIlB5dGhvblx1NUJGOVx1NjNBNUFEXHU1N0RGXCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJTTk1QXCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJTTk1QL1wiLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtcIlNOTVBcdTY3MERcdTUyQTFcIiwgXCJTTk1QXHU4QkJFXHU4QkExXHU2NTg3XHU2ODYzXCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiL3VuaXgvVWJ1bnR1XCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJVYnVudHVcIixcclxuICAgICAgaWNvbjogXCJ1YnVudHVcIixcclxuICAgICAgcHJlZml4OiBcIi91bml4L1VidW50dS9cIixcclxuICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIlx1NEUwQlx1OEY3RFwiLFxyXG4gICAgICAgICAgY29sbGFwc2FibGU6IHRydWUsXHJcbiAgICAgICAgICBwcmVmaXg6IFwiXHU0RTBCXHU4RjdEL1wiLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtcIlVidW50dVx1N0NGQlx1N0VERlwiXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXSxcclxuICBcIi91bml4L1x1ODY1QVx1NjJERlx1NjczQVwiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU4NjVBXHU2MkRGXHU2NzNBXCIsXHJcbiAgICAgIGljb246IFwicHZlXCIsXHJcbiAgICAgIHByZWZpeDogXCIvdW5peC9cdTg2NUFcdTYyREZcdTY3M0EvXCIsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJQVkVcIixcclxuICAgICAgICAgIGljb246IFwicHZlXCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJQVkUvXCIsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1wiUFZFXCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJWTXdhcmVcIixcclxuICAgICAgICAgIGljb246IFwidm13YXJlXCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJWTXdhcmUvXCIsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1wiXHU3RjUxXHU3RURDXHU5MTREXHU3RjZFXCIsIFwiXHU2REZCXHU1MkEwXHU3OEMxXHU3NkQ4XCJdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiL3B5dGhvblwiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwicHl0aG9uXCIsXHJcbiAgICAgIGljb246IFwicHl0aG9uXCIsXHJcbiAgICAgIHByZWZpeDogXCIvcHl0aG9uL1wiLFxyXG4gICAgICBsaW5rOiBcIi9weXRob24vXCIsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJcdThCRURcdThBMDBcIixcclxuICAgICAgICAgIGljb246IFwiZ3VpZGVcIixcclxuICAgICAgICAgIGNvbGxhcHNhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgcHJlZml4OiBcIlx1OEJFRFx1OEEwMC9cIixcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiBcIlx1NTdGQVx1Nzg0MFwiLFxyXG4gICAgICAgICAgICAgIGNvbGxhcHNhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHByZWZpeDogXCJcdTU3RkFcdTc4NDAvXCIsXHJcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIlx1NzNBRlx1NTg4M1x1NUI4OVx1ODhDNVwiLCBcInBpcFwiLCBcIlx1NjU3MFx1NjM2RVx1N0M3Qlx1NTc4QlwiLCBcIlx1NkQ0MVx1N0EwQlx1NjNBN1x1NTIzNlwiLCBcIlx1NUI1N1x1N0IyNlx1N0YxNlx1NzgwMVwiLCBcIlx1NjU4N1x1NEVGNlx1NTdGQVx1Nzg0MFwiLCBcIlB5dGhvblx1OTg3OVx1NzZFRVx1NjI1M1x1NTMwNVwiXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHRleHQ6IFwiXHU4RkRCXHU5NjM2XCIsXHJcbiAgICAgICAgICAgICAgY29sbGFwc2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgcHJlZml4OiBcIlx1OEZEQlx1OTYzNi9cIixcclxuICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiXHU1M0Q4XHU5MUNGXHU2NzNBXHU1MjM2XCIsIFwiXHU1MUZEXHU2NTcwXCIsIFwiXHU2QTIxXHU1NzU3XHU1NDhDXHU1MzA1XCIsIFwiXHU4OEM1XHU5OTcwXHU1NjY4XCIsIFwiXHU4RkVEXHU0RUUzXHU1NjY4XCIsIFwiXHU3NTFGXHU2MjEwXHU1NjY4XCIsIFwiXHU5NTE5XHU4QkVGXHU1NDhDXHU1RjAyXHU1RTM4XCIsIFwiXHU5NzYyXHU1NDExXHU1QkY5XHU4QzYxXCIsIFwiXHU0RkUxXHU1M0Y3XHU5MUNGXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogXCJcdTZERjFcdTUxNjVcIixcclxuICAgICAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICBwcmVmaXg6IFwiXHU2REYxXHU1MTY1L1wiLFxyXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCJcdTU3ODNcdTU3M0VcdTU2REVcdTY1MzZcIiwgXCJcdTVFOEZcdTUyMTdcdThGREJcdTk2MzZcIiwgXCJcdTY2MjBcdTVDMDRcdThGREJcdTk2MzZcIiwgXCJcdThCQkVcdThCQTFcdTZBMjFcdTVGMEZcIiwgXCJDcHl0aG9uXHU1QkY5XHU4QzYxXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogXCJcdTdGNTFcdTdFRENcdTdGMTZcdTdBMEJcIixcclxuICAgICAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICBwcmVmaXg6IFwiXHU3RjUxXHU3RURDXHU3RjE2XHU3QTBCL1wiLFxyXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCJcdTU2REVcdThDMDNcIiwgXCJcdTRFOEJcdTRFRjZcdTZBMjFcdTU3OEJcIiwgXCJTb2NrZXRcIiwgXCJXZWJTb2NrZXRcIl0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0ZXh0OiBcIlx1NTkxQVx1NEVGQlx1NTJBMVx1N0YxNlx1N0EwQlwiLFxyXG4gICAgICAgICAgICAgIGNvbGxhcHNhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHByZWZpeDogXCJcdTU5MUFcdTRFRkJcdTUyQTFcdTdGMTZcdTdBMEIvXCIsXHJcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIlx1OEZEQlx1N0EwQlwiLCBcIlx1NTkxQVx1OEZEQlx1N0EwQlx1N0YxNlx1N0EwQlwiLCBcIlx1N0VCRlx1N0EwQlwiLCBcIlx1NTkxQVx1N0VCRlx1N0EwQlx1N0YxNlx1N0EwQlwiLCBcIlx1NTQwQ1x1NkI2NVx1OTYxRlx1NTIxN1wiLCBcIlx1NTM0Rlx1N0EwQlwiLCBcIkxpbnV4XHU2NTg3XHU0RUY2XHU5NTAxXCIsIFwiXHU5QUQ4XHU2MDI3XHU4MEZEXHU3RjE2XHU3QTBCXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogXCJhc3luY2lvXCIsXHJcbiAgICAgICAgICAgICAgY29sbGFwc2FibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgcHJlZml4OiBcImFzeW5jaW8vXCIsXHJcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFtcImFzeW5jaW9cdTU3RkFcdTc4NDBcIiwgXCJhc3luY2lvXHU4RkRCXHU5NjM2XCIsIFwiXHU1RTk1XHU1QzQyXHU1QjlFXHU3M0IwXCIsIFwiXHU0RThCXHU0RUY2XHU1RkFBXHU3M0FGXCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdGV4dDogXCJcdTVFOTNcIixcclxuICAgICAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICBwcmVmaXg6IFwiXHU1RTkzL1wiLFxyXG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCJcdTY4MDdcdTUxQzZcdTVFOTNcdTk0RkVcdTYzQTVcIl0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgdGV4dDogXCJcdTc1MUZcdTYwMDFcIixcclxuICAgICAgICAgICAgaWNvbjogXCJndWlkZVwiLFxyXG4gICAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgcHJlZml4OiBcIlx1NzUxRlx1NjAwMS9cIixcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIldlYlx1Njg0Nlx1NjdCNlwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmcmFtZXdvcmtcIixcclxuICAgICAgICAgICAgICAgIGNvbGxhcHNhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcHJlZml4OiBcIldlYlx1Njg0Nlx1NjdCNi9cIixcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1N0Y1MVx1N0VEQ1x1Njg0Nlx1NjdCNlx1NTdGQVx1Nzg0MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxhcHNhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCJcdTdGNTFcdTdFRENcdTY4NDZcdTY3QjZcdTU3RkFcdTc4NDAvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgIFwiV0VCXHU2ODQ2XHU2N0I2XHU2NzJDXHU4RDI4XCIsIFwiXHU3MkI2XHU2MDAxXHU3QkExXHU3NDA2XCJcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIkZhc3RBUElcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhc3RhcGlcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiRmFzdEFQSS9cIixcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgXCJGYXN0QVBJXHU1N0ZBXHU3ODQwXCIsIFwiRmFzdEFQSVx1NTdGQVx1Nzg0MFx1NEU4Q1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRGphbmdvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJkamFuZ29cIixcclxuICAgICAgICAgICAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFwiRGphbmdvL1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICBcIkRqYW5nb1x1Njk4Mlx1OEZGMFwiLCBcIkRqYW5nb1x1NTdGQVx1Nzg0MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiVG9ybmFkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwidG9ybmFkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxhcHNhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCJUb3JuYWRvL1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICBcInRvcm5hZG9cIixcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgXCIvZ29cIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcImdvXCIsXHJcbiAgICAgIGljb246IFwiZ29cIixcclxuICAgICAgcHJlZml4OiBcIi9nby9cIixcclxuICAgICAgbGluazogXCIvZ28vXCIsXHJcbiAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogXCJcdTU3RkFcdTc4NDBcIixcclxuICAgICAgICAgIGNvbGxhcHNhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgcHJlZml4OiBcIlx1NTdGQVx1Nzg0MC9cIixcclxuICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgIFwiZ29cdThCRURcdThBMDBcdTkwMUZcdThCQjBcIixcclxuICAgICAgICAgICAgXCJnb1x1NURFNVx1NTE3N1x1OTAxRlx1NzUyOFwiLFxyXG4gICAgICAgICAgICBcIlx1OTVFRFx1NTMwNVwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiBcIlx1N0I5N1x1NkNENVx1NEUwRVx1NjU3MFx1NjM2RVx1N0VEM1x1Njc4NFwiLFxyXG4gICAgICAgICAgY29sbGFwc2FibGU6IHRydWUsXHJcbiAgICAgICAgICBwcmVmaXg6IFwiXHU3Qjk3XHU2Q0Q1XHU0RTBFXHU2NTcwXHU2MzZFXHU3RUQzXHU2Nzg0L1wiLFxyXG4gICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgXCJcdTY5ODJcdThGRjBcIixcclxuICAgICAgICAgICAgXCJcdTY1NzBcdTdFQzRcIixcclxuICAgICAgICAgICAgXCJcdTdFQkZcdTYwMjdcdTg4NjhcIixcclxuICAgICAgICAgICAgXCJcdTY4MDhcdTRFMEVcdTk2MUZcdTUyMTdcIixcclxuICAgICAgICAgICAgXCJcdTY4MTFcIixcclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IFwiXHU0RjE4XHU1MzE2XCIsXHJcbiAgICAgICAgICBjb2xsYXBzYWJsZTogdHJ1ZSxcclxuICAgICAgICAgIHByZWZpeDogXCJcdTRGMThcdTUzMTYvXCIsXHJcbiAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICBcIlx1NTE3M1x1NEU4RU1hcFJlZHVjZVwiLFxyXG4gICAgICAgICAgICBcIkgyT1x1NUYxNVx1NTNEMVx1NzY4NFx1NEYxOFx1NTMxNlwiLFxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgXSxcclxuICBcIi9kYXRhYmFzZS9ldGNkXCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJldGNkXCIsXHJcbiAgICAgIGljb246IFwiZXRjZFwiLFxyXG4gICAgICBwcmVmaXg6IFwiL2RhdGFiYXNlL2V0Y2QvXCIsXHJcbiAgICAgIGxpbms6IFwiL2RhdGFiYXNlL2V0Y2QvXCIsXHJcbiAgICAgIGNoaWxkcmVuOiBbXCJldGNkXCJdXHJcbiAgICB9XHJcbiAgXSxcclxuICBcIi9kYXRhYmFzZS9NeVNRTFwiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiTXlTUUxcIixcclxuICAgICAgaWNvbjogXCJteXNxbFwiLFxyXG4gICAgICBwcmVmaXg6IFwiL2RhdGFiYXNlL015U1FML1wiLFxyXG4gICAgICBsaW5rOiBcIi9kYXRhYmFzZS9NeVNRTC9cIixcclxuICAgICAgY2hpbGRyZW46IFtcIk15U1FMXCJdXHJcbiAgICB9XHJcbiAgXSxcclxuICBcIi9kYXRhYmFzZS9Qb3N0Z3JlU1FMXCI6IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJQb3N0Z3JlU1FMXCIsXHJcbiAgICAgIGljb246IFwicG9zdGdyZXNxbFwiLFxyXG4gICAgICBwcmVmaXg6IFwiL2RhdGFiYXNlL1Bvc3RncmVTUUwvXCIsXHJcbiAgICAgIGxpbms6IFwiL2RhdGFiYXNlL1Bvc3RncmVTUUwvXCIsXHJcbiAgICAgIGNoaWxkcmVuOiBbXCJQb3N0Z3JlU1FMXCJdXHJcbiAgICB9XHJcbiAgXSxcclxuICBcIi9kYXRhYmFzZS9SZWRpc1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiUmVkaXNcIixcclxuICAgICAgaWNvbjogXCJyZWRpc1wiLFxyXG4gICAgICBwcmVmaXg6IFwiL2RhdGFiYXNlL1JlZGlzL1wiLFxyXG4gICAgICBsaW5rOiBcIi9kYXRhYmFzZS9SZWRpcy9cIixcclxuICAgICAgY2hpbGRyZW46IFtcInJlZGlzXCJdXHJcbiAgICB9XHJcbiAgXSxcclxuICBcIi90b29sL0dpdFwiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiXHU3MjQ4XHU2NzJDXHU2M0E3XHU1MjM2XCIsXHJcbiAgICAgIGljb246IFwiZ2l0XCIsXHJcbiAgICAgIHByZWZpeDogXCIvdG9vbC9HaXQvXCIsXHJcbiAgICAgIGxpbms6IFwiL3Rvb2wvR2l0L1wiLFxyXG4gICAgICBjaGlsZHJlbjogW1wiR2l0XCIsIFwiR0l0XHU2M0QwXHU0RUE0XHU4OUM0XHU1MjE5XCIsIFwiXHU1Qjg5XHU4OEM1R2l0bGFiXCJdXHJcbiAgICB9XHJcbiAgXSxcclxuICBcIi90b29sL0RvY2tlclwiOiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiRG9ja2VyXCIsXHJcbiAgICAgIGljb246IFwiZG9ja2VyXCIsXHJcbiAgICAgIHByZWZpeDogXCIvdG9vbC9Eb2NrZXIvXCIsXHJcbiAgICAgIGxpbms6IFwiL3Rvb2wvRG9ja2VyL1wiLFxyXG4gICAgICBjaGlsZHJlbjogW1wiZG9ja2VyXHU1QkI5XHU1NjY4XCIsIFwiXHU0RjdGXHU3NTI4XHU1N0ZBXHU3ODQwXCIsIFwiXHU1NDdEXHU0RUU0XCJdIC8vIFwiXHU3RjUxXHU3RURDXCIsXHJcbiAgICB9XHJcbiAgXSxcclxuICBcIi90b29sL0t1YmVybmV0ZXNcIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIkt1YmVybmV0ZXNcIixcclxuICAgICAgaWNvbjogXCJrdWJlcm5ldGVzXCIsXHJcbiAgICAgIHByZWZpeDogXCIvdG9vbC9LdWJlcm5ldGVzL1wiLFxyXG4gICAgICBsaW5rOiBcIi90b29sL0t1YmVybmV0ZXMvXCIsXHJcbiAgICAgIGNoaWxkcmVuOiBbXCJrOHNcdTVCODlcdTg4QzVcIiwgXCJrOHNcdThENDRcdTZFOTBQb2RcIiwgXCJrOHNcdTVERTVcdTRGNUNcdThEMUZcdThGN0RcIiwgXCJrOHNcdTY3MERcdTUyQTFcIiwgXCJrOHNcdTVCNThcdTUwQThcIiwgXCJrOHNcdThGREJcdTk2MzZcIiwgXCJIZWxtXHU1Qjg5XHU4OEM1XHU0RjdGXHU3NTI4XCJdXHJcbiAgICB9XHJcbiAgXSxcclxuICBcIi90b29sL1Byb21ldGhldXNcIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlByb21ldGhldXNcIixcclxuICAgICAgaWNvbjogXCJwcm9tZXRoZXVzXCIsXHJcbiAgICAgIHByZWZpeDogXCIvdG9vbC9Qcm9tZXRoZXVzL1wiLFxyXG4gICAgICBsaW5rOiBcIi90b29sL1Byb21ldGhldXMvXCIsXHJcbiAgICAgIGNoaWxkcmVuOiBbXCJcdTVCODlcdTg4QzVcIiwgXCJcdTU3RkFcdTY3MkNcdTRGN0ZcdTc1MjhcIl1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiL3Rvb2wvTmdpbnhcIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIk5naW54XCIsXHJcbiAgICAgIGljb246IFwibmdpbnhcIixcclxuICAgICAgcHJlZml4OiBcIi90b29sL05naW54L1wiLFxyXG4gICAgICBsaW5rOiBcIi90b29sL05naW54L1wiLFxyXG4gICAgICBjaGlsZHJlbjogW1wiTmdpbnhcdTU3RkFcdTc4NDBcIiwgXCJcdTVFOTRcdTc1MjhcdTkwRThcdTdGNzJcIl1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiL3Rvb2wvT3RoZXJcIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIk90aGVyXCIsXHJcbiAgICAgIGljb246IFwib3RoZXJcIixcclxuICAgICAgcHJlZml4OiBcIi90b29sL090aGVyL1wiLFxyXG4gICAgICBsaW5rOiBcIi90b29sL090aGVyL1wiLFxyXG4gICAgICBjaGlsZHJlbjogW1wicmRlc2t0b3BcIiwgXCJzY3JlZW5cIiwgXCJcdTdGNTFcdTdFRENcdTRFRTNcdTc0MDZcIl1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiL2Jvb2tcIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NEU2Nlx1N0M0RFwiLFxyXG4gICAgICBpY29uOiBcImJvb2tcIixcclxuICAgICAgcHJlZml4OiBcIi9ib29rL1wiLFxyXG4gICAgICBsaW5rOiBcIi9ib29rL1wiLFxyXG4gICAgICBjaGlsZHJlbjogW1wiXHU4MjdBXHU2NzJGXCIsIFwiXHU3OTNFXHU0RjFBXHU1QjY2XCIsIFwiXHU5MUQxXHU4NzhEXHU1QjY2XCIsIFwiXHU1RkMzXHU3NDA2XHU1QjY2XCIsIFwicHl0aG9uXCIsIFwiXHU2MjgwXHU2NzJGXCJdLFxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCIvZ3VpZGVcIjogW1xyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NTk4Mlx1NEY1NVx1NEY3Rlx1NzUyOFwiLFxyXG4gICAgICBpY29uOiBcImNyZWF0aXZlXCIsXHJcbiAgICAgIHByZWZpeDogXCIvZ3VpZGUvXCIsXHJcbiAgICAgIGxpbms6IFwiL2d1aWRlL1wiLFxyXG4gICAgICBjaGlsZHJlbjogW1wiZGlzYWJsZVwiLCBcImVuY3J5cHRcIiwgXCJtYXJrZG93blwiLCBcInBhZ2VcIl0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1QsU0FBUyx3QkFBd0I7OztBQ0FuQyxTQUFTLGlCQUFpQjs7O0FDQXhCLFNBQVMsY0FBYztBQUUvVSxJQUFPLGlCQUFRLE9BQU87QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixVQUFVO0FBQUEsVUFDUixFQUFFLE1BQU0sZ0JBQU0sTUFBTSx3Q0FBVTtBQUFBLFVBQzlCLEVBQUUsTUFBTSxnQkFBTSxNQUFNLHdDQUFVO0FBQUEsVUFDOUIsRUFBRSxNQUFNLGdCQUFNLE1BQU0sd0NBQVU7QUFBQSxVQUM5QixFQUFFLE1BQU0sNEJBQVEsTUFBTSxrQ0FB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
