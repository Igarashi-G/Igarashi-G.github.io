---
title: 安装GitLab
date: 2022-03-14
category:
  - 工具
tag:
  - gitlab
---

# 安装 GitLab

### 1. 配置 yum 仓库

- 新建 `/etc/yum.repos.d/gitlab-ce.repo` 内容如下

  ```shell
  [gitlab-ce]
  name=Gitlab CE Repository
  baseurl=https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el$releasever/
  gpgcheck=0
  enabled=1
  ```

- 再执行：

  ```shell
  sudo yum makecache
  sudo yum install gitlab-ce
  ```

### 2. 安装依赖包

```shell
sudo yum install -y curl policycoreutils-python openssh-server perl

# Enable OpenSSH server daemon if not enabled: sudo systemctl status sshd
sudo systemctl enable sshd
sudo systemctl start sshd

# Check if opening the firewall is needed with: sudo systemctl status firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo systemctl reload firewalld


sudo yum install postfix
sudo systemctl enable postfix
sudo systemctl start postfix
```

### 3. 安装 GitLab

```shell
sudo yum install -y gitlab-ce
```

### 4. 初始化 GitLab

```shell
sudo vim /etc/gitlab/gitlab.rb

# 修改 gitlab 配置文件，将 external_url='http://gitlab.example.com' 地址修改成服务器的IP或者域名
external_url "https://192.168.2.90"

# 修改 gitlab 配置文件，配置初始密码
gitlab_rails['initial_root_password'] = '<my_strong_password>'

# 配置监听网络：tcp
gitlab_workhorse['listen_network'] = "tcp"

# 配置地址和端口
gitlab_workhorse['listen_addr'] = "192.168.2.908888"
```

### 5. 修改网络端口

```shell
# 禁用内置NG
nginx['enable'] = false

# 指定NG的用户名
web_server['external_users'] = ['nginx']

#  添加NG地址到信任列表，我这里就是本机地址
gitlab_rails['trusted_proxies'] = ['127.0.0.1']

# 配置监听网络：tcp
gitlab_workhorse['listen_network'] = "tcp"

# 配置地址和端口
gitlab_workhorse['listen_addr'] = "192.168.11.20:8888"
```

### 6. 常用命令

- 重新编译配置，并启动 `GitLab` 服务

  ```shell
  sudo gitlab-ctl reconfigure
  ```

- 启动所有 `GitLab`

  ```shell
  sudo gitlab-ctl start
  ```

- 重新启动 `GitLab`

  ```shell
  sudo gitlab-ctl restart
  ```

- 停止所有 `GitLab`

  ```shell
  sudo gitlab-ctl stop
  ```

- 查看服务状态

  ```shell
  sudo gitlab-ctl status
  ```

- 查看 `Gitlab` 日志

  ```shell
  sudo gitlab-ctl tail

  sudo gitlab-ctl tail nginx/gitlab_access.log
  ```

- 修改默认的配置文件

  ```shell
  sudo vim /etc/gitlab/gitlab.rb
  ```

- 检查 `Gitlab`

  ```shell
  gitlab-rake gitlab:check SANITIZE=true --trace
  ```
