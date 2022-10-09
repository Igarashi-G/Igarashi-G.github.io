<template><div><h1 id="kubernets-基础" tabindex="-1"><a class="header-anchor" href="#kubernets-基础" aria-hidden="true">#</a> Kubernets 基础</h1>
<p>记录 <strong>kubernetes</strong> 相关文档、基础、使用说明等</p>
<!-- more -->
<h2 id="k8s-相关文档" tabindex="-1"><a class="header-anchor" href="#k8s-相关文档" aria-hidden="true">#</a> k8s 相关文档</h2>
<p><a href="https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/" target="_blank" rel="noopener noreferrer">官网 | 学习 Kubernetes 基础知识 | Kubernetes<ExternalLinkIcon/></a></p>
<p><a href="https://kubespray.io/#/" target="_blank" rel="noopener noreferrer">kubespray.io<ExternalLinkIcon/></a></p>
<p><a href="https://kuboard.cn/learning/" target="_blank" rel="noopener noreferrer">Kubernetes教程 | Kuboard<ExternalLinkIcon/></a></p>
<p>查看k8s 或docker 日志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>journalctl <span class="token parameter variable">-fu</span> <span class="token function">docker</span> <span class="token operator">|</span> kubelet

<span class="token comment"># 也可以用docker 看日志</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> + container_id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用Deployment管理Pod生命周期，实现服务不中断的滚动更新，通过服务发现来实现集群内部的服务间访问，并通过ingress-nginx实现外部使用域名访问集群内部的服务。同时介绍基于EFK如何搭建Kubernetes集群的日志收集系统。</p>
<h2 id="_1-kubernetes-概述" tabindex="-1"><a class="header-anchor" href="#_1-kubernetes-概述" aria-hidden="true">#</a> 1. Kubernetes 概述</h2>
<p>纯 <strong>Docker</strong> （<em>容器模式</em>） 的运维管理很难，尤其涉及到跨容器网络通信，故诞生了容器调度管理平台 <strong>Kubernetes</strong></p>
<h5 id="架构图如下" tabindex="-1"><a class="header-anchor" href="#架构图如下" aria-hidden="true">#</a> <strong>架构图如下</strong></h5>
<img src="@source/tool/Kubernets/img/架构图.png">
<h5 id="包含如下核心组件" tabindex="-1"><a class="header-anchor" href="#包含如下核心组件" aria-hidden="true">#</a> <strong>包含如下核心组件</strong></h5>
<ul>
<li>
<p><strong><a href="">etcd</a>：</strong> 分布式高性能键值数据库，存储整个集群的所有元数据</p>
</li>
<li>
<p><strong>ApiServer：</strong> 接口服务器，集群资源访问控制入口，提供 <strong>restful api</strong> 及安全访问控制</p>
</li>
<li>
<p><strong>Scheduler：</strong> 调度器，把业务容器调度到合适节点</p>
</li>
<li>
<p><strong>Controller Manager：</strong> 控制器，确保集群资源 <strong>按照期望的方式运行</strong></p>
</li>
<li>
<p>**Replication Controller **</p>
</li>
<li>
<p><strong>Node controller</strong></p>
</li>
<li>
<p><strong>ResourceQuota Controller</strong></p>
</li>
<li>
<p><strong>Namespace Controller</strong></p>
</li>
<li>
<p><strong>ServiceAccount Controller</strong></p>
</li>
<li>
<p>**Tocken Controller **</p>
</li>
<li>
<p>**Service Controller **</p>
</li>
<li>
<p><strong>Endpoints Controller</strong></p>
</li>
<li>
<p><strong>kubelet：</strong> 节点代理，运行再每个节点上，管节点的</p>
<ul>
<li><strong>pod：</strong>  容器的抽象，最小资源调度单位，管容器的，被 <strong>kubelet</strong> 管的</li>
<li><strong>容器健康检查：</strong> 检查容器是否正常运行，若运行出错，会按照<strong>pod</strong> 设置的重启策略处理</li>
<li><strong>容器监控：</strong> 监控所在节点资源的，会定时向 <strong>Master</strong> 报告，资源使用数据通过 <strong>cAdvisor</strong> 获取的，对于 <strong>pod</strong> 调度和正常运行至关重要</li>
<li><strong><a href="https://kubernetes.io/zh-cn/docs/reference/kubectl/" target="_blank" rel="noopener noreferrer">kubectl<ExternalLinkIcon/></a>：</strong> 命令行工具</li>
</ul>
</li>
<li>
<p><strong>cni：</strong> 通用网络接口，如 <strong>flannel</strong> 等的网络插件，实现集群跨节点通信</p>
</li>
</ul>
<h5 id="其工作流程" tabindex="-1"><a class="header-anchor" href="#其工作流程" aria-hidden="true">#</a> <strong>其工作流程</strong></h5>
<img src="@source/tool/Kubernets/img/工作流程.png">
<p>部署后则生成 <strong>kubelet</strong> 进程，可执行 <strong>kubectl</strong> 二进制命令行工具，其中</p>
<ul>
<li><strong>组件：</strong> 为了支撑 <strong>k8s</strong> 平台的运行，安装好的软件</li>
<li><strong>资源：</strong> 被 <strong>k8s</strong> 管理的</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 systemd 服务</span>
systemctl status kubelet

