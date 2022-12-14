---
title: Kubernets存储
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

#### 卷的类型

