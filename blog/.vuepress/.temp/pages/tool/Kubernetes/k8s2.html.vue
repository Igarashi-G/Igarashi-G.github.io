<template><div><h5 id="kubernetes认证与授权-录屏" tabindex="-1"><a class="header-anchor" href="#kubernetes认证与授权-录屏" aria-hidden="true">#</a> Kubernetes认证与授权 录屏！！！</h5>
<h6 id="apiservice安全控制" tabindex="-1"><a class="header-anchor" href="#apiservice安全控制" aria-hidden="true">#</a> APIService安全控制</h6>
<ul>
<li>Authentication：身份认证</li>
</ul>
<ol>
<li>这个环节它面对的输入是整个<code v-pre>http request</code>，负责对来自client的请求进行身份校验，支持的方法包括:</li>
</ol>
<ul>
<li>
<p>client证书验证（https双向验证）</p>
</li>
<li>
<p><code v-pre>basic auth</code></p>
</li>
<li>
<p>普通token</p>
</li>
<li>
<p><code v-pre>jwt token</code>(用于serviceaccount)</p>
</li>
</ul>
<ol start="2">
<li>
<p>APIServer启动时，可以指定一种Authentication方法，也可以指定多种方法。如果指定了多种方法，那么APIServer将会逐个使用这些方法对客户端请求进行验证， 只要请求数据通过其中一种方法的验证，APIServer就会认为Authentication成功；</p>
</li>
<li>
<p>使用kubeadm引导启动的k8s集群的apiserver初始配置中，默认支持<code v-pre>client证书</code>验证和<code v-pre>serviceaccount</code>两种身份验证方式。 证书认证通过设置<code v-pre>--client-ca-file</code>根证书以及<code v-pre>--tls-cert-file</code>和<code v-pre>--tls-private-key-file</code>来开启。</p>
</li>
<li>
<p>在这个环节，apiserver会通过client证书或 <code v-pre>http header</code>中的字段(比如serviceaccount的<code v-pre>jwt token</code>)来识别出请求的<code v-pre>用户身份</code>，包括”user”、”group”等，这些信息将在后面的<code v-pre>authorization</code>环节用到。</p>
</li>
</ol>
<ul>
<li>Authorization：鉴权，你可以访问哪些资源</li>
</ul>
<ol>
<li>
<p>这个环节面对的输入是<code v-pre>http request context</code>中的各种属性，包括：<code v-pre>user</code>、<code v-pre>group</code>、<code v-pre>request path</code>（比如：<code v-pre>/api/v1</code>、<code v-pre>/healthz</code>、<code v-pre>/version</code>等）、 <code v-pre>request verb</code>(比如：<code v-pre>get</code>、<code v-pre>list</code>、<code v-pre>create</code>等)。</p>
</li>
<li>
<p>APIServer会将这些属性值与事先配置好的访问策略(<code v-pre>access policy</code>）相比较。APIServer支持多种<code v-pre>authorization mode</code>，包括<code v-pre>Node、RBAC、Webhook</code>等。</p>
</li>
<li>
<p>APIServer启动时，可以指定一种<code v-pre>authorization mode</code>，也可以指定多种<code v-pre>authorization mode</code>，如果是后者，只要Request通过了其中一种mode的授权， 那么该环节的最终结果就是授权成功。在较新版本kubeadm引导启动的k8s集群的apiserver初始配置中，<code v-pre>authorization-mode</code>的默认配置是<code v-pre>”Node,RBAC”</code>。</p>
</li>
</ol>
<ul>
<li>Admission Control：<a href="http://docs.kubernetes.org.cn/144.html" target="_blank" rel="noopener noreferrer">准入控制<ExternalLinkIcon/></a>，一个控制链(层层关卡)，偏集群安全控制、管理方面。为什么说是安全相关的机制？</li>
<li>以NamespaceLifecycle为例， 该插件确保处于Termination状态的Namespace不再接收新的对象创建请求，并拒绝请求不存在的Namespace。该插件还可以防止删除系统保留的Namespace:default，kube-system，kube-public。</li>
<li>NodeRestriction， 此插件限制kubelet修改Node和Pod对象，这样的kubelets只允许修改绑定到Node的Pod API对象，以后版本可能会增加额外的限制 。</li>
</ul>
<p>为什么我们执行命令kubectl命令，可以直接管理k8s集群资源？</p>
<h6 id="kubectl的认证授权" tabindex="-1"><a class="header-anchor" href="#kubectl的认证授权" aria-hidden="true">#</a> kubectl的认证授权</h6>
<p>kubectl的日志调试级别：</p>
<table>
<thead>
<tr>
<th style="text-align:left">信息</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">v=0</td>
<td style="text-align:left">通常，这对操作者来说总是可见的。</td>
</tr>
<tr>
<td style="text-align:left">v=1</td>
<td style="text-align:left">当您不想要很详细的输出时，这个是一个合理的默认日志级别。</td>
</tr>
<tr>
<td style="text-align:left">v=2</td>
<td style="text-align:left">有关服务和重要日志消息的有用稳定状态信息，这些信息可能与系统中的重大更改相关。这是大多数系统推荐的默认日志级别。</td>
</tr>
<tr>
<td style="text-align:left">v=3</td>
<td style="text-align:left">关于更改的扩展信息。</td>
</tr>
<tr>
<td style="text-align:left">v=4</td>
<td style="text-align:left">调试级别信息。</td>
</tr>
<tr>
<td style="text-align:left">v=6</td>
<td style="text-align:left">显示请求资源。</td>
</tr>
<tr>
<td style="text-align:left">v=7</td>
<td style="text-align:left">显示 HTTP 请求头。</td>
</tr>
<tr>
<td style="text-align:left">v=8</td>
<td style="text-align:left">显示 HTTP 请求内容。</td>
</tr>
<tr>
<td style="text-align:left">v=9</td>
<td style="text-align:left">显示 HTTP 请求内容，并且不截断内容。</td>
</tr>
</tbody>
</table>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl get nodes <span class="token operator">-</span>v=7
I0329 20:20:08<span class="token punctuation">.</span>633065 3979 loader<span class="token punctuation">.</span>go:359<span class="token punctuation">]</span> Config loaded <span class="token keyword">from</span> file <span class="token operator">/</span>root/<span class="token punctuation">.</span>kube/config
I0329 20:20:08<span class="token punctuation">.</span>633797 3979 round_trippers<span class="token punctuation">.</span>go:416<span class="token punctuation">]</span> GET https:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>128:6443/api/v1/nodes?limit=500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>kubeadm init</code>启动完master节点后，会默认输出类似下面的提示内容：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">..</span>. <span class="token punctuation">..</span>.
Your Kubernetes master has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
<span class="token punctuation">..</span>. <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些信息是在告知我们如何配置<code v-pre>kubeconfig</code>文件。按照上述命令配置后，master节点上的<code v-pre>kubectl</code>就可以直接使用<code v-pre>$HOME/.kube/config</code>的信息访问<code v-pre>k8s cluster</code>了。 并且，通过这种配置方式，<code v-pre>kubectl</code>也拥有了整个集群的管理员(root)权限。</p>
<p>很多K8s初学者在这里都会有疑问：</p>
<ul>
<li>当<code v-pre>kubectl</code>使用这种<code v-pre>kubeconfig</code>方式访问集群时，<code v-pre>Kubernetes</code>的<code v-pre>kube-apiserver</code>是如何对来自<code v-pre>kubectl</code>的访问进行身份验证(<code v-pre>authentication</code>)和授权(<code v-pre>authorization</code>)的呢？</li>
<li>为什么来自<code v-pre>kubectl</code>的请求拥有最高的管理员权限呢？</li>
</ul>
<p>查看<code v-pre>/root/.kube/config</code>文件：</p>
<p>前面提到过apiserver的authentication支持通过<code v-pre>tls client certificate、basic auth、token</code>等方式对客户端发起的请求进行身份校验， 从kubeconfig信息来看，kubectl显然在请求中使用了<code v-pre>tls client certificate</code>的方式，即客户端的证书。</p>
<p>证书base64解码：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ <span class="token function">echo</span> xxxxxxxxxxxxxx <span class="token punctuation">|</span>base64 <span class="token operator">-</span>d > kubectl<span class="token punctuation">.</span>crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>说明在认证阶段，<code v-pre>apiserver</code>会首先使用<code v-pre>--client-ca-file</code>配置的CA证书去验证kubectl提供的证书的有效性,基本的方式 ：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ openssl verify <span class="token operator">-</span>CAfile <span class="token operator">/</span>etc/kubernetes/pki/ca<span class="token punctuation">.</span>crt kubectl<span class="token punctuation">.</span>crt
kubectl<span class="token punctuation">.</span>crt: OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>除了认证身份，还会取出必要的信息供授权阶段使用，文本形式查看证书内容：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ openssl x509 <span class="token operator">-in</span> kubectl<span class="token punctuation">.</span>crt <span class="token operator">-</span>text
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>认证通过后，提取出签发证书时指定的CN(Common Name),<code v-pre>kubernetes-admin</code>，作为请求的用户名 (User Name), 从证书中提取O(Organization)字段作为请求用户所属的组 (Group)，<code v-pre>group = system:masters</code>，然后传递给后面的授权模块。</p>
<p>kubeadm在init初始引导集群启动过程中，创建了许多<code v-pre>default</code>的<code v-pre>role、clusterrole、rolebinding</code>和<code v-pre>clusterrolebinding</code>， 在k8s有关RBAC的官方文档中，我们看到下面一些<code v-pre>default clusterrole</code>列表:</p>
<p>其中第一个cluster-admin这个cluster role binding绑定了system:masters group，这和authentication环节传递过来的身份信息不谋而合。 沿着system:masters group对应的cluster-admin clusterrolebinding“追查”下去，真相就会浮出水面。</p>
<p>我们查看一下这一binding：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ kubectl describe clusterrolebinding cluster<span class="token punctuation">-</span>admin
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到在kube-system名字空间中，一个名为cluster-admin的clusterrolebinding将cluster-admin cluster role与system:masters Group绑定到了一起， 赋予了所有归属于system:masters Group中用户cluster-admin角色所拥有的权限。</p>
<p>我们再来查看一下cluster-admin这个role的具体权限信息：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl describe clusterrole cluster-admin
Name: cluster-admin
Labels: kubernetes<span class="token punctuation">.</span>io/bootstrapping=rbac-defaults
Annotations: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/autoupdate: true
PolicyRule:
Resources Non-Resource URLs Resource Names Verbs
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
<span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非资源类，如查看集群健康状态。</p>
<h6 id="rbac" tabindex="-1"><a class="header-anchor" href="#rbac" aria-hidden="true">#</a> RBAC</h6>
<p>Role-Based Access Control，基于角色的访问控制， apiserver启动参数添加--authorization-mode=RBAC 来启用RBAC认证模式，kubeadm安装的集群默认已开启。<a href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/" target="_blank" rel="noopener noreferrer">官方介绍<ExternalLinkIcon/></a></p>
<p>查看开启：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment"># master节点查看apiserver进程</span>
$ <span class="token function">ps</span> aux <span class="token punctuation">|</span>grep apiserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>RBAC模式引入了4个资源：</p>
<ul>
<li>Role，角色</li>
</ul>
<p>一个Role只能授权访问单个namespace</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 示例定义一个名为pod-reader的角色，该角色具有读取default这个命名空间下的pods的权限</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span> <span class="token comment"># "" indicates the core API group</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"pods"</span><span class="token punctuation">]</span>
<span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">]</span>

