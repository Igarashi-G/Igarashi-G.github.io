<template><div><p><strong>k8s</strong> 的工作负载、服务</p>
<!-- more -->
<h1 id="workload-工作负载" tabindex="-1"><a class="header-anchor" href="#workload-工作负载" aria-hidden="true">#</a> Workload （<em>工作负载</em>）</h1>
<div class="custom-container warning">
<p class="custom-container-title">只使用 Pod, 将会面临如下需求难以解决</p>
<ol>
<li>业务应用如何启动多个副本</li>
<li><strong>Pod</strong> 重建后 <strong>IP</strong> 会变化，如何保证依然能通信</li>
<li>外部如何访问 <strong>Pod</strong> 服务</li>
<li>运行业务 <strong>Pod</strong> 的某个节点挂了，如何故障自动转移</li>
<li>若需求是收集各节点监控数据，如何将 <strong>Pod</strong> 运行在 <strong>k8s</strong> 集群的各个节点上</li>
</ol>
</div>
<h2 id="_1-控制器-controller" tabindex="-1"><a class="header-anchor" href="#_1-控制器-controller" aria-hidden="true">#</a> 1. 控制器 <em>Controller</em></h2>
<p>控制器又称 <strong>工作负载</strong>，是 <strong>管理 Pod 的中间层</strong>，确保 <strong>Pod</strong> 资源符合预期的状态</p>
<ul>
<li>资源出现故障时，会尝试 进行重启</li>
<li>当根据重启策略无效，则会重新创建 <strong>Pod</strong> 资源</li>
</ul>
<p>简要预览如下控制器</p>
<ul>
<li>
<p><strong>ReplicaSet：</strong> 代用户创建指定数量的 <strong>Pod 副本</strong> 数量，确保副本数量符合预期状态，并且 <strong>支持滚动式自动扩容和缩容功能</strong></p>
</li>
<li>
<p><strong>Deployment：</strong> 工作在 <strong>ReplicaSet</strong> 之上，用于 <strong>管理无状态应用</strong>，目前来说 <strong>最好</strong> 的控制器，<strong>支持滚动更新和回滚</strong> 功能，还提供声明式配置</p>
</li>
<li>
<p><strong>DaemonSet：<strong>用于确保集群中，每一个节点只运行特定的 <strong>Pod</strong> 副本（<em>通常也就一个</em>），通常用于</strong>实现系统级后台任务</strong>，比如<strong>ELK</strong> 日志服务、监控服务</p>
</li>
<li>
<p><strong>Job：</strong> 只要完成就立即退出，不需要重启或重建</p>
</li>
<li>
<p><strong>Cronjob：</strong> <strong>周期性任务</strong> 控制，不需要持续后台运行</p>
</li>
<li>
<p><strong>StatefulSet：</strong> 管理 <strong>有状态应用</strong></p>
</li>
</ul>
<h3 id="_1-1-deployments" tabindex="-1"><a class="header-anchor" href="#_1-1-deployments" aria-hidden="true">#</a> 1.1 Deployments</h3>
<p><strong>Deployments</strong> 是管理 <strong>Pod</strong> 的控制器，工作在 <strong>ReplicaSet</strong> 之上，用于 <strong>管理无状态应用</strong>，之前 <strong>Pod</strong> 的配置，会指定在 <code v-pre>template:</code> 之下</p>
<h5 id="中间件容器" tabindex="-1"><a class="header-anchor" href="#中间件容器" aria-hidden="true">#</a> <strong>中间件容器：</strong></h5>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment            <span class="token comment"># 此时为控制器 Deployment</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> zz
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>               <span class="token comment"># 指定 Pod 副本数</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>                 <span class="token comment"># 指定 Pod 选择器</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>            <span class="token comment"># 必定与下文 labels 对应</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>               <span class="token comment"># 给 Pod 打 label，与上文 matchLabels: 对应</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>     <span class="token comment"># 声明 pod 的网络模式为host模式，效果同 docker run --net=host</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>         <span class="token comment"># 使用节点选择器将 Pod 调度到指定 label 的节点</span>
        <span class="token key atrule">component</span><span class="token punctuation">:</span> zz
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
        <span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.3.171<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制器通过 <strong>label</strong> 可以找到对应的 <strong>Pod</strong> ，此时可通过 <strong>label</strong> 进行过滤</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> uit get po <span class="token parameter variable">-l</span> <span class="token assign-left variable">component</span><span class="token operator">=</span>zz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="业务容器-改造同上" tabindex="-1"><a class="header-anchor" href="#业务容器-改造同上" aria-hidden="true">#</a> <strong>业务容器：（<em>改造同上</em>）</strong></h5>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span> 
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>  
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>  
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="操作" tabindex="-1"><a class="header-anchor" href="#操作" aria-hidden="true">#</a> <strong>操作</strong></h4>
<p><strong>Deployment</strong> 创建、查看</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建</span>
$ kubectl create <span class="token parameter variable">-f</span> deployxx.yaml

