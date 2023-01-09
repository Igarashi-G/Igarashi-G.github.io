<template><div><p><strong>k8s</strong> 存储相关的 <strong>Volumes</strong>、<strong>PV</strong>、<strong>PVC</strong></p>
<!-- more -->
<h1 id="kubernetes-存储" tabindex="-1"><a class="header-anchor" href="#kubernetes-存储" aria-hidden="true">#</a> Kubernetes 存储</h1>
<p>之前 <strong>Pod</strong> 示例使用过部分 <strong>Volumes</strong>，此处详细整理</p>
<h2 id="_1-volumes" tabindex="-1"><a class="header-anchor" href="#_1-volumes" aria-hidden="true">#</a> 1. Volumes</h2>
<p>容器的磁盘文件是 <strong>短暂</strong>（<em>无状态</em>）的，容器崩溃时，每次 <strong>kubelet</strong> 都会全新重启干净的容器，过去的临时文件会全部丢失，而且一个 <strong>Pod</strong> 若运行了多个 <strong>Container</strong> 文件的共享如何解决，此时就需要 <strong>k8s volumes</strong></p>
<h3 id="_1-1-概述" tabindex="-1"><a class="header-anchor" href="#_1-1-概述" aria-hidden="true">#</a> 1.1 概述</h3>
<p>​	<strong>Docker</strong> 也有卷的概念，但 <strong>Docker</strong> 的卷通常是磁盘或另一个 <strong>Container</strong> 中的目录，且生命周期不受管理，即使后续有卷的驱动程序，功能也十分有限</p>
<p>​	另一方面，<strong>k8s</strong> 的卷有明确的生命周期，可以比 <strong>Pod</strong> 中运行的任何 <strong>Container</strong> 都长（<em><strong>Container</strong>重启或销毁后保留数据</em> ）且支持多种类型、任意数量的 <strong>volumes</strong></p>
<p>​	本质上讲，卷只是一个目录，可能包含一些数据， <strong>Pod</strong> 中的容器可以访问它。要使用卷，<strong>Pod</strong> 需要通过 <code v-pre>.spec.columes</code> 字段指定为 <strong>Pod</strong> 提供的卷，以及使用 <code v-pre>.spce.containers.volumeMounts</code> 字段指定卷挂载的目录。从容器中的进程可以看到由 <strong>Docker</strong> 镜像和卷组成的文件系统视图，卷无法挂载其他卷或具有到其他卷的硬链接， <strong>Pod</strong> 中的每个 <strong>Container</strong> 必须独立指定每个卷的挂载位置</p>
<h4 id="常用卷的类型" tabindex="-1"><a class="header-anchor" href="#常用卷的类型" aria-hidden="true">#</a> 常用卷的类型</h4>
<p>emptyDir:</p>
<h4 id="emptydir" tabindex="-1"><a class="header-anchor" href="#emptydir" aria-hidden="true">#</a> emptyDir</h4>
<p>​	<strong>主要用于不同容器间 数据共享 的</strong>，但和 <strong>Volume</strong> 不同在于，删除 <strong>Pod</strong> 后 <strong>emptyDir</strong> 卷中的数据也会删除，<strong>可被挂载到相同或不同的路径</strong>，默认情况支持任何介质（<em>磁盘、<strong>SSD</strong>、网络存储</em> ）</p>
<p>​	可以将 <code v-pre>emptyDir.medium</code> 字段设置为 <code v-pre>Memory</code> ，让 <strong>Kubernetes</strong> 使用 <strong>tmpfs</strong>（<em>内存支持的文件系统</em>）虽然 <strong>tmpfs</strong> 很快，但节点重启时数据同样会被清除，并且设置的大小会被计入到 <strong>Container</strong> 的内存限制中</p>
<p>使用时 <code v-pre>volumes</code> 直接指定为 <strong>emptyDir</strong> 即可</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>pd
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> k8s.gcr.io/test<span class="token punctuation">-</span>webserver
    <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>container
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /cache
      <span class="token key atrule">name</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>volume
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>volume
    <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger">
