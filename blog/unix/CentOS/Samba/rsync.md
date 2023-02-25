---
title: rsync同步
date: 2022-03-17
category:
  - 运维
  - 工具
tag:
  - 工具
star: true
---

[rsync 官方网站](https://www.samba.org/ftp/rsync/rsync.html) 

<!-- more -->

## 1. 说明

### 1.1 用处

实现 **本地主机** 和 **远程主机** 上的 **文件同步（推拉）** 、**本地不同路径的文件同步**，涉及了 源文件 和 目标文件 的概念，还涉及了以哪边文件为同步基准

- **实现增量备份的工具：** 配合任务计划，**rsync** 能实现定时或间隔同步，配合 **inotify** 或 **sersync**，可以实现触发式的 **实时同步** 

- **实现同步 scp、cp、rm、ls -l 等功能（*不支持 远程 到 远程 的拷贝，但scp支持*）：** 最终/原始目的是 **实现两端主机的文件** 同步

  > 实现 **scp/cp/rm** 等功能仅仅只是同步的辅助手段，实现基于复杂算法，平时使用其实现简单的备份、同步等功能足矣，可使用 `"-vvvv"` 分析执行过程

### 1.2 组成模式

在同步过程中必然会涉及到源和目标两文件之间 **版本控制问题：** 

- 是否要删除源主机上没有但目标上多出来的文件？
- 标文件比源文件更新（*newer than source*）时是否仍要保持同步？
- 遇到软链接时是 拷贝软链接本身 还是拷 贝软链接所指向的文件？
- 目标文件已存在时是否要先对其做个备份？

**rsync同步过程中由两部分模式组成：以及文件同步时的同步模式。**

1. 决定哪些文件需要同步的 **检查模式（*特殊需求，影响性能*）** 

   按照 **指定规则** 来检查哪些文件需要被同步，例如哪些文件是 **明确被排除不传输的** ，**默认情况下，rsync使用"quick check"算法快速检查源文件和目标文件的大小、mtime（*修改时间*）是否一致，如果不一致则需要传输** 

   > 也可以通过指定选项改变 **quick check** 的检查模式，如 `"--size-only"` 选项表示仅检查文件大小不同的文件作为待传输文件，检查模式的自定义性是非常有弹性

2. 文件同步时的 **同步模式（*常见*）** 

   在文件确定要被同步后，在同步过程 **发生之前要做哪些额外工作**，如是否要先删除 源主机上没有 但 目标主机上有 的文件、是否要先备份 已存在的目标文件，是否要追踪链接文件等额外操作

### 1.3 工作方式

```shell
# 本地同步（管道sh通信）
Local:  rsync [OPTION...] SRC... [DEST]

# 本地使用shell 和 远程主机通信（管道sh通信）
Access via remote shell:
  Pull: rsync [OPTION...] [USER@]HOST:SRC... [DEST]
  Push: rsync [OPTION...] SRC... [USER@]HOST:DEST

# 本地主机通过网络套接字 连接 远程主机上的rsync daemon（远程需 rsync 起端口）
Access via rsync daemon:
  Pull: rsync [OPTION...] [USER@]HOST::SRC... [DEST]
        rsync [OPTION...] rsync://[USER@]HOST[:PORT]/SRC... [DEST]
  Push: rsync [OPTION...] SRC... [USER@]HOST::DEST
        rsync [OPTION...] SRC... rsync://[USER@]HOST[:PORT]/DEST
```

第一个路径参数 **一定是源文件路径**，即作为同步基准的一方，可 **指定多个** 

最后一个路径参数 **是目标文件路径**，也就是被同步的，可本地、远程

若只有一个路径，等效于 `ls -l` 

## 2. 基础使用

### 2.1 简单示例

```shell
# 在本地同步
$ rsync -r /etc/fstab /tmp                

# 将本地/etc 目录 拷远程 /tmp 下，保远程 /tmp 和本地 /etc 同步
$ rsync -r /etc 172.16.10.5:/tmp       

# 将远程 /etc 目录 拷本地 /tmp 下，保本地 /tmp 和远程 /etc 同步
$ rsync -r 172.16.10.5:/etc /tmp       

# 列出 本地 /etc/ 目录下的文件列表
$ rsync /etc/                          

# 列出 远程主机上 /tmp/ 目录下的文件列表
$ rsync 172.16.10.5:/tmp/              
```

::: info 关于尾斜线

```sh
$ rsync -a /etc/ /tmp
$ rsync -a /etc /tmp
```

不带尾斜线是包含整个目录，即 **etc** 本身

带尾斜线是只动 **/etc** 目录下的文件

:::

## 2.2 选项说明

[翻译手册](https://www.cnblogs.com/f-ck-need-u/p/7221713.html) 

```shell
-v：显示rsync过程中详细信息。可以使用"-vvvv"获取更详细信息。
-P：显示文件传输的进度信息。(实际上"-P"="--partial --progress"，其中的"--progress"才是显示进度信息的)。
-n --dry-run  ：仅测试传输，而不实际传输。常和"-vvvv"配合使用来查看rsync是如何工作的。
-a --archive  ：归档模式，表示递归传输并保持文件属性。等同于"-rtopgDl"。
-r --recursive：递归到目录中去。
-t --times：保持mtime属性。
-o --owner：保持owner属性(属主)。
-g --group：保持group属性(属组)。
-p --perms：保持perms属性(权限，不包括特殊权限)。
-D        ：是"--device --specials"选项的组合，即也拷贝设备文件和特殊文件。
-l --links：如果文件是软链接文件，则拷贝软链接本身而非软链接所指向的对象。
-z        ：传输时进行压缩提高效率。
-R --relative：使用相对路径。意味着将命令行中指定的全路径而非路径最尾部的文件名发送给服务端，包括它们的属性。用法见下文示例。
--size-only ：默认算法是检查文件大小和mtime不同的文件，使用此选项将只检查文件大小。
-u --update ：仅在源mtime比目标已存在文件的mtime新时才拷贝。注意，该选项是接收端判断的，不会影响删除行为。
-d --dirs   ：以不递归的方式拷贝目录本身。默认递归时，如果源为"dir1/file1"，则不会拷贝dir1目录，使用该选项将拷贝dir1但不拷贝file1。
--max-size  ：限制rsync传输的最大文件大小。可以使用单位后缀，还可以是一个小数值(例如："--max-size=1.5m")
--min-size  ：限制rsync传输的最小文件大小。这可以用于禁止传输小文件或那些垃圾文件。
--exclude   ：指定排除规则来排除不需要传输的文件。
--delete    ：以SRC为主，对DEST进行同步。多则删之，少则补之。注意"--delete"是在接收端执行的，所以它是在
            ：exclude/include规则生效之后才执行的。
-b --backup ：对目标上已存在的文件做一个备份，备份的文件名后默认使用"~"做后缀。
--backup-dir：指定备份文件的保存路径。不指定时默认和待备份文件保存在同一目录下。
-e          ：指定所要使用的远程shell程序，默认为ssh。
--port      ：连接daemon时使用的端口号，默认为873端口。
--password-file：daemon模式时的密码文件，可以从中读取密码实现非交互式。注意，这不是远程shell认证的密码，而是rsync模块认证的密码。
-W --whole-file：rsync将不再使用增量传输，而是全量传输。在网络带宽高于磁盘带宽时，该选项比增量传输更高效。
--existing  ：要求只更新目标端已存在的文件，目标端还不存在的文件不传输。注意，使用相对路径时如果上层目录不存在也不会传输。
--ignore-existing：要求只更新目标端不存在的文件。和"--existing"结合使用有特殊功能，见下文示例。
--remove-source-files：要求删除源端已经成功传输的文件。
```

最常用的选项组合是 `"avz"`，即压缩和显示部分信息，并以归档模式传输

::: warning

强烈建议任何时候都加上`"-t"`，否则目标文件 **mtime** 会设置为系统时间，导致下次更新检查出 **mtime ** 不同从而导致增量传输无效

:::

```shell
BASE_ISO_PATH="/media/cdrom"
ISO_BUILD_PATH="/tmp/iso-build"

# 以 /media/cdrom 为源，增量（更新）同步到 /tmp/iso-build 下，用归档模式传输
$ rsync -au --exclude=repodata --exclude=Packages "${BASE_ISO_PATH}/" "${ISO_BUILD_PATH}"

# 同步 并 清空无效的 release 文件
$ rsync -au --delete "release" "${ISO_BUILD_PATH}" 

# 将 /var/log/anaconda 下的文件为源，备份到 /tmp 目录下
$ rsync -R -r --backup /var/log/anaconda /tmp
`若不使用 "--suffix" 指定后缀，备份文件默认使用 "~" 做后缀

# 可以使用 "--backup-dir" 指定备份文件保存路径，但要求保存路径必须存在
$ mkdir /tmp/log_back
$ rsync -R -r --backup --backup-dir=/tmp/log_back /var/log/anaconda /tmp
$ tree /tmp/log_back/
    /tmp/log_back/
    └── log
        └── anaconda
            ├── anaconda.log
            ├── ifcfg.log
            ├── journal.log
            ├── ks-script-1uLekR.log
            ├── ks-script-iGpl4q.log
            ├── packaging.log
            ├── program.log
            ├── storage.log
            └── syslog
```

