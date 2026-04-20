# slidev-ppt-agent

[English](README.md) | [中文](README.zh-CN.md)

一条命令，让任何 AI Agent 学会做高质量 PPT，内置预览、导出和一键发布。

```bash
npx slidev-ppt-agent create my-deck
```

## 它做什么

`slidev-ppt-agent` 脚手架化一个完整的 PPT 工作区，任何 AI Agent 都能读懂。安装后，你的 Agent（Cursor、Claude Code、Codex、opencode、codebuddy 等）将获得完整的 7 阶段 PPT 制作能力：

1. **澄清** -- 理解受众、场景、目标
2. **调研** -- 多维度 WebSearch 获取事实内容
3. **风格决策** -- 匹配设计原型和视觉 Token
4. **大纲** -- 金字塔原理结构 + 校验
5. **编写** -- Slidev Markdown + Bento Grid 布局
6. **预览** -- 构建并本地启动预览
7. **审查** -- 质量清单 + 自动修复

## 快速开始

### 创建新项目

```bash
npx slidev-ppt-agent create my-deck
cd my-deck
```

创建时会询问你要为哪些 Agent 工具注册 slash command：

```
? Select agent tools to register commands for:
  [x] Claude Code       (.claude/commands/)
  [x] Cursor            (.cursor/rules/)
  [ ] Codex             (.codex/commands/)
  [ ] opencode          (.opencode/command/)
  [ ] codebuddy         (.codebuddy/commands/)
```

也可以用 `--platforms` 跳过交互：

```bash
npx slidev-ppt-agent create my-deck --platforms claude,cursor,codex
```

然后在你的 AI Agent 中打开项目，说：

```
/ppt-creator 帮我做一个关于 Kubernetes 的技术分享 PPT，受众是后端工程师
```

### 注入到已有项目

```bash
cd existing-project
npx slidev-ppt-agent init
```

## CLI 命令

| 命令 | 说明 |
|------|------|
| `create [name]` | 创建带完整 Agent 能力的新 PPT 项目 |
| `init` | 将能力注入到已有项目 |
| `update` | 升级 skills 和设计系统到最新版 |
| `build [file]` | 构建幻灯片为静态站点 |
| `preview [file]` | 开发预览（.md 文件）或静态预览（dist/） |
| `export [file]` | 导出为 PPTX、PDF 或 PNG |
| `publish` | 构建并发布到 Vercel 或 GitHub Pages |

### 导出

```bash
npx slidev-ppt-agent export slides-topic.md                    # 默认 PPTX
npx slidev-ppt-agent export slides-topic.md --format pdf       # PDF
npx slidev-ppt-agent export slides-topic.md --format png       # PNG
npx slidev-ppt-agent export --with-clicks false                # 不展开 click 步骤
```

PPTX 导出为图片格式，保留演讲备注。首次导出自动安装 `playwright-chromium`。

### 发布

首次发布运行引导式向导：

```bash
npx slidev-ppt-agent publish
```

```
? 选择发布平台
  > Vercel（推荐：全球 CDN，自动 HTTPS）
    GitHub Pages（免费，需 GitHub 仓库）

构建中... 完成
部署中... 完成

站点地址: https://my-deck.vercel.app
后续发布只需: npx slidev-ppt-agent publish
```

## 平台支持

`create`/`init` 时自动为选中的平台注册原生 slash command：

| 平台 | Command 目录 | Slash Commands |
|------|-------------|----------------|
| Claude Code | `.claude/commands/` | `/ppt-creator`、`/ppt-review`、`/ppt-publish`、`/ppt-export` |
| Cursor | `.cursor/rules/` | 通过 `alwaysApply` 规则匹配 |
| Codex | `.codex/commands/` | 同上 4 个命令 |
| opencode | `.opencode/command/` | 同上 |
| codebuddy | `.codebuddy/commands/` | 同上 |

`AGENTS.md` 作为通用 fallback，不支持原生命令的平台仍可通过它识别指令。

## 脚手架产出结构

```
my-deck/
├── .agents/
│   ├── skills/             # 9 个 Agent 技能（调研、设计、大纲、编写等）
│   └── agents/             # 6 个 Subagent 角色定义（调研员、设计总监等）
├── .claude/commands/        # Claude Code 原生 slash command
├── .cursor/rules/           # Cursor 编排规则
├── design-system/           # Token、原型、页面模板、CSS
│   ├── archetypes/          # 7 个叙事结构
│   ├── tokens/              # 5 套色彩/字体/间距/动效 Token
│   ├── page-templates/      # 15 个 Slidev 页面模板
│   ├── layouts/             # Bento Grid 布局模式（980x552 画布）
│   └── styles/              # CSS 类 + 动画预设
├── schemas/                 # JSON Schema 校验
├── scripts/                 # 工程辅助脚本
├── AGENTS.md                # 通用 Agent 入口
├── CLAUDE.md                # Claude Code 适配
├── .ppt-agent.json          # 项目配置（平台、发布设置）
└── package.json             # Slidev 依赖
```

## 设计系统

内置从专业级演示文稿提取的完整设计系统：

- **原型**: 7 个叙事结构（technical-share、pitch-deck、executive-briefing、training-workshop、quarterly-review、product-launch、research-readout）
- **Token**: 5 套语义化主题（tech-minimal、corporate-blue、pitch-modern、mono-editorial、warm-creative），含色彩/字体/间距/动效 Token
- **页面模板**: 15 个视觉模板，每个含 light/heavy 密度变体
- **布局模式**: Bento Grid 9 种画布级精确模式 + 反模式检测
- **CSS 类**: 排版阶梯（`.ppt-h1`~`.ppt-caption`）、`.glass-card`、`.metric-big`、`.ppt-table`、`.diagram-container`
- **动画策略**: 过渡决策树、叙事节奏模型、7 个 CSS 动画 + reduced-motion 兜底

## Subagent 架构

Harness 采用 Skill + Agent 双层架构：

- **Skill**（`.agents/skills/`）= 领域知识，纯指令文档
- **Agent**（`.agents/agents/`）= 执行角色，含 I/O 契约、文件归属、并行策略

| 角色 | 职责 | 可并行 |
|------|------|--------|
| researcher | 多维度深度调研 | 按维度并行搜索 |
| designer | 风格/原型/Token 决策 | 否 |
| architect | 金字塔原理大纲生成 | 否 |
| composer | Slidev 幻灯片编写 | 按大纲 Part 并行编写 |
| reviewer | 多维度质量审查 | 按审查类别并行检查 |
| engineer | 构建/预览/发布/导出 | 否 |

支持 subagent 的平台（Cursor Task tool、Claude Code Agent Teams）自动启用并行调度，不支持的平台自动 fallback 到串行执行。

## 升级

```bash
npx slidev-ppt-agent update
```

安全升级 skills、设计系统、schemas、脚本和平台命令文件。检测用户修改，覆盖前提供备份。

## 许可证

MIT
