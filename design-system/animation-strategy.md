# Animation Strategy

Single authoritative reference for all animation decisions in the PPT harness.
Consumed by the **designer** (style-plan), **composer** (slide writing), and **reviewer** (quality checks).

---

## 1. Core Principles

### Purpose over decoration

Every animation must serve **comprehension**—revealing structure, guiding attention, or showing transformation. If removing an animation loses no information, remove it.

### Four core animation types

| Type | Mechanism | Purpose |
|------|-----------|---------|
| **Fade In** | page `transition: fade` | Smooth page-to-page flow without spatial distraction |
| **Morph / Magic-Move** | ````md magic-move``` | Show code evolution; audience tracks what changed |
| **Appear** | `v-click`, `v-clicks` | Progressive disclosure—control information density |
| **Emphasis** | `v-mark` | Draw attention to key words/phrases in-place |

Everything else (v-motion, v-switch) is a specialist tool used sparingly.

### Timing bands

| Context | Duration | Easing |
|---------|----------|--------|
| Business / executive decks | 0.25–0.50 s | `ease-out` or token `motion.easing` |
| Progressive disclosure steps | 0.50–0.75 s | `ease-in-out` |
| **Forbidden** | < 0.20 s (jarring) | — |
| **Forbidden** | > 1.50 s (impatient) | — |

When a token set defines `motion.duration.*`, use those values; they are pre-validated to fall within these bands.

### 2026 deck reality

Decks must work **without a presenter**: PDF export, async review, mobile viewing.
This means:

- Every slide's **final click state** must be the complete, readable version.
- Critical information must **never** be hidden behind animation-only reveals.
- Transitions must add polish, not gate comprehension.

---

## 2. Slidev Animation Feature Matrix

| Feature | Syntax | Use Case | Constraints |
|---------|--------|----------|-------------|
| **v-click** | `<div v-click>` | Progressive reveal of content blocks | Max 2 per slide (from `token.motion.maxRevealPerSlide`) |
| **v-clicks** | `<v-clicks>` wrapping list/children | List or table row-by-row reveal | Only when list has > 3 items; otherwise show all at once |
| **v-after** | `<div v-after>` | Appear simultaneously with previous click | For auxiliary/supporting elements tied to a primary reveal |
| **v-switch** | `<v-switch>` with `<template #1>` / `<template #2>` | Toggle content in the same position | Before/after comparisons, A/B alternatives |
| **v-motion** | `v-motion :initial="{...}" :enter="{...}"` | Element entrance with transform/opacity | Reserved for 1–2 hero focal elements per **entire deck** |
| **v-mark** | `v-mark.underline.orange` | Text emphasis markers (underline, highlight, circle) | Colors must match token accent palette; see §8 |
| **magic-move** | ````md magic-move``` fenced blocks | Code block morphing transitions | Code slides only; max 3 steps; see §8 |
| **[click] notes** | `<!-- [click] Explanation -->` | Sync presenter notes to click steps | Required for every v-click; presenter mode only |
| **transition** | frontmatter `transition: fade` | Page-to-page transition | Determined by decision tree below |

### Quick reference: when NOT to animate

- Slide has ≤ 2 content elements → show all, no v-click
- Slide is a cover, end, or section divider → no v-click (content is already minimal)
- List has ≤ 3 items → show all at once, no v-clicks wrapper
- Slide will be the primary PDF-exported view → ensure final state is default

---

## 3. Transition Decision Tree

Use this tree to select the `transition:` frontmatter value for each slide.

```
Page Type                    → Transition
─────────────────────────────────────────
Cover page                   → fade
End / Thank-you page         → fade
Section divider              → fade
TOC page                     → fade-out
Content page (default)       → token.motion.transition (archetype default)
Code showcase page           → slide-left
Comparison / toggle page     → view-transition (fallback: fade)
Hero metric page             → fade
```

### Adjacency rule

Two consecutive slides must NOT share the same transition **unless** both are generic content pages using the token default. Section dividers act as natural transition resets.

### Per-archetype defaults

| Archetype | `token.motion.transition` | Notes |
|-----------|---------------------------|-------|
| corporate-blue | `fade` | Conservative, executive-appropriate |
| tech-minimal | `slide-left` | Directional, implies progression |
| pitch-modern | `fade-out` | Dramatic, high-impact reveals |
| mono-editorial | `fade` | Clean, editorial feel |
| warm-creative | `slide-left` | Energetic, forward motion |

---

## 4. Token Conflict Resolution

When multiple sources define animation behavior, resolve by priority (highest wins):

| Priority | Source | Example |
|----------|--------|---------|
| 1 (highest) | `style-plan.md` → `animationPolicy` | Explicit override by designer agent |
| 2 | Token `motion.transition` value | Archetype-specific default (e.g., `fade` for corporate-blue) |
| 3 | Page-type override rules (§3) | Cover always = `fade`, code = `slide-left` |
| 4 (lowest) | `animation-presets.css` global fallback | `fadeInUp` keyframes, generic helpers |

### Resolution examples

- **style-plan says `transition: none`** → all pages use no transition (priority 1 wins)
- **Token says `slide-left`, but page is a cover** → `fade` wins (priority 3 is page-type specific, but priority 2 is the general default; page-type rules are exceptions that override the token default for specific page types)
- **No style-plan override, no token motion field** → fall back to `animation-presets.css`

When `maxRevealPerSlide` differs between token and style-plan, the **lower** value wins (more conservative).

---

## 5. Narrative Pacing Model

Map archetype `narrativePhases` to animation density. The composer agent uses this table to calibrate how "animated" each section of the deck feels.

| Narrative Phase | Animation Density | Reveal Speed | Typical Techniques |
|-----------------|-------------------|--------------|-------------------|
| **Opening / Context** | Low | Slow (0.6 s+) | `fade` transitions; minimal v-click; let content breathe |
| **Problem / Pain** | Medium | Normal (0.4 s) | `v-clicks` to progressively expose issues; build tension |
| **Solution / Architecture** | High | Normal (0.4 s) | `v-motion` entrance for hero element; `magic-move` for code |
| **Demo / Evidence** | High | Fast (0.3 s) | `magic-move` code transformations; `v-mark` emphasis on metrics |
| **Summary / CTA** | Low | Slow (0.5 s) | `fade` transitions; all content visible immediately |

### Mapping to common archetypes

| Archetype | Phase → Density |
|-----------|----------------|
| executive-briefing | situation=Low, findings=Medium, recommendation=Medium, ask=Low |
| technical-share | context=Low, principles=Medium, architecture=High, implementation=High, roadmap=Low |
| product-launch | hook=Low, problem=Medium, solution=High, demo=High, pricing=Medium, cta=Low |
| research-readout | background=Low, methodology=Low, findings=High, implications=Medium, summary=Low |
| training-workshop | objectives=Low, concepts=Medium, walkthrough=High, exercises=High, recap=Low |

### Pacing rhythm rule

Never place two High-density slides consecutively without a breathing slide (Low or Medium density) between them. The reviewer agent checks this.

---

## 6. Anti-patterns

The reviewer agent flags these during quality checks.

| Anti-pattern | Description | Fix |
|--------------|-------------|-----|
| **Gratuitous clicks** | v-clicking every element on every slide | Remove v-click from slides with ≤ 2 content blocks |
| **Uniform transitions** | Same transition on every page | Apply the decision tree (§3); vary by page type |
| **Animation overload** | > `maxRevealPerSlide` reveal effects on one slide | Reduce to token limit (typically 1–2) |
| **Hidden content** | Critical info only visible after animation | Ensure final click state is the default/complete state |
| **Invisible v-motion** | Initial position outside visible canvas | Set `opacity >= 0.1`, position within slide bounds |
| **Slow reveals** | Duration > 1.5 s | Cap at 1.5 s maximum; prefer 0.3–0.5 s |
| **Click-free v-marks** | v-mark used without any click context | v-mark should highlight during a reveal step, not statically |
| **Magic-move abuse** | magic-move on non-code slides or > 3 steps | Restrict to code showcases; max 3 steps |
| **Presenter-note desync** | v-click exists but no matching `[click]` note | Add `<!-- [click] ... -->` for every v-click |

---

## 7. Accessibility & Export

### Reduced motion

All CSS animations must include a reduced-motion fallback:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

The `animation-presets.css` file already includes this. Custom per-slide CSS must also respect it.

### PDF export

- Every slide's **final state** (all clicks resolved) must be complete and readable.
- Do not rely on animation order to convey meaning—the PDF flattens all steps.
- If using `v-switch`, the **last template** is what PDF exports; ensure it is the most complete/useful view.
- Test with `npx slidev export` to verify no content is lost.

### v-motion visibility

- `:initial` state must keep `opacity >= 0.1` (element remains perceptible)
- `:initial` position must be within the visible 960×540 canvas (no off-screen starts)
- Prefer subtle transforms: `translateY(20px)`, `scale(0.95)`, `opacity(0.3)`

### Reveal budget

- Max animation effects per slide: `token.motion.maxRevealPerSlide` (default: 2)
- Executive archetypes (`executive-briefing`): enforce max 1 per `styleRules.maxVisualEffectsPerSlide`
- When both values exist, the **lower** number wins

### Contrast

- `v-mark` colors must maintain WCAG AA contrast (4.5:1) against the slide background
- On dark backgrounds (`#0B1020`-range): use `orange`, `green`, `red` mark colors
- On light backgrounds (`#F8FAFC`-range): use deeper variants or avoid light mark colors

