import { CodeTabs } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.96_z4pf6qgh3znnahnd4ixs62rkoy/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.96_z4pf6qgh3znnahnd4ixs62rkoy/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.96_z4pf6qgh3znnahnd4ixs62rkoy/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
