---
title: UFS-CLI
date: 2021-10-16
category:
  - UFS
tag:
  - UFS
  - CLI
---

本文档提供 **UFS** 存储系统中 **CLI** 工具的使用方法

<!-- more -->

## 1. ufs-cli 工具

`ufscli`工具支持以命令行方式查询集群状态

使用方式如下：

```shell
ufscli [-H master_host] [-P master_port] opration
```

opration 支持的操作类型如下：

```shell
-SIN : show full metaserver info
-SIM : show only metaservers states
-SIG : show only general master (leader) info
-SMU : show only lgeneral master (leader) memory usage
-SIC : show only chunks info (goal/copies matrices)
-SIL : show only loop info (with messages)
-SMF : show only missing chunks/files
-SCS : show connected chunk servers
-SHD : show hdd data
-SMS : show active mounts
```

查看集群状态:

```shell
ufscli -SIN
```

查看 MSS 服务列表:

```shell
ufscli -SIM
```

查看 MSS-Leader 状态:

```shell
# ufscli -SIG

+--------------------------------------------------+
|                   Master Info                    |
+-----------------------+--------------------------+
| master version        |                   4.0.11 |
| RAM used              |                  878 MiB |
| CPU used              |                    2.38% |
| CPU used (system)     |                    1.28% |
| CPU used (user)       |                    1.10% |
| total space           |                  324 TiB |
| avail space           |                  286 TiB |
| free space            |                  286 TiB |
| trash space           |                  387 GiB |
| trash files           |                    10723 |
| sustained space       |                  360 GiB |
| sustained files       |                    16002 |
| all fs objects        |                   825852 |
| directories           |                     9987 |
| files                 |                   815855 |
| chunks                |                  1153487 |
| all chunk copies      |                  2303456 |
| regular chunk copies  |                  2303456 |
| last successful store | Wed Aug 18 18:00:00 2021 |
| last save duration    |                    ~0.3s |
| last save status      |      Saved in background |
+-----------------------+--------------------------+

```

查看 MSS 内存使用情况：

```
# ufscli -SMU

+----------------------------------------------------------------------------------------------------------+
|                                        Memory Usage Detailed Info                                        |
+---------------+-------------+------------------+---------------------+-----------------------------------+
|  object name  | memory used | memory allocated | utilization percent | percent of total allocated memory |
+---------------+-------------+------------------+---------------------+-----------------------------------+
| chunk hash    |     8.8 MiB |          128 MiB |              6.88 % |                            9.84 % |
| chunks        |      53 MiB |           67 MiB |             79.10 % |                            5.13 % |
| cs lists      |      35 MiB |           38 MiB |             92.14 % |                            2.93 % |
| edge hash     |     6.1 MiB |          128 MiB |              4.76 % |                            9.84 % |
| edges         |      71 MiB |          181 MiB |             39.13 % |                           13.92 % |
| node hash     |     6.3 MiB |          128 MiB |              4.92 % |                            9.84 % |
| nodes         |      56 MiB |           76 MiB |             73.81 % |                            5.86 % |
| deleted nodes |     118 KiB |           19 MiB |              0.60 % |                            1.47 % |
| chunk tabs    |      11 MiB |          498 MiB |              2.24 % |                           38.25 % |
| symlinks      |       280 B |           29 MiB |              0.00 % |                            2.20 % |
| quota         |        96 B |          9.5 MiB |              0.00 % |                            0.73 % |
+---------------+-------------+------------------+---------------------+-----------------------------------+
| total         |     248 MiB |          1.3 GiB |             19.03 % |                                 - |
+---------------+-------------+------------------+---------------------+-----------------------------------+
```

查看数据块状态：

```shell
ufscli -SIC
```

查看文件健康检查结果**：**

```shell
ufscli -SIL
```

查看损坏文件列表：

```shell
ufscli -SMF
```

查看 CSS 服务列表：

```shell
ufscli -SCS
```

查看集群磁盘列表：

```shell
ufscli -SHD
```

查看客户端列表：

```shell
ufscli -SMS
```

## 2. ufs-tools 工具

`ufstools` 工具支持对文件系统进行高级的管理操作

支持的操作类型如下：

```shell
# ufstools <toolname> ... - work as a given tool

	scadmin				# 管理存储策略
	getsclass			# 查看存储策略
	setsclass			# 设置存储策略
	copysclass			# 复制存储策略
	listsclass			# 查询支持的存储策略列表

	gettrashtime		# 查询回收时间
	settrashtime		# 设置回收时间

	geteattr			# 查询eattr
	seteattr			# 设置eattr
	deleattr			# 删除eattr

	getquota			# 查询配额信息
	setquota			# 设置配额限制
	delquota			# 删除配额限制

	checkfile			# 查询文件对象的统计结果
	fileinfo			# 查询文件对象的数据块信息
	dirinfo				# 查询目录对象的统计结果
	filerepair			# 修复损坏的文件对象（数据填零）

	makesnapshot		# 创建快照
	filepaths			# 检索文件路径（通过inode）

	chkarchive			# 查询archive
	setarchive			# 设置archive
	clrarchive			# 清除archive
```

#### 1.2.1 回收时间

设置回收时间

```shell
$ ufstools settrashtime SECONDS name [name ...]
```

查看回收时间

```shell
# usage: 
$ufstools gettrashtime name [name ...]
```

#### 1.2.2 文件状态

查看文件状态

```shell
$ ufstools fileinfo [-qcs] name [name ...]

switches:
 -q - quick info (show only number of valid copies)
 -c - receive chunk checksums from chunkservers
 -s - calculate file signature (using checksums)
```


查看目录状态

```shell
$ ufstools dirinfo [-nhHkmg] [-idfclsr] [-p] name [name ...]

'show' switches:
 -i - show number of inodes
 -d - show number of directories
 -f - show number of files
 -c - show number of chunks
 -l - show length
 -s - show size
 -r - show realsize
'mode' switch:
 -p - precise mode

If no 'show' switches are present then show everything

Meaning of some not obvious output data:
 'length' is just sum of files lengths
 'size' is sum of chunks lengths
 'realsize' is estimated hdd usage (usually size multiplied by current goal)
```


修复损坏文件

```shell
$ ufstools filerepair name [name ...]
```

检索文件路径

```shell
$ ufstools filepaths name/inode [name/inode ...]
```

#### 1.2.3 配额管理

查看配额列表

```shell
$ ufstools listquota dirname
```

设置配额

```shell
$ ufstools setquota (-U uid|-G gid|-D) [-iI inodes] [-p grace_period] [-lL length] [-sS size] [-rR realsize] dirname [dirname ...]
 -U - set user quota
 -G - set group quota
 -D - set directory quota
 -p - set grace period in seconds for soft quota
 -i/-I - set soft/hard limit for number of filesystem objects
 -l/-L - set soft/hard limit for sum of files lengths
 -s/-S - set soft/hard limit for sum of file sizes (chunk sizes)
 -r/-R - set soft/hard limit for estimated hdd usage (usually size multiplied by goal)
```

查看配额

```shell
$ ufstools getquota (-U uid|-G gid|-D) dirname [dirname ...]
 -U - get user quota
 -G - get group quota
 -D - get directory quota
```

删除配额

```shell
$ ufstools delquota (-U uid|-G gid|-D) dirname [dirname ...]
 -U - delete user quota
 -G - delete group quota
 -D - delete directory quota
 -i/-I - delete inodes soft/hard quota
 -l/-L - delete length soft/hard quota
 -s/-S - delete size soft/hard quota
 -r/-R - delete real size soft/hard quota
 -a/-A - delete all soft/hard quotas
```

