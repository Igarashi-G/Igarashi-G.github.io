import {
  client_exports
} from "./chunk-ANKY43RT.js";
import {
  useRoute
} from "./chunk-TYRIGETP.js";
import "./chunk-E7KEG4JQ.js";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref
} from "./chunk-ZYRIB4P5.js";
import "./chunk-YTQSFUAA.js";
import "./chunk-BPKF3OQJ.js";

// node_modules/.pnpm/vuepress-plugin-comment2@2.0.0-beta.100/node_modules/vuepress-plugin-comment2/lib/client/components/Giscus.js
import "D:/Program/igarashi-blog/node_modules/.pnpm/vuepress-plugin-comment2@2.0.0-beta.100/node_modules/vuepress-plugin-comment2/lib/client/styles/giscus.scss";
var c = COMMENT_OPTIONS;
var u = Boolean(c.repo && c.repoId && c.category && c.categoryId);
var l = ["de", "gsw", "en", "es", "fr", "id", "it", "ja", "ko", "pl", "ro", "ru", "vi", "zh-CN", "zh-TW"];
var d = defineComponent({ name: "GiscusComment", props: { darkmode: Boolean }, setup(r) {
  const d2 = (0, client_exports.usePageFrontmatter)(), m = useRoute(), g = ref(false), v = computed(() => {
    const e2 = (0, client_exports.usePageLang)().value;
    if (l.includes(e2))
      return e2;
    const o2 = e2.split("-")[0];
    return l.includes(o2) ? o2 : "en";
  }), y = computed(() => {
    if (!u)
      return false;
    const e2 = false !== c.comment, t2 = d2.value.comment;
    return Boolean(t2) || false !== e2 && false !== t2;
  }), f = computed(() => ({ repo: c.repo, repoId: c.repoId, category: c.category, categoryId: c.categoryId, lang: v.value, theme: r.darkmode ? "dark" : "light", mapping: c.mapping || "pathname", term: (0, client_exports.withBase)(m.path), inputPosition: c.inputPosition || "top", reactionsEnabled: false !== c.reactionsEnabled ? "1" : "0", strict: false !== c.strict ? "1" : "0", emitMetadata: "0" }));
  return onMounted(async () => {
    await import("./giscus-6STZGT5Z.js"), g.value = true;
  }), () => h("div", { class: ["giscus-wrapper", { "input-top": "bottom" !== c.inputPosition }], style: { display: y.value ? "block" : "none" } }, g.value ? h("giscus-widget", f.value) : h("div", { style: "text-align:center" }, "Loading..."));
} });

// dep:@CommentProvider
var CommentProvider_default = d;
export {
  CommentProvider_default as default
};
//# sourceMappingURL=@CommentProvider.js.map
