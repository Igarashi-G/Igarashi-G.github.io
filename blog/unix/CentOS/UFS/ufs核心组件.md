---
title: UFS核心组件
date: 2021-10-16
category:
  - UFS
tag:
  - UFS
star: true
sticky: true
---

本文档提供 **UFS** 存储系统核心组件的配置说明

<!-- more -->

# 核心组件

**产品**：UFS

**版本**：v4.0

**日期**：2021-10-16

**摘要**：本文档提供 UFS 存储系统核心组件的配置说明

## 1. MSS 组件

### 1.1 基本信息

| 类目         | 信息                           | 说明             |
| ------------ | ------------------------------ | ---------------- |
| 核心进程     | ufsmetaserver                  |                  |
| 进程路径     | /usr/sbin/ufsmetaserver        |                  |
| 配置文件路径 | /etc/ufs/ufsmetaserver.cfg     |                  |
| 日志文件路径 | /var/log/ufs/ufsmetaserver.log |                  |
| 依赖项       | license.bin                    | License 许可文件 |
|              |                                |                  |

### 1.2 操作方式

- 通过 GUI 管理平台

请以超级管理员账户的身份的登录 GUI 管理平台进行操作。

- 通过 CLI 工具

执行 CLI 工具需要以 root 账户身份登录节点服务器。

### 1.3 操作类型

**启动服务：**

```shell
systemctl start ufs-metaserver
ufsmetaserver start
```

**停止服务：**

```shell
systemctl stop ufs-metaserver
ufsmetaserver stop
```

**重启服务：**

```shell
systemctl restart ufs-metaserver
ufsmetaserver restart
```

**重新加载服务配置：**

```shell
systemctl reload ufs-metaserver
ufsmetaserver reload
```

**查看服务的运行状态：**

```shell
systemctl status ufs-metaserver
ufsmetaserver test
```

**启用/禁用开机启动：**

```shell
systemctl enable  ufs-metaserver
systemctl disable ufs-metaserver
```

**查看软件版本信息：**

```shell
ufsmetaserver -v
```

**查看帮助信息：**

```shell
ufsmetaserver -h
```

**支持的命令行参数：**

| 参数                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -v : print version number and exit                                                                                                                                                                          |
| -f : run in foreground                                                                                                                                                                                      |
| -u : log undefined config variables                                                                                                                                                                         |
| -n : do not attempt to increase limit of core dump size                                                                                                                                                     |
| -t locktimeout : how long wait for lockfile                                                                                                                                                                 |
| -c cfgfile : use given config file                                                                                                                                                                          |
| -i : ignore some metadata structure errors (attach orphans to root, ignore names without inode, etc.). DO NOT USE unless you are absoluttely sure that there are no other options to restore your metadata. |
| -a : automatically restore metadata from change logs                                                                                                                                                        |
| -e : start without metadata (download all from leader)                                                                                                                                                      |
| -x : produce more verbose output                                                                                                                                                                            |
| -xx : even more verbose output                                                                                                                                                                              |

### 1.4 参数配置

配置说明：`/etc/ufs/ufsmetaserver.cfg`

