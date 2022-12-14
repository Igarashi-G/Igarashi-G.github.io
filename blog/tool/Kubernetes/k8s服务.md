---
title: Kubernets - 服务
date: 2022-10-06
category:
  - 运维
  - k8s
tag:
  - k8s
star: true
---

**k8s** 服务、负载均衡 和 联网

<!-- more -->

## 1. Service 服务

此时，已能通过 **Deployment** 创建带副本的 **Pod** 提供高可用性的服务了，但即使每个 **Pod** 都会分配单独 **IP**，却存在如下问题

- **Pod IP** 仅仅是集群内可见的虚拟 **IP**，外部无法访问
- **Pod IP** 会随着 **Pod** 销毁而消失，当 **ReplicaSet** 对 **Pod** 进行动态伸缩时，**Pod IP** 可能随时随地都会变化，对于访问服务带来了难度



#### 那么什么是 Serveice ？

**Service** 是一组 **Pod** 的服务抽象（*一种可以访问 **Pod** 的策略* ），也可以简单理解为逻辑上一组 **Pod** 的 **LB（*Load Balance*）**，负责将请求分发给对应的 **Pod** ，用来给 **Pod** 通信的

**svc** 一旦创建，即使重建，名称也不会改变 



#### 类型如下

- **Cluster IP：** 集群内部使用，默认值，用于负载
- **ExternalName：** 返回定义的 **CNAME** 别名，用于反代域名
- **NodePort：** 在所有安装了 **kube-proxy** 的节点上，打开一个可供外部访问 **pod** 的端口
- **loadBalancer：** 使用云提供商的负载均衡器公开服务
  - 如：阿里、腾讯云支持该格式，发请求并生成 **IP** 地址

### 1.1 Cluster IP（*负载均衡* ）

**Service** 会为这个 **LB** 提供一个 **Cluster IP** ，使用 **Service** 对象，通过 **selector 进行标签选择**，即可找到对应的 **Pod** 

```shell
# 每次都输入一串 kubectl xxx太累，可以起别名
$ alias kd='kubectl -n uit'

# 此时查看 pod 标签，在 deploy 配置中曾指定了 app=myblog
$ kd get po --show-labels
NAME                     READY   STATUS    RESTARTS   AGE     LABELS
mysql-6fbb5cc967-48dfd   1/1     Running   0          2d12h   app=mysql,pod-template-hash=6fbb5cc967
ublog-5ff678657f-7qx5z   1/1     Running   0          42m     app=myblog,pod-template-hash=5ff678657f
ublog-5ff678657f-rk92z   1/1     Running   0          43m     app=myblog,pod-template-hash=5ff678657f
ublog-5ff678657f-tzspj   1/1     Running   0          42m     app=myblog,pod-template-hash=5ff678657f
```

**Service** 的 **yaml** 文件如下

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ublog-svc
  namespace: uit
spec:
  ports:					# 若如 Nginx 有 80、443 则可以指定多个端口
  - port: 80				# Service 的端口 
    protocol: TCP			# 协议: UDP、TCP、SCTP  default: TCP
    targetPort: 8002		# 后端应用的端口（容器服务的）
  selector:
    app: myblog				# 通过标签过滤并选择应用
  type: ClusterIP
```

如上配置端口，**ServiceA** 访问 **ServiceB** 可利用  `servicea --> serviceb http://serviceb`，若端口非 **80**  , 假如是 **8080** 则通过  `http://serviceb:8080` 即可

创建 **Service** 并查看

```shell
# 创建 svc
$ kubectl create -f svc-ublog.yaml 
service/svc-ublog created

# 查看 svc，此时已创建了 CLUSTER-IP 10.105.146.135 80 端口的服务（建议自动生成 ClusterIP 而非指定）
$ kubectl -nuit get svc
NAME        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
svc-ublog   ClusterIP   10.105.146.135   <none>        80/TCP    7m51s


# 查看详情，此时发现 endpoints 已经代理了对应的 app = myblog
$ kubectl -nuit describe svc
Name:              svc-ublog
Namespace:         uit
Labels:            <none>
Annotations:       <none>
Selector:          app=myblog
Type:              ClusterIP
IP:                10.105.146.135
Port:              <unset>  80/TCP
TargetPort:        8002/TCP
Endpoints:         10.244.1.35:8002,10.244.2.32:8002,10.244.2.33:8002
Session Affinity:  None
Events:            <none>

# 此时访问 80 端口，服务正常
curl 10.105.146.135/blog/index/

# 缩容 ublog 服务
$ kubectl -n uit scale deploy ublog --replicas=2
deployment.apps/ublog scaled

# 查看svc详情，此时发现 endpoints 自动减一
$ kubectl -n uit describe svc
Name:              svc-ublog
Namespace:         uit
Labels:            <none>
Annotations:       <none>
Selector:          app=myblog
Type:              ClusterIP
IP:                10.105.146.135
Port:              <unset>  80/TCP
TargetPort:        8002/TCP
Endpoints:         10.244.1.35:8002,10.244.2.32:8002
Session Affinity:  None
Events:            <none>
```

