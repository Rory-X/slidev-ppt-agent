---
name: ppt-preview
description: Build Slidev deck and start local preview server. Use after slides are written to provide a viewable URL.
---

# PPT Preview

## When to Use

After `slides-<topic>.md` has been written and is ready for visual review.

## Process

1. Build the deck to static files:

```bash
npx slidev build <slides-file> --out <artifact-dir>/site
```

2. Start local preview server:

```bash
node scripts/static-preview-server.js --dir=<artifact-dir>/site --port=3045
```

The server auto-retries ports if occupied. It prints `PREVIEW_URL=http://...` on success.

3. Return the preview URL to the user.

## Output

- Built static site in `<artifact-dir>/site/`
- Running preview server with accessible URL
- The URL MUST be included in the response to the user

## Failure Handling

- If build fails: report the error and suggest fixes (usually Slidev syntax issues)
- If port is occupied: the server retries automatically up to 30 ports
