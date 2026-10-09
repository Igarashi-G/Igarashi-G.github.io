# 开发指南

## 1. 前置条件

### 1.1 支持工具链

以 CI 和 `package.json` 的可复现环境为准：Node.js 22.18+ 和 pnpm 10.34.6。`.node-version` 可供版本管理器直接读取；VuePress 2.0.0-rc.31 不支持更早的 Node 版本。

> 依据：`.github/workflows/deploy-docs.yml:22-32`、`pnpm-lock.yaml:4852`。

### 1.2 无需本地服务

该项目不需要数据库、Redis、消息队列、容器或 `.env` 文件。文章中出现的这些技术是内容，不是站点构建依赖。安装依赖时需要访问锁文件指向的 npm registry。

> 依据：`package.json:13-24`、`blog/.vuepress/config.ts:46-51`。

## 2. 初次设置

### 2.1 标准接口

```bash
make setup
```

`make setup` 使用 `npx pnpm@10.34.6 install --frozen-lockfile`，可在机器仍装有旧 pnpm 时自举正确版本，且不会更新依赖。已经安装 pnpm 10.34.6 的环境可使用 `make setup PNPM=pnpm`。

### 2.2 辅助脚本

`script/run.sh` 现在只委托 `make setup` 和 `make dev`，不会安装全局工具或擅自更新依赖。标准接口仍以 Makefile 为准。

> 依据：`script/run.sh:1-8`、`.github/workflows/deploy-docs.yml:35`。

## 3. 本地开发

### 3.1 启动服务器

```bash
make dev
# 当前底层命令：pnpm run docs:dev
```

`make dev` 默认在 `127.0.0.1:8080` 提供静态开发站点，可用 `HOST` 和 `PORT` 覆盖，例如 `make dev HOST=0.0.0.0 PORT=8081`。Makefile 会直接透传参数，不再向 VuePress 传入多余的 `--`。没有 `/health` 接口；需要自动等待时轮询根页面。

### 3.2 清缓存启动

配置或插件变更后若出现陈旧页面，使用：

```bash
pnpm run docs:clean-dev
```

该命令向 VuePress 传入 `--clean-cache`。

> 依据：`package.json:9-10`。

## 4. 构建

### 4.1 标准构建

```bash
make build
```

预期等价于：

```bash
NODE_OPTIONS=--max_old_space_size=8192 pnpm run docs:build
```

`pnpm run build` 是同一 VuePress 构建的别名。输出写入 `blog/.vuepress/dist/`。

> 依据：`package.json:8-9`、`.github/workflows/deploy-docs.yml:38-45`。

### 4.2 构建副作用

开发和构建可能重写：

- `blog/.vuepress/.cache/`
- `blog/.vuepress/.temp/`
- `blog/.vuepress/dist/`

它们都是可再生目录，不应手工修补，也不应把其变化当作源代码修改提交。

## 5. 质量命令

### 5.1 Makefile 目标契约

| 命令 | 预期行为 |
|---|---|
| `make setup` | frozen-lockfile 安装依赖 |
| `make dev` | 启动 VuePress 开发服务器 |
| `make build` | 使用 CI heap 配置执行生产构建 |
| `make lint-arch` | 运行 `scripts/lint-architecture.mjs` |
| `make lint-content` | 运行 `scripts/lint-content.mjs` |
| `make lint` | 依次执行两个静态检查器 |
| `make test` | 兼容入口；当前等同于 `make lint`，不代表存在单元测试 |
| `make verify` | 静态检查通过后执行生产构建 |

这是仓库级稳定接口的预期定义；命令是否可用须以当前 `Makefile` 为准。

### 5.2 当前测试状态

仓库没有 package `test` 脚本、测试文件约定或自动化单元测试套件。`make test` 只是静态 lint 的兼容别名；当前最高置信度验证是 `make verify` 的静态检查加生产构建，不能表述为“单元测试通过”。

> 依据：`package.json:7-11`。

## 6. 常见变更工作流

### 6.1 新增文章

1. 在正确的 `blog/<内容域>/` 路径新增 Markdown。
2. 使用现有同目录页面作为 front matter 范例。
3. 若文章需要可发现入口，更新 `navbar.ts` 或 `sidebar.ts`。
4. 运行 `make lint-content`；使用新 Markdown 能力时再运行 `make verify`。

详细规则见[内容与导航设计](design-docs/content-navigation.md)。

### 6.2 修改导航

1. 确认目标 Markdown 已存在。
2. 逐字匹配 Unicode、空格和大小写。
3. 用父级 `prefix` 推导完整路由，不要只检查叶子字符串。
4. 运行 `make lint-content`；导航配置解析变化时运行 `make verify`。

### 6.3 修改配置或依赖

修改 `config.ts`、`theme.ts`、`package.json`、锁文件或部署工作流后运行 `make verify`。依赖变更只用 pnpm 更新 `pnpm-lock.yaml`，不要无意中刷新 `package-lock.json`。

> 依据：`.github/workflows/deploy-docs.yml:22-38`。

## 7. 内容与配置边界

### 7.1 `blog/` 内容

Markdown 和文章图片属于内容层。代码块或 `.py` 示例不会因为位于 `blog/` 就变成站点运行时；页面发现只包含 Markdown。

### 7.2 `blog/.vuepress/` 配置

- `config.ts`：站点入口、搜索、页面发现和 bundler。
- `theme.ts`：主题、博客聚合和 Markdown 能力。
- `client.ts`：保留旧 `<PDF>` 标签的轻量客户端兼容组件。
- `navbar.ts`：顶层全局导航。
- `sidebar.ts`：内容域侧栏。
- `styles/`：主题样式覆盖。
- `public/`：原样复制的根路径资源。

> 依据：`blog/.vuepress/config.ts:1-74`、`blog/.vuepress/theme.ts:1-251`。

## 8. 故障排查

### 8.1 内存不足

生产构建使用 8192 MiB heap。出现 JavaScript heap out of memory 时，确认通过 `make build` 或带 `NODE_OPTIONS=--max_old_space_size=8192` 的命令运行。

### 8.2 本地可用而 CI 路由失效

优先检查文件名大小写。macOS 默认文件系统可能隐藏 `WebSocket`/`Websocket` 一类差异，而 Linux CI 会区分。

### 8.3 PDF 页面

Theme Hope 新版本不再提供旧 `<PDF>` 组件。仓库通过 `blog/.vuepress/client.ts` 将现有标签映射为 iframe，不需要修改历史文章；若未来需要更复杂的 PDF 工具栏，再评估专用 viewer。

### 8.4 页面或样式陈旧

先停止开发服务器，再运行 `pnpm run docs:clean-dev`。该命令会让 VuePress 清理缓存后重新启动开发服务器。

## 9. 提交前检查

- `git diff` 中没有无关用户改动或生成文件噪声。
- 导航与本地资源目标存在且大小写一致。
- 没有把访问码、令牌或真实凭据加入文章示例。
- 已运行与风险匹配的命令，并记录真实结果。
- 没有把“生产构建通过”描述成“测试通过”。

完整矩阵见[质量标准](QUALITY.md)。
