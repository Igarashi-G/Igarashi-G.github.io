---
title: Kubernets 安装(单Master)
date: 2022-09-27
category:
  - 运维
  - k8s
tag:
  - k8s
star: true
---

记录安装 **Docker** 版（老版本）的 **k8s** 单 **Master** 集群

<!-- more -->

## 1. 准备工作

**准备如下环境**

- **3** 台 **2核4G** 的服务器，一台作为 **Master** 两台作为 **Salve**
- **Cent OS 7.8**
- 提前规划好 **IP**，并设置好可联网的代理

**安装后的软件版本为**

- Kubernetes v1.16.2
  - flannel 0.11|12.0（*有大坑*）
- Docker 19.03.11

::: tip 关于二进制安装

**kubeadm** 是 **Kubernetes** 官方支持的安装方式，“*二进制*” 不是。本文档采用 **kubernetes.io** 官方推荐的 **kubeadm** 工具安装 **kubernetes** 集群。

:::

#### 1.1 **设置 yum 源**

```shell
cd /etc/yum.repos.d/
cp ./CentOS-Base.repo ./CentOS-Base-repo.bak
wget http://mirrors.aliyun.com/repo/Centos-7.repo
yum clean all
mv Centos-7.repo CentOS-Base.repo
yum makecache
```

#### 1.2 **检查 centos / hostname**

```sh
# 在 master 节点和 worker 节点都要执行
cat /etc/redhat-release

# 此处 hostname 的输出将会是该机器在 Kubernetes 集群中的节点名字
# 不能使用 localhost 作为节点的名字
hostname

# 请使用 lscpu 命令，核对 CPU 信息
# Architecture: x86_64    本安装文档不支持 arm 架构
# CPU(s):       2         CPU 内核数量不能低于 2
lscpu
```

#### 1.3 **修改 hostname**

```sh
# 建议正常英文数字组合
hostnamectl set-hostname k8s-master-171
hostnamectl set-hostname k8s-salve-172 
hostnamectl set-hostname k8s-salve-173

# 查看修改结果
hostnamectl status

# 设置 hostname 解析
echo "127.0.0.1   $(hostname)" >> /etc/hosts

# 或是三台节点全部加入hosts
cat >>/etc/hosts<<EOF
192.168.3.171 k8s-master-171
192.168.3.172 k8s-slave-172
192.168.3.173 k8s-slave-173
EOF
```

#### 1.4 **检查网络** 

```shell {2,11,13}
[root@k8smaster171 ~]$ ip route show
default via 192.168.3.1 dev eth0 proto static metric 100 
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 
192.168.3.0/24 dev eth0 proto kernel scope link src 192.168.3.171 metric 100 

[root@k8smaster171 ~]$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 7e:73:42:29:b7:63 brd ff:ff:ff:ff:ff:ff
    inet 192.168.3.171/24 brd 192.168.3.255 scope global noprefixroute eth0
       valid_lft forever preferred_lft forever
```

::: tip kubelet使用的IP地址

- `ip route show` 命令中，可以知道机器的默认网卡，通常是 `eth0`，如 **default via 172.21.0.23 dev eth0**
- `ip address` 命令中，可显示默认网卡的 IP 地址，**Kubernetes** 将使用此 **IP** 地址与集群内的其他节点通信，如 `172.17.216.80`
- 所有节点上 **Kubernetes** 所使用的 **IP** 地址必须可以互通（*无需 NAT 映射、无安全组或防火墙隔离*）

:::

#### 1.5 通过第三方脚本快速安装

在 **Master** 节点和 **Worker** 节点都要执行

