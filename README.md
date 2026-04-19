# slidev-ppt-agent

One command to give any AI agent the ability to create high-quality Slidev presentations, with built-in preview and one-click publishing.

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
| `publish` | Build and publish to Vercel or GitHub Pages |

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

After first setup, config is saved to `.ppt-agent.json` and subsequent publishes are one-command.

## Platform Support

| Platform | Entry Point | Discovery |
|----------|-------------|-----------|
| Cursor | `.cursor/rules/ppt-commands.mdc` | Auto-loaded |
| Claude Code | `CLAUDE.md` -> `AGENTS.md` | Auto-read |
| Codex | `AGENTS.md` | Auto-read |
| opencode | `AGENTS.md` | Project root |
| codebuddy | `AGENTS.md` | Project root |

`AGENTS.md` is the single source of truth. All other platform entry points are thin adapters.

## What Gets Scaffolded

```
my-deck/
├── .agents/
│   ├── skills/             # 9 agent skills (research, design, outline, compose, etc.)
│   └── agents/             # 6 subagent role definitions (researcher, designer, etc.)
├── .cursor/rules/          # Cursor orchestration rule
├── design-system/          # Tokens, archetypes, page templates, CSS
│   ├── archetypes/         # 7 narrative structures (technical-share, pitch-deck, etc.)
│   ├── tokens/             # 5 color/typography/spacing/motion token sets
│   ├── page-templates/     # 15 Slidev code examples as design baseline
│   ├── layouts/            # Bento Grid layout patterns
│   └── styles/             # Glass-card, icon-box, section-bar, etc.
├── schemas/                # JSON Schema validation for agent outputs
├── scripts/                # Engineering helpers (preview server, validators)
├── AGENTS.md               # Universal agent entry point
├── CLAUDE.md               # Claude Code entry point
├── .ppt-agent.json         # Project config (version, publish settings)
└── package.json            # Slidev dependencies
```

## Design System

The harness includes a complete design system extracted from professional-grade presentations:

- **Archetypes**: 7 narrative structures (technical-share, pitch-deck, executive-briefing, training-workshop, quarterly-review, product-launch, research-readout)
- **Tokens**: 5 token sets (tech-minimal, corporate-blue, pitch-modern, mono-editorial, warm-creative)
- **Page Templates**: 15 visual templates (cover, toc, content-split, three-cards, code-showcase, hero-metric, timeline, comparison-table, image-showcase, quote-highlight, team-grid, faq, metrics-strip, detail-two-col, summary)
- **Layout Patterns**: Bento Grid with 9 patterns and anti-pattern detection
- **CSS Classes**: `.glass-card`, `.icon-box`, `.section-bar`, `.tag-badge`, `.gradient-title`, `.metric-big`, `.ppt-table`
- **Animation Strategy**: Authoritative reference with timing bands, transition decision tree, and reduced-motion support

## Updating

```bash
npx slidev-ppt-agent update
```

Safely updates skills, design system, schemas, and scripts. Detects user modifications and offers backup before overwriting.

## License

MIT
