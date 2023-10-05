---
title: Python项目打包
date: 2021-09-17
category:
  - Python
  - 打包
tag:
  - 打包
---

**Python** 打包 **rpm** **or** **wheel**

<!-- more -->

# python 打包

## 1. python 打 rpm 包

#### 什么是 RPM

**RPM** 软件包是一个包含其他文件及其元数据（有关系统所需文件的信息）的文件。

具体来说，**RPM** 软件包由 **cpio** 归档文件组成。

该 **cpio** 压缩文件包含：

- **Files** # 档案
- **RPM header** # RPM 标头（程序包元数据）

该 **rpm** 软件包管理器使用这种元数据来确定的依赖，在那里安装文件和其他信息。



#### RPM 类型

- 源码包 - `SRPM`：包含源代码和 `SPEC` 文件，该文件描述了如何将源代码构建为二进制的 `RPM`，可选，包括对源代码的补丁

- 二进制 - `RPM`：二进制 `RPM` 包含从源代码和补丁构建的二进制文件

- 列出 `RPM` 打包工具的实用程序

  ```shell
  rpm -ql rpmdevtools | grep bin
  ```

#### 其他

`rpm` 从 `4.5x` 以上的版本将 **rpmbuild** 默认工作路径移动到 `/root/rpmbuild` 目录

```ini
$HOME/rpmbuild
```

推荐打包时尽量不用 `root` 账户操作（防止执行些不可挽回的命令）

环境：

- **CentOS Linux release 7.5.1804** (`Core`)
- **RPM** `version 4.11.3`

如果想发布 `rpm` 格式的源码包或者是二进制包，就要使用 `rpm` 最新打包工具: **rpmbuild**

### 1.1 安装工具

- 安装 `rpmbuild`

  ```shell
  yum install -y rpm-build
  ```

- 也可以安装 `rpmdevtools`

  ```shell
  yum install -y rpmdevtools
  ```

- `Python` 的编译打包工具是 **setuptools**

### 1.2 建立环境

建立一个打包环境，也就是目录树的建立，一般是在 `~/rpmbuild` 目录下建立 `5` 个目录。分别是：（_不用自己创建，下文有命令_）

- `BUILD`：目录用来存放打包过程中的源文件，就是来源于 `SOURCE`

- `SOURCE` ：用来存放打包是要用到的源文件和 `patch`，主要是一些 `tar` 包

- `SPEC`：用来存放 `spec` 文件

- `SRPM`：存放打包生成的 `rpm` 格式的源文件

- `RPM`：二进制文件

### 1.3 SPEC 阶段与目录的对应关系

阶段 读取的目录 写入的目录 具体动作

%prep %\_sourcedir %\_builddir 读取位于 %\_sourcedir 目录的源代码和 patch 。之后，解压源代码至 %\_builddir 的子目录并应用所有 patch。

%build %\_builddir %\_builddir 编译位于 %\_builddir 构建目录下的文件。通过执行类似 ./configure && make 的命令实现。

%install %\_builddir %\_buildrootdir 读取位于 %\_builddir 构建目录下的文件并将其安装至 %\_buildrootdir 目录。这些文件就是用户安装 RPM 后，最终得到的文件。注意一个奇怪的地方: 最终安装目录 不是 构建目录。通过执行类似 make install 的命令实现。

%check %\_builddir %\_builddir 检查软件是否正常运行。通过执行类似 make test 的命令实现。很多软件包都不需要此步。

bin %\_buildrootdir %\_rpmdir 读取位于 %\_buildrootdir 最终安装目录下的文件，以便最终在 %\_rpmdir 目录下创建 RPM 包。在该目录下，不同架构的 RPM 包会分别保存至不同子目录， noarch 目录保存适用于所有架构的 RPM 包。这些 RPM 文件就是用户最终安装的 RPM 包。

src %\_sourcedir %\_srcrpmdir 创建源码 RPM 包（简称 SRPM，以.src.rpm 作为后缀名），并保存至 %\_srcrpmdir 目录。SRPM 包通常用于审核和升级软件包。

### 1.4 工具使用

rpmbuild 命令使用一套标准化的「工作空间」 ，生成 %\_topdir 工作目录 ~/rpmbuild，以及配置文件 ~/.rpmmacros：

    rpmdev-setuptree

rpmdev-setuptree 这个命令就是安装 rpmdevtools 带来的。可以看到运行了这个命令之后，在 $HOME 家目录下多了一个叫做 rpmbuild 的文件夹，
里边内容如下：

    tree rpmbuild
    rpmbuild
    ├── BUILD
    ├── RPMS
    ├── SOURCES
    ├── SPECS
    └── SRPMS

rpmdev-setuptree 命令在当前用户 home/rpmbuild 目录里自动建立上述目录。（省着自己创建了）

如果没有安装 rpmdevtools 的话，其实用 mkdir 命令创建这些文件夹也是可以的:

    mkdir -p /root/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}

### 1.5 生成 SPEC 文件

最最最重要的 SPEC 文件，命名格式一般是“软件名-版本.spec”的形式，将其拷贝到 SPECS 目录下。

