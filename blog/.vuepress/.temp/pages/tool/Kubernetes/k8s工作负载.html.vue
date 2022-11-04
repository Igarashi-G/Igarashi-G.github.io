<template><div><p><strong>k8s</strong> 的工作负载、各种控制器</p>
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
<h4 id="控制器-controller" tabindex="-1"><a class="header-anchor" href="#控制器-controller" aria-hidden="true">#</a> 控制器 <em>Controller</em></h4>
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
<h2 id="_1-deployments-无状态" tabindex="-1"><a class="header-anchor" href="#_1-deployments-无状态" aria-hidden="true">#</a> 1. Deployments（<em>无状态</em>）</h2>
<p><strong>Deployments</strong> 是管理 <strong>Pod</strong> 的控制器，用于 <strong>管理无状态应用</strong>，工作在 <strong>ReplicaSet</strong> 之上，之前 <strong>Pod</strong> 的配置，会指定在 <code v-pre>template:</code> 之下</p>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-replicaset-副本保障机制" tabindex="-1"><a class="header-anchor" href="#_2-replicaset-副本保障机制" aria-hidden="true">#</a> 2. ReplicaSet（<em>副本保障机制</em>）</h2>
<p>前身是 <strong><s>Replication Controller（已废弃）</s></strong>  ，现配合 <strong>Deployment</strong> 自动管理，和之前的唯一区别是 <strong>支持标签选择器</strong></p>
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
<h5 id="replicaset-高可用" tabindex="-1"><a class="header-anchor" href="#replicaset-高可用" aria-hidden="true">#</a> <strong>ReplicaSet 高可用</strong></h5>
<p><strong>ReplicaSet</strong> 会实时检测 <strong>Pod</strong> 状态，并保障副本数一直处于期望的值，此时是无法通过普通的指定来删除 <strong>Pod</strong> 的，由于要保证预期副本数，执行删除，也会被 <strong>ReplicaSet</strong> 自动拉起</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-replicaset-服务更新" tabindex="-1"><a class="header-anchor" href="#_2-1-replicaset-服务更新" aria-hidden="true">#</a> 2.1 Replicaset  服务更新</h3>
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
<h3 id="_2-2-replicaset-服务回滚" tabindex="-1"><a class="header-anchor" href="#_2-2-replicaset-服务回滚" aria-hidden="true">#</a> 2.2 Replicaset 服务回滚</h3>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后续见</p>
<h2 id="_3-statefulset" tabindex="-1"><a class="header-anchor" href="#_3-statefulset" aria-hidden="true">#</a> 3. StatefulSet</h2>
<p><strong>StatefulSet</strong> 同上也是管 <strong>Pod</strong> 的，区别是用来管理 <strong>有状态应用</strong> 的，且为每个 <strong>Pod</strong> 维护一个 <strong>有粘性、永久不变</strong> 的 <strong>ID</strong> ，常用来弄中间件，需持久化数据的应用</p>
<p><a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/statefulset/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<div class="custom-container info">
<p class="custom-container-title">命名</p>
<p>每个 <strong>Pod</strong> 在重新调度时依然会保留持久的标识符，格式为 <strong>StatefulSetName-Number</strong> ，如创建名字是 <strong>Redis-Sentinel</strong> 的 <strong>StatefulSet</strong> 起 <strong>3</strong> 个 <strong>Pod</strong> ，名字通常为 <strong>Redis-Sentinel-0 / 1 / 2</strong>，一般格式如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token string">"statefulSetName-{0..N-1}.serviceName.namespace.svc.cluster.local"</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>serviceName</strong> 是 <strong>Headless Service</strong> 的名字，必须指定</li>
<li><strong>0..N-1</strong> 为 <strong>Pod</strong> 序号</li>
<li><strong>.cluster.local</strong> 是 <strong>Cluster Domain（<em>集群域</em> ）</strong></li>
<li>同一命名空间下，<strong>namespace.svc.cluster.local</strong> 可省略</li>
</ul>
</div>
<p><strong>StatefulSet</strong> 启动时，只有 <strong>当前一个容器完全启动，后一个容器才会被调度</strong>，并且每个容器的标识符固定，可以根据标识符来断定当前 <strong>Pod</strong> 的角色，因此可以配置集群应用</p>
<div class="custom-container tip">
<p class="custom-container-title">说明</p>
<p>如配置主从 <strong>redis</strong>，名为 <strong>redis-ms</strong>，使用 <strong>StatefulSet</strong> 进行部署</p>
<ul>
<li>启动第一个容器，标识符为 <strong>redis-ms-0</strong> ，此时就可以根据 <strong>0</strong> 来认为它是 <strong>Master</strong> 节点</li>
<li>后面再启动第二个 <strong>redis</strong> 就可以通过标识符来连接 <strong>Master</strong> 节点</li>
<li>第二个启动后则为 <strong>Slave</strong> 节点 <strong>redis-ms-1</strong></li>
</ul>
</div>
<p><strong>StatefulSet</strong> 使用 <strong>Headless Service（<em>无头服务</em> ）</strong> 进行通信，即没有 <strong>Cluster IP</strong> ，而是用 <strong>Endpoint</strong> 来通信，但 <strong>yaml</strong> 中必须要指定一个 <strong>serviceName</strong> 进行绑定，因此通常和 <strong>Service</strong> 放一起，结构如下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nignx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spce</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> web
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> web
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> <span class="token string">"nginx"</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">template</span><span class="token punctuation">:</span>
      <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
        <span class="token key atrule">labels</span><span class="token punctuation">:</span>
          <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">spce</span><span class="token punctuation">:</span>
        <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token key atrule">nginx</span><span class="token punctuation">:</span> 1.15.2
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> web
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-扩容缩容" tabindex="-1"><a class="header-anchor" href="#_3-1-扩容缩容" aria-hidden="true">#</a> 3.1 扩容缩容</h3>
<p><strong>扩容：</strong> 原则同启动，只有 <strong>当前一个容器完全启动，后一个容器才会接着启动</strong> 若，中途前面的容器异常，后续容器的启动会等待前一个恢复</p>
<p><strong>缩容：</strong> 与扩容相反</p>
<h3 id="_3-2-更新策略" tabindex="-1"><a class="header-anchor" href="#_3-2-更新策略" aria-hidden="true">#</a> 3.2 更新策略</h3>
<p>默认的更新策略为 <strong>RollingUpdate</strong>，与 <strong>Deployment</strong> 区别的是，<strong>StatefulSet</strong> 更新是有顺序的，为 <strong>Pod</strong> 序号逆序更新，当前面序号的容器异常时，同样会停止更新动作直到正常为止</p>
<p><strong>OnDelete：</strong></p>
<h2 id="_4-daemonset" tabindex="-1"><a class="header-anchor" href="#_4-daemonset" aria-hidden="true">#</a> 4. DaemonSet</h2>
<p><strong>DaemonSet</strong> 同上也是管 <strong>Pod</strong> 的，区别是用来管理 <strong>有状态应用</strong> 的</p>
<h2 id="_5-job" tabindex="-1"><a class="header-anchor" href="#_5-job" aria-hidden="true">#</a> 5. Job</h2>
</div></template>


