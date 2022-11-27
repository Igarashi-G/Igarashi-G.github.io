---
title: UFS快捷命令
date: 2021-08-06
category:
  - UFS
tag:
  - UFS
  - CLI
---

**UFS** 管理平台常用快捷命令



<!-- more -->

# UFS 快捷命令

### 1. 部署相关

#### 1.1 更新集群代码

- 免密认证

  ```shell
  $ ssh-keygen
  $ ssh-copy-id -i ~/.ssh/id_rsa.pub -p 22 root@172.16.120.142
  ```

- 远程拷贝

  ```shell
  $ scp -r agent conf dashboard monitor mounter rook static version.py ubind watchdog root@172.16.120.142:/opt/uxs
  ```

- 远程执行命令

  ```shell
  $ ssh 172.16.120.142 "systemctl restart uxs-agent"
  ```

- 重启服务

  ```shell
  systemctl restart uxs-dashboard
  systemctl restart uxs-agent
  systemctl restart uxs-monitor
  systemctl status uxs-dashboard
  systemctl status uxs-agent
  systemctl status uxs-monitor
  ```

- 手动启动服务

  ```shell
  $ python3 /opt/uxs/dashboard/uxsdashboard.py

  $ python3 /opt/uxs/agent/uxsagent.py

  $ python3 /opt/uxs/monitor/uxsmonitor.py
  ```

- 查看服务进程

  ```shell
  $ ps -ef |grep uxsdashboard

  $ ps -ef |grep uxsagent

  $ ps -ef |grep uxsmonitor
  ```

- 删除服务 PID 文件

  ```shell
  $ rm -rf /var/run/uxsagent.pid

  $ rm -rf /var/run/uxsmonitor.pid
  ```

- 查看各个服务日志

  ```shell
  $ tailf /var/log/uxs/uxsdashboard.log
  
  $ tailf /var/log/uxs/uxsagent.log
  
  $ tailf /var/log/uxs/uxsmonitor.log
  ```

#### 1.2 ETCD 相关

- 重置 **etcd**

  ```shell
  # 修改 new
  $ vim /etc/uxs/config.json
  
  # 重置endpoints
  $ vim /etc/uxs/etcd.json
  
  {
      "etcd_endpoints": "ipv4:///127.0.0.1:22379"
  }
  
  # 清空etcd
  systemctl stop uxsetcd
  rm -rf /var/lib/etcd/uxs_default.etcd
  ```

#### 1.3 生成许可

- 生成许可证

  ```shell
  $ ufs_make_license --serial_number 17A179CFF629D10322E69AF61A959E013DCE5075  --chunkservers=1000 --clients=10000 --expire_date=2099-01-01 --capcity=2PiB
  ```

#### 1.4 MSS 服务相关

##### 解决 `MSS` 无法启动问题

- `-a` 参数

  ```shell
  ufsmetaserver restart -a

  # 然后再执行 stop，并去管理平台手动启动
  ufsmetaserver stop
  ```

- `test` 参数

  ```shell
  查看 ufsmetaserver 当前情况
  ```

- `-f` 参数

  ```shell
  # 查看服务错误日志
  ufsmetaserver -f
  ```

> **备注**： 终极解决办法: `ufsmeatserver -e`
>
> 此方式会将所有 `meta`、`chunk` 都重新启动，可能会导致丢数据！！！！
>
> 仅有十分十分特殊情况下，也应该先确认，再使用

#### 1.5 CSS 服务相关

##### 解决 `CSS` 无法启动问题

- `-f` 参数

  ```shell
  # 查看服务错误日志
  ufschunkserver -f
  ```

#### 1.x 挂载相关

- 挂载子目录

  ```shell
  $ /usr/bin/ufsmount -o ufsioretries=3,ufstimeout=1,ufsdelayedinit,internal /export/nas/Users
  ```

- 挂载回收站目录

  ```shell
  $ /usr/bin/ufsmount -m /export/meta/
  ```

- 远程挂载

  ```shell
  $ ufsmount -H
  ```

---

### 2. 调度相关

#### 2.1 节点高可用

#### 2.2 NAS 服务高可用

- 监听 IP

  ```shell
  $ watch -n 1 "ip a"
  ```

- 秒 `ping` IP

  ```shell
  # 目前用于高可用检测网卡是否ping通，由于上锁同步导致至少需1s
  ping 192.16.120.175 -c 1 -t 1 -W 1
  ```

- 添加网卡 IP

  ```shell
  $ ip addr add 172.16.120.171/24 broadcast 172.16.120.255 dev eth1
  ```

- 删除网卡 IP

  ```shell
  $ ip addr del 172.16.120.171/24 dev eth1
  ```

- 刷新网卡

  ```shell
  $ ip addr flush eth1
  ```

- 设置网卡状态

  ```shell
  $ ip link set eth1 down
  $ ip link set eth1 up
  ```

---

### 3. 基础排错相关

#### 3.1 基础服务无法启动

- `systemctl` 无法启动

  > 例: `systemctl restart smb.service` 无法启动

-
