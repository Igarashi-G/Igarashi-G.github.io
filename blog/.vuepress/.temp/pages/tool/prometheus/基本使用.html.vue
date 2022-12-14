<template><div><p><strong>prometheus</strong> 的基础概念及使用</p>
<!-- more -->
<h1 id="prometheus" tabindex="-1"><a class="header-anchor" href="#prometheus" aria-hidden="true">#</a> Prometheus</h1>
<h2 id="_1-概念" tabindex="-1"><a class="header-anchor" href="#_1-概念" aria-hidden="true">#</a> 1. 概念</h2>
<p><a href="https://prometheus.io/" target="_blank" rel="noopener noreferrer">Prometheus<ExternalLinkIcon/></a> 是由 <strong>SoundCloud</strong> 开源监控告警解决方案，从 <strong>2012</strong> 年开始编写代码，再到 <strong>2015</strong> 年 <a href="https://github.com/prometheus/prometheus" target="_blank" rel="noopener noreferrer">github<ExternalLinkIcon/></a> 上开源以来，已经吸引了 <strong>12k+</strong> 关注，以及很多大公司的使用；<strong>2016</strong> 年 <strong>Prometheus</strong> 成为继 <strong>k8s</strong> 后，第二名 <strong>CNCF</strong>(<a href="https://cncf.io/" target="_blank" rel="noopener noreferrer">Cloud Native Computing Foundation<ExternalLinkIcon/></a>) 成员。作为新一代开源解决方案，很多理念与 <strong>Google SRE</strong> 运维之道不谋而合。</p>
<h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3>
<ul>
<li>多维数据模型以及由 <strong>metrics</strong> 名和一组 <strong>key/value</strong> 标签组成的时序数据</li>
<li>在多维度上灵活且强大的查询语言(<a href="https://prometheus.io/docs/querying" target="_blank" rel="noopener noreferrer">PromQl<ExternalLinkIcon/></a>)</li>
<li>不依赖分布式存储，支持单主节点工作</li>
<li>通过基于 <strong>HTTP</strong> 的 <strong>pull</strong> 方式采集时序数据</li>
<li>支持通过 <strong>Pushgateway</strong> 进行时序数据跨网关推送(<a href="https://prometheus.io/docs/instrumenting/pushing/" target="_blank" rel="noopener noreferrer">pushing time series<ExternalLinkIcon/></a>)</li>
<li>支持通过服务发现或者静态配置去获取要采集的目标服务器</li>
<li>支持多种可视化图表及仪表盘(<a href="https://grafana.com/" target="_blank" rel="noopener noreferrer">Grafana<ExternalLinkIcon/></a>)</li>
</ul>
<h3 id="构成" tabindex="-1"><a class="header-anchor" href="#构成" aria-hidden="true">#</a> 构成</h3>
<ul>
<li><strong>Prometheus</strong> 主服务器，用来收集和存储时间序列数据</li>
<li>用于应用程序埋点的 <strong>client</strong> 代码库</li>
<li>用于短时 <strong>jobs</strong> 的 <strong>push gateway</strong></li>
<li>特殊用途的数据收集工具包 <strong>exporter</strong>（<em>包括 <strong>HAProxy</strong>、<strong>StatsD</strong>、<strong>Ganglia</strong>等</em> )</li>
<li>用于报警的 <strong>AlertManager</strong></li>
<li>命令行查询工具</li>
<li><strong>Prometheus Dashboard</strong> 展现的绝佳工具 <strong>Grafana</strong></li>
</ul>
<p>大部分 <strong>Prometheus</strong> 组建都由 <strong>go</strong> 实现，这使它们易于构建和部署为静态的二进制文件。</p>
<h3 id="架构图" tabindex="-1"><a class="header-anchor" href="#架构图" aria-hidden="true">#</a> 架构图</h3>
<img src="@source/tool/Prometheus/img/prometheus架构图.png">
<p><strong>Prometheus</strong> 直接或通过 <strong>Pushgateway</strong> 从各个 <strong>job</strong> 中爬取时序数据。它在本地存储所有的样品，对这些数据运行规则进行过滤、汇总并记录新的时序数据，同时可以从现有数据生成警报。<strong>Grafana</strong> 或其它 <strong>API</strong> 可以将所采集的数据用于可视化展示。</p>
<h3 id="能做什么" tabindex="-1"><a class="header-anchor" href="#能做什么" aria-hidden="true">#</a> 能做什么</h3>
<p><strong>Prometheus</strong> 可以很好地记录任何纯数字时间序列。它既适用于以服务器为中心的监控，也适用于高度动态的面向服务的体系结构的监控。在微服务的世界中，它支持多维数据收集和查询是一个独特的优势。</p>
<h3 id="不能做什么" tabindex="-1"><a class="header-anchor" href="#不能做什么" aria-hidden="true">#</a> 不能做什么</h3>
<p><strong>Prometheus</strong> 的价值在于可靠性，即使在某些时间节点收集失败情况下，您也可以始终查看有关系统的统计信息。如果您需要**100％**的准确性（例如按请求计费），<strong>Prometheus</strong> 并不是一个好的选择，因为收集的数据可能不够详细和完整。在这种情况下，您最好使用其他系统来收集和分析数据以进行计费，<strong>Prometheus</strong> 则可以进行其他监控。</p>
<p><a href="https://prometheus.io/docs/instrumenting/exporters/" target="_blank" rel="noopener noreferrer">exporter<ExternalLinkIcon/></a></p>
</div></template>