<span class="token comment"># 查看</span>
$ kubectl <span class="token parameter variable">-n</span> uit get deploy
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
mysql   <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           11m
ublog   <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           10m

* <span class="token variable"><span class="token variable">`</span>NAME<span class="token variable">`</span></span> 		<span class="token comment"># 列出了集群中 Deployments 的名称</span>
* <span class="token variable"><span class="token variable">`</span>READY<span class="token variable">`</span></span> 		<span class="token comment"># 显示当前 正在运行的/期望的 副本数</span>
* <span class="token variable"><span class="token variable">`</span>UP-TO-DATE<span class="token variable">`</span></span>	<span class="token comment"># 显示已更新 以实现期望状态的 副本数</span>
* <span class="token variable"><span class="token variable">`</span>AVAILABLE<span class="token variable">`</span></span>	<span class="token comment"># 显示应用程序 可供用户使用的 副本数</span>
* <span class="token variable"><span class="token variable">`</span>AGE<span class="token variable">`</span></span> 		<span class="token comment"># 显示应用程序运行的 时间量</span>

<span class="token comment"># 查看 replicasets 或是 rs 简写</span>
$ kubectl <span class="token parameter variable">-n</span> uit get replicasets
NAME               DESIRED   CURRENT   READY   AGE
mysql-6fbb5cc967   <span class="token number">1</span>         <span class="token number">1</span>         <span class="token number">1</span>       10m
ublog-5ff678657f   <span class="token number">1</span>         <span class="token number">1</span>         <span class="token number">1</span>       10m

<span class="token comment"># 查看 pod</span>
kubectl <span class="token parameter variable">-n</span> uit get po
NAME                     READY   STATUS    RESTARTS   AGE
mysql-6fbb5cc967-48dfd   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          12m
ublog-5ff678657f-m42hz   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          11m

<span class="token string">"此时会发现 Pod 的名字是 deployment -> replicasets -> pod 一步步根据 被管理者名称 拼接的"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Deployment</strong> 更新，有如下三种方式</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#修改yaml文件，使用 apply 应用更新</span>
$ kubectl <span class="token parameter variable">-n</span> uit apply <span class="token parameter variable">-f</span> ublog.yaml

<span class="token comment"># 通过命令更新，太长太难记</span>
$ kubectl <span class="token builtin class-name">set</span> image deploy ublog <span class="token assign-left variable">ublog</span><span class="token operator">=</span><span class="token number">192.168</span>.3.171:5000/myblog:v2 <span class="token parameter variable">--record</span>

<span class="token comment"># 推荐：直接在线编辑</span>
$ kubectl <span class="token parameter variable">-n</span> uit edit deploy ublog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-replicaset-副本保障机制" tabindex="-1"><a class="header-anchor" href="#_1-2-replicaset-副本保障机制" aria-hidden="true">#</a> 1.2 Replicaset（<em>副本保障机制</em>）</h3>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicaset/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 修改 yaml 文件的副本数</span>
<span class="token punctuation">...</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>		<span class="token comment"># 修改为2，然后执行 apply 即可更新</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将上文的 <strong>deployment</strong> 的副本数量修改为 <strong>2</strong>，然后执行 <code v-pre>apply</code> 即可更新</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> mysql.yaml

<span class="token comment"># 查看 Pod，此时发现新的副本正在创建中...但由于调度指定，且端口被占了，中间件是不会创建成功的</span>
kubectl <span class="token parameter variable">-n</span> uit get po
NAME                     READY   STATUS    RESTARTS   AGE
mysql-6fbb5cc967-48dfd   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          23m
mysql-6fbb5cc967-rdlrb   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          58s
ublog-5ff678657f-m42hz   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          22m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，还可以 <strong>通过命令</strong> 修改副本数量</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 通过命令设置 3个副本</span>
$ kubectl <span class="token parameter variable">-n</span> uit scale deploy mysql <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>
deployment.apps/mysql scaled

<span class="token comment"># 观察 Pod, 此时发现又有一个新的副本正在创建中...</span>
$ kubectl <span class="token parameter variable">-n</span> uit get po
NAME                     READY   STATUS    RESTARTS   AGE
mysql-6fbb5cc967-48dfd   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          25m
mysql-6fbb5cc967-957gj   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          8s
mysql-6fbb5cc967-rdlrb   <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          3m27s
ublog-5ff678657f-m42hz   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          25m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container info">
<p class="custom-container-title">其他方式</p>
<p>当然，还可通过 <code v-pre>kubectl -n uit edit deploy mysql</code> 的方式，但最好还是上文改 <strong>yaml</strong> 文件然后 <code v-pre>apply</code> 的方式，有迹可循</p>
</div>
<h5 id="replicasets-高可用" tabindex="-1"><a class="header-anchor" href="#replicasets-高可用" aria-hidden="true">#</a> <strong>Replicasets 高可用</strong></h5>
<p><strong>Replicasets controller</strong> 实时检测 <strong>Pod</strong> 状态，并保障副本数一直处于期望的值，此时是无法通过普通的指定来删除 <strong>Pod</strong> 的，由于要保证预期副本数，执行删除，也会被 <strong>Replicasets</strong> 自动拉起</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 删除 Pod，观察 Pod 状态变化</span>
$ kubectl <span class="token parameter variable">-n</span> uit delete pod ublog-5ff678657f-m42hz

