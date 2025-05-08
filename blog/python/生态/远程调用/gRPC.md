---
title: gRPC

date: 2020-12-06
category:
  - 远程调用
tag:
  - RPC
  - gRPC
---

目前比较主流，基于 **Golang** 开发的 **gRPC**

<!-- more -->

# gRPC

### 1. 部分文档

##### 1.1 论文

[graphics](https://github.com/grpc/proposal)

##### 1.2 服务配置

[Service Config in gRPC](https://github.com/grpc/grpc/blob/master/doc/service_config.md)
[arg_keys](https://grpc.github.io/grpc/core/group__grpc__arg__keys.html)

##### 1.3 重试策略

[what is xDS](https://github.com/grpc/grpc/blob/master/doc/grpc_xds_features.md)

##### 1.4 开源引用

[aioetcd3:](/data-base/etcd/aioetcd3) 版本较老，非 `asyncio` 是基于线程实现的库

##### 1.5 Python 文档

[gRPC Python’s documentation](https://grpc.github.io/grpc/python/index.html) 此 **API 是稳定** 的

[grpc (github.com)](https://github.com/grpc/grpc/tree/master/src/python/grpcio) 需要 `python >= 3.6`

[官方文档中文版](https://doc.oschina.net/grpc?t=56831)

##### 1.6 proto3

[protocol buffers](https://developers.google.com/protocol-buffers/docs/proto3#simple) 
