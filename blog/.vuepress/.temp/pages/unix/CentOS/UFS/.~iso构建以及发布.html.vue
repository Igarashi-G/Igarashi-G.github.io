<template><div><p><strong>UFS</strong> 的 <strong>CentOS</strong> 镜像打包及发布流程</p>
<!-- more -->
<p><strong>Nginx</strong> 发布环境 <strong>172.16.120.41</strong>（<em>用于 <strong>iso</strong> 下载</em> ）位于 目录  <code v-pre>/mnt/docker-runtime/nginx/ufs-local/</code> 下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /mnt/docker-runtime/nginx/ufs-local/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>iso</strong> 打包前，需要将最新的 <strong>rpm</strong> 包放入<code v-pre>/mnt/docker-runtime/nginx/ufs-local/build/latest</code> 目录中，<strong>iso</strong> 构建时会自动下载其内容</p>
<h2 id="_1-rpm打包" tabindex="-1"><a class="header-anchor" href="#_1-rpm打包" aria-hidden="true">#</a> 1. RPM打包</h2>
<p><strong>rpm</strong> 、 <strong>ufs-*.rpm</strong> 、 <strong>wheel</strong> 等安装依赖，都位于 <strong>Nginx（<em>172.16.120.41</em>）</strong> 发布环境的 <code v-pre>/mnt/docker-runtime/nginx/ufs-local/build/</code> 目录下</p>
<h3 id="_1-1-管理平台-rpm-打包" tabindex="-1"><a class="header-anchor" href="#_1-1-管理平台-rpm-打包" aria-hidden="true">#</a> 1.1 管理平台 RPM 打包</h3>
<p><strong>以 ufs-manager 为例：</strong> 当前 <strong>git</strong> 上提交的代码的 <strong>CICD</strong> 已失效，目前需手动自增版本号</p>
<ol>
<li>
<p>在 <strong>172.16.120.44</strong> 的 <code v-pre>/home/ufs-manager </code>下 <strong>pull</strong> 最新代码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /home/ufs-manager/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>然后修改 <code v-pre>./rpm/uxs_mgr.spec</code> 下的版本号</p>
<blockquote>
<p>需参考 <code v-pre>/mnt/docker-runtime/nginx/ufs-local/build/latest</code> 目录下，上次打包的版本号，手动自增</p>
</blockquote>
</li>
<li>
<p>然后执行如下命令打包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">bash</span> create-rpm-package.sh

<span class="token comment"># 会输出到如下目录，如</span>
<span class="token builtin class-name">cd</span> /home/rpm_release/ufs-manager/ufs-manager-4.1.1
<span class="token function">ls</span>	
<span class="token comment"># ufs-manager-4.1.1-202303171635.el7.x86_64.rpm</span>

