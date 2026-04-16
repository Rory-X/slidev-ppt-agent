# Bento Layout Patterns

This file defines reusable layout policy for content slides.

## Global Rules
- Minimum card gap: `20px`.
- Use card size to indicate information hierarchy.
- Put the core claim in the largest visual area.
- Keep one primary visual intention per slide.

## Pattern Library

### single-focus
- One dominant card (`w=1200`, `h=580`) for strong claim or single chart.
- Use when audience should remember one point.

### two-cols-symmetric
- Two equal cards (`50/50`) for comparison.
- Suitable for pros/cons, old/new, option A/B.

### two-cols-asymmetric
- Main card (`2/3`) + support card (`1/3`).
- Main card contains narrative; side card contains KPI, quote, or evidence.

### three-cols
- Three equal cards for parallel dimensions.
- Limit each card to 3 short bullet lines.

### hero-top
- Top hero card + bottom 2-4 support cards.
- Good for one conclusion + supporting evidence set.

### mixed-grid
- Freeform arrangement (one medium square + two small horizontal + one vertical).
- Use only when it improves comprehension over standard columns.

## Mapping Guide
- Strategy/content heavy: `single-focus`, `two-cols-asymmetric`.
- Data comparison: `two-cols-symmetric`, `three-cols`.
- Pitch storytelling: `hero-top`, `mixed-grid`.
