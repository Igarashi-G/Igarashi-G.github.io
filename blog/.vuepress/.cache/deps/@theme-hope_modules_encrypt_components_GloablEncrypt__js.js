import {
  PasswordModal_default,
  useGlobalEcrypt
} from "./chunk-XKLJ6WVK.js";
import "./chunk-TU6COK3D.js";
import "./chunk-HCPYPS3W.js";
import "./chunk-6EOYTJSC.js";
import "./chunk-ANKY43RT.js";
import "./chunk-WZJITTIT.js";
import "./chunk-G2TPYAZT.js";
import {
  defineComponent,
  h
} from "./chunk-FGBNMEU6.js";
import "./chunk-ZLM2EG36.js";
import "./chunk-BPKF3OQJ.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.100/node_modules/vuepress-theme-hope/lib/client/modules/encrypt/components/GloablEncrypt.js
var GloablEncrypt_default = defineComponent({
  name: "GlobalEncrypt",
  setup(_props, { slots }) {
    const { isGlobalEncrypted, validateGlobalToken } = useGlobalEcrypt();
    return () => {
      var _a;
      return isGlobalEncrypted.value ? h(PasswordModal_default, { full: true, onVerify: validateGlobalToken }) : ((_a = slots["default"]) == null ? void 0 : _a.call(slots)) || null;
    };
  }
});

// dep:@theme-hope_modules_encrypt_components_GloablEncrypt__js
var theme_hope_modules_encrypt_components_GloablEncrypt_js_default = GloablEncrypt_default;
export {
  theme_hope_modules_encrypt_components_GloablEncrypt_js_default as default
};
//# sourceMappingURL=@theme-hope_modules_encrypt_components_GloablEncrypt__js.js.map
