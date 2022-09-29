---
title: rdesktop
order: 1

group:
  title: 远程工具
  order: 10
---

# rdesktop

### 1. 简介

[rdesktop](https://github.com/rdesktop) 是微软 **RDP** 协议的开源客户端

#### 安装

```shell
apt-get install rdesktop
```

### 2. 使用命令

```shell
-d: 域
-s: shell命令 (登录运行命令之后就退出)
-c: 工作目录（应该是-s的子命令），-s shell命令的一个参数
-p: password (- to prompt)
-n: 客户端（本地）主机名，默认为本地主机名
-k: 服务器上的键盘布局选择 (en-us, de, sv, etc.)
-g: 桌面分辨率（宽x高）
-i: enables smartcard authentication, password is used as pin
-f: 全屏模式（Ctrl + Alt + Enter 退出全屏模式）
-b: 强制位图刷新（没发现什么用）
-L: 本地编码
-A: 无缝虚拟应用程序到本地
-B: use BackingStore of X-server (if available)
-e: disable encryption (French TS) 禁用加密
-E: disable encryption from client to server 从客户端到服务器，禁用加密。
-m: 不允许拖动（不传递鼠标的拖动事件）
-C: use private colour map
-D: 不显示窗口标题栏（只有远程桌面窗口，没有关闭和最小化按钮）
-K: 窗口切换快捷热键（Alt+Tab）不传递到远程桌面
-S: 标题按钮的大小，个人觉得这个参数很无用，或者我还没弄明白到底什么意思。
-T: 窗口标题
-t: disable use of remote ctrl
-N: 数字键盘同步
-X: 给定另一个窗口的标识，嵌入到另一个窗口
-a: connection colour depth 选择颜色深度
-z: 启用rdp压缩
-x: RDP5 experience (m[odem 28.8], b[roadband], l[an] or hex nr.)
-P: 持久位图缓存
-r: 设备重定向（参数可以重复使用）
```

- 示例：

  ```shell
  # 尽可能快速输出的将剪贴板和声音映射过去
  rdesktop -P -r clipboard:PROMARYCLIPBOARD -r sound:local 192.168.3.75
  ```

### 3. 问题

- 解决声音失效的办法

  ```shell
  # 要找出哪些进程正在访问声音设备
  lsof /dev/snd/*

  # 干掉它
  fuser /dev/snd/*
  ```
