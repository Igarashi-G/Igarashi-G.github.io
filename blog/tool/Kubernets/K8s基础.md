---
title: Kubernets基础
date: 2022-09-27
category:
  - 运维
  - k8s
tag:
  - k8s
star: true
---

# Kubernets 基础

记录 **kubernetes** 相关文档、基础、使用说明等

<!-- more -->

## k8s 相关文档

[官网 | 学习 Kubernetes 基础知识 | Kubernetes](https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/)

[kubespray.io](https://kubespray.io/#/) 

[Kubernetes教程 | Kuboard](https://kuboard.cn/learning/)



查看k8s 或docker 日志

```shell
journalctl -fu docker | kubelet

# 也可以用docker 看日志
docker logs -f + container_id
```

使用Deployment管理Pod生命周期，实现服务不中断的滚动更新，通过服务发现来实现集群内部的服务间访问，并通过ingress-nginx实现外部使用域名访问集群内部的服务。同时介绍基于EFK如何搭建Kubernetes集群的日志收集系统。



## 1. Kubernetes 概述

纯 **Docker** （*容器模式*） 的运维管理很难，尤其涉及到跨容器网络通信，故诞生了容器调度管理平台 **Kubernetes** 

##### **架构图如下**

<img src="./img/架构图.png">

##### **包含如下核心组件**

- **[etcd]()：** 分布式高性能键值数据库，存储整个集群的所有元数据

- **ApiServer：** 接口服务器，集群资源访问控制入口，提供 **restful api** 及安全访问控制

- **Scheduler：** 调度器，把业务容器调度到合适节点

- **Controller Manager：** 控制器，确保集群资源 **按照期望的方式运行**
- **Replication Controller ** 
- **Node controller** 
- **ResourceQuota Controller** 
- **Namespace Controller** 
- **ServiceAccount Controller** 
- **Tocken Controller ** 
- **Service Controller ** 
- **Endpoints Controller** 

- **kubelet：** 节点代理，运行再每个节点上，管节点的
  - **pod：**  容器的抽象，最小资源调度单位，管容器的，被 **kubelet** 管的
  - **容器健康检查：** 检查容器是否正常运行，若运行出错，会按照**pod** 设置的重启策略处理
  - **容器监控：** 监控所在节点资源的，会定时向 **Master** 报告，资源使用数据通过 **cAdvisor** 获取的，对于 **pod** 调度和正常运行至关重要
  - **[kubectl](https://kubernetes.io/zh-cn/docs/reference/kubectl/)：** 命令行工具

- **cni：** 通用网络接口，如 **flannel** 等的网络插件，实现集群跨节点通信

##### **其工作流程**

<img src="./img/工作流程.png">

部署后则生成 **kubelet** 进程，可执行 **kubectl** 二进制命令行工具，其中

- **组件：** 为了支撑 **k8s** 平台的运行，安装好的软件
- **资源：** 被 **k8s** 管理的

```shell
# 查看 systemd 服务
systemctl status kubelet

# 查看 api资源
kubectl api-resources
```

##### **kubectl**的使用

类似于 **docker**，**[kubectl](https://kubernetes.io/zh-cn/docs/reference/kubectl/)** 是命令行工具，用于与APIServer交互，内置了丰富的子命令，功能强大

```powershell
$ kubectl -h
$ kubectl get -h
$ kubectl create -h
$ kubectl create namespace -h
# 管理集群资源
$ kubectl get po -v=7
```

 

## 2. 资源

### 2.1. namespace

命名空间，集群内一个虚拟的概念，类似于资源池的概念，一个池子里可以有各种资源类型，绝大多数的资源都必须属于某一个namespace。集群初始化安装好之后，会默认有如下几个namespace：

```shell
$ kubectl get ns	# or get namespaces

NAME                   STATUS   AGE
default                Active   10d
kube-node-lease        Active   10d
kube-public            Active   10d
kube-system            Active   10d
kubernetes-dashboard   Active   9d
```

- 所有NAMESPACED的资源，在创建的时候都需要指定namespace，若不指定，默认会在default命名空间下
- 相同namespace下的同类资源不可以重名，不同类型的资源可以重名
- 不同namespace下的同类资源可以重名
- 通常在项目使用的时候，我们会创建带有业务含义的namespace来做逻辑上的整合

### 2.2 Pod

**最小调度单元**，用来存放多个容器的（*豆荚*），为了与容器引擎（*Docker*）解耦，抽象出一层 **Pod** 让 **k8s** 进行调度，被 **kubelet** 定期 **watch** 更新状态写入 **etcd** 

```shell
## 查看命名空间 kube-system 下的 pods
$ kubectl -n kube-system get po
```

##### **使用 yaml格式 定义 Pod**

*myblog/one-pod/pod.yaml*

```yaml
apiVersion: v1
kind: Pod
metadata:
name: myblog
namespace: demo
labels:
component: myblog
spec:
containers:
- name: myblog
image: 172.21.32.6:5000/myblog
env:
- name: MYSQL_HOST # 指定root用户的用户名
value: "127.0.0.1"
- name: MYSQL_PASSWD
value: "123456"
ports:
- containerPort: 8002
- name: mysql
image: 172.21.32.6:5000/mysql:5.7-utf8
ports:
- containerPort: 3306
env:
- name: MYSQL_ROOT_PASSWORD
value: "123456"
- name: MYSQL_DATABASE
value: "myblog"
```

| apiVersion | 含义 |
| :--------- | :----------------------------------------------------------- |
| **alpha** | 进入 **k8s** 功能的早期候选版本，可能包含 **Bug**，最终不一定进入 **k8s** |
| **beta** | 已经过测试的版本，最终会进入 **k8s**，但功能、对象定义可能会发生变更 |
| **stable** | 可安全使用的稳定版本 |
| **v1** | **stable** 版本之后的首个版本，包含了更多的核心对象 |
| **apps/v1** | 使用最广泛的版本，像 **Deployment**，**ReplicaSets** 都已进入该版本 |

资源类型与 **apiVersion** 对照表

| Kind | apiVersion |
| :-------------------- | :-------------------------------------- |
| **ClusterRoleBinding** | **rbac.authorization.k8s.io/v1** |
| **ClusterRole** | **rbac.authorization.k8s.io/v1** |
| **ConfigMap** | **v1** |
| **CronJob** | **batch/v1beta1** |
| **DaemonSet** | **extensions/v1beta1** |
| **Node** | **v1** |
| **Namespace** | **v1** |
| **Secret** | **v1** |
| **PersistentVolume** | **v1** |
| **PersistentVolumeClaim** | **v1** |
| **Pod** | **v1** |
| **Deployment** | **v1、apps/v1、apps/v1beta1、apps/v1beta2** |
| **Service** | **v1** |
| **Ingress** | **extensions/v1beta1** |
| **ReplicaSet** | **apps/v1、apps/v1beta2** |
| **Job** | **batch/v1** |
| **StatefulSet** | **apps/v1、apps/v1beta1、apps/v1beta2** |

快速获得资源和版本

```shell
$ kubectl explain pod
$ kubectl explain Pod.apiVersion
```

##### 创建和访问Pod

[基于Docker和Kubernetes的企业级DevOps实践训练营_51CTO博客_kubernetes和docker关系](https://blog.51cto.com/u_14691718/5093025)

[基于Docker和Kubernetes的企业级DevOps实践训练营_Alex_996的博客-CSDN博客](https://blog.csdn.net/weixin_43336281/article/details/107431104)

```powershell
## 创建namespace, namespace是逻辑上的资源池
$ kubectl create namespace demo

## 使用指定文件创建Pod
$ kubectl create -f demo-pod.yaml

## 查看pod，可以简写po
## 所有的操作都需要指定namespace，如果是在default命名空间下，则可以省略
$ kubectl -n demo get pods -o wide
NAME READY STATUS RESTARTS AGE IP NODE
myblog 2/2 Running 0 3m 10.244.1.146 k8s-slave1

## 使用Pod Ip访问服务,3306和8002
$ curl 10.244.1.146:8002/blog/index/

## 进入容器,执行初始化, 不必到对应的主机执行docker exec
$ kubectl -n demo exec -ti myblog -c myblog bash
/ # env
/ # python3 manage.py migrate
$ kubectl -n demo exec -ti myblog -c mysql bash
/ # mysql -p123456

## 再次访问服务,3306和8002
$ curl 10.244.1.146:8002/blog/index/

```

###### Infra容器

登录`k8s-slave1`节点

```powershell
$ docker ps -a |grep myblog ## 发现有三个容器
## 其中包含mysql和myblog程序以及Infra容器
## 为了实现Pod内部的容器可以通过localhost通信，每个Pod都会启动Infra容器，然后Pod内部的其他容器的网络空间会共享该Infra容器的网络空间(Docker网络的container模式)，Infra容器只需要hang住网络空间，不需要额外的功能，因此资源消耗极低。

## 登录master节点，查看pod内部的容器ip均相同，为pod ip
$ kubectl -n demo exec -ti myblog -c myblog bash
/ # ifconfig
$ kubectl -n demo exec -ti myblog -c mysql bash
/ # ifconfig
```

pod容器命名: ```k8s_<container_name>_<pod_name>_<namespace>_<random_string>```

 

###### 查看pod详细信息

```powershell
## 查看pod调度节点及pod_ip
$ kubectl -n demo get pods -o wide
## 查看完整的yaml
$ kubectl -n demo get po myblog -o yaml
## 查看pod的明细信息及事件
$ kubectl -n demo describe pod myblog
```

 

###### Troubleshooting and Debugging

```powershell
#进入Pod内的容器
$ kubectl -n <namespace> exec <pod_name> -c <container_name> -ti /bin/sh

#查看Pod内容器日志,显示标准或者错误输出日志
$ kubectl -n <namespace> logs -f <pod_name> -c <container_name>
```

 

###### 更新服务版本

```powershell
$ kubectl apply -f demo-pod.yaml
```

###### 删除Pod服务

```powershell
#根据文件删除
$ kubectl delete -f demo-pod.yaml

#根据pod_name删除
$ kubectl -n <namespace> delete pod <pod_name>
```

###### Pod数据持久化

若删除了Pod，由于mysql的数据都在容器内部，会造成数据丢失，因此需要数据进行持久化。

- 定点使用hostpath挂载，nodeSelector定点

`myblog/one-pod/pod-with-volume.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
name: myblog
namespace: demo
labels:
component: myblog
spec:
volumes:
- name: mysql-data
hostPath:
path: /opt/mysql/data
nodeSelector: # 使用节点选择器将Pod调度到指定label的节点
component: mysql
containers:
- name: myblog
image: 172.21.32.6:5000/myblog
env:
- name: MYSQL_HOST # 指定root用户的用户名
value: "127.0.0.1"
- name: MYSQL_PASSWD
value: "123456"
ports:
- containerPort: 8002
- name: mysql
image: 172.21.32.6:5000/mysql:5.7-utf8
ports:
- containerPort: 3306
env:
- name: MYSQL_ROOT_PASSWORD
value: "123456"
- name: MYSQL_DATABASE
value: "myblog"
volumeMounts:
- name: mysql-data
mountPath: /var/lib/mysql
```

保存文件为`pod-with-volume.yaml`，执行创建

```powershell
## 若存在旧的同名服务，先删除掉，后创建
$ kubectl -n demo delete pod myblog
## 创建
$ kubectl create -f pod-with-volume.yaml

## 此时pod状态Pending
$ kubectl -n demo get po
NAME READY STATUS RESTARTS AGE
myblog 0/2 Pending 0 32s

## 查看原因，提示调度失败，因为节点不满足node selector
$ kubectl -n demo describe po myblog
Events:
Type Reason Age From Message
---- ------ ---- ---- -------
Warning FailedScheduling 12s (x2 over 12s) default-scheduler 0/3 nodes are available: 3 node(s) didn't match node selector.

## 为节点打标签
$ kubectl label node k8s-slave1 component=mysql

## 再次查看，已经运行成功
$ kubectl -n demo get po
NAME READY STATUS RESTARTS AGE IP NODE
myblog 2/2 Running 0 3m54s 10.244.1.150 k8s-slave1

## 到k8s-slave1节点，查看/opt/mysql/data
$ ll /opt/mysql/data/
total 188484
-rw-r----- 1 polkitd input 56 Mar 29 09:20 auto.cnf
-rw------- 1 polkitd input 1676 Mar 29 09:20 ca-key.pem
-rw-r--r-- 1 polkitd input 1112 Mar 29 09:20 ca.pem
drwxr-x--- 2 polkitd input 8192 Mar 29 09:20 sys
...

## 执行migrate，创建数据库表，然后删掉pod，再次创建后验证数据是否存在
$ kubectl -n demo exec -ti myblog python3 manage.py migrate

## 访问服务，正常
$ curl 10.244.1.150:8002/blog/index/

## 删除pod
$ kubectl delete -f pod-with-volume.yaml

## 再次创建Pod
$ kubectl create -f pod-with-volume.yaml

## 查看pod ip并访问服务
$ kubectl -n demo get po -o wide
NAME READY STATUS RESTARTS AGE IP NODE
myblog 2/2 Running 0 7s 10.244.1.151 k8s-slave1

## 未做migrate，服务正常
$ curl 10.244.1.151:8002/blog/index/
```

- 使用PV+PVC连接分布式存储解决方案
- ceph
- glusterfs
- nfs

###### 服务健康检查

检测容器服务是否健康的手段，若不健康，会根据设置的重启策略（restartPolicy）进行操作，两种检测机制可以分别单独设置，若不设置，默认认为Pod是健康的。

两种机制：

- LivenessProbe探针
用于判断容器是否存活，即Pod是否为running状态，如果LivenessProbe探针探测到容器不健康，则kubelet将kill掉容器，并根据容器的重启策略是否重启，如果一个容器不包含LivenessProbe探针，则Kubelet认为容器的LivenessProbe探针的返回值永远成功。
- ReadinessProbe探针
用于判断容器是否正常提供服务，即容器的Ready是否为True，是否可以接收请求，如果ReadinessProbe探测失败，则容器的Ready将为False，控制器将此Pod的Endpoint从对应的service的Endpoint列表中移除，从此不再将任何请求调度此Pod上，直到下次探测成功。（剔除此pod不参与接收请求不会将流量转发给此Pod）。

三种类型：

- exec：通过执行命令来检查服务是否正常，回值为0则表示容器健康
- httpGet方式：通过发送http请求检查服务是否正常，返回200-399状态码则表明容器健康
- tcpSocket：通过容器的IP和Port执行TCP检查，如果能够建立TCP连接，则表明容器健康

示例：

完整文件路径 `myblog/one-pod/pod-with-healthcheck.yaml`

```yaml
containers:
- name: myblog
image: 172.21.32.6:5000/myblog
env:
- name: MYSQL_HOST # 指定root用户的用户名
value: "127.0.0.1"
- name: MYSQL_PASSWD
value: "123456"
ports:
- containerPort: 8002
livenessProbe:
httpGet:
path: /blog/index/
port: 8002
scheme: HTTP
initialDelaySeconds: 10 # 容器启动后第一次执行探测是需要等待多少秒
periodSeconds: 15 # 执行探测的频率
timeoutSeconds: 2 # 探测超时时间
readinessProbe:
httpGet:
path: /blog/index/
port: 8002
scheme: HTTP
initialDelaySeconds: 10
timeoutSeconds: 2
periodSeconds: 15
```

- initialDelaySeconds：容器启动后第一次执行探测是需要等待多少秒。
- periodSeconds：执行探测的频率。默认是10秒，最小1秒。
- timeoutSeconds：探测超时时间。默认1秒，最小1秒。
- successThreshold：探测失败后，最少连续探测成功多少次才被认定为成功。默认是1。对于liveness必须是1，最小值是1。
- failureThreshold：探测成功后，最少连续探测失败多少次
才被认定为失败。默认是3，最小值是1。