可以将 SPEC 文件理解为 rpmbuild 实用程序用来构建 RPM 的配方。通过在一系列部分中定义指令来向构建系统提供必要的信息。

如果系统有 rpmdevtools 工具，可以用 rpmdev-newspec -o name.spec 命令来生成 SPEC 文件的模板，然后进行修改：

### 1.6 示例文件：

```shell
Name:       hello-world
Version:    1
Release:    1
Summary:    Most simple RPM package
License:    FIXME

%description
This is my first RPM package, which does nothing.

%prep
# we have no source, so nothing here

%build
cat > hello-world.sh <<EOF
#!/usr/bin/bash
echo Hello world
EOF

%install
mkdir -p %{buildroot}/usr/bin/
install -m 755 hello-world.sh %{buildroot}/usr/bin/hello-world.sh

%files
/usr/bin/hello-world.sh

%changelog
# let's skip this for now
```

### 1.7 打包命令 rpmbuild

用于生成包

```shell
-bp 只解压源码及应用补丁
-bc 只进行编译
-bi 只进行安装到%{buildroot}
-bb 只生成二进制 rpm 包
-bs 只生成源码 rpm 包
-ba 生成二进制 rpm 包和源码 rpm 包
--target 指定生成 rpm 包的平台，默认会生成 i686 和 x86_64 的 rpm 包，但一般我只需要 x86_64 的 rpm 包
```

这里执行 - [完全打包]：

```shell
rpmbuild -ba hello-world.spec   // rpmbuild -ba 软件名-版本.spec
```

软件包制作完成后可用 rpm 命令查询，看看效果。如果不满意的话可以再次修改软件包描述文件，重新运行以上命令产生新的 RPM 软件包。

```shell
rpmbuild tree *RPMS
```

[注]：将所有用于生成 rpm 包的源代码、 shell 脚本、配置文件都拷贝到 SOURCES 目录里，注意通常情况下源码的压缩格式都为 \*.tar.gz 格式。

### 1.8 准备打包的源代码

开发人员通常将软件作为源代码的压缩存档进行分发，然后将其用于创建软件包。RPM 打包程序可使用现成的源代码存档。

软件应随软件许可证一起分发

创建一个 **LICENSE** 文件，并确保它包含以下内容

```shell
cat /tmp/LICENSE
```

将源代码和许可放到 /root/rpmbuild/SOURCES/ 目录下， 然后执行压缩命令

    tar -cvzf 项目名-版本号.tar.gz 文件名（目录）
    
    如：
        tar -cvzf pello-0.1.2.tar.gz pello-0.1.2
        pello-0.1.2 /
        pello-0.1.2 / LICENSE
        pello-0.1.2 / pello.py



---

## 2. python 项目打包 wheel

使用 `python` 自带工具 **setuptool** 进行打包

### 2.1 编写 setup.py 文件

执行命令，生成 `build/lib/xxx` 具体打包后数据 dist/xxx-1-1.whl 打包后的 wheel 文件

```shell
python3 setup.py bdist_wheel
```

`setup.py` 示例

```python
import setuptools
from setuptools.command.install import install

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()


# with open("requirements.txt", "r", encoding="utf-8") as f:
#     requirements = f.readlines()
# requirements = [i.strip() for i in requirements]

class CustomInstallCommand(install):
    def run(self):
        install.run(self)


def _find_packages():
    packages = setuptools.find_packages(where="./backend")
    packages.extend(['data', 'static', 'static/fonts',
                     'static/css', 'static/icons', 'static/img', 'static/js',
                     'scripts', 'conf', 'app/i18n/en/LC_MESSAGES', 'app/i18n/zh/LC_MESSAGES'])
    return packages


setuptools.setup(
    name="usan",
    version="0.1.1",
    author="UIT Cloud Platform Development Team",
    author_email="zhengze@uit.com.cn",
    description="usan project",
    url="http://172.18.50.120/uds/mgmt/ui/backend",
    long_description=long_description,
    long_description_content_type="text/markdown",

    # install_requires=requirements,
    packages=_find_packages(),
    package_dir={'': 'backend'},
    package_data={'': ['*.*']},
    include_package_data=True,

    cmdclass={
        'install': CustomInstallCommand,
    },

    license="ISCL",
    zip_safe=False,

    classifiers=[
        'License :: OSI Approved :: ISC License (ISCL)',
        "Programming Language :: Python :: 3.6+",
        "Operating System :: CentOS 7",
    ],
    python_requires='>=3.6',
)

```

运行以下命令安装

- `egg` 形式

  ```shell
  # 存入python包中  应该可以执行运行时的install
  $ python3 setup.py install
  ```

- pip 形式

  ```shell
  #存入类似 /usr/local/lib/python3.6/site-packages/打包数据 目录中，与build后的文件相同
  $ pip3 install xxx-1-1.whl
  ```

### 2.2 编写 `.service` 文件

该文件用于 `CentOS` 执行 `systemctl` 命令时运行对应的命令，编写后放入 `/usr/lib/systemd/system`

示例