| 功能 | 配置项                                       | 说明                                                                                                                                 |
| ---- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
|      | WORKING_USER = root                          | 设置服务进程在运行时的有效用户身份（默认为 root）                                                                                    |
|      | WORKING_GROUP = root                         | 设置服务进程在运行时的有效组身份（默认为 root）                                                                                      |
|      | SYSLOG_IDENT = ufsmetaserver                 | 配置服务进程在 syslog 中的进程标示字段（默认为 ufsmetaserver）                                                                       |
|      | LOCK_MEMORY = 0                              | 配置 LOCK_MEMORY 以避免操作系统将进程所占用的内存交换到 swap 分区上（默认为 0，不开启）                                              |
|      | LIMIT_GLIBC_MALLOC_ARENAS = 4                | 限制服务器使用大量的虚拟内存（默认为 4）                                                                                             |
|      | DISABLE_OOM_KILLER = 1                       | 限制 OOM_KILLER（默认为 1，开启）                                                                                                    |
|      | NICE_LEVEL = -19                             | 用来运行守护程序的级别（默认值为-19；注意：必须以 root 身份启动进程才能增加优先级，如果设置优先级失败，进程将保留其启动时的级别）    |
|      | FILE_UMASK = 027                             | 设置组和其他用户的默认 umask（用户始终为 0，默认值为 027-阻止组写入，其他全部阻止）                                                  |
|      | DATA_PATH = /var/lib/ufs                     | 设置服务进程的工作目录（默认为/var/lib/ufs，用来存放 changelog、metadata、pid 等）                                                   |
|      | EXPORTS_FILENAME = /etc/ufs/ufsexports.cfg   | 设置服务进程所需要的 ufsexports.cfg 路径                                                                                             |
|      | TOPOLOGY_FILENAME = /etc/ufs/ufstopology.cfg | 设置服务进程所需要的 ufstopology.cfg 路径                                                                                            |
|      | BACK_LOGS = 50                               | MSS 日志备份数量（默认为 50）                                                                                                        |
|      | METADATA_SAVE_FREQ = 1                       | 设置 metadata 同步到本地的时间间隔（默认为 1，1 小时同步一次）                                                                       |
|      | BACK_META_KEEP_PREVIOUS = 1                  | 设置保留的先前元数据 DB 的数量（默认为 1）                                                                                           |
|      | CHANGELOG_PRESERVE_SECONDS = 1800            | 设置 changelog 在内存中保留时间限制（默认为 1800，单位为秒）                                                                         |
|      | CHANGELOG_SAVE_MODE = 0                      | 设置 changelog 的存档机制<br />（默认为 0，可选参数为 0、1、2）                                                                      |
|      | MISSING_LOG_CAPACITY = 100000                | 限制在内存中记录的丢失的 chunk 块数量的上限（默认为 100000）                                                                         |
|      | MATOML_LISTEN_HOST = \*                      | metaserver                                                                                                                           |
|      | MATOML_LISTEN_PORT = 9419                    | 配置监听与 metaserver、supervisors 的网络端口                                                                                        |
|      | MATOCS_LISTEN_HOST = \*                      | 配置监听与 chunkserver 的 IP 地址                                                                                                    |
|      | MATOCS_LISTEN_PORT = 9420                    | 配置监听与 chunkserver 的网络端口                                                                                                    |
|      | MATOCS_TIMEOUT = 10                          | MSS 服务与 CSS 服务网络通信的超时时间（默认为 10，单位为秒）                                                                         |
|      | AUTH_CODE = ufspassword                      | 配置 metaserver 与 chunkserver 通信注册的凭证（默认不配置这个选项）                                                                  |
|      | REPLICATIONS_DELAY_INIT = 60                 | 限制开始数据修复的初始延迟，以秒为单位（默认为 60）                                                                                  |
|      | REPLICATIONS_RESPECT_TOPOLOGY = 0            |                                                                                                                                      |
|      | CREATIONS_RESPECT_TOPOLOGY = 0               |                                                                                                                                      |
|      | CHUNKS_UNIQUE_MODE = 0                       |                                                                                                                                      |
|      | CHUNKS_LOOP_MAX_CPS = 100000                 | 限制每次 chunk_loop 检查次数操作的上限（默认为 100000）                                                                              |
|      | CHUNKS_LOOP_MIN_TIME = 300                   | 限制每次 chunk_loop 检查次数操作的时间下限（默认为 300 秒）                                                                          |
|      | CHUNKS_SOFT_DEL_LIMIT = 10                   | 限制 CSS 服务中软删除数据块的最大数量（默认为 10）                                                                                   |
|      | CHUNKS_HARD_DEL_LIMIT = 25                   | 限制 CSS 服务中硬删除数据块的最大数量（默认为 25）                                                                                   |
|      | CHUNKS_WRITE_REP_LIMIT = 2,1,1,4             | 限制复制到一个 CSS 服务中的最大数据块数量                                                                                            |
|      | CHUNKS_READ_REP_LIMIT = 10,5,2,5             | 限制从一个 CSS 服务中复制的最大数据块数量                                                                                            |
|      | CS_HEAVY_LOAD_THRESHOLD = 150                | CSS 服务的负载阈值（默认为 150）                                                                                                     |
|      | CS_HEAVY_LOAD_RATIO_THRESHOLD = 5.0          | CSS 负载的阈值比率（默认为 5.0，当 CSS 负载高于先前指定的阈值并且此比率高于平均负载时，CSS 将切换到“grace”模式）                     |
|      | CS_HEAVY_LOAD_GRACE_PERIOD = 900             | 定义 CSS 服务器将在“grace”模式下保持多长时间（以秒为单位）                                                                           |
|      | ACCEPTABLE_PERCENTAGE_DIFFERENCE = 1.0       | 限制 CSS 服务空间使用之间的最大差异百分比（默认为 1.0 ；有效值：0.1 - 10.0）                                                         |
|      | PRIORITY_QUEUES_LENGTH = 1000000             | 优先队列的长度（默认值为 1000000）                                                                                                   |
|      | CS_MAINTENANCE_MODE_TIMEOUT = 0              | 限制 CSS 服务可以处于维护模式的最大秒数（默认值为 0，无限制）                                                                        |
|      | CS_TEMP_MAINTENANCE_MODE_TIMEOUT = 1800      | CSS 服务器可以处于“临时”维护模式的最大秒数（只要正常停止服务器就会切换到此模式，重新连接后服务器会自动切换回正常模式；默认值：1800） |
|      | CS_DAYS_TO_REMOVE_UNUSED = 7                 | 限制 MSS 中保留多少天未使用（断开连接）的 CSS 服务器（有效值：0 - 365；0 表示无限期；默认值为 7）                                    |
|      | SESSION_SUSTAIN_TIME = 86400                 | 保留离线的客户端会话的时间（以秒为单位；默认值为 86400 = 1 天）                                                                      |
|      | QUOTA_DEFAULT_GRACE_PERIOD = 604800          | 软配额的默认宽限期（以秒为单位）（默认为 604800 - 7 天）                                                                             |
|      | ATIME_MODE = 0                               | atime 修改方式（默认为 0 - 访问时始终修改 atime）                                                                                    |
|      | RESERVE_SPACE = 0                            |                                                                                                                                      |
|      | MAX_ALLOWED_HARD_LINKS = 32767               | 限定文件系统的硬链接数量                                                                                                             |

