# 质量标准

## 1. 质量目标

本仓库的主要风险不是业务逻辑回归，而是内容不可达、路由大小写错误、资源缺失、配置漂移和不可复现构建。质量门禁应优先覆盖这些可机械验证的问题。

> 依据：`blog/.vuepress/config.ts:46-74`、`blog/.vuepress/sidebar.ts:48-470`、`.github/workflows/deploy-docs.yml:35-45`。

## 2. 基本原则

### 2.1 源文件优先

只修改 Markdown、站点配置、主题源、工具脚本和工作流。不得通过编辑 `.cache/`、`.temp/` 或 `dist/` 修复问题。

### 2.2 错误必须可操作

机械检查错误应同时说明：

- WHAT：哪个文件、位置和目标失败。
- WHY：违反了哪条仓库不变量。
- HOW：给出至少一种具体修复路径。

### 2.3 诚实验证

只报告实际执行的命令与结果。仓库当前没有自动化测试套件，因此静态检查或构建成功不得写成“测试通过”。

> 依据：`package.json:7-11`。

## 3. 架构检查

### 3.1 检查器

`scripts/lint-architecture.mjs` 负责仓库结构与构建契约，不负责文章语义。它应检查：

- `client.ts`、`config.ts`、`theme.ts`、`navbar.ts`、`sidebar.ts` 五个关键入口存在且全部被分层分类。
- 配置模块的相对导入符合显式允许关系。
- 叶子配置不反向依赖组合层。
- 配置模块之间不存在循环依赖。
- 新增 VuePress TypeScript 配置模块必须先被分类，不能绕过规则。

> 架构事实来源：`package.json:8-10`、`blog/.vuepress/config.ts:1-4`、`.github/workflows/deploy-docs.yml:22-45`。

### 3.2 不应检查的内容

架构检查器不应把文章中的 Python import、Redis URL 或 Docker 命令识别成站点运行时依赖；页面发现只选择 Markdown。

> 依据：`blog/.vuepress/config.ts:46-51`。

## 4. 内容检查

### 4.1 检查器

`scripts/lint-content.mjs` 应验证：

- navbar/sidebar 目标存在且大小写一致。
- database 下的每个 Markdown 页面都被数据库 sidebar 收录。
- Markdown 本地链接和图片目标存在。
- 站内根路径不依赖不存在的后端 API。
- front matter 分隔符闭合。
- Markdown 代码围栏闭合。
- 错误按源文件定位，不把生成页面作为修复目标。

分组目录是否存在 `README.md`/`index.md` 目前仍是已知检查缺口；现阶段由设计文档约束和人工审查覆盖。

### 4.2 路由大小写

检查必须区分大小写，即使运行机器的文件系统不区分大小写。当前侧栏已有 `WebSocket`/`Websocket.md` 和 `安装Gitlab`/`安装GitLab.md` 两类差异，可作为规则应捕获的真实样例。

> 依据：`blog/.vuepress/sidebar.ts:224`、`blog/python/语言/网络编程/Websocket.md:1`、`blog/.vuepress/sidebar.ts:386`、`blog/tool/Git/安装GitLab.md:1`。

### 4.3 资源完整性

相对图片必须存在；public 资源必须从根路径解析。纯静态站点无法实现本站 `/api/attachments.redirect`，检查器应把这类引用报告为不可解析。

> 依据：`blog/.vuepress/config.ts:10`、`blog/ai/HelloAgents/各种疑问.md:99`、`blog/ai/HelloAgents/各种疑问.md:138`。

## 5. 构建质量

### 5.1 可复现安装

标准安装为 `pnpm install --frozen-lockfile`。CI 使用 pnpm 10.34.6 和 Node 22.18；本地验证应与该版本组合一致。不得在常规 setup 中自动执行 `pnpm update`。

> 依据：`.github/workflows/deploy-docs.yml:22-35`、`script/run.sh:6-8`。

