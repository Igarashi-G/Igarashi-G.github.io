import { hasGlobalComponent } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.94_vuepress@2.0.0-rc.21/node_modules/@vuepress/helper/lib/client/index.js";
import Badge from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.81_n6lxmrcm2ldmypsbtzrnj4ueqy/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import PDF from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-rc.81_n6lxmrcm2ldmypsbtzrnj4ueqy/node_modules/vuepress-plugin-components/lib/client/components/PDF.js";

import "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.94_vuepress@2.0.0-rc.21/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("PDF")) app.component("PDF", PDF);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
