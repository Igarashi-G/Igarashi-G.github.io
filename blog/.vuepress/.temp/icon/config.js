import { hasGlobalComponent } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.94_vuepress@2.0.0-rc.21/node_modules/@vuepress/helper/lib/client/index.js";
import { useStyleTag } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vueuse+core@13.1.0_vue@3.5.13/node_modules/@vueuse/core/index.mjs";
import { h } from "vue";
import { VPIcon } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+plugin-icon@2.0.0-rc.94_z4pf6qgh3znnahnd4ixs62rkoy/node_modules/@vuepress/plugin-icon/lib/client/index.js"

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
@import url("//at.alicdn.com/t/c/font_3654399_3ntst5bj8ws.css");
`);
  },
}
