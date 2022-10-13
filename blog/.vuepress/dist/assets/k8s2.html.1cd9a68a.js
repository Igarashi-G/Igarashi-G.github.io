import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as o,a as n,b as e,f as t,d as s,r as p}from"./app.715d80ef.js";const c={},u=t('<h5 id="kubernetes\u8BA4\u8BC1\u4E0E\u6388\u6743-\u5F55\u5C4F" tabindex="-1"><a class="header-anchor" href="#kubernetes\u8BA4\u8BC1\u4E0E\u6388\u6743-\u5F55\u5C4F" aria-hidden="true">#</a> Kubernetes\u8BA4\u8BC1\u4E0E\u6388\u6743 \u5F55\u5C4F\uFF01\uFF01\uFF01</h5><h6 id="apiservice\u5B89\u5168\u63A7\u5236" tabindex="-1"><a class="header-anchor" href="#apiservice\u5B89\u5168\u63A7\u5236" aria-hidden="true">#</a> APIService\u5B89\u5168\u63A7\u5236</h6><ul><li>Authentication\uFF1A\u8EAB\u4EFD\u8BA4\u8BC1</li></ul><ol><li>\u8FD9\u4E2A\u73AF\u8282\u5B83\u9762\u5BF9\u7684\u8F93\u5165\u662F\u6574\u4E2A<code>http request</code>\uFF0C\u8D1F\u8D23\u5BF9\u6765\u81EAclient\u7684\u8BF7\u6C42\u8FDB\u884C\u8EAB\u4EFD\u6821\u9A8C\uFF0C\u652F\u6301\u7684\u65B9\u6CD5\u5305\u62EC:</li></ol><ul><li><p>client\u8BC1\u4E66\u9A8C\u8BC1\uFF08https\u53CC\u5411\u9A8C\u8BC1\uFF09</p></li><li><p><code>basic auth</code></p></li><li><p>\u666E\u901Atoken</p></li><li><p><code>jwt token</code>(\u7528\u4E8Eserviceaccount)</p></li></ul><ol start="2"><li><p>APIServer\u542F\u52A8\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4E00\u79CDAuthentication\u65B9\u6CD5\uFF0C\u4E5F\u53EF\u4EE5\u6307\u5B9A\u591A\u79CD\u65B9\u6CD5\u3002\u5982\u679C\u6307\u5B9A\u4E86\u591A\u79CD\u65B9\u6CD5\uFF0C\u90A3\u4E48APIServer\u5C06\u4F1A\u9010\u4E2A\u4F7F\u7528\u8FD9\u4E9B\u65B9\u6CD5\u5BF9\u5BA2\u6237\u7AEF\u8BF7\u6C42\u8FDB\u884C\u9A8C\u8BC1\uFF0C \u53EA\u8981\u8BF7\u6C42\u6570\u636E\u901A\u8FC7\u5176\u4E2D\u4E00\u79CD\u65B9\u6CD5\u7684\u9A8C\u8BC1\uFF0CAPIServer\u5C31\u4F1A\u8BA4\u4E3AAuthentication\u6210\u529F\uFF1B</p></li><li><p>\u4F7F\u7528kubeadm\u5F15\u5BFC\u542F\u52A8\u7684k8s\u96C6\u7FA4\u7684apiserver\u521D\u59CB\u914D\u7F6E\u4E2D\uFF0C\u9ED8\u8BA4\u652F\u6301<code>client\u8BC1\u4E66</code>\u9A8C\u8BC1\u548C<code>serviceaccount</code>\u4E24\u79CD\u8EAB\u4EFD\u9A8C\u8BC1\u65B9\u5F0F\u3002 \u8BC1\u4E66\u8BA4\u8BC1\u901A\u8FC7\u8BBE\u7F6E<code>--client-ca-file</code>\u6839\u8BC1\u4E66\u4EE5\u53CA<code>--tls-cert-file</code>\u548C<code>--tls-private-key-file</code>\u6765\u5F00\u542F\u3002</p></li><li><p>\u5728\u8FD9\u4E2A\u73AF\u8282\uFF0Capiserver\u4F1A\u901A\u8FC7client\u8BC1\u4E66\u6216 <code>http header</code>\u4E2D\u7684\u5B57\u6BB5(\u6BD4\u5982serviceaccount\u7684<code>jwt token</code>)\u6765\u8BC6\u522B\u51FA\u8BF7\u6C42\u7684<code>\u7528\u6237\u8EAB\u4EFD</code>\uFF0C\u5305\u62EC\u201Duser\u201D\u3001\u201Dgroup\u201D\u7B49\uFF0C\u8FD9\u4E9B\u4FE1\u606F\u5C06\u5728\u540E\u9762\u7684<code>authorization</code>\u73AF\u8282\u7528\u5230\u3002</p></li></ol><ul><li>Authorization\uFF1A\u9274\u6743\uFF0C\u4F60\u53EF\u4EE5\u8BBF\u95EE\u54EA\u4E9B\u8D44\u6E90</li></ul><ol><li><p>\u8FD9\u4E2A\u73AF\u8282\u9762\u5BF9\u7684\u8F93\u5165\u662F<code>http request context</code>\u4E2D\u7684\u5404\u79CD\u5C5E\u6027\uFF0C\u5305\u62EC\uFF1A<code>user</code>\u3001<code>group</code>\u3001<code>request path</code>\uFF08\u6BD4\u5982\uFF1A<code>/api/v1</code>\u3001<code>/healthz</code>\u3001<code>/version</code>\u7B49\uFF09\u3001 <code>request verb</code>(\u6BD4\u5982\uFF1A<code>get</code>\u3001<code>list</code>\u3001<code>create</code>\u7B49)\u3002</p></li><li><p>APIServer\u4F1A\u5C06\u8FD9\u4E9B\u5C5E\u6027\u503C\u4E0E\u4E8B\u5148\u914D\u7F6E\u597D\u7684\u8BBF\u95EE\u7B56\u7565(<code>access policy</code>\uFF09\u76F8\u6BD4\u8F83\u3002APIServer\u652F\u6301\u591A\u79CD<code>authorization mode</code>\uFF0C\u5305\u62EC<code>Node\u3001RBAC\u3001Webhook</code>\u7B49\u3002</p></li><li><p>APIServer\u542F\u52A8\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4E00\u79CD<code>authorization mode</code>\uFF0C\u4E5F\u53EF\u4EE5\u6307\u5B9A\u591A\u79CD<code>authorization mode</code>\uFF0C\u5982\u679C\u662F\u540E\u8005\uFF0C\u53EA\u8981Request\u901A\u8FC7\u4E86\u5176\u4E2D\u4E00\u79CDmode\u7684\u6388\u6743\uFF0C \u90A3\u4E48\u8BE5\u73AF\u8282\u7684\u6700\u7EC8\u7ED3\u679C\u5C31\u662F\u6388\u6743\u6210\u529F\u3002\u5728\u8F83\u65B0\u7248\u672Ckubeadm\u5F15\u5BFC\u542F\u52A8\u7684k8s\u96C6\u7FA4\u7684apiserver\u521D\u59CB\u914D\u7F6E\u4E2D\uFF0C<code>authorization-mode</code>\u7684\u9ED8\u8BA4\u914D\u7F6E\u662F<code>\u201DNode,RBAC\u201D</code>\u3002</p></li></ol>',8),r=s("Admission Control\uFF1A"),d={href:"http://docs.kubernetes.org.cn/144.html",target:"_blank",rel:"noopener noreferrer"},k=s("\u51C6\u5165\u63A7\u5236"),v=s("\uFF0C\u4E00\u4E2A\u63A7\u5236\u94FE(\u5C42\u5C42\u5173\u5361)\uFF0C\u504F\u96C6\u7FA4\u5B89\u5168\u63A7\u5236\u3001\u7BA1\u7406\u65B9\u9762\u3002\u4E3A\u4EC0\u4E48\u8BF4\u662F\u5B89\u5168\u76F8\u5173\u7684\u673A\u5236\uFF1F"),m=n("li",null,"\u4EE5NamespaceLifecycle\u4E3A\u4F8B\uFF0C \u8BE5\u63D2\u4EF6\u786E\u4FDD\u5904\u4E8ETermination\u72B6\u6001\u7684Namespace\u4E0D\u518D\u63A5\u6536\u65B0\u7684\u5BF9\u8C61\u521B\u5EFA\u8BF7\u6C42\uFF0C\u5E76\u62D2\u7EDD\u8BF7\u6C42\u4E0D\u5B58\u5728\u7684Namespace\u3002\u8BE5\u63D2\u4EF6\u8FD8\u53EF\u4EE5\u9632\u6B62\u5220\u9664\u7CFB\u7EDF\u4FDD\u7559\u7684Namespace:default\uFF0Ckube-system\uFF0Ckube-public\u3002",-1),b=n("li",null,"NodeRestriction\uFF0C \u6B64\u63D2\u4EF6\u9650\u5236kubelet\u4FEE\u6539Node\u548CPod\u5BF9\u8C61\uFF0C\u8FD9\u6837\u7684kubelets\u53EA\u5141\u8BB8\u4FEE\u6539\u7ED1\u5B9A\u5230Node\u7684Pod API\u5BF9\u8C61\uFF0C\u4EE5\u540E\u7248\u672C\u53EF\u80FD\u4F1A\u589E\u52A0\u989D\u5916\u7684\u9650\u5236 \u3002",-1),h=t(`<p>\u4E3A\u4EC0\u4E48\u6211\u4EEC\u6267\u884C\u547D\u4EE4kubectl\u547D\u4EE4\uFF0C\u53EF\u4EE5\u76F4\u63A5\u7BA1\u7406k8s\u96C6\u7FA4\u8D44\u6E90\uFF1F</p><h6 id="kubectl\u7684\u8BA4\u8BC1\u6388\u6743" tabindex="-1"><a class="header-anchor" href="#kubectl\u7684\u8BA4\u8BC1\u6388\u6743" aria-hidden="true">#</a> kubectl\u7684\u8BA4\u8BC1\u6388\u6743</h6><p>kubectl\u7684\u65E5\u5FD7\u8C03\u8BD5\u7EA7\u522B\uFF1A</p><table><thead><tr><th style="text-align:left;">\u4FE1\u606F</th><th style="text-align:left;">\u63CF\u8FF0</th></tr></thead><tbody><tr><td style="text-align:left;">v=0</td><td style="text-align:left;">\u901A\u5E38\uFF0C\u8FD9\u5BF9\u64CD\u4F5C\u8005\u6765\u8BF4\u603B\u662F\u53EF\u89C1\u7684\u3002</td></tr><tr><td style="text-align:left;">v=1</td><td style="text-align:left;">\u5F53\u60A8\u4E0D\u60F3\u8981\u5F88\u8BE6\u7EC6\u7684\u8F93\u51FA\u65F6\uFF0C\u8FD9\u4E2A\u662F\u4E00\u4E2A\u5408\u7406\u7684\u9ED8\u8BA4\u65E5\u5FD7\u7EA7\u522B\u3002</td></tr><tr><td style="text-align:left;">v=2</td><td style="text-align:left;">\u6709\u5173\u670D\u52A1\u548C\u91CD\u8981\u65E5\u5FD7\u6D88\u606F\u7684\u6709\u7528\u7A33\u5B9A\u72B6\u6001\u4FE1\u606F\uFF0C\u8FD9\u4E9B\u4FE1\u606F\u53EF\u80FD\u4E0E\u7CFB\u7EDF\u4E2D\u7684\u91CD\u5927\u66F4\u6539\u76F8\u5173\u3002\u8FD9\u662F\u5927\u591A\u6570\u7CFB\u7EDF\u63A8\u8350\u7684\u9ED8\u8BA4\u65E5\u5FD7\u7EA7\u522B\u3002</td></tr><tr><td style="text-align:left;">v=3</td><td style="text-align:left;">\u5173\u4E8E\u66F4\u6539\u7684\u6269\u5C55\u4FE1\u606F\u3002</td></tr><tr><td style="text-align:left;">v=4</td><td style="text-align:left;">\u8C03\u8BD5\u7EA7\u522B\u4FE1\u606F\u3002</td></tr><tr><td style="text-align:left;">v=6</td><td style="text-align:left;">\u663E\u793A\u8BF7\u6C42\u8D44\u6E90\u3002</td></tr><tr><td style="text-align:left;">v=7</td><td style="text-align:left;">\u663E\u793A HTTP \u8BF7\u6C42\u5934\u3002</td></tr><tr><td style="text-align:left;">v=8</td><td style="text-align:left;">\u663E\u793A HTTP \u8BF7\u6C42\u5185\u5BB9\u3002</td></tr><tr><td style="text-align:left;">v=9</td><td style="text-align:left;">\u663E\u793A HTTP \u8BF7\u6C42\u5185\u5BB9\uFF0C\u5E76\u4E14\u4E0D\u622A\u65AD\u5185\u5BB9\u3002</td></tr></tbody></table><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl get nodes <span class="token operator">-</span>v=7
I0329 20:20:08<span class="token punctuation">.</span>633065 3979 loader<span class="token punctuation">.</span>go:359<span class="token punctuation">]</span> Config loaded <span class="token keyword">from</span> file <span class="token operator">/</span>root/<span class="token punctuation">.</span>kube/config
I0329 20:20:08<span class="token punctuation">.</span>633797 3979 round_trippers<span class="token punctuation">.</span>go:416<span class="token punctuation">]</span> GET https:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>128:6443/api/v1/nodes?limit=500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>kubeadm init</code>\u542F\u52A8\u5B8Cmaster\u8282\u70B9\u540E\uFF0C\u4F1A\u9ED8\u8BA4\u8F93\u51FA\u7C7B\u4F3C\u4E0B\u9762\u7684\u63D0\u793A\u5185\u5BB9\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">..</span>. <span class="token punctuation">..</span>.
Your Kubernetes master has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
<span class="token punctuation">..</span>. <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E9B\u4FE1\u606F\u662F\u5728\u544A\u77E5\u6211\u4EEC\u5982\u4F55\u914D\u7F6E<code>kubeconfig</code>\u6587\u4EF6\u3002\u6309\u7167\u4E0A\u8FF0\u547D\u4EE4\u914D\u7F6E\u540E\uFF0Cmaster\u8282\u70B9\u4E0A\u7684<code>kubectl</code>\u5C31\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528<code>$HOME/.kube/config</code>\u7684\u4FE1\u606F\u8BBF\u95EE<code>k8s cluster</code>\u4E86\u3002 \u5E76\u4E14\uFF0C\u901A\u8FC7\u8FD9\u79CD\u914D\u7F6E\u65B9\u5F0F\uFF0C<code>kubectl</code>\u4E5F\u62E5\u6709\u4E86\u6574\u4E2A\u96C6\u7FA4\u7684\u7BA1\u7406\u5458(root)\u6743\u9650\u3002</p><p>\u5F88\u591AK8s\u521D\u5B66\u8005\u5728\u8FD9\u91CC\u90FD\u4F1A\u6709\u7591\u95EE\uFF1A</p><ul><li>\u5F53<code>kubectl</code>\u4F7F\u7528\u8FD9\u79CD<code>kubeconfig</code>\u65B9\u5F0F\u8BBF\u95EE\u96C6\u7FA4\u65F6\uFF0C<code>Kubernetes</code>\u7684<code>kube-apiserver</code>\u662F\u5982\u4F55\u5BF9\u6765\u81EA<code>kubectl</code>\u7684\u8BBF\u95EE\u8FDB\u884C\u8EAB\u4EFD\u9A8C\u8BC1(<code>authentication</code>)\u548C\u6388\u6743(<code>authorization</code>)\u7684\u5462\uFF1F</li><li>\u4E3A\u4EC0\u4E48\u6765\u81EA<code>kubectl</code>\u7684\u8BF7\u6C42\u62E5\u6709\u6700\u9AD8\u7684\u7BA1\u7406\u5458\u6743\u9650\u5462\uFF1F</li></ul><p>\u67E5\u770B<code>/root/.kube/config</code>\u6587\u4EF6\uFF1A</p><p>\u524D\u9762\u63D0\u5230\u8FC7apiserver\u7684authentication\u652F\u6301\u901A\u8FC7<code>tls client certificate\u3001basic auth\u3001token</code>\u7B49\u65B9\u5F0F\u5BF9\u5BA2\u6237\u7AEF\u53D1\u8D77\u7684\u8BF7\u6C42\u8FDB\u884C\u8EAB\u4EFD\u6821\u9A8C\uFF0C \u4ECEkubeconfig\u4FE1\u606F\u6765\u770B\uFF0Ckubectl\u663E\u7136\u5728\u8BF7\u6C42\u4E2D\u4F7F\u7528\u4E86<code>tls client certificate</code>\u7684\u65B9\u5F0F\uFF0C\u5373\u5BA2\u6237\u7AEF\u7684\u8BC1\u4E66\u3002</p><p>\u8BC1\u4E66base64\u89E3\u7801\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ <span class="token function">echo</span> xxxxxxxxxxxxxx <span class="token punctuation">|</span>base64 <span class="token operator">-</span>d &gt; kubectl<span class="token punctuation">.</span>crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8BF4\u660E\u5728\u8BA4\u8BC1\u9636\u6BB5\uFF0C<code>apiserver</code>\u4F1A\u9996\u5148\u4F7F\u7528<code>--client-ca-file</code>\u914D\u7F6E\u7684CA\u8BC1\u4E66\u53BB\u9A8C\u8BC1kubectl\u63D0\u4F9B\u7684\u8BC1\u4E66\u7684\u6709\u6548\u6027,\u57FA\u672C\u7684\u65B9\u5F0F \uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ openssl verify <span class="token operator">-</span>CAfile <span class="token operator">/</span>etc/kubernetes/pki/ca<span class="token punctuation">.</span>crt kubectl<span class="token punctuation">.</span>crt
kubectl<span class="token punctuation">.</span>crt: OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9664\u4E86\u8BA4\u8BC1\u8EAB\u4EFD\uFF0C\u8FD8\u4F1A\u53D6\u51FA\u5FC5\u8981\u7684\u4FE1\u606F\u4F9B\u6388\u6743\u9636\u6BB5\u4F7F\u7528\uFF0C\u6587\u672C\u5F62\u5F0F\u67E5\u770B\u8BC1\u4E66\u5185\u5BB9\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ openssl x509 <span class="token operator">-in</span> kubectl<span class="token punctuation">.</span>crt <span class="token operator">-</span>text
Certificate:
<span class="token keyword">Data</span>:
Version: 3 <span class="token punctuation">(</span>0x2<span class="token punctuation">)</span>
Serial Number: 4736260165981664452 <span class="token punctuation">(</span>0x41ba9386f52b74c4<span class="token punctuation">)</span>
Signature Algorithm: sha256WithRSAEncryption
Issuer: CN=kubernetes
Validity
Not Before: Feb 10 07:33:39 2020 GMT
Not After : Feb 9 07:33:40 2021 GMT
Subject: O=system:masters<span class="token punctuation">,</span> CN=kubernetes-admin
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BA4\u8BC1\u901A\u8FC7\u540E\uFF0C\u63D0\u53D6\u51FA\u7B7E\u53D1\u8BC1\u4E66\u65F6\u6307\u5B9A\u7684CN(Common Name),<code>kubernetes-admin</code>\uFF0C\u4F5C\u4E3A\u8BF7\u6C42\u7684\u7528\u6237\u540D (User Name), \u4ECE\u8BC1\u4E66\u4E2D\u63D0\u53D6O(Organization)\u5B57\u6BB5\u4F5C\u4E3A\u8BF7\u6C42\u7528\u6237\u6240\u5C5E\u7684\u7EC4 (Group)\uFF0C<code>group = system:masters</code>\uFF0C\u7136\u540E\u4F20\u9012\u7ED9\u540E\u9762\u7684\u6388\u6743\u6A21\u5757\u3002</p><p>kubeadm\u5728init\u521D\u59CB\u5F15\u5BFC\u96C6\u7FA4\u542F\u52A8\u8FC7\u7A0B\u4E2D\uFF0C\u521B\u5EFA\u4E86\u8BB8\u591A<code>default</code>\u7684<code>role\u3001clusterrole\u3001rolebinding</code>\u548C<code>clusterrolebinding</code>\uFF0C \u5728k8s\u6709\u5173RBAC\u7684\u5B98\u65B9\u6587\u6863\u4E2D\uFF0C\u6211\u4EEC\u770B\u5230\u4E0B\u9762\u4E00\u4E9B<code>default clusterrole</code>\u5217\u8868:</p><p>\u5176\u4E2D\u7B2C\u4E00\u4E2Acluster-admin\u8FD9\u4E2Acluster role binding\u7ED1\u5B9A\u4E86system:masters group\uFF0C\u8FD9\u548Cauthentication\u73AF\u8282\u4F20\u9012\u8FC7\u6765\u7684\u8EAB\u4EFD\u4FE1\u606F\u4E0D\u8C0B\u800C\u5408\u3002 \u6CBF\u7740system:masters group\u5BF9\u5E94\u7684cluster-admin clusterrolebinding\u201C\u8FFD\u67E5\u201D\u4E0B\u53BB\uFF0C\u771F\u76F8\u5C31\u4F1A\u6D6E\u51FA\u6C34\u9762\u3002</p><p>\u6211\u4EEC\u67E5\u770B\u4E00\u4E0B\u8FD9\u4E00binding\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code>$ kubectl describe clusterrolebinding cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">Name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">Labels</span><span class="token punctuation">:</span> kubernetes.io/bootstrapping=rbac<span class="token punctuation">-</span>defaults
<span class="token key atrule">Annotations</span><span class="token punctuation">:</span> <span class="token key atrule">rbac.authorization.kubernetes.io/autoupdate</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">Role</span><span class="token punctuation">:</span>
<span class="token key atrule">Kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">Name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">Subjects</span><span class="token punctuation">:</span>
Kind Name Namespace
<span class="token punctuation">---</span><span class="token punctuation">-</span> <span class="token punctuation">---</span><span class="token punctuation">-</span> <span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span>
Group system<span class="token punctuation">:</span>masters
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u770B\u5230\u5728kube-system\u540D\u5B57\u7A7A\u95F4\u4E2D\uFF0C\u4E00\u4E2A\u540D\u4E3Acluster-admin\u7684clusterrolebinding\u5C06cluster-admin cluster role\u4E0Esystem:masters Group\u7ED1\u5B9A\u5230\u4E86\u4E00\u8D77\uFF0C \u8D4B\u4E88\u4E86\u6240\u6709\u5F52\u5C5E\u4E8Esystem:masters Group\u4E2D\u7528\u6237cluster-admin\u89D2\u8272\u6240\u62E5\u6709\u7684\u6743\u9650\u3002</p><p>\u6211\u4EEC\u518D\u6765\u67E5\u770B\u4E00\u4E0Bcluster-admin\u8FD9\u4E2Arole\u7684\u5177\u4F53\u6743\u9650\u4FE1\u606F\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl describe clusterrole cluster-admin
Name: cluster-admin
Labels: kubernetes<span class="token punctuation">.</span>io/bootstrapping=rbac-defaults
Annotations: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/autoupdate: true
PolicyRule:
Resources Non-Resource URLs Resource Names Verbs
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
<span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u975E\u8D44\u6E90\u7C7B\uFF0C\u5982\u67E5\u770B\u96C6\u7FA4\u5065\u5EB7\u72B6\u6001\u3002</p><h6 id="rbac" tabindex="-1"><a class="header-anchor" href="#rbac" aria-hidden="true">#</a> RBAC</h6>`,28),g=s("Role-Based Access Control\uFF0C\u57FA\u4E8E\u89D2\u8272\u7684\u8BBF\u95EE\u63A7\u5236\uFF0C apiserver\u542F\u52A8\u53C2\u6570\u6DFB\u52A0--authorization-mode=RBAC \u6765\u542F\u7528RBAC\u8BA4\u8BC1\u6A21\u5F0F\uFF0Ckubeadm\u5B89\u88C5\u7684\u96C6\u7FA4\u9ED8\u8BA4\u5DF2\u5F00\u542F\u3002"),y={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/",target:"_blank",rel:"noopener noreferrer"},f=s("\u5B98\u65B9\u4ECB\u7ECD"),_=t(`<p>\u67E5\u770B\u5F00\u542F\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment"># master\u8282\u70B9\u67E5\u770Bapiserver\u8FDB\u7A0B</span>
$ <span class="token function">ps</span> aux <span class="token punctuation">|</span>grep apiserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>RBAC\u6A21\u5F0F\u5F15\u5165\u4E864\u4E2A\u8D44\u6E90\uFF1A</p><ul><li>Role\uFF0C\u89D2\u8272</li></ul><p>\u4E00\u4E2ARole\u53EA\u80FD\u6388\u6743\u8BBF\u95EE\u5355\u4E2Anamespace</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment">## \u793A\u4F8B\u5B9A\u4E49\u4E00\u4E2A\u540D\u4E3Apod-reader\u7684\u89D2\u8272\uFF0C\u8BE5\u89D2\u8272\u5177\u6709\u8BFB\u53D6default\u8FD9\u4E2A\u547D\u540D\u7A7A\u95F4\u4E0B\u7684pods\u7684\u6743\u9650</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span> <span class="token comment"># &quot;&quot; indicates the core API group</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">]</span>
<span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span>

