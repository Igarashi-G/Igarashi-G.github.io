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

**Nginx** 发布环境 **172.16.120.41**（*用于 **iso** 下载* ）位于 目录  `/mnt/docker-runtime/nginx/ufs-local/` 下

```shell
cd /mnt/docker-runtime/nginx/ufs-local/
```

**iso** 打包前，需要将最新的 **rpm** 包放入`/mnt/docker-runtime/nginx/ufs-local/build/latest` 目录中，**iso** 构建时会自动下载其内容

## 1. RPM打包

**rpm** 、 **ufs-*.rpm** 、 **wheel** 等安装依赖，都位于 **Nginx（*172.16.120.41*）** 发布环境的 `/mnt/docker-runtime/nginx/ufs-local/build/` 目录下

### 1.1 管理平台 RPM 打包

**以 ufs-manager 为例：** 当前 **git** 上提交的代码的 **CICD** 已失效，目前需手动自增版本号

1. 在 **172.16.120.44** 的 `/home/ufs-manager `下 **pull** 最新代码

   ```shell
   cd /home/ufs-manager/
   ```

2. 然后修改 `./rpm/uxs_mgr.spec` 下的版本号

   > 需参考 `/mnt/docker-runtime/nginx/ufs-local/build/latest` 目录下，上次打包的版本号，手动自增

3. 然后执行如下命令打包

   ```shell
   bash create-rpm-package.sh
   
   # 会输出到如下目录，如
   cd /home/rpm_release/ufs-manager/ufs-manager-4.1.1
   ls	
   # ufs-manager-4.1.1-202303171635.el7.x86_64.rpm
   
   # 远程拷贝到 41环境上，再去 44 环境上，进行后续的构建镜像
   scp ./* 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/build/latest/
   ```

### 1.2 其他

**rpm：** 需要下载之后拷贝到 **172.16.120.41** 目标文件夹下

```shell
# 安装下载工具
yum install -y yum-utils

# 下载开发环境中使用的 rpm 包，以域相关的包示例
yumdownloader realm oddjob-mkhomedir oddjob samba-winbind-clients samba-winbind samba-common-tools samba-winbind-krb5-locator krb5-devel krb5-workstation nss-pam-ldapd pam_ldap openldap-clients --destdir=./rpm

# 拷贝到 Nginx 打包的文件夹下
scp ./rpm/*.rpm 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/build/extra/
```

**wheel：** 需要下载 **Linux 平台** 对应的 **wheel** 文件

```shell
# 下载 wheels
mkdir ./wheels
$ pip wheel -w wheels -r ./requirements.txt

# 拷贝到 Nginx 打包的文件夹下
$ scp ./wheels/* 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/build/wheel/
```

::: warning 重要

手动修改依赖项

```shell
# 再去 172.16.120.44 打包机器上修改配置文件
$ vim /home/ufs-build/release/wheel/requirements.txt

# 如，加入以下
+ async-lru==1.0.3
+ Jinja2==3.1.2
+ ldap3==2.9.1
```

:::

## 2. iso打包

打包环境：**iso_build_44**（*172.16.120.44* ）, **ufs** 打包目录位于 `/home/ufs-build` 目录下, 执行时需要 **传入指定版本号** 

- 打包时需要全量挂载 **iso** 到 `/media/cdrom` 目录下
- 然后执行 `./build.sh -v x.y.z` 开始打包
- 打包后的文件会输出到 `/release` 目录下

以 打镜像 **v4.1.1** 为例

```shell
cd /home/ufs-build

# 构建镜像 v4.1.1
bash ./build.sh -v 4.1.1

# 查看打包后的镜像
ls /release/4.1.1
# md5sum.txt  sha256sum.txt  ufs_centos7.9_x86_64_4.1.1-202303201458.iso  ufs_centos7.9_x86_64_4.1.1-202303201458.upgrade.tar.gz

cd /release/4.1.1

# 需要拷贝到上文 Nginx 环境中发布
scp ./* 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/release/ufs/v4.1.1/

# 172.16.128.99上虚拟机测试
scp ./ufs_centos7.9_x86_64_4.1.1-202303201458.iso 172.16.128.99:/vmfs/volumes/628d8920-834315d0-6c3f-a4dcbef9446e/iso/
```

构建时会下载指定的内容，通过定义的 **host** 解析，更换环境时修改构建机器的 **hosts** 即可

> 发布时需将输出的 **iso** 以及相应的 **checksum** 上传到 ` 172.16.120.41:/mnt/docker-runtime/nginx/ufs-local/release` 的指定目录中



```shell
# 将 windows 文件格式递归转换为 unix 格式
find . -type f -exec dos2unix {} \;
```

