# PPT Harness -- Claude Code Instructions

Read and follow `AGENTS.md` in this project root. It defines the full command contract, skill inventory, and behavior rules.

## Commands

When the user says any of the following (with or without `/` prefix), execute the corresponding workflow from `AGENTS.md`:

- `ppt-creator <requirement>` or "帮我做个 xxx 的 PPT" or "create a PPT about xxx"
  → Execute the 7-phase ppt-creator pipeline

- `ppt-review [slides-file]` or "帮我检查一下 PPT" or "review the slides"
  → Execute the ppt-review quality checklist

- `ppt-publish [target]` or "发布 PPT" or "deploy the slides"
  → Execute the ppt-publish workflow

## Skills

All skills are in `.agents/skills/*/SKILL.md`. Read the relevant skill before executing each phase:

- `ppt-research` → Phase 2: Deep Research
- `ppt-design-director` → Phase 3: Style Decision
- `ppt-outline-architect` → Phase 4: Outline Generation
- `ppt-slide-composer` → Phase 5: Slides Composition
- `ppt-preview` → Phase 6: Build & Preview
- `ppt-review` → Phase 7: Quality Review (optional, ask user)
- `ppt-publish` → Publishing
- `slidev` → Slidev syntax and overflow reference (used by slide-composer)

## Design System

Read `design-system/reference-style.md` for the visual benchmark. Token files, page templates, and CSS classes are in `design-system/`.

## Key Rules

- All content production is done by YOU (the LLM), not by scripts
- Scripts only for engineering tasks: `npx slidev build`, `node scripts/static-preview-server.js`, `node scripts/validate-outline.js`
- Always return a preview URL after building slides
- Never fabricate research data -- use web search tools
