<template><div><p><strong>CI/CD</strong> 自动构建流水线</p>
<!--more-->
<h2 id="_1-构建基础" tabindex="-1"><a class="header-anchor" href="#_1-构建基础" aria-hidden="true">#</a> 1. 构建基础</h2>
<h3 id="_1-1-概念" tabindex="-1"><a class="header-anchor" href="#_1-1-概念" aria-hidden="true">#</a> 1.1 概念</h3>
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
<h3 id="_1-2-jenkins安装" tabindex="-1"><a class="header-anchor" href="#_1-2-jenkins安装" aria-hidden="true">#</a> 1.2 Jenkins安装</h3>
<p><strong>Jenkins</strong> 是一款开源 <strong>CI&amp;CD</strong> 软件，用于自动化各种任务，包括构建、测试和部署软件，<strong>Jenkins2.0</strong> 后主推声明式流水线，简单且支持指定步骤执行，地址如下</p>
<p><a href="https://www.jenkins.io/download/" target="_blank" rel="noopener noreferrer">詹金斯部署<ExternalLinkIcon/></a></p>
<p><a href="https://www.jenkins.io/doc/book/installing/" target="_blank" rel="noopener noreferrer">用户手册<ExternalLinkIcon/></a></p>
<p>需要安装  <strong>JAVA</strong> 环境和 <strong>Docker</strong></p>
<Tabs :data='[{"title":"CentOS"}]'>
<template #tab0="{ title, value, isActive }">
<p>要使用此存储库，请运行以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

<span class="token comment"># 若出现 ERROR: cannot verify pkg.jenkins.io’s certificate, issued by “/C=US/O=L...</span>
<span class="token comment"># 改为如命令</span>
$ <span class="token function">wget</span> --no-check-certificate <span class="token parameter variable">-O</span> /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

<span class="token comment"># 导入公钥</span>
$ <span class="token function">rpm</span> <span class="token parameter variable">--import</span> https://pkg.jenkins.io/redhat-stable/jenkins.io.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果之前已经从 <strong>Jenkins</strong> 导入过公钥，则会失败，直接忽略即可</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装 Java 环境</span>
$ yum <span class="token function">install</span> fontconfig java-11-openjdk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装/卸载 <strong>jenkins</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ yum <span class="token function">install</span> jenkins <span class="token parameter variable">-y</span>

<span class="token comment"># 卸载Jenkins</span>

$ <span class="token function">rpm</span> <span class="token parameter variable">-e</span> jenkins        <span class="token comment"># rpm卸载</span>

$ <span class="token function">rpm</span> <span class="token parameter variable">-ql</span> jenkins       <span class="token comment"># 检查是否卸载成功</span>

$ <span class="token function">find</span> / <span class="token parameter variable">-iname</span> jenkins <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-n</span> <span class="token number">1000</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span>     <span class="token comment"># 彻底删除残留文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <strong>war包</strong> 指定版本， <a href="https://get.jenkins.io/war-stable/" target="_blank" rel="noopener noreferrer">版本查看<ExternalLinkIcon/></a></p>
</template>
</Tabs>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 启动 jenkins 服务</span>
systemctl daemon-reload
systemctl status jenkins 
systemctl restart jenkins 
systemctl <span class="token builtin class-name">enable</span> jenkins 

<span class="token comment"># 可修改的配置文件地址</span>
$ <span class="token function">vim</span> /etc/sysconfig/jenkins

<span class="token comment"># 查看初始化密码文件地址</span>
$ <span class="token function">cat</span> /var/lib/jenkins/secrets/initialAdminPassword

