<template><div><h1 id="pip-包管理器" tabindex="-1"><a class="header-anchor" href="#pip-包管理器" aria-hidden="true">#</a> pip（包管理器）</h1>
<h2 id="_1-使用基础" tabindex="-1"><a class="header-anchor" href="#_1-使用基础" aria-hidden="true">#</a> 1. 使用基础</h2>
<h3 id="_1-1-换源" tabindex="-1"><a class="header-anchor" href="#_1-1-换源" aria-hidden="true">#</a> 1.1 换源</h3>
<h5 id="pypi-国内源路径" tabindex="-1"><a class="header-anchor" href="#pypi-国内源路径" aria-hidden="true">#</a> PYPI 国内源路径</h5>
<ul>
<li>阿里云 <a href="http://mirrors.aliyun.com/pypi/simple/" target="_blank" rel="noopener noreferrer">http://mirrors.aliyun.com/pypi/simple/<ExternalLinkIcon/></a></li>
<li>豆瓣 <a href="http://pypi.douban.com/simple/" target="_blank" rel="noopener noreferrer">http://pypi.douban.com/simple/<ExternalLinkIcon/></a></li>
<li>清华大学 <a href="https://pypi.tuna.tsinghua.edu.cn/simple/" target="_blank" rel="noopener noreferrer">https://pypi.tuna.tsinghua.edu.cn/simple/<ExternalLinkIcon/></a></li>
<li>中国科学技术大学 <a href="http://pypi.mirrors.ustc.edu.cn/simple/" target="_blank" rel="noopener noreferrer">http://pypi.mirrors.ustc.edu.cn/simple/<ExternalLinkIcon/></a></li>
</ul>
<p>通常有 <strong>两种</strong> 换源方式</p>
<ol>
<li>
<p><strong>临时换源</strong></p>
<p>在 <strong>pip</strong> 安装包时，加 <code v-pre>-i</code> 参数，追加三方源的 <code v-pre>url</code> ，如利用豆瓣源下载 <strong>Django</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip <span class="token function">install</span> django <span class="token parameter variable">-i</span> http://pypi.douban.com/simple
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显然不是一个一劳永逸的方法，仅下载少量包的场景适用</p>
</li>
<li>
<p><strong>永久换源</strong></p>
<Tabs :data='[{"title":"Linux","value":"Linux"},{"title":"Windows","value":"Windows"},{"title":"全局命令","value":"全局命令"}]' tab-id="方式">
<template #tab0="{ title, value, isActive }">
<ol>
<li>
<p>在根目录下创建/修改 <code v-pre>～/.pip/pip.conf</code> <strong>pip</strong> 配置文件</p>
</li>
<li>
<p>进入文件新增/修改内容</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">global</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">index-url</span><span class="token punctuation">=</span><span class="token value attr-value">http://pypi.douban.com/simple</span>
<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">trusted-host</span><span class="token punctuation">=</span><span class="token value attr-value">pypi.douban.com</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>保存文件并退出</p>
</li>
</ol>
</template>
<template #tab1="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 在类似 路径</span>
C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>Fuuka<span class="token punctuation">\</span>AppData<span class="token punctuation">\</span>Roaming<span class="token punctuation">\</span>pip
<span class="token comment"># 修改配置</span>
%HOMEPATH%<span class="token punctuation">\</span>pip<span class="token punctuation">\</span>pip.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 清华源</span>
pip config <span class="token builtin class-name">set</span> global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

<span class="token comment"># 阿里源</span>
pip config <span class="token builtin class-name">set</span> global.index-url https://mirrors.aliyun.com/pypi/simple/

<span class="token comment"># 腾讯源</span>
pip config <span class="token builtin class-name">set</span> global.index-url http://mirrors.cloud.tencent.com/pypi/simple

<span class="token comment"># 豆瓣源</span>
pip config <span class="token builtin class-name">set</span> global.index-url http://pypi.douban.com/simple/

<span class="token comment"># 换回默认源</span>
pip config <span class="token builtin class-name">unset</span> global.index-url
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
</li>
</ol>
<h3 id="_1-2-下载-wheel" tabindex="-1"><a class="header-anchor" href="#_1-2-下载-wheel" aria-hidden="true">#</a> 1.2 下载 wheel</h3>
<CodeTabs :data='[{"title":"windows","value":"widows"},{"title":"linux","value":"linux"},{"title":"download","value":"download"}]' tab-id="wheel">

<template #tab0="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip download <span class="token parameter variable">-d</span> D:<span class="token punctuation">\</span>Program<span class="token punctuation">\</span> grpcio grpc-tools protobuf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip3 download <span class="token parameter variable">-d</span> ./ grpcio grpc-tools protobuf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab2="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 如：手动去网址下载</span>
<span class="token comment"># https://pypi.tuna.tsinghua.edu.cn/simple/grpcio/</span>
<span class="token comment"># https://pypi.tuna.tsinghua.edu.cn/simple/grpcio-tools/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div></template>


