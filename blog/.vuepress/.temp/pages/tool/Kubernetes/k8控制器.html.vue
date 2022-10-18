<template><div><p><strong>k8s</strong> 的控制器等</p>
<!-- more -->
<h1 id="kubernetes基础" tabindex="-1"><a class="header-anchor" href="#kubernetes基础" aria-hidden="true">#</a> Kubernetes基础</h1>
<h2 id="_1-控制器" tabindex="-1"><a class="header-anchor" href="#_1-控制器" aria-hidden="true">#</a> 1. 控制器</h2>
<h3 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment">#指定Pod副本数</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#指定Pod的选择器</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">template</span><span class="token punctuation">:</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#给Pod打label</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 声明pod的网络模式为host模式，效果通docker run --net=host</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span> <span class="token comment"># 使用节点选择器将Pod调度到指定label的节点</span>
<span class="token key atrule">component</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.15<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span>5.7<span class="token punctuation">-</span>utf8
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_USER
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_USER
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_DATABASE
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"myblog"</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token key atrule">requests</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
<span class="token key atrule">limits</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
<span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
<span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
<span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
<span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
<span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>
<span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
<span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>deploy-myblog.yaml:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment">#指定Pod副本数</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#指定Pod的选择器</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">template</span><span class="token punctuation">:</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#给Pod打label</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.15<span class="token punctuation">:</span>5000/myblog
<span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_HOST
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PORT
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PORT
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_USER
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_USER
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token key atrule">requests</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
<span class="token key atrule">limits</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
<span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
<span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
<span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># 容器启动后第一次执行探测是需要等待多少秒</span>
<span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span> <span class="token comment"># 执行探测的频率</span>
<span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment"># 探测超时时间</span>
<span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
<span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
<span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
<span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
<span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="创建deployment" tabindex="-1"><a class="header-anchor" href="#创建deployment" aria-hidden="true">#</a> 创建Deployment</h6>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f deploy<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="查看deployment" tabindex="-1"><a class="header-anchor" href="#查看deployment" aria-hidden="true">#</a> 查看Deployment</h6>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment"># kubectl api-resources</span>
$ kubectl <span class="token operator">-</span>n demo get deploy
NAME READY UP-TO-DATE AVAILABLE AGE
myblog 1/1 1 1 2m22s
mysql 1/1 1 1 2d11h

<span class="token operator">*</span> `NAME` 列出了集群中 Deployments 的名称。
<span class="token operator">*</span> `READY`显示当前正在运行的副本数<span class="token operator">/</span>期望的副本数。
<span class="token operator">*</span> `UP-TO-DATE`显示已更新以实现期望状态的副本数。
<span class="token operator">*</span> `AVAILABLE`显示应用程序可供用户使用的副本数。
<span class="token operator">*</span> `AGE` 显示应用程序运行的时间量。

<span class="token comment"># 查看pod</span>
$ kubectl <span class="token operator">-</span>n demo get po
NAME READY STATUS RESTARTS AGE
myblog-7c96c9f76b-qbbg7 1/1 Running 0 109s
mysql-85f4f65f99-w6jkj 1/1 Running 0 2m28s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="副本保障机制" tabindex="-1"><a class="header-anchor" href="#副本保障机制" aria-hidden="true">#</a> 副本保障机制</h6>
<p>controller实时检测pod状态，并保障副本数一直处于期望的值。</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 删除pod，观察pod状态变化</span>
$ kubectl <span class="token operator">-</span>n demo delete pod myblog-7c96c9f76b-qbbg7

<span class="token comment"># 观察pod</span>
$ kubectl get pods <span class="token operator">-</span>o wide

<span class="token comment">## 设置两个副本, 或者通过kubectl -n demo edit deploy myblog的方式，最好通过修改文件，然后apply的方式，这样yaml文件可以保持同步</span>
$ kubectl <span class="token operator">-</span>n demo scale deploy myblog <span class="token operator">--</span>replicas=2
deployment<span class="token punctuation">.</span>extensions/myblog scaled

<span class="token comment"># 观察pod</span>
$ kubectl get pods <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE
myblog-7c96c9f76b-qbbg7 1/1 Running 0 11m
myblog-7c96c9f76b-s6brm 1/1 Running 0 55s
mysql-85f4f65f99-w6jkj 1/1 Running 0 11m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="pod驱逐策略" tabindex="-1"><a class="header-anchor" href="#pod驱逐策略" aria-hidden="true">#</a> Pod驱逐策略</h6>
<p>K8S 有个特色功能叫 pod eviction，它在某些场景下如节点 NotReady，或者资源不足时，把 pod 驱逐至其它节点，这也是出于业务保护的角度去考虑的。</p>
<ol>
<li>Kube-controller-manager: 周期性检查所有节点状态，当节点处于 NotReady 状态超过一段时间后，驱逐该节点上所有 pod。停掉kubelet</li>
</ol>
<ul>
<li><code v-pre>pod-eviction-timeout</code>：NotReady 状态节点超过该时间后，执行驱逐，默认 5 min</li>
</ul>
<ol start="2">
<li>Kubelet: 周期性检查本节点资源，当资源不足时，按照优先级驱逐部分 pod</li>
</ol>
<ul>
<li><code v-pre>memory.available</code>：节点可用内存</li>
<li><code v-pre>nodefs.available</code>：节点根盘可用存储空间</li>
<li><code v-pre>nodefs.inodesFree</code>：节点inodes可用数量</li>
<li><code v-pre>imagefs.available</code>：镜像存储盘的可用空间</li>
<li><code v-pre>imagefs.inodesFree</code>：镜像存储盘的inodes可用数量</li>
</ul>
<h6 id="服务更新" tabindex="-1"><a class="header-anchor" href="#服务更新" aria-hidden="true">#</a> 服务更新</h6>
<p>修改dockerfile，重新打tag模拟服务更新。</p>
<p>更新方式：</p>
<ul>
<li>修改yaml文件，使用<code v-pre>kubectl -n demo apply -f deploy-myblog.yaml</code>来应用更新</li>
<li><code v-pre>kubectl -n demo edit deploy myblog</code>在线更新</li>
<li><code v-pre>kubectl set image deploy myblog myblog=172.21.32.6:5000/myblog:v2 --record</code></li>
</ul>
<p>修改文件测试：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ vi mybolg/blog/template/index<span class="token punctuation">.</span>html

$ docker build <span class="token punctuation">.</span> <span class="token operator">-</span>t 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/myblog:v2 <span class="token operator">-</span>f Dockerfile_optimized
$ docker push 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/myblog:v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="更新策略" tabindex="-1"><a class="header-anchor" href="#更新策略" aria-hidden="true">#</a> 更新策略</h6>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment">#指定Pod副本数</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#指定Pod的选择器</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">strategy</span><span class="token punctuation">:</span>
<span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
<span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> 25%
<span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> 25%
<span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate <span class="token comment">#指定更新方式为滚动更新，默认策略，通过get deploy yaml查看</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>策略控制：</p>
<ul>
<li>maxSurge：最大激增数, 指更新过程中, 最多可以比replicas预先设定值多出的pod数量, 可以为固定值或百分比,默认为desired Pods数的25%。计算时向上取整(比如3.4，取4)，更新过程中最多会有replicas + maxSurge个pod</li>
<li>maxUnavailable： 指更新过程中, 最多有几个pod处于无法服务状态 , 可以为固定值或百分比，默认为desired Pods数的25%。计算时向下取整(比如3.6，取3)</li>
</ul>
<p><em>在Deployment rollout时，需要保证Available(Ready) Pods数不低于 desired pods number - maxUnavailable; 保证所有的非异常状态Pods数不多于 desired pods number + maxSurge</em>。</p>
<p>以myblog为例，使用默认的策略，更新过程:</p>
<ol>
<li>maxSurge 25%，2个实例，向上取整，则maxSurge为1，意味着最多可以有2+1=3个Pod，那么此时会新创建1个ReplicaSet，RS-new，把副本数置为1，此时呢，副本控制器就去创建这个新的Pod</li>
<li>同时，maxUnavailable是25%，副本数2*25%，向下取整，则为0，意味着，滚动更新的过程中，不能有少于2个可用的Pod，因此，旧的Replica（RS-old）会先保持不动，等RS-new管理的Pod状态Ready后，此时已经有3个Ready状态的Pod了，那么由于只要保证有2个可用的Pod即可，因此，RS-old的副本数会有2个变成1个，此时，会删掉一个旧的Pod</li>
<li>删掉旧的Pod的时候，由于总的Pod数量又变成2个了，因此，距离最大的3个还有1个Pod可以创建，所以，RS-new把管理的副本数由1改成2，此时又会创建1个新的Pod，等RS-new管理了2个Pod都ready后，那么就可以把RS-old的副本数由1置为0了，这样就完成了滚动更新</li>
</ol>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">#查看滚动更新事件</span>
$ kubectl <span class="token operator">-</span>n demo describe deploy myblog
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
Events:
<span class="token function">Type</span> Reason Age <span class="token keyword">From</span> Message
<span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
Normal ScalingReplicaSet 11s deployment-controller Scaled up replica <span class="token function">set</span> myblog-6cf56fc848 to 1
Normal ScalingReplicaSet 11s deployment-controller Scaled down replica <span class="token function">set</span> myblog-6fdcf98f9 to 1
Normal ScalingReplicaSet 11s deployment-controller Scaled up replica <span class="token function">set</span> myblog-6cf56fc848 to 2
Normal ScalingReplicaSet 6s deployment-controller Scaled down replica <span class="token function">set</span> myblog-6fdcf98f9 to 0
$ kubectl get rs
NAME DESIRED CURRENT READY AGE
myblog-6cf56fc848 2 2 2 16h
myblog-6fdcf98f9 0 0 0 16h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="服务回滚" tabindex="-1"><a class="header-anchor" href="#服务回滚" aria-hidden="true">#</a> 服务回滚</h6>
<p>通过滚动升级的策略可以平滑的升级Deployment，若升级出现问题，需要最快且最好的方式回退到上一次能够提供正常工作的版本。为此K8S提供了回滚机制。</p>
<p><strong>revision</strong>：更新应用时，K8S都会记录当前的版本号，即为revision，当升级出现问题时，可通过回滚到某个特定的revision，默认配置下，K8S只会保留最近的几个revision，可以通过Deployment配置文件中的spec.revisionHistoryLimit属性增加revision数量，默认是10。</p>
<p>查看当前：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n demo rollout history deploy myblog <span class="token comment">##CHANGE-CAUSE为空</span>
$ kubectl delete <span class="token operator">-</span>f deploy-myblog<span class="token punctuation">.</span>yaml <span class="token comment">## 方便演示到具体效果，删掉已有deployment</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>记录回滚：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f deploy-myblog<span class="token punctuation">.</span>yaml <span class="token operator">--</span>record

