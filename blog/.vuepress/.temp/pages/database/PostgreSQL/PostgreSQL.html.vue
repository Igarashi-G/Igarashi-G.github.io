<template><div><h1 id="postgresql" tabindex="-1"><a class="header-anchor" href="#postgresql"><span>PostgreSQL</span></a></h1>
<p><a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">官网</a> | <a href="https://www.postgresql.org/docs/current/index.html" target="_blank" rel="noopener noreferrer">文档</a></p>
<h2 id="_1-postgresql-数据库" tabindex="-1"><a class="header-anchor" href="#_1-postgresql-数据库"><span>1. PostgreSQL 数据库</span></a></h2>
<p><strong>86</strong> 年诞生的，<strong>开源</strong>、<strong>对象关系型</strong> 数据库，采用 <strong>客户端/服务器</strong> 模型</p>
<ul>
<li><code v-pre>postgres</code>： 服务器进程，管理数据库</li>
<li><code v-pre>Navicat</code>：等连接服务器的，客户端工具</li>
</ul>
<h3 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装"><span>1. 安装</span></a></h3>
<p><a href="https://www.postgresql.org/download/" target="_blank" rel="noopener noreferrer">下载</a></p>
<Tabs id="30" :data='[{"id":"CentOS"},{"id":"Ubuntu"},{"id":"Windows"}]'>
<template #title0="{ value, isActive }">CentOS</template>
<template #title1="{ value, isActive }">Ubuntu</template>
<template #title2="{ value, isActive }">Windows</template>
<template #tab0="{ value, isActive }">
<p><code v-pre>yum</code> 软件包安装</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> postgresql-server</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>
<p>初始化数据库</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">postgresql-setup</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> initdb</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## Initializing database ... OK</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>配置 <code v-pre>postgresql</code> 远程连接</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/lib/pgsql/data/postgresql.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 第59行取消注释，更改为：（vim 在VI的命令模式下显示所有行数 :set nu）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">listen_addresses</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '*'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 第396行，添加</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log_line_prefix</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '%t %u %d '</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>启动、开机启动</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> start</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> postgresql</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> postgresql</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>防火墙设置</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">firewall-cmd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --add-service=postgresql</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --permanent</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">firewall-cmd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --reload</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>开启 <strong>CLI</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -i</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -u</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> postgres</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</template>
<template #tab1="{ value, isActive }">
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> update</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> apt-get</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> postgresql</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<ul>
<li>
<p>下载 <code v-pre>.exe</code> 软件安装</p>
</li>
<li>
<p>安装时会提示设置 <strong>superuser</strong>、端口号等</p>
</li>
<li>
<p>安装后，添加环境变量</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 该目录下工具等同于CLI</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">'C:\Program Files\PostgreSQL\14\bin'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</template>
</Tabs>
<h3 id="_2-操作" tabindex="-1"><a class="header-anchor" href="#_2-操作"><span>2. 操作</span></a></h3>
<p><a href="https://www.runoob.com/postgresql/postgresql-create-database.html" target="_blank" rel="noopener noreferrer">菜鸟教程</a></p>
</div></template>


