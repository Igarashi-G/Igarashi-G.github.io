import{_ as r}from"./plugin-vueexport-helper.2444895f.js";import{o,c as p,e as c,a as n,b as s,d as e,w as d,f as i,r as l}from"./app.f50e8185.js";const v={},u=n("p",null,[n("strong",null,"k8s"),s(" \u670D\u52A1\u3001\u8D1F\u8F7D\u5747\u8861 \u548C \u8054\u7F51")],-1),m=i(`<h2 id="_1-service-\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#_1-service-\u670D\u52A1" aria-hidden="true">#</a> 1. Service \u670D\u52A1</h2><p>\u6B64\u65F6\uFF0C\u5DF2\u80FD\u901A\u8FC7 <strong>Deployment</strong> \u521B\u5EFA\u5E26\u526F\u672C\u7684 <strong>Pod</strong> \u63D0\u4F9B\u9AD8\u53EF\u7528\u6027\u7684\u670D\u52A1\u4E86\uFF0C\u4F46\u5373\u4F7F\u6BCF\u4E2A <strong>Pod</strong> \u90FD\u4F1A\u5206\u914D\u5355\u72EC <strong>IP</strong>\uFF0C\u5374\u5B58\u5728\u5982\u4E0B\u95EE\u9898</p><ul><li><strong>Pod IP</strong> \u4EC5\u4EC5\u662F\u96C6\u7FA4\u5185\u53EF\u89C1\u7684\u865A\u62DF <strong>IP</strong>\uFF0C\u5916\u90E8\u65E0\u6CD5\u8BBF\u95EE</li><li><strong>Pod IP</strong> \u4F1A\u968F\u7740 <strong>Pod</strong> \u9500\u6BC1\u800C\u6D88\u5931\uFF0C\u5F53 <strong>ReplicaSet</strong> \u5BF9 <strong>Pod</strong> \u8FDB\u884C\u52A8\u6001\u4F38\u7F29\u65F6\uFF0C<strong>Pod IP</strong> \u53EF\u80FD\u968F\u65F6\u968F\u5730\u90FD\u4F1A\u53D8\u5316\uFF0C\u5BF9\u4E8E\u8BBF\u95EE\u670D\u52A1\u5E26\u6765\u4E86\u96BE\u5EA6</li></ul><h4 id="\u90A3\u4E48\u4EC0\u4E48\u662F-serveice" tabindex="-1"><a class="header-anchor" href="#\u90A3\u4E48\u4EC0\u4E48\u662F-serveice" aria-hidden="true">#</a> \u90A3\u4E48\u4EC0\u4E48\u662F Serveice \uFF1F</h4><p><strong>Service</strong> \u662F\u4E00\u7EC4 <strong>Pod</strong> \u7684\u670D\u52A1\u62BD\u8C61\uFF08<em>\u4E00\u79CD\u53EF\u4EE5\u8BBF\u95EE <strong>Pod</strong> \u7684\u7B56\u7565</em> \uFF09\uFF0C\u4E5F\u53EF\u4EE5\u7B80\u5355\u7406\u89E3\u4E3A\u903B\u8F91\u4E0A\u4E00\u7EC4 <strong>Pod</strong> \u7684 <strong>LB\uFF08<em>Load Balance</em>\uFF09</strong>\uFF0C\u8D1F\u8D23\u5C06\u8BF7\u6C42\u5206\u53D1\u7ED9\u5BF9\u5E94\u7684 <strong>Pod</strong> \uFF0C\u7528\u6765\u7ED9 <strong>Pod</strong> \u901A\u4FE1\u7684</p><p><strong>svc</strong> \u4E00\u65E6\u521B\u5EFA\uFF0C\u5373\u4F7F\u91CD\u5EFA\uFF0C\u540D\u79F0\u4E5F\u4E0D\u4F1A\u6539\u53D8</p><h4 id="\u7C7B\u578B\u5982\u4E0B" tabindex="-1"><a class="header-anchor" href="#\u7C7B\u578B\u5982\u4E0B" aria-hidden="true">#</a> \u7C7B\u578B\u5982\u4E0B</h4><ul><li><strong>Cluster IP\uFF1A</strong> \u96C6\u7FA4\u5185\u90E8\u4F7F\u7528\uFF0C\u9ED8\u8BA4\u503C\uFF0C\u7528\u4E8E\u8D1F\u8F7D</li><li><strong>ExternalName\uFF1A</strong> \u8FD4\u56DE\u5B9A\u4E49\u7684 <strong>CNAME</strong> \u522B\u540D\uFF0C\u7528\u4E8E\u53CD\u4EE3\u57DF\u540D</li><li><strong>NodePort\uFF1A</strong> \u5728\u6240\u6709\u5B89\u88C5\u4E86 <strong>kube-proxy</strong> \u7684\u8282\u70B9\u4E0A\uFF0C\u6253\u5F00\u4E00\u4E2A\u53EF\u4F9B\u5916\u90E8\u8BBF\u95EE <strong>pod</strong> \u7684\u7AEF\u53E3</li><li><strong>loadBalancer\uFF1A</strong> \u4F7F\u7528\u4E91\u63D0\u4F9B\u5546\u7684\u8D1F\u8F7D\u5747\u8861\u5668\u516C\u5F00\u670D\u52A1 <ul><li>\u5982\uFF1A\u963F\u91CC\u3001\u817E\u8BAF\u4E91\u652F\u6301\u8BE5\u683C\u5F0F\uFF0C\u53D1\u8BF7\u6C42\u5E76\u751F\u6210 <strong>IP</strong> \u5730\u5740</li></ul></li></ul><h3 id="_1-1-cluster-ip-\u8D1F\u8F7D\u5747\u8861" tabindex="-1"><a class="header-anchor" href="#_1-1-cluster-ip-\u8D1F\u8F7D\u5747\u8861" aria-hidden="true">#</a> 1.1 Cluster IP\uFF08<em>\u8D1F\u8F7D\u5747\u8861</em> \uFF09</h3><p><strong>Service</strong> \u4F1A\u4E3A\u8FD9\u4E2A <strong>LB</strong> \u63D0\u4F9B\u4E00\u4E2A <strong>Cluster IP</strong> \uFF0C\u4F7F\u7528 <strong>Service</strong> \u5BF9\u8C61\uFF0C\u901A\u8FC7 <strong>selector \u8FDB\u884C\u6807\u7B7E\u9009\u62E9</strong>\uFF0C\u5373\u53EF\u627E\u5230\u5BF9\u5E94\u7684 <strong>Pod</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6BCF\u6B21\u90FD\u8F93\u5165\u4E00\u4E32 kubectl xxx\u592A\u7D2F\uFF0C\u53EF\u4EE5\u8D77\u522B\u540D</span>
$ <span class="token builtin class-name">alias</span> <span class="token assign-left variable">kd</span><span class="token operator">=</span><span class="token string">&#39;kubectl -n uit&#39;</span>

<span class="token comment"># \u6B64\u65F6\u67E5\u770B pod \u6807\u7B7E\uFF0C\u5728 deploy \u914D\u7F6E\u4E2D\u66FE\u6307\u5B9A\u4E86 app=myblog</span>
$ kd get po --show-labels
NAME                     READY   STATUS    RESTARTS   AGE     LABELS
mysql-6fbb5cc967-48dfd   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2d12h   <span class="token assign-left variable">app</span><span class="token operator">=</span>mysql,pod-template-hash<span class="token operator">=</span>6fbb5cc967
ublog-5ff678657f-7qx5z   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          42m     <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog,pod-template-hash<span class="token operator">=</span>5ff678657f
ublog-5ff678657f-rk92z   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          43m     <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog,pod-template-hash<span class="token operator">=</span>5ff678657f
ublog-5ff678657f-tzspj   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          42m     <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog,pod-template-hash<span class="token operator">=</span>5ff678657f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Service</strong> \u7684 <strong>yaml</strong> \u6587\u4EF6\u5982\u4E0B</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog<span class="token punctuation">-</span>svc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>					<span class="token comment"># \u82E5\u5982 Nginx \u6709 80\u3001443 \u5219\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u7AEF\u53E3</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>				<span class="token comment"># Service \u7684\u7AEF\u53E3 </span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP			<span class="token comment"># \u534F\u8BAE: UDP\u3001TCP\u3001SCTP  default: TCP</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>		<span class="token comment"># \u540E\u7AEF\u5E94\u7528\u7684\u7AEF\u53E3\uFF08\u5BB9\u5668\u670D\u52A1\u7684\uFF09</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog				<span class="token comment"># \u901A\u8FC7\u6807\u7B7E\u8FC7\u6EE4\u5E76\u9009\u62E9\u5E94\u7528</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u4E0A\u914D\u7F6E\u7AEF\u53E3\uFF0C<strong>ServiceA</strong> \u8BBF\u95EE <strong>ServiceB</strong> \u53EF\u5229\u7528 <code>servicea --&gt; serviceb http://serviceb</code>\uFF0C\u82E5\u7AEF\u53E3\u975E <strong>80</strong> , \u5047\u5982\u662F <strong>8080</strong> \u5219\u901A\u8FC7 <code>http://serviceb:8080</code> \u5373\u53EF</p><p>\u521B\u5EFA <strong>Service</strong> \u5E76\u67E5\u770B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA svc</span>
$ kubectl create <span class="token parameter variable">-f</span> svc-ublog.yaml 
service/svc-ublog created

<span class="token comment"># \u67E5\u770B svc\uFF0C\u6B64\u65F6\u5DF2\u521B\u5EFA\u4E86 CLUSTER-IP 10.105.146.135 80 \u7AEF\u53E3\u7684\u670D\u52A1\uFF08\u5EFA\u8BAE\u81EA\u52A8\u751F\u6210 ClusterIP \u800C\u975E\u6307\u5B9A\uFF09</span>
$ kubectl <span class="token parameter variable">-nuit</span> get svc
NAME        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE
svc-ublog   ClusterIP   <span class="token number">10.105</span>.146.135   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>/TCP    7m51s


<span class="token comment"># \u67E5\u770B\u8BE6\u60C5\uFF0C\u6B64\u65F6\u53D1\u73B0 endpoints \u5DF2\u7ECF\u4EE3\u7406\u4E86\u5BF9\u5E94\u7684 app = myblog</span>
$ kubectl <span class="token parameter variable">-nuit</span> describe svc
Name:              svc-ublog
Namespace:         uit
Labels:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Selector:          <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog
Type:              ClusterIP
IP:                <span class="token number">10.105</span>.146.135
Port:              <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>  <span class="token number">80</span>/TCP
TargetPort:        <span class="token number">8002</span>/TCP
Endpoints:         <span class="token number">10.244</span>.1.35:8002,10.244.2.32:8002,10.244.2.33:8002
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

<span class="token comment"># \u6B64\u65F6\u8BBF\u95EE 80 \u7AEF\u53E3\uFF0C\u670D\u52A1\u6B63\u5E38</span>
<span class="token function">curl</span> <span class="token number">10.105</span>.146.135/blog/index/

<span class="token comment"># \u7F29\u5BB9 ublog \u670D\u52A1</span>
$ kubectl <span class="token parameter variable">-n</span> uit scale deploy ublog <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">2</span>
deployment.apps/ublog scaled

<span class="token comment"># \u67E5\u770Bsvc\u8BE6\u60C5\uFF0C\u6B64\u65F6\u53D1\u73B0 endpoints \u81EA\u52A8\u51CF\u4E00</span>
$ kubectl <span class="token parameter variable">-n</span> uit describe svc
Name:              svc-ublog
Namespace:         uit
Labels:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Selector:          <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog
Type:              ClusterIP
IP:                <span class="token number">10.105</span>.146.135
Port:              <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>  <span class="token number">80</span>/TCP
TargetPort:        <span class="token number">8002</span>/TCP
Endpoints:         <span class="token number">10.244</span>.1.35:8002,10.244.2.32:8002
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u521B\u5EFA <strong>Service</strong> \u65F6\uFF0C\u82E5\u914D\u7F6E\u6807\u7B7E\u9009\u62E9 <strong>pod</strong> \uFF0C\u4F1A\u6536\u96C6\u5176 <strong>IP</strong>\uFF0C\u81EA\u52A8\u521B\u5EFA\u540C\u540D\u7684 <strong>endpoints</strong> \u5BF9\u8C61\uFF0C\u82E5 <strong>Pod</strong> \u4E0A\u914D\u7F6E\u4E86 <strong>readinessProbe</strong>\uFF0C\u68C0\u6D4B\u5931\u8D25\u65F6\uFF0C<strong>endpoints</strong> \u5217\u8868\u4F1A\u5254\u9664\u6389\u5BF9\u5E94\u7684 <strong>Pod IP</strong>\uFF0C\u8FD9\u6837\u6D41\u91CF\u5C31\u4E0D\u4F1A\u5206\u53D1\u5230\u5065\u5EB7\u68C0\u6D4B\u5931\u8D25\u7684 <strong>Pod</strong> \u4E0A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> uit get endpoints svc-ublog
NAME        ENDPOINTS                           AGE
svc-ublog   <span class="token number">10.244</span>.1.35:8002,10.244.2.32:8002   21m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>\u518D\u6B21\u6539\u9020 <strong>MySQL</strong>\uFF0C\u521B\u5EFA <strong>Service</strong></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> svc<span class="token punctuation">-</span>mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u521B\u5EFA\u5E76\u8BBF\u95EE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> svc-mysql.yaml 
service/mysql created

$ kubectl <span class="token parameter variable">-n</span> uit get svc-mysql
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE
svc-mysql   ClusterIP   <span class="token number">10.98</span>.22.166   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">3306</span>/TCP   21s

$ <span class="token function">curl</span> <span class="token number">10.98</span>.22.166:3306
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u82E5\u7528 hostNetwork \u90E8\u7F72\uFF0C\u901A\u8FC7\u5BBF\u4E3B\u673A ip:port \u5F62\u5F0F\u8BBF\u95EE\uFF0C\u4F1A\u6709\u5982\u4E0B\u5F0A\u7AEF</p><ul><li>\u670D\u52A1\u4F7F\u7528 <strong>hostNetwork</strong>\uFF0C\u4F7F\u5F97\u5BBF\u4E3B\u673A\u7684\u7AEF\u53E3\u5927\u91CF\u66B4\u6F0F\uFF0C<strong>\u5B58\u5728\u5B89\u5168\u9690\u60A3</strong></li><li>\u5BB9\u6613\u5F15\u53D1\u7AEF\u53E3\u51B2\u7A81</li></ul><p>\u56E0\u6B64\uFF0C\u5E94\u8BE5\u4E3A <strong>MySQL</strong> \u521B\u5EFA <strong>Service</strong>\uFF0C\u5E76\u914D\u5230 <strong>ublog</strong> \u7684\u73AF\u5883\u53D8\u91CF\u4E2D\uFF0C\u5229\u7528\u96C6\u7FA4\u670D\u52A1\u53D1\u73B0\u7684\u80FD\u529B\uFF0C\u7EC4\u4EF6\u95F4\u901A\u8FC7 <strong>Service Name</strong> \u8BBF\u95EE</p></div><h3 id="_1-2-\u670D\u52A1\u53D1\u73B0-\u73AF\u5883\u53D8\u91CF\u53BB-ip-\u5316" tabindex="-1"><a class="header-anchor" href="#_1-2-\u670D\u52A1\u53D1\u73B0-\u73AF\u5883\u53D8\u91CF\u53BB-ip-\u5316" aria-hidden="true">#</a> 1.2 \u670D\u52A1\u53D1\u73B0\uFF08<em>\u73AF\u5883\u53D8\u91CF\u53BB IP \u5316</em> \uFF09</h3><p><strong>k8s</strong> \u96C6\u7FA4\u4E2D\uFF0C\u7EC4\u4EF6\u95F4\u53EF\u4EE5\u901A\u8FC7 <strong>Service Name</strong> \u5B9E\u73B0\u901A\u4FE1\uFF0C<strong>Pods</strong> \u95F4\uFF0C\u65E0\u9700\u901A\u8FC7 <strong>\u56FA\u5B9A\u73AF\u5883\u53D8\u91CF IP</strong> \u7684\u5F62\u5F0F</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u4E0A\u6587\u521B\u5EFA\u7684 svc</span>
$ kubectl <span class="token parameter variable">-n</span> uit get svc svc-mysql
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE
svc-mysql   ClusterIP   <span class="token number">10.98</span>.22.166   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">3306</span>/TCP   151m

<span class="token comment"># \u8BBF\u95EE\u4EFB\u610F\u4E00\u4E2A\u4E1A\u52A1 pod ublog</span>
$ kubectl <span class="token parameter variable">-n</span> uit <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> ublog-5ff678657f-rk92z /bin/bash

<span class="token comment"># curl cluster ip\uFF0C\u53EF\u6B63\u5E38\u8FDE\u901A MySQL</span>
<span class="token function">curl</span> <span class="token number">10.98</span>.22.166:3306

<span class="token comment"># curl svc-mysql\uFF0C\u53D1\u73B0\u4F9D\u7136\u53EF\u6B63\u5E38\u8FDE\u901A MySQL\uFF0C</span>
<span class="token function">curl</span> svc-mysql:3306
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C3D\u7BA1 <strong>Pod IP</strong> \u548C <strong>Cluster IP</strong> \u90FD\u4E0D\u56FA\u5B9A\uFF08<em><strong>\u91CD\u542F\u4F1A\u53D8\u66F4</strong></em> \uFF09\uFF0C\u4F46 <strong>Service Name</strong> \u662F\u56FA\u5B9A\u7684\uFF0C\u4E14\u5B8C\u5168\u5177\u6709\u8DE8\u96C6\u7FA4\u7684\u53EF\u79FB\u690D\u6027\uFF0C\u5B9E\u73B0\u539F\u7406\u5982\u4E0B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u5F53\u524D\u7684 DNS \u914D\u7F6E\uFF0C\u53D1\u73B0\u6709\u4E2A 10.96.0.10 \u7684 IP</span>
<span class="token function">cat</span> /etc/resolv.conf 
nameserver <span class="token number">10.96</span>.0.10
search uit.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

<span class="token comment"># \u9000\u51FA\u5BB9\u5668\uFF0C\u5E76\u67E5\u770B\u6240\u6709\u547D\u540D\u7A7A\u95F4\uFF0C\u53D1\u73B0 kube-system \u4E0B\u6709\u4E2A kube-dns\uFF0C\u5B83\u7684 IP \u521A\u597D\u540C\u4E0A</span>
$ kubectl get svc --all-namespaces
NAMESPACE              NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>                  AGE
default                kubernetes                  ClusterIP   <span class="token number">10.96</span>.0.1        <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">443</span>/TCP                  23d
kube-system            kube-dns                    ClusterIP   <span class="token number">10.96</span>.0.10       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">53</span>/UDP,53/TCP,9153/TCP   23d
kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   <span class="token number">10.96</span>.54.184     <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">8000</span>/TCP                 22d
kubernetes-dashboard   kubernetes-dashboard        NodePort    <span class="token number">10.97</span>.63.15      <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">443</span>:30100/TCP            22d
uit                    svc-mysql                   ClusterIP   <span class="token number">10.98</span>.22.166     <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">3306</span>/TCP                 157m
uit                    svc-ublog                   ClusterIP   <span class="token number">10.105</span>.146.135   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>/TCP                   3h5m

<span class="token comment"># \u67E5\u770B kube-dns \u8FD9\u4E2A Service \u8BE6\u60C5\uFF0C\u53D1\u73B0\u9009\u62E9\u5668 Selector \u9009\u4E86 k8s-app=kube-dns \u8FD9\u4E2A\u6807\u7B7E</span>
$ kubectl <span class="token parameter variable">-n</span> kube-system describe svc kube-dns
Name:              kube-dns
Namespace:         kube-system
Labels:            k8s-app<span class="token operator">=</span>kube-dns
                   kubernetes.io/cluster-service<span class="token operator">=</span>true
                   kubernetes.io/name<span class="token operator">=</span>KubeDNS
Annotations:       prometheus.io/port: <span class="token number">9153</span>
                   prometheus.io/scrape: <span class="token boolean">true</span>
Selector:          k8s-app<span class="token operator">=</span>kube-dns
Type:              ClusterIP
IP:                <span class="token number">10.96</span>.0.10
Port:              dns  <span class="token number">53</span>/UDP
TargetPort:        <span class="token number">53</span>/UDP
Endpoints:         <span class="token number">10.244</span>.0.5:53,10.244.0.6:53
Port:              dns-tcp  <span class="token number">53</span>/TCP
TargetPort:        <span class="token number">53</span>/TCP
Endpoints:         <span class="token number">10.244</span>.0.5:53,10.244.0.6:53
Port:              metrics  <span class="token number">9153</span>/TCP
TargetPort:        <span class="token number">9153</span>/TCP
Endpoints:         <span class="token number">10.244</span>.0.5:9153,10.244.0.6:9153
Session Affinity:  None
Events:            <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

<span class="token comment"># \u6839\u636E \u9009\u62E9\u5668\u7684\u6807\u7B7E\u8FC7\u6EE4 \u627EPod\uFF0C\u53D1\u73B0\u662F\u521D\u59CB\u5316\u65F6\u7684 coredns </span>
$ kubectl <span class="token parameter variable">-n</span> kube-system get po <span class="token parameter variable">-l</span> k8s-app<span class="token operator">=</span>kube-dns <span class="token parameter variable">-owide</span>
NAME                       READY   STATUS    RESTARTS   AGE   IP           NODE             NOMINATED NODE   READINESS GATES
coredns-58cc8c89f4-hzprn   <span class="token number">1</span>/1     Running   <span class="token number">1</span>          23d   <span class="token number">10.244</span>.0.5   k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
coredns-58cc8c89f4-vvj77   <span class="token number">1</span>/1     Running   <span class="token number">2</span>          23d   <span class="token number">10.244</span>.0.6   k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

<span class="token variable"><span class="token variable">\`</span>\u521D\u59CB\u5316\u65F6\u521B\u5EFA\u4E86 coredns \u7136\u540E\u5EFA\u7ACB kube-dns \u8FD9\u4E2Aservice\uFF08\u56FA\u5B9AIP\uFF09\uFF0C\u540E\u7EED\u65B0\u5EFA Pod \u4FBF\u53EF\u6CE8\u5165\u5230 DNS \u914D\u7F6E\u4E2D\uFF0C\u6700\u7EC8\u89E3\u6790\u7684\u5C31\u662F coredns \u7684 IP, coredns \u89C1 <span class="token number">2.4</span><span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6545\u5BB9\u5668\u5185\u90E8\u7EC4\u4EF6\u95F4\u8C03\u7528\uFF0C\u5B8C\u5168\u53EF\u4EE5\u901A\u8FC7 <strong>Service Name</strong>\uFF08\u7C7B\u4F3C\u57DF\u540D\uFF09\u6765\u89E3\u6790 <strong>IP</strong> \u901A\u4FE1\uFF0C\u907F\u514D\u4E86\u5927\u91CF <strong>IP</strong> \u7EF4\u62A4\u7684\u6210\u672C\uFF0C\u56E0\u6B64\u518D\u6B21\u5BF9\u90E8\u7F72\u8FDB\u884C\u4F18\u5316\u6539\u9020</p><ol><li><p><strong>MySQL</strong> \u53BB\u6389 <strong>hostNetwork</strong> \u90E8\u7F72\uFF0C\u4F7F\u5F97\u670D\u52A1\u53EA\u66B4\u9732\u5728 <strong>k8s</strong> \u96C6\u7FA4\u5185\u90E8\u7F51\u7EDC\u73AF\u5883\u4E2D</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>			<span class="token comment"># \u53BB\u6389\u6B64\u884C \u6216 \u6539\u4E3Afalse</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>configMap</strong> \u4E2D\u7684\u6570\u636E\u5E93 <strong>HOST</strong> \u56FA\u5B9A\u7684 <strong>IP</strong> \u5730\u5740\u6362\u6210 <strong>Service Name</strong>\uFF0C\u8FD9\u6837\u8DE8\u73AF\u5883\u65F6\uFF0C\u914D\u7F6E\u5185\u5BB9\u53EF\u4FDD\u6301\u4E0D\u53D8</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">MYSQL_HOST</span><span class="token punctuation">:</span> <span class="token string">&quot;svc-mysql&quot;</span>     <span class="token comment"># \u6B64\u5904\u66FF\u6362\u4E3A\u4E0A\u6587\u7ED9 MySQL \u521B\u5EFA\u7684 Service</span>
  <span class="token key atrule">MYSQL_PORT</span><span class="token punctuation">:</span> <span class="token string">&quot;3306&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u91CD\u65B0\u6267\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> configmap.yaml
$ kubectl apply <span class="token parameter variable">-f</span> deploy-mysql.yaml

<span class="token comment"># \u4E5F\u53EF\u4EE5\u5220\u9664 configmap \u518D\u901A\u8FC7 .txt \u91CD\u5EFA</span>
$ kubectl <span class="token parameter variable">-n</span> uit delete cm ublog
$ kubectl <span class="token parameter variable">-n</span> uit create configmap ublog --from-env-file<span class="token operator">=</span>configmap.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u540C\u4E00\u4E2A <strong>NameSpace</strong> \u4E0B\uFF0C\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7 <strong>ServiceName</strong> \u6765\u8FDB\u884C\u8BBF\u95EE\uFF0C\u800C\u8DE8 <strong>NameSpace</strong> \u8BBF\u95EE\uFF0C\u9700\u8981 <strong>ServiceName + \u540E\u7F00 .namespace</strong> \u7684\u65B9\u5F0F\u8BBF\u95EE</p></div><h3 id="_1-3-nodeport-\u5916\u90E8\u8BBF\u95EE" tabindex="-1"><a class="header-anchor" href="#_1-3-nodeport-\u5916\u90E8\u8BBF\u95EE" aria-hidden="true">#</a> 1.3 NodePort\uFF08<em>\u5916\u90E8\u8BBF\u95EE</em> \uFF09</h3><p><strong>Cluster IP</strong> \u4E3A\u865A\u62DF\u5730\u5740\uFF0C\u53EA\u80FD\u5728 <strong>k8s</strong> \u96C6\u7FA4\u5185\u90E8\u8FDB\u884C\u8BBF\u95EE\uFF0C\u96C6\u7FA4\u5916\u90E8\u5982\u679C\u8BBF\u95EE\u5185\u90E8\u670D\u52A1\uFF0C\u53EF\u4EE5\u914D\u7F6E <strong>NodePort</strong></p><p>\u82E5\u4E0D\u6307\u5B9A <strong>NodePort</strong> \u7AEF\u53E3\uFF0C\u5219\u4F1A\u9ED8\u8BA4\u5728 <strong>30000-32767\uFF08<em>\u7AEF\u53E3\u53F7</em> \uFF09</strong> \u4E2D\u968F\u673A\u4F7F\u7528\u5176\u4E2D\u4E00\u4E2A</p><h4 id="\u4F7F\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a> \u4F7F\u7528\u573A\u666F</h4><p>\u901A\u5E38\u7528\u4E8E <strong>\u4E34\u65F6</strong> \u9700\u8981\u8BBF\u95EE <strong>MySQL</strong> \u4E4B\u7C7B\u7684\u4E2D\u95F4\u4EF6\u624D\u4F7F\u7528\uFF0C\u6027\u80FD\u5DEE\uFF0C<strong>\u4E0D\u63A8\u8350\u4F7F\u7528</strong></p><ul><li><strong>Service</strong> \u4E00\u65E6\u53D8\u591A\uFF0C\u5176\u6027\u80FD\u4E5F\u968F\u4E4B\u5927\u5E45\u4E0B\u964D</li><li>\u7EF4\u62A4\u5404\u79CD\u7AEF\u53E3\u7684\u6210\u672C\u8FC7\u9AD8\u3001\u592A\u590D\u6742\uFF0C\u63A8\u8350\u4F7F\u7528 <strong>ingress</strong></li></ul><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> svc<span class="token punctuation">-</span>np<span class="token punctuation">-</span>ublog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">32333</span>				<span class="token comment"># \u8FD9\u91CC\u8FD8\u662F\u624B\u52A8\u6307\u5B9A\u4E86\u7AEF\u53E3 32333 \u770B\u6548\u679C</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort				<span class="token comment"># \u53EA\u9700\u5C06\u4E4B\u524D\u7684 Cluster IP \u6539\u4E3A NodePort \u5373\u53EF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u521B\u5EFA\u5E76\u67E5\u770B\u670D\u52A1</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA svc</span>
$ kubectl create <span class="token parameter variable">-f</span> svc-np-ublog.yaml
service/svc-np-ublog created

<span class="token comment"># \u67E5\u770B\u5F53\u524D\u670D\u52A1</span>
$ kubectl <span class="token parameter variable">-n</span> uit get svc
NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
svc-mysql      ClusterIP   <span class="token number">10.98</span>.22.166     <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">3306</span>/TCP       2d11h
svc-np-ublog   NodePort    <span class="token number">10.107</span>.82.31     <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>:32543/TCP   4m57s
svc-ublog      ClusterIP   <span class="token number">10.105</span>.146.135   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>/TCP         2d11h

<span class="token comment"># \u67E5\u770B\u8BE6\u60C5</span>
$ kubectl <span class="token parameter variable">-n</span> uit describe svc svc-np-ublog 
Name:                     svc-np-ublog
Namespace:                uit
Labels:                   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Annotations:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Selector:                 <span class="token assign-left variable">app</span><span class="token operator">=</span>myblog
Type:                     NodePort
IP:                       <span class="token number">10.107</span>.82.31
Port:                     <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>  <span class="token number">80</span>/TCP
TargetPort:               <span class="token number">8002</span>/TCP
NodePort:                 <span class="token operator">&lt;</span>unset<span class="token operator">&gt;</span>  <span class="token number">32543</span>/TCP
Endpoints:                <span class="token number">10.244</span>.1.35:8002,10.244.2.32:8002
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u53D1\u73B0\u7C7B\u578B\u53D8\u4E3A <code>Type: NodePort</code> \uFF0C\u4E14\u591A\u4E86\u968F\u673A\u7684\u7AEF\u53E3 <code>NodePort: &lt;unset&gt; 32543/TCP</code>\uFF0C\u4F46 <strong>CLUSTER-IP</strong> \u548C <strong>Endpoints</strong> \u4F9D\u7136\u6CA1\u53D8</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6545\u53EF\u5220\u9664\u4E4B\u524D\u7684 svc</span>
kubectl delete <span class="token parameter variable">-f</span> svc-ublog.yaml 
<span class="token function">service</span> <span class="token string">&quot;svc-ublog&quot;</span> deleted

<span class="token comment"># \u540C\u65F6\u53D1\u73B0\uFF0C\u96C6\u7FA4\u5185\u6BCF\u4E2A\u8282\u70B9\u7684 NodePort \u7AEF\u53E3\u90FD\u4F1A\u8FDB\u884C\u76D1\u542C</span>
$ <span class="token function">curl</span> <span class="token number">192.168</span>.3.171:32333/blog/index/
$ <span class="token function">curl</span> <span class="token number">192.168</span>.3.172:32333/blog/index/
$ <span class="token function">curl</span> <span class="token number">192.168</span>.3.173:32333/blog/index/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>k8s</strong> \u96C6\u7FA4\u7684 <strong>\u4E1A\u52A1 Pod</strong> \u53D8\u4E3A\u7C7B\u4F3C <strong>\u9AD8\u53EF\u7528</strong> \u4E00\u6837\uFF0C\u90FD\u80FD\u5728\u6D4F\u89C8\u5668\u4E0A\uFF0C\u901A\u8FC7\u6BCF\u4E2A\u8282\u70B9\u7684 <strong>IP</strong>\uFF0C\u5BF9\u670D\u52A1\u8FDB\u884C\u5916\u90E8\u8BBF\u95EE\uFF08<em>\u5373\u4F7F\u8BE5\u8282\u70B9\u672A\u8DD1\u5BF9\u5E94\u7684\u4E1A\u52A1 Pod</em> \uFF09</p>`,42),b={href:"http://192.168.3.171:32333/blog/index/",target:"_blank",rel:"noopener noreferrer"},g={href:"http://192.168.3.172:32333/blog/index/",target:"_blank",rel:"noopener noreferrer"},k={href:"http://192.168.3.173:32333/blog/index/",target:"_blank",rel:"noopener noreferrer"},h=i(`<div class="custom-container note"><p class="custom-container-title">\u6B64\u65F6\u4F1A\u6709\u5982\u4E0B\u7591\u60D1\uFF1F</p><ol><li><strong>NodePort</strong> \u7684\u7AEF\u53E3\u76D1\u542C\uFF0C\u662F\u5982\u4F55\u8F6C\u53D1\u5230\u5BF9\u5E94\u7684 <strong>Pod</strong> \u670D\u52A1\u7684\uFF1F</li><li><strong>CLUSTER-IP</strong> \u662F <strong>\u865A\u62DF IP</strong>\uFF0C\u96C6\u7FA4\u5185\u662F\u5982\u4F55\u901A\u8FC7\u8FD9\u4E2A <strong>\u865A\u62DF IP</strong> \u8BBF\u95EE\u5230\u5177\u4F53\u7684 <strong>Pod</strong> \u670D\u52A1\u7684\uFF1F</li></ol></div><h3 id="_1-4-service-\u5B9E\u73B0\u539F\u7406" tabindex="-1"><a class="header-anchor" href="#_1-4-service-\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a> 1.4 Service \u5B9E\u73B0\u539F\u7406</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B 32333 \u7AEF\u53E3\u7684\u76D1\u542C\uFF0C\u770B\u5230\u5982\u4E0B kube-proxy \u5728\u76D1\u542C</span>
$ <span class="token function">netstat</span> <span class="token parameter variable">-ntpl</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token number">32333</span>
tcp6       <span class="token number">0</span>      <span class="token number">0</span> :::32333                :::*                    LISTEN      <span class="token number">28426</span>/kube-proxy  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="coredns" tabindex="-1"><a class="header-anchor" href="#coredns" aria-hidden="true">#</a> CoreDNS</h4><p>\u7528\u4E8E <strong>k8s</strong> \u96C6\u7FA4\u5185\u90E8 <strong>Service</strong> \u7684\u89E3\u6790\uFF0C\u53EF\u4EE5\u8BA9 <strong>Pod</strong> \u628A <strong>Service</strong> \u540D\u79F0\u89E3\u6790\u4E3A <strong>IP</strong> \u5730\u5740\uFF0C\u7136\u540E\u901A\u8FC7 <strong>IP</strong> \u8FDE\u63A5\u5230\u5BF9\u5E94\u7684\u5E94\u7528\u4E0A</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><ul><li><p><strong>Go</strong> \u8BED\u8A00\u5B9E\u73B0\u7684\u94FE\u5F0F\u63D2\u4EF6\uFF0C<strong>CNCF</strong> \u6210\u5458\uFF0C\u662F\u4E2A\u9AD8\u6027\u80FD\u3001\u6613\u6269\u5C55\u7684 <strong>DNS</strong> \u670D\u52A1\u7AEF</p></li><li><p>\u751F\u4EA7\u73AF\u5883\u4E2D\uFF0C\u4E00\u5B9A\u8981\u542F\u7528\u591A\u4E2A\uFF0C\u5E94\u5BF9\u96C6\u7FA4\u89C4\u6A21</p></li></ul></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B coredns</span>
$ kubectl <span class="token parameter variable">-n</span> kube-system get po <span class="token parameter variable">-o</span> wide<span class="token operator">|</span><span class="token function">grep</span> dns
coredns-58cc8c89f4-hzprn                 <span class="token number">1</span>/1     Running   <span class="token number">1</span>          28d   <span class="token number">10.244</span>.0.5      k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
coredns-58cc8c89f4-vvj77                 <span class="token number">1</span>/1     Running   <span class="token number">2</span>          28d   <span class="token number">10.244</span>.0.6      k8s-master-171   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>

<span class="token comment"># \u8FDB\u5165 myblog \u7684 pod \uFF0C\u67E5\u770B DNS\u89E3\u6790</span>
$ kubectl <span class="token parameter variable">-n</span> uit <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> ublog-5ff678657f-7qx5z <span class="token function">bash</span>
$ <span class="token function">cat</span> /etc/resolv.conf
nameserver <span class="token number">10.96</span>.0.10
search uit.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

<span class="token comment"># 10.96.0.10 \u600E\u4E48\u6765\u7684\uFF0C \u67E5\u770Bsvc \u53D1\u73B0\u6709 kube-dns \u670D\u52A1 </span>
<span class="token comment"># .10\u662F\u9ED8\u8BA4\u7ED9 dns\u7528\u7684</span>
$ kubectl <span class="token parameter variable">-n</span> kube-system get svc
NAME       TYPE        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>                  AGE
kube-dns   ClusterIP   <span class="token number">10.96</span>.0.10   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">53</span>/UDP,53/TCP,9153/TCP   28d

<span class="token comment"># .1 \u7F51\u6BB5\u662F\u9ED8\u8BA4\u7ED9 Kubernetes \u7528\u7684</span>
$ kubectl get svc
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE
kubernetes   ClusterIP   <span class="token number">10.96</span>.0.1    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">443</span>/TCP   28d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u542F\u52A8 <strong>Pod</strong> \u7684\u65F6\uFF0C\u4F1A\u628A <strong>kube-dns</strong> \u670D\u52A1\u7684 <strong>Cluster IP</strong> \u5730\u5740\u6CE8\u5165\u5230 <strong>Pod</strong> \u7684 <strong>resolve</strong> \u89E3\u6790\u914D\u7F6E\u4E2D</li><li>\u540C\u65F6\u6DFB\u52A0\u5BF9\u5E94 <strong>namespace</strong> \u7684 <strong>search</strong> \u57DF\uFF08<em>\u540E\u9762\u7684\u4E00\u8FDE\u4E32\u57DF\u540D</em> \uFF09</li><li>\u56E0\u6B64\u901A\u8FC7 <strong>service name \u8DE8\u547D\u540D\u7A7A\u95F4\u8BBF\u95EE</strong> \u7684\u8BDD\uFF0C\u9700\u8981\u6DFB\u52A0\u5BF9\u5E94\u7684 <strong>namespace</strong> \u540D\u79F0 <ul><li>\u5982\uFF1A <code>service_name.namespace_name</code></li></ul></li></ul><h4 id="kube-proxy" tabindex="-1"><a class="header-anchor" href="#kube-proxy" aria-hidden="true">#</a> kube-proxy</h4>`,9),P={href:"https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies",target:"_blank",rel:"noopener noreferrer"},y=n("strong",null,"Cilium",-1),x=n("strong",null,[s("eBPF\uFF08"),n("em",null,"\u673A\u5236"),s(" \uFF09")],-1),E=i(`<p><strong>\u8FD0\u884C\u5728\u6BCF\u4E2A\u8282\u70B9\u4E0A</strong>\uFF0C \u8D1F\u8D23 <strong>Pod</strong> \u95F4\u7684 <strong>\u901A\u4FE1</strong> \u548C <strong>\u8D1F\u8F7D\u5747\u8861</strong>\uFF0C\u76D1\u542C <strong>API Server</strong> \u4E2D\u670D\u52A1\u5BF9\u8C61\u7684\u53D8\u5316\uFF0C\u518D\u901A\u8FC7\u521B\u5EFA\u6D41\u91CF\u8DEF\u7531\u89C4\u5219\u6765\u5B9E\u73B0\u7F51\u7EDC\u7684\u8F6C\u53D1\uFF0C\u6709\u5982\u4E0B\u6A21\u5F0F</p><ul><li><p><s><strong>User space</strong>, \u8BA9 Kube-Proxy \u5728\u7528\u6237\u7A7A\u95F4\u76D1\u542C\u4E00\u4E2A\u7AEF\u53E3\uFF0C\u6240\u6709\u7684 Service \u90FD\u8F6C\u53D1\u5230\u8FD9\u4E2A\u7AEF\u53E3\uFF0C\u7136\u540E Kube-Proxy \u5728\u5185\u90E8\u5E94\u7528\u5C42\u5BF9\u5176\u8FDB\u884C\u8F6C\u53D1 \uFF0C \u6240\u6709\u62A5\u6587\u90FD\u8D70\u4E00\u904D\u7528\u6237\u6001\uFF0C\u6027\u80FD\u4E0D\u9AD8\uFF0Ck8s v1.2\u7248\u672C\u540E\u5E9F\u5F03</s>\u3002</p></li><li><p><strong>Iptables\uFF1A</strong> \u5F53\u524D\u9ED8\u8BA4\u6A21\u5F0F\uFF0C<strong>\u5B8C\u5168\u7531 IPtables \u6765\u5B9E\u73B0</strong>\uFF0C \u901A\u8FC7\u5404\u4E2A\u8282\u70B9\u4E0A\u7684 <strong>iptables</strong> \u89C4\u5219\u6765\u5B9E\u73B0 <strong>service</strong> \u7684\u8D1F\u8F7D\u5747\u8861\uFF0C\u4F46\u662F\u968F\u7740 <strong>service</strong> \u6570\u91CF\u7684\u589E\u5927\uFF0C<strong>iptables</strong> \u6A21\u5F0F\u7531\u4E8E\u7EBF\u6027\u67E5\u627E\u5339\u914D\u3001\u5168\u91CF\u66F4\u65B0\u7B49\u7279\u70B9\uFF0C\u5176\u6027\u80FD\u4F1A\u663E\u8457\u4E0B\u964D</p></li><li><p><strong>IPVS\uFF1A</strong> \u76D1\u542C <strong>Master</strong> \u8282\u70B9 \u589E\u52A0\u548C\u5220\u9664 <strong>service</strong> \u4EE5\u53CA <strong>endpoint</strong> \u7684\u6D88\u606F\uFF0C\u8C03\u7528 <strong>Netlink</strong> \u521B\u5EFA\u5BF9\u5E94 <strong>IPVS</strong> \u89C4\u5219\uFF0C\u5C06\u6D41\u91CF\u8F6C\u53D1\u5230\u5BF9\u5E94\u7684 <strong>Pod</strong> \u4E0A</p><ul><li>\u4E0E <strong>iptables</strong> \u540C\u6837\u57FA\u4E8E <strong>Netfilter\uFF08<em>iptable\u5185\u6838\u6001\u7684\u4E00\u79CD\u5B9E\u73B0</em>\uFF09</strong>\uFF0C\u91C7\u7528 <strong>hash</strong> \u8868\uFF0C\u56E0\u6B64\u5F53 <strong>service</strong> \u6570\u91CF\u8FBE\u5230\u4E00\u5B9A\u89C4\u6A21\u65F6\uFF0C<strong>hash</strong> \u67E5\u8868\u901F\u5EA6\u5FEB\uFF0C\u4ECE\u800C\u63D0\u9AD8 <strong>service</strong> \u7684\u670D\u52A1\u6027\u80FD</li><li><strong>k8s 1.8</strong> \u7248\u672C\u5F00\u59CB\u5F15\u5165\uFF0C<strong>1.11</strong> \u7248\u672C\u5F00\u59CB\u7A33\u5B9A\uFF0C\u9700\u8981\u5F00\u542F\u5BBF\u4E3B\u673A\u7684 <strong>ipvs</strong> \u6A21\u5757</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5BA2\u6237\u7AEF\u5DE5\u5177 \u67E5\u770B \u914D\u7F6E\u89C4\u5219</span>
$ ipvsadm <span class="token parameter variable">-ln</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="iptables-\u6293\u5305\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#iptables-\u6293\u5305\u6D41\u7A0B" aria-hidden="true">#</a> <strong>Iptables \u6293\u5305\u6D41\u7A0B</strong></h5><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B svc-np-ublog \u7684 iptables</span>
$ iptables-save  <span class="token operator">|</span><span class="token function">grep</span> svc-np-ublog
<span class="token parameter variable">-A</span> KUBE-NODEPORTS <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">&quot;uit/svc-np-ublog:&quot;</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">32333</span> <span class="token parameter variable">-j</span> KUBE-MARK-MASQ
<span class="token parameter variable">-A</span> KUBE-NODEPORTS <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">&quot;uit/svc-np-ublog:&quot;</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">32333</span> <span class="token parameter variable">-j</span> KUBE-SVC-FQQJWIJEBH5A6SF6
<span class="token parameter variable">-A</span> KUBE-SERVICES <span class="token operator">!</span> <span class="token parameter variable">-s</span> <span class="token number">10.244</span>.0.0/16 <span class="token parameter variable">-d</span> <span class="token number">10.107</span>.82.31/32 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">&quot;uit/svc-np-ublog: cluster IP&quot;</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> KUBE-MARK-MASQ
<span class="token parameter variable">-A</span> KUBE-SERVICES <span class="token parameter variable">-d</span> <span class="token number">10.107</span>.82.31/32 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">&quot;uit/svc-np-ublog: cluster IP&quot;</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> KUBE-SVC-FQQJWIJEBH5A6SF6
<span class="token variable"><span class="token variable">\`</span>\u5C06IP <span class="token number">10.107</span>.82.31 \u8F6C\u53D1\u5230 <span class="token number">80</span>\u7AEF\u53E3\uFF0C\u8F6C\u5411 KUBE-SVC-FQQJWIJEBH5A6SF6 \u8FD9\u4E2A\u94FE<span class="token variable">\`</span></span>

<span class="token comment"># \u7EE7\u7EED\u6293\u94FE</span>
$ iptables-save<span class="token operator">|</span><span class="token function">grep</span> KUBE-SVC-FQQJWIJEBH5A6SF6
:KUBE-SVC-FQQJWIJEBH5A6SF6 - <span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token punctuation">]</span>
<span class="token punctuation">..</span>.
<span class="token parameter variable">-A</span> KUBE-SVC-FQQJWIJEBH5A6SF6 <span class="token parameter variable">-m</span> statistic <span class="token parameter variable">--mode</span> random <span class="token parameter variable">--probability</span> <span class="token number">0.50000000000</span> <span class="token parameter variable">-j</span> KUBE-SEP-U4JA5WF5RRIRERN5
<span class="token parameter variable">-A</span> KUBE-SVC-FQQJWIJEBH5A6SF6 <span class="token parameter variable">-j</span> KUBE-SEP-ME7MACTOWWVFKRBM
<span class="token variable"><span class="token variable">\`</span>\u9759\u6001 \u6A21\u5F0F \u968F\u673A <span class="token number">50</span>%\u7684\u53EF\u80FD\u6027 \u6253\u5230 KUBE-SEP-U4JA5WF5RRIRERN5 \u94FE\u4E0A<span class="token variable">\`</span></span>

<span class="token comment"># \u8FDB\u4E00\u6B65\u6293\u53D6 KUBE-SEP-U4JA5WF5RRIRERN5</span>
$ iptables-save<span class="token operator">|</span><span class="token function">grep</span> KUBE-SEP-U4JA5WF5RRIRERN5
:KUBE-SEP-U4JA5WF5RRIRERN5 - <span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token punctuation">]</span>
<span class="token parameter variable">-A</span> KUBE-SEP-U4JA5WF5RRIRERN5 <span class="token parameter variable">-s</span> <span class="token number">10.244</span>.1.35/32 <span class="token parameter variable">-j</span> KUBE-MARK-MASQ
<span class="token parameter variable">-A</span> KUBE-SEP-U4JA5WF5RRIRERN5 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.244</span>.1.35:8002
<span class="token parameter variable">-A</span> KUBE-SVC-FQQJWIJEBH5A6SF6 <span class="token parameter variable">-m</span> statistic <span class="token parameter variable">--mode</span> random <span class="token parameter variable">--probability</span> <span class="token number">0.50000000000</span> <span class="token parameter variable">-j</span> KUBE-SEP-U4JA5WF5RRIRERN5
<span class="token variable"><span class="token variable">\`</span>\u6B64\u65F6 DNAT \u5230\u4E86\u5177\u4F53\u7684 Pod IP <span class="token number">10.244</span>.1.35:8002 \u4E0A<span class="token variable">\`</span></span>

<span class="token comment"># KUBE-SEP-ME7MACTOWWVFKRBM \u4E5F\u662F\u5982\u6B64</span>
iptables-save<span class="token operator">|</span><span class="token function">grep</span> KUBE-SEP-ME7MACTOWWVFKRBM
:KUBE-SEP-ME7MACTOWWVFKRBM - <span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token punctuation">]</span>
<span class="token parameter variable">-A</span> KUBE-SEP-ME7MACTOWWVFKRBM <span class="token parameter variable">-s</span> <span class="token number">10.244</span>.2.32/32 <span class="token parameter variable">-j</span> KUBE-MARK-MASQ
<span class="token parameter variable">-A</span> KUBE-SEP-ME7MACTOWWVFKRBM <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">-j</span> DNAT --to-destination <span class="token number">10.244</span>.2.32:8002
<span class="token parameter variable">-A</span> KUBE-SVC-FQQJWIJEBH5A6SF6 <span class="token parameter variable">-j</span> KUBE-SEP-ME7MACTOWWVFKRBM
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u53D1\u73B0\u662F\u6309\u7167 <strong>Pod</strong> \u8FDB\u884C\u6D41\u91CF\u5206\u914D\u7684\uFF0C\u82E5\u8981 <strong>\u7070\u5EA6\u53D1\u5E03</strong>\uFF0C\u505A <strong>\u6D41\u91CF\u5206\u914D / \u6CBB\u7406</strong> \u4ECD\u65E0\u6CD5\u5B9E\u73B0\uFF0C\u9700\u8981 <strong>istio</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u91CD\u5EFA pod</span>
$ kubectl <span class="token parameter variable">-n</span> demo delete po mysql-7f747644b8-6npzn

<span class="token comment"># \u53BB\u6389 taint</span>
$ kubectl taint <span class="token function">node</span> k8s-slave1 smoke-
$ kubectl taint <span class="token function">node</span> k8s-slave2 drunk-

<span class="token comment"># myblog\u4E0D\u7528\u52A8\uFF0C\u4F1A\u81EA\u52A8\u56E0\u5065\u5EB7\u68C0\u6D4B\u4E0D\u8FC7\u800C\u91CD\u542F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-endpoints-\u4EE3\u7406\u5916\u90E8\u5E94\u7528-\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#_1-5-endpoints-\u4EE3\u7406\u5916\u90E8\u5E94\u7528-\u4EE3\u7406" aria-hidden="true">#</a> 1.5 Endpoints \u4EE3\u7406\u5916\u90E8\u5E94\u7528\uFF08<em>\u4EE3\u7406</em> \uFF09</h3><p>\u7ECF\u5E38\u6709\u9700\u8981\u4EE3\u7406 <strong>k8s</strong> \u5916\u90E8\u5E94\u7528\u7684\u9700\u6C42\uFF0C<strong>\u5E94\u7528\u573A\u666F\u5982\u4E0B</strong></p><ul><li>\u5E0C\u671B\u5728\u751F\u4EA7\u73AF\u5883\u4E0A\u4F7F\u7528\u56FA\u5B9A\u540D\u79F0\uFF08<em>\u5982\uFF1A\u670D\u52A1\u540D</em> \uFF09\uFF0C\u800C\u975E\u901A\u8FC7 <strong>IP</strong> \u5730\u5740\u53BB\u8BBF\u95EE\u5916\u90E8\u7684\u4E2D\u95F4\u4EF6\u670D\u52A1 <ul><li>\u5982: \u4E0D\u5E0C\u671B\u5404\u56E2\u961F\u7EF4\u62A4\u4E0D\u540C <strong>k8s</strong> \u96C6\u7FA4\u65F6\uFF0C\u8FD8\u7EF4\u62A4\u5404\u79CD\u4E2D\u95F4\u4EF6\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u6B64\u65F6\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7 <strong>svc</strong> \u53CD\u4EE3\u6765\u7EDF\u4E00\u914D\u7F6E\u6587\u4EF6</li></ul></li><li>\u5E0C\u671B <strong>Service</strong> \u6307\u5411\u53E6\u4E00\u4E2A<strong>NameSpace</strong> \u4E2D\u6216 <strong>\u5176\u4ED6\u96C6\u7FA4</strong> \u4E2D\u7684\u670D\u52A1 <ul><li>\u6BD4\u5982: <strong>\u4E00\u4E9B\u5916\u90E8\u7684\u5B58\u50A8\u96C6\u7FA4\u7684\u7BA1\u7406\u5E73\u53F0</strong> \u4E0D\u53BB\u90E8\u7F72\u4E8E <strong>k8s</strong> \u4E2D\uFF0C\u6B64\u65F6\u4E5F\u53EF\u901A\u8FC7 <strong>k8s</strong> \u7684\u670D\u52A1\u8FDB\u884C\u4EE3\u7406</li><li>\u8DE8\u547D\u540D\u7A7A\u95F4\u65F6\u4E0D\u60F3\u4F7F\u7528 <strong>.namespace</strong> \u540E\u7F00\u5F62\u5F0F\u8BBF\u95EE\uFF08<em>\u4E0D\u63A8\u8350</em> \uFF09</li></ul></li><li>\u67D0\u4E2A\u9879\u76EE\u6B63\u5728\u8FC1\u79FB\u81F3 <strong>k8s</strong> \u96C6\u7FA4\uFF0C\u4F46\u4E00\u90E8\u5206\u670D\u52A1\u4F9D\u7136\u5728\u96C6\u7FA4\u5916\uFF0C\u6B64\u65F6\u53EF\u4F7F\u7528 <strong>Service</strong> \u4EE3\u7406\u81F3 <strong>k8s</strong> \u96C6\u7FA4\u5916\u90E8\u7684\u670D\u52A1\uFF08<em>\u907F\u514D\u8FC1\u79FB\u91CD\u542F</em> \uFF09 <ul><li>\u6BD4\u5982\uFF1A\u4E4B\u524D <strong>Web</strong> \u901A\u8FC7 <strong>172.16.120.111</strong> \u5F62\u5F0F\u8BBF\u95EE\u6570\u636E\u5E93\uFF0C<strong>Web</strong> \u8FC1\u8FC7\u6765\u6539\u4E3A\u901A\u8FC7 <strong>Service \u4EE3\u7406\u5F62\u5F0F</strong> \u8BBF\u95EE\uFF0C\u518D\u5C06\u6570\u636E\u5E93\u8FC1\u79FB\u8FC7\u6765\u65F6\u65E0\u9700\u91CD\u542F <strong>Web</strong> \u670D\u52A1</li></ul></li></ul><h4 id="\u53CD\u4EE3-ip" tabindex="-1"><a class="header-anchor" href="#\u53CD\u4EE3-ip" aria-hidden="true">#</a> \u53CD\u4EE3 IP</h4><p>\u4EE5\u4EE3\u7406\u767E\u5EA6\u4E3A\u4F8B\uFF0C\u5148\u7F16\u5199 <strong>svc</strong> \u6587\u4EF6</p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code>$ kubectl -n dev get svc -o yaml &gt; svc-proxy.yaml
$ vim svc-proxy.yaml

----------------------------
apiVersion: v1
kind: Services
metadata:
  label:
    app: svc-poroxy
  name: svc-proxy
  namespace: dev
spce:
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: 80
  sessionAffinity: None
  type: ClusterIP

----------------------------

$ kubectl create -f svc-proxy.yaml
$ kubectl -n dev get svc

NAME        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
svc-nignx   ClusterIP   None             &lt;none&gt;        80/TCP    29d
svc-proxy   ClusterIP   10.100.128.239   &lt;none&gt;        80/TCP    11h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u67E5\u770B <strong>svc</strong> \u53EF\u83B7\u53D6\u81EA\u52A8\u5206\u914D\u7684 <strong>IP</strong>\uFF0C\u63A5\u4E0B\u6765\u7F16\u5199 <strong>endpoints</strong> \u6765\u5173\u8054\u4EE3\u7406</p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code><span class="token comment"># \u5148\u83B7\u53D6\u767E\u5EA6\u76EE\u524D\u7684IP</span>
$ ping www.baidu.com
<span class="token key attr-name">64 bytes from 14.215.177.38 (14.215.177.38): icmp_seq</span><span class="token punctuation">=</span><span class="token value attr-value">1 ttl=56 time=6.87 ms</span>

<span class="token comment"># \u7F16\u5199 endpoints</span>
$ vim ep-proxy.yaml

----------------------------
apiVersion: v1
kind: Endpoints
metadata:
  label:
    app: svc-poroxy		# \u9700\u548C svc \u7684\u4E00\u81F4\u6765\u8FDB\u884C\u5173\u8054
  name: svc-proxy
  namespace: dev
subsets:				# 
- addresses:
  - ip: 14.215.177.38	# \u586B\u5199\u4EE3\u7406\u7684IP\u5730\u5740
  ports:
  - name: http
    port: 80
    protocol: TCP		# \u534F\u8BAE\u9700\u548C svc \u7684\u4E00\u81F4
    
----------------------------

$ kubectl apply -f ep-proxy.yaml
<span class="token comment">#\u6B64\u65F6 svc \u5173\u8054\u7684 ep \u5DF2\u751F\u6210\uFF0C\u4E14\u4F1A\u968F\u7740 svc \u7684\u6D88\u5931\u800C\u6D88\u5931</span>
$ kubectl -n dev get ep

<span class="token comment"># curl svc \u7684 IP \u6B64\u65F6\u53D1\u73B0\u6709\u76F8\u5E94</span>
$ curl 10.100.128.239 -I
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u82E5\u66F4\u6362\u4E86 <strong>IP</strong> \u65E0\u9700\u91CD\u542F\u5E94\u7528\u7A0B\u5E8F\uFF0C\u53EA\u9700\u8981\u6539\u52A8 <strong>endpoints</strong> \u6587\u4EF6\u7684 <code>ip</code> \uFF0C\u7136\u540E <code>kubectl replace -f</code> \u5373\u53EF</p><h4 id="externalname-\u53CD\u4EE3\u57DF\u540D" tabindex="-1"><a class="header-anchor" href="#externalname-\u53CD\u4EE3\u57DF\u540D" aria-hidden="true">#</a> ExternalName\uFF08<em>\u53CD\u4EE3\u57DF\u540D</em> \uFF09</h4><p>\u82E5\u9700\u53CD\u4EE3\u57DF\u540D\uFF0C\u5219\u9700\u8981\u66F4\u6539 <strong>svc</strong> \u7684\u7C7B\u578B\u4E3A <strong>ExternalName</strong></p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code>vim svc-proxyName.yaml
----------------------------
apiVersion: v1
kind: Service
metadata:
  labels:
    app: svc-proxy-name
  name: svc-proxy-name
  namespace: dev
spec:
  type: ExternalName
  externalName: www.baidu.com
----------------------------
$ kubectl apply -f svc-proxyName.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u8FDB\u5165 <strong>busybox</strong> \u4E2D\u5C1D\u8BD5\u901A\u8FC7\u4EE3\u7406\u7684\u670D\u52A1\u540D\u8BBF\u95EE</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-ndev</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> busybox -- <span class="token function">sh</span>

<span class="token comment"># \u901A\u8FC7\u4EE3\u7406\u7684\u57DF\u540D\u8BF7\u6C42\u8D44\u6E90\uFF0C\u8BBF\u95EE\u4E0D\u901A\u662F\u7531\u4E8E\u8DE8\u57DF\u9020\u6210\u7684</span>
$ <span class="token function">wget</span> svc-proxy-name
Connecting to svc-proxy-name <span class="token punctuation">(</span><span class="token number">14.215</span>.177.38:80<span class="token punctuation">)</span>
wget: server returned error: HTTP/1.1 <span class="token number">403</span> Forbidden

<span class="token comment"># \u57DF\u540D\u89E3\u6790</span>
$ <span class="token function">nslookup</span> svc-proxy-name
Server:    <span class="token number">10.96</span>.0.10
Address <span class="token number">1</span>: <span class="token number">10.96</span>.0.10 kube-dns.kube-system.svc.cluster.local

Name:      svc-proxy-name
Address <span class="token number">1</span>: <span class="token number">14.215</span>.177.38
Address <span class="token number">2</span>: <span class="token number">14.215</span>.177.39

<span class="token comment"># \u76F4\u63A5\u8BF7\u6C42\uFF0C\u5219\u53EF\u901A\u8FC7</span>
$ <span class="token function">wget</span> <span class="token number">14.215</span>.177.38
Connecting to <span class="token number">14.215</span>.177.38 <span class="token punctuation">(</span><span class="token number">14.215</span>.177.38:80<span class="token punctuation">)</span>
index.html           <span class="token number">100</span>% <span class="token operator">|</span>*****************************<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7531\u4E8E\u8DE8\u57DF\u95EE\u9898\uFF0C\u8BE5\u573A\u666F\u4F7F\u7528\u8F83\u5C11</p><h2 id="_2-ingress-\u6D41\u91CF\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#_2-ingress-\u6D41\u91CF\u8DEF\u7531" aria-hidden="true">#</a> 2. Ingress\uFF08<em>\u6D41\u91CF\u8DEF\u7531</em> \uFF09</h2>`,22),S={href:"https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/",target:"_blank",rel:"noopener noreferrer"},f=i('<p>\u540C <strong>k8s</strong> \u7684\u8D44\u6E90\u7C7B\u578B\uFF0C\u5BF9\u4E8E <strong>k8s</strong> \u7684 <strong>Service</strong>\uFF0C\u65E0\u8BBA\u662F <strong>Cluster IP</strong> \u8FD8\u662F <strong>NodePort</strong>\uFF0C\u90FD\u662F <strong>\u56DB\u5C42\u8D1F\u8F7D</strong>\uFF0C\u8981\u8BA9\u96C6\u7FA4\u5185\u7684\u670D\u52A1\u5B9E\u73B0 <strong>\u4E03\u5C42\u8D1F\u8F7D\u5747\u8861</strong>\uFF0C\u8981\u501F\u52A9\u4E8E <strong>Ingress</strong></p><ul><li><strong>Ingress \u63A7\u5236\u5668\uFF1A</strong> \u5176\u5B9E\u73B0\u65B9\u5F0F\u5F88\u591A\uFF0C\u6BD4\u5982 <strong>Nginx</strong>, <strong>Contour</strong>, <strong>Haproxy</strong>, <strong>trafik</strong>, <strong>Istio</strong>\uFF0C\u540E\u7EED <strong>Nginx</strong> \u5B9E\u73B0\u4E3A\u4F8B</li><li><strong>\u53D1\u5E03\u65B9\u5F0F\uFF1A</strong><ul><li>\u5B83\u65E2\u53EF\u4EE5\u5B9E\u73B0 <strong>\u7AEF\u53E3</strong> \u7684\u65B9\u5F0F\uFF0C\u540C\u65F6\u53EF\u4EE5\u5B9E\u73B0 <strong>\u57DF\u540D</strong> \u7684\u65B9\u5F0F\u8BBF\u95EE <strong>k8s</strong> \u5185\u90E8\u5E94\u7528</li><li>\u901A\u5E38\u5185\u90E8\u901A\u8FC7\u57DF\u540D\uFF0C\u53CD\u4EE3\u5230\u4E1A\u52A1\u8282\u70B9\uFF0C<strong>ingress</strong> \u4E0A\u5C42\u53EF\u80FD\u8FD8\u6709 <strong>F5</strong>\uFF0C<strong>LVS</strong>\uFF0C<strong>SLB</strong>\uFF0C<strong>ELB</strong> \u7B49\u4F5C\u4E3A\u5165\u53E3\u518D\u53CD\u4EE3\u5230<strong>ingress</strong> \u4E0A\uFF0C\u7136\u540E <strong>\u5C06\u8D2D\u4E70\u7684 \u57DF\u540D \u89E3\u6790\u5230 F5\u3001\u963F\u91CC\u4E91\u7B49LB\u4E0A</strong></li><li>\u7531\u4E8E\u662F <strong>k8s</strong> \u4E2D\u901A\u8FC7 <strong>IPVS</strong> \u5B9E\u73B0\u7684\u4E00\u79CD <strong>\u5185\u6838\u7EA7</strong> \u7684\u8F6C\u53D1\uFF0C\u56E0\u6B64\u8FD8\u662F\u5F88\u5FEB\u7684\uFF0C\u4ECA\u540E\u53EF\u80FD\u8FD8\u4F7F\u7528 <strong>EBPF</strong> \u7B49\u4E1C\u897F\uFF0C\u901F\u5EA6\u66F4\u5FEB</li></ul></li></ul><h3 id="_2-1-ingress-nginx-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_2-1-ingress-nginx-\u5B89\u88C5" aria-hidden="true">#</a> 2.1 Ingress-nginx \u5B89\u88C5</h3>',3),I=n("strong",null,"k8s",-1),A=n("em",null,"\u540C\u6B65\u66F4\u65B0",-1),N={href:"https://kubernetes.github.io/ingress-nginx/",target:"_blank",rel:"noopener noreferrer"},T=i("<p><strong>Ingress-nginx</strong> \u662F <strong>7 \u5C42\u7684\u8D1F\u8F7D\u5747\u8861\u5668</strong> \uFF0C\u8D1F\u8D23\u7EDF\u4E00\u7BA1\u7406\u5916\u90E8\u5BF9 <strong>k8s cluster</strong> \u4E2D <strong>Service</strong> \u7684\u8BF7\u6C42\uFF0C\u5305\u542B\u5982\u4E0B</p><ul><li><strong>ingress-nginx-controller\uFF1A</strong> \u6839\u636E\u7528\u6237\u7F16\u5199\u7684 <strong>ingress</strong> \u89C4\u5219\uFF08<em>\u521B\u5EFA\u7684 ingress \u7684 yaml \u6587\u4EF6</em> \uFF09\uFF0C\u52A8\u6001\u7684\u53BB\u66F4\u6539<strong>nginx</strong> \u670D\u52A1\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u5E76\u4E14 <strong>reload</strong> \u91CD\u8F7D\u4F7F\u5176\u751F\u6548\uFF08<em>\u662F\u81EA\u52A8\u5316\u7684\uFF0C\u901A\u8FC7 lua \u811A\u672C\u6765\u5B9E\u73B0</em> \uFF09</li><li><strong>ingress\u8D44\u6E90\u5BF9\u8C61\uFF1A</strong> \u5C06 <strong>Nginx</strong> \u7684\u914D\u7F6E\u62BD\u8C61\u6210\u4E00\u4E2A <strong>Ingress</strong> \u5BF9\u8C61\uFF0C\u6BCF\u6DFB\u52A0\u4E00\u4E2A\u65B0\u7684 <strong>Service</strong> \u8D44\u6E90\u5BF9\u8C61\u53EA\u9700\u5199\u4E00\u4E2A\u65B0\u7684 <strong>Ingress</strong> \u89C4\u5219\u7684 <strong>yaml</strong> \u6587\u4EF6\u5373\u53EF\uFF08<em>\u6216\u4FEE\u6539\u5DF2\u5B58\u5728\u7684 ingress \u89C4\u5219\u7684 yaml \u6587\u4EF6</em> \uFF09</li></ul>",2),C={href:"https://kubernetes.github.io/ingress-nginx/deploy/",target:"_blank",rel:"noopener noreferrer"},R={href:"https://artifacthub.io/packages/helm/ingress-nginx/ingress-nginx",target:"_blank",rel:"noopener noreferrer"},_=n("strong",null,"Kubernetes",-1),$=n("strong",null,"Helm",-1),B=i(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u901A\u8FC7 helm \u6DFB\u52A0 ingress-nginx \u4ED3\u5E93</span>
$ helm repo <span class="token function">add</span> ingress-nginx https://kubernetes.github.io/ingress-nginx

<span class="token comment"># \u67E5\u770B\u6DFB\u52A0\u7684\u4ED3\u5E93</span>
$ helm repo list
NAME         	URL                                          
ingress-nginx	https://kubernetes.github.io/ingress-nginx

<span class="token comment"># \u67E5\u770B\u4ED3\u5E93\u4E2D ingress-nginx \u7684\u7248\u672C</span>
$ helm search repo ingress-nginx
NAME                       	CHART VERSION	APP VERSION	DESCRIPTION
ingress-nginx/ingress-nginx	<span class="token number">4.4</span>.0        	<span class="token number">1.5</span>.1      	Ingress controller <span class="token keyword">for</span> Kubernetes using NGINX a<span class="token punctuation">..</span>.

<span class="token comment"># \u867D\u7136\u9700\u8981 APP VERSION &gt;= 0.40.2 (bug\u5C11)\uFF0C\u4F46\u662F  CHART VERSION 4.4.0 \u592A\u9AD8\u4E86\uFF0C\u5B89\u88C5\u4F1A\u62A5\u9519\uFF0C</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u8981\u4E0B <strong>\u964D\u7EA7</strong> \u7684\u5305\uFF0C\u8FD9\u91CC\u662F <strong>CHART VERSION == 3.18.0</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u901A\u8FC7\u547D\u4EE4 search \u6240\u6709\u7248\u672C\u7684\u5305</span>
$ helm search repo ingress-nginx <span class="token parameter variable">-l</span>
<span class="token punctuation">..</span>.
ingress-nginx/ingress-nginx	<span class="token number">3.18</span>.0        	<span class="token number">0.42</span>.0     	An nginx Ingress controller that uses ConfigMap<span class="token punctuation">..</span>.

<span class="token comment"># pull \u5305\u6307\u5B9A\u7248\u672C\u53F7</span>
$ helm pull ingress-nginx/ingress-nginx <span class="token parameter variable">--version</span> <span class="token number">3.18</span>.0

<span class="token comment"># \u7F51\u7EDC\u5931\u8D25\uFF0C\u591A\u8BD5\u51E0\u6B21\uFF0C\u4E0B\u8F7D\u540E\u4F1A\u591A\u51FA\u4E2A 3.18.0 \u7684 tar \u5305</span>
$ <span class="token function">ls</span>
anaconda-ks.cfg  dev  <span class="token variable"><span class="token variable">\`</span>ingress-nginx-3.18.0.tgz<span class="token variable">\`</span></span>  k8s_install  kube-prometheus  prom  <span class="token builtin class-name">test</span>

<span class="token comment"># \u89E3\u538B\uFF0C\u8FDB\u5165\u76EE\u5F55</span>
$ <span class="token function">tar</span> <span class="token parameter variable">-xf</span> ingress-nginx-3.18.0.tgz
$ <span class="token builtin class-name">cd</span> ingress-nginx/

<span class="token comment"># \u5982\u4E0B\u662F\u914D\u7F6E\u6587\u4EF6</span>
$ <span class="token function">ls</span>
CHANGELOG.md  Chart.yaml  ci  OWNERS  README.md  README.md.gotmpl  templates  values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4FEE\u6539 <strong>ingress</strong> \u914D\u7F6E\u6587\u4EF6</p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code><span class="token comment"># \u6253\u5F00 values.yaml \u4FEE\u6539\u955C\u50CF\u5730\u5740\u7B49\u914D\u7F6E</span>
$ vim values.yaml

------------------------------
<span class="token comment"># \u4FEE\u6539\u955C\u50CF\u6E90\u5730\u5740\uFF0C\u5E76\u53BB\u6389\u54C8\u5E0C\u503C</span>
+ repository: docker.io/willdockerhub/ingress-nginx-controller
- digest 
...

<span class="token comment"># \u63A8\u8350\u4F7F\u7528 hostNetwork \u90E8\u7F72\uFF0C\u8D70\u5BBF\u4E3B\u673A\u7AEF\u53E3\uFF0C\u6027\u80FD\u597D\u4E00\u4E9B, \u4E14\u63A8\u8350\u4F7F\u7528 DaemonSet\u90E8\u7F72</span>
+ dnsPolicy: ClusterFirstWithHostNet
+ hostNetwork: true
+ kind: DaemonSet
<span class="token comment"># \u5FC5\u987B\u4FEE\u6539 dns \u7B56\u7565 \u5426\u5219 ingress pod \u662F\u89E3\u6790\u4E0D\u4E86 k8s \u5185\u90E8\u7684 Service</span>
...

<span class="token comment"># \u8BBE\u7F6E\u6709 ingress \u4E3A true \u6807\u7B7E\u7684\u8282\u70B9\u624D\u90E8\u7F72</span>
nodeSelector:
kubernetes.io/os: linux
+ ingress: &quot;true&quot;
<span class="token comment"># \u751F\u4EA7\u73AF\u5883\u4E2D\u5EFA\u8BAE\u4FEE\u6539 resources \u9700\u8981\u7ED9\u5927\u70B9\uFF0C\u6BD5\u7ADF\u662F k8s \u7684\u5165\u53E3</span>
...

<span class="token comment"># \u975E\u4E91\u73AF\u5883\uFF0Ctype \u662F\u4E0D\u9700\u8981\u4F7F\u7528 LoadBalancer \u7684\uFF0CIDC \u673A\u623F\u76F4\u63A5\u4F7F\u7528 ClusterIP \u5373\u53EF</span>
+ type: ClusterIP
<span class="token comment"># \u4E91\u7684\u8BDD\uFF0C\u4F1A\u5411\u4E91\u53D1\u4E2A\u8BF7\u6C42\uFF0C\u7136\u540E\u5F97\u5230\u516C\u6709\u4E91\u5206\u914D\u7684 IP \u5730\u5740\uFF0C\u4E4B\u540E\u5C06\u8D2D\u4E70\u7684\u57DF\u540D\u89E3\u6790\u5230\u516C\u6709\u4E91\u7684 IP \u5373\u53EF</span>
...

<span class="token comment"># \u67E5\u770B\u8F6C\u8F74\u63A7\u5236 \u662F\u5426\u8BC1\u4E66\u4F1A\u62A5\u9519 0.42 \u524D\u4F1A\uFF0C\u5C06 enabled \u4FEE\u6539</span>
admissionWebhooks:
  enabled: ...
...

<span class="token comment"># kube-webhook-certgen \u7684\u955C\u50CF\u5730\u5740\u540C\u6837\u4FEE\u6539</span>
+ repository: egistry.aliyuncs.com/google_containers/kube-webhook-certgen
------------------------------

<span class="token comment"># \u5982\u4E0A\u955C\u50CF\u5730\u5740\u90FD\u662F\u7F51\u4E0A\u6284\u7684\uFF0C\u82E5 pull \u5931\u8D25\uFF0C\u767E\u5EA6\u4E0B\u8F7D\u79BB\u7EBF</span>
docker pull quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.xx.0
docker pull \u80FD\u7528\u7684\u56FD\u5185\u5730\u5740/k8s/defaultbackend-amd64:x.xx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u82E5\u4F7F\u7528 <strong>Deployment</strong> \u65B9\u5F0F\u90E8\u7F72\uFF0C\u5219\u4E0D\u4F7F\u7528 <strong>hostNetwork</strong>\uFF0C\u56E0\u4E3A\u662F\u968F\u673A\u90E8\u7F72\u7684\uFF0C\u53EF\u80FD\u90E8\u7F72\u5728\u540C\u4E00\u4E2A\u5BBF\u4E3B\u673A\u5BFC\u81F4\u7AEF\u53E3\u51B2\u7A81</p><p><strong>DaemonSet</strong> \u66F4\u5BB9\u6613\u63A7\u5236\u4E0E\u67D0\u4E2A\u8282\u70B9\uFF0C\u76F4\u63A5\u5728\u5BBF\u4E3B\u673A\u4E0A\u66B4\u9732\u7AEF\u53E3\u53F7\uFF0C<strong>k8s</strong> \u5916\u90E8\u7684\u8D1F\u8F7D\u5747\u8861\uFF0C\u53EF\u4EE5\u76F4\u63A5\u4EE3\u7406\u5230 <strong>ingress</strong> \u6240\u5728\u8282\u70B9\u7684 <strong>IP</strong> \u548C\u7AEF\u53E3\u53F7\u4E0A\uFF0C\u800C\u4F7F\u7528 <strong>Deployment + NodePort</strong> \u65B9\u5F0F\u6027\u80FD\u5DEE\u96BE\u7EF4\u62A4</p></div><p>\u4F7F\u7528 <strong>Helm</strong> \u5B89\u88C5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u521B\u5EFA\u547D\u540D\u7A7A\u95F4\u5E76\u5B89\u88C5</span>
$ kubectl create ns ingress-nginx

<span class="token comment"># -n \u6307\u5B9A namespace</span>
$ helm <span class="token function">install</span> ingress-nginx <span class="token parameter variable">-n</span> ingress-nginx <span class="token builtin class-name">.</span>

<span class="token comment"># \u51FA\u73B0\u5982\u4E0B\uFF0C\u8C8C\u4F3C\u5BC6\u7801 base64 \u8F6C\u7801\u5565\u7684</span>
NAME: ingress-nginx
<span class="token punctuation">..</span>.
If TLS is enabled <span class="token keyword">for</span> the Ingress, a Secret containing the certificate and key must also be provided:

  apiVersion: v1
  kind: Secret
  metadata:
    name: example-tls
    namespace: foo
  data:
    tls.crt: <span class="token operator">&lt;</span>base64 encoded cert<span class="token operator">&gt;</span>
    tls.key: <span class="token operator">&lt;</span>base64 encoded key<span class="token operator">&gt;</span>
  type: kubernetes.io/tls

<span class="token comment"># \u67E5\u770B pod \u7B49\u5F85\u4E0B\u8F7D\u955C\u50CF, Running \u5219\u6210\u529F</span>
$ kubectl <span class="token parameter variable">-n</span> ingress-nginx get po <span class="token parameter variable">-w</span>
NAME                             READY   STATUS              RESTARTS   AGE
ingress-nginx-controller-22lhv   <span class="token number">0</span>/1     ContainerCreating   <span class="token number">0</span>          23s
ingress-nginx-controller-22lhv   <span class="token number">0</span>/1     Running             <span class="token number">0</span>          46s
ingress-nginx-controller-22lhv   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          63s


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E4B\u540E <strong>DaemonSet</strong> \u4F1A\u5728\u6307\u5B9A\u7684\u8282\u70B9\u4E0A\u8D77 <strong>ingress pod</strong> \u5E76\u66B4\u9732 <strong>80</strong> \u548C <strong>443</strong> \u7AEF\u53E3</p><h4 id="ingress-\u6269\u5BB9\u7F29\u5BB9" tabindex="-1"><a class="header-anchor" href="#ingress-\u6269\u5BB9\u7F29\u5BB9" aria-hidden="true">#</a> ingress \u6269\u5BB9\u7F29\u5BB9</h4><p>\u82E5\u9700\u6269\u5145 <strong>ingress pod</strong>\uFF0C\u53EF\u76F4\u63A5\u5176\u4ED6\u8282\u70B9\u6253\u6807\u7B7E\uFF0C<strong>DaemonSet</strong> \u4F1A\u6301\u7EED\u76D1\u542C\u5E76\u90E8\u7F72</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl label <span class="token function">node</span> k8s-slave-173 <span class="token assign-left variable">ingress</span><span class="token operator">=</span>true

<span class="token comment"># \u6B64\u65F6\u67E5\u770B\u5DF2\u6269\u5BB9\uFF0C\u6B63\u5728\u90E8\u7F72</span>
$ kubectl <span class="token parameter variable">-n</span> ingress-nginx get po
NAME                             READY   STATUS              RESTARTS   AGE
ingress-nginx-controller-22lhv   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          7m49s
ingress-nginx-controller-2gvv6   <span class="token number">0</span>/1     ContainerCreating   <span class="token number">0</span>          16s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5916\u90E8\u7684 <strong>WebLB</strong> \u518D\u5C06\u6269\u5BB9\u7684\u8282\u70B9\u5730\u5740\u5199\u5165\u5373\u53EF\uFF0C\u7F29\u5BB9\u76F4\u63A5\u5220\u6807\u7B7E\u5373\u53EF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl label <span class="token function">node</span> k8s-slave-173 ingress-

<span class="token comment"># \u6B64\u65F6\u67E5\u770B\u5DF2\u7F29\u5BB9\uFF0C\u6B63\u5728\u9500\u6BC1</span>
kubectl <span class="token parameter variable">-n</span> ingress-nginx get po
NAME                             READY   STATUS        RESTARTS   AGE
ingress-nginx-controller-22lhv   <span class="token number">1</span>/1     Running       <span class="token number">0</span>          12m
ingress-nginx-controller-2gvv6   <span class="token number">1</span>/1     Terminating   <span class="token number">0</span>          4m58s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9700\u8981\u5148\u5C06\u5916\u90E8\u7684 <strong>WebLB</strong> \u914D\u7F6E\u7684\u5730\u5740\u5220\u9664\uFF0C\u518D\u6267\u884C\u5982\u4E0A\u7F29\u5BB9\u64CD\u4F5C\uFF0C\u4FDD\u8BC1\u8BF7\u6C42\u6B63\u5E38</p><h3 id="_2-2-ingress-\u4F7F\u7528-\u53D1\u5E03\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#_2-2-ingress-\u4F7F\u7528-\u53D1\u5E03\u6D41\u7A0B" aria-hidden="true">#</a> 2.2 ingress \u4F7F\u7528\uFF08\u53D1\u5E03\u6D41\u7A0B\uFF09</h3><p>\u5982\u4E0A\u5DF2\u7ECF\u5B89\u88C5\u5B8C <strong>ingress-nginx</strong> \u7684 \u63A7\u5236\u5668\u4E86\uFF0C\u4E4B\u540E\u53EF\u4EE5\u7F16\u5199 <strong>yaml</strong> \u6765\u521B\u5EFA <strong>Ingress</strong> \u793A\u4F8B</p>`,17),M={href:"https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/",target:"_blank",rel:"noopener noreferrer"},U=i(`<p>\u53EA\u9700\u521B\u5EFA\u4E00\u6B21 <strong>Ingress</strong> \u5B9E\u4F8B\uFF0C\u5373\u53EF\u81EA\u52A8\u751F\u6210 <strong>nginx</strong> \u914D\u7F6E\uFF0C</p><p>\u82E5\u7070\u5EA6\u53D1\u5E03\u3001\u8DE8\u57DF\u3001\u9650\u901F\u7B49\u914D\u7F6E\uFF0C\u5176\u914D\u7F6E\u6587\u4EF6\u5199\u4E8E <strong>Annotations</strong> \u91CC\u9762\uFF0C<strong>ingress controller</strong> \u4F1A\u5206\u6790 <strong>ingress</strong> \u5B9E\u4F8B\uFF0C\u4ECE <strong>Annotations</strong> \u91CC\u9762\u8BFB\u53D6\u914D\u7F6E\uFF08<em>\u5177\u6709\u6821\u9A8C\u529F\u80FD</em> \uFF09\uFF0C\u751F\u6210 <strong>nginx</strong> \u914D\u7F6E\u6587\u4EF6</p><p>\u793A\u4F8B\uFF1A \u901A\u8FC7\u914D\u7F6E <strong>ingress</strong> \u57DF\u540D\u53CD\u4EE3\u5230 <strong>nginx</strong> \u670D\u52A1\u4E0A\uFF0C\u5982\u4E0B\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A <strong>example</strong> \u7684 <strong>ingress</strong></p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code>$ vim ingress.yaml

<span class="token comment"># ingress \u9700\u8981\u548C\u670D\u52A1\u5728\u540C\u4E00\u4E2A namespace \u4E0B, </span>
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: &quot;nginx&quot;
  name: example	
  namespace: dev
spec:
  rules:
  - host: nginx.bar.com
    http:
      paths:
      - backend:
          serviceName: svc-nignx
          servicePort: 80
        path: /
      - backend:
          serviceName: http-svc-abc
          servicePort: 80
        path: /abc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>apiVersion\uFF1A</strong></p><ul><li><code>networking.k8s.io/v1beta1</code> \u4F1A\u5728 <strong>1.22</strong> \u540E\u5E9F\u5F03</li><li><code>networking.k8s.io/v1:</code> <strong>1.22</strong> \u4E4B\u540E\u7684</li><li><code>extensinos/v1beta1:</code> \u6700\u5F00\u59CB\u7684\u7248\u672C\uFF0C\u5DF2\u5E9F\u5F03</li></ul><p>**annotations\uFF1A**\u544A\u8BC9\u63A5\u53E3\uFF0C\u58F0\u660E\u4F7F\u7528\u7684 <strong>\u914D\u7F6E\u5B9E\u4F8B</strong> \u662F\u4EC0\u4E48\uFF0C\u8FD9\u662F\u7531\u4E8E\u96C6\u7FA4\u4E2D\u53EF\u80FD\u4E0D\u6B62\u4E00\u4E2A <strong>ingress</strong> \u63A7\u5236\u5668</p><ul><li><code>kubernetes.io/ingress.class\uFF1A</code> \u5982\u4E0A\u5B9E\u4F8B\u662F <strong>ingress-nginx</strong> \uFF08<em>\u5728\u4E0A\u6587 <strong>value.yaml</strong> \u4E2D\u6307\u5B9A</em> \uFF09</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">cat</span> values.yaml <span class="token operator">|</span><span class="token function">grep</span> ingressClass
<span class="token comment">#  ingressClass: nginx</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>rules\uFF1A</strong> \u56FA\u5B9A\u5199\u6CD5\uFF0C\u4E00\u4E2A <strong>ingress</strong> \u53EF\u4EE5\u914D\u7F6E\u591A\u4E2A <strong>rules</strong> \uFF08<em>\u4E00\u4E2A\u6587\u4EF6\u4E2D\u53EF\u4EE5\u6307\u5B9A\u591A\u4E2A\u57DF\u540D</em>\uFF09</p><ul><li><code>host\uFF1A</code> \u914D\u7F6E\u57DF\u540D\uFF0C\u82E5\u4E0D\u5199\u5219\u662F <strong>*</strong> \u6B64\u65F6\u8F93\u5165\u4EFB\u4F55\u57DF\u540D\u90FD\u4F1A\u88AB\u89E3\u6790\uFF0C\u4E0D\u63A8\u8350</li><li><code>path\uFF1A</code> \u76F8\u5F53\u4E8E <strong>nginx</strong> \u7684 <strong>location</strong> \u914D\u7F6E\uFF0C\u540C\u4E00\u4E2A <strong>hosts</strong> \u53EF\u4EE5\u914D\u7F6E\u591A\u4E2A\u8DEF\u5F84</li><li><code>backend:</code> \u591A\u4E2A\u8DEF\u5F84\u53EF\u4EE5\u4E0E\u4E0D\u540C\u7684 <strong>Service</strong> \u5173\u8054\uFF0C\u4E0A\u6587\u8868\u793A\u4E00\u4E2A\u57DF\u540D\u4E0B\u7684\u4E24\u4E2A\u8DEF\u5F84\uFF0C\u53EF\u901A\u8FC7 <strong>svc</strong> \u8BBF\u95EE</li></ul><p>\u521B\u5EFA <strong>ingress</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-f</span> ingress.yaml 
ingress.networking.k8s.io/rewrite created

<span class="token comment"># \u67E5\u770B ingress</span>
$ kubectl <span class="token parameter variable">-n</span> dev get ing
NAME      HOSTS           ADDRESS          PORTS   AGE
example   nginx.bar.com   <span class="token number">10.107</span>.244.209   <span class="token number">80</span>      55s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u914D\u7F6E <strong>hosts</strong> \u89E3\u6790</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>192.168.3.172 nginx.bar.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u82E5\u8D2D\u4E70\u7684\u57DF\u540D\uFF0C\u5219\u89E3\u6790\u5230\u516C\u53F8\u7684 <strong>LB</strong> \u4E0A\uFF08<em><strong>LB</strong>\u662F\u6709\u5730\u5740\u7684</em> \uFF09\u7136\u540E <strong>LB</strong> \u518D\u53CD\u4EE3\u5230 <strong>k8s</strong> \u7684 <strong>ingress</strong> \u4E0A\uFF0C\u7136\u540E <strong>ingress</strong> \u518D\u6309\u7740\u4E0A\u9762\u914D\u7F6E\u6328\u4E2A\u6765</p></div><h4 id="\u52A8\u6001\u66F4\u65B0\u5B9E\u73B0\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u52A8\u6001\u66F4\u65B0\u5B9E\u73B0\u903B\u8F91" aria-hidden="true">#</a> \u52A8\u6001\u66F4\u65B0\u5B9E\u73B0\u903B\u8F91</h4><ol><li><strong>ingress controller</strong> \u901A\u8FC7\u548C <strong>k8s</strong> \u7684 <strong>api</strong> \u4EA4\u4E92\uFF0C\u52A8\u6001\u611F\u77E5\u96C6\u7FA4\u4E2D <strong>ingress</strong> \u89C4\u5219\u53D8\u5316</li><li>\u8BFB\u53D6 <strong>ingress</strong> \u89C4\u5219\uFF08<em>\u54EA\u4E2A\u57DF\u540D\u5BF9\u5E94\u54EA\u4E2A <strong>service</strong></em> \uFF09\uFF0C\u6309\u81EA\u5B9A\u4E49\u7684\u89C4\u5219\uFF0C\u751F\u6210 <strong>nginx</strong> \u914D\u7F6E</li><li>\u518D\u5199\u5230 <strong>nginx-ingress-controller</strong> \u7684 <strong>pod</strong> \u91CC\uFF0C\u5176 <strong>pod</strong> \u91CC\u8FD0\u884C\u7740\u4E00\u4E2A <strong>Nginx</strong> \u670D\u52A1\uFF0C\u63A7\u5236\u5668\u628A\u751F\u6210\u7684 <strong>nginx</strong> \u914D\u7F6E\u5199\u5165 <code>/etc/nginx.conf</code> \u6587\u4EF6\u4E2D\uFF0C\u7136\u540E <strong>reload</strong> \u4E00\u4E0B\u4F7F\u914D\u7F6E\u751F\u6548</li></ol><p>\u5982\u4E0B <strong>yaml</strong> \u6587\u4EF6</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> uit
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> myblog.devops.cn
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
      <span class="token key atrule">backend</span><span class="token punctuation">:</span>
      <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> myblog
      <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>ingress-nginx</strong> \u4F1A\u52A8\u6001\u751F\u6210 <strong>upstream</strong> \u914D\u7F6E</p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code>...
server_name myblog.devops.cn ;

listen 80 ;
listen [::]:80 ;
listen 443 ssl http2 ;
listen [::]:443 ssl http2 ;

set $proxy_upstream_name &quot;-&quot;;

ssl_certificate_by_lua_block {
certificate.call()
}

location / {

set $namespace &quot;demo&quot;;
set $ingress_name &quot;myblog&quot;;
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u82E5\u9700\u8981 <strong>HTTPS</strong> \u8BBF\u95EE\uFF0C\u9700\u8981\u751F\u6210\u8BC1\u4E66</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u81EA\u7B7E\u540D\u8BC1\u4E66</span>
$ openssl req <span class="token parameter variable">-x509</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-days</span> <span class="token number">2920</span> <span class="token parameter variable">-newkey</span> rsa:2048 <span class="token parameter variable">-keyout</span> tls.key <span class="token parameter variable">-out</span> tls.crt <span class="token parameter variable">-subj</span> <span class="token string">&quot;/CN=*.devops.cn/O=ingress-nginx&quot;</span>

<span class="token comment"># \u8BC1\u4E66\u4FE1\u606F\u4FDD\u5B58\u5230 secret\u5BF9\u8C61\u4E2D\uFF0Cingress-nginx \u4F1A\u8BFB\u53D6 secret \u5BF9\u8C61\u89E3\u6790\u51FA\u8BC1\u4E66\u52A0\u8F7D\u5230 nginx \u914D\u7F6E\u4E2D</span>
$ kubectl <span class="token parameter variable">-n</span> uit create secret tls https-secret <span class="token parameter variable">--key</span> tls.key <span class="token parameter variable">--cert</span> tls.crt
secret/https-secret created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u4E0A\u914D\u7F6E\u540E\u9762\u65B0\u589E <strong>tls</strong> \u5373\u53EF</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">tls</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> myblog.devops.cn
<span class="token key atrule">secretName</span><span class="token punctuation">:</span> https<span class="token punctuation">-</span>secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26);function L(K,q){const a=l("ExternalLinkIcon"),t=l("RouterLink");return o(),p("div",null,[u,c(" more "),m,n("ul",null,[n("li",null,[n("a",b,[s("http://192.168.3.171:32333/blog/index/"),e(a)])]),n("li",null,[n("a",g,[s("http://192.168.3.172:32333/blog/index/"),e(a)])]),n("li",null,[n("a",k,[s("http://192.168.3.173:32333/blog/index/"),e(a)])])]),h,n("p",null,[n("a",P,[s("\u5B98\u65B9\u6587\u6863"),e(a)]),s(" \u672A\u6765\u4E5F\u8BB8\u4F1A\u88AB "),y,s(" \u3001 "),x,s(" \u539F\u751F\u66FF\u4EE3")]),E,n("p",null,[n("a",S,[s("\u5B98\u65B9\u6587\u6863"),e(a)])]),f,n("p",null,[s("\u662F "),I,s(" \u5B98\u65B9\u7EF4\u62A4\u7684\u63A7\u5236\u5668\uFF08"),A,s(" \uFF09"),n("a",N,[s("\u5B98\u65B9\u6587\u6863"),e(a)])]),T,n("p",null,[n("a",C,[s("Ingress-nginx \u5B98\u65B9\u6587\u6863"),e(a)]),s(" \uFF0C\u63A8\u8350\u4F7F\u7528 "),n("strong",null,[e(t,{to:"/tool/Kubernetes/Helm%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8.html"},{default:d(()=>[s("Helm")]),_:1})]),s(" \u5B89\u88C5")]),n("p",null,[n("a",R,[s("Artifact Hub\u4E2D\u67E5\u627E"),e(a)]),s(" \u8FD9\u662F\u6765\u6E90\u4E8E "),_,s(" \u7EF4\u62A4\u7684\u5B98\u65B9 "),$,s(" \u4ED3\u5E93")]),B,n("p",null,[s("\u914D\u7F6E\u57DF\u540D\u901A\u5E38\u7528 "),n("a",M,[s("Annotations"),e(a)])]),U])}const F=r(v,[["render",L],["__file","k8s\u670D\u52A1.html.vue"]]);export{F as default};