$ kubectl <span class="token operator">-</span>n demo <span class="token function">set</span> image deploy myblog myblog=172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/myblog:v2 <span class="token operator">--</span>record=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看deployment更新历史：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n demo rollout history deploy myblog
deployment<span class="token punctuation">.</span>extensions/myblog
REVISION CHANGE-CAUSE
1 kubectl create <span class="token operator">--</span>filename=deploy-myblog<span class="token punctuation">.</span>yaml <span class="token operator">--</span>record=true
2 kubectl <span class="token function">set</span> image deploy myblog myblog=172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/demo/myblog:v1 <span class="token operator">--</span>record=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回滚到具体的REVISION:</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n demo rollout undo deploy myblog <span class="token operator">--</span>to-revision=1
deployment<span class="token punctuation">.</span>extensions/myblog rolled back

<span class="token comment"># 访问应用测试</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kubernetes调度-录屏" tabindex="-1"><a class="header-anchor" href="#kubernetes调度-录屏" aria-hidden="true">#</a> Kubernetes调度 录屏！！！</h5>
<h6 id="为何要控制pod应该如何调度" tabindex="-1"><a class="header-anchor" href="#为何要控制pod应该如何调度" aria-hidden="true">#</a> 为何要控制Pod应该如何调度</h6>
<ul>
<li>集群中有些机器的配置高（SSD，更好的内存等），我们希望核心的服务（比如说数据库）运行在上面</li>
<li>某两个服务的网络传输很频繁，我们希望它们最好在同一台机器上</li>
<li>......</li>
</ul>
<h6 id="nodeselector" tabindex="-1"><a class="header-anchor" href="#nodeselector" aria-hidden="true">#</a> NodeSelector</h6>
<p><code v-pre>label</code>是<code v-pre>kubernetes</code>中一个非常重要的概念，用户可以非常灵活的利用 label 来管理集群中的资源，POD 的调度可以根据节点的 label 进行特定的部署。</p>
<p>查看节点的label：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl get nodes <span class="token operator">--</span><span class="token function">show-labels</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为节点打label：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl label node k8s-master disktype=ssd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当 node 被打上了相关标签后，在调度的时候就可以使用这些标签了，只需要在spec 字段中添加<code v-pre>nodeSelector</code>字段，里面是我们需要被调度的节点的 label。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 声明pod的网络模式为host模式，效果通docker run --net=host</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span> <span class="token comment"># 使用节点选择器将Pod调度到指定label的节点</span>
<span class="token key atrule">component</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/demo/mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="nodeaffinity" tabindex="-1"><a class="header-anchor" href="#nodeaffinity" aria-hidden="true">#</a> nodeAffinity</h6>
<p>节点亲和性 ， 比上面的<code v-pre>nodeSelector</code>更加灵活，它可以进行一些简单的逻辑组合，不只是简单的相等匹配 。分为两种，软策略和硬策略。</p>
<p>preferredDuringSchedulingIgnoredDuringExecution：软策略，如果你没有满足调度要求的节点的话，Pod就会忽略这条规则，继续完成调度过程，说白了就是满足条件最好了，没有满足就忽略掉的策略。</p>
<p>requiredDuringSchedulingIgnoredDuringExecution ： 硬策略，如果没有满足条件的节点的话，就不断重试直到满足条件为止，简单说就是你必须满足我的要求，不然我就不会调度Pod。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">#要求 Pod 不能运行在128和132两个节点上，如果有个节点满足disktype=ssd的话就优先调度到这个节点上</span>
<span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> demo
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/demo/myblog
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">affinity</span><span class="token punctuation">:</span>
<span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
<span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
<span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> kubernetes.io/hostname
<span class="token key atrule">operator</span><span class="token punctuation">:</span> NotIn
<span class="token key atrule">values</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> 192.168.136.128
<span class="token punctuation">-</span> 192.168.136.132
<span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token key atrule">preference</span><span class="token punctuation">:</span>
<span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> disktype
<span class="token key atrule">operator</span><span class="token punctuation">:</span> In
<span class="token key atrule">values</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> ssd
<span class="token punctuation">-</span> sas
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的匹配逻辑是 label 的值在某个列表中，现在<code v-pre>Kubernetes</code>提供的操作符有下面的几种：</p>
<ul>
<li>In：label 的值在某个列表中</li>
<li>NotIn：label 的值不在某个列表中</li>
<li>Gt：label 的值大于某个值</li>
<li>Lt：label 的值小于某个值</li>
<li>Exists：某个 label 存在</li>
<li>DoesNotExist：某个 label 不存在</li>
</ul>
<p><em>如果nodeSelectorTerms下面有多个选项的话，满足任何一个条件就可以了；如果matchExpressions有多个选项的话，则必须同时满足这些条件才能正常调度 Pod</em></p>
<h6 id="污点-taints-与容忍-tolerations" tabindex="-1"><a class="header-anchor" href="#污点-taints-与容忍-tolerations" aria-hidden="true">#</a> 污点（Taints）与容忍（tolerations）</h6>
<p>对于<code v-pre>nodeAffinity</code>无论是硬策略还是软策略方式，都是调度 Pod 到预期节点上，而<code v-pre>Taints</code>恰好与之相反，如果一个节点标记为 Taints ，除非 Pod 也被标识为可以容忍污点节点，否则该 Taints 节点不会被调度Pod。</p>
<p>Taints(污点)是Node的一个属性，设置了Taints(污点)后，因为有了污点，所以Kubernetes是不会将Pod调度到这个Node上的。于是Kubernetes就给Pod设置了个属性Tolerations(容忍)，只要Pod能够容忍Node上的污点，那么Kubernetes就会忽略Node上的污点，就能够(不是必须)把Pod调度过去。</p>
<p>比如用户希望把 Master 节点保留给 Kubernetes 系统组件使用，或者把一组具有特殊资源预留给某些 Pod，则污点就很有用了，Pod 不会再被调度到 taint 标记过的节点。taint 标记节点举例如下：</p>
<p>设置污点：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl taint node <span class="token namespace">[node_name]</span> key=value:<span class="token namespace">[effect]</span>
其中<span class="token namespace">[effect]</span> 可取值： <span class="token punctuation">[</span> NoSchedule <span class="token punctuation">|</span> PreferNoSchedule <span class="token punctuation">|</span> NoExecute <span class="token punctuation">]</span>
NoSchedule：一定不能被调度。
PreferNoSchedule：尽量不要调度。
NoExecute：不仅不会调度，还会驱逐Node上已有的Pod。
示例：kubectl taint node k8s-master smoke=true:NoSchedule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>去除污点：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>去除指定key及其effect：
kubectl taint nodes <span class="token namespace">[node_name]</span> key:<span class="token namespace">[effect]</span><span class="token operator">-</span> <span class="token comment">#这里的key不用指定value</span>

去除指定key所有的effect:
kubectl taint nodes node_name key-

示例：
kubectl taint node k8s-master smoke=true:NoSchedule
kubectl taint node k8s-master smoke:NoExecute-
kubectl taint node k8s-master smoke-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>污点演示：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 给k8s-slave1打上污点，smoke=true:NoSchedule</span>
$ kubectl taint node k8s-slave1 smoke=true:NoSchedule
$ kubectl taint node k8s-slave2 drunk=true:NoSchedule


<span class="token comment">## 扩容myblog的Pod，观察新Pod的调度情况</span>
$ kuebctl <span class="token operator">-</span>n demo scale deploy myblog <span class="token operator">--</span>replicas=3
$ kubectl <span class="token operator">-</span>n demo get po <span class="token operator">-</span>w <span class="token comment">## pending</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Pod容忍污点示例：<code v-pre>myblog/deployment/deploy-myblog-taint.yaml</code></p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
spec:
containers:
<span class="token operator">-</span> name: demo
image: 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/demo/myblog
tolerations: <span class="token comment">#设置容忍性</span>
<span class="token operator">-</span> key: <span class="token string">"smoke"</span>
operator: <span class="token string">"Equal"</span> <span class="token comment">#如果操作符为Exists，那么value属性可省略,不指定operator，默认为Equal</span>
value: <span class="token string">"true"</span>
effect: <span class="token string">"NoSchedule"</span>
<span class="token operator">-</span> key: <span class="token string">"drunk"</span>
operator: <span class="token string">"Equal"</span> <span class="token comment">#如果操作符为Exists，那么value属性可省略,不指定operator，默认为Equal</span>
value: <span class="token string">"true"</span>
effect: <span class="token string">"NoSchedule"</span>
<span class="token comment">#意思是这个Pod要容忍的有污点的Node的key是smoke Equal true,效果是NoSchedule，</span>
<span class="token comment">#tolerations属性下各值必须使用引号，容忍的值都是设置Node的taints时给的值。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl apply <span class="token operator">-</span>f deploy-myblog-taint<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>spec:
containers:
<span class="token operator">-</span> name: demo
image: 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/demo/myblog
tolerations:
<span class="token operator">-</span> operator: <span class="token string">"Exists"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kubernetes服务访问之service-录屏" tabindex="-1"><a class="header-anchor" href="#kubernetes服务访问之service-录屏" aria-hidden="true">#</a> Kubernetes服务访问之Service 录屏！！！</h5>
<p>通过以前的学习，我们已经能够通过Deployment来创建一组Pod来提供具有高可用性的服务。虽然每个Pod都会分配一个单独的Pod IP，然而却存在如下两个问题：</p>
<ul>
<li>Pod IP仅仅是集群内可见的虚拟IP，外部无法访问。</li>
<li>Pod IP会随着Pod的销毁而消失，当ReplicaSet对Pod进行动态伸缩时，Pod IP可能随时随地都会变化，这样对于我们访问这个服务带来了难度。</li>
</ul>
<h6 id="service-负载均衡之cluster-ip" tabindex="-1"><a class="header-anchor" href="#service-负载均衡之cluster-ip" aria-hidden="true">#</a> Service 负载均衡之Cluster IP</h6>
<p>service是一组pod的服务抽象，相当于一组pod的LB，负责将请求分发给对应的pod。service会为这个LB提供一个IP，一般称为cluster IP 。使用Service对象，通过selector进行标签选择，找到对应的Pod:</p>
<p><code v-pre>myblog/deployment/svc-myblog.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
<span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>操作演示：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 别名</span>
$ alias kd=<span class="token string">'kubectl -n demo'</span>

<span class="token comment">## 创建服务</span>
$ kd create <span class="token operator">-</span>f svc-myblog<span class="token punctuation">.</span>yaml
$ kd get po <span class="token operator">--</span><span class="token function">show-labels</span>
NAME READY STATUS RESTARTS AGE LABELS
myblog-5c97d79cdb-jn7km 1/1 Running 0 6m5s app=myblog
mysql-85f4f65f99-w6jkj 1/1 Running 0 176m app=mysql

$ kd get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
myblog ClusterIP 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93 &lt;none> 80/TCP 7m50s

$ kd describe svc myblog
Name: myblog
Namespace: demo
Labels: &lt;none>
Annotations: &lt;none>
Selector: app=myblog
<span class="token function">Type</span>: ClusterIP
IP: 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93
Port: &lt;unset> 80/TCP
TargetPort: 8002/TCP
Endpoints: 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>68:8002
Session Affinity: None
Events: &lt;none>

<span class="token comment">## 扩容myblog服务</span>
$ kd scale deploy myblog <span class="token operator">--</span>replicas=2
deployment<span class="token punctuation">.</span>extensions/myblog scaled

