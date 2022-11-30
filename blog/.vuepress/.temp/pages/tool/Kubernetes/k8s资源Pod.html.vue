<template><div><p>记录 <strong>kubernetes</strong> 相关文档、基础、<strong>Pod</strong> 的使用说明等</p>
<!-- more -->
<h2 id="kubernetes-相关文档" tabindex="-1"><a class="header-anchor" href="#kubernetes-相关文档" aria-hidden="true">#</a> Kubernetes 相关文档</h2>
<p><a href="https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/" target="_blank" rel="noopener noreferrer">官网 | 学习 Kubernetes 基础知识 | Kubernetes<ExternalLinkIcon/></a></p>
<p><a href="https://kubespray.io/#/" target="_blank" rel="noopener noreferrer">kubespray.io<ExternalLinkIcon/></a></p>
<p><a href="https://kuboard.cn/learning/" target="_blank" rel="noopener noreferrer">Kubernetes教程 | Kuboard<ExternalLinkIcon/></a></p>
<div class="custom-container warning">
<p class="custom-container-title">重要：查看 k8s 或 docker 日志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>journalctl <span class="token parameter variable">-fu</span> <span class="token function">docker</span> <span class="token operator">|</span> kubelet

<span class="token comment"># 也可以用docker 看日志</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> + container_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="_1-kubernetes-概述" tabindex="-1"><a class="header-anchor" href="#_1-kubernetes-概述" aria-hidden="true">#</a> 1. Kubernetes 概述</h2>
<p><strong>Docker</strong> （<em>纯容器模式</em>） 的运维管理麻烦，尤其涉及到跨容器网络通信及其复杂、难管理，故诞生了容器调度管理平台 <strong>Kubernetes</strong> ，由于功能强大，<strong>17</strong> 年后渐渐成为主流</p>
<h5 id="架构图如下" tabindex="-1"><a class="header-anchor" href="#架构图如下" aria-hidden="true">#</a> <strong>架构图如下</strong></h5>
<img src="@source/tool/Kubernetes/img/架构图.png">
<p>分为 <strong>Master</strong> 节点和 <strong>Node</strong> 节点</p>
<h5 id="包含如下核心组件" tabindex="-1"><a class="header-anchor" href="#包含如下核心组件" aria-hidden="true">#</a> <strong>包含如下核心组件</strong></h5>
<ul>
<li><strong><a href="">etcd</a>：</strong> 分布式高性能键值 <strong>数据库</strong>，存储整个集群的所有元数据，<strong>只通过 ApiServer 访问</strong></li>
<li><strong>ApiServer：</strong> <strong>接口</strong> 服务器，用来交互的，集群资源访问控制入口，提供 <strong>restful api</strong> 及安全访问控制</li>
<li><strong>Scheduler：</strong> <strong>调度器</strong>，把业务容器调度到合适节点</li>
<li><strong>Controller Manager：</strong> <strong>控制管理器，20来种的统称</strong>，确保集群资源按照期望的方式运行，生成元数据，故在调度之前，<strong>k8s 中最复杂的点</strong>
<ul>
<li><strong>ReplicaSet</strong></li>
<li><strong>Service Controller</strong></li>
<li><strong>ServiceAccount Controller</strong></li>
<li><strong>Node controller</strong></li>
<li><strong>ResourceQuota Controller</strong></li>
<li><strong>Namespace Controller</strong></li>
<li><strong>Tocken Controller</strong></li>
<li><strong>Endpoints Controller</strong></li>
</ul>
</li>
<li><strong>kubelet：</strong> 节点代理，运行在每个节点上，管节点同时汇报情况给 <strong>Master</strong> 管理节点
<ul>
<li><strong>pod管理：</strong>  容器的抽象，最小资源调度单位，管容器的，被 <strong>kubelet</strong> 管的</li>
<li><strong>容器健康检查：</strong> 检查容器是否正常运行，若运行出错，按照 <strong>pod</strong> 设置的重启策略处理</li>
<li><strong>容器监控：</strong> 监控容器所在节点资源的使用情况，定时向 <strong>Master</strong> 报告，资源使用数据通过 <strong>cAdvisor</strong> 获取的，对于 <strong>pod</strong> 调度和正常运行至关重要</li>
</ul>
</li>
<li><strong>kube-proxy：</strong> 负责 <strong>Pod</strong> 间的通信和负载均衡 <strong>iptables</strong> 或 <strong>ipvs</strong> 规则</li>
<li><strong><a href="https://kubernetes.io/zh-cn/docs/reference/kubectl/" target="_blank" rel="noopener noreferrer">kubectl<ExternalLinkIcon/></a>：</strong> 命令行工具</li>
<li><strong>CNI：</strong> 通用网络接口，如 <strong>flannel</strong> 等的网络插件，实现集群跨节点通信</li>
</ul>
<h5 id="其工作流程如下" tabindex="-1"><a class="header-anchor" href="#其工作流程如下" aria-hidden="true">#</a> <strong>其工作流程如下</strong></h5>
<img src="@source/tool/Kubernetes/img/工作流程.png">
<div class="custom-container warning">
<p class="custom-container-title">关于性能</p>
<p><strong>ApiServer</strong> 压测 <strong>10w+</strong> 大概才会出现性能问题（<em>应该是普通的企业主机配置</em>）</p>
</div>
<p>部署后则生成 <strong>kubelet</strong> 进程，可执行 <strong>kubectl</strong> 二进制命令行工具，其中</p>
<ul>
<li><strong>组件：</strong> 启动的一个进程，为了支撑 <strong>k8s</strong> 平台的运行，安装好的软件</li>
<li><strong>资源：</strong> <strong>k8s</strong> 提供的能力，被 <strong>k8s</strong> 所管理</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 systemd 服务</span>
systemctl status kubelet

<span class="token comment"># 查看 kubernetes的资源，简写</span>
kubectl api-resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kubectl的使用" tabindex="-1"><a class="header-anchor" href="#kubectl的使用" aria-hidden="true">#</a> <strong>kubectl</strong>的使用</h5>
<p>类似于 <strong>docker</strong>，<strong><a href="https://kubernetes.io/zh-cn/docs/reference/kubectl/" target="_blank" rel="noopener noreferrer">kubectl<ExternalLinkIcon/></a></strong> 是 <strong>CLI</strong>，用于与 <strong>APIServer</strong> 交互，内置了丰富的子命令，功能强大</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>h
$ kubectl get <span class="token operator">-</span>h
$ kubectl create <span class="token operator">-</span>h
$ kubectl create namespace <span class="token operator">-</span>h
<span class="token comment"># 管理集群资源</span>
$ kubectl get po <span class="token operator">-</span>v=7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-namespace" tabindex="-1"><a class="header-anchor" href="#_2-namespace" aria-hidden="true">#</a> 2. namespace</h2>
<p>命名空间，集群内的虚拟概念，类似于资源池，池中有各种资源，绝大多数的资源都必须属于某一个<strong>namespace</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 集群初始化安装好之后，会默认有如下几个</span>
$ kubectl get ns	<span class="token comment"># or get namespaces</span>

