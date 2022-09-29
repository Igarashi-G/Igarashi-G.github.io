<template><div><h1 id="python-打-rpm-包" tabindex="-1"><a class="header-anchor" href="#python-打-rpm-包" aria-hidden="true">#</a> python 打 rpm 包</h1>
<h2 id="_1-环境" tabindex="-1"><a class="header-anchor" href="#_1-环境" aria-hidden="true">#</a> 1. 环境</h2>
<p><code v-pre>rpm</code> 从 <code v-pre>4.5x</code> 以上的版本将 <strong>rpmbuild</strong> 默认工作路径移动到 <code v-pre>/root/rpmbuild</code> 目录</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$HOME/rpmbuild
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>推荐打包时尽量不用 <code v-pre>root</code> 账户操作（防止执行些不可挽回的命令）</p>
<p>环境：</p>
<ul>
<li><strong>CentOS Linux release 7.5.1804</strong> (<code v-pre>Core</code>)</li>
<li><strong>RPM</strong> <code v-pre>version 4.11.3</code></li>
</ul>
<p>如果想发布 <code v-pre>rpm</code> 格式的源码包或者是二进制包，就要使用 <code v-pre>rpm</code> 最新打包工具: <strong>rpmbuild</strong></p>
<h3 id="_1-1-安装工具" tabindex="-1"><a class="header-anchor" href="#_1-1-安装工具" aria-hidden="true">#</a> 1.1 安装工具</h3>
<ul>
<li>
<p>安装 <code v-pre>rpmbuild</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> rpm-build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>也可以安装 <code v-pre>rpmdevtools</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> rpmdevtools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>Python</code> 的编译打包工具是 <strong>setuptools</strong></p>
</li>
</ul>
<h3 id="_1-2-建立环境" tabindex="-1"><a class="header-anchor" href="#_1-2-建立环境" aria-hidden="true">#</a> 1.2 建立环境</h3>
<p>建立一个打包环境，也就是目录树的建立，一般是在 <code v-pre>~/rpmbuild</code> 目录下建立 <code v-pre>5</code> 个目录。分别是：（<em>不用自己创建，下文有命令</em>）</p>
<ul>
<li>
<p><code v-pre>BUILD</code>：目录用来存放打包过程中的源文件，就是来源于 <code v-pre>SOURCE</code></p>
</li>
<li>
<p><code v-pre>SOURCE</code> ：用来存放打包是要用到的源文件和 <code v-pre>patch</code>，主要是一些 <code v-pre>tar</code> 包</p>
</li>
<li>
<p><code v-pre>SPEC</code>：用来存放 <code v-pre>spec</code> 文件</p>
</li>
<li>
<p><code v-pre>SRPM</code>：存放打包生成的 <code v-pre>rpm</code> 格式的源文件</p>
</li>
<li>
<p><code v-pre>RPM</code>：二进制文件</p>
</li>
</ul>
<h2 id="_2-打包入门" tabindex="-1"><a class="header-anchor" href="#_2-打包入门" aria-hidden="true">#</a> 2. 打包入门</h2>
<h3 id="_2-1-spec-阶段与目录的对应关系" tabindex="-1"><a class="header-anchor" href="#_2-1-spec-阶段与目录的对应关系" aria-hidden="true">#</a> 2.1 SPEC 阶段与目录的对应关系</h3>
<p>阶段 读取的目录 写入的目录 具体动作</p>
<p>%prep %_sourcedir %_builddir 读取位于 %_sourcedir 目录的源代码和 patch 。之后，解压源代码至 %_builddir 的子目录并应用所有 patch。</p>
<p>%build %_builddir %_builddir 编译位于 %_builddir 构建目录下的文件。通过执行类似 ./configure &amp;&amp; make 的命令实现。</p>
<p>%install %_builddir %_buildrootdir 读取位于 %_builddir 构建目录下的文件并将其安装至 %_buildrootdir 目录。这些文件就是用户安装 RPM 后，最终得到的文件。注意一个奇怪的地方: 最终安装目录 不是 构建目录。通过执行类似 make install 的命令实现。</p>
<p>%check %_builddir %_builddir 检查软件是否正常运行。通过执行类似 make test 的命令实现。很多软件包都不需要此步。</p>
<p>bin %_buildrootdir %_rpmdir 读取位于 %_buildrootdir 最终安装目录下的文件，以便最终在 %_rpmdir 目录下创建 RPM 包。在该目录下，不同架构的 RPM 包会分别保存至不同子目录， noarch 目录保存适用于所有架构的 RPM 包。这些 RPM 文件就是用户最终安装的 RPM 包。</p>
<p>src %_sourcedir %_srcrpmdir 创建源码 RPM 包（简称 SRPM，以.src.rpm 作为后缀名），并保存至 %_srcrpmdir 目录。SRPM 包通常用于审核和升级软件包。</p>
<h3 id="_2-2-工具使用" tabindex="-1"><a class="header-anchor" href="#_2-2-工具使用" aria-hidden="true">#</a> 2.2 工具使用</h3>
<p>rpmbuild 命令使用一套标准化的「工作空间」 ，生成 %_topdir 工作目录 ~/rpmbuild，以及配置文件 ~/.rpmmacros：</p>
<pre><code>rpmdev-setuptree
</code></pre>
<p>rpmdev-setuptree 这个命令就是安装 rpmdevtools 带来的。可以看到运行了这个命令之后，在 $HOME 家目录下多了一个叫做 rpmbuild 的文件夹，
里边内容如下：</p>
<pre><code>tree rpmbuild
rpmbuild
├── BUILD
├── RPMS
├── SOURCES
├── SPECS
└── SRPMS
</code></pre>
<p>rpmdev-setuptree 命令在当前用户 home/rpmbuild 目录里自动建立上述目录。（省着自己创建了）</p>
<p>如果没有安装 rpmdevtools 的话，其实用 mkdir 命令创建这些文件夹也是可以的:</p>
<pre><code>mkdir -p /root/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}
</code></pre>
<h3 id="_2-3-生成-spec-文件" tabindex="-1"><a class="header-anchor" href="#_2-3-生成-spec-文件" aria-hidden="true">#</a> 2.3 生成 SPEC 文件</h3>
<p>最最最重要的 SPEC 文件，命名格式一般是“软件名-版本.spec”的形式，将其拷贝到 SPECS 目录下。</p>
<p>可以将 SPEC 文件理解为 rpmbuild 实用程序用来构建 RPM 的配方。通过在一系列部分中定义指令来向构建系统提供必要的信息。</p>
<p>如果系统有 rpmdevtools 工具，可以用 rpmdev-newspec -o name.spec 命令来生成 SPEC 文件的模板，然后进行修改：</p>
<h3 id="_2-4-示例文件" tabindex="-1"><a class="header-anchor" href="#_2-4-示例文件" aria-hidden="true">#</a> 2.4 示例文件：</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Name:       hello-world
Version:    <span class="token number">1</span>
Release:    <span class="token number">1</span>
Summary:    Most simple RPM package
License:    FIXME

