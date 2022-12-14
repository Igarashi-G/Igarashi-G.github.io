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
<h4 id="卷的类型" tabindex="-1"><a class="header-anchor" href="#卷的类型" aria-hidden="true">#</a> 卷的类型</h4>
</div></template>


