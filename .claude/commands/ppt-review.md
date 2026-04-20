---
description: "Review slides for overflow, narrative, factual accuracy, animation, and design system compliance"
---

Read and execute the /ppt-review workflow defined in AGENTS.md.

Target file: $ARGUMENTS (or most recent slides-*.md if not specified)

## Instructions

1. Read `.agents/agents/reviewer.md` for review categories and parallel strategy
2. Read `.agents/skills/ppt-review/SKILL.md` for the full checklist
3. Review all categories: overflow/layout, Mermaid, typography, animation, visual consistency, content, narrative, factual accuracy, design system compliance, accessibility
4. Fix issues directly in the slides file
5. Rebuild: `npx slidev build <slides-file> --out <artifact-dir>/site`
6. Serve: `node scripts/static-preview-server.js --dir=<artifact-dir>/site`
7. Return updated preview URL + list of fixes applied
