# Reference Style Specification

Extracted from the high-quality "Claude Code Agent Team 架构设计" PPT (18 pages).

This specification defines the **aesthetic baseline and consistency standard**, not a creative ceiling. Agent should creatively adapt and exceed this baseline while respecting the mandatory constraints.

## Color Palette

| Role | Value | Usage |
|------|-------|-------|
| Background | `#0B1020` | Page background, deep navy |
| Surface | `rgba(255,255,255,0.04)` | Card fill, glass-morphism base |
| Border | `rgba(255,255,255,0.08)` | Card borders, subtle separation |
| Primary Accent | `#2DD4BF` | Titles, icons, numbers, dividers, key highlights |
| Secondary Accent | `#A78BFA` | Tags, secondary highlights, purple labels |
| Text Primary | `#FFFFFF` | Main headings |
| Text Body | `#C7C9D9` | Body text, descriptions |
| Text Muted | `#6B7280` | Auxiliary text, timestamps |

## Typography

- **Title**: Bold weight (700-800), Chinese primary + English subtitle with `letter-spacing: 0.15em`
- **Section heading**: Left 3px accent vertical bar + number prefix + bold
- **Body**: Regular weight (400), `#C7C9D9`
- **Keyword emphasis**: Bold + primary accent color within body text
- **Bilingual pattern**: Chinese main text + English small-caps subtitle below

## Card System (Glass-Morphism)

```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 24px 28px;
}
```

- Card gap: `20-24px`
- Each card typically has an icon-box at top

## Icon Box

```css
.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(45, 212, 191, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2DD4BF;
}
```

## Section Bar (Title Indicator)

```css
.section-bar {
  border-left: 3px solid #2DD4BF;
  padding-left: 16px;
}
```

## Tag Badge

```css
.tag-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  background: rgba(45, 212, 191, 0.15);
  color: #2DD4BF;
}
```

## Decorative Elements

- Background: ultra-faint tech grid / dot-matrix pattern
- Top-right corner: occasional small colored squares (3 dots: teal + purple + navy)
- Dashed lines connecting related elements

## Page Type Inventory (from reference)

1. **Cover** -- centered symmetric: icon-box + uppercase-spaced category + large title + accent subtitle + divider + date
2. **TOC** -- section-bar title + 2x3 card grid, each card = large number + Chinese title + English subtitle + icon
3. **Content Split** -- left stacked content cards + right diagram/illustration
4. **Three Cards** -- section title + subtitle + 3 equal glass cards with icon-box + title + tag + bullet list
5. **Detail Two-Col** -- two unequal glass cards side-by-side, each with sub-sections, arrow connecting
6. **Summary** -- centered title + 3 small cards (icon + title + short desc) + large closing text
