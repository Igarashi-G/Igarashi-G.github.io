import {
  LockIcon
} from "./chunk-ITXHBBO6.js";
import {
  EmptyIcon,
  SlideIcon,
  StickyIcon
} from "./chunk-IUA2HVIU.js";
import {
  useArticleInfo,
  useBlogOptions
} from "./chunk-VCZQWADX.js";
import {
  DropTransition_default
} from "./chunk-VLM4QD67.js";
import {
  PageInfo_default
} from "./chunk-PJQAMKD5.js";
import {
  useThemeLocaleData
} from "./chunk-RKNMW2TS.js";
import {
  client_exports
} from "./chunk-ANKY43RT.js";
import {
  RouterLink,
  useRoute,
  useRouter
} from "./chunk-TYRIGETP.js";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  toRef,
  unref,
  watch
} from "./chunk-ZYRIB4P5.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/components/ArticleItem.js
import "D:/Program/igarashi-blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/article-item.scss";
var ArticleItem_default = defineComponent({
  name: "ArticleItem",
  props: {
    info: {
      type: Object,
      required: true
    },
    path: { type: String, required: true }
  },
  setup(props) {
    const info = toRef(props, "info");
    const { config, items } = useArticleInfo(info);
    return () => h("article", {
      class: "article",
      vocab: "https://schema.org/",
      typeof: "Article"
    }, [
      info.value.sticky ? h(StickyIcon) : null,
      h("header", { class: "title" }, h(RouterLink, {
        to: props.path
      }, () => [
        info.value.isEncrypted ? h(LockIcon) : null,
        info.value.type === "slide" ? h(SlideIcon) : null,
        h("span", { property: "headline" }, info.value.title),
        info.value.cover ? h("meta", {
          property: "image",
          content: (0, client_exports.withBase)(info.value.cover)
        }) : null
      ])),
      info.value.excerpt ? h("div", { class: "excerpt", innerHTML: info.value.excerpt }) : null,
      h("hr", { class: "hr" }),
      h(PageInfo_default, {
        config: unref(config),
        ...items.value ? { items: items.value } : {}
      })
    ]);
  }
});

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/components/Pagination.js
import "D:/Program/igarashi-blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/pagination.scss";
var Pagination_default = defineComponent({
  name: "Pagination",
  props: {
    total: { type: Number, default: 10 },
    perPage: { type: Number, default: 10 },
    currentPage: { type: Number, default: 1 }
  },
  emits: ["updateCurrentPage"],
  setup(props, { emit }) {
    const themeLocale = useThemeLocaleData();
    const input = ref("");
    const locale = computed(() => themeLocale.value.paginationLocales);
    const totalPages = computed(() => Math.ceil(props.total / props.perPage));
    const enable = computed(() => Boolean(totalPages.value) && totalPages.value !== 1);
    const displayLeftEllipsis = computed(() => {
      if (totalPages.value < 7)
        return false;
      return props.currentPage > 4;
    });
    const displayRightEllipsis = computed(() => {
      if (totalPages.value < 7)
        return false;
      return props.currentPage < totalPages.value - 3;
    });
    const indexs = computed(() => {
      const { currentPage } = props;
      let min = 1;
      let max = totalPages.value;
      const arr = [];
      if (totalPages.value >= 7) {
        if (currentPage <= 4 && currentPage < totalPages.value - 3) {
          min = 1;
          max = 5;
        } else if (currentPage > 4 && currentPage >= totalPages.value - 3) {
          max = totalPages.value;
          min = totalPages.value - 4;
        } else if (totalPages.value > 7) {
          min = currentPage - 2;
          max = currentPage + 2;
        }
      }
      for (let i = min; i <= max; i++)
        arr.push(i);
      return arr;
    });
    const navigate = (page) => emit("updateCurrentPage", page);
    const jumpPage = (index) => {
      const pageNum = parseInt(index);
      if (pageNum <= totalPages.value && pageNum > 0)
        navigate(pageNum);
      else
        alert(locale.value.errorText.replace(/\$page/g, totalPages.value.toString()));
    };
    return () => h("div", { class: "pagination-wrapper" }, enable.value ? h("div", { class: "pagination-list" }, [
      h("div", { class: "page-number" }, [
        props.currentPage > 1 ? h("div", {
          class: "prev",
          role: "navigation",
          unselectable: "on",
          onClick: () => navigate(props.currentPage - 1)
        }, locale.value.prev) : null,
        ...displayLeftEllipsis.value ? [
          h("div", {
            role: "navigation",
            onClick: () => navigate(1)
          }, 1),
          h("div", { class: "ellipsis" }, "...")
        ] : [],
        ...indexs.value.map((num) => h("div", {
          key: num,
          class: { active: props.currentPage === num },
          role: "navigation",
          onClick: () => navigate(num)
        }, num)),
        ...displayRightEllipsis.value ? [
          h("div", { class: "ellipsis" }, "..."),
          h("div", {
            role: "navigation",
            onClick: () => navigate(totalPages.value)
          }, totalPages.value)
        ] : [],
        props.currentPage < totalPages.value ? h("div", {
          class: "next",
          role: "navigation",
          unselectable: "on",
          onClick: () => navigate(props.currentPage + 1)
        }, locale.value.next) : null
      ]),
      h("div", { class: "navigate-wrapper" }, [
        h("label", { for: "navigation-text" }, `${locale.value.navigate}: `),
        h("input", {
          id: "navigation-text",
          value: input.value,
          onInput: ({ target }) => {
            input.value = target.value;
          },
          onKeydown: (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              jumpPage(input.value);
            }
          }
        }),
        h("button", {
          class: "navigate",
          role: "navigation",
          title: locale.value.action,
          onClick: () => jumpPage(input.value)
        }, locale.value.action)
      ])
    ]) : []);
  }
});

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/components/ArticleList.js
import "D:/Program/igarashi-blog/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/article-list.scss";
var ArticleList_default = defineComponent({
  name: "ArticleList",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const blogOptions = useBlogOptions();
    const currentPage = ref(1);
    const articlePerPage = computed(() => blogOptions.value.articlePerPage || 10);
    const currentArticles = computed(() => props.items.slice((currentPage.value - 1) * articlePerPage.value, currentPage.value * articlePerPage.value));
    const updatePage = (page) => {
      currentPage.value = page;
      const query = { ...route.query };
      if (query["page"] === page.toString() || page === 1 && !query["page"])
        return;
      if (page === 1)
        delete query["page"];
      else
        query["page"] = page.toString();
      void router.push({ path: route.path, query });
    };
    watch(currentPage, () => {
      const distance = document.querySelector("#article-list").getBoundingClientRect().top + window.scrollY;
      setTimeout(() => {
        window.scrollTo(0, distance);
      }, 100);
    });
    onMounted(() => {
      const { page } = route.query;
      updatePage(page ? Number(page) : 1);
    });
    return () => h("div", { id: "article-list", class: "article-wrapper" }, currentArticles.value.length ? [
      ...currentArticles.value.map(({ info, path }, index) => h(DropTransition_default, { appear: true, delay: index * 0.04 }, () => h(ArticleItem_default, { key: path, info, path }))),
      h(Pagination_default, {
        currentPage: currentPage.value,
        perPage: articlePerPage.value,
        total: props.items.length,
        onUpdateCurrentPage: updatePage
      })
    ] : h(EmptyIcon));
  }
});

export {
  ArticleList_default
};
//# sourceMappingURL=chunk-H6TN4R6E.js.map
