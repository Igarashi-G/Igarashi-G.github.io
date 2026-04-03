import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.82_e3inqaxasw55kclwdpvpku4dte/node_modules/vuepress-theme-hope/lib/bundle/export.js";

import { defineCatalogInfoGetter } from "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.94_vuepress@2.0.0-rc.21/node_modules/@vuepress/plugin-catalog/lib/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { BlogCategory, BlogHome, BlogType, BloggerInfo, SocialMedias, Timeline, setupBlog } from "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.82_e3inqaxasw55kclwdpvpku4dte/node_modules/vuepress-theme-hope/lib/bundle/modules/blog/export.js";
import "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.82_e3inqaxasw55kclwdpvpku4dte/node_modules/vuepress-theme-hope/lib/bundle/modules/blog/styles/all.scss";
import { GlobalEncrypt, LocalEncrypt } from "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.82_e3inqaxasw55kclwdpvpku4dte/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/export.js";
import "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.82_e3inqaxasw55kclwdpvpku4dte/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/styles/all.scss"

import "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.94_vuepress@2.0.0-rc.21/node_modules/@vuepress/helper/lib/client/styles/colors.css";
import "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.94_vuepress@2.0.0-rc.21/node_modules/@vuepress/helper/lib/client/styles/normalize.css";
import "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.94_vuepress@2.0.0-rc.21/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";
import "D:/Program/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.82_e3inqaxasw55kclwdpvpku4dte/node_modules/vuepress-theme-hope/lib/bundle/styles/all.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("SocialMedias", SocialMedias);
    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    BlogCategory,
    BlogHome,
    BlogType,
    Timeline,
  }
};