<span class="token comment"># 发现 旧副本执行删除，并有新副本创建</span>
$ kubectl <span class="token parameter variable">-n</span> uit get pod
NAME                     READY   STATUS              RESTARTS   AGE
mysql-6fbb5cc967-48dfd   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          34m
ublog-5ff678657f-8xcp7   <span class="token number">0</span>/1     ContainerCreating   <span class="token number">0</span>          1s
ublog-5ff678657f-nbs77   <span class="token number">1</span>/1     Terminating         <span class="token number">0</span>          82s

<span class="token comment"># 然后 新副本成功运行，继续删除旧副本</span>
mysql-6fbb5cc967-48dfd   <span class="token number">1</span>/1     Running       <span class="token number">0</span>          35m
ublog-5ff678657f-8xcp7   <span class="token number">1</span>/1     Running       <span class="token number">0</span>          39s
ublog-5ff678657f-nbs77   <span class="token number">0</span>/1     Terminating   <span class="token number">0</span>          2m

<span class="token comment"># 最后 恢复如初</span>
mysql-6fbb5cc967-48dfd   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          35m
ublog-5ff678657f-8xcp7   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          41s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-1-replicaset-服务更新" tabindex="-1"><a class="header-anchor" href="#_1-2-1-replicaset-服务更新" aria-hidden="true">#</a> <strong>1.2.1 Replicaset  服务更新</strong></h4>
<p>修改 <strong>Dockerfile</strong>，重新打 <strong>tag</strong> 可以模拟服务更新（<em>v1 -&gt; v2</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 修改前端的显示文案</span>
$ <span class="token function">vim</span> ./python-demo/blog/templates/index.html

<span class="token comment"># 重新 build 镜像，但是指定 tag 未生效，只有镜像ID</span>
$ <span class="token function">docker</span> build <span class="token builtin class-name">.</span> <span class="token parameter variable">-t</span> <span class="token number">192.168</span>.3.171:5000/myblog:v2 <span class="token parameter variable">-f</span> Dockerfile

