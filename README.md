# Slidev PPT Agent Harness

[中文文档](README.zh-CN.md)

An agent-driven harness for producing high-quality Slidev presentations. Works with Cursor, Claude Code, Codex, or any LLM agent that can read markdown instructions.

## How It Works

You say what PPT you need. The agent handles everything: research, style decision, outline, slide composition, preview, and publishing.

```
/ppt-creator 帮我做一个关于 xxx 的技术分享 PPT，受众是技术团队，在内部分享会使用
```

The agent follows a 7-phase pipeline, guided by skills and design system resources in this repository.

## Commands

| Command | Description |
|---------|-------------|
| `/ppt-creator <requirement>` | Full pipeline: research → style → outline → compose → preview |
| `/ppt-review [slides-file]` | Quality review checklist with auto-fix |
| `/ppt-publish [vercel\|github-pages]` | Deploy to static hosting |

## Architecture

```
.agents/skills/          # Agent role skills (research, design, outline, compose, preview, publish, review)
.cursor/rules/           # Cursor orchestration rule
design-system/           # Tokens, archetypes, page templates, CSS classes
schemas/                 # JSON Schema contracts for agent outputs
scripts/                 # Engineering helpers (build, preview server, validation)
AGENTS.md                # Cross-platform agent behavior contract
CLAUDE.md                # Claude Code specific entry point
```

## Platform Support

| Platform | Entry Point | Trigger |
|----------|-------------|---------|
| Cursor | `.cursor/rules/ppt-harness-commands.mdc` | `/ppt-creator ...` |
| Claude Code | `CLAUDE.md` → `AGENTS.md` | Natural language or `/ppt-creator ...` |
| Codex / Others | `AGENTS.md` | Natural language |

## Setup

```bash
git clone https://github.com/Rory-X/slidev-ppt-agent.git
cd slidev-ppt-agent
npm install
```

Then open the project in your agent tool (Cursor / Claude Code / etc.) and use the commands above.

## Design System

The harness includes a complete design system based on a high-quality reference PPT:

- **Tokens**: Color palettes, typography, spacing (`design-system/tokens/`)
- **Archetypes**: Narrative structures for technical-share and pitch-deck (`design-system/archetypes/`)
- **Page Templates**: 7 Slidev code examples as design language baseline (`design-system/page-templates/`)
- **CSS Classes**: Glass-card, icon-box, section-bar, tag-badge, etc. (`design-system/styles/`)

## Skills

| Skill | Role |
|-------|------|
| `ppt-research` | Multi-dimensional WebSearch deep research |
| `ppt-design-director` | Style / archetype / token selection |
| `ppt-outline-architect` | Pyramid Principle outline generation |
| `ppt-slide-composer` | Slidev markdown composition with Bento Grid layout |
| `ppt-preview` | Build and local preview |
| `ppt-review` | Quality checklist and auto-fix |
| `ppt-publish` | Vercel / GitHub Pages deployment |
| `slidev` | Slidev syntax and overflow reference |

## License

MIT