<span class="token comment">## 再次查看</span>
$ kd describe svc myblog
Name: myblog
Namespace: demo
Labels: &lt;none>
Annotations: &lt;none>
Selector: app=myblog
<span class="token function">Type</span>: ClusterIP
IP: 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93
Port: &lt;unset> 80/TCP
TargetPort: 8002/TCP
Endpoints: 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>68:8002<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>158:8002
Session Affinity: None
Events: &lt;none>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Service与Pod如何关联:</p>
<p>service对象创建的同时，会创建同名的endpoints对象，若服务设置了readinessProbe, 当readinessProbe检测失败时，endpoints列表中会剔除掉对应的pod_ip，这样流量就不会分发到健康检测失败的Pod中</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kd get endpoints myblog
NAME ENDPOINTS AGE
myblog 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>68:8002<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>158:8002 7m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Service Cluster-IP如何访问:</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kd get svc myblog
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
myblog ClusterIP 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93 &lt;none> 80/TCP 13m
$ curl 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93/blog/index/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为mysql服务创建service：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
<span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问mysql：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kd get svc mysql
mysql ClusterIP 10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84 &lt;none> 3306/TCP 3s
$ curl 10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84:3306
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目前使用hostNetwork部署，通过宿主机ip+port访问，弊端：</p>
<ul>
<li>服务使用hostNetwork，使得宿主机的端口大量暴漏，存在安全隐患</li>
<li>容易引发端口冲突</li>
</ul>
<p>服务均属于k8s集群，尽可能使用k8s的网络访问，因此可以对目前myblog访问mysql的方式做改造：</p>
<ul>
<li>为mysql创建一个固定clusterIp的Service，把clusterIp配置在myblog的环境变量中</li>
<li>利用集群服务发现的能力，组件之间通过service name来访问</li>
</ul>
<h6 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h6>
<p>在k8s集群中，组件之间可以通过定义的Service名称实现通信。</p>
<p>演示服务发现：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 演示思路：在myblog的容器中直接通过service名称访问服务，观察是否可以访问通</span>

<span class="token comment"># 先查看服务</span>
$ kd get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
myblog ClusterIP 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93 &lt;none> 80/TCP 59m
mysql ClusterIP 10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84 &lt;none> 3306/TCP 35m

