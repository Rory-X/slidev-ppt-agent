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

## After Preview: Offer Export Options

After returning the preview URL, inform the user of available export options:

```
预览地址：http://localhost:3045

如需导出文件：
- 导出 PPTX：npx slidev export <slides-file> --format pptx
- 导出 PDF：npx slidev export <slides-file>
- 导出 PNG：npx slidev export <slides-file> --format png

也可以让我直接帮你执行导出命令，或使用 `/ppt-publish` 发布到线上。
```

### PPTX Export Details

- Requires `playwright-chromium`: `npm install -D playwright-chromium`
- All slides exported as images (text not editable in PowerPoint)
- Presenter notes are preserved in the PPTX file
- `--with-clicks` is enabled by default (each v-click step becomes a separate page)
- To disable click expansion: `npx slidev export <slides-file> --format pptx --with-clicks false`

If the user requests PPTX export, run:

```bash
npx slidev export <slides-file> --format pptx --output <artifact-dir>/slides.pptx
```

## Failure Handling

- If build fails: report the error and suggest fixes (usually Slidev syntax issues)
- If port is occupied: the server retries automatically up to 30 ports
- If export fails with browser error: run `npm install -D playwright-chromium` first
