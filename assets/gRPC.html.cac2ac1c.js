import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as u,e as a,a as t,b as e,d as l,f as r,r as s}from"./app.4e18fb57.js";const i={},c=t("p",null,[l("\u76EE\u524D\u6BD4\u8F83\u4E3B\u6D41\uFF0C\u57FA\u4E8E "),t("strong",null,"Golang"),l(" \u5F00\u53D1\u7684 "),t("strong",null,"gRPC")],-1),h=r('<h1 id="grpc" tabindex="-1"><a class="header-anchor" href="#grpc" aria-hidden="true">#</a> gRPC</h1><h3 id="_1-\u90E8\u5206\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#_1-\u90E8\u5206\u6587\u6863" aria-hidden="true">#</a> 1. \u90E8\u5206\u6587\u6863</h3><h5 id="_1-1-\u8BBA\u6587" tabindex="-1"><a class="header-anchor" href="#_1-1-\u8BBA\u6587" aria-hidden="true">#</a> 1.1 \u8BBA\u6587</h5>',3),_={href:"https://github.com/grpc/proposal",target:"_blank",rel:"noopener noreferrer"},p=l("graphics"),g=t("h5",{id:"_1-2-\u670D\u52A1\u914D\u7F6E",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1-2-\u670D\u52A1\u914D\u7F6E","aria-hidden":"true"},"#"),l(" 1.2 \u670D\u52A1\u914D\u7F6E")],-1),f={href:"https://github.com/grpc/grpc/blob/master/doc/service_config.md",target:"_blank",rel:"noopener noreferrer"},b=l("Service Config in gRPC"),m={href:"https://grpc.github.io/grpc/core/group__grpc__arg__keys.html",target:"_blank",rel:"noopener noreferrer"},y=l("arg_keys"),N=t("h5",{id:"_1-3-\u91CD\u8BD5\u7B56\u7565",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1-3-\u91CD\u8BD5\u7B56\u7565","aria-hidden":"true"},"#"),l(" 1.3 \u91CD\u8BD5\u7B56\u7565")],-1),x={href:"https://github.com/grpc/grpc/blob/master/doc/grpc_xds_features.md",target:"_blank",rel:"noopener noreferrer"},k=l("what is xDS"),S=r('<h5 id="_1-4-\u5F00\u6E90\u5F15\u7528" tabindex="-1"><a class="header-anchor" href="#_1-4-\u5F00\u6E90\u5F15\u7528" aria-hidden="true">#</a> 1.4 \u5F00\u6E90\u5F15\u7528</h5><p><a href="/data-base/etcd/aioetcd3">aioetcd3:</a> \u7248\u672C\u8F83\u8001\uFF0C\u975E <code>asyncio</code> \u662F\u57FA\u4E8E\u7EBF\u7A0B\u5B9E\u73B0\u7684\u5E93</p><h5 id="_1-5-python-\u6587\u6863" tabindex="-1"><a class="header-anchor" href="#_1-5-python-\u6587\u6863" aria-hidden="true">#</a> 1.5 Python \u6587\u6863</h5>',3),O={href:"https://grpc.github.io/grpc/python/index.html",target:"_blank",rel:"noopener noreferrer"},J=l("gRPC Python\u2019s documentation"),v=l(" \u6B64 "),C=t("strong",null,"API \u662F\u7A33\u5B9A",-1),P=l(" \u7684"),V={href:"https://github.com/grpc/grpc/tree/master/src/python/grpcio",target:"_blank",rel:"noopener noreferrer"},R=l("grpc (github.com)"),B=l(" \u9700\u8981 "),I=t("code",null,"python >= 3.6",-1),j={href:"https://doc.oschina.net/grpc?t=56831",target:"_blank",rel:"noopener noreferrer"},T=l("\u5B98\u65B9\u6587\u6863\u4E2D\u6587\u7248"),A=t("h5",{id:"_1-6-proto3",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_1-6-proto3","aria-hidden":"true"},"#"),l(" 1.6 proto3")],-1),E={href:"https://developers.google.com/protocol-buffers/docs/proto3#simple",target:"_blank",rel:"noopener noreferrer"},F=l("protocol buffers"),L=t("table",null,[t("thead",null,[t("tr",null,[t("th",null,"proto3"),t("th",null,"JSON"),t("th",null,"JSON\u793A\u4F8B"),t("th",null,"\u6CE8\u610F")])]),t("tbody",null,[t("tr",null,[t("td",null,"message"),t("td",null,"object"),t("td",{"\u201CfBar\u201D:":"","v,":"","\u201Cg\u201D:":"","null,":"","\u2026":""}),t("td",null,"\u4EA7\u751FJSON\u5BF9\u8C61\uFF0C\u6D88\u606F\u5B57\u6BB5\u540D\u53EF\u4EE5\u88AB\u6620\u5C04\u6210lowerCamelCase\u5F62\u5F0F\uFF0C\u5E76\u4E14\u6210\u4E3AJSON\u5BF9\u8C61\u952E\uFF0Cnull\u88AB\u63A5\u53D7\u5E76\u6210\u4E3A\u5BF9\u5E94\u5B57\u6BB5\u7684\u9ED8\u8BA4\u503C")]),t("tr",null,[t("td",null,"enum"),t("td",null,"string"),t("td",null,"\u201CFOO_BAR\u201D"),t("td",null,"\u679A\u4E3E\u503C\u7684\u540D\u5B57\u5728proto\u6587\u4EF6\u4E2D\u88AB\u6307\u5B9A")]),t("tr",null,[t("td",null,"map"),t("td",null,"object"),t("td",{"\u201Ck\u201D:":"","v,":"","\u2026":""}),t("td",null,"\u6240\u6709\u7684\u952E\u90FD\u88AB\u8F6C\u6362\u6210string")]),t("tr",null,[t("td",null,"repeated V"),t("td",null,"array"),t("td",null,"[v, \u2026]"),t("td",null,"null\u88AB\u89C6\u4E3A\u7A7A\u5217\u8868")]),t("tr",null,[t("td",null,"bool"),t("td",null,"true, false"),t("td",null,"true, false"),t("td")]),t("tr",null,[t("td",null,"string"),t("td",null,"string"),t("td",null,"\u201CHello World!\u201D"),t("td")]),t("tr",null,[t("td",null,"bytes"),t("td",null,"base64 string"),t("td",null,"\u201CYWJjMTIzIT8kKiYoKSctPUB+\u201D"),t("td")]),t("tr",null,[t("td",null,"int32, fixed32, uint32"),t("td",null,"number"),t("td",null,"1, -10, 0"),t("td",null,"JSON\u503C\u4F1A\u662F\u4E00\u4E2A\u5341\u8FDB\u5236\u6570\uFF0C\u6570\u503C\u578B\u6216\u8005string\u7C7B\u578B\u90FD\u4F1A\u63A5\u53D7")]),t("tr",null,[t("td",null,"int64, fixed64, uint64"),t("td",null,"string"),t("td",null,"\u201C1\u201D, \u201C-10\u201D"),t("td",null,"JSON\u503C\u4F1A\u662F\u4E00\u4E2A\u5341\u8FDB\u5236\u6570\uFF0C\u6570\u503C\u578B\u6216\u8005string\u7C7B\u578B\u90FD\u4F1A\u63A5\u53D7")]),t("tr",null,[t("td",null,"float, double"),t("td",null,"number"),t("td",null,"1.1, -10.0, 0, \u201CNaN\u201D, \u201CInfinity\u201D"),t("td",null,"JSON\u503C\u4F1A\u662F\u4E00\u4E2A\u6570\u5B57\u6216\u8005\u4E00\u4E2A\u6307\u5B9A\u7684\u5B57\u7B26\u4E32\u5982\u201DNaN\u201D,\u201Dinfinity\u201D\u6216\u8005\u201D-Infinity\u201D\uFF0C\u6570\u503C\u578B\u6216\u8005\u5B57\u7B26\u4E32\u90FD\u662F\u53EF\u63A5\u53D7\u7684\uFF0C\u6307\u6570\u7B26\u53F7\u4E5F\u53EF\u4EE5\u63A5\u53D7")]),t("tr",null,[t("td",null,"Any"),t("td",null,"object"),t("td",{"\u201C@type\u201D:":"","\u201Curl\u201D,":"","\u201Cf\u201D:":"","v,":"","\u2026":""}),t("td",null,[l("\u5982\u679C\u4E00\u4E2AAny\u4FDD\u7559\u4E00\u4E2A\u7279\u4E0A\u8FF0\u7684JSON\u6620\u5C04\uFF0C\u5219\u5B83\u4F1A\u8F6C\u6362\u6210\u4E00\u4E2A\u5982\u4E0B\u5F62\u5F0F\uFF1A"),t("code",null,'{"@type": xxx, "value": yyy}'),l("\u5426\u5219\uFF0C\u8BE5\u503C\u4F1A\u88AB\u8F6C\u6362\u6210\u4E00\u4E2AJSON\u5BF9\u8C61\uFF0C"),t("code",null,"@type"),l("\u5B57\u6BB5\u4F1A\u88AB\u63D2\u5165\u6240\u6307\u5B9A\u7684\u786E\u5B9A\u7684\u503C")])]),t("tr",null,[t("td",null,"Timestamp"),t("td",null,"string"),t("td",null,"\u201C1972-01-01T10:00:20.021Z\u201D"),t("td",null,"\u4F7F\u7528RFC 339\uFF0C\u5176\u4E2D\u751F\u6210\u7684\u8F93\u51FA\u5C06\u59CB\u7EC8\u662FZ-\u5F52\u4E00\u5316\u554A\u7684\uFF0C\u5E76\u4E14\u4F7F\u75280\uFF0C3\uFF0C6\u6216\u80059\u4F4D\u5C0F\u6570")]),t("tr",null,[t("td",null,"Duration"),t("td",null,"string"),t("td",null,"\u201C1.000340012s\u201D, \u201C1s\u201D"),t("td",null,"\u751F\u6210\u7684\u8F93\u51FA\u603B\u662F0\uFF0C3\uFF0C6\u6216\u80059\u4F4D\u5C0F\u6570\uFF0C\u5177\u4F53\u4F9D\u8D56\u4E8E\u6240\u9700\u8981\u7684\u7CBE\u5EA6\uFF0C\u63A5\u53D7\u6240\u6709\u53EF\u4EE5\u8F6C\u6362\u4E3A\u7EB3\u79D2\u7EA7\u7684\u7CBE\u5EA6")]),t("tr",null,[t("td",null,"Struct"),t("td",null,"object"),t("td",{"\u2026":""}),t("td",null,"\u4EFB\u610F\u7684JSON\u5BF9\u8C61\uFF0C\u89C1struct.proto")]),t("tr",null,[t("td",null,"Wrapper types"),t("td",null,"various types"),t("td",null,"2, \u201C2\u201D, \u201Cfoo\u201D, true, \u201Ctrue\u201D, null, 0, \u2026"),t("td",null,"\u5305\u88C5\u5668\u5728JSON\u4E2D\u7684\u8868\u793A\u65B9\u5F0F\u7C7B\u4F3C\u4E8E\u57FA\u672C\u7C7B\u578B\uFF0C\u4F46\u662F\u5141\u8BB8nulll\uFF0C\u5E76\u4E14\u5728\u8F6C\u6362\u7684\u8FC7\u7A0B\u4E2D\u4FDD\u7559null")]),t("tr",null,[t("td",null,"FieldMask"),t("td",null,"string"),t("td",null,"\u201Cf.fooBar,h\u201D"),t("td",null,"\u89C1fieldmask.proto")]),t("tr",null,[t("td",null,"ListValue"),t("td",null,"array"),t("td",null,"[foo, bar, \u2026]"),t("td")]),t("tr",null,[t("td",null,"Value"),t("td",null,"value"),t("td"),t("td",null,"\u4EFB\u610FJSON\u503C")]),t("tr",null,[t("td",null,"NullValue"),t("td",null,"null"),t("td"),t("td",null,"JSON null")])])],-1);function W(w,D){const n=s("ExternalLinkIcon");return d(),u("div",null,[c,a(" more "),h,t("p",null,[t("a",_,[p,e(n)])]),g,t("p",null,[t("a",f,[b,e(n)]),t("a",m,[y,e(n)])]),N,t("p",null,[t("a",x,[k,e(n)])]),S,t("p",null,[t("a",O,[J,e(n)]),v,C,P]),t("p",null,[t("a",V,[R,e(n)]),B,I]),t("p",null,[t("a",j,[T,e(n)])]),A,t("p",null,[t("a",E,[F,e(n)])]),L])}const Y=o(i,[["render",W],["__file","gRPC.html.vue"]]);export{Y as default};