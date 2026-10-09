import { defineClientConfig } from "vuepress/client"
import { SlidePage } from "@vuepress/plugin-revealjs/layouts"
import { defineComponent, h } from "vue"

const PDF = defineComponent({
  name: "PDF",
  props: {
    height: {
      type: String,
      default: "500px",
    },
    page: {
      type: [Number, String],
      default: undefined,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => h("iframe", {
      src: props.page ? `${props.url}#page=${props.page}` : props.url,
      style: {
        border: 0,
        height: props.height,
        width: "100%",
      },
      title: "PDF viewer",
    })
  },
})

export default defineClientConfig({
  enhance({ app }) {
    app.component("PDF", PDF)
  },
  layouts: {
    Slide: SlidePage,
  },
})