<span class="token comment"># 手动打 tag 并上传</span>
$ <span class="token function">docker</span> tag 728e50e60021 <span class="token number">192.168</span>.3.171:5000/myblog:v2
$ <span class="token function">docker</span> push <span class="token number">192.168</span>.3.171:5000/myblog:v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时副本数为 <strong>3</strong> 的情况下，修改镜像版本</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 Pod，发现 新版本镜像正在 滚动更新</span>
kubectl <span class="token parameter variable">-nuit</span> get po <span class="token parameter variable">-owide</span>
NAME                     READY   STATUS              RESTARTS   AGE     IP              NODE            NOMINATED NODE   READINESS GATES
mysql-6fbb5cc967-48dfd   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          11h     <span class="token number">192.168</span>.3.172   k8s-slave-172   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
ublog-5f55c5568b-2ggd7   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          48s     <span class="token number">10.244</span>.1.27     k8s-slave-172   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
ublog-5f55c5568b-jstms   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          24s     <span class="token number">10.244</span>.2.24     k8s-slave-173   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
ublog-5f55c5568b-mgn96   <span class="token number">0</span>/1     ContainerCreating   <span class="token number">0</span>          1s      <span class="token operator">&lt;</span>none<span class="token operator">></span>          k8s-slave-172   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
ublog-5ff678657f-5k2d7   <span class="token number">1</span>/1     Terminating         <span class="token number">0</span>          2m35s   <span class="token number">10.244</span>.1.26     k8s-slave-172   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
ublog-5ff678657f-8xcp7   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          10h     <span class="token number">10.244</span>.2.22     k8s-slave-173   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
ublog-5ff678657f-d8fkk   <span class="token number">1</span>/1     Terminating         <span class="token number">0</span>          2m35s   <span class="token number">10.244</span>.2.23     k8s-slave-173   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="更新策略" tabindex="-1"><a class="header-anchor" href="#更新策略" aria-hidden="true">#</a> <strong>更新策略</strong></h5>
<p>也可通过执行如下命令查看到</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-nuit</span> get deploy ublog -oyaml<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-n7</span> strategy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">progressDeadlineSeconds</span><span class="token punctuation">:</span> <span class="token number">600</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>						<span class="token comment"># 上文修改 Pod 副本数</span>
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">10</span>			<span class="token comment"># 保留的历史版本</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>							<span class="token comment"># 上文指定的 Pod 选择器</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
      
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>							<span class="token comment"># 此时发现会有如下默认配置项</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> 25%
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> 25%
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate				<span class="token comment"># 指定更新方式为 滚动更新，默认策略</span>
  
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="@source/tool/Kubernetes/img/滚动更新.jpg">
<p><strong>策略控制</strong></p>
<ul>
<li>
<p><strong>maxSurge：</strong> 最大激增（<em>存活</em>）数，指更新过程中，最多可比 <strong>replicas</strong> （<em>预设副本数</em>）多出的 <strong>Pod</strong> 数量</p>
<ul>
<li>可为 固定值 或 百分比，默认为 <strong>desired Pods</strong> 数的 <strong>25%</strong>，</li>
<li>计算时 <strong>向上取整</strong> （<em>比如 3.2，取 4</em>），更新过程中最多会有 <strong>replicas + maxSurge</strong> 个 <strong>Pod</strong></li>
</ul>
</li>
<li>
<p><strong>maxUnavailable：</strong> 最大不可用数，指更新过程中，最多有几个 <strong>Pod</strong> 处于无法服务状态 ,</p>
<ul>
<li>可以为 固定值 或 百分比，默认为 <strong>desired Pods</strong> 数的 <strong>25%</strong></li>
<li>计算时 <strong>向下取整</strong> （<em>比如 2.8，取 2</em>）</li>
</ul>
</li>
</ul>
<div class="custom-container info">
<p class="custom-container-title">Deployment rollingUpdate 时，需要</p>
<ul>
<li>
<p>保证 <strong>Running</strong> 活着的（<em>非异常状态的</em>） <strong>Pods</strong> 数不超过 <strong>desired pods number + maxSurge</strong></p>
</li>
<li>
<p>保证 <strong>Available（<em>Ready状态的</em>） Pods</strong> 数不低于 <strong>desired pods number - maxUnavailable</strong></p>
</li>
</ul>
</div>
<div class="custom-container note">
<p class="custom-container-title">假设 3 副本的 ublog</p>
<p><strong>Running</strong> 状态的 <strong>Pod</strong> 最多不超过 <strong>3 + 1（<em>3 x 25%=0.75</em>） = 4</strong> 个</p>
<p><strong>Running</strong> 状态的 <strong>Pod</strong> 最少不低于 <strong>3 - 1（<em>3 x 25%=0.75</em>） = 3</strong> 个</p>
<ol>
<li>先 新增一个 <strong>v2</strong> 版本的 <strong>Pod</strong>，此时 <strong>3</strong> 个 <strong>v1</strong> 版本 <strong>+ 1</strong> 个<strong>v2</strong> 版本的，当前 <strong>Pod=4</strong> 不能再增加</li>
<li>然后 删掉一个 <strong>v1</strong> 版本的 <strong>Pod</strong>，此时 <strong>2</strong> 个 <strong>v1</strong> 版本 <strong>+ 1</strong> 个<strong>v2</strong> 版本的，当前 <strong>Pod=3</strong> 不能再删除</li>
<li>滚动重复 <strong>1、2</strong> 步骤，直到更新结束</li>
</ol>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看副本rs 发现有两个ublog，一个 3副本，一个 0副本</span>
$ kubectl <span class="token parameter variable">-n</span> uit get rs
NAME               DESIRED   CURRENT   READY   AGE
mysql-6fbb5cc967   <span class="token number">1</span>         <span class="token number">1</span>         <span class="token number">1</span>       2d
ublog-5f55c5568b   <span class="token number">3</span>         <span class="token number">3</span>         <span class="token number">3</span>       37h
ublog-5ff678657f   <span class="token number">0</span>         <span class="token number">0</span>         <span class="token number">0</span>       2d

<span class="token comment"># 此时，edit 回退到 v1版本，查看滚动更新事件</span>
$ kubectl <span class="token parameter variable">-n</span> uit describe deploy ublog
<span class="token punctuation">..</span>.
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <span class="token operator">&lt;</span>none<span class="token operator">></span>
NewReplicaSet:   ublog-5ff678657f <span class="token punctuation">(</span><span class="token number">3</span>/3 replicas created<span class="token punctuation">)</span>
Events:
  Type    Reason             Age                From                   Message
  ----    ------             ----               ----                   -------
  Normal  ScalingReplicaSet  89s <span class="token punctuation">(</span>x2 over 2d<span class="token punctuation">)</span>   deployment-controller  Scaled up replica <span class="token builtin class-name">set</span> ublog-5ff678657f to <span class="token number">1</span>
  Normal  ScalingReplicaSet  66s                deployment-controller  Scaled down replica <span class="token builtin class-name">set</span> ublog-5f55c5568b to <span class="token number">2</span>
  Normal  ScalingReplicaSet  66s                deployment-controller  Scaled up replica <span class="token builtin class-name">set</span> ublog-5ff678657f to <span class="token number">2</span>
  Normal  ScalingReplicaSet  49s <span class="token punctuation">(</span>x2 over 37h<span class="token punctuation">)</span>  deployment-controller  Scaled up replica <span class="token builtin class-name">set</span> ublog-5ff678657f to <span class="token number">3</span>
  Normal  ScalingReplicaSet  49s                deployment-controller  Scaled down replica <span class="token builtin class-name">set</span> ublog-5f55c5568b to <span class="token number">1</span>
  Normal  ScalingReplicaSet  27s                deployment-controller  Scaled down replica <span class="token builtin class-name">set</span> ublog-5f55c5568b to <span class="token number">0</span>