::: tip 

创建 **Service** 时，若配置标签选择 **pod** ，会收集其 **IP**，自动创建同名的 **endpoints** 对象，若 **Pod** 上配置了 **readinessProbe**，检测失败时，**endpoints** 列表会剔除掉对应的 **Pod IP**，这样流量就不会分发到健康检测失败的 **Pod** 上

```shell
$ kubectl -n uit get endpoints svc-ublog
NAME        ENDPOINTS                           AGE
svc-ublog   10.244.1.35:8002,10.244.2.32:8002   21m
```

:::

再次改造 **MySQL**，创建 **Service**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: svc-mysql
  namespace: uit
spec:
  ports:
  - port: 3306
    protocol: TCP
    targetPort: 3306
  selector:
    app: mysql
  type: ClusterIP
```

创建并访问

```shell
$ kubectl create -f svc-mysql.yaml 
service/mysql created

$ kubectl -n uit get svc-mysql
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
svc-mysql   ClusterIP   10.98.22.166   <none>        3306/TCP   21s

$ curl 10.98.22.166:3306
```

::: warning 若用 hostNetwork 部署，通过宿主机 ip:port 形式访问，会有如下弊端

- 服务使用 **hostNetwork**，使得宿主机的端口大量暴漏，**存在安全隐患** 
- 容易引发端口冲突

因此，应该为 **MySQL** 创建 **Service**，并配到 **ublog** 的环境变量中，利用集群服务发现的能力，组件间通过 **Service Name** 访问

::: 

### 1.2 服务发现（*环境变量去 IP 化* ）

**k8s** 集群中，组件间可以通过 **Service Name** 实现通信，**Pods** 间，无需通过 **固定环境变量 IP** 的形式

```shell
# 查看上文创建的 svc
$ kubectl -n uit get svc svc-mysql
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
svc-mysql   ClusterIP   10.98.22.166   <none>        3306/TCP   151m

# 访问任意一个业务 pod ublog
$ kubectl -n uit exec -ti ublog-5ff678657f-rk92z /bin/bash

# curl cluster ip，可正常连通 MySQL
curl 10.98.22.166:3306

# curl svc-mysql，发现依然可正常连通 MySQL，
curl svc-mysql:3306
```

尽管 **Pod IP** 和 **Cluster IP** 都不固定（***重启会变更*** ），但 **Service Name** 是固定的，且完全具有跨集群的可移植性，实现原理如下

```shell
# 查看当前的 DNS 配置，发现有个 10.96.0.10 的 IP
cat /etc/resolv.conf 
nameserver 10.96.0.10
search uit.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

# 退出容器，并查看所有命名空间，发现 kube-system 下有个 kube-dns，它的 IP 刚好同上
$ kubectl get svc --all-namespaces
NAMESPACE              NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                  AGE
default                kubernetes                  ClusterIP   10.96.0.1        <none>        443/TCP                  23d
kube-system            kube-dns                    ClusterIP   10.96.0.10       <none>        53/UDP,53/TCP,9153/TCP   23d
kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   10.96.54.184     <none>        8000/TCP                 22d
kubernetes-dashboard   kubernetes-dashboard        NodePort    10.97.63.15      <none>        443:30100/TCP            22d
uit                    svc-mysql                   ClusterIP   10.98.22.166     <none>        3306/TCP                 157m
uit                    svc-ublog                   ClusterIP   10.105.146.135   <none>        80/TCP                   3h5m

# 查看 kube-dns 这个 Service 详情，发现选择器 Selector 选了 k8s-app=kube-dns 这个标签
$ kubectl -n kube-system describe svc kube-dns
Name:              kube-dns
Namespace:         kube-system
Labels:            k8s-app=kube-dns
                   kubernetes.io/cluster-service=true
                   kubernetes.io/name=KubeDNS
Annotations:       prometheus.io/port: 9153
                   prometheus.io/scrape: true
Selector:          k8s-app=kube-dns
Type:              ClusterIP
IP:                10.96.0.10
Port:              dns  53/UDP
TargetPort:        53/UDP
Endpoints:         10.244.0.5:53,10.244.0.6:53
Port:              dns-tcp  53/TCP
TargetPort:        53/TCP
Endpoints:         10.244.0.5:53,10.244.0.6:53
Port:              metrics  9153/TCP
TargetPort:        9153/TCP
Endpoints:         10.244.0.5:9153,10.244.0.6:9153
Session Affinity:  None
Events:            <none>

