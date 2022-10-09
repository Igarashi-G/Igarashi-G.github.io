---
title: RPM包管理
date: 2020-06-11
category:
  - CentOS
tag:
  - CentOS
  - 包管理
---

**CentOS** 的包管理

<!-- more -->

# rpm 包管理

## 1. rpm包

**RedHat Package Manager：** 与 **Debian Linux** 社区的 **dpkg** 不同，**RPM** 是红帽开发的，**CentOS**、**Rdeora**、**SUSE** 等开发商都用这个

::: tip 特点

需要软件先编译，打包成 **RPM** 机制的文件，通过软件中默认数据库记录依赖

:::

安装时，会按照软件中的数据查询，软件是否已经满足当前 **Linux** 主机的依赖属性，满足了才会安装

## 2. yum 管理工具

**yum** 是 **CentOS** 和 **RedHat** 系统上用的 **RPM** 包（*上层的* ）管理工具  ，要有 **本地 yum 源** 才可以使用

它的工作原理并不复杂，每一个 **RPM** 软件的头（*header*）里面都会纪录该软件的依赖关系，**yum** 通过分析，可自动解决依赖性

### 2.1 更换 yum 源

::: info 通常更换 yum 源来解决软件无法安装的问题

:::

::: tabs

@tab 阿里云

```shell
# 备份当前 yum 源防止出现意外还可以还原回来
cd /etc/yum.repos.d/
cp ./CentOS-Base.repo ./CentOS-Base-repo.bak

# 使用 wget 下载阿里 yum 源 repo 文件
wget http://mirrors.aliyun.com/repo/Centos-7.repo

# 清理旧包
yum clean all

# 把下载下来阿里云 repo 文件设置成为默认源
mv Centos-7.repo CentOS-Base.repo

# 生成阿里云 yum 源缓存并更新 yum 源
yum makecache
yum -y upgrade
```

@tab 163源

```shell
# 备份当前 yum 源防止出现意外还可以还原回来
cd /etc/yum.repos.d/
cp CentOS-Base.repo CentOS-Base-repo.bak

# 使用 wget 下载 163yum 源 repo 文件
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo

# 若提示没有 wget, 需要执行命令安装
yum -y install wget 

# 清理旧包
yum clean all

# 把下载下来 163repo 文件设置成为默认源
mv CentOS7-Base-163.repo CentOS-Base.repo

# 生成 163 的 yum 源缓存并更新 yum 源
yum makecache
yum -y upgrade
```

:::

::: danger 慎用该命令，会更新内核

```shell
yum update
```

:::

### 2.2 安装 epel 拓展软件源

**epel：** 如果既想获得 **RHEL** 的高质量、高性能、高可靠性，又需要方便易用（*关键是免费*）的软件包更新功能， **Fedora Project** 推出了 [EPEL](http://fedoraproject.org/wiki/EPEL) （*Extra Packages for Enterprise Linux*）由 **Fedora** 社区打造，为 **RHEL**
及衍生发行版如: **CentOS**、**Scientific Linux** 等提供高质量软件包的项目

**CentOS** 用户可以直接通过如下安装并启用 **EPEL** 源

```shell
$ yum install epel-release 
```

[参考](https://blog.csdn.net/heavyfish/article/details/82808970)

## 3. Linux 内核

**Linux** 内核版本分为主线、稳定和长期版本

- 主线版本代表整个 **Linux** 内核的一个树干，新的主线版本每 **2-3** 个月发布一次
- 稳定内核则是在主线版本中，被认为是 "稳定的" 得出。是根据需要发布的，通常是每 **3** 个月。
- 而对于长期内核版本，通常提供几个 "长期维护" 内核版本，用于较早的内核树错误修复返回的目的。这些内核只应用重要的错误修复，通常不会有非常频繁的更新

### 3.1 CentOS 内核

- 对于 **CentOS/RHEL** 系统，尽量使用 **yum** 方式或 **RPM** 包安装 / 升级内核，需要注意的是红帽的 **Red Hat Linux** 服务需要订阅

- 使用安装新内核而不是直接升级内核，安装新内核不会覆盖旧内核，而升级会导致新内核直接替换旧内核，可能会导致系统无法启动

#### 查看当前操作系统版本：

```shell
$ cat /etc/redhat-release
CentOS Linux release 7.8.2003 (Core)
```

#### 查看当前内核

```shell
$ uname -r / uname -a
Linux node105 3.10.0-1127.8.2.el7.x86_64 #1 SMP Tue May 12 16:57:42 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

#### 查看可升级的内核版本

```shell
yum list kernel --showduplicates
```

#### rpm 查看具体安装内核文件

```shell
rpm -qa | grep kernel                           # 查看kernel 相关的安装包
rpm -ql kernel-3.10.0-957.el7.x86_64            # 查看安装包的具体路径
```

### 3.2 yum 升级软件和内核

**kernel Linux：** 内核软件包，包含单、多核和多处理器系统的内核，是任何 **Linux** 操作系统的核心，单处理器的系统仅需安装内核包

**Linux** 升级命令有两个分别是 `yum upgrade` 和 `yum update`，区别如下

- `yum -y update` 升级所有包同时也升级软件和系统内核
  - 升级前：内核版本 **3.10.0-957.el7.x86_64**
  - 升级后：内核版本 **3.10.0-1127.8.2.el7.x86_64**
- `yum -y upgrade` 只升级所有包，不升级软件和系统内核

::: warning 最好别执行 yum -y update

:::

### 3.3 在 CentOS 上降级内核

- 首先先找到目标内核的 **rpm** 源

  ```shell
  wget http://vault.centos.org/7.7.1908/os/Source/SPackages/kernel-3.10.0-957.el7.src.rpm
  ```

- 删除之前的内核版本，若有依赖，则一个个删相关依赖

  ```shell
  rpm -ev kernel-3.10.0-1127.8.2.el7.x86_64
  
  # 删依赖
  rpm -ev kmod-kvdo-6.1.3.7-5.el7.x86_64
  ```

- 安装该 **rpm** 源

  ```shell
  rpm -ivh kernel-3.10.0-957.el7.src.rpm
  ```

- 禁止 **yum** 自动升级 **kernel**

  ```shell
  vim /etc/yum.conf
  exclude=kernel*
  ```

### 3.4 在 CentOS 上降级发行版本

- 首先下载目标发行版本的 **rpm** 源

  ```shell
  wget http://vault.centos.org/7.7.1908/os/Source/SPackages/centos-release-7-7.1908.0.el7.centos.src.rpm
  ```

- 安装该发行版本 **rpm** 源

  ```shell
  rpm -ivh centos-release-7-7.1908.0.el7.centos.src.rpm --force
  ```

- 查看当前系统的发行版本

  ```shell
  rpm -qa|grep -i centos-release-7-
  
  # 可出现两个发行版本
  centos-release-7-6.1810.2.el7.centos.x86_64
  ```

- 直接执行以下命令 安装 **C7.6** 版本对应的

  ```shell
  yum --disablerepo='*' --enablerepo='C7.6*' upgrade
  ```

- 解决不了，那就重装
