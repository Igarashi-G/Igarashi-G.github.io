import CodeDemo from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.110_@vue+repl@4.7.2_@vuepress+bundler-vite@2.0.0-rc_e42be4cbc7fac3beee9a01be75ad5dd0/node_modules/vuepress-plugin-md-enhance/dist/client/components/CodeDemo.js";
import MdDemo from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.110_@vue+repl@4.7.2_@vuepress+bundler-vite@2.0.0-rc_e42be4cbc7fac3beee9a01be75ad5dd0/node_modules/vuepress-plugin-md-enhance/dist/client/components/MdDemo.js";
import Playground from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.110_@vue+repl@4.7.2_@vuepress+bundler-vite@2.0.0-rc_e42be4cbc7fac3beee9a01be75ad5dd0/node_modules/vuepress-plugin-md-enhance/dist/client/components/Playground.js";
import VuePlayground from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.110_@vue+repl@4.7.2_@vuepress+bundler-vite@2.0.0-rc_e42be4cbc7fac3beee9a01be75ad5dd0/node_modules/vuepress-plugin-md-enhance/dist/client/components/VuePlayground.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("Playground", Playground);
    app.component("VuePlayground", VuePlayground);
  },
};