# 根据 选择器的标签过滤 找Pod，发现是初始化时的 coredns 
$ kubectl -n kube-system get po -l k8s-app=kube-dns -owide
NAME                       READY   STATUS    RESTARTS   AGE   IP           NODE             NOMINATED NODE   READINESS GATES
coredns-58cc8c89f4-hzprn   1/1     Running   1          23d   10.244.0.5   k8s-master-171   <none>           <none>
coredns-58cc8c89f4-vvj77   1/1     Running   2          23d   10.244.0.6   k8s-master-171   <none>           <none>

`初始化时创建了 coredns 然后建立 kube-dns 这个service（固定IP），后续新建 Pod 便可注入到 DNS 配置中，最终解析的就是 coredns 的 IP, coredns 见 2.4`
```

故容器内部组件间调用，完全可以通过 **Service Name**（类似域名）来解析 **IP** 通信，避免了大量 **IP** 维护的成本，因此再次对部署进行优化改造

1. **MySQL** 去掉 **hostNetwork** 部署，使得服务只暴露在 **k8s** 集群内部网络环境中

   ```yaml
   ...
   hostNetwork: false			# 去掉此行 或 改为false
   ...
   ```

2. **configMap** 中的数据库 **HOST** 固定的 **IP** 地址换成 **Service Name**，这样跨环境时，配置内容可保持不变

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: ublog
     namespace: uit
   data:
     MYSQL_HOST: "svc-mysql"     # 此处替换为上文给 MySQL 创建的 Service
     MYSQL_PORT: "3306"
   ```

   重新执行

   ```shell
   $ kubectl apply -f configmap.yaml
   $ kubectl apply -f deploy-mysql.yaml
   
   # 也可以删除 configmap 再通过 .txt 重建
   $ kubectl -n uit delete cm ublog
   $ kubectl -n uit create configmap ublog --from-env-file=configmap.txt
   ```

::: tip

同一个 **NameSpace** 下，可以直接通过 **ServiceName** 来进行访问，而跨 **NameSpace** 访问，需要 **ServiceName + 后缀 .namespace** 的方式访问

:::

### 1.3 NodePort（*外部访问* ）

**Cluster IP** 为虚拟地址，只能在 **k8s** 集群内部进行访问，集群外部如果访问内部服务，可以配置 **NodePort**

若不指定 **NodePort** 端口，则会默认在 **30000-32767（*端口号* ）** 中随机使用其中一个

#### 使用场景

通常用于 **临时** 需要访问 **MySQL** 之类的中间件才使用，性能差，**不推荐使用**

- **Service** 一旦变多，其性能也随之大幅下降
- 维护各种端口的成本过高、太复杂，推荐使用 **ingress**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: svc-np-ublog
  namespace: uit
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8002
    nodePort: 32333				# 这里还是手动指定了端口 32333 看效果
  selector:
    app: myblog
  type: NodePort				# 只需将之前的 Cluster IP 改为 NodePort 即可
```

创建并查看服务

```shell
# 创建 svc
$ kubectl create -f svc-np-ublog.yaml
service/svc-np-ublog created

# 查看当前服务
$ kubectl -n uit get svc
NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
svc-mysql      ClusterIP   10.98.22.166     <none>        3306/TCP       2d11h
svc-np-ublog   NodePort    10.107.82.31     <none>        80:32543/TCP   4m57s
svc-ublog      ClusterIP   10.105.146.135   <none>        80/TCP         2d11h

# 查看详情
$ kubectl -n uit describe svc svc-np-ublog 
Name:                     svc-np-ublog
Namespace:                uit
Labels:                   <none>
Annotations:              <none>
Selector:                 app=myblog
Type:                     NodePort
IP:                       10.107.82.31
Port:                     <unset>  80/TCP
TargetPort:               8002/TCP
NodePort:                 <unset>  32543/TCP
Endpoints:                10.244.1.35:8002,10.244.2.32:8002
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

此时发现类型变为 `Type: NodePort` ，且多了随机的端口 `NodePort: <unset> 32543/TCP`，但 **CLUSTER-IP** 和 **Endpoints** 依然没变

```shell
# 故可删除之前的 svc
kubectl delete -f svc-ublog.yaml 
service "svc-ublog" deleted

# 同时发现，集群内每个节点的 NodePort 端口都会进行监听
$ curl 192.168.3.171:32333/blog/index/
$ curl 192.168.3.172:32333/blog/index/
$ curl 192.168.3.173:32333/blog/index/
```

**k8s** 集群的 **业务 Pod** 变为类似 **高可用** 一样，都能在浏览器上，通过每个节点的 **IP**，对服务进行外部访问（*即使该节点未跑对应的业务 Pod* ）

