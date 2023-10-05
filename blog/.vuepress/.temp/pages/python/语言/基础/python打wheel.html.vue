<template><div><h1 id="python-项目打包-wheel" tabindex="-1"><a class="header-anchor" href="#python-项目打包-wheel" aria-hidden="true">#</a> python 项目打包 wheel</h1>
<p>使用 <code v-pre>python</code> 自带工具 <strong>setuptool</strong> 进行打包</p>
<h2 id="_1-编写-setup-py-文件" tabindex="-1"><a class="header-anchor" href="#_1-编写-setup-py-文件" aria-hidden="true">#</a> 1.编写 <a href="http://setup.py" target="_blank" rel="noopener noreferrer">setup.py<ExternalLinkIcon/></a> 文件</h2>
<p>执行命令，生成 <code v-pre>build/lib/xxx</code> 具体打包后数据 dist/xxx-1-1.whl 打包后的 wheel 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>python3 setup.py bdist_wheel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>setup.py</code> 示例</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> setuptools
<span class="token keyword">from</span> setuptools<span class="token punctuation">.</span>command<span class="token punctuation">.</span>install <span class="token keyword">import</span> install

<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">"README.md"</span><span class="token punctuation">,</span> <span class="token string">"r"</span><span class="token punctuation">,</span> encoding<span class="token operator">=</span><span class="token string">"utf-8"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> fh<span class="token punctuation">:</span>
    long_description <span class="token operator">=</span> fh<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token comment"># with open("requirements.txt", "r", encoding="utf-8") as f:</span>
<span class="token comment">#     requirements = f.readlines()</span>
<span class="token comment"># requirements = [i.strip() for i in requirements]</span>

