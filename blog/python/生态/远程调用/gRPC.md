---
title: gRPC

date: 2020-12-06
category:
  - 远程调用
tag:
  - RPC
  - gRPC
sticky: true
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

| proto3                 | JSON          | JSON示例                                | 注意                                                         |
| ---------------------- | ------------- | --------------------------------------- | ------------------------------------------------------------ |
| message                | object        | {“fBar”: v, “g”: null, …}               | 产生JSON对象，消息字段名可以被映射成lowerCamelCase形式，并且成为JSON对象键，null被接受并成为对应字段的默认值 |
| enum                   | string        | “FOO_BAR”                               | 枚举值的名字在proto文件中被指定                              |
| map                    | object        | {“k”: v, …}                             | 所有的键都被转换成string                                     |
| repeated V             | array         | [v, …]                                  | null被视为空列表                                             |
| bool                   | true, false   | true, false                             |                                                              |
| string                 | string        | “Hello World!”                          |                                                              |
| bytes                  | base64 string | “YWJjMTIzIT8kKiYoKSctPUB+”              |                                                              |
| int32, fixed32, uint32 | number        | 1, -10, 0                               | JSON值会是一个十进制数，数值型或者string类型都会接受         |
| int64, fixed64, uint64 | string        | “1”, “-10”                              | JSON值会是一个十进制数，数值型或者string类型都会接受         |
| float, double          | number        | 1.1, -10.0, 0, “NaN”, “Infinity”        | JSON值会是一个数字或者一个指定的字符串如”NaN”,”infinity”或者”-Infinity”，数值型或者字符串都是可接受的，指数符号也可以接受 |
| Any                    | object        | {“@type”: “url”, “f”: v, … }            | 如果一个Any保留一个特上述的JSON映射，则它会转换成一个如下形式：`{"@type": xxx, "value": yyy}`否则，该值会被转换成一个JSON对象，`@type`字段会被插入所指定的确定的值 |
| Timestamp              | string        | “1972-01-01T10:00:20.021Z”              | 使用RFC 339，其中生成的输出将始终是Z-归一化啊的，并且使用0，3，6或者9位小数 |
| Duration               | string        | “1.000340012s”, “1s”                    | 生成的输出总是0，3，6或者9位小数，具体依赖于所需要的精度，接受所有可以转换为纳秒级的精度 |
| Struct                 | object        | { … }                                   | 任意的JSON对象，见struct.proto                               |
| Wrapper types          | various types | 2, “2”, “foo”, true, “true”, null, 0, … | 包装器在JSON中的表示方式类似于基本类型，但是允许nulll，并且在转换的过程中保留null |
| FieldMask              | string        | “f.fooBar,h”                            | 见fieldmask.proto                                            |
| ListValue              | array         | [foo, bar, …]                           |                                                              |
| Value                  | value         |                                         | 任意JSON值                                                   |
| NullValue              | null          |                                         | JSON null                                                    |
