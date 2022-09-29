---
title: Screen
order: 1

group:
  title: 超好用的运维提速小工具
  order: 30
---

# Screen

<Alert type="info">简单云服务器部署工具，用于远程 `ssh` 断掉的请求，也能一直运行，不会被意外原因而杀掉</Alert>

**安装 screen 工具**

- **Ubuntu**

  ```shell
  sudo apt-get install screen
  ```

- **CentOS**

  ```shell
  yum install screen
  ```

**使用简介**

- 创建 `screen` 窗口

  ```shell
  # name 自己起名字，方便管理
  screen -S <name>
  ```

- 退出：

  ```shell
  ctrl a + d
  ```

- 恢复：

  ```shell
  screen -r
  ```

- 查看 `screen` 进程：

  ```shell
  screen -ls
  ```

- 进入进程：

  - 单个 `screen` 进程：

    ```shell
    screen -r -d
    ```

  - 多个 `screen` 进程：(通过它的 **PID** 进入)

    ```shell
    # 查看进程id号
    screen -ls

    # 进入id为 1805 的 screen 进程
    screen -r -d 1805
    ```

- 中断进程：

  - 进入后中断：

    ```shell
    # 进入要中断的screen
    screen -r 30339

    # 或contorl + c 退出 screen
    exit
    ```

  - 直接中断：

    ```shell
    screen -S <screenID> -X quit
    ```
