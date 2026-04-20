# PPT Harness -- Claude Code Instructions

This project has native slash commands registered in `.claude/commands/`. Type `/` to see:
- `/ppt-creator` -- Create a full Slidev presentation (7-phase pipeline)
- `/ppt-review` -- Quality review with auto-fix
- `/ppt-publish` -- Deploy to Vercel or GitHub Pages
- `/ppt-export` -- Export to PPTX, PDF, or PNG

For the full behavior contract, agent roles, and orchestration strategy, read `AGENTS.md`.

## Key Rules

- All content production is done by YOU (the LLM), not by scripts
- Scripts only for engineering tasks: `npx slidev build`, `node scripts/static-preview-server.js`
- Always return a preview URL after building slides
- Never fabricate research data -- use web search tools
