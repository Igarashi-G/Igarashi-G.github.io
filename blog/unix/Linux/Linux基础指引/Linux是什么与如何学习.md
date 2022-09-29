---
title: Linux是什么与如何学习
order: 2
---

# Linux 是什么与如何学习

### 1. Linux 是什么

#### 1.1 Linux

**linux** 是 **Torvalds** 基于 **Minix** 系统改出来的开源操作系统，初始版本为 `0.0.2` 其只包含基本的 [内核(Kernel)](/unix_like/linux/linux基础指引/计算机概论#421-内核kernel) 和 **GNU** 计划提供的 `bash`、与 `gcc`

- 当时他提供的 **FTP** 下载路径为 **Linux** 故该操作系统被如此称呼
- 后续为了兼容 **Unix** ，将 `linux` 改良为遵循 [POSIX](https://en.wikipedia.org/wiki/POSIX) （可携式操作系统接口）规范，故兼容 `Unix` 软件

#### 1.2 Linux Distributions

`linux` 发行版众多，发行版主要是 <Badge>Linux</Badge> + <Badge type="orange">各种软件集成</Badge> 即可完成一个相当完整的操作系统了

后续诞生出各种发行版：**CentOS**、**Ubuntu**、**SuSE** 等，它们的异同如：

- 各发行版 **均使用 Linux 内核**
- 套件管理，即软件包安装方式不同（软件也略有差异）
  - 一种是 **RPM** 的方式安装
  - 一种是使用 **Debain** 的 **dpkg** 方式安装
