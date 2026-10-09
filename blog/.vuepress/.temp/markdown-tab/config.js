import { VPCodeTabs } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.137_@vuepress+bundler-vite@2.0.0-rc.31_@types+no_b87045837abe31842b2776b9d9e409a7/node_modules/@vuepress/plugin-markdown-tab/dist/client/components/VPCodeTabs.js";
import { VPTabs } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+plugin-markdown-tab@2.0.0-rc.137_@vuepress+bundler-vite@2.0.0-rc.31_@types+no_b87045837abe31842b2776b9d9e409a7/node_modules/@vuepress/plugin-markdown-tab/dist/client/components/VPTabs.js";

export default {
  enhance: ({ app }) => {
    app.component("VPCodeTabs", VPCodeTabs);
    app.component("VPTabs", VPTabs);
  },
};
