# PPT Harness -- Agent Behavior Contract

This repository is an Agent-driven PPT production harness. The Agent (not scripts) performs all content work. This contract applies to any Agent platform (Cursor, Claude Code, Codex, etc.).

## Commands

### `/ppt-creator <requirement>`

Produce a complete, high-quality Slidev presentation.

**Phases** (execute in order, no skipping):

1. **Clarify** -- if requirement lacks audience/scenario/goal, ask before proceeding
2. **Research** -- multi-dimensional WebSearch, produce `research-report.md`
3. **Style Decision** -- read `design-system/`, select archetype + tokens, produce `style-plan.md`
4. **Outline** -- Pyramid Principle structure, produce `outline.json`, validate with `node scripts/validate-outline.js`
5. **Compose** -- write `slides-<topic>.md` following Slidev skill + design system + Bento Grid rules
6. **Preview** -- build with `npx slidev build`, serve with `node scripts/static-preview-server.js`, return URL
7. **Review** -- check for visual issues, fix if needed

**Mandatory output**: preview URL + artifact directory path.

### `/ppt-review [slides-file]`

Review an existing slides file against the full quality checklist (overflow, Mermaid, typography, animation, visual consistency, content). Fix issues, rebuild, return updated preview URL.

### `/ppt-publish [vercel|github-pages]`

Publish built deck to static hosting. Ask user to choose target if not specified.

## Skills Available

| Skill | Path | Role |
|-------|------|------|
| ppt-research | `.agents/skills/ppt-research/` | Deep multi-dimensional research |
| ppt-design-director | `.agents/skills/ppt-design-director/` | Style/archetype/token selection |
| ppt-outline-architect | `.agents/skills/ppt-outline-architect/` | Pyramid Principle outline generation |
| ppt-slide-composer | `.agents/skills/ppt-slide-composer/` | Slidev markdown composition with Bento Grid |
| ppt-preview | `.agents/skills/ppt-preview/` | Build and local preview |
| ppt-review | `.agents/skills/ppt-review/` | Quality review checklist + auto-fix |
| ppt-publish | `.agents/skills/ppt-publish/` | Vercel / GitHub Pages deployment |
| slidev | `.agents/skills/slidev/` | Slidev syntax, overflow rules, layout reference |
| deploy-to-vercel | `.agents/skills/deploy-to-vercel/` | Vercel deployment guidance |

## Design System Resources

| Resource | Path | Purpose |
|----------|------|---------|
| Reference style | `design-system/reference-style.md` | Visual benchmark (aesthetic baseline) |
| Tokens | `design-system/tokens/*.json` | Color/typography/spacing tokens |
| Archetypes | `design-system/archetypes/*.yaml` | Narrative structure templates |
| Page templates | `design-system/page-templates/*.md` | Visual design language examples |
| CSS classes | `design-system/styles/*.css` | Importable global styles |
| Layout patterns | `design-system/layouts/bento-patterns.md` | Supplementary layout reference |

## Schemas

| Schema | Path | Validates |
|--------|------|-----------|
| Brief | `schemas/brief.schema.json` | User input structure |
| Outline | `schemas/outline.schema.json` | Generated outline |
| Research | `schemas/research-report.schema.json` | Research report |

## Engineering Scripts (Agent calls these, does not replace them)

| Script | Purpose |
|--------|---------|
| `scripts/static-preview-server.js` | Local static file server with port retry |
| `scripts/validate-outline.js` | JSON schema validation for outline |
| `scripts/validate-style.js` | Style consistency checks |
| `scripts/ppt-publish.js` | Vercel / GitHub Pages publish |
| `scripts/build-landing.js` | Landing page generator |

## Core Principles

- Agent does all content work (research, outline, slides, review)
- Scripts only for engineering tasks Agent cannot do (build, serve, deploy, validate)
- Design system defines aesthetic baseline, not creative ceiling
- Every claim in slides must trace to research evidence
