import{_ as i}from"./plugin-vueexport-helper.2444895f.js";import{o as l,c as t,a as n,b as e,d as a,f as r,r as o}from"./app.cc6737f0.js";const s={},c=r(`<h1 id="\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u8BF4\u660E" aria-hidden="true">#</a> \u8BF4\u660E</h1><h4 id="\u6587\u4EF6\u8DEF\u5F84" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u8DEF\u5F84" aria-hidden="true">#</a> \u6587\u4EF6\u8DEF\u5F84\uFF1A</h4><pre><code>\u6D4B\u8BD5\u73AF\u5883\uFF1A172.18.70.203
\u8DEF\u5F84\uFF1A
    /usr/lib/uraid/scripts/dns
</code></pre><h4 id="\u547D\u4EE4\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#\u547D\u4EE4\u53C2\u6570" aria-hidden="true">#</a> \u547D\u4EE4\u53C2\u6570:</h4><p>\u901A\u8FC7 sh \u542F\u52A8\uFF1A/usr/lib/uraid/scripts/dns/dns-bind.sh</p><pre><code>optional arguments:
  -h, --help        show this help message and exit
  -method METHOD    \u65B9\u6CD5\u5305\u542B
                        start_bind\uFF1A\u540C\u6B65uetcdc\u4E2D\u6570\u636E\uFF0C\u542F\u52A8bind
                        add_conf\uFF1A\u6DFB\u52A0\u914D\u7F6E\u9879
                        del_conf\uFF1A\u5220\u9664\u914D\u7F6E\u9879
                        list: \u663E\u793A\u6240\u6709\u57DF\u540D
                            \u82E5\u6307\u5B9A -addr \u5219\u663E\u793A\u5BF9\u5E94\u57DF\u540D\u7684\u6240\u6709ip

  -ip IP            ip\u5730\u5740
  -addr ADDR        \u57DF\u540D
</code></pre>`,6),h=n("li",null,[n("p",null,"\u9996\u5148\u8981\u4ECE utecd \u4E2D\u5BFC\u5165\u6570\u636E,\u542F\u52A8 bind: /usr/lib/uraid/scripts/dns/dns-bind.sh -method start_bind")],-1),p=n("li",null,[n("p",null,"\u6DFB\u52A0\u914D\u7F6E\u9879:"),n("pre",null,[n("code",null,`  /usr/lib/uraid/scripts/dns/dns-bind.sh -method add_conf -ip 192.168.1.1 -addr www.abc.com

  \u6CE8\uFF1A\u6DFB\u52A0\u914D\u7F6E\u9879\u65F6\uFF0C\u53EF\u4EE5\u5355\u72EC\u914D\u7F6E\u57DF\u540D\uFF0C\u7136\u540E\u518D\u914D\u7F6Eip\uFF0C\u4E5F\u53EF\u4EE5\u4E00\u540C\u914D\u7F6E\uFF0C\u4F46\u4E0D\u80FD\u5355\u72EC\u914D\u7F6Eip
`)])],-1),u=n("li",null,[n("p",null,"\u5220\u9664\u914D\u7F6E\u9879:"),n("pre",null,[n("code",null,`  /usr/lib/uraid/scripts/dns/dns-bind.sh -method del_conf -ip 192.168.1.1 -addr www.abc.com
`)])],-1),_=n("li",null,[n("p",null,"\u5217\u51FA\u6240\u6709\u57DF\u540D\uFF1A /usr/lib/uraid/scripts/dns/dns-bind.sh -method list")],-1),m={href:"http://abc.com",target:"_blank",rel:"noopener noreferrer"},b=r(`<h4 id="\u8FD4\u56DE\u503C\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u8FD4\u56DE\u503C\u7C7B\u578B" aria-hidden="true">#</a> \u8FD4\u56DE\u503C\u7C7B\u578B\uFF1A</h4><pre><code>    \u6DFB\u52A0\u914D\u7F6E\u9879:
    {&#39;result&#39;: {&#39;code&#39;: 0, &#39;msg&#39;: [&#39;\u6DFB\u52A0IP\u6210\u529F&#39;, &#39;\u6DFB\u52A0\u57DF\u540D\u6210\u529F&#39;]},
     &#39;data&#39;: [{&#39;www.kkk.com.&#39;: [&#39;172.14.1.1&#39;, &#39;172.14.1.3&#39;]},
      {&#39;qwe.kkk.com&#39;: [&#39;172.14.1.2&#39;]},
      {&#39;www.kkk.com&#39;: [&#39;172.14.1.1&#39;, &#39;172.14.1.3&#39;]}],
     &#39;end&#39;: 1}

    \u5217\u51FA\u6240\u6709\u57DF\u540D\uFF1A
    {&#39;data&#39;: [&#39;localhost.localdomain&#39;, &#39;localhost&#39;, &#39;kkk.come&#39;, &#39;iii.come&#39;],
     &#39;end&#39;: 1,
     &#39;result&#39;: {&#39;code&#39;: 0, &#39;msg&#39;: [&#39;\u5217\u51FA\u6240\u6709\u57DF\u540D&#39;]}}

    \u5217\u51FA\u5BF9\u5E94\u57DF\u540D\u7684ip\uFF1A
    {&#39;data&#39;: [&#39;172.14.1.2&#39;, &#39;172.14.1.1&#39;, &#39;172.14.1.3&#39;, &#39;172.14.1.4&#39;],
     &#39;end&#39;: 1,
     &#39;result&#39;: {&#39;code&#39;: 0, &#39;msg&#39;: [&#39;\u627E\u5230\u914D\u7F6E\u6587\u4EF6\uFF1Akkk.come \u5BF9\u5E94\u7684ip&#39;]}}
</code></pre><h4 id="\u5B9A\u4E49\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u4E49\u6587\u4EF6" aria-hidden="true">#</a> \u5B9A\u4E49\u6587\u4EF6</h4><p>/usr/lib/uraid/scripts/const.py</p><pre><code>    NAMED_PATH = &#39;/etc/named.conf&#39;  - named\u914D\u7F6E\u6587\u4EF6\u5730\u5740
    ZONE_CONF_PATH = &#39;/var/named/&#39;  - zone\u914D\u7F6E\u6587\u4EF6\u5730\u5740
    UETCD_NAMED = &#39;/dns-bind/named.rfc1912.zones&#39; - uetcd named\u914D\u7F6E\u6587\u4EF6\u5730\u5740
    UETCD_ZONE = &#39;/dns-bind/var-named/&#39; - uetcd zone\u914D\u7F6E\u6587\u4EF6\u5730\u5740

    \u8FD4\u56DE\u503C\uFF1ACODE...
</code></pre><h4 id="\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#\u65E5\u5FD7" aria-hidden="true">#</a> \u65E5\u5FD7</h4><p>/usr/local/bind/bind.log</p><pre><code>\u7528\u4E8E\u8BB0\u5F55\u6DFB\u52A0\u6216\u5220\u9664\u914D\u7F6E\u9879\u7684\u64CD\u4F5C\u65E5\u5FD7
\u5982 add_conf \u6DFB\u52A0\u4FE1\u606F to /var/named/\u914D\u7F6E\u6587\u4EF6.zone
</code></pre><h4 id="\u4F7F\u7528-uetcdctl-\u547D\u4EE4\u67E5\u770B" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-uetcdctl-\u547D\u4EE4\u67E5\u770B" aria-hidden="true">#</a> \u4F7F\u7528 uetcdctl \u547D\u4EE4\u67E5\u770B</h4><ul><li>\u67E5\u770B named.rfc1912.zones \u6587\u4EF6 uetcdctl ls dns-bind uetcdctl get dns-bind/named.rfc1912.zones</li><li>\u67E5\u770B zone \u7684\u914D\u7F6E\u6587\u4EF6 uetcdctl ls dns-bind/var-named uetcdctl get dns-bind/var-named/{\u6587\u4EF6\u540D}.zone and uetcdctl get dns-bind/var-named/{\u6587\u4EF6\u540D}.arpa</li></ul><h3 id="\u811A\u672C\u4E1A\u52A1\u89C4\u5219\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u811A\u672C\u4E1A\u52A1\u89C4\u5219\u8BF4\u660E" aria-hidden="true">#</a> \u811A\u672C\u4E1A\u52A1\u89C4\u5219\u8BF4\u660E\uFF1A</h3><h4 id="_1-\u5220\u9664-ip-\u548C\u57DF\u540D" tabindex="-1"><a class="header-anchor" href="#_1-\u5220\u9664-ip-\u548C\u57DF\u540D" aria-hidden="true">#</a> 1.\u5220\u9664 ip \u548C\u57DF\u540D\uFF1A</h4>`,12),f=n("p",null,"\u5F53\u524D\u89C4\u5219\u4E3A\u6267\u884C\u5220\u9664\u547D\u4EE4\u5FC5\u987B\u8981\u6709 -addr \u53C2\u6570\uFF0C\u901A\u5E38\u6267\u884C",-1),w={href:"http://dns.py",target:"_blank",rel:"noopener noreferrer"},k={href:"http://www.abc.com",target:"_blank",rel:"noopener noreferrer"},x=n("li",null,[n("p",null,"\u6267\u884C\u4E0A\u8FF0\u547D\u4EE4\uFF1A"),n("ul",null,[n("li",null,[n("p",null,'1.\u82E5\u57DF\u540D addr \u4E0B\u5B58\u5728\u591A\u4E2A ip\uFF0C\u5219\u4E0D\u5220\u9664\u57DF\u540D\uFF0C\u53EA\u5220\u9664 ip\uFF0C\u5E76\u8FD4\u56DE "\u57DF\u540D\u4E0B\u8FD8\u5B58\u5728\u5BF9\u5E94\u7684 ip" \u7684\u63D0\u793A')]),n("li",null,[n("p",null,"2.\u82E5\u57DF\u540D addr \u4E0B\u53EA\u6709\u552F\u4E00\u4E00\u4E2A ip\uFF0C\u5219\u4F1A\u9ED8\u8BA4\u5C06 ip \u548C\u57DF\u540D \u4E00\u540C\u5220\u9664\uFF0C\u5E76\u8FD4\u56DE\u6210\u529F")])])],-1),g=n("p",null,"[\u6CE8\u610F]\uFF1A\u82E5\u4E00\u65E6\u53EA\u6267\u884C\u4E86",-1),E=n("pre",null,[n("code",null,`-method del_conf -addr www.abc.com \u547D\u4EE4 \u5E76\u672A\u643A\u5E26 -ip \u53C2\u6570\uFF0C
`)],-1),v=n("p",null,"\u4F1A\u6B63\u5E38\u5220\u9664\u57DF\u540D\uFF0C\u800C\u4E0D\u5220\u9664 ip\u3002\u82E5\u8981\u518D\u5220\u9664 ip\uFF0C\u5219\u7EE7\u7EED\u6267\u884C",-1),N=n("pre",null,[n("code",null,`-method del_conf -addr www.abc.com -ip 192.168.1.2
`)],-1),z=n("p",null,"\u5220\u9664 ip \u548C\u57DF\u540D\u547D\u4EE4\uFF0C\u5373\u53EF\u5B8C\u6210\u7EE7\u7EED\u5220\u9664 ip \u52A8\u4F5C\uFF08\u6216\u662F\u7EE7\u7EED\u6DFB\u52A0\u57DF\u540D\uFF0C\u53EF\u6062\u590D\u539F\u72B6\uFF09",-1);function D(T,A){const d=o("ExternalLinkIcon");return l(),t("div",null,[c,n("ul",null,[h,p,u,_,n("li",null,[n("p",null,[e("\u5217\u51FA\u5BF9\u5E94\u57DF\u540D\u7684 ip\uFF1A /usr/lib/uraid/scripts/dns/dns-bind.sh -method list -addr "),n("a",m,[e("abc.com"),a(d)])])])]),b,n("ul",null,[n("li",null,[f,n("p",null,[e("python3 "),n("a",w,[e("dns.py"),a(d)]),e(" -method del_conf -addr "),n("a",k,[e("www.abc.com"),a(d)]),e(" -ip 192.168.1.1")])]),x]),g,E,v,N,z])}const y=i(s,[["render",D],["__file","\u811A\u672C\u8BF4\u660E.html.vue"]]);export{y as default};