$ kubectl <span class="token parameter variable">-n</span> uit get rs
NAME               DESIRED   CURRENT   READY   AGE
mysql-6fbb5cc967   <span class="token number">1</span>         <span class="token number">1</span>         <span class="token number">1</span>       2d
ublog-5f55c5568b   <span class="token number">0</span>         <span class="token number">0</span>         <span class="token number">0</span>       37h
ublog-5ff678657f   <span class="token number">3</span>         <span class="token number">3</span>         <span class="token number">3</span>       2d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>replicaset</strong> 会创建不同的名称的 <strong>rs</strong> 副本，然后仅调节对应的副本数更新即可，默认会缓存 <strong>10</strong> 个历史版本数便于回滚</p>
<h4 id="_1-2-2-replicaset-服务回滚" tabindex="-1"><a class="header-anchor" href="#_1-2-2-replicaset-服务回滚" aria-hidden="true">#</a> <strong>1.2.2 Replicaset 服务回滚</strong></h4>
<p>通过滚动升级策略，可平滑升级 <strong>Deployment</strong>，但升级出现问题，需要最快、最好的方式回退到上个正常版本，就需要回滚机制</p>
<p><strong>revision</strong>：</p>
<ul>
<li>更新应用时，<strong>k8s</strong> 会记录当前的 <strong>revision</strong> （<em>版本号</em>），当升级出现问题时，可通过 <strong>revision</strong> 回滚</li>
<li>默认配置下，只保留最近的几个 <strong>revision</strong>，可通过 <strong>Deployment</strong> 配置的 <code v-pre>spec.revisionHistoryLimit</code> 属性增加数量，默认为<strong>10</strong></li>
<li>历史记录，记录的是 <strong>操作过 replicaset 的</strong> 历史</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看版本历史记录</span>
$ kubectl <span class="token parameter variable">-nuit</span> rollout <span class="token function">history</span> deploy ublog
deployment.apps/ublog 
REVISION  CHANGE-CAUSE
<span class="token number">2</span>         <span class="token operator">&lt;</span>none<span class="token operator">></span>
<span class="token number">3</span>         <span class="token operator">&lt;</span>none<span class="token operator">></span>

<span class="token comment"># 配置如下，revisionHistoryLimit 为默认 10条记录</span>
$ kubectl <span class="token parameter variable">-n</span> uit get deploy ublog -oyaml<span class="token operator">|</span><span class="token function">grep</span> revision
    deployment.kubernetes.io/revision: <span class="token string">"3"</span>
  revisionHistoryLimit: <span class="token number">10</span>

<span class="token string">"但查看时不会全部显示完整的10条，而是默认显示最近的 2条记录，所以上文从 REVISION 2 开始"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现 <strong>CHANGE-CAUSE</strong> 为 &lt;none&gt; 是由于没有添加记录参数，<strong>记录回滚</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用命令来修改配置文件的版本 v2 -> v1 -> v2</span>
$ kubectl <span class="token parameter variable">-nuit</span> <span class="token builtin class-name">set</span> image deploy ublog <span class="token assign-left variable">myblog</span><span class="token operator">=</span><span class="token number">192.168</span>.3.171:5000/myblog:v1 <span class="token parameter variable">--record</span>
deployment.apps/ublog image updated

$ kubectl <span class="token parameter variable">-nuit</span> <span class="token builtin class-name">set</span> image deploy ublog <span class="token assign-left variable">myblog</span><span class="token operator">=</span><span class="token number">192.168</span>.3.171:5000/myblog:v2 <span class="token parameter variable">--record</span>
deployment.apps/ublog image updated