<span class="token comment">## apiGroups: &quot;&quot;,&quot;apps&quot;, &quot;autoscaling&quot;, &quot;batch&quot;, kubectl api-versions</span>
<span class="token comment">## resources: &quot;services&quot;, &quot;pods&quot;,&quot;deployments&quot;... kubectl api-resources</span>
<span class="token comment">## verbs: &quot;get&quot;, &quot;list&quot;, &quot;watch&quot;, &quot;create&quot;, &quot;update&quot;, &quot;patch&quot;, &quot;delete&quot;, &quot;exec&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>ClusterRole</li></ul><p>\u4E00\u4E2AClusterRole\u80FD\u591F\u6388\u4E88\u548CRole\u4E00\u6837\u7684\u6743\u9650\uFF0C\u4F46\u662F\u5B83\u662F\u96C6\u7FA4\u8303\u56F4\u5185\u7684\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment">## \u5B9A\u4E49\u4E00\u4E2A\u96C6\u7FA4\u89D2\u8272\uFF0C\u540D\u4E3Asecret-reader\uFF0C\u8BE5\u89D2\u8272\u53EF\u4EE5\u8BFB\u53D6\u6240\u6709\u7684namespace\u4E2D\u7684secret\u8D44\u6E90</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token comment"># &quot;namespace&quot; omitted since ClusterRoles are not namespaced</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;secrets&quot;</span><span class="token punctuation">]</span>
<span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Rolebinding</li></ul><p>\u5C06role\u4E2D\u5B9A\u4E49\u7684\u6743\u9650\u5206\u914D\u7ED9\u7528\u6237\u548C\u7528\u6237\u7EC4\u3002RoleBinding\u5305\u542B\u4E3B\u9898\uFF08users,groups,\u6216service accounts\uFF09\u548C\u6388\u4E88\u89D2\u8272\u7684\u5F15\u7528\u3002\u5BF9\u4E8Enamespace\u5185\u7684\u6388\u6743\u4F7F\u7528RoleBinding\uFF0C\u96C6\u7FA4\u8303\u56F4\u5185\u4F7F\u7528ClusterRoleBinding\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment">## \u5B9A\u4E49\u4E00\u4E2A\u89D2\u8272\u7ED1\u5B9A\uFF0C\u5C06pod-reader\u8FD9\u4E2Arole\u7684\u6743\u9650\u6388\u4E88\u7ED9jane\u8FD9\u4E2AUser\uFF0C\u4F7F\u5F97jane\u53EF\u4EE5\u5728\u8BFB\u53D6default\u8FD9\u4E2A\u547D\u540D\u7A7A\u95F4\u4E0B\u7684\u6240\u6709\u7684pod\u6570\u636E</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>pods
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User <span class="token comment">#\u8FD9\u91CC\u53EF\u4EE5\u662FUser,Group,ServiceAccount</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> jane
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role <span class="token comment">#\u8FD9\u91CC\u53EF\u4EE5\u662FRole\u6216\u8005ClusterRole,\u82E5\u662FClusterRole\uFF0C\u5219\u6743\u9650\u4E5F\u4EC5\u9650\u4E8Erolebinding\u7684\u5185\u90E8</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader <span class="token comment"># match the name of the Role or ClusterRole you wish to bind to</span>
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>\u6CE8\u610F\uFF1Arolebinding\u65E2\u53EF\u4EE5\u7ED1\u5B9Arole\uFF0C\u4E5F\u53EF\u4EE5\u7ED1\u5B9Aclusterrole\uFF0C\u5F53\u7ED1\u5B9Aclusterrole\u7684\u65F6\u5019\uFF0Csubject\u7684\u6743\u9650\u4E5F\u4F1A\u88AB\u9650\u5B9A\u4E8Erolebinding\u5B9A\u4E49\u7684namespace\u5185\u90E8\uFF0C\u82E5\u60F3\u8DE8namespace\uFF0C\u9700\u8981\u4F7F\u7528clusterrolebinding</em></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment">## \u5B9A\u4E49\u4E00\u4E2A\u89D2\u8272\u7ED1\u5B9A\uFF0C\u5C06dave\u8FD9\u4E2A\u7528\u6237\u548Csecret-reader\u8FD9\u4E2A\u96C6\u7FA4\u89D2\u8272\u7ED1\u5B9A\uFF0C\u867D\u7136secret-reader\u662F\u96C6\u7FA4\u89D2\u8272\uFF0C\u4F46\u662F\u56E0\u4E3A\u662F\u4F7F\u7528rolebinding\u7ED1\u5B9A\u7684\uFF0C\u56E0\u6B64dave\u7684\u6743\u9650\u4E5F\u4F1A\u88AB\u9650\u5236\u5728development\u8FD9\u4E2A\u547D\u540D\u7A7A\u95F4\u5185</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token comment"># This role binding allows &quot;dave&quot; to read secrets in the &quot;development&quot; namespace.</span>
<span class="token comment"># You need to already have a ClusterRole named &quot;secret-reader&quot;.</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>secrets
<span class="token comment">#</span>
<span class="token comment"># The namespace of the RoleBinding determines where the permissions are granted.</span>
<span class="token comment"># This only grants permissions within the &quot;development&quot; namespace.</span>
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> development
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User
<span class="token key atrule">name</span><span class="token punctuation">:</span> dave <span class="token comment"># Name is case sensitive</span>
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">name</span><span class="token punctuation">:</span> dave <span class="token comment"># Name is case sensitive</span>
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8003\u8651\u4E00\u4E2A\u573A\u666F\uFF1A \u5982\u679C\u96C6\u7FA4\u4E2D\u6709\u591A\u4E2Anamespace\u5206\u914D\u7ED9\u4E0D\u540C\u7684\u7BA1\u7406\u5458\uFF0C\u6BCF\u4E2Anamespace\u7684\u6743\u9650\u662F\u4E00\u6837\u7684\uFF0C\u5C31\u53EF\u4EE5\u53EA\u5B9A\u4E49\u4E00\u4E2Aclusterrole\uFF0C\u7136\u540E\u901A\u8FC7rolebinding\u5C06\u4E0D\u540C\u7684namespace\u7ED1\u5B9A\u5230\u7BA1\u7406\u5458\u8EAB\u4E0A\uFF0C\u5426\u5219\u5C31\u9700\u8981\u6BCF\u4E2Anamespace\u5B9A\u4E49\u4E00\u4E2ARole\uFF0C\u7136\u540E\u505A\u4E00\u6B21rolebinding\u3002</p><ul><li>ClusterRolebingding</li></ul><p>\u5141\u8BB8\u8DE8namespace\u8FDB\u884C\u6388\u6743</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token comment"># This cluster role binding allows anyone in the &quot;manager&quot; group to read secrets in any namespace.</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>secrets<span class="token punctuation">-</span>global
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> Group
<span class="token key atrule">name</span><span class="token punctuation">:</span> manager <span class="token comment"># Name is case sensitive</span>
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="kubelet\u7684\u8BA4\u8BC1\u6388\u6743" tabindex="-1"><a class="header-anchor" href="#kubelet\u7684\u8BA4\u8BC1\u6388\u6743" aria-hidden="true">#</a> kubelet\u7684\u8BA4\u8BC1\u6388\u6743</h6><p>\u67E5\u770Bkubelet\u8FDB\u7A0B</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ systemctl status kubelet
\u25CF kubelet<span class="token punctuation">.</span>service <span class="token operator">-</span> kubelet: The Kubernetes Node Agent
Loaded: loaded <span class="token punctuation">(</span><span class="token operator">/</span>etc/systemd/system/kubelet<span class="token punctuation">.</span>service<span class="token punctuation">;</span> enabled<span class="token punctuation">;</span> vendor preset: disabled<span class="token punctuation">)</span>
Drop-In: <span class="token operator">/</span>etc/systemd/system/kubelet<span class="token punctuation">.</span>service<span class="token punctuation">.</span>d
\u2514\u250010-kubeadm<span class="token punctuation">.</span>conf
Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Wed 2020-04-01 02:34:13 CST<span class="token punctuation">;</span> 1 day 14h ago
Docs: https:<span class="token operator">/</span><span class="token operator">/</span>kubernetes<span class="token punctuation">.</span>io/docs/
Main PID: 851 <span class="token punctuation">(</span>kubelet<span class="token punctuation">)</span>
Tasks: 21
Memory: 127<span class="token punctuation">.</span>1M
CGroup: <span class="token operator">/</span>system<span class="token punctuation">.</span>slice/kubelet<span class="token punctuation">.</span>service
\u2514\u2500851 <span class="token operator">/</span>usr/bin/kubelet <span class="token operator">--</span>bootstrap-kubeconfig=<span class="token operator">/</span>etc/kubernetes/bootstrap-kubelet<span class="token punctuation">.</span>conf <span class="token operator">--</span>kubeconfig=<span class="token operator">/</span>etc/kubernetes/kubelet<span class="token punctuation">.</span>conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B<code>/etc/kubernetes/kubelet.conf</code>\uFF0C\u89E3\u6790\u8BC1\u4E66\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ <span class="token function">echo</span> xxxxx <span class="token punctuation">|</span>base64 <span class="token operator">-</span>d &gt;kubelet<span class="token punctuation">.</span>crt
$ openssl x509 <span class="token operator">-in</span> kubelet<span class="token punctuation">.</span>crt <span class="token operator">-</span>text
Certificate:
<span class="token keyword">Data</span>:
Version: 3 <span class="token punctuation">(</span>0x2<span class="token punctuation">)</span>
Serial Number: 9059794385454520113 <span class="token punctuation">(</span>0x7dbadafe23185731<span class="token punctuation">)</span>
Signature Algorithm: sha256WithRSAEncryption
Issuer: CN=kubernetes
Validity
Not Before: Feb 10 07:33:39 2020 GMT
Not After : Feb 9 07:33:40 2021 GMT
Subject: O=system:nodes<span class="token punctuation">,</span> CN=system:node:master-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F97\u5230\u6211\u4EEC\u671F\u671B\u7684\u5185\u5BB9\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Subject: <span class="token assign-left variable">O</span><span class="token operator">=</span>system:nodes, <span class="token assign-left variable">CN</span><span class="token operator">=</span>system:node:k8s-master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u77E5\u9053\uFF0Ck8s\u4F1A\u628AO\u4F5C\u4E3AGroup\u6765\u8FDB\u884C\u8BF7\u6C42\uFF0C\u56E0\u6B64\u5982\u679C\u6709\u6743\u9650\u7ED1\u5B9A\u7ED9\u8FD9\u4E2A\u7EC4\uFF0C\u80AF\u5B9A\u5728clusterrolebinding\u7684\u5B9A\u4E49\u4E2D\u53EF\u4EE5\u627E\u5F97\u5230\u3002\u56E0\u6B64\u5C1D\u8BD5\u53BB\u627E\u4E00\u4E0B\u7ED1\u5B9A\u4E86system:nodes\u7EC4\u7684clusterrolebinding</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl get clusterrolebinding<span class="token punctuation">|</span>awk <span class="token string">&#39;NR&gt;1{print $1}&#39;</span><span class="token punctuation">|</span>xargs kubectl get clusterrolebinding <span class="token operator">-</span>oyaml<span class="token punctuation">|</span>grep <span class="token operator">-</span>n10 system:nodes
98- roleRef:
99- apiGroup: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io
100- kind: ClusterRole
101- name: system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
102- subjects:
103- <span class="token operator">-</span> apiGroup: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io
104- kind: <span class="token function">Group</span>
105: name: system:nodes
106-<span class="token operator">-</span> apiVersion: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
107- kind: ClusterRoleBinding
108- metadata:
109- creationTimestamp: <span class="token string">&quot;2020-02-10T07:34:02Z&quot;</span>
110- name: kubeadm:node-proxier
111- resourceVersion: <span class="token string">&quot;213&quot;</span>
112- selfLink: <span class="token operator">/</span>apis/rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1/clusterrolebindings/kubeadm%3Anode-proxier