<span class="token comment"># 查看 api资源</span>
kubectl api-resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kubectl的使用" tabindex="-1"><a class="header-anchor" href="#kubectl的使用" aria-hidden="true">#</a> <strong>kubectl</strong>的使用</h5>
<p>类似于 <strong>docker</strong>，<strong><a href="https://kubernetes.io/zh-cn/docs/reference/kubectl/" target="_blank" rel="noopener noreferrer">kubectl<ExternalLinkIcon/></a></strong> 是命令行工具，用于与APIServer交互，内置了丰富的子命令，功能强大</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>h
$ kubectl get <span class="token operator">-</span>h
$ kubectl create <span class="token operator">-</span>h
$ kubectl create namespace <span class="token operator">-</span>h
<span class="token comment"># 管理集群资源</span>
$ kubectl get po <span class="token operator">-</span>v=7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-资源" tabindex="-1"><a class="header-anchor" href="#_2-资源" aria-hidden="true">#</a> 2. 资源</h2>
<h3 id="_2-1-namespace" tabindex="-1"><a class="header-anchor" href="#_2-1-namespace" aria-hidden="true">#</a> 2.1. namespace</h3>
<p>命名空间，集群内一个虚拟的概念，类似于资源池的概念，一个池子里可以有各种资源类型，绝大多数的资源都必须属于某一个namespace。集群初始化安装好之后，会默认有如下几个namespace：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get ns	<span class="token comment"># or get namespaces</span>

NAME                   STATUS   AGE
default                Active   10d
kube-node-lease        Active   10d
kube-public            Active   10d
kube-system            Active   10d
kubernetes-dashboard   Active   9d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>所有NAMESPACED的资源，在创建的时候都需要指定namespace，若不指定，默认会在default命名空间下</li>
<li>相同namespace下的同类资源不可以重名，不同类型的资源可以重名</li>
<li>不同namespace下的同类资源可以重名</li>
<li>通常在项目使用的时候，我们会创建带有业务含义的namespace来做逻辑上的整合</li>
</ul>
<h3 id="_2-2-pod" tabindex="-1"><a class="header-anchor" href="#_2-2-pod" aria-hidden="true">#</a> 2.2 Pod</h3>
<p><strong>最小调度单元</strong>，用来存放多个容器的（<em>豆荚</em>），为了与容器引擎（<em>Docker</em>）解耦，抽象出一层 <strong>Pod</strong> 让 <strong>k8s</strong> 进行调度，被 <strong>kubelet</strong> 定期 <strong>watch</strong> 更新状态写入 <strong>etcd</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">## 查看命名空间 kube-system 下的 pods</span>
$ kubectl <span class="token parameter variable">-n</span> kube-system get po
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="使用-yaml格式-定义-pod" tabindex="-1"><a class="header-anchor" href="#使用-yaml格式-定义-pod" aria-hidden="true">#</a> <strong>使用 yaml格式 定义 Pod</strong></h5>
<p><em>myblog/one-pod/pod.yaml</em></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">component</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/myblog
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST <span class="token comment"># 指定root用户的用户名</span>
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"127.0.0.1"</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123456"</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span>5.7<span class="token punctuation">-</span>utf8
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123456"</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_DATABASE
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"myblog"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
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
<p>资源类型与 <strong>apiVersion</strong> 对照表</p>
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
<p>快速获得资源和版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl explain pod
$ kubectl explain Pod.apiVersion
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="创建和访问pod" tabindex="-1"><a class="header-anchor" href="#创建和访问pod" aria-hidden="true">#</a> 创建和访问Pod</h5>
<p><a href="https://blog.51cto.com/u_14691718/5093025" target="_blank" rel="noopener noreferrer">基于Docker和Kubernetes的企业级DevOps实践训练营_51CTO博客_kubernetes和docker关系<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/weixin_43336281/article/details/107431104" target="_blank" rel="noopener noreferrer">基于Docker和Kubernetes的企业级DevOps实践训练营_Alex_996的博客-CSDN博客<ExternalLinkIcon/></a></p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 创建namespace, namespace是逻辑上的资源池</span>
$ kubectl create namespace demo