## 2. CSS 组件

### 2.1 基本信息

| 类目         | 信息                            | 说明 |
| ------------ | ------------------------------- | ---- |
| 核心进程     | ufschunkserver                  |      |
| 进程路径     | /usr/sbin/ufschunkserver        |      |
| 配置文件路径 | /etc/ufs/ufschunkserver.cfg     |      |
| 日志文件路径 | /var/log/ufs/ufschunkserver.log |      |
| 依赖项       | 集群 ufs-metaserver 服务正常    |      |
|              |                                 |      |

### 2.2 操作方式

- 通过 GUI 管理平台

请以超级管理员账户的身份的登录 GUI 管理平台进行操作。

- 通过 CLI 工具

执行 CLI 工具需要以 root 账户身份登录节点服务器。

### 2.3 操作类型

**启动服务：**

```shell
systemctl start ufs-chunkserver
ufschunkserver start
```

**停止服务：**

```shell
systemctl stop ufs-chunkserver
ufschunkserver stop
```

**重启服务：**

```shell
systemctl restart ufs-chunkserver
ufschunkserver restart
```

**重新加载服务配置：**

```shell
systemctl reload ufs-chunkserver
ufschunkserver reload
```

**查看服务的运行状态：**

```shell
systemctl status ufs-chunkserver
ufschunkserver test
```

**启用/禁用开机启动：**