<span class="token comment"># 进入myblog容器</span>
$ kd exec <span class="token operator">-</span>ti myblog-5c97d79cdb-j485f bash
<span class="token namespace">[root@myblog-5c97d79cdb-j485f myblog]</span><span class="token comment"># curl mysql:3306</span>
5<span class="token punctuation">.</span>7<span class="token punctuation">.</span>29 <span class="token punctuation">)</span>→ <span class="token punctuation">(</span>mysql_native_password ot packets out of order
<span class="token namespace">[root@myblog-5c97d79cdb-j485f myblog]</span><span class="token comment"># curl myblog/blog/index/</span>
我的博客列表

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然podip和clusterip都不固定，但是service name是固定的，而且具有完全的跨集群可移植性，因此组件之间调用的同时，完全可以通过service name去通信，这样避免了大量的ip维护成本，使得服务的yaml模板更加简单。因此可以对mysql和myblog的部署进行优化改造：</p>
<ol>
<li>mysql可以去掉hostNetwork部署，使得服务只暴漏在k8s集群内部网络</li>
<li>configMap中数据库地址可以换成Service名称，这样跨环境的时候，配置内容基本上可以保持不用变化</li>
</ol>
<p>修改deploy-mysql.yaml</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># 去掉此行</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改configmap.yaml</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">data</span><span class="token punctuation">:</span>
<span class="token key atrule">MYSQL_HOST</span><span class="token punctuation">:</span> <span class="token string">"mysql"</span> <span class="token comment"># 此处替换为mysql</span>
<span class="token key atrule">MYSQL_PORT</span><span class="token punctuation">:</span> <span class="token string">"3306"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用修改：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl apply <span class="token operator">-</span>f configmap<span class="token punctuation">.</span>yaml
$ kubectl apply <span class="token operator">-</span>f deploy-mysql<span class="token punctuation">.</span>yaml

<span class="token comment">## 重建pod</span>
$ kubectl <span class="token operator">-</span>n demo delete po mysql-7f747644b8-6npzn

<span class="token comment">#去掉taint</span>
$ kubectl taint node k8s-slave1 smoke-
$ kubectl taint node k8s-slave2 drunk-

<span class="token comment">## myblog不用动，会自动因健康检测不过而重启</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务发现实现：</p>
<p><code v-pre>CoreDNS</code>是一个<code v-pre>Go</code>语言实现的链式插件<code v-pre>DNS服务端</code>，是CNCF成员，是一个高性能、易扩展的<code v-pre>DNS服务端</code>。</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kube-system get po <span class="token operator">-</span>o wide<span class="token punctuation">|</span>grep dns
coredns-d4475785-2w4hk 1/1 Running 0 4d22h 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>64
coredns-d4475785-s49hq 1/1 Running 0 4d22h 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>65

<span class="token comment"># 查看myblog的pod解析配置</span>
$ kubectl <span class="token operator">-</span>n demo exec <span class="token operator">-</span>ti myblog-5c97d79cdb-j485f bash
<span class="token namespace">[root@myblog-5c97d79cdb-j485f myblog]</span><span class="token comment"># cat /etc/resolv.conf</span>
nameserver 10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>10
search demo<span class="token punctuation">.</span>svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local cluster<span class="token punctuation">.</span>local
options ndots:5

<span class="token comment">## 10.96.0.10 从哪来</span>
$ kubectl <span class="token operator">-</span>n kube-system get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
kube-dns ClusterIP 10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>10 &lt;none> 53/UDP<span class="token punctuation">,</span>53/TCP 51d

<span class="token comment">## 启动pod的时候，会把kube-dns服务的cluster-ip地址注入到pod的resolve解析配置中，同时添加对应的namespace的search域。 因此跨namespace通过service name访问的话，需要添加对应的namespace名称，</span>
service_name<span class="token punctuation">.</span>namespace_name
$ kubectl get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
kubernetes ClusterIP 10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1 &lt;none> 443/TCP 26h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="service负载均衡之nodeport" tabindex="-1"><a class="header-anchor" href="#service负载均衡之nodeport" aria-hidden="true">#</a> Service负载均衡之NodePort</h6>
<p>cluster-ip为虚拟地址，只能在k8s集群内部进行访问，集群外部如果访问内部服务，实现方式之一为使用NodePort方式。NodePort会默认在 30000-32767 ，不指定的会随机使用其中一个。</p>
<p><code v-pre>myblog/deployment/svc-myblog-nodeport.yaml</code></p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>apiVersion: v1
kind: Service
metadata:
name: myblog-np
namespace: demo
spec:
ports:
<span class="token operator">-</span> port: 80
protocol: TCP
targetPort: 8002
selector:
app: myblog
<span class="token function">type</span>: NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看并访问服务：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kd create <span class="token operator">-</span>f svc-myblog-nodeport<span class="token punctuation">.</span>yaml
service/myblog-np created
$ kd get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
myblog ClusterIP 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93 &lt;none> 80/TCP 102m
myblog-np NodePort 10<span class="token punctuation">.</span>105<span class="token punctuation">.</span>228<span class="token punctuation">.</span>101 &lt;none> 80:30647/TCP 4s
mysql ClusterIP 10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84 &lt;none> 3306/TCP 77m

<span class="token comment">#集群内每个节点的NodePort端口都会进行监听</span>
$ curl 192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>128:30647/blog/index/
我的博客列表
$ curl 192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>131:30647/blog/index/
我的博客列表
<span class="token comment">## 浏览器访问</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>思考：</p>
<ol>
<li>
<p>NodePort的端口监听如何转发到对应的Pod服务？</p>
</li>
<li>
<p>CLUSTER-IP为虚拟IP，集群内如何通过虚拟IP访问到具体的Pod服务？</p>
</li>
</ol>
<h6 id="kube-proxy" tabindex="-1"><a class="header-anchor" href="#kube-proxy" aria-hidden="true">#</a> kube-proxy</h6>
<p>运行在每个节点上，监听 API Server 中服务对象的变化，再通过创建流量路由规则来实现网络的转发。<a href="https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies" target="_blank" rel="noopener noreferrer">参照<ExternalLinkIcon/></a></p>
<p>有三种模式：</p>
<ul>
<li>User space, 让 Kube-Proxy 在用户空间监听一个端口，所有的 Service 都转发到这个端口，然后 Kube-Proxy 在内部应用层对其进行转发 ， 所有报文都走一遍用户态，性能不高，k8s v1.2版本后废弃。</li>
<li>Iptables， 当前默认模式，完全由 IPtables 来实现， 通过各个node节点上的iptables规则来实现service的负载均衡，但是随着service数量的增大，iptables模式由于线性查找匹配、全量更新等特点，其性能会显著下降。</li>
<li>IPVS， 与iptables同样基于Netfilter，但是采用的hash表，因此当service数量达到一定规模时，hash查表的速度优势就会显现出来，从而提高service的服务性能。 k8s 1.8版本开始引入，1.11版本开始稳定，需要开启宿主机的ipvs模块。</li>
</ul>
<p>IPtables模式示意图：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ iptables-save <span class="token punctuation">|</span>grep <span class="token operator">-</span>v myblog-np<span class="token punctuation">|</span>grep <span class="token string">"demo/myblog"</span>
<span class="token operator">-</span>A KUBE-SERVICES <span class="token operator">!</span> <span class="token operator">-</span>s 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/16 <span class="token operator">-</span>d 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93/32 <span class="token operator">-</span>p tcp <span class="token operator">-</span>m comment <span class="token operator">--</span>comment <span class="token string">"demo/myblog: cluster IP"</span> <span class="token operator">-</span>m tcp <span class="token operator">--</span>dport 80 <span class="token operator">-</span>j KUBE-MARK-MASQ
<span class="token operator">-</span>A KUBE-SERVICES <span class="token operator">-</span>d 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93/32 <span class="token operator">-</span>p tcp <span class="token operator">-</span>m comment <span class="token operator">--</span>comment <span class="token string">"demo/myblog: cluster IP"</span> <span class="token operator">-</span>m tcp <span class="token operator">--</span>dport 80 <span class="token operator">-</span>j KUBE-SVC-WQNGJ7YFZKCTKPZK

$ iptables-save <span class="token punctuation">|</span>grep KUBE-SVC-WQNGJ7YFZKCTKPZK
<span class="token operator">-</span>A KUBE-SVC-WQNGJ7YFZKCTKPZK <span class="token operator">-</span>m statistic <span class="token operator">--</span>mode random <span class="token operator">--</span>probability 0<span class="token punctuation">.</span>50000000000 <span class="token operator">-</span>j KUBE-SEP-GB5GNOM5CZH7ICXZ
<span class="token operator">-</span>A KUBE-SVC-WQNGJ7YFZKCTKPZK <span class="token operator">-</span>j KUBE-SEP-7GWC3FN2JI5KLE47

$ iptables-save <span class="token punctuation">|</span>grep KUBE-SEP-GB5GNOM5CZH7ICXZ
<span class="token operator">-</span>A KUBE-SEP-GB5GNOM5CZH7ICXZ <span class="token operator">-</span>p tcp <span class="token operator">-</span>m tcp <span class="token operator">-</span>j DNAT <span class="token operator">--</span>to-destination 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>158:8002

$ iptables-save <span class="token punctuation">|</span>grep KUBE-SEP-7GWC3FN2JI5KLE47
<span class="token operator">-</span>A KUBE-SEP-7GWC3FN2JI5KLE47 <span class="token operator">-</span>p tcp <span class="token operator">-</span>m tcp <span class="token operator">-</span>j DNAT <span class="token operator">--</span>to-destination 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>159:8002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kubernetes服务访问之ingress" tabindex="-1"><a class="header-anchor" href="#kubernetes服务访问之ingress" aria-hidden="true">#</a> Kubernetes服务访问之Ingress</h5>
<p>对于Kubernetes的Service，无论是Cluster-Ip和NodePort均是四层的负载，集群内的服务如何实现七层的负载均衡，这就需要借助于Ingress，Ingress控制器的实现方式有很多，比如nginx, Contour, Haproxy, trafik, Istio，我们以nginx的实现为例做演示。</p>
<p>Ingress-nginx是7层的负载均衡器 ，负责统一管理外部对k8s cluster中service的请求。主要包含：</p>
<ul>
<li>ingress-nginx-controller：根据用户编写的ingress规则（创建的ingress的yaml文件），动态的去更改nginx服务的配置文件，并且reload重载使其生效（是自动化的，通过lua脚本来实现）；</li>
<li>ingress资源对象：将Nginx的配置抽象成一个Ingress对象，每添加一个新的Service资源对象只需写一个新的Ingress规则的yaml文件即可（或修改已存在的ingress规则的yaml文件）</li>
</ul>
<h6 id="示意图" tabindex="-1"><a class="header-anchor" href="#示意图" aria-hidden="true">#</a> 示意图：</h6>
<h6 id="实现逻辑" tabindex="-1"><a class="header-anchor" href="#实现逻辑" aria-hidden="true">#</a> 实现逻辑</h6>
<p>1）ingress controller通过和kubernetes api交互，动态的去感知集群中ingress规则变化
2）然后读取ingress规则(规则就是写明了哪个域名对应哪个service)，按照自定义的规则，生成一段nginx配置
3）再写到nginx-ingress-controller的pod里，这个Ingress controller的pod里运行着一个Nginx服务，控制器把生成的nginx配置写入/etc/nginx.conf文件中
4）然后reload一下使配置生效。以此达到域名分别配置和动态更新的问题。</p>
<h6 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h6>
<p><a href="https://github.com/kubernetes/ingress-nginx/blob/master/docs/deploy/index.md" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ wget https:<span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com/kubernetes/ingress-nginx/nginx-0<span class="token punctuation">.</span>30<span class="token punctuation">.</span>0/deploy/static/mandatory<span class="token punctuation">.</span>yaml
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
<h5 id="kubernetes认证与授权-录屏" tabindex="-1"><a class="header-anchor" href="#kubernetes认证与授权-录屏" aria-hidden="true">#</a> Kubernetes认证与授权 录屏！！！</h5>
<h6 id="apiservice安全控制" tabindex="-1"><a class="header-anchor" href="#apiservice安全控制" aria-hidden="true">#</a> APIService安全控制</h6>
<ul>
<li>Authentication：身份认证</li>
</ul>
<ol>
<li>这个环节它面对的输入是整个<code v-pre>http request</code>，负责对来自client的请求进行身份校验，支持的方法包括:</li>
</ol>
<ul>
<li>
<p>client证书验证（https双向验证）</p>
</li>
<li>
<p><code v-pre>basic auth</code></p>
</li>
<li>
<p>普通token</p>
</li>
<li>
<p><code v-pre>jwt token</code>(用于serviceaccount)</p>
</li>
</ul>
<ol start="2">
<li>
<p>APIServer启动时，可以指定一种Authentication方法，也可以指定多种方法。如果指定了多种方法，那么APIServer将会逐个使用这些方法对客户端请求进行验证， 只要请求数据通过其中一种方法的验证，APIServer就会认为Authentication成功；</p>
</li>
<li>
<p>使用kubeadm引导启动的k8s集群的apiserver初始配置中，默认支持<code v-pre>client证书</code>验证和<code v-pre>serviceaccount</code>两种身份验证方式。 证书认证通过设置<code v-pre>--client-ca-file</code>根证书以及<code v-pre>--tls-cert-file</code>和<code v-pre>--tls-private-key-file</code>来开启。</p>
</li>
<li>
<p>在这个环节，apiserver会通过client证书或 <code v-pre>http header</code>中的字段(比如serviceaccount的<code v-pre>jwt token</code>)来识别出请求的<code v-pre>用户身份</code>，包括”user”、”group”等，这些信息将在后面的<code v-pre>authorization</code>环节用到。</p>
</li>
</ol>
<ul>
<li>Authorization：鉴权，你可以访问哪些资源</li>
</ul>
<ol>
<li>
<p>这个环节面对的输入是<code v-pre>http request context</code>中的各种属性，包括：<code v-pre>user</code>、<code v-pre>group</code>、<code v-pre>request path</code>（比如：<code v-pre>/api/v1</code>、<code v-pre>/healthz</code>、<code v-pre>/version</code>等）、 <code v-pre>request verb</code>(比如：<code v-pre>get</code>、<code v-pre>list</code>、<code v-pre>create</code>等)。</p>
</li>
<li>
<p>APIServer会将这些属性值与事先配置好的访问策略(<code v-pre>access policy</code>）相比较。APIServer支持多种<code v-pre>authorization mode</code>，包括<code v-pre>Node、RBAC、Webhook</code>等。</p>
</li>
<li>
<p>APIServer启动时，可以指定一种<code v-pre>authorization mode</code>，也可以指定多种<code v-pre>authorization mode</code>，如果是后者，只要Request通过了其中一种mode的授权， 那么该环节的最终结果就是授权成功。在较新版本kubeadm引导启动的k8s集群的apiserver初始配置中，<code v-pre>authorization-mode</code>的默认配置是<code v-pre>”Node,RBAC”</code>。</p>
</li>
</ol>
<ul>
<li>Admission Control：<a href="http://docs.kubernetes.org.cn/144.html" target="_blank" rel="noopener noreferrer">准入控制<ExternalLinkIcon/></a>，一个控制链(层层关卡)，偏集群安全控制、管理方面。为什么说是安全相关的机制？</li>
<li>以NamespaceLifecycle为例， 该插件确保处于Termination状态的Namespace不再接收新的对象创建请求，并拒绝请求不存在的Namespace。该插件还可以防止删除系统保留的Namespace:default，kube-system，kube-public。</li>
<li>NodeRestriction， 此插件限制kubelet修改Node和Pod对象，这样的kubelets只允许修改绑定到Node的Pod API对象，以后版本可能会增加额外的限制 。</li>
</ul>
<p>为什么我们执行命令kubectl命令，可以直接管理k8s集群资源？</p>
<h6 id="kubectl的认证授权" tabindex="-1"><a class="header-anchor" href="#kubectl的认证授权" aria-hidden="true">#</a> kubectl的认证授权</h6>
<p>kubectl的日志调试级别：</p>
<table>
<thead>
<tr>
<th style="text-align:left">信息</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">v=0</td>
<td style="text-align:left">通常，这对操作者来说总是可见的。</td>
</tr>
<tr>
<td style="text-align:left">v=1</td>
<td style="text-align:left">当您不想要很详细的输出时，这个是一个合理的默认日志级别。</td>
</tr>
<tr>
<td style="text-align:left">v=2</td>
<td style="text-align:left">有关服务和重要日志消息的有用稳定状态信息，这些信息可能与系统中的重大更改相关。这是大多数系统推荐的默认日志级别。</td>
</tr>
<tr>
<td style="text-align:left">v=3</td>
<td style="text-align:left">关于更改的扩展信息。</td>
</tr>
<tr>
<td style="text-align:left">v=4</td>
<td style="text-align:left">调试级别信息。</td>
</tr>
<tr>
<td style="text-align:left">v=6</td>
<td style="text-align:left">显示请求资源。</td>
</tr>
<tr>
<td style="text-align:left">v=7</td>
<td style="text-align:left">显示 HTTP 请求头。</td>
</tr>
<tr>
<td style="text-align:left">v=8</td>
<td style="text-align:left">显示 HTTP 请求内容。</td>
</tr>
<tr>
<td style="text-align:left">v=9</td>
<td style="text-align:left">显示 HTTP 请求内容，并且不截断内容。</td>
</tr>
</tbody>
</table>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl get nodes <span class="token operator">-</span>v=7
I0329 20:20:08<span class="token punctuation">.</span>633065 3979 loader<span class="token punctuation">.</span>go:359<span class="token punctuation">]</span> Config loaded <span class="token keyword">from</span> file <span class="token operator">/</span>root/<span class="token punctuation">.</span>kube/config
I0329 20:20:08<span class="token punctuation">.</span>633797 3979 round_trippers<span class="token punctuation">.</span>go:416<span class="token punctuation">]</span> GET https:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>128:6443/api/v1/nodes?limit=500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>kubeadm init</code>启动完master节点后，会默认输出类似下面的提示内容：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">..</span>. <span class="token punctuation">..</span>.
Your Kubernetes master has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
<span class="token punctuation">..</span>. <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些信息是在告知我们如何配置<code v-pre>kubeconfig</code>文件。按照上述命令配置后，master节点上的<code v-pre>kubectl</code>就可以直接使用<code v-pre>$HOME/.kube/config</code>的信息访问<code v-pre>k8s cluster</code>了。 并且，通过这种配置方式，<code v-pre>kubectl</code>也拥有了整个集群的管理员(root)权限。</p>
<p>很多K8s初学者在这里都会有疑问：</p>
<ul>
<li>当<code v-pre>kubectl</code>使用这种<code v-pre>kubeconfig</code>方式访问集群时，<code v-pre>Kubernetes</code>的<code v-pre>kube-apiserver</code>是如何对来自<code v-pre>kubectl</code>的访问进行身份验证(<code v-pre>authentication</code>)和授权(<code v-pre>authorization</code>)的呢？</li>
<li>为什么来自<code v-pre>kubectl</code>的请求拥有最高的管理员权限呢？</li>
</ul>
<p>查看<code v-pre>/root/.kube/config</code>文件：</p>
<p>前面提到过apiserver的authentication支持通过<code v-pre>tls client certificate、basic auth、token</code>等方式对客户端发起的请求进行身份校验， 从kubeconfig信息来看，kubectl显然在请求中使用了<code v-pre>tls client certificate</code>的方式，即客户端的证书。</p>
<p>证书base64解码：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ <span class="token function">echo</span> xxxxxxxxxxxxxx <span class="token punctuation">|</span>base64 <span class="token operator">-</span>d > kubectl<span class="token punctuation">.</span>crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>说明在认证阶段，<code v-pre>apiserver</code>会首先使用<code v-pre>--client-ca-file</code>配置的CA证书去验证kubectl提供的证书的有效性,基本的方式 ：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ openssl verify <span class="token operator">-</span>CAfile <span class="token operator">/</span>etc/kubernetes/pki/ca<span class="token punctuation">.</span>crt kubectl<span class="token punctuation">.</span>crt
kubectl<span class="token punctuation">.</span>crt: OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>除了认证身份，还会取出必要的信息供授权阶段使用，文本形式查看证书内容：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ openssl x509 <span class="token operator">-in</span> kubectl<span class="token punctuation">.</span>crt <span class="token operator">-</span>text
Certificate:
<span class="token keyword">Data</span>:
Version: 3 <span class="token punctuation">(</span>0x2<span class="token punctuation">)</span>
Serial Number: 4736260165981664452 <span class="token punctuation">(</span>0x41ba9386f52b74c4<span class="token punctuation">)</span>
Signature Algorithm: sha256WithRSAEncryption
Issuer: CN=kubernetes
Validity
Not Before: Feb 10 07:33:39 2020 GMT
Not After : Feb 9 07:33:40 2021 GMT
Subject: O=system:masters<span class="token punctuation">,</span> CN=kubernetes-admin
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>认证通过后，提取出签发证书时指定的CN(Common Name),<code v-pre>kubernetes-admin</code>，作为请求的用户名 (User Name), 从证书中提取O(Organization)字段作为请求用户所属的组 (Group)，<code v-pre>group = system:masters</code>，然后传递给后面的授权模块。</p>
<p>kubeadm在init初始引导集群启动过程中，创建了许多<code v-pre>default</code>的<code v-pre>role、clusterrole、rolebinding</code>和<code v-pre>clusterrolebinding</code>， 在k8s有关RBAC的官方文档中，我们看到下面一些<code v-pre>default clusterrole</code>列表:</p>
<p>其中第一个cluster-admin这个cluster role binding绑定了system:masters group，这和authentication环节传递过来的身份信息不谋而合。 沿着system:masters group对应的cluster-admin clusterrolebinding“追查”下去，真相就会浮出水面。</p>
<p>我们查看一下这一binding：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ kubectl describe clusterrolebinding cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">Name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">Labels</span><span class="token punctuation">:</span> kubernetes.io/bootstrapping=rbac<span class="token punctuation">-</span>defaults
<span class="token key atrule">Annotations</span><span class="token punctuation">:</span> <span class="token key atrule">rbac.authorization.kubernetes.io/autoupdate</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">Role</span><span class="token punctuation">:</span>
<span class="token key atrule">Kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">Name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">Subjects</span><span class="token punctuation">:</span>
Kind Name Namespace
<span class="token punctuation">---</span><span class="token punctuation">-</span> <span class="token punctuation">---</span><span class="token punctuation">-</span> <span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span>
Group system<span class="token punctuation">:</span>masters
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到在kube-system名字空间中，一个名为cluster-admin的clusterrolebinding将cluster-admin cluster role与system:masters Group绑定到了一起， 赋予了所有归属于system:masters Group中用户cluster-admin角色所拥有的权限。</p>
<p>我们再来查看一下cluster-admin这个role的具体权限信息：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl describe clusterrole cluster-admin
Name: cluster-admin
Labels: kubernetes<span class="token punctuation">.</span>io/bootstrapping=rbac-defaults
Annotations: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/autoupdate: true
PolicyRule:
Resources Non-Resource URLs Resource Names Verbs
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
<span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非资源类，如查看集群健康状态。</p>
<h6 id="rbac" tabindex="-1"><a class="header-anchor" href="#rbac" aria-hidden="true">#</a> RBAC</h6>
<p>Role-Based Access Control，基于角色的访问控制， apiserver启动参数添加--authorization-mode=RBAC 来启用RBAC认证模式，kubeadm安装的集群默认已开启。<a href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/" target="_blank" rel="noopener noreferrer">官方介绍<ExternalLinkIcon/></a></p>
<p>查看开启：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment"># master节点查看apiserver进程</span>
$ <span class="token function">ps</span> aux <span class="token punctuation">|</span>grep apiserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>RBAC模式引入了4个资源：</p>
<ul>
<li>Role，角色</li>
</ul>
<p>一个Role只能授权访问单个namespace</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 示例定义一个名为pod-reader的角色，该角色具有读取default这个命名空间下的pods的权限</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span> <span class="token comment"># "" indicates the core API group</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"pods"</span><span class="token punctuation">]</span>
<span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">]</span>

