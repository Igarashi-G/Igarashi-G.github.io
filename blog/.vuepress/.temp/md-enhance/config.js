import CodeDemo from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.81_tr3fruqxw4mkbaozmm6ohtnuu4/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.81_tr3fruqxw4mkbaozmm6ohtnuu4/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import Mermaid from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.81_tr3fruqxw4mkbaozmm6ohtnuu4/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid.js";
import Playground from "/Users/fuuka/Desktop/CODE/Igarashi-G.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.81_tr3fruqxw4mkbaozmm6ohtnuu4/node_modules/vuepress-plugin-md-enhance/lib/client/components/Playground.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("Mermaid", Mermaid);
    app.component("Playground", Playground);
  },
};
