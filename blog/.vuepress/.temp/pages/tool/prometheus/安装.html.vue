<template><div><p><strong>k8s</strong> 下 <strong>prometheus</strong> 的安装部署</p>
<!-- more -->
<h2 id="安装-kube-prometheus" tabindex="-1"><a class="header-anchor" href="#安装-kube-prometheus" aria-hidden="true">#</a> 安装 kube-prometheus</h2>
<p><a href="https://github.com/prometheus-operator/kube-prometheus" target="_blank" rel="noopener noreferrer">Github 地址<ExternalLinkIcon/></a> 此处克隆的是 <strong>release-0.4</strong> 版本的，<strong>yaml</strong> 文件如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone <span class="token parameter variable">-b</span> release-0.4 --single-branch https://github.com/prometheus-operator/kube-prometheus.git

<span class="token comment"># 该目录下定义好了部署的 yaml </span>
<span class="token builtin class-name">cd</span> ./kube-prometheus/manifests
<span class="token function">ls</span>

<span class="token comment"># 其中</span>
<span class="token comment"># alertmanager-alertmanager.yaml 	定义了 alertmanager</span>
<span class="token comment"># prometheus-prometheus.yaml 		定义了 prometheus server端</span>
<span class="token comment"># prometheus-rules.yaml 			定义了 prometheus 的基本规则</span>
<span class="token comment"># node-exporter* 					采集宿主机的监控数据的（比zabbix更详细）</span>
<span class="token comment"># grafana-deployment.yaml 			继承了很多 dashboard，通过 ConfigMap 注入</span>
<span class="token comment"># grafana-dashboardDefinitions.yaml 定义了很多 dashboard，都放到了 ConfigMap 里面</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>使用容器不方便，经常会改里面的模板、创建模板等没有存储会很复杂</p>
<ul>
<li>若容器部署，新增一个模板就需要修改上述定义 <strong>dashboard</strong> 并挂载到 <strong>configMap</strong> 中，<strong>grafana</strong> 才能读取到</li>
<li>有多个 <strong>configMap</strong> ，因为 <strong>etcd</strong> 默认限制大小为 <strong>1.5 Mib（Raft<em>消息限制</em> ）</strong> 过大的配置文件会影响其性能（<em>虽然可修改</em> ）</li>
<li>加一个模板就需要创建一个 <strong>configMap</strong> 然后在 <code v-pre>grafana-deployment.yaml</code> 中的 <strong>volumes:</strong> 下，挂载一大堆，新增也需要沿用这种方式挂载</li>
</ul>
<p>因此建议 <strong>grafana</strong> 最好挂个存储（<em>数据目录</em>），若没有存储的话最好使用宿主机部署</p>
<ul>
<li>这样可以直接上传一个 <strong>dashboard</strong> 定义到宿主机或存储中</li>
<li><strong>grafana</strong> 是个界面展示，挂了无妨，但要在 <strong>grafana</strong> 上做告警，也不能挂</li>
<li>有 <strong>alertmanager</strong> 的告警，就不需要用 <strong>grafana</strong> 的告警了，更为灵活</li>
</ul>
</div>
<p>部署 <strong>prometheus</strong>、<strong>grafana</strong> 和 <strong>alertmanager</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 进入 setup 目录下安装 operator</span>
<span class="token builtin class-name">cd</span> ./kube-prometheus/manifests/setup

<span class="token comment"># 安装该目录下所有 yaml 文件</span>
$ kubectl create <span class="token parameter variable">-f</span> <span class="token builtin class-name">.</span>
customresourcedefinition.apiextensions.k8s.io/alertmanagers.monitoring.coreos.com created
<span class="token punctuation">..</span>. 
clusterrolebinding.rbac.authorization.k8s.io/prometheus-operator created
deployment.apps/prometheus-operator created
service/prometheus-operator created
serviceaccount/prometheus-operator created

<span class="token comment"># 查看运行，此时已经创建好了 operator</span>
$ kubectl <span class="token parameter variable">-n</span> monitoring get po 
NAME                                   READY   STATUS    RESTARTS   AGE
prometheus-operator-5f75d76f9f-zkzf6   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          1m20s

<span class="token comment"># 返回上级，然后创建 prometheus 的集群</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token function">ls</span>
<span class="token comment"># 最好将 alertmanager 中的 副本改为 3 个,因为生成环境中 3 个会通过 POSIX 协议通信，而不会发3次告警</span>
<span class="token comment"># vim alertmanager-alertmanager.yaml</span>
<span class="token comment"># replicas: 3</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 <strong>service</strong> 如下服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> monitoring get svc
NAME                    TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>
alertmanager-main       ClusterIP   <span class="token number">10.96</span>.65.3       <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">9093</span>/TCP
<span class="token punctuation">..</span>.
grafana                 ClusterIP   <span class="token number">10.109</span>.31.26     <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">3000</span>/TCP
<span class="token punctuation">..</span>.
prometheus-k8s          ClusterIP   <span class="token number">10.105</span>.151.175   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">9090</span>/TCP
<span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>alertmanager-main</strong> 用于查看当前告警有哪些、通知告警</li>
<li><strong>grafana</strong> 监控面板、展示数据</li>
<li><strong>prometheus-k8s</strong> 创建规则、校验、查询操作、<strong>target</strong> 等</li>
</ul>
<p>使用 <strong>ingress</strong> 配置如上服务对应的域名（<em>若没配置 <strong>ingress</strong> 先去配 <strong>ingress</strong> 的控制器</em> ）</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment"># 配置 ingress 如下</span>
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: prom-ingresses
  namespace: monitoring
spec:
  rules:
  - host: alert.test.com
    http:
      paths:
      - backend:
          serviceName: alertmanager-main
          servicePort: 9093
        path: /
  - host: grafana.test.com
    http:
      paths:
      - backend:
          serviceName: grafana
          servicePort: 3000
        path: /
  - host: prom.test.com
    http:
      paths:
      - backend:
          serviceName: prometheus-k8s
          servicePort: 9090
        path: /
status:
  loadBalancer: {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看创建的 <strong>ingress</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> monitoring get ingress
NAME             HOSTS                                           ADDRESS   PORTS   AGE
prom-ingresses   alert.test.com,grafana.test.com,prom.test.com             <span class="token number">80</span>      78s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <strong>hosts</strong> 后即可访问域名，其中 <strong>grafana</strong> 的初始账户密码都为 <code v-pre>admin</code> ，登入后需修改（<em>若没有持久化，每次重启都会还原，此处修改为 <code v-pre>user@dev</code>备忘</em> ）</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>192.168.3.172	alert.test.com prom.test.com grafana.test.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