- http://192.168.3.171:32333/blog/index/  
- http://192.168.3.172:32333/blog/index/  
- http://192.168.3.173:32333/blog/index/  

::: note 此时会有如下疑惑？

1. **NodePort** 的端口监听，是如何转发到对应的 **Pod** 服务的？
2. **CLUSTER-IP** 是  **虚拟 IP**，集群内是如何通过这个 **虚拟 IP** 访问到具体的 **Pod** 服务的？

:::

### 1.4 Service 实现原理

```shell
# 查看 32333 端口的监听，看到如下 kube-proxy 在监听
$ netstat -ntpl |grep 32333
tcp6       0      0 :::32333                :::*                    LISTEN      28426/kube-proxy  
```

#### CoreDNS

用于 **k8s** 集群内部 **Service** 的解析，可以让 **Pod** 把 **Service** 名称解析为 **IP** 地址，然后通过 **IP** 连接到对应的应用上

::: tip

- **Go** 语言实现的链式插件，**CNCF** 成员，是个高性能、易扩展的 **DNS** 服务端

- 生产环境中，一定要启用多个，应对集群规模

:::

```shell
# 查看 coredns
$ kubectl -n kube-system get po -o wide|grep dns
coredns-58cc8c89f4-hzprn                 1/1     Running   1          28d   10.244.0.5      k8s-master-171   <none>           <none>
coredns-58cc8c89f4-vvj77                 1/1     Running   2          28d   10.244.0.6      k8s-master-171   <none>           <none>

# 进入 myblog 的 pod ，查看 DNS解析
$ kubectl -n uit exec -ti ublog-5ff678657f-7qx5z bash
$ cat /etc/resolv.conf
nameserver 10.96.0.10
search uit.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

# 10.96.0.10 怎么来的， 查看svc 发现有 kube-dns 服务 
# .10是默认给 dns用的
$ kubectl -n kube-system get svc
NAME       TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)                  AGE
kube-dns   ClusterIP   10.96.0.10   <none>        53/UDP,53/TCP,9153/TCP   28d

# .1 网段是默认给 Kubernetes 用的
$ kubectl get svc
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   28d
```

- 启动 **Pod** 的时，会把 **kube-dns** 服务的 **Cluster IP** 地址注入到 **Pod** 的 **resolve** 解析配置中 
- 同时添加对应 **namespace** 的 **search** 域（*后面的一连串域名* ）
- 因此通过 **service name 跨命名空间访问** 的话，需要添加对应的 **namespace** 名称 
  - 如： `service_name.namespace_name` 

#### kube-proxy

[官方文档](https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies)  未来也许会被 **Cilium** 、 **eBPF（*机制* ）** 原生替代

**运行在每个节点上**， 负责 **Pod** 间的 **通信** 和 **负载均衡**，监听 **API Server** 中服务对象的变化，再通过创建流量路由规则来实现网络的转发，有如下模式 

- ~~**User space**, 让 Kube-Proxy 在用户空间监听一个端口，所有的 Service 都转发到这个端口，然后 Kube-Proxy 在内部应用层对其进行转发 ， 所有报文都走一遍用户态，性能不高，k8s v1.2版本后废弃~~。

- **Iptables：** 当前默认模式，**完全由 IPtables 来实现**， 通过各个节点上的 **iptables** 规则来实现 **service** 的负载均衡，但是随着 **service** 数量的增大，**iptables** 模式由于线性查找匹配、全量更新等特点，其性能会显著下降

- **IPVS：** 监听 **Master** 节点 增加和删除 **service** 以及 **endpoint** 的消息，调用 **Netlink** 创建对应 **IPVS** 规则，将流量转发到对应的 **Pod** 上

  - 与 **iptables** 同样基于 **Netfilter（*iptable内核态的一种实现*）**，采用 **hash** 表，因此当 **service** 数量达到一定规模时，**hash** 查表速度快，从而提高 **service** 的服务性能
  - **k8s 1.8** 版本开始引入，**1.11** 版本开始稳定，需要开启宿主机的 **ipvs** 模块

  ```shell
  # 客户端工具 查看 配置规则
  $ ipvsadm -ln
  ```

##### **Iptables 抓包流程**


