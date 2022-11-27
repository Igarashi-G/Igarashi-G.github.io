---
title: UDS-ISO构建及发布
date: 2022-11-23
category:
  - UDS
tag:
  - UDS
  - 打包
---

**UDS** 的 **CentOS** 镜像打包及发布流程

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

## 2. iso打包

打包环境：**iso_build_44**（*172.16.120.44* ）, **ucfs** 打包目录位于 `/home/ucfs-build` 目录下, 执行时需要 **传入指定版本号** 集合

> **tikv** 没有更新到代码中，由 **gitignore** 提供，打包时无需强制更新

- 打包时需要把全量 **iso** 挂载到 `/media/cdrom` 目录下
- 然后执行 `./build.sh -v x.y.z` 开始打包
- 打包后的文件会输出到 `/release` 目录下

```shell
cd /home/ucfs-build

# 以 1.2.6-8 为例，打包镜像如下
bash ./build.sh -v 1.2.6-8

# 查看打包后的镜像
ls /release/1.2.6-8
cd /release/1.2.6-8

# 需要拷贝到上文 Nginx 环境中发布
scp ./UDS-G5R1-v1.2.6-8-CentOS7.9-x86_64.iso 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/release/uds/v1.2.6/

scp ./UDS-G5R1-v1.2.6-8-CentOS7.9-x86_64.upgrade.tar.gz 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/release/uds/v1.2.6/

# 172.16.128.99上虚拟机测试
scp ./UDS-G5R1-v1.2.6-8-CentOS7.9-x86_64.iso 172.16.128.99:/vmfs/volumes/628d8920-834315d0-6c3f-a4dcbef9446e/iso/
```

构建时会下载指定的内容，通过定义的 **host** 解析，更换环境时修改构建机器的 **hosts** 即可

1. **iso** 发布，将输出的 **iso** 以及相应的 **checksum** 上传到 ` 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/release` 的指定目录中，发布完成



**注：** 机器都在 **172.16.128.99** 的宿主机上

- 虚拟机账号密码都为 **root  /  user@dev** 
- 宿主机账号密码 **root  /   uit@123456**

