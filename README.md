# slidev-ppt-agent

[English](README.md) | [中文](README.zh-CN.md)

One command to give any AI agent the ability to create high-quality Slidev presentations, with built-in preview, export, and one-click publishing.

```bash
npx slidev-ppt-agent create my-deck
```

## What It Does

`slidev-ppt-agent` scaffolds a complete PPT workspace that any AI agent can understand. After setup, your agent (Cursor, Claude Code, Codex, opencode, codebuddy, or any AGENTS.md-compatible tool) gains a full 7-phase presentation pipeline:

1. **Clarify** -- understand audience, scenario, and goal
2. **Research** -- multi-dimensional web search for factual content
3. **Style Decision** -- match design archetype and visual tokens
4. **Outline** -- Pyramid Principle structure with validation
5. **Compose** -- write Slidev markdown with Bento Grid layouts
6. **Preview** -- build and serve locally with live URL
7. **Review** -- quality checklist with auto-fix

## Quick Start

### Create a new project

```bash
npx slidev-ppt-agent create my-deck
cd my-deck
```

During creation, you'll be asked to select which agent tools to register slash commands for:

```
? Select agent tools to register commands for:
  [x] Claude Code       (.claude/commands/)
  [x] Cursor            (.cursor/rules/)
  [ ] Codex             (.codex/commands/)
  [ ] opencode          (.opencode/command/)
  [ ] codebuddy         (.codebuddy/commands/)
```

Or skip the prompt with `--platforms`:

```bash
npx slidev-ppt-agent create my-deck --platforms claude,cursor,codex
```

Then open the project in your AI agent and say:

```
/ppt-creator 帮我做一个关于 Kubernetes 的技术分享 PPT，受众是后端工程师
```

### Inject into an existing project

```bash
cd existing-project
npx slidev-ppt-agent init
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `create [name]` | Create a new PPT project with full agent capabilities |
| `init` | Inject capabilities into an existing project |
| `update` | Update skills and design system to the latest version |
| `build [file]` | Build slides into a static site |
| `preview [file]` | Dev preview (.md file) or static preview (dist/) |
| `export [file]` | Export slides to PPTX, PDF, or PNG |
| `publish` | Build and publish to Vercel or GitHub Pages |

### Exporting

```bash
npx slidev-ppt-agent export slides-topic.md                    # Default: PPTX
npx slidev-ppt-agent export slides-topic.md --format pdf       # PDF
npx slidev-ppt-agent export slides-topic.md --format png       # PNG
npx slidev-ppt-agent export --with-clicks false                # No click expansion
```

PPTX exports slides as images with presenter notes preserved. `playwright-chromium` is auto-installed on first export.

### Publishing

First-time publish runs an interactive wizard:

```bash
npx slidev-ppt-agent publish
```

```
? Where do you want to publish?
  > Vercel (recommended: global CDN, auto HTTPS)
    GitHub Pages (free, requires GitHub repo)

Building... done
Deploying... done

Site URL: https://my-deck.vercel.app
Next time, just run: npx slidev-ppt-agent publish
```

## Platform Support

Native slash commands are registered per platform during `create`/`init`:

| Platform | Command Directory | Slash Commands |
|----------|-------------------|----------------|
| Claude Code | `.claude/commands/` | `/ppt-creator`, `/ppt-review`, `/ppt-publish`, `/ppt-export` |
| Cursor | `.cursor/rules/` | Pattern-matched via `alwaysApply` rule |
| Codex | `.codex/commands/` | `/ppt-creator`, `/ppt-review`, `/ppt-publish`, `/ppt-export` |
| opencode | `.opencode/command/` | Same as above |
| codebuddy | `.codebuddy/commands/` | Same as above |

`AGENTS.md` serves as the universal fallback for platforms without native command support.

## What Gets Scaffolded

```
my-deck/
├── .agents/
│   ├── skills/             # 9 agent skills (research, design, outline, compose, etc.)
│   └── agents/             # 6 subagent role definitions (researcher, designer, etc.)
├── .claude/commands/        # Native slash commands for Claude Code
├── .cursor/rules/           # Cursor orchestration rule
├── design-system/           # Tokens, archetypes, page templates, CSS
│   ├── archetypes/          # 7 narrative structures
│   ├── tokens/              # 5 color/typography/spacing/motion token sets
│   ├── page-templates/      # 15 Slidev layout examples
│   ├── layouts/             # Bento Grid patterns (980x552 canvas)
│   └── styles/              # CSS classes + animation presets
├── schemas/                 # JSON Schema validation
├── scripts/                 # Engineering helpers
├── AGENTS.md                # Universal agent entry point
├── CLAUDE.md                # Claude Code adapter
├── .ppt-agent.json          # Project config (platforms, publish settings)
└── package.json             # Slidev dependencies
```

## Design System

The harness includes a complete design system extracted from professional-grade presentations:

- **Archetypes**: 7 narrative structures (technical-share, pitch-deck, executive-briefing, training-workshop, quarterly-review, product-launch, research-readout)
- **Tokens**: 5 themed sets (tech-minimal, corporate-blue, pitch-modern, mono-editorial, warm-creative) with semantic color/typography/spacing/motion tokens
- **Page Templates**: 15 visual templates with light/heavy density variants
- **Layout Patterns**: Bento Grid with 9 canvas-accurate patterns + anti-pattern detection
- **CSS Classes**: Typography scale (`.ppt-h1`~`.ppt-caption`), `.glass-card`, `.metric-big`, `.ppt-table`, `.diagram-container`
- **Animation Strategy**: Transition decision tree, narrative pacing model, 7 CSS animations + reduced-motion fallback

## Subagent Architecture

The harness uses a Skill + Agent dual-layer architecture:

- **Skills** (`.agents/skills/`) define domain knowledge -- what each role knows
- **Agents** (`.agents/agents/`) define execution roles -- who does what, with I/O contracts and parallel strategies

| Agent | Role | Parallelizable |
|-------|------|----------------|
| researcher | Multi-dimensional deep research | Per-dimension search |
| designer | Style/archetype/token decision | No |
| architect | Pyramid Principle outline | No |
| composer | Slidev slide composition | Per-outline-part |
| reviewer | Multi-category quality audit | Per-check-category |
| engineer | Build/preview/publish/export | No |

Platforms with subagent support (Cursor Task tool, Claude Code Agent Teams) automatically use parallel dispatch. Others fall back to sequential execution.

## Updating

```bash
npx slidev-ppt-agent update
```

Safely updates skills, design system, schemas, scripts, and platform commands. Detects user modifications and offers backup before overwriting.

## License

MIT