[参考 快速安装](https://kuboard.cn/install/history-k8s/install-k8s-1.16.2.html) 初始化流程貌似会执行失败，也许和 **CentOS** 版本有关，用来参考

::: details 

```shell
#!/bin/bash

# 在 master 节点和 worker 节点都要执行

# 安装 docker
# 参考文档如下
# https://docs.docker.com/install/linux/docker-ce/centos/ 
# https://docs.docker.com/install/linux/linux-postinstall/

# 卸载旧版本
yum remove -y docker \
docker-client \
docker-client-latest \
docker-common \
docker-latest \
docker-latest-logrotate \
docker-logrotate \
docker-selinux \
docker-engine-selinux \
docker-engine

# 设置 yum repository
yum install -y yum-utils \
device-mapper-persistent-data \
lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装并启动 docker
yum install -y docker-ce-18.09.7 docker-ce-cli-18.09.7 containerd.io
systemctl enable docker
systemctl start docker

# 安装 nfs-utils
# 必须先安装 nfs-utils 才能挂载 nfs 网络存储
yum install -y nfs-utils
yum install -y wget

# 关闭 防火墙
systemctl stop firewalld
systemctl disable firewalld

# 关闭 SeLinux
setenforce 0
sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config

# 关闭 swap
swapoff -a
yes | cp /etc/fstab /etc/fstab_bak
cat /etc/fstab_bak |grep -v swap > /etc/fstab

# 修改 /etc/sysctl.conf
# 如果有配置，则修改
sed -i "s#^net.ipv4.ip_forward.*#net.ipv4.ip_forward=1#g"  /etc/sysctl.conf
sed -i "s#^net.bridge.bridge-nf-call-ip6tables.*#net.bridge.bridge-nf-call-ip6tables=1#g"  /etc/sysctl.conf
sed -i "s#^net.bridge.bridge-nf-call-iptables.*#net.bridge.bridge-nf-call-iptables=1#g"  /etc/sysctl.conf
# 可能没有，追加
echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf
echo "net.bridge.bridge-nf-call-ip6tables = 1" >> /etc/sysctl.conf
echo "net.bridge.bridge-nf-call-iptables = 1" >> /etc/sysctl.conf
# 执行命令以应用
sysctl -p

# 配置K8S的yum源
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 卸载旧版本
yum remove -y kubelet kubeadm kubectl

# 安装kubelet、kubeadm、kubectl
yum install -y kubelet-1.16.2 kubeadm-1.16.2 kubectl-1.16.2

# 修改docker Cgroup Driver为systemd
# # 将/usr/lib/systemd/system/docker.service文件中的这一行 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
# # 修改为 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd
# 如果不修改，在添加 worker 节点时可能会碰到如下错误
# [WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". 
# Please follow the guide at https://kubernetes.io/docs/setup/cri/
sed -i "s#^ExecStart=/usr/bin/dockerd.*#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd#g" /usr/lib/systemd/system/docker.service

# 设置 docker 镜像，提高 docker 镜像下载速度和稳定性
# 如果您访问 https://hub.docker.io 速度非常稳定，亦可以跳过这个步骤
curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io

# 重启 docker，并启动 kubelet
systemctl daemon-reload
systemctl restart docker
systemctl enable kubelet && systemctl start kubelet

docker version
```

:::

## 2. 初始化配置

::: warning 所有节点执行如下操作

:::

##### **设置网络相关**

如果节点间无安全组限制（*内网机器间可以任意访问*），可以忽略，香、否则，至少保证如下端口可通

- **k8s-master：** 
  - **TCP：** **6443, 2379, 2380, 60080, 60081**
  - **UDP** 协议端口全部时打开
- **k8s-slave：** **UDP** 协议端口全部打开

##### **设置或关闭 iptables**

```shell
iptables -P FORWARD ACCEPT

# 或是直接关闭 iptables
systemctl stop iptables
systemctl disable iptables
```

##### **关闭swap**

```shell
swapoff -a

# 防止开机启动自动挂载 swap 分区
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

##### **关闭selinux和防火墙**

```shell
sed -ri 's#(SELINUX=).*#\1disabled#' /etc/selinux/config
setenforce 0
systemctl disable firewalld &systemctl stop firewalld
```

##### **修改内核参数**

```shell
cat <<EOF > /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
vm.max_map_count=262144
EOF

# 重新加载配置
$ sysctl -p /etc/sysctl.d/k8s.conf
```

##### **网桥过滤**

```shell
# 加载网桥过滤模块
$ modprobe br_netfilter
# 查看网桥过滤模块是否加载成功
$ lsmod | grep br_netfilter
```

##### **设置时间同步**

```shell
$ systemctl restart chronyd	
$ systemctl enable chronyd
$ date
```

## 3. 安装基础软件包

::: warning  所有节点执行如下操作

:::

##### **安装常用软件包**

```shell
yum install -y nfs-utils wget
```

**配置 docker 和 k8s 源**

```shell
curl -o /etc/yum.repos.d/docker-ce.repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
        http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 更新源
$ yum clean all && yum makecache
```

### 3.1 安装docker

```shell
# 查看所有的可用版本
yum list docker-ce --showduplicates | sort -r

# 安装源里配套版本
# yum install -y docker-ce-18.09.7 docker-ce-cli-18.09.7 containerd.io 
# 安装指定版本
yum install docker-ce-c1i-19.03.13-3.el7 docker-ce-19.03.13-3.el7

## 配置docker加速
mkdir -p /etc/docker
vim /etc/docker/daemon.json
{
  "registry-mirrors": ["https://ubhu1j5h.mirror.aliyuncs.com"]
}

##启动docker
systemctl enable docker && systemctl start docker
```

### 3.2 安装kubeadm，kubelet 和 kubectl

```shell
yum install -y kubelet-1.16.2 kubeadm-1.16.2 kubectl-1.16.2 --disableexcludes=kubernetes

# 查看 kubeadm 版本
kubeadm version

# 设置开机启动
systemctl enable kubelet
```

## 4. 初始化集群

::: warning 

**只在 Master 节点** 执行（*k8s-master-171*）

:::

因此需要先改写对应的 **kubeadm.yaml** 配置文件

```shell
mkdir ./k8s_install
cd k8s_install

# 生成配置文件
$ kubeadm config print init-defaults > kubeadm.yaml

# 修改生成的配置文件文件 :set nu
vim kubeadm.yaml
...
# -+12   advertiseAddress: 192.168.3.171	# 单master直接替换为master ip地址，貌似高可用是vip
...
# -+32 imageRepository: registry.aliyuncs.com/google_containers	# 修改为阿里源
...
# -+34 kubernetesVersion: v1.16.2	# 版本号默认生成错了，改正
#   35 networking:
#   36   dnsDomain: cluster.local
#  +37   podSubnet: 10.244.0.0/16	# pod网段，flannel插件需要这个网段
#   38   serviceSubnet: 10.96.0.0/12
#   39 scheduler: {}
```

##### **下载组件镜像**

**k8s** 所运行的 **API** 组件，都是靠容器运行，先列出配置中所需的容器，再 **pull** 下镜像

```shell
[root@k8s-master-171 k8s-install]$ kubeadm config images list --config kubeadm.yaml 
registry.aliyuncs.com/google_containers/kube-apiserver:v1.16.2
registry.aliyuncs.com/google_containers/kube-controller-manager:v1.16.2
registry.aliyuncs.com/google_containers/kube-scheduler:v1.16.2
registry.aliyuncs.com/google_containers/kube-proxy:v1.16.2
registry.aliyuncs.com/google_containers/pause:3.1
registry.aliyuncs.com/google_containers/etcd:3.3.15-0
registry.aliyuncs.com/google_containers/coredns:1.6.2

# pull 组件镜像，提前下载方便
kubeadm config images pull --config kubeadm.yaml
```

::: tip 若出现镜像无法下载情况，如下方式替代

1. 还原 **kubeadm.yaml** 的 `imageRepository`

   ```yaml
   ...
   imageRepository: k8s.gcr.io
   ...
   
   # 查看镜像源
   kubeadm config images list --config kubeadm.yaml 
   ```

2. 使用 **docker hub** 中的镜像源来下载，注意上述列表添加处理器架构，通常使用的虚拟机都是 **amd64** 

   ```shell
   $ docker pull mirrorgooglecontainers/kube-scheduler-amd64:v1.16.0
   $ docker pull mirrorgooglecontainers/etcd-amd64:3.3.15-0
   ...
   $ docker tag mirrorgooglecontainers/etcd-amd64:3.3.15-0 k8s.gcr.io/etcd3.3.15-0
   ```

:::

##### **初始化Master**

```shell
kubeadm init --config kubeadm.yaml

#... 直到出现如下显示，表示安装成功
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

#...
# 执行如上命令，即可初始化成功
```

::: tip

此时通过 `kubectl get no` 命令查看还是 **notReady** 状态，这是因为还没有初始化网络插件，若初始化过程中出错，根据错误信息调整后，执行 `kubeadm reset` 后再次初始化即可

:::

##### **Slave 加入集群**

::: warning

在 **Slave** 节点上执行，加入 **k8s-master-171** 集群（*这里是复制执行初始化 master 后提示的命令*）

::: 

```shell
kubeadm join 192.168.3.171:6443 --token abcdef.0123456789abcdef \
    --discovery-token-ca-cert-hash sha256:55bd1bedd08121c1c4f92e93673e7e8e8dd4460927fc93bd059606d768a7c17a
```

**查看集群状态**

```shell
[root@k8s-master-171 k8s-install]$ kubectl get nodes
NAME             STATUS     ROLES    AGE   VERSION
k8s-master-171   NotReady   master   24m   v1.16.2
k8s-slave-172    NotReady   <none>   18s   v1.16.2
k8s-slave-173    NotReady   <none>   16s   v1.16.2

kubectl -n kube-system get po
```

## 5. 安装网络插件

::: warning 只在 Master 节点执行

:::

### 5.1 网络插件 flannel

**flannel** 这个插件比较老，但是通用性凑合，适配还行，先下载 **yaml** 文件（*一次下载不成功，多试几次*）

```shell
wget https://raw.githubusercontent.com/coreos/flannel/2140ac876ef134e0ed5af15c65e414cf26827915/Documentation/kube-flannel.yml
```

修改配置，指定网卡名（*注意用空格替换，不要用 tab*）

```shell
vim kube-flannel.yml
...

#   189         args:
#   190         - --ip-masq
#   191         - --kube-subnet-mgr
#  +192         - --iface=eth0	# 若机器存在多网卡的话，指定内网网卡名，默认不指定会找第一块网卡
#   193         resources:

```

> 若出现 `quay.io/coreos/flannel:v0.11.0-amd64` 地址的镜像拉不下来，则修改下载地址
>
> ```yaml
> 170       initContainers:
> 171       - name: install-cni
> 172         image: quay.io/coreos/flannel:v0.11.0-amd64 # 这里
> 173         command:
> 174         - cp
> 175         args:
> 176         - -f
> 177         - /etc/kube-flannel/cni-conf.json
> 178         - /etc/cni/net.d/10-flannel.conflist
> 179         volumeMounts:
> 180         - name: cni
> 181           mountPath: /etc/cni/net.d
> 182         - name: flannel-cfg
> 183           mountPath: /etc/kube-flannel/
> 184       containers:
> 185       - name: kube-flannel
> 186         image: quay.io/coreos/flannel:v0.11.0-amd64 # 这里
> 187         command:
> 188         - /opt/bin/flanneld
> ```

##### **执行安装**

```shell
# 可以先拉取国内镜像
docker pull quay.io/coreos/flannel:v0.11.0-amd64

# 执行安装命令
kubectl create -f kube-flannel.yml
```

##### **验证集群**

```shell
$ kubectl get nodes # 观察集群节点是否全部Ready

$ kubectl -n kube-system get po
NAME                                     READY   STATUS    RESTARTS   AGE
coredns-58cc8c89f4-bhqrs                 0/1     Pending   0          76m
coredns-58cc8c89f4-g4lkj                 0/1     Pending   0          76m
etcd-k8s-master-171                      1/1     Running   0          75m
kube-apiserver-k8s-master-171            1/1     Running   0          75m
kube-controller-manager-k8s-master-171   1/1     Running   0          75m
kube-flannel-ds-amd64-4xm2h              1/1     Running   0          7m10s
kube-flannel-ds-amd64-lltcc              1/1     Running   0          7m10s
kube-flannel-ds-amd64-s62tq              1/1     Running   0          7m10s
kube-proxy-c496s                         1/1     Running   0          76m
kube-proxy-h7d6s                         1/1     Running   0          52m
kube-proxy-vs5nc                         1/1     Running   0          52m
kube-scheduler-k8s-master-171            1/1     Running   0          75m
```

::: danger 异常

此时发现两个 **coredns** 服务没有 **Running** ，该问题导致流程阻塞！

该问题是由于 **flannel** 依赖于 **cni** 插件，而这该死的插件新版移除了 **flannel** ，导致网络启动失败

1. 换用插件 **calico** , 见下文

2. 去 [github官方下载压缩包](https://github.com/containernetworking/plugins/releases/tag/v0.9.0) （*此处是 **0.9.0** 版本，官方最后个未移除 **flannel** 版*）[cni-plugins-linux-amd64-v0.9.0.tgz](https://github.com/containernetworking/plugins/releases/download/v0.9.0/cni-plugins-linux-amd64-v0.9.0.tgz) 

   执行解压，即可看见 **flannel** ，然后分发到所有节点，网络即可恢复

   ```shell
   tar -xvf cni-plugins-linux-amd64-v0.9.1.tgz
   ```

:::

##### **清理环境**

如果集群安装过程中遇到了其他问题，使用如下命令重置

```shell
kubeadm reset
kubectl delete -f kube-flannel.yml
kubectl apply -f kube-flannel.yml
 
ifconfig cni0 down && ip link delete coni0
ifconfig flannel.1 down && ip link delete flannel.1
rm -rf /var/lib/cni/
```

### 5.2 网络插件 calico

[文档](https://docs.projectcalico.org/v3.9/getting-started/kubernetes/)

执行如下命令安装

```shell
rm -f calico-3.9.2.yaml

wget https://kuboard.cn/install-script/calico/calico-3.9.2.yaml

sed -i "s#192\.168\.0\.0/16#${POD_SUBNET}#" calico-3.9.2.yaml

kubectl apply -f calico-3.9.2.yaml
```

### 5.3 创建测试 Nginx 服务

```shell
$ kubectl run test-nginx --image=nginx:alpine
```

查看 **pod** 是否创建成功，并访问 **pod ip** 测试是否可用

```shell
$ kubectl get po -o wide -w # 直到 STATUS 状态由 ContainerCreating 变为 Running 即成功

NAME                          READY   STATUS    RESTARTS   AGE    IP           NODE            NOMINATED NODE   READINESS GATES
test-nginx-5bd8859b98-thscs   1/1     Running   0          3m3s   10.244.1.2   k8s-slave-172   <none>           <none>

```

此时显示了 **IP** 和容器所在的节点，切换到对应机器执行

```shell
curl 10.244.1.2 # 即可看到 nginx welcome 文档
```

### 5.4 设置master节点是否可调度（可选）

::: warning 只在 Master 节点执行

:::

默认部署成功后，**Master** 节点无法调度业务 **pod**，如需设置其参与 **pod** 调度，需执行

```shell
$ kubectl taint node k8s-master node-role.kubernetes.io/master:Noschedule-
```

## 6. 安装Dashboard

推荐使用下面这种方式

```shell
wget https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc5/aio/deploy/recommended.yaml
```

添加 **service** 为 `NodePort` 类型，变为 `NodePort` 类型的服务，文件的 **45** 行上下

```shell
vim recommended.yaml
...
#  +45   type: NodePort 

...
spec:
  ports:
    - port: 443
      targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
  type: NodePort # 注意空格是两个
---
```

部署并查看

```shell
kubectl create -f recommended.yaml

# 查看 dashboard 服务
kubectl -n kubernetes-dashboard get svc
NAME                        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)         AGE
dashboard-metrics-scraper   ClusterIP   10.96.54.184   <none>        8000/TCP        35s
kubernetes-dashboard        NodePort    10.97.63.15    <none>        443:30100/TCP   35s
```

> 使用浏览器访问 https://192.168.3.171:30100/ 即可打开 **kubernetes-dashboard** 页面

#### 使用 ServiceAccent 访问

创建 `admin` 登录账户

```yaml
$ vim admin.conf

kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: admin
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: ServiceAccount
  name: admin
  namespace: kubernetes-dashboard
 
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin
  namespace: kubernetes-dashboard
```

**创建登录用户信息，配置令牌**

```shell
kubectl create -f admin.conf	# kubectl apply -f admin.yaml
# serviceaccount/admin created
#clusterrolebinding.rbac.authorization.k8s.io/admin created
```

##### **查看 kubernetes-dashboard 下面的 secret**

```shell
$ kubectl -n kubernetes-dashboard get secret|grep admin-token
# admin-token-764m5                  kubernetes.io/service-account-token   3      2m13s

# 或查看全部的
$ kubectl get secret -n kubernetes-dashboard
NAME                               TYPE                                  DATA   AGE
admin-token-764m5                  kubernetes.io/service-account-token   3      3m27s
default-token-2726l                kubernetes.io/service-account-token   3      7m57s
kubernetes-dashboard-certs         Opaque                                0      7m57s
kubernetes-dashboard-csrf          Opaque                                1      7m57s
kubernetes-dashboard-key-holder    Opaque                                2      7m57s
kubernetes-dashboard-token-9fs8x   kubernetes.io/service-account-token   3      7m58s
```

##### **查看登录 token**

```shell
# 使用该命令拿到token, 然后粘贴到
kubectl -n kubernetes-dashboard get secret admin-token-764m5 -o jsonpath={.data.token}|base64 -d

