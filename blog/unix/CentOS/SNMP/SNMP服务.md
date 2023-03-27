---
title: Net-SNMP
date: 2022-10-24
category:
  - 运维
  - SNMP
tag:
  - SNMP
---

**SNMP** 协议简要说明



<!--more-->



### 1. 什么是 SNMP 协议

**SNMP （*简单网络管理协议*）：** 用于网络管理的协议，常用于 **监控工具**，可以 **持续性实时监控**，好处是带宽消耗非常少，因此使用此套件进行监控不会降低网络速度，它和 **DNS** 一样也是基于 **UDP 协议** 实现 （*速度快，消息易丢失* ）

**基本思想：** 为不同种类的设备、不同厂家生产的设备、不同型号的设备，定义为一个统一的接口和协议，
使得管理员可以使用统一的外观，面对这些需要管理的网络设备进行管理

### 2. SNMP 支持的网管操作

- **Get：** 读取网络设备的状态信息

- **Set：** 远程配置设备参数

- **Trap：** 管理站及时获取设备的重要信息

### 3. SNMP 的实现结构及定义

**SNMP** 为管理员提供了一个网管平台 **（*NMS*）**，又称为管理站，负责网管命令的发出、数据存储、及数据分析，
被监管的设备上运行一个 **SNMP** 代理 **（*Agent*）** ，代理实现设备与管理站的 **SNMP** 通信

- SNMP：Simple Network Management Protocol(简单网络管理协议)，是一个标准的用于管理基于 IP 网络上设备的协议。

- MIB：Management Information Base(管理信息库)，定义代理进程中所有可被查询和修改的参数。

- SMI：Structure of Management Information(管理信息结构)，SMI 定义了 SNMP 中使用到的 ASN.1 类型、语法，并定义了 SNMP 中使用到的类型、宏、符号等。SMI 用于后续协议的描述和 MIB 的定义。每个版本的 SNMP 都可能定义自己的 SMI。

- ASN.1：Abstract Syntax Notation One(抽象语法定义)。用于定义语法的正式语言，在 SNMP 中定义 SNMP 的协议数据单元 PDU 和管理对象 MIB 的格式。SNMP 只使用了 ASN.1 中的一部分，而且使用 ASN.1 的语言特性定义了一些自定义类型和类型宏 ，这些组成了 SMI。

- PDU： Protocol Data Unit(协议数据单元)，它是网络中传送的数据包。每一种 SNMP 操作，物理上都对应一个 PDU。

- NMS： Network Management System，网络管理系统，又名网络管理站，简称“管理站”。它是 SNMP 的总控机，提供统一的用户界面访问支持 SNMP 的设备，一般提供 UI 界面，并有统计、分析等功能，是网管系统的总控制台。NMS 是网络管理操作的发起者。

- Agent： 是 SNMP 的访问代理，简称“代理”，为设备提供 SNMP 能力，负责设备与 NMS 的通信。

- Proxy： 代理服务器，对实现不同协议的设备进行协议转换，使非 IP 协议的设备也能被管理。

- Trap： 是由设备主动发出的报警数据，用于提示重要的状态的改变。

- BER： Basic Encoding Rule，基本编码规格。描述如何将 ASN.1 类型的值编码为字符串的方法。它是 ASN.1 标准的一部分。BER 编码将数据分成 TLV 三部分，T 为 Tag 的缩写，是类型标识；L 为 Length 的缩写，标识类型的长度；V 为 Value 的缩写，标识数据内容。按照 TLV 的顺序对数据进行编码，生成字节流。SNMP 使用 BER 将 SNMP 的操作请求和应答编码后进行传输，并用于接收端进行解码。

### 4. Net-SNMP 软件

- Net-snmp 提供完整的 API 用于 SNMP 应用程序开发，包括 C 和 Perl 的 API 。

- 一个功能强大且可扩展的 SNMP 代理：snmpd 开发者可以开发动态模块扩展 snmpd，net-snmp 内置扩展子代理与主代理的通信协议。

- 提供众多命令行工具检查和使用 SNMP 协议

- 一个图形化的 MIB 浏览工具

- 一个 Trap 接收进程，用于接收和显示 Trap，并将 Trap 记录到日志文件中。

安装

```shell
yum install -y net-snmp net-snmp-utils
```

查看一下安装的软件包

```shell
rpm -qa | grep net-snmp*
    net-snmp-libs-5.7.2-24.el7.x86_64
    net-snmp-5.7.2-24.el7.x86_64
    net-snmp-agent-libs-5.7.2-24.el7.x86_64
    net-snmp-utils-5.7.2-24.el7.x86_64
```

主配置文件

```shell
$ cat /etc/snmp/snmpd.conf
```

启动和测试

```shell
$ systemctl snmpd restart

# 查看一下 net-snmp 版本
$ snmpd -v 
```
