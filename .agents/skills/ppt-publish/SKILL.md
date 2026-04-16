---
name: ppt-publish
description: Publish built PPT to static hosting (Vercel or GitHub Pages). Use when user requests deployment.
---

# PPT Publish

## When to Use

When the user explicitly asks to publish/deploy the PPT to a live URL.

## Target Selection

- If user specifies target (`vercel` or `github-pages`), use it directly.
- If not specified, ask the user to choose.

## Vercel Path

Follow the guidance in `.agents/skills/deploy-to-vercel/SKILL.md`:

1. Check project state (`git remote`, `.vercel/project.json`, `vercel whoami`).
2. Deploy using the best available method.
3. Default command:

```bash
vercel deploy dist -y --no-wait
```

4. Report the deployment URL.

## GitHub Pages Path

Option A -- GitHub Actions (preferred if repo has remote):
- Ensure `.github/workflows/publish-gh-pages.yml` exists.
- Push to trigger the workflow.

Option B -- Manual subtree push:
```bash
git subtree push --prefix dist origin gh-pages
```

## Output

Always return:
- Target used (vercel / github-pages)
- Live site URL
- Deployment status

## Safety

- Never publish without user confirmation.
- If publish fails, report error details and suggest next steps.
