<template><div><h1 id="fastapi-进阶使用" tabindex="-1"><a class="header-anchor" href="#fastapi-进阶使用" aria-hidden="true">#</a> FastApi | 进阶使用</h1>
<h2 id="一、websocket" tabindex="-1"><a class="header-anchor" href="#一、websocket" aria-hidden="true">#</a> 一、websocket</h2>
<p><a href="https://www.starlette.io/websockets/" target="_blank" rel="noopener noreferrer">https://www.starlette.io/websockets/<ExternalLinkIcon/></a>
<a href="https://www.starlette.io/endpoints/#websocketendpoint" target="_blank" rel="noopener noreferrer">https://www.starlette.io/endpoints/#websocketendpoint<ExternalLinkIcon/></a></p>
<h3 id="_1-websocket-基本使用" tabindex="-1"><a class="header-anchor" href="#_1-websocket-基本使用" aria-hidden="true">#</a> 1.websocket 基本使用：</h3>
<p>####（1）前端创建 websocket
首先前端需要建立一个 websocket 连接如下：</p>
<pre><code>html = &quot;&quot;&quot;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Chat&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;WebSocket Chat&lt;/h1&gt;
        &lt;form action=&quot;&quot; onsubmit=&quot;sendMessage(event)&quot;&gt;
            &lt;input type=&quot;text&quot; id=&quot;messageText&quot; autocomplete=&quot;off&quot;/&gt;
            &lt;button&gt;Send&lt;/button&gt;
        &lt;/form&gt;
        &lt;ul id='messages'&gt;
        &lt;/ul&gt;
        &lt;script&gt;
            var ws = new WebSocket(&quot;ws://localhost:8000/ws&quot;);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById(&quot;messageText&quot;)
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
&quot;&quot;&quot;
</code></pre>
<h4 id="_2-先暂用-fastapi-自带渲染" tabindex="-1"><a class="header-anchor" href="#_2-先暂用-fastapi-自带渲染" aria-hidden="true">#</a> （2）先暂用 fastapi 自带渲染：</h4>
<pre><code>@app.get(&quot;/&quot;)
async def get():
return HTMLResponse(html)
</code></pre>
<h4 id="_3-后端建立路由" tabindex="-1"><a class="header-anchor" href="#_3-后端建立路由" aria-hidden="true">#</a> （3）后端建立路由</h4>
<pre><code>@app.websocket(&quot;/ws&quot;)
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f&quot;Message text was: {data}&quot;)
</code></pre>
<ul>
<li>
<p>@app.websocket：建立 websocket 的装饰器，/ws 是和前端通信的地址</p>
</li>
<li>
<p>accept()： 当浏览器发送请求时初始化 websocket 连接</p>
</li>
<li>
<p>receive_text()：等待获取 websocket 客户端发送过来的数据</p>
</li>
<li>
<p>send_text(): 向前端浏览器发送内容</p>
</li>
</ul>
<h3 id="_2-进阶使用" tabindex="-1"><a class="header-anchor" href="#_2-进阶使用" aria-hidden="true">#</a> 2.进阶使用</h3>
<h4 id="_1-前端-token-建立连接" tabindex="-1"><a class="header-anchor" href="#_1-前端-token-建立连接" aria-hidden="true">#</a> （1）前端 token 建立连接：</h4>
<pre><code>from fastapi import Cookie, Depends, FastAPI, Query, WebSocket, status
from fastapi.responses import HTMLResponse

app = FastAPI()

