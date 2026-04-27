const fs = require("node:fs");
const path = require("node:path");
const {
  parseArgs,
  readJson,
  writeJson,
  nowIso
} = require("./harness-utils");

function flattenOutlinePages(outline) {
  const parts = outline?.ppt_outline?.parts || [];
  return parts.flatMap(part => part.pages || []);
}

function splitSlides(content) {
  return content
    .split(/^---\s*$/gm)
    .map(slide => slide.trim())
    .filter(slide => slide.length > 0)
    .filter(slide => /^#\s+/m.test(slide) || /class="|```|^\s*[-*]\s+/m.test(slide));
}

function stripNotes(slide) {
  return slide.replace(/<!--[\s\S]*?-->/g, "");
}

function countMatches(content, pattern) {
  const matches = content.match(pattern);
  return matches ? matches.length : 0;
}

function analyzeSlide(slide) {
  const visible = stripNotes(slide);
  const lines = visible
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .filter(line => !line.startsWith("---"))
    .filter(line => !line.startsWith("transition:"))
    .filter(line => !line.startsWith("layout:"));

  const bulletCount = lines.filter(line => /^[-*]\s+/.test(line)).length;
  const cardCount = countMatches(visible, /glass-card|icon-box|tag-badge|metric-big/g);
  const headingCount = lines.filter(line => /^#{1,3}\s+/.test(line)).length;
  const hasMermaid = /```mermaid/.test(visible);
  const hasCode = /```(?!mermaid)/.test(visible);
  const hasTable = /<table|\|.+\|/.test(visible);
  const hasVisual = hasMermaid || hasCode || hasTable || /<img|\bimage\b|mdi-/.test(visible);
  const effectiveLines = lines
    .filter(line => !/^<\/?div/.test(line))
    .filter(line => !/^<\/?span/.test(line))
    .filter(line => !/^<\/?table/.test(line))
    .length;

  return {
    effectiveLines,
    bulletCount,
    cardCount,
    headingCount,
    hasVisual,
    infoBlocks: Math.max(bulletCount, cardCount)
  };
}

function isUnderfilledStandard(metrics) {
  return metrics.infoBlocks < 3 && metrics.effectiveLines < 6 && !(metrics.hasVisual && metrics.infoBlocks >= 2);
}

function isUnderfilledDense(metrics) {
  return metrics.infoBlocks < 4 && metrics.effectiveLines < 10 && !(metrics.hasVisual && metrics.infoBlocks >= 3);
}

function isLightTooDense(metrics) {
  return metrics.infoBlocks > 4 || metrics.bulletCount > 5 || metrics.effectiveLines > 12;
}

function run() {
  const args = parseArgs(process.argv);
  const slidesPath = path.resolve(args.slides || "slides-generated.md");
  const outlinePath = path.resolve(args.outline || "outline.json");
  const outPath = path.resolve(args.out || "density-validation.json");

  const content = fs.existsSync(slidesPath) ? fs.readFileSync(slidesPath, "utf-8") : "";
  const outline = fs.existsSync(outlinePath) ? readJson(outlinePath) : null;
  const pages = outline ? flattenOutlinePages(outline) : [];
  const slides = splitSlides(content);
  const warnings = [];

  slides.forEach((slide, index) => {
    const page = pages[index] || {};
    const density = page.density || "standard";
    const pageTitle = page.title || `第 ${index + 1} 页`;
    const metrics = analyzeSlide(slide);

    if (density === "standard" && isUnderfilledStandard(metrics)) {
      warnings.push({
        code: "UNDERFILLED_CONTENT_SLIDE",
        slide: index + 1,
        title: pageTitle,
        message: `页面「${pageTitle}」是 standard 密度，但有效信息块不足；建议补充证据、案例、对比或行动建议。`,
        metrics
      });
    }

    if (density === "dense" && isUnderfilledDense(metrics)) {
      warnings.push({
        code: "DENSITY_MISMATCH",
        slide: index + 1,
        title: pageTitle,
        message: `页面「${pageTitle}」标注为 dense，但实际内容未达到高密度；建议增加注释卡、证据点或明确解读。`,
        metrics
      });
    }

    if (density === "light" && isLightTooDense(metrics)) {
      warnings.push({
        code: "LIGHT_SLIDE_TOO_DENSE",
        slide: index + 1,
        title: pageTitle,
        message: `页面「${pageTitle}」标注为 light，但内容偏多；建议改为 standard/dense，或拆分/简化。`,
        metrics
      });
    }
  });

  const result = {
    checkedAt: nowIso(),
    valid: true,
    slideCount: slides.length,
    warnings
  };

  writeJson(outPath, result);

  if (warnings.length > 0) {
    console.warn(`  ${warnings.length} 个密度 warning：`);
    warnings.forEach(w => console.warn(`    - [${w.code}] ${w.message}`));
  }

  console.log("幻灯片密度校验完成。");
}

run();