<span class="token comment">## apiGroups: "","apps", "autoscaling", "batch", kubectl api-versions</span>
<span class="token comment">## resources: "services", "pods","deployments"... kubectl api-resources</span>
<span class="token comment">## verbs: "get", "list", "watch", "create", "update", "patch", "delete", "exec"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>ClusterRole</li>
</ul>
<p>一个ClusterRole能够授予和Role一样的权限，但是它是集群范围内的。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 定义一个集群角色，名为secret-reader，该角色可以读取所有的namespace中的secret资源</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token comment"># "namespace" omitted since ClusterRoles are not namespaced</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"secrets"</span><span class="token punctuation">]</span>
<span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Rolebinding</li>
</ul>
<p>将role中定义的权限分配给用户和用户组。RoleBinding包含主题（users,groups,或service accounts）和授予角色的引用。对于namespace内的授权使用RoleBinding，集群范围内使用ClusterRoleBinding。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 定义一个角色绑定，将pod-reader这个role的权限授予给jane这个User，使得jane可以在读取default这个命名空间下的所有的pod数据</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>pods
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User <span class="token comment">#这里可以是User,Group,ServiceAccount</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> jane
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role <span class="token comment">#这里可以是Role或者ClusterRole,若是ClusterRole，则权限也仅限于rolebinding的内部</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader <span class="token comment"># match the name of the Role or ClusterRole you wish to bind to</span>
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>注意：rolebinding既可以绑定role，也可以绑定clusterrole，当绑定clusterrole的时候，subject的权限也会被限定于rolebinding定义的namespace内部，若想跨namespace，需要使用clusterrolebinding</em></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 定义一个角色绑定，将dave这个用户和secret-reader这个集群角色绑定，虽然secret-reader是集群角色，但是因为是使用rolebinding绑定的，因此dave的权限也会被限制在development这个命名空间内</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token comment"># This role binding allows "dave" to read secrets in the "development" namespace.</span>
<span class="token comment"># You need to already have a ClusterRole named "secret-reader".</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>secrets
<span class="token comment">#</span>
<span class="token comment"># The namespace of the RoleBinding determines where the permissions are granted.</span>
<span class="token comment"># This only grants permissions within the "development" namespace.</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑一个场景： 如果集群中有多个namespace分配给不同的管理员，每个namespace的权限是一样的，就可以只定义一个clusterrole，然后通过rolebinding将不同的namespace绑定到管理员身上，否则就需要每个namespace定义一个Role，然后做一次rolebinding。</p>
<ul>
<li>ClusterRolebingding</li>
</ul>
<p>允许跨namespace进行授权</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token comment"># This cluster role binding allows anyone in the "manager" group to read secrets in any namespace.</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="kubelet的认证授权" tabindex="-1"><a class="header-anchor" href="#kubelet的认证授权" aria-hidden="true">#</a> kubelet的认证授权</h6>
<p>查看kubelet进程</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ systemctl status kubelet
● kubelet<span class="token punctuation">.</span>service <span class="token operator">-</span> kubelet: The Kubernetes Node Agent
Loaded: loaded <span class="token punctuation">(</span><span class="token operator">/</span>etc/systemd/system/kubelet<span class="token punctuation">.</span>service<span class="token punctuation">;</span> enabled<span class="token punctuation">;</span> vendor preset: disabled<span class="token punctuation">)</span>
Drop-In: <span class="token operator">/</span>etc/systemd/system/kubelet<span class="token punctuation">.</span>service<span class="token punctuation">.</span>d
└─10-kubeadm<span class="token punctuation">.</span>conf
Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Wed 2020-04-01 02:34:13 CST<span class="token punctuation">;</span> 1 day 14h ago
Docs: https:<span class="token operator">/</span><span class="token operator">/</span>kubernetes<span class="token punctuation">.</span>io/docs/
Main PID: 851 <span class="token punctuation">(</span>kubelet<span class="token punctuation">)</span>
Tasks: 21
Memory: 127<span class="token punctuation">.</span>1M
CGroup: <span class="token operator">/</span>system<span class="token punctuation">.</span>slice/kubelet<span class="token punctuation">.</span>service
└─851 <span class="token operator">/</span>usr/bin/kubelet <span class="token operator">--</span>bootstrap-kubeconfig=<span class="token operator">/</span>etc/kubernetes/bootstrap-kubelet<span class="token punctuation">.</span>conf <span class="token operator">--</span>kubeconfig=<span class="token operator">/</span>etc/kubernetes/kubelet<span class="token punctuation">.</span>conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看<code v-pre>/etc/kubernetes/kubelet.conf</code>，解析证书：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ <span class="token function">echo</span> xxxxx <span class="token punctuation">|</span>base64 <span class="token operator">-</span>d >kubelet<span class="token punctuation">.</span>crt
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>得到我们期望的内容：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Subject: <span class="token assign-left variable">O</span><span class="token operator">=</span>system:nodes, <span class="token assign-left variable">CN</span><span class="token operator">=</span>system:node:k8s-master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们知道，k8s会把O作为Group来进行请求，因此如果有权限绑定给这个组，肯定在clusterrolebinding的定义中可以找得到。因此尝试去找一下绑定了system:nodes组的clusterrolebinding</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl get clusterrolebinding<span class="token punctuation">|</span>awk <span class="token string">'NR>1{print $1}'</span><span class="token punctuation">|</span>xargs kubectl get clusterrolebinding <span class="token operator">-</span>oyaml<span class="token punctuation">|</span>grep <span class="token operator">-</span>n10 system:nodes
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
109- creationTimestamp: <span class="token string">"2020-02-10T07:34:02Z"</span>
110- name: kubeadm:node-proxier
111- resourceVersion: <span class="token string">"213"</span>
112- selfLink: <span class="token operator">/</span>apis/rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1/clusterrolebindings/kubeadm%3Anode-proxier

