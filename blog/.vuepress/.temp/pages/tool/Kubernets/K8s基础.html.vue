<template><div><h1 id="kubernets-基础" tabindex="-1"><a class="header-anchor" href="#kubernets-基础" aria-hidden="true">#</a> Kubernets 基础</h1>
<p>记录 <strong>kubernetes</strong> 相关文档、基础、使用说明等</p>
<!-- more -->
<h2 id="k8s-相关文档" tabindex="-1"><a class="header-anchor" href="#k8s-相关文档" aria-hidden="true">#</a> k8s 相关文档</h2>
<p><a href="https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/" target="_blank" rel="noopener noreferrer">官网 | 学习 Kubernetes 基础知识 | Kubernetes<ExternalLinkIcon/></a></p>
<p><a href="https://kubespray.io/#/" target="_blank" rel="noopener noreferrer">kubespray.io<ExternalLinkIcon/></a></p>
<p><a href="https://kuboard.cn/learning/" target="_blank" rel="noopener noreferrer">Kubernetes教程 | Kuboard<ExternalLinkIcon/></a></p>
<p>查看k8s 或docker 日志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>journalctl <span class="token parameter variable">-fu</span> <span class="token function">docker</span> <span class="token operator">|</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