<span class="token comment">## 使用指定文件创建Pod</span>
$ kubectl create <span class="token operator">-</span>f demo-pod<span class="token punctuation">.</span>yaml

<span class="token comment">## 查看pod，可以简写po</span>
<span class="token comment">## 所有的操作都需要指定namespace，如果是在default命名空间下，则可以省略</span>
$ kubectl <span class="token operator">-</span>n demo get pods <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE IP NODE
myblog 2/2 Running 0 3m 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>146 k8s-slave1

<span class="token comment">## 使用Pod Ip访问服务,3306和8002</span>
$ curl 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>146:8002/blog/index/

<span class="token comment">## 进入容器,执行初始化, 不必到对应的主机执行docker exec</span>
$ kubectl <span class="token operator">-</span>n demo exec <span class="token operator">-</span>ti myblog <span class="token operator">-</span>c myblog bash
<span class="token operator">/</span> <span class="token comment"># env</span>
<span class="token operator">/</span> <span class="token comment"># python3 manage.py migrate</span>
$ kubectl <span class="token operator">-</span>n demo exec <span class="token operator">-</span>ti myblog <span class="token operator">-</span>c mysql bash
<span class="token operator">/</span> <span class="token comment"># mysql -p123456</span>

<span class="token comment">## 再次访问服务,3306和8002</span>
$ curl 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>146:8002/blog/index/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="infra容器" tabindex="-1"><a class="header-anchor" href="#infra容器" aria-hidden="true">#</a> Infra容器</h6>
<p>登录<code v-pre>k8s-slave1</code>节点</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ docker <span class="token function">ps</span> <span class="token operator">-</span>a <span class="token punctuation">|</span>grep myblog <span class="token comment">## 发现有三个容器</span>
<span class="token comment">## 其中包含mysql和myblog程序以及Infra容器</span>
<span class="token comment">## 为了实现Pod内部的容器可以通过localhost通信，每个Pod都会启动Infra容器，然后Pod内部的其他容器的网络空间会共享该Infra容器的网络空间(Docker网络的container模式)，Infra容器只需要hang住网络空间，不需要额外的功能，因此资源消耗极低。</span>

<span class="token comment">## 登录master节点，查看pod内部的容器ip均相同，为pod ip</span>
$ kubectl <span class="token operator">-</span>n demo exec <span class="token operator">-</span>ti myblog <span class="token operator">-</span>c myblog bash
<span class="token operator">/</span> <span class="token comment"># ifconfig</span>
$ kubectl <span class="token operator">-</span>n demo exec <span class="token operator">-</span>ti myblog <span class="token operator">-</span>c mysql bash
<span class="token operator">/</span> <span class="token comment"># ifconfig</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>pod容器命名: <code v-pre>k8s_&lt;container_name&gt;_&lt;pod_name&gt;_&lt;namespace&gt;_&lt;random_string&gt;</code></p>
<h6 id="查看pod详细信息" tabindex="-1"><a class="header-anchor" href="#查看pod详细信息" aria-hidden="true">#</a> 查看pod详细信息</h6>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 查看pod调度节点及pod_ip</span>
$ kubectl <span class="token operator">-</span>n demo get pods <span class="token operator">-</span>o wide
<span class="token comment">## 查看完整的yaml</span>
$ kubectl <span class="token operator">-</span>n demo get po myblog <span class="token operator">-</span>o yaml
<span class="token comment">## 查看pod的明细信息及事件</span>
$ kubectl <span class="token operator">-</span>n demo describe pod myblog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="troubleshooting-and-debugging" tabindex="-1"><a class="header-anchor" href="#troubleshooting-and-debugging" aria-hidden="true">#</a> Troubleshooting and Debugging</h6>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">#进入Pod内的容器</span>
$ kubectl <span class="token operator">-</span>n &lt;namespace> exec &lt;pod_name> <span class="token operator">-</span>c &lt;container_name> <span class="token operator">-</span>ti <span class="token operator">/</span>bin/sh

