<template><div><p><strong><a href="https://helm.sh/zh/docs/" target="_blank" rel="noopener noreferrer">Helm<ExternalLinkIcon/></a></strong> 相关的安装使用</p>
<!-- more -->
<h2 id="_1-helm" tabindex="-1"><a class="header-anchor" href="#_1-helm" aria-hidden="true">#</a> 1.Helm</h2>
<p><strong>Helm</strong> 类似 <strong>npm</strong>，<strong>pip</strong>，<strong>docker hub</strong>, 可理解为是软件库，方便快速的为 <strong>k8s</strong> 集群安装第三方软件</p>
<h3 id="_1-1-概念" tabindex="-1"><a class="header-anchor" href="#_1-1-概念" aria-hidden="true">#</a> 1.1 概念</h3>
<p><strong>Chart（包）：</strong> 代表 <strong>Helm</strong> 的包，就是 <strong>k8s</strong> 集群内部跑的应用程序的资源定义</p>
<p><strong>Repository（仓库）：</strong> 用来存放和共享 <strong>charts</strong> 的地方，它就像 <strong>Perl</strong> 的 <a href="https://www.cpan.org/" target="_blank" rel="noopener noreferrer">CPAN 档案库网络<ExternalLinkIcon/></a> 或是 <strong>Fedora</strong> 的 <a href="https://src.fedoraproject.org/" target="_blank" rel="noopener noreferrer">软件包仓库<ExternalLinkIcon/></a>，只不过它是供 <strong>Kubernetes</strong> 包所使用的</p>
<p><strong>Release（实例）：</strong> 运行在 <strong>Kubernetes</strong> 集群中的 <strong>chart</strong> 的实例，一个 <strong>chart</strong> 通常可在同个集群中安装多次，每次安装都会创建一个新的 <strong>release</strong>。</p>
<ul>
<li>以 <strong>MySQL chart</strong> 为例，如果你想在你的集群中运行两个数据库，你可以安装该<strong>chart</strong> 两次，每个数据库都会拥有它自己的 <strong>release</strong> 和 <strong>release name</strong></li>
</ul>
<div class="custom-container note">
<p class="custom-container-title">注</p>
<p><strong>Helm</strong> 安装 <strong>charts</strong> 到 <strong>Kubernetes</strong> 集群中，每次安装都会创建一个新的 <strong>release</strong>，可在 <strong>Helm</strong> 的 <strong>chart</strong> <strong>repositories</strong> 中寻找新的 <strong>chart</strong></p>
</div>
<h3 id="_1-2-安装" tabindex="-1"><a class="header-anchor" href="#_1-2-安装" aria-hidden="true">#</a> 1.2 安装</h3>
<h4 id="安装-helm" tabindex="-1"><a class="header-anchor" href="#安装-helm" aria-hidden="true">#</a> 安装 Helm</h4>
<p><a href="https://helm.sh/zh/docs/intro/install/" target="_blank" rel="noopener noreferrer">中文文档<ExternalLinkIcon/></a></p>
<p><a href="https://helm.sh/" target="_blank" rel="noopener noreferrer">Helm 官方文档<ExternalLinkIcon/></a> ，仓库推荐用 <a href="https://github.com/bitnami/charts" target="_blank" rel="noopener noreferrer">bitnami<ExternalLinkIcon/></a> 可以方便部署 <strong>kafuka</strong> 和 <strong>zk</strong></p>
<ol>
<li>Download your <a href="https://github.com/helm/helm/releases" target="_blank" rel="noopener noreferrer">desired version<ExternalLinkIcon/></a></li>
<li>Unpack it (<strong>tar -zxvf helm-v3.0.0-linux-amd64.tar.gz</strong>)</li>
<li>Find the helm binary in the unpacked directory, and move it to its desired destination (<strong>mv linux-amd64/helm /usr/local/bin/helm</strong>)</li>
</ol>
<h4 id="安装仓库" tabindex="-1"><a class="header-anchor" href="#安装仓库" aria-hidden="true">#</a> 安装仓库</h4>
<p>安装完 <strong>Helm</strong> 二进制后， 就可以添加一个 <strong>chart</strong> 仓库，从 <a href="https://artifacthub.io/packages/search?kind=0" target="_blank" rel="noopener noreferrer">Artifact Hub <ExternalLinkIcon/></a> 中查找有效的 <strong>Helm chart</strong> 仓库</p>
<p>如下以官方的 <strong>bitnami</strong> 为例，先初始化</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># helm 安装 bitnami </span>
$ helm repo <span class="token function">add</span> bitnami https://charts.bitnami.com/bitnami
	<span class="token comment"># - add 仓库名称 地址</span>
<span class="token string">"bitnami"</span> has been added to your repositories
	
