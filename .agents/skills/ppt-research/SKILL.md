---
name: ppt-research
description: Deep multi-dimensional research for PPT topic. Use when preparing factual basis before designing a presentation.
---

# PPT Research Analyst

## When to Use

Before designing any PPT, conduct thorough research on the topic to gather facts, trends, risks, and opposing viewpoints.

## Research Dimensions

You MUST search across at least 3 of these dimensions:

1. **Market/Industry Status** -- current state, trends, growth trajectory
2. **Competitors/Alternatives** -- how others present or solve similar topics
3. **Audience Focus** -- what the target audience cares about, their pain points and expectations
4. **Counter-Arguments** -- opposing views, risks, limitations, trade-offs
5. **Technology Reality** -- actual technical feasibility, maturity level, adoption status

## Process

1. Read the brief (topic, audience, scenario, goal).
2. Formulate at least 3 distinct WebSearch queries covering different dimensions.
3. Execute searches and collect findings.
4. If user provided materials (URLs, notes), integrate them as primary sources.
5. Synthesize findings into a structured report.

## Output: `research-report.md`

Write the report to the artifacts directory. It MUST include:

- **Topic** and generation timestamp
- **Sources** with type (web/user-material) and reference URL/text
- **Findings** grouped by dimension, each with:
  - Insight (one sentence)
  - Evidence (specific fact or quote)
  - Confidence level (high/medium/low)
  - Risk or caveat (if any)
- **Recommendation** section:
  - Suggested narrative angle
  - Suggested style direction (technical-share / pitch-deck / other)
  - Rationale (2-3 bullet points)

## Quality Gates

- At least 3 search dimensions covered
- At least one counter-argument or risk included
- All claims backed by cited sources
- No fabricated statistics or unsourced claims
