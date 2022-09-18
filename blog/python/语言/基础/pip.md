---
title: pip
date: 2020-03-25
category:
  - Python
tag:
  - pip
star: true
---

# pip（包管理器）

## 1. 使用基础

### 1.1 换源

##### PYPI 国内源路径

- 阿里云 http://mirrors.aliyun.com/pypi/simple/
- 豆瓣 http://pypi.douban.com/simple/
- 清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
- 中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

通常有 **两种** 换源方式

1. **临时换源**

   在 **pip** 安装包时，加 `-i` 参数，追加三方源的 `url` ，如利用豆瓣源下载 **Django**

   ```shell
   $ pip install django -i http://pypi.douban.com/simple
   ```

   显然不是一个一劳永逸的方法，仅下载少量包的场景适用

2. **永久换源**

   ::: tabs#方式

   @tab Linux#Linux

   1. 在根目录下创建/修改 `～/.pip/pip.conf` **pip** 配置文件

   2. 进入文件新增/修改内容
   
      ```ini
      [global]
      index-url=http://pypi.douban.com/simple
      [install]
      trusted-host=pypi.douban.com
      ```

   3. 保存文件并退出

   @tab Windows#Windows

   ```shell
   # 在类似 路径
   C:\Users\Fuuka\AppData\Roaming\pip
   # 修改配置
   %HOMEPATH%\pip\pip.ini
   ```
   
   @tab 全局命令#全局命令
   
   ```shell
   # 清华源
   pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
   
   # 阿里源
   pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
   
   # 腾讯源
   pip config set global.index-url http://mirrors.cloud.tencent.com/pypi/simple
   
   # 豆瓣源
   pip config set global.index-url http://pypi.douban.com/simple/
   
   # 换回默认源
   pip config unset global.index-url
   ```
   
   :::

### 1.2 下载 wheel

::: code-tabs#wheel

@tab windows#widows

```bash
pip download -d D:\Program\ grpcio grpc-tools protobuf
```

@tab linux#linux

```shell
pip3 download -d ./ grpcio grpc-tools protobuf
```

@tab download#download

```shell
# 如：手动去网址下载
# https://pypi.tuna.tsinghua.edu.cn/simple/grpcio/
# https://pypi.tuna.tsinghua.edu.cn/simple/grpcio-tools/
```

:::
