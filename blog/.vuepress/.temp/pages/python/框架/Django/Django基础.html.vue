<template><div><h1 id="django-基础" tabindex="-1"><a class="header-anchor" href="#django-基础" aria-hidden="true">#</a> Django 基础</h1>
<h2 id="_1-执行流程" tabindex="-1"><a class="header-anchor" href="#_1-执行流程" aria-hidden="true">#</a> 1. 执行流程</h2>
<h4 id="_1-1-生命周期" tabindex="-1"><a class="header-anchor" href="#_1-1-生命周期" aria-hidden="true">#</a> 1.1 生命周期</h4>
<p><strong>Django</strong> 未封装 <code v-pre>socket</code>，使用第三方 <strong>Server</strong></p>
<img src="@source/python/框架/Django/img/请求流程.png">
<p>因此 <strong>Server</strong> 必须提供 <code v-pre>socket</code></p>
<ul>
<li>处理/解析请求</li>
<li>解析结果给 <strong>Django</strong></li>
<li>等待 <strong>Django</strong> 返回结果</li>
<li>将返回结果发送到客户端</li>
</ul>
<p>在将解析结果给 <strong>Django</strong> 时，<strong>Django</strong> 会内部执行中间件</p>
<h4 id="_1-2-中间件" tabindex="-1"><a class="header-anchor" href="#_1-2-中间件" aria-hidden="true">#</a> 1.2 中间件</h4>
<p><strong><a href="http://settings.py" target="_blank" rel="noopener noreferrer">settings.py<ExternalLinkIcon/></a></strong> 中的 <code v-pre>MIDDLEWARE</code> ，类似经过洋葱模型，处理各种请求相关，如 <strong>IP</strong> 黑名单、日志、缓存等需要对请求批量处理的</p>
<p><a href="https://docs.djangoproject.com/zh-hans/4.1/topics/http/middleware/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a> | 数据监测 <a href="https://opentelemetry.io/docs/" target="_blank" rel="noopener noreferrer">Opentelemetry<ExternalLinkIcon/></a></p>
<h3 id="_2-简易示例" tabindex="-1"><a class="header-anchor" href="#_2-简易示例" aria-hidden="true">#</a> 2. 简易示例</h3>
<p>如下是打通 <strong>Django</strong> 流程的简易示例</p>
</div></template>


