export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-4eaf9f84","v-122beae0","v-aa761386","v-0b474588","v-8cdd0dee","v-181247d4","v-a901bc86","v-578be6e6","v-6a3ef20c","v-46c2efcc","v-7126c988","v-76f867fa","v-6d8029f2","v-14e723b3","v-2e3eac9e","v-4c863446","v-bf720700","v-0978b044","v-fffb8e28"]}},"encrypted":{"/":{"path":"/encrypted/","keys":["v-bf720700"]}},"slide":{"/":{"path":"/slide/","keys":["v-2e3eac9e"]}},"star":{"/":{"path":"/star/","keys":["v-4eaf9f84","v-aa761386","v-0b474588","v-8cdd0dee","v-181247d4","v-a901bc86","v-578be6e6","v-6a3ef20c","v-7126c988","v-76f867fa","v-6d8029f2","v-14e723b3"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-122beae0","v-4eaf9f84","v-aa761386","v-0b474588","v-8cdd0dee","v-181247d4","v-a901bc86","v-578be6e6","v-6a3ef20c","v-46c2efcc","v-7126c988","v-76f867fa","v-6d8029f2","v-14e723b3"]}}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateBlogType) {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap)
  })
}