```ini
[Unit]
Description=USAN Api daemon
After=network.target

[Service]
Type=simple
EnvironmentFile=/usr/bin/python3
ExecStart=/usr/bin/python3 /usr/local/lib/python3.6/site-packages/app/udc/udc_server.py start
ExecStop=/usr/bin/python3 /usr/local/lib/python3.6/site-packages/app/udc/udc_server.py stop
ExecReload=/usr/bin/python3 /usr/local/lib/python3.6/site-packages/app/udc/udc_server.py restart
KillMode=process
#Restart=on-failure
PIDFile=/var/run/ufsapi.pid
#RestartSec=100ms
```

> **注意：**
>
> 此处 `start`、`stop` 等不能直接执行 `python3`，要写 `python3` 所在的 具体文件路径

运行

```shell
systemctl enable usan
systemctl status/start/stop/reload usan
```

### 2.3 去掉依赖

下载 `requirements.txt` 文件中的依赖，大部分应该是 `whl` 文件，包含少部分 `tar.gz` 文件

```shell
$ pip3 download -d [目录] -r requirements.txt
```

断网环境下，提供编译后的 `whl` 文件依赖，[`xx.tar.gz` 转 `wheel`]

- `tar.gz` 格式有些安装需要编译，有些需要 **gcc** 环境，`whl` 避免 **gcc** 环境的依赖

```shell
$ pip3 wheel xx.tar.gz

# 如
$ pip3 wheel psutil-5.7.3.tar.gz
```

移植到镜像中，执行如下安装命令，可自动识别打包后的 `whl` 和依赖的 `whl`

```shell
$ pip3 install --use-wheel --no-index --find-links=package/usan/whl_package/ -r requirements.txt

--find-links: whl包所在的路径
# 通过requirements.txt 中的待安装项自动寻找依赖并安装
```

### 2.4 打包到镜像

挂载原有镜像，并将镜像的内容拷贝出来

```shell
mkdir /mnt/usan 				# 新建目录
mount xxx.iso /mnt/usan 		# 挂载镜像命令
cp -R /mnt/usan /root/test  	# 拷贝到指定目录
cd /root/test
```

目录下应包含有 `isolinux` 文件，把文件移动到待打包的位置，并执行以下命令

```shell
cp -R xxx /root/test/Package/xxx

tar czvf FileName.tgz path # 可能会压缩成.tgz的文件，用此命令
- tar zcvf uraid-test.build-v2.38-base-centos7-x86_64-2011021828.tgz ./package/ ./current ./ins ...
# 将当前目录下的 package文件夹压缩为tgz
cd ..

//genisoimage -joliet-long -V UFS

genisoimage -joliet-long  \
    -o "/home/usan-test.iso" \
    -b "isolinux/isolinux.bin" \
    -c "isolinux/boot.cat" \
    -no-emul-boot \
    -boot-load-size 4 \
    -boot-info-table -R -J -v -cache-inodes -eltorito-alt-boot \
	"."

需要安装 yum install -y genisoimage  -b 后这个isolinux.bin文件是打包必须的 -o 后面接输出到的执行目录的文件

-o 指定映像文件的名称
-U 允许“未翻译”文件名。
-r uid和gid设置为零，因为它们通常只在作者的系统中有用，而对客户端没有用处。
-v 冗长的执行。如果在命令行上给出两次，则会打印额外的调试信息。
-T 在CD-ROM上的每个目录中生成一个TRANS.TBL文件，该文件可用于非Rock Ridge系统，以帮助建立正确的文件名。。
-J 除了正常的ISO 9660文件名之外，还生成Joliet目录记录。在Windows机器上使用光盘时，这是有用的。
-joliet-long 允许Joliet文件名最多为103个Unicode字符，而不是64个字符。这违反了Joliet规范，但似乎有效。谨慎使用。
-V 指定要写入主块的卷ID(卷名或标签)。有32个字符的空间。相当于“.genisoImagerc”文件中的VOLI。卷ID被Solaris卷管理器用作挂载点，并作为分配给光盘的标签。
-volset  指定卷集ID。有128个字符的空间。相当于“.genisoImagerc”文件中的VOLS
-A 指定描述光盘应用程序Id的文本字符串，可以有128个字符
-b 指定在为x86 PC制作EL Torito可引导CD时使用的引导映像的路径和文件名。
-c 指定引导目录的路径和文件名，这是El Torito可引导CD所必需的。
-no-emul-boot 指定用于创建El Torito可引导cd的引导映像是“无仿真”映像。系统将在不执行任何磁盘模拟的情况下加载和执行此映像。
-boot-load-size 指定在非模拟模式下加载的“虚拟”(512字节)扇区的数量。默认情况是加载整个引导文件。如果不是4的倍数，一些BIOSes可能会出现问题。
-boot-info-table 指定在引导文件中的偏移量8处修补一个56字节的表，其中包含CD-ROM布局的信息。的副本！
-eltorito-alt-boot 从一组新的El Torito启动参数开始。最多63个El Torito引导项可以存储在一张CD上。
-R 使用Rock Ridge协议生成SUSP和RR记录，以进一步描述ISO 9660文件系统上的文件。
```