$ kubectl describe clusterrole system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
Name: system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
Labels: kubernetes<span class="token punctuation">.</span>io/bootstrapping=rbac-defaults
Annotations: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/autoupdate: true
PolicyRule:
Resources Non-Resource URLs Resource Names Verbs
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
certificatesigningrequests<span class="token punctuation">.</span>certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/selfnodeclient <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token namespace">[create]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结局有点意外，除了<code v-pre>system:certificates.k8s.io:certificatesigningrequests:selfnodeclient</code>外，没有找到system相关的rolebindings，显然和我们的理解不一样。 尝试去找<a href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/" target="_blank" rel="noopener noreferrer">资料<ExternalLinkIcon/></a>，发现了这么一段 :</p>
<table>
<thead>
<tr>
<th style="text-align:left">Default ClusterRole</th>
<th style="text-align:left">Default ClusterRoleBinding</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">system:kube-scheduler</td>
<td style="text-align:left">system:kube-scheduler user</td>
<td style="text-align:left">Allows access to the resources required by the <a href="https://kubernetes.io/docs/reference/generated/kube-scheduler/" target="_blank" rel="noopener noreferrer">scheduler<ExternalLinkIcon/></a>component.</td>
</tr>
<tr>
<td style="text-align:left">system:volume-scheduler</td>
<td style="text-align:left">system:kube-scheduler user</td>
<td style="text-align:left">Allows access to the volume resources required by the kube-scheduler component.</td>
</tr>
<tr>
<td style="text-align:left">system:kube-controller-manager</td>
<td style="text-align:left">system:kube-controller-manager user</td>
<td style="text-align:left">Allows access to the resources required by the <a href="https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/" target="_blank" rel="noopener noreferrer">controller manager<ExternalLinkIcon/></a> component. The permissions required by individual controllers are detailed in the <a href="https://kubernetes.io/docs/reference/access-authn-authz/rbac/#controller-roles" target="_blank" rel="noopener noreferrer">controller roles<ExternalLinkIcon/></a>.</td>
</tr>
<tr>
<td style="text-align:left">system:node</td>
<td style="text-align:left">None</td>
<td style="text-align:left">Allows access to resources required by the kubelet, <strong>including read access to all secrets, and write access to all pod status objects</strong>. You should use the <a href="https://kubernetes.io/docs/reference/access-authn-authz/node/" target="_blank" rel="noopener noreferrer">Node authorizer<ExternalLinkIcon/></a> and <a href="https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction" target="_blank" rel="noopener noreferrer">NodeRestriction admission plugin<ExternalLinkIcon/></a> instead of the <code v-pre>system:node</code> role, and allow granting API access to kubelets based on the Pods scheduled to run on them. The <code v-pre>system:node</code> role only exists for compatibility with Kubernetes clusters upgraded from versions prior to v1.8.</td>
</tr>
<tr>
<td style="text-align:left">system:node-proxier</td>
<td style="text-align:left">system:kube-proxy user</td>
<td style="text-align:left">Allows access to the resources required by the <a href="https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/" target="_blank" rel="noopener noreferrer">kube-proxy<ExternalLinkIcon/></a>component.</td>
</tr>
</tbody>
</table>
<p>大致意思是说：之前会定义system:node这个角色，目的是为了kubelet可以访问到必要的资源，包括所有secret的读权限及更新pod状态的写权限。如果1.8版本后，是建议使用 <a href="https://kubernetes.io/docs/reference/access-authn-authz/node/" target="_blank" rel="noopener noreferrer">Node authorizer<ExternalLinkIcon/></a> and <a href="https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction" target="_blank" rel="noopener noreferrer">NodeRestriction admission plugin<ExternalLinkIcon/></a> 来代替这个角色的。</p>
<p>我们目前使用1.16，查看一下授权策略：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ <span class="token function">ps</span> axu<span class="token punctuation">|</span>grep apiserver
kube-apiserver <span class="token operator">--</span>authorization-mode=Node<span class="token punctuation">,</span>RBAC <span class="token operator">--</span><span class="token function">enable-admission</span><span class="token operator">-</span>plugins=NodeRestriction
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看一下官网对Node authorizer的介绍：</p>
<p><em>Node authorization is a special-purpose authorization mode that specifically authorizes API requests made by kubelets.</em></p>
<p><em>In future releases, the node authorizer may add or remove permissions to ensure kubelets have the minimal set of permissions required to operate correctly.</em></p>
<p><em>In order to be authorized by the Node authorizer, kubelets must use a credential that identifies them as being in the <code v-pre>system:nodes</code> group, with a username of <code v-pre>system:node:&lt;nodeName&gt;</code></em></p>
<h6 id="service-account" tabindex="-1"><a class="header-anchor" href="#service-account" aria-hidden="true">#</a> Service Account</h6>
<p>前面说，认证可以通过证书，也可以通过使用ServiceAccount（服务账户）的方式来做认证。大多数时候，我们在基于k8s做二次开发时都是选择通过serviceaccount的方式。我们之前访问dashboard的时候，是如何做的？</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">## 新建一个名为admin的serviceaccount，并且把名为cluster-admin的这个集群角色的权限授予新建的serviceaccount</span>
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
<span class="token key atrule">rbac.authorization.kubernetes.io/autoupdate</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">name</span><span class="token punctuation">:</span> admin
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们查看一下：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kubernetes-dashboard get sa admin <span class="token operator">-</span>o yaml
apiVersion: v1
kind: ServiceAccount
metadata:
creationTimestamp: <span class="token string">"2020-04-01T11:59:21Z"</span>
name: admin
namespace: kubernetes-dashboard
resourceVersion: <span class="token string">"1988878"</span>
selfLink: <span class="token operator">/</span>api/v1/namespaces/kubernetes-dashboard/serviceaccounts/admin
uid: 639ecc3e-74d9-11ea-a59b-000c29dfd73f
secrets:
<span class="token operator">-</span> name: admin-token-lfsrf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意到serviceaccount上默认绑定了一个名为admin-token-lfsrf的secret，我们查看一下secret</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kubernetes-dashboard describe secret admin-token-lfsrf
Name: admin-token-lfsrf
Namespace: kubernetes-dashboard
Labels: &lt;none>
Annotations: kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>name: admin
kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>uid: 639ecc3e-74d9-11ea-a59b-000c29dfd73f

