<template><div><p>VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。</p>
<p>你应该创建和编写 Markdown 文件，以便 VuePress 可以根据文件结构将它们转换为不同的页面。</p>
<!-- more -->
<h2 id="markdown-介绍" tabindex="-1"><a class="header-anchor" href="#markdown-介绍"><span>Markdown 介绍</span></a></h2>
<p>如果你是一个新手，还不会编写 Markdown，请先阅读 <a href="https://vuepress-theme-hope.github.io/v2/zh/cookbook/markdown/" target="_blank" rel="noopener noreferrer">Markdown 介绍</a> 和 <a href="https://vuepress-theme-hope.github.io/v2/zh/cookbook/markdown/demo.html" target="_blank" rel="noopener noreferrer">Markdown 演示</a>。</p>
<h2 id="markdown-配置" tabindex="-1"><a class="header-anchor" href="#markdown-配置"><span>Markdown 配置</span></a></h2>
<p>VuePress 通过 Frontmatter 为每个 Markdown 页面引入配置。</p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>Frontmatter 是 VuePress 中很重要的一个概念，如果你不了解它，你需要阅读 <a href="https://vuepress-theme-hope.github.io/v2/zh/cookbook/vuepress/page.html#front-matter" target="_blank" rel="noopener noreferrer">Frontmatter 介绍</a>。</p>
</div>
<h2 id="markdown-扩展" tabindex="-1"><a class="header-anchor" href="#markdown-扩展"><span>Markdown 扩展</span></a></h2>
<p>VuePress 会使用 <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it</a> 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 <a href="https://github.com/markdown-it/markdown-it#syntax-extensions" target="_blank" rel="noopener noreferrer">语法扩展</a> 。</p>
<h3 id="vuepress-扩展" tabindex="-1"><a class="header-anchor" href="#vuepress-扩展"><span>VuePress 扩展</span></a></h3>
<p>为了丰富文档写作，VuePress 对 Markdown 语法进行了扩展。</p>
<p>关于这些扩展，请阅读 <a href="https://vuepress-theme-hope.github.io/v2/zh/cookbook/vuepress/markdown.html" target="_blank" rel="noopener noreferrer">VuePress 中的 Markdown 扩展</a>。</p>
<h3 id="主题扩展" tabindex="-1"><a class="header-anchor" href="#主题扩展"><span>主题扩展</span></a></h3>
<p>通过 <a href="https://vuepress-theme-hope.github.io/v2/md-enhance/zh/" target="_blank" rel="noopener noreferrer"><code v-pre>vuepress-plugin-md-enhance</code></a>，主题扩展了更多 Markdown 语法，提供更加丰富的写作功能。</p>
<h4 id="自定义容器" tabindex="-1"><a class="header-anchor" href="#自定义容器"><span>自定义容器</span></a></h4>
<p>::: v-pre</p>
<p>安全的在 Markdown 中使用 {{ variable }}。</p>
<p>:::</p>
<div class="hint-container info">
<p class="hint-container-title">自定义标题</p>
<p>信息容器，包含 <code v-pre>代码</code> 与 <a href="#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8">链接</a>。</p>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> a</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div>
<div class="hint-container tip">
<p class="hint-container-title">自定义标题</p>
<p>提示容器</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">自定义标题</p>
<p>警告容器</p>
</div>
<div class="hint-container caution">
<p class="hint-container-title">自定义标题</p>
<p>危险容器</p>
</div>
<details class="hint-container details"><summary>自定义标题</summary>
<p>详情容器</p>
</details>
<details class="hint-container details"><summary>代码</summary>
<div class="language-md line-numbers-mode" data-highlighter="shiki" data-ext="md" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::: v-pre</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">安全的在 Markdown 中使用 {{ variable }}。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::: info 自定义标题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">信息容器</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::: tip 自定义标题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">提示容器</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::: warning 自定义标题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">警告容器</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::: danger 自定义标题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">危险容器</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">::: details 自定义标题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">详情容器</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:::</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/container.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="代码块" tabindex="-1"><a class="header-anchor" href="#代码块"><span>代码块</span></a></h4>
<CodeTabs id="96" :data='[{"id":"pnpm"},{"id":"yarn"},{"id":"npm"}]' :active="2">
<template #title0="{ value, isActive }">pnpm</template>
<template #title1="{ value, isActive }">yarn</template>
<template #title2="{ value, isActive }">npm</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> add</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vuepress-theme-hope</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yarn</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> add</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vuepress-theme-hope</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">npm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> i</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -D</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vuepress-theme-hope</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
</CodeTabs>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/code-tabs.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="上下角标" tabindex="-1"><a class="header-anchor" href="#上下角标"><span>上下角标</span></a></h4>
<p>19^th^ H~2~O</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/sup-sub.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="自定义对齐" tabindex="-1"><a class="header-anchor" href="#自定义对齐"><span>自定义对齐</span></a></h4>
<div style="text-align:center">
<p>我是居中的</p>
</div>
<div style="text-align:right">
<p>我在右对齐</p>
</div>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/align.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="attrs" tabindex="-1"><a class="header-anchor" href="#attrs"><span>Attrs</span></a></h4>
<p>一个拥有 ID 的 <strong id="word">单次</strong>。</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/attrs.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="脚注" tabindex="-1"><a class="header-anchor" href="#脚注"><span>脚注</span></a></h4>
<p>此文字有脚注<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup>.</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/footnote.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="标记" tabindex="-1"><a class="header-anchor" href="#标记"><span>标记</span></a></h4>
<p>你可以标记 <mark>重要的内容</mark> 。</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/mark.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="任务列表" tabindex="-1"><a class="header-anchor" href="#任务列表"><span>任务列表</span></a></h4>
<ul class="task-list-container">
<li class="task-list-item">
<p><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 计划 1</label></p>
</li>
<li class="task-list-item">
<p><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> 计划 2</label></p>
</li>
<li>
<p><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/tasklist.html" target="_blank" rel="noopener noreferrer">查看详情</a></p>
</li>
</ul>
<h3 id="图片增强" tabindex="-1"><a class="header-anchor" href="#图片增强"><span>图片增强</span></a></h3>
<p>支持为图片设置颜色模式和大小</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/image.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="图表" tabindex="-1"><a class="header-anchor" href="#图表"><span>图表</span></a></h4>
<p>::: chart 一个散点图案例</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"scatter"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "data"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "datasets"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        "label"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"散点数据集"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        "data"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"x"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">-10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"y"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"x"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"y"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"x"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"y"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">          { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"x"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">"y"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5.5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        ],</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        "backgroundColor"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"rgb(255, 99, 132)"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "options"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "scales"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "x"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        "type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"linear"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        "position"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"bottom"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/chart.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="echarts" tabindex="-1"><a class="header-anchor" href="#echarts"><span>Echarts</span></a></h4>
<p>::: echarts 一个折线图案例</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "xAxis"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"category"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "data"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Mon"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Tue"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Wed"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Thu"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Fri"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Sat"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Sun"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "yAxis"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    "type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"value"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  },</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "series"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "data"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">150</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">230</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">224</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">218</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">135</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">147</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">260</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">      "type"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"line"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/echarts.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="流程图" tabindex="-1"><a class="header-anchor" href="#流程图"><span>流程图</span></a></h4>
<div class="language-flow line-numbers-mode" data-highlighter="shiki" data-ext="flow" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>cond=>condition: 是否执行操作?</span></span>
<span class="line"><span>process=>operation: 操作</span></span>
<span class="line"><span>e=>end: 结束</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cond(yes)->process->e</span></span>
<span class="line"><span>cond(no)->e</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/flowchart.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="mermaid" tabindex="-1"><a class="header-anchor" href="#mermaid"><span>Mermaid</span></a></h4>
<div class="language-mermaid line-numbers-mode" data-highlighter="shiki" data-ext="mermaid" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">flowchart TB</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    c1-->a2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    subgraph one</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    a1-->a2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    end</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    subgraph two</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    b1-->b2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    end</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    subgraph three</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    c1-->c2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    end</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    one --> two</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    three --> two</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    two --> c2</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/mermaid.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="tex-语法" tabindex="-1"><a class="header-anchor" href="#tex-语法"><span>Tex 语法</span></a></h4>
<p>$$<br>
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)<br>
= \left(\frac {y^{\omega}} {\omega}\right) \left{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right}<br>
$$</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/tex.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="导入文件" tabindex="-1"><a class="header-anchor" href="#导入文件"><span>导入文件</span></a></h4>
<p>@include(./README.md{11-17})</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/include.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="代码演示" tabindex="-1"><a class="header-anchor" href="#代码演示"><span>代码演示</span></a></h4>
<CodeDemo id="code-demo-304" type="normal" title="%E4%B8%80%E4%B8%AA%E6%99%AE%E9%80%9A%20Demo" code="eJwljrGKAjEQhl9lbq5REJdrvZju4IorDhSrNEsysKvZZE2ygoiPopXgK4j4Olv4Fk7cZor5v3++OWCVGoszFNWXXHX0HyhGWFbUEPz6lkTBe+VEK0VsSwe1mSvcUdgrlM/Tub/dRJED2T/u/eX6IYqWcZzgOvJR43XXkEvTbceVBVnSyYeRws/hxHhaGvOzY+Kvjokc5UzbWm8UTmA0hrmEg3IApaWQOBuUg4vr38od82Cfjln4/vHd0N76MINAJkOMHF8ck1dC">
<div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">h1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>VuePress Theme Hope&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">h1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">p</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">span</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"very"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>非常&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">span</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>强大!&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">p</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">document</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">querySelector</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"#very"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">addEventListener</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"click"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, () </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">=></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  alert</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"非常强大"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">});</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-highlighter="shiki" data-ext="css" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">span</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  color: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">red</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeDemo>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/demo.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="样式化" tabindex="-1"><a class="header-anchor" href="#样式化"><span>样式化</span></a></h4>
<p>向 Mr.Hope 捐赠一杯咖啡。 <Badge type="tip">Recommanded</Badge></p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/stylize.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="交互演示" tabindex="-1"><a class="header-anchor" href="#交互演示"><span>交互演示</span></a></h4>
<Playground title="TS%20%E6%A1%88%E4%BE%8B" link="https%3A%2F%2Fwww.typescriptlang.org%2Fplay%23code%2FMYewdgzgLgBAthA5jAvDARACwKYBtcgwDuIATrgCboDcAULaJLBAA7YCGA1qjABQKIAXDGikAlmEQBKVAD4YjCCFzYAdAUT8kUurVYdOW6XSA">
</Playground>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/playground.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="vue-交互演示" tabindex="-1"><a class="header-anchor" href="#vue-交互演示"><span>Vue 交互演示</span></a></h4>
<p>::: vue-playground Vue 交互演示</p>
<template>
<div class="language-vue line-numbers-mode" data-highlighter="shiki" data-ext="vue" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> setup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">ref</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "vue"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> msg</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> ref</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"Hello World!"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">h1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>{{ msg }}&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">h1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">input</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> v-model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"msg"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/vue-playground.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
<h4 id="幻灯片" tabindex="-1"><a class="header-anchor" href="#幻灯片"><span>幻灯片</span></a></h4>
<p>@slidestart</p>
<h2 id="幻灯片-1" tabindex="-1"><a class="header-anchor" href="#幻灯片-1"><span>幻灯片 1</span></a></h2>
<p>一个有文字和 <a href="https://mrhope.site" target="_blank" rel="noopener noreferrer">链接</a> 的段落</p>
<hr>
<h2 id="幻灯片-2" tabindex="-1"><a class="header-anchor" href="#幻灯片-2"><span>幻灯片 2</span></a></h2>
<ul>
<li>项目 1</li>
<li>项目 2</li>
</ul>
<hr>
<h2 id="幻灯片-3-1" tabindex="-1"><a class="header-anchor" href="#幻灯片-3-1"><span>幻灯片 3.1</span></a></h2>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> a</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>--</p>
<h2 id="幻灯片-3-2" tabindex="-1"><a class="header-anchor" href="#幻灯片-3-2"><span>幻灯片 3.2</span></a></h2>
<p>$$<br>
J(\theta_0,\theta_1) = \sum_{i=0}<br>
$$</p>
<p>@slideend</p>
<ul>
<li><a href="https://vuepress-theme-hope.github.io/v2/zh/guide/markdown/presentation.html" target="_blank" rel="noopener noreferrer">查看详情</a></li>
</ul>
</template>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="footnote1" class="footnote-item"><p>这是脚注内容 <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
</div></template>


