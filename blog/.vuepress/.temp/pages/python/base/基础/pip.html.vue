<template><div><h1 id="pip-包管理器" tabindex="-1"><a class="header-anchor" href="#pip-包管理器" aria-hidden="true">#</a> pip（包管理器）</h1>
<h2 id="_1-使用基础" tabindex="-1"><a class="header-anchor" href="#_1-使用基础" aria-hidden="true">#</a> 1. 使用基础</h2>
<h3 id="_1-1-换源" tabindex="-1"><a class="header-anchor" href="#_1-1-换源" aria-hidden="true">#</a> 1.1 换源</h3>
<h5 id="pypi-国内源路径" tabindex="-1"><a class="header-anchor" href="#pypi-国内源路径" aria-hidden="true">#</a> PYPI 国内源路径</h5>
<ul>
<li>阿里云 <a href="http://mirrors.aliyun.com/pypi/simple/" target="_blank" rel="noopener noreferrer">http://mirrors.aliyun.com/pypi/simple/<ExternalLinkIcon/></a></li>
<li>豆瓣(douban) <a href="http://pypi.douban.com/simple/" target="_blank" rel="noopener noreferrer">http://pypi.douban.com/simple/<ExternalLinkIcon/></a></li>
<li>清华大学 <a href="https://pypi.tuna.tsinghua.edu.cn/simple/" target="_blank" rel="noopener noreferrer">https://pypi.tuna.tsinghua.edu.cn/simple/<ExternalLinkIcon/></a></li>
<li>中国科学技术大学 <a href="http://pypi.mirrors.ustc.edu.cn/simple/" target="_blank" rel="noopener noreferrer">http://pypi.mirrors.ustc.edu.cn/simple/<ExternalLinkIcon/></a></li>
</ul>
<p>通常有 <strong>两种</strong> 换源方式</p>
<ol>
<li>
<p><strong>临时换源:</strong> 只需要在 <strong>pip</strong> 安装包时，加 <code v-pre>-i</code> 参数，接源的 <code v-pre>url</code> ，如下载 <strong>Django</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip <span class="token function">install</span> django <span class="token parameter variable">-i</span> http://pypi.douban.com/simple
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>显然不是一个一劳永逸的方法，下少量包的场景适用</p>
</li>
<li>
<p><strong>永久换源</strong></p>
<p><strong>Linux</strong></p>
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
<p><strong>Windows</strong></p>
<ul>
<li>在 如：<code v-pre>C:\Users\Fuuka\AppData\Roaming\pip</code> 类似路径下，修改<code v-pre>%HOMEPATH%\pip\pip.ini</code> 的配置</li>
</ul>
<p><strong>通过命令修改</strong></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="_1-2-下载-wheel" tabindex="-1"><a class="header-anchor" href="#_1-2-下载-wheel" aria-hidden="true">#</a> 1.2 下载 wheel</h3>
<ul>
<li>
<p><strong>windows</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip download <span class="token parameter variable">-d</span> D:<span class="token punctuation">\</span>Program<span class="token punctuation">\</span> grpcio grpc-tools protobuf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>linux</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip3 download <span class="token parameter variable">-d</span> ./ grpcio grpc-tools protobuf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>线上 <strong>download</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 如：手动去网址下载</span>
<span class="token comment"># https://pypi.tuna.tsinghua.edu.cn/simple/grpcio/</span>
<span class="token comment"># https://pypi.tuna.tsinghua.edu.cn/simple/grpcio-tools/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


