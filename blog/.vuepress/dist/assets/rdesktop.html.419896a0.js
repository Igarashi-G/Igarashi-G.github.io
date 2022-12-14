import{_ as a}from"./plugin-vueexport-helper.2444895f.js";import{o as i,c as l,a as s,b as n,d,e as t,f as c,r}from"./app.f50e8185.js";const o={},p={href:"https://github.com/rdesktop",target:"_blank",rel:"noopener noreferrer"},u=s("strong",null,"RDP",-1),v=c(`<h1 id="rdesktop\u8FDC\u7A0B\u5DE5\u5177" tabindex="-1"><a class="header-anchor" href="#rdesktop\u8FDC\u7A0B\u5DE5\u5177" aria-hidden="true">#</a> rdesktop\u8FDC\u7A0B\u5DE5\u5177</h1><h3 id="_1-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_1-\u5B89\u88C5" aria-hidden="true">#</a> 1. \u5B89\u88C5</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">apt-get</span> <span class="token function">install</span> rdesktop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-\u4F7F\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_2-\u4F7F\u7528\u547D\u4EE4" aria-hidden="true">#</a> 2. \u4F7F\u7528\u547D\u4EE4</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>-d: \u57DF
-s: shell\u547D\u4EE4 <span class="token punctuation">(</span>\u767B\u5F55\u8FD0\u884C\u547D\u4EE4\u4E4B\u540E\u5C31\u9000\u51FA<span class="token punctuation">)</span>
-c: \u5DE5\u4F5C\u76EE\u5F55\uFF08\u5E94\u8BE5\u662F-s\u7684\u5B50\u547D\u4EE4\uFF09\uFF0C-s shell\u547D\u4EE4\u7684\u4E00\u4E2A\u53C2\u6570
-p: password <span class="token punctuation">(</span>- to prompt<span class="token punctuation">)</span>
-n: \u5BA2\u6237\u7AEF\uFF08\u672C\u5730\uFF09\u4E3B\u673A\u540D\uFF0C\u9ED8\u8BA4\u4E3A\u672C\u5730\u4E3B\u673A\u540D
-k: \u670D\u52A1\u5668\u4E0A\u7684\u952E\u76D8\u5E03\u5C40\u9009\u62E9 <span class="token punctuation">(</span>en-us, de, sv, etc.<span class="token punctuation">)</span>
-g: \u684C\u9762\u5206\u8FA8\u7387\uFF08\u5BBDx\u9AD8\uFF09
-i: enables smartcard authentication, password is used as pin
-f: \u5168\u5C4F\u6A21\u5F0F\uFF08Ctrl + Alt + Enter \u9000\u51FA\u5168\u5C4F\u6A21\u5F0F\uFF09
-b: \u5F3A\u5236\u4F4D\u56FE\u5237\u65B0\uFF08\u6CA1\u53D1\u73B0\u4EC0\u4E48\u7528\uFF09
-L: \u672C\u5730\u7F16\u7801
-A: \u65E0\u7F1D\u865A\u62DF\u5E94\u7528\u7A0B\u5E8F\u5230\u672C\u5730
-B: use BackingStore of X-server <span class="token punctuation">(</span>if available<span class="token punctuation">)</span>
-e: disable encryption <span class="token punctuation">(</span>French TS<span class="token punctuation">)</span> \u7981\u7528\u52A0\u5BC6
-E: disable encryption from client to server \u4ECE\u5BA2\u6237\u7AEF\u5230\u670D\u52A1\u5668\uFF0C\u7981\u7528\u52A0\u5BC6\u3002
-m: \u4E0D\u5141\u8BB8\u62D6\u52A8\uFF08\u4E0D\u4F20\u9012\u9F20\u6807\u7684\u62D6\u52A8\u4E8B\u4EF6\uFF09
-C: use private colour map
-D: \u4E0D\u663E\u793A\u7A97\u53E3\u6807\u9898\u680F\uFF08\u53EA\u6709\u8FDC\u7A0B\u684C\u9762\u7A97\u53E3\uFF0C\u6CA1\u6709\u5173\u95ED\u548C\u6700\u5C0F\u5316\u6309\u94AE\uFF09
-K: \u7A97\u53E3\u5207\u6362\u5FEB\u6377\u70ED\u952E\uFF08Alt+Tab\uFF09\u4E0D\u4F20\u9012\u5230\u8FDC\u7A0B\u684C\u9762
-S: \u6807\u9898\u6309\u94AE\u7684\u5927\u5C0F\uFF0C\u4E2A\u4EBA\u89C9\u5F97\u8FD9\u4E2A\u53C2\u6570\u5F88\u65E0\u7528\uFF0C\u6216\u8005\u6211\u8FD8\u6CA1\u5F04\u660E\u767D\u5230\u5E95\u4EC0\u4E48\u610F\u601D\u3002
-T: \u7A97\u53E3\u6807\u9898
-t: disable use of remote ctrl
-N: \u6570\u5B57\u952E\u76D8\u540C\u6B65
-X: \u7ED9\u5B9A\u53E6\u4E00\u4E2A\u7A97\u53E3\u7684\u6807\u8BC6\uFF0C\u5D4C\u5165\u5230\u53E6\u4E00\u4E2A\u7A97\u53E3
-a: connection colour depth \u9009\u62E9\u989C\u8272\u6DF1\u5EA6
-z: \u542F\u7528rdp\u538B\u7F29
-x: RDP5 experience <span class="token punctuation">(</span>m<span class="token punctuation">[</span>odem <span class="token number">28.8</span><span class="token punctuation">]</span>, b<span class="token punctuation">[</span>roadband<span class="token punctuation">]</span>, l<span class="token punctuation">[</span>an<span class="token punctuation">]</span> or hex nr.<span class="token punctuation">)</span>
-P: \u6301\u4E45\u4F4D\u56FE\u7F13\u5B58
-r: \u8BBE\u5907\u91CD\u5B9A\u5411\uFF08\u53C2\u6570\u53EF\u4EE5\u91CD\u590D\u4F7F\u7528\uFF09
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>\u793A\u4F8B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5C3D\u53EF\u80FD\u5FEB\u901F\u8F93\u51FA\u7684\u5C06\u526A\u8D34\u677F\u548C\u58F0\u97F3\u6620\u5C04\u8FC7\u53BB</span>
rdesktop <span class="token parameter variable">-P</span> <span class="token parameter variable">-r</span> clipboard:PROMARYCLIPBOARD <span class="token parameter variable">-r</span> sound:local <span class="token number">192.168</span>.3.75
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_3-\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_3-\u95EE\u9898" aria-hidden="true">#</a> 3. \u95EE\u9898</h3><ul><li><p>\u89E3\u51B3\u58F0\u97F3\u5931\u6548\u7684\u529E\u6CD5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u8981\u627E\u51FA\u54EA\u4E9B\u8FDB\u7A0B\u6B63\u5728\u8BBF\u95EE\u58F0\u97F3\u8BBE\u5907</span>
<span class="token function">lsof</span> /dev/snd/*

<span class="token comment"># \u5E72\u6389\u5B83</span>
<span class="token function">fuser</span> /dev/snd/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,8);function m(b,h){const e=r("ExternalLinkIcon");return i(),l("div",null,[s("p",null,[s("a",p,[n("rdesktop"),d(e)]),n(" \u662F\u5FAE\u8F6F "),u,n(" \u534F\u8BAE\u7684\u5F00\u6E90\u5BA2\u6237\u7AEF")]),t(" more "),v])}const f=a(o,[["render",m],["__file","rdesktop.html.vue"]]);export{f as default};
