---
title: Helm 安装使用
date: 2022-11-04
category:
  - 运维
  - k8s
  - helm
tag:
  - helm
  - 存储库
---

**[Helm](https://helm.sh/zh/docs/)** 相关的安装使用

<!-- more -->

## 1.Helm

**Helm** 类似 **npm**，**pip**，**docker hub**, 可理解为是软件库，方便快速的为 **k8s** 集群安装第三方软件

### 1.1 概念

**Chart（包）：** 代表 **Helm** 的包，就是 **k8s** 集群内部跑的应用程序的资源定义

**Repository（仓库）：** 用来存放和共享 **charts** 的地方，它就像 **Perl** 的 [CPAN 档案库网络](https://www.cpan.org/) 或是 **Fedora** 的 [软件包仓库](https://src.fedoraproject.org/)，只不过它是供 **Kubernetes** 包所使用的

**Release（实例）：** 运行在 **Kubernetes** 集群中的 **chart** 的实例，一个 **chart** 通常可在同个集群中安装多次，每次安装都会创建一个新的 **release**。

- 以 **MySQL chart** 为例，如果你想在你的集群中运行两个数据库，你可以安装该**chart** 两次，每个数据库都会拥有它自己的 **release** 和 **release name** 

::: note

**Helm** 安装 **charts** 到 **Kubernetes** 集群中，每次安装都会创建一个新的 **release**，可在 **Helm** 的 **chart** **repositories** 中寻找新的 **chart**

:::

### 1.2 安装

#### 安装 Helm

[中文文档](https://helm.sh/zh/docs/intro/install/)

 [Helm 官方文档](https://helm.sh/) ，仓库推荐用 [bitnami](https://github.com/bitnami/charts) 可以方便部署 **kafuka** 和 **zk** 

1. Download your [desired version](https://github.com/helm/helm/releases)
2. Unpack it (**tar -zxvf helm-v3.0.0-linux-amd64.tar.gz**)
3. Find the helm binary in the unpacked directory, and move it to its desired destination (**mv linux-amd64/helm /usr/local/bin/helm**)

#### 安装仓库

安装完 **Helm** 二进制后， 就可以添加一个 **chart** 仓库，从 [Artifact Hub ](https://artifacthub.io/packages/search?kind=0) 中查找有效的 **Helm chart** 仓库

如下以官方的 **bitnami** 为例，先初始化

```shell
# helm 安装 bitnami 
$ helm repo add bitnami https://charts.bitnami.com/bitnami
	# - add 仓库名称 地址
"bitnami" has been added to your repositories
	
# 当添加完成，您将可以看到可以被您安装的charts列表
$ helm search repo bitnami
NAME                             	CHART VERSION	APP VERSION  	DESCRIPTION
bitnami/bitnami-common           	0.0.9        	0.0.9        	DEPRECATED Chart with custom templates used in ...
# ... and many more
```

##### **安装 Chart**

您可以通过 `helm install` 命令安装 **chart**， **Helm** 可通过多种途径查找和安装 **chart**， 最简单的是安装官方的**bitnami charts** 

```shell
# 更新,确定我们可以拿到最新的charts列表
$ helm repo update

# 查看 mysql repo
$ helm search repo mysql
NAME                  	CHART VERSION	APP VERSION	DESCRIPTION     
bitnami/mysql         	9.4.4        	8.0.31     	MySQL is a fast, reliable, scalable, and easy t...

# 安装 mysql
$ helm install bitnami/mysql --generate-name
NAME: mysql-1612624192
LAST DEPLOYED: Sat Feb  6 16:09:56 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES: ...
```

安装 **harbor**

```shell
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

## 2. 使用

### 2.1 常用命令

简单打包发布流程

```shell
# 打包
$ sudo helm package analysis-data-worker-chart --version 0.1.0 --destination .

# 添加自建的nexus仓库，注意是url
$ sudo helm repo add nexus-repo http://192.168.3.111:8081/repository/helm-repo/

# 安装第三方脚本
$ sudo helm plugin install --version master https://gitee.com/mirrors_sonatype-nexus-community/helm-nexus-push.git

# 上传chart包
$ sudo helm nexus-push nexus-repo analysis-data-worker-chart-0.1.0.tgz -u root -p xxx

# 从仓库里安装chart
$ sudo helm install analysis-data-worker analysis-data-worker-chart --namespace=zz-test --version=0.1.3

# 卸载chart包
sudo helm uninstall analysis-data-worker --namespace=zz-test
```

