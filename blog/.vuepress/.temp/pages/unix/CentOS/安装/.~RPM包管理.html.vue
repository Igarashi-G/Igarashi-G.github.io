<template><div><p><strong>CentOS</strong> 的包管理</p>
<!-- more -->
<h1 id="rpm-包管理" tabindex="-1"><a class="header-anchor" href="#rpm-包管理" aria-hidden="true">#</a> rpm 包管理</h1>
<h2 id="_1-rpm包" tabindex="-1"><a class="header-anchor" href="#_1-rpm包" aria-hidden="true">#</a> 1. rpm包</h2>
<p>**RedHat Package Manager: ** 与 <strong>Debian Linux</strong> 社区的 <strong>dpkg</strong> 不同，<strong>RPM</strong> 是红帽开发的，<strong>CentOS</strong>、<strong>Rdeora</strong>、<strong>SUSE</strong> 等开发商都用这个</p>
<div class="custom-container tip">
<p class="custom-container-title">特点</p>
<p>需要软件先编译，打包成 <strong>RPM</strong> 机制的文件，通过软件中默认数据库记录依赖</p>
</div>
<p>安装时，会</p>
<h2 id="_2-yum-管理工具" tabindex="-1"><a class="header-anchor" href="#_2-yum-管理工具" aria-hidden="true">#</a> 2. yum 管理工具</h2>
<p><strong>yum</strong> 是 <strong>CentOS</strong> 和 <strong>RedHat</strong> 系统上用的 <strong>RPM</strong> 包（<em>上层的</em> ）管理工具  ，要有 <strong>本地 yum 源</strong> 才可以使用</p>
<p>它的工作原理并不复杂，每一个 <strong>RPM</strong> 软件的头（<em>header</em>）里面都会纪录该软件的依赖关系，<strong>yum</strong> 通过分析，可自动解决依赖性</p>
<h3 id="_2-1-更换-yum-源" tabindex="-1"><a class="header-anchor" href="#_2-1-更换-yum-源" aria-hidden="true">#</a> 2.1 更换 yum 源</h3>
<div class="custom-container info">
<p class="custom-container-title">通常更换 yum 源来解决软件无法安装的问题</p>
</div>
<Tabs :data='[{"title":"阿里云"},{"title":"163源"}]'>
<template #tab0="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 备份当前 yum 源防止出现意外还可以还原回来</span>
<span class="token builtin class-name">cd</span> /etc/yum.repos.d/
<span class="token function">cp</span> ./CentOS-Base.repo ./CentOS-Base-repo.bak

<span class="token comment"># 使用 wget 下载阿里 yum 源 repo 文件</span>
<span class="token function">wget</span> http://mirrors.aliyun.com/repo/Centos-7.repo

<span class="token comment"># 清理旧包</span>
yum clean all

<span class="token comment"># 把下载下来阿里云 repo 文件设置成为默认源</span>
<span class="token function">mv</span> Centos-7.repo CentOS-Base.repo

<span class="token comment"># 生成阿里云 yum 源缓存并更新 yum 源</span>
yum makecache
yum <span class="token parameter variable">-y</span> upgrade
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 备份当前 yum 源防止出现意外还可以还原回来</span>
<span class="token builtin class-name">cd</span> /etc/yum.repos.d/
<span class="token function">cp</span> CentOS-Base.repo CentOS-Base-repo.bak

<span class="token comment"># 使用 wget 下载 163yum 源 repo 文件</span>
<span class="token function">wget</span> http://mirrors.163.com/.help/CentOS7-Base-163.repo

<span class="token comment"># 若提示没有 wget, 需要执行命令安装</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">wget</span> 

<span class="token comment"># 清理旧包</span>
yum clean all

<span class="token comment"># 把下载下来 163repo 文件设置成为默认源</span>
<span class="token function">mv</span> CentOS7-Base-163.repo CentOS-Base.repo