```shell
systemctl enable  ufs-chunkserver
systemctl disable ufs-chunkserver
```

**查看软件版本信息：**

```shell
ufschunkserver -v
```

**查看帮助信息：**

```shell
ufschunkserver -h
```

**支持的命令行参数：**

| 参数                                                    |
| ------------------------------------------------------- |
| -v : print version number and exit                      |
| -f : run in foreground                                  |
| -u : log undefined config variables                     |
| -n : do not attempt to increase limit of core dump size |
| -t locktimeout : how long wait for lockfile             |
| -c cfgfile : use given config file                      |

### 2.4 参数配置

配置说明：`/etc/ufs/ufschunkserver.cfg`

| 功能 | 配置项                                      | 说明                                                                                                                             |
| ---- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
|      | WORKING_USER = root                         | 设置服务进程在运行时的有效用户身份（默认为 root）                                                                                |
|      | WORKING_GROUP = root                        | 设置服务进程在运行时的有效组身份（默认为 root）                                                                                  |
|      | SYSLOG_IDENT = ufschunkserver               | 配置服务进程在 syslog 中的进程标示字段（默认为 ufsmetaserver）                                                                   |
|      | LOCK_MEMORY = 0                             | 是否锁定内存以避免使用 swap（默认为 0，即否）                                                                                    |
|      | LIMIT_GLIBC_MALLOC_ARENAS = 4               | 将 malloc arenas 限制为给定值 - 防止服务器使用大量虚拟内存（默认为 4）                                                           |
|      | DISABLE_OOM_KILLER = 1                      | 禁用 OOM Killer（默认为 1）                                                                                                      |
|      | NICE_LEVEL = -19                            | 运行守护进程的 nice 级别（默认为 -19）                                                                                           |
|      | FILE_UMASK = 027                            | 为组和其他人设置默认 umask（用户始终为 0，默认为 027）                                                                           |
|      | DATA_PATH = /var/lib/ufs                    | 设置服务进程的工作目录（默认为/var/lib/ufs）                                                                                     |
|      | HDD_CONF_FILENAME = /etc/ufs/ufshdd.cfg     | 设置磁盘信息的配置路径（默认为/etc/ufs/ufshdd.cfg）                                                                              |
|      | HDD_TEST_SPEED = 1.0                        | 数据块安全检查 IO 测试的执行周期（默认为 1.0，单位为秒）                                                                         |
|      | HDD_MIN_TEST_INTERVAL = 86400               | 当上次 I/O（包括测试）的执行时间少于 HDD_MIN_TEST_INTERVAL 秒前时，不进行测试块完整性                                            |
|      | HDD_FADVISE_MIN_TIME = 86400                | 数据块缓存刷新的最小间隔周期（默认为 86400，单位为秒）                                                                           |
|      | HDD_LEAVE_SPACE_DEFAULT = 256MiB            | 设置每块磁盘的预留空间（默认为 256 MiB）                                                                                         |
|      | HDD_REBALANCE_UTILIZATION = 20              | 允许 CSS 节点在磁盘容量均衡上花费的总工作时间的百分比                                                                            |
|      | HDD_ERROR_TOLERANCE_COUNT = 2               | 在单个硬盘驱动器上在给定的秒数 (PERIOD) 内可以容忍多少个 i/o 错误 (COUNT)； 如果错误数量超过此设置，则有问题的硬盘将被标记为损坏 |
|      | HDD_ERROR_TOLERANCE_PERIOD = 600            | 在单个硬盘驱动器上在给定的秒数 (PERIOD) 内可以容忍多少个 i/o 错误 (COUNT)； 如果错误数量超过此设置，则有问题的硬盘将被标记为损坏 |
|      | HDD_FSYNC_BEFORE_CLOSE = 0                  | 启用/禁用数据块操作完成后执行 fsync                                                                                              |
|      | HDD_SPARSIFY_ON_WRITE = 1                   | 启用/禁用数据块写入空洞内容                                                                                                      |
|      | HDD_RR_CHUNK_COUNT = 10000                  | 配置单个磁盘目录中一次可写入的最大数据块文件的上限（默认值为 10000）                                                             |
|      | HDD_KEEP_DUPLICATES_HOURS = 168             | 设置在删除之前应该保留多少小时的重复块（默认为 168，单位为小时）                                                                 |
|      | ALLOW_STARTING_WITH_INVALID_DISKS = 0       | 启用/禁用是否允许存在无效磁盘的情况下 CSS 能够正常启动                                                                           |
|      | WORKERS_MAX = 250<br/>WORKERS_MAX_IDLE = 40 | 工作线程数量的最大值<br />工作线程数量的空闲值                                                                                   |
|      | LABELS =                                    | CSS 节点标签                                                                                                                     |
|      | MASTER_TIMEOUT = 10                         | 配置与 MSS 服务通信的超时时间                                                                                                    |
|      | MASTER_RECONNECTION_DELAY = 5               | 重连 MSS 服务的延迟时间                                                                                                          |
|      | CHUNKS_PER_REGISTER_PACKET = 10000          | CSS 节点向 MSS 注册过程中传递的单个数据包中允许的数据块上限（默认为 10000）                                                      |
|      |                                             |                                                                                                                                  |
|      |                                             |                                                                                                                                  |

