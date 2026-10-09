# 内容与导航设计

## 1. 目的

本文规定 Markdown 内容、页面路由、全局导航和侧栏之间的关系。目标是让内容在 macOS 本地开发和 Linux CI 上得到相同路由，并让机械检查能够给出可操作的错误。

## 2. 内容模型

### 2.1 页面源

VuePress 以 `blog/` 为 sourceDir，并只发现 `**/*.md`。`*.snippet.md`、`.vuepress` 与 `node_modules` 被排除；其他扩展名文件即使位于 `blog/` 也不会自动成为页面。

> 依据：`package.json:8-10`、`blog/.vuepress/config.ts:46-51`。

### 2.2 路径与路由

- `blog/README.md` 对应站点根入口。
- 子目录中的 `README.md` 提供该目录的可点击入口。
- 普通 Markdown 文件以相对 `blog/` 的路径形成页面路由。
- 文件名和目录名可包含中文，但导航必须逐字、逐大小写匹配。
- `base` 当前为 `/`，根路径 public 资源按站点根解析。

> 依据：`blog/.vuepress/config.ts:10`、`blog/README.md:1-9`、`blog/python/README.md:1-7`。

### 2.3 Front matter

现有内容使用 `title`、`date`、`category`、`tag`、`article`、`icon`、`layout` 等字段。目录入口常用 `article: false`，首页使用 `layout: BlogHome`。新页面应以同内容域的相邻页面为格式依据，不要凭空增加站点未消费的字段。

> 依据：`blog/README.md:1-9`、`blog/python/README.md:1-7`、`blog/.vuepress/theme.ts:33-46`。

## 3. 导航模型

### 3.1 全局导航

`navbar.ts` 通过 `navbar([...])` 定义顶栏。节点可以设置 `prefix`，子节点的相对 `link` 在该前缀下解析；外部 URL 直接离开站点。当前顶栏覆盖 Python、Go、数据库、Unix、运维工具和 LLM 等内容域。

> 依据：`blog/.vuepress/navbar.ts:3-118`。

### 3.2 侧栏

`sidebar.ts` 通过对象键选择路由前缀下的侧栏树。分组 `prefix` 与 children 中的字符串递归拼接；显式 `link` 让分组标题本身可点击。

> 依据：`blog/.vuepress/sidebar.ts:48-105`、`blog/.vuepress/sidebar.ts:189-299`。

### 3.3 解析示例

`/python` 分支设置 `prefix: "/python/"`，其“网络编程”分组再设置 `prefix: "网络编程/"`，叶子 `"Socket"` 最终对应 `blog/python/语言/网络编程/Socket.md`。验证工具必须按整棵树累积 prefix，而不是只检查叶子文本。

> 依据：`blog/.vuepress/sidebar.ts:189-224`。

## 4. 内容变更规则

### 4.1 新增文章

1. 选择已有内容域；只有形成新的稳定分类时才新增顶层目录。
2. 从同目录页面复制 front matter 形状，并填写真实元数据。
3. 图片放在文章附近的 `img/` 或 `public/`，按第 5 节选择引用方式。
4. 明确文章是否需要 navbar、sidebar 或只通过博客聚合页发现。
5. 运行内容检查；涉及插件语法时执行完整生产构建。

### 4.2 重命名与移动

文件路径就是公共 URL 的一部分。重命名或移动页面时，必须同一变更中更新 navbar、sidebar、Markdown 相对链接和图片路径。仓库当前没有重定向清单，因此默认视为破坏已有链接的变更。

### 4.3 目录入口

只有存在 `README.md` 等可解析页面时，侧栏分组才应设置目录 `link`。没有入口页面的分组可以保留 `prefix` 和 children，但不应制造可点击的空目录路由。

## 5. 资源规则

### 5.1 Public 资源

`blog/.vuepress/public/` 中的文件构建后映射到站点根路径，适合 favicon、logo 和首页公共图像。引用需考虑当前 `base: "/"`。

> 依据：`blog/.vuepress/config.ts:10-16`、`blog/README.md:10-14`。

### 5.2 文章相对资源

文章专属图片优先放在文章附近并使用相对链接，使移动影响局限在同一内容域。目标文件必须在 Git 中存在并保持大小写一致。

### 5.3 禁止伪后端路径

这是纯静态站点，没有 `/api/attachments.redirect` 处理器。此类链接除非指向完整外部域名，否则无法由仓库产物提供。目前 `blog/ai/HelloAgents/各种疑问.md` 中已有两处该类缺口。

> 依据：`blog/ai/HelloAgents/各种疑问.md:99`、`blog/ai/HelloAgents/各种疑问.md:138`。

## 6. 机械检查契约

### 6.1 `scripts/lint-content.mjs`

内容检查器应至少验证：

- navbar 和 sidebar 内部路由存在。
- 导航目标与磁盘路径大小写完全一致。
- `blog/database/**/*.md` 中每个页面都被数据库 sidebar 收录。
- Markdown 本地图片与相对链接目标存在。
- front matter 分隔符与代码围栏闭合。
- 错误消息包含文件、位置、失败原因和修复建议。

可点击目录 link 是否有 `README.md`/`index.md` 目前由人工审查；它仍是待补充的机械检查项。

数据库目录采用完整侧栏覆盖：新增、移动或重命名数据库文章时，必须在同一变更中更新对应 `children`。检查器会从 Markdown 文件反向核对 sidebar，防止页面可以访问但没有左侧菜单入口。

### 6.2 `scripts/lint-architecture.mjs`

架构检查器负责五个 VuePress TypeScript 配置模块的分层、相对依赖允许关系和循环依赖检查。两类检查的详细职责见[质量标准](../QUALITY.md)。

## 7. 已知现状

### 7.1 大小写差异

分析发现侧栏目标 `WebSocket` 对应实际 `Websocket.md`，`安装Gitlab` 对应实际 `安装GitLab.md`。默认不区分大小写的 macOS 文件系统可能掩盖问题，Linux 构建环境不会。

> 依据：`blog/.vuepress/sidebar.ts:224`、`blog/python/语言/网络编程/Websocket.md:1`、`blog/.vuepress/sidebar.ts:386`、`blog/tool/Git/安装GitLab.md:1`。

### 7.2 无入口目录

分析发现若干侧栏分组设置了目录 link，但目录下没有 `README.md`/`index.md`。修复方式有两种：新增有实际内容的目录入口，或移除分组 link，仅保留 prefix 与 children。

> 依据：`blog/.vuepress/sidebar.ts:305`、`blog/.vuepress/sidebar.ts:349-448`。

## 8. 验证矩阵

| 变更 | 最低检查 | 追加检查 |
|---|---|---|
| 正文文字 | `make lint-content` | 使用增强语法时 `make build` |
| front matter | `make lint-content` | 影响布局时 `make build` |
| 图片或本地链接 | `make lint-content` | 浏览关键页面 |
| navbar/sidebar | `make lint-content` | `make build` |
| Markdown 插件配置 | `make lint` | `make build` |

当前仓库没有自动化测试套件；上述验证是静态内容检查与生产构建，不应称为单元测试或集成测试。

## 9. 相关文档

- [架构总览](../ARCHITECTURE.md)
- [开发指南](../DEVELOPMENT.md)
- [质量标准](../QUALITY.md)
- [构建与部署设计](build-deploy.md)