eyJhbGciOiJSUzI1NiIsImtpZCI6Ilo3QTR5ckxaOXZrYUc4emZKTWpFQkNBMEVkaktPeGdTR25rbW41UjluLVUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi10b2tlbi03NjRtNSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJhZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImJlZjZjMWM0LWU0ZDktNGE4OC1hMzdkLTBjMzVlZGQ2ZmZhZSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbiJ9.p0_tioIGZShZlsfafLWO2irYSAo6A3FGJSvfk9gbIjj8YP_Wif4lPUv8kDkl_3YgH7k2q15Bw_mcQGShOLMc-KlRp5FizlxT4aJc74lVPntzinAufN4QHX_5a5wj5CIvYiTH-U71ZECY_eDzn0SBlEVctCm3cVpiwxhUMrPKcSzO9hGYm9xI1ZCgo4fkpgsvNyzPD6QLPQjqelAmMpTcujEkIm5DzdzZAgOgU58wx6bUowhBqKt7hrMkDk5nXPJ-o7W8M0_3KxKRJO4fEMAAeanajfJ4RiBrVha9Ln23F_Q5zzroNcnV5vsdUMS3px50u70NaNCVOy32n4aeAFX4Xg

# 或如下
$ kubectl describe secret admin-token-764m5 -n kubernetes-dashboard
Name:         admin-token-764m5
Namespace:    kubernetes-dashboard
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: admin
              kubernetes.io/service-account.uid: bef6c1c4-e4d9-4a88-a37d-0c35edd6ffae

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1025 bytes
namespace:  20 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6Ilo3QTR5ckxaOXZrYUc4emZKTWpFQkNBMEVkaktPeGdTR25rbW41UjluLVUifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi10b2tlbi03NjRtNSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJhZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImJlZjZjMWM0LWU0ZDktNGE4OC1hMzdkLTBjMzVlZGQ2ZmZhZSIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbiJ9.p0_tioIGZShZlsfafLWO2irYSAo6A3FGJSvfk9gbIjj8YP_Wif4lPUv8kDkl_3YgH7k2q15Bw_mcQGShOLMc-KlRp5FizlxT4aJc74lVPntzinAufN4QHX_5a5wj5CIvYiTH-U71ZECY_eDzn0SBlEVctCm3cVpiwxhUMrPKcSzO9hGYm9xI1ZCgo4fkpgsvNyzPD6QLPQjqelAmMpTcujEkIm5DzdzZAgOgU58wx6bUowhBqKt7hrMkDk5nXPJ-o7W8M0_3KxKRJO4fEMAAeanajfJ4RiBrVha9Ln23F_Q5zzroNcnV5vsdUMS3px50u70NaNCVOy32n4aeAFX4Xg
```



## 7. 记录k8s v1.22.3 版本安装

[文档参考](https://kuboard.cn/install/history-k8s/install-k8s-1.22.x.html)

初始化步骤参考 ==1.准备工作== 没有区别，**1.22** 版本的 **k8s** 已经改为支持 **containerd** 容器运行时了，故稍有区别，以下列出注意的点

::: details 

```shell
# 阿里云 docker hub 镜像
export REGISTRY_MIRROR=https://registry.aliyuncs.com
# 在 master 节点和 worker 节点都要执行