<span class="token comment"># 远程拷贝到 41环境上，再去 44 环境上，进行后续的构建镜像</span>
<span class="token function">scp</span> ./* <span class="token number">172.16</span>.120.41:/mnt/docker-runtime/nginx/ufs-local/build/latest/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="_1-2-其他" tabindex="-1"><a class="header-anchor" href="#_1-2-其他" aria-hidden="true">#</a> 1.2 其他</h4>
<p><strong>rpm：</strong> 需要下载之后拷贝到 <strong>172.16.120.41</strong> 目标文件夹下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装下载工具</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils

<span class="token comment"># 下载开发环境中使用的 rpm 包，以域相关的包示例</span>
yumdownloader realm oddjob-mkhomedir oddjob samba-winbind-clients samba-winbind samba-common-tools samba-winbind-krb5-locator krb5-devel krb5-workstation nss-pam-ldapd pam_ldap openldap-clients <span class="token parameter variable">--destdir</span><span class="token operator">=</span>./rpm

<span class="token comment"># 拷贝到 Nginx 打包的文件夹下</span>
<span class="token function">scp</span> ./rpm/*.rpm <span class="token number">172.16</span>.120.41:/mnt/docker-runtime/nginx/ufs-local/build/extra/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>wheel：</strong> 需要下载 <strong>Linux 平台</strong> 对应的 <strong>wheel</strong> 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下载 wheels</span>
<span class="token function">mkdir</span> ./wheels
$ pip wheel <span class="token parameter variable">-w</span> wheels <span class="token parameter variable">-r</span> ./requirements.txt

<span class="token comment"># 拷贝到 Nginx 打包的文件夹下</span>
$ <span class="token function">scp</span> ./wheels/* <span class="token number">172.16</span>.120.41:/mnt/docker-runtime/nginx/ufs-local/build/wheel/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重要" tabindex="-1"><a class="header-anchor" href="#重要" aria-hidden="true">#</a> 重要！！</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 再去 172.16.120.44 打包机器上修改配置文件</span>
$ <span class="token function">vim</span> /home/ufs-build/release/wheel/requirements.txt

<span class="token comment"># 如，加入以下</span>
+ async-lru<span class="token operator">==</span><span class="token number">1.0</span>.3
+ <span class="token assign-left variable">Jinja2</span><span class="token operator">==</span><span class="token number">3.1</span>.2
+ <span class="token assign-left variable">ldap3</span><span class="token operator">==</span><span class="token number">2.9</span>.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-iso打包" tabindex="-1"><a class="header-anchor" href="#_2-iso打包" aria-hidden="true">#</a> 2. iso打包</h2>
<p>打包环境：<strong>iso_build_44</strong>（<em>172.16.120.44</em> ）, <strong>ufs</strong> 打包目录位于 <code v-pre>/home/ufs-build</code> 目录下, 执行时需要 <strong>传入指定版本号</strong></p>
<ul>
<li>打包时需要全量挂载 <strong>iso</strong> 到 <code v-pre>/media/cdrom</code> 目录下</li>
<li>然后执行 <code v-pre>./build.sh -v x.y.z</code> 开始打包</li>
<li>打包后的文件会输出到 <code v-pre>/release</code> 目录下</li>
</ul>
<p>以 打镜像 <code v-pre>v5.0.0-1</code> 为例</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /home/ufs-build

<span class="token comment"># 构建镜像 v5.0.0-1</span>
<span class="token function">bash</span> ./build.sh <span class="token parameter variable">-v</span> <span class="token number">5.0</span>.0-1

<span class="token comment"># 查看打包后的镜像</span>
<span class="token function">ls</span> /release/5.0.0-1
<span class="token builtin class-name">cd</span> /release/5.0.0-1

<span class="token comment"># 需要拷贝到上文 Nginx 环境中发布</span>
<span class="token function">scp</span> ./UFS-v5.0.0-1-CentOS7.9-x86_64.upgrade.tar.gz <span class="token number">172.16</span>.120.41:/mnt/docker-runtime/nginx/ufs-local/release/ufs/v5.0.0/

<span class="token function">scp</span> ./UFS-v5.0.0-1-CentOS7.9-x86_64.iso <span class="token number">172.16</span>.120.41:/mnt/docker-runtime/nginx/ufs-local/release/ufs/v5.0.0/

<span class="token comment"># 172.16.128.99上虚拟机测试</span>
<span class="token function">scp</span> ./UFS-v5.0.0-1-CentOS7.9-x86_64.iso <span class="token number">172.16</span>.128.99:/vmfs/volumes/628d8920-834315d0-6c3f-a4dcbef9446e/iso/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建时会下载指定的内容，通过定义的 <strong>host</strong> 解析，更换环境时修改构建机器的 <strong>hosts</strong> 即可</p>
<blockquote>
<p>发布时需将输出的 <strong>iso</strong> 以及相应的 <strong>checksum</strong> 上传到 <code v-pre> 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/release</code> 的指定目录中</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 将 windows 文件格式递归转换为 unix 格式</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-exec</span> dos2unix <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


