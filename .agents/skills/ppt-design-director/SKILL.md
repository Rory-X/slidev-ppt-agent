---
name: ppt-design-director
description: Visual style decision-making for PPT based on research and audience context. Use after research phase to select archetype, tokens, and layout strategy.
---

# PPT Design Director

## When to Use

After research is complete and before outline generation. Decides the visual identity of the deck.

## Process

1. Read `research-report.md` and the brief.
2. Read available design system resources:
   - `design-system/archetypes/*.yaml` -- narrative structure templates
   - `design-system/tokens/*.json` -- color/typography/spacing token sets
   - `design-system/reference-style.md` -- visual benchmark from reference PPT
   - `design-system/layouts/bento-patterns.md` -- layout combination rules
3. Match the best archetype based on:
   - Audience type (technical vs business vs mixed)
   - Scenario (internal review vs conference vs pitch)
   - Goal action (educate vs persuade vs align)
   - Research recommendation
4. Select corresponding token set.
5. Define layout strategy (preferred and avoid patterns).

## Output: `style-plan.md`

Write to artifacts directory. Must include:

- **Selected archetype** and why
- **Selected token set** and key colors/fonts
- **Layout strategy**: preferred patterns, avoided patterns
- **Narrative phases** (from archetype)
- **Animation policy**: per-page-type recommendations
- **Alternative considered** and why rejected

## Decision Rules

- If audience is primarily technical: lean toward `technical-share`
- If goal is persuasion/fundraising: lean toward `pitch-deck`
- If mixed or unclear: default to `technical-share` with selective pitch elements
- Always explain the decision with evidence from research

## Decision Matrix

Map audience × scenario × goal to the recommended archetype and token set. When the audience/scenario doesn't match any row exactly, choose the closest match and explain the reasoning in the "Alternative considered" section of `style-plan.md`.

| Audience | Scenario | Goal | Archetype | Token Set |
|----------|----------|------|-----------|-----------|
| Engineers | Internal tech share | Learn new tech | technical-share | tech-minimal |
| Executives | Board meeting | Approve budget | executive-briefing | corporate-blue |
| Investors | Pitch meeting | Invest/fund | pitch-deck | pitch-modern |
| Mixed team | Training workshop | Acquire skill | training-workshop | warm-creative |
| Management | Quarterly review | Track progress | quarterly-review | corporate-blue |
| Customers | Product launch | Buy/adopt | product-launch | pitch-modern / gradient-dark |
| Researchers | Conference | Share findings | research-readout | tech-minimal |
| Developers | Tech conference | Inspire/teach | conference-talk | tech-minimal / gradient-dark |
| Non-technical | Keynote / demo day | Impress/excite | product-launch | apple-minimal |

## 模板选择决策框架

模板选择不应依赖硬编码映射表，而应基于**内容语义匹配**。每个 page-template 文件头部包含 YAML 元数据（`contentTypes`、`mood`、`density`、`visualImpact`、`pairs_well_with`），Designer Agent 在 style-plan 中应利用这些元数据指导 Architect 和 Composer 的模板选择。

### 选择流程

```
内容是什么类型？ → 匹配 contentTypes
应该传达什么情绪？ → 匹配 mood
信息密度多高？ → 匹配 density
前后页的视觉冲击力？ → 用 visualImpact 控制节奏
```

### 节奏感规则（写入 style-plan）

- 连续两页不能都是 `visualImpact: high`（避免审美疲劳）
- 在 `high` 页面后安排 `low` 或 `medium` 页面作为"呼吸"
- 全 deck 的 visualImpact 节奏应呈现波浪形：低-中-高-中-低-高-低

### 风格组合套餐参考

在 `design-system/style-combos.md` 中提供了验证过的模板组合方案。Designer Agent 在写 style-plan 时应选择最接近的 combo 作为基线，然后在 combo 范围内微调。

### Token 与模板的兼容性

某些模板声明了 `incompatible_tokens`（如 `gradient-divider` 不兼容 `corporate-blue`）。style-plan 中推荐的模板列表必须排除与所选 Token 不兼容的模板。

## Animation Policy Table

Animation density by page type. Consult this table when writing the `animationPolicy` section of `style-plan.md`.

| Page Type | Default Transition | Max Reveals | Magic-Move | v-mark |
|-----------|--------------------|-------------|------------|--------|
| Cover | fade | 0 | No | No |
| TOC | fade-out | 1 (card list) | No | No |
| Content-split | token default | 2 | No | Optional |
| Three-cards | token default | 1 (v-clicks) | No | No |
| Code-showcase | slide-left | 2 | Yes (if multi-step) | Optional |
| Detail-two-col | token default | 2 | No | Optional |
| Summary | fade | 1 | No | No |
| Hero-metric | fade | 1 | No | Yes (number) |
| Timeline | slide-left | 1 (v-clicks) | No | No |
| Magic-move-code | slide-left | 2 | Yes (required) | No |
| Device-mockup | fade | 1 | No | No |
| Before-after | fade | 2 (toggle + metrics) | No | Optional |
| Speaker-hero | fade | 0-2 (credentials) | No | No |
| Gradient-divider | fade | 0 | No | No |

## Accessibility Rules

- Contrast ratio >= 4.5:1 for all text on backgrounds (check token palette)
- Provide `prefers-reduced-motion` fallback note in style-plan
- Ensure token palette includes distinguishable colors for color-blind users
- Max animation duration: 0.75s for any single effect

## validate-style.js Integration

After writing `style-plan.md`, run validation:

```bash
node scripts/validate-style.js --style=artifacts/style-plan.json --slides=slides-generated.md
```

If validation fails, fix the style-plan and re-run until it passes before proceeding to the outline phase.

## Animation Strategy Reference

For detailed animation decisions, read `design-system/animation-strategy.md`. The `style-plan.md` output MUST include these fields:

- `animationPolicy.defaultTransition` -- from token or decision matrix above
- `animationPolicy.narrativePacing` -- `setup: slow`, `evidence: normal`, `resolution: fast`
- `animationPolicy.maxRevealPerSlide` -- from token, typically 2