# 安装 containerd
# 参考文档如下
# https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd

cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# Setup required sysctl params, these persist across reboots.
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

# Apply sysctl params without reboot
sysctl --system

# 卸载旧版本
yum remove -y containerd.io

# 设置 yum repository
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装 containerd
yum install -y containerd.io-1.4.3

mkdir -p /etc/containerd
containerd config default > /etc/containerd/config.toml

sed -i "s#k8s.gcr.io#registry.aliyuncs.com/k8sxio#g"  /etc/containerd/config.toml
sed -i '/containerd.runtimes.runc.options/a\ \ \ \ \ \ \ \ \ \ \ \ SystemdCgroup = true' /etc/containerd/config.toml
sed -i "s#https://registry-1.docker.io#${REGISTRY_MIRROR}#g"  /etc/containerd/config.toml


systemctl daemon-reload
systemctl enable containerd
systemctl restart containerd

# 安装 nfs-utils
# 必须先安装 nfs-utils 才能挂载 nfs 网络存储
yum install -y nfs-utils
yum install -y wget

# 关闭 防火墙
systemctl stop firewalld
systemctl disable firewalld

# 关闭 SeLinux
setenforce 0
sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config

# 关闭 swap
swapoff -a
yes | cp /etc/fstab /etc/fstab_bak
cat /etc/fstab_bak |grep -v swap > /etc/fstab

