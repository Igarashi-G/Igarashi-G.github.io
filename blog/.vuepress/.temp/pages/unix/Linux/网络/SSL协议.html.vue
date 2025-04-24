<template><div><h1 id="ssl-tls协议" tabindex="-1"><a class="header-anchor" href="#ssl-tls协议"><span>SSL/TLS协议</span></a></h1>
<h2 id="_1-协议概述" tabindex="-1"><a class="header-anchor" href="#_1-协议概述"><span>1. 协议概述</span></a></h2>
<h3 id="_1-1-定义" tabindex="-1"><a class="header-anchor" href="#_1-1-定义"><span>1.1 定义</span></a></h3>
<p>SSL/TLS是一种加密协议，在应用层和传输层之间提供安全通信。</p>
<h3 id="_1-2-版本演进" tabindex="-1"><a class="header-anchor" href="#_1-2-版本演进"><span>1.2 版本演进</span></a></h3>
<ul>
<li>SSL 1.0 - 内部版本，未公开</li>
<li>SSL 2.0 - 1995年，安全缺陷严重</li>
<li>SSL 3.0 - 1996年，POODLE漏洞</li>
<li>TLS 1.0 - 1999年，RFC 2246，BEAST攻击</li>
<li>TLS 1.1 - 2006年，RFC 4346，解决CBC攻击</li>
<li>TLS 1.2 - 2008年，RFC 5246，当前广泛使用</li>
<li>TLS 1.3 - 2018年，RFC 8446，安全性和性能显著提升</li>
</ul>
<h2 id="_2-核心组件" tabindex="-1"><a class="header-anchor" href="#_2-核心组件"><span>2. 核心组件</span></a></h2>
<h3 id="_2-1-加密算法" tabindex="-1"><a class="header-anchor" href="#_2-1-加密算法"><span>2.1 加密算法</span></a></h3>
<ul>
<li><strong>对称加密</strong>：AES-GCM、ChaCha20-Poly1305</li>
<li><strong>非对称加密</strong>：RSA、ECDHE、DHE</li>
<li><strong>哈希函数</strong>：SHA-256、SHA-384</li>
<li><strong>消息认证码</strong>：HMAC、GMAC</li>
</ul>
<h3 id="_2-2-握手协议" tabindex="-1"><a class="header-anchor" href="#_2-2-握手协议"><span>2.2 握手协议</span></a></h3>
<p>TLS 1.2握手流程(2-RTT):<br>
Client Server</p>
<hr>
<p>ClientHello --------&gt;<br>
&lt;-------- ServerHello<br>
Certificate<br>
ServerKeyExchange<br>
CertificateRequest<br>
&lt;-------- ServerHelloDone<br>
Certificate<br>
ClientKeyExchange<br>
CertificateVerify<br>
ChangeCipherSpec<br>
Finished --------&gt;<br>
ChangeCipherSpec<br>
&lt;-------- Finished<br>
Application Data &lt;-------&gt; Application Data</p>
<p>TLS 1.3握手流程(1-RTT):</p>
<h2 id="_3-tls-1-3技术特性" tabindex="-1"><a class="header-anchor" href="#_3-tls-1-3技术特性"><span>3. TLS 1.3技术特性</span></a></h2>
<h3 id="_3-1-密码套件" tabindex="-1"><a class="header-anchor" href="#_3-1-密码套件"><span>3.1 密码套件</span></a></h3>
<p>TLS_AES_256_GCM_SHA384<br>
TLS_CHACHA20_POLY1305_SHA256<br>
TLS_AES_128_GCM_SHA256</p>
<h3 id="_3-2-主要改进" tabindex="-1"><a class="header-anchor" href="#_3-2-主要改进"><span>3.2 主要改进</span></a></h3>
<ul>
<li>握手减少为1-RTT（单往返时间）</li>
<li>支持0-RTT恢复连接（使用PSK）</li>
<li>移除了RC4、DES、3DES、EXPORT级密码</li>
<li>移除了静态RSA密钥交换</li>
<li>移除了MD5和SHA-1哈希算法</li>
<li>握手消息加密（除ClientHello/ServerHello外）</li>
<li>密钥导出使用HKDF而非PRF</li>
</ul>
<h3 id="_3-3-密钥交换" tabindex="-1"><a class="header-anchor" href="#_3-3-密钥交换"><span>3.3 密钥交换</span></a></h3>
<p>仅支持具有前向安全性的密钥交换算法：</p>
<ul>
<li>ECDHE（P-256、P-384、P-521、X25519、X448）</li>
<li>DHE（Finite Field）</li>
</ul>
<h2 id="_4-证书和验证" tabindex="-1"><a class="header-anchor" href="#_4-证书和验证"><span>4. 证书和验证</span></a></h2>
<h3 id="_4-1-x-509证书结构" tabindex="-1"><a class="header-anchor" href="#_4-1-x-509证书结构"><span>4.1 X.509证书结构</span></a></h3>
<p>Certificate<br>
|-- Version<br>
|-- Serial Number<br>
|-- Signature Algorithm<br>
|-- Issuer Name<br>
|-- Validity Period<br>
|-- Subject Name<br>
|-- Subject Public Key Info<br>
| |-- Public Key Algorithm<br>
| |-- Subject Public Key<br>
|-- Issuer Unique Identifier (optional)<br>
|-- Subject Unique Identifier (optional)<br>
|-- Extensions (optional)<br>
|-- Certificate Signature Algorithm<br>
|-- Certificate Signature</p>
<h3 id="_4-2-证书验证流程" tabindex="-1"><a class="header-anchor" href="#_4-2-证书验证流程"><span>4.2 证书验证流程</span></a></h3>
<ol>
<li>检查证书链完整性</li>
<li>验证数字签名</li>
<li>检查证书有效期</li>
<li>检查证书吊销状态（CRL/OCSP）</li>
<li>验证域名一致性</li>
</ol>
<h2 id="_5-代码实现示例" tabindex="-1"><a class="header-anchor" href="#_5-代码实现示例"><span>5. 代码实现示例</span></a></h2>
<h3 id="_5-1-openssl命令行-检查服务器支持的tls版本" tabindex="-1"><a class="header-anchor" href="#_5-1-openssl命令行-检查服务器支持的tls版本"><span>5.1 OpenSSL命令行（检查服务器支持的TLS版本）</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 检查TLS 1.3支持</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> s_client</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -connect</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> example.com:443</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -tls1_3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 显示证书信息</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> s_client</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -connect</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> example.com:443</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -showcerts</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 测试握手性能</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">openssl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> s_time</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -connect</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> example.com:443</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -new</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -tls1_3</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-node-js-tls服务器-简化版" tabindex="-1"><a class="header-anchor" href="#_5-2-node-js-tls服务器-简化版"><span>5.2 Node.js TLS服务器（简化版）</span></a></h3>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> tls</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'tls'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> fs</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> require</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'fs'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> options</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  key</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> fs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">readFileSync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'server-key.pem'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  cert</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> fs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">readFileSync</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'server-cert.pem'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  minVersion</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'TLSv1.2'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  preferredCipherSuites</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'TLS_AES_256_GCM_SHA384'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">    'TLS_CHACHA20_POLY1305_SHA256'</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B"> server</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> tls</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">createServer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">options</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">socket</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">=></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'TLS连接已建立'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`TLS版本: </span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">${</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">socket</span><span style="--shiki-light:#50A14F;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getTLSTicket</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`密码套件: </span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">${</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">socket</span><span style="--shiki-light:#50A14F;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getCipher</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span><span style="--shiki-light:#50A14F;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#CA1243;--shiki-dark:#C678DD">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  socket</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">write</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'欢迎使用安全连接!</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  socket</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setEncoding</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'utf8'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  socket</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">pipe</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">socket</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">listen</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">8443</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, () </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">=></span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B">  console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'TLS服务器监听端口8443'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">});</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-java-https客户端" tabindex="-1"><a class="header-anchor" href="#_5-3-java-https客户端"><span>5.3 Java HTTPS客户端</span></a></h3>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> javax.net.ssl.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> java.io.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> java.security.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> TLSClient</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[] </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">args</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> throws</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Exception</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // 设置TLS版本</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setProperty</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"https.protocols"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"TLSv1.2,TLSv1.3"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // 创建SSLContext</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        SSLContext</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> sslContext</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> SSLContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getInstance</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"TLS"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        sslContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">init</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> SecureRandom</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // 创建连接</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> urlStr</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> "https://example.com"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        URL</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> url</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> URL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(urlStr);</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        HttpsURLConnection</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> conn</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (HttpsURLConnection) </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">url</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">openConnection</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        conn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">setSSLSocketFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">sslContext</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getSocketFactory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // 打印会话信息</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        SSLSession</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> session</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> conn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getSSLSession</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"协议: "</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> session</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getProtocol</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"密码套件: "</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> +</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> session</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getCipherSuite</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">());</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // 读取响应</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        BufferedReader</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> in</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> BufferedReader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> InputStreamReader</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">conn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">getInputStream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()));</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> inputLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ((inputLine </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">readLine</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">            System</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(inputLine);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">close</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-调试和故障排除" tabindex="-1"><a class="header-anchor" href="#_6-调试和故障排除"><span>6. 调试和故障排除</span></a></h2>
<h3 id="_6-1-常见问题" tabindex="-1"><a class="header-anchor" href="#_6-1-常见问题"><span>6.1 常见问题</span></a></h3>
<table>
<thead>
<tr>
<th>错误</th>
<th>可能原因</th>
<th>解决方法</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>CERT_UNTRUSTED</code></td>
<td>自签名证书或不被信任的CA</td>
<td>添加根证书到受信任存储</td>
</tr>
<tr>
<td><code v-pre>CERT_HAS_EXPIRED</code></td>
<td>证书已过期</td>
<td>更新服务器证书</td>
</tr>
<tr>
<td><code v-pre>HANDSHAKE_FAILURE</code></td>
<td>客户端与服务端无共同支持的密码套件</td>
<td>更新客户端/服务端协议版本和密码套件</td>
</tr>
<tr>
<td><code v-pre>PROTOCOL_VERSION</code></td>
<td>不兼容的TLS版本</td>
<td>确保双方支持共同的TLS版本</td>
</tr>
</tbody>
</table>
<h3 id="_6-2-性能优化" tabindex="-1"><a class="header-anchor" href="#_6-2-性能优化"><span>6.2 性能优化</span></a></h3>
<ul>
<li>启用会话恢复（Session ID/Tickets）</li>
<li>使用OCSP Stapling减少验证延迟</li>
<li>适当配置证书链（包含所有中间证书）</li>
<li>优先使用ECDHE而非DHE</li>
</ul>
<h2 id="_7-安全最佳实践" tabindex="-1"><a class="header-anchor" href="#_7-安全最佳实践"><span>7. 安全最佳实践</span></a></h2>
<h3 id="_7-1-配置建议" tabindex="-1"><a class="header-anchor" href="#_7-1-配置建议"><span>7.1 配置建议</span></a></h3>
<p>Nginx配置示例<br>
ssl_protocols TLSv1.2 TLSv1.3;<br>
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;<br>
ssl_prefer_server_ciphers on;<br>
ssl_session_timeout 1d;<br>
ssl_session_cache shared:SSL:10m;<br>
ssl_session_tickets off;<br>
ssl_stapling on;<br>
ssl_stapling_verify on;</p>
<h3 id="_7-2-安全扫描工具" tabindex="-1"><a class="header-anchor" href="#_7-2-安全扫描工具"><span>7.2 安全扫描工具</span></a></h3>
<ul>
<li><strong>Qualys SSL Labs Server Test</strong>: <a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener noreferrer">https://www.ssllabs.com/ssltest/</a></li>
<li><strong><a href="http://testssl.sh" target="_blank" rel="noopener noreferrer">testssl.sh</a></strong>: <a href="https://github.com/drwetter/testssl.sh" target="_blank" rel="noopener noreferrer">https://github.com/drwetter/testssl.sh</a></li>
<li><strong>sslscan</strong>: <a href="https://github.com/rbsec/sslscan" target="_blank" rel="noopener noreferrer">https://github.com/rbsec/sslscan</a></li>
</ul>
<h2 id="_8-资源链接" tabindex="-1"><a class="header-anchor" href="#_8-资源链接"><span>8. 资源链接</span></a></h2>
<ul>
<li><a href="https://tools.ietf.org/html/rfc8446" target="_blank" rel="noopener noreferrer">RFC 8446 - TLS 1.3</a></li>
<li><a href="https://tools.ietf.org/html/rfc5246" target="_blank" rel="noopener noreferrer">RFC 5246 - TLS 1.2</a></li>
<li><a href="https://www.openssl.org/docs/" target="_blank" rel="noopener noreferrer">OpenSSL文档</a></li>
<li><a href="https://ssl-config.mozilla.org/" target="_blank" rel="noopener noreferrer">Mozilla SSL配置生成器</a></li>
</ul>
</div></template>


