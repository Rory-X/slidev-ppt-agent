const path = require("path");
const {
  parseArgs,
  readJson,
  writeJson,
  nowIso
} = require("./harness-utils");

function run() {
  const args = parseArgs(process.argv);
  const briefPath = path.resolve(args.brief || "brief.json");
  const outlinePath = path.resolve(args.outline || "outline.json");
  const outPath = path.resolve(args.out || "outline-validation.json");

  const brief = readJson(briefPath);
  const outline = readJson(outlinePath);
  const issues = [];

  const parts = outline.ppt_outline.parts || [];
  const contentPages = parts.reduce((sum, p) => sum + (p.pages || []).length, 0);
  const totalPages =
    contentPages +
    (brief.pageRequirements.includeCover ? 1 : 0) +
    (brief.pageRequirements.includeToc ? 1 : 0) +
    (brief.pageRequirements.includeEndPage ? 1 : 0);

  if (totalPages !== brief.pageRequirements.totalPages) {
    issues.push({
      code: "PAGE_COUNT_MISMATCH",
      message: `Expected ${brief.pageRequirements.totalPages}, got ${totalPages}.`
    });
  }

  const seenTitles = new Set();
  parts.forEach((part) => {
    (part.pages || []).forEach((page) => {
      if (seenTitles.has(page.title)) {
        issues.push({
          code: "DUPLICATE_PAGE_TITLE",
          message: `Duplicate page title: ${page.title}`
        });
      }
      seenTitles.add(page.title);
    });
  });

  const result = {
    checkedAt: nowIso(),
    valid: issues.length === 0,
    issues
  };
  writeJson(outPath, result);
  if (!result.valid) {
    console.error(`Outline validation failed with ${issues.length} issue(s).`);
    process.exitCode = 1;
    return;
  }
  console.log("Outline validation passed.");
}

run();
