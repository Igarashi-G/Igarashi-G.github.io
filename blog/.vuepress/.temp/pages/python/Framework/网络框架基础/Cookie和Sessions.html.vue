<template><div><h1 id="状态管理" tabindex="-1"><a class="header-anchor" href="#状态管理" aria-hidden="true">#</a> 状态管理</h1>
<h3 id="_1-协议状态" tabindex="-1"><a class="header-anchor" href="#_1-协议状态" aria-hidden="true">#</a> 1. 协议状态</h3>
<p>七层网络协议，大多都是有状态协议，如 <code v-pre>SMTP</code> ，但 <code v-pre>HTTP</code> 协议，则是无状态协议</p>
<h4 id="_1-1-有状态协议" tabindex="-1"><a class="header-anchor" href="#_1-1-有状态协议" aria-hidden="true">#</a> 1.1 有状态协议</h4>
<p>如 <code v-pre>SMTP</code> 协议</p>
<ul>
<li>发送前必须先建立 <code v-pre>TCP</code> 连接，并发送 <code v-pre>HELO/EHLO</code> 建立会话</li>
<li>然后进入 <code v-pre>AUTH</code> 认证</li>
<li>认证通过才可以发送数据</li>
<li>通过 <code v-pre>QUI</code> 命令关闭会话</li>
</ul>
<p>如上，整个通信过程，双方是必须要时刻记住当前连接的状态的，不同状态能接受的命令是不同的。另外，之前命令传输的某些数据也必须要记住，因为可能会对后续的命令产生影响</p>
<p>这种有记忆功能的，就是有状态协议，通常维护状态代价较高</p>
<h4 id="_1-2-http1-x-无状态协议" tabindex="-1"><a class="header-anchor" href="#_1-2-http1-x-无状态协议" aria-hidden="true">#</a> 1.2 HTTP1.X 无状态协议</h4>
<p>指协议对于交互性场景，没有记忆能力</p>
<ul>
<li>每个请求（<em>交互</em>）都是独立的，本次请求不会基于上次请求有任何改变
<ul>
<li>比如：用户登录，和把东西加入购物车，<code v-pre>HTTP</code> 不会去记录谁 和 他干了什么，是 <strong>完全无依赖</strong> 的</li>
</ul>
</li>
<li>没有记忆能力，即<strong>无存储</strong>
<ul>
<li>因此需要外部、如 <code v-pre>Cookie</code>、<code v-pre>Session</code> 等为交互存储状态</li>
</ul>
</li>
<li>和 <code v-pre>TCP/IP</code> 不同，发过去就断开了</li>
<li>减少服务器的 <code v-pre>CPU</code> 和 内存 开销</li>
</ul>
<h3 id="_2-cookie" tabindex="-1"><a class="header-anchor" href="#_2-cookie" aria-hidden="true">#</a> 2. Cookie</h3>
<p>英文翻译为 甜品，使用 <code v-pre>Cookie</code> 可自动填写用户名、记住密码等，算是给用户的一点甜头</p>
<h3 id="_3-session" tabindex="-1"><a class="header-anchor" href="#_3-session" aria-hidden="true">#</a> 3. Session</h3>
<p>因为存入 <code v-pre>Cookie</code>，有泄密风险，因此将机密信息存入服务器，通过服务器来维护客户档案</p>
<ul>
<li>可以理解为服务端存储了一张 <strong>User 表</strong>， <code v-pre>SessionID</code> 即该表主键</li>
<li>占用服务器资源，用户都要去 <code v-pre>Session</code> 服务器授权，因此限制负载均衡能力</li>
<li>可以<code v-pre>CSRF</code> 跨域伪造请求，依然泄密</li>
</ul>
<h3 id="_4-token" tabindex="-1"><a class="header-anchor" href="#_4-token" aria-hidden="true">#</a> 4. Token</h3>
<p>令牌鉴权，不存用户信息了，<strong>采用不同的加密方式进行数字签名</strong></p>
<ul>
<li>用户访问服务器去到加密后的令牌，后续访问直接使用令牌即可</li>
<li>哪怕下次访问负载均衡的其他节点，也可以根据令牌进行鉴权</li>
<li>坏处是依然需要查库（去数据库查询认证信息，进行鉴权）</li>
</ul>
<blockquote>
<p>因此为了服务器不存储、不查库、能鉴权，诞生了如今的 <strong>JWT</strong></p>
</blockquote>
<h3 id="_5-jwt" tabindex="-1"><a class="header-anchor" href="#_5-jwt" aria-hidden="true">#</a> 5. JWT</h3>
<p>时下最流行的跨域认证解决方案</p>
<p><a href="http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html" target="_blank" rel="noopener noreferrer">JWT<ExternalLinkIcon/></a> 全称<code v-pre>JSON Web Token</code> 它可以将所有信息都以 <code v-pre>JSON</code> 格式存储，包括 用户名、密码、加密信息等</p>
<h4 id="_5-1-组成部分" tabindex="-1"><a class="header-anchor" href="#_5-1-组成部分" aria-hidden="true">#</a> 5.1 组成部分</h4>
<p>通常由三部分组成，它们之间用圆点 （ . ）连接</p>
<ul>
<li>
<p><strong>Header:</strong> 两部分组成，包括 <code v-pre>token</code> 类型 &amp; 加密算法（如：<em>HMAC SHA256 或者 RSA</em>）</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"alg"</span><span class="token operator">:</span> <span class="token string">"HS256"</span><span class="token punctuation">,</span>
  <span class="token property">"typ"</span><span class="token operator">:</span> <span class="token string">"JWT"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Payload:</strong> 包含声明，指关于用户和其他数据的声明，存放实际传递的数据，有三种类型：</p>