# 配置K8S的yum源
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 卸载旧版本
yum remove -y kubelet kubeadm kubectl

# 安装kubelet、kubeadm、kubectl
# 将 ${1} 替换为 kubernetes 版本号，例如 1.20.1
yum install -y kubelet-1.22.3 kubeadm-1.22.3 kubectl-1.22.3

crictl config runtime-endpoint /run/containerd/containerd.sock

# 重启 docker，并启动 kubelet
systemctl daemon-reload
systemctl enable kubelet && systemctl start kubelet

containerd --version
kubelet --version
```

:::



### 7.1 初始化 master 节点

::: danger 重要！

需要先配置 **containerd** 的代理

#### **注意！！所有节点均需要配置，否则 kube-proxy 会 Create失败**

```shell
vim /usr/lib/systemd/system/containerd.service 

# 添加
Environment="HTTP_PROXY=http://172.16.70.104:808/"
Environment="HTTPS_PROXY=http://172.16.70.104:808/"
Environment="NO_PROXY=10.96.0.0/16,127.0.0.1,172.16.0.0/16,localhost"

# NO_PROXY的设置也是必须的。10.96.0.0与192.168.0.0分别是clusterIP与Pod的内网网段，如果不设置NO_PROXY Pod与Pod之间的通信会出现问题。


