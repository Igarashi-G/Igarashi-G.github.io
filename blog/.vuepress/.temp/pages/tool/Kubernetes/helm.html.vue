<template><div><p><strong>Helm</strong> 相关的安装使用</p>
<!-- more -->
<h2 id="_1-helm-安装" tabindex="-1"><a class="header-anchor" href="#_1-helm-安装" aria-hidden="true">#</a> 1.Helm 安装</h2>
<h4 id="安装-helm" tabindex="-1"><a class="header-anchor" href="#安装-helm" aria-hidden="true">#</a> 安装 Helm</h4>
<p><a href="https://helm.sh/" target="_blank" rel="noopener noreferrer">Helm 官方文档<ExternalLinkIcon/></a> ，仓库推荐用 <a href="https://github.com/bitnami/charts" target="_blank" rel="noopener noreferrer">bitnami<ExternalLinkIcon/></a> 可以方便部署 <strong>kafuka</strong> 和 <strong>zk</strong></p>
<ol>
<li>Download your <a href="https://github.com/helm/helm/releases" target="_blank" rel="noopener noreferrer">desired version<ExternalLinkIcon/></a></li>
<li>Unpack it (<strong>tar -zxvf helm-v3.0.0-linux-amd64.tar.gz</strong>)</li>
<li>Find the helm binary in the unpacked directory, and move it to its desired destination (<strong>mv linux-amd64/helm /usr/local/bin/helm</strong>)</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># helm 安装 bitnami </span>
$ helm repo <span class="token function">add</span> bitnami https://charts.bitnami.com/bitnami
	<span class="token comment"># - add 仓库名称 地址</span>
<span class="token string">"bitnami"</span> has been added to your repositories
	
<span class="token comment"># 搜索并安装 harbor 私有仓库</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


