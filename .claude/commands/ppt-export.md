---
description: "Export slides to PPTX, PDF, or PNG file"
---

Export slides to a downloadable file.

Arguments: $ARGUMENTS (slides file and/or format like "pptx", "pdf", "png")

## Instructions

1. Ensure playwright-chromium is installed: `npm install -D playwright-chromium`
2. Determine format (default: pptx) and slides file (default: first slides-*.md found)
3. Run export:
   - PPTX: `npx slidev export <slides-file> --format pptx --output <name>.pptx`
   - PDF: `npx slidev export <slides-file> --output <name>.pdf`
   - PNG: `npx slidev export <slides-file> --format png`
4. Return the exported file path

PPTX notes: slides are exported as images (text not editable in PowerPoint), presenter notes preserved, `--with-clicks` on by default (each v-click step = separate page).
