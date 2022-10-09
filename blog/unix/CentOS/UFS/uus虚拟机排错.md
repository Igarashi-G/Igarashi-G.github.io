---
title: 虚拟机UUS排错
date: 2021-10-16
category:
  - UFS
tag:
  - UUS
---

虚拟机环境下使用 **UUS** 排错及说明

<!-- more -->

### 1. UUS 部分说明

这里 N：M 是 uraid 内数据 chunk 和校验 chunk 的比例。
K 是 URAID 对节点失效容忍度的要求。K 不能大于 M，通常选择是 K=0、1、M。
K 选 0 意味着有任意节点失效时，uraid 将不可访问，如果节点不能恢复或修复，则该
uraid 数据将丢失。
K 选 1 意味着同时有且仅有一个节点失效时，uraid 数据仍可正常读写；多于一个节点
同时失效时，情况同上。
K 选 M 意味着 uraid 可以接受至多 M 各节点同时失效，数据读写能正常进行；多于 M
个节点同时失效时，情况同上。

K 的选择还受到集群内节点数量的限制，如果节点数量小于（N+M），那么通常只能选
择 0；否则可以选 M，因此，实际部署时，通常集群的节点数量应该大于 N+M，如 N+M+1
或更多。

- 创建单个 uraid 的例子: '

  ```shell
  $ ucli uraid create test-pool test_uraid_1 4000G 256 8 2 2
  ```

  - **CAPACITY** 默认是整型，若输入浮点型，则直接取整
  - **URAID-NAME** 设定为 `RANDOM` 时，系统会随机选择一个命名，在脚本中反
    复创建多个 `uraid` 时，可以利用这个特性

**URAID** 创建后，节点中会有对应的 `/dev/mdX` 设备 ( `X` 对应 `uraid` 的 **ID**，集群内唯一）可以立即使用

> **TIPS**：
>
> - 资源池最小磁盘数量是 `N + M` ，资源池的最小节点数量是`((N + M) * K / M）`
>
>   - 当 **K** 是 0 时，需要一个节点即可
>
>   - **K** 为 65000 时，则算法只选择资源池内本节点的磁盘，这意味着本节点离线后，该 `uraid` 无法被其它节点接管。
>
> - 使用中文名称创建 uraid 也是支持的，但需要终端使用 utf-8 编码，否则创建可 UUS 虚拟机使用参考指南

### 2. 使用 UUS 虚拟机的限制

##### 2. -1 不使用 UUS：

> 既然不好用，为什么要用呢？所以卸载！！

- **卸载命令**：

  ```shell
  # 干掉服务
  for i in `ls /usr/lib/uraid/scripts/init/`;do systemctl disable --now $i;done
  
  # 干掉uraid
  rm -rf /usr/lib/uraid;rm -rf /etc/sysconfig/uraid
  ```

---

由于 **uus** 在虚拟机上运行有诸多的限制，在此将 **uus** 虚拟机的限制在此列出：

##### 2.1 serial number

- 虚拟的磁盘必须有 **serial number**，否则 **uus** 无法识别：

  - 重新生成 `uuid` (*虚拟机克隆模式*)

    ```shell
    uuidgen > /etc/machine-id
    ```

##### 2.2 资源占用

- 降低 uus 资源占用(虚拟机)

  ```shell
  vim /usr/lib/systemd/system/unfs-server.service  +32
  ExecStart=/usr/bin/nfsd -V 3 -p 3000 3500 把3500改小点 （3000，3500）都改10

  systemctl daemon-reload
  systemctl stop unfs-server
  systemctl start unfs-server
  ```

- 关闭磁盘检测（虚拟机）

  ```shell
  touch /etc/sysconfig/uraid/disable-exp-chk-baddisk
  rm -f /etc/sysconfig/uraid/enable-disk-check
  touch /etc/sysconfig/uraid/enable-uvol-vm
  ```

- 停掉所有 uus 服务

  ```shell
  $ ucli svc stop all
  ```

##### 2.3 许可

- 删除 **sn**，重新生成新的 **sn**(*虚拟机*)

  ```shell
  rm -f /etc/sysconfig/uraid/sn
  rm -f /etc/sysconfig/uraid/key
  systemctl restart v-meta
  ```

- 获取 **key**

  ```shell
  # 1.smb共享 \\172.18.50.50\lic 目录下
  username: sn password: sn

  # 2.获取节点的sn号
  /etc/sysconfig/uraid/sn

  # 3.将sn号重命名为sn+ip的形式，上传至指定目录

  # 4.目录检测到文件变动后自动生成文件名为key....sn+ip 的key文件，然后上传至如下路径
  /etc/sysconfig/uraid/key

  # 5.重启v-meta服务
  $ systemctl restart v-meta

  ### 其他节点重复上述步骤

  # 6.检测key文件是否生效
  $ ucli sysconfig license-show
  ```

- 更新 `uraid` 的 `udev` 文件（**1202** 版本已更新）

  ```shell
  cat <<EOF > /etc/udev/rules.d/90-umd.rules
  
  SUBSYSTEM!="block", GOTO="umd_end"
  
  # handle umd arrays
  KERNEL!="umd_d*", GOTO="umd_end"
  
  #IMPORT{program}="/sbin/blkid -o udev -p %N"
  IMPORT{builtin}="blkid"
  OPTIONS+="link_priority=100"
  OPTIONS+="watch"
  ENV{ID_FS_USAGE}=="filesystem|other|crypto", ENV{ID_FS_UUID_ENC}=="?*", SYMLINK+="disk/by-uuid/$env{ID_FS_UUID_ENC}"
  ENV{ID_FS_USAGE}=="filesystem|other", ENV{ID_FS_LABEL_ENC}=="?*", SYMLINK+="disk/by-label/$env{ID_FS_LABEL_ENC}"
  
  LABEL="umd_end"
  
  EOF
  ```

##### 2.4 系统盘文件系统限制

- 当系统盘为 xfs 文件系统时，添加指定行 `return 0`

  ```shell
  vim  /usr/lib/uraid/scripts/drivers.shell +174
  
  171         #insmod openfile-by-ino drivers
  172         modprobe xfs
  173         modprobe nfs
  174         insmod /usr/lib/uraid/drivers/u_getpath.ko
  return 0
  175         if [ 0 -eq "$(lsmod |grep -c '^u_getpath')" ]; then
  176                 eecho "Setup u_getpath driver FAIL."
  177                 return 1
  178         fi
  
  
  systemctl start uraid-driver
  systemctl restart v-meta
  ```
