<template><div><p><strong>CI/CD</strong> 自动构建流水线</p>
<!--more-->
<h2 id="_1-构建基础" tabindex="-1"><a class="header-anchor" href="#_1-构建基础"><span>1. 构建基础</span></a></h2>
<h3 id="_1-1-概念" tabindex="-1"><a class="header-anchor" href="#_1-1-概念"><span>1.1 概念</span></a></h3>
<p>通常 <strong>CI/CD</strong> 由部分组成</p>
<ul>
<li>
<p><strong>持续集成：</strong> 帮助开发人员更加频繁的将代码合并到共享分支或主干中，合并后自动触发构建应用，运行不同级别的代码扫描（<em>工具： <strong>sonarqube</strong></em>）和自动化测试（<em>单元&amp;集成测试</em>）</p>
</li>
<li>
<p><strong>持续交付：</strong> 将通过的集成测试代码合并到一个可以随时部分到生产环境的代码库</p>
</li>
<li>
<p><strong>持续部署：</strong> 持续交付的延伸，将代码自动发布到生产环境中</p>
</li>
</ul>
<p>自动构建流水线代表工具有 <strong>Jenkins</strong>、<strong>GitRunner（测试集成不够灵活）</strong></p>
<h3 id="_1-2-jenkins安装" tabindex="-1"><a class="header-anchor" href="#_1-2-jenkins安装"><span>1.2 Jenkins安装</span></a></h3>
<p><strong>Jenkins</strong> 是一款开源 <strong>CI&amp;CD</strong> 软件，用于自动化各种任务，包括构建、测试和部署软件，<strong>Jenkins2.0</strong> 后主推声明式流水线，简单且支持指定步骤执行，地址如下</p>
<p><a href="https://www.jenkins.io/download/" target="_blank" rel="noopener noreferrer">詹金斯部署</a></p>
<p><a href="https://www.jenkins.io/doc/book/installing/" target="_blank" rel="noopener noreferrer">用户手册</a></p>
<p>需要安装  <strong>JAVA</strong> 环境和 <strong>Docker</strong></p>
<Tabs id="48" :data='[{"id":"CentOS"}]'>
<template #title0="{ value, isActive }">CentOS</template>
<template #tab0="{ value, isActive }">
<p>要使用此存储库，请运行以下命令：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> wget</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -O</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/yum.repos.d/jenkins.repo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://pkg.jenkins.io/redhat-stable/jenkins.repo</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 若出现 ERROR: cannot verify pkg.jenkins.io’s certificate, issued by “/C=US/O=L...</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 改为如命令</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> wget</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --no-check-certificate</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -O</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/yum.repos.d/jenkins.repo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://pkg.jenkins.io/redhat-stable/jenkins.repo</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 导入公钥</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rpm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> --import</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://pkg.jenkins.io/redhat-stable/jenkins.io.key</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果之前已经从 <strong>Jenkins</strong> 导入过公钥，则会失败，直接忽略即可</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 安装 Java 环境</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> fontconfig</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> java-11-openjdk</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装/卸载 <strong>jenkins</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> yum</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> jenkins</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -y</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 卸载Jenkins</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rpm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -e</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> jenkins</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # rpm卸载</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rpm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -ql</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> jenkins</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">       # 检查是否卸载成功</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> find</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -iname</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> jenkins</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">xargs</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -n</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1000</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -rf</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     # 彻底删除残留文件</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <strong>war包</strong> 指定版本， <a href="https://get.jenkins.io/war-stable/" target="_blank" rel="noopener noreferrer">版本查看</a></p>
</template>
</Tabs>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 启动 jenkins 服务</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> status</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> jenkins</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> jenkins</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> jenkins</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 可修改的配置文件地址</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> vim</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/sysconfig/jenkins</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看初始化密码文件地址</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/lib/jenkins/secrets/initialAdminPassword</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 环境配置、取消代理</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  all_proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"http://172.16.70.104:7890"</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">unset</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> all_proxy</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-jenkins-使用基础" tabindex="-1"><a class="header-anchor" href="#_1-3-jenkins-使用基础"><span>1.3 Jenkins 使用基础</span></a></h3>
<p><a href="https://www.jenkins.io/zh/doc/" target="_blank" rel="noopener noreferrer">Jenkins 中文用户手册</a></p>
<p>目录说明</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ls</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/lib/jenkins/</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#%C          hudson.model.UpdateCenter.xml     jobs              nodes    secret.key                secrets      users</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">#config.xml  jenkins.telemetry.Correlator.xml  nodeMonitors.xml  plugins  secret.key.not-so-secret  userContent</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>nodes：</strong> agent</p>
<p><strong>jobs：</strong> 构建的流水线任务，可以直接迁移</p>
<p><strong>plugins：</strong> 插件，同样可迁移，直接能启动，更新插件一定要先备份，后更新，否则可能无法启动</p>
<p><strong>workspace：</strong> 工作路径，实际执行是以该目录下的任务执行</p>
<h4 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h4>
<p>如下 给出<code v-pre>test.sh</code> 放入创建 <strong>Jenkins</strong> 流水线的工作空间（<em>用于测试</em>）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">timestamp</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">$(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">date</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> +%s</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">expr</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> $timestamp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> % </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ]</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">then</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Success"</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        exit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">else</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Fail"</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        sleep</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        exit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">fi</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>流水线示例如下</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pipeline</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    agent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> any</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    parameters</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">		string(name:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'PERSON',</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> defaultValue:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'Mr Zheng'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	}</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    environment</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        DISABLE_AUTH</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'true'</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        DB_ENGINE</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'sqlite'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">	options</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">	    retry(5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	}</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    stages</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        stage(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">'build'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            steps</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                sh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'python --version'</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                sh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'pwd'</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                sh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'bash ./test.sh'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        stage(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">'Deploy'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">){</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            steps</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                timeout(time:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 10,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> unit:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "SECONDS"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">){</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">                    echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">PERSON</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                    retry(3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                        sh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> './test.sh'</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">                        echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'test.sh retry is over!'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                    </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        stage(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">'Test'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            steps</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">                sh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'echo "Test Fail! but continue"; exit 0'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    post</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        always</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">            echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'This will always run'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        success</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">            echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'This will run only if successful'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        failure</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">            echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'This will run only if failed'</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            mail</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> to:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'zhengze@uit.com.cn',</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            subject:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Failed Pipeline: </span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">currentBuild</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">fullDisplayName</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">",</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">            body:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "Something is wrong with </span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">${</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">env</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">BUILD_URL</span><span style="--shiki-light:#E45649;--shiki-dark:#98C379">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        unstable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">            echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'This will run only if the run was marked as unstable'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        changed</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">            echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'This will run only if the state of the Pipeline has changed'</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">            echo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'For example, if the Pipeline was previously failing but is now successful'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>agent：</strong> 代理，所有 <strong>Pipline</strong> 都需要指定 <strong>agent</strong> ，它告诉 <strong>Jenkins</strong> 在哪里以及如何执行</li>
<li><strong>environment：</strong> 环境变量，可以定义全局和阶段（<em><strong>stage</strong></em>），阶段只能在定义对应的阶段使用</li>
<li><strong>parameters：</strong> 构建初始化参数，可以指定默认值</li>
<li><strong>options：</strong> 定义一些全局配置，此处表示若失败则重试构建 <strong>5</strong> 次</li>
<li><strong>stage：</strong> 阶段，声明流程，内容可自定义，常规有 <strong>Build、Test、Deploy</strong> 三阶段，阶段即为部署环境</li>
<li><strong>steps：</strong> 步骤，可执行 <strong>sh</strong></li>
<li><strong>retry：</strong> 重试，若失败则会进行重试操作，可指定次数，并和超时组合</li>
<li><strong>timeout：</strong> 超时，可以设置超时时间，常用单位 <code v-pre>SECONDS</code>，<code v-pre>MINUTES</code></li>
<li><strong>post：</strong> 完成 <strong>Pipline</strong> 后执行的任务，如清理，输出分析报表、失败发送电子邮件等工作</li>
</ul>
<img src="@source/tool/Git/img/流水线示例.jpg">
<p><strong>agent</strong> 会将所有步骤 <code v-pre>steps{}</code> 存入一个执行队列，<strong>executor</strong> 一就绪就会执行</p>
<ul>
<li>
<p><strong>docker</strong> 若将其定义为容器</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">agent</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">	docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> image</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'node:16.13.1-alpine'</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


