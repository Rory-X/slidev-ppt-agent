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
