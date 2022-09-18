import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "是五十岚呐~",
  description: "五十岚的博客",

  base: "/igarashi-blog/",

  theme,
});
