<template><div><p>Python 的包管理器</p>
<!-- more -->
<h1 id="pip-包管理器" tabindex="-1"><a class="header-anchor" href="#pip-包管理器"><span>pip（包管理器）</span></a></h1>
<h2 id="_1-使用基础" tabindex="-1"><a class="header-anchor" href="#_1-使用基础"><span>1. 使用基础</span></a></h2>
<h3 id="_1-1-换源" tabindex="-1"><a class="header-anchor" href="#_1-1-换源"><span>1.1 换源</span></a></h3>
<h5 id="pypi-国内源路径" tabindex="-1"><a class="header-anchor" href="#pypi-国内源路径"><span>PYPI 国内源路径</span></a></h5>
<ul>
<li>阿里云 <a href="http://mirrors.aliyun.com/pypi/simple/" target="_blank" rel="noopener noreferrer">http://mirrors.aliyun.com/pypi/simple/</a></li>
<li>豆瓣 <a href="http://pypi.douban.com/simple/" target="_blank" rel="noopener noreferrer">http://pypi.douban.com/simple/</a></li>
<li>清华大学 <a href="https://pypi.tuna.tsinghua.edu.cn/simple/" target="_blank" rel="noopener noreferrer">https://pypi.tuna.tsinghua.edu.cn/simple/</a></li>
<li>中国科学技术大学 <a href="http://pypi.mirrors.ustc.edu.cn/simple/" target="_blank" rel="noopener noreferrer">http://pypi.mirrors.ustc.edu.cn/simple/</a></li>
</ul>
<p>通常有 <strong>两种</strong> 换源方式</p>
<ol>
<li>
<p><strong>临时换源</strong></p>
<p>在 <strong>pip</strong> 安装包时，加 <code v-pre>-i</code> 参数，追加三方源的 <code v-pre>url</code> ，如利用豆瓣源下载 <strong>Django</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> django</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://pypi.douban.com/simple</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>显然不是一个一劳永逸的方法，仅下载少量包的场景适用</p>
</li>
<li>
<p><strong>永久换源</strong></p>
<Tabs id="58" :data='[{"id":"Linux"},{"id":"Windows"},{"id":"全局命令"}]' tab-id="方式">
<template #title0="{ value, isActive }">Linux</template>
<template #title1="{ value, isActive }">Windows</template>
<template #title2="{ value, isActive }">全局命令</template>
<template #tab0="{ value, isActive }">
<ol>
<li>
<p>在根目录下创建/修改 <code v-pre>～/.pip/pip.conf</code> <strong>pip</strong> 配置文件</p>
</li>
<li>
<p>进入文件新增/修改内容</p>
<div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">[global]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">index-url</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">http://pypi.douban.com/simple</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">[install]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">trusted-host</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">pypi.douban.com</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>保存文件并退出</p>
</li>
</ol>
</template>
<template #tab1="{ value, isActive }">
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 在类似 路径</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">C:\Users\Fuuka\AppData\Roaming\pip</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 修改配置</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">%HOMEPATH%\pip\pip.ini</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 清华源</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> global.index-url</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://pypi.tuna.tsinghua.edu.cn/simple</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 阿里源</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> global.index-url</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://mirrors.aliyun.com/pypi/simple/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 腾讯源</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> global.index-url</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://mirrors.cloud.tencent.com/pypi/simple</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 豆瓣源</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> global.index-url</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> http://pypi.douban.com/simple/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 换回默认源</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> config</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> unset</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> global.index-url</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
</li>
</ol>
<h3 id="_1-2-下载-wheel" tabindex="-1"><a class="header-anchor" href="#_1-2-下载-wheel"><span>1.2 下载 wheel</span></a></h3>
<CodeTabs id="91" :data='[{"id":"widows"},{"id":"linux"},{"id":"download"}]' tab-id="wheel">
<template #title0="{ value, isActive }">windows</template>
<template #title1="{ value, isActive }">linux</template>
<template #title2="{ value, isActive }">download</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> download</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> D:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\P</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">rogram</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">grpcio</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> grpc-tools</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> protobuf</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pip3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> download</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> grpcio</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> grpc-tools</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> protobuf</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 如：手动去网址下载</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># https://pypi.tuna.tsinghua.edu.cn/simple/grpcio/</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># https://pypi.tuna.tsinghua.edu.cn/simple/grpcio-tools/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div></template>