```shell {9-10,}
# 查看 svc-np-ublog 的 iptables
$ iptables-save  |grep svc-np-ublog
-A KUBE-NODEPORTS -p tcp -m comment --comment "uit/svc-np-ublog:" -m tcp --dport 32333 -j KUBE-MARK-MASQ
-A KUBE-NODEPORTS -p tcp -m comment --comment "uit/svc-np-ublog:" -m tcp --dport 32333 -j KUBE-SVC-FQQJWIJEBH5A6SF6
-A KUBE-SERVICES ! -s 10.244.0.0/16 -d 10.107.82.31/32 -p tcp -m comment --comment "uit/svc-np-ublog: cluster IP" -m tcp --dport 80 -j KUBE-MARK-MASQ
-A KUBE-SERVICES -d 10.107.82.31/32 -p tcp -m comment --comment "uit/svc-np-ublog: cluster IP" -m tcp --dport 80 -j KUBE-SVC-FQQJWIJEBH5A6SF6
`将IP 10.107.82.31 转发到 80端口，转向 KUBE-SVC-FQQJWIJEBH5A6SF6 这个链`

# 继续抓链
$ iptables-save|grep KUBE-SVC-FQQJWIJEBH5A6SF6
:KUBE-SVC-FQQJWIJEBH5A6SF6 - [0:0]
...
-A KUBE-SVC-FQQJWIJEBH5A6SF6 -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-U4JA5WF5RRIRERN5
-A KUBE-SVC-FQQJWIJEBH5A6SF6 -j KUBE-SEP-ME7MACTOWWVFKRBM
`静态 模式 随机 50%的可能性 打到 KUBE-SEP-U4JA5WF5RRIRERN5 链上`

# 进一步抓取 KUBE-SEP-U4JA5WF5RRIRERN5
$ iptables-save|grep KUBE-SEP-U4JA5WF5RRIRERN5
:KUBE-SEP-U4JA5WF5RRIRERN5 - [0:0]
-A KUBE-SEP-U4JA5WF5RRIRERN5 -s 10.244.1.35/32 -j KUBE-MARK-MASQ
-A KUBE-SEP-U4JA5WF5RRIRERN5 -p tcp -m tcp -j DNAT --to-destination 10.244.1.35:8002
-A KUBE-SVC-FQQJWIJEBH5A6SF6 -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-U4JA5WF5RRIRERN5
`此时 DNAT 到了具体的 Pod IP 10.244.1.35:8002 上`

# KUBE-SEP-ME7MACTOWWVFKRBM 也是如此
iptables-save|grep KUBE-SEP-ME7MACTOWWVFKRBM
:KUBE-SEP-ME7MACTOWWVFKRBM - [0:0]
-A KUBE-SEP-ME7MACTOWWVFKRBM -s 10.244.2.32/32 -j KUBE-MARK-MASQ
-A KUBE-SEP-ME7MACTOWWVFKRBM -p tcp -m tcp -j DNAT --to-destination 10.244.2.32:8002
-A KUBE-SVC-FQQJWIJEBH5A6SF6 -j KUBE-SEP-ME7MACTOWWVFKRBM
```

此时发现是按照 **Pod** 进行流量分配的，若要 **灰度发布**，做 **流量分配 / 治理** 仍无法实现，需要 **istio**

```shell
# 重建 pod
$ kubectl -n demo delete po mysql-7f747644b8-6npzn

# 去掉 taint
$ kubectl taint node k8s-slave1 smoke-
$ kubectl taint node k8s-slave2 drunk-

# myblog不用动，会自动因健康检测不过而重启
```

### 1.5 Endpoints 代理外部应用（*代理* ）

经常有需要代理 **k8s** 外部应用的需求，**应用场景如下** 

- 希望在生产环境上使用固定名称（*如：服务名* ），而非通过 **IP** 地址去访问外部的中间件服务
  - 如: 不希望各团队维护不同 **k8s** 集群时，还维护各种中间件的配置文件，此时可以直接通过 **svc** 反代来统一配置文件
- 希望 **Service** 指向另一个**NameSpace** 中或 **其他集群** 中的服务
  - 比如: **一些外部的存储集群的管理平台** 不去部署于 **k8s** 中，此时也可通过 **k8s** 的服务进行代理  
  - 跨命名空间时不想使用 **.namespace** 后缀形式访问（*不推荐* ）
- 某个项目正在迁移至 **k8s** 集群，但一部分服务依然在集群外，此时可使用 **Service** 代理至 **k8s** 集群外部的服务（*避免迁移重启* ）
  - 比如：之前 **Web** 通过 **172.16.120.111** 形式访问数据库，**Web** 迁过来改为通过 **Service 代理形式** 访问，再将数据库迁移过来时无需重启 **Web** 服务

#### 反代 IP

以代理百度为例，先编写 **svc** 文件

```ini
$ kubectl -n dev get svc -o yaml > svc-proxy.yaml
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
svc-nignx   ClusterIP   None             <none>        80/TCP    29d
svc-proxy   ClusterIP   10.100.128.239   <none>        80/TCP    11h
```

此时查看 **svc** 可获取自动分配的 **IP**，接下来编写 **endpoints** 来关联代理