html = &quot;&quot;&quot;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Chat&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;WebSocket Chat&lt;/h1&gt;
        &lt;form action=&quot;&quot; onsubmit=&quot;sendMessage(event)&quot;&gt;
            &lt;label&gt;Item ID: &lt;input type=&quot;text&quot; id=&quot;itemId&quot; autocomplete=&quot;off&quot; value=&quot;foo&quot;/&gt;&lt;/label&gt;
            &lt;label&gt;Token: &lt;input type=&quot;text&quot; id=&quot;token&quot; autocomplete=&quot;off&quot; value=&quot;some-key-token&quot;/&gt;&lt;/label&gt;
            &lt;button onclick=&quot;connect(event)&quot;&gt;Connect&lt;/button&gt;
            &lt;hr&gt;
            &lt;label&gt;Message: &lt;input type=&quot;text&quot; id=&quot;messageText&quot; autocomplete=&quot;off&quot;/&gt;&lt;/label&gt;
            &lt;button&gt;Send&lt;/button&gt;
        &lt;/form&gt;
        &lt;ul id='messages'&gt;
        &lt;/ul&gt;
        &lt;script&gt;
        var ws = null;
            function connect(event) {
                var itemId = document.getElementById(&quot;itemId&quot;)
                var token = document.getElementById(&quot;token&quot;)
                ws = new WebSocket(&quot;ws://localhost:8000/items/&quot; + itemId.value + &quot;/ws?token=&quot; + token.value);
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
                var input = document.getElementById(&quot;messageText&quot;)
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;
&quot;&quot;&quot;
</code></pre>
<h4 id="_2-后端-token-建立连接" tabindex="-1"><a class="header-anchor" href="#_2-后端-token-建立连接" aria-hidden="true">#</a> （2）后端 token 建立连接：</h4>
<pre><code>async def get_cookie_or_token(
    websocket: WebSocket, session: str = Cookie(None), token: str = Query(None)
):
    if session is None and token is None:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
    return session or token


@app.websocket(&quot;/items/{item_id}/ws&quot;)
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
            f&quot;Session cookie or query token value is: {cookie_or_token}&quot;
        )
        if q is not None:
            await websocket.send_text(f&quot;Query parameter q is: {q}&quot;)
        await websocket.send_text(f&quot;Message text was: {data}, for item ID: {item_id}&quot;)
</code></pre>
<ul>
<li>id &amp; session &amp; token: 可以通过建立连接拿到路径参数 id、Cookie 中的 session 或 token 之类，或通过查询参数拿到 token</li>
</ul>
<h2 id="二、事件-启动关闭" tabindex="-1"><a class="header-anchor" href="#二、事件-启动关闭" aria-hidden="true">#</a> 二、事件-启动关闭</h2>
<p>可以在应用程序启动前或应用程序关闭时 来执行事件处理程序
<a href="https://fastapi.tiangolo.com/advanced/events/" target="_blank" rel="noopener noreferrer">https://fastapi.tiangolo.com/advanced/events/<ExternalLinkIcon/></a></p>
<h3 id="_1-startup-事件" tabindex="-1"><a class="header-anchor" href="#_1-startup-事件" aria-hidden="true">#</a> 1.startup 事件</h3>
<p>用来在应用程序启动前添加的功能，需要声明 &quot;startup&quot;</p>
<pre><code>import asyncio
from fastapi import FastAPI

app = FastAPI()

@app.on_event(&quot;startup&quot;)
async def startup_event():
    while True:
        await asyncio.sleep(1)
        print(111)
</code></pre>
<p>普遍情况，这玩意用于注册或是启动某些东西，或是提前执行某些动作来使用的，可以添加多个事件处理函数。</p>
<p>[注]：在所有 startup 事件处理程序完成之前，应用程序将不会开始接收请求。（如上是个死循环就会一直卡死，不会响应请求）</p>
<h3 id="_2-shutdown-事件" tabindex="-1"><a class="header-anchor" href="#_2-shutdown-事件" aria-hidden="true">#</a> 2.shutdown 事件</h3>
<p>在应用程序启动关闭时运行的功能，需要声明 &quot;shutdown&quot;：</p>
<pre><code>@app.on_event(&quot;shutdown&quot;)
def shutdown_event():
    with open(&quot;log.txt&quot;, mode=&quot;a&quot;) as log:
        log.write(&quot;Application shutdown&quot;)
</code></pre>
<p>shutdown 事件处理函数会将 &quot;Application shutdown&quot; 文本写入 log.txt 文件。用于应用程序结束后执行的某些动作。</p>
</div></template>


