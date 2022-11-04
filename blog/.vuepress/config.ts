import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "五十岚 ▪ 寄",
  description: "五十岚の博客",

  base: "/",

  theme,
});
