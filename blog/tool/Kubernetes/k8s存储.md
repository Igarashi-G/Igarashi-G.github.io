---
title: Kubernets - 存储
date: 2022-10-04
category:
  - 运维
  - k8s
tag:
  - k8s
star: true
---

**k8s** 存储相关的 **Volumes**、**PV**、**PVC**

<!-- more -->

# Kubernetes 存储

之前 **Pod** 示例使用过部分 **Volumes**，此处详细整理

## 1. Volumes

容器的磁盘文件是 **短暂**（*无状态*）的，容器崩溃时，每次 **kubelet** 都会全新重启干净的容器，过去的临时文件会全部丢失，而且一个 **Pod** 若运行了多个 **Container** 文件的共享如何解决，此时就需要 **k8s volumes** 

### 1.1 概述

​	**Docker** 也有卷的概念，但 **Docker** 的卷通常是磁盘或另一个 **Container** 中的目录，且生命周期不受管理，即使后续有卷的驱动程序，功能也十分有限

​	另一方面，**k8s** 的卷有明确的生命周期，可以比 **Pod** 中运行的任何 **Container** 都长（***Container**重启或销毁后保留数据* ）且支持多种类型、任意数量的 **volumes**

​	本质上讲，卷只是一个目录，可能包含一些数据， **Pod** 中的容器可以访问它。要使用卷，**Pod** 需要通过 `.spec.columes` 字段指定为 **Pod** 提供的卷，以及使用 `.spce.containers.volumeMounts` 字段指定卷挂载的目录。从容器中的进程可以看到由 **Docker** 镜像和卷组成的文件系统视图，卷无法挂载其他卷或具有到其他卷的硬链接， **Pod** 中的每个 **Container** 必须独立指定每个卷的挂载位置

#### 常用卷的类型

[emptyDir](/tool/Kubernetes/k8s存储.html#_2-1-emptydir): 容器间数据共享，易失

### 2.1 emptyDir

​	**主要用于不同容器间 数据共享 的**，但和 **Volume** 不同在于，删除 **Pod** 后 **emptyDir** 卷中的数据也会删除，**可被挂载到相同或不同的路径**，默认情况支持任何介质（*磁盘、**SSD**、网络存储* ）

​	可以将 `emptyDir.medium` 字段设置为 `Memory` ，让 **Kubernetes** 使用 **tmpfs**（*内存支持的文件系统*）虽然 **tmpfs** 很快，但节点重启时数据同样会被清除，并且设置的大小会被计入到 **Container** 的内存限制中

使用时 `volumes` 直接指定为 **emptyDir** 即可

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-pd
spec:
  containers:
  - image: k8s.gcr.io/test-webserver
    name: test-container
    volumeMounts:
    - mountPath: /cache
      name: cache-volume
  volumes:
  - name: cache-volume
    emptyDir: {}
```

::: danger

若要在一个 **Pod** 里面启动多个容器的话，网络命名空间是共享的，假如此时起了两个 **Nginx** 进程如下

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: dev
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.15.2
        ports:
        - containerPort: 80
        volumeMounts:
        - mountPath: /opt
          name: share-volume
      - name: nginx2
        image: nginx:1.15.2
        ports:
        - containerPort: 80
        volumeMounts:
        - mountPath: /mnt
          name: share-volume
      volumes:
      - name: share-volume
        emptyDir: {}
```

此时都是 **80** 端口，则会冲突

```shell
$ kubectl -n dev get po
NAME                                READY   STATUS        RESTARTS   AGE
nginx-deployment-5bd68dfc65-6jzzw   1/2     Error         0          11s
nginx-deployment-5bd68dfc65-7snw5   1/2     Error         0          11s
nginx-deployment-5bd68dfc65-z5zqc   1/2     Error         0          11s

$ kubectl -n dev logs -f nginx-deployment-5bd68dfc65-6jzzw -c nginx2
...
2022/10/30 10:11:38 [emerg] 1#1: bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
2022/10/30 10:11:38 [emerg] 1#1: still could not bind()
nginx: [emerg] still could not bind()
```

此时要将 `name: nginx2` 的 `command` 重置

```yaml
command:
- sh
- -c
- sleep 36000
```

如上配置是通过 `sh` 执行了一个 `sleep` 命令

若出现 **Error: Back-off restarting failed** ，通用解决办法也可在 `containers:` 后加入命令常驻进程

```yaml
command: ["/bin/bash", "-ce", "tail -f /dev/null"]
```

之后即可测试一下是否数据已共享

```shell
$ kubectl -n dev exec -ti nginx-deployment-5666cb4fcf-2d8m6 -c nginx -- bash
$ cd /opt/
$ touch 123.txt
$ ls
123.txt
root@nginx-deployment-5666cb4fcf-2d8m6:/opt# exit

$ kubectl -n dev exec -ti nginx-deployment-5666cb4fcf-2d8m6 -c nginx2 -- bash
$ cd /mnt
$ ls
123.txt
```

此时表示，数据已经通过指定 **emptyDir** 实现共享

:::

### 2.2 hostPath
