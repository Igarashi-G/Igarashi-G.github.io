---
title: Shell
date: 2020-11-13
category:
  - Linux
  - shell
tag:
  - Linux
  - shell
---

**Linux Shell** 脚本指南

<!-- more -->

## bash

**bash-shell（*Bourne Again Shell* ）：** 从 **Unix** 系统中的 **sh** 发展而来， **用户 和 Linux 内核交互的工具**，通过 **bash** 操作内核，可以完成系统的使用和管理，是 **shell** 的一种，每种 **shell** 的功能类似，但语法稍有不同

```shell
# 已经被 /bin/bash 代替，如下
/bin/sh

# 默认的shell
/bin/bash
```

配置文件 `~/.bashrc` 内容如下

```shell
#!/usr/bin/env bash

alias cp='cp -i'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l.='ls -d .* --color=auto'
alias ll='ls -l --color=auto'
alias ls='ls --color=auto'
alias mv='mv -i'
alias rm='rm -i'
alias which='alias | /usr/bin/which --tty-only --read-alias --show-dot --show-tilde'
```

