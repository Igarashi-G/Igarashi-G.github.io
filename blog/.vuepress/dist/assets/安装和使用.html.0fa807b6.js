import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as l,e as i,a as n,b as s,d as p,f as r,r as c}from"./app.c6053cea.js";const o={},u=n("p",null,[n("strong",null,"k8s"),s(" \u4E0B "),n("strong",null,"prometheus"),s(" \u7684\u5B89\u88C5\u53CA\u4F7F\u7528")],-1),d=n("h2",{id:"\u5B89\u88C5-kube-prometheus",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5B89\u88C5-kube-prometheus","aria-hidden":"true"},"#"),s(" \u5B89\u88C5 kube-prometheus")],-1),m={href:"https://github.com/prometheus-operator/kube-prometheus",target:"_blank",rel:"noopener noreferrer"},k=r(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> clone <span class="token parameter variable">-b</span> release-0.4 --single-branch https://github.com/prometheus-operator/kube-prometheus.git

<span class="token builtin class-name">cd</span> ./kube-prometheus/manifests/setup

<span class="token comment"># \u5B89\u88C5\u8BE5\u76EE\u5F55\u4E0B\u6240\u6709 yaml \u6587\u4EF6</span>
$ kubectl create <span class="token parameter variable">-f</span> <span class="token builtin class-name">.</span>
customresourcedefinition.apiextensions.k8s.io/alertmanagers.monitoring.coreos.com created
<span class="token punctuation">..</span>. 
clusterrolebinding.rbac.authorization.k8s.io/prometheus-operator created
deployment.apps/prometheus-operator created
service/prometheus-operator created
serviceaccount/prometheus-operator created

<span class="token comment"># \u67E5\u770B\u8FD0\u884C</span>
$ kubectl <span class="token parameter variable">-n</span> monitoring get po 
NAME                                   READY   STATUS    RESTARTS   AGE
prometheus-operator-5f75d76f9f-zkzf6   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          1m20s

<span class="token comment"># \u8FD4\u56DE\u4E0A\u7EA7\uFF0C\u7EE7\u7EED\u521B\u5EFA</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
$ kubectl create <span class="token parameter variable">-f</span> <span class="token builtin class-name">.</span>

<span class="token comment"># \u67E5\u770B\u8FD0\u884C</span>
$ kubectl <span class="token parameter variable">-n</span> monitoring get po <span class="token parameter variable">-owide</span>
NNAME                                   READY   STATUS              RESTARTS   AGE
alertmanager-main-0                    <span class="token number">0</span>/2     ContainerCreating   <span class="token number">0</span>          108s
grafana-58dc7468d7-wmp2p               <span class="token number">0</span>/1     Running             <span class="token number">0</span>          106s
kube-state-metrics-765c7c7f95-xn6kh    <span class="token number">0</span>/3     ContainerCreating   <span class="token number">0</span>          104s
node-exporter-99kq7                    <span class="token number">0</span>/2     ContainerCreating   <span class="token number">0</span>          104s
node-exporter-b9pfp                    <span class="token number">2</span>/2     Running             <span class="token number">0</span>          104s
node-exporter-qrdmv                    <span class="token number">0</span>/2     ContainerCreating   <span class="token number">0</span>          104s
prometheus-adapter-5cd5798d96-72fsl    <span class="token number">1</span>/1     Running             <span class="token number">0</span>          102s
prometheus-k8s-0                       <span class="token number">0</span>/3     ContainerCreating   <span class="token number">0</span>          98s
prometheus-k8s-1                       <span class="token number">0</span>/3     ContainerCreating   <span class="token number">0</span>          98s
prometheus-operator-5f75d76f9f-zkzf6   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          18m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B <strong>service</strong> \u5982\u4E0B\u670D\u52A1\u5E94\u914D\u7F6E\u57DF\u540D</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> monitoring get svc
NAME                    TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>
alertmanager-main       ClusterIP   <span class="token number">10.96</span>.65.3       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">9093</span>/TCP
<span class="token punctuation">..</span>.
grafana                 ClusterIP   <span class="token number">10.109</span>.31.26     <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">3000</span>/TCP
<span class="token punctuation">..</span>.
prometheus-k8s          ClusterIP   <span class="token number">10.105</span>.151.175   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">9090</span>/TCP
<span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><strong>alertmanager-main</strong> \u7528\u4E8E\u67E5\u770B\u5F53\u524D\u544A\u8B66\u6709\u54EA\u4E9B\u3001\u901A\u77E5\u544A\u8B66</p></li><li><p><strong>grafana</strong> \u76D1\u63A7\u9762\u677F\u3001\u5C55\u793A\u6570\u636E</p></li><li><p><strong>prometheus-k8s</strong> \u521B\u5EFA\u89C4\u5219\u3001\u6821\u9A8C\u3001\u67E5\u8BE2\u7B49</p></li></ul><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># \u914D\u7F6E ingress \u5982\u4E0B</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> prom<span class="token punctuation">-</span>ingresses
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> monitoring
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> alert.test.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> alertmanager<span class="token punctuation">-</span>main
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">9093</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> grafana.test.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> grafana
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">3000</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> prom.test.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> prometheus<span class="token punctuation">-</span>k8s
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">9090</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">loadBalancer</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u521B\u5EFA\u7684 <strong>ingress</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> monitoring get ingress
NAME             HOSTS                                           ADDRESS   PORTS   AGE
prom-ingresses   alert.test.com,grafana.test.com,prom.test.com             <span class="token number">80</span>      78s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function v(b,g){const a=c("ExternalLinkIcon");return t(),l("div",null,[u,i(" more "),d,n("p",null,[n("a",m,[s("Github \u5730\u5740"),p(a)])]),k])}const f=e(o,[["render",v],["__file","\u5B89\u88C5\u548C\u4F7F\u7528.html.vue"]]);export{f as default};
