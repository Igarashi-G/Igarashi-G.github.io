---
title: WEB框架本质
date: 2020-02-16
category:
  - WEB框架
tag:
  - WEB框架
  - Socket
---

**Web** 框架基础，网络框架的本质

<!--more-->



## 1. Web 通信框架

**Web** 框架，其网络通信本质是对 **socket** 的封装，然后走 **HTTP1.0/1.1/2.0** 协议，或是什么其他协议，故其本质是一个封装了 **socket** 的服务端，而浏览器则是 **socket** 通信的客户端

那么，**Web 应用** 流程为：

- 浏览器（*客户端* ）发起 **HTTP** 请求， 如

  ```shell
  # 使用 netcat 发送 HTTP/2 数据包 HTTP/1.0 | /1.1 ，会发现，百度将整个html资源返回回来
  $ nc www.baidu.com 80 
  GET / HTTP/2.0	\n\n
  
  # 查看网络连接，就会发现此时向百度 14.215.177.38:80 地址建立了TCP连接
  netstat -natp|grep nc
  tcp        0      0 192.168.3.141:33802     14.215.177.38:80        ESTABLISHED 14637/nc
  ```

- 经过一系列 **DNS** 解析和内核网络协议栈

- 服务器（**Web 框架**）收到请求，并处理一些列逻辑（***SQL**、计算、数据处理等*）

- 生成 **HTML** 文档（*若 **SSR** 渲染*）

- 将 **HTML** 作为响应的 **Body** 返回给浏览器

- 浏览器收到响应，取到 **HTML** 文档并解析、渲染

##### **为什么设计网络框架** 

避免开发者重复造轮子浪费时间，去接触底层 **TCP** 连接、解析，并处理复杂的 **HTML** 通信，**Web** 框架只需专注业务实现，因此方便了 **Web 应用** 开发，其本质就是对 **socket（*套接字* ）** 的封装

先参考： [socket 通信](/python/语言/网络编程/Socket.html) 

#### 1.1 简易 socket 通信示例

```python
import socket


def handle_requset(client):
    buf = client.recv(1024)

    # 拿到的是 get 请求发送过来的 http 协议请求头
    print(buf.decode("utf8"))

    client.sendall(bytes("HTTP/127.0.0.说明.md 201 OK\r\n\r\n", "utf8"))
    client.send("<h1 style='color:red'>Hello, Igarashi</h1>".encode("utf8"))


def main():
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind(("127.0.0.说明.md", 8200))
    sock.listen(5)
    while True:
        connection, address = sock.accept()
        handle_requset(connection)
        connection.close()


if __name__ == "__main__":
    main()
```

## 2. 内置 WSGI

**WSGI**（_Web Server Gateway Interface_）网络服务 **网关接口**，是一种 **规范**，定义了 **Web 应用** 与 **Web Server** 间的接口格式（_通信规范/协议_）

组成部分

- **WSGI server：** 负责从客户端接收请求，将 **request** 转发给 **application**，将 **application** 返回的 **response** 返回给客户端
- **WSGI application：**
  - 接收由 **server** 转发的 **request**
  - 处理请求，并将处理结果返回给 **server**
  - 包括多个栈式的中间件（***middlewares***）同时实现 **server** 和 **application**
  - 因此在 **WSGI** 服务器 与 **WSGI** 应用 中间起调度作用

利用 **Python** 标准库 **wsgiref**，模拟一个 **web** 框架玩具

```python
import time

from wsgiref.simple_server import make_server


def current_time(request):
    f = open("current_time.html", "rb")
    data = f.read()
    cur_time = time.ctime(time.time()) # 拼接到 html 中 -- 用模板语言，这里自创
    data = str(data, "utf8").replace("!cur_time!", str(cur_time))  # 这个后端规定好的替换就类似模板
	return [data.encode("utf8")]


# 模拟每个路由执行的功能
def f1(request):
    return [b'<h1>Hello Book!</h1>']

def f2(request):
    return [b'<h1>Hello Web!</h1>']

def login(request):
    print(request)
    return [b'<h1>Hello Login!</h1>']


def routers():
    """ 路由层 """
    urlpatters = {
        ("/book", f1),
        ("/web", f2),
        ("/login", login),
        ("/current_time", current_time),
    }
    return urlpatters

def application(environ, start_response):
    """
    应用层：封装socket对象
    environ: 封装 HTTP 请求对象
    start_response：发送 HTTP 响应
    """
	start_response("200 OK", [("Content-Type", "text/html")])
    path = environ["PATH_INFO"]
    urlpatters = routers()

    # 找路由，找到执行，找不到404
    func = None
    for item in urlpatters:
        if path == item[0]:
            func = item[1]
            break
    if func:
        return func(environ)
    else:
        return [b"<h1>404!<h1>"]

def main()
	# 构建 http对象，类似 socket，有 http解析能力
    httpd = make_server("127.0.0.说明.md", 8080, application)
    print("Server HTTP on port 8000 ....")

    # 循环监听 HTTP 请求
    httpd.serve_forever()
```

- 如上，无需考虑底层 **HTTP** 通信
- 解耦了 **HTTP** 请求，路由是路由，功能是功能

#### 2.2 uWSGI 

开发场景不会用 **wsgiref** 这种模块写应用，而是使用 [Django](/python/生态/Web框架/Django/Django概述) 等框架 + [uWSGI 服务器](/tool/Nginx/应用部署.html#_1-1-uwsgi-服务器) 
