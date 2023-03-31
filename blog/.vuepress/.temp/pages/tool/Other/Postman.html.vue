<template><div><h1 id="postman" tabindex="-1"><a class="header-anchor" href="#postman" aria-hidden="true">#</a> Postman</h1>
<p><strong>Postman</strong> 是一款功能强大的网页调试与发送网页 <code v-pre>HTTP</code> 请求的 <code v-pre>Chrome</code> 插件。可以用于测试发送各种 <code v-pre>HTTP</code> 请求。</p>
<h3 id="_1-基本操作" tabindex="-1"><a class="header-anchor" href="#_1-基本操作" aria-hidden="true">#</a> 1. 基本操作</h3>
<p><strong>Authorization - 授权</strong></p>
<p>身份认证，显示 <code v-pre>browser cookies</code>，需要开启 <code v-pre>Interceptor</code></p>
<ul>
<li><code v-pre>Basic Auth</code>：填写用户名和密码，点击 <code v-pre>update request</code> 后，<code v-pre>headers</code> 中自动添加 <strong>Authorization</strong></li>
</ul>
<p><strong>Headers - 请求头</strong></p>
<p>通常是 <code v-pre>json</code> 的数据格式，不同格式根据不同类型切换，比如： <code v-pre>excel</code> 就肯定是另一种格式</p>
<table>
<thead>
<tr>
<th>key</th>
<th>value</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>Content-Type</code></td>
<td><code v-pre>application/json</code></td>
</tr>
</tbody>
</table>
<p><strong>Body - 请求体</strong></p>
<ul>
<li>
<p><code v-pre>form-data</code></p>
<p>表单数据 <code v-pre>key - value</code>形式</p>
</li>
<li>
<p><code v-pre>x-www-form-urlencoded</code></p>
<p>选择 <code v-pre>x-www-form-urlencoded</code> 的参数方式后，<code v-pre>postman</code> 自动设置了<code v-pre>Content-Type</code>，窗体数据被编码为<code v-pre>key - value</code></p>
</li>
<li>
<p><code v-pre>raw</code></p>
<p>通常选项，里面写入原生的 <code v-pre>josn</code> 数据，配合 <code v-pre>JSON(application/json)</code> 进行验证是否参数正确</p>
</li>
<li>
<p><code v-pre>binary</code></p>
<p>二进制形式，文件流，字节流等</p>
</li>
</ul>
<h3 id="_2-测试" tabindex="-1"><a class="header-anchor" href="#_2-测试" aria-hidden="true">#</a> 2. 测试</h3>
<p><strong>可写脚本</strong></p>
<ul>
<li>
<p>判断返回的状态码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>tests<span class="token punctuation">[</span><span class="token string">'Status code is 200'</span><span class="token punctuation">]</span> <span class="token operator">=</span> responseCode<span class="token punctuation">.</span>code <span class="token operator">===</span> <span class="token number">200</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>校验包含字符串</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>tests<span class="token punctuation">[</span><span class="token string">'Body matches string'</span><span class="token punctuation">]</span> <span class="token operator">=</span> responseBody<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">'test'</span><span class="token punctuation">,</span> <span class="token string">'POST'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>解析 <strong>JSON</strong> 并检查</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> jsonData <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>responseBody<span class="token punctuation">)</span><span class="token punctuation">;</span>
tests<span class="token punctuation">[</span><span class="token string">'request test'</span><span class="token punctuation">]</span> <span class="token operator">=</span> jsonData<span class="token punctuation">.</span>test <span class="token operator">===</span> <span class="token string">'POST'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><strong>Collection</strong>
把测试用例保存，<strong>Runner</strong> 批量执行</p>
<blockquote>
<p>在线可尝试商业版软件 <a href="https://yapi.ymfe.org/" target="_blank" rel="noopener noreferrer">YAPI<ExternalLinkIcon/></a></p>
</blockquote>
</div></template>