$ kubectl describe clusterrole system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
Name: system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
Labels: kubernetes<span class="token punctuation">.</span>io/bootstrapping=rbac-defaults
Annotations: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/autoupdate: true
PolicyRule:
Resources Non-Resource URLs Resource Names Verbs
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
certificatesigningrequests<span class="token punctuation">.</span>certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/selfnodeclient <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token namespace">[create]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),q=s("\u7ED3\u5C40\u6709\u70B9\u610F\u5916\uFF0C\u9664\u4E86"),x=n("code",null,"system:certificates.k8s.io:certificatesigningrequests:selfnodeclient",-1),w=s("\u5916\uFF0C\u6CA1\u6709\u627E\u5230system\u76F8\u5173\u7684rolebindings\uFF0C\u663E\u7136\u548C\u6211\u4EEC\u7684\u7406\u89E3\u4E0D\u4E00\u6837\u3002 \u5C1D\u8BD5\u53BB\u627E"),N={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/",target:"_blank",rel:"noopener noreferrer"},R=s("\u8D44\u6599"),A=s("\uFF0C\u53D1\u73B0\u4E86\u8FD9\u4E48\u4E00\u6BB5 :"),C=n("thead",null,[n("tr",null,[n("th",{style:{"text-align":"left"}},"Default ClusterRole"),n("th",{style:{"text-align":"left"}},"Default ClusterRoleBinding"),n("th",{style:{"text-align":"left"}},"Description")])],-1),z=n("td",{style:{"text-align":"left"}},"system:kube-scheduler",-1),S=n("td",{style:{"text-align":"left"}},"system:kube-scheduler user",-1),I={style:{"text-align":"left"}},P=s("Allows access to the resources required by the "),T={href:"https://kubernetes.io/docs/reference/generated/kube-scheduler/",target:"_blank",rel:"noopener noreferrer"},V=s("scheduler"),W=s("component."),Z=n("tr",null,[n("td",{style:{"text-align":"left"}},"system:volume-scheduler"),n("td",{style:{"text-align":"left"}},"system:kube-scheduler user"),n("td",{style:{"text-align":"left"}},"Allows access to the volume resources required by the kube-scheduler component.")],-1),E=n("td",{style:{"text-align":"left"}},"system:kube-controller-manager",-1),G=n("td",{style:{"text-align":"left"}},"system:kube-controller-manager user",-1),j={style:{"text-align":"left"}},Y=s("Allows access to the resources required by the "),L={href:"https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/",target:"_blank",rel:"noopener noreferrer"},M=s("controller manager"),J=s(" component. The permissions required by individual controllers are detailed in the "),O={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/#controller-roles",target:"_blank",rel:"noopener noreferrer"},$=s("controller roles"),F=s("."),X=n("td",{style:{"text-align":"left"}},"system:node",-1),B=n("td",{style:{"text-align":"left"}},"None",-1),U={style:{"text-align":"left"}},D=s("Allows access to resources required by the kubelet, "),K=n("strong",null,"including read access to all secrets, and write access to all pod status objects",-1),H=s(". You should use the "),Q={href:"https://kubernetes.io/docs/reference/access-authn-authz/node/",target:"_blank",rel:"noopener noreferrer"},nn=s("Node authorizer"),sn=s(" and "),an={href:"https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction",target:"_blank",rel:"noopener noreferrer"},en=s("NodeRestriction admission plugin"),tn=s(" instead of the "),ln=n("code",null,"system:node",-1),on=s(" role, and allow granting API access to kubelets based on the Pods scheduled to run on them. The "),pn=n("code",null,"system:node",-1),cn=s(" role only exists for compatibility with Kubernetes clusters upgraded from versions prior to v1.8."),un=n("td",{style:{"text-align":"left"}},"system:node-proxier",-1),rn=n("td",{style:{"text-align":"left"}},"system:kube-proxy user",-1),dn={style:{"text-align":"left"}},kn=s("Allows access to the resources required by the "),vn={href:"https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/",target:"_blank",rel:"noopener noreferrer"},mn=s("kube-proxy"),bn=s("component."),hn=s("\u5927\u81F4\u610F\u601D\u662F\u8BF4\uFF1A\u4E4B\u524D\u4F1A\u5B9A\u4E49system:node\u8FD9\u4E2A\u89D2\u8272\uFF0C\u76EE\u7684\u662F\u4E3A\u4E86kubelet\u53EF\u4EE5\u8BBF\u95EE\u5230\u5FC5\u8981\u7684\u8D44\u6E90\uFF0C\u5305\u62EC\u6240\u6709secret\u7684\u8BFB\u6743\u9650\u53CA\u66F4\u65B0pod\u72B6\u6001\u7684\u5199\u6743\u9650\u3002\u5982\u679C1.8\u7248\u672C\u540E\uFF0C\u662F\u5EFA\u8BAE\u4F7F\u7528 "),gn={href:"https://kubernetes.io/docs/reference/access-authn-authz/node/",target:"_blank",rel:"noopener noreferrer"},yn=s("Node authorizer"),fn=s(" and "),_n={href:"https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction",target:"_blank",rel:"noopener noreferrer"},qn=s("NodeRestriction admission plugin"),xn=s(" \u6765\u4EE3\u66FF\u8FD9\u4E2A\u89D2\u8272\u7684\u3002"),wn=t(`<p>\u6211\u4EEC\u76EE\u524D\u4F7F\u75281.16\uFF0C\u67E5\u770B\u4E00\u4E0B\u6388\u6743\u7B56\u7565\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ <span class="token function">ps</span> axu<span class="token punctuation">|</span>grep apiserver
kube-apiserver <span class="token operator">--</span>authorization-mode=Node<span class="token punctuation">,</span>RBAC <span class="token operator">--</span><span class="token function">enable-admission</span><span class="token operator">-</span>plugins=NodeRestriction
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u4E00\u4E0B\u5B98\u7F51\u5BF9Node authorizer\u7684\u4ECB\u7ECD\uFF1A</p><p><em>Node authorization is a special-purpose authorization mode that specifically authorizes API requests made by kubelets.</em></p><p><em>In future releases, the node authorizer may add or remove permissions to ensure kubelets have the minimal set of permissions required to operate correctly.</em></p><p><em>In order to be authorized by the Node authorizer, kubelets must use a credential that identifies them as being in the <code>system:nodes</code> group, with a username of <code>system:node:&lt;nodeName&gt;</code></em></p><h6 id="service-account" tabindex="-1"><a class="header-anchor" href="#service-account" aria-hidden="true">#</a> Service Account</h6><p>\u524D\u9762\u8BF4\uFF0C\u8BA4\u8BC1\u53EF\u4EE5\u901A\u8FC7\u8BC1\u4E66\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7\u4F7F\u7528ServiceAccount\uFF08\u670D\u52A1\u8D26\u6237\uFF09\u7684\u65B9\u5F0F\u6765\u505A\u8BA4\u8BC1\u3002\u5927\u591A\u6570\u65F6\u5019\uFF0C\u6211\u4EEC\u5728\u57FA\u4E8Ek8s\u505A\u4E8C\u6B21\u5F00\u53D1\u65F6\u90FD\u662F\u9009\u62E9\u901A\u8FC7serviceaccount\u7684\u65B9\u5F0F\u3002\u6211\u4EEC\u4E4B\u524D\u8BBF\u95EEdashboard\u7684\u65F6\u5019\uFF0C\u662F\u5982\u4F55\u505A\u7684\uFF1F</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment">## \u65B0\u5EFA\u4E00\u4E2A\u540D\u4E3Aadmin\u7684serviceaccount\uFF0C\u5E76\u4E14\u628A\u540D\u4E3Acluster-admin\u7684\u8FD9\u4E2A\u96C6\u7FA4\u89D2\u8272\u7684\u6743\u9650\u6388\u4E88\u65B0\u5EFA\u7684serviceaccount</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> admin
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1beta1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> admin
<span class="token key atrule">annotations</span><span class="token punctuation">:</span>
<span class="token key atrule">rbac.authorization.kubernetes.io/autoupdate</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">name</span><span class="token punctuation">:</span> admin
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u67E5\u770B\u4E00\u4E0B\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kubernetes-dashboard get sa admin <span class="token operator">-</span>o yaml
apiVersion: v1
kind: ServiceAccount
metadata:
creationTimestamp: <span class="token string">&quot;2020-04-01T11:59:21Z&quot;</span>
name: admin
namespace: kubernetes-dashboard
resourceVersion: <span class="token string">&quot;1988878&quot;</span>
selfLink: <span class="token operator">/</span>api/v1/namespaces/kubernetes-dashboard/serviceaccounts/admin
uid: 639ecc3e-74d9-11ea-a59b-000c29dfd73f
secrets:
<span class="token operator">-</span> name: admin-token-lfsrf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\u5230serviceaccount\u4E0A\u9ED8\u8BA4\u7ED1\u5B9A\u4E86\u4E00\u4E2A\u540D\u4E3Aadmin-token-lfsrf\u7684secret\uFF0C\u6211\u4EEC\u67E5\u770B\u4E00\u4E0Bsecret</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kubernetes-dashboard describe secret admin-token-lfsrf
Name: admin-token-lfsrf
Namespace: kubernetes-dashboard
Labels: &lt;none&gt;
Annotations: kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>name: admin
kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>uid: 639ecc3e-74d9-11ea-a59b-000c29dfd73f

<span class="token function">Type</span>: kubernetes<span class="token punctuation">.</span>io/service-account-token
<span class="token keyword">Data</span>
====
ca<span class="token punctuation">.</span>crt: 1025 bytes
namespace: 4 bytes
token: eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9<span class="token punctuation">.</span>eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZW1vIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFkbWluLXRva2VuLWxmc3JmIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNjM5ZWNjM2UtNzRkOS0xMWVhLWE1OWItMDAwYzI5ZGZkNzNmIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlbW86YWRtaW4ifQ<span class="token punctuation">.</span>ffGCU4L5LxTsMx3NcNixpjT6nLBi-pmstb4I-W61nLOzNaMmYSEIwAaugKMzNR-2VwM14WbuG04dOeO67niJeP6n8-ALkl-vineoYCsUjrzJ09qpM3TNUPatHFqyjcqJ87h4VKZEqk2qCCmLxB6AGbEHpVFkoge40vHs56cIymFGZLe53JZkhu3pwYuS4jpXytV30Ad-HwmQDUu_Xqcifni6tDYPCfKz2CZlcOfwqHeGIHJjDGVBKqhEeo8PhStoofBU6Y4OjObP7HGuTY-Foo4QindNnpp0QU6vSb7kiOiQ4twpayybH8PTf73dtdFt46UF6mGjskWgevgolvmO8A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F00\u53D1\u7684\u65F6\u5019\u5982\u4F55\u53BB\u8C03\u7528k8s\u7684api:</p><ol><li>curl\u6F14\u793A</li></ol><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ curl <span class="token operator">-</span>k <span class="token operator">-</span>H <span class="token string">&quot;Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZW1vIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFkbWluLXRva2VuLWxmc3JmIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNjM5ZWNjM2UtNzRkOS0xMWVhLWE1OWItMDAwYzI5ZGZkNzNmIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlbW86YWRtaW4ifQ.ffGCU4L5LxTsMx3NcNixpjT6nLBi-pmstb4I-W61nLOzNaMmYSEIwAaugKMzNR-2VwM14WbuG04dOeO67niJeP6n8-ALkl-vineoYCsUjrzJ09qpM3TNUPatHFqyjcqJ87h4VKZEqk2qCCmLxB6AGbEHpVFkoge40vHs56cIymFGZLe53JZkhu3pwYuS4jpXytV30Ad-HwmQDUu_Xqcifni6tDYPCfKz2CZlcOfwqHeGIHJjDGVBKqhEeo8PhStoofBU6Y4OjObP7HGuTY-Foo4QindNnpp0QU6vSb7kiOiQ4twpayybH8PTf73dtdFt46UF6mGjskWgevgolvmO8A&quot;</span> https:<span class="token operator">/</span><span class="token operator">/</span>62<span class="token punctuation">.</span>234<span class="token punctuation">.</span>214<span class="token punctuation">.</span>206:6443/api/v1/namespaces/demo/pods?limit=500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>postman</li></ol><h4 id="\u67E5\u770Betcd\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770Betcd\u6570\u636E" aria-hidden="true">#</a> \u67E5\u770Betcd\u6570\u636E</h4><p>\u62F7\u8D1Detcdctl\u547D\u4EE4\u884C\u5DE5\u5177\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ docker exec <span class="token operator">-</span>ti etcd_container which etcdctl
$ docker <span class="token function">cp</span> etcd_container:<span class="token operator">/</span>usr/local/bin/etcdctl <span class="token operator">/</span>usr/bin/etcdctl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u6240\u6709key\u503C\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ ETCDCTL_API=3 etcdctl <span class="token operator">--</span>endpoints=https:<span class="token operator">/</span><span class="token operator">/</span><span class="token punctuation">[</span>127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1<span class="token punctuation">]</span>:2379 <span class="token operator">--</span>cacert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/ca<span class="token punctuation">.</span>crt <span class="token operator">--</span>cert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>crt <span class="token operator">--</span>key=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>key get <span class="token operator">/</span> <span class="token operator">--</span>prefix <span class="token operator">--</span>keys-only
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B\u5177\u4F53\u7684key\u5BF9\u5E94\u7684\u6570\u636E\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ ETCDCTL_API=3 etcdctl <span class="token operator">--</span>endpoints=https:<span class="token operator">/</span><span class="token operator">/</span><span class="token punctuation">[</span>127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1<span class="token punctuation">]</span>:2379 <span class="token operator">--</span>cacert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/ca<span class="token punctuation">.</span>crt <span class="token operator">--</span>cert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>crt <span class="token operator">--</span>key=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>key get <span class="token operator">/</span>registry/pods/jenkins/sonar-postgres-7fc5d748b6-gtmsb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u57FA\u4E8Eefk\u5B9E\u73B0kubernetes\u96C6\u7FA4\u7684\u65E5\u5FD7\u5E73\u53F0-\u6269\u5C55-\u5F55\u5C4F" tabindex="-1"><a class="header-anchor" href="#\u57FA\u4E8Eefk\u5B9E\u73B0kubernetes\u96C6\u7FA4\u7684\u65E5\u5FD7\u5E73\u53F0-\u6269\u5C55-\u5F55\u5C4F" aria-hidden="true">#</a> \u57FA\u4E8EEFK\u5B9E\u73B0kubernetes\u96C6\u7FA4\u7684\u65E5\u5FD7\u5E73\u53F0\uFF08\u6269\u5C55\uFF09 \u5F55\u5C4F\uFF01\uFF01\uFF01</h4><h5 id="efk\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#efk\u4ECB\u7ECD" aria-hidden="true">#</a> EFK\u4ECB\u7ECD</h5><p>EFK\u5DE5\u4F5C\u793A\u610F</p><ul><li>Elasticsearch</li></ul><p>\u4E00\u4E2A\u5F00\u6E90\u7684\u5206\u5E03\u5F0F\u3001Restful \u98CE\u683C\u7684\u641C\u7D22\u548C\u6570\u636E\u5206\u6790\u5F15\u64CE\uFF0C\u5B83\u7684\u5E95\u5C42\u662F\u5F00\u6E90\u5E93Apache Lucene\u3002\u5B83\u53EF\u4EE5\u88AB\u4E0B\u9762\u8FD9\u6837\u51C6\u786E\u5730\u5F62\u5BB9\uFF1A</p><ul><li><p>\u4E00\u4E2A\u5206\u5E03\u5F0F\u7684\u5B9E\u65F6\u6587\u6863\u5B58\u50A8\uFF0C\u6BCF\u4E2A\u5B57\u6BB5\u53EF\u4EE5\u88AB\u7D22\u5F15\u4E0E\u641C\u7D22\uFF1B</p></li><li><p>\u4E00\u4E2A\u5206\u5E03\u5F0F\u5B9E\u65F6\u5206\u6790\u641C\u7D22\u5F15\u64CE\uFF1B</p></li><li><p>\u80FD\u80DC\u4EFB\u4E0A\u767E\u4E2A\u670D\u52A1\u8282\u70B9\u7684\u6269\u5C55\uFF0C\u5E76\u652F\u6301 PB \u7EA7\u522B\u7684\u7ED3\u6784\u5316\u6216\u8005\u975E\u7ED3\u6784\u5316\u6570\u636E\u3002</p></li><li><p>Fluentd</p></li></ul><p>\u4E00\u4E2A\u9488\u5BF9\u65E5\u5FD7\u7684\u6536\u96C6\u3001\u5904\u7406\u3001\u8F6C\u53D1\u7CFB\u7EDF\u3002\u901A\u8FC7\u4E30\u5BCC\u7684\u63D2\u4EF6\u7CFB\u7EDF\uFF0C\u53EF\u4EE5\u6536\u96C6\u6765\u81EA\u4E8E\u5404\u79CD\u7CFB\u7EDF\u6216\u5E94\u7528\u7684\u65E5\u5FD7\uFF0C\u8F6C\u5316\u4E3A\u7528\u6237\u6307\u5B9A\u7684\u683C\u5F0F\u540E\uFF0C\u8F6C\u53D1\u5230\u7528\u6237\u6240\u6307\u5B9A\u7684\u65E5\u5FD7\u5B58\u50A8\u7CFB\u7EDF\u4E4B\u4E2D\u3002</p><p>Fluentd \u901A\u8FC7\u4E00\u7EC4\u7ED9\u5B9A\u7684\u6570\u636E\u6E90\u6293\u53D6\u65E5\u5FD7\u6570\u636E\uFF0C\u5904\u7406\u540E\uFF08\u8F6C\u6362\u6210\u7ED3\u6784\u5316\u7684\u6570\u636E\u683C\u5F0F\uFF09\u5C06\u5B83\u4EEC\u8F6C\u53D1\u7ED9\u5176\u4ED6\u670D\u52A1\uFF0C\u6BD4\u5982 Elasticsearch\u3001\u5BF9\u8C61\u5B58\u50A8\u3001kafka\u7B49\u7B49\u3002Fluentd \u652F\u6301\u8D85\u8FC7300\u4E2A\u65E5\u5FD7\u5B58\u50A8\u548C\u5206\u6790\u670D\u52A1\uFF0C\u6240\u4EE5\u5728\u8FD9\u65B9\u9762\u662F\u975E\u5E38\u7075\u6D3B\u7684\u3002\u4E3B\u8981\u8FD0\u884C\u6B65\u9AA4\u5982\u4E0B</p><ol><li>\u9996\u5148 Fluentd \u4ECE\u591A\u4E2A\u65E5\u5FD7\u6E90\u83B7\u53D6\u6570\u636E</li><li>\u7ED3\u6784\u5316\u5E76\u4E14\u6807\u8BB0\u8FD9\u4E9B\u6570\u636E</li><li>\u7136\u540E\u6839\u636E\u5339\u914D\u7684\u6807\u7B7E\u5C06\u6570\u636E\u53D1\u9001\u5230\u591A\u4E2A\u76EE\u6807\u670D\u52A1</li></ol><ul><li>Kibana</li></ul><p>Kibana\u662F\u4E00\u4E2A\u5F00\u6E90\u7684\u5206\u6790\u548C\u53EF\u89C6\u5316\u5E73\u53F0\uFF0C\u8BBE\u8BA1\u7528\u4E8E\u548CElasticsearch\u4E00\u8D77\u5DE5\u4F5C\u3002\u53EF\u4EE5\u901A\u8FC7Kibana\u6765\u641C\u7D22\uFF0C\u67E5\u770B\uFF0C\u5E76\u548C\u5B58\u50A8\u5728Elasticsearch\u7D22\u5F15\u4E2D\u7684\u6570\u636E\u8FDB\u884C\u4EA4\u4E92\u3002\u4E5F\u53EF\u4EE5\u8F7B\u677E\u5730\u6267\u884C\u9AD8\u7EA7\u6570\u636E\u5206\u6790\uFF0C\u5E76\u4E14\u4EE5\u5404\u79CD\u56FE\u6807\u3001\u8868\u683C\u548C\u5730\u56FE\u7684\u5F62\u5F0F\u53EF\u89C6\u5316\u6570\u636E\u3002</p><h5 id="\u90E8\u7F72es\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72es\u670D\u52A1" aria-hidden="true">#</a> \u90E8\u7F72es\u670D\u52A1</h5><h6 id="\u90E8\u7F72\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72\u5206\u6790" aria-hidden="true">#</a> \u90E8\u7F72\u5206\u6790</h6><ol><li>es\u751F\u4EA7\u73AF\u5883\u662F\u90E8\u7F72es\u96C6\u7FA4\uFF0C\u901A\u5E38\u4F1A\u4F7F\u7528statefulset\u8FDB\u884C\u90E8\u7F72\uFF0C\u6B64\u4F8B\u7531\u4E8E\u6F14\u793A\u73AF\u5883\u8D44\u6E90\u95EE\u9898\uFF0C\u90E8\u7F72\u4E3A\u5355\u70B9</li><li>\u6570\u636E\u5B58\u50A8\u6302\u8F7D\u4E3B\u673A\u8DEF\u5F84</li><li>es\u9ED8\u8BA4\u4F7F\u7528elasticsearch\u7528\u6237\u542F\u52A8\u8FDB\u7A0B\uFF0Ces\u7684\u6570\u636E\u76EE\u5F55\u662F\u901A\u8FC7\u5BBF\u4E3B\u673A\u7684\u8DEF\u5F84\u6302\u8F7D\uFF0C\u56E0\u6B64\u76EE\u5F55\u6743\u9650\u88AB\u4E3B\u673A\u7684\u76EE\u5F55\u6743\u9650\u8986\u76D6\uFF0C\u56E0\u6B64\u53EF\u4EE5\u5229\u7528init container\u5BB9\u5668\u5728es\u8FDB\u7A0B\u542F\u52A8\u4E4B\u524D\u628A\u76EE\u5F55\u7684\u6743\u9650\u4FEE\u6539\u6389\uFF0C\u6CE8\u610Finit container\u8981\u7528\u7279\u6743\u6A21\u5F0F\u542F\u52A8\u3002</li></ol><h6 id="\u90E8\u7F72\u5E76\u9A8C\u8BC1" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72\u5E76\u9A8C\u8BC1" aria-hidden="true">#</a> \u90E8\u7F72\u5E76\u9A8C\u8BC1</h6><p><code>efk/elasticsearch.yaml</code></p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>apiVersion: apps/v1
kind: StatefulSet
metadata:
labels:
addonmanager<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/mode: Reconcile
k8s-app: elasticsearch-logging
version: v7<span class="token punctuation">.</span>4<span class="token punctuation">.</span>2
name: elasticsearch-logging
namespace: logging
spec:
replicas: 1
revisionHistoryLimit: 10
selector:
matchLabels:
k8s-app: elasticsearch-logging
version: v7<span class="token punctuation">.</span>4<span class="token punctuation">.</span>2
serviceName: elasticsearch-logging
template:
metadata:
labels:
k8s-app: elasticsearch-logging
version: v7<span class="token punctuation">.</span>4<span class="token punctuation">.</span>2
spec:
nodeSelector:
log: <span class="token string">&quot;true&quot;</span> <span class="token comment">## \u6307\u5B9A\u90E8\u7F72\u5728\u54EA\u4E2A\u8282\u70B9\u3002\u9700\u6839\u636E\u73AF\u5883\u6765\u4FEE\u6539</span>
containers:
<span class="token operator">-</span> env:
<span class="token operator">-</span> name: NAMESPACE
valueFrom:
fieldRef:
apiVersion: v1
fieldPath: metadata<span class="token punctuation">.</span>namespace
<span class="token operator">-</span> name: cluster<span class="token punctuation">.</span>initial_master_nodes
value: elasticsearch-logging-0
<span class="token operator">-</span> name: ES_JAVA_OPTS
value: <span class="token string">&quot;-Xms512m -Xmx512m&quot;</span>
image: 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/elasticsearch/elasticsearch:7<span class="token punctuation">.</span>4<span class="token punctuation">.</span>2
name: elasticsearch-logging
ports:
<span class="token operator">-</span> containerPort: 9200
name: db
protocol: TCP
<span class="token operator">-</span> containerPort: 9300
name: transport
protocol: TCP
volumeMounts:
<span class="token operator">-</span> mountPath: <span class="token operator">/</span>usr/share/elasticsearch/<span class="token keyword">data</span>
name: elasticsearch-logging
dnsConfig:
options:
<span class="token operator">-</span> name: single-<span class="token function">request-reopen</span>
initContainers:
<span class="token operator">-</span> command:
<span class="token operator">-</span> <span class="token operator">/</span>sbin/sysctl
<span class="token operator">-</span> <span class="token operator">-</span>w
<span class="token operator">-</span> vm<span class="token punctuation">.</span>max_map_count=262144
image: alpine:3<span class="token punctuation">.</span>6
imagePullPolicy: IfNotPresent
name: elasticsearch-logging-init
resources: <span class="token punctuation">{</span><span class="token punctuation">}</span>
securityContext:
privileged: true
<span class="token operator">-</span> name: fix-permissions
image: alpine:3<span class="token punctuation">.</span>6
command: <span class="token punctuation">[</span><span class="token string">&quot;sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;chown -R 1000:1000 /usr/share/elasticsearch/data&quot;</span><span class="token punctuation">]</span>
securityContext:
privileged: true
volumeMounts:
<span class="token operator">-</span> name: elasticsearch-logging
mountPath: <span class="token operator">/</span>usr/share/elasticsearch/<span class="token keyword">data</span>
volumes:
<span class="token operator">-</span> name: elasticsearch-logging
hostPath:
path: <span class="token operator">/</span>esdata
<span class="token operator">--</span><span class="token operator">-</span>
apiVersion: v1
kind: Service
metadata:
labels:
k8s-app: elasticsearch-logging
name: elasticsearch
namespace: logging
spec:
ports:
<span class="token operator">-</span> port: 9200
protocol: TCP
targetPort: db
selector:
k8s-app: elasticsearch-logging
<span class="token function">type</span>: ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl create namespace logging
<span class="token comment">## \u7ED9slave1\u8282\u70B9\u6253\u4E0Alabel\uFF0C\u5C06es\u670D\u52A1\u8C03\u5EA6\u5230slave1\u8282\u70B9</span>
$ kubectl label node k8s-slave1 log=true
<span class="token comment">## \u90E8\u7F72\u670D\u52A1\uFF0C\u53EF\u4EE5\u5148\u53BB\u90E8\u7F72es\u7684\u8282\u70B9\u628A\u955C\u50CF\u4E0B\u8F7D\u5230\u672C\u5730</span>
$ kubectl create <span class="token operator">-</span>f elasticsearch<span class="token punctuation">.</span>yaml
statefulset<span class="token punctuation">.</span>apps/elasticsearch-logging created
service/elasticsearch created

<span class="token comment">## \u7B49\u5F85\u7247\u523B\uFF0C\u67E5\u770B\u4E00\u4E0Bes\u7684pod\u90E8\u7F72\u5230\u4E86k8s-slave1\u8282\u70B9\uFF0C\u72B6\u6001\u53D8\u4E3Arunning</span>
$ kubectl <span class="token operator">-</span>n logging get po <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE IP NODE
elasticsearch-logging-0 1/1 Running 0 69m 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>104 k8s-slave1
<span class="token comment"># \u7136\u540E\u901A\u8FC7curl\u547D\u4EE4\u8BBF\u95EE\u4E00\u4E0B\u670D\u52A1\uFF0C\u9A8C\u8BC1es\u662F\u5426\u90E8\u7F72\u6210\u529F</span>
$ kubectl <span class="token operator">-</span>n logging get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
elasticsearch ClusterIP 10<span class="token punctuation">.</span>109<span class="token punctuation">.</span>174<span class="token punctuation">.</span>58 &lt;none&gt; 9200/TCP 71m
$ curl 10<span class="token punctuation">.</span>109<span class="token punctuation">.</span>174<span class="token punctuation">.</span>58:9200
<span class="token punctuation">{</span>
<span class="token string">&quot;name&quot;</span> : <span class="token string">&quot;elasticsearch-logging-0&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;cluster_name&quot;</span> : <span class="token string">&quot;docker-cluster&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;cluster_uuid&quot;</span> : <span class="token string">&quot;uic8xOyNSlGwvoY9DIBT1g&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;version&quot;</span> : <span class="token punctuation">{</span>
<span class="token string">&quot;number&quot;</span> : <span class="token string">&quot;7.4.2&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;build_flavor&quot;</span> : <span class="token string">&quot;default&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;build_type&quot;</span> : <span class="token string">&quot;docker&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;build_hash&quot;</span> : <span class="token string">&quot;2f90bbf7b93631e52bafb59b3b049cb44ec25e96&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;build_date&quot;</span> : <span class="token string">&quot;2019-10-28T20:40:44.881551Z&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;build_snapshot&quot;</span> : false<span class="token punctuation">,</span>
<span class="token string">&quot;lucene_version&quot;</span> : <span class="token string">&quot;8.2.0&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;minimum_wire_compatibility_version&quot;</span> : <span class="token string">&quot;6.8.0&quot;</span><span class="token punctuation">,</span>
<span class="token string">&quot;minimum_index_compatibility_version&quot;</span> : <span class="token string">&quot;6.0.0-beta1&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token string">&quot;tagline&quot;</span> : <span class="token string">&quot;You Know, for Search&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u90E8\u7F72kibana" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72kibana" aria-hidden="true">#</a> \u90E8\u7F72kibana</h5><h6 id="\u90E8\u7F72\u5206\u6790-1" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72\u5206\u6790-1" aria-hidden="true">#</a> \u90E8\u7F72\u5206\u6790</h6>`,44),Nn={start:"2"},Rn=n("li",null,"kibana\u9700\u8981\u66B4\u6F0Fweb\u9875\u9762\u7ED9\u524D\u7AEF\u4F7F\u7528\uFF0C\u56E0\u6B64\u4F7F\u7528ingress\u914D\u7F6E\u57DF\u540D\u6765\u5B9E\u73B0\u5BF9kibana\u7684\u8BBF\u95EE",-1),An=n("li",null,"kibana\u4E3A\u65E0\u72B6\u6001\u5E94\u7528\uFF0C\u76F4\u63A5\u4F7F\u7528Deployment\u6765\u542F\u52A8",-1),Cn=s("kibana\u9700\u8981\u8BBF\u95EEes\uFF0C\u76F4\u63A5\u5229\u7528k8s\u670D\u52A1\u53D1\u73B0\u8BBF\u95EE\u6B64\u5730\u5740\u5373\u53EF\uFF0C"),zn={href:"http://elasticsearch:9200",target:"_blank",rel:"noopener noreferrer"},Sn=s("http://elasticsearch:9200"),In=t(`<h6 id="\u90E8\u7F72\u5E76\u9A8C\u8BC1-1" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72\u5E76\u9A8C\u8BC1-1" aria-hidden="true">#</a> \u90E8\u7F72\u5E76\u9A8C\u8BC1</h6><p>\u8D44\u6E90\u6587\u4EF6 <code>efk/kibana.yaml</code></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">template</span><span class="token punctuation">:</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/kibana/kibana<span class="token punctuation">:</span>7.4.2
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token key atrule">limits</span><span class="token punctuation">:</span>
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 1000m
<span class="token key atrule">requests</span><span class="token punctuation">:</span>
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ELASTICSEARCH_URL
<span class="token key atrule">value</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//elasticsearch<span class="token punctuation">:</span><span class="token number">9200</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">5601</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5601</span>
<span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
<span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">5601</span>
<span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> kibana
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> kibana.devops.cn
<span class="token key atrule">http</span><span class="token punctuation">:</span>
<span class="token key atrule">paths</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
<span class="token key atrule">backend</span><span class="token punctuation">:</span>
<span class="token key atrule">serviceName</span><span class="token punctuation">:</span> kibana
<span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">5601</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f kibana<span class="token punctuation">.</span>yaml
deployment<span class="token punctuation">.</span>apps/kibana created
service/kibana created
ingress/kibana created

<span class="token comment"># \u7136\u540E\u67E5\u770Bpod\uFF0C\u7B49\u5F85\u72B6\u6001\u53D8\u6210running</span>
$ kubectl <span class="token operator">-</span>n logging get po
NAME READY STATUS RESTARTS AGE
elasticsearch-logging-0 1/1 Running 0 88m
kibana-944c57766-ftlcw 1/1 Running 0 15m

<span class="token comment">## \u914D\u7F6E\u57DF\u540D\u89E3\u6790 kibana.devops.cn\uFF0C\u5E76\u8BBF\u95EE\u670D\u52A1\u8FDB\u884C\u9A8C\u8BC1\uFF0C\u82E5\u53EF\u4EE5\u8BBF\u95EE\uFF0C\u8BF4\u660E\u8FDE\u63A5es\u6210\u529F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u90E8\u7F72fluentd" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72fluentd" aria-hidden="true">#</a> \u90E8\u7F72fluentd</h5><h6 id="\u90E8\u7F72\u5206\u6790-2" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72\u5206\u6790-2" aria-hidden="true">#</a> \u90E8\u7F72\u5206\u6790</h6><ol><li>fluentd\u4E3A\u65E5\u5FD7\u91C7\u96C6\u670D\u52A1\uFF0Ckubernetes\u96C6\u7FA4\u7684\u6BCF\u4E2A\u4E1A\u52A1\u8282\u70B9\u90FD\u6709\u65E5\u5FD7\u4EA7\u751F\uFF0C\u56E0\u6B64\u9700\u8981\u4F7F\u7528daemonset\u7684\u6A21\u5F0F\u8FDB\u884C\u90E8\u7F72</li><li>\u4E3A\u8FDB\u4E00\u6B65\u63A7\u5236\u8D44\u6E90\uFF0C\u4F1A\u4E3Adaemonset\u6307\u5B9A\u4E00\u4E2A\u9009\u62E9\u8868\u60C5\uFF0Cfluentd=true\u6765\u505A\u8FDB\u4E00\u6B65\u8FC7\u6EE4\uFF0C\u53EA\u6709\u5E26\u6709\u6B64\u6807\u7B7E\u7684\u8282\u70B9\u624D\u4F1A\u90E8\u7F72fluentd</li><li>\u65E5\u5FD7\u91C7\u96C6\uFF0C\u9700\u8981\u91C7\u96C6\u54EA\u4E9B\u76EE\u5F55\u4E0B\u7684\u65E5\u5FD7\uFF0C\u91C7\u96C6\u540E\u53D1\u9001\u5230es\u7AEF\uFF0C\u56E0\u6B64\u9700\u8981\u914D\u7F6E\u7684\u5185\u5BB9\u6BD4\u8F83\u591A\uFF0C\u6211\u4EEC\u9009\u62E9\u4F7F\u7528configmap\u7684\u65B9\u5F0F\u628A\u914D\u7F6E\u6587\u4EF6\u6574\u4E2A\u6302\u8F7D\u51FA\u6765</li></ol><h6 id="\u90E8\u7F72\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72\u670D\u52A1" aria-hidden="true">#</a> \u90E8\u7F72\u670D\u52A1</h6><p>\u914D\u7F6E\u6587\u4EF6\uFF0C<code>efk/fluentd-es-main.yaml</code></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">data</span><span class="token punctuation">:</span>
<span class="token key atrule">fluent.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
<span class="token comment"># This is the root config file, which only includes components of the actual configuration</span>
<span class="token comment">#</span>
<span class="token comment"># Do not collect fluentd&#39;s own logs to avoid infinite loops.</span>
&lt;match fluent.<span class="token important">**&gt;</span>
@type null
&lt;/match<span class="token punctuation">&gt;</span>

@include /fluentd/etc/config.d/<span class="token important">*.conf</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es<span class="token punctuation">-</span>config<span class="token punctuation">-</span>main
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u914D\u7F6E\u6587\u4EF6\uFF0Cfluentd-config.yaml\uFF0C\u6CE8\u610F\u70B9\uFF1A</p>`,11),Pn=n("li",null,"\u6570\u636E\u6E90source\u7684\u914D\u7F6E\uFF0Ck8s\u4F1A\u9ED8\u8BA4\u628A\u5BB9\u5668\u7684\u6807\u51C6\u548C\u9519\u8BEF\u8F93\u51FA\u65E5\u5FD7\u91CD\u5B9A\u5411\u5230\u5BBF\u4E3B\u673A\u4E2D",-1),Tn=s("\u9ED8\u8BA4\u96C6\u6210\u4E86 "),Vn={href:"https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter",target:"_blank",rel:"noopener noreferrer"},Wn=s("kubernetes_metadata_filter"),Zn=s(" \u63D2\u4EF6\uFF0C\u6765\u89E3\u6790\u65E5\u5FD7\u683C\u5F0F\uFF0C\u5F97\u5230k8s\u76F8\u5173\u7684\u5143\u6570\u636E\uFF0Craw.kubernetes"),En=n("li",null,"match\u8F93\u51FA\u5230es\u7AEF\u7684flush\u914D\u7F6E",-1),Gn=t(`<div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>config
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">data</span><span class="token punctuation">:</span>
<span class="token key atrule">system.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
&lt;system<span class="token punctuation">&gt;</span>
root_dir /tmp/fluentd<span class="token punctuation">-</span>buffers/
&lt;/system<span class="token punctuation">&gt;</span>
<span class="token key atrule">containers.input.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
&lt;source<span class="token punctuation">&gt;</span>
@id fluentd<span class="token punctuation">-</span>containers.log
@type tail
path /var/log/containers/<span class="token important">*.log</span>
pos_file /var/log/es<span class="token punctuation">-</span>containers.log.pos
time_format %Y<span class="token punctuation">-</span>%m<span class="token punctuation">-</span>%dT%H<span class="token punctuation">:</span>%M<span class="token punctuation">:</span>%S.%NZ
localtime
tag raw.kubernetes.*
format json
read_from_head true
&lt;/source<span class="token punctuation">&gt;</span>
<span class="token comment"># Detect exceptions in the log output and forward them as one log entry.</span>
&lt;match raw.kubernetes.<span class="token important">**&gt;</span>
@id raw.kubernetes
@type detect_exceptions
remove_tag_prefix raw
message log
stream stream
multiline_flush_interval 5
max_bytes 500000
max_lines 1000
&lt;/match<span class="token punctuation">&gt;</span>
<span class="token key atrule">forward.input.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
<span class="token comment"># Takes the messages sent over TCP</span>
&lt;source<span class="token punctuation">&gt;</span>
@type forward
&lt;/source<span class="token punctuation">&gt;</span>
<span class="token key atrule">output.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
<span class="token comment"># Enriches records with Kubernetes metadata</span>
&lt;filter kubernetes.<span class="token important">**&gt;</span>
@type kubernetes_metadata
&lt;/filter<span class="token punctuation">&gt;</span>
&lt;match <span class="token important">**&gt;</span>
@id elasticsearch
@type elasticsearch
@log_level info
include_tag_key true
host elasticsearch
port 9200
logstash_format true
request_timeout 30s
&lt;buffer<span class="token punctuation">&gt;</span>
@type file
path /var/log/fluentd<span class="token punctuation">-</span>buffers/kubernetes.system.buffer
flush_mode interval
retry_type exponential_backoff
flush_thread_count 2
flush_interval 5s
retry_forever
retry_max_interval 30
chunk_limit_size 2M
queue_limit_length 8
overflow_action block
&lt;/buffer<span class="token punctuation">&gt;</span>
&lt;/match<span class="token punctuation">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>daemonset\u5B9A\u4E49\u6587\u4EF6\uFF0Cfluentd.yaml\uFF0C\u6CE8\u610F\u70B9\uFF1A</p><ol><li>\u9700\u8981\u914D\u7F6Erbac\u89C4\u5219\uFF0C\u56E0\u4E3A\u9700\u8981\u8BBF\u95EEk8s api\u53BB\u6839\u636E\u65E5\u5FD7\u67E5\u8BE2\u5143\u6570\u636E</li><li>\u9700\u8981\u5C06/var/log/containers/\u76EE\u5F55\u6302\u8F7D\u5230\u5BB9\u5668\u4E2D</li><li>\u9700\u8981\u5C06fluentd\u7684configmap\u4E2D\u7684\u914D\u7F6E\u6587\u4EF6\u6302\u8F7D\u5230\u5BB9\u5668\u5185</li><li>\u60F3\u8981\u90E8\u7F72fluentd\u7684\u8282\u70B9\uFF0C\u9700\u8981\u6DFB\u52A0fluentd=true\u7684\u6807\u7B7E</li></ol><p><code>efk/fluentd.yaml</code></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">&quot;&quot;</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">&quot;namespaces&quot;</span>
<span class="token punctuation">-</span> <span class="token string">&quot;pods&quot;</span>
<span class="token key atrule">verbs</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">&quot;get&quot;</span>
<span class="token punctuation">-</span> <span class="token string">&quot;watch&quot;</span>
<span class="token punctuation">-</span> <span class="token string">&quot;list&quot;</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">template</span><span class="token punctuation">:</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> FLUENTD_ARGS
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>no<span class="token punctuation">-</span>supervisor <span class="token punctuation">-</span>q
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/fluentd<span class="token punctuation">-</span>es<span class="token punctuation">-</span>root<span class="token punctuation">:</span>v1.6.2<span class="token punctuation">-</span><span class="token number">1.0</span>
<span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token key atrule">limits</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
<span class="token key atrule">requests</span><span class="token punctuation">:</span>
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 200Mi
<span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/log
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlog
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/docker/containers
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainers
<span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /home/docker/containers
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainershome
<span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /fluentd/etc/config.d
<span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume
<span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /fluentd/etc/fluent.conf
<span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume<span class="token punctuation">-</span>main
<span class="token key atrule">subPath</span><span class="token punctuation">:</span> fluent.conf
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
<span class="token key atrule">fluentd</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
<span class="token key atrule">securityContext</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token key atrule">serviceAccount</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /var/log
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlog
<span class="token punctuation">-</span> <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /var/lib/docker/containers
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainers
<span class="token punctuation">-</span> <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /home/docker/containers
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainershome
<span class="token punctuation">-</span> <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
<span class="token key atrule">defaultMode</span><span class="token punctuation">:</span> <span class="token number">420</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>config
<span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume
<span class="token punctuation">-</span> <span class="token key atrule">configMap</span><span class="token punctuation">:</span>
<span class="token key atrule">defaultMode</span><span class="token punctuation">:</span> <span class="token number">420</span>
<span class="token key atrule">items</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> fluent.conf
<span class="token key atrule">path</span><span class="token punctuation">:</span> fluent.conf
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es<span class="token punctuation">-</span>config<span class="token punctuation">-</span>main
<span class="token key atrule">name</span><span class="token punctuation">:</span> config<span class="token punctuation">-</span>volume<span class="token punctuation">-</span>main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment">## \u7ED9slave1\u548Cslave2\u6253\u4E0A\u6807\u7B7E\uFF0C\u8FDB\u884C\u90E8\u7F72fluentd\u65E5\u5FD7\u91C7\u96C6\u670D\u52A1</span>
$ kubectl label node k8s-slave1 fluentd=true
node/k8s-slave1 labeled
$ kubectl label node k8s-slave2 fluentd=true
node/k8s-slave2 labeled

<span class="token comment"># \u521B\u5EFA\u670D\u52A1</span>
$ kubectl create <span class="token operator">-</span>f fluentd-es-config-main<span class="token punctuation">.</span>yaml
configmap/fluentd-es-config-main created
$ kubectl create <span class="token operator">-</span>f fluentd-configmap<span class="token punctuation">.</span>yaml
configmap/fluentd-config created
$ kubectl create <span class="token operator">-</span>f fluentd<span class="token punctuation">.</span>yaml
serviceaccount/fluentd-es created
clusterrole<span class="token punctuation">.</span>rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/fluentd-es created
clusterrolebinding<span class="token punctuation">.</span>rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/fluentd-es created
daemonset<span class="token punctuation">.</span>extensions/fluentd-es created

<span class="token comment">## \u7136\u540E\u67E5\u770B\u4E00\u4E0Bpod\u662F\u5426\u5DF2\u7ECF\u5728k8s-slave1\u548Ck8s-slave2\u8282\u70B9\u542F\u52A8\u6210\u529F</span>
$ kubectl <span class="token operator">-</span>n logging get po <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE
elasticsearch-logging-0 1/1 Running 0 123m
fluentd-es-246pl 1/1 Running 0 2m2s
fluentd-es-4e21w 1/1 Running 0 2m10s
kibana-944c57766-ftlcw 1/1 Running 0 50m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="efk\u529F\u80FD\u9A8C\u8BC1" tabindex="-1"><a class="header-anchor" href="#efk\u529F\u80FD\u9A8C\u8BC1" aria-hidden="true">#</a> EFK\u529F\u80FD\u9A8C\u8BC1</h5><h6 id="\u9A8C\u8BC1\u601D\u8DEF" tabindex="-1"><a class="header-anchor" href="#\u9A8C\u8BC1\u601D\u8DEF" aria-hidden="true">#</a> \u9A8C\u8BC1\u601D\u8DEF</h6><p>k8s-slave1\u548Cslave2\u4E2D\u542F\u52A8\u670D\u52A1\uFF0C\u540C\u65F6\u5F80\u6807\u51C6\u8F93\u51FA\u4E2D\u6253\u5370\u6D4B\u8BD5\u65E5\u5FD7\uFF0C\u5230kibana\u4E2D\u67E5\u770B\u662F\u5426\u53EF\u4EE5\u6536\u96C6</p><h6 id="\u521B\u5EFA\u6D4B\u8BD5\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u6D4B\u8BD5\u5BB9\u5668" aria-hidden="true">#</a> \u521B\u5EFA\u6D4B\u8BD5\u5BB9\u5668</h6><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> counter
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
<span class="token key atrule">fluentd</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> count
<span class="token key atrule">image</span><span class="token punctuation">:</span> alpine<span class="token punctuation">:</span><span class="token number">3.6</span>
<span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>/bin/sh<span class="token punctuation">,</span> <span class="token punctuation">-</span>c<span class="token punctuation">,</span>
<span class="token string">&#39;i=0; while true; do echo &quot;$i: $(date)&quot;; i=$((i+1)); sleep 1; done&#39;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl get po
NAME READY STATUS RESTARTS AGE
counter 1/1 Running 0 6s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="\u914D\u7F6Ekibana" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6Ekibana" aria-hidden="true">#</a> \u914D\u7F6Ekibana</h6><p>\u767B\u5F55kibana\u754C\u9762\uFF0C\u6309\u7167\u622A\u56FE\u7684\u987A\u5E8F\u64CD\u4F5C\uFF1A</p><p>\u4E5F\u53EF\u4EE5\u901A\u8FC7\u5176\u4ED6\u5143\u6570\u636E\u6765\u8FC7\u6EE4\u65E5\u5FD7\u6570\u636E\uFF0C\u6BD4\u5982\u53EF\u4EE5\u5355\u51FB\u4EFB\u4F55\u65E5\u5FD7\u6761\u76EE\u4EE5\u67E5\u770B\u5176\u4ED6\u5143\u6570\u636E\uFF0C\u5982\u5BB9\u5668\u540D\u79F0\uFF0CKubernetes \u8282\u70B9\uFF0C\u547D\u540D\u7A7A\u95F4\u7B49\uFF0C\u6BD4\u5982kubernetes.pod_name : counter</p>`,15),jn=s("\u5230\u8FD9\u91CC\uFF0C\u6211\u4EEC\u5C31\u5728 Kubernetes \u96C6\u7FA4\u4E0A\u6210\u529F\u90E8\u7F72\u4E86 EFK \uFF0C\u8981\u4E86\u89E3\u5982\u4F55\u4F7F\u7528 Kibana \u8FDB\u884C\u65E5\u5FD7\u6570\u636E\u5206\u6790\uFF0C\u53EF\u4EE5\u53C2\u8003 Kibana \u7528\u6237\u6307\u5357\u6587\u6863\uFF1A"),Yn={href:"https://www.elastic.co/guide/en/kibana/current/index.html",target:"_blank",rel:"noopener noreferrer"},Ln=s("https://www.elastic.co/guide/en/kibana/current/index.html");function Mn(Jn,On){const a=p("ExternalLinkIcon");return i(),o("div",null,[u,n("ul",null,[n("li",null,[r,n("a",d,[k,e(a)]),v]),m,b]),h,n("p",null,[g,n("a",y,[f,e(a)])]),_,n("p",null,[q,x,w,n("a",N,[R,e(a)]),A]),n("table",null,[C,n("tbody",null,[n("tr",null,[z,S,n("td",I,[P,n("a",T,[V,e(a)]),W])]),Z,n("tr",null,[E,G,n("td",j,[Y,n("a",L,[M,e(a)]),J,n("a",O,[$,e(a)]),F])]),n("tr",null,[X,B,n("td",U,[D,K,H,n("a",Q,[nn,e(a)]),sn,n("a",an,[en,e(a)]),tn,ln,on,pn,cn])]),n("tr",null,[un,rn,n("td",dn,[kn,n("a",vn,[mn,e(a)]),bn])])])]),n("p",null,[hn,n("a",gn,[yn,e(a)]),fn,n("a",_n,[qn,e(a)]),xn]),wn,n("ol",Nn,[Rn,An,n("li",null,[Cn,n("a",zn,[Sn,e(a)])])]),In,n("ol",null,[Pn,n("li",null,[Tn,n("a",Vn,[Wn,e(a)]),Zn]),En]),Gn,n("p",null,[jn,n("a",Yn,[Ln,e(a)])])])}const Xn=l(c,[["render",Mn],["__file","k8s2.html.vue"]]);export{Xn as default};
