import { useStyleTag } from "D:/Program/igarashi-blog/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.100/node_modules/vuepress-plugin-components/lib/client/composables/index.js";
import { h } from "vue";
import { defineClientConfig } from "@vuepress/client";
import FontIcon from "D:/Program/igarashi-blog/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.100/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import Badge from "D:/Program/igarashi-blog/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.100/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import PDF from "D:/Program/igarashi-blog/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.100/node_modules/vuepress-plugin-components/lib/client/components/PDF.js";
import BackToTop from "D:/Program/igarashi-blog/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.100/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("FontIcon", FontIcon);
    app.component("Badge", Badge);
    app.component("PDF", PDF);
    
  },
  setup: () => {
    useStyleTag(`@import url("//at.alicdn.com/t/c/font_3654399_e6xix4avjkd.css");`, { id: "icon-assets" });
    
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
    
  ],
});