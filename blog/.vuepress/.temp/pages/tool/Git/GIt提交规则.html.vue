<template><div><p><strong>Git</strong> 代码提交规范</p>
<!-- more -->
<h4 id="通用规范" tabindex="-1"><a class="header-anchor" href="#通用规范" aria-hidden="true">#</a> 通用规范：</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>(&lt;scope>): &lt;subject> + &lt;(note|issue|feature),可选>
// 空一行
&lt;body>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>要点：</strong></p>
<ol>
<li>scope 是模块名称</li>
<li>subject 是 commit 简短描述,是标题,使用小写字母,不超过 50 个字符,末尾不带句号</li>
<li>用英式英语提交（推荐使用 Google 翻译润色）</li>
<li>body 是可选的, 功能复杂的提交记录可以在 body 中进行详细阐述</li>
<li>subject 末尾可以添加括号包含说明注释、关联的 issue、关联的 feature 等</li>
</ol>
<p><strong>常用的提交类型:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>	fixed xxxx
	updated xxxx
	added xxxx
	changed xxxx
	removed xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>常用的模块名称：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>	(all)     所有模块(对NEWS、README的更改也可以放到all中，取决于工程源码结构)
	(doc)     文档相关的模块
	(core)    核心服务
	(build)   工程编译模块
	(rpm)     CentOS/RHEL打包模块
	(deb)	  Ubuntu/Debian平台打包模块
	(meta)	  metaserver模块
	(chunk)	  chunkserver模块
	(client)  client模块
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对源码模块的具体类别，由研发成员内部达成共识。</p>
<h4 id="举例" tabindex="-1"><a class="header-anchor" href="#举例" aria-hidden="true">#</a> 举例</h4>
<p><strong>Normal</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>(all): version 4.0.0
(all): updated README files
(doc): added man pages
(client): fixed io error while reading data
(chunk): changed scheduling algorithm
(build): updated make files
(client): fixed typo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>With issue:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>(client+master): fixed handling keepcache and direct flags (issue #374)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>With note:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>(client): fixed oom killer disabling (setting oom_adj and oom_score_adj)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>With feature:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>(client): added flag to allow unmounting network drive from explorer (feature #875)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>With body:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>(client): don't download Doxygen if in cache

	This makes actually use of the cache. Also run 7z non-interactively,
	so any prompts (like for overwriting files) cannot hang the build.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