<span class="token function">Type</span>: kubernetes<span class="token punctuation">.</span>io/service-account-token
<span class="token keyword">Data</span>
====
ca<span class="token punctuation">.</span>crt: 1025 bytes
namespace: 4 bytes
token: eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9<span class="token punctuation">.</span>eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZW1vIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFkbWluLXRva2VuLWxmc3JmIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNjM5ZWNjM2UtNzRkOS0xMWVhLWE1OWItMDAwYzI5ZGZkNzNmIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlbW86YWRtaW4ifQ<span class="token punctuation">.</span>ffGCU4L5LxTsMx3NcNixpjT6nLBi-pmstb4I-W61nLOzNaMmYSEIwAaugKMzNR-2VwM14WbuG04dOeO67niJeP6n8-ALkl-vineoYCsUjrzJ09qpM3TNUPatHFqyjcqJ87h4VKZEqk2qCCmLxB6AGbEHpVFkoge40vHs56cIymFGZLe53JZkhu3pwYuS4jpXytV30Ad-HwmQDUu_Xqcifni6tDYPCfKz2CZlcOfwqHeGIHJjDGVBKqhEeo8PhStoofBU6Y4OjObP7HGuTY-Foo4QindNnpp0QU6vSb7kiOiQ4twpayybH8PTf73dtdFt46UF6mGjskWgevgolvmO8A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开发的时候如何去调用k8s的api:</p>
<ol>
<li>curl演示</li>
</ol>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ curl <span class="token operator">-</span>k <span class="token operator">-</span>H <span class="token string">"Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZW1vIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFkbWluLXRva2VuLWxmc3JmIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNjM5ZWNjM2UtNzRkOS0xMWVhLWE1OWItMDAwYzI5ZGZkNzNmIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlbW86YWRtaW4ifQ.ffGCU4L5LxTsMx3NcNixpjT6nLBi-pmstb4I-W61nLOzNaMmYSEIwAaugKMzNR-2VwM14WbuG04dOeO67niJeP6n8-ALkl-vineoYCsUjrzJ09qpM3TNUPatHFqyjcqJ87h4VKZEqk2qCCmLxB6AGbEHpVFkoge40vHs56cIymFGZLe53JZkhu3pwYuS4jpXytV30Ad-HwmQDUu_Xqcifni6tDYPCfKz2CZlcOfwqHeGIHJjDGVBKqhEeo8PhStoofBU6Y4OjObP7HGuTY-Foo4QindNnpp0QU6vSb7kiOiQ4twpayybH8PTf73dtdFt46UF6mGjskWgevgolvmO8A"</span> https:<span class="token operator">/</span><span class="token operator">/</span>62<span class="token punctuation">.</span>234<span class="token punctuation">.</span>214<span class="token punctuation">.</span>206:6443/api/v1/namespaces/demo/pods?limit=500
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>postman</li>
</ol>
<h4 id="查看etcd数据" tabindex="-1"><a class="header-anchor" href="#查看etcd数据" aria-hidden="true">#</a> 查看etcd数据</h4>
<p>拷贝etcdctl命令行工具：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ docker exec <span class="token operator">-</span>ti etcd_container which etcdctl
$ docker <span class="token function">cp</span> etcd_container:<span class="token operator">/</span>usr/local/bin/etcdctl <span class="token operator">/</span>usr/bin/etcdctl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看所有key值：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ ETCDCTL_API=3 etcdctl <span class="token operator">--</span>endpoints=https:<span class="token operator">/</span><span class="token operator">/</span><span class="token punctuation">[</span>127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1<span class="token punctuation">]</span>:2379 <span class="token operator">--</span>cacert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/ca<span class="token punctuation">.</span>crt <span class="token operator">--</span>cert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>crt <span class="token operator">--</span>key=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>key get <span class="token operator">/</span> <span class="token operator">--</span>prefix <span class="token operator">--</span>keys-only
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看具体的key对应的数据：</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ ETCDCTL_API=3 etcdctl <span class="token operator">--</span>endpoints=https:<span class="token operator">/</span><span class="token operator">/</span><span class="token punctuation">[</span>127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1<span class="token punctuation">]</span>:2379 <span class="token operator">--</span>cacert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/ca<span class="token punctuation">.</span>crt <span class="token operator">--</span>cert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>crt <span class="token operator">--</span>key=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>key get <span class="token operator">/</span>registry/pods/jenkins/sonar-postgres-7fc5d748b6-gtmsb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="基于efk实现kubernetes集群的日志平台-扩展-录屏" tabindex="-1"><a class="header-anchor" href="#基于efk实现kubernetes集群的日志平台-扩展-录屏" aria-hidden="true">#</a> 基于EFK实现kubernetes集群的日志平台（扩展） 录屏！！！</h4>
<h5 id="efk介绍" tabindex="-1"><a class="header-anchor" href="#efk介绍" aria-hidden="true">#</a> EFK介绍</h5>
<p>EFK工作示意</p>
<ul>
<li>Elasticsearch</li>
</ul>
<p>一个开源的分布式、Restful 风格的搜索和数据分析引擎，它的底层是开源库Apache Lucene。它可以被下面这样准确地形容：</p>
<ul>
<li>
<p>一个分布式的实时文档存储，每个字段可以被索引与搜索；</p>
</li>
<li>
<p>一个分布式实时分析搜索引擎；</p>
</li>
<li>
<p>能胜任上百个服务节点的扩展，并支持 PB 级别的结构化或者非结构化数据。</p>
</li>
<li>
<p>Fluentd</p>
</li>
</ul>
<p>一个针对日志的收集、处理、转发系统。通过丰富的插件系统，可以收集来自于各种系统或应用的日志，转化为用户指定的格式后，转发到用户所指定的日志存储系统之中。</p>
<p>Fluentd 通过一组给定的数据源抓取日志数据，处理后（转换成结构化的数据格式）将它们转发给其他服务，比如 Elasticsearch、对象存储、kafka等等。Fluentd 支持超过300个日志存储和分析服务，所以在这方面是非常灵活的。主要运行步骤如下</p>
<ol>
<li>首先 Fluentd 从多个日志源获取数据</li>
<li>结构化并且标记这些数据</li>
<li>然后根据匹配的标签将数据发送到多个目标服务</li>
</ol>
<ul>
<li>Kibana</li>
</ul>
<p>Kibana是一个开源的分析和可视化平台，设计用于和Elasticsearch一起工作。可以通过Kibana来搜索，查看，并和存储在Elasticsearch索引中的数据进行交互。也可以轻松地执行高级数据分析，并且以各种图标、表格和地图的形式可视化数据。</p>
<h5 id="部署es服务" tabindex="-1"><a class="header-anchor" href="#部署es服务" aria-hidden="true">#</a> 部署es服务</h5>
<h6 id="部署分析" tabindex="-1"><a class="header-anchor" href="#部署分析" aria-hidden="true">#</a> 部署分析</h6>
<ol>
<li>es生产环境是部署es集群，通常会使用statefulset进行部署，此例由于演示环境资源问题，部署为单点</li>
<li>数据存储挂载主机路径</li>
<li>es默认使用elasticsearch用户启动进程，es的数据目录是通过宿主机的路径挂载，因此目录权限被主机的目录权限覆盖，因此可以利用init container容器在es进程启动之前把目录的权限修改掉，注意init container要用特权模式启动。</li>
</ol>
<h6 id="部署并验证" tabindex="-1"><a class="header-anchor" href="#部署并验证" aria-hidden="true">#</a> 部署并验证</h6>
<p><code v-pre>efk/elasticsearch.yaml</code></p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>apiVersion: apps/v1
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
log: <span class="token string">"true"</span> <span class="token comment">## 指定部署在哪个节点。需根据环境来修改</span>
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
value: <span class="token string">"-Xms512m -Xmx512m"</span>
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
command: <span class="token punctuation">[</span><span class="token string">"sh"</span><span class="token punctuation">,</span> <span class="token string">"-c"</span><span class="token punctuation">,</span> <span class="token string">"chown -R 1000:1000 /usr/share/elasticsearch/data"</span><span class="token punctuation">]</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl create namespace logging
<span class="token comment">## 给slave1节点打上label，将es服务调度到slave1节点</span>
$ kubectl label node k8s-slave1 log=true
<span class="token comment">## 部署服务，可以先去部署es的节点把镜像下载到本地</span>
$ kubectl create <span class="token operator">-</span>f elasticsearch<span class="token punctuation">.</span>yaml
statefulset<span class="token punctuation">.</span>apps/elasticsearch-logging created
service/elasticsearch created