<span class="token comment">## apiGroups: "","apps", "autoscaling", "batch", kubectl api-versions</span>
<span class="token comment">## resources: "services", "pods","deployments"... kubectl api-resources</span>
<span class="token comment">## verbs: "get", "list", "watch", "create", "update", "patch", "delete", "exec"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>ClusterRole</li>
</ul>
<p>一个ClusterRole能够授予和Role一样的权限，但是它是集群范围内的。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 定义一个集群角色，名为secret-reader，该角色可以读取所有的namespace中的secret资源</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token comment"># "namespace" omitted since ClusterRoles are not namespaced</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"secrets"</span><span class="token punctuation">]</span>
<span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Rolebinding</li>
</ul>
<p>将role中定义的权限分配给用户和用户组。RoleBinding包含主题（users,groups,或service accounts）和授予角色的引用。对于namespace内的授权使用RoleBinding，集群范围内使用ClusterRoleBinding。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 定义一个角色绑定，将pod-reader这个role的权限授予给jane这个User，使得jane可以在读取default这个命名空间下的所有的pod数据</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>pods
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User <span class="token comment">#这里可以是User,Group,ServiceAccount</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> jane
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role <span class="token comment">#这里可以是Role或者ClusterRole,若是ClusterRole，则权限也仅限于rolebinding的内部</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader <span class="token comment"># match the name of the Role or ClusterRole you wish to bind to</span>
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>注意：rolebinding既可以绑定role，也可以绑定clusterrole，当绑定clusterrole的时候，subject的权限也会被限定于rolebinding定义的namespace内部，若想跨namespace，需要使用clusterrolebinding</em></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 定义一个角色绑定，将dave这个用户和secret-reader这个集群角色绑定，虽然secret-reader是集群角色，但是因为是使用rolebinding绑定的，因此dave的权限也会被限制在development这个命名空间内</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token comment"># This role binding allows "dave" to read secrets in the "development" namespace.</span>
<span class="token comment"># You need to already have a ClusterRole named "secret-reader".</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>secrets
<span class="token comment">#</span>
<span class="token comment"># The namespace of the RoleBinding determines where the permissions are granted.</span>
<span class="token comment"># This only grants permissions within the "development" namespace.</span>
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> development
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User
<span class="token key atrule">name</span><span class="token punctuation">:</span> dave <span class="token comment"># Name is case sensitive</span>
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">name</span><span class="token punctuation">:</span> dave <span class="token comment"># Name is case sensitive</span>
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑一个场景： 如果集群中有多个namespace分配给不同的管理员，每个namespace的权限是一样的，就可以只定义一个clusterrole，然后通过rolebinding将不同的namespace绑定到管理员身上，否则就需要每个namespace定义一个Role，然后做一次rolebinding。</p>
<ul>
<li>ClusterRolebingding</li>
</ul>
<p>允许跨namespace进行授权</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token comment"># This cluster role binding allows anyone in the "manager" group to read secrets in any namespace.</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>secrets<span class="token punctuation">-</span>global
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> Group
<span class="token key atrule">name</span><span class="token punctuation">:</span> manager <span class="token comment"># Name is case sensitive</span>
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="kubelet的认证授权" tabindex="-1"><a class="header-anchor" href="#kubelet的认证授权" aria-hidden="true">#</a> kubelet的认证授权</h6>
<p>查看kubelet进程</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ systemctl status kubelet
● kubelet<span class="token punctuation">.</span>service <span class="token operator">-</span> kubelet: The Kubernetes Node Agent
Loaded: loaded <span class="token punctuation">(</span><span class="token operator">/</span>etc/systemd/system/kubelet<span class="token punctuation">.</span>service<span class="token punctuation">;</span> enabled<span class="token punctuation">;</span> vendor preset: disabled<span class="token punctuation">)</span>
Drop-In: <span class="token operator">/</span>etc/systemd/system/kubelet<span class="token punctuation">.</span>service<span class="token punctuation">.</span>d
└─10-kubeadm<span class="token punctuation">.</span>conf
Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Wed 2020-04-01 02:34:13 CST<span class="token punctuation">;</span> 1 day 14h ago
Docs: https:<span class="token operator">/</span><span class="token operator">/</span>kubernetes<span class="token punctuation">.</span>io/docs/
Main PID: 851 <span class="token punctuation">(</span>kubelet<span class="token punctuation">)</span>
Tasks: 21
Memory: 127<span class="token punctuation">.</span>1M
CGroup: <span class="token operator">/</span>system<span class="token punctuation">.</span>slice/kubelet<span class="token punctuation">.</span>service
└─851 <span class="token operator">/</span>usr/bin/kubelet <span class="token operator">--</span>bootstrap-kubeconfig=<span class="token operator">/</span>etc/kubernetes/bootstrap-kubelet<span class="token punctuation">.</span>conf <span class="token operator">--</span>kubeconfig=<span class="token operator">/</span>etc/kubernetes/kubelet<span class="token punctuation">.</span>conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看<code v-pre>/etc/kubernetes/kubelet.conf</code>，解析证书：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ <span class="token function">echo</span> xxxxx <span class="token punctuation">|</span>base64 <span class="token operator">-</span>d >kubelet<span class="token punctuation">.</span>crt
$ openssl x509 <span class="token operator">-in</span> kubelet<span class="token punctuation">.</span>crt <span class="token operator">-</span>text
Certificate:
<span class="token keyword">Data</span>:
Version: 3 <span class="token punctuation">(</span>0x2<span class="token punctuation">)</span>
Serial Number: 9059794385454520113 <span class="token punctuation">(</span>0x7dbadafe23185731<span class="token punctuation">)</span>
Signature Algorithm: sha256WithRSAEncryption
Issuer: CN=kubernetes
Validity
Not Before: Feb 10 07:33:39 2020 GMT
Not After : Feb 9 07:33:40 2021 GMT
Subject: O=system:nodes<span class="token punctuation">,</span> CN=system:node:master-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>得到我们期望的内容：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Subject: <span class="token assign-left variable">O</span><span class="token operator">=</span>system:nodes, <span class="token assign-left variable">CN</span><span class="token operator">=</span>system:node:k8s-master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们知道，k8s会把O作为Group来进行请求，因此如果有权限绑定给这个组，肯定在clusterrolebinding的定义中可以找得到。因此尝试去找一下绑定了system:nodes组的clusterrolebinding</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl get clusterrolebinding<span class="token punctuation">|</span>awk <span class="token string">'NR>1{print $1}'</span><span class="token punctuation">|</span>xargs kubectl get clusterrolebinding <span class="token operator">-</span>oyaml<span class="token punctuation">|</span>grep <span class="token operator">-</span>n10 system:nodes
98- roleRef:
99- apiGroup: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io
100- kind: ClusterRole
101- name: system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
102- subjects:
103- <span class="token operator">-</span> apiGroup: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io
104- kind: <span class="token function">Group</span>
105: name: system:nodes
106-<span class="token operator">-</span> apiVersion: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
107- kind: ClusterRoleBinding
108- metadata:
109- creationTimestamp: <span class="token string">"2020-02-10T07:34:02Z"</span>
110- name: kubeadm:node-proxier
111- resourceVersion: <span class="token string">"213"</span>
112- selfLink: <span class="token operator">/</span>apis/rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1/clusterrolebindings/kubeadm%3Anode-proxier