NAME                   STATUS   AGE
default                Active   10d
kube-node-lease        Active   10d
kube-public            Active   10d
kube-system            Active   10d
kubernetes-dashboard   Active   9d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>所有 <strong>namespaces</strong> 资源，创建时都要指定 <code v-pre>-n ns</code>，若不指定，默认为 <strong>default</strong></li>
<li>同一个 <strong>namespace</strong> 下的同类资源 <strong>不能重名</strong>，不同类型的资源可以重名，不同 <strong>namespace</strong> 也可</li>
<li>在项目通常创建带有业务含义的 <strong>namespace</strong> 来做逻辑上的整合</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl <span class="token parameter variable">-n</span> xxxns get xxx	<span class="token comment"># 命名空间放前面，方便复用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<h2 id="_3-pod" tabindex="-1"><a class="header-anchor" href="#_3-pod" aria-hidden="true">#</a> 3. Pod</h2>
<p><strong>最小调度单元</strong>，理解为存放多个容器的（<em>豆荚</em>），为和容器引擎（<em>Docker</em>）解耦（<em>如 <strong>1.22.x</strong> 改用 <strong>containerd</strong></em>），抽象出一层 <strong>Pod</strong> 让 <strong>k8s</strong> 进行调度，被 <strong>kubelet</strong> 定期 <strong>watch</strong> ，更新状态并写入 <strong>etcd</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看命名空间 kube-system 下的 pods</span>
$ kubectl <span class="token parameter variable">-n</span> kube-system get po
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="使用-yaml格式-定义-pod" tabindex="-1"><a class="header-anchor" href="#使用-yaml格式-定义-pod" aria-hidden="true">#</a> <strong>使用 yaml格式 定义 Pod</strong></h5>
<p><strong>yaml</strong> 工程师，推荐使用<strong>yaml</strong> 而非 <strong>json</strong>，因为大家都用 <strong>yaml...</strong> 如下创建一个 <code v-pre>django.yaml</code> 文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1										<span class="token comment"># API 版本</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod											<span class="token comment"># 资源类型</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog										<span class="token comment"># Pod 名称</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit									<span class="token comment"># 指定命名空间</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>											<span class="token comment"># 作标记</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> zzblog
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>										<span class="token comment"># 编写 Pod 中 包含的容器列表</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog									<span class="token comment"># 容器名</span>
      <span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.3.171<span class="token punctuation">:</span>5000/myblog<span class="token punctuation">:</span>v1			<span class="token comment"># 拉取镜像地址</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent					<span class="token comment"># 若本地无，再去远程拉取</span>
      <span class="token key atrule">env</span><span class="token punctuation">:</span>											<span class="token comment"># 环境变量</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST 							<span class="token comment"># 环境变量 Key - Value</span>
        <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"127.0.0.1"</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
        <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123456"</span>
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
      <span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.3.171<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
      <span class="token key atrule">env</span><span class="token punctuation">:</span>											
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
        <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123456"</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_DATABASE
        <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"myblog"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th style="text-align:left">apiVersion</th>
<th style="text-align:left">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><strong>alpha</strong></td>
<td style="text-align:left">进入 <strong>k8s</strong> 功能的早期候选版本，可能包含 <strong>Bug</strong>，最终不一定进入 <strong>k8s</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>beta</strong></td>
<td style="text-align:left">已经过测试的版本，最终会进入 <strong>k8s</strong>，但功能、对象定义可能会发生变更</td>
</tr>
<tr>
<td style="text-align:left"><strong>stable</strong></td>
<td style="text-align:left">可安全使用的稳定版本</td>
</tr>
<tr>
<td style="text-align:left"><strong>v1</strong></td>
<td style="text-align:left"><strong>stable</strong> 版本之后的首个版本，包含了更多的核心对象</td>
</tr>
<tr>
<td style="text-align:left"><strong>apps/v1</strong></td>
<td style="text-align:left">使用最广泛的版本，像 <strong>Deployment</strong>，<strong>ReplicaSets</strong> 都已进入该版本</td>
</tr>
</tbody>
</table>
<p><strong>资源类型</strong> 与 <strong>apiVersion</strong> 的对照表（<em>编写如下资源的 <strong>yaml</strong> 该指定那个 <strong>apiVersion</strong></em>）</p>
<table>
<thead>
<tr>
<th style="text-align:left">Kind</th>
<th style="text-align:left">apiVersion</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><strong>ClusterRoleBinding</strong></td>
<td style="text-align:left"><strong><a href="http://rbac.authorization.k8s.io/v1" target="_blank" rel="noopener noreferrer">rbac.authorization.k8s.io/v1<ExternalLinkIcon/></a></strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>ClusterRole</strong></td>
<td style="text-align:left"><strong><a href="http://rbac.authorization.k8s.io/v1" target="_blank" rel="noopener noreferrer">rbac.authorization.k8s.io/v1<ExternalLinkIcon/></a></strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>ConfigMap</strong></td>
<td style="text-align:left"><strong>v1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>CronJob</strong></td>
<td style="text-align:left"><strong>batch/v1beta1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>DaemonSet</strong></td>
<td style="text-align:left"><strong>extensions/v1beta1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>Node</strong></td>
<td style="text-align:left"><strong>v1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>Namespace</strong></td>
<td style="text-align:left"><strong>v1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>Secret</strong></td>
<td style="text-align:left"><strong>v1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>PersistentVolume</strong></td>
<td style="text-align:left"><strong>v1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>PersistentVolumeClaim</strong></td>
<td style="text-align:left"><strong>v1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>Pod</strong></td>
<td style="text-align:left"><strong>v1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>Deployment</strong></td>
<td style="text-align:left"><strong>v1、apps/v1、apps/v1beta1、apps/v1beta2</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>Service</strong></td>
<td style="text-align:left"><strong>v1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>Ingress</strong></td>
<td style="text-align:left"><strong>extensions/v1beta1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>ReplicaSet</strong></td>
<td style="text-align:left"><strong>apps/v1、apps/v1beta2</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>Job</strong></td>
<td style="text-align:left"><strong>batch/v1</strong></td>
</tr>
<tr>
<td style="text-align:left"><strong>StatefulSet</strong></td>
<td style="text-align:left"><strong>apps/v1、apps/v1beta1、apps/v1beta2</strong></td>
</tr>
</tbody>
</table>
<p>快速查看 <strong>资源</strong> 对应的 <strong>版本</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl explain pod
$ kubectl explain Pod.apiVersion
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="镜像拉取策略" tabindex="-1"><a class="header-anchor" href="#镜像拉取策略" aria-hidden="true">#</a> <strong>镜像拉取策略</strong></h5>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>Always：</strong> 即使本地有，也总是远程仓库拉取镜像</li>
<li><strong>IfNotPresent：</strong>  默认为此，本地有则使用本地镜像，没有才去远程仓库拉取</li>
<li><strong>Never：</strong> 只使用本地镜像，没有则报错</li>
</ul>
<h3 id="_3-1-infra-容器" tabindex="-1"><a class="header-anchor" href="#_3-1-infra-容器" aria-hidden="true">#</a> 3.1 <strong>Infra 容器</strong></h3>
<p>登录 <strong>k8s-slave-172</strong> 节点，执行如下命令，发现有 <strong>三个容器</strong> （<em>上文只编写了两个</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token operator">|</span><span class="token function">grep</span> blog

