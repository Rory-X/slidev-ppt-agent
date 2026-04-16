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

  if (!style.tokenSet) {
    issues.push({
      code: "MISSING_TOKEN_SET",
      message: "style-plan.json must include tokenSet."
    });
  }

  const h2Count = countMatches(content, /^## /gm);
  if (h2Count > 8) {
    issues.push({
      code: "TITLE_HIERARCHY_DENSITY",
      message: "Too many h2 headings; hierarchy may be noisy."
    });
  }

  const clickCount = countMatches(content, /v-click|<v-clicks>/g);
  if (clickCount > 40) {
    issues.push({
      code: "ANIMATION_OVERUSE",
      message: "Reveal animation usage appears too dense."
    });
  }

  const bentoGap = style.layoutPolicy && Array.isArray(style.layoutPolicy)
    ? true
    : false;
  if (!bentoGap) {
    issues.push({
      code: "MISSING_LAYOUT_POLICY",
      message: "style-plan.json should include layoutPolicy."
    });
  }

  const result = {
    checkedAt: nowIso(),
    valid: issues.length === 0,
    issues
  };
  writeJson(outPath, result);
  if (!result.valid) {
    console.error(`Style validation failed with ${issues.length} issue(s).`);
    process.exitCode = 1;
    return;
  }
  console.log("Style validation passed.");
}

run();
