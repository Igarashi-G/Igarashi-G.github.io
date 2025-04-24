import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { viteBundler } from "@vuepress/bundler-vite";
import { searchPlugin } from "@vuepress/plugin-search";

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "悦 ▪ 宝宝",
  description: "悦宝宝の博客",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/c/font_3654399_e6xix4avjkd.css",
      },
    ],
  ],

  theme,
  
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
        '/': {
          placeholder: 'Search',
        },
      },
    }),
  ],

  pagePatterns: [
    "**/*.md",
    "!**/*.snippet.md",
    "!.vuepress",
    "!node_modules",
  ],

  define: () => ({
    IS_NETLIFY: "NETLIFY" in process.env,
  }),
  
  bundler: viteBundler({
    vuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'center',
        },
      },
    },

    viteOptions: {
      build: {  // gitPage部署小坑，不识别打包后的 下划线开头的 _*.js 文件
        rollupOptions: {
          output: {
            // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
            sanitizeFileName(name) {
              const match = DRIVE_LETTER_REGEX.exec(name);
              const driveLetter = match ? match[0] : '';
              // substr 是被淘汰語法，因此要改 slice
              return (
                driveLetter +
                name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
              );
            },
          },
        },
      },
    }
  }),

});
