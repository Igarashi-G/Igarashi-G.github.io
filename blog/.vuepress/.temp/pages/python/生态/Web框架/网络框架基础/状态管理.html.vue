<template><div><p>有/无状态协议</p>
<!--more-->
<h2 id="_1-协议状态" tabindex="-1"><a class="header-anchor" href="#_1-协议状态"><span>1. 协议状态</span></a></h2>
<p>七层网络协议，大多都是有状态协议，如 <strong>SMTP</strong> ，但 <strong>HTTP</strong> 协议，则是无状态协议</p>
<h4 id="_1-1-有状态协议" tabindex="-1"><a class="header-anchor" href="#_1-1-有状态协议"><span>1.1 有状态协议</span></a></h4>
<p>如 <strong>SMTP</strong> 协议</p>
<ul>
<li>发送前必须先建立 <strong>TCP</strong> 连接，并发送 <strong>HELO/EHLO</strong> 建立会话</li>
<li>然后进入 <strong>AUTH</strong> 认证</li>
<li>认证通过才可以发送数据</li>
<li>通过 <strong>QUI</strong> 命令关闭会话</li>
</ul>
<p>如上，整个通信过程，双方是必须要时刻记住当前连接的状态的，不同状态能接受的命令是不同的。另外，之前命令传输的某些数据也必须要记住，因为可能会对后续的命令产生影响</p>
<p>这种有记忆功能的，就是有状态协议，通常维护状态代价较高</p>
<h4 id="_1-2-http1-x-无状态协议" tabindex="-1"><a class="header-anchor" href="#_1-2-http1-x-无状态协议"><span>1.2 HTTP1.X 无状态协议</span></a></h4>
<p>指协议对于交互性场景，没有记忆能力</p>
<ul>
<li>每个请求（<em>交互</em>）都是独立的，本次请求不会基于上次请求有任何改变
<ul>
<li>比如：用户登录，和把东西加入购物车，<strong>HTTP</strong> 不会去记录谁 和 他干了什么，是 <strong>完全无依赖</strong> 的</li>
</ul>
</li>
<li>没有记忆能力，即<strong>无存储</strong>
<ul>
<li>因此需要外部、如 <strong>Cookie</strong>、<strong>Session</strong> 等为交互存储状态</li>
</ul>
</li>
<li>和 <strong>TCP/IP</strong> 不同，发过去就断开了</li>
<li>减少服务器的 <strong>CPU</strong> 和 内存 开销</li>
</ul>
<h2 id="_2-cookie" tabindex="-1"><a class="header-anchor" href="#_2-cookie"><span>2. Cookie</span></a></h2>
<p>英文翻译为 甜品，使用 <strong>Cookie</strong> 可自动填写用户名、记住密码等，算是给用户的一点甜头</p>
<h2 id="_3-session" tabindex="-1"><a class="header-anchor" href="#_3-session"><span>3. Session</span></a></h2>
<p>因为存入 <strong>Cookie</strong>，有泄密风险，因此将机密信息存入服务器，通过服务器来维护客户档案</p>
<ul>
<li>可以理解为服务端存储了一张 <strong>User 表</strong>， <strong>SessionID</strong> 即该表主键</li>
<li>占用服务器资源，用户都要去 <strong>Session</strong> 服务器授权，因此限制负载均衡能力</li>
<li>可以<strong>CSRF</strong> 跨域伪造请求，依然泄密</li>
</ul>
<h2 id="_4-token" tabindex="-1"><a class="header-anchor" href="#_4-token"><span>4. Token</span></a></h2>
<p>令牌鉴权，不存用户信息了，<strong>采用不同的加密方式进行数字签名</strong></p>
<ul>
<li>用户访问服务器去到加密后的令牌，后续访问直接使用令牌即可</li>
<li>哪怕下次访问负载均衡的其他节点，也可以根据令牌进行鉴权</li>
<li>坏处是依然需要查库（去数据库查询认证信息，进行鉴权）</li>
</ul>
<blockquote>
<p>因此为了服务器不存储、不查库、能鉴权，诞生了如今的 <strong>JWT</strong></p>
</blockquote>
<h2 id="_5-jwt" tabindex="-1"><a class="header-anchor" href="#_5-jwt"><span>5. JWT</span></a></h2>
<p>时下最流行的跨域认证解决方案</p>
<p><a href="http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html" target="_blank" rel="noopener noreferrer">JWT</a> 全称 <strong>JSON Web Token</strong> 它可以将所有信息都以 <strong>JSON</strong> 格式存储，包括 用户名、密码、加密信息等</p>
<h4 id="_5-1-组成部分" tabindex="-1"><a class="header-anchor" href="#_5-1-组成部分"><span>5.1 组成部分</span></a></h4>
<p>通常由三部分组成，它们之间用圆点 <code v-pre>.</code>  连接</p>
<ul>
<li>
<p><strong>Header:</strong> 两部分组成，包括 <strong>token</strong> 类型 &amp; 加密算法（<em><strong>HMAC SHA256</strong> 或者 <strong>RSA</strong></em>）</p>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "alg"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"HS256"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "typ"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"JWT"</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Payload:</strong> 包含声明，指关于用户和其他数据的声明，存放实际传递的数据，有三种类型：</p>
<ul>
<li><strong>Registered claims：</strong> 预定义声明，非强制，如：<strong>iss (issuer), exp (expiration time), sub (subject), aud (audience)</strong> 等</li>
<li><strong>Public claims：</strong> 可随意定义</li>
<li><strong>Private claims：</strong> 用于在同意使用它们的各方之间共享信息，并且不是注册的或公开的声明</li>
</ul>
<div class="language-json line-numbers-mode" data-highlighter="shiki" data-ext="json" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "sub"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"1234567890"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "name"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"john"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  "admin"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#0184BC;--shiki-dark:#D19A66">true</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对 <strong>payload</strong> 进行 <strong>Base64</strong> 编码就会得到 <strong>JWT</strong> 的第二部分</p>
</li>
</ul>
<blockquote>
<p><strong>注意:</strong> 不要在 <strong>payload</strong> 或 <strong>header</strong> 中放置敏感信息，因为默认是不加密的</p>
</blockquote>
<ul>
<li>
<p><strong>Signature:</strong> 对上面两部分的签名，防止消息被篡改</p>
<p>需要指定一个只有服务器知道的密钥（<em><strong>secret</strong></em> ）不能泄露给用户，然后按照如下形式生成签名</p>
<div class="language-http line-numbers-mode" data-highlighter="shiki" data-ext="http" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">HMACSHA256(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  base64UrlEncode(header) + "." +</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  base64UrlEncode(payload),</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  secret)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_5-2-jwt-使用方式" tabindex="-1"><a class="header-anchor" href="#_5-2-jwt-使用方式"><span>5.2 JWT 使用方式</span></a></h4>
<p>客户端收到服务器返回的 <strong>JWT</strong>，可以储存在 <strong>Cookie</strong> 里面，也可以储存在 <strong>LocalStorage</strong></p>
<p>此后，客户端每次与服务器通信，都要带上这个 <strong>JWT</strong></p>
<p>可把它放在 <strong>Cookie</strong> 里自动发送，但这样不能跨域。更好的做法是放 <strong>HTTP 请求头</strong> 的 <strong>Authorization</strong>字段里</p>
<div class="language-http line-numbers-mode" data-highlighter="shiki" data-ext="http" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">Authorization</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Bearer &#x3C;token></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>另一种是，跨域的时候，<strong>JWT</strong> 就放在 <strong>POST</strong> 请求的数据体里面</p>
</div></template>


