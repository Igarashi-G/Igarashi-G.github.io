<template><div><h1 id="认识系统服务-daemon" tabindex="-1"><a class="header-anchor" href="#认识系统服务-daemon" aria-hidden="true">#</a> 认识系统服务（daemon）</h1>
<h3 id="_1-daemon-与服务-service" tabindex="-1"><a class="header-anchor" href="#_1-daemon-与服务-service" aria-hidden="true">#</a> 1. daemon 与服务（service）</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看各项服务启动时间</span>
systemd-analyze blame

<span class="token comment"># 输出到 boot.svg 然后通过浏览器查看，服务启动顺序</span>
systemd-analyze plot <span class="token operator">></span> boot.svg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


