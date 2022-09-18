---
title: FastAPI进阶
order: 3
---

# FastApi | 进阶使用

## 一、websocket

https://www.starlette.io/websockets/
https://www.starlette.io/endpoints/#websocketendpoint

### 1.websocket 基本使用：

####（1）前端创建 websocket
首先前端需要建立一个 websocket 连接如下：

    html = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Chat</title>
        </head>
        <body>
            <h1>WebSocket Chat</h1>
            <form action="" onsubmit="sendMessage(event)">
                <input type="text" id="messageText" autocomplete="off"/>
                <button>Send</button>
            </form>
            <ul id='messages'>
            </ul>
            <script>
                var ws = new WebSocket("ws://localhost:8000/ws");
                ws.onmessage = function(event) {
                    var messages = document.getElementById('messages')
                    var message = document.createElement('li')
                    var content = document.createTextNode(event.data)
                    message.appendChild(content)
                    messages.appendChild(message)
                };
                function sendMessage(event) {
                    var input = document.getElementById("messageText")
                    ws.send(input.value)
                    input.value = ''
                    event.preventDefault()
                }
            </script>
        </body>
    </html>
    """

#### （2）先暂用 fastapi 自带渲染：

    @app.get("/")
    async def get():
    return HTMLResponse(html)

#### （3）后端建立路由

    @app.websocket("/ws")
    async def websocket_endpoint(websocket: WebSocket):
        await websocket.accept()
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message text was: {data}")

- @app.websocket：建立 websocket 的装饰器，/ws 是和前端通信的地址

- accept()： 当浏览器发送请求时初始化 websocket 连接

- receive_text()：等待获取 websocket 客户端发送过来的数据

- send_text(): 向前端浏览器发送内容

### 2.进阶使用

#### （1）前端 token 建立连接：

    from fastapi import Cookie, Depends, FastAPI, Query, WebSocket, status
    from fastapi.responses import HTMLResponse

    app = FastAPI()

    html = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Chat</title>
        </head>
        <body>
            <h1>WebSocket Chat</h1>
            <form action="" onsubmit="sendMessage(event)">
                <label>Item ID: <input type="text" id="itemId" autocomplete="off" value="foo"/></label>
                <label>Token: <input type="text" id="token" autocomplete="off" value="some-key-token"/></label>
                <button onclick="connect(event)">Connect</button>
                <hr>
                <label>Message: <input type="text" id="messageText" autocomplete="off"/></label>
                <button>Send</button>
            </form>
            <ul id='messages'>
            </ul>
            <script>
            var ws = null;
                function connect(event) {
                    var itemId = document.getElementById("itemId")
                    var token = document.getElementById("token")
                    ws = new WebSocket("ws://localhost:8000/items/" + itemId.value + "/ws?token=" + token.value);
                    ws.onmessage = function(event) {
                        var messages = document.getElementById('messages')
                        var message = document.createElement('li')
                        var content = document.createTextNode(event.data)
                        message.appendChild(content)
                        messages.appendChild(message)
                    };
                    event.preventDefault()
                }
                function sendMessage(event) {
                    var input = document.getElementById("messageText")
                    ws.send(input.value)
                    input.value = ''
                    event.preventDefault()
                }
            </script>
        </body>
    </html>
    """

#### （2）后端 token 建立连接：

    async def get_cookie_or_token(
        websocket: WebSocket, session: str = Cookie(None), token: str = Query(None)
    ):
        if session is None and token is None:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return session or token


    @app.websocket("/items/{item_id}/ws")
    async def websocket_endpoint(
        websocket: WebSocket,
        item_id: str,
        q: int = None,
        cookie_or_token: str = Depends(get_cookie_or_token),
    ):
        await websocket.accept()
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(
                f"Session cookie or query token value is: {cookie_or_token}"
            )
            if q is not None:
                await websocket.send_text(f"Query parameter q is: {q}")
            await websocket.send_text(f"Message text was: {data}, for item ID: {item_id}")

- id & session & token: 可以通过建立连接拿到路径参数 id、Cookie 中的 session 或 token 之类，或通过查询参数拿到 token

## 二、事件-启动关闭

可以在应用程序启动前或应用程序关闭时 来执行事件处理程序
https://fastapi.tiangolo.com/advanced/events/

### 1.startup 事件

用来在应用程序启动前添加的功能，需要声明 "startup"

    import asyncio
    from fastapi import FastAPI

    app = FastAPI()

    @app.on_event("startup")
    async def startup_event():
        while True:
            await asyncio.sleep(1)
            print(111)

普遍情况，这玩意用于注册或是启动某些东西，或是提前执行某些动作来使用的，可以添加多个事件处理函数。

[注]：在所有 startup 事件处理程序完成之前，应用程序将不会开始接收请求。（如上是个死循环就会一直卡死，不会响应请求）

### 2.shutdown 事件

在应用程序启动关闭时运行的功能，需要声明 "shutdown"：

    @app.on_event("shutdown")
    def shutdown_event():
        with open("log.txt", mode="a") as log:
            log.write("Application shutdown")

shutdown 事件处理函数会将 "Application shutdown" 文本写入 log.txt 文件。用于应用程序结束后执行的某些动作。
