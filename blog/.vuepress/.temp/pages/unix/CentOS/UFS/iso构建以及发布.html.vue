<template><div><p><strong>UFS</strong> 的 <strong>CentOS</strong> 镜像打包及发布流程</p>
<!-- more -->
<p><strong>Nginx</strong> 发布环境 <strong>172.16.120.41</strong>（<em>用于 <strong>iso</strong> 下载</em> ）位于 目录  <code v-pre>/mnt/docker-runtime/nginx/ufs-local/</code> 下</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /mnt/docker-runtime/nginx/ufs-local/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>iso</strong> 打包前，需要将最新的 <strong>rpm</strong> 包放入<code v-pre>/mnt/docker-runtime/nginx/ufs-local/build/latest</code> 目录中，<strong>iso</strong> 构建时会自动下载其内容</p>
<h2 id="_1-rpm打包" tabindex="-1"><a class="header-anchor" href="#_1-rpm打包"><span>1. RPM打包</span></a></h2>
<p><strong>rpm</strong> 、 <strong>ufs-*.rpm</strong> 、 <strong>wheel</strong> 等安装依赖，都位于 <strong>Nginx（<em>172.16.120.41</em>）</strong> 发布环境的 <code v-pre>/mnt/docker-runtime/nginx/ufs-local/build/</code> 目录下</p>
<h3 id="_1-1-管理平台-rpm-打包" tabindex="-1"><a class="header-anchor" href="#_1-1-管理平台-rpm-打包"><span>1.1 管理平台 RPM 打包</span></a></h3>
<p><strong>以 ufs-manager 为例：</strong> 当前 <strong>git</strong> 上提交的代码的 <strong>CICD</strong> 已失效，目前需手动自增版本号</p>
<ol>
<li>
<p>在 <strong>172.16.120.44</strong> 的 <code v-pre>/home/ufs-manager </code>下 <strong>pull</strong> 最新代码</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/ufs-manager/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>然后修改 <code v-pre>./rpm/uxs_mgr.spec</code> 下的版本号</p>
<blockquote>
<p>需参考 <code v-pre>/mnt/docker-runtime/nginx/ufs-local/build/latest</code> 目录下，上次打包的版本号，手动自增</p>
</blockquote>
</li>
<li>
<p>然后执行如下命令打包</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">bash</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> create-rpm-package.sh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 会输出到如下目录，如</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/rpm_release/ufs-manager/ufs-manager-4.1.1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ls</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ufs-manager-4.1.1-202303171635.el7.x86_64.rpm</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 远程拷贝到 41环境上，再去 44 环境上，进行后续的构建镜像</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">scp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/build/latest/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="_1-2-其他" tabindex="-1"><a class="header-anchor" href="#_1-2-其他"><span>1.2 其他</span></a></h3>
<p><strong>rpm：</strong> 需要下载之后拷贝到 <strong>172.16.120.41</strong> 目标文件夹下</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 安装下载工具</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum-utils</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 下载开发环境中使用的 rpm 包，以域相关的包示例</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">yumdownloader</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> realm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> oddjob-mkhomedir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> oddjob</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> samba-winbind-clients</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> samba-winbind</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> samba-common-tools</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> samba-winbind-krb5-locator</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> krb5-devel</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> krb5-workstation</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nss-pam-ldapd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pam_ldap</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> openldap-clients</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --destdir=./rpm</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 拷贝到 Nginx 打包的文件夹下</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">scp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./rpm/</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.rpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/build/extra/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>wheel：</strong> 需要下载 <strong>Linux 平台</strong> 对应的 <strong>wheel</strong> 文件</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 下载 wheels</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mkdir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./wheels</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> wheel</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -w</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> wheels</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./requirements.txt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 拷贝到 Nginx 打包的文件夹下</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> scp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./wheels/</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/build/wheel/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">重要</p>
<p>手动修改依赖项</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 再去 172.16.120.44 打包机器上修改配置文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/ufs-build/release/wheel/requirements.txt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 如，加入以下</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">+</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> async-lru==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1.0.3</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">+</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Jinja2==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3.1.2</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">+</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ldap3==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2.9.1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="_2-iso打包" tabindex="-1"><a class="header-anchor" href="#_2-iso打包"><span>2. iso打包</span></a></h2>
<p>打包环境：<strong>iso_build_44</strong>（<em>172.16.120.44</em> ）, <strong>ufs</strong> 打包目录位于 <code v-pre>/home/ufs-build</code> 目录下, 执行时需要 <strong>传入指定版本号</strong></p>
<ul>
<li>打包时需要全量挂载 <strong>iso</strong> 到 <code v-pre>/media/cdrom</code> 目录下</li>
<li>然后执行 <code v-pre>./build.sh -v x.y.z</code> 开始打包</li>
<li>打包后的文件会输出到 <code v-pre>/release</code> 目录下</li>
</ul>
<p>以 打镜像 <strong>v4.1.1</strong> 为例</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/ufs-build</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 构建镜像 v4.1.1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">bash</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./build.sh</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -v</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 4.1.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看打包后的镜像</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ls</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /release/4.1.1</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># md5sum.txt  sha256sum.txt  ufs_centos7.9_x86_64_4.1.1-202303201458.iso  ufs_centos7.9_x86_64_4.1.1-202303201458.upgrade.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /release/4.1.1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 需要拷贝到上文 Nginx 环境中发布</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">scp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/release/ufs/v4.1.1/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 172.16.128.99上虚拟机测试</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">scp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./ufs_centos7.9_x86_64_4.1.1-202303201458.iso</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.128.99:/vmfs/volumes/628d8920-834315d0-6c3f-a4dcbef9446e/iso/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建时会下载指定的内容，通过定义的 <strong>host</strong> 解析，更换环境时修改构建机器的 <strong>hosts</strong> 即可</p>
<blockquote>
<p>发布时需将输出的 <strong>iso</strong> 以及相应的 <strong>checksum</strong> 上传到 <code v-pre> 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/release</code> 的指定目录中</p>
</blockquote>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 将 windows 文件格式递归转换为 unix 格式</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">find</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> .</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> f</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -exec</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dos2unix</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {}</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