<ul>
<li><code v-pre>Registered claims：</code> 预定义声明，非强制，如：<code v-pre>iss (issuer)</code>,<code v-pre>exp (expiration time)</code>, <code v-pre>sub (subject)</code>, <code v-pre>aud (audience)</code> 等</li>
<li><code v-pre>Public claims：</code> 可随意定义</li>
<li><code v-pre>Private claims：</code> 用于在同意使用它们的各方之间共享信息，并且不是注册的或公开的声明</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"sub"</span><span class="token operator">:</span> <span class="token string">"1234567890"</span><span class="token punctuation">,</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"john"</span><span class="token punctuation">,</span>
  <span class="token property">"admin"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对 <code v-pre>payload</code> 进行 <code v-pre>Base64</code> 编码就会得到 <code v-pre>JWT</code> 的第二部分</p>
</li>
</ul>
<blockquote>
<p><strong>注意:</strong> 不要在 <code v-pre>payload</code> 或 <code v-pre>header</code> 中放置敏感信息，因为默认是不加密的</p>
</blockquote>
<ul>
<li>
<p><strong>Signature:</strong> 对上面两部分的签名，防止消息被篡改</p>
<p>需要指定一个只有服务器知道的密钥（<em>secret</em>）不能泄露给用户，然后按照如下形式生成签名</p>
<div class="language-http ext-http line-numbers-mode"><pre v-pre class="language-http"><code>HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_5-2-jwt-使用方式" tabindex="-1"><a class="header-anchor" href="#_5-2-jwt-使用方式" aria-hidden="true">#</a> 5.2 JWT 使用方式</h4>
<p>客户端收到服务器返回的 <code v-pre>JWT</code>，可以储存在 <code v-pre>Cookie</code> 里面，也可以储存在 <code v-pre>localStorage</code></p>
<p>此后，客户端每次与服务器通信，都要带上这个 <code v-pre>JWT</code></p>
<p>可把它放在 <code v-pre>Cookie</code> 里自动发送，但这样不能跨域。更好的做法是放 <strong>HTTP 请求头</strong> 的 <code v-pre>Authorization</code>字段里</p>
<div class="language-http ext-http line-numbers-mode"><pre v-pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Authorization</span><span class="token punctuation">:</span> <span class="token header-value">Bearer &lt;token></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>另一种是，跨域的时候，<code v-pre>JWT</code> 就放在 <code v-pre>POST</code> 请求的数据体里面.</p>
</div></template>


