---
title: etcd
date: 2020-11-19
category:
  - 数据库
tag:
  - etcd
  - kv
star: true
---

**etcd** 是 **k8s** 用于服务发现注册的分布式键值对数据库，通常作为注册中心

<!-- more -->

[官网](https://etcd.io/) 

[GitHub | etcd](https://github.com/etcd-io/etcd) 

> **13** 年 **CoreOS** 创业团队，构建了产品 **Container Linux** 一个开源、轻量、可自动化、快速部署的操作系统，在容器中运行，目的是管理机器像单机一样方便，于 **2020.6** 流产，后被 **Fedora CoreOS** 接盘。
>
> - 这种大型的分布式系统 **不会容忍裂脑操作**，并且 **愿意牺牲可用性** 
> - 故开发了一个能为多节点提供稳定地协调服务来满足 **发现**、 **注册**、**分布式锁** 等需求，并保证 **高可用** 

故 **etcd** 诞生，**etc** 取自 **unix** 系统的 `/etc` 路径（*通常存放配置文件*），**d** 指的是分布式系统（*distributed system*）

##### **Kubernetes 中的使用场景**

- **k8s** 用其存储配置数据，实现服务发现和集群管理
- **k8s**  的 **API Server** 把集群的状态存储在 **etcd** 中
- 并用其 **watch** 机制监控集群和回滚关键配置变化

## 1. 简介

##### **特点**

- 简单：安装配置简单，而且提供了 **HTTP API** 进行交互，使用也很简单
- 安全：支持 **SSL** 证书验证
- 快速：根据官方提供的 **benchmark** 数据，单实例支持每秒 **2k+** 读操作
- 可靠：采用 **raft** 算法，实现分布式系统数据的可用性和一致性

##### **兼容性**

**etcd v2** 和 **etcd v3** 不兼容，两者的 **api** 参数也不同，可用不同版本的 **api** 向 **v3** 写入数据，但读必须用 **v3** 版本的读

##### **协调服务**

一个协调服务，理想状态下需满足以下条件:

- **可用性角度：** ==高可用==，集群可容错，宕节点依然正常提供服务
- **数据一致性角度：** ==提供读取 最新 数据的机制==，既然协调服务必须具备高可用的目标，就必然不能存在单点故障（ *single point of failure* ），而多节点又需要保证数据一致性
- **容量角度：** ==低容量、仅存储关键元数据配置==，协调服务保存的仅仅是服务、节点的配置信息（属于控制面配置）*，而不是与用户相关的数据。所以存储上不需要考虑数据分片，无需过度设计
- **功能：** ==增删改查，监听数据变化的机制==，由于为了保存服务状态信息，当服务有变更或异常，相比控制端定时去轮询检查一个个服务状态，**若能快速推送变更事件给控制端，则可提升服务可用性、减少协调服务不必要的性能开销**
- **运维复杂度：** ==可维护性==，在分布式系统中往往会遇到 **硬/软件 Bug**、人为操作错误导致节点宕机，以及新增、替换节点等运维场景，都需要对协调服务成员进行变更。若能提供 **API** 实现平滑地变更成员节点信息，就可以大大降低运维复杂度，减少运维成本，同时可避免因人工变更不规范可能导致的服务异常

##### **比较 Zookeeper**

**ZK** 已经满足了协调服务特点，但为何还用 **etcd** 

> 高可用、数据一致性、功能三角度分析如下

- 不支持通过 **API** 安全地变更成员，需人工修改一个个节点的配置，并重启进程
- 姿势不正确，经常会 **脑裂 !**，因此适配云环境、平滑调整集群规模都很困难，运维成本高
- **JAVA** 编写，部署复杂，吃内存多，序列化是 **Jute** ，自己实现的 **RPC**，无法使用 **curl** 工具互动易用性差，无法使用 **HTTP/S** 安全性差 
- **ZK** 生态不够活跃，**Consul** 未必可靠稳定

::: tip 

**etcd** 的一致性协议易理解性，运维、安全等多维度上，比 **ZK** 都占据优势。

:::

##### 适用场景

1. 配置管理
2. 服务注册、发现
3. 选主
4. 应用调度
5. 分布式队列
6. 分布式锁

##### **读写性能**

按照官网给出的 **Benchmark：** 

**2核CPU**，**1.8G内存**，**SSD磁盘** 这种配置下，单节点的写性能可以达到 **16K QPS**, 而先写后读也能达到 **12K QPS**，看上去性能还是比较可观的



## 2. 工作原理

**etcd** 集群是一个分布式系统，由多个节点相互通信构成，整体对外服务，**每个节点都存储了完整的数据**，用 **Raft** 协议来维护集群内各个节点状态的一致性

1. 每个节点都会维护一个状态机

2. 任意时刻至多存在一个有效的主节点

3. 主节点处理所有来自客户端的写操作，并通过 **Raft** 协议保证写操作对状态机的改动会可靠的同步到其他节点

**etcd 工作原理核心部分在于 Raft 协议。主要分为三个部分：选主，日志复制，安全性**

### 2.1 选主

**Raft** 协议是用于维护一组服务节点数据一致性的协议，这一组服务节点构成一个集群，并且有一个主节点来对外提供服务

当集群初始化，或者主节点挂掉后，面临选主问题，集群中每个节点，任意时刻处于 **Leader**、**Follower**、 **Candidate** 这三个角色之一

##### **选举如下**

- 初始化时，每个节点都是 **Follower** 角色
- **Follower** 一定时间内未收到 **Leader** 节点的心跳，会将自己角色提升为 **Candidate**，并发起一次选主投票
  - 选票 **包括自己在内 超过半数节点赞成**，则选举成功
  - 选票不足半数，则选举失败，或选举超时
  - 若本轮未选出主节点，将进行下一轮选举（*出现这种情况，是由于多个节点同时选举，所有节点均未获得过半选票*）
- 若 **Candidate** 节点收到来自主节点的心跳，立即终止选举流程，降低为 **Follower** 角色
- 为了避免陷入选主失败循环，每个节点未收到心跳发起选举的时间，是一定范围内的 **随机值**，这样能够**避免两个节点同时发起选主** 

### 2.2 日志复制

**Leader** 将每次操作记录日志，**持久化** 到本地磁盘，**然后通过网络 IO 发送给其他节点** 

**Follower** 根据日志的逻辑时钟（*TERM*），和日志编号（*INDEX*）判断是否将该日志记录持久化到本地

当 **Leader** 收到 **包括自己在内超过半数** 的成功返回时，认为日志可提交（*committed*）将日志输入到状态机，并将结果返回给客户端。

::: tip

每次选主都会形成一个唯一的 **TERM** 编号，相当于逻辑时钟，每一条日志都有 **全局唯一** 的编号

:::

##### **追加日志**

**Leader** 通过网络 IO 向其他节点追加日志

- 若 **Follower** 节点收到日志追加的消息
  - 首先判断该日志的 **TERM** 是否过期
  - 而后该日志条目的 **INDEX** 是否比当前 / 以及提交日志的 **INDEX** 更早
    - 若过期 / 更早，则 **拒绝追加**，返回当前已经提交的日志编号
    - 否则，将日志追加，并返回成功
- 当 **Leader** 收到 **Follower** 日志追加回复后
  - 若发现有拒绝，将进入日志探测阶段，一条一条发送日志，直到目标节点接受日志，然后进入快速复制阶段，进行批量日志追加

::: note 按如上日志复制逻辑

- 集群中 慢节点不影响整个集群的性能

- 数据只从 **Leader** 复制到 **Follower** ，大大简化了逻辑流程

:::

### 2.3 安全性

::: warning

截止此刻，**选主** 及 **日志复制** 并不能保证节点间数据一致

1. 试想，某个节点挂了，一段时间后重启，并当选为了 **Leader**
2. 在其挂掉这段时间中，集群若有超过半数节点存活，依然会正常工作，那么必然 **会有日志提交**
3. 这些提交的日志无法传递给挂掉的节点，当挂掉的节点再次当选 **Leader** 时，它缺了部分已提交的日志

此时按 **Raft** 协议，它将自己的日志复制给其他节点，会把集群已提交的日志给覆盖掉，显然是不可接受的

:::

##### **其他协议解决办法**

新当选的 **Leader** 询问其他节点，和自己数据对比，**确定出集群已提交数据**，然后将缺失的数据同步过来

> **明显缺陷：** 增加了集群恢复服务的时间（*选举阶段不可服务*），且增加了协议复杂度

##### **Raft 解决的办法** 

- 选主逻辑中，对能够成为 **Leader** 的节点加以限制，确保选出的 **Leader** 一定包含集群已经提交的所有日志

- 若新 **Leader** 已包含集群所有提交的日志，就不需要和其他节点比对数据了

> 简化了流程，且缩短了集群恢复服务的时间

::: tip 这样限制后，能否选出主呢 ?

- 只要超过半数节点存活，这样的主一定能够选出

- 已经提交的日志必然被集群中超过半数节点持久化，显然前个 **Leader** 提交的最后一条日志，也会被集群中大部分节点持久化
- 当 **Leader** 挂掉后，集群中仍有大部分节点存活，那 **存活的节点中一定存在一个节点** 包含了已经提交的日志

:::

## 3. 使用说明

**etcd** 提供 **HTTP** 协议，最新版支持 **gRPC** 访问，具体接口情况如下：

- 支持 **PUT** / **GET** / **DELETE** 接口
- 为了服务注册与发现，支持 **WATCH** 接口（*通过 http long poll 实现* ）
- 支持 **KEY** 持有 **TTL** 属性
- **CAS**（*compare and swap*）操作
- 支持 **多 KEY 事务** 操作
- 支持 **目录** 操作

### 3.1 安装搭建

#### **单节点搭建（*测试* ）**

[GitHub Releases](https://github.com/etcd-io/etcd/releases)

```shell
# 下载
wget https://github.com/coreos/etcd/releases/download/v3.x.x/etcd-v3.x.x-linux-amd64.tar.gz

# 解压
tar xzvf etcd-v3.1.5-linux-amd64.tar.gz

# 移动目录
mv etcd-v3.1.5-linux-amd64 /opt/etcd
```

解压后是一些文档和两个二进制文件 **etcd** （*Server*）和 **etcdctl**（*Client*）

```shell
$ ls
# Documentation  etcd  etcdctl  README-etcdctl.md  README.md  READMEv2-etcdctl.md
```

操作后会生成一个 **default.etcd** ，用来存储 **etcd** 数据

```shell
# 启动单节点的 etcd 服务，运行 etcd 命令即可，若出现以下问题
$ etcd
# ./etcd bash: ./etcd: 权限不够，需要提高文件的权限，再次启动
$ chmod 755 etcd

$ etcd
# 启动成功则出现类似如下提示
134431 I | etcdmain: etcd Version: 3.x.xx
134941 I | etcdmain: Git SHA: 27fc7e2
135324 I | etcdmain: Go Version: go1.x.x
135572 I | etcdmain: Go OS/Arch: linux/amd64
...
```

#### **集群版 etcd 搭建**



##### 创建 systemd 服务

设定 etcd 配置文件
建立相关目录

```shell
$ mkdir -p /var/lib/etcd/
$ mkdir -p /opt/etcd/config/
```

创建 etcd 配置文件

```shell
$ cat <<EOF | sudo tee /opt/etcd/config/etcd.conf #节点名称
ETCD_NAME=$(hostname -s) #数据存放位置
ETCD_DATA_DIR=/var/lib/etcd
EOF
```

创建 systemd 配置文件

```shell
$ cat <<EOF | sudo tee /etc/systemd/system/etcd.service

[Unit]
Description=Etcd Server
Documentation=https://github.com/coreos/etcd
After=network.target

[Service]
User=root
Type=notify
EnvironmentFile=-/opt/etcd/config/etcd.conf
ExecStart=/opt/etcd/etcd
Restart=on-failure
RestartSec=10s
LimitNOFILE=40000

[Install]
WantedBy=multi-user.target
EOF
```

启动 **etcd**

```shell
$ systemctl daemon-reload && systemctl enable etcd && systemctl restart etcd
```



### 3.2 操作说明

官方提供了 **etcdctl** 命令行客户端，无需使用 **HTTP API** 更为方便，命令分为 数据库操作 和 非数据库操作 

```shell
# 查看帮助
etcdctl -h
```

建议先创建环境变量 

```shell
touch etcd.rc
```

键入类似如下

```shell
# etcd v3 环境变量
export ETCDCTL_WRITE_OUT="table"
export ETCDCTL_API=3
export ETCDCTL_ENDPOINTS="172.16.120.141:22379,172.16.120.142:22379,172.16.120.143:22379"
```

- **ETCDCTL_WRITE_OUT：**  输出信息格式，有 `"fields"`、`"json"`、 `"protobuf"`、 `"simple"`、 `"table"` 

 

##### 列目录

etcd3 没有 ls 使用 get 替代

- api 2 使用方法

        ETCDCTL_API=2 etcdctl ls /

- api 3 使用方法

        ETCDCTL_API=3 etcdctl get /

例如：

- 查询所有 key 或 value :

        $ etcdctl --endpoints=${ETCD_ENDPOINTS} get / --prefix --keys-only
        $ etcdctl --endpoints=${ETCD_ENDPOINTS} get / --prefix --print-value-only |jq [.]
    
- 使用证书查询：

        $ export ETCDCTL_API=3
        $ etcdctl --endpoints=${ETCD_ENDPOINTS} --cacert=/etc/kubernetes/ssl/ca.pem --cert=/etc/kubernetes/ssl/admin.pem --key=/etc/kubernetes/ssl/admin-key.pem --prefix --keys-only=true get /

##### 4.修改键值对

- api v2 版本：

        $ etcdctl set test hello

- api v3 版本：

        $ etcdctl put test hello

参考：https://github.com/coreos/etcd/issues/6904

### 数据库操作

#### set

指定某个键的值

    etcdctl set /testdir/testkey "Hello world" --ttl '5'
    Hello world
    
    支持的选项包括：
    -ttl '0' 该键值的超时时间(单位为秒)，不配置(默认为0)则永不超时
    
    –swap-with-value value 若该键现在的值是value，则进行设置操作
    
    –swap-with-index '0' 若该键现在的索引值是指定索引，则进行设置操作

### get

获取指定键的值。

    etcdctl get /testdir/testkey
    Hello world
    
    # 等待5秒后，再执行
    etcdctl get /testdir/testkey
    keyError:  100: Key not found (/key) [8]
    第一个get是5秒内的操作，第二get是5秒后的操作，此刻key的值已经消失了。
    
    # 当键不存在时，则会报错
    etcdctl get /testdir/testkey2
    Error:  100: Key not found (/testdir/testkey2) [5]
    
    支持的选项为：
    --sort 对结果进行排序
    
    --consistent 将请求发给主节点，保证获取内容的一致性。

#### update：

当键存在时，更新值内容

    # 先设置一个5秒的值
    $ etcdctl set /testdir/testkey "Hello world" --ttl '5'
    
    # 再修改值
    $ etcdctl update /testdir/testkey "Hello"
    Hello
    
    # 等待10秒，再次执行
    $ etcdctl get /testdir/testkey
    Hello
    可以发现，即使10秒，也可以get到。说明ttl和value同时更新了！ （ttl不重新设置则更新为了0 永不超时）
    
    当键不存在时，则会报错。例如:
    $ etcdctl update /testdir/testkey2 "Hello"
    Error:  100: Key not found (/testdir/testkey2) [6]

#### rm

删除某个键值。如果给定的键不存在，则创建一个新的键值。

    # 删除
    $ etcdctl rm /testdir/testkey
    PrevNode.Value: Hello
    
    #当键不存在时，则会报错
    $ etcdctl rm /testdir/testkey
    Error:  100: Key not found (/testdir/testkey) [7]
    
    支持的选项:
    -dir 如果键是个空目录或者键值对则删除
    
    –recursive 删除目录和所有子键
    
    –with-value 检查现有的值是否匹配
    
    –with-index ‘0’检查现有的index是否匹配

#### mk

如果给定的键不存在，则创建一个新的键值。

    $ etcdctl mk /testdir/testkey "Hello world"
    Hello world
    
    # 当键存在的时候，执行该命令会报错
    $ etcdctl mk /testdir/testkey "Hello world"
    Error:  105: Key already exists (/testdir/testkey) [8]

#### mkdir

如果给定的键目录不存在，则创建一个新的键目录。

    $ etcdctl mkdir testdir2
    
    # 当键目录存在的时候，执行该命令会报错
    $ etcdctl mkdir testdir2
    Error:  105: Key already exists (/testdir2) [9]

#### setdir

创建一个键目录。如果目录不存在就创建，如果目录存在更新目录 TTL。

    $ etcdctl setdir testdir3

#### updatedir

更新一个已经存在的目录。

    $ etcdctl updatedir testdir2

#### rmdir

删除一个空目录，或者键值对。

    $ etcdctl setdir dir1
    $ etcdctl rmdir dir1
    
    # 若目录不空，会报错
    $ etcdctl set /dir/testkey hi
    hi
    $ etcdctl rmdir /dir
    Error:  108: Directory not empty (/dir) [17]

#### ls

列出目录(默认为根目录)下的键或者子目录，默认不显示子目录中内容。

    $ etcdctl ls
    /testdir
    /testdir2
    /dir
    
    $ etcdctl ls dir
    /dir/testkey
    
    支持的选项：
    --sort 将输出结果排序
    
    --recursive 如果目录下有子目录，则递归输出其中的内容
    
    -p 对于输出为目录，在最后添加/进行区分

### 非数据库操作

- backup

  备份 etcd 的数据。

        $ etcdctl backup --data-dir /var/lib/etcd  --backup-dir /home/etcd_backup

  支持的选项包括:

        --data-dir  etcd的数据目录
        --backup-dir 备份到指定路径

- watch

  监测一个键值的变化，一旦键值发生更新，就会输出最新的值并退出。

  例如:用户更新 testkey 键值为 Hello watch。

        $ etcdctl get /testdir/testkey
        Hello world
        $ etcdctl set /testdir/testkey "Hello watch"
        Hello watch
        $ etcdctl watch testdir/testkey
        Hello watch

  支持的选项包括:

        --forever  一直监测直到用户按CTRL+C退出
        --after-index '0' 在指定index之前一直监测
        --recursive 返回所有的键值和子键值

- exec-watch

  监测一个键值的变化，一旦键值发生更新，就执行给定命令。

  例如：用户更新 testkey 键值。

        $ etcdctl exec-watch testdir/testkey -- sh -c 'ls'
        config  Documentation  etcd  etcdctl  README-etcdctl.md  README.md  READMEv2-etcdctl.md

  支持的选项包括:

        --after-index '0' 在指定 index 之前一直监测
        --recursive 返回所有的键值和子键值

- member

  通过 list、add、remove 命令列出、添加、删除 etcd 实例到 etcd 集群中。

  查看集群中存在的节点

        $ etcdctl member list
        8e9e05c52164694d: name=dev-master-01 peerURLs=http://localhost:2380 clientURLs=http://localhost:2379 isLeader=true

  删除集群中存在的节点

        $ etcdctl member remove 8e9e05c52164694d
        Removed member 8e9e05c52164694d from cluster

  向集群中新加节点

  ```
    $ etcdctl member add etcd3 http://192.168.1.100:2380
    Added member named etcd3 with ID 8e9e05c52164694d to cluster
  ```
