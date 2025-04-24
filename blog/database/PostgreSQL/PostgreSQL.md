---
title: PostgreSQL基础
order: 1
group:
  title: PostgreSQL
  order: 12
---

# PostgreSQL

[官网](https://www.postgresql.org/) | [文档](https://www.postgresql.org/docs/current/index.html)

## 1. PostgreSQL 数据库

**86** 年诞生的，**开源**、**对象关系型** 数据库，采用 **客户端/服务器** 模型

- `postgres`： 服务器进程，管理数据库
- `Navicat`：等连接服务器的，客户端工具

### 1. 安装

[下载](https://www.postgresql.org/download/)

::: tabs



@tab CentOS

`yum` 软件包安装

```shell
yum -y install postgresql-server
```

- 初始化数据库

  ```shell
  postgresql-setup initdb
  ## Initializing database ... OK
  ```

- 配置 `postgresql` 远程连接

  ```shell
  vim /var/lib/pgsql/data/postgresql.conf

  # 第59行取消注释，更改为：（vim 在VI的命令模式下显示所有行数 :set nu）
  listen_addresses = '*'

  # 第396行，添加
  log_line_prefix = '%t %u %d '
  ```

- 启动、开机启动

  ```shell
  systemctl start postgresql
  systemctl enable postgresql
  ```

- 防火墙设置

  ```shell
  firewall-cmd --add-service=postgresql --permanent
  firewall-cmd --reload
  ```

- 开启 **CLI**

  ```shell
  sudo -i -u postgres
  ```

@tab Ubuntu

```shell
sudo apt-get update
sudo apt-get -y install postgresql
```

@tab Windows 

- 下载 `.exe` 软件安装

- 安装时会提示设置 **superuser**、端口号等

- 安装后，添加环境变量

  ```shell
  # 该目录下工具等同于CLI
  'C:\Program Files\PostgreSQL\14\bin'
  ```

:::

### 2. 操作

[菜鸟教程](https://www.runoob.com/postgresql/postgresql-create-database.html) 