$ kubectl describe clusterrole system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
Name: system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
Labels: kubernetes<span class="token punctuation">.</span>io/bootstrapping=rbac-defaults
Annotations: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/autoupdate: true
PolicyRule:
Resources Non-Resource URLs Resource Names Verbs
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
certificatesigningrequests<span class="token punctuation">.</span>certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/selfnodeclient <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token namespace">[create]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结局有点意外，除了<code v-pre>system:certificates.k8s.io:certificatesigningrequests:selfnodeclient</code>外，没有找到system相关的rolebindings，显然和我们的理解不一样。 尝试去找<a href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/" target="_blank" rel="noopener noreferrer">资料<ExternalLinkIcon/></a>，发现了这么一段 :</p>
<table>
<thead>
<tr>
<th style="text-align:left">Default ClusterRole</th>
<th style="text-align:left">Default ClusterRoleBinding</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">system:kube-scheduler</td>
<td style="text-align:left">system:kube-scheduler user</td>
<td style="text-align:left">Allows access to the resources required by the <a href="https://kubernetes.io/docs/reference/generated/kube-scheduler/" target="_blank" rel="noopener noreferrer">scheduler<ExternalLinkIcon/></a>component.</td>
</tr>
<tr>
<td style="text-align:left">system:volume-scheduler</td>
<td style="text-align:left">system:kube-scheduler user</td>
<td style="text-align:left">Allows access to the volume resources required by the kube-scheduler component.</td>
</tr>
<tr>
<td style="text-align:left">system:kube-controller-manager</td>
<td style="text-align:left">system:kube-controller-manager user</td>
<td style="text-align:left">Allows access to the resources required by the <a href="https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/" target="_blank" rel="noopener noreferrer">controller manager<ExternalLinkIcon/></a> component. The permissions required by individual controllers are detailed in the <a href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/#controller-roles" target="_blank" rel="noopener noreferrer">controller roles<ExternalLinkIcon/></a>.</td>
</tr>
<tr>
<td style="text-align:left">system:node</td>
<td style="text-align:left">None</td>
<td style="text-align:left">Allows access to resources required by the kubelet, <strong>including read access to all secrets, and write access to all pod status objects</strong>. You should use the <a href="https://kubernetes.io/docs/reference/access-authn-authz/node/" target="_blank" rel="noopener noreferrer">Node authorizer<ExternalLinkIcon/></a> and <a href="https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction" target="_blank" rel="noopener noreferrer">NodeRestriction admission plugin<ExternalLinkIcon/></a> instead of the <code v-pre>system:node</code> role, and allow granting API access to kubelets based on the Pods scheduled to run on them. The <code v-pre>system:node</code> role only exists for compatibility with Kubernetes clusters upgraded from versions prior to v1.8.</td>
</tr>
<tr>
<td style="text-align:left">system:node-proxier</td>
<td style="text-align:left">system:kube-proxy user</td>
<td style="text-align:left">Allows access to the resources required by the <a href="https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/" target="_blank" rel="noopener noreferrer">kube-proxy<ExternalLinkIcon/></a>component.</td>
</tr>
</tbody>
</table>
<p>大致意思是说：之前会定义system:node这个角色，目的是为了kubelet可以访问到必要的资源，包括所有secret的读权限及更新pod状态的写权限。如果1.8版本后，是建议使用 <a href="https://kubernetes.io/docs/reference/access-authn-authz/node/" target="_blank" rel="noopener noreferrer">Node authorizer<ExternalLinkIcon/></a> and <a href="https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction" target="_blank" rel="noopener noreferrer">NodeRestriction admission plugin<ExternalLinkIcon/></a> 来代替这个角色的。</p>
<p>我们目前使用1.16，查看一下授权策略：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ <span class="token function">ps</span> axu<span class="token punctuation">|</span>grep apiserver
kube-apiserver <span class="token operator">--</span>authorization-mode=Node<span class="token punctuation">,</span>RBAC <span class="token operator">--</span><span class="token function">enable-admission</span><span class="token operator">-</span>plugins=NodeRestriction
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看一下官网对Node authorizer的介绍：</p>
<p><em>Node authorization is a special-purpose authorization mode that specifically authorizes API requests made by kubelets.</em></p>
<p><em>In future releases, the node authorizer may add or remove permissions to ensure kubelets have the minimal set of permissions required to operate correctly.</em></p>
<p><em>In order to be authorized by the Node authorizer, kubelets must use a credential that identifies them as being in the <code v-pre>system:nodes</code> group, with a username of <code v-pre>system:node:&lt;nodeName&gt;</code></em></p>
<h6 id="service-account" tabindex="-1"><a class="header-anchor" href="#service-account" aria-hidden="true">#</a> Service Account</h6>
<p>前面说，认证可以通过证书，也可以通过使用ServiceAccount（服务账户）的方式来做认证。大多数时候，我们在基于k8s做二次开发时都是选择通过serviceaccount的方式。我们之前访问dashboard的时候，是如何做的？</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 新建一个名为admin的serviceaccount，并且把名为cluster-admin的这个集群角色的权限授予新建的serviceaccount</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> admin
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> admin
<span class="token key atrule">annotations</span><span class="token punctuation">:</span>
<span class="token key atrule">rbac.authorization.kubernetes.io/autoupdate</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">name</span><span class="token punctuation">:</span> admin
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们查看一下：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kubernetes-dashboard get sa admin <span class="token operator">-</span>o yaml
apiVersion: v1
kind: ServiceAccount
metadata:
creationTimestamp: <span class="token string">"2020-04-01T11:59:21Z"</span>
name: admin
namespace: kubernetes-dashboard
resourceVersion: <span class="token string">"1988878"</span>
selfLink: <span class="token operator">/</span>api/v1/namespaces/kubernetes-dashboard/serviceaccounts/admin
uid: 639ecc3e-74d9-11ea-a59b-000c29dfd73f
secrets:
<span class="token operator">-</span> name: admin-token-lfsrf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意到serviceaccount上默认绑定了一个名为admin-token-lfsrf的secret，我们查看一下secret</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kubernetes-dashboard describe secret admin-token-lfsrf
Name: admin-token-lfsrf
Namespace: kubernetes-dashboard
Labels: &lt;none>
Annotations: kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>name: admin
kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>uid: 639ecc3e-74d9-11ea-a59b-000c29dfd73f