<span class="token comment">## 等待片刻，查看一下es的pod部署到了k8s-slave1节点，状态变为running</span>
$ kubectl <span class="token operator">-</span>n logging get po <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE IP NODE
elasticsearch-logging-0 1/1 Running 0 69m 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>104 k8s-slave1
<span class="token comment"># 然后通过curl命令访问一下服务，验证es是否部署成功</span>
$ kubectl <span class="token operator">-</span>n logging get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
elasticsearch ClusterIP 10<span class="token punctuation">.</span>109<span class="token punctuation">.</span>174<span class="token punctuation">.</span>58 &lt;none> 9200/TCP 71m
$ curl 10<span class="token punctuation">.</span>109<span class="token punctuation">.</span>174<span class="token punctuation">.</span>58:9200
<span class="token punctuation">{</span>
<span class="token string">"name"</span> : <span class="token string">"elasticsearch-logging-0"</span><span class="token punctuation">,</span>
<span class="token string">"cluster_name"</span> : <span class="token string">"docker-cluster"</span><span class="token punctuation">,</span>
<span class="token string">"cluster_uuid"</span> : <span class="token string">"uic8xOyNSlGwvoY9DIBT1g"</span><span class="token punctuation">,</span>
<span class="token string">"version"</span> : <span class="token punctuation">{</span>
<span class="token string">"number"</span> : <span class="token string">"7.4.2"</span><span class="token punctuation">,</span>
<span class="token string">"build_flavor"</span> : <span class="token string">"default"</span><span class="token punctuation">,</span>
<span class="token string">"build_type"</span> : <span class="token string">"docker"</span><span class="token punctuation">,</span>
<span class="token string">"build_hash"</span> : <span class="token string">"2f90bbf7b93631e52bafb59b3b049cb44ec25e96"</span><span class="token punctuation">,</span>
<span class="token string">"build_date"</span> : <span class="token string">"2019-10-28T20:40:44.881551Z"</span><span class="token punctuation">,</span>
<span class="token string">"build_snapshot"</span> : false<span class="token punctuation">,</span>
<span class="token string">"lucene_version"</span> : <span class="token string">"8.2.0"</span><span class="token punctuation">,</span>
<span class="token string">"minimum_wire_compatibility_version"</span> : <span class="token string">"6.8.0"</span><span class="token punctuation">,</span>
<span class="token string">"minimum_index_compatibility_version"</span> : <span class="token string">"6.0.0-beta1"</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token string">"tagline"</span> : <span class="token string">"You Know, for Search"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="部署kibana" tabindex="-1"><a class="header-anchor" href="#部署kibana" aria-hidden="true">#</a> 部署kibana</h5>
<h6 id="部署分析-1" tabindex="-1"><a class="header-anchor" href="#部署分析-1" aria-hidden="true">#</a> 部署分析</h6>
<ol start="2">
<li>kibana需要暴漏web页面给前端使用，因此使用ingress配置域名来实现对kibana的访问</li>
<li>kibana为无状态应用，直接使用Deployment来启动</li>
<li>kibana需要访问es，直接利用k8s服务发现访问此地址即可，<a href="http://elasticsearch:9200" target="_blank" rel="noopener noreferrer">http://elasticsearch:9200<ExternalLinkIcon/></a></li>
</ol>
<h6 id="部署并验证-1" tabindex="-1"><a class="header-anchor" href="#部署并验证-1" aria-hidden="true">#</a> 部署并验证</h6>
<p>资源文件 <code v-pre>efk/kibana.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f kibana<span class="token punctuation">.</span>yaml
deployment<span class="token punctuation">.</span>apps/kibana created
service/kibana created
ingress/kibana created

<span class="token comment"># 然后查看pod，等待状态变成running</span>
$ kubectl <span class="token operator">-</span>n logging get po
NAME READY STATUS RESTARTS AGE
elasticsearch-logging-0 1/1 Running 0 88m
kibana-944c57766-ftlcw 1/1 Running 0 15m

<span class="token comment">## 配置域名解析 kibana.devops.cn，并访问服务进行验证，若可以访问，说明连接es成功</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="部署fluentd" tabindex="-1"><a class="header-anchor" href="#部署fluentd" aria-hidden="true">#</a> 部署fluentd</h5>
<h6 id="部署分析-2" tabindex="-1"><a class="header-anchor" href="#部署分析-2" aria-hidden="true">#</a> 部署分析</h6>
<ol>
<li>fluentd为日志采集服务，kubernetes集群的每个业务节点都有日志产生，因此需要使用daemonset的模式进行部署</li>
<li>为进一步控制资源，会为daemonset指定一个选择表情，fluentd=true来做进一步过滤，只有带有此标签的节点才会部署fluentd</li>
<li>日志采集，需要采集哪些目录下的日志，采集后发送到es端，因此需要配置的内容比较多，我们选择使用configmap的方式把配置文件整个挂载出来</li>
</ol>
<h6 id="部署服务" tabindex="-1"><a class="header-anchor" href="#部署服务" aria-hidden="true">#</a> 部署服务</h6>
<p>配置文件，<code v-pre>efk/fluentd-es-main.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">data</span><span class="token punctuation">:</span>
<span class="token key atrule">fluent.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
<span class="token comment"># This is the root config file, which only includes components of the actual configuration</span>
<span class="token comment">#</span>
<span class="token comment"># Do not collect fluentd's own logs to avoid infinite loops.</span>
&lt;match fluent.<span class="token important">**></span>
@type null
&lt;/match<span class="token punctuation">></span>

@include /fluentd/etc/config.d/<span class="token important">*.conf</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es<span class="token punctuation">-</span>config<span class="token punctuation">-</span>main
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件，fluentd-config.yaml，注意点：</p>
<ol>
<li>数据源source的配置，k8s会默认把容器的标准和错误输出日志重定向到宿主机中</li>
<li>默认集成了 <a href="https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter" target="_blank" rel="noopener noreferrer">kubernetes_metadata_filter<ExternalLinkIcon/></a> 插件，来解析日志格式，得到k8s相关的元数据，raw.kubernetes</li>
<li>match输出到es端的flush配置</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>config
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">data</span><span class="token punctuation">:</span>
<span class="token key atrule">system.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
&lt;system<span class="token punctuation">></span>
root_dir /tmp/fluentd<span class="token punctuation">-</span>buffers/
&lt;/system<span class="token punctuation">></span>
<span class="token key atrule">containers.input.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
&lt;source<span class="token punctuation">></span>
@id fluentd<span class="token punctuation">-</span>containers.log
@type tail
path /var/log/containers/<span class="token important">*.log</span>
pos_file /var/log/es<span class="token punctuation">-</span>containers.log.pos
time_format %Y<span class="token punctuation">-</span>%m<span class="token punctuation">-</span>%dT%H<span class="token punctuation">:</span>%M<span class="token punctuation">:</span>%S.%NZ
localtime
tag raw.kubernetes.*
format json
read_from_head true
&lt;/source<span class="token punctuation">></span>
<span class="token comment"># Detect exceptions in the log output and forward them as one log entry.</span>
&lt;match raw.kubernetes.<span class="token important">**></span>
@id raw.kubernetes
@type detect_exceptions
remove_tag_prefix raw
message log
stream stream
multiline_flush_interval 5
max_bytes 500000
max_lines 1000
&lt;/match<span class="token punctuation">></span>
<span class="token key atrule">forward.input.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
<span class="token comment"># Takes the messages sent over TCP</span>
&lt;source<span class="token punctuation">></span>
@type forward
&lt;/source<span class="token punctuation">></span>
<span class="token key atrule">output.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
<span class="token comment"># Enriches records with Kubernetes metadata</span>
&lt;filter kubernetes.<span class="token important">**></span>
@type kubernetes_metadata
&lt;/filter<span class="token punctuation">></span>
&lt;match <span class="token important">**></span>
@id elasticsearch
@type elasticsearch
@log_level info
include_tag_key true
host elasticsearch
port 9200
logstash_format true
request_timeout 30s
&lt;buffer<span class="token punctuation">></span>
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
&lt;/buffer<span class="token punctuation">></span>
&lt;/match<span class="token punctuation">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>daemonset定义文件，fluentd.yaml，注意点：</p>
<ol>
<li>需要配置rbac规则，因为需要访问k8s api去根据日志查询元数据</li>
<li>需要将/var/log/containers/目录挂载到容器中</li>
<li>需要将fluentd的configmap中的配置文件挂载到容器内</li>
<li>想要部署fluentd的节点，需要添加fluentd=true的标签</li>
</ol>
<p><code v-pre>efk/fluentd.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">""</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">"namespaces"</span>
<span class="token punctuation">-</span> <span class="token string">"pods"</span>
<span class="token key atrule">verbs</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token string">"get"</span>
<span class="token punctuation">-</span> <span class="token string">"watch"</span>
<span class="token punctuation">-</span> <span class="token string">"list"</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
<span class="token key atrule">k8s-app</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">kubernetes.io/cluster-service</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">addonmanager.kubernetes.io/mode</span><span class="token punctuation">:</span> Reconcile
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> logging
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> <span class="token string">""</span>
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">name</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> <span class="token string">""</span>
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
<span class="token key atrule">fluentd</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">securityContext</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token key atrule">serviceAccount</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> fluentd<span class="token punctuation">-</span>es
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /var/log
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">""</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlog
<span class="token punctuation">-</span> <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /var/lib/docker/containers
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">""</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> varlibdockercontainers
<span class="token punctuation">-</span> <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /home/docker/containers
<span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">""</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token comment">## 给slave1和slave2打上标签，进行部署fluentd日志采集服务</span>
$ kubectl label node k8s-slave1 fluentd=true
node/k8s-slave1 labeled
$ kubectl label node k8s-slave2 fluentd=true
node/k8s-slave2 labeled

<span class="token comment"># 创建服务</span>
$ kubectl create <span class="token operator">-</span>f fluentd-es-config-main<span class="token punctuation">.</span>yaml
configmap/fluentd-es-config-main created
$ kubectl create <span class="token operator">-</span>f fluentd-configmap<span class="token punctuation">.</span>yaml
configmap/fluentd-config created
$ kubectl create <span class="token operator">-</span>f fluentd<span class="token punctuation">.</span>yaml
serviceaccount/fluentd-es created
clusterrole<span class="token punctuation">.</span>rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/fluentd-es created
clusterrolebinding<span class="token punctuation">.</span>rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/fluentd-es created
daemonset<span class="token punctuation">.</span>extensions/fluentd-es created

<span class="token comment">## 然后查看一下pod是否已经在k8s-slave1和k8s-slave2节点启动成功</span>
$ kubectl <span class="token operator">-</span>n logging get po <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE
elasticsearch-logging-0 1/1 Running 0 123m
fluentd-es-246pl 1/1 Running 0 2m2s
fluentd-es-4e21w 1/1 Running 0 2m10s
kibana-944c57766-ftlcw 1/1 Running 0 50m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="efk功能验证" tabindex="-1"><a class="header-anchor" href="#efk功能验证" aria-hidden="true">#</a> EFK功能验证</h5>
<h6 id="验证思路" tabindex="-1"><a class="header-anchor" href="#验证思路" aria-hidden="true">#</a> 验证思路</h6>
<p>k8s-slave1和slave2中启动服务，同时往标准输出中打印测试日志，到kibana中查看是否可以收集</p>
<h6 id="创建测试容器" tabindex="-1"><a class="header-anchor" href="#创建测试容器" aria-hidden="true">#</a> 创建测试容器</h6>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> counter
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
<span class="token key atrule">fluentd</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> count
<span class="token key atrule">image</span><span class="token punctuation">:</span> alpine<span class="token punctuation">:</span><span class="token number">3.6</span>
<span class="token key atrule">args</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>/bin/sh<span class="token punctuation">,</span> <span class="token punctuation">-</span>c<span class="token punctuation">,</span>
<span class="token string">'i=0; while true; do echo "$i: $(date)"; i=$((i+1)); sleep 1; done'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ kubectl get po
NAME READY STATUS RESTARTS AGE
counter 1/1 Running 0 6s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="配置kibana" tabindex="-1"><a class="header-anchor" href="#配置kibana" aria-hidden="true">#</a> 配置kibana</h6>
<p>登录kibana界面，按照截图的顺序操作：</p>
<p>也可以通过其他元数据来过滤日志数据，比如可以单击任何日志条目以查看其他元数据，如容器名称，Kubernetes 节点，命名空间等，比如kubernetes.pod_name : counter</p>
<p>到这里，我们就在 Kubernetes 集群上成功部署了 EFK ，要了解如何使用 Kibana 进行日志数据分析，可以参考 Kibana 用户指南文档：<a href="https://www.elastic.co/guide/en/kibana/current/index.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/en/kibana/current/index.html<ExternalLinkIcon/></a></p>
</div></template>