## 3. CLIENT 组件

### 3.1 基本信息

| 类目         | 信息                      | 说明 |
| ------------ | ------------------------- | ---- |
| 核心进程     | ufsmount                  |      |
| 进程路径     | /usr/bin/ufsmount         |      |
| 配置文件路径 | /etc/ufs/ufsmount.cfg     |      |
| 日志文件路径 | /var/log/ufs/ufsmount.log |      |
| 依赖项       | UFS 集群状态正常          |      |
|              |                           |      |

### 3.2 操作方式

执行 ufsmount 工具需要以 root 账户身份登录应用服务器。

### 3.3 操作类型

创建本地挂载目录：

```shell
mkdir /mnt/ufs
```

挂载 UFS 根文件系统到本地的/mnt/ufs 目录：

```shell
ufsmount /mnt/ufs
```

使用-H 参数挂载指定集群的 UFS 文件系统：

```shell
ufsmount -H 192.168.2.71 /mnt/ufs
```

使用 ufssubfolder 参数指定挂载的子目录：

```shell
ufsmount -o ufssubfolder=/sub /mnt/ufs
```

使用 ufsbind 指定客户端使用的 IP 地址：

```shell
ufsmount -o ufsbind=172.16.130.157 /mnt/ufs
```

挂载回收站：

```shell
ufsmount -o ufsmeta /mnt/meta
```

延迟挂载：

```shell
ufsmount -o ufsdelayedinit /mnt/ufs
```

前台运行客户端程序：

```shell
ufsmount -f /mnt/ufs
```

启用 DEBUG 输出模式：

```shell
ufsmount -f -o ufsdebug /mnt/ufs
```

查看帮助信息：

```shell
ufsmount -h
```

### 3.4 参数配置

客户端的挂载参数可以在命令行中指定，也可以在`/etc/ufs/ufsmount.cfg`中进行设置。

#### 3.4.1 缓存配置

        -o ufscachemode=CMODE       设置缓存模式(default: AUTO)
        -o ufsattrcacheto=SEC       设置属性缓存超时 (default: 1.0)
        -o ufsxattrcacheto=SEC      设置扩展属性 (xattr) 缓存超时 (default: 30.0)
        -o ufsentrycacheto=SEC      设置文件entry缓存超时 (default: 0.0)
        -o ufsdirentrycacheto=SEC   设置目录entry缓存超时 (default: 1.0)
        -o ufsnegentrycacheto=SEC   设置neg entry缓存超时  (default: 0.0)
        -o ufsgroupscacheto=SEC     设置用户组缓存超时 (default: 300.0)

