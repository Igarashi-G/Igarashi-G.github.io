---
title: UFS-ISO构建及发布
date: 2022-11-23
category:
  - UFS
tag:
  - UFS
  - 打包
---

**UFS** 的 **CentOS** 镜像打包及发布流程

<!-- more -->





# 软件发布

**Nginx** 发布环境 **172.16.120.41**（*用于 **iso** 下载* ）位于 目录  `/mnt/docker-runtime/nginx/ufs-local/` 下

```shell
cd /mnt/docker-runtime/nginx/ufs-local/
```

**iso** 打包前，需要将最新的 **rpm** 包放入`/mnt/docker-runtime/nginx/ufs-local/build/latest` 目录中，**iso** 构建时会自动下载其内容

## 1. RPM打包

**rpm** 、 **uxs-rpm** 、 **wheel** 等安装包都位于 **Nginx** 发布环境的 `/mnt/docker-runtime/nginx/ufs-local/build/` 目录下

#### 1.1 管理平台 RPM 打包

**以 uxs-mgr 为例：** 当前 **git** 上提交的代码的 **CICD** 已失效，目前版本手动自增到 61

1. 先去**172.16.120.44** 的 `/home/zz/uxs-dashboard `下 **pull** 最新代码

   ```shell
   cd /home/zz/uxs-dashboard/
   ```

2. 然后修改 `./rpm/uxs_mgr.spec` 下的版本号

   > 需参考 `/mnt/docker-runtime/nginx/ufs-local/build/latest` 目录下，上次打包的版本号，手动自增， **ucfs** 和 **develop** 分支版本号相同

3. 然后执行如下命令打包

   ```shell
   bash create-rpm-package.sh
   
   # 会输出到如下目录
   cd /home/uxs_release/
   
   # 需要拷贝到 41环境上，再去 44 环境上，进行后续的构建镜像
   scp ./* 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/build/latest/
   ```

#### 1.2 其他

**rpm：** 需要下载之后拷贝到 **172.16.120.41** 目标文件夹下

```shell
# 安装下载工具
yum install -y yum-utils

# 下载开发环境中使用的 rpm 包，以域相关的包示例
yumdownloader relam oddjob-mkhomedir oddjob samba-winbind-clients samba-winbind samba-common-tools samba-winbind-krb5-locator krb5-devel krb5-workstation nss-pam-ldapd pam_ldap openldap-clients --destdir=./rpm

# 拷贝到 Nginx 打包的文件夹下
scp ./rpm/*.rpm 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/build/extra/
```

**wheel：** 需要下载 **linux** 平台对应的 **wheel** 文件

```shell
# 下载wheels
mkdir ./wheels
$ pip wheel -w wheels -r ./requirements.txt

# 拷贝到 Nginx 打包的文件夹下
$ scp ./wheels/* 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/build/wheel/

# 再去 172.16.120.44 机器上修改配置文件
$ vim /home/ucfs-build/release/wheelrequirements.txt
# 如，加入以下
+ async-lru==1.0.3
+ Jinja2==3.1.2
+ ldap3==2.9.1
```



```shell
# 将 windows 文件格式递归转换为 unix 格式
find . -type f -exec dos2unix {} \;
```

