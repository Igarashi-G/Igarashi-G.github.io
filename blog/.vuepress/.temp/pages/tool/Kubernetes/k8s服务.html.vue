<template><div><p><strong>k8s</strong> 服务、负载均衡 和 联网</p>
<!-- more -->
<h2 id="_1-service-服务" tabindex="-1"><a class="header-anchor" href="#_1-service-服务" aria-hidden="true">#</a> 1. Service 服务</h2>
<p>此时，已能通过 <strong>Deployment</strong> 创建带副本的 <strong>Pod</strong> 提供高可用性的服务了，但即使每个 <strong>Pod</strong> 都会分配单独 <strong>IP</strong>，却存在如下问题</p>
<ul>
<li><strong>Pod IP</strong> 仅仅是集群内可见的虚拟 <strong>IP</strong>，外部无法访问</li>
<li><strong>Pod IP</strong> 会随着 <strong>Pod</strong> 销毁而消失，当 <strong>ReplicaSet</strong> 对 <strong>Pod</strong> 进行动态伸缩时，<strong>Pod IP</strong> 可能随时随地都会变化，对于访问服务带来了难度</li>
</ul>
<h4 id="那么什么是-serveice" tabindex="-1"><a class="header-anchor" href="#那么什么是-serveice" aria-hidden="true">#</a> 那么什么是 Serveice ？</h4>
<p><strong>Service</strong> 是一组 <strong>Pod</strong> 的服务抽象（<em>一种可以访问 <strong>Pod</strong> 的策略</em> ），也可以简单理解为逻辑上一组 <strong>Pod</strong> 的 <strong>LB（<em>Load Balance</em>）</strong>，负责将请求分发给对应的 <strong>Pod</strong> ，用来给 <strong>Pod</strong> 通信的</p>
<p><strong>svc</strong> 一旦创建，即使重建，名称也不会改变</p>
<h4 id="类型如下" tabindex="-1"><a class="header-anchor" href="#类型如下" aria-hidden="true">#</a> 类型如下</h4>
<ul>
<li><strong>Cluster IP：</strong> 集群内部使用，默认值，用于负载</li>
<li><strong>ExternalName：</strong> 返回定义的 <strong>CNAME</strong> 别名，用于反代域名</li>
<li><strong>NodePort：</strong> 在所有安装了 <strong>kube-proxy</strong> 的节点上，打开一个可供外部访问 <strong>pod</strong> 的端口</li>
<li><strong>loadBalancer：</strong> 使用云提供商的负载均衡器公开服务
<ul>
<li>如：阿里、腾讯云支持该格式，发请求并生成 <strong>IP</strong> 地址</li>
</ul>
</li>
</ul>
<h3 id="_1-1-cluster-ip-负载均衡" tabindex="-1"><a class="header-anchor" href="#_1-1-cluster-ip-负载均衡" aria-hidden="true">#</a> 1.1 Cluster IP（<em>负载均衡</em> ）</h3>
<p><strong>Service</strong> 会为这个 <strong>LB</strong> 提供一个 <strong>Cluster IP</strong> ，使用 <strong>Service</strong> 对象，通过 <strong>selector 进行标签选择</strong>，即可找到对应的 <strong>Pod</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 每次都输入一串 kubectl xxx太累，可以起别名</span>
$ <span class="token builtin class-name">alias</span> <span class="token assign-left variable">kd</span><span class="token operator">=</span><span class="token string">'kubectl -n uit'</span>

<span class="token comment"># 此时查看 pod 标签，在 deploy 配置中曾指定了 app=myblog</span>
$ kd get po --show-labels
NAME                     READY   STATUS    RESTARTS   AGE     LABELS
mysql-6fbb5cc967-48dfd   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d12h   <span class="token assign-left variable">app</span><span class="token operator">=</span>mysql,pod-template-hash<span class="token operator">=</span>6fbb5cc967
ublog-5ff678657f-7qx5z   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          42m     <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog,pod-template-hash<span class="token operator">=</span>5ff678657f
ublog-5ff678657f-rk92z   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          43m     <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog,pod-template-hash<span class="token operator">=</span>5ff678657f
ublog-5ff678657f-tzspj   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          42m     <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog,pod-template-hash<span class="token operator">=</span>5ff678657f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Service</strong> 的 <strong>yaml</strong> 文件如下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog<span class="token punctuation">-</span>svc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>					<span class="token comment"># 若如 Nginx 有 80、443 则可以指定多个端口</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>				<span class="token comment"># Service 的端口 </span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP			<span class="token comment"># 协议: UDP、TCP、SCTP  default: TCP</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>		<span class="token comment"># 后端应用的端口（容器服务的）</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog				<span class="token comment"># 通过标签过滤并选择应用</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上配置端口，<strong>ServiceA</strong> 访问 <strong>ServiceB</strong> 可利用  <code v-pre>servicea --&gt; serviceb http://serviceb</code>，若端口非 <strong>80</strong>  , 假如是 <strong>8080</strong> 则通过  <code v-pre>http://serviceb:8080</code> 即可</p>
<p>创建 <strong>Service</strong> 并查看</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建 svc</span>
$ kubectl create <span class="token parameter variable">-f</span> svc-ublog.yaml 
service/svc-ublog created

<span class="token comment"># 查看 svc，此时已创建了 CLUSTER-IP 10.105.146.135 80 端口的服务（建议自动生成 ClusterIP 而非指定）</span>
$ kubectl <span class="token parameter variable">-nuit</span> get svc
NAME        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE
svc-ublog   ClusterIP   <span class="token number">10.105</span>.146.135   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">80</span>/TCP    7m51s


