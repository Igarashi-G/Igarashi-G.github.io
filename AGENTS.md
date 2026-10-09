# Igarashi Blog Agent 导航

本文是仓库地图，不是开发手册。细节、理由和验证方法位于下列文档。

## 1. 快速入口

| 编号 | 文档 | 用途 |
|---|---|---|
| 1.1 | [架构总览](docs/ARCHITECTURE.md) | 系统边界、数据流、目录职责 |
| 1.2 | [开发指南](docs/DEVELOPMENT.md) | 环境、命令、常见故障 |
| 1.3 | [质量标准](docs/QUALITY.md) | 检查项、变更验证矩阵 |
| 1.4 | [内容与导航设计](docs/design-docs/content-navigation.md) | 文章、路由、导航约束 |
| 1.5 | [构建与部署设计](docs/design-docs/build-deploy.md) | 构建产物、CI、发布边界 |

## 2. 项目定位

- 本仓库是 VuePress 2 静态博客，不是 Python、Go 或数据库应用。
- `blog/` 是页面内容源；其中的代码示例通常只是文章素材。
- `blog/.vuepress/` 是站点、主题、导航、样式和公共资源配置根。
- `package.json` 提供 VuePress 开发与生产构建入口。
- `.github/workflows/deploy-docs.yml` 将生产产物发布到 GitHub Pages。

> 依据：`package.json:7-23`、`blog/.vuepress/config.ts:1-74`、`.github/workflows/deploy-docs.yml:4-48`。

## 3. 目录地图

| 编号 | 路径 | 所有权与编辑规则 |
|---|---|---|
| 3.1 | `blog/**/*.md` | 文章与页面；路径会参与路由 |
| 3.2 | `blog/**/img/` | 与文章同目录解析的图片资源 |
| 3.3 | `blog/.vuepress/config.ts` | VuePress、搜索、页面扫描和 Vite 配置 |
| 3.4 | `blog/.vuepress/theme.ts` | Hope 主题与 Markdown 增强配置 |
| 3.5 | `blog/.vuepress/client.ts` | 客户端兼容组件与增强逻辑 |
| 3.6 | `blog/.vuepress/navbar.ts` | 手工维护的全局导航树 |
| 3.7 | `blog/.vuepress/sidebar.ts` | 手工维护的路由前缀侧栏 |
| 3.8 | `blog/.vuepress/styles/` | 主题样式覆盖 |
| 3.9 | `blog/.vuepress/public/` | 构建时复制到站点根路径的源资源 |
| 3.10 | `docs/` | 面向维护者与 Agent 的工程文档 |
| 3.11 | `scripts/` | 仓库级机械检查器 |

## 4. 生成目录边界

- 不要手工编辑 `blog/.vuepress/.cache/`。
- 不要手工编辑 `blog/.vuepress/.temp/`。
- 不要手工编辑 `blog/.vuepress/dist/`。
- 上述目录由开发服务器或构建重新生成；需要修复时修改内容、配置或检查脚本。
- 当前这些目录存在已跟踪文件，清理 Git 索引必须作为独立、可审查的任务处理。

> 依据：`package.json:8-10`、`.github/workflows/deploy-docs.yml:45`、`.gitignore:4`。

## 5. 变更路由

| 编号 | 任务 | 首先阅读 | 主要修改位置 |
|---|---|---|---|
| 5.1 | 新增或编辑文章 | [内容与导航设计](docs/design-docs/content-navigation.md) | `blog/**/*.md` |
| 5.2 | 调整顶栏或侧栏 | [内容与导航设计](docs/design-docs/content-navigation.md) | `navbar.ts`、`sidebar.ts` |
| 5.3 | 修改 Markdown 能力 | [架构总览](docs/ARCHITECTURE.md) | `theme.ts` |
| 5.4 | 修改搜索或页面发现 | [架构总览](docs/ARCHITECTURE.md) | `config.ts` |
| 5.5 | 修改构建或部署 | [构建与部署设计](docs/design-docs/build-deploy.md) | `package.json`、工作流 |
| 5.6 | 修改质量门禁 | [质量标准](docs/QUALITY.md) | `scripts/lint-*.mjs`、`Makefile` |

## 6. 工具链契约

- 复现环境以 Node.js 22.18+ 和 pnpm 10.34.6 为准。
- 依赖安装使用 `pnpm install --frozen-lockfile`；`pnpm-lock.yaml` 是部署采用的锁文件。
- 生产构建使用 `NODE_OPTIONS=--max_old_space_size=8192 pnpm run docs:build`。
- 当前仓库未配置自动化测试套件，不要声称或虚构测试结果。

> 依据：`.github/workflows/deploy-docs.yml:22-38`、`pnpm-lock.yaml:1`、`package.json:7-11`。

## 7. 标准命令地图

| 编号 | 命令 | 预期职责 |
|---|---|---|
| 7.1 | `make setup` | frozen-lockfile 安装依赖 |
| 7.2 | `make dev` | 启动 VuePress 开发服务器 |
| 7.3 | `make build` | 生成 `blog/.vuepress/dist/` |
| 7.4 | `make lint-arch` | 运行 `scripts/lint-architecture.mjs` |
| 7.5 | `make lint-content` | 运行 `scripts/lint-content.mjs` |
| 7.6 | `make lint` | 运行全部静态检查 |
| 7.7 | `make verify` | 静态检查后执行生产构建 |
| 7.8 | `make test` | 兼容入口，当前等同静态 lint，不代表单元测试 |

命令是否已落地以当前 `Makefile` 为准；完整说明见[开发指南](docs/DEVELOPMENT.md)。

## 8. 核心不变量

- 内容文件名、目录名和导航目标必须逐字匹配大小写。
- 导航中的内部目标必须解析到 Markdown 页面或有效目录入口。
- Markdown 本地图片必须存在；不要依赖本站不存在的 `/api/` 处理器。
- `pagePatterns` 仅把 Markdown 纳入页面发现，不要把文章中的示例程序当成应用入口。
- public 资源使用根路径引用；同目录图片优先使用相对路径。
- 页面访问码位于客户端静态配置，不得视为秘密保护。

> 依据：`blog/.vuepress/config.ts:46-51`、`blog/.vuepress/theme.ts:86-90`、`blog/.vuepress/sidebar.ts:48-470`。

## 9. 验证选择

- 只改工程文档：检查链接目标与文档约束。
- 改文章：运行内容检查；涉及渲染能力时再执行生产构建。
- 改导航、配置、依赖或工作流：运行 `make verify`。
- 若标准接口尚未落地，至少运行 `pnpm run docs:build`，并明确未覆盖的检查。
- 构建会写生成目录；不要把生成文件混入源代码变更。

## 10. 已知风险入口

- 生成目录已被跟踪；虽然 ignore 路径已修正，仍需单独清理 Git 索引。
- 仓库同时存在 pnpm 与 npm 锁文件；部署只使用 pnpm。
- `blog/deploy/start.sh` 提到未声明的 `pnpm run serve`。
- 现有侧栏含大小写不匹配和缺少目录入口的目标。
- 文章示例中可能出现凭据样式文本；提交前按[质量标准](docs/QUALITY.md)审查。

## 11. 完成定义

- 变更位于正确的源目录，未直接编辑生成目录。
- 相对链接、资源路径、导航目标和文件名大小写一致。
- 执行与风险匹配的验证，报告真实命令与结果。
- 未执行的检查、现存失败和无测试套件状态均明确披露。
