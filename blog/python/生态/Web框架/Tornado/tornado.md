---
title: Tornado基础
order: 1
group:
  title: Tornado框架
  order: 23
---

# Tornado 框架

[Tornado](https://www.osgeo.cn/tornado/) | [Book](http://shouce.jb51.net/tornado/ch1.html)

### 1.简介

#### 1.1 各类框架的比较

**Django** 和 **Flask**：传统老牌框架，一个大而全，一个小而精，但并发低

**Tornado** 性能高，在底层 `IO` 处理机制上和 `Django` 有很大区别：

- `Django`、`Flask`则是传统模型，即：**IO 阻塞** 模型
  - 好处是代码容易理解，简单
- `tronado`、`gevent`、`asyncio`、`aiohttp`底层都是 **事件循环** + **协程**

因此，未来基于 `asyncio` 的框架，大概率成为主流

#### 1.2 模型

- **Twisted 模型**：

  - **NodeJs** 借鉴这种魔性，基于回调，适用于高 `IO` 低 `CPU` 的场景

  - 这种模型实现了一个基于回调 `http server`(_event loop_)，即：每个请求都被注册成一个异步函数，然后主循环来不断循环监听
  - 有很明显的 **缺点**：一旦应用程序有大量的 **CPU** 计算，**该线程大概率阻塞**，所有的请求都会受到影响，如果应用在处理一个请求时崩溃，所有的请求也都会受影响

- **`asyncio`、`tornado`、`gevent` 模型**

  - 回调写法不易读也易出错，于是将回调的写法改成了同步的写法
  - 这种模型与 **NodeJS** 的 `koa2` 和 **GO** 的 `net/http` 差不多
  - `asyncio` 提供了类似 **GO** 的 `goroutine` 的功能和写法，而 `aiohttp` 则提供了类似 **GO** 中 `net/http` 的 `http` 处理库

`tornado` 底层正在逐步抛弃原有设计，直接使用 `asyncio` 的底层，专注实现 **Web** 框架本身

### 2. 使用

#### 2.1 安装

```shell
pip install tornado
# 推荐在类UNIX系统下使用，windows仅作为开发环境
```

### 2.2 示例

执行 `python demo.py` 启动 `demo`

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

- `tornado.web.RequestHandler`：和 `Django` 不同，它把请求和响应全部封装到 `RequestHandler` 里，因此所有的请求全部继承 `RequestHandler`