<span class="token comment"># 查看详情，此时发现 endpoints 已经代理了对应的 app = myblog</span>
$ kubectl <span class="token parameter variable">-nuit</span> describe svc
Name:              svc-ublog
Namespace:         uit
Labels:            <span class="token operator">&lt;</span>none<span class="token operator">></span>
Annotations:       <span class="token operator">&lt;</span>none<span class="token operator">></span>
Selector:          <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog
Type:              ClusterIP
IP:                <span class="token number">10.105</span>.146.135
Port:              <span class="token operator">&lt;</span>unset<span class="token operator">></span>  <span class="token number">80</span>/TCP
TargetPort:        <span class="token number">8002</span>/TCP
Endpoints:         <span class="token number">10.244</span>.1.35:8002,10.244.2.32:8002,10.244.2.33:8002
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">></span>

<span class="token comment"># 此时访问 80 端口，服务正常</span>
<span class="token function">curl</span> <span class="token number">10.105</span>.146.135/blog/index/

<span class="token comment"># 缩容 ublog 服务</span>
$ kubectl <span class="token parameter variable">-n</span> uit scale deploy ublog <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">2</span>
deployment.apps/ublog scaled

<span class="token comment"># 查看svc详情，此时发现 endpoints 自动减一</span>
$ kubectl <span class="token parameter variable">-n</span> uit describe svc
Name:              svc-ublog
Namespace:         uit
Labels:            <span class="token operator">&lt;</span>none<span class="token operator">></span>
Annotations:       <span class="token operator">&lt;</span>none<span class="token operator">></span>
Selector:          <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog
Type:              ClusterIP
IP:                <span class="token number">10.105</span>.146.135
Port:              <span class="token operator">&lt;</span>unset<span class="token operator">></span>  <span class="token number">80</span>/TCP
TargetPort:        <span class="token number">8002</span>/TCP
Endpoints:         <span class="token number">10.244</span>.1.35:8002,10.244.2.32:8002
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>创建 <strong>Service</strong> 时，若配置标签选择 <strong>pod</strong> ，会收集其 <strong>IP</strong>，自动创建同名的 <strong>endpoints</strong> 对象，若 <strong>Pod</strong> 上配置了 <strong>readinessProbe</strong>，检测失败时，<strong>endpoints</strong> 列表会剔除掉对应的 <strong>Pod IP</strong>，这样流量就不会分发到健康检测失败的 <strong>Pod</strong> 上</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> uit get endpoints svc-ublog
NAME        ENDPOINTS                           AGE
svc-ublog   <span class="token number">10.244</span>.1.35:8002,10.244.2.32:8002   21m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p>再次改造 <strong>MySQL</strong>，创建 <strong>Service</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> svc<span class="token punctuation">-</span>mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建并访问</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> svc-mysql.yaml 
service/mysql created

$ kubectl <span class="token parameter variable">-n</span> uit get svc-mysql
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE
svc-mysql   ClusterIP   <span class="token number">10.98</span>.22.166   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">3306</span>/TCP   21s

$ <span class="token function">curl</span> <span class="token number">10.98</span>.22.166:3306
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning">
<p class="custom-container-title">若用 hostNetwork 部署，通过宿主机 ip:port 形式访问，会有如下弊端</p>
<ul>
<li>服务使用 <strong>hostNetwork</strong>，使得宿主机的端口大量暴漏，<strong>存在安全隐患</strong></li>
<li>容易引发端口冲突</li>
</ul>
<p>因此，应该为 <strong>MySQL</strong> 创建 <strong>Service</strong>，并配到 <strong>ublog</strong> 的环境变量中，利用集群服务发现的能力，组件间通过 <strong>Service Name</strong> 访问</p>
</div>
<h3 id="_1-2-服务发现-环境变量去-ip-化" tabindex="-1"><a class="header-anchor" href="#_1-2-服务发现-环境变量去-ip-化" aria-hidden="true">#</a> 1.2 服务发现（<em>环境变量去 IP 化</em> ）</h3>
<p><strong>k8s</strong> 集群中，组件间可以通过 <strong>Service Name</strong> 实现通信，<strong>Pods</strong> 间，无需通过 <strong>固定环境变量 IP</strong> 的形式</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看上文创建的 svc</span>
$ kubectl <span class="token parameter variable">-n</span> uit get svc svc-mysql
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE
svc-mysql   ClusterIP   <span class="token number">10.98</span>.22.166   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">3306</span>/TCP   151m

<span class="token comment"># 访问任意一个业务 pod ublog</span>
$ kubectl <span class="token parameter variable">-n</span> uit <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> ublog-5ff678657f-rk92z /bin/bash

<span class="token comment"># curl cluster ip，可正常连通 MySQL</span>
<span class="token function">curl</span> <span class="token number">10.98</span>.22.166:3306

<span class="token comment"># curl svc-mysql，发现依然可正常连通 MySQL，</span>
<span class="token function">curl</span> svc-mysql:3306
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管 <strong>Pod IP</strong> 和 <strong>Cluster IP</strong> 都不固定（<em><strong>重启会变更</strong></em> ），但 <strong>Service Name</strong> 是固定的，且完全具有跨集群的可移植性，实现原理如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看当前的 DNS 配置，发现有个 10.96.0.10 的 IP</span>
<span class="token function">cat</span> /etc/resolv.conf 
nameserver <span class="token number">10.96</span>.0.10
search uit.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

<span class="token comment"># 退出容器，并查看所有命名空间，发现 kube-system 下有个 kube-dns，它的 IP 刚好同上</span>
$ kubectl get svc --all-namespaces
NAMESPACE              NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>                  AGE
default                kubernetes                  ClusterIP   <span class="token number">10.96</span>.0.1        <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">443</span>/TCP                  23d
kube-system            kube-dns                    ClusterIP   <span class="token number">10.96</span>.0.10       <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">53</span>/UDP,53/TCP,9153/TCP   23d
kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   <span class="token number">10.96</span>.54.184     <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">8000</span>/TCP                 22d
kubernetes-dashboard   kubernetes-dashboard        NodePort    <span class="token number">10.97</span>.63.15      <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">443</span>:30100/TCP            22d
uit                    svc-mysql                   ClusterIP   <span class="token number">10.98</span>.22.166     <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">3306</span>/TCP                 157m
uit                    svc-ublog                   ClusterIP   <span class="token number">10.105</span>.146.135   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">80</span>/TCP                   3h5m

