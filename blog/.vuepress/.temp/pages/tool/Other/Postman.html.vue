<template><div><h1 id="postman" tabindex="-1"><a class="header-anchor" href="#postman"><span>Postman</span></a></h1>
<p><strong>Postman</strong> 是一款功能强大的网页调试与发送网页 <code v-pre>HTTP</code> 请求的 <code v-pre>Chrome</code> 插件。可以用于测试发送各种 <code v-pre>HTTP</code> 请求。</p>
<h3 id="_1-基本操作" tabindex="-1"><a class="header-anchor" href="#_1-基本操作"><span>1. 基本操作</span></a></h3>
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
<h3 id="_2-测试" tabindex="-1"><a class="header-anchor" href="#_2-测试"><span>2. 测试</span></a></h3>
<p><strong>可写脚本</strong></p>
<ul>
<li>
<p>判断返回的状态码</p>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">tests</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Status code is 200'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> responseCode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">code</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> ===</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 200</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>校验包含字符串</p>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">tests</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Body matches string'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> responseBody</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">has</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'test'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'POST'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
<li>
<p>解析 <strong>JSON</strong> 并检查</p>
<div class="language-js line-numbers-mode" data-highlighter="shiki" data-ext="js" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> jsonData</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> JSON</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">parse</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">responseBody</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">tests</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'request test'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> jsonData</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">test</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> ===</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'POST'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><strong>Collection</strong><br>
把测试用例保存，<strong>Runner</strong> 批量执行</p>
<blockquote>
<p>在线可尝试商业版软件 <a href="https://yapi.ymfe.org/" target="_blank" rel="noopener noreferrer">YAPI</a></p>
</blockquote>
</div></template>