<span class="token function">Type</span>: kubernetes<span class="token punctuation">.</span>io/service-account-token
<span class="token keyword">Data</span>
====
ca<span class="token punctuation">.</span>crt: 1025 bytes
namespace: 4 bytes
token: eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9<span class="token punctuation">.</span>eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZW1vIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFkbWluLXRva2VuLWxmc3JmIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNjM5ZWNjM2UtNzRkOS0xMWVhLWE1OWItMDAwYzI5ZGZkNzNmIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlbW86YWRtaW4ifQ<span class="token punctuation">.</span>ffGCU4L5LxTsMx3NcNixpjT6nLBi-pmstb4I-W61nLOzNaMmYSEIwAaugKMzNR-2VwM14WbuG04dOeO67niJeP6n8-ALkl-vineoYCsUjrzJ09qpM3TNUPatHFqyjcqJ87h4VKZEqk2qCCmLxB6AGbEHpVFkoge40vHs56cIymFGZLe53JZkhu3pwYuS4jpXytV30Ad-HwmQDUu_Xqcifni6tDYPCfKz2CZlcOfwqHeGIHJjDGVBKqhEeo8PhStoofBU6Y4OjObP7HGuTY-Foo4QindNnpp0QU6vSb7kiOiQ4twpayybH8PTf73dtdFt46UF6mGjskWgevgolvmO8A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开发的时候如何去调用k8s的api:</p>
<ol>
<li>curl演示</li>
</ol>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ curl <span class="token operator">-</span>k <span class="token operator">-</span>H <span class="token string">"Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZW1vIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFkbWluLXRva2VuLWxmc3JmIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNjM5ZWNjM2UtNzRkOS0xMWVhLWE1OWItMDAwYzI5ZGZkNzNmIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlbW86YWRtaW4ifQ.ffGCU4L5LxTsMx3NcNixpjT6nLBi-pmstb4I-W61nLOzNaMmYSEIwAaugKMzNR-2VwM14WbuG04dOeO67niJeP6n8-ALkl-vineoYCsUjrzJ09qpM3TNUPatHFqyjcqJ87h4VKZEqk2qCCmLxB6AGbEHpVFkoge40vHs56cIymFGZLe53JZkhu3pwYuS4jpXytV30Ad-HwmQDUu_Xqcifni6tDYPCfKz2CZlcOfwqHeGIHJjDGVBKqhEeo8PhStoofBU6Y4OjObP7HGuTY-Foo4QindNnpp0QU6vSb7kiOiQ4twpayybH8PTf73dtdFt46UF6mGjskWgevgolvmO8A"</span> https:<span class="token operator">/</span><span class="token operator">/</span>62<span class="token punctuation">.</span>234<span class="token punctuation">.</span>214<span class="token punctuation">.</span>206:6443/api/v1/namespaces/demo/pods?limit=500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>postman</li>
</ol>
<h4 id="查看etcd数据" tabindex="-1"><a class="header-anchor" href="#查看etcd数据" aria-hidden="true">#</a> 查看etcd数据</h4>
<p>拷贝etcdctl命令行工具：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ docker exec <span class="token operator">-</span>ti etcd_container which etcdctl
$ docker <span class="token function">cp</span> etcd_container:<span class="token operator">/</span>usr/local/bin/etcdctl <span class="token operator">/</span>usr/bin/etcdctl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看所有key值：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ ETCDCTL_API=3 etcdctl <span class="token operator">--</span>endpoints=https:<span class="token operator">/</span><span class="token operator">/</span><span class="token punctuation">[</span>127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1<span class="token punctuation">]</span>:2379 <span class="token operator">--</span>cacert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/ca<span class="token punctuation">.</span>crt <span class="token operator">--</span>cert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>crt <span class="token operator">--</span>key=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>key get <span class="token operator">/</span> <span class="token operator">--</span>prefix <span class="token operator">--</span>keys-only
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看具体的key对应的数据：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ ETCDCTL_API=3 etcdctl <span class="token operator">--</span>endpoints=https:<span class="token operator">/</span><span class="token operator">/</span><span class="token punctuation">[</span>127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1<span class="token punctuation">]</span>:2379 <span class="token operator">--</span>cacert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/ca<span class="token punctuation">.</span>crt <span class="token operator">--</span>cert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>crt <span class="token operator">--</span>key=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>key get <span class="token operator">/</span>registry/pods/jenkins/sonar-postgres-7fc5d748b6-gtmsb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="基于efk实现kubernetes集群的日志平台-扩展-录屏" tabindex="-1"><a class="header-anchor" href="#基于efk实现kubernetes集群的日志平台-扩展-录屏" aria-hidden="true">#</a> 基于EFK实现kubernetes集群的日志平台（扩展） 录屏！！！</h4>
<h5 id="efk介绍" tabindex="-1"><a class="header-anchor" href="#efk介绍" aria-hidden="true">#</a> EFK介绍</h5>
<p>EFK工作示意</p>
<ul>
<li>Elasticsearch</li>
</ul>
<p>一个开源的分布式、Restful 风格的搜索和数据分析引擎，它的底层是开源库Apache Lucene。它可以被下面这样准确地形容：</p>
<ul>
<li>
<p>一个分布式的实时文档存储，每个字段可以被索引与搜索；</p>
</li>
<li>
<p>一个分布式实时分析搜索引擎；</p>
</li>
<li>
<p>能胜任上百个服务节点的扩展，并支持 PB 级别的结构化或者非结构化数据。</p>
</li>
<li>
<p>Fluentd</p>
</li>
</ul>
<p>一个针对日志的收集、处理、转发系统。通过丰富的插件系统，可以收集来自于各种系统或应用的日志，转化为用户指定的格式后，转发到用户所指定的日志存储系统之中。</p>
<p>Fluentd 通过一组给定的数据源抓取日志数据，处理后（转换成结构化的数据格式）将它们转发给其他服务，比如 Elasticsearch、对象存储、kafka等等。Fluentd 支持超过300个日志存储和分析服务，所以在这方面是非常灵活的。主要运行步骤如下</p>
<ol>
<li>首先 Fluentd 从多个日志源获取数据</li>
<li>结构化并且标记这些数据</li>
<li>然后根据匹配的标签将数据发送到多个目标服务</li>
</ol>
<ul>
<li>Kibana</li>
</ul>
<p>Kibana是一个开源的分析和可视化平台，设计用于和Elasticsearch一起工作。可以通过Kibana来搜索，查看，并和存储在Elasticsearch索引中的数据进行交互。也可以轻松地执行高级数据分析，并且以各种图标、表格和地图的形式可视化数据。</p>
<h5 id="部署es服务" tabindex="-1"><a class="header-anchor" href="#部署es服务" aria-hidden="true">#</a> 部署es服务</h5>
<h6 id="部署分析" tabindex="-1"><a class="header-anchor" href="#部署分析" aria-hidden="true">#</a> 部署分析</h6>
<ol>
<li>es生产环境是部署es集群，通常会使用statefulset进行部署，此例由于演示环境资源问题，部署为单点</li>
<li>数据存储挂载主机路径</li>
<li>es默认使用elasticsearch用户启动进程，es的数据目录是通过宿主机的路径挂载，因此目录权限被主机的目录权限覆盖，因此可以利用init container容器在es进程启动之前把目录的权限修改掉，注意init container要用特权模式启动。</li>
</ol>
<h6 id="部署并验证" tabindex="-1"><a class="header-anchor" href="#部署并验证" aria-hidden="true">#</a> 部署并验证</h6>
<p><code v-pre>efk/elasticsearch.yaml</code></p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>apiVersion: apps/v1
kind: StatefulSet
metadata:
labels:
addonmanager<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/mode: Reconcile
k8s-app: elasticsearch-logging
version: v7<span class="token punctuation">.</span>4<span class="token punctuation">.</span>2
name: elasticsearch-logging
namespace: logging
spec:
replicas: 1
revisionHistoryLimit: 10
selector:
matchLabels:
k8s-app: elasticsearch-logging
version: v7<span class="token punctuation">.</span>4<span class="token punctuation">.</span>2
serviceName: elasticsearch-logging
template:
metadata:
labels:
k8s-app: elasticsearch-logging
version: v7<span class="token punctuation">.</span>4<span class="token punctuation">.</span>2
spec:
nodeSelector:
log: <span class="token string">"true"</span> <span class="token comment">## 指定部署在哪个节点。需根据环境来修改</span>
containers:
<span class="token operator">-</span> env:
<span class="token operator">-</span> name: NAMESPACE
valueFrom:
fieldRef:
apiVersion: v1
fieldPath: metadata<span class="token punctuation">.</span>namespace
<span class="token operator">-</span> name: cluster<span class="token punctuation">.</span>initial_master_nodes
value: elasticsearch-logging-0
<span class="token operator">-</span> name: ES_JAVA_OPTS
value: <span class="token string">"-Xms512m -Xmx512m"</span>
image: 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/elasticsearch/elasticsearch:7<span class="token punctuation">.</span>4<span class="token punctuation">.</span>2
name: elasticsearch-logging
ports:
<span class="token operator">-</span> containerPort: 9200
name: db
protocol: TCP
<span class="token operator">-</span> containerPort: 9300
name: transport
protocol: TCP
volumeMounts:
<span class="token operator">-</span> mountPath: <span class="token operator">/</span>usr/share/elasticsearch/<span class="token keyword">data</span>
name: elasticsearch-logging
dnsConfig:
options:
<span class="token operator">-</span> name: single-<span class="token function">request-reopen</span>
initContainers:
<span class="token operator">-</span> command:
<span class="token operator">-</span> <span class="token operator">/</span>sbin/sysctl
<span class="token operator">-</span> <span class="token operator">-</span>w
<span class="token operator">-</span> vm<span class="token punctuation">.</span>max_map_count=262144
image: alpine:3<span class="token punctuation">.</span>6
imagePullPolicy: IfNotPresent
name: elasticsearch-logging-init
resources: <span class="token punctuation">{</span><span class="token punctuation">}</span>
securityContext:
privileged: true
<span class="token operator">-</span> name: fix-permissions
image: alpine:3<span class="token punctuation">.</span>6
command: <span class="token punctuation">[</span><span class="token string">"sh"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> <span class="token string">"chown -R 1000:1000 /usr/share/elasticsearch/data"</span><span class="token punctuation">]</span>
securityContext:
privileged: true
volumeMounts:
<span class="token operator">-</span> name: elasticsearch-logging
mountPath: <span class="token operator">/</span>usr/share/elasticsearch/<span class="token keyword">data</span>
volumes:
<span class="token operator">-</span> name: elasticsearch-logging
hostPath:
path: <span class="token operator">/</span>esdata
<span class="token operator">--</span><span class="token operator">-</span>
apiVersion: v1
kind: Service
metadata:
labels:
k8s-app: elasticsearch-logging
name: elasticsearch
namespace: logging
spec:
ports:
<span class="token operator">-</span> port: 9200
protocol: TCP
targetPort: db
selector:
k8s-app: elasticsearch-logging
<span class="token function">type</span>: ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl create namespace logging
<span class="token comment">## 给slave1节点打上label，将es服务调度到slave1节点</span>
$ kubectl label node k8s-slave1 log=true
<span class="token comment">## 部署服务，可以先去部署es的节点把镜像下载到本地</span>
$ kubectl create <span class="token operator">-</span>f elasticsearch<span class="token punctuation">.</span>yaml
statefulset<span class="token punctuation">.</span>apps/elasticsearch-logging created
service/elasticsearch created

