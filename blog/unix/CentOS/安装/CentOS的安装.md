---
title: CentOS安装及配置
date: 2020-06-04
category:
  - CentOS
tag:
  - CentOS
---

**CentOS** 配置相关问题

<!-- more -->

# CentOS安装事项

### 1. 初始化相关

##### **VMware 初始化设置**

`编辑 -> 虚拟网络编辑器 -> 通常是 VMnet8 NAT 模式下`

- 通过管理员进行设置，应该会有默认的设置

  ```shell
  # 子网ip：192.168.21.0   子网掩码：255.255.255.0
  ```

- 修改 **NAT** 设置

  ```shell
  # 网关：192.168.21.2
  ```

- 卡名称 **ens33** 改为 **eth0**，默认网卡常用 **eth0 ** （*方便*）

  ```shell
  net.ifnames=0 biosdevname=0
  ```

**安装后图形化配置 IP**

```shell
$ nmtui
```

##### **安装 net-tool**

```shell
$ yum install net-tools
```

##### **关闭防火墙**

```shell
# firewall-cmd --state

systemctl status firewalld
systemctl stop firewalld
systemctl disable firewalld
```
