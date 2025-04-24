<template><div><p><strong>Git</strong> 代码提交规范</p>
<!-- more -->
<h4 id="通用规范" tabindex="-1"><a class="header-anchor" href="#通用规范"><span>通用规范：</span></a></h4>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>(&#x3C;scope>): &#x3C;subject> + &#x3C;(note|issue|feature),可选></span></span>
<span class="line"><span>// 空一行</span></span>
<span class="line"><span>&#x3C;body></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>要点：</strong></p>
<ol>
<li>scope 是模块名称</li>
<li>subject 是 commit 简短描述,是标题,使用小写字母,不超过 50 个字符,末尾不带句号</li>
<li>用英式英语提交（推荐使用 Google 翻译润色）</li>
<li>body 是可选的, 功能复杂的提交记录可以在 body 中进行详细阐述</li>
<li>subject 末尾可以添加括号包含说明注释、关联的 issue、关联的 feature 等</li>
</ol>
<p><strong>常用的提交类型:</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>	fixed xxxx</span></span>
<span class="line"><span>	updated xxxx</span></span>
<span class="line"><span>	added xxxx</span></span>
<span class="line"><span>	changed xxxx</span></span>
<span class="line"><span>	removed xxxx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常用的模块名称：</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>	(all)     所有模块(对NEWS、README的更改也可以放到all中，取决于工程源码结构)</span></span>
<span class="line"><span>	(doc)     文档相关的模块</span></span>
<span class="line"><span>	(core)    核心服务</span></span>
<span class="line"><span>	(build)   工程编译模块</span></span>
<span class="line"><span>	(rpm)     CentOS/RHEL打包模块</span></span>
<span class="line"><span>	(deb)	  Ubuntu/Debian平台打包模块</span></span>
<span class="line"><span>	(meta)	  metaserver模块</span></span>
<span class="line"><span>	(chunk)	  chunkserver模块</span></span>
<span class="line"><span>	(client)  client模块</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对源码模块的具体类别，由研发成员内部达成共识。</p>
<h4 id="举例" tabindex="-1"><a class="header-anchor" href="#举例"><span>举例</span></a></h4>
<p><strong>Normal</strong>:</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>(all): version 4.0.0</span></span>
<span class="line"><span>(all): updated README files</span></span>
<span class="line"><span>(doc): added man pages</span></span>
<span class="line"><span>(client): fixed io error while reading data</span></span>
<span class="line"><span>(chunk): changed scheduling algorithm</span></span>
<span class="line"><span>(build): updated make files</span></span>
<span class="line"><span>(client): fixed typo</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>With issue:</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>(client+master): fixed handling keepcache and direct flags (issue #374)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>With note:</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>(client): fixed oom killer disabling (setting oom_adj and oom_score_adj)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>With feature:</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>(client): added flag to allow unmounting network drive from explorer (feature #875)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>With body:</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>(client): don't download Doxygen if in cache</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	This makes actually use of the cache. Also run 7z non-interactively,</span></span>
<span class="line"><span>	so any prompts (like for overwriting files) cannot hang the build.</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