<span class="token comment"># 当添加完成，您将可以看到可以被您安装的charts列表</span>
$ helm search repo bitnami
NAME                             	CHART VERSION	APP VERSION  	DESCRIPTION
bitnami/bitnami-common           	<span class="token number">0.0</span>.9        	<span class="token number">0.0</span>.9        	DEPRECATED Chart with custom templates used <span class="token keyword">in</span> <span class="token punctuation">..</span>.
<span class="token comment"># ... and many more</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="安装-chart" tabindex="-1"><a class="header-anchor" href="#安装-chart" aria-hidden="true">#</a> <strong>安装 Chart</strong></h5>
<p>您可以通过 <code v-pre>helm install</code> 命令安装 <strong>chart</strong>， <strong>Helm</strong> 可通过多种途径查找和安装 <strong>chart</strong>， 最简单的是安装官方的<strong>bitnami charts</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 更新,确定我们可以拿到最新的charts列表</span>
$ helm repo update

<span class="token comment"># 查看 mysql repo</span>
$ helm search repo mysql
NAME                  	CHART VERSION	APP VERSION	DESCRIPTION     
bitnami/mysql         	<span class="token number">9.4</span>.4        	<span class="token number">8.0</span>.31     	MySQL is a fast, reliable, scalable, and easy t<span class="token punctuation">..</span>.

<span class="token comment"># 安装 mysql</span>
$ helm <span class="token function">install</span> bitnami/mysql --generate-name
NAME: mysql-1612624192
LAST DEPLOYED: Sat Feb  <span class="token number">6</span> <span class="token number">16</span>:09:56 <span class="token number">2021</span>
NAMESPACE: default
STATUS: deployed
REVISION: <span class="token number">1</span>
TEST SUITE: None
NOTES: <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装 <strong>harbor</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 搜索并安装 harbor 私有仓库</span>
$ helm search repo harbor
$ helm <span class="token function">install</span> my-harbor bitnami/harbor

** Please be patient <span class="token keyword">while</span> the chart is being deployed **

<span class="token number">1</span>. Get the Harbor URL:

  NOTE: It may take a few minutes <span class="token keyword">for</span> the LoadBalancer IP to be available.
        Watch the status with: <span class="token string">'kubectl get svc --namespace default -w my-harbor'</span>
    <span class="token builtin class-name">export</span> <span class="token assign-left variable">SERVICE_IP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get svc <span class="token parameter variable">--namespace</span> default my-harbor <span class="token parameter variable">--template</span> <span class="token string">"{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}"</span><span class="token variable">)</span></span>
    <span class="token builtin class-name">echo</span> <span class="token string">"Harbor URL: http://<span class="token variable">$SERVICE_IP</span>/"</span>

<span class="token number">2</span>. Login with the following credentials to see your Harbor application

  <span class="token builtin class-name">echo</span> Username: <span class="token string">"admin"</span>
  <span class="token builtin class-name">echo</span> Password: <span class="token variable"><span class="token variable">$(</span>kubectl get secret <span class="token parameter variable">--namespace</span> default my-harbor-core-envvars <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.data.HARBOR_ADMIN_PASSWORD}"</span> <span class="token operator">|</span> base64 <span class="token parameter variable">-d</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-使用" tabindex="-1"><a class="header-anchor" href="#_2-使用" aria-hidden="true">#</a> 2. 使用</h2>
<h3 id="_2-1-常用命令" tabindex="-1"><a class="header-anchor" href="#_2-1-常用命令" aria-hidden="true">#</a> 2.1 常用命令</h3>
<p>简单打包发布流程</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 打包</span>
$ <span class="token function">sudo</span> helm package analysis-data-worker-chart <span class="token parameter variable">--version</span> <span class="token number">0.1</span>.0 <span class="token parameter variable">--destination</span> <span class="token builtin class-name">.</span>

<span class="token comment"># 添加自建的nexus仓库，注意是url</span>
$ <span class="token function">sudo</span> helm repo <span class="token function">add</span> nexus-repo http://192.168.3.111:8081/repository/helm-repo/

<span class="token comment"># 安装第三方脚本</span>
$ <span class="token function">sudo</span> helm plugin <span class="token function">install</span> <span class="token parameter variable">--version</span> master https://gitee.com/mirrors_sonatype-nexus-community/helm-nexus-push.git

<span class="token comment"># 上传chart包</span>
$ <span class="token function">sudo</span> helm nexus-push nexus-repo analysis-data-worker-chart-0.1.0.tgz <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> xxx

<span class="token comment"># 从仓库里安装chart</span>
$ <span class="token function">sudo</span> helm <span class="token function">install</span> analysis-data-worker analysis-data-worker-chart <span class="token parameter variable">--namespace</span><span class="token operator">=</span>zz-test <span class="token parameter variable">--version</span><span class="token operator">=</span><span class="token number">0.1</span>.3

<span class="token comment"># 卸载chart包</span>
<span class="token function">sudo</span> helm uninstall analysis-data-worker <span class="token parameter variable">--namespace</span><span class="token operator">=</span>zz-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