<p class="custom-container-title">警告</p>
<p>若要在一个 <strong>Pod</strong> 里面启动多个容器的话，网络命名空间是共享的，假如此时起了两个 <strong>Nginx</strong> 进程如下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.15.2
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /opt
          <span class="token key atrule">name</span><span class="token punctuation">:</span> share<span class="token punctuation">-</span>volume
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx2
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.15.2
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /mnt
          <span class="token key atrule">name</span><span class="token punctuation">:</span> share<span class="token punctuation">-</span>volume
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> share<span class="token punctuation">-</span>volume
        <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时都是 <strong>80</strong> 端口，则会冲突</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> dev get po
NAME                                READY   STATUS        RESTARTS   AGE
nginx-deployment-5bd68dfc65-6jzzw   <span class="token number">1</span>/2     Error         <span class="token number">0</span>          11s
nginx-deployment-5bd68dfc65-7snw5   <span class="token number">1</span>/2     Error         <span class="token number">0</span>          11s
nginx-deployment-5bd68dfc65-z5zqc   <span class="token number">1</span>/2     Error         <span class="token number">0</span>          11s

$ kubectl <span class="token parameter variable">-n</span> dev logs <span class="token parameter variable">-f</span> nginx-deployment-5bd68dfc65-6jzzw <span class="token parameter variable">-c</span> nginx2
<span class="token punctuation">..</span>.
<span class="token number">2022</span>/10/30 <span class="token number">10</span>:11:38 <span class="token punctuation">[</span>emerg<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: bind() to 0.0.0.0:80 failed (98: Address already in use)</span>
nginx: <span class="token punctuation">[</span>emerg<span class="token punctuation">]</span> bind<span class="token punctuation">(</span><span class="token punctuation">)</span> to <span class="token number">0.0</span>.0.0:80 failed <span class="token punctuation">(</span><span class="token number">98</span>: Address already <span class="token keyword">in</span> use<span class="token punctuation">)</span>
<span class="token number">2022</span>/10/30 <span class="token number">10</span>:11:38 <span class="token punctuation">[</span>emerg<span class="token punctuation">]</span> <span class="token number">1</span><span class="token comment">#1: still could not bind()</span>
nginx: <span class="token punctuation">[</span>emerg<span class="token punctuation">]</span> still could not bind<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时要将 <code v-pre>name: nginx2</code> 的 <code v-pre>command</code> 重置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">command</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> sh
<span class="token punctuation">-</span> <span class="token punctuation">-</span>c
<span class="token punctuation">-</span> sleep 36000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上配置是通过 <code v-pre>sh</code> 执行了一个 <code v-pre>sleep</code> 命令</p>
<p>若出现 <strong>Error: Back-off restarting failed</strong> ，通用解决办法也可在 <code v-pre>containers:</code> 后加入命令常驻进程</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"/bin/bash"</span><span class="token punctuation">,</span> <span class="token string">"-ce"</span><span class="token punctuation">,</span> <span class="token string">"tail -f /dev/null"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后即可测试一下是否数据已共享</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> dev <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> nginx-deployment-5666cb4fcf-2d8m6 <span class="token parameter variable">-c</span> nginx -- <span class="token function">bash</span>
$ <span class="token builtin class-name">cd</span> /opt/
$ <span class="token function">touch</span> <span class="token number">123</span>.txt
$ <span class="token function">ls</span>
<span class="token number">123</span>.txt
root@nginx-deployment-5666cb4fcf-2d8m6:/opt<span class="token comment"># exit</span>

$ kubectl <span class="token parameter variable">-n</span> dev <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> nginx-deployment-5666cb4fcf-2d8m6 <span class="token parameter variable">-c</span> nginx2 -- <span class="token function">bash</span>
$ <span class="token builtin class-name">cd</span> /mnt
$ <span class="token function">ls</span>
<span class="token number">123</span>.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时表示，数据已经通过指定 <strong>emptyDir</strong> 实现共享</p>
</div>
</div></template>


