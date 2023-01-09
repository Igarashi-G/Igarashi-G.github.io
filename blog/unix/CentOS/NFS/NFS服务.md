---
title: NFS服务
order: 1
group:
  title: NFS
  order: 14
---

# NFS

### 1. 简介

### 2. 配置

#### 2.1 软件配置

#### 2.2 导出配置

[NFS Export Config](https://insights-core.readthedocs.io/en/latest/shared_parsers_catalog/nfs_exports.html#insights.parsers.nfs_exports.NFSExportsBase) 

### 3. 使用及说明

#### 3.1 exportfs 工具

**语法格式**

```shell
exportfs [必要参数] [选择参数] [目录]
```

**功能描述**

[exportfs 命令](https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/8/html/managing_file_systems/the-exportfs-utility_exporting-nfs-shares) ：可以在不直接编辑 `/etc/exports` 文件的情况下，使 `root` 用户能够有选择的导出或取消导出目录，而无需重启服务

- `exportfs` 会将导出的文件系统写到 `/var/lib/nfs/xtab`
- `nfs-mountd` 服务在决定访问文件系统的特权时，会参考 `xtab` 文件，因此对导出的文件系统列表的更改，会立即生效

```shell
# reload 导出
$ exportfs -rv  ||  -arv
```

#### 3.2 发现 NFS 导出

- 对于支持 **NFSv3** 的任何服务器，请使用 `showmount` 工具

  ```shell
  $ showmount -e 172.16.120.141
  # Export list for 172.16.120.141:
  # /exports/zz              *
  # /share/Users/grpc-master *
  ```

- 对于支持 **NFSv4** 的任何服务器，挂载根目录并查找

  ```shell
  $ mount 172.16.120.141:/share /mnt/zz
  $ ls /mnt/zz
  # exports
  
  $ls /mnt/zz/exports/
  # foo
  # bar
  ```

#### 3.3 挂载

请使用如下形式的命令去挂载：

```shell
$ mount -t nfs -o options host:/remote/export /local/directory
```

- 通过 `ip` 挂载

  ```shell
  # v3版本
  $ mount.nfs -vvv -o vers=3 172.16.120.141:/share/Users/zz /home/zz
  ```

- 通过 **域名** 挂载

  ```shell
  # v4版本
  $ mount.nfs -vvv -o vers=4 nas.local:/share/zz /home/zz
  ```

[常用挂载选项](https://access.redhat.com/documentation/zh-cn/red_hat_enterprise_linux/8/html/managing_file_systems/common-nfs-mount-options_mounting-nfs-shares)

#### 3.4 卸载

```shell
$ umount /home/zz

# 若提示 umount.nfs4: /home/zz: device is busy

# 执行如下命令，强制卸载
$ umount -fl /home/zz
```

#### 3.5 获取挂载 `nfs` 客户端:

> 查询默认服务端口 `cat /etc/services| grep nfs`

- 命令快速查: （_不一定好用_）

  ```shell
  ss | grep :nfs
  ```

- 使用 **python**:

  ```python
  import psutil
  
  [
      {
          "laddr": f"{net.laddr.ip}:{net.laddr.port}",
          "raddr": f"{net.raddr.ip}:{net.raddr.port}"}
      for net in psutil.net_connections()
      if net.laddr.port == 2049 and
      isinstance(net.laddr, psutil._common.addr) and
      isinstance(net.raddr, psutil._common.addr)
  ]
  ```

### 4. V4 无法直接挂载问题

由于 `v4` 的挂载和 `v3` 不同，要先导出根目录，才能挂子目录

若希望无需导出根目录，实现用户通过 `v4` 可自由挂载子目录，其解决办法如下：

<Alert type="info"> 针对 `NFSv4` 版本 `Linux` 客户端二次共享: <Badge type="error">fsid</Badge> + <Badge type="info">bind</Badge></Alert>

使用 `--bind` 建立挂载链接

[参考](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/5/html/deployment_guide/s1-nfs-server-config-exports)

```shell
# 若用户需要挂载 /share/Users/zz 这个子目录:
mkdir /exports/nfs/Users/zz

# 使用 bind 创建绑定
mount --bind /share/Users/zz /exports/nfs/Users/zz

# /etc/exports 文件中添加导出，如：
/exports/nfs/Users/zz		*(fsid=17,async,root_squash,no_all_squash,anonuid=65534,anongid=65534,rw)
```

> **注意：**
>
> - 貌似也需要先导出对应的子目录，才能挂载 `bind` 目录
> - `fsid` 若一致，有无影响，有参考说会影响高可用、或出现不同目录 但同一个挂载的问题
> - 用此方式，会增加开机自动挂载等流程的复杂度
