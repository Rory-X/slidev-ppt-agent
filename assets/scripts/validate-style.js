const fs = require("fs");
const path = require("path");
const {
  parseArgs,
  readJson,
  writeJson,
  nowIso
} = require("./harness-utils");

function countMatches(content, pattern) {
  const matches = content.match(pattern);
  return matches ? matches.length : 0;
}

function run() {
  const args = parseArgs(process.argv);
  const stylePath = path.resolve(args.style || "style-plan.json");
  const slidesPath = path.resolve(args.slides || "slides-generated.md");
  const outPath = path.resolve(args.out || "style-validation.json");

  const style = readJson(stylePath);
  const content = fs.existsSync(slidesPath) ? fs.readFileSync(slidesPath, "utf-8") : "";
  const issues = [];
  const warnings = [];

  // Token set check
  if (!style.tokenSet) {
    issues.push({
      code: "MISSING_TOKEN_SET",
      message: "style-plan.json must include tokenSet."
    });
  }

  // Heading density check
  const h2Count = countMatches(content, /^## /gm);
  if (h2Count > 8) {
    issues.push({
      code: "TITLE_HIERARCHY_DENSITY",
      message: "Too many h2 headings; hierarchy may be noisy."
    });
  }

  // Animation overuse check
  const clickCount = countMatches(content, /v-click|<v-clicks>/g);
  if (clickCount > 40) {
    issues.push({
      code: "ANIMATION_OVERUSE",
      message: "Reveal animation usage appears too dense."
    });
  }

  // Layout policy check
  const hasLayoutPolicy = style.layoutPolicy && Array.isArray(style.layoutPolicy);
  if (!hasLayoutPolicy) {
    issues.push({
      code: "MISSING_LAYOUT_POLICY",
      message: "style-plan.json should include layoutPolicy."
    });
  }

  // Raw hex color detection
  if (content) {
    const hexMatches = content.match(/#[0-9A-Fa-f]{6}\b/g);
    if (hexMatches && hexMatches.length > 0) {
      const unique = [...new Set(hexMatches)];
      warnings.push({
        code: "RAW_HEX_COLORS",
        message: `Found ${unique.length} raw hex color(s): ${unique.slice(0, 5).join(', ')}. Use CSS variables (var(--ppt-*)) instead.`
      });
    }
  }

  // CSS variable usage check
  if (content && content.length > 100) {
    const cssVarCount = countMatches(content, /var\(--ppt-/g);
    if (cssVarCount === 0) {
      warnings.push({
        code: "NO_CSS_VARIABLES",
        message: "No --ppt-* CSS variables found. Use design system tokens for colors and spacing."
      });
    }
  }

  // Page class usage check
  if (content && content.length > 100) {
    const pageClasses = ['.glass-card', '.icon-box', '.section-bar', '.tag-badge', '.gradient-title', '.accent-text', '.metric-big', '.ppt-table'];
    const usedClasses = pageClasses.filter(cls => content.includes(cls));
    if (usedClasses.length === 0) {
      warnings.push({
        code: "NO_PAGE_CLASSES",
        message: "No page-classes.css classes found. Consider using .glass-card, .icon-box, etc."
      });
    }
  }

  // CSS import check
  if (content) {
    if (!content.includes('global-tokens.css')) {
      warnings.push({
        code: "MISSING_GLOBAL_TOKENS_IMPORT",
        message: "Slides should import design-system/styles/global-tokens.css in headmatter."
      });
    }
    if (!content.includes('page-classes.css')) {
      warnings.push({
        code: "MISSING_PAGE_CLASSES_IMPORT",
        message: "Slides should import design-system/styles/page-classes.css in headmatter."
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
    console.error(`Style validation failed with ${issues.length} issue(s).`);
    process.exitCode = 1;
    return;
  }
  console.log("Style validation passed.");
}

run();
