import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

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
});
