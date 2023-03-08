<template><div><p><strong>Python Django Web</strong> 框架基础说明</p>
<!--more-->
<h2 id="_1-执行流程" tabindex="-1"><a class="header-anchor" href="#_1-执行流程" aria-hidden="true">#</a> 1. 执行流程</h2>
<h4 id="_1-1-生命周期" tabindex="-1"><a class="header-anchor" href="#_1-1-生命周期" aria-hidden="true">#</a> 1.1 生命周期</h4>
<p><strong>Django</strong> 未封装 <code v-pre>socket</code>，使用第三方 <strong>Server</strong></p>
<img src="@source/python/生态/Web框架/Django/img/请求流程.png">
<p>因此 <strong>Server</strong> 必须提供 <strong>socket</strong> （如 <strong>uWSGI</strong> 或是 <strong>Nginx</strong>）</p>
<ul>
<li>处理/解析请求</li>
<li>解析结果给 <strong>Django</strong></li>
<li>等待 <strong>Django</strong> 返回结果</li>
<li>将返回结果发送到客户端</li>
</ul>
<p>在将解析结果给 <strong>Django</strong> 时，<strong>Django</strong> 会内部执行中间件</p>
<h4 id="_1-2-中间件" tabindex="-1"><a class="header-anchor" href="#_1-2-中间件" aria-hidden="true">#</a> 1.2 中间件</h4>
<p><strong><a href="http://settings.py" target="_blank" rel="noopener noreferrer">settings.py<ExternalLinkIcon/></a></strong> 中的 <strong>MIDDLEWARE</strong> ，类似经过洋葱模型，处理各种请求相关，如 <strong>IP</strong> 黑名单、日志、缓存等需要对请求批量处理的</p>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/topics/http/middleware/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a> |  <a href="https://opentelemetry.io/docs/" target="_blank" rel="noopener noreferrer">数据监测 Opentelemetry<ExternalLinkIcon/></a></p>
</div></template>