```ini
# 先获取百度目前的IP
$ ping www.baidu.com
64 bytes from 14.215.177.38 (14.215.177.38): icmp_seq=1 ttl=56 time=6.87 ms

# 编写 endpoints
$ vim ep-proxy.yaml

----------------------------
apiVersion: v1
kind: Endpoints
metadata:
  label:
    app: svc-poroxy		# 需和 svc 的一致来进行关联
  name: svc-proxy
  namespace: dev
subsets:				# 
- addresses:
  - ip: 14.215.177.38	# 填写代理的IP地址
  ports:
  - name: http
    port: 80
    protocol: TCP		# 协议需和 svc 的一致
    
----------------------------

$ kubectl apply -f ep-proxy.yaml
#此时 svc 关联的 ep 已生成，且会随着 svc 的消失而消失
$ kubectl -n dev get ep

# curl svc 的 IP 此时发现有相应
$ curl 10.100.128.239 -I
```

若更换了 **IP** 无需重启应用程序，只需要改动 **endpoints** 文件的 `ip` ，然后 `kubectl replace -f` 即可

#### ExternalName（*反代域名* ）

若需反代域名，则需要更改 **svc** 的类型为 **ExternalName** 

```ini
vim svc-proxyName.yaml
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
```

此时进入 **busybox** 中尝试通过代理的服务名访问

```shell
$ kubectl -ndev exec -ti busybox -- sh

# 通过代理的域名请求资源，访问不通是由于跨域造成的
$ wget svc-proxy-name
Connecting to svc-proxy-name (14.215.177.38:80)
wget: server returned error: HTTP/1.1 403 Forbidden

# 域名解析
$ nslookup svc-proxy-name
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

Name:      svc-proxy-name
Address 1: 14.215.177.38
Address 2: 14.215.177.39

# 直接请求，则可通过
$ wget 14.215.177.38
Connecting to 14.215.177.38 (14.215.177.38:80)
index.html           100% |*****************************]
```

由于跨域问题，该场景使用较少

## 2. Ingress（*流量路由* ）

[官方文档](https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/)

同 **k8s** 的资源类型，对于 **k8s** 的 **Service**，无论是 **Cluster IP** 还是 **NodePort**，都是 **四层负载**，要让集群内的服务实现 **七层负载均衡**，要借助于 **Ingress** 

- **Ingress 控制器：** 其实现方式很多，比如 **Nginx**, **Contour**, **Haproxy**, **trafik**, **Istio**，后续 **Nginx** 实现为例
- **发布方式：** 
  - 它既可以实现 **端口** 的方式，同时可以实现 **域名** 的方式访问 **k8s** 内部应用 
  - 通常内部通过域名，反代到业务节点，**ingress** 上层可能还有 **F5**，**LVS**，**SLB**，**ELB** 等作为入口再反代到**ingress** 上，然后 **将购买的 域名 解析到 F5、阿里云等LB上** 
  - 由于是 **k8s** 中通过 **IPVS** 实现的一种 **内核级** 的转发，因此还是很快的，今后可能还使用 **EBPF** 等东西，速度更快

### 2.1 Ingress-nginx 安装

