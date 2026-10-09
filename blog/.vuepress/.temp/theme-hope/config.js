import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.110_373e0ae92c290a5e086259b92bcea43e/node_modules/vuepress-theme-hope/dist/bundle/exports/base.js";

import { defineCatalogInfoGetter } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+plugin-catalog@2.0.0-rc.137_@vuepress+bundler-vite@2.0.0-rc.31_@types+node@26_87de4f37e52d1c45e4354aa1dcac869c/node_modules/@vuepress/plugin-catalog/dist/client/index.js"
import { h } from "vue"
import { resolveComponent } from "vue"
import { Blog, BloggerInfo, SocialMedias, setupBlog } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.110_373e0ae92c290a5e086259b92bcea43e/node_modules/vuepress-theme-hope/dist/bundle/exports/blog.js";
import "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.110_373e0ae92c290a5e086259b92bcea43e/node_modules/vuepress-theme-hope/dist/client/styles/blog/layout.scss";
import { GlobalEncrypt, LocalEncrypt } from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.110_373e0ae92c290a5e086259b92bcea43e/node_modules/vuepress-theme-hope/dist/bundle/exports/encrypt.js";

import "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.135_@vuepress+bundler-vite@2.0.0-rc.31_@types+node@26.6.4_@vu_74b6013e468657a38986bb4b345846e2/node_modules/@vuepress/helper/dist/client/styles/colors.css";
import "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.135_@vuepress+bundler-vite@2.0.0-rc.31_@types+node@26.6.4_@vu_74b6013e468657a38986bb4b345846e2/node_modules/@vuepress/helper/dist/client/styles/normalize.css";
import "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/@vuepress+helper@2.0.0-rc.135_@vuepress+bundler-vite@2.0.0-rc.31_@types+node@26.6.4_@vu_74b6013e468657a38986bb4b345846e2/node_modules/@vuepress/helper/dist/client/styles/sr-only.css";
import "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-rc.110_373e0ae92c290a5e086259b92bcea43e/node_modules/vuepress-theme-hope/dist/client/styles/index.scss";

defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon, sizing: "both" }), title] : null,
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
    Blog,
  }
};