#### 3.4.2 IO 调优

        -o ufsfsyncmintime=SEC      force fsync before last file close when file was opened/created at least SEC seconds earlier (default: 0.0 - always do fsync before close)
        -o ufswritecachesize=N      设置write缓冲区大小，单位:MiB (default: 256)
        -o ufsreadaheadsize=N       设置read缓冲区大小，单位:MiB  (default: 256)
        -o ufsreadaheadleng=N       设置read预读取的文件大小，单位：B (default: 1048576)
        -o ufsreadaheadtrigger=N    设置按顺序读取开启预读的字节数 (default: 10 * ufsreadaheadleng)
        -o ufserroronlostchunk      启用数据块丢失时直接返回io error
        -o ufserroronnospace        启用空间不足时直接返回io error
        -o ufsioretries=N           设置I/O错误返回前的重试次数(default: 30)
        -o ufstimeout=N             设置I/O错误返回前的最大超时秒数(default: 0 - which means no timeout)
        -o ufslogretry=N            定义超过多少次I/O重试操作后客户端开始记录日志 (default: 5)

#### 3.4.3 系统调优

        -o ufsrlimitnofile=N        设置客户端进程允许使用的fd句柄上限(root身份运行)  (default: 100000)
        -o ufsnice=N                运行守护进程的 nice 级别 (default: -19)
        -o ufsmemlock               允许锁定内存以避免使用swap
        -o ufslimitarenas=N         将malloc arenas限制为给定值 - 防止服务器使用大量虚拟内存 (default: 4)
        -o ufsallowoomkiller        允许OOM Killer

#### 3.4.4 通用配置

```
    -o nonempty                 允许UFS挂载非空目录
    -o ufscfgfile=CFGFILE       设置客户端配置文件以便从文件中加载配置参数(default: /etc/ufs/ufsmount.cfg)
    -o ufsdebug                 输出调试信息
    -o ufsmeta                  挂载meta文件系统(包含回收站)
    -o ufsflattrash             设置回收站挂载目录的显示格式为flat模式
    -o ufsdelayedinit           允许客户端异步连接UFS集群(特别适用于/etc/fstab开机挂载场景)
    -o ufsioretries=N           配置发生IO异常时的重试的次数(default: 30)
    -o ufstimeout=N             配置发生IO异常时的最大超时时间 (default: 0 - 表示不限制超时)
    -o ufsmaster=HOST           指定UFS集群IP(default: ufsmetaserver)
    -o ufsport=PORT             指定UFS集群网络端口 (default: 9421)
    -o ufsbind=IP               指定客户端bind的网络地址
    -o ufssubfolder=PATH        指定挂载的集群目录 (default: /)
    -o ufspassword=PASSWORD     配置客户端访问密码
    -o ufspreflabels=LABELEXPR
    -o ufsnoxattrs              关闭xattr功能
    -o ufsnoposixlocks          关闭posix locks (lockf + ioctl)功能
    -o ufsnobsdlocks            关闭BSD locks (flock)功能

```

### 3.5 应用场景

#### 3.5.1 自动挂载

通过配置`/etc/fstab`可实现 Unix/Linux 平台下客户端自动挂载。

在`/etc/fstab`中增加以下内容：

```
#
# /etc/fstab
# Created by anaconda on Sun Apr  8 04:45:34 2018
#

ufsmount    /mnt/ufs   fuse ufssubfolder=/,ufsdelayedinit=1     0 0

```

#### 3.5.2 查询运行参数

```
cat /mnt/ufs/.params
```

**输出示例如下：**