<span class="token comment"># 再次查看 版本历史记录，发现已经有了命令显示</span>
$ kubectl <span class="token parameter variable">-nuit</span> rollout <span class="token function">history</span> deploy ublog
deployment.apps/ublog 
REVISION  CHANGE-CAUSE
<span class="token number">5</span>         kubectl <span class="token builtin class-name">set</span> image deploy ublog <span class="token assign-left variable">myblog</span><span class="token operator">=</span><span class="token number">192.168</span>.3.171:5000/myblog:v1 <span class="token parameter variable">--namespace</span><span class="token operator">=</span>uit <span class="token parameter variable">--record</span><span class="token operator">=</span>true
<span class="token number">6</span>         kubectl <span class="token builtin class-name">set</span> image deploy ublog <span class="token assign-left variable">myblog</span><span class="token operator">=</span><span class="token number">192.168</span>.3.171:5000/myblog:v2 <span class="token parameter variable">--namespace</span><span class="token operator">=</span>uit <span class="token parameter variable">--record</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除 <strong>Deployment</strong> 再重建，版本记录会清空，并从 <strong>1</strong> 记录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl delete <span class="token parameter variable">-f</span> ublog.yaml
deployment.apps <span class="token string">"ublog"</span> deleted

<span class="token comment"># 将版本记录再改为 v1</span>
$ <span class="token function">vim</span> ublog.yaml 

<span class="token comment"># 增加 --record 参数，重新创建</span>
$ kubectl create <span class="token parameter variable">-f</span> ublog.yaml <span class="token parameter variable">--record</span>
deployment.apps/ublog created

<span class="token comment"># 通过命令修改版本</span>
$ kubectl <span class="token parameter variable">-nuit</span> <span class="token builtin class-name">set</span> image deploy ublog <span class="token assign-left variable">myblog</span><span class="token operator">=</span><span class="token number">192.168</span>.3.171:5000/myblog:v2 <span class="token parameter variable">--record</span>

<span class="token comment"># 查看历史记录</span>
$ kubectl <span class="token parameter variable">-nuit</span> rollout <span class="token function">history</span> deploy ublog
deployment.apps/ublog 
REVISION  CHANGE-CAUSE
<span class="token number">1</span>         kubectl create <span class="token parameter variable">--filename</span><span class="token operator">=</span>ublog.yaml <span class="token parameter variable">--record</span><span class="token operator">=</span>true
<span class="token number">2</span>         kubectl <span class="token builtin class-name">set</span> image deploy ublog <span class="token assign-left variable">myblog</span><span class="token operator">=</span><span class="token number">192.168</span>.3.171:5000/myblog:v2 <span class="token parameter variable">--namespace</span><span class="token operator">=</span>uit <span class="token parameter variable">--record</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回滚到具体的 <strong>revision</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 执行回滚操作</span>
$ kubectl <span class="token parameter variable">-nuit</span> rollout undo deploy ublog --to-revision<span class="token operator">=</span><span class="token number">1</span>
deployment.apps/ublog rolled back

<span class="token comment"># 此时历史记录更新，重复记录了回滚记录</span>
$ kubectl <span class="token parameter variable">-nuit</span> rollout <span class="token function">history</span> deploy ublog
deployment.apps/ublog 
REVISION  CHANGE-CAUSE
<span class="token number">2</span>         kubectl <span class="token builtin class-name">set</span> image deploy ublog <span class="token assign-left variable">myblog</span><span class="token operator">=</span><span class="token number">192.168</span>.3.171:5000/myblog:v2 <span class="token parameter variable">--namespace</span><span class="token operator">=</span>uit <span class="token parameter variable">--record</span><span class="token operator">=</span>true
<span class="token number">3</span>         kubectl create <span class="token parameter variable">--filename</span><span class="token operator">=</span>ublog.yaml <span class="token parameter variable">--record</span><span class="token operator">=</span>true

<span class="token comment"># 此时访问应用，查看输出版本，此时又变回 v1</span>
<span class="token function">curl</span> <span class="token number">10.244</span>.1.35:8002/blog/index/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-service-服务" tabindex="-1"><a class="header-anchor" href="#_2-service-服务" aria-hidden="true">#</a> 2. Service 服务</h2>
<p>此时，已能通过 <strong>Deployment</strong> 创建带副本的 <strong>Pod</strong> 提供高可用性的服务了，但即使每个 <strong>Pod</strong> 都会分配单独 <strong>IP</strong>，却存在如下问题</p>
<ul>
<li><strong>Pod IP</strong> 仅仅是集群内可见的虚拟 <strong>IP</strong>，外部无法访问</li>
<li><strong>Pod IP</strong> 会随着 <strong>Pod</strong> 销毁而消失，当 <strong>ReplicaSet</strong> 对 <strong>Pod</strong> 进行动态伸缩时，<strong>Pod IP</strong> 可能随时随地都会变化，对于访问服务带来了难度</li>
</ul>
<h3 id="_2-1-cluster-ip-负载均衡" tabindex="-1"><a class="header-anchor" href="#_2-1-cluster-ip-负载均衡" aria-hidden="true">#</a> 2.1 Cluster IP 负载均衡</h3>
<p><strong>Service</strong> 是一组 <strong>Pod</strong> 的服务抽象，相当于一组 <strong>Pod</strong> 的 <strong>LB（<em>Load Balance</em>）</strong>，负责将请求分发给对应的<strong>Pod</strong></p>
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
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 <strong>Service</strong> 并查看</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建 svc</span>
$ kubectl create <span class="token parameter variable">-f</span> svc-ublog.yaml 
service/svc-ublog created