4321affa391e   c20987f18b13                                        <span class="token string">"docker-entrypoint.s…"</span>   About an hour ago   Up About an hour                    k8s_mysql_ublog_uit_2905ba41-b03a-4d8d-8fb3-538e962dccbc_0
766410c81aee   2fd137e95f13                                        <span class="token string">"./run.sh"</span>               About an hour ago   Up About an hour                    k8s_myblog_ublog_uit_2905ba41-b03a-4d8d-8fb3-538e962dccbc_0
29feb4ab89be   registry.aliyuncs.com/google_containers/pause:3.1   <span class="token string">"/pause"</span>                 About an hour ago   Up About an hour                    k8s_POD_ublog_uit_2905ba41-b03a-4d8d-8fb3-538e962dccbc_0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>包含了上文编写的 <strong>mysql</strong> 和 <strong>myblog</strong> 两个，但额外多出个 <strong>pause</strong> 状态的容器</p>
<div class="custom-container info">
<p class="custom-container-title">为了实现 Pod 内部容器，能通过 localhost 通信:</p>
<ul>
<li>每个 <strong>Pod</strong> 都会启动 <strong>Infra</strong> 容器</li>
<li><strong>Pod</strong> 内部的网络空间会共享 <strong>Infra</strong> 容器的网络空间（<em>类比 <strong>Docker</strong> 网络的 <strong>container</strong> 模式</em> ）</li>
<li><strong>Infra</strong> 容器只需 <strong>夯住</strong> 网络空间，无需额外功能，资源消耗极低</li>
</ul>
</div>
<p>查看 <strong>Pod</strong> 内部的容器 <strong>IP</strong> ，会发现均相同，都为 <strong>Pod IP</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 如下的 10.244.1.23 </span>
$ kubectl <span class="token parameter variable">-nuit</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> ublog <span class="token parameter variable">-c</span> myblog <span class="token function">ifconfig</span>
eth0: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">></span>  mtu <span class="token number">1450</span>
        inet <span class="token number">10.244</span>.1.23  netmask <span class="token number">255.255</span>.255.0  broadcast <span class="token number">10.244</span>.1.255
        ether 1e:8c:df:d3:f3:00  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">38</span>  bytes <span class="token number">3026</span> <span class="token punctuation">(</span><span class="token number">2.9</span> KiB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">24</span>  bytes <span class="token number">6618</span> <span class="token punctuation">(</span><span class="token number">6.4</span> KiB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">Pod 容器命名</p>
<p><strong>k8s _&lt;container_name&gt;_&lt;pod_name&gt;_&lt;namespace&gt;_&lt;random_string&gt;</strong></p>
</div>
<h3 id="_3-2-pod-基本操作" tabindex="-1"><a class="header-anchor" href="#_3-2-pod-基本操作" aria-hidden="true">#</a> 3.2 <strong>Pod 基本操作</strong></h3>
<h5 id="创建和访问pod" tabindex="-1"><a class="header-anchor" href="#创建和访问pod" aria-hidden="true">#</a> 创建和访问Pod</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建 命名空间（namespace） 逻辑上的资源池</span>
$ kubectl create namespace uit

<span class="token comment"># 使用指定文件创建 Pod</span>
$ kubectl create <span class="token parameter variable">-f</span> django.yaml

<span class="token comment"># 所有的操作都需要指定 -n 即namespace，但 default 命名空间可省略，</span>
$ kubectl <span class="token parameter variable">-n</span> demo get pods <span class="token parameter variable">-o</span> wide
NAME    READY   STATUS    RESTARTS   AGE   IP            NODE            NOMINATED NODE   READINESS GATES
ublog   <span class="token number">2</span>/2     Running   <span class="token number">0</span>          69m   <span class="token number">10.244</span>.1.23   k8s-slave-172   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
<span class="token comment"># - 查看pod，可以简写 po（其他资源同）</span>
<span class="token comment"># - -o wide 表示查看广泛的信息，即详情</span>
<span class="token comment"># - -o yaml/json|more 还可查看 Pod 是根据什么样的原文件运行的</span>

<span class="token comment"># 使用 Pod IP 访问服务 上文得出 IP 是10.244.1.23 被调度到了 k8s-slave-172 节点</span>
$ <span class="token function">curl</span> <span class="token number">10.244</span>.1.23:8002/blog/index

<span class="token comment"># 进入容器执行初始化, 不必到对应的主机执行docker exec</span>
$ kubectl <span class="token parameter variable">-n</span> uit <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> ublog <span class="token parameter variable">-c</span> myblog /bin/bash

<span class="token comment"># 查看环境变量</span>
$ <span class="token function">env</span><span class="token operator">|</span><span class="token function">grep</span> MYSQL
<span class="token assign-left variable">MYSQL_HOST</span><span class="token operator">=</span><span class="token number">127.0</span>.0.1
<span class="token assign-left variable">MYSQL_PASSWD</span><span class="token operator">=</span><span class="token number">123456</span>

<span class="token comment"># 初始化数据库</span>
$ python3 manage.py migrate

<span class="token comment"># 进入另一个容器 -c: chose 表选择</span>
$ kubectl <span class="token parameter variable">-n</span> uit <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> ublog <span class="token parameter variable">-c</span> mysql <span class="token function">bash</span>

<span class="token comment"># 查看数据库</span>
$ mysql <span class="token parameter variable">-p123456</span>
$ show databases<span class="token punctuation">;</span>

<span class="token comment"># 退出 或 ctrl + d</span>
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="删除-pod-服务" tabindex="-1"><a class="header-anchor" href="#删除-pod-服务" aria-hidden="true">#</a> <strong>删除 Pod 服务</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 根据文件删除</span>
$ kubectl delete <span class="token parameter variable">-f</span> django.yaml

<span class="token comment"># 根据 Pod name 删除</span>
$ kubectl <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>namespace<span class="token operator">></span> delete pod <span class="token operator">&lt;</span>pod_name<span class="token operator">></span>
<span class="token comment"># 如 kubectl -n uit delete pod ublog</span>

<span class="token comment"># 删的慢 可以手动切到对应节点，执行</span>
$ <span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>container<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="troubleshooting-and-debugging" tabindex="-1"><a class="header-anchor" href="#troubleshooting-and-debugging" aria-hidden="true">#</a> <strong>Troubleshooting and Debugging</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 Pod 的 明细信息 及 事件</span>
$ kubectl <span class="token parameter variable">-n</span> uit describe pod ublog

<span class="token comment"># 进入 Pod 内的 容器</span>
$ kubectl <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>namespace<span class="token operator">></span> <span class="token builtin class-name">exec</span> <span class="token operator">&lt;</span>pod_name<span class="token operator">></span> <span class="token parameter variable">-c</span> <span class="token operator">&lt;</span>container_name<span class="token operator">></span> <span class="token parameter variable">-ti</span> /bin/sh

<span class="token comment"># 查看 Pod 内容器 日志，显示标准或者错误输出日志</span>
$ kubectl <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>namespace<span class="token operator">></span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">20</span> <span class="token operator">&lt;</span>pod_name<span class="token operator">></span> <span class="token parameter variable">-c</span> <span class="token operator">&lt;</span>container_name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="更新-pod-服务版本-若更改文件" tabindex="-1"><a class="header-anchor" href="#更新-pod-服务版本-若更改文件" aria-hidden="true">#</a> 更新 Pod 服务版本（<em>若更改文件</em> ）</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># apply 应用使之生效</span>
$ kubectl apply <span class="token parameter variable">-f</span> django.yaml

<span class="token comment"># 仅特定字段 如：镜像版本 之类的改动才会生效，例如 labels、env 之类的改动不会生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-pod-数据持久化-挂载" tabindex="-1"><a class="header-anchor" href="#_3-3-pod-数据持久化-挂载" aria-hidden="true">#</a> 3.3 <strong>Pod 数据持久化（<em>挂载</em> ）</strong></h3>
<p>若删除了 <strong>Pod</strong>，但 <strong>MySQL</strong> 的数据都在容器内部，会造成数据丢失，故需挂载出来持久化</p>
<p>使用 <strong>hostpath</strong> 和 <strong>nodeSelector</strong> 定点挂载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看节点的 labels 如下</span>
$ kubectl get no --show-labels
NAME             STATUS   ROLES    AGE   VERSION   LABELS
k8s-master-171   Ready    master   15d   v1.16.2   beta.kubernetes.io/arch<span class="token operator">=</span>amd64,beta.kubernetes.io/os<span class="token operator">=</span>linux,kubernetes.io/arch<span class="token operator">=</span>amd64,kubernetes.io/hostname<span class="token operator">=</span>k8s-master-171,kubernetes.io/os<span class="token operator">=</span>linux,node-role.kubernetes.io/master<span class="token operator">=</span>
k8s-slave-172    Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>   15d   v1.16.2   beta.kubernetes.io/arch<span class="token operator">=</span>amd64,beta.kubernetes.io/os<span class="token operator">=</span>linux,kubernetes.io/arch<span class="token operator">=</span>amd64,kubernetes.io/hostname<span class="token operator">=</span>k8s-slave-172,kubernetes.io/os<span class="token operator">=</span>linux
k8s-slave-173    Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>   15d   v1.16.2   beta.kubernetes.io/arch<span class="token operator">=</span>amd64,beta.kubernetes.io/os<span class="token operator">=</span>linux,kubernetes.io/arch<span class="token operator">=</span>amd64,kubernetes.io/hostname<span class="token operator">=</span>k8s-slave-173,kubernetes.io/os<span class="token operator">=</span>linux

<span class="token comment"># 给 node 节点资源打 label</span>
$ kubectl label <span class="token function">node</span> k8s-slave-172 <span class="token assign-left variable">component</span><span class="token operator">=</span>zz
<span class="token comment"># 删除即 “-” 号</span>
$ kubectl label <span class="token function">node</span> k8s-slave-172 component-

<span class="token comment"># 再次查看 172 的 labels 发现前面已显示</span>
$ kubectl get no --show-labels <span class="token operator">|</span><span class="token function">grep</span> k8s-slave-172
k8s-slave-172    Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>   15d   v1.16.2   beta.kubernetes.io/arch<span class="token operator">=</span>amd64,beta.kubernetes.io/os<span class="token operator">=</span>linux,component<span class="token operator">=</span>zz,kubernetes.io/arch<span class="token operator">=</span>amd64,kubernetes.io/hostname<span class="token operator">=</span>k8s-slave-172,kubernetes.io/os<span class="token operator">=</span>linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后改写文件如下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> zzblog
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>								<span class="token comment"># 宿主机 的挂载，与 containers 同级</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
      <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data			<span class="token comment"># 宿主机 的挂载点</span>
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span> 						<span class="token comment"># 使用 节点选择器，将 Pod 调度到指定 label 的节点</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> zz
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>										
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.3.171<span class="token punctuation">:</span>5000/myblog<span class="token punctuation">:</span>v1
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"127.0.0.1"</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123456"</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.3.171<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>											
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
        <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123456"</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_DATABASE
        <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"myblog"</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>						<span class="token comment"># 定义 源 的挂载</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data					<span class="token comment"># 上文 宿主机 定义的卷名</span>
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql			<span class="token comment"># 容器中 源 的 挂载点</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时重新创建</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 在 k8s-slave-172 查看目录</span>
<span class="token function">ls</span> /opt/mysql/data/
<span class="token punctuation">..</span><span class="token punctuation">..</span> <span class="token variable"><span class="token variable">`</span>发现会多出一堆 pod 上 mysql 的文件<span class="token variable">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning">
<p class="custom-container-title">局限性</p>
<p>只能 <strong>固定在单个节点</strong> 上持久化，若该节点挂了，此时存储的数据也随之而挂</p>
<p>因此，可使用 <strong>PV + PVC</strong> 的方式 <strong>对接分布式存储</strong>来解决</p>
<ul>
<li><strong>分布式存储：</strong> <strong>UFS</strong>、 <strong>ceph</strong> 、<strong>glusterfs</strong>、<strong>nfs</strong>（<em>高可用版</em>）</li>
</ul>
</div>
<h3 id="_3-4-服务健康检查" tabindex="-1"><a class="header-anchor" href="#_3-4-服务健康检查" aria-hidden="true">#</a> 3.4 <strong>服务健康检查</strong></h3>
<p>检测容器服务是否健康的手段，若不健康，会根据设置的 <strong>重启策略</strong>（<em>restartPolicy</em>）进行操作，两种检测机制可以分别单独设置，若不设置，默认<strong>Pod</strong> 一直健康</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>										
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.3.171<span class="token punctuation">:</span>5000/myblog<span class="token punctuation">:</span>v1
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
    <span class="token comment"># ReadinessProbe:</span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>		<span class="token comment"># 容器启动后，x s后，才开始第一次探测</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>				<span class="token comment"># 执行探测的频率，默认是 10s，隔 x s后，再探测</span>
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>				<span class="token comment"># 探测超时时间，默认 1s，最小 1s</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>LivenessProbe 探针（<em>存活性检查</em> ）</strong></p>
<p><strong>kubelet</strong> 根据配置的探针判断容器是否存活（<em><strong>Running</strong> 状态</em>），若不健康 <strong>kubelet</strong> 会 <strong>kill</strong> 掉容器，并根据配置的重启策略重启，若不包含 <strong>LivenessProbe</strong> 探针，则返回值永远成功</p>
</li>
<li>
<p><strong>ReadinessProbe 探针（<em>可用性检查</em> ）</strong></p>
<p><strong>kubelet</strong> 根据配置的探针判断容器是否正常提供服务（<em><strong>Ready</strong> 是否为 <strong>True</strong></em>） 可以接收请求，如果失败，容器的 <strong>Ready</strong> 为 <strong>False</strong>，控制器将此 <strong>Pod</strong> 的 <strong>Endpoint</strong> 从对应的 <strong>service</strong> 的 <strong>Endpoint</strong> 列表中移除，从此不再将任何请求调度该 <strong>Pod</strong> 上，直到下次探测成功为止</p>
</li>
<li>
<p><strong>检测类型</strong></p>
<ul>
<li>
<p><strong>exec：</strong> 通过执行命令来检查服务是否正常，回值为 <strong>0</strong> 则表示容器健康</p>
</li>
<li>
<p><strong>httpGet：</strong> 通过发送 <strong>http</strong> 请求检查服务是否正常，返回 <strong>200-399</strong> 状态码则表明容器健康</p>
</li>
<li>
<p><strong>tcpSocket：</strong> 通过容器的 <strong>IP</strong> 和 <strong>Port</strong> 执行 <strong>TCP</strong> 检查，如果能够建立 <strong>TCP</strong> 连接，则表明容器健康</p>
</li>
</ul>
</li>
<li>
<p><strong>successThreshold：</strong> 探测失败后，最少连续探测成功多少次才被认定为成功，默认是<strong>1</strong></p>
<ul>
<li>对于 <strong>LivenessProbe</strong> 必须是<strong>1</strong>，最小值是<strong>1</strong></li>
</ul>
</li>
<li>
<p><strong>failureThreshold：</strong> 探测成功后，最少连续探测失败多少次才被认定为失败，默认是 <strong>3</strong>，最小值 <strong>1</strong></p>
</li>
</ul>
<div class="custom-container note">
<p class="custom-container-title">举例</p>
<p>按上文配置，<strong>Pod 的容器</strong> 启动 <strong>5s（<em>initialDelaySeconds</em>）</strong> 后，用 <strong>HTTP</strong> 访问 <strong>8002</strong> 端口的 <strong>/blog/index/</strong> 路由，若 <strong>超过2s</strong> 或 返回码不在 <strong>200~399</strong> 内，连续 <strong>failureThreshold</strong> 次，则健康检查失败</p>
</div>
<h5 id="重启策略-restartpolicy" tabindex="-1"><a class="header-anchor" href="#重启策略-restartpolicy" aria-hidden="true">#</a> <strong>重启策略（<em>RestartPolicy</em>）</strong></h5>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token punctuation">...</span>
<span class="token key atrule">spce</span><span class="token punctuation">:</span>
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> OnFailure
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token punctuation">...</span>
    <span class="token key atrule">args</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> /bin/sh
    <span class="token punctuation">-</span> <span class="token punctuation">-</span>c
    <span class="token punctuation">-</span> sleep 10 <span class="token important">&amp;&amp;</span> exit 0
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用于 <strong>Pod</strong> 内的所有容器，仅由 <strong>kubelet</strong> 进行判断和重启操作，当某个 <strong>容器异常退出</strong> 或 <strong>健康检查失败</strong> 时，<strong>kubelet</strong> 来进行如下设置的操作</p>
<ul>
<li><strong>Always：</strong> 默认为此，容器失败，自动重启</li>
<li><strong>OnFailure：</strong> 容器终止运行且退出码不为 <strong>0</strong> 时（<em>异常退出</em> ），自动重启（<em>正常则返回 Complete</em> ）</li>
<li><strong>Never：</strong> 不论运行状态如何，都不会重启该容器</li>
</ul>
<h3 id="_3-5-pod-资源限制" tabindex="-1"><a class="header-anchor" href="#_3-5-pod-资源限制" aria-hidden="true">#</a> 3.5 <strong>Pod 资源限制</strong></h3>
<p>保证充分利用集群资源，且确保重要容器在运行周期内能够分配到足够的资源稳定运行，因此平台需要具备</p>
<p>Pod的资源限制的能力， 资源限制最关注的即 <strong>CPU</strong> 和 <strong>Memory</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
    <span class="token punctuation">...</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token key atrule">requests</span><span class="token punctuation">:</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
      <span class="token key atrule">limits</span><span class="token punctuation">:</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>requests：</strong> （<em>不会限制最大使用资源</em>）</p>
<ul>
<li>
<p>容器使用的最小资源需求，作用于 <strong>schedule</strong> 阶段，作为容器调度时资源分配的判断依赖</p>
</li>
<li>
<p>只有当前节点上可分配的资源量 <strong>&gt;= request</strong> 时才允许将容器调度到该节点</p>
</li>
<li>
<p><strong>requests.cpu</strong> 会被转成容器的 <code v-pre>--cpu-shares</code> 参数，与 <strong>cgroup cpu.shares</strong> 功能相同 (<em>无论宿主机有多少个 <strong>CPU</strong> 或者内核，都会按照比例分配</em>）</p>
</li>
<li>
<p>r<strong>equests.memory</strong> 没有对应容器的参数，仅作为 <strong>k8s</strong> 调度依据</p>
</li>
</ul>
</li>
<li>
<p><strong>limits：</strong></p>
<ul>
<li>
<p>容器能使用资源的最大值</p>
</li>
<li>
<p>设置为 <strong>0</strong> 表示对使用的资源不做限制，可无限的使用</p>
</li>
<li>
<p>当 <strong>pod</strong> 内存超过 <strong>limit</strong> 时，会被 <strong>oom</strong></p>
</li>
<li>
<p>但 <strong>cpu</strong> 超时不会被 <strong>kill</strong>，但会限制不超过 <strong>limit</strong> 值（<em>由于 <strong>CPU</strong> 是可压缩资源</em>）</p>
</li>
<li>
<p><strong>limits.cpu</strong> 会被转换成容器的 <code v-pre>-–cpu-quota</code> 参数。与 <strong>cgroup cpu.cfs_quota_us</strong> 功能相同</p>
</li>
<li>
<p><strong>limits.memory</strong> 会被转换成容器的 <code v-pre>-–memory</code> 参数，用于限制容器使用的最大内存</p>
</li>
</ul>
</li>
</ul>
<p>计算机的 <strong>CPU</strong> 是按 <strong>时间片</strong> 的方式来进行分配的，系统里的每一个操作都需要 <strong>CPU</strong> 的处理，哪个任务申请的时间片多，即得到的 <strong>CPU</strong> 资源越多</p>
<p><strong>CGroup</strong> 里面对于 <strong>CPU</strong> 资源的单位换算：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">1</span> CPU <span class="token operator">=</span> <span class="token number">1000</span> millicpu（1 Core <span class="token operator">=</span> 1000m）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>1<strong>000m：</strong> 其中 <strong>m</strong> 表示毫、毫核的意思</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p><strong>Kubernetes</strong> 中的每个节点通过操作系统命令确认自身 <strong>CPU</strong> 内核数量，然后乘以<strong>1000</strong>，得到的就是节点总 <strong>CPU</strong> 总毫数</p>
<ul>
<li>比如一个节点有<strong>四核</strong>，那么该节点的 <strong>CPU</strong> 总毫量为 <strong>4000m</strong></li>
</ul>
<p><code v-pre>docker run</code> 命令和 <strong>CPU</strong> 限制相关的所有选项如下</p>
<table>
<thead>
<tr>
<th>选项</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>--cpuset-cpus=&quot;&quot;</code></td>
<td>允许使用的 CPU 集，值可以为 0-3,0,1</td>
</tr>
<tr>
<td><code v-pre>-c</code>,<code v-pre>--cpu-shares=0</code></td>
<td>CPU 共享权值（相对权重）</td>
</tr>
<tr>
<td><code v-pre>cpu-period=0</code></td>
<td>限制 CPU CFS 的周期，范围从 100ms~1s，即[1000, 1000000]</td>
</tr>
<tr>
<td><code v-pre>--cpu-quota=0</code></td>
<td>限制 CPU CFS 配额，必须不小于1ms，即 &gt;= 1000，绝对限制</td>
</tr>
</tbody>
</table>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> --cpu-period<span class="token operator">=</span><span class="token number">50000</span> --cpu-quota<span class="token operator">=</span><span class="token number">25000</span> ubuntu:20.04 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将调度的周期设为 <strong>50000</strong>，容器在每个周期内的 <strong>CPU</strong> 配额设置为 <strong>25000</strong>，表示该容器每 <strong>50ms</strong> 可以得到 <strong>50%</strong> 的 <strong>CPU</strong> 运行时间</p>
</div>
<h3 id="_3-6-configmap-和-secret-配置" tabindex="-1"><a class="header-anchor" href="#_3-6-configmap-和-secret-配置" aria-hidden="true">#</a> 3.6 ConfigMap 和 Secret（<em>配置</em> ）</h3>
<p>在真实使用场景中，上述 <strong>Pod</strong> 存在如下问题需要 <strong>优化</strong></p>
<ul>
<li>
<p><strong>中间件应作为公共资源</strong> （<em>数据库、MQ、Cache 等</em> ），为多个项目提供服务</p>
<ul>
<li>不适合与业务容器绑定同一 <strong>Pod</strong> ，因为业务容器往往经常变更，而中间件则很少迭代</li>
</ul>
</li>
<li>
<p><strong>密码、环境变量等应该统一管理</strong></p>
</li>
</ul>
<p>针对环境变量，<strong>k8s</strong> 提供 <strong>configMap</strong> 和 <strong>Secret</strong>，实现业务配置的统一管理， 允许将配置文件与镜像文件分离，以使容器化的应用程序具有可移植性 。</p>
<h4 id="configmap-常用环境变量" tabindex="-1"><a class="header-anchor" href="#configmap-常用环境变量" aria-hidden="true">#</a> <strong>ConfigMap（<em>常用环境变量</em> ）</strong></h4>
<p>通常用来管理应用的 <strong>配置文件</strong> 或者 <strong>环境变量</strong> （<em>非特别敏感</em> ），可以将环境相关的信息存入 <strong>ConfigMap</strong> 里面， 然后 <strong>Pod</strong> 去其中读，如下创建文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">MYSQL_HOST</span><span class="token punctuation">:</span> <span class="token string">"192.168.3.172"</span>	<span class="token comment"># 下文会通过 label 将调度指定 k8s-slave-172 节点</span>
  <span class="token key atrule">MYSQL_PORT</span><span class="token punctuation">:</span> <span class="token string">"3306"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建并查看</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> configmap.yaml
$ kubectl <span class="token parameter variable">-n</span> uit get cm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种创建方式 <code v-pre>configmap.txt</code> ，好处是灵活、写的少</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> configmap.txt
<span class="token assign-left variable">MYSQL_HOST</span><span class="token operator">=</span><span class="token number">192.168</span>.3.172
<span class="token assign-left variable">MYSQL_PORT</span><span class="token operator">=</span><span class="token number">3306</span>

$ kubectl <span class="token parameter variable">-n</span> uit create configmap ublog --from-env-file<span class="token operator">=</span>configmap.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="secret-密码" tabindex="-1"><a class="header-anchor" href="#secret-密码" aria-hidden="true">#</a> <strong>Secret（<em>密码</em> ）</strong></h4>
<p>常用来管理 <strong>敏感类</strong> 的信息，默认会 <strong>base64</strong> 编码存储，有三种类型</p>
<ul>
<li><strong>Service Account ：</strong> 用来访问 <strong>k8s API</strong>，自动创建，且会自动挂载到 <strong>Pod</strong> 上的 <code v-pre>/run/secrets/kubernetes.io/serviceaccount</code> 目录，之后 <strong>Pod</strong> 指定 <strong>serviceAccount</strong> 自动创建对应的 <strong>secret</strong></li>
<li><strong>Opaque ：</strong> 是 <strong>base64</strong> 编码格式的 <strong>Secret</strong>，用来 <strong>存储密码、密钥</strong> 等</li>
<li><strong><a href="http://kubernetes.io/dockerconfigjson" target="_blank" rel="noopener noreferrer">kubernetes.io/dockerconfigjson<ExternalLinkIcon/></a> ：</strong> 用来存储私有 <strong>docker registry</strong> 的认证信息</li>
</ul>
<p>如下创建一个 <code v-pre>secret.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">MYSQL_USER</span><span class="token punctuation">:</span> cm9vdA== 			<span class="token comment"># 注意加 -n 参数, echo -n root|base64</span>
  <span class="token key atrule">MYSQL_PASSWD</span><span class="token punctuation">:</span> MTIzNDU2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建并查看：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> secret.yaml
$ kubectl <span class="token parameter variable">-n</span> uit get secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种创建方式 <code v-pre>secret.txt</code> ，好处同上</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">cat</span> secret.txt
<span class="token assign-left variable">MYSQL_USER</span><span class="token operator">=</span>root
<span class="token assign-left variable">MYSQL_PASSWD</span><span class="token operator">=</span><span class="token number">123456</span>
$ kubectl <span class="token parameter variable">-n</span> uit create secret generic ublog --from-env-file<span class="token operator">=</span>secret.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="中间件容器-mysql" tabindex="-1"><a class="header-anchor" href="#中间件容器-mysql" aria-hidden="true">#</a> <strong>中间件容器：（<em>MySQL</em>）</strong></h5>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> zz
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>						<span class="token comment"># 修改为 host 模式，此时 MySQL运行的IP 为 宿主机IP</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> zz
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.3.171<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>						<span class="token comment"># 映射 secret.txt 中设置的敏感值</span>
        <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
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
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>hostNetwork：</strong> 声明 <strong>Pod</strong> 的网络模式为 <strong>host</strong> 模式，等同 <code v-pre>docker run --net=host</code></li>
</ul>
<p><strong>业务容器：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> zz
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
      <span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.3.171<span class="token punctuation">:</span>5000/myblog<span class="token punctuation">:</span>v1
      <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
      <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST
        <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>						<span class="token comment"># 同上 映射配置 configmap.txt 指定的环境变量</span>
          <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
            <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_HOST
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
        <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
          <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
            <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PASSWD
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行创建</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> mysql.yaml
$ kubectl create <span class="token parameter variable">-f</span> ublog.yaml

<span class="token comment"># 访问 ublog Pod 服务正常</span>
$ <span class="token function">curl</span> <span class="token number">10.244</span>.2.18:8002/blog/index/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>补充：</strong> <code v-pre>/etc/kubernetes/manifests</code> 目录下存放  <strong>静态Pod</strong>，即凡是放在这个目录下的 <strong>yaml</strong> 文件，<strong>k8s</strong> 会自动创建，无需执行 <code v-pre>kubectl create -f</code> ，且删除也会自动拉起，目录下的 <strong>yaml</strong> 可用于编写参考（<em>同时有这种目录的，一定是 <strong>kubeadm</strong> 搭建起来的集群</em>）</p>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<ul>
<li>
<p>部署不同的环境时，<strong>Pod</strong> 的 <strong>yaml</strong> 无须再变化，只在每套环境中维护一套 <strong>ConfigMap</strong> 和 <strong>Secret</strong> 即可</p>
</li>
<li>
<p><strong>ConfigMap</strong> 和 <strong>secret</strong> 不能跨 <strong>namespace</strong> 使用</p>
</li>
<li>
<p>更新配置后，<strong>Pod</strong> 内的 <strong>env</strong> 不会自动更新，重建后方可更新</p>
</li>
</ul>
</div>
<h3 id="_3-7-pod-状态与生命周期" tabindex="-1"><a class="header-anchor" href="#_3-7-pod-状态与生命周期" aria-hidden="true">#</a> 3.7 <strong>Pod 状态与生命周期</strong></h3>
<table>
<thead>
<tr>
<th>状态值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Pending</strong></td>
<td><strong>API Server</strong> 已经创建该 <strong>Pod</strong>，等待调度器调度</td>
</tr>
<tr>
<td><strong>ContainerCreating</strong></td>
<td>镜像正在创建</td>
</tr>
<tr>
<td><strong>Running</strong></td>
<td><strong>Pod</strong> 内，容器均已创建，且至少有一个容器处于运行状态、正在启动状态或正在重启状态</td>
</tr>
<tr>
<td><strong>Succeeded</strong></td>
<td><strong>Pod</strong> 内，所有容器均已成功执行退出，且不再重启</td>
</tr>
<tr>
<td><strong>Failed</strong></td>
<td><strong>Pod</strong> 内，所有容器均已退出，但至少有一个容器退出为失败状态</td>
</tr>
<tr>
<td><strong>CrashLoopBackOff</strong></td>
<td><strong>Pod</strong> 内，有容器启动失败，比如配置文件丢失导致主进程启动失败</td>
</tr>
<tr>
<td><strong>Unknown</strong></td>
<td>由于某种原因无法获取该 <strong>Pod</strong> 的状态，可能由于网络通信不畅导致（<em>少见</em>）</td>
</tr>
</tbody>
</table>
<h5 id="启动和关闭示意" tabindex="-1"><a class="header-anchor" href="#启动和关闭示意" aria-hidden="true">#</a> <strong>启动和关闭示意</strong></h5>
<img src="@source/tool/Kubernetes/img/Pod启动和关闭.jpg">
<img src="@source/tool/Kubernetes/img/Pod启动流程.jpg">
<p><strong>init container：</strong> 初始化容器，做一些初始化操作</p>
<ul>
<li>验证业务应用依赖的组件是否均已启动</li>
<li>修改目录权限</li>
<li>调整系统参数</li>
</ul>
<p><strong>main container：</strong> 执行的主容器，即 <strong>containers</strong> 下定义的</p>
<p><strong>lifecycle：</strong> 有如下两个钩子</p>
<ul>
<li><strong>postStart：</strong> 容器启动该做的事情，和 <strong>mainContainer</strong> 不分先后</li>
<li><strong>preStop：</strong> 容器停止之前该做的事情</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">command</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> /sbin/sysctl
    <span class="token punctuation">-</span> <span class="token punctuation">-</span>w 
    <span class="token punctuation">-</span> vm.max_map_count=262144
    <span class="token key atrule">image</span><span class="token punctuation">:</span> alpine<span class="token punctuation">:</span><span class="token number">3.6</span>
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">name</span><span class="token punctuation">:</span> elasticsearch<span class="token punctuation">-</span>logging<span class="token punctuation">-</span>init
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
      <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fix<span class="token punctuation">-</span>permissions
    <span class="token key atrule">image:alpine</span><span class="token punctuation">:</span> <span class="token number">3.6</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"sh"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> <span class="token string">"chown -R 1000:1000 /usr/share/elasticsearch/data"</span><span class="token punctuation">]</span>
    <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
      <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> elasticsearch<span class="token punctuation">-</span>logging
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/elasticsearch/data
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证 <strong>Pod</strong> 生命周期示例，<code v-pre>demo-pod-start.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> demo<span class="token punctuation">-</span>start<span class="token punctuation">-</span>stop
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> demo<span class="token punctuation">-</span>start<span class="token punctuation">-</span>stop
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> init
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo $(date +%s): INIT >> /load/timing'</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /load
      <span class="token key atrule">name</span><span class="token punctuation">:</span> timing
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> main
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo $(date +%s): START >> /load/timing;sleep 10; echo $(date +%s): END >> /loap/timing;'</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /load
      <span class="token key atrule">name</span><span class="token punctuation">:</span> timing
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">exec</span><span class="token punctuation">:</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo $(date +%s): LIVENESS >> /load/timing'</span><span class="token punctuation">]</span>
    <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">exec</span><span class="token punctuation">:</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo $(date +%s): READINESS >> /load/timing'</span><span class="token punctuation">]</span>
    <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
      <span class="token key atrule">postStart</span><span class="token punctuation">:</span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo $(date +%s): POST-START >> /load/timing'</span><span class="token punctuation">]</span>
      <span class="token key atrule">preStop</span><span class="token punctuation">:</span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo $(date +%s): PRE-STOP >> /load/timing'</span><span class="token punctuation">]</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> timing
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /tmp/load
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 Pod 测试</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> demo-pod-start.yaml

<span class="token comment"># 查看demo状态</span>
$ kubectl <span class="token parameter variable">-n</span> uit get po <span class="token parameter variable">-o</span> wide <span class="token parameter variable">-w</span>

<span class="token comment"># 查看调度节点 k8s-slave-172 的/tmp/loap/timing</span>
$ <span class="token function">cat</span> /tmp/load/timing
<span class="token number">1666057181</span>: INIT
<span class="token number">1666057199</span>: START
<span class="token number">1666057199</span>: POST-START
<span class="token number">1666057202</span>: LIVENESS
<span class="token number">1666057206</span>: READINESS
<span class="token number">1666057227</span>: START
<span class="token number">1666057227</span>: POST-START
<span class="token number">1666057232</span>: LIVENESS
<span class="token number">1666057236</span>: READINESS
<span class="token number">1666057272</span>: START
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>须主动杀掉 <strong>Pod</strong> 才会触发 <code v-pre>pre-stop hook</code>，如果是 <strong>Pod</strong> 自己 <strong>Down</strong> 掉，则不会执行 <code v-pre>pre-stop hook</code></p>
</blockquote>
<h3 id="_3-8-pod-驱逐策略-简述" tabindex="-1"><a class="header-anchor" href="#_3-8-pod-驱逐策略-简述" aria-hidden="true">#</a> <strong>3.8 Pod 驱逐策略（<em>简述</em>）</strong></h3>
<p><strong>k8s</strong> 有个特色功能叫 <strong>pod eviction</strong>，它在某些场景下如：节点 <strong>NotPodReady</strong>、或者资源不足时，把 <strong>Pod</strong> 驱逐至其它节点，是出于业务保护的角度去考虑的</p>
<ol>
<li>
<p><strong>Kube-controller-manager：</strong> 周期性检查所有节点状态，当节点处于 <strong>NotReady</strong> 状态超过一段时间后，驱逐该节点上所有 <strong>pod</strong>，并停掉 <strong>kubelet</strong></p>
<ul>
<li>
<p><strong>pod-eviction-timeout：（<em>controller-manager的一个参数</em>）</strong> 当 <strong>NotReady</strong> 状态节点超过该时间后，执行驱逐，默认 <strong>5 min</strong>，仅适用于 <strong>1.13</strong> 版本之前</p>
<ul>
<li>
<p><strong>1.13</strong> 版本后，集群开启 <code v-pre>TaintBasedEvictions</code> 与 <code v-pre>TaintNodesByCondition</code> 功能，若节点失联等异常，<strong>k8s</strong> 会自动为该节点打上 <strong>污点</strong> ，同时为 <strong>Pod</strong> 默认添加如下容忍设置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoExecute
  <span class="token key atrule">key</span><span class="token punctuation">:</span> node.kubernetes.io/not<span class="token punctuation">-</span>ready
  <span class="token key atrule">operator</span><span class="token punctuation">:</span> Exists
  <span class="token key atrule">tolerationSeconds</span><span class="token punctuation">:</span> <span class="token number">300</span>
<span class="token punctuation">-</span> <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoExecute
  <span class="token key atrule">key</span><span class="token punctuation">:</span> node.kubernetes.io/unreachable
  <span class="token key atrule">operator</span><span class="token punctuation">:</span> Exists
  <span class="token key atrule">tolerationSeconds</span><span class="token punctuation">:</span> <span class="token number">300</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>各 <strong>Pod</strong> 可以独立设置驱逐容忍时间</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>Kubelet：</strong> 周期性检查本节点资源，当资源不足时，按照优先级驱逐部分 <strong>Pod</strong></p>
<ul>
<li>
<p><strong>memory.available：</strong> 节点可用内存</p>
</li>
<li>
<p><strong>nodefs.available：</strong> 节点根盘可用存储空间</p>
</li>
<li>
<p><strong>nodefs.inodesFree：</strong> 节点 <strong>inodes</strong> 可用数量</p>
</li>
<li>
<p><strong>imagefs.available：</strong> 镜像存储盘的可用空间</p>
</li>
<li>
<p><strong>imagefs.inodesFree：</strong> 镜像存储盘的 <strong>inodes</strong> 可用数量</p>
</li>
</ul>
</li>
</ol>
</div></template>


