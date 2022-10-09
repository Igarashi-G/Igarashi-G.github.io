---
title: PVE虚拟机
date: 2021-04-21
category:
  - 虚拟机
tag:
  - PVE
---

**PVE** 虚拟机搭建的一些记录

<!-- more -->

# Proxmox

[Proxmox](https://www.proxmox.com/en) 虚拟环境（简称**PVE**）是用于操作来宾操作系统的基于 **Debian Linux** 和 **KVM** 的虚拟化平台，免费提供，也可购买商业支持。

##### **优势**

- 几乎可以在 **所有 x86 硬件** 上运行
- 每台主机 **不到 5 分钟即可** 完成安装
- **高可用**
- **开源**

##### **缺陷**

- 使用 [corosync](http://corosync.github.io/corosync/) 来管理集群。**最多可以管理或控制 32 个节点**。`Proxmox` 集群的虚拟化和存储主机的最大数量为**32 台物理服务器**。

### 1. 安装

[安装 wiki](https://pve.proxmox.com/wiki/Installation) 

### 2. 显卡驱动踩大坑

##### **下载驱动**

- 先搜索显卡型号

  ```shell
  $ lspci | grep VGA
  ```

- 去 [NVDIA 官网](https://www.nvidia.com/Download/index.aspx?lang=zh-cn) 下载对应的显卡驱动 `deb` 包

##### **关闭图形化界面**

- 若有图形化界面，比如 `X server` 执行如下命令查看

  ```shell
  $ ps aux | grep X	# 若有服务则 kill 掉
  ```

- 切换回多用户命令行登录：

  ```shell
  $ init 3
  
  # 若显示 Q_Q_Q@_ 之类的乱码，或光标无响应，需要更改如下
  $ vim /etc/systemd/logind.conf
  
  [Login]
  NAutoVTs=6 # 改为 7
  
  # 修改grub
  $ vim /etc/default/grub
  # 添加 如下一行 注释
  #GRUB_CMDLINE_LINUX_DEFAULT="quiet"
  # 将 如下一行 赋值为 "text"
  GRUB_CMDLINE_LINUX="text"
  # 取消 如下一行 注释
  GRUB_TERMINAL=console
  
  # 更新上文修改
  $ update-grub
  
  # 设置下次开机系统默认 multi-user 模式
  $ systemctl set-default multi-user.target
  
  # 再 执行 init3 或 reboot
  ```

##### **卸载旧驱动**

- 添加如下**黑名单**，禁用核显

  ```shell
  $ vim /etc/modprobe.d/blacklist.conf

  # copy如下内容
  blacklist nouveau
  blacklist lbm-nouveau
  options nouveau modeset=0
  alias nouveau off
  alias lbm-nouveau off
  ```

- 修改 `pve` 的黑名单

  ```shell
  $ vim /etc/modprobe.d/pve-blacklist.conf

  # copy如下内容
  # blacklist nvidiafb
  ```

- 执行命令更改

  ```shell
  $ update-initramfs -u
  ```

- 验证是否已禁用

  ```shell
  $ lspci|grep nouveau

  # 或是如下, 无返回信息就是禁用了

  $ lsmod|grep nouveau
  ```

- 卸载核显或旧驱动

  ```shell
  $ apt-get remove nvidia* && sudo apt autoremove
  ```

##### **下载依赖**

- 先替换 **Debian** 通用源，见 **Linux** 系统换源部分

  ```shell
  # Debian 的软件源配置文件是
  $ vim /etc/apt/sources.list
  ```

- 替换 **pve** 源，不确定版本尽量用官方源

  ```shell
  # pve 镜像默认的 pve 软件源配置文件如下：
  $ vim /etc/apt/sources.list.d/pve-enterprise.list

  # 备份后将其中内容替换为以下即可：
  $ deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian bullseye pve-no-subscription

  # 更新软件包

  $ apt-get update
  ```

- 下载一系列依赖

  ```shell
  $ apt-get install dkms build-essential pve-headers pve-headers-x.x.x-x-pve
  ```

- 如有异常，需单独下载 `linux-header`，参考如下：

  - 从网站上下**deb**包，即 [pve-header](http://download.proxmox.com/debian/pve/dists/bullseye/pve-no-subscription/binary-amd64/) 中寻找对应版本号

    ```shell
    # 查看header版本
    $ pveversion -v

    # 如下表示版本为 -5.13.19-1-pve
    pve-kernel-5.13: 7.1-4
    pve-kernel-5.13.19-1-pve: 5.13.19-2

    # 查看软件包中是否有对应版本
    $ apt-cache search pve-headers*
    ```

  - 或直接更新为官方源，先默认下载，然后再指定版本号

    ```shell
    $ apt-get install pve-headers-5.13.19-1-pve
    ```

##### 4. 安装 NVDIA 驱动

- 修改可执行权限

  ```shell
  chmod 777 NVIDIA-Linux-x86_64-390.147.run
  chown root.root NVIDIA-Linux-x86_64-390.147.run
  ```

- 运行 `.run` 程序

  ```shell
  /NVIDIA-Linux-x86_64-390.147.run
  ```

- check

  ```shell
  # nvidia YES!
  modprobe nvidia

  # 检查是否安装成功
  nvidia-smi
  ```

- 收尾

  ```shell
  # 开启图形化界面，参考 步骤1 逆着来
  
  # 恢复默认启动的图形化
  $ sudo systemctl set-default graphical.target
  ```

### 3. 指南

[Proxmox VE Administration Guide](https://pve.proxmox.com/pve-docs/pve-admin-guide.html)