<span class="token comment"># 查看 svc，此时已经创建了 CLUSTER-IP 10.105.146.135 80 端口的服务</span>
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
<p>创建 <strong>Service</strong>时，会创建同名的 <strong>endpoints</strong> 对象，若 <strong>Pod</strong> 上配置了 <code v-pre>readinessProbe</code>，检测失败时，<strong>endpoints</strong> 列表会剔除掉对应的 <strong>Pod IP</strong>，这样流量就不会分发到健康检测失败的 <strong>Pod</strong> 上</p>
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
<p class="custom-container-title">hostNetwork 部署，通过宿主机 ip:port 形式访问，有如下弊端</p>
<ul>
<li>服务使用 <strong>hostNetwork</strong>，使得宿主机的端口大量暴漏，<strong>存在安全隐患</strong></li>
<li>容易引发端口冲突</li>
</ul>
<p>因此，应该为 <strong>MySQL</strong> 创建固定 <strong>Cluster IP</strong> 的 <strong>Service</strong>，并配到 <strong>ublog</strong> 的环境变量中，利用集群服务发现的能力，组件间通过 <strong>service name</strong> 访问</p>
</div>
<h3 id="_2-2-服务发现-环境变量去-ip-化" tabindex="-1"><a class="header-anchor" href="#_2-2-服务发现-环境变量去-ip-化" aria-hidden="true">#</a> 2.2 服务发现（<em>环境变量去 IP 化</em> ）</h3>
<p><strong>k8s</strong> 集群中，组件间可以通过 <strong>service name</strong> 实现通信，<strong>Pods</strong> 间，无需通过 <strong>固定环境变量 IP</strong> 的形式</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管 <strong>Pod IP</strong> 和 <strong>Cluster IP</strong> 都不固定，但 <strong>service name</strong> 是固定的，且完全具有跨集群的可移植性，实现原理如下</p>
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

<span class="token comment"># 查看 kube-dns 这个 service，查找选择器 Selector 是 k8s-app=kube-dns 这个标签</span>
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

<span class="token comment"># 根据 选择器 找Pod，发现是初始化时 coredns 用的</span>
$ kubectl <span class="token parameter variable">-n</span> kube-system get po <span class="token parameter variable">-l</span> k8s-app<span class="token operator">=</span>kube-dns <span class="token parameter variable">-o</span> wide
NAME                       READY   STATUS    RESTARTS   AGE   IP           NODE             NOMINATED NODE   READINESS GATES
coredns-58cc8c89f4-hzprn   <span class="token number">1</span>/1     Running   <span class="token number">1</span>          23d   <span class="token number">10.244</span>.0.5   k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>
coredns-58cc8c89f4-vvj77   <span class="token number">1</span>/1     Running   <span class="token number">2</span>          23d   <span class="token number">10.244</span>.0.6   k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>

<span class="token string">"初始化时创建了 coredns 然后建立 kube-dns 这个service（固定的IP），然后新建 Pod 就可注入到 DNS 配置中，最终解析的就是 coredns 的IP，"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>故容器内部组件间调用，完全可以通过 <strong>service name</strong>（类似域名）来解析 <strong>IP</strong> 通信，避免了大量 <strong>IP</strong> 维护的成本，因此再次对部署进行优化改造</p>
<ol>
<li>
<p><strong>MySQL</strong> 去掉 <strong>hostNetwork</strong> 部署，使得服务只暴露在 <strong>k8s</strong> 集群内部网络环境中</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>			<span class="token comment"># 去掉此行 或 改为false</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>configMap</strong> 中的数据库固定 <strong>IP</strong> 地址换成 <strong>service name</strong>，这样跨环境的时候，配置内容基本上可以保持不用变化</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">MYSQL_HOST</span><span class="token punctuation">:</span> <span class="token string">"svc-mysql"</span>     <span class="token comment"># 此处替换为mysql</span>
  <span class="token key atrule">MYSQL_PORT</span><span class="token punctuation">:</span> <span class="token string">"3306"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新执行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> configmap.yaml
$ kubectl apply <span class="token parameter variable">-f</span> deploy-mysql.yaml