### 5.2 生产构建

标准构建使用：

```bash
NODE_OPTIONS=--max_old_space_size=8192 pnpm run docs:build
```

生产输出必须来自源文件重新生成，不得依赖仓库中旧的 `dist/`。

> 依据：`.github/workflows/deploy-docs.yml:38-45`。

## 6. Makefile 门禁

### 6.1 标准目标

| 目标 | 组成 | 适用场景 |
|---|---|---|
| `make lint-arch` | 架构检查器 | 工具、配置、工作流变更 |
| `make lint-content` | 内容检查器 | 文章、导航、资源变更 |
| `make lint` | 两个检查器 | 跨层变更 |
| `make build` | 生产构建 | 渲染、主题、依赖变更 |
| `make verify` | lint + build | 合并前完整门禁 |

### 6.2 短路原则

`make verify` 应先运行快速、定位清楚的静态检查，再执行高成本生产构建。任一阶段失败都应返回非零状态。

## 7. 变更验证矩阵

| 变更范围 | 必需验证 | 说明 |
|---|---|---|
| `docs/**/*.md` | 文档链接检查 | 工程文档不进入 VuePress sourceDir |
| `blog/**/*.md` | `make lint-content` | 使用增强语法或布局时加 build |
| `navbar.ts`、`sidebar.ts` | `make lint-content` + build | 同时覆盖目标与配置解析 |
| `config.ts`、`theme.ts`、`styles/` | `make verify` | 影响全站 |
| `package.json`、锁文件 | frozen install + `make verify` | 防止依赖图漂移 |
| workflow、Makefile、lint 脚本 | `make verify` | 验证门禁自身 |

## 8. 内容安全

### 8.1 凭据与访问码

文章示例不得提交真实可用凭据。环境分析已在 `blog/python/生态/异步任务/celery_task.py:8` 发现凭据样式的 Redis URI；值不应复制到文档或日志，并应另行完成脱敏与轮换评估。

主题中的页面访问码属于客户端静态配置，只能作为轻量提示，不能保护秘密内容。

> 依据：`blog/python/生态/异步任务/celery_task.py:8`、`blog/.vuepress/theme.ts:86-90`。

### 8.2 外部依赖

浏览器运行时依赖 AliCDN 图标样式；失效时自定义图标可能缺失，但核心静态页面仍应可阅读。外部资源变更应检查降级表现。

> 依据：`blog/.vuepress/config.ts:20-27`。

## 9. 已知缺口与处置

| 缺口 | 风险 | 推荐处置 |
|---|---|---|
| 生成目录已跟踪 | diff 和搜索噪声 | ignore 已修正；另开变更清理 Git 索引 |
| pnpm/npm 双锁文件 | 依赖解析分歧 | 保持 pnpm 权威并单独决策 npm 锁 |
| 部署未复用 PR job | 发布与 PR 验证可能漂移 | 后续让部署显式依赖同一验证接口 |
| 无测试套件 | 无行为级自动回归 | 不虚构测试；优先补内容检查与构建门禁 |
| RC 版本组合 | 升级兼容风险 | 依赖升级必须完整构建并审查页面 |

> 依据：`.gitignore:4`、`package-lock.json:4`、`.github/workflows/deploy-docs.yml:4-6`、`package.json:15-23`。

## 10. 完成标准

- 文件位于正确层，生成目录没有手工变更。
- 路由、资源、front matter 和配置通过相应静态检查。
- 高风险变更完成带 CI heap 设置的生产构建。
- 输出清楚区分 lint、build 与不存在的 tests。
- 已知失败、未执行项和外部限制被如实记录。

## 11. 相关文档

- [架构总览](ARCHITECTURE.md)
- [开发指南](DEVELOPMENT.md)
- [内容与导航设计](design-docs/content-navigation.md)
- [构建与部署设计](design-docs/build-deploy.md)
