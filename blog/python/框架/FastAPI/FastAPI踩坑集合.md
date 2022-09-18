---
title: FastAPI 踩坑记录
order: 4
---

# FastAPI 踩坑记录

### OpenApi

`FastAPI` 默认通过 **CDN** 的 `swagger.js` 文件，生成对应 `openapi` 文档（_植入_）

若文档出现无法使用，如：变为 `default` ，且点不开情况，可能是 `FastAPI` 版本升级，更新了 **CDN** 上面的 `swagger.js`

- 下载特定版本，本地静态加载 `swagger.js`

- 一直使用最新的 `FastAPI` 版本

### 文件下载

`Fastapi` 返回 `FileResponse` 需要：

- 有请求头必须带 `token` 验证
- 指定 `mimetypes` 类型，或是返回二进制流等

### websocket uvicorn

> **场景：**
>
> 前端通过 `ws://x.x.x.x:xxxx/xxx` 的 `websocket` 协议请求 `FASTAPI` 时
>
> 报 `WARNING: Unsupported upgrade request.` 的情况

**原因：**

- 可能是当前的 `Fastapi` 环境中并没有支持 `websocket` 的 `upgrade` 请求
- `uvicorn 0.12.2` 版本并没有带有 `websockets`
- 客户端中的连接 `ws` 协议的 `js` 代码也报 `handshake: Unexpected response code: 400

**解决方式：**

安装带有 `websockets` 功能的 `uvicorn`

```shell
$ pip3 uninstall uvicorn  # 先把之前安装的不支持websocket的版本给卸载掉

$ pip3 install uvicorn[standard]  # 安装[standard]版本的包
```

使用 `uvicorn[standard]` 时有明确的提示，会同时安装 `websockets-8.1`

> **注意**
>
> 除了安装 `websockets` 外，在 `uvloop`，`http` 协议方面也有变化，会自动增加对 `env` 文件的支持， 除此之外，还会对 `--reloader` 有影响
>
> - 之前在进行开发时使用 `unicorn main:app` 启动项目添加 `--reloader` 选项可以实现项目热更新
>
> - 更换成了 `uvicorn[standard]` 后， `--reloader` 启动项目会报警
>
>   `WARNING WatchGodReload detected file change in \*.log`
>
>   - 可能是日志文件在本地开发时放在项目代码里，尝试把日志目录移到项目外
>   - 可能导致项目循环重启
>
> - 这是因为 `uvicorn[standard]` 热加载 依赖于 `watchdog` 模块（_github 开源项目_）
>
>   - 采用观察者模式，监控目录下文件、文件夹的变动，从而实现热加载
>   - 这个和默认的 `--reloader` 的机制也许不同
