---
name: ppt-review
description: Review a generated Slidev deck for visual, structural, and interaction issues. Use when user triggers /ppt-review or when completing the ppt-creator pipeline.
---

# PPT Review

## When to Use

- After slides are built and preview URL is available
- When user explicitly triggers `/ppt-review`
- As Phase 7 of the `/ppt-creator` pipeline

## Review Checklist

For each slide, check the following categories:

### 1. Overflow & Layout

- [ ] No content overflows the 980x552px canvas
- [ ] Mermaid diagrams fully contained (no clipping, no overlapping cards)
- [ ] Two-column layouts balanced (neither side overflows independently)
- [ ] Cards do not overlap or bleed into adjacent elements
- [ ] Code blocks with >10 lines have `{maxHeight:'200px'}`

### 2. Mermaid Diagram Specific

- [ ] Every Mermaid has explicit `{scale: ...}` set
- [ ] Full-width Mermaid: `{scale: 0.45-0.6}`
- [ ] Mermaid in two-col layout: `{scale: 0.3-0.4}`
- [ ] Node text <= 8 Chinese chars / 15 English chars
- [ ] Mermaid with >8 nodes occupies its own dedicated slide
- [ ] Mermaid does NOT coexist with bullet list + another element on same slide
- [ ] Mermaid wrapped in height-constrained container if sharing slide with other content

### 3. Typography

- [ ] No title wraps to a second line with only 1-2 characters (shorten or rephrase)
- [ ] Chinese titles <= 16 characters
- [ ] English titles <= 40 characters
- [ ] Heading hierarchy consistent (`#` for page title, content below)
- [ ] Key terms highlighted with accent color, not overused

### 4. Animation & Interaction

- [ ] Max 2 reveal effects per slide
- [ ] Adjacent slides use different transitions
- [ ] Section dividers use `fade`, content slides use `slide-left`
- [ ] v-clicks only used when sequential reveal adds comprehension value
- [ ] Single-element slides (e.g. one diagram) should NOT have v-click on the only element
- [ ] Lists with <= 3 items do not need v-clicks (show all at once)

### 5. Visual Consistency

- [ ] Colors match the selected token set throughout
- [ ] Glass-card style consistent (border, radius, padding)
- [ ] Icon-box style consistent
- [ ] Spacing between cards >= 20px

### 6. Content Quality

- [ ] Every slide has presenter notes
- [ ] No placeholder text remaining
- [ ] Claims backed by research evidence

### 7. Narrative & Structure

- [ ] CTA (Call to Action) exists on final or near-final slide
- [ ] Red thread: each slide's key_message logically connects to next
- [ ] Terminology matches audience level (no unexplained jargon for non-technical audience)
- [ ] Outline key_messages are reflected in actual slide content (compare with outline.json)
- [ ] Story arc follows archetype's narrativePhases progression

### 8. Factual Accuracy

- [ ] Spot-check 3 data claims: find the evidence_ref in presenter notes, trace back to research-report.md finding ID
- [ ] No unsourced statistics or percentages
- [ ] Dates and version numbers are current (not outdated)
- [ ] Company/product names are spelled correctly

### 9. Design System Compliance

- [ ] Headmatter imports `global-tokens.css` and `page-classes.css`
- [ ] No raw hex color values (all colors via CSS variables `var(--ppt-*)`)
- [ ] No raw Tailwind color classes (e.g., `text-blue-500`) -- use `var(--ppt-primary)` instead
- [ ] Page-classes used where appropriate (`.glass-card`, `.icon-box`, `.section-bar`, etc.)
- [ ] Font sizes use design system scale (`.ppt-h1` through `.ppt-caption`)

### 10. Accessibility

- [ ] Text contrast meets 4.5:1 minimum against backgrounds
- [ ] Images/diagrams have descriptive alt-text or presenter note description
- [ ] Animation count per slide <= 2 (from token maxRevealPerSlide)
- [ ] v-motion initial positions are within visible canvas area
- [ ] Content is fully readable in PDF export (no information lost to animation sequence)

### 11. Animation Compliance

- [ ] v-mark colors match token accent palette (not arbitrary colors)
- [ ] magic-move has <= 3 steps, each step's code diff <= 30%
- [ ] frontmatter `transition:` follows the decision tree in animation-strategy.md
- [ ] Presenter notes `[click]` count matches page's v-click count
- [ ] Adjacent slides use different transitions (no repeated transition)

## Rebuild Checklist

After applying fixes:

1. List all changes made (slide number + what was fixed)
2. Rebuild: `npx slidev build`
3. Re-run review on fixed slides to confirm PASS
4. Return updated preview URL

## Process

1. Read the `slides-<topic>.md` file.
2. Walk through each slide separator (`---`), applying the checklist above.
3. If browser tools are available, open the preview URL and visually inspect.
4. Collect all issues as a structured list:
   - `slide`: slide number or title
   - `category`: overflow / mermaid / typography / animation / visual / content
   - `issue`: what is wrong
   - `fix`: suggested change
5. If issues found:
   - Apply fixes directly to the slides file
   - Rebuild preview (`npx slidev build` + restart server)
   - Re-check fixed slides
6. If no issues: report "Review passed" with preview URL.

## Output

Report format:

```
## Review Result: [PASS / X issues found]

### Issues Fixed
- Slide 3: Mermaid scale adjusted from 0.5 to 0.35 (was in two-col layout)
- Slide 7: Title shortened from 19 to 14 characters to prevent line wrap

### Remaining Concerns (if any)
- Slide 12: Complex diagram may benefit from splitting into two slides (manual decision)

### Preview URL
http://127.0.0.1:3045/
```

## Standalone Usage

User can trigger `/ppt-review` at any time on an existing slides file:

```
/ppt-review slides-<topic>.md
```

Agent will:
1. Read the file
2. Run the full checklist
3. Fix what it can
4. Rebuild and return updated preview URL