%description
This is my first RPM package, <span class="token function">which</span> does nothing.

%prep
<span class="token comment"># we have no source, so nothing here</span>

%build
<span class="token function">cat</span> <span class="token operator">></span> hello-world.sh <span class="token operator">&lt;&lt;</span><span class="token string">EOF
#!/usr/bin/bash
echo Hello world
EOF</span>

%install
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>/usr/bin/
<span class="token function">install</span> <span class="token parameter variable">-m</span> <span class="token number">755</span> hello-world.sh %<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>/usr/bin/hello-world.sh

%files
/usr/bin/hello-world.sh

%changelog
<span class="token comment"># let's skip this for now</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-打包命令-rpmbuild" tabindex="-1"><a class="header-anchor" href="#_2-5-打包命令-rpmbuild" aria-hidden="true">#</a> 2.5 打包命令 rpmbuild</h3>
<p>用于生成包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token parameter variable">-bp</span> 只解压源码及应用补丁
<span class="token parameter variable">-bc</span> 只进行编译
<span class="token parameter variable">-bi</span> 只进行安装到%<span class="token punctuation">{</span>buildroot<span class="token punctuation">}</span>
<span class="token parameter variable">-bb</span> 只生成二进制 <span class="token function">rpm</span> 包
<span class="token parameter variable">-bs</span> 只生成源码 <span class="token function">rpm</span> 包
<span class="token parameter variable">-ba</span> 生成二进制 <span class="token function">rpm</span> 包和源码 <span class="token function">rpm</span> 包
<span class="token parameter variable">--target</span> 指定生成 <span class="token function">rpm</span> 包的平台，默认会生成 i686 和 x86_64 的 <span class="token function">rpm</span> 包，但一般我只需要 x86_64 的 <span class="token function">rpm</span> 包
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里执行 - [完全打包]：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rpmbuild <span class="token parameter variable">-ba</span> hello-world.spec   // rpmbuild <span class="token parameter variable">-ba</span> 软件名-版本.spec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>软件包制作完成后可用 rpm 命令查询，看看效果。如果不满意的话可以再次修改软件包描述文件，重新运行以上命令产生新的 RPM 软件包。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rpmbuild tree *RPMS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>[注]：将所有用于生成 rpm 包的源代码、 shell 脚本、配置文件都拷贝到 SOURCES 目录里，注意通常情况下源码的压缩格式都为 *.tar.gz 格式。</p>
<h2 id="_3-准备用来打包的软件" tabindex="-1"><a class="header-anchor" href="#_3-准备用来打包的软件" aria-hidden="true">#</a> 3. 准备用来打包的软件</h2>
<h3 id="_3-1-准备打包的源代码" tabindex="-1"><a class="header-anchor" href="#_3-1-准备打包的源代码" aria-hidden="true">#</a> 3.1 准备打包的源代码</h3>
<p>开发人员通常将软件作为源代码的压缩存档进行分发，然后将其用于创建软件包。RPM 打包程序可使用现成的源代码存档。</p>
<p>软件应随软件许可证一起分发</p>
<p>创建一个 <strong>LICENSE</strong> 文件，并确保它包含以下内容</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /tmp/LICENSE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将源代码和许可放到 /root/rpmbuild/SOURCES/ 目录下， 然后执行压缩命令</p>
<pre><code>tar -cvzf 项目名-版本号.tar.gz 文件名（目录）

