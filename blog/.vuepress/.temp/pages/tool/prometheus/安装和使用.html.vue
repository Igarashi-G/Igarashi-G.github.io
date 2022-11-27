<template><div><p><strong>k8s</strong> 下 <strong>prometheus</strong> 的安装及使用</p>
<!-- more -->
<h2 id="安装-kube-prometheus" tabindex="-1"><a class="header-anchor" href="#安装-kube-prometheus" aria-hidden="true">#</a> 安装 kube-prometheus</h2>
<p><a href="https://github.com/prometheus-operator/kube-prometheus" target="_blank" rel="noopener noreferrer">Github 地址<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone <span class="token parameter variable">-b</span> release-0.4 --single-branch https://github.com/prometheus-operator/kube-prometheus.git

<span class="token builtin class-name">cd</span> ./kube-prometheus/manifests/setup

<span class="token comment"># 安装该目录下所有 yaml 文件</span>
$ kubectl create <span class="token parameter variable">-f</span> <span class="token builtin class-name">.</span>
customresourcedefinition.apiextensions.k8s.io/alertmanagers.monitoring.coreos.com created
<span class="token punctuation">..</span>. 
clusterrolebinding.rbac.authorization.k8s.io/prometheus-operator created
deployment.apps/prometheus-operator created
service/prometheus-operator created
serviceaccount/prometheus-operator created

<span class="token comment"># 查看运行</span>
$ kubectl <span class="token parameter variable">-n</span> monitoring get po 
NAME                                   READY   STATUS    RESTARTS   AGE
prometheus-operator-5f75d76f9f-zkzf6   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          1m20s

<span class="token comment"># 返回上级，继续创建</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
$ kubectl create <span class="token parameter variable">-f</span> <span class="token builtin class-name">.</span>

<span class="token comment"># 查看运行</span>
$ kubectl <span class="token parameter variable">-n</span> monitoring get po <span class="token parameter variable">-owide</span>
NNAME                                   READY   STATUS              RESTARTS   AGE
alertmanager-main-0                    <span class="token number">0</span>/2     ContainerCreating   <span class="token number">0</span>          108s
grafana-58dc7468d7-wmp2p               <span class="token number">0</span>/1     Running             <span class="token number">0</span>          106s
kube-state-metrics-765c7c7f95-xn6kh    <span class="token number">0</span>/3     ContainerCreating   <span class="token number">0</span>          104s
node-exporter-99kq7                    <span class="token number">0</span>/2     ContainerCreating   <span class="token number">0</span>          104s
node-exporter-b9pfp                    <span class="token number">2</span>/2     Running             <span class="token number">0</span>          104s
node-exporter-qrdmv                    <span class="token number">0</span>/2     ContainerCreating   <span class="token number">0</span>          104s
prometheus-adapter-5cd5798d96-72fsl    <span class="token number">1</span>/1     Running             <span class="token number">0</span>          102s
prometheus-k8s-0                       <span class="token number">0</span>/3     ContainerCreating   <span class="token number">0</span>          98s
prometheus-k8s-1                       <span class="token number">0</span>/3     ContainerCreating   <span class="token number">0</span>          98s
prometheus-operator-5f75d76f9f-zkzf6   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          18m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 <strong>service</strong> 如下服务应配置域名</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> monitoring get svc
NAME                    TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>
alertmanager-main       ClusterIP   <span class="token number">10.96</span>.65.3       <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">9093</span>/TCP
<span class="token punctuation">..</span>.
grafana                 ClusterIP   <span class="token number">10.109</span>.31.26     <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">3000</span>/TCP
<span class="token punctuation">..</span>.
prometheus-k8s          ClusterIP   <span class="token number">10.105</span>.151.175   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">9090</span>/TCP
<span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>alertmanager-main</strong> 用于查看当前告警有哪些、通知告警</p>
</li>
<li>
<p><strong>grafana</strong> 监控面板、展示数据</p>
</li>
<li>
<p><strong>prometheus-k8s</strong> 创建规则、校验、查询等</p>
</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 配置 ingress 如下</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> prom<span class="token punctuation">-</span>ingresses
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> monitoring
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> alert.test.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>main
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">9093</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> grafana.test.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> grafana
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">3000</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> prom.test.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> prometheus<span class="token punctuation">-</span>k8s
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">9090</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">loadBalancer</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看创建的 <strong>ingress</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> monitoring get ingress
NAME             HOSTS                                           ADDRESS   PORTS   AGE
prom-ingresses   alert.test.com,grafana.test.com,prom.test.com             <span class="token number">80</span>      78s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


