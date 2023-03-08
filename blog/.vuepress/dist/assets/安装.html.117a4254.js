import{_ as a}from"./plugin-vueexport-helper.2444895f.js";import{o as i,c as r,e as t,a as n,b as s,d as l,f as o,r as c}from"./app.4d4f0a46.js";const d={},m=n("p",null,[n("strong",null,"k8s"),s(" \u4E0B "),n("strong",null,"prometheus"),s(" \u7684\u5B89\u88C5\u90E8\u7F72")],-1),p=n("h2",{id:"\u5B89\u88C5-kube-prometheus",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5B89\u88C5-kube-prometheus","aria-hidden":"true"},"#"),s(" \u5B89\u88C5 kube-prometheus")],-1),u={href:"https://github.com/prometheus-operator/kube-prometheus",target:"_blank",rel:"noopener noreferrer"},v=n("strong",null,"release-0.4",-1),b=n("strong",null,"yaml",-1),g=o(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> clone <span class="token parameter variable">-b</span> release-0.4 --single-branch https://github.com/prometheus-operator/kube-prometheus.git

<span class="token comment"># \u8BE5\u76EE\u5F55\u4E0B\u5B9A\u4E49\u597D\u4E86\u90E8\u7F72\u7684 yaml </span>
<span class="token builtin class-name">cd</span> ./kube-prometheus/manifests
<span class="token function">ls</span>

<span class="token comment"># \u5176\u4E2D</span>
<span class="token comment"># alertmanager-alertmanager.yaml 	\u5B9A\u4E49\u4E86 alertmanager</span>
<span class="token comment"># prometheus-prometheus.yaml 		\u5B9A\u4E49\u4E86 prometheus server\u7AEF</span>
<span class="token comment"># prometheus-rules.yaml 			\u5B9A\u4E49\u4E86 prometheus \u7684\u57FA\u672C\u89C4\u5219</span>
<span class="token comment"># node-exporter* 					\u91C7\u96C6\u5BBF\u4E3B\u673A\u7684\u76D1\u63A7\u6570\u636E\u7684\uFF08\u6BD4zabbix\u66F4\u8BE6\u7EC6\uFF09</span>
<span class="token comment"># grafana-deployment.yaml 			\u7EE7\u627F\u4E86\u5F88\u591A dashboard\uFF0C\u901A\u8FC7 ConfigMap \u6CE8\u5165</span>
<span class="token comment"># grafana-dashboardDefinitions.yaml \u5B9A\u4E49\u4E86\u5F88\u591A dashboard\uFF0C\u90FD\u653E\u5230\u4E86 ConfigMap \u91CC\u9762</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u4F7F\u7528\u5BB9\u5668\u4E0D\u65B9\u4FBF\uFF0C\u7ECF\u5E38\u4F1A\u6539\u91CC\u9762\u7684\u6A21\u677F\u3001\u521B\u5EFA\u6A21\u677F\u7B49\u6CA1\u6709\u5B58\u50A8\u4F1A\u5F88\u590D\u6742</p><ul><li>\u82E5\u5BB9\u5668\u90E8\u7F72\uFF0C\u65B0\u589E\u4E00\u4E2A\u6A21\u677F\u5C31\u9700\u8981\u4FEE\u6539\u4E0A\u8FF0\u5B9A\u4E49 <strong>dashboard</strong> \u5E76\u6302\u8F7D\u5230 <strong>configMap</strong> \u4E2D\uFF0C<strong>grafana</strong> \u624D\u80FD\u8BFB\u53D6\u5230</li><li>\u6709\u591A\u4E2A <strong>configMap</strong> \uFF0C\u56E0\u4E3A <strong>etcd</strong> \u9ED8\u8BA4\u9650\u5236\u5927\u5C0F\u4E3A <strong>1.5 Mib\uFF08Raft<em>\u6D88\u606F\u9650\u5236</em> \uFF09</strong> \u8FC7\u5927\u7684\u914D\u7F6E\u6587\u4EF6\u4F1A\u5F71\u54CD\u5176\u6027\u80FD\uFF08<em>\u867D\u7136\u53EF\u4FEE\u6539</em> \uFF09</li><li>\u52A0\u4E00\u4E2A\u6A21\u677F\u5C31\u9700\u8981\u521B\u5EFA\u4E00\u4E2A <strong>configMap</strong> \u7136\u540E\u5728 <code>grafana-deployment.yaml</code> \u4E2D\u7684 <strong>volumes:</strong> \u4E0B\uFF0C\u6302\u8F7D\u4E00\u5927\u5806\uFF0C\u65B0\u589E\u4E5F\u9700\u8981\u6CBF\u7528\u8FD9\u79CD\u65B9\u5F0F\u6302\u8F7D</li></ul><p>\u56E0\u6B64\u5EFA\u8BAE <strong>grafana</strong> \u6700\u597D\u6302\u4E2A\u5B58\u50A8\uFF08<em>\u6570\u636E\u76EE\u5F55</em>\uFF09\uFF0C\u82E5\u6CA1\u6709\u5B58\u50A8\u7684\u8BDD\u6700\u597D\u4F7F\u7528\u5BBF\u4E3B\u673A\u90E8\u7F72</p><ul><li>\u8FD9\u6837\u53EF\u4EE5\u76F4\u63A5\u4E0A\u4F20\u4E00\u4E2A <strong>dashboard</strong> \u5B9A\u4E49\u5230\u5BBF\u4E3B\u673A\u6216\u5B58\u50A8\u4E2D</li><li><strong>grafana</strong> \u662F\u4E2A\u754C\u9762\u5C55\u793A\uFF0C\u6302\u4E86\u65E0\u59A8\uFF0C\u4F46\u8981\u5728 <strong>grafana</strong> \u4E0A\u505A\u544A\u8B66\uFF0C\u4E5F\u4E0D\u80FD\u6302</li><li>\u6709 <strong>alertmanager</strong> \u7684\u544A\u8B66\uFF0C\u5C31\u4E0D\u9700\u8981\u7528 <strong>grafana</strong> \u7684\u544A\u8B66\u4E86\uFF0C\u66F4\u4E3A\u7075\u6D3B</li></ul></div><p>\u90E8\u7F72 <strong>prometheus</strong>\u3001<strong>grafana</strong> \u548C <strong>alertmanager</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u8FDB\u5165 setup \u76EE\u5F55\u4E0B\u5B89\u88C5 operator</span>
<span class="token builtin class-name">cd</span> ./kube-prometheus/manifests/setup

<span class="token comment"># \u5B89\u88C5\u8BE5\u76EE\u5F55\u4E0B\u6240\u6709 yaml \u6587\u4EF6</span>
$ kubectl create <span class="token parameter variable">-f</span> <span class="token builtin class-name">.</span>
customresourcedefinition.apiextensions.k8s.io/alertmanagers.monitoring.coreos.com created
<span class="token punctuation">..</span>. 
clusterrolebinding.rbac.authorization.k8s.io/prometheus-operator created
deployment.apps/prometheus-operator created
service/prometheus-operator created
serviceaccount/prometheus-operator created

<span class="token comment"># \u67E5\u770B\u8FD0\u884C\uFF0C\u6B64\u65F6\u5DF2\u7ECF\u521B\u5EFA\u597D\u4E86 operator</span>
$ kubectl <span class="token parameter variable">-n</span> monitoring get po 
NAME                                   READY   STATUS    RESTARTS   AGE
prometheus-operator-5f75d76f9f-zkzf6   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          1m20s

<span class="token comment"># \u8FD4\u56DE\u4E0A\u7EA7\uFF0C\u7136\u540E\u521B\u5EFA prometheus \u7684\u96C6\u7FA4</span>
<span class="token builtin class-name">cd</span> <span class="token punctuation">..</span>
<span class="token function">ls</span>
<span class="token comment"># \u6700\u597D\u5C06 alertmanager \u4E2D\u7684 \u526F\u672C\u6539\u4E3A 3 \u4E2A,\u56E0\u4E3A\u751F\u6210\u73AF\u5883\u4E2D 3 \u4E2A\u4F1A\u901A\u8FC7 POSIX \u534F\u8BAE\u901A\u4FE1\uFF0C\u800C\u4E0D\u4F1A\u53D13\u6B21\u544A\u8B66</span>
<span class="token comment"># vim alertmanager-alertmanager.yaml</span>
<span class="token comment"># replicas: 3</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B <strong>service</strong> \u5982\u4E0B\u670D\u52A1</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> monitoring get svc
NAME                    TYPE        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>
alertmanager-main       ClusterIP   <span class="token number">10.96</span>.65.3       <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">9093</span>/TCP
<span class="token punctuation">..</span>.
grafana                 ClusterIP   <span class="token number">10.109</span>.31.26     <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">3000</span>/TCP
<span class="token punctuation">..</span>.
prometheus-k8s          ClusterIP   <span class="token number">10.105</span>.151.175   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">9090</span>/TCP
<span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>alertmanager-main</strong> \u7528\u4E8E\u67E5\u770B\u5F53\u524D\u544A\u8B66\u6709\u54EA\u4E9B\u3001\u901A\u77E5\u544A\u8B66</li><li><strong>grafana</strong> \u76D1\u63A7\u9762\u677F\u3001\u5C55\u793A\u6570\u636E</li><li><strong>prometheus-k8s</strong> \u521B\u5EFA\u89C4\u5219\u3001\u6821\u9A8C\u3001\u67E5\u8BE2\u64CD\u4F5C\u3001<strong>target</strong> \u7B49</li></ul><p>\u4F7F\u7528 <strong>ingress</strong> \u914D\u7F6E\u5982\u4E0A\u670D\u52A1\u5BF9\u5E94\u7684\u57DF\u540D\uFF08<em>\u82E5\u6CA1\u914D\u7F6E <strong>ingress</strong> \u5148\u53BB\u914D <strong>ingress</strong> \u7684\u63A7\u5236\u5668</em> \uFF09</p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code><span class="token comment"># \u914D\u7F6E ingress \u5982\u4E0B</span>
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: prom-ingresses
  namespace: monitoring
spec:
  rules:
  - host: alert.test.com
    http:
      paths:
      - backend:
          serviceName: alertmanager-main
          servicePort: 9093
        path: /
  - host: grafana.test.com
    http:
      paths:
      - backend:
          serviceName: grafana
          servicePort: 3000
        path: /
  - host: prom.test.com
    http:
      paths:
      - backend:
          serviceName: prometheus-k8s
          servicePort: 9090
        path: /
status:
  loadBalancer: {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u521B\u5EFA\u7684 <strong>ingress</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> monitoring get ingress
NAME             HOSTS                                           ADDRESS   PORTS   AGE
prom-ingresses   alert.test.com,grafana.test.com,prom.test.com             <span class="token number">80</span>      78s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4FEE\u6539 <strong>hosts</strong> \u540E\u5373\u53EF\u8BBF\u95EE\u57DF\u540D\uFF0C\u5176\u4E2D <strong>grafana</strong> \u7684\u521D\u59CB\u8D26\u6237\u5BC6\u7801\u90FD\u4E3A <code>admin</code> \uFF0C\u767B\u5165\u540E\u9700\u4FEE\u6539\uFF08<em>\u82E5\u6CA1\u6709\u6301\u4E45\u5316\uFF0C\u6BCF\u6B21\u91CD\u542F\u90FD\u4F1A\u8FD8\u539F\uFF0C\u6B64\u5904\u4FEE\u6539\u4E3A <code>user@dev</code>\u5907\u5FD8</em> \uFF09</p><div class="language-ini ext-ini line-numbers-mode"><pre class="language-ini"><code>192.168.3.172	alert.test.com prom.test.com grafana.test.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13);function k(h,f){const e=c("ExternalLinkIcon");return i(),r("div",null,[m,t(" more "),p,n("p",null,[n("a",u,[s("Github \u5730\u5740"),l(e)]),s(" \u6B64\u5904\u514B\u9686\u7684\u662F "),v,s(" \u7248\u672C\u7684\uFF0C"),b,s(" \u6587\u4EF6\u5982\u4E0B")]),g])}const x=a(d,[["render",k],["__file","\u5B89\u88C5.html.vue"]]);export{x as default};
