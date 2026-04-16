# Slidev PPT Agent Harness

一套 Agent 驱动的 PPT 生产编排工具。适用于 Cursor、Claude Code、Codex 或任何能读 Markdown 指令的 LLM Agent。

## 工作方式

你描述需求，Agent 自动完成全流程：调研 → 风格决策 → 大纲 → Slides 编写 → 预览 → 发布。

```
/ppt-creator 帮我做一个关于 xxx 的技术分享 PPT，受众是技术团队，在内部分享会使用
```

## 命令

| 命令 | 说明 |
|------|------|
| `/ppt-creator <需求描述>` | 全流程：调研 → 风格 → 大纲 → 编写 → 预览 |
| `/ppt-review [slides文件]` | 质量审查 + 自动修复 |
| `/ppt-publish [vercel\|github-pages]` | 发布到静态托管 |

## 架构

```
.agents/skills/          # Agent 角色技能（调研/设计/大纲/编写/预览/审查/发布）
.cursor/rules/           # Cursor 编排规则
design-system/           # 设计系统（token/模板/CSS/动画）
schemas/                 # 产物格式契约（JSON Schema）
scripts/                 # 工程辅助脚本（构建/预览/校验）
AGENTS.md                # 跨平台 Agent 行为合约
CLAUDE.md                # Claude Code 入口
```

## 平台支持

| 平台 | 入口文件 | 触发方式 |
|------|----------|----------|
| Cursor | `.cursor/rules/ppt-harness-commands.mdc` | `/ppt-creator ...` |
| Claude Code | `CLAUDE.md` → `AGENTS.md` | 自然语言或 `/ppt-creator ...` |
| Codex / 其他 | `AGENTS.md` | 自然语言 |

## 快速开始

```bash
git clone https://github.com/Rory-X/slidev-ppt-agent.git
cd slidev-ppt-agent
npm install
```

用 Cursor / Claude Code 打开项目，发送命令即可。

## 设计系统

基于高质量参考 PPT 提取的视觉规范，定义审美下限而非创意上限：

- **Token**：配色/字体/间距 (`design-system/tokens/`)
- **叙事模板**：技术分享/路演 (`design-system/archetypes/`)
- **页面范例**：7 种页面类型的 Slidev 代码示范 (`design-system/page-templates/`)
- **CSS 组件**：glass-card / icon-box / section-bar / tag-badge 等 (`design-system/styles/`)

## 技能清单

| 技能 | 职责 |
|------|------|
| `ppt-research` | 多维 WebSearch 深度调研 |
| `ppt-design-director` | 风格 / archetype / token 选择 |
| `ppt-outline-architect` | 金字塔原理大纲生成 |
| `ppt-slide-composer` | Slidev Markdown 编写（Bento Grid 布局） |
| `ppt-preview` | 构建与本地预览 |
| `ppt-review` | 质量审查与自动修复 |
| `ppt-publish` | Vercel / GitHub Pages 发布 |
| `slidev` | Slidev 语法与溢出防护参考 |

## 核心原则

- **LLM 做内容**：调研、大纲、风格决策、Slides 编写全部由 Agent 完成
- **Harness 做约束**：Skills / Rules / Schemas 告诉 Agent 该做什么、按什么标准
- **脚本做工程**：只保留 Agent 做不了的事（构建/预览/部署/校验）
- **设计系统定下限**：范例定义审美基线，鼓励模型发挥创造力

## License

MIT