---

## 8. Feature Usage Rules

### magic-move

- **Scope**: ONLY on code showcase pages (pages with primary code content)
- **Step limit**: Max 3 transformation steps per magic-move block
- **Diff budget**: Each step's code diff should change ≤ 30% of lines (audience must track changes)
- **Syntax**: Always specify language in the code fence (` ```js `, ` ```python `, etc.)
- **Narrative**: Each step should represent one logical concept (add error handling, refactor to async, etc.)

```md
<!-- Correct: 3 steps, small diffs, language specified -->
````md magic-move
```js
function greet(name) {
  return "Hello " + name;
}
```
```js
function greet(name) {
  if (!name) throw new Error("name required");
  return `Hello ${name}`;
}
```
```js
async function greet(name) {
  if (!name) throw new Error("name required");
  const greeting = await translate(`Hello ${name}`);
  return greeting;
}
```
````
```

### v-mark

- **Allowed colors**: Only token-aligned values:
  - `orange` → maps to `--ppt-accent-warm` / token `accentWarm`
  - `green` → maps to `--ppt-success` / token `success`
  - `red` → maps to `--ppt-danger` / token `danger`
- **Forbidden**: Arbitrary colors like `pink`, `cyan`, `teal`, `purple` (not in mark palette)
- **Styles**: `underline` (default), `highlight`, `circle`, `box`
- **Context**: Should appear within a v-click step to create a reveal-then-emphasize flow

