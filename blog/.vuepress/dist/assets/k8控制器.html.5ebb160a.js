import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as p,e as o,a as n,b as e,d as s,f as t,r as c}from"./app.f3a88e13.js";const u={},r=n("p",null,[n("strong",null,"k8s"),s(" \u7684\u63A7\u5236\u5668\u7B49")],-1),d=t(`<h1 id="kubernetes\u57FA\u7840" tabindex="-1"><a class="header-anchor" href="#kubernetes\u57FA\u7840" aria-hidden="true">#</a> Kubernetes\u57FA\u7840</h1><h2 id="_1-\u63A7\u5236\u5668" tabindex="-1"><a class="header-anchor" href="#_1-\u63A7\u5236\u5668" aria-hidden="true">#</a> 1. \u63A7\u5236\u5668</h2><h3 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment">#\u6307\u5B9APod\u526F\u672C\u6570</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#\u6307\u5B9APod\u7684\u9009\u62E9\u5668</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">template</span><span class="token punctuation">:</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#\u7ED9Pod\u6253label</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u58F0\u660Epod\u7684\u7F51\u7EDC\u6A21\u5F0F\u4E3Ahost\u6A21\u5F0F\uFF0C\u6548\u679C\u901Adocker run --net=host</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span> <span class="token comment"># \u4F7F\u7528\u8282\u70B9\u9009\u62E9\u5668\u5C06Pod\u8C03\u5EA6\u5230\u6307\u5B9Alabel\u7684\u8282\u70B9</span>
<span class="token key atrule">component</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.15<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span>5.7<span class="token punctuation">-</span>utf8
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_USER
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_USER
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_DATABASE
<span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;myblog&quot;</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token key atrule">requests</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
<span class="token key atrule">limits</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
<span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
<span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
<span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
<span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
<span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>
<span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
<span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>deploy-myblog.yaml:</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment">#\u6307\u5B9APod\u526F\u672C\u6570</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#\u6307\u5B9APod\u7684\u9009\u62E9\u5668</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">template</span><span class="token punctuation">:</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">labels</span><span class="token punctuation">:</span> <span class="token comment">#\u7ED9Pod\u6253label</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.15<span class="token punctuation">:</span>5000/myblog
<span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
<span class="token key atrule">env</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_HOST
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PORT
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PORT
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_USER
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_USER
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
<span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PASSWD
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token key atrule">requests</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
<span class="token key atrule">limits</span><span class="token punctuation">:</span>
<span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
<span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
<span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
<span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
<span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span> <span class="token comment"># \u5BB9\u5668\u542F\u52A8\u540E\u7B2C\u4E00\u6B21\u6267\u884C\u63A2\u6D4B\u662F\u9700\u8981\u7B49\u5F85\u591A\u5C11\u79D2</span>
<span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span> <span class="token comment"># \u6267\u884C\u63A2\u6D4B\u7684\u9891\u7387</span>
<span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment"># \u63A2\u6D4B\u8D85\u65F6\u65F6\u95F4</span>
<span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
<span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
<span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
<span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
<span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="\u521B\u5EFAdeployment" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFAdeployment" aria-hidden="true">#</a> \u521B\u5EFADeployment</h6><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f deploy<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="\u67E5\u770Bdeployment" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770Bdeployment" aria-hidden="true">#</a> \u67E5\u770BDeployment</h6><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment"># kubectl api-resources</span>
$ kubectl <span class="token operator">-</span>n demo get deploy
NAME READY UP-TO-DATE AVAILABLE AGE
myblog 1/1 1 1 2m22s
mysql 1/1 1 1 2d11h

<span class="token operator">*</span> \`NAME\` \u5217\u51FA\u4E86\u96C6\u7FA4\u4E2D Deployments \u7684\u540D\u79F0\u3002
<span class="token operator">*</span> \`READY\`\u663E\u793A\u5F53\u524D\u6B63\u5728\u8FD0\u884C\u7684\u526F\u672C\u6570<span class="token operator">/</span>\u671F\u671B\u7684\u526F\u672C\u6570\u3002
<span class="token operator">*</span> \`UP-TO-DATE\`\u663E\u793A\u5DF2\u66F4\u65B0\u4EE5\u5B9E\u73B0\u671F\u671B\u72B6\u6001\u7684\u526F\u672C\u6570\u3002
<span class="token operator">*</span> \`AVAILABLE\`\u663E\u793A\u5E94\u7528\u7A0B\u5E8F\u53EF\u4F9B\u7528\u6237\u4F7F\u7528\u7684\u526F\u672C\u6570\u3002
<span class="token operator">*</span> \`AGE\` \u663E\u793A\u5E94\u7528\u7A0B\u5E8F\u8FD0\u884C\u7684\u65F6\u95F4\u91CF\u3002

<span class="token comment"># \u67E5\u770Bpod</span>
$ kubectl <span class="token operator">-</span>n demo get po
NAME READY STATUS RESTARTS AGE
myblog-7c96c9f76b-qbbg7 1/1 Running 0 109s
mysql-85f4f65f99-w6jkj 1/1 Running 0 2m28s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="\u526F\u672C\u4FDD\u969C\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#\u526F\u672C\u4FDD\u969C\u673A\u5236" aria-hidden="true">#</a> \u526F\u672C\u4FDD\u969C\u673A\u5236</h6><p>controller\u5B9E\u65F6\u68C0\u6D4Bpod\u72B6\u6001\uFF0C\u5E76\u4FDD\u969C\u526F\u672C\u6570\u4E00\u76F4\u5904\u4E8E\u671F\u671B\u7684\u503C\u3002</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment">## \u5220\u9664pod\uFF0C\u89C2\u5BDFpod\u72B6\u6001\u53D8\u5316</span>
$ kubectl <span class="token operator">-</span>n demo delete pod myblog-7c96c9f76b-qbbg7

<span class="token comment"># \u89C2\u5BDFpod</span>
$ kubectl get pods <span class="token operator">-</span>o wide

<span class="token comment">## \u8BBE\u7F6E\u4E24\u4E2A\u526F\u672C, \u6216\u8005\u901A\u8FC7kubectl -n demo edit deploy myblog\u7684\u65B9\u5F0F\uFF0C\u6700\u597D\u901A\u8FC7\u4FEE\u6539\u6587\u4EF6\uFF0C\u7136\u540Eapply\u7684\u65B9\u5F0F\uFF0C\u8FD9\u6837yaml\u6587\u4EF6\u53EF\u4EE5\u4FDD\u6301\u540C\u6B65</span>
$ kubectl <span class="token operator">-</span>n demo scale deploy myblog <span class="token operator">--</span>replicas=2
deployment<span class="token punctuation">.</span>extensions/myblog scaled

<span class="token comment"># \u89C2\u5BDFpod</span>
$ kubectl get pods <span class="token operator">-</span>o wide
NAME READY STATUS RESTARTS AGE
myblog-7c96c9f76b-qbbg7 1/1 Running 0 11m
myblog-7c96c9f76b-s6brm 1/1 Running 0 55s
mysql-85f4f65f99-w6jkj 1/1 Running 0 11m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="pod\u9A71\u9010\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#pod\u9A71\u9010\u7B56\u7565" aria-hidden="true">#</a> Pod\u9A71\u9010\u7B56\u7565</h6><p>K8S \u6709\u4E2A\u7279\u8272\u529F\u80FD\u53EB pod eviction\uFF0C\u5B83\u5728\u67D0\u4E9B\u573A\u666F\u4E0B\u5982\u8282\u70B9 NotReady\uFF0C\u6216\u8005\u8D44\u6E90\u4E0D\u8DB3\u65F6\uFF0C\u628A pod \u9A71\u9010\u81F3\u5176\u5B83\u8282\u70B9\uFF0C\u8FD9\u4E5F\u662F\u51FA\u4E8E\u4E1A\u52A1\u4FDD\u62A4\u7684\u89D2\u5EA6\u53BB\u8003\u8651\u7684\u3002</p><ol><li>Kube-controller-manager: \u5468\u671F\u6027\u68C0\u67E5\u6240\u6709\u8282\u70B9\u72B6\u6001\uFF0C\u5F53\u8282\u70B9\u5904\u4E8E NotReady \u72B6\u6001\u8D85\u8FC7\u4E00\u6BB5\u65F6\u95F4\u540E\uFF0C\u9A71\u9010\u8BE5\u8282\u70B9\u4E0A\u6240\u6709 pod\u3002\u505C\u6389kubelet</li></ol><ul><li><code>pod-eviction-timeout</code>\uFF1ANotReady \u72B6\u6001\u8282\u70B9\u8D85\u8FC7\u8BE5\u65F6\u95F4\u540E\uFF0C\u6267\u884C\u9A71\u9010\uFF0C\u9ED8\u8BA4 5 min</li></ul><ol start="2"><li>Kubelet: \u5468\u671F\u6027\u68C0\u67E5\u672C\u8282\u70B9\u8D44\u6E90\uFF0C\u5F53\u8D44\u6E90\u4E0D\u8DB3\u65F6\uFF0C\u6309\u7167\u4F18\u5148\u7EA7\u9A71\u9010\u90E8\u5206 pod</li></ol><ul><li><code>memory.available</code>\uFF1A\u8282\u70B9\u53EF\u7528\u5185\u5B58</li><li><code>nodefs.available</code>\uFF1A\u8282\u70B9\u6839\u76D8\u53EF\u7528\u5B58\u50A8\u7A7A\u95F4</li><li><code>nodefs.inodesFree</code>\uFF1A\u8282\u70B9inodes\u53EF\u7528\u6570\u91CF</li><li><code>imagefs.available</code>\uFF1A\u955C\u50CF\u5B58\u50A8\u76D8\u7684\u53EF\u7528\u7A7A\u95F4</li><li><code>imagefs.inodesFree</code>\uFF1A\u955C\u50CF\u5B58\u50A8\u76D8\u7684inodes\u53EF\u7528\u6570\u91CF</li></ul><h6 id="\u670D\u52A1\u66F4\u65B0" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u66F4\u65B0" aria-hidden="true">#</a> \u670D\u52A1\u66F4\u65B0</h6><p>\u4FEE\u6539dockerfile\uFF0C\u91CD\u65B0\u6253tag\u6A21\u62DF\u670D\u52A1\u66F4\u65B0\u3002</p><p>\u66F4\u65B0\u65B9\u5F0F\uFF1A</p><ul><li>\u4FEE\u6539yaml\u6587\u4EF6\uFF0C\u4F7F\u7528<code>kubectl -n demo apply -f deploy-myblog.yaml</code>\u6765\u5E94\u7528\u66F4\u65B0</li><li><code>kubectl -n demo edit deploy myblog</code>\u5728\u7EBF\u66F4\u65B0</li><li><code>kubectl set image deploy myblog myblog=172.21.32.6:5000/myblog:v2 --record</code></li></ul><p>\u4FEE\u6539\u6587\u4EF6\u6D4B\u8BD5\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ vi mybolg/blog/template/index<span class="token punctuation">.</span>html

$ docker build <span class="token punctuation">.</span> <span class="token operator">-</span>t 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/myblog:v2 <span class="token operator">-</span>f Dockerfile_optimized
$ docker push 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/myblog:v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="\u66F4\u65B0\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#\u66F4\u65B0\u7B56\u7565" aria-hidden="true">#</a> \u66F4\u65B0\u7B56\u7565</h6><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment">#\u6307\u5B9APod\u526F\u672C\u6570</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span> <span class="token comment">#\u6307\u5B9APod\u7684\u9009\u62E9\u5668</span>
<span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">strategy</span><span class="token punctuation">:</span>
<span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
<span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> 25%
<span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> 25%
<span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate <span class="token comment">#\u6307\u5B9A\u66F4\u65B0\u65B9\u5F0F\u4E3A\u6EDA\u52A8\u66F4\u65B0\uFF0C\u9ED8\u8BA4\u7B56\u7565\uFF0C\u901A\u8FC7get deploy yaml\u67E5\u770B</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7B56\u7565\u63A7\u5236\uFF1A</p><ul><li>maxSurge\uFF1A\u6700\u5927\u6FC0\u589E\u6570, \u6307\u66F4\u65B0\u8FC7\u7A0B\u4E2D, \u6700\u591A\u53EF\u4EE5\u6BD4replicas\u9884\u5148\u8BBE\u5B9A\u503C\u591A\u51FA\u7684pod\u6570\u91CF, \u53EF\u4EE5\u4E3A\u56FA\u5B9A\u503C\u6216\u767E\u5206\u6BD4,\u9ED8\u8BA4\u4E3Adesired Pods\u6570\u768425%\u3002\u8BA1\u7B97\u65F6\u5411\u4E0A\u53D6\u6574(\u6BD4\u59823.4\uFF0C\u53D64)\uFF0C\u66F4\u65B0\u8FC7\u7A0B\u4E2D\u6700\u591A\u4F1A\u6709replicas + maxSurge\u4E2Apod</li><li>maxUnavailable\uFF1A \u6307\u66F4\u65B0\u8FC7\u7A0B\u4E2D, \u6700\u591A\u6709\u51E0\u4E2Apod\u5904\u4E8E\u65E0\u6CD5\u670D\u52A1\u72B6\u6001 , \u53EF\u4EE5\u4E3A\u56FA\u5B9A\u503C\u6216\u767E\u5206\u6BD4\uFF0C\u9ED8\u8BA4\u4E3Adesired Pods\u6570\u768425%\u3002\u8BA1\u7B97\u65F6\u5411\u4E0B\u53D6\u6574(\u6BD4\u59823.6\uFF0C\u53D63)</li></ul><p><em>\u5728Deployment rollout\u65F6\uFF0C\u9700\u8981\u4FDD\u8BC1Available(Ready) Pods\u6570\u4E0D\u4F4E\u4E8E desired pods number - maxUnavailable; \u4FDD\u8BC1\u6240\u6709\u7684\u975E\u5F02\u5E38\u72B6\u6001Pods\u6570\u4E0D\u591A\u4E8E desired pods number + maxSurge</em>\u3002</p><p>\u4EE5myblog\u4E3A\u4F8B\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u7684\u7B56\u7565\uFF0C\u66F4\u65B0\u8FC7\u7A0B:</p><ol><li>maxSurge 25%\uFF0C2\u4E2A\u5B9E\u4F8B\uFF0C\u5411\u4E0A\u53D6\u6574\uFF0C\u5219maxSurge\u4E3A1\uFF0C\u610F\u5473\u7740\u6700\u591A\u53EF\u4EE5\u67092+1=3\u4E2APod\uFF0C\u90A3\u4E48\u6B64\u65F6\u4F1A\u65B0\u521B\u5EFA1\u4E2AReplicaSet\uFF0CRS-new\uFF0C\u628A\u526F\u672C\u6570\u7F6E\u4E3A1\uFF0C\u6B64\u65F6\u5462\uFF0C\u526F\u672C\u63A7\u5236\u5668\u5C31\u53BB\u521B\u5EFA\u8FD9\u4E2A\u65B0\u7684Pod</li><li>\u540C\u65F6\uFF0CmaxUnavailable\u662F25%\uFF0C\u526F\u672C\u65702*25%\uFF0C\u5411\u4E0B\u53D6\u6574\uFF0C\u5219\u4E3A0\uFF0C\u610F\u5473\u7740\uFF0C\u6EDA\u52A8\u66F4\u65B0\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u4E0D\u80FD\u6709\u5C11\u4E8E2\u4E2A\u53EF\u7528\u7684Pod\uFF0C\u56E0\u6B64\uFF0C\u65E7\u7684Replica\uFF08RS-old\uFF09\u4F1A\u5148\u4FDD\u6301\u4E0D\u52A8\uFF0C\u7B49RS-new\u7BA1\u7406\u7684Pod\u72B6\u6001Ready\u540E\uFF0C\u6B64\u65F6\u5DF2\u7ECF\u67093\u4E2AReady\u72B6\u6001\u7684Pod\u4E86\uFF0C\u90A3\u4E48\u7531\u4E8E\u53EA\u8981\u4FDD\u8BC1\u67092\u4E2A\u53EF\u7528\u7684Pod\u5373\u53EF\uFF0C\u56E0\u6B64\uFF0CRS-old\u7684\u526F\u672C\u6570\u4F1A\u67092\u4E2A\u53D8\u62101\u4E2A\uFF0C\u6B64\u65F6\uFF0C\u4F1A\u5220\u6389\u4E00\u4E2A\u65E7\u7684Pod</li><li>\u5220\u6389\u65E7\u7684Pod\u7684\u65F6\u5019\uFF0C\u7531\u4E8E\u603B\u7684Pod\u6570\u91CF\u53C8\u53D8\u62102\u4E2A\u4E86\uFF0C\u56E0\u6B64\uFF0C\u8DDD\u79BB\u6700\u5927\u76843\u4E2A\u8FD8\u67091\u4E2APod\u53EF\u4EE5\u521B\u5EFA\uFF0C\u6240\u4EE5\uFF0CRS-new\u628A\u7BA1\u7406\u7684\u526F\u672C\u6570\u75311\u6539\u62102\uFF0C\u6B64\u65F6\u53C8\u4F1A\u521B\u5EFA1\u4E2A\u65B0\u7684Pod\uFF0C\u7B49RS-new\u7BA1\u7406\u4E862\u4E2APod\u90FDready\u540E\uFF0C\u90A3\u4E48\u5C31\u53EF\u4EE5\u628ARS-old\u7684\u526F\u672C\u6570\u75311\u7F6E\u4E3A0\u4E86\uFF0C\u8FD9\u6837\u5C31\u5B8C\u6210\u4E86\u6EDA\u52A8\u66F4\u65B0</li></ol><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment">#\u67E5\u770B\u6EDA\u52A8\u66F4\u65B0\u4E8B\u4EF6</span>
$ kubectl <span class="token operator">-</span>n demo describe deploy myblog
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
Events:
<span class="token function">Type</span> Reason Age <span class="token keyword">From</span> Message
<span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
Normal ScalingReplicaSet 11s deployment-controller Scaled up replica <span class="token function">set</span> myblog-6cf56fc848 to 1
Normal ScalingReplicaSet 11s deployment-controller Scaled down replica <span class="token function">set</span> myblog-6fdcf98f9 to 1
Normal ScalingReplicaSet 11s deployment-controller Scaled up replica <span class="token function">set</span> myblog-6cf56fc848 to 2
Normal ScalingReplicaSet 6s deployment-controller Scaled down replica <span class="token function">set</span> myblog-6fdcf98f9 to 0
$ kubectl get rs
NAME DESIRED CURRENT READY AGE
myblog-6cf56fc848 2 2 2 16h
myblog-6fdcf98f9 0 0 0 16h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="\u670D\u52A1\u56DE\u6EDA" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u56DE\u6EDA" aria-hidden="true">#</a> \u670D\u52A1\u56DE\u6EDA</h6><p>\u901A\u8FC7\u6EDA\u52A8\u5347\u7EA7\u7684\u7B56\u7565\u53EF\u4EE5\u5E73\u6ED1\u7684\u5347\u7EA7Deployment\uFF0C\u82E5\u5347\u7EA7\u51FA\u73B0\u95EE\u9898\uFF0C\u9700\u8981\u6700\u5FEB\u4E14\u6700\u597D\u7684\u65B9\u5F0F\u56DE\u9000\u5230\u4E0A\u4E00\u6B21\u80FD\u591F\u63D0\u4F9B\u6B63\u5E38\u5DE5\u4F5C\u7684\u7248\u672C\u3002\u4E3A\u6B64K8S\u63D0\u4F9B\u4E86\u56DE\u6EDA\u673A\u5236\u3002</p><p><strong>revision</strong>\uFF1A\u66F4\u65B0\u5E94\u7528\u65F6\uFF0CK8S\u90FD\u4F1A\u8BB0\u5F55\u5F53\u524D\u7684\u7248\u672C\u53F7\uFF0C\u5373\u4E3Arevision\uFF0C\u5F53\u5347\u7EA7\u51FA\u73B0\u95EE\u9898\u65F6\uFF0C\u53EF\u901A\u8FC7\u56DE\u6EDA\u5230\u67D0\u4E2A\u7279\u5B9A\u7684revision\uFF0C\u9ED8\u8BA4\u914D\u7F6E\u4E0B\uFF0CK8S\u53EA\u4F1A\u4FDD\u7559\u6700\u8FD1\u7684\u51E0\u4E2Arevision\uFF0C\u53EF\u4EE5\u901A\u8FC7Deployment\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684spec.revisionHistoryLimit\u5C5E\u6027\u589E\u52A0revision\u6570\u91CF\uFF0C\u9ED8\u8BA4\u662F10\u3002</p><p>\u67E5\u770B\u5F53\u524D\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n demo rollout history deploy myblog <span class="token comment">##CHANGE-CAUSE\u4E3A\u7A7A</span>
$ kubectl delete <span class="token operator">-</span>f deploy-myblog<span class="token punctuation">.</span>yaml <span class="token comment">## \u65B9\u4FBF\u6F14\u793A\u5230\u5177\u4F53\u6548\u679C\uFF0C\u5220\u6389\u5DF2\u6709deployment</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BB0\u5F55\u56DE\u6EDA\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f deploy-myblog<span class="token punctuation">.</span>yaml <span class="token operator">--</span>record

$ kubectl <span class="token operator">-</span>n demo <span class="token function">set</span> image deploy myblog myblog=172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/myblog:v2 <span class="token operator">--</span>record=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770Bdeployment\u66F4\u65B0\u5386\u53F2\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n demo rollout history deploy myblog
deployment<span class="token punctuation">.</span>extensions/myblog
REVISION CHANGE-CAUSE
1 kubectl create <span class="token operator">--</span>filename=deploy-myblog<span class="token punctuation">.</span>yaml <span class="token operator">--</span>record=true
2 kubectl <span class="token function">set</span> image deploy myblog myblog=172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/demo/myblog:v1 <span class="token operator">--</span>record=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u56DE\u6EDA\u5230\u5177\u4F53\u7684REVISION:</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n demo rollout undo deploy myblog <span class="token operator">--</span>to-revision=1
deployment<span class="token punctuation">.</span>extensions/myblog rolled back

<span class="token comment"># \u8BBF\u95EE\u5E94\u7528\u6D4B\u8BD5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kubernetes\u8C03\u5EA6-\u5F55\u5C4F" tabindex="-1"><a class="header-anchor" href="#kubernetes\u8C03\u5EA6-\u5F55\u5C4F" aria-hidden="true">#</a> Kubernetes\u8C03\u5EA6 \u5F55\u5C4F\uFF01\uFF01\uFF01</h5><h6 id="\u4E3A\u4F55\u8981\u63A7\u5236pod\u5E94\u8BE5\u5982\u4F55\u8C03\u5EA6" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4F55\u8981\u63A7\u5236pod\u5E94\u8BE5\u5982\u4F55\u8C03\u5EA6" aria-hidden="true">#</a> \u4E3A\u4F55\u8981\u63A7\u5236Pod\u5E94\u8BE5\u5982\u4F55\u8C03\u5EA6</h6><ul><li>\u96C6\u7FA4\u4E2D\u6709\u4E9B\u673A\u5668\u7684\u914D\u7F6E\u9AD8\uFF08SSD\uFF0C\u66F4\u597D\u7684\u5185\u5B58\u7B49\uFF09\uFF0C\u6211\u4EEC\u5E0C\u671B\u6838\u5FC3\u7684\u670D\u52A1\uFF08\u6BD4\u5982\u8BF4\u6570\u636E\u5E93\uFF09\u8FD0\u884C\u5728\u4E0A\u9762</li><li>\u67D0\u4E24\u4E2A\u670D\u52A1\u7684\u7F51\u7EDC\u4F20\u8F93\u5F88\u9891\u7E41\uFF0C\u6211\u4EEC\u5E0C\u671B\u5B83\u4EEC\u6700\u597D\u5728\u540C\u4E00\u53F0\u673A\u5668\u4E0A</li><li>......</li></ul><h6 id="nodeselector" tabindex="-1"><a class="header-anchor" href="#nodeselector" aria-hidden="true">#</a> NodeSelector</h6><p><code>label</code>\u662F<code>kubernetes</code>\u4E2D\u4E00\u4E2A\u975E\u5E38\u91CD\u8981\u7684\u6982\u5FF5\uFF0C\u7528\u6237\u53EF\u4EE5\u975E\u5E38\u7075\u6D3B\u7684\u5229\u7528 label \u6765\u7BA1\u7406\u96C6\u7FA4\u4E2D\u7684\u8D44\u6E90\uFF0CPOD \u7684\u8C03\u5EA6\u53EF\u4EE5\u6839\u636E\u8282\u70B9\u7684 label \u8FDB\u884C\u7279\u5B9A\u7684\u90E8\u7F72\u3002</p><p>\u67E5\u770B\u8282\u70B9\u7684label\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl get nodes <span class="token operator">--</span><span class="token function">show-labels</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4E3A\u8282\u70B9\u6253label\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl label node k8s-master disktype=ssd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5F53 node \u88AB\u6253\u4E0A\u4E86\u76F8\u5173\u6807\u7B7E\u540E\uFF0C\u5728\u8C03\u5EA6\u7684\u65F6\u5019\u5C31\u53EF\u4EE5\u4F7F\u7528\u8FD9\u4E9B\u6807\u7B7E\u4E86\uFF0C\u53EA\u9700\u8981\u5728spec \u5B57\u6BB5\u4E2D\u6DFB\u52A0<code>nodeSelector</code>\u5B57\u6BB5\uFF0C\u91CC\u9762\u662F\u6211\u4EEC\u9700\u8981\u88AB\u8C03\u5EA6\u7684\u8282\u70B9\u7684 label\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u58F0\u660Epod\u7684\u7F51\u7EDC\u6A21\u5F0F\u4E3Ahost\u6A21\u5F0F\uFF0C\u6548\u679C\u901Adocker run --net=host</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span> <span class="token comment"># \u4F7F\u7528\u8282\u70B9\u9009\u62E9\u5668\u5C06Pod\u8C03\u5EA6\u5230\u6307\u5B9Alabel\u7684\u8282\u70B9</span>
<span class="token key atrule">component</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/demo/mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="nodeaffinity" tabindex="-1"><a class="header-anchor" href="#nodeaffinity" aria-hidden="true">#</a> nodeAffinity</h6><p>\u8282\u70B9\u4EB2\u548C\u6027 \uFF0C \u6BD4\u4E0A\u9762\u7684<code>nodeSelector</code>\u66F4\u52A0\u7075\u6D3B\uFF0C\u5B83\u53EF\u4EE5\u8FDB\u884C\u4E00\u4E9B\u7B80\u5355\u7684\u903B\u8F91\u7EC4\u5408\uFF0C\u4E0D\u53EA\u662F\u7B80\u5355\u7684\u76F8\u7B49\u5339\u914D \u3002\u5206\u4E3A\u4E24\u79CD\uFF0C\u8F6F\u7B56\u7565\u548C\u786C\u7B56\u7565\u3002</p><p>preferredDuringSchedulingIgnoredDuringExecution\uFF1A\u8F6F\u7B56\u7565\uFF0C\u5982\u679C\u4F60\u6CA1\u6709\u6EE1\u8DB3\u8C03\u5EA6\u8981\u6C42\u7684\u8282\u70B9\u7684\u8BDD\uFF0CPod\u5C31\u4F1A\u5FFD\u7565\u8FD9\u6761\u89C4\u5219\uFF0C\u7EE7\u7EED\u5B8C\u6210\u8C03\u5EA6\u8FC7\u7A0B\uFF0C\u8BF4\u767D\u4E86\u5C31\u662F\u6EE1\u8DB3\u6761\u4EF6\u6700\u597D\u4E86\uFF0C\u6CA1\u6709\u6EE1\u8DB3\u5C31\u5FFD\u7565\u6389\u7684\u7B56\u7565\u3002</p><p>requiredDuringSchedulingIgnoredDuringExecution \uFF1A \u786C\u7B56\u7565\uFF0C\u5982\u679C\u6CA1\u6709\u6EE1\u8DB3\u6761\u4EF6\u7684\u8282\u70B9\u7684\u8BDD\uFF0C\u5C31\u4E0D\u65AD\u91CD\u8BD5\u76F4\u5230\u6EE1\u8DB3\u6761\u4EF6\u4E3A\u6B62\uFF0C\u7B80\u5355\u8BF4\u5C31\u662F\u4F60\u5FC5\u987B\u6EE1\u8DB3\u6211\u7684\u8981\u6C42\uFF0C\u4E0D\u7136\u6211\u5C31\u4E0D\u4F1A\u8C03\u5EA6Pod\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment">#\u8981\u6C42 Pod \u4E0D\u80FD\u8FD0\u884C\u5728128\u548C132\u4E24\u4E2A\u8282\u70B9\u4E0A\uFF0C\u5982\u679C\u6709\u4E2A\u8282\u70B9\u6EE1\u8DB3disktype=ssd\u7684\u8BDD\u5C31\u4F18\u5148\u8C03\u5EA6\u5230\u8FD9\u4E2A\u8282\u70B9\u4E0A</span>
<span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> demo
<span class="token key atrule">image</span><span class="token punctuation">:</span> 172.21.32.6<span class="token punctuation">:</span>5000/demo/myblog
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">affinity</span><span class="token punctuation">:</span>
<span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
<span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
<span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> kubernetes.io/hostname
<span class="token key atrule">operator</span><span class="token punctuation">:</span> NotIn
<span class="token key atrule">values</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> 192.168.136.128
<span class="token punctuation">-</span> 192.168.136.132
<span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token key atrule">preference</span><span class="token punctuation">:</span>
<span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> disktype
<span class="token key atrule">operator</span><span class="token punctuation">:</span> In
<span class="token key atrule">values</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> ssd
<span class="token punctuation">-</span> sas
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u7684\u5339\u914D\u903B\u8F91\u662F label \u7684\u503C\u5728\u67D0\u4E2A\u5217\u8868\u4E2D\uFF0C\u73B0\u5728<code>Kubernetes</code>\u63D0\u4F9B\u7684\u64CD\u4F5C\u7B26\u6709\u4E0B\u9762\u7684\u51E0\u79CD\uFF1A</p><ul><li>In\uFF1Alabel \u7684\u503C\u5728\u67D0\u4E2A\u5217\u8868\u4E2D</li><li>NotIn\uFF1Alabel \u7684\u503C\u4E0D\u5728\u67D0\u4E2A\u5217\u8868\u4E2D</li><li>Gt\uFF1Alabel \u7684\u503C\u5927\u4E8E\u67D0\u4E2A\u503C</li><li>Lt\uFF1Alabel \u7684\u503C\u5C0F\u4E8E\u67D0\u4E2A\u503C</li><li>Exists\uFF1A\u67D0\u4E2A label \u5B58\u5728</li><li>DoesNotExist\uFF1A\u67D0\u4E2A label \u4E0D\u5B58\u5728</li></ul><p><em>\u5982\u679CnodeSelectorTerms\u4E0B\u9762\u6709\u591A\u4E2A\u9009\u9879\u7684\u8BDD\uFF0C\u6EE1\u8DB3\u4EFB\u4F55\u4E00\u4E2A\u6761\u4EF6\u5C31\u53EF\u4EE5\u4E86\uFF1B\u5982\u679CmatchExpressions\u6709\u591A\u4E2A\u9009\u9879\u7684\u8BDD\uFF0C\u5219\u5FC5\u987B\u540C\u65F6\u6EE1\u8DB3\u8FD9\u4E9B\u6761\u4EF6\u624D\u80FD\u6B63\u5E38\u8C03\u5EA6 Pod</em></p><h6 id="\u6C61\u70B9-taints-\u4E0E\u5BB9\u5FCD-tolerations" tabindex="-1"><a class="header-anchor" href="#\u6C61\u70B9-taints-\u4E0E\u5BB9\u5FCD-tolerations" aria-hidden="true">#</a> \u6C61\u70B9\uFF08Taints\uFF09\u4E0E\u5BB9\u5FCD\uFF08tolerations\uFF09</h6><p>\u5BF9\u4E8E<code>nodeAffinity</code>\u65E0\u8BBA\u662F\u786C\u7B56\u7565\u8FD8\u662F\u8F6F\u7B56\u7565\u65B9\u5F0F\uFF0C\u90FD\u662F\u8C03\u5EA6 Pod \u5230\u9884\u671F\u8282\u70B9\u4E0A\uFF0C\u800C<code>Taints</code>\u6070\u597D\u4E0E\u4E4B\u76F8\u53CD\uFF0C\u5982\u679C\u4E00\u4E2A\u8282\u70B9\u6807\u8BB0\u4E3A Taints \uFF0C\u9664\u975E Pod \u4E5F\u88AB\u6807\u8BC6\u4E3A\u53EF\u4EE5\u5BB9\u5FCD\u6C61\u70B9\u8282\u70B9\uFF0C\u5426\u5219\u8BE5 Taints \u8282\u70B9\u4E0D\u4F1A\u88AB\u8C03\u5EA6Pod\u3002</p><p>Taints(\u6C61\u70B9)\u662FNode\u7684\u4E00\u4E2A\u5C5E\u6027\uFF0C\u8BBE\u7F6E\u4E86Taints(\u6C61\u70B9)\u540E\uFF0C\u56E0\u4E3A\u6709\u4E86\u6C61\u70B9\uFF0C\u6240\u4EE5Kubernetes\u662F\u4E0D\u4F1A\u5C06Pod\u8C03\u5EA6\u5230\u8FD9\u4E2ANode\u4E0A\u7684\u3002\u4E8E\u662FKubernetes\u5C31\u7ED9Pod\u8BBE\u7F6E\u4E86\u4E2A\u5C5E\u6027Tolerations(\u5BB9\u5FCD)\uFF0C\u53EA\u8981Pod\u80FD\u591F\u5BB9\u5FCDNode\u4E0A\u7684\u6C61\u70B9\uFF0C\u90A3\u4E48Kubernetes\u5C31\u4F1A\u5FFD\u7565Node\u4E0A\u7684\u6C61\u70B9\uFF0C\u5C31\u80FD\u591F(\u4E0D\u662F\u5FC5\u987B)\u628APod\u8C03\u5EA6\u8FC7\u53BB\u3002</p><p>\u6BD4\u5982\u7528\u6237\u5E0C\u671B\u628A Master \u8282\u70B9\u4FDD\u7559\u7ED9 Kubernetes \u7CFB\u7EDF\u7EC4\u4EF6\u4F7F\u7528\uFF0C\u6216\u8005\u628A\u4E00\u7EC4\u5177\u6709\u7279\u6B8A\u8D44\u6E90\u9884\u7559\u7ED9\u67D0\u4E9B Pod\uFF0C\u5219\u6C61\u70B9\u5C31\u5F88\u6709\u7528\u4E86\uFF0CPod \u4E0D\u4F1A\u518D\u88AB\u8C03\u5EA6\u5230 taint \u6807\u8BB0\u8FC7\u7684\u8282\u70B9\u3002taint \u6807\u8BB0\u8282\u70B9\u4E3E\u4F8B\u5982\u4E0B\uFF1A</p><p>\u8BBE\u7F6E\u6C61\u70B9\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl taint node <span class="token namespace">[node_name]</span> key=value:<span class="token namespace">[effect]</span>
\u5176\u4E2D<span class="token namespace">[effect]</span> \u53EF\u53D6\u503C\uFF1A <span class="token punctuation">[</span> NoSchedule <span class="token punctuation">|</span> PreferNoSchedule <span class="token punctuation">|</span> NoExecute <span class="token punctuation">]</span>
NoSchedule\uFF1A\u4E00\u5B9A\u4E0D\u80FD\u88AB\u8C03\u5EA6\u3002
PreferNoSchedule\uFF1A\u5C3D\u91CF\u4E0D\u8981\u8C03\u5EA6\u3002
NoExecute\uFF1A\u4E0D\u4EC5\u4E0D\u4F1A\u8C03\u5EA6\uFF0C\u8FD8\u4F1A\u9A71\u9010Node\u4E0A\u5DF2\u6709\u7684Pod\u3002
\u793A\u4F8B\uFF1Akubectl taint node k8s-master smoke=true:NoSchedule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53BB\u9664\u6C61\u70B9\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>\u53BB\u9664\u6307\u5B9Akey\u53CA\u5176effect\uFF1A
kubectl taint nodes <span class="token namespace">[node_name]</span> key:<span class="token namespace">[effect]</span><span class="token operator">-</span> <span class="token comment">#\u8FD9\u91CC\u7684key\u4E0D\u7528\u6307\u5B9Avalue</span>

\u53BB\u9664\u6307\u5B9Akey\u6240\u6709\u7684effect:
kubectl taint nodes node_name key-

\u793A\u4F8B\uFF1A
kubectl taint node k8s-master smoke=true:NoSchedule
kubectl taint node k8s-master smoke:NoExecute-
kubectl taint node k8s-master smoke-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6C61\u70B9\u6F14\u793A\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment">## \u7ED9k8s-slave1\u6253\u4E0A\u6C61\u70B9\uFF0Csmoke=true:NoSchedule</span>
$ kubectl taint node k8s-slave1 smoke=true:NoSchedule
$ kubectl taint node k8s-slave2 drunk=true:NoSchedule


<span class="token comment">## \u6269\u5BB9myblog\u7684Pod\uFF0C\u89C2\u5BDF\u65B0Pod\u7684\u8C03\u5EA6\u60C5\u51B5</span>
$ kuebctl <span class="token operator">-</span>n demo scale deploy myblog <span class="token operator">--</span>replicas=3
$ kubectl <span class="token operator">-</span>n demo get po <span class="token operator">-</span>w <span class="token comment">## pending</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Pod\u5BB9\u5FCD\u6C61\u70B9\u793A\u4F8B\uFF1A<code>myblog/deployment/deploy-myblog-taint.yaml</code></p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
spec:
containers:
<span class="token operator">-</span> name: demo
image: 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/demo/myblog
tolerations: <span class="token comment">#\u8BBE\u7F6E\u5BB9\u5FCD\u6027</span>
<span class="token operator">-</span> key: <span class="token string">&quot;smoke&quot;</span>
operator: <span class="token string">&quot;Equal&quot;</span> <span class="token comment">#\u5982\u679C\u64CD\u4F5C\u7B26\u4E3AExists\uFF0C\u90A3\u4E48value\u5C5E\u6027\u53EF\u7701\u7565,\u4E0D\u6307\u5B9Aoperator\uFF0C\u9ED8\u8BA4\u4E3AEqual</span>
value: <span class="token string">&quot;true&quot;</span>
effect: <span class="token string">&quot;NoSchedule&quot;</span>
<span class="token operator">-</span> key: <span class="token string">&quot;drunk&quot;</span>
operator: <span class="token string">&quot;Equal&quot;</span> <span class="token comment">#\u5982\u679C\u64CD\u4F5C\u7B26\u4E3AExists\uFF0C\u90A3\u4E48value\u5C5E\u6027\u53EF\u7701\u7565,\u4E0D\u6307\u5B9Aoperator\uFF0C\u9ED8\u8BA4\u4E3AEqual</span>
value: <span class="token string">&quot;true&quot;</span>
effect: <span class="token string">&quot;NoSchedule&quot;</span>
<span class="token comment">#\u610F\u601D\u662F\u8FD9\u4E2APod\u8981\u5BB9\u5FCD\u7684\u6709\u6C61\u70B9\u7684Node\u7684key\u662Fsmoke Equal true,\u6548\u679C\u662FNoSchedule\uFF0C</span>
<span class="token comment">#tolerations\u5C5E\u6027\u4E0B\u5404\u503C\u5FC5\u987B\u4F7F\u7528\u5F15\u53F7\uFF0C\u5BB9\u5FCD\u7684\u503C\u90FD\u662F\u8BBE\u7F6ENode\u7684taints\u65F6\u7ED9\u7684\u503C\u3002</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl apply <span class="token operator">-</span>f deploy-myblog-taint<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>spec:
containers:
<span class="token operator">-</span> name: demo
image: 172<span class="token punctuation">.</span>21<span class="token punctuation">.</span>32<span class="token punctuation">.</span>6:5000/demo/myblog
tolerations:
<span class="token operator">-</span> operator: <span class="token string">&quot;Exists&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kubernetes\u670D\u52A1\u8BBF\u95EE\u4E4Bservice-\u5F55\u5C4F" tabindex="-1"><a class="header-anchor" href="#kubernetes\u670D\u52A1\u8BBF\u95EE\u4E4Bservice-\u5F55\u5C4F" aria-hidden="true">#</a> Kubernetes\u670D\u52A1\u8BBF\u95EE\u4E4BService \u5F55\u5C4F\uFF01\uFF01\uFF01</h5><p>\u901A\u8FC7\u4EE5\u524D\u7684\u5B66\u4E60\uFF0C\u6211\u4EEC\u5DF2\u7ECF\u80FD\u591F\u901A\u8FC7Deployment\u6765\u521B\u5EFA\u4E00\u7EC4Pod\u6765\u63D0\u4F9B\u5177\u6709\u9AD8\u53EF\u7528\u6027\u7684\u670D\u52A1\u3002\u867D\u7136\u6BCF\u4E2APod\u90FD\u4F1A\u5206\u914D\u4E00\u4E2A\u5355\u72EC\u7684Pod IP\uFF0C\u7136\u800C\u5374\u5B58\u5728\u5982\u4E0B\u4E24\u4E2A\u95EE\u9898\uFF1A</p><ul><li>Pod IP\u4EC5\u4EC5\u662F\u96C6\u7FA4\u5185\u53EF\u89C1\u7684\u865A\u62DFIP\uFF0C\u5916\u90E8\u65E0\u6CD5\u8BBF\u95EE\u3002</li><li>Pod IP\u4F1A\u968F\u7740Pod\u7684\u9500\u6BC1\u800C\u6D88\u5931\uFF0C\u5F53ReplicaSet\u5BF9Pod\u8FDB\u884C\u52A8\u6001\u4F38\u7F29\u65F6\uFF0CPod IP\u53EF\u80FD\u968F\u65F6\u968F\u5730\u90FD\u4F1A\u53D8\u5316\uFF0C\u8FD9\u6837\u5BF9\u4E8E\u6211\u4EEC\u8BBF\u95EE\u8FD9\u4E2A\u670D\u52A1\u5E26\u6765\u4E86\u96BE\u5EA6\u3002</li></ul><h6 id="service-\u8D1F\u8F7D\u5747\u8861\u4E4Bcluster-ip" tabindex="-1"><a class="header-anchor" href="#service-\u8D1F\u8F7D\u5747\u8861\u4E4Bcluster-ip" aria-hidden="true">#</a> Service \u8D1F\u8F7D\u5747\u8861\u4E4BCluster IP</h6><p>service\u662F\u4E00\u7EC4pod\u7684\u670D\u52A1\u62BD\u8C61\uFF0C\u76F8\u5F53\u4E8E\u4E00\u7EC4pod\u7684LB\uFF0C\u8D1F\u8D23\u5C06\u8BF7\u6C42\u5206\u53D1\u7ED9\u5BF9\u5E94\u7684pod\u3002service\u4F1A\u4E3A\u8FD9\u4E2ALB\u63D0\u4F9B\u4E00\u4E2AIP\uFF0C\u4E00\u822C\u79F0\u4E3Acluster IP \u3002\u4F7F\u7528Service\u5BF9\u8C61\uFF0C\u901A\u8FC7selector\u8FDB\u884C\u6807\u7B7E\u9009\u62E9\uFF0C\u627E\u5230\u5BF9\u5E94\u7684Pod:</p><p><code>myblog/deployment/svc-myblog.yaml</code></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
<span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u64CD\u4F5C\u6F14\u793A\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment">## \u522B\u540D</span>
$ alias kd=<span class="token string">&#39;kubectl -n demo&#39;</span>

<span class="token comment">## \u521B\u5EFA\u670D\u52A1</span>
$ kd create <span class="token operator">-</span>f svc-myblog<span class="token punctuation">.</span>yaml
$ kd get po <span class="token operator">--</span><span class="token function">show-labels</span>
NAME READY STATUS RESTARTS AGE LABELS
myblog-5c97d79cdb-jn7km 1/1 Running 0 6m5s app=myblog
mysql-85f4f65f99-w6jkj 1/1 Running 0 176m app=mysql

$ kd get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
myblog ClusterIP 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93 &lt;none&gt; 80/TCP 7m50s

$ kd describe svc myblog
Name: myblog
Namespace: demo
Labels: &lt;none&gt;
Annotations: &lt;none&gt;
Selector: app=myblog
<span class="token function">Type</span>: ClusterIP
IP: 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93
Port: &lt;unset&gt; 80/TCP
TargetPort: 8002/TCP
Endpoints: 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>68:8002
Session Affinity: None
Events: &lt;none&gt;

<span class="token comment">## \u6269\u5BB9myblog\u670D\u52A1</span>
$ kd scale deploy myblog <span class="token operator">--</span>replicas=2
deployment<span class="token punctuation">.</span>extensions/myblog scaled

<span class="token comment">## \u518D\u6B21\u67E5\u770B</span>
$ kd describe svc myblog
Name: myblog
Namespace: demo
Labels: &lt;none&gt;
Annotations: &lt;none&gt;
Selector: app=myblog
<span class="token function">Type</span>: ClusterIP
IP: 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93
Port: &lt;unset&gt; 80/TCP
TargetPort: 8002/TCP
Endpoints: 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>68:8002<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>158:8002
Session Affinity: None
Events: &lt;none&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Service\u4E0EPod\u5982\u4F55\u5173\u8054:</p><p>service\u5BF9\u8C61\u521B\u5EFA\u7684\u540C\u65F6\uFF0C\u4F1A\u521B\u5EFA\u540C\u540D\u7684endpoints\u5BF9\u8C61\uFF0C\u82E5\u670D\u52A1\u8BBE\u7F6E\u4E86readinessProbe, \u5F53readinessProbe\u68C0\u6D4B\u5931\u8D25\u65F6\uFF0Cendpoints\u5217\u8868\u4E2D\u4F1A\u5254\u9664\u6389\u5BF9\u5E94\u7684pod_ip\uFF0C\u8FD9\u6837\u6D41\u91CF\u5C31\u4E0D\u4F1A\u5206\u53D1\u5230\u5065\u5EB7\u68C0\u6D4B\u5931\u8D25\u7684Pod\u4E2D</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kd get endpoints myblog
NAME ENDPOINTS AGE
myblog 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>68:8002<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>158:8002 7m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Service Cluster-IP\u5982\u4F55\u8BBF\u95EE:</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kd get svc myblog
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
myblog ClusterIP 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93 &lt;none&gt; 80/TCP 13m
$ curl 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93/blog/index/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E3Amysql\u670D\u52A1\u521B\u5EFAservice\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">ports</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
<span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">selector</span><span class="token punctuation">:</span>
<span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BBF\u95EEmysql\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kd get svc mysql
mysql ClusterIP 10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84 &lt;none&gt; 3306/TCP 3s
$ curl 10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84:3306
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u76EE\u524D\u4F7F\u7528hostNetwork\u90E8\u7F72\uFF0C\u901A\u8FC7\u5BBF\u4E3B\u673Aip+port\u8BBF\u95EE\uFF0C\u5F0A\u7AEF\uFF1A</p><ul><li>\u670D\u52A1\u4F7F\u7528hostNetwork\uFF0C\u4F7F\u5F97\u5BBF\u4E3B\u673A\u7684\u7AEF\u53E3\u5927\u91CF\u66B4\u6F0F\uFF0C\u5B58\u5728\u5B89\u5168\u9690\u60A3</li><li>\u5BB9\u6613\u5F15\u53D1\u7AEF\u53E3\u51B2\u7A81</li></ul><p>\u670D\u52A1\u5747\u5C5E\u4E8Ek8s\u96C6\u7FA4\uFF0C\u5C3D\u53EF\u80FD\u4F7F\u7528k8s\u7684\u7F51\u7EDC\u8BBF\u95EE\uFF0C\u56E0\u6B64\u53EF\u4EE5\u5BF9\u76EE\u524Dmyblog\u8BBF\u95EEmysql\u7684\u65B9\u5F0F\u505A\u6539\u9020\uFF1A</p><ul><li>\u4E3Amysql\u521B\u5EFA\u4E00\u4E2A\u56FA\u5B9AclusterIp\u7684Service\uFF0C\u628AclusterIp\u914D\u7F6E\u5728myblog\u7684\u73AF\u5883\u53D8\u91CF\u4E2D</li><li>\u5229\u7528\u96C6\u7FA4\u670D\u52A1\u53D1\u73B0\u7684\u80FD\u529B\uFF0C\u7EC4\u4EF6\u4E4B\u95F4\u901A\u8FC7service name\u6765\u8BBF\u95EE</li></ul><h6 id="\u670D\u52A1\u53D1\u73B0" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1\u53D1\u73B0" aria-hidden="true">#</a> \u670D\u52A1\u53D1\u73B0</h6><p>\u5728k8s\u96C6\u7FA4\u4E2D\uFF0C\u7EC4\u4EF6\u4E4B\u95F4\u53EF\u4EE5\u901A\u8FC7\u5B9A\u4E49\u7684Service\u540D\u79F0\u5B9E\u73B0\u901A\u4FE1\u3002</p><p>\u6F14\u793A\u670D\u52A1\u53D1\u73B0\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment">## \u6F14\u793A\u601D\u8DEF\uFF1A\u5728myblog\u7684\u5BB9\u5668\u4E2D\u76F4\u63A5\u901A\u8FC7service\u540D\u79F0\u8BBF\u95EE\u670D\u52A1\uFF0C\u89C2\u5BDF\u662F\u5426\u53EF\u4EE5\u8BBF\u95EE\u901A</span>

<span class="token comment"># \u5148\u67E5\u770B\u670D\u52A1</span>
$ kd get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
myblog ClusterIP 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93 &lt;none&gt; 80/TCP 59m
mysql ClusterIP 10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84 &lt;none&gt; 3306/TCP 35m

<span class="token comment"># \u8FDB\u5165myblog\u5BB9\u5668</span>
$ kd exec <span class="token operator">-</span>ti myblog-5c97d79cdb-j485f bash
<span class="token namespace">[root@myblog-5c97d79cdb-j485f myblog]</span><span class="token comment"># curl mysql:3306</span>
5<span class="token punctuation">.</span>7<span class="token punctuation">.</span>29 <span class="token punctuation">)</span>\u2192 <span class="token punctuation">(</span>mysql_native_password ot packets out of order
<span class="token namespace">[root@myblog-5c97d79cdb-j485f myblog]</span><span class="token comment"># curl myblog/blog/index/</span>
\u6211\u7684\u535A\u5BA2\u5217\u8868

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u867D\u7136podip\u548Cclusterip\u90FD\u4E0D\u56FA\u5B9A\uFF0C\u4F46\u662Fservice name\u662F\u56FA\u5B9A\u7684\uFF0C\u800C\u4E14\u5177\u6709\u5B8C\u5168\u7684\u8DE8\u96C6\u7FA4\u53EF\u79FB\u690D\u6027\uFF0C\u56E0\u6B64\u7EC4\u4EF6\u4E4B\u95F4\u8C03\u7528\u7684\u540C\u65F6\uFF0C\u5B8C\u5168\u53EF\u4EE5\u901A\u8FC7service name\u53BB\u901A\u4FE1\uFF0C\u8FD9\u6837\u907F\u514D\u4E86\u5927\u91CF\u7684ip\u7EF4\u62A4\u6210\u672C\uFF0C\u4F7F\u5F97\u670D\u52A1\u7684yaml\u6A21\u677F\u66F4\u52A0\u7B80\u5355\u3002\u56E0\u6B64\u53EF\u4EE5\u5BF9mysql\u548Cmyblog\u7684\u90E8\u7F72\u8FDB\u884C\u4F18\u5316\u6539\u9020\uFF1A</p><ol><li>mysql\u53EF\u4EE5\u53BB\u6389hostNetwork\u90E8\u7F72\uFF0C\u4F7F\u5F97\u670D\u52A1\u53EA\u66B4\u6F0F\u5728k8s\u96C6\u7FA4\u5185\u90E8\u7F51\u7EDC</li><li>configMap\u4E2D\u6570\u636E\u5E93\u5730\u5740\u53EF\u4EE5\u6362\u6210Service\u540D\u79F0\uFF0C\u8FD9\u6837\u8DE8\u73AF\u5883\u7684\u65F6\u5019\uFF0C\u914D\u7F6E\u5185\u5BB9\u57FA\u672C\u4E0A\u53EF\u4EE5\u4FDD\u6301\u4E0D\u7528\u53D8\u5316</li></ol><p>\u4FEE\u6539deploy-mysql.yaml</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># \u53BB\u6389\u6B64\u884C</span>
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
<span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
<span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4FEE\u6539configmap.yaml</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">data</span><span class="token punctuation">:</span>
<span class="token key atrule">MYSQL_HOST</span><span class="token punctuation">:</span> <span class="token string">&quot;mysql&quot;</span> <span class="token comment"># \u6B64\u5904\u66FF\u6362\u4E3Amysql</span>
<span class="token key atrule">MYSQL_PORT</span><span class="token punctuation">:</span> <span class="token string">&quot;3306&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5E94\u7528\u4FEE\u6539\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl apply <span class="token operator">-</span>f configmap<span class="token punctuation">.</span>yaml
$ kubectl apply <span class="token operator">-</span>f deploy-mysql<span class="token punctuation">.</span>yaml

<span class="token comment">## \u91CD\u5EFApod</span>
$ kubectl <span class="token operator">-</span>n demo delete po mysql-7f747644b8-6npzn

<span class="token comment">#\u53BB\u6389taint</span>
$ kubectl taint node k8s-slave1 smoke-
$ kubectl taint node k8s-slave2 drunk-

<span class="token comment">## myblog\u4E0D\u7528\u52A8\uFF0C\u4F1A\u81EA\u52A8\u56E0\u5065\u5EB7\u68C0\u6D4B\u4E0D\u8FC7\u800C\u91CD\u542F</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u670D\u52A1\u53D1\u73B0\u5B9E\u73B0\uFF1A</p><p><code>CoreDNS</code>\u662F\u4E00\u4E2A<code>Go</code>\u8BED\u8A00\u5B9E\u73B0\u7684\u94FE\u5F0F\u63D2\u4EF6<code>DNS\u670D\u52A1\u7AEF</code>\uFF0C\u662FCNCF\u6210\u5458\uFF0C\u662F\u4E00\u4E2A\u9AD8\u6027\u80FD\u3001\u6613\u6269\u5C55\u7684<code>DNS\u670D\u52A1\u7AEF</code>\u3002</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kube-system get po <span class="token operator">-</span>o wide<span class="token punctuation">|</span>grep dns
coredns-d4475785-2w4hk 1/1 Running 0 4d22h 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>64
coredns-d4475785-s49hq 1/1 Running 0 4d22h 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>65

<span class="token comment"># \u67E5\u770Bmyblog\u7684pod\u89E3\u6790\u914D\u7F6E</span>
$ kubectl <span class="token operator">-</span>n demo exec <span class="token operator">-</span>ti myblog-5c97d79cdb-j485f bash
<span class="token namespace">[root@myblog-5c97d79cdb-j485f myblog]</span><span class="token comment"># cat /etc/resolv.conf</span>
nameserver 10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>10
search demo<span class="token punctuation">.</span>svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local cluster<span class="token punctuation">.</span>local
options ndots:5

<span class="token comment">## 10.96.0.10 \u4ECE\u54EA\u6765</span>
$ kubectl <span class="token operator">-</span>n kube-system get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
kube-dns ClusterIP 10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>10 &lt;none&gt; 53/UDP<span class="token punctuation">,</span>53/TCP 51d

<span class="token comment">## \u542F\u52A8pod\u7684\u65F6\u5019\uFF0C\u4F1A\u628Akube-dns\u670D\u52A1\u7684cluster-ip\u5730\u5740\u6CE8\u5165\u5230pod\u7684resolve\u89E3\u6790\u914D\u7F6E\u4E2D\uFF0C\u540C\u65F6\u6DFB\u52A0\u5BF9\u5E94\u7684namespace\u7684search\u57DF\u3002 \u56E0\u6B64\u8DE8namespace\u901A\u8FC7service name\u8BBF\u95EE\u7684\u8BDD\uFF0C\u9700\u8981\u6DFB\u52A0\u5BF9\u5E94\u7684namespace\u540D\u79F0\uFF0C</span>
service_name<span class="token punctuation">.</span>namespace_name
$ kubectl get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
kubernetes ClusterIP 10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1 &lt;none&gt; 443/TCP 26h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="service\u8D1F\u8F7D\u5747\u8861\u4E4Bnodeport" tabindex="-1"><a class="header-anchor" href="#service\u8D1F\u8F7D\u5747\u8861\u4E4Bnodeport" aria-hidden="true">#</a> Service\u8D1F\u8F7D\u5747\u8861\u4E4BNodePort</h6><p>cluster-ip\u4E3A\u865A\u62DF\u5730\u5740\uFF0C\u53EA\u80FD\u5728k8s\u96C6\u7FA4\u5185\u90E8\u8FDB\u884C\u8BBF\u95EE\uFF0C\u96C6\u7FA4\u5916\u90E8\u5982\u679C\u8BBF\u95EE\u5185\u90E8\u670D\u52A1\uFF0C\u5B9E\u73B0\u65B9\u5F0F\u4E4B\u4E00\u4E3A\u4F7F\u7528NodePort\u65B9\u5F0F\u3002NodePort\u4F1A\u9ED8\u8BA4\u5728 30000-32767 \uFF0C\u4E0D\u6307\u5B9A\u7684\u4F1A\u968F\u673A\u4F7F\u7528\u5176\u4E2D\u4E00\u4E2A\u3002</p><p><code>myblog/deployment/svc-myblog-nodeport.yaml</code></p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>apiVersion: v1
kind: Service
metadata:
name: myblog-np
namespace: demo
spec:
ports:
<span class="token operator">-</span> port: 80
protocol: TCP
targetPort: 8002
selector:
app: myblog
<span class="token function">type</span>: NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u5E76\u8BBF\u95EE\u670D\u52A1\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kd create <span class="token operator">-</span>f svc-myblog-nodeport<span class="token punctuation">.</span>yaml
service/myblog-np created
$ kd get svc
NAME <span class="token function">TYPE</span> CLUSTER-IP EXTERNAL-IP PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span> AGE
myblog ClusterIP 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93 &lt;none&gt; 80/TCP 102m
myblog-np NodePort 10<span class="token punctuation">.</span>105<span class="token punctuation">.</span>228<span class="token punctuation">.</span>101 &lt;none&gt; 80:30647/TCP 4s
mysql ClusterIP 10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84 &lt;none&gt; 3306/TCP 77m

<span class="token comment">#\u96C6\u7FA4\u5185\u6BCF\u4E2A\u8282\u70B9\u7684NodePort\u7AEF\u53E3\u90FD\u4F1A\u8FDB\u884C\u76D1\u542C</span>
$ curl 192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>128:30647/blog/index/
\u6211\u7684\u535A\u5BA2\u5217\u8868
$ curl 192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>131:30647/blog/index/
\u6211\u7684\u535A\u5BA2\u5217\u8868
<span class="token comment">## \u6D4F\u89C8\u5668\u8BBF\u95EE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u601D\u8003\uFF1A</p><ol><li><p>NodePort\u7684\u7AEF\u53E3\u76D1\u542C\u5982\u4F55\u8F6C\u53D1\u5230\u5BF9\u5E94\u7684Pod\u670D\u52A1\uFF1F</p></li><li><p>CLUSTER-IP\u4E3A\u865A\u62DFIP\uFF0C\u96C6\u7FA4\u5185\u5982\u4F55\u901A\u8FC7\u865A\u62DFIP\u8BBF\u95EE\u5230\u5177\u4F53\u7684Pod\u670D\u52A1\uFF1F</p></li></ol><h6 id="kube-proxy" tabindex="-1"><a class="header-anchor" href="#kube-proxy" aria-hidden="true">#</a> kube-proxy</h6>`,123),k=s("\u8FD0\u884C\u5728\u6BCF\u4E2A\u8282\u70B9\u4E0A\uFF0C\u76D1\u542C API Server \u4E2D\u670D\u52A1\u5BF9\u8C61\u7684\u53D8\u5316\uFF0C\u518D\u901A\u8FC7\u521B\u5EFA\u6D41\u91CF\u8DEF\u7531\u89C4\u5219\u6765\u5B9E\u73B0\u7F51\u7EDC\u7684\u8F6C\u53D1\u3002"),v={href:"https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies",target:"_blank",rel:"noopener noreferrer"},m=s("\u53C2\u7167"),b=t(`<p>\u6709\u4E09\u79CD\u6A21\u5F0F\uFF1A</p><ul><li>User space, \u8BA9 Kube-Proxy \u5728\u7528\u6237\u7A7A\u95F4\u76D1\u542C\u4E00\u4E2A\u7AEF\u53E3\uFF0C\u6240\u6709\u7684 Service \u90FD\u8F6C\u53D1\u5230\u8FD9\u4E2A\u7AEF\u53E3\uFF0C\u7136\u540E Kube-Proxy \u5728\u5185\u90E8\u5E94\u7528\u5C42\u5BF9\u5176\u8FDB\u884C\u8F6C\u53D1 \uFF0C \u6240\u6709\u62A5\u6587\u90FD\u8D70\u4E00\u904D\u7528\u6237\u6001\uFF0C\u6027\u80FD\u4E0D\u9AD8\uFF0Ck8s v1.2\u7248\u672C\u540E\u5E9F\u5F03\u3002</li><li>Iptables\uFF0C \u5F53\u524D\u9ED8\u8BA4\u6A21\u5F0F\uFF0C\u5B8C\u5168\u7531 IPtables \u6765\u5B9E\u73B0\uFF0C \u901A\u8FC7\u5404\u4E2Anode\u8282\u70B9\u4E0A\u7684iptables\u89C4\u5219\u6765\u5B9E\u73B0service\u7684\u8D1F\u8F7D\u5747\u8861\uFF0C\u4F46\u662F\u968F\u7740service\u6570\u91CF\u7684\u589E\u5927\uFF0Ciptables\u6A21\u5F0F\u7531\u4E8E\u7EBF\u6027\u67E5\u627E\u5339\u914D\u3001\u5168\u91CF\u66F4\u65B0\u7B49\u7279\u70B9\uFF0C\u5176\u6027\u80FD\u4F1A\u663E\u8457\u4E0B\u964D\u3002</li><li>IPVS\uFF0C \u4E0Eiptables\u540C\u6837\u57FA\u4E8ENetfilter\uFF0C\u4F46\u662F\u91C7\u7528\u7684hash\u8868\uFF0C\u56E0\u6B64\u5F53service\u6570\u91CF\u8FBE\u5230\u4E00\u5B9A\u89C4\u6A21\u65F6\uFF0Chash\u67E5\u8868\u7684\u901F\u5EA6\u4F18\u52BF\u5C31\u4F1A\u663E\u73B0\u51FA\u6765\uFF0C\u4ECE\u800C\u63D0\u9AD8service\u7684\u670D\u52A1\u6027\u80FD\u3002 k8s 1.8\u7248\u672C\u5F00\u59CB\u5F15\u5165\uFF0C1.11\u7248\u672C\u5F00\u59CB\u7A33\u5B9A\uFF0C\u9700\u8981\u5F00\u542F\u5BBF\u4E3B\u673A\u7684ipvs\u6A21\u5757\u3002</li></ul><p>IPtables\u6A21\u5F0F\u793A\u610F\u56FE\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ iptables-save <span class="token punctuation">|</span>grep <span class="token operator">-</span>v myblog-np<span class="token punctuation">|</span>grep <span class="token string">&quot;demo/myblog&quot;</span>
<span class="token operator">-</span>A KUBE-SERVICES <span class="token operator">!</span> <span class="token operator">-</span>s 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/16 <span class="token operator">-</span>d 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93/32 <span class="token operator">-</span>p tcp <span class="token operator">-</span>m comment <span class="token operator">--</span>comment <span class="token string">&quot;demo/myblog: cluster IP&quot;</span> <span class="token operator">-</span>m tcp <span class="token operator">--</span>dport 80 <span class="token operator">-</span>j KUBE-MARK-MASQ
<span class="token operator">-</span>A KUBE-SERVICES <span class="token operator">-</span>d 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93/32 <span class="token operator">-</span>p tcp <span class="token operator">-</span>m comment <span class="token operator">--</span>comment <span class="token string">&quot;demo/myblog: cluster IP&quot;</span> <span class="token operator">-</span>m tcp <span class="token operator">--</span>dport 80 <span class="token operator">-</span>j KUBE-SVC-WQNGJ7YFZKCTKPZK

$ iptables-save <span class="token punctuation">|</span>grep KUBE-SVC-WQNGJ7YFZKCTKPZK
<span class="token operator">-</span>A KUBE-SVC-WQNGJ7YFZKCTKPZK <span class="token operator">-</span>m statistic <span class="token operator">--</span>mode random <span class="token operator">--</span>probability 0<span class="token punctuation">.</span>50000000000 <span class="token operator">-</span>j KUBE-SEP-GB5GNOM5CZH7ICXZ
<span class="token operator">-</span>A KUBE-SVC-WQNGJ7YFZKCTKPZK <span class="token operator">-</span>j KUBE-SEP-7GWC3FN2JI5KLE47

$ iptables-save <span class="token punctuation">|</span>grep KUBE-SEP-GB5GNOM5CZH7ICXZ
<span class="token operator">-</span>A KUBE-SEP-GB5GNOM5CZH7ICXZ <span class="token operator">-</span>p tcp <span class="token operator">-</span>m tcp <span class="token operator">-</span>j DNAT <span class="token operator">--</span>to-destination 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>158:8002

$ iptables-save <span class="token punctuation">|</span>grep KUBE-SEP-7GWC3FN2JI5KLE47
<span class="token operator">-</span>A KUBE-SEP-7GWC3FN2JI5KLE47 <span class="token operator">-</span>p tcp <span class="token operator">-</span>m tcp <span class="token operator">-</span>j DNAT <span class="token operator">--</span>to-destination 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>159:8002
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="kubernetes\u670D\u52A1\u8BBF\u95EE\u4E4Bingress" tabindex="-1"><a class="header-anchor" href="#kubernetes\u670D\u52A1\u8BBF\u95EE\u4E4Bingress" aria-hidden="true">#</a> Kubernetes\u670D\u52A1\u8BBF\u95EE\u4E4BIngress</h5><p>\u5BF9\u4E8EKubernetes\u7684Service\uFF0C\u65E0\u8BBA\u662FCluster-Ip\u548CNodePort\u5747\u662F\u56DB\u5C42\u7684\u8D1F\u8F7D\uFF0C\u96C6\u7FA4\u5185\u7684\u670D\u52A1\u5982\u4F55\u5B9E\u73B0\u4E03\u5C42\u7684\u8D1F\u8F7D\u5747\u8861\uFF0C\u8FD9\u5C31\u9700\u8981\u501F\u52A9\u4E8EIngress\uFF0CIngress\u63A7\u5236\u5668\u7684\u5B9E\u73B0\u65B9\u5F0F\u6709\u5F88\u591A\uFF0C\u6BD4\u5982nginx, Contour, Haproxy, trafik, Istio\uFF0C\u6211\u4EEC\u4EE5nginx\u7684\u5B9E\u73B0\u4E3A\u4F8B\u505A\u6F14\u793A\u3002</p><p>Ingress-nginx\u662F7\u5C42\u7684\u8D1F\u8F7D\u5747\u8861\u5668 \uFF0C\u8D1F\u8D23\u7EDF\u4E00\u7BA1\u7406\u5916\u90E8\u5BF9k8s cluster\u4E2Dservice\u7684\u8BF7\u6C42\u3002\u4E3B\u8981\u5305\u542B\uFF1A</p><ul><li>ingress-nginx-controller\uFF1A\u6839\u636E\u7528\u6237\u7F16\u5199\u7684ingress\u89C4\u5219\uFF08\u521B\u5EFA\u7684ingress\u7684yaml\u6587\u4EF6\uFF09\uFF0C\u52A8\u6001\u7684\u53BB\u66F4\u6539nginx\u670D\u52A1\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u5E76\u4E14reload\u91CD\u8F7D\u4F7F\u5176\u751F\u6548\uFF08\u662F\u81EA\u52A8\u5316\u7684\uFF0C\u901A\u8FC7lua\u811A\u672C\u6765\u5B9E\u73B0\uFF09\uFF1B</li><li>ingress\u8D44\u6E90\u5BF9\u8C61\uFF1A\u5C06Nginx\u7684\u914D\u7F6E\u62BD\u8C61\u6210\u4E00\u4E2AIngress\u5BF9\u8C61\uFF0C\u6BCF\u6DFB\u52A0\u4E00\u4E2A\u65B0\u7684Service\u8D44\u6E90\u5BF9\u8C61\u53EA\u9700\u5199\u4E00\u4E2A\u65B0\u7684Ingress\u89C4\u5219\u7684yaml\u6587\u4EF6\u5373\u53EF\uFF08\u6216\u4FEE\u6539\u5DF2\u5B58\u5728\u7684ingress\u89C4\u5219\u7684yaml\u6587\u4EF6\uFF09</li></ul><h6 id="\u793A\u610F\u56FE" tabindex="-1"><a class="header-anchor" href="#\u793A\u610F\u56FE" aria-hidden="true">#</a> \u793A\u610F\u56FE\uFF1A</h6><h6 id="\u5B9E\u73B0\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u73B0\u903B\u8F91" aria-hidden="true">#</a> \u5B9E\u73B0\u903B\u8F91</h6><p>1\uFF09ingress controller\u901A\u8FC7\u548Ckubernetes api\u4EA4\u4E92\uFF0C\u52A8\u6001\u7684\u53BB\u611F\u77E5\u96C6\u7FA4\u4E2Dingress\u89C4\u5219\u53D8\u5316 2\uFF09\u7136\u540E\u8BFB\u53D6ingress\u89C4\u5219(\u89C4\u5219\u5C31\u662F\u5199\u660E\u4E86\u54EA\u4E2A\u57DF\u540D\u5BF9\u5E94\u54EA\u4E2Aservice)\uFF0C\u6309\u7167\u81EA\u5B9A\u4E49\u7684\u89C4\u5219\uFF0C\u751F\u6210\u4E00\u6BB5nginx\u914D\u7F6E 3\uFF09\u518D\u5199\u5230nginx-ingress-controller\u7684pod\u91CC\uFF0C\u8FD9\u4E2AIngress controller\u7684pod\u91CC\u8FD0\u884C\u7740\u4E00\u4E2ANginx\u670D\u52A1\uFF0C\u63A7\u5236\u5668\u628A\u751F\u6210\u7684nginx\u914D\u7F6E\u5199\u5165/etc/nginx.conf\u6587\u4EF6\u4E2D 4\uFF09\u7136\u540Ereload\u4E00\u4E0B\u4F7F\u914D\u7F6E\u751F\u6548\u3002\u4EE5\u6B64\u8FBE\u5230\u57DF\u540D\u5206\u522B\u914D\u7F6E\u548C\u52A8\u6001\u66F4\u65B0\u7684\u95EE\u9898\u3002</p><h6 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h6>`,12),y={href:"https://github.com/kubernetes/ingress-nginx/blob/master/docs/deploy/index.md",target:"_blank",rel:"noopener noreferrer"},g=s("\u5B98\u65B9\u6587\u6863"),h=t(`<div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ wget https:<span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com/kubernetes/ingress-nginx/nginx-0<span class="token punctuation">.</span>30<span class="token punctuation">.</span>0/deploy/static/mandatory<span class="token punctuation">.</span>yaml
<span class="token comment">## \u6216\u8005\u4F7F\u7528myblog/deployment/ingress/mandatory.yaml</span>
<span class="token comment">## \u4FEE\u6539\u90E8\u7F72\u8282\u70B9</span>
$ grep <span class="token operator">-</span>n5 nodeSelector mandatory<span class="token punctuation">.</span>yaml
212- spec:
213- hostNetwork: true <span class="token comment">#\u6DFB\u52A0\u4E3Ahost\u6A21\u5F0F</span>
214- <span class="token comment"># wait up to five minutes for the drain of connections</span>
215- terminationGracePeriodSeconds: 300
216- serviceAccountName: nginx-ingress-serviceaccount
217: nodeSelector:
218- ingress: <span class="token string">&quot;true&quot;</span> <span class="token comment">#\u66FF\u6362\u6B64\u5904\uFF0C\u6765\u51B3\u5B9A\u5C06ingress\u90E8\u7F72\u5728\u54EA\u4E9B\u673A\u5668</span>
219- containers:
220- <span class="token operator">-</span> name: nginx-ingress-controller
221- image: quay<span class="token punctuation">.</span>io/kubernetes-ingress-controller/nginx-ingress-controller:0<span class="token punctuation">.</span>30<span class="token punctuation">.</span>0
222- args:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528\u793A\u4F8B\uFF1A<code>myblog/deployment/ingress.yaml</code></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> myblog.devops.cn
<span class="token key atrule">http</span><span class="token punctuation">:</span>
<span class="token key atrule">paths</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
<span class="token key atrule">backend</span><span class="token punctuation">:</span>
<span class="token key atrule">serviceName</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ingress-nginx\u52A8\u6001\u751F\u6210upstream\u914D\u7F6E\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token punctuation">...</span>
server_name myblog.devops.cn ;

listen 80 ;
listen <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>80 ;
listen 443 ssl http2 ;
listen <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>443 ssl http2 ;

set $proxy_upstream_name &quot;<span class="token punctuation">-</span>&quot;;

ssl_certificate_by_lua_block <span class="token punctuation">{</span>
certificate.call()
<span class="token punctuation">}</span>

location / <span class="token punctuation">{</span>

set $namespace &quot;demo&quot;;
set $ingress_name &quot;myblog&quot;;
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="\u8BBF\u95EE" tabindex="-1"><a class="header-anchor" href="#\u8BBF\u95EE" aria-hidden="true">#</a> \u8BBF\u95EE</h6><p>\u57DF\u540D\u89E3\u6790\u670D\u52A1\uFF0C\u5C06 <code>myblog.devops.cn</code>\u89E3\u6790\u5230ingress\u7684\u5730\u5740\u4E0A\u3002ingress\u662F\u652F\u6301\u591A\u526F\u672C\u7684\uFF0C\u9AD8\u53EF\u7528\u7684\u60C5\u51B5\u4E0B\uFF0C\u751F\u4EA7\u7684\u914D\u7F6E\u662F\u4F7F\u7528lb\u670D\u52A1\uFF08\u5185\u7F51F5\u8BBE\u5907\uFF0C\u516C\u7F51elb\u3001slb\u3001clb\uFF0C\u89E3\u6790\u5230\u5404ingress\u7684\u673A\u5668\uFF0C\u5982\u4F55\u57DF\u540D\u6307\u5411lb\u5730\u5740\uFF09</p><p>\u672C\u673A\uFF0C\u6DFB\u52A0\u5982\u4E0Bhosts\u8BB0\u5F55\u6765\u6F14\u793A\u6548\u679C\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token number">192.168</span>.<span class="token number">136.128</span> myblog.devops.cn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9),f=s("\u7136\u540E\uFF0C\u8BBF\u95EE "),_={href:"http://myblog.devops.cn/blog/index/",target:"_blank",rel:"noopener noreferrer"},x=s("http://myblog.devops.cn/blog/index/"),q=t(`<p>HTTPS\u8BBF\u95EE\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment">#\u81EA\u7B7E\u540D\u8BC1\u4E66</span>
$ openssl req <span class="token operator">-</span>x509 <span class="token operator">-</span>nodes <span class="token operator">-</span>days 2920 <span class="token operator">-</span>newkey rsa:2048 <span class="token operator">-</span>keyout tls<span class="token punctuation">.</span>key <span class="token operator">-</span>out tls<span class="token punctuation">.</span>crt <span class="token operator">-</span>subj <span class="token string">&quot;/CN=*.devops.cn/O=ingress-nginx&quot;</span>

<span class="token comment"># \u8BC1\u4E66\u4FE1\u606F\u4FDD\u5B58\u5230secret\u5BF9\u8C61\u4E2D\uFF0Cingress-nginx\u4F1A\u8BFB\u53D6secret\u5BF9\u8C61\u89E3\u6790\u51FA\u8BC1\u4E66\u52A0\u8F7D\u5230nginx\u914D\u7F6E\u4E2D</span>
$ kubectl <span class="token operator">-</span>n demo create secret tls https-secret <span class="token operator">--</span>key tls<span class="token punctuation">.</span>key <span class="token operator">--</span>cert tls<span class="token punctuation">.</span>crt
secret/https-secret created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4FEE\u6539yaml</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> extensions/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> myblog<span class="token punctuation">-</span>tls
<span class="token key atrule">namespace</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> myblog.devops.cn
<span class="token key atrule">http</span><span class="token punctuation">:</span>
<span class="token key atrule">paths</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
<span class="token key atrule">backend</span><span class="token punctuation">:</span>
<span class="token key atrule">serviceName</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">tls</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> myblog.devops.cn
<span class="token key atrule">secretName</span><span class="token punctuation">:</span> https<span class="token punctuation">-</span>secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),P=s("\u7136\u540E\uFF0C\u8BBF\u95EE "),w={href:"https://myblog.devops.cn/blog/index/",target:"_blank",rel:"noopener noreferrer"},S=s("https://myblog.devops.cn/blog/index/"),N=t('<h5 id="kubernetes\u8BA4\u8BC1\u4E0E\u6388\u6743-\u5F55\u5C4F" tabindex="-1"><a class="header-anchor" href="#kubernetes\u8BA4\u8BC1\u4E0E\u6388\u6743-\u5F55\u5C4F" aria-hidden="true">#</a> Kubernetes\u8BA4\u8BC1\u4E0E\u6388\u6743 \u5F55\u5C4F\uFF01\uFF01\uFF01</h5><h6 id="apiservice\u5B89\u5168\u63A7\u5236" tabindex="-1"><a class="header-anchor" href="#apiservice\u5B89\u5168\u63A7\u5236" aria-hidden="true">#</a> APIService\u5B89\u5168\u63A7\u5236</h6><ul><li>Authentication\uFF1A\u8EAB\u4EFD\u8BA4\u8BC1</li></ul><ol><li>\u8FD9\u4E2A\u73AF\u8282\u5B83\u9762\u5BF9\u7684\u8F93\u5165\u662F\u6574\u4E2A<code>http request</code>\uFF0C\u8D1F\u8D23\u5BF9\u6765\u81EAclient\u7684\u8BF7\u6C42\u8FDB\u884C\u8EAB\u4EFD\u6821\u9A8C\uFF0C\u652F\u6301\u7684\u65B9\u6CD5\u5305\u62EC:</li></ol><ul><li><p>client\u8BC1\u4E66\u9A8C\u8BC1\uFF08https\u53CC\u5411\u9A8C\u8BC1\uFF09</p></li><li><p><code>basic auth</code></p></li><li><p>\u666E\u901Atoken</p></li><li><p><code>jwt token</code>(\u7528\u4E8Eserviceaccount)</p></li></ul><ol start="2"><li><p>APIServer\u542F\u52A8\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4E00\u79CDAuthentication\u65B9\u6CD5\uFF0C\u4E5F\u53EF\u4EE5\u6307\u5B9A\u591A\u79CD\u65B9\u6CD5\u3002\u5982\u679C\u6307\u5B9A\u4E86\u591A\u79CD\u65B9\u6CD5\uFF0C\u90A3\u4E48APIServer\u5C06\u4F1A\u9010\u4E2A\u4F7F\u7528\u8FD9\u4E9B\u65B9\u6CD5\u5BF9\u5BA2\u6237\u7AEF\u8BF7\u6C42\u8FDB\u884C\u9A8C\u8BC1\uFF0C \u53EA\u8981\u8BF7\u6C42\u6570\u636E\u901A\u8FC7\u5176\u4E2D\u4E00\u79CD\u65B9\u6CD5\u7684\u9A8C\u8BC1\uFF0CAPIServer\u5C31\u4F1A\u8BA4\u4E3AAuthentication\u6210\u529F\uFF1B</p></li><li><p>\u4F7F\u7528kubeadm\u5F15\u5BFC\u542F\u52A8\u7684k8s\u96C6\u7FA4\u7684apiserver\u521D\u59CB\u914D\u7F6E\u4E2D\uFF0C\u9ED8\u8BA4\u652F\u6301<code>client\u8BC1\u4E66</code>\u9A8C\u8BC1\u548C<code>serviceaccount</code>\u4E24\u79CD\u8EAB\u4EFD\u9A8C\u8BC1\u65B9\u5F0F\u3002 \u8BC1\u4E66\u8BA4\u8BC1\u901A\u8FC7\u8BBE\u7F6E<code>--client-ca-file</code>\u6839\u8BC1\u4E66\u4EE5\u53CA<code>--tls-cert-file</code>\u548C<code>--tls-private-key-file</code>\u6765\u5F00\u542F\u3002</p></li><li><p>\u5728\u8FD9\u4E2A\u73AF\u8282\uFF0Capiserver\u4F1A\u901A\u8FC7client\u8BC1\u4E66\u6216 <code>http header</code>\u4E2D\u7684\u5B57\u6BB5(\u6BD4\u5982serviceaccount\u7684<code>jwt token</code>)\u6765\u8BC6\u522B\u51FA\u8BF7\u6C42\u7684<code>\u7528\u6237\u8EAB\u4EFD</code>\uFF0C\u5305\u62EC\u201Duser\u201D\u3001\u201Dgroup\u201D\u7B49\uFF0C\u8FD9\u4E9B\u4FE1\u606F\u5C06\u5728\u540E\u9762\u7684<code>authorization</code>\u73AF\u8282\u7528\u5230\u3002</p></li></ol><ul><li>Authorization\uFF1A\u9274\u6743\uFF0C\u4F60\u53EF\u4EE5\u8BBF\u95EE\u54EA\u4E9B\u8D44\u6E90</li></ul><ol><li><p>\u8FD9\u4E2A\u73AF\u8282\u9762\u5BF9\u7684\u8F93\u5165\u662F<code>http request context</code>\u4E2D\u7684\u5404\u79CD\u5C5E\u6027\uFF0C\u5305\u62EC\uFF1A<code>user</code>\u3001<code>group</code>\u3001<code>request path</code>\uFF08\u6BD4\u5982\uFF1A<code>/api/v1</code>\u3001<code>/healthz</code>\u3001<code>/version</code>\u7B49\uFF09\u3001 <code>request verb</code>(\u6BD4\u5982\uFF1A<code>get</code>\u3001<code>list</code>\u3001<code>create</code>\u7B49)\u3002</p></li><li><p>APIServer\u4F1A\u5C06\u8FD9\u4E9B\u5C5E\u6027\u503C\u4E0E\u4E8B\u5148\u914D\u7F6E\u597D\u7684\u8BBF\u95EE\u7B56\u7565(<code>access policy</code>\uFF09\u76F8\u6BD4\u8F83\u3002APIServer\u652F\u6301\u591A\u79CD<code>authorization mode</code>\uFF0C\u5305\u62EC<code>Node\u3001RBAC\u3001Webhook</code>\u7B49\u3002</p></li><li><p>APIServer\u542F\u52A8\u65F6\uFF0C\u53EF\u4EE5\u6307\u5B9A\u4E00\u79CD<code>authorization mode</code>\uFF0C\u4E5F\u53EF\u4EE5\u6307\u5B9A\u591A\u79CD<code>authorization mode</code>\uFF0C\u5982\u679C\u662F\u540E\u8005\uFF0C\u53EA\u8981Request\u901A\u8FC7\u4E86\u5176\u4E2D\u4E00\u79CDmode\u7684\u6388\u6743\uFF0C \u90A3\u4E48\u8BE5\u73AF\u8282\u7684\u6700\u7EC8\u7ED3\u679C\u5C31\u662F\u6388\u6743\u6210\u529F\u3002\u5728\u8F83\u65B0\u7248\u672Ckubeadm\u5F15\u5BFC\u542F\u52A8\u7684k8s\u96C6\u7FA4\u7684apiserver\u521D\u59CB\u914D\u7F6E\u4E2D\uFF0C<code>authorization-mode</code>\u7684\u9ED8\u8BA4\u914D\u7F6E\u662F<code>\u201DNode,RBAC\u201D</code>\u3002</p></li></ol>',8),R=s("Admission Control\uFF1A"),E={href:"http://docs.kubernetes.org.cn/144.html",target:"_blank",rel:"noopener noreferrer"},A=s("\u51C6\u5165\u63A7\u5236"),T=s("\uFF0C\u4E00\u4E2A\u63A7\u5236\u94FE(\u5C42\u5C42\u5173\u5361)\uFF0C\u504F\u96C6\u7FA4\u5B89\u5168\u63A7\u5236\u3001\u7BA1\u7406\u65B9\u9762\u3002\u4E3A\u4EC0\u4E48\u8BF4\u662F\u5B89\u5168\u76F8\u5173\u7684\u673A\u5236\uFF1F"),C=n("li",null,"\u4EE5NamespaceLifecycle\u4E3A\u4F8B\uFF0C \u8BE5\u63D2\u4EF6\u786E\u4FDD\u5904\u4E8ETermination\u72B6\u6001\u7684Namespace\u4E0D\u518D\u63A5\u6536\u65B0\u7684\u5BF9\u8C61\u521B\u5EFA\u8BF7\u6C42\uFF0C\u5E76\u62D2\u7EDD\u8BF7\u6C42\u4E0D\u5B58\u5728\u7684Namespace\u3002\u8BE5\u63D2\u4EF6\u8FD8\u53EF\u4EE5\u9632\u6B62\u5220\u9664\u7CFB\u7EDF\u4FDD\u7559\u7684Namespace:default\uFF0Ckube-system\uFF0Ckube-public\u3002",-1),I=n("li",null,"NodeRestriction\uFF0C \u6B64\u63D2\u4EF6\u9650\u5236kubelet\u4FEE\u6539Node\u548CPod\u5BF9\u8C61\uFF0C\u8FD9\u6837\u7684kubelets\u53EA\u5141\u8BB8\u4FEE\u6539\u7ED1\u5B9A\u5230Node\u7684Pod API\u5BF9\u8C61\uFF0C\u4EE5\u540E\u7248\u672C\u53EF\u80FD\u4F1A\u589E\u52A0\u989D\u5916\u7684\u9650\u5236 \u3002",-1),$=t(`<p>\u4E3A\u4EC0\u4E48\u6211\u4EEC\u6267\u884C\u547D\u4EE4kubectl\u547D\u4EE4\uFF0C\u53EF\u4EE5\u76F4\u63A5\u7BA1\u7406k8s\u96C6\u7FA4\u8D44\u6E90\uFF1F</p><h6 id="kubectl\u7684\u8BA4\u8BC1\u6388\u6743" tabindex="-1"><a class="header-anchor" href="#kubectl\u7684\u8BA4\u8BC1\u6388\u6743" aria-hidden="true">#</a> kubectl\u7684\u8BA4\u8BC1\u6388\u6743</h6><p>kubectl\u7684\u65E5\u5FD7\u8C03\u8BD5\u7EA7\u522B\uFF1A</p><table><thead><tr><th style="text-align:left;">\u4FE1\u606F</th><th style="text-align:left;">\u63CF\u8FF0</th></tr></thead><tbody><tr><td style="text-align:left;">v=0</td><td style="text-align:left;">\u901A\u5E38\uFF0C\u8FD9\u5BF9\u64CD\u4F5C\u8005\u6765\u8BF4\u603B\u662F\u53EF\u89C1\u7684\u3002</td></tr><tr><td style="text-align:left;">v=1</td><td style="text-align:left;">\u5F53\u60A8\u4E0D\u60F3\u8981\u5F88\u8BE6\u7EC6\u7684\u8F93\u51FA\u65F6\uFF0C\u8FD9\u4E2A\u662F\u4E00\u4E2A\u5408\u7406\u7684\u9ED8\u8BA4\u65E5\u5FD7\u7EA7\u522B\u3002</td></tr><tr><td style="text-align:left;">v=2</td><td style="text-align:left;">\u6709\u5173\u670D\u52A1\u548C\u91CD\u8981\u65E5\u5FD7\u6D88\u606F\u7684\u6709\u7528\u7A33\u5B9A\u72B6\u6001\u4FE1\u606F\uFF0C\u8FD9\u4E9B\u4FE1\u606F\u53EF\u80FD\u4E0E\u7CFB\u7EDF\u4E2D\u7684\u91CD\u5927\u66F4\u6539\u76F8\u5173\u3002\u8FD9\u662F\u5927\u591A\u6570\u7CFB\u7EDF\u63A8\u8350\u7684\u9ED8\u8BA4\u65E5\u5FD7\u7EA7\u522B\u3002</td></tr><tr><td style="text-align:left;">v=3</td><td style="text-align:left;">\u5173\u4E8E\u66F4\u6539\u7684\u6269\u5C55\u4FE1\u606F\u3002</td></tr><tr><td style="text-align:left;">v=4</td><td style="text-align:left;">\u8C03\u8BD5\u7EA7\u522B\u4FE1\u606F\u3002</td></tr><tr><td style="text-align:left;">v=6</td><td style="text-align:left;">\u663E\u793A\u8BF7\u6C42\u8D44\u6E90\u3002</td></tr><tr><td style="text-align:left;">v=7</td><td style="text-align:left;">\u663E\u793A HTTP \u8BF7\u6C42\u5934\u3002</td></tr><tr><td style="text-align:left;">v=8</td><td style="text-align:left;">\u663E\u793A HTTP \u8BF7\u6C42\u5185\u5BB9\u3002</td></tr><tr><td style="text-align:left;">v=9</td><td style="text-align:left;">\u663E\u793A HTTP \u8BF7\u6C42\u5185\u5BB9\uFF0C\u5E76\u4E14\u4E0D\u622A\u65AD\u5185\u5BB9\u3002</td></tr></tbody></table><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ kubectl get nodes <span class="token operator">-</span>v=7
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u975E\u8D44\u6E90\u7C7B\uFF0C\u5982\u67E5\u770B\u96C6\u7FA4\u5065\u5EB7\u72B6\u6001\u3002</p><h6 id="rbac" tabindex="-1"><a class="header-anchor" href="#rbac" aria-hidden="true">#</a> RBAC</h6>`,28),L=s("Role-Based Access Control\uFF0C\u57FA\u4E8E\u89D2\u8272\u7684\u8BBF\u95EE\u63A7\u5236\uFF0C apiserver\u542F\u52A8\u53C2\u6570\u6DFB\u52A0--authorization-mode=RBAC \u6765\u542F\u7528RBAC\u8BA4\u8BC1\u6A21\u5F0F\uFF0Ckubeadm\u5B89\u88C5\u7684\u96C6\u7FA4\u9ED8\u8BA4\u5DF2\u5F00\u542F\u3002"),V={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/",target:"_blank",rel:"noopener noreferrer"},M=s("\u5B98\u65B9\u4ECB\u7ECD"),G=t(`<p>\u67E5\u770B\u5F00\u542F\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code><span class="token comment"># master\u8282\u70B9\u67E5\u770Bapiserver\u8FDB\u7A0B</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),z=s("\u7ED3\u5C40\u6709\u70B9\u610F\u5916\uFF0C\u9664\u4E86"),K=n("code",null,"system:certificates.k8s.io:certificatesigningrequests:selfnodeclient",-1),Y=s("\u5916\uFF0C\u6CA1\u6709\u627E\u5230system\u76F8\u5173\u7684rolebindings\uFF0C\u663E\u7136\u548C\u6211\u4EEC\u7684\u7406\u89E3\u4E0D\u4E00\u6837\u3002 \u5C1D\u8BD5\u53BB\u627E"),D={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/",target:"_blank",rel:"noopener noreferrer"},W=s("\u8D44\u6599"),Z=s("\uFF0C\u53D1\u73B0\u4E86\u8FD9\u4E48\u4E00\u6BB5 :"),j=n("thead",null,[n("tr",null,[n("th",{style:{"text-align":"left"}},"Default ClusterRole"),n("th",{style:{"text-align":"left"}},"Default ClusterRoleBinding"),n("th",{style:{"text-align":"left"}},"Description")])],-1),U=n("td",{style:{"text-align":"left"}},"system:kube-scheduler",-1),O=n("td",{style:{"text-align":"left"}},"system:kube-scheduler user",-1),B={style:{"text-align":"left"}},F=s("Allows access to the resources required by the "),J={href:"https://kubernetes.io/docs/reference/generated/kube-scheduler/",target:"_blank",rel:"noopener noreferrer"},X=s("scheduler"),H=s("component."),Q=n("tr",null,[n("td",{style:{"text-align":"left"}},"system:volume-scheduler"),n("td",{style:{"text-align":"left"}},"system:kube-scheduler user"),n("td",{style:{"text-align":"left"}},"Allows access to the volume resources required by the kube-scheduler component.")],-1),nn=n("td",{style:{"text-align":"left"}},"system:kube-controller-manager",-1),sn=n("td",{style:{"text-align":"left"}},"system:kube-controller-manager user",-1),an={style:{"text-align":"left"}},en=s("Allows access to the resources required by the "),tn={href:"https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/",target:"_blank",rel:"noopener noreferrer"},ln=s("controller manager"),pn=s(" component. The permissions required by individual controllers are detailed in the "),on={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/#controller-roles",target:"_blank",rel:"noopener noreferrer"},cn=s("controller roles"),un=s("."),rn=n("td",{style:{"text-align":"left"}},"system:node",-1),dn=n("td",{style:{"text-align":"left"}},"None",-1),kn={style:{"text-align":"left"}},vn=s("Allows access to resources required by the kubelet, "),mn=n("strong",null,"including read access to all secrets, and write access to all pod status objects",-1),bn=s(". You should use the "),yn={href:"https://kubernetes.io/docs/reference/access-authn-authz/node/",target:"_blank",rel:"noopener noreferrer"},gn=s("Node authorizer"),hn=s(" and "),fn={href:"https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction",target:"_blank",rel:"noopener noreferrer"},_n=s("NodeRestriction admission plugin"),xn=s(" instead of the "),qn=n("code",null,"system:node",-1),Pn=s(" role, and allow granting API access to kubelets based on the Pods scheduled to run on them. The "),wn=n("code",null,"system:node",-1),Sn=s(" role only exists for compatibility with Kubernetes clusters upgraded from versions prior to v1.8."),Nn=n("td",{style:{"text-align":"left"}},"system:node-proxier",-1),Rn=n("td",{style:{"text-align":"left"}},"system:kube-proxy user",-1),En={style:{"text-align":"left"}},An=s("Allows access to the resources required by the "),Tn={href:"https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/",target:"_blank",rel:"noopener noreferrer"},Cn=s("kube-proxy"),In=s("component."),$n=s("\u5927\u81F4\u610F\u601D\u662F\u8BF4\uFF1A\u4E4B\u524D\u4F1A\u5B9A\u4E49system:node\u8FD9\u4E2A\u89D2\u8272\uFF0C\u76EE\u7684\u662F\u4E3A\u4E86kubelet\u53EF\u4EE5\u8BBF\u95EE\u5230\u5FC5\u8981\u7684\u8D44\u6E90\uFF0C\u5305\u62EC\u6240\u6709secret\u7684\u8BFB\u6743\u9650\u53CA\u66F4\u65B0pod\u72B6\u6001\u7684\u5199\u6743\u9650\u3002\u5982\u679C1.8\u7248\u672C\u540E\uFF0C\u662F\u5EFA\u8BAE\u4F7F\u7528 "),Ln={href:"https://kubernetes.io/docs/reference/access-authn-authz/node/",target:"_blank",rel:"noopener noreferrer"},Vn=s("Node authorizer"),Mn=s(" and "),Gn={href:"https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction",target:"_blank",rel:"noopener noreferrer"},zn=s("NodeRestriction admission plugin"),Kn=s(" \u6765\u4EE3\u66FF\u8FD9\u4E2A\u89D2\u8272\u7684\u3002"),Yn=t(`<p>\u6211\u4EEC\u76EE\u524D\u4F7F\u75281.16\uFF0C\u67E5\u770B\u4E00\u4E0B\u6388\u6743\u7B56\u7565\uFF1A</p><div class="language-powershell ext-powershell line-numbers-mode"><pre class="language-powershell"><code>$ <span class="token function">ps</span> axu<span class="token punctuation">|</span>grep apiserver
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u90E8\u7F72kibana" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72kibana" aria-hidden="true">#</a> \u90E8\u7F72kibana</h5><h6 id="\u90E8\u7F72\u5206\u6790-1" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72\u5206\u6790-1" aria-hidden="true">#</a> \u90E8\u7F72\u5206\u6790</h6>`,44),Dn={start:"2"},Wn=n("li",null,"kibana\u9700\u8981\u66B4\u6F0Fweb\u9875\u9762\u7ED9\u524D\u7AEF\u4F7F\u7528\uFF0C\u56E0\u6B64\u4F7F\u7528ingress\u914D\u7F6E\u57DF\u540D\u6765\u5B9E\u73B0\u5BF9kibana\u7684\u8BBF\u95EE",-1),Zn=n("li",null,"kibana\u4E3A\u65E0\u72B6\u6001\u5E94\u7528\uFF0C\u76F4\u63A5\u4F7F\u7528Deployment\u6765\u542F\u52A8",-1),jn=s("kibana\u9700\u8981\u8BBF\u95EEes\uFF0C\u76F4\u63A5\u5229\u7528k8s\u670D\u52A1\u53D1\u73B0\u8BBF\u95EE\u6B64\u5730\u5740\u5373\u53EF\uFF0C"),Un={href:"http://elasticsearch:9200",target:"_blank",rel:"noopener noreferrer"},On=s("http://elasticsearch:9200"),Bn=t(`<h6 id="\u90E8\u7F72\u5E76\u9A8C\u8BC1-1" tabindex="-1"><a class="header-anchor" href="#\u90E8\u7F72\u5E76\u9A8C\u8BC1-1" aria-hidden="true">#</a> \u90E8\u7F72\u5E76\u9A8C\u8BC1</h6><p>\u8D44\u6E90\u6587\u4EF6 <code>efk/kibana.yaml</code></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u914D\u7F6E\u6587\u4EF6\uFF0Cfluentd-config.yaml\uFF0C\u6CE8\u610F\u70B9\uFF1A</p>`,11),Fn=n("li",null,"\u6570\u636E\u6E90source\u7684\u914D\u7F6E\uFF0Ck8s\u4F1A\u9ED8\u8BA4\u628A\u5BB9\u5668\u7684\u6807\u51C6\u548C\u9519\u8BEF\u8F93\u51FA\u65E5\u5FD7\u91CD\u5B9A\u5411\u5230\u5BBF\u4E3B\u673A\u4E2D",-1),Jn=s("\u9ED8\u8BA4\u96C6\u6210\u4E86 "),Xn={href:"https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter",target:"_blank",rel:"noopener noreferrer"},Hn=s("kubernetes_metadata_filter"),Qn=s(" \u63D2\u4EF6\uFF0C\u6765\u89E3\u6790\u65E5\u5FD7\u683C\u5F0F\uFF0C\u5F97\u5230k8s\u76F8\u5173\u7684\u5143\u6570\u636E\uFF0Craw.kubernetes"),ns=n("li",null,"match\u8F93\u51FA\u5230es\u7AEF\u7684flush\u914D\u7F6E",-1),ss=t(`<div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="\u914D\u7F6Ekibana" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6Ekibana" aria-hidden="true">#</a> \u914D\u7F6Ekibana</h6><p>\u767B\u5F55kibana\u754C\u9762\uFF0C\u6309\u7167\u622A\u56FE\u7684\u987A\u5E8F\u64CD\u4F5C\uFF1A</p><p>\u4E5F\u53EF\u4EE5\u901A\u8FC7\u5176\u4ED6\u5143\u6570\u636E\u6765\u8FC7\u6EE4\u65E5\u5FD7\u6570\u636E\uFF0C\u6BD4\u5982\u53EF\u4EE5\u5355\u51FB\u4EFB\u4F55\u65E5\u5FD7\u6761\u76EE\u4EE5\u67E5\u770B\u5176\u4ED6\u5143\u6570\u636E\uFF0C\u5982\u5BB9\u5668\u540D\u79F0\uFF0CKubernetes \u8282\u70B9\uFF0C\u547D\u540D\u7A7A\u95F4\u7B49\uFF0C\u6BD4\u5982kubernetes.pod_name : counter</p>`,15),as=s("\u5230\u8FD9\u91CC\uFF0C\u6211\u4EEC\u5C31\u5728 Kubernetes \u96C6\u7FA4\u4E0A\u6210\u529F\u90E8\u7F72\u4E86 EFK \uFF0C\u8981\u4E86\u89E3\u5982\u4F55\u4F7F\u7528 Kibana \u8FDB\u884C\u65E5\u5FD7\u6570\u636E\u5206\u6790\uFF0C\u53EF\u4EE5\u53C2\u8003 Kibana \u7528\u6237\u6307\u5357\u6587\u6863\uFF1A"),es={href:"https://www.elastic.co/guide/en/kibana/current/index.html",target:"_blank",rel:"noopener noreferrer"},ts=s("https://www.elastic.co/guide/en/kibana/current/index.html");function ls(is,ps){const a=c("ExternalLinkIcon");return i(),p("div",null,[r,o(" more "),d,n("p",null,[k,n("a",v,[m,e(a)])]),b,n("p",null,[n("a",y,[g,e(a)])]),h,n("p",null,[f,n("a",_,[x,e(a)])]),q,n("p",null,[P,n("a",w,[S,e(a)])]),N,n("ul",null,[n("li",null,[R,n("a",E,[A,e(a)]),T]),C,I]),$,n("p",null,[L,n("a",V,[M,e(a)])]),G,n("p",null,[z,K,Y,n("a",D,[W,e(a)]),Z]),n("table",null,[j,n("tbody",null,[n("tr",null,[U,O,n("td",B,[F,n("a",J,[X,e(a)]),H])]),Q,n("tr",null,[nn,sn,n("td",an,[en,n("a",tn,[ln,e(a)]),pn,n("a",on,[cn,e(a)]),un])]),n("tr",null,[rn,dn,n("td",kn,[vn,mn,bn,n("a",yn,[gn,e(a)]),hn,n("a",fn,[_n,e(a)]),xn,qn,Pn,wn,Sn])]),n("tr",null,[Nn,Rn,n("td",En,[An,n("a",Tn,[Cn,e(a)]),In])])])]),n("p",null,[$n,n("a",Ln,[Vn,e(a)]),Mn,n("a",Gn,[zn,e(a)]),Kn]),Yn,n("ol",Dn,[Wn,Zn,n("li",null,[jn,n("a",Un,[On,e(a)])])]),Bn,n("ol",null,[Fn,n("li",null,[Jn,n("a",Xn,[Hn,e(a)]),Qn]),ns]),ss,n("p",null,[as,n("a",es,[ts,e(a)])])])}const us=l(u,[["render",ls],["__file","k8\u63A7\u5236\u5668.html.vue"]]);export{us as default};