```
ufsmaster: ufsmetaserver
ufsport: 9421
ufsbind: (not defined)
ufsproxy: 127.0.0.1
ufssubfolder: /
ufspassword: (not defined)
ufspassfile: (not defined)
ufsmd5pass: (not defined)
ufspreflabels: (not defined)
ufsrlimitnofile: 100000
ufsnice: -19
ufssuid: (not defined)
ufsdev: (not defined)
ufsmemlock: (not defined)
ufslimitarenas: 4
ufsallowoomkiller: (not defined)
nonempty: (not defined)
ufswritecachesize: 256
ufsreadaheadsize: 256
ufsreadaheadleng: 1048576
ufsreadaheadtrigger: 10485760
ufserroronlostchunk: (not defined)
ufserroronnospace: (not defined)
ufsioretries: 3
ufstimeout: 1
ufslogretry: 5
ufsdebug: (not defined)
ufsmeta: (not defined)
ufsflattrash: (not defined)
ufsdelayedinit: (defined)
ufsdonotrememberpassword: (not defined)
ufscachefiles: (not defined)
ufsnoxattrs: (not defined)
ufsnoposixlocks: (not defined)
ufsnobsdlocks: (not defined)
ufscachemode: (not defined)
ufsmkdircopysgid: 1
ufssugidclearmode: (not defined)
ufsattrcacheto: 1.000
ufsxattrcacheto: 30.000
ufsentrycacheto: 0.000
ufsdirentrycacheto: 1.000
ufsnegentrycacheto: 0.000
ufsgroupscacheto: 300.000
ufsfsyncmintime: 0.000
ufsfsyncbeforeclose: (not defined)
working_keep_cache_mode: AUTO
working_sugid_clear_mode: EXT
no_std_mount_options: (not defined)
master_sesflags: 24
master_umaskval: 0000
master_maproot: 0:0
master_mapall: 0:0
master_goallimit: 1:9
master_trashlimit: 0:4294967295
master_disables: 0x0
ufs_master_version: 4.0.10
ufs_mount_version: 4.0.10-1
ufs_mount_build: 20210712
compiled_with_fuse: 3.2
fuse_library_version: 3.2
kernel_fuse_protocol: 7.22
kernel_capability_mask: 0xFFDB
kernel_defaults_mask: 0xFC0B
kernel_working_mask: 0xEC5B
```

#### 3.5.3 查看操作日志

以`/mnt/ufs`为客户端挂载点为示例。

```
cat /mnt/ufs/.oplog
```

**输出示例如下：**

```
08.18 17:48:30.986145: uid:0 gid:0 pid:27219 cmd:readdirplus (165735,4096,1414) [handle:00000007]: OK (3984)
08.18 17:48:30.986247: uid:0 gid:0 pid:27219 cmd:readdir (165735,4096,2493) [handle:00000007]: OK (880)
08.18 17:48:30.986307: uid:0 gid:0 pid:27219 cmd:readdir (165735,4096,2493) [handle:00000007]: OK (no data)
08.18 17:48:30.986682: uid:0 gid:0 pid:0 cmd:releasedir (165735) [handle:00000000]: OK
08.18 17:48:30.986687: uid:0 gid:0 pid:0 cmd:releasedir (165731) [handle:00000000]: OK
08.18 17:48:30.986733: uid:0 gid:0 pid:27219 cmd:getattr (136392) [no handle] (using open dir cache): OK (0.0,[drwxr-xr-x:0040755,3,0,0,1628796967,1628233002,1628233002,2000181])
08.18 17:48:30.987260: uid:0 gid:0 pid:27219 cmd:opendir (136392): OK [handle:00000002]
08.18 17:48:30.987344: uid:0 gid:0 pid:27219 cmd:getattr (136392) [no handle] (using open dir cache): OK (0.0,[drwxr-xr-x:0040755,3,0,0,1628796967,1628233002,1628233002,2000181])
08.18 17:48:30.987388: uid:0 gid:0 pid:27219 cmd:getattr (136392) [no handle] (using open dir cache): OK (0.0,[drwxr-xr-x:0040755,3,0,0,1628796967,1628233002,1628233002,2000181])
08.18 17:48:30.987940: uid:0 gid:0 pid:27219 cmd:readdirplus (136392,4096,137) [handle:00000002]: OK (488)
08.18 17:48:30.988008: uid:0 gid:0 pid:27219 cmd:readdir (136392,4096,137) [handle:00000002]: OK (no data)
...
```
