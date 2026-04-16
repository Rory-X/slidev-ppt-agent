# PPT Harness -- Claude Code Instructions

Read and follow `AGENTS.md` in this project root. It defines the full command contract, agent roles, skill inventory, orchestration strategy, and behavior rules.

## Commands

When the user says any of the following (with or without `/` prefix), execute the corresponding workflow from `AGENTS.md`:

- `ppt-creator <requirement>` or "帮我做个 xxx 的 PPT" or "create a PPT about xxx"
  → Execute the 7-phase ppt-creator pipeline using agent dispatch

- `ppt-review [slides-file]` or "帮我检查一下 PPT" or "review the slides"
  → Execute the ppt-review quality checklist

- `ppt-publish [target]` or "发布 PPT" or "deploy the slides"
  → Execute the ppt-publish workflow

## Agent Roles

Read `.agents/agents/*.md` for each agent's role definition, I/O contract, and parallel strategy. Use `Task` tool to dispatch subagents when beneficial:

- `researcher` → Phase 2: Research (parallelizable by dimension)
- `designer` → Phase 3: Style Decision
- `architect` → Phase 4: Outline Generation
- `composer` → Phase 5: Slides Composition (parallelizable by part)
- `reviewer` → Phase 7: Quality Review (parallelizable by category)
- `engineer` → Phase 6: Preview / Publishing

## Skills

All skills are in `.agents/skills/*/SKILL.md`. Each agent reads its assigned skill(s) before executing.

## Design System

Read `design-system/reference-style.md` for the visual benchmark. Read `design-system/animation-strategy.md` for animation decisions. Token files, page templates, and CSS classes are in `design-system/`.

## Key Rules

- All content production is done by YOU (the LLM), not by scripts
- Scripts only for engineering tasks: `npx slidev build`, `node scripts/static-preview-server.js`, `node scripts/validate-outline.js`
- Always return a preview URL after building slides
- Never fabricate research data -- use web search tools
- Subagent dispatch is optional -- sequential execution is always valid
