import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { viteBundler } from 'vuepress'

const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

export default defineUserConfig({
  lang: "zh-CN",
  title: "五十岚 ▪ 寄",
  description: "五十岚の博客",

  base: "/",

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
  pagePatterns: [
    "**/*.md",
    "!**/*.snippet.md",
    "!.vuepress",
    "!node_modules",
  ],

  shouldPrefetch: false,
  
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
