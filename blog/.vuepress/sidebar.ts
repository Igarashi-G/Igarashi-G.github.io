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
            {
              text: "高级",
              collapsable: true,
              prefix: "高级/",
              children: ["设计模式", "垃圾回收", "序列进阶", "映射进阶", "Cpython对象"],
            },
          ],
        },
        
      ],
    },
    
  ],
  "/guide": [
    {
      text: "如何使用",
      icon: "creative",
      prefix: "/guide/",
      link: "/guide/",
      children: "structure",
    },
  ],
})