<span class="token keyword">class</span> <span class="token class-name">CustomInstallCommand</span><span class="token punctuation">(</span>install<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        install<span class="token punctuation">.</span>run<span class="token punctuation">(</span>self<span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">_find_packages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    packages <span class="token operator">=</span> setuptools<span class="token punctuation">.</span>find_packages<span class="token punctuation">(</span>where<span class="token operator">=</span><span class="token string">"./backend"</span><span class="token punctuation">)</span>
    packages<span class="token punctuation">.</span>extend<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token string">'static'</span><span class="token punctuation">,</span> <span class="token string">'static/fonts'</span><span class="token punctuation">,</span>
                     <span class="token string">'static/css'</span><span class="token punctuation">,</span> <span class="token string">'static/icons'</span><span class="token punctuation">,</span> <span class="token string">'static/img'</span><span class="token punctuation">,</span> <span class="token string">'static/js'</span><span class="token punctuation">,</span>
                     <span class="token string">'scripts'</span><span class="token punctuation">,</span> <span class="token string">'conf'</span><span class="token punctuation">,</span> <span class="token string">'app/i18n/en/LC_MESSAGES'</span><span class="token punctuation">,</span> <span class="token string">'app/i18n/zh/LC_MESSAGES'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> packages


setuptools<span class="token punctuation">.</span>setup<span class="token punctuation">(</span>
    name<span class="token operator">=</span><span class="token string">"usan"</span><span class="token punctuation">,</span>
    version<span class="token operator">=</span><span class="token string">"0.1.1"</span><span class="token punctuation">,</span>
    author<span class="token operator">=</span><span class="token string">"UIT Cloud Platform Development Team"</span><span class="token punctuation">,</span>
    author_email<span class="token operator">=</span><span class="token string">"zhengze@uit.com.cn"</span><span class="token punctuation">,</span>
    description<span class="token operator">=</span><span class="token string">"usan project"</span><span class="token punctuation">,</span>
    url<span class="token operator">=</span><span class="token string">"http://172.18.50.120/uds/mgmt/ui/backend"</span><span class="token punctuation">,</span>
    long_description<span class="token operator">=</span>long_description<span class="token punctuation">,</span>
    long_description_content_type<span class="token operator">=</span><span class="token string">"text/markdown"</span><span class="token punctuation">,</span>

    <span class="token comment"># install_requires=requirements,</span>
    packages<span class="token operator">=</span>_find_packages<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    package_dir<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">''</span><span class="token punctuation">:</span> <span class="token string">'backend'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    package_data<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">''</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'*.*'</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    include_package_data<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>

    cmdclass<span class="token operator">=</span><span class="token punctuation">{</span>
        <span class="token string">'install'</span><span class="token punctuation">:</span> CustomInstallCommand<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    license<span class="token operator">=</span><span class="token string">"ISCL"</span><span class="token punctuation">,</span>
    zip_safe<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span>

    classifiers<span class="token operator">=</span><span class="token punctuation">[</span>
        <span class="token string">'License :: OSI Approved :: ISC License (ISCL)'</span><span class="token punctuation">,</span>
        <span class="token string">"Programming Language :: Python :: 3.6+"</span><span class="token punctuation">,</span>
        <span class="token string">"Operating System :: CentOS 7"</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    python_requires<span class="token operator">=</span><span class="token string">'>=3.6'</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行以下命令安装</p>
<ul>
<li>
<p><code v-pre>egg</code> 形式</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 存入python包中  应该可以执行运行时的install</span>
$ python3 setup.py <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>pip 形式</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#存入类似 /usr/local/lib/python3.6/site-packages/打包数据 目录中，与build后的文件相同</span>
$ pip3 <span class="token function">install</span> xxx-1-1.whl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_2-编写-service-文件" tabindex="-1"><a class="header-anchor" href="#_2-编写-service-文件" aria-hidden="true">#</a> 2. 编写 <code v-pre>.service</code> 文件</h2>
<p>该文件用于 <code v-pre>CentOS</code> 执行 <code v-pre>systemctl</code> 命令时运行对应的命令，编写后放入 <code v-pre>/usr/lib/systemd/system</code></p>
<p>示例</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">USAN Api daemon</span>
<span class="token key attr-name">After</span><span class="token punctuation">=</span><span class="token value attr-value">network.target</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">simple</span>
<span class="token key attr-name">EnvironmentFile</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/python3</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/python3 /usr/local/lib/python3.6/site-packages/app/udc/udc_server.py start</span>
<span class="token key attr-name">ExecStop</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/python3 /usr/local/lib/python3.6/site-packages/app/udc/udc_server.py stop</span>
<span class="token key attr-name">ExecReload</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/python3 /usr/local/lib/python3.6/site-packages/app/udc/udc_server.py restart</span>
<span class="token key attr-name">KillMode</span><span class="token punctuation">=</span><span class="token value attr-value">process</span>
<span class="token comment">#Restart=on-failure</span>
<span class="token key attr-name">PIDFile</span><span class="token punctuation">=</span><span class="token value attr-value">/var/run/ufsapi.pid</span>
<span class="token comment">#RestartSec=100ms</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注意：</strong></p>
<p>此处 <code v-pre>start</code>、<code v-pre>stop</code> 等不能直接执行 <code v-pre>python3</code>，要写 <code v-pre>python3</code> 所在的 具体文件路径</p>
</blockquote>
<p>运行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> usan
systemctl status/start/stop/reload usan
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-去掉依赖" tabindex="-1"><a class="header-anchor" href="#_3-去掉依赖" aria-hidden="true">#</a> 3. 去掉依赖</h2>
<p>下载 <code v-pre>requirements.txt</code> 文件中的依赖，大部分应该是 <code v-pre>whl</code> 文件，包含少部分 <code v-pre>tar.gz</code> 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip3 download <span class="token parameter variable">-d</span> <span class="token punctuation">[</span>目录<span class="token punctuation">]</span> <span class="token parameter variable">-r</span> requirements.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>断网环境下，提供编译后的 <code v-pre>whl</code> 文件依赖，[<code v-pre>xx.tar.gz</code> 转 <code v-pre>wheel</code>]</p>
<ul>
<li><code v-pre>tar.gz</code> 格式有些安装需要编译，有些需要 <strong>gcc</strong> 环境，<code v-pre>whl</code> 避免 <strong>gcc</strong> 环境的依赖</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip3 wheel xx.tar.gz

<span class="token comment"># 如</span>
$ pip3 wheel psutil-5.7.3.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>移植到镜像中，执行如下安装命令，可自动识别打包后的 <code v-pre>whl</code> 和依赖的 <code v-pre>whl</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pip3 <span class="token function">install</span> --use-wheel --no-index --find-links<span class="token operator">=</span>package/usan/whl_package/ <span class="token parameter variable">-r</span> requirements.txt

--find-links: whl包所在的路径
<span class="token comment"># 通过requirements.txt 中的待安装项自动寻找依赖并安装</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-打包到镜像" tabindex="-1"><a class="header-anchor" href="#_4-打包到镜像" aria-hidden="true">#</a> 4. 打包到镜像</h2>
<p>挂载原有镜像，并将镜像的内容拷贝出来</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /mnt/usan 				<span class="token comment"># 新建目录</span>
<span class="token function">mount</span> xxx.iso /mnt/usan 		<span class="token comment"># 挂载镜像命令</span>
<span class="token function">cp</span> <span class="token parameter variable">-R</span> /mnt/usan /root/test  	<span class="token comment"># 拷贝到指定目录</span>
<span class="token builtin class-name">cd</span> /root/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目录下应包含有 <code v-pre>isolinux</code> 文件，把文件移动到待打包的位置，并执行以下命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cp</span> <span class="token parameter variable">-R</span> xxx /root/test/Package/xxx

<span class="token function">tar</span> czvf FileName.tgz path <span class="token comment"># 可能会压缩成.tgz的文件，用此命令</span>
- <span class="token function">tar</span> zcvf uraid-test.build-v2.38-base-centos7-x86_64-2011021828.tgz ./package/ ./current ./ins <span class="token punctuation">..</span>.
<span class="token comment"># 将当前目录下的 package文件夹压缩为tgz</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>

//genisoimage -joliet-long <span class="token parameter variable">-V</span> UFS

genisoimage -joliet-long  <span class="token punctuation">\</span>
    <span class="token parameter variable">-o</span> <span class="token string">"/home/usan-test.iso"</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-b</span> <span class="token string">"isolinux/isolinux.bin"</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-c</span> <span class="token string">"isolinux/boot.cat"</span> <span class="token punctuation">\</span>
    -no-emul-boot <span class="token punctuation">\</span>
    -boot-load-size <span class="token number">4</span> <span class="token punctuation">\</span>
    -boot-info-table <span class="token parameter variable">-R</span> <span class="token parameter variable">-J</span> <span class="token parameter variable">-v</span> -cache-inodes -eltorito-alt-boot <span class="token punctuation">\</span>
	<span class="token string">"."</span>

需要安装 yum <span class="token function">install</span> <span class="token parameter variable">-y</span> genisoimage  <span class="token parameter variable">-b</span> 后这个isolinux.bin文件是打包必须的 <span class="token parameter variable">-o</span> 后面接输出到的执行目录的文件

<span class="token parameter variable">-o</span> 指定映像文件的名称
<span class="token parameter variable">-U</span> 允许“未翻译”文件名。
<span class="token parameter variable">-r</span> uid和gid设置为零，因为它们通常只在作者的系统中有用，而对客户端没有用处。
<span class="token parameter variable">-v</span> 冗长的执行。如果在命令行上给出两次，则会打印额外的调试信息。
<span class="token parameter variable">-T</span> 在CD-ROM上的每个目录中生成一个TRANS.TBL文件，该文件可用于非Rock Ridge系统，以帮助建立正确的文件名。。
<span class="token parameter variable">-J</span> 除了正常的ISO <span class="token number">9660</span>文件名之外，还生成Joliet目录记录。在Windows机器上使用光盘时，这是有用的。
-joliet-long 允许Joliet文件名最多为103个Unicode字符，而不是64个字符。这违反了Joliet规范，但似乎有效。谨慎使用。
<span class="token parameter variable">-V</span> 指定要写入主块的卷ID<span class="token punctuation">(</span>卷名或标签<span class="token punctuation">)</span>。有32个字符的空间。相当于“.genisoImagerc”文件中的VOLI。卷ID被Solaris卷管理器用作挂载点，并作为分配给光盘的标签。
<span class="token parameter variable">-volset</span>  指定卷集ID。有128个字符的空间。相当于“.genisoImagerc”文件中的VOLS
<span class="token parameter variable">-A</span> 指定描述光盘应用程序Id的文本字符串，可以有128个字符
<span class="token parameter variable">-b</span> 指定在为x86 PC制作EL Torito可引导CD时使用的引导映像的路径和文件名。
<span class="token parameter variable">-c</span> 指定引导目录的路径和文件名，这是El Torito可引导CD所必需的。
-no-emul-boot 指定用于创建El Torito可引导cd的引导映像是“无仿真”映像。系统将在不执行任何磁盘模拟的情况下加载和执行此映像。
-boot-load-size 指定在非模拟模式下加载的“虚拟”<span class="token punctuation">(</span><span class="token number">512</span>字节<span class="token punctuation">)</span>扇区的数量。默认情况是加载整个引导文件。如果不是4的倍数，一些BIOSes可能会出现问题。
-boot-info-table 指定在引导文件中的偏移量8处修补一个56字节的表，其中包含CD-ROM布局的信息。的副本！
-eltorito-alt-boot 从一组新的El Torito启动参数开始。最多63个El Torito引导项可以存储在一张CD上。
<span class="token parameter variable">-R</span> 使用Rock Ridge协议生成SUSP和RR记录，以进一步描述ISO <span class="token number">9660</span>文件系统上的文件。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


