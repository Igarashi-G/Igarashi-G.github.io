---
title: CentOS安装及配置
order: 1
group:
  title: 类Unix系统
  order: 31
---

# CentOS 的配置问题

## VMware 安装 CentOS 后的操作流程

图形化配置 ip：
命令行输入： mutui

### 0.VMware 设置：

编辑 -> 虚拟网络编辑器 -> 通常是 VMnet8 NAT 模式的

1.通过管理员进行设置，应该会有默认的设置。例：

    子网ip：192.168.21.0   子网掩码：255.255.255.0

2.修改 NAT 设置：

    网关：192.168.21.2

3.安装 CenOS7 镜像经过一系列配置项后，到了安装界面，先上下选择到 Install CentOS7 选项

4.然后点击 tab 键：然后输入 空格 写入如下两个参数：

    net.ifnames=0 biosdevname=0 然后加空格 回车再安装

这两个参数目的是吧网卡名称 ens33 改为 eth0，目的是为了批量操作把名字固定下来，比较方便，通常都是 eth0

### 1.配置网卡绑定 IP

#### ip 绑定：

- 安装完 CentOS 后，默认是动态 IP，而且开机不会自动启动

- 因此要做的是绑定固定 ip，设置开机自启动网卡【注意】：192.168.21.0 是子网 ip，被占了， 192.168.21.1 应该会被 windows 占掉所以要配个
  其他的 ip 地址: - ip 地址：
  IPADDR=192.168.21.81 - 子网掩码：

              NETMASK=255.255.255.0
      - 网关地址：

              GATWAY=192.168.21.2
      - DNS服务器：（可配置多个）

              DNS1=114.114.114.114

- 需要 cd 到网卡目录：

        vi /etc/sysconfig/network-scripts/ifcfg-eth0    or ifcfg-ens33

- 修改如下选项：

  - BOOTPROTO
    BOOTPROTO=none # 将 dhcp 动态获取改为 none
  - ONBOOT
    ONBOOT=yes # 将 no 改为 yes 应该是开机跟随 boot 启动
  - UUID：
    这个直接把这一行给干掉
  - 然后加上上文的选项

- 保存文件，重启网卡
  systemctl restart network

#### 安装 net

若查看端口执行命令 netstat -ntpl 时提示，没有 netstat 命令，则需要安装工具：

    yum install net-tools

#### 关闭防火墙

1.查看防火墙状态

    firewall-cmd --state

2.若显示 running 则停止 firewall

    systemctl stop firewalld.service

3.禁止 firewall 开机启动

    systemctl disable firewalld.service
