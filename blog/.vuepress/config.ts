import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { viteBundler } from "@vuepress/bundler-vite";

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
        href: "//at.alicdn.com/t/c/font_3654399_7msjqsxnn8t.css",
      },
    ],
  ],

  theme,
  
  //是否开启页面预拉取，如果服务器宽带足够，可改为 true，会提升其他页面加载速度
  shouldPrefetch: true,
  
  pagePatterns: [
    "**/*.md",
    "!**/*.snippet.md",
    "!.vuepress",
    "!node_modules",
  ],

  define: () => ({
    IS_NETLIFY: "NETLIFY" in process.env,
  }),

  // Vite 8 treats `img/foo.png` as a package import. Normalize legacy article
  // assets to explicit relative paths without rewriting Markdown content.
  extendsMarkdown: (md) => {
    md.core.ruler.after("inline", "normalize-relative-image-paths", (state) => {
      const visit = (tokens: typeof state.tokens): void => {
        for (const token of tokens) {
          if (token.type === "image") {
            const src = token.attrGet("src")
            if (
              src &&
              !src.startsWith(".") &&
              !src.startsWith("/") &&
              !/^[a-z][a-z\d+.-]*:/i.test(src) &&
              src.includes("/")
            ) {
              token.attrSet("src", `./${src}`)
            }
          }
          if (token.children) visit(token.children)
        }
      }

      visit(state.tokens)
    })
  },

  bundler: viteBundler({
    configureVite: (config) => {
      config.build ??= {}
      // Vue Playground lazily loads Babel standalone (~4.2 MB) only on its demo page.
      config.build.chunkSizeWarningLimit = 4500

      config.optimizeDeps ??= {}
      const include = config.optimizeDeps.include
      config.optimizeDeps.include = [
        ...(Array.isArray(include) ? include : include ? [include] : []),
        "@braintree/sanitize-url",
        "dayjs",
        "elkjs",
        "elkjs/lib/elk.bundled.js",
      ]
      config.optimizeDeps.needsInterop = [
        ...(config.optimizeDeps.needsInterop ?? []),
        "@braintree/sanitize-url",
        "dayjs",
        "elkjs",
        "elkjs/lib/elk.bundled.js",
      ]
    },
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
