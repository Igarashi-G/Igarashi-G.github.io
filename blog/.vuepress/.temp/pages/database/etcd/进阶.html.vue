<template><div><h1 id="etcd-进阶" tabindex="-1"><a class="header-anchor" href="#etcd-进阶"><span>etcd 进阶</span></a></h1>
<h3 id="_1-etcd-的请求是如何执行的" tabindex="-1"><a class="header-anchor" href="#_1-etcd-的请求是如何执行的"><span>1. etcd 的请求是如何执行的？</span></a></h3>
<h4 id="_1-1-读请求" tabindex="-1"><a class="header-anchor" href="#_1-1-读请求"><span>1.1 读请求</span></a></h4>
<p>client -&gt; api -&gt; KVServer 拦截器 -&gt; read index -&gt; read status （一致性返回状态机） -&gt; MVCC (b tree 内存（key -&gt; restore ）{2（）, 0 (版本号)} + boltdb b+tree burket 页 （二分 value 磁盘 IO）) -&gt; 返回客户端</p>
<h4 id="_1-2-写请求" tabindex="-1"><a class="header-anchor" href="#_1-2-写请求"><span>1.2 写请求</span></a></h4>
<hr>
<h3 id="_2-如何实现高可用、数据强一致性" tabindex="-1"><a class="header-anchor" href="#_2-如何实现高可用、数据强一致性"><span>2. 如何实现高可用、数据强一致性？</span></a></h3>
</div></template>


