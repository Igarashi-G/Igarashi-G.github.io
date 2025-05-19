import { hopeTheme } from "vuepress-theme-hope"
import navbar from "./navbar.js"
import sidebar from "./sidebar.js"

export default hopeTheme({
  hostname: "https://igarashi-g.github.io/",

  author: {
    name: "悦·宝宝",
    url: "https://github.com/Igarashi-G",
  },

  iconAssets: "//at.alicdn.com/t/c/font_3654399_3ntst5bj8ws.css",

  logo: "avatar.jpg",

  repo: "Igarashi-G",

  docsDir: "demo/src",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "默认页脚",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    name: "悦·宝宝",
    avatar: "avatar.jpg",
    roundAvatar: true,
    description: "啥也不会滴好牛马，好吃懒做的大摆锤",
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
      Gitee: "https://gitee.com/igarashi",
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
      "/paint/PS操作基础.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
      article: "/article/",                 // 文章列表
      category: "/category/",               // 分类地图页
      categoryItem: "/category/:name/",     // 特定分类列表
      tag: "/tag/",                         // 标签地图页
      tagItem: "/tag/:name/",               // 特定标签列表
      encrypted: "/encrypted/",             // 加密文章列表	
      slide: "/slide/",                     // 幻灯片列表
      star: "/star/",                       // 星标文章列表	
      timeline: "/timeline/",               // 时间线列表	
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
        presets: ["ts", "vue"],
      },

      // 支持幻灯片
      // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/presentation.html
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
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
                content: "Recommanded",
              }
          },
        },
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
      vuePlayground: true,
    },
    // 组件
    // https://vuepress-theme-hope.gitee.io/v2/zh/guide/markdown/components.html
    components: ["Badge", "PDF"],

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
    orange: "#fb9b5f",
  },

  //全屏按钮：https://vuepress-theme-hope.gitee.io/v2/zh/guide/interface/others.html#%E5%85%A8%E5%B1%8F%E6%8C%89%E9%92%AE
  fullscreen: true,

  //深色模式 https://vuepress-theme-hope.gitee.io/v2/zh/guide/interface/darkmode.html
  darkmode: "switch", // switch enable

  //纯净模式 https://vuepress-theme-hope.gitee.io/v2/zh/guide/interface/pure.html
  pure: false,

  // 全局禁用是否展示编辑此页链接
  // https://vuepress-theme-hope.gitee.io/v2/zh/guide/feature/meta.html#%E5%9F%BA%E4%BA%8E-git-%E7%9A%84%E4%BF%A1%E6%81%AF
  editLink: false,

  //全局禁用是否显示页面贡献者
  // https://vuepress-theme-hope.gitee.io/v2/zh/guide/feature/meta.html#%E5%9F%BA%E4%BA%8E-git-%E7%9A%84%E4%BF%A1%E6%81%AF
  contributors: false,
})
