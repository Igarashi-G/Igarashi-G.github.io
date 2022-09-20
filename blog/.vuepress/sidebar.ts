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
