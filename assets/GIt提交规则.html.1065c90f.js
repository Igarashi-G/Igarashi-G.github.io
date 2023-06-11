import{_ as i}from"./plugin-vueexport-helper.2444895f.js";import{o as n,c as d,e as s,a as e,b as l,f as t}from"./app.28701975.js";const a={},r=e("p",null,[e("strong",null,"Git"),l(" \u4EE3\u7801\u63D0\u4EA4\u89C4\u8303")],-1),c=t(`<h4 id="\u901A\u7528\u89C4\u8303" tabindex="-1"><a class="header-anchor" href="#\u901A\u7528\u89C4\u8303" aria-hidden="true">#</a> \u901A\u7528\u89C4\u8303\uFF1A</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>(&lt;scope&gt;): &lt;subject&gt; + &lt;(note|issue|feature),\u53EF\u9009&gt;
// \u7A7A\u4E00\u884C
&lt;body&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u8981\u70B9\uFF1A</strong></p><ol><li>scope \u662F\u6A21\u5757\u540D\u79F0</li><li>subject \u662F commit \u7B80\u77ED\u63CF\u8FF0,\u662F\u6807\u9898,\u4F7F\u7528\u5C0F\u5199\u5B57\u6BCD,\u4E0D\u8D85\u8FC7 50 \u4E2A\u5B57\u7B26,\u672B\u5C3E\u4E0D\u5E26\u53E5\u53F7</li><li>\u7528\u82F1\u5F0F\u82F1\u8BED\u63D0\u4EA4\uFF08\u63A8\u8350\u4F7F\u7528 Google \u7FFB\u8BD1\u6DA6\u8272\uFF09</li><li>body \u662F\u53EF\u9009\u7684, \u529F\u80FD\u590D\u6742\u7684\u63D0\u4EA4\u8BB0\u5F55\u53EF\u4EE5\u5728 body \u4E2D\u8FDB\u884C\u8BE6\u7EC6\u9610\u8FF0</li><li>subject \u672B\u5C3E\u53EF\u4EE5\u6DFB\u52A0\u62EC\u53F7\u5305\u542B\u8BF4\u660E\u6CE8\u91CA\u3001\u5173\u8054\u7684 issue\u3001\u5173\u8054\u7684 feature \u7B49</li></ol><p><strong>\u5E38\u7528\u7684\u63D0\u4EA4\u7C7B\u578B:</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>	fixed xxxx
	updated xxxx
	added xxxx
	changed xxxx
	removed xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u5E38\u7528\u7684\u6A21\u5757\u540D\u79F0\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>	(all)     \u6240\u6709\u6A21\u5757(\u5BF9NEWS\u3001README\u7684\u66F4\u6539\u4E5F\u53EF\u4EE5\u653E\u5230all\u4E2D\uFF0C\u53D6\u51B3\u4E8E\u5DE5\u7A0B\u6E90\u7801\u7ED3\u6784)
	(doc)     \u6587\u6863\u76F8\u5173\u7684\u6A21\u5757
	(core)    \u6838\u5FC3\u670D\u52A1
	(build)   \u5DE5\u7A0B\u7F16\u8BD1\u6A21\u5757
	(rpm)     CentOS/RHEL\u6253\u5305\u6A21\u5757
	(deb)	  Ubuntu/Debian\u5E73\u53F0\u6253\u5305\u6A21\u5757
	(meta)	  metaserver\u6A21\u5757
	(chunk)	  chunkserver\u6A21\u5757
	(client)  client\u6A21\u5757
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5BF9\u6E90\u7801\u6A21\u5757\u7684\u5177\u4F53\u7C7B\u522B\uFF0C\u7531\u7814\u53D1\u6210\u5458\u5185\u90E8\u8FBE\u6210\u5171\u8BC6\u3002</p><h4 id="\u4E3E\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u4E3E\u4F8B" aria-hidden="true">#</a> \u4E3E\u4F8B</h4><p><strong>Normal</strong>:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>(all): version 4.0.0
(all): updated README files
(doc): added man pages
(client): fixed io error while reading data
(chunk): changed scheduling algorithm
(build): updated make files
(client): fixed typo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>With issue:</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>(client+master): fixed handling keepcache and direct flags (issue #374)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>With note:</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>(client): fixed oom killer disabling (setting oom_adj and oom_score_adj)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>With feature:</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>(client): added flag to allow unmounting network drive from explorer (feature #875)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>With body:</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>(client): don&#39;t download Doxygen if in cache

	This makes actually use of the cache. Also run 7z non-interactively,
	so any prompts (like for overwriting files) cannot hang the build.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20);function o(u,v){return n(),d("div",null,[r,s(" more "),c])}const x=i(a,[["render",o],["__file","GIt\u63D0\u4EA4\u89C4\u5219.html.vue"]]);export{x as default};