<span class="token comment"># 查看 kube-dns 这个 Service 详情，发现选择器 Selector 选了 k8s-app=kube-dns 这个标签</span>
$ kubectl <span class="token parameter variable">-n</span> kube-system describe svc kube-dns
Name:              kube-dns
Namespace:         kube-system
Labels:            k8s-app<span class="token operator">=</span>kube-dns
                   kubernetes.io/cluster-service<span class="token operator">=</span>true
                   kubernetes.io/name<span class="token operator">=</span>KubeDNS
Annotations:       prometheus.io/port: <span class="token number">9153</span>
                   prometheus.io/scrape: <span class="token boolean">true</span>
Selector:          k8s-app<span class="token operator">=</span>kube-dns
Type:              ClusterIP
IP:                <span class="token number">10.96</span>.0.10
Port:              dns  <span class="token number">53</span>/UDP
TargetPort:        <span class="token number">53</span>/UDP
Endpoints:         <span class="token number">10.244</span>.0.5:53,10.244.0.6:53
Port:              dns-tcp  <span class="token number">53</span>/TCP
TargetPort:        <span class="token number">53</span>/TCP
Endpoints:         <span class="token number">10.244</span>.0.5:53,10.244.0.6:53
Port:              metrics  <span class="token number">9153</span>/TCP
TargetPort:        <span class="token number">9153</span>/TCP
Endpoints:         <span class="token number">10.244</span>.0.5:9153,10.244.0.6:9153
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">></span>

<span class="token comment"># 根据 选择器的标签过滤 找Pod，发现是初始化时的 coredns </span>
$ kubectl <span class="token parameter variable">-n</span> kube-system get po <span class="token parameter variable">-l</span> k8s-app<span class="token operator">=</span>kube-dns <span class="token parameter variable">-owide</span>
NAME                       READY   STATUS    RESTARTS   AGE   IP           NODE             NOMINATED NODE   READINESS GATES
coredns-58cc8c89f4-hzprn   <span class="token number">1</span>/1     Running   <span class="token number">1</span>          23d   <span class="token number">10.244</span>.0.5   k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
coredns-58cc8c89f4-vvj77   <span class="token number">1</span>/1     Running   <span class="token number">2</span>          23d   <span class="token number">10.244</span>.0.6   k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>

