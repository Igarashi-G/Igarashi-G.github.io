<template><div><h1 id="yum-包管理" tabindex="-1"><a class="header-anchor" href="#yum-包管理" aria-hidden="true">#</a> yum 包管理</h1>
<p>是 CentOS 和 RedHat 系统上用的 RPM 包管理工具</p>
<h2 id="更换-yum-源" tabindex="-1"><a class="header-anchor" href="#更换-yum-源" aria-hidden="true">#</a> 更换 yum 源</h2>
<p>更换 yum 源解决软件无法安装的问题：（真能解决大部分软件安装的问题，照着一下流程过一遍）</p>
<h3 id="_1-163yum-源" tabindex="-1"><a class="header-anchor" href="#_1-163yum-源" aria-hidden="true">#</a> 1.163yum 源：</h3>
<p>1.备份当前 yum 源防止出现意外还可以还原回来</p>
<pre><code>cd /etc/yum.repos.d/
cp CentOS-Base.repo CentOS-Base-repo.bak
</code></pre>
<p>2.使用 wget 下载 163yum 源 repo 文件</p>
<pre><code>wget http://mirrors.163.com/.help/CentOS7-Base-163.repo

若提示没有wget，需要执行 yum -y install wget 命令安装即可
</code></pre>
<p>3.清理旧包</p>
<pre><code>yum clean all
</code></pre>
<p>4.把下载下来 163repo 文件设置成为默认源</p>
<pre><code>mv CentOS7-Base-163.repo CentOS-Base.repo   # 确认覆盖即可
</code></pre>
<p>5.生成 163yum 源缓存并更新 yum 源</p>
<pre><code>yum makecache
yum -y upgrade
# yum update  慎用该命令，会更新内核
</code></pre>
<h3 id="_2-阿里云-yum-源" tabindex="-1"><a class="header-anchor" href="#_2-阿里云-yum-源" aria-hidden="true">#</a> 2.阿里云 yum 源：</h3>
<p>1.备份当前 yum 源防止出现意外还可以还原回来</p>
<pre><code>cd /etc/yum.repos.d/
cp ./CentOS-Base.repo ./CentOS-Base-repo.bak
</code></pre>
<p>2.使用 wget 下载阿里 yum 源 repo 文件</p>
<pre><code>wget http://mirrors.aliyun.com/repo/Centos-7.repo
</code></pre>
<p>3.清理旧包</p>
<pre><code>yum clean all
</code></pre>
<p>4.把下载下来阿里云 repo 文件设置成为默认源</p>
<pre><code>mv Centos-7.repo CentOS-Base.repo
</code></pre>
<p>5.生成阿里云 yum 源缓存并更新 yum 源</p>
<pre><code>yum makecache
yum -y upgrade
# yum update  慎用该命令，会更新内核
</code></pre>
<h2 id="安装-epel-拓展软件源" tabindex="-1"><a class="header-anchor" href="#安装-epel-拓展软件源" aria-hidden="true">#</a> 安装 epel 拓展软件源</h2>
<p><a href="https://blog.csdn.net/heavyfish/article/details/82808970" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/heavyfish/article/details/82808970<ExternalLinkIcon/></a></p>
<h3 id="epel-是什么" tabindex="-1"><a class="header-anchor" href="#epel-是什么" aria-hidden="true">#</a> epel 是什么</h3>
<p>如果既想获得 RHEL 的高质量、高性能、高可靠性，又需要方便易用(关键是免费)的软件包更新功能，那么 Fedora Project 推出的 EPEL
(Extra Packages for Enterprise Linux)正好适合你。EPEL(<a href="http://fedoraproject.org/wiki/EPEL" target="_blank" rel="noopener noreferrer">http://fedoraproject.org/wiki/EPEL<ExternalLinkIcon/></a>) 是由 Fedora 社区打造，为 RHEL
及衍生发行版如 CentOS、Scientific Linux 等提供高质量软件包的项目。</p>
<pre><code>CentOS 用户可以直接通过 yum install epel-release 安装并启用 EPEL 源。
</code></pre>
<h2 id="linux-内核" tabindex="-1"><a class="header-anchor" href="#linux-内核" aria-hidden="true">#</a> Linux 内核</h2>
<p>Linux 内核版本分为主线、稳定和长期版本</p>
<ul>
<li>主线版本代表整个 Linux 内核的一个树干，新的主线版本每 2-3 个月发布一次</li>
<li>稳定内核则是在主线版本中，被认为是 &quot;稳定的&quot; 得出。是根据需要发布的，通常是每 3 个月。</li>
<li>而对于长期内核版本，通常提供几个 &quot;长期维护&quot; 内核版本，用于较早的内核树错误修复返回的目的。这些内核只应用重要的错误修复，
通常不会有非常频繁的更新</li>
</ul>
<h3 id="_1-centos-内核" tabindex="-1"><a class="header-anchor" href="#_1-centos-内核" aria-hidden="true">#</a> 1.CentOS 内核：</h3>
<ul>
<li>
<p>对于 CentOS/RHEL 系统，尽量使用 yum 方式或 RPM 包安装 / 升级内核，需要注意的是红帽的 Red Hat Linux 服务需要订阅。</p>
</li>
<li>
<p>使用安装新内核而不是直接升级内核，安装新内核不会覆盖旧内核，而升级会导致新内核直接替换旧内核，可能会导致系统无法启动，安装也可以
让我们在升级后有回滚的选择。</p>
</li>
</ul>
<h4 id="查看当前操作系统版本" tabindex="-1"><a class="header-anchor" href="#查看当前操作系统版本" aria-hidden="true">#</a> 查看当前操作系统版本：</h4>
<pre><code>cat /etc/redhat-release
CentOS Linux release 7.8.2003 (Core)
</code></pre>
<h4 id="查看当前内核" tabindex="-1"><a class="header-anchor" href="#查看当前内核" aria-hidden="true">#</a> 查看当前内核</h4>
<pre><code>uname -r / uname -a
Linux node105 3.10.0-1127.8.2.el7.x86_64 #1 SMP Tue May 12 16:57:42 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
</code></pre>
<h4 id="查看可升级的内核版本" tabindex="-1"><a class="header-anchor" href="#查看可升级的内核版本" aria-hidden="true">#</a> 查看可升级的内核版本</h4>
<pre><code>yum list kernel --showduplicates
</code></pre>
<h4 id="rpm-查看具体安装内核文件" tabindex="-1"><a class="header-anchor" href="#rpm-查看具体安装内核文件" aria-hidden="true">#</a> rpm 查看具体安装内核文件</h4>
<pre><code>rpm -qa | grep kernel                           # 查看kernel 相关的安装包
rpm -ql kernel-3.10.0-957.el7.x86_64            # 查看安装包的具体路径
</code></pre>
<h3 id="_2-yum-升级软件和内核" tabindex="-1"><a class="header-anchor" href="#_2-yum-升级软件和内核" aria-hidden="true">#</a> 2.yum 升级软件和内核：</h3>
<ul>
<li>kernel Linux 内核软件包，包含单、多核和多处理器系统的内核，是任何 Linux 操作系统的核心，单处理器的系统仅需安装内核包。</li>
</ul>
<p>Linux 升级命令有两个分别是 yum upgrade 和 yum update, 这个两个命令是有区别的:</p>
<ul>
<li>yum -y update：升级所有包同时也升级软件和系统内核
<ul>
<li>升级前：内核版本 3.10.0-957.el7.x86_64</li>
<li>升级后：内核版本 3.10.0-1127.8.2.el7.x86_64</li>
</ul>
</li>
<li>yum -y upgrade：只升级所有包，不升级软件和系统内核</li>
</ul>
<p>【注意】：最好别执行 yum -y update</p>
<h3 id="_3-在-centos-上降级内核" tabindex="-1"><a class="header-anchor" href="#_3-在-centos-上降级内核" aria-hidden="true">#</a> 3.在 CentOS 上降级内核：</h3>
<ul>
<li>
<p>首先先找到目标内核的 rpm 源：</p>
<pre><code>  wget http://vault.centos.org/7.7.1908/os/Source/SPackages/kernel-3.10.0-957.el7.src.rpm
</code></pre>
</li>
<li>
<p>删除之前的内核版本，若有依赖，则一个个删相关依赖
rpm -ev kernel-3.10.0-1127.8.2.el7.x86_64</p>
<pre><code>  删依赖：rpm -ev kmod-kvdo-6.1.3.7-5.el7.x86_64
</code></pre>
</li>
<li>
<p>安装该 rpm 源：</p>
<pre><code>  rpm -ivh kernel-3.10.0-957.el7.src.rpm
</code></pre>
</li>
<li>
<p>禁止 yum 自动升级 kernel</p>
<pre><code>  vim /etc/yum.conf
  exclude=kernel*
</code></pre>
</li>
</ul>
<h3 id="_4-在-centos-上降级发行版本" tabindex="-1"><a class="header-anchor" href="#_4-在-centos-上降级发行版本" aria-hidden="true">#</a> 4.在 CentOS 上降级发行版本：</h3>
<ul>
<li>
<p>首先下载目标发行版本的 rpm 源：</p>
<pre><code>  wget http://vault.centos.org/7.7.1908/os/Source/SPackages/centos-release-7-7.1908.0.el7.centos.src.rpm
</code></pre>
</li>
<li>
<p>安装该发行版本 rpm 源：
rpm -ivh centos-release-7-7.1908.0.el7.centos.src.rpm --force</p>
</li>
<li>
<p>查看当前系统的发行版本：</p>
<pre><code>  rpm -qa|grep -i centos-release-7-

  可出现两个发行版本
  centos-release-7-6.1810.2.el7.centos.x86_64
</code></pre>
</li>
</ul>
<p>注：</p>
<ul>
<li>
<p>直接执行以下命令 安装 C7.6 版本的，对应</p>
<pre><code>  yum --disablerepo='*' --enablerepo='C7.6*' upgrade
</code></pre>
<p>经验证，还是没啥用</p>
</li>
<li>
<p>最后解决办法，重装</p>
</li>
</ul>
</div></template>