如：
    tar -cvzf pello-0.1.2.tar.gz pello-0.1.2
    pello-0.1.2 /
    pello-0.1.2 / LICENSE
    pello-0.1.2 / pello.py
</code></pre>
<h2 id="_4-打包软件" tabindex="-1"><a class="header-anchor" href="#_4-打包软件" aria-hidden="true">#</a> 4. 打包软件</h2>
<h3 id="_4-1-什么是-rpm" tabindex="-1"><a class="header-anchor" href="#_4-1-什么是-rpm" aria-hidden="true">#</a> 4.1 什么是 RPM</h3>
<p>RPM 软件包是一个包含其他文件及其元数据（有关系统所需文件的信息）的文件。</p>
<p>具体来说，RPM 软件包由 cpio 归档文件组成。</p>
<p>该 cpio 压缩文件包含：</p>
<ul>
<li>Files # 档案</li>
<li>RPM header # RPM 标头（程序包元数据）</li>
</ul>
<p>该 rpm 软件包管理器使用这种元数据来确定的依赖，在那里安装文件和其他信息。</p>
<h3 id="_4-2-rpm-类型" tabindex="-1"><a class="header-anchor" href="#_4-2-rpm-类型" aria-hidden="true">#</a> 4.2 RPM 类型</h3>
<ul>
<li>
<p>源码包 - <code v-pre>SRPM</code>：包含源代码和 <code v-pre>SPEC</code> 文件，该文件描述了如何将源代码构建为二进制的 <code v-pre>RPM</code>，可选，包括对源代码的补丁</p>
</li>
<li>
<p>二进制 - <code v-pre>RPM</code>：二进制 <code v-pre>RPM</code> 包含从源代码和补丁构建的二进制文件</p>
</li>
<li>
<p>列出 <code v-pre>RPM</code> 打包工具的实用程序</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-ql</span> rpmdevtools <span class="token operator">|</span> <span class="token function">grep</span> bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</div></template>