<span class="token comment"># 也可以删除 configmap 再通过 .txt 重建</span>
$ kubectl <span class="token parameter variable">-n</span> uit delete cm ublog
$ kubectl <span class="token parameter variable">-n</span> uit create configmap ublog --from-env-file<span class="token operator">=</span>configmap.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="_2-3-nodeport-外部访问" tabindex="-1"><a class="header-anchor" href="#_2-3-nodeport-外部访问" aria-hidden="true">#</a> 2.3 NodePort（<em>外部访问</em> ）</h3>
<p><strong>Cluster IP</strong> 为虚拟地址，只能在 <strong>k8s</strong> 集群内部进行访问，集群外部如果访问内部服务，可以配置 <strong>NodePort</strong></p>
<ul>
<li>若不指定 <strong>NodePort</strong> 端口，则会默认在 <strong>30000-32767（<em>端口号</em> ）</strong> 中随机使用其中一个</li>
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
<h3 id="_2-4-service-实现原理" tabindex="-1"><a class="header-anchor" href="#_2-4-service-实现原理" aria-hidden="true">#</a> 2.4 Service 实现原理</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 32333 端口的监听，看到如下 kube-proxy 在监听</span>
$ <span class="token function">netstat</span> <span class="token parameter variable">-ntpl</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token number">32333</span>
tcp6       <span class="token number">0</span>      <span class="token number">0</span> :::32333                :::*                    LISTEN      <span class="token number">28426</span>/kube-proxy  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="kube-proxy" tabindex="-1"><a class="header-anchor" href="#kube-proxy" aria-hidden="true">#</a> kube-proxy</h4>
<p><a href="https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<p><strong>运行在每个节点上</strong>，监听 <strong>API Server</strong> 中服务对象的变化，再通过创建流量路由规则来实现网络的转发，有如下模式</p>
<ul>
<li><s><strong>User space</strong>, 让 Kube-Proxy 在用户空间监听一个端口，所有的 Service 都转发到这个端口，然后 Kube-Proxy 在内部应用层对其进行转发 ， 所有报文都走一遍用户态，性能不高，k8s v1.2版本后废弃</s>。</li>
<li><strong>Iptables</strong>， 当前默认模式，<strong>完全由 IPtables 来实现</strong>， 通过各个节点上的 <strong>iptables</strong> 规则来实现 <strong>service</strong> 的负载均衡，但是随着 <strong>service</strong> 数量的增大，<strong>iptables</strong> 模式由于线性查找匹配、全量更新等特点，其性能会显著下降</li>
<li><strong>IPVS</strong>， 与 <strong>iptables</strong> 同样基于 <strong>Netfilter（<em>iptable内核态的一种实现</em>）</strong>，采用 <strong>hash</strong> 表，因此当 <strong>service</strong> 数量达到一定规模时，<strong>hash</strong> 查表速度快，从而提高 <strong>service</strong> 的服务性能
<ul>
<li><strong>k8s 1.8</strong> 版本开始引入，<strong>1.11</strong> 版本开始稳定，需要开启宿主机的 <strong>ipvs</strong> 模块</li>
</ul>
</li>
</ul>
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
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时发现是按照 <strong>Pod</strong> ，进行流量分配，若要 <strong>灰度发布</strong>，做 <strong>流量分配 / 治理</strong>，此时仍无法实现，需要 <strong>istio</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#重建pod</span>
$ kubectl <span class="token parameter variable">-n</span> demo delete po mysql-7f747644b8-6npzn

<span class="token comment">#去掉taint</span>
$ kubectl taint <span class="token function">node</span> k8s-slave1 smoke-
$ kubectl taint <span class="token function">node</span> k8s-slave2 drunk-

<span class="token comment">## myblog不用动，会自动因健康检测不过而重启</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务发现实现：</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-ingress-流量路由" tabindex="-1"><a class="header-anchor" href="#_3-ingress-流量路由" aria-hidden="true">#</a> 3. Ingress（<em>流量路由</em> ）</h2>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<p>对于 <strong>k8s</strong> 的 <strong>Service</strong>，无论是 <strong>Cluster IP</strong> 还是 <strong>NodePort</strong>，都是 <strong>四层负载</strong>，要让集群内的服务实现 <strong>七层负载均衡</strong>，要借助于 <strong>Ingress</strong>，<strong>Ingress</strong>控制器的实现方式有很多，比如 <strong>Nginx</strong>, <strong>Contour</strong>, <strong>Haproxy</strong>, <strong>trafik</strong>, <strong>Istio</strong>，下文<strong>Nginx</strong> 实现为例</p>
<h3 id="_3-1-ingress-nginx" tabindex="-1"><a class="header-anchor" href="#_3-1-ingress-nginx" aria-hidden="true">#</a> 3.1 Ingress-nginx</h3>
<p><strong>Ingress-nginx</strong> 是 <strong>7层的负载均衡器</strong> ，负责统一管理外部对 <strong>k8s cluster</strong> 中 <strong>Service</strong> 的请求，包含如下</p>
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
<h4 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h4>
<h5 id="-1" tabindex="-1"><a class="header-anchor" href="#-1" aria-hidden="true">#</a> </h5>
</div></template>


