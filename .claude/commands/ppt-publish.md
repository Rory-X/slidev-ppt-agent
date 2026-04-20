---
description: "Build and publish slides to Vercel or GitHub Pages"
---

Read and execute the /ppt-publish workflow defined in AGENTS.md.

Target: $ARGUMENTS (vercel or gh-pages; ask user to choose if not specified)

## Instructions

1. Read `.agents/agents/engineer.md` for deployment steps
2. Read `.agents/skills/ppt-publish/SKILL.md` for detailed procedure
3. Build slides first: `npx slidev build <slides-file> --out dist`
4. Deploy to chosen target:
   - **Vercel**: verify CLI auth, run `vercel deploy dist -y`
   - **GitHub Pages**: ensure workflow exists in `.github/workflows/`, push to trigger
5. Return the live site URL
