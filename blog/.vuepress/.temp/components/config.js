import { hasGlobalComponent } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.135_@vuepress+bundler-vite@2.0.0-rc.31_@types+node@26.6.4_@vu_74b6013e468657a38986bb4b345846e2/node_modules/@vuepress/helper/dist/client/index.js";
import Badge from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.110_@vuepress+bundler-vite@2.0.0-rc.31_@types+node@_56cd7a86b0b4b2460bc54f24bd0fdec0/node_modules/vuepress-plugin-components/dist/client/components/Badge.js";

import "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.135_@vuepress+bundler-vite@2.0.0-rc.31_@types+node@26.6.4_@vu_74b6013e468657a38986bb4b345846e2/node_modules/@vuepress/helper/dist/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