<span class="token variable"><span class="token variable">`</span>初始化时创建了 coredns 然后建立 kube-dns 这个service（固定IP），后续新建 Pod 便可注入到 DNS 配置中，最终解析的就是 coredns 的 IP, coredns 见 <span class="token number">2.4</span><span class="token variable">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>故容器内部组件间调用，完全可以通过 <strong>Service Name</strong>（类似域名）来解析 <strong>IP</strong> 通信，避免了大量 <strong>IP</strong> 维护的成本，因此再次对部署进行优化改造</p>
<ol>
<li>
<p><strong>MySQL</strong> 去掉 <strong>hostNetwork</strong> 部署，使得服务只暴露在 <strong>k8s</strong> 集群内部网络环境中</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>			<span class="token comment"># 去掉此行 或 改为false</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>configMap</strong> 中的数据库 <strong>HOST</strong> 固定的 <strong>IP</strong> 地址换成 <strong>Service Name</strong>，这样跨环境时，配置内容可保持不变</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">MYSQL_HOST</span><span class="token punctuation">:</span> <span class="token string">"svc-mysql"</span>     <span class="token comment"># 此处替换为上文给 MySQL 创建的 Service</span>
  <span class="token key atrule">MYSQL_PORT</span><span class="token punctuation">:</span> <span class="token string">"3306"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新执行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> configmap.yaml
$ kubectl apply <span class="token parameter variable">-f</span> deploy-mysql.yaml

<span class="token comment"># 也可以删除 configmap 再通过 .txt 重建</span>
$ kubectl <span class="token parameter variable">-n</span> uit delete cm ublog
$ kubectl <span class="token parameter variable">-n</span> uit create configmap ublog --from-env-file<span class="token operator">=</span>configmap.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>同一个 <strong>NameSpace</strong> 下，可以直接通过 <strong>ServiceName</strong> 来进行访问，而跨 <strong>NameSpace</strong> 访问，需要 <strong>ServiceName + 后缀 .namespace</strong> 的方式访问</p>
</div>
<h3 id="_1-3-nodeport-外部访问" tabindex="-1"><a class="header-anchor" href="#_1-3-nodeport-外部访问" aria-hidden="true">#</a> 1.3 NodePort（<em>外部访问</em> ）</h3>
<p><strong>Cluster IP</strong> 为虚拟地址，只能在 <strong>k8s</strong> 集群内部进行访问，集群外部如果访问内部服务，可以配置 <strong>NodePort</strong></p>
<p>若不指定 <strong>NodePort</strong> 端口，则会默认在 <strong>30000-32767（<em>端口号</em> ）</strong> 中随机使用其中一个</p>
<h4 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h4>
<p>通常用于 <strong>临时</strong> 需要访问 <strong>MySQL</strong> 之类的中间件才使用，性能差，<strong>不推荐使用</strong></p>
<ul>
<li><strong>Service</strong> 一旦变多，其性能也随之大幅下降</li>
<li>维护各种端口的成本过高、太复杂，推荐使用 <strong>ingress</strong></li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> svc<span class="token punctuation">-</span>np<span class="token punctuation">-</span>ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">32333</span>				<span class="token comment"># 这里还是手动指定了端口 32333 看效果</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort				<span class="token comment"># 只需将之前的 Cluster IP 改为 NodePort 即可</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建并查看服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建 svc</span>
$ kubectl create <span class="token parameter variable">-f</span> svc-np-ublog.yaml
service/svc-np-ublog created

<span class="token comment"># 查看当前服务</span>
$ kubectl <span class="token parameter variable">-n</span> uit get svc
NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
svc-mysql      ClusterIP   <span class="token number">10.98</span>.22.166     <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">3306</span>/TCP       2d11h
svc-np-ublog   NodePort    <span class="token number">10.107</span>.82.31     <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">80</span>:32543/TCP   4m57s
svc-ublog      ClusterIP   <span class="token number">10.105</span>.146.135   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">80</span>/TCP         2d11h

<span class="token comment"># 查看详情</span>
$ kubectl <span class="token parameter variable">-n</span> uit describe svc svc-np-ublog 
Name:                     svc-np-ublog
Namespace:                uit
Labels:                   <span class="token operator">&lt;</span>none<span class="token operator">></span>
Annotations:              <span class="token operator">&lt;</span>none<span class="token operator">></span>
Selector:                 <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog
Type:                     NodePort
IP:                       <span class="token number">10.107</span>.82.31
Port:                     <span class="token operator">&lt;</span>unset<span class="token operator">></span>  <span class="token number">80</span>/TCP
TargetPort:               <span class="token number">8002</span>/TCP
NodePort:                 <span class="token operator">&lt;</span>unset<span class="token operator">></span>  <span class="token number">32543</span>/TCP
Endpoints:                <span class="token number">10.244</span>.1.35:8002,10.244.2.32:8002
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <span class="token operator">&lt;</span>none<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时发现类型变为 <code v-pre>Type: NodePort</code> ，且多了随机的端口 <code v-pre>NodePort: &lt;unset&gt; 32543/TCP</code>，但 <strong>CLUSTER-IP</strong> 和 <strong>Endpoints</strong> 依然没变</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 故可删除之前的 svc</span>
kubectl delete <span class="token parameter variable">-f</span> svc-ublog.yaml 
<span class="token function">service</span> <span class="token string">"svc-ublog"</span> deleted

<span class="token comment"># 同时发现，集群内每个节点的 NodePort 端口都会进行监听</span>
$ <span class="token function">curl</span> <span class="token number">192.168</span>.3.171:32333/blog/index/
$ <span class="token function">curl</span> <span class="token number">192.168</span>.3.172:32333/blog/index/
$ <span class="token function">curl</span> <span class="token number">192.168</span>.3.173:32333/blog/index/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>k8s</strong> 集群的 <strong>业务 Pod</strong> 变为类似 <strong>高可用</strong> 一样，都能在浏览器上，通过每个节点的 <strong>IP</strong>，对服务进行外部访问（<em>即使该节点未跑对应的业务 Pod</em> ）</p>
<ul>
<li><a href="http://192.168.3.171:32333/blog/index/" target="_blank" rel="noopener noreferrer">http://192.168.3.171:32333/blog/index/<ExternalLinkIcon/></a></li>
<li><a href="http://192.168.3.172:32333/blog/index/" target="_blank" rel="noopener noreferrer">http://192.168.3.172:32333/blog/index/<ExternalLinkIcon/></a></li>
<li><a href="http://192.168.3.173:32333/blog/index/" target="_blank" rel="noopener noreferrer">http://192.168.3.173:32333/blog/index/<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container note">
<p class="custom-container-title">此时会有如下疑惑？</p>
<ol>
<li><strong>NodePort</strong> 的端口监听，是如何转发到对应的 <strong>Pod</strong> 服务的？</li>
<li><strong>CLUSTER-IP</strong> 是  <strong>虚拟 IP</strong>，集群内是如何通过这个 <strong>虚拟 IP</strong> 访问到具体的 <strong>Pod</strong> 服务的？</li>
</ol>
</div>
<h3 id="_1-4-service-实现原理" tabindex="-1"><a class="header-anchor" href="#_1-4-service-实现原理" aria-hidden="true">#</a> 1.4 Service 实现原理</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 32333 端口的监听，看到如下 kube-proxy 在监听</span>
$ <span class="token function">netstat</span> <span class="token parameter variable">-ntpl</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token number">32333</span>
tcp6       <span class="token number">0</span>      <span class="token number">0</span> :::32333                :::*                    LISTEN      <span class="token number">28426</span>/kube-proxy  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="coredns" tabindex="-1"><a class="header-anchor" href="#coredns" aria-hidden="true">#</a> CoreDNS</h4>
<p>用于 <strong>k8s</strong> 集群内部 <strong>Service</strong> 的解析，可以让 <strong>Pod</strong> 把 <strong>Service</strong> 名称解析为 <strong>IP</strong> 地址，然后通过 <strong>IP</strong> 连接到对应的应用上</p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<ul>
<li>
<p><strong>Go</strong> 语言实现的链式插件，<strong>CNCF</strong> 成员，是个高性能、易扩展的 <strong>DNS</strong> 服务端</p>
</li>
<li>
<p>生产环境中，一定要启用多个，应对集群规模</p>
</li>
</ul>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 coredns</span>
$ kubectl <span class="token parameter variable">-n</span> kube-system get po <span class="token parameter variable">-o</span> wide<span class="token operator">|</span><span class="token function">grep</span> dns
coredns-58cc8c89f4-hzprn                 <span class="token number">1</span>/1     Running   <span class="token number">1</span>          28d   <span class="token number">10.244</span>.0.5      k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
coredns-58cc8c89f4-vvj77                 <span class="token number">1</span>/1     Running   <span class="token number">2</span>          28d   <span class="token number">10.244</span>.0.6      k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>

<span class="token comment"># 进入 myblog 的 pod ，查看 DNS解析</span>
$ kubectl <span class="token parameter variable">-n</span> uit <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> ublog-5ff678657f-7qx5z <span class="token function">bash</span>
$ <span class="token function">cat</span> /etc/resolv.conf
nameserver <span class="token number">10.96</span>.0.10
search uit.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

<span class="token comment"># 10.96.0.10 怎么来的， 查看svc 发现有 kube-dns 服务 </span>
<span class="token comment"># .10是默认给 dns用的</span>
$ kubectl <span class="token parameter variable">-n</span> kube-system get svc
NAME       TYPE        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>                  AGE
kube-dns   ClusterIP   <span class="token number">10.96</span>.0.10   <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">53</span>/UDP,53/TCP,9153/TCP   28d

<span class="token comment"># .1 网段是默认给 Kubernetes 用的</span>
$ kubectl get svc
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE
kubernetes   ClusterIP   <span class="token number">10.96</span>.0.1    <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">443</span>/TCP   28d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>启动 <strong>Pod</strong> 的时，会把 <strong>kube-dns</strong> 服务的 <strong>Cluster IP</strong> 地址注入到 <strong>Pod</strong> 的 <strong>resolve</strong> 解析配置中</li>
<li>同时添加对应 <strong>namespace</strong> 的 <strong>search</strong> 域（<em>后面的一连串域名</em> ）</li>
<li>因此通过 <strong>service name 跨命名空间访问</strong> 的话，需要添加对应的 <strong>namespace</strong> 名称
<ul>
<li>如： <code v-pre>service_name.namespace_name</code></li>
</ul>
</li>
</ul>
<h4 id="kube-proxy" tabindex="-1"><a class="header-anchor" href="#kube-proxy" aria-hidden="true">#</a> kube-proxy</h4>
<p><a href="https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>  未来也许会被 <strong>Cilium</strong> 、 <strong>eBPF（<em>机制</em> ）</strong> 原生替代</p>
<p><strong>运行在每个节点上</strong>， 负责 <strong>Pod</strong> 间的 <strong>通信</strong> 和 <strong>负载均衡</strong>，监听 <strong>API Server</strong> 中服务对象的变化，再通过创建流量路由规则来实现网络的转发，有如下模式</p>
<ul>
<li>
<p><s><strong>User space</strong>, 让 Kube-Proxy 在用户空间监听一个端口，所有的 Service 都转发到这个端口，然后 Kube-Proxy 在内部应用层对其进行转发 ， 所有报文都走一遍用户态，性能不高，k8s v1.2版本后废弃</s>。</p>
</li>
<li>
<p><strong>Iptables：</strong> 当前默认模式，<strong>完全由 IPtables 来实现</strong>， 通过各个节点上的 <strong>iptables</strong> 规则来实现 <strong>service</strong> 的负载均衡，但是随着 <strong>service</strong> 数量的增大，<strong>iptables</strong> 模式由于线性查找匹配、全量更新等特点，其性能会显著下降</p>
</li>
<li>
<p><strong>IPVS：</strong> 监听 <strong>Master</strong> 节点 增加和删除 <strong>service</strong> 以及 <strong>endpoint</strong> 的消息，调用 <strong>Netlink</strong> 创建对应 <strong>IPVS</strong> 规则，将流量转发到对应的 <strong>Pod</strong> 上</p>
<ul>
<li>与 <strong>iptables</strong> 同样基于 <strong>Netfilter（<em>iptable内核态的一种实现</em>）</strong>，采用 <strong>hash</strong> 表，因此当 <strong>service</strong> 数量达到一定规模时，<strong>hash</strong> 查表速度快，从而提高 <strong>service</strong> 的服务性能</li>
<li><strong>k8s 1.8</strong> 版本开始引入，<strong>1.11</strong> 版本开始稳定，需要开启宿主机的 <strong>ipvs</strong> 模块</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 客户端工具 查看 配置规则</span>
$ ipvsadm <span class="token parameter variable">-ln</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="iptables-抓包流程" tabindex="-1"><a class="header-anchor" href="#iptables-抓包流程" aria-hidden="true">#</a> <strong>Iptables 抓包流程</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 svc-np-ublog 的 iptables</span>
$ iptables-save  <span class="token operator">|</span><span class="token function">grep</span> svc-np-ublog
<span class="token parameter variable">-A</span> KUBE-NODEPORTS <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"uit/svc-np-ublog:"</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">32333</span> <span class="token parameter variable">-j</span> KUBE-MARK-MASQ
<span class="token parameter variable">-A</span> KUBE-NODEPORTS <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"uit/svc-np-ublog:"</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">32333</span> <span class="token parameter variable">-j</span> KUBE-SVC-FQQJWIJEBH5A6SF6
<span class="token parameter variable">-A</span> KUBE-SERVICES <span class="token operator">!</span> <span class="token parameter variable">-s</span> <span class="token number">10.244</span>.0.0/16 <span class="token parameter variable">-d</span> <span class="token number">10.107</span>.82.31/32 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"uit/svc-np-ublog: cluster IP"</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> KUBE-MARK-MASQ
<span class="token parameter variable">-A</span> KUBE-SERVICES <span class="token parameter variable">-d</span> <span class="token number">10.107</span>.82.31/32 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"uit/svc-np-ublog: cluster IP"</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> KUBE-SVC-FQQJWIJEBH5A6SF6
<span class="token variable"><span class="token variable">`</span>将IP <span class="token number">10.107</span>.82.31 转发到 <span class="token number">80</span>端口，转向 KUBE-SVC-FQQJWIJEBH5A6SF6 这个链<span class="token variable">`</span></span>

<span class="token comment"># 继续抓链</span>
$ iptables-save<span class="token operator">|</span><span class="token function">grep</span> KUBE-SVC-FQQJWIJEBH5A6SF6
:KUBE-SVC-FQQJWIJEBH5A6SF6 - <span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token punctuation">]</span>
<span class="token punctuation">..</span>.
<span class="token parameter variable">-A</span> KUBE-SVC-FQQJWIJEBH5A6SF6 <span class="token parameter variable">-m</span> statistic <span class="token parameter variable">--mode</span> random <span class="token parameter variable">--probability</span> <span class="token number">0.50000000000</span> <span class="token parameter variable">-j</span> KUBE-SEP-U4JA5WF5RRIRERN5
<span class="token parameter variable">-A</span> KUBE-SVC-FQQJWIJEBH5A6SF6 <span class="token parameter variable">-j</span> KUBE-SEP-ME7MACTOWWVFKRBM
<span class="token variable"><span class="token variable">`</span>静态 模式 随机 <span class="token number">50</span>%的可能性 打到 KUBE-SEP-U4JA5WF5RRIRERN5 链上<span class="token variable">`</span></span>

<span class="token comment"># 进一步抓取 KUBE-SEP-U4JA5WF5RRIRERN5</span>
$ iptables-save<span class="token operator">|</span><span class="token function">grep</span> KUBE-SEP-U4JA5WF5RRIRERN5
:KUBE-SEP-U4JA5WF5RRIRERN5 - <span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token punctuation">]</span>
<span class="token parameter variable">-A</span> KUBE-SEP-U4JA5WF5RRIRERN5 <span class="token parameter variable">-s</span> <span class="token number">10.244</span>.1.35/32 <span class="token parameter variable">-j</span> KUBE-MARK-MASQ
<span class="token parameter variable">-A</span> KUBE-SEP-U4JA5WF5RRIRERN5 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.244</span>.1.35:8002
<span class="token parameter variable">-A</span> KUBE-SVC-FQQJWIJEBH5A6SF6 <span class="token parameter variable">-m</span> statistic <span class="token parameter variable">--mode</span> random <span class="token parameter variable">--probability</span> <span class="token number">0.50000000000</span> <span class="token parameter variable">-j</span> KUBE-SEP-U4JA5WF5RRIRERN5
<span class="token variable"><span class="token variable">`</span>此时 DNAT 到了具体的 Pod IP <span class="token number">10.244</span>.1.35:8002 上<span class="token variable">`</span></span>

<span class="token comment"># KUBE-SEP-ME7MACTOWWVFKRBM 也是如此</span>
iptables-save<span class="token operator">|</span><span class="token function">grep</span> KUBE-SEP-ME7MACTOWWVFKRBM
:KUBE-SEP-ME7MACTOWWVFKRBM - <span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token punctuation">]</span>
<span class="token parameter variable">-A</span> KUBE-SEP-ME7MACTOWWVFKRBM <span class="token parameter variable">-s</span> <span class="token number">10.244</span>.2.32/32 <span class="token parameter variable">-j</span> KUBE-MARK-MASQ
<span class="token parameter variable">-A</span> KUBE-SEP-ME7MACTOWWVFKRBM <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.244</span>.2.32:8002
<span class="token parameter variable">-A</span> KUBE-SVC-FQQJWIJEBH5A6SF6 <span class="token parameter variable">-j</span> KUBE-SEP-ME7MACTOWWVFKRBM
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时发现是按照 <strong>Pod</strong> 进行流量分配的，若要 <strong>灰度发布</strong>，做 <strong>流量分配 / 治理</strong> 仍无法实现，需要 <strong>istio</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 重建 pod</span>
$ kubectl <span class="token parameter variable">-n</span> demo delete po mysql-7f747644b8-6npzn

<span class="token comment"># 去掉 taint</span>
$ kubectl taint <span class="token function">node</span> k8s-slave1 smoke-
$ kubectl taint <span class="token function">node</span> k8s-slave2 drunk-

<span class="token comment"># myblog不用动，会自动因健康检测不过而重启</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-endpoints-代理外部应用-代理" tabindex="-1"><a class="header-anchor" href="#_1-5-endpoints-代理外部应用-代理" aria-hidden="true">#</a> 1.5 Endpoints 代理外部应用（<em>代理</em> ）</h3>
<p>经常有需要代理 <strong>k8s</strong> 外部应用的需求，<strong>应用场景如下</strong></p>
<ul>
<li>希望在生产环境上使用固定名称（<em>如：服务名</em> ），而非通过 <strong>IP</strong> 地址去访问外部的中间件服务
<ul>
<li>如: 不希望各团队维护不同 <strong>k8s</strong> 集群时，还维护各种中间件的配置文件，此时可以直接通过 <strong>svc</strong> 反代来统一配置文件</li>
</ul>
</li>
<li>希望 <strong>Service</strong> 指向另一个<strong>NameSpace</strong> 中或 <strong>其他集群</strong> 中的服务
<ul>
<li>比如: <strong>一些外部的存储集群的管理平台</strong> 不去部署于 <strong>k8s</strong> 中，此时也可通过 <strong>k8s</strong> 的服务进行代理</li>
<li>跨命名空间时不想使用 <strong>.namespace</strong> 后缀形式访问（<em>不推荐</em> ）</li>
</ul>
</li>
<li>某个项目正在迁移至 <strong>k8s</strong> 集群，但一部分服务依然在集群外，此时可使用 <strong>Service</strong> 代理至 <strong>k8s</strong> 集群外部的服务（<em>避免迁移重启</em> ）
<ul>
<li>比如：之前 <strong>Web</strong> 通过 <strong>172.16.120.111</strong> 形式访问数据库，<strong>Web</strong> 迁过来改为通过 <strong>Service 代理形式</strong> 访问，再将数据库迁移过来时无需重启 <strong>Web</strong> 服务</li>
</ul>
</li>
</ul>
<h4 id="反代-ip" tabindex="-1"><a class="header-anchor" href="#反代-ip" aria-hidden="true">#</a> 反代 IP</h4>
<p>以代理百度为例，先编写 <strong>svc</strong> 文件</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>$ kubectl -n dev get svc -o yaml > svc-proxy.yaml
$ vim svc-proxy.yaml

----------------------------
apiVersion: v1
kind: Services
metadata:
  label:
    app: svc-poroxy
  name: svc-proxy
  namespace: dev
spce:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: 80
  sessionAffinity: None
  type: ClusterIP

----------------------------

$ kubectl create -f svc-proxy.yaml
$ kubectl -n dev get svc

NAME        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
svc-nignx   ClusterIP   None             &lt;none>        80/TCP    29d
svc-proxy   ClusterIP   10.100.128.239   &lt;none>        80/TCP    11h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时查看 <strong>svc</strong> 可获取自动分配的 <strong>IP</strong>，接下来编写 <strong>endpoints</strong> 来关联代理</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token comment"># 先获取百度目前的IP</span>
$ ping www.baidu.com
<span class="token key attr-name">64 bytes from 14.215.177.38 (14.215.177.38): icmp_seq</span><span class="token punctuation">=</span><span class="token value attr-value">1 ttl=56 time=6.87 ms</span>

<span class="token comment"># 编写 endpoints</span>
$ vim ep-proxy.yaml

----------------------------
apiVersion: v1
kind: Endpoints
metadata:
  label:
    app: svc-poroxy		# 需和 svc 的一致来进行关联
  name: svc-proxy
  namespace: dev
subsets:				# 
- addresses:
  - ip: 14.215.177.38	# 填写代理的IP地址
  ports:
  - name: http
    port: 80
    protocol: TCP		# 协议需和 svc 的一致
    
----------------------------

$ kubectl apply -f ep-proxy.yaml
<span class="token comment">#此时 svc 关联的 ep 已生成，且会随着 svc 的消失而消失</span>
$ kubectl -n dev get ep

<span class="token comment"># curl svc 的 IP 此时发现有相应</span>
$ curl 10.100.128.239 -I
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若更换了 <strong>IP</strong> 无需重启应用程序，只需要改动 <strong>endpoints</strong> 文件的 <code v-pre>ip</code> ，然后 <code v-pre>kubectl replace -f</code> 即可</p>
<h4 id="externalname-反代域名" tabindex="-1"><a class="header-anchor" href="#externalname-反代域名" aria-hidden="true">#</a> ExternalName（<em>反代域名</em> ）</h4>
<p>若需反代域名，则需要更改 <strong>svc</strong> 的类型为 <strong>ExternalName</strong></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>vim svc-proxyName.yaml
----------------------------
apiVersion: v1
kind: Service
metadata:
  labels:
    app: svc-proxy-name
  name: svc-proxy-name
  namespace: dev
spec:
  type: ExternalName
  externalName: www.baidu.com
----------------------------
$ kubectl apply -f svc-proxyName.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时进入 <strong>busybox</strong> 中尝试通过代理的服务名访问</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-ndev</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> busybox -- <span class="token function">sh</span>

<span class="token comment"># 通过代理的域名请求资源，访问不通是由于跨域造成的</span>
$ <span class="token function">wget</span> svc-proxy-name
Connecting to svc-proxy-name <span class="token punctuation">(</span><span class="token number">14.215</span>.177.38:80<span class="token punctuation">)</span>
wget: server returned error: HTTP/1.1 <span class="token number">403</span> Forbidden

<span class="token comment"># 域名解析</span>
$ <span class="token function">nslookup</span> svc-proxy-name
Server:    <span class="token number">10.96</span>.0.10
Address <span class="token number">1</span>: <span class="token number">10.96</span>.0.10 kube-dns.kube-system.svc.cluster.local

Name:      svc-proxy-name
Address <span class="token number">1</span>: <span class="token number">14.215</span>.177.38
Address <span class="token number">2</span>: <span class="token number">14.215</span>.177.39

<span class="token comment"># 直接请求，则可通过</span>
$ <span class="token function">wget</span> <span class="token number">14.215</span>.177.38
Connecting to <span class="token number">14.215</span>.177.38 <span class="token punctuation">(</span><span class="token number">14.215</span>.177.38:80<span class="token punctuation">)</span>
index.html           <span class="token number">100</span>% <span class="token operator">|</span>*****************************<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于跨域问题，该场景使用较少</p>
<h2 id="_2-ingress-流量路由" tabindex="-1"><a class="header-anchor" href="#_2-ingress-流量路由" aria-hidden="true">#</a> 2. Ingress（<em>流量路由</em> ）</h2>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<p>同 <strong>k8s</strong> 的资源类型，对于 <strong>k8s</strong> 的 <strong>Service</strong>，无论是 <strong>Cluster IP</strong> 还是 <strong>NodePort</strong>，都是 <strong>四层负载</strong>，要让集群内的服务实现 <strong>七层负载均衡</strong>，要借助于 <strong>Ingress</strong></p>
<ul>
<li><strong>Ingress 控制器：</strong> 其实现方式很多，比如 <strong>Nginx</strong>, <strong>Contour</strong>, <strong>Haproxy</strong>, <strong>trafik</strong>, <strong>Istio</strong>，后续 <strong>Nginx</strong> 实现为例</li>
<li><strong>发布方式：</strong>
<ul>
<li>它既可以实现 <strong>端口</strong> 的方式，同时可以实现 <strong>域名</strong> 的方式访问 <strong>k8s</strong> 内部应用</li>
<li>通常内部通过域名，反代到业务节点，<strong>ingress</strong> 上层可能还有 <strong>F5</strong>，<strong>LVS</strong>，<strong>SLB</strong>，<strong>ELB</strong> 等作为入口再反代到<strong>ingress</strong> 上，然后 <strong>将购买的 域名 解析到 F5、阿里云等LB上</strong></li>
<li>由于是 <strong>k8s</strong> 中通过 <strong>IPVS</strong> 实现的一种 <strong>内核级</strong> 的转发，因此还是很快的，今后可能还使用 <strong>EBPF</strong> 等东西，速度更快</li>
</ul>
</li>
</ul>
<h3 id="_2-1-ingress-nginx" tabindex="-1"><a class="header-anchor" href="#_2-1-ingress-nginx" aria-hidden="true">#</a> 2.1 Ingress-nginx</h3>
<p>是 <strong>k8s</strong> 官方维护的控制器（<em>同步更新</em> ）<a href="https://kubernetes.github.io/ingress-nginx/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<p><strong>Ingress-nginx</strong> 是 <strong>7 层的负载均衡器</strong> ，负责统一管理外部对 <strong>k8s cluster</strong> 中 <strong>Service</strong> 的请求，包含如下</p>
<ul>
<li><strong>ingress-nginx-controller：</strong> 根据用户编写的 <strong>ingress</strong> 规则（<em>创建的 ingress 的 yaml 文件</em> ），动态的去更改<strong>nginx</strong> 服务的配置文件，并且 <strong>reload</strong> 重载使其生效（<em>是自动化的，通过 lua 脚本来实现</em> ）</li>
<li><strong>ingress资源对象：</strong> 将 <strong>Nginx</strong> 的配置抽象成一个 <strong>Ingress</strong> 对象，每添加一个新的 <strong>Service</strong> 资源对象只需写一个新的 <strong>Ingress</strong> 规则的 <strong>yaml</strong> 文件即可（<em>或修改已存在的 ingress 规则的 yaml 文件</em> ）</li>
</ul>
<h6 id="示意图" tabindex="-1"><a class="header-anchor" href="#示意图" aria-hidden="true">#</a> 示意图：</h6>
<h6 id="实现逻辑" tabindex="-1"><a class="header-anchor" href="#实现逻辑" aria-hidden="true">#</a> 实现逻辑</h6>
<p>1）ingress controller通过和kubernetes api交互，动态的去感知集群中ingress规则变化
2）然后读取ingress规则(规则就是写明了哪个域名对应哪个service)，按照自定义的规则，生成一段nginx配置
3）再写到nginx-ingress-controller的pod里，这个Ingress controller的pod里运行着一个Nginx服务，控制器把生成的nginx配置写入/etc/nginx.conf文件中
4）然后reload一下使配置生效。以此达到域名分别配置和动态更新的问题。</p>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<p><a href="https://kubernetes.github.io/ingress-nginx/deploy/" target="_blank" rel="noopener noreferrer">ingress-nginx 官方文档<ExternalLinkIcon/></a> ，推荐使用 <strong>Helm</strong> 安装</p>
<h4 id="安装-helm" tabindex="-1"><a class="header-anchor" href="#安装-helm" aria-hidden="true">#</a> 安装 helm</h4>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ wget https:<span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com/kubernetes/ingress-nginx/nginx-0<span class="token punctuation">.</span>30<span class="token punctuation">.</span>0/deploy/static/mandatory<span class="token punctuation">.</span>yaml
<span class="token comment">## 或者使用myblog/deployment/ingress/mandatory.yaml</span>
<span class="token comment">## 修改部署节点</span>
$ grep <span class="token operator">-</span>n5 nodeSelector mandatory<span class="token punctuation">.</span>yaml
212- spec:
213- hostNetwork: true <span class="token comment">#添加为host模式</span>
214- <span class="token comment"># wait up to five minutes for the drain of connections</span>
215- terminationGracePeriodSeconds: 300
216- serviceAccountName: nginx-ingress-serviceaccount
217: nodeSelector:
218- ingress: <span class="token string">"true"</span> <span class="token comment">#替换此处，来决定将ingress部署在哪些机器</span>
219- containers:
220- <span class="token operator">-</span> name: nginx-ingress-controller
221- image: quay<span class="token punctuation">.</span>io/kubernetes-ingress-controller/nginx-ingress-controller:0<span class="token punctuation">.</span>30<span class="token punctuation">.</span>0
222- args:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用示例：<code v-pre>myblog/deployment/ingress.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> myblog.devops.cn
<span class="token key atrule">http</span><span class="token punctuation">:</span>
<span class="token key atrule">paths</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
<span class="token key atrule">backend</span><span class="token punctuation">:</span>
<span class="token key atrule">serviceName</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ingress-nginx动态生成upstream配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
server_name myblog.devops.cn ;

listen 80 ;
listen <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>80 ;
listen 443 ssl http2 ;
listen <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>443 ssl http2 ;

set $proxy_upstream_name "<span class="token punctuation">-</span>";

ssl_certificate_by_lua_block <span class="token punctuation">{</span>
certificate.call()
<span class="token punctuation">}</span>

location / <span class="token punctuation">{</span>

set $namespace "demo";
set $ingress_name "myblog";
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="访问" tabindex="-1"><a class="header-anchor" href="#访问" aria-hidden="true">#</a> 访问</h6>
<p>域名解析服务，将 <code v-pre>myblog.devops.cn</code>解析到ingress的地址上。ingress是支持多副本的，高可用的情况下，生产的配置是使用lb服务（内网F5设备，公网elb、slb、clb，解析到各ingress的机器，如何域名指向lb地址）</p>
<p>本机，添加如下hosts记录来演示效果。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token number">192.168</span>.<span class="token number">136.128</span> myblog.devops.cn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，访问 <a href="http://myblog.devops.cn/blog/index/" target="_blank" rel="noopener noreferrer">http://myblog.devops.cn/blog/index/<ExternalLinkIcon/></a></p>
<p>HTTPS访问：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">#自签名证书</span>
$ openssl req <span class="token operator">-</span>x509 <span class="token operator">-</span>nodes <span class="token operator">-</span>days 2920 <span class="token operator">-</span>newkey rsa:2048 <span class="token operator">-</span>keyout tls<span class="token punctuation">.</span>key <span class="token operator">-</span>out tls<span class="token punctuation">.</span>crt <span class="token operator">-</span>subj <span class="token string">"/CN=*.devops.cn/O=ingress-nginx"</span>

<span class="token comment"># 证书信息保存到secret对象中，ingress-nginx会读取secret对象解析出证书加载到nginx配置中</span>
$ kubectl <span class="token operator">-</span>n demo create secret tls https-secret <span class="token operator">--</span>key tls<span class="token punctuation">.</span>key <span class="token operator">--</span>cert tls<span class="token punctuation">.</span>crt
secret/https-secret created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改yaml</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog<span class="token punctuation">-</span>tls
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> myblog.devops.cn
<span class="token key atrule">http</span><span class="token punctuation">:</span>
<span class="token key atrule">paths</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
<span class="token key atrule">backend</span><span class="token punctuation">:</span>
<span class="token key atrule">serviceName</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">tls</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> myblog.devops.cn
<span class="token key atrule">secretName</span><span class="token punctuation">:</span> https<span class="token punctuation">-</span>secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，访问 <a href="https://myblog.devops.cn/blog/index/" target="_blank" rel="noopener noreferrer">https://myblog.devops.cn/blog/index/<ExternalLinkIcon/></a></p>
</div></template>


