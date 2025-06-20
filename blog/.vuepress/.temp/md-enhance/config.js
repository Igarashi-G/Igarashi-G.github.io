import CodeDemo from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.81_t63fa4pj4f64s64tax7n3npzeq/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.81_t63fa4pj4f64s64tax7n3npzeq/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import Playground from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.81_t63fa4pj4f64s64tax7n3npzeq/node_modules/vuepress-plugin-md-enhance/lib/client/components/Playground.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("Playground", Playground);
  },
};