是 **k8s** 官方维护的控制器（*同步更新* ）[官方文档](https://kubernetes.github.io/ingress-nginx/) 

**Ingress-nginx** 是 **7 层的负载均衡器** ，负责统一管理外部对 **k8s cluster** 中 **Service** 的请求，包含如下

- **ingress-nginx-controller：** 根据用户编写的 **ingress** 规则（*创建的 ingress 的 yaml 文件* ），动态的去更改**nginx** 服务的配置文件，并且 **reload** 重载使其生效（*是自动化的，通过 lua 脚本来实现* ）
- **ingress资源对象：** 将 **Nginx** 的配置抽象成一个 **Ingress** 对象，每添加一个新的 **Service** 资源对象只需写一个新的 **Ingress** 规则的 **yaml** 文件即可（*或修改已存在的 ingress 规则的 yaml 文件* ）

[Ingress-nginx 官方文档](https://kubernetes.github.io/ingress-nginx/deploy/) ，推荐使用 **[Helm](/tool/Kubernetes/Helm安装使用.html)** 安装

[Artifact Hub中查找](https://artifacthub.io/packages/helm/ingress-nginx/ingress-nginx) 这是来源于 **Kubernetes** 维护的官方 **Helm** 仓库

```shell
# 通过 helm 添加 ingress-nginx 仓库
$ helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

# 查看添加的仓库
$ helm repo list
NAME         	URL                                          
ingress-nginx	https://kubernetes.github.io/ingress-nginx

# 查看仓库中 ingress-nginx 的版本
$ helm search repo ingress-nginx
NAME                       	CHART VERSION	APP VERSION	DESCRIPTION
ingress-nginx/ingress-nginx	4.4.0        	1.5.1      	Ingress controller for Kubernetes using NGINX a...

# 虽然需要 APP VERSION >= 0.40.2 (bug少)，但是  CHART VERSION 4.4.0 太高了，安装会报错，

```

此时要下 **降级** 的包，这里是 **CHART VERSION == 3.18.0**

```shell
# 通过命令 search 所有版本的包
$ helm search repo ingress-nginx -l
...
ingress-nginx/ingress-nginx	3.18.0        	0.42.0     	An nginx Ingress controller that uses ConfigMap...

# pull 包指定版本号
$ helm pull ingress-nginx/ingress-nginx --version 3.18.0

# 网络失败，多试几次，下载后会多出个 3.18.0 的 tar 包
$ ls
anaconda-ks.cfg  dev  `ingress-nginx-3.18.0.tgz`  k8s_install  kube-prometheus  prom  test

# 解压，进入目录
$ tar -xf ingress-nginx-3.18.0.tgz
$ cd ingress-nginx/

# 如下是配置文件
$ ls
CHANGELOG.md  Chart.yaml  ci  OWNERS  README.md  README.md.gotmpl  templates  values.yaml
```

修改 **ingress** 配置文件

```ini
# 打开 values.yaml 修改镜像地址等配置
$ vim values.yaml

------------------------------
# 修改镜像源地址，并去掉哈希值
+ repository: docker.io/willdockerhub/ingress-nginx-controller
- digest 
...

# 推荐使用 hostNetwork 部署，走宿主机端口，性能好一些, 且推荐使用 DaemonSet部署
+ dnsPolicy: ClusterFirstWithHostNet
+ hostNetwork: true
+ kind: DaemonSet
# 必须修改 dns 策略 否则 ingress pod 是解析不了 k8s 内部的 Service
...

# 设置有 ingress 为 true 标签的节点才部署
nodeSelector:
kubernetes.io/os: linux
+ ingress: "true"
# 生产环境中建议修改 resources 需要给大点，毕竟是 k8s 的入口
...

# 非云环境，type 是不需要使用 LoadBalancer 的，IDC 机房直接使用 ClusterIP 即可
+ type: ClusterIP
# 云的话，会向云发个请求，然后得到公有云分配的 IP 地址，之后将购买的域名解析到公有云的 IP 即可
...

# 查看转轴控制 是否证书会报错 0.42 前会，将 enabled 修改
admissionWebhooks:
  enabled: ...
...

# kube-webhook-certgen 的镜像地址同样修改
+ repository: egistry.aliyuncs.com/google_containers/kube-webhook-certgen
------------------------------

# 如上镜像地址都是网上抄的，若 pull 失败，百度下载离线
docker pull quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.xx.0
docker pull 能用的国内地址/k8s/defaultbackend-amd64:x.xx
```

::: warning 注意

若使用 **Deployment** 方式部署，则不使用 **hostNetwork**，因为是随机部署的，可能部署在同一个宿主机导致端口冲突

**DaemonSet** 更容易控制与某个节点，直接在宿主机上暴露端口号，**k8s** 外部的负载均衡，可以直接代理到 **ingress** 所在节点的 **IP** 和端口号上，而使用 **Deployment + NodePort** 方式性能差难维护

:::

使用 **Helm** 安装

```shell
# 创建命名空间并安装
$ kubectl create ns ingress-nginx

# -n 指定 namespace
$ helm install ingress-nginx -n ingress-nginx .

# 出现如下，貌似密码 base64 转码啥的
NAME: ingress-nginx
...
If TLS is enabled for the Ingress, a Secret containing the certificate and key must also be provided:

  apiVersion: v1
  kind: Secret
  metadata:
    name: example-tls
    namespace: foo
  data:
    tls.crt: <base64 encoded cert>
    tls.key: <base64 encoded key>
  type: kubernetes.io/tls

# 查看 pod 等待下载镜像, Running 则成功
$ kubectl -n ingress-nginx get po -w
NAME                             READY   STATUS              RESTARTS   AGE
ingress-nginx-controller-22lhv   0/1     ContainerCreating   0          23s
ingress-nginx-controller-22lhv   0/1     Running             0          46s
ingress-nginx-controller-22lhv   1/1     Running             0          63s


```

之后 **DaemonSet** 会在指定的节点上起 **ingress pod** 并暴露 **80** 和 **443** 端口

#### ingress 扩容缩容

若需扩充 **ingress pod**，可直接其他节点打标签，**DaemonSet** 会持续监听并部署

```shell
$ kubectl label node k8s-slave-173 ingress=true

# 此时查看已扩容，正在部署
$ kubectl -n ingress-nginx get po
NAME                             READY   STATUS              RESTARTS   AGE
ingress-nginx-controller-22lhv   1/1     Running             0          7m49s
ingress-nginx-controller-2gvv6   0/1     ContainerCreating   0          16s
```

外部的 **WebLB** 再将扩容的节点地址写入即可，缩容直接删标签即可

```shell
$ kubectl label node k8s-slave-173 ingress-

# 此时查看已缩容，正在销毁
kubectl -n ingress-nginx get po
NAME                             READY   STATUS        RESTARTS   AGE
ingress-nginx-controller-22lhv   1/1     Running       0          12m
ingress-nginx-controller-2gvv6   1/1     Terminating   0          4m58s
```

需要先将外部的 **WebLB** 配置的地址删除，再执行如上缩容操作，保证请求正常



### 2.2 ingress 使用（发布流程）

如上已经安装完 **ingress-nginx** 的 控制器了，之后可以编写 **yaml** 来创建 **Ingress** 示例

配置域名通常用 [Annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/)  

只需创建一次 **Ingress** 实例，即可自动生成 **nginx** 配置，

若灰度发布、跨域、限速等配置，其配置文件写于 **Annotations** 里面，**ingress controller** 会分析 **ingress** 实例，从 **Annotations** 里面读取配置（*具有校验功能* ），生成 **nginx** 配置文件

示例： 通过配置 **ingress** 域名反代到 **nginx** 服务上，如下创建一个名为 **example** 的 **ingress**

```ini
$ vim ingress.yaml

# ingress 需要和服务在同一个 namespace 下, 
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: "nginx"
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
```

**apiVersion：**

- `networking.k8s.io/v1beta1` 会在 **1.22** 后废弃
- `networking.k8s.io/v1:` **1.22** 之后的
- `extensinos/v1beta1:` 最开始的版本，已废弃

**annotations：**告诉接口，声明使用的 **配置实例** 是什么，这是由于集群中可能不止一个 **ingress** 控制器

- `kubernetes.io/ingress.class：` 如上实例是 **ingress-nginx** （*在上文 **value.yaml** 中指定* ）

```shell
$ cat values.yaml |grep ingressClass
#  ingressClass: nginx
```

**rules：** 固定写法，一个 **ingress** 可以配置多个 **rules** （*一个文件中可以指定多个域名*）

- `host：` 配置域名，若不写则是 **\*** 此时输入任何域名都会被解析，不推荐
- `path：` 相当于 **nginx** 的 **location** 配置，同一个 **hosts** 可以配置多个路径
- `backend:` 多个路径可以与不同的 **Service** 关联，上文表示一个域名下的两个路径，可通过 **svc** 访问

创建 **ingress**

```shell
$ kubectl create -f ingress.yaml 
ingress.networking.k8s.io/rewrite created

# 查看 ingress
$ kubectl -n dev get ing
NAME      HOSTS           ADDRESS          PORTS   AGE
example   nginx.bar.com   10.107.244.209   80      55s
```

配置 **hosts** 解析

```
192.168.3.172 nginx.bar.com
```

::: tip

若购买的域名，则解析到公司的 **LB** 上（***LB**是有地址的* ）然后 **LB** 再反代到 **k8s** 的 **ingress** 上，然后 **ingress** 再按着上面配置挨个来

:::

#### 动态更新实现逻辑

1. **ingress controller** 通过和 **k8s** 的 **api** 交互，动态感知集群中 **ingress** 规则变化
2. 读取 **ingress** 规则（*哪个域名对应哪个 **service*** ），按自定义的规则，生成 **nginx** 配置
3. 再写到 **nginx-ingress-controller** 的 **pod** 里，其 **pod** 里运行着一个 **Nginx** 服务，控制器把生成的 **nginx** 配置写入 `/etc/nginx.conf` 文件中，然后 **reload** 一下使配置生效

如下 **yaml** 文件

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: myblog
  namespace: uit
spec:
  rules:
  - host: myblog.devops.cn
    http:
    paths:
    - path: /
      backend:
      serviceName: myblog
      servicePort: 80
```

**ingress-nginx** 会动态生成 **upstream** 配置

```ini
...
server_name myblog.devops.cn ;

listen 80 ;
listen [::]:80 ;
listen 443 ssl http2 ;
listen [::]:443 ssl http2 ;

set $proxy_upstream_name "-";

ssl_certificate_by_lua_block {
certificate.call()
}

location / {

set $namespace "demo";
set $ingress_name "myblog";
...
```

若需要 **HTTPS** 访问，需要生成证书

```shell
# 自签名证书
$ openssl req -x509 -nodes -days 2920 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=*.devops.cn/O=ingress-nginx"

# 证书信息保存到 secret对象中，ingress-nginx 会读取 secret 对象解析出证书加载到 nginx 配置中
$ kubectl -n uit create secret tls https-secret --key tls.key --cert tls.crt
secret/https-secret created
```

如上配置后面新增 **tls** 即可

```yaml
tls:
- hosts:
- myblog.devops.cn
secretName: https-secret
```