```md
<!-- Correct: token-aligned color, within click context -->
<v-click>

Processing time reduced from <span v-mark.highlight.green="2">2.3s to 0.4s</span>

</v-click>
```

### v-motion

- **Frequency**: Reserve for **hero elements** on focal slides—1 to 2 uses per entire deck, not per slide
- **Initial state constraints**:
  - `opacity` ≥ 0.1 (visible hint of element)
  - Position within visible canvas (no `translateX(-500px)` or similar)
- **Preferred transforms**:
  - `translateY(20px)` → subtle upward entrance
  - `scale(0.95)` → gentle scale-up
  - `opacity(0)` → acceptable if combined with visible position
- **Forbidden transforms**:
  - `rotate(360deg)` → gratuitous spin
  - `translateX(±960px)` → off-screen horizontal fly-in
  - Any transform producing layout shift on surrounding elements

```md
<!-- Correct: subtle entrance, visible initial state -->
<div v-motion
  :initial="{ opacity: 0.1, y: 20 }"
  :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }">
  <h2>Key Architecture Diagram</h2>
</div>
```

### v-click / v-clicks

- **v-click budget**: ≤ `maxRevealPerSlide` per slide (typically 2)
- **v-clicks wrapper**: Only when list has > 3 items
- **Never v-click**: Cover pages, end pages, section dividers, slides with ≤ 2 content blocks
- **Click grouping**: Use `v-after` for elements that should appear simultaneously with a previous click rather than consuming a separate click step

### Presenter notes `[click]`

- **Mandatory**: Every v-click on a slide must have a matching `[click]` in presenter notes
- **Format**: `<!-- [click] Explanation of what this reveal shows -->`
- **Ordering**: Notes must appear in the same order as the click sequence
- **Content**: Brief explanation of what the audience should focus on after the reveal

```md
---
transition: slide-left
---

# System Architecture

<div v-click>

**Service Layer**: Handles all business logic

</div>

<div v-click>

**Data Layer**: PostgreSQL + Redis caching

</div>

<!--
[click] Reveal the service layer — explain how it decouples business logic from transport
[click] Reveal the data layer — emphasize the caching strategy for hot paths
-->
```

---

## Quick Reference Card

For the composer agent's fast lookup:

```
TRANSITION:  cover/end/divider=fade | toc=fade-out | content=token | code=slide-left
CLICKS:      max per slide = token.maxRevealPerSlide (default 2)
             skip if ≤ 2 content blocks or ≤ 3 list items
MAGIC-MOVE:  code only | max 3 steps | ≤ 30% diff per step
V-MARK:      orange/green/red only | within v-click context
V-MOTION:    1-2 per deck | visible initial state | subtle transforms
TIMING:      0.25-0.50s business | 0.50-0.75s progressive | never <0.2s or >1.5s
PDF:         final click state = complete slide | no hidden-only content
NOTES:       every v-click → matching <!-- [click] ... -->
```
