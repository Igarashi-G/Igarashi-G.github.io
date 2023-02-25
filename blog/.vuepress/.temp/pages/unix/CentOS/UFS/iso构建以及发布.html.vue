<template><div><p><strong>UFS</strong> 的 <strong>CentOS</strong> 镜像打包及发布流程</p>
<!-- more -->
<h1 id="软件发布" tabindex="-1"><a class="header-anchor" href="#软件发布" aria-hidden="true">#</a> 软件发布</h1>
<p><strong>Nginx</strong> 发布环境 <strong>172.16.120.41</strong>（<em>用于 <strong>iso</strong> 下载</em> ）位于 目录  <code v-pre>/mnt/docker-runtime/nginx/ufs-local/</code> 下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /mnt/docker-runtime/nginx/ufs-local/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>iso</strong> 打包前，需要将最新的 <strong>rpm</strong> 包放入<code v-pre>/mnt/docker-runtime/nginx/ufs-local/build/latest</code> 目录中，<strong>iso</strong> 构建时会自动下载其内容</p>
<h2 id="_1-rpm打包" tabindex="-1"><a class="header-anchor" href="#_1-rpm打包" aria-hidden="true">#</a> 1. RPM打包</h2>
<p><strong>rpm</strong> 、 <strong>uxs-rpm</strong> 、 <strong>wheel</strong> 等安装包都位于 <strong>Nginx</strong> 发布环境的 <code v-pre>/mnt/docker-runtime/nginx/ufs-local/build/</code> 目录下</p>
<h4 id="_1-1-管理平台-rpm-打包" tabindex="-1"><a class="header-anchor" href="#_1-1-管理平台-rpm-打包" aria-hidden="true">#</a> 1.1 管理平台 RPM 打包</h4>
<p><strong>以 uxs-mgr 为例：</strong> 当前 <strong>git</strong> 上提交的代码的 <strong>CICD</strong> 已失效，目前版本手动自增到 61</p>
<ol>
<li>
<p>先去<strong>172.16.120.44</strong> 的 <code v-pre>/home/zz/uxs-dashboard </code>下 <strong>pull</strong> 最新代码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /home/zz/uxs-dashboard/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>然后修改 <code v-pre>./rpm/uxs_mgr.spec</code> 下的版本号</p>
<blockquote>
<p>需参考 <code v-pre>/mnt/docker-runtime/nginx/ufs-local/build/latest</code> 目录下，上次打包的版本号，手动自增， <strong>ucfs</strong> 和 <strong>develop</strong> 分支版本号相同</p>
</blockquote>
</li>
<li>
<p>然后执行如下命令打包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">bash</span> create-rpm-package.sh

<span class="token comment"># 会输出到如下目录</span>
<span class="token builtin class-name">cd</span> /home/uxs_release/

<span class="token comment"># 需要拷贝到 41环境上，再去 44 环境上，进行后续的构建镜像</span>
<span class="token function">scp</span> ./* <span class="token number">172.16</span>.120.41:/mnt/docker-runtime/nginx/ufs-local/build/latest/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="_1-2-其他" tabindex="-1"><a class="header-anchor" href="#_1-2-其他" aria-hidden="true">#</a> 1.2 其他</h4>
<p><strong>rpm：</strong> 需要下载之后拷贝到 <strong>172.16.120.41</strong> 目标文件夹下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装下载工具</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils

<span class="token comment"># 下载开发环境中使用的 rpm 包，以域相关的包示例</span>
yumdownloader relam oddjob-mkhomedir oddjob samba-winbind-clients samba-winbind samba-common-tools samba-winbind-krb5-locator krb5-devel krb5-workstation nss-pam-ldapd pam_ldap openldap-clients <span class="token parameter variable">--destdir</span><span class="token operator">=</span>./rpm

<span class="token comment"># 拷贝到 Nginx 打包的文件夹下</span>
<span class="token function">scp</span> ./rpm/*.rpm <span class="token number">172.16</span>.120.41:/mnt/docker-runtime/nginx/ufs-local/build/extra/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>wheel：</strong> 需要下载 <strong>linux</strong> 平台对应的 <strong>wheel</strong> 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下载wheels</span>
<span class="token function">mkdir</span> ./wheels
$ pip wheel <span class="token parameter variable">-w</span> wheels <span class="token parameter variable">-r</span> ./requirements.txt

<span class="token comment"># 拷贝到 Nginx 打包的文件夹下</span>
$ <span class="token function">scp</span> ./wheels/* <span class="token number">172.16</span>.120.41:/mnt/docker-runtime/nginx/ufs-local/build/wheel/

<span class="token comment"># 再去 172.16.120.44 机器上修改配置文件</span>
$ <span class="token function">vim</span> /home/ucfs-build/release/wheelrequirements.txt
<span class="token comment"># 如，加入以下</span>
+ async-lru<span class="token operator">==</span><span class="token number">1.0</span>.3
+ <span class="token assign-left variable">Jinja2</span><span class="token operator">==</span><span class="token number">3.1</span>.2
+ <span class="token assign-left variable">ldap3</span><span class="token operator">==</span><span class="token number">2.9</span>.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 将 windows 文件格式递归转换为 unix 格式</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-exec</span> dos2unix <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