<span class="token comment">#查看Pod内容器日志,显示标准或者错误输出日志</span>
$ kubectl <span class="token operator">-</span>n &lt;namespace> logs <span class="token operator">-</span>f &lt;pod_name> <span class="token operator">-</span>c &lt;container_name>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="更新服务版本" tabindex="-1"><a class="header-anchor" href="#更新服务版本" aria-hidden="true">#</a> 更新服务版本</h6>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl apply <span class="token operator">-</span>f demo-pod<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="删除pod服务" tabindex="-1"><a class="header-anchor" href="#删除pod服务" aria-hidden="true">#</a> 删除Pod服务</h6>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">#根据文件删除</span>
$ kubectl delete <span class="token operator">-</span>f demo-pod<span class="token punctuation">.</span>yaml

<span class="token comment">#根据pod_name删除</span>
$ kubectl <span class="token operator">-</span>n &lt;namespace> delete pod &lt;pod_name>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="pod数据持久化" tabindex="-1"><a class="header-anchor" href="#pod数据持久化" aria-hidden="true">#</a> Pod数据持久化</h6>
<p>若删除了Pod，由于mysql的数据都在容器内部，会造成数据丢失，因此需要数据进行持久化。</p>
<ul>
<li>定点使用hostpath挂载，nodeSelector定点</li>
</ul>
<p><code v-pre>myblog/one-pod/pod-with-volume.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">component</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span> <span class="token comment"># 使用节点选择器将Pod调度到指定label的节点</span>
<span class="token key atrule">component</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/myblog
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST <span class="token comment"># 指定root用户的用户名</span>
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"127.0.0.1"</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123456"</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span>5.7<span class="token punctuation">-</span>utf8
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123456"</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_DATABASE
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"myblog"</span>
<span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>保存文件为<code v-pre>pod-with-volume.yaml</code>，执行创建</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 若存在旧的同名服务，先删除掉，后创建</span>
$ kubectl <span class="token operator">-</span>n demo delete pod myblog
<span class="token comment">## 创建</span>
$ kubectl create <span class="token operator">-</span>f pod-with-volume<span class="token punctuation">.</span>yaml

<span class="token comment">## 此时pod状态Pending</span>
$ kubectl <span class="token operator">-</span>n demo get po
NAME READY STATUS RESTARTS AGE
myblog 0/2 Pending 0 32s

<span class="token comment">## 查看原因，提示调度失败，因为节点不满足node selector</span>
$ kubectl <span class="token operator">-</span>n demo describe po myblog
Events:
<span class="token function">Type</span> Reason Age <span class="token keyword">From</span> Message
<span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
Warning FailedScheduling 12s <span class="token punctuation">(</span>x2 over 12s<span class="token punctuation">)</span> default-scheduler 0/3 nodes are available: 3 node<span class="token punctuation">(</span>s<span class="token punctuation">)</span> didn't match node selector<span class="token punctuation">.</span>

<span class="token comment">## 为节点打标签</span>
$ kubectl label node k8s-slave1 component=mysql

<span class="token comment">## 再次查看，已经运行成功</span>
$ kubectl <span class="token operator">-</span>n demo get po
NAME READY STATUS RESTARTS AGE IP NODE
myblog 2/2 Running 0 3m54s 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>150 k8s-slave1

