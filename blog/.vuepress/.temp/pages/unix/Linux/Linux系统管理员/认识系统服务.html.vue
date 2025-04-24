<template><div><h1 id="认识系统服务-daemon" tabindex="-1"><a class="header-anchor" href="#认识系统服务-daemon"><span>认识系统服务（daemon）</span></a></h1>
<h3 id="_1-daemon-与服务-service" tabindex="-1"><a class="header-anchor" href="#_1-daemon-与服务-service"><span>1. daemon 与服务（service）</span></a></h3>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看各项服务启动时间</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemd-analyze</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> blame</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 输出到 boot.svg 然后通过浏览器查看，服务启动顺序</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemd-analyze</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> plot</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> > </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">boot.svg</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