# 重启
systemctl daemon-reload
systemctl restart containerd
```

然后再去执行下文的拉镜像业务

```shell
kubeadm config images pull --config=kubeadm-config.yaml
```

:::

##### **先设置环境变量**

```shell
# 只在 master 节点执行
# 替换 x.x.x.x 为 master 节点实际 IP（请使用内网 IP）
# export 命令只在当前 shell 会话中有效，开启新的 shell 窗口后，如果要继续安装过程，请重新执行此处的 export 命令
export MASTER_IP=172.16.120.171
# 替换 apiserver.demo 为 您想要的 dnsName
export APISERVER_NAME=apiserver.uit
# Kubernetes 容器组所在的网段，该网段安装完成后，由 kubernetes 创建，事先并不存在于您的物理网络中
export POD_SUBNET=10.100.0.0/16
echo "${MASTER_IP}    ${APISERVER_NAME}" >> /etc/hosts
```

##### **再去通过 kubeadm 初始化**

::: details

```shell
# 只在 master 节点执行

# 脚本出错时终止执行
set -e

if [ ${#POD_SUBNET} -eq 0 ] || [ ${#APISERVER_NAME} -eq 0 ]; then
  echo -e "\033[31;1m请确保您已经设置了环境变量 POD_SUBNET 和 APISERVER_NAME \033[0m"
  echo 当前POD_SUBNET=$POD_SUBNET
  echo 当前APISERVER_NAME=$APISERVER_NAME
  exit 1
fi


# 查看完整配置选项 https://godoc.org/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2
rm -f ./kubeadm-config.yaml
cat <<EOF > ./kubeadm-config.yaml
---
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: v1.22.3
imageRepository: registry.aliyuncs.com/k8sxio
controlPlaneEndpoint: "apiserver.uit:6443"
networking:
  serviceSubnet: "10.96.0.0/16"
  podSubnet: "10.100.0.0/16"
  dnsDomain: "cluster.local"
dns:
  type: CoreDNS
  imageRepository: swr.cn-east-2.myhuaweicloud.com/coredns
  imageTag: 1.8.0

---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
cgroupDriver: systemd
EOF

# kubeadm init
# 根据您服务器网速的情况，您需要等候 3 - 10 分钟
echo ""
echo "抓取镜像，请稍候..."
kubeadm config images pull --config=kubeadm-config.yaml
# !!此处若是内网环境，需要如上文那样设置 containerd 代理，否则下载报错

echo ""
echo "初始化 Master 节点"
kubeadm init --config=kubeadm-config.yaml --upload-certs

# 配置 kubectl
rm -rf /root/.kube/
mkdir /root/.kube/
cp -i /etc/kubernetes/admin.conf /root/.kube/config
```

:::

**检查 master 初始化结果**

**coredns** 将处于启动失败的状态（*老现象了*），安装网络插件后，**coredns** 将正常启动

```shell
# 只在 master 节点执行

# 执行如下命令，等待 3-10 分钟，直到所有的容器组处于 Running 状态
watch kubectl get pod -n kube-system -o wide

# 查看 master 节点初始化结果
kubectl get nodes -o wide
```

### 7.2 安装网络插件

网络插件可以选择 **calico** 或者 **flannel**（任意选择其一即可）

::: tabs

@tab Calico

> 如果阿里云上安装，建议使用 **flannel**，有多个案例表明 **calico** 与阿里云存在兼容性问题

```sh
export POD_SUBNET=10.100.0.0/16
kubectl apply -f https://kuboard.cn/install-script/v1.22.x/calico-operator.yaml
wget https://kuboard.cn/install-script/v1.22.x/calico-custom-resources.yaml
sed -i "s#192.168.0.0/16#${POD_SUBNET}#" calico-custom-resources.yaml
kubectl apply -f calico-custom-resources.yaml 
```

@tab Flannel

```shell
export POD_SUBNET=10.100.0.0/16
wget https://kuboard.cn/install-script/flannel/flannel-v0.14.0.yaml
sed -i "s#10.244.0.0/16#${POD_SUBNET}#" flannel-v0.14.0.yaml
kubectl apply -f ./flannel-v0.14.0.yaml
```

:::

### 7.3 初始化 worker节点

```sh
# 只在 master 节点执行,获得 join 命令参数
kubeadm token create --print-join-command

# 可获取kubeadm join 命令及参数，输出如下
kubeadm join apiserver.uit:6443 --token jp5cyz.3tcmv8cr8xd8nhj3 --discovery-token-ca-cert-hash sha256:3520937aaab1f2abfd17334b7409ad293b2cc916dcdb33085e18cfa8a08281bf
```

该 **token** 的有效时间为 2 个小时，**2** 小时内，您可以使用此 **token** 初始化任意数量的 **worker** 节点

```sh
# 在 worker 节点执行
# 替换 x.x.x.x 为 master 节点的内网 IP
export MASTER_IP=x.x.x.x
# 替换 apiserver.demo 为初始化 master 节点时所使用的 APISERVER_NAME
export APISERVER_NAME=apiserver.demo
echo "${MASTER_IP}    ${APISERVER_NAME}" >> /etc/hosts

# 替换为 master 节点上 kubeadm token create 命令的输出
kubeadm join apiserver.demo:6443 xxxx

# master 节点查看，输出如下表示安装成功
$ kubectl get nodes
NAME             STATUS   ROLES                  AGE   VERSION
k8s-master-171   Ready    control-plane,master   34m   v1.22.3
k8s-salve-172    Ready    <none>                 24m   v1.22.3
k8s-salve-173    Ready    <none>                 24m   v1.22.3
```

### 7.4 安装Dashboard

安装可同上一致，依然使用 **v2** 版本的 **dashboard**

#### 使用 ServiceAccent 访问有改动

```shell
# 创建 文件
vim admin-user.yaml

# 键入如下
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
  
# 执行创建命令
$ kubectl create -f admin-user.yaml
# serviceaccount/admin-user created

# 再创建如下
vim bind.yaml

# 并键入
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
  
# 添加
$ kubectl create -f bind.yaml 
# clusterrolebinding.rbac.authorization.k8s.io/admin-user created

# 创建token
$ kubectl -n kubernetes-dashboard create token admin-user

# 复制如下 token 即可登入，貌似有时间限制，下次登录是生成即可
eyJhbGciOiJSUzI1NiIsImtpZCI6IjBnekNxQnRWV2tkUTA2eE5YWFE3VkRQcFh5ZTR5c19JZldZTm94eExqak0i....
se4BNIbTvZwXY4_D_6bwqU2Y2SbsmHuSkhe5AUc-H7m-sd5jJSojpXA
```