<span class="token comment">## 到k8s-slave1节点，查看/opt/mysql/data</span>
$ ll <span class="token operator">/</span>opt/mysql/<span class="token keyword">data</span><span class="token operator">/</span>
total 188484
<span class="token operator">-</span>rw-r-<span class="token operator">--</span><span class="token operator">--</span> 1 polkitd input 56 Mar 29 09:20 auto<span class="token punctuation">.</span>cnf
<span class="token operator">-</span>rw-<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> 1 polkitd input 1676 Mar 29 09:20 ca-key<span class="token punctuation">.</span>pem
<span class="token operator">-</span>rw-r-<span class="token operator">-</span>r-<span class="token operator">-</span> 1 polkitd input 1112 Mar 29 09:20 ca<span class="token punctuation">.</span>pem
drwxr-x-<span class="token operator">--</span> 2 polkitd input 8192 Mar 29 09:20 sys
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment">## 执行migrate，创建数据库表，然后删掉pod，再次创建后验证数据是否存在</span>
$ kubectl <span class="token operator">-</span>n demo exec <span class="token operator">-</span>ti myblog python3 manage<span class="token punctuation">.</span>py migrate

<span class="token comment">## 访问服务，正常</span>
$ curl 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>150:8002/blog/index/

<span class="token comment">## 删除pod</span>
$ kubectl delete <span class="token operator">-</span>f pod-with-volume<span class="token punctuation">.</span>yaml

<span class="token comment">## 再次创建Pod</span>
$ kubectl create <span class="token operator">-</span>f pod-with-volume<span class="token punctuation">.</span>yaml

<span class="token comment">## 查看pod ip并访问服务</span>
$ kubectl <span class="token operator">-</span>n demo get po <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE IP NODE
myblog 2/2 Running 0 7s 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>151 k8s-slave1

<span class="token comment">## 未做migrate，服务正常</span>
$ curl 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>151:8002/blog/index/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>使用PV+PVC连接分布式存储解决方案</li>
<li>ceph</li>
<li>glusterfs</li>
<li>nfs</li>
</ul>
<h6 id="服务健康检查" tabindex="-1"><a class="header-anchor" href="#服务健康检查" aria-hidden="true">#</a> 服务健康检查</h6>
<p>检测容器服务是否健康的手段，若不健康，会根据设置的重启策略（restartPolicy）进行操作，两种检测机制可以分别单独设置，若不设置，默认认为Pod是健康的。</p>
<p>两种机制：</p>
<ul>
<li>LivenessProbe探针
用于判断容器是否存活，即Pod是否为running状态，如果LivenessProbe探针探测到容器不健康，则kubelet将kill掉容器，并根据容器的重启策略是否重启，如果一个容器不包含LivenessProbe探针，则Kubelet认为容器的LivenessProbe探针的返回值永远成功。</li>
<li>ReadinessProbe探针
用于判断容器是否正常提供服务，即容器的Ready是否为True，是否可以接收请求，如果ReadinessProbe探测失败，则容器的Ready将为False，控制器将此Pod的Endpoint从对应的service的Endpoint列表中移除，从此不再将任何请求调度此Pod上，直到下次探测成功。（剔除此pod不参与接收请求不会将流量转发给此Pod）。</li>
</ul>
<p>三种类型：</p>
<ul>
<li>exec：通过执行命令来检查服务是否正常，回值为0则表示容器健康</li>
<li>httpGet方式：通过发送http请求检查服务是否正常，返回200-399状态码则表明容器健康</li>
<li>tcpSocket：通过容器的IP和Port执行TCP检查，如果能够建立TCP连接，则表明容器健康</li>
</ul>
<p>示例：</p>
<p>完整文件路径 <code v-pre>myblog/one-pod/pod-with-healthcheck.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/myblog
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST <span class="token comment"># 指定root用户的用户名</span>
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"127.0.0.1"</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"123456"</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>initialDelaySeconds：容器启动后第一次执行探测是需要等待多少秒。</li>
<li>periodSeconds：执行探测的频率。默认是10秒，最小1秒。</li>
<li>timeoutSeconds：探测超时时间。默认1秒，最小1秒。</li>
<li>successThreshold：探测失败后，最少连续探测成功多少次才被认定为成功。默认是1。对于liveness必须是1，最小值是1。</li>
<li>failureThreshold：探测成功后，最少连续探测失败多少次
才被认定为失败。默认是3，最小值是1。</li>
</ul>
</div></template>


