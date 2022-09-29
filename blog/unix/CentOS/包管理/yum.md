---
title: yum包
order: 1
group:
  title: 包管理工具
  order: 32
---

# yum 包管理

是 CentOS 和 RedHat 系统上用的 RPM 包管理工具

## 更换 yum 源

更换 yum 源解决软件无法安装的问题：（真能解决大部分软件安装的问题，照着一下流程过一遍）

### 1.163yum 源：

1.备份当前 yum 源防止出现意外还可以还原回来

    cd /etc/yum.repos.d/
    cp CentOS-Base.repo CentOS-Base-repo.bak

2.使用 wget 下载 163yum 源 repo 文件

    wget http://mirrors.163.com/.help/CentOS7-Base-163.repo

    若提示没有wget，需要执行 yum -y install wget 命令安装即可

3.清理旧包

    yum clean all

4.把下载下来 163repo 文件设置成为默认源

    mv CentOS7-Base-163.repo CentOS-Base.repo   # 确认覆盖即可

5.生成 163yum 源缓存并更新 yum 源

    yum makecache
    yum -y upgrade
    # yum update  慎用该命令，会更新内核

### 2.阿里云 yum 源：

1.备份当前 yum 源防止出现意外还可以还原回来

    cd /etc/yum.repos.d/
    cp /CentOS-Base.repo /CentOS-Base-repo.bak

2.使用 wget 下载阿里 yum 源 repo 文件

    wget http://mirrors.aliyun.com/repo/Centos-7.repo

3.清理旧包

    yum clean all

4.把下载下来阿里云 repo 文件设置成为默认源

    mv Centos-7.repo CentOS-Base.repo

5.生成阿里云 yum 源缓存并更新 yum 源

    yum makecache
    yum -y upgrade
    # yum update  慎用该命令，会更新内核

## 安装 epel 拓展软件源

https://blog.csdn.net/heavyfish/article/details/82808970

### epel 是什么

如果既想获得 RHEL 的高质量、高性能、高可靠性，又需要方便易用(关键是免费)的软件包更新功能，那么 Fedora Project 推出的 EPEL
(Extra Packages for Enterprise Linux)正好适合你。EPEL(http://fedoraproject.org/wiki/EPEL) 是由 Fedora 社区打造，为 RHEL
及衍生发行版如 CentOS、Scientific Linux 等提供高质量软件包的项目。

    CentOS 用户可以直接通过 yum install epel-release 安装并启用 EPEL 源。

## Linux 内核

Linux 内核版本分为主线、稳定和长期版本

- 主线版本代表整个 Linux 内核的一个树干，新的主线版本每 2-3 个月发布一次
- 稳定内核则是在主线版本中，被认为是 "稳定的" 得出。是根据需要发布的，通常是每 3 个月。
- 而对于长期内核版本，通常提供几个 "长期维护" 内核版本，用于较早的内核树错误修复返回的目的。这些内核只应用重要的错误修复，
  通常不会有非常频繁的更新

### 1.CentOS 内核：

- 对于 CentOS/RHEL 系统，尽量使用 yum 方式或 RPM 包安装 / 升级内核，需要注意的是红帽的 Red Hat Linux 服务需要订阅。

- 使用安装新内核而不是直接升级内核，安装新内核不会覆盖旧内核，而升级会导致新内核直接替换旧内核，可能会导致系统无法启动，安装也可以
  让我们在升级后有回滚的选择。

#### 查看当前操作系统版本：

    cat /etc/redhat-release
    CentOS Linux release 7.8.2003 (Core)

#### 查看当前内核

    uname -r / uname -a
    Linux node105 3.10.0-1127.8.2.el7.x86_64 #1 SMP Tue May 12 16:57:42 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux

#### 查看可升级的内核版本

    yum list kernel --showduplicates

#### rpm 查看具体安装内核文件

    rpm -qa | grep kernel                           # 查看kernel 相关的安装包
    rpm -ql kernel-3.10.0-957.el7.x86_64            # 查看安装包的具体路径

### 2.yum 升级软件和内核：

- kernel Linux 内核软件包，包含单、多核和多处理器系统的内核，是任何 Linux 操作系统的核心，单处理器的系统仅需安装内核包。

Linux 升级命令有两个分别是 yum upgrade 和 yum update, 这个两个命令是有区别的:

- yum -y update：升级所有包同时也升级软件和系统内核
  - 升级前：内核版本 3.10.0-957.el7.x86_64
  - 升级后：内核版本 3.10.0-1127.8.2.el7.x86_64
- yum -y upgrade：只升级所有包，不升级软件和系统内核

【注意】：最好别执行 yum -y update

### 3.在 CentOS 上降级内核：

- 首先先找到目标内核的 rpm 源：

        wget http://vault.centos.org/7.7.1908/os/Source/SPackages/kernel-3.10.0-957.el7.src.rpm

- 删除之前的内核版本，若有依赖，则一个个删相关依赖
  rpm -ev kernel-3.10.0-1127.8.2.el7.x86_64

        删依赖：rpm -ev kmod-kvdo-6.1.3.7-5.el7.x86_64

- 安装该 rpm 源：

        rpm -ivh kernel-3.10.0-957.el7.src.rpm

- 禁止 yum 自动升级 kernel

        vim /etc/yum.conf
        exclude=kernel*

### 4.在 CentOS 上降级发行版本：

- 首先下载目标发行版本的 rpm 源：

        wget http://vault.centos.org/7.7.1908/os/Source/SPackages/centos-release-7-7.1908.0.el7.centos.src.rpm

- 安装该发行版本 rpm 源：
  rpm -ivh centos-release-7-7.1908.0.el7.centos.src.rpm --force
- 查看当前系统的发行版本：

        rpm -qa|grep -i centos-release-7-

        可出现两个发行版本
        centos-release-7-6.1810.2.el7.centos.x86_64

注：

- 直接执行以下命令 安装 C7.6 版本的，对应

        yum --disablerepo='*' --enablerepo='C7.6*' upgrade

  经验证，还是没啥用

- 最后解决办法，重装
