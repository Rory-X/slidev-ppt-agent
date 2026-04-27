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
  const warnings = [];

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

  // Duplicate title check
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

  // Parts count check
  if (parts.length < 2) {
    issues.push({
      code: "INSUFFICIENT_PARTS",
      message: `Outline should have at least 2 parts, got ${parts.length}.`
    });
  }

  // Structure checks: cover, toc, end_page
  const pptOutline = outline.ppt_outline;
  if (brief.pageRequirements.includeCover && !pptOutline.cover) {
    issues.push({
      code: "MISSING_COVER",
      message: "Brief requires cover page but outline has no cover."
    });
  }
  if (brief.pageRequirements.includeToc && !pptOutline.toc) {
    issues.push({
      code: "MISSING_TOC",
      message: "Brief requires TOC page but outline has no toc."
    });
  }
  if (brief.pageRequirements.includeEndPage && !pptOutline.end_page) {
    issues.push({
      code: "MISSING_END_PAGE",
      message: "Brief requires end page but outline has no end_page."
    });
  }

  // evidence_refs and key_message warnings
  const allowedDensities = new Set(["light", "standard", "dense"]);
  const allowedPageTypes = new Set([
    "hero",
    "comparison",
    "process",
    "evidence",
    "dashboard",
    "architecture",
    "quote",
    "section",
    "cta"
  ]);
  let lightPages = 0;
  let densePages = 0;

  parts.forEach((part, pi) => {
    (part.pages || []).forEach((page, pgi) => {
      if (!page.evidence_refs || page.evidence_refs.length === 0) {
        warnings.push({
          code: "EMPTY_EVIDENCE_REFS",
          message: `Part ${pi + 1}, Page "${page.title}": no evidence_refs.`
        });
      }
      if (!page.key_message) {
        warnings.push({
          code: "MISSING_KEY_MESSAGE",
          message: `Part ${pi + 1}, Page "${page.title}": no key_message.`
        });
      }
      if (!page.density) {
        issues.push({
          code: "MISSING_DENSITY",
          message: `第 ${pi + 1} 部分，页面「${page.title}」缺少 density。`
        });
      } else if (!allowedDensities.has(page.density)) {
        issues.push({
          code: "INVALID_DENSITY",
          message: `第 ${pi + 1} 部分，页面「${page.title}」的 density 必须是 light、standard 或 dense。`
        });
      } else {
        if (page.density === "light") lightPages += 1;
        if (page.density === "dense") densePages += 1;
      }
      if (!page.page_type) {
        issues.push({
          code: "MISSING_PAGE_TYPE",
          message: `第 ${pi + 1} 部分，页面「${page.title}」缺少 page_type。`
        });
      } else if (!allowedPageTypes.has(page.page_type)) {
        issues.push({
          code: "INVALID_PAGE_TYPE",
          message: `第 ${pi + 1} 部分，页面「${page.title}」的 page_type 不在允许范围内。`
        });
      }
      if (!page.content_budget) {
        issues.push({
          code: "MISSING_CONTENT_BUDGET",
          message: `第 ${pi + 1} 部分，页面「${page.title}」缺少 content_budget。`
        });
      }
    });
  });

  if (contentPages > 0) {
    if (lightPages / contentPages > 0.2) {
      warnings.push({
        code: "LIGHT_PAGE_RATIO_HIGH",
        message: `light 页面为 ${lightPages}/${contentPages}；除非 brief 明确要求，否则刻意留白页应控制在 20% 以内。`
      });
    }
    if (densePages / contentPages > 0.3) {
      warnings.push({
        code: "DENSE_PAGE_RATIO_HIGH",
        message: `dense 页面为 ${densePages}/${contentPages}；如果 deck 显得过重，应考虑重新分配内容。`
      });
    }
  }

  const result = {
    checkedAt: nowIso(),
    valid: issues.length === 0,
    issues,
    warnings
  };
  writeJson(outPath, result);

  if (warnings.length > 0) {
    console.warn(`  ${warnings.length} warning(s):`);
    warnings.forEach(w => console.warn(`    - [${w.code}] ${w.message}`));
  }

  if (!result.valid) {
    console.error(`Outline validation failed with ${issues.length} issue(s).`);
    issues.forEach(i => console.error(`  - [${i.code}] ${i.message}`));
    process.exitCode = 1;
    return;
  }
  console.log("Outline validation passed.");
}

run();
