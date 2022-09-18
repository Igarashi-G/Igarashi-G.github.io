---
title: WebSocket编程
order: 4
---

# WebSocket 协议

## 一、websocket 概述

Node.js：socketio：https://socket.io/
Python：websockets 库

### 0.简述：

WebSocket 是一种通信协议，用来前后端交互，是 HTML5 引入的 api，弥补 http 协议上的不足之处，可在服务器和浏览器之间提供全双工和低延迟通道。

- 浏览器支持 WebSocket（2020 年所有浏览器的 97％）

- 没有任何元素（代理，防火墙等）阻止客户端和服务器之间的 WebSocket 连接
- 和 http 一样，WebSocket 也是应用层协议。浏览器和服务器只要完成一次握手的动作，然后浏览器和服务器之间就会脱离 http 协议，而是用
  WebSocket 自己的 ws 协议。客户端和服务器端就可以通过 tcp 连接直接交换数据

### 1.使用场景

使用场景有很多：

- websocket 可以实现服务端主动给客户端推送消息，可以通过服务端的广播散播消息

- web 版的即时聊天（IM）工具

- web 游戏的开发、多玩家游戏

- 视频漫画网站的弹幕、消息订阅

- 协同编辑、协同文档办公

- 股票基金实时报价，监控系统实时监控曲线，任务状态改变等

- 网络视频会议、在线教育等需要高实时的场景。

### 2.连接过程：

WebSocket 协议本质上是一个基于 TCP 的持久化协议。 为了建立一个 WebSocket 连接：

- 1.客户端浏览器首先要向服务器发起一个 HTTP 请求，

- 2.这个请求和通常的 HTTP 请求不同，包含了一些附加头信息，其中附加头信息"Upgrade: WebSocket Upgrade: websocket
  Connection: Upgrade"表明这是一个申请协议升级的 HTTP 请求

- 3.服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了

- 4.双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接。

### 3.特点：

- 握手阶段采用 HTTP 协议。连接成功的状态码为 101，而不是 200。

- 数据格式轻量，性能开销小。客户端与服务端进行数据交换时，服务端到客户端的数据包头只有 2 到 10 字节，客户端到服务端需要加上另外 4 字节
  的掩码。HTTP 每次都需要携带完整头部。

- 更好的二进制支持，可以发送文本，和二进制数据

- 没有同源限制，客户端可以与任意服务器通信

- 协议标识符是 ws（如果加密，则是 wss），请求的地址就是后端支持 websocket 的 API。

### 4.协议头部：

示例头部如下：

    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh,zh-TW;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6
    Cache-Control: no-cache
    Connection: Upgrade
    Host: 127.0.0.1:3000
    Origin: http://localhost:3000
    Pragma: no-cache
    Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
    Sec-WebSocket-Key: bwb9SFiJONXhQ/A4pLaXIg==
    Sec-WebSocket-Version: 13
    Upgrade: websocket

- Connection: Upgrade 表示要升级协议

- Upgrade: websocket 要升级协议到 websocket 协议

- Sec-WebSocket-Version 表示 websocket 的版本。如果服务端不支持该版本，需要返回一个 Sec-WebSocket-Versionheader，里面包含服务端
  支持的版本号。

- Sec-WebSocket-Key 对应服务端响应头的 Sec-WebSocket-Accept，由于没有同源限制，websocket 客户端可任意连接支持 websocket 的服务。
  这个就相当于一个钥匙一把锁，避免多余的，无意义的连接。

- Sec-WebSocket-Accept: 用来告知服务器愿意发起一个 websocket 连接， 值根据客户端请求头的 Sec-WebSocket-Key 计算出来

## 二、websocket 前端使用 api：

### 1.WebSocket 属性

- webSocket.bufferedAmount： 检查传输数据的大小，当客户端传输大量数据时使用避免网络饱和

- WebSocket.binaryType： 使用二进制的数据类型连接

- WebSocket.protocol ： 在构造函数中使用，protocol 参数让服务端知道客户端使用的 WebSocket 协议。而 WebSocket 对象的这个属性就是
  指的最终服务端确定下来的协议名称，可以为空

- WebSocket.url ： WebSocket 的绝对路径

- WebSocket.readyState： 当前连接状态，对应的四个常量
  - WebSocket.CONNECTING: 0 未连接
  - WebSocket.OPEN: 1 连接已建立
  - WebSocket.CLOSING: 2 表示连接正在关闭
  - WebSocket.CLOSED: 3 表示连接已经关闭，或者打开连接失败。

### 2.WebSocket 方法

- WebSocket.send(data) 向服务器发送数据

- WebSocket.close() 关闭当前连接

### 3.WebSocket 实例事件

- WebSocket.onopen： 连接成功后的回调

- WebSocket.onclose： 连接关闭后的回调

- WebSocket.onerror： 连接失败后的回调

- WebSocket.onmessage： 客户端接收到服务端数据的回调