<span class="token comment"># 生成 163 的 yum 源缓存并更新 yum 源</span>
yum makecache
yum <span class="token parameter variable">-y</span> upgrade
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<div class="custom-container danger">
<p class="custom-container-title">慎用该命令，会更新内核</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<h3 id="_2-2-安装-epel-拓展软件源" tabindex="-1"><a class="header-anchor" href="#_2-2-安装-epel-拓展软件源" aria-hidden="true">#</a> 2.2 安装 epel 拓展软件源</h3>
<p><strong>epel：</strong> 如果既想获得 <strong>RHEL</strong> 的高质量、高性能、高可靠性，又需要方便易用（<em>关键是免费</em>）的软件包更新功能， <strong>Fedora Project</strong> 推出了 <a href="http://fedoraproject.org/wiki/EPEL" target="_blank" rel="noopener noreferrer">EPEL<ExternalLinkIcon/></a> （<em>Extra Packages for Enterprise Linux</em>）由 <strong>Fedora</strong> 社区打造，为 <strong>RHEL</strong>
及衍生发行版如: <strong>CentOS</strong>、<strong>Scientific Linux</strong> 等提供高质量软件包的项目</p>
<p><strong>CentOS</strong> 用户可以直接通过如下安装并启用 <strong>EPEL</strong> 源</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ yum <span class="token function">install</span> epel-release 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><a href="https://blog.csdn.net/heavyfish/article/details/82808970" target="_blank" rel="noopener noreferrer">参考<ExternalLinkIcon/></a></p>
<h2 id="_3-linux-内核" tabindex="-1"><a class="header-anchor" href="#_3-linux-内核" aria-hidden="true">#</a> 3. Linux 内核</h2>
<p><strong>Linux</strong> 内核版本分为主线、稳定和长期版本</p>
<ul>
<li>主线版本代表整个 <strong>Linux</strong> 内核的一个树干，新的主线版本每 <strong>2-3</strong> 个月发布一次</li>
<li>稳定内核则是在主线版本中，被认为是 &quot;稳定的&quot; 得出。是根据需要发布的，通常是每 <strong>3</strong> 个月。</li>
<li>而对于长期内核版本，通常提供几个 &quot;长期维护&quot; 内核版本，用于较早的内核树错误修复返回的目的。这些内核只应用重要的错误修复，通常不会有非常频繁的更新</li>
</ul>
<h3 id="_3-1-centos-内核" tabindex="-1"><a class="header-anchor" href="#_3-1-centos-内核" aria-hidden="true">#</a> 3.1 CentOS 内核</h3>
<ul>
<li>
<p>对于 <strong>CentOS/RHEL</strong> 系统，尽量使用 <strong>yum</strong> 方式或 <strong>RPM</strong> 包安装 / 升级内核，需要注意的是红帽的 <strong>Red Hat Linux</strong> 服务需要订阅</p>
</li>
<li>
<p>使用安装新内核而不是直接升级内核，安装新内核不会覆盖旧内核，而升级会导致新内核直接替换旧内核，可能会导致系统无法启动</p>
</li>
</ul>
<h4 id="查看当前操作系统版本" tabindex="-1"><a class="header-anchor" href="#查看当前操作系统版本" aria-hidden="true">#</a> 查看当前操作系统版本：</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">cat</span> /etc/redhat-release
CentOS Linux release <span class="token number">7.8</span>.2003 <span class="token punctuation">(</span>Core<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看当前内核" tabindex="-1"><a class="header-anchor" href="#查看当前内核" aria-hidden="true">#</a> 查看当前内核</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">uname</span> <span class="token parameter variable">-r</span> / <span class="token function">uname</span> <span class="token parameter variable">-a</span>
Linux node105 <span class="token number">3.10</span>.0-1127.8.2.el7.x86_64 <span class="token comment">#1 SMP Tue May 12 16:57:42 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看可升级的内核版本" tabindex="-1"><a class="header-anchor" href="#查看可升级的内核版本" aria-hidden="true">#</a> 查看可升级的内核版本</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum list kernel <span class="token parameter variable">--showduplicates</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="rpm-查看具体安装内核文件" tabindex="-1"><a class="header-anchor" href="#rpm-查看具体安装内核文件" aria-hidden="true">#</a> rpm 查看具体安装内核文件</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> kernel                           <span class="token comment"># 查看kernel 相关的安装包</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ql</span> kernel-3.10.0-957.el7.x86_64            <span class="token comment"># 查看安装包的具体路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-yum-升级软件和内核" tabindex="-1"><a class="header-anchor" href="#_3-2-yum-升级软件和内核" aria-hidden="true">#</a> 3.2 yum 升级软件和内核</h3>
<p><strong>kernel Linux：</strong> 内核软件包，包含单、多核和多处理器系统的内核，是任何 <strong>Linux</strong> 操作系统的核心，单处理器的系统仅需安装内核包</p>
<p><strong>Linux</strong> 升级命令有两个分别是 <code v-pre>yum upgrade</code> 和 <code v-pre>yum update</code>，区别如下</p>
<ul>
<li><code v-pre>yum -y update</code> 升级所有包同时也升级软件和系统内核
<ul>
<li>升级前：内核版本 <strong>3.10.0-957.el7.x86_64</strong></li>
<li>升级后：内核版本 <strong>3.10.0-1127.8.2.el7.x86_64</strong></li>
</ul>
</li>
<li><code v-pre>yum -y upgrade</code> 只升级所有包，不升级软件和系统内核</li>
</ul>
<div class="custom-container warning">
<p class="custom-container-title">最好别执行 yum -y update</p>
</div>
<h3 id="_3-3-在-centos-上降级内核" tabindex="-1"><a class="header-anchor" href="#_3-3-在-centos-上降级内核" aria-hidden="true">#</a> 3.3 在 CentOS 上降级内核</h3>
<ul>
<li>
<p>首先先找到目标内核的 <strong>rpm</strong> 源</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> http://vault.centos.org/7.7.1908/os/Source/SPackages/kernel-3.10.0-957.el7.src.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>删除之前的内核版本，若有依赖，则一个个删相关依赖</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-ev</span> kernel-3.10.0-1127.8.2.el7.x86_64

<span class="token comment"># 删依赖</span>
<span class="token function">rpm</span> <span class="token parameter variable">-ev</span> kmod-kvdo-6.1.3.7-5.el7.x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>安装该 <strong>rpm</strong> 源</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> kernel-3.10.0-957.el7.src.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>禁止 <strong>yum</strong> 自动升级 <strong>kernel</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/yum.conf
<span class="token assign-left variable">exclude</span><span class="token operator">=</span>kernel*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-4-在-centos-上降级发行版本" tabindex="-1"><a class="header-anchor" href="#_3-4-在-centos-上降级发行版本" aria-hidden="true">#</a> 3.4 在 CentOS 上降级发行版本</h3>
<ul>
<li>
<p>首先下载目标发行版本的 <strong>rpm</strong> 源</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> http://vault.centos.org/7.7.1908/os/Source/SPackages/centos-release-7-7.1908.0.el7.centos.src.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>安装该发行版本 <strong>rpm</strong> 源</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-ivh</span> centos-release-7-7.1908.0.el7.centos.src.rpm <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查看当前系统的发行版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rpm</span> -qa<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-i</span> centos-release-7-

<span class="token comment"># 可出现两个发行版本</span>
centos-release-7-6.1810.2.el7.centos.x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>直接执行以下命令 安装 <strong>C7.6</strong> 版本对应的</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">--disablerepo</span><span class="token operator">=</span><span class="token string">'*'</span> <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span><span class="token string">'C7.6*'</span> upgrade
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>解决不了，那就重装</p>
</li>
</ul>
</div></template>


