import { hasGlobalComponent } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.135_@vuepress+bundler-vite@2.0.0-rc.31_@types+node@26.6.4_@vu_74b6013e468657a38986bb4b345846e2/node_modules/@vuepress/helper/dist/client/index.js";
import { useStyleTag } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vueuse+core@15.0.0_vue@3.5.43_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js";
import { h } from "vue";
import { VPIcon } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0-rc.137_@vuepress+bundler-vite@2.0.0-rc.31_@types+node@26.6._5e3b842a6e5dc403eb63121d956eea64/node_modules/@vuepress/plugin-icon/dist/client/index.js"

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPIcon")) {
      app.component(
        "VPIcon",
        (props) =>
          h(VPIcon, {
            type: "iconfont",
            prefix: "iconfont icon-",
            ...props,
          })
      )
    }
  },
  setup: () => {
    useStyleTag(`\
@import url("//at.alicdn.com/t/c/font_3654399_7msjqsxnn8t.css");
`);
  },
}