<span class="token comment">## 等待片刻，查看一下es的pod部署到了k8s-slave1节点，状态变为running</span>
$ kubectl <span class="token operator">-</span>n logging get po <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE IP NODE
elasticsearch-logging-0 1/1 Running 0 69m 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>104 k8s-slave1
<span class="token comment"># 然后通过curl命令访问一下服务，验证es是否部署成功</span>
$ kubectl <span class="token operator">-</span>n logging get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
elasticsearch ClusterIP 10<span class="token punctuation">.</span>109<span class="token punctuation">.</span>174<span class="token punctuation">.</span>58 &lt;none> 9200/TCP 71m
$ curl 10<span class="token punctuation">.</span>109<span class="token punctuation">.</span>174<span class="token punctuation">.</span>58:9200
<span class="token punctuation">{</span>
<span class="token string">"name"</span> : <span class="token string">"elasticsearch-logging-0"</span><span class="token punctuation">,</span>
<span class="token string">"cluster_name"</span> : <span class="token string">"docker-cluster"</span><span class="token punctuation">,</span>
<span class="token string">"cluster_uuid"</span> : <span class="token string">"uic8xOyNSlGwvoY9DIBT1g"</span><span class="token punctuation">,</span>
<span class="token string">"version"</span> : <span class="token punctuation">{</span>
<span class="token string">"number"</span> : <span class="token string">"7.4.2"</span><span class="token punctuation">,</span>
<span class="token string">"build_flavor"</span> : <span class="token string">"default"</span><span class="token punctuation">,</span>
<span class="token string">"build_type"</span> : <span class="token string">"docker"</span><span class="token punctuation">,</span>
<span class="token string">"build_hash"</span> : <span class="token string">"2f90bbf7b93631e52bafb59b3b049cb44ec25e96"</span><span class="token punctuation">,</span>
<span class="token string">"build_date"</span> : <span class="token string">"2019-10-28T20:40:44.881551Z"</span><span class="token punctuation">,</span>
<span class="token string">"build_snapshot"</span> : false<span class="token punctuation">,</span>
<span class="token string">"lucene_version"</span> : <span class="token string">"8.2.0"</span><span class="token punctuation">,</span>
<span class="token string">"minimum_wire_compatibility_version"</span> : <span class="token string">"6.8.0"</span><span class="token punctuation">,</span>
<span class="token string">"minimum_index_compatibility_version"</span> : <span class="token string">"6.0.0-beta1"</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token string">"tagline"</span> : <span class="token string">"You Know, for Search"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="部署kibana" tabindex="-1"><a class="header-anchor" href="#部署kibana" aria-hidden="true">#</a> 部署kibana</h5>
<h6 id="部署分析-1" tabindex="-1"><a class="header-anchor" href="#部署分析-1" aria-hidden="true">#</a> 部署分析</h6>
<ol start="2">
<li>kibana需要暴漏web页面给前端使用，因此使用ingress配置域名来实现对kibana的访问</li>
<li>kibana为无状态应用，直接使用Deployment来启动</li>
<li>kibana需要访问es，直接利用k8s服务发现访问此地址即可，<a href="http://elasticsearch:9200" target="_blank" rel="noopener noreferrer">http://elasticsearch:9200<ExternalLinkIcon/></a></li>
</ol>
<h6 id="部署并验证-1" tabindex="-1"><a class="header-anchor" href="#部署并验证-1" aria-hidden="true">#</a> 部署并验证</h6>
<p>资源文件 <code v-pre>efk/kibana.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">template</span><span class="token punctuation">:</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/kibana/kibana<span class="token punctuation">:</span>7.4.2
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token key atrule">limits</span><span class="token punctuation">:</span>
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 1000m
<span class="token key atrule">requests</span><span class="token punctuation">:</span>
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ELASTICSEARCH_URL
<span class="token key atrule">value</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//elasticsearch<span class="token punctuation">:</span><span class="token number">9200</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">5601</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5601</span>
<span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
<span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">5601</span>
<span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> kibana.devops.cn
<span class="token key atrule">http</span><span class="token punctuation">:</span>
<span class="token key atrule">paths</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
<span class="token key atrule">backend</span><span class="token punctuation">:</span>
<span class="token key atrule">serviceName</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">5601</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f kibana<span class="token punctuation">.</span>yaml
deployment<span class="token punctuation">.</span>apps/kibana created
service/kibana created
ingress/kibana created

<span class="token comment"># 然后查看pod，等待状态变成running</span>
$ kubectl <span class="token operator">-</span>n logging get po
NAME READY STATUS RESTARTS AGE
elasticsearch-logging-0 1/1 Running 0 88m
kibana-944c57766-ftlcw 1/1 Running 0 15m

<span class="token comment">## 配置域名解析 kibana.devops.cn，并访问服务进行验证，若可以访问，说明连接es成功</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="部署fluentd" tabindex="-1"><a class="header-anchor" href="#部署fluentd" aria-hidden="true">#</a> 部署fluentd</h5>
<h6 id="部署分析-2" tabindex="-1"><a class="header-anchor" href="#部署分析-2" aria-hidden="true">#</a> 部署分析</h6>
<ol>
<li>fluentd为日志采集服务，kubernetes集群的每个业务节点都有日志产生，因此需要使用daemonset的模式进行部署</li>
<li>为进一步控制资源，会为daemonset指定一个选择表情，fluentd=true来做进一步过滤，只有带有此标签的节点才会部署fluentd</li>
<li>日志采集，需要采集哪些目录下的日志，采集后发送到es端，因此需要配置的内容比较多，我们选择使用configmap的方式把配置文件整个挂载出来</li>
</ol>
<h6 id="部署服务" tabindex="-1"><a class="header-anchor" href="#部署服务" aria-hidden="true">#</a> 部署服务</h6>
<p>配置文件，<code v-pre>efk/fluentd-es-main.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">data</span><span class="token punctuation">:</span>
<span class="token key atrule">fluent.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
<span class="token comment"># This is the root config file, which only includes components of the actual configuration</span>
<span class="token comment">#</span>
<span class="token comment"># Do not collect fluentd's own logs to avoid infinite loops.</span>
&lt;match fluent.<span class="token important">**></span>
@type null
&lt;/match<span class="token punctuation">></span>

@include /fluentd/etc/config.d/<span class="token important">*.conf</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es<span class="token punctuation">-</span>config<span class="token punctuation">-</span>main
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件，fluentd-config.yaml，注意点：</p>
<ol>
<li>数据源source的配置，k8s会默认把容器的标准和错误输出日志重定向到宿主机中</li>
<li>默认集成了 <a href="https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter" target="_blank" rel="noopener noreferrer">kubernetes_metadata_filter<ExternalLinkIcon/></a> 插件，来解析日志格式，得到k8s相关的元数据，raw.kubernetes</li>
<li>match输出到es端的flush配置</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>config
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">data</span><span class="token punctuation">:</span>
<span class="token key atrule">system.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
&lt;system<span class="token punctuation">></span>
root_dir /tmp/fluentd<span class="token punctuation">-</span>buffers/
&lt;/system<span class="token punctuation">></span>
<span class="token key atrule">containers.input.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
&lt;source<span class="token punctuation">></span>
@id fluentd<span class="token punctuation">-</span>containers.log
@type tail
path /var/log/containers/<span class="token important">*.log</span>
pos_file /var/log/es<span class="token punctuation">-</span>containers.log.pos
time_format %Y<span class="token punctuation">-</span>%m<span class="token punctuation">-</span>%dT%H<span class="token punctuation">:</span>%M<span class="token punctuation">:</span>%S.%NZ
localtime
tag raw.kubernetes.*
format json
read_from_head true
&lt;/source<span class="token punctuation">></span>
<span class="token comment"># Detect exceptions in the log output and forward them as one log entry.</span>
&lt;match raw.kubernetes.<span class="token important">**></span>
@id raw.kubernetes
@type detect_exceptions
remove_tag_prefix raw
message log
stream stream
multiline_flush_interval 5
max_bytes 500000
max_lines 1000
&lt;/match<span class="token punctuation">></span>
<span class="token key atrule">forward.input.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
<span class="token comment"># Takes the messages sent over TCP</span>
&lt;source<span class="token punctuation">></span>
@type forward
&lt;/source<span class="token punctuation">></span>
<span class="token key atrule">output.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
<span class="token comment"># Enriches records with Kubernetes metadata</span>
&lt;filter kubernetes.<span class="token important">**></span>
@type kubernetes_metadata
&lt;/filter<span class="token punctuation">></span>
&lt;match <span class="token important">**></span>
@id elasticsearch
@type elasticsearch
@log_level info
include_tag_key true
host elasticsearch
port 9200
logstash_format true
request_timeout 30s
&lt;buffer<span class="token punctuation">></span>
@type file
path /var/log/fluentd<span class="token punctuation">-</span>buffers/kubernetes.system.buffer
flush_mode interval
retry_type exponential_backoff
flush_thread_count 2
flush_interval 5s
retry_forever
retry_max_interval 30
chunk_limit_size 2M
queue_limit_length 8
overflow_action block
&lt;/buffer<span class="token punctuation">></span>
&lt;/match<span class="token punctuation">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>daemonset定义文件，fluentd.yaml，注意点：</p>
<ol>
<li>需要配置rbac规则，因为需要访问k8s api去根据日志查询元数据</li>
<li>需要将/var/log/containers/目录挂载到容器中</li>
<li>需要将fluentd的configmap中的配置文件挂载到容器内</li>
<li>想要部署fluentd的节点，需要添加fluentd=true的标签</li>
</ol>
<p><code v-pre>efk/fluentd.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">""</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">"namespaces"</span>
<span class="token punctuation">-</span> <span class="token string">"pods"</span>
<span class="token key atrule">verbs</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">"get"</span>
<span class="token punctuation">-</span> <span class="token string">"watch"</span>
<span class="token punctuation">-</span> <span class="token string">"list"</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> <span class="token string">""</span>
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> <span class="token string">""</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">template</span><span class="token punctuation">:</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> FLUENTD_ARGS
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>no<span class="token punctuation">-</span>supervisor <span class="token punctuation">-</span>q
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/fluentd<span class="token punctuation">-</span>es<span class="token punctuation">-</span>root<span class="token punctuation">:</span>v1.6.2<span class="token punctuation">-</span><span class="token number">1.0</span>
<span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token key atrule">limits</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
<span class="token key atrule">requests</span><span class="token punctuation">:</span>
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
<span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlog
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/docker/containers
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainers
<span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /home/docker/containers
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainershome
<span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /fluentd/etc/config.d
<span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /fluentd/etc/fluent.conf
<span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume<span class="token punctuation">-</span>main
<span class="token key atrule">subPath</span><span class="token punctuation">:</span> fluent.conf
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
<span class="token key atrule">fluentd</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">securityContext</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token key atrule">serviceAccount</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /var/log
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">""</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlog
<span class="token punctuation">-</span> <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /var/lib/docker/containers
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">""</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainers
<span class="token punctuation">-</span> <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /home/docker/containers
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">""</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainershome
<span class="token punctuation">-</span> <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
<span class="token key atrule">defaultMode</span><span class="token punctuation">:</span> <span class="token number">420</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>config
<span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume
<span class="token punctuation">-</span> <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
<span class="token key atrule">defaultMode</span><span class="token punctuation">:</span> <span class="token number">420</span>
<span class="token key atrule">items</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> fluent.conf
<span class="token key atrule">path</span><span class="token punctuation">:</span> fluent.conf
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es<span class="token punctuation">-</span>config<span class="token punctuation">-</span>main
<span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume<span class="token punctuation">-</span>main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 给slave1和slave2打上标签，进行部署fluentd日志采集服务</span>
$ kubectl label node k8s-slave1 fluentd=true
node/k8s-slave1 labeled
$ kubectl label node k8s-slave2 fluentd=true
node/k8s-slave2 labeled

<span class="token comment"># 创建服务</span>
$ kubectl create <span class="token operator">-</span>f fluentd-es-config-main<span class="token punctuation">.</span>yaml
configmap/fluentd-es-config-main created
$ kubectl create <span class="token operator">-</span>f fluentd-configmap<span class="token punctuation">.</span>yaml
configmap/fluentd-config created
$ kubectl create <span class="token operator">-</span>f fluentd<span class="token punctuation">.</span>yaml
serviceaccount/fluentd-es created
clusterrole<span class="token punctuation">.</span>rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/fluentd-es created
clusterrolebinding<span class="token punctuation">.</span>rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/fluentd-es created
daemonset<span class="token punctuation">.</span>extensions/fluentd-es created

<span class="token comment">## 然后查看一下pod是否已经在k8s-slave1和k8s-slave2节点启动成功</span>
$ kubectl <span class="token operator">-</span>n logging get po <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE
elasticsearch-logging-0 1/1 Running 0 123m
fluentd-es-246pl 1/1 Running 0 2m2s
fluentd-es-4e21w 1/1 Running 0 2m10s
kibana-944c57766-ftlcw 1/1 Running 0 50m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="efk功能验证" tabindex="-1"><a class="header-anchor" href="#efk功能验证" aria-hidden="true">#</a> EFK功能验证</h5>
<h6 id="验证思路" tabindex="-1"><a class="header-anchor" href="#验证思路" aria-hidden="true">#</a> 验证思路</h6>
<p>k8s-slave1和slave2中启动服务，同时往标准输出中打印测试日志，到kibana中查看是否可以收集</p>
<h6 id="创建测试容器" tabindex="-1"><a class="header-anchor" href="#创建测试容器" aria-hidden="true">#</a> 创建测试容器</h6>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> counter
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
<span class="token key atrule">fluentd</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> count
<span class="token key atrule">image</span><span class="token punctuation">:</span> alpine<span class="token punctuation">:</span><span class="token number">3.6</span>
<span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>/bin/sh<span class="token punctuation">,</span> <span class="token punctuation">-</span>c<span class="token punctuation">,</span>
<span class="token string">'i=0; while true; do echo "$i: $(date)"; i=$((i+1)); sleep 1; done'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl get po
NAME READY STATUS RESTARTS AGE
counter 1/1 Running 0 6s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="配置kibana" tabindex="-1"><a class="header-anchor" href="#配置kibana" aria-hidden="true">#</a> 配置kibana</h6>
<p>登录kibana界面，按照截图的顺序操作：</p>
<p>也可以通过其他元数据来过滤日志数据，比如可以单击任何日志条目以查看其他元数据，如容器名称，Kubernetes 节点，命名空间等，比如kubernetes.pod_name : counter</p>
<p>到这里，我们就在 Kubernetes 集群上成功部署了 EFK ，要了解如何使用 Kibana 进行日志数据分析，可以参考 Kibana 用户指南文档：<a href="https://www.elastic.co/guide/en/kibana/current/index.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/kibana/current/index.html<ExternalLinkIcon/></a></p>
</div></template>