<span class="token comment"># 环境配置、取消代理</span>
<span class="token builtin class-name">export</span>  <span class="token assign-left variable">all_proxy</span><span class="token operator">=</span><span class="token string">"http://172.16.70.104:7890"</span>
<span class="token builtin class-name">unset</span> all_proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-jenkins-使用基础" tabindex="-1"><a class="header-anchor" href="#_1-3-jenkins-使用基础" aria-hidden="true">#</a> 1.3 Jenkins 使用基础</h3>
<p><a href="https://www.jenkins.io/zh/doc/" target="_blank" rel="noopener noreferrer">Jenkins 中文用户手册<ExternalLinkIcon/></a></p>
<p>目录说明</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ls</span> /var/lib/jenkins/
<span class="token comment">#%C          hudson.model.UpdateCenter.xml     jobs              nodes    secret.key                secrets      users</span>
<span class="token comment">#config.xml  jenkins.telemetry.Correlator.xml  nodeMonitors.xml  plugins  secret.key.not-so-secret  userContent</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>nodes：</strong> agent</p>
<p><strong>jobs：</strong> 构建的流水线任务，可以直接迁移</p>
<p><strong>plugins：</strong> 插件，同样可迁移，直接能启动，更新插件一定要先备份，后更新，否则可能无法启动</p>
<p><strong>workspace：</strong> 工作路径，实际执行是以该目录下的任务执行</p>
<h4 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h4>
<p>如下 给出<code v-pre>test.sh</code> 放入创建 <strong>Jenkins</strong> 流水线的工作空间（<em>用于测试</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">timestamp</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%s<span class="token variable">)</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">`</span><span class="token function">expr</span> $timestamp % <span class="token number">2</span><span class="token variable">`</span></span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">"Success"</span>
        <span class="token builtin class-name">exit</span> <span class="token number">0</span>
<span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> <span class="token string">"Fail"</span>
        <span class="token function">sleep</span> <span class="token number">1</span>
        <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>流水线示例如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pipeline <span class="token punctuation">{</span>
    agent any
    parameters <span class="token punctuation">{</span>
		string<span class="token punctuation">(</span>name: <span class="token string">'PERSON'</span>, defaultValue: <span class="token string">'Mr Zheng'</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    environment <span class="token punctuation">{</span>
        DISABLE_AUTH <span class="token operator">=</span> <span class="token string">'true'</span>
        DB_ENGINE    <span class="token operator">=</span> <span class="token string">'sqlite'</span>
    <span class="token punctuation">}</span>
	options <span class="token punctuation">{</span>
	    retry<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
    stages <span class="token punctuation">{</span>
        stage<span class="token punctuation">(</span><span class="token string">'build'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">sh</span> <span class="token string">'python --version'</span>
                <span class="token function">sh</span> <span class="token string">'pwd'</span>
                <span class="token function">sh</span> <span class="token string">'bash ./test.sh'</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        stage<span class="token punctuation">(</span><span class="token string">'Deploy'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                timeout<span class="token punctuation">(</span>time: <span class="token number">10</span>, unit: <span class="token string">"SECONDS"</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${PERSON}</span>"</span>
                    retry<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token function">sh</span> <span class="token string">'./test.sh'</span>
                        <span class="token builtin class-name">echo</span> <span class="token string">'test.sh retry is over!'</span>
                    <span class="token punctuation">}</span>
                    
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        stage<span class="token punctuation">(</span><span class="token string">'Test'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            steps <span class="token punctuation">{</span>
                <span class="token function">sh</span> <span class="token string">'echo "Test Fail! but continue"; exit 0'</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    post <span class="token punctuation">{</span>
        always <span class="token punctuation">{</span>
            <span class="token builtin class-name">echo</span> <span class="token string">'This will always run'</span>
        <span class="token punctuation">}</span>
        success <span class="token punctuation">{</span>
            <span class="token builtin class-name">echo</span> <span class="token string">'This will run only if successful'</span>
        <span class="token punctuation">}</span>
        failure <span class="token punctuation">{</span>
            <span class="token builtin class-name">echo</span> <span class="token string">'This will run only if failed'</span>
            mail to: <span class="token string">'zhengze@uit.com.cn'</span>,
            subject: <span class="token string">"Failed Pipeline: <span class="token variable">${currentBuild.fullDisplayName}</span>"</span>,
            body: <span class="token string">"Something is wrong with <span class="token variable">${env.BUILD_URL}</span>"</span>
        <span class="token punctuation">}</span>
        unstable <span class="token punctuation">{</span>
            <span class="token builtin class-name">echo</span> <span class="token string">'This will run only if the run was marked as unstable'</span>
        <span class="token punctuation">}</span>
        changed <span class="token punctuation">{</span>
            <span class="token builtin class-name">echo</span> <span class="token string">'This will run only if the state of the Pipeline has changed'</span>
            <span class="token builtin class-name">echo</span> <span class="token string">'For example, if the Pipeline was previously failing but is now successful'</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
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
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>agent <span class="token punctuation">{</span>
	<span class="token function">docker</span> <span class="token punctuation">{</span> image <span class="token string">'node:16.13.1-alpine'</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


