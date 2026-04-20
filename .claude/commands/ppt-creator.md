---
description: "Create a high-quality Slidev presentation (7-phase pipeline: research, style, outline, compose, preview, review)"
---

Read and execute the /ppt-creator pipeline defined in AGENTS.md.

User requirement: $ARGUMENTS

## Instructions

1. Read `AGENTS.md` for the full orchestration strategy and phase dependency graph
2. Read `.agents/agents/*.md` for agent role definitions (researcher, designer, architect, composer, reviewer, engineer)
3. Execute the 7 phases in order — do NOT skip any phase:
   - **Clarify**: confirm audience, scenario, goal (ask if missing)
   - **Research**: dispatch to researcher agent, produce `artifacts/research-report.md`
   - **Style Decision**: dispatch to designer agent, produce `artifacts/style-plan.md`
   - **Outline**: dispatch to architect agent, produce `artifacts/outline.json`, validate with `node scripts/validate-outline.js`
   - **Compose**: dispatch to composer agent, write `slides-<topic>.md` with design system CSS imports
   - **Preview**: build with `npx slidev build`, serve with `node scripts/static-preview-server.js`, return URL
   - **Review**: offer quality review, fix issues if accepted
4. Return: preview URL + artifact directory + export options reminder
