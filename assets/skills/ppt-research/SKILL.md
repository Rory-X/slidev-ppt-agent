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

## Source Quality Ladder

Prioritize higher-tier sources. Every research report MUST include at least one Tier 1 or Tier 2 source.

| Tier | Examples | Trust Level |
|------|----------|-------------|
| **Tier 1** (highest) | Academic papers, official documentation, government statistics | Cite directly; no hedging needed |
| **Tier 2** | Industry reports (Gartner, McKinsey, Forrester), established media (Reuters, Bloomberg, WSJ) | Cite directly; note report date |
| **Tier 3** | Tech blogs from recognized authors, company engineering blogs (Netflix Tech Blog, Uber Engineering) | Cite with author attribution; cross-reference when possible |
| **Tier 4** (lowest) | Forums, social media, anonymous posts, AI-generated summaries | Use only as supplementary signal; never as sole evidence |

**Rule**: If a finding relies solely on Tier 3-4 sources, mark its confidence as `low` regardless of other factors.

## Search Strategy Templates

For each dimension, use these query patterns. Replace `[topic]`, `[audience]`, and `[competitor]` with actual values. Always add time and locale qualifiers to avoid stale results.

### Market / Industry

- `"[topic] market size 2025-2026"`
- `"[topic] industry trend site:mckinsey.com OR site:gartner.com"`
- `"[topic] adoption rate enterprise 2026"`

### Competitor / Alternatives

- `"[topic] alternatives comparison 2026"`
- `"[topic] vs [competitor] benchmark"`
- `"[topic] competitive landscape analysis"`

### Audience Focus

- `"[audience role] challenges [topic] 2026"`
- `"what [audience] need to know about [topic]"`
- `"[audience role] survey [topic] pain points"`

### Counter-Argument

- `"[topic] criticism"`
- `"[topic] limitations risks"`
- `"why [topic] fails" OR "[topic] drawbacks"`

### Technology Reality

- `"[topic] production experience"`
- `"[topic] case study real-world"`
- `"[topic] post-mortem lessons learned"`

## Confidence Levels

Assign one of these levels to every finding:

- **high**: Multiple independent sources agree, quantitative data available, sources are Tier 1-2.
- **medium**: Single reliable source (Tier 1-2), or multiple Tier 3 sources with minor discrepancies.
- **low**: Inference/analogy from adjacent domains, single blog post, anecdotal evidence, or sole Tier 4 source.

When aggregating findings into the recommendation section, weight high-confidence findings most heavily. Flag any recommendation that rests primarily on low-confidence findings with `[WEAK_EVIDENCE]`.

## Contradiction Handling

When user-provided materials contradict search results:

1. Tag the finding with `[CONFLICT]` in the report.
2. Present both sides with full source attribution:
   - **User material says**: (quote or paraphrase) — source: user-provided
   - **Search results say**: (quote or paraphrase) — source: URL
3. Do NOT silently favor either side; let the outline architect decide which angle to adopt.
4. If two search results contradict each other (no user material involved), tag with `[DISPUTED]` and list both sources.

## Finding ID System

Every finding MUST have a unique ID following this format:

```
- **F1** [dimension:market] Insight text here (source: URL, confidence: high)
- **F2** [dimension:competitor] Insight text here (source: URL, confidence: medium)
- **F3** [dimension:audience] Insight text here (source: user-material, confidence: high)
```

Rules:
- IDs are sequential integers: `F1`, `F2`, `F3`, ...
- Each ID includes its dimension tag in brackets.
- These IDs are referenced downstream by `outline.json` (`evidence_refs`) and by the reviewer (fact-checking).
- Never reuse an ID within a single report. If a finding is updated, keep its original ID.

## Schema Alignment

The final `research-report.md` output MUST conform to the structure defined in `schemas/research-report.schema.json`.

Before finalizing the report, cross-check:
1. All required top-level fields are present (topic, timestamp, sources, findings, recommendation).
2. Every finding has: id, dimension, insight, evidence, confidence, and source.
3. The sources array includes every URL/material referenced in findings.
4. Finding IDs are unique and sequential.
5. At least one source is Tier 1 or Tier 2 (see Source Quality Ladder).
