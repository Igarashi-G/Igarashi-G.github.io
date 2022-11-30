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

### 2.1 Ingress-nginx

是 **k8s** 官方维护的控制器（*同步更新* ）[官方文档](https://kubernetes.github.io/ingress-nginx/) 

**Ingress-nginx** 是 **7 层的负载均衡器** ，负责统一管理外部对 **k8s cluster** 中 **Service** 的请求，包含如下

- **ingress-nginx-controller：** 根据用户编写的 **ingress** 规则（*创建的 ingress 的 yaml 文件* ），动态的去更改**nginx** 服务的配置文件，并且 **reload** 重载使其生效（*是自动化的，通过 lua 脚本来实现* ）
- **ingress资源对象：** 将 **Nginx** 的配置抽象成一个 **Ingress** 对象，每添加一个新的 **Service** 资源对象只需写一个新的 **Ingress** 规则的 **yaml** 文件即可（*或修改已存在的 ingress 规则的 yaml 文件* ）

###### 示意图：

###### 实现逻辑

1）ingress controller通过和kubernetes api交互，动态的去感知集群中ingress规则变化
2）然后读取ingress规则(规则就是写明了哪个域名对应哪个service)，按照自定义的规则，生成一段nginx配置
3）再写到nginx-ingress-controller的pod里，这个Ingress controller的pod里运行着一个Nginx服务，控制器把生成的nginx配置写入/etc/nginx.conf文件中
4）然后reload一下使配置生效。以此达到域名分别配置和动态更新的问题。

### 安装

[ingress-nginx 官方文档](https://kubernetes.github.io/ingress-nginx/deploy/) ，推荐使用 **Helm** 安装

#### 安装 helm

 [Helm 官方文档](https://helm.sh/) ，仓库推荐用 [bitnami](https://github.com/bitnami/charts) 可以方便部署 **kafuka** 和 **zk** 

1. Download your [desired version](https://github.com/helm/helm/releases)
2. Unpack it (**tar -zxvf helm-v3.0.0-linux-amd64.tar.gz**)
3. Find the helm binary in the unpacked directory, and move it to its desired destination (**mv linux-amd64/helm /usr/local/bin/helm**)

```shell
# helm 安装 bitnami 
$ helm repo add bitnami https://charts.bitnami.com/bitnami
	# - add 仓库名称 地址
"bitnami" has been added to your repositories
	
# 搜索并安装 harbor 私有仓库
$ helm search repo harbor
$ helm install my-harbor bitnami/harbor

** Please be patient while the chart is being deployed **

1. Get the Harbor URL:

  NOTE: It may take a few minutes for the LoadBalancer IP to be available.
        Watch the status with: 'kubectl get svc --namespace default -w my-harbor'
    export SERVICE_IP=$(kubectl get svc --namespace default my-harbor --template "{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}")
    echo "Harbor URL: http://$SERVICE_IP/"

2. Login with the following credentials to see your Harbor application

  echo Username: "admin"
  echo Password: $(kubectl get secret --namespace default my-harbor-core-envvars -o jsonpath="{.data.HARBOR_ADMIN_PASSWORD}" | base64 -d)
```



```powershell
$ wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml
## 或者使用myblog/deployment/ingress/mandatory.yaml
## 修改部署节点
$ grep -n5 nodeSelector mandatory.yaml
212- spec:
213- hostNetwork: true #添加为host模式
214- # wait up to five minutes for the drain of connections
215- terminationGracePeriodSeconds: 300
216- serviceAccountName: nginx-ingress-serviceaccount
217: nodeSelector:
218- ingress: "true" #替换此处，来决定将ingress部署在哪些机器
219- containers:
220- - name: nginx-ingress-controller
221- image: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.30.0
222- args:
```

使用示例：`myblog/deployment/ingress.yaml`

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
name: myblog
namespace: demo
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

ingress-nginx动态生成upstream配置：

```yaml
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

###### 访问

域名解析服务，将 `myblog.devops.cn`解析到ingress的地址上。ingress是支持多副本的，高可用的情况下，生产的配置是使用lb服务（内网F5设备，公网elb、slb、clb，解析到各ingress的机器，如何域名指向lb地址）

本机，添加如下hosts记录来演示效果。

```json
192.168.136.128 myblog.devops.cn
```

然后，访问 http://myblog.devops.cn/blog/index/

HTTPS访问：

```powershell
#自签名证书
$ openssl req -x509 -nodes -days 2920 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=*.devops.cn/O=ingress-nginx"

# 证书信息保存到secret对象中，ingress-nginx会读取secret对象解析出证书加载到nginx配置中
$ kubectl -n demo create secret tls https-secret --key tls.key --cert tls.crt
secret/https-secret created
```

修改yaml

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
name: myblog-tls
namespace: demo
spec:
rules:
- host: myblog.devops.cn
http:
paths:
- path: /
backend:
serviceName: myblog
servicePort: 80
tls:
- hosts:
- myblog.devops.cn
secretName: https-secret
```

然后，访问 https://myblog.devops.cn/blog/index/