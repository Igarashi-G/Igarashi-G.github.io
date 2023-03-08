---
title: Tornado框架
date: 2020-03-06
category:
  - WEB框架
  - Tornado
tag:
  - WEB框架
  - Tornado
---

**Python Tornado** 框架概述



<!--more-->

[Tornado](https://www.osgeo.cn/tornado/) | [Book](http://shouce.jb51.net/tornado/ch1.html)

## 1. 简介

### 1.1 各类框架的比较

**Django** 和 **Flask**：传统老牌框架，一个大而全，一个小而精，但并发低

**Tornado** 性能高，在底层 **IO** 处理机制上和 **Django** 有很大区别

- **Django**、**Flask**则是传统的 **IO 阻塞** 模型，目前也有异步，生态略差
  - 好处是代码容易理解，简单
- **tronado**、**gevent**、**asyncio**、**aiohttp**底层都是 **事件循环** + **协程**

因此，未来基于 **asyncio** 的框架，大概率成为主流

#### 1.2 模型

- **Twisted 模型：** 
  - **NodeJs** 借鉴于此，但是 **基于回调的机制**，适用于高 **IO** 低 **CPU** 场景
  
  - 这种模型实现了一个基于回调 **http server （*event loop：* *每个请求都被注册成一个异步函数，然后主循环来不断循环监听*）** 
  - **缺点：** 一旦应用程序有大量的 **CPU** 计算，**线程大概率阻塞**，所有的请求都会受到影响，如果应用在处理一个请求时崩溃，**所有请求也都会受影响**
  
- **asyncio、tornado、gevent 模型：** 
  - **回调即不易读又易出错**，于是此类基于协程的框架，将回调的写法改为同步
  - 这种模型与 **nodejs** 的 **koa2** 或是 **GO** 的 **net/http** 差不多
  - **asyncio** 提供了类似 **GO** 的 **goroutine** 的功能和写法，而 **aiohttp** 则提供了类似 **GO** 中 **net/http** 的 **http** 处理库

**tornado** 底层正在逐步抛弃原有设计，直接使用 **asyncio** 的底层，专注实现 **Web** 框架本身

## 2. 基础使用

### 2.1 安装

```shell
# 推荐在类UNIX系统下使用，windows仅作为开发环境
$ pip install tornado
```

### 2.2 示例

执行 **`python demo.py`** 启动

```python
import tornado.web
import tornado.ioloop

class IndexHandler(tornado.web.RequestHandler):
    """主页处理类"""

    def get(self):
        self.write("hello tornado")

    def post(self):
        pass

if __name__ == '__main__':
    app = tornado.web.Application([(r"/", IndexHandler)])
    app.listen(8000)
    tornado.ioloop.IOLoop.current().start()
```

- **tornado.web.RequestHandler：** 和 **Django** 不同，它把请求和响应全部封装到 **RequestHandler** 里，因此所有的请求全部继承 **RequestHandler** 



后续查阅 **文档 & github**：

[Tornado](https://www.tornadoweb.org/)  （*最全最新*） |  [Github: tornado](https://github.com/tornadoweb/tornado)

