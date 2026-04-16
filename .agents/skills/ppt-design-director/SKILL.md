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
| Customers | Product launch | Buy/adopt | product-launch | pitch-modern |
| Researchers | Conference | Share findings | research-readout | tech-minimal |

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
