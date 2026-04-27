# Bento Grid Layout Patterns

Canvas: 980 × 552 px | Safe area: 900 × 472 px (40 px margins all sides)
Gap between cards: minimum 16 px, recommended 20–24 px

---

## Global Rules

- **One visual heavyweight per slide** — code block OR diagram OR metric table OR image. Never two heavyweights competing.
- **Hierarchy through size** — primary card ≥ 60 % of safe area, secondary ≤ 40 %.
- **Whitespace is a design element** — never fill every pixel. Leave breathing room between cards and around the slide edges.
- **Consistent gap** — pick one gap value (20 px recommended) and use it throughout the deck.
- **Alignment** — all card edges align to a shared grid. No arbitrary offsets.

## 信息密度规则

- **默认内容页不应空泛**：除 cover、section、quote、end、强视觉 hero 外，普通内容页至少应包含 3 个有效信息块，或 1 个主视觉 + 2 个支撑块。
- **优先升级布局，不要立刻拆页**：内容略多时，先使用 two-cols-asymmetric、hero-top、mixed-grid、L-shape、底部洞察条等模式提高承载力。
- **mixed-grid 是受控高密度模式**：用于 evidence-dashboard、comparison-matrix、process-with-risks、architecture-annotated 等页面，而不是默认规避对象。
- **轻量组合是推荐做法**：小图 + 注释卡、短代码 + 解释卡、紧凑表格 + 结论条可以同页，前提是只有一个真正的视觉重心。
- **拆页后仍要满足密度**：不要把一个充实页面拆成两个只排半屏的页面。

### 推荐高信息密度模板

| 模板 | 内容结构 | 适用场景 |
|------|----------|----------|
| `evidence-dashboard` | 1 个主张 + 4 个证据卡 | 调研结论、市场判断、竞品分析 |
| `insight-plus-proof` | 左侧强洞察 + 右侧 3 条证明 | 战略建议、趋势判断、研究解读 |
| `process-with-risks` | 3 步流程 + 底部风险条 | 项目计划、实施路线、SOP |
| `comparison-matrix-lite` | 2-3 个对象 × 3 个维度 + 结论条 | 方案评估、路径选择、定价对比 |
| `architecture-annotated` | 主图 + 3 个注释点 | 技术架构、数据流、平台能力 |

---

## Pattern: single-focus

One card dominates the slide. All attention on a single idea.

```
┌──────────────────────── 980 px ────────────────────────┐
│ 40 px                                           40 px  │
│    ┌──────────────── 900 px ──────────────────┐        │
│    │                                          │        │
│    │                                          │ 472 px │
│    │            single card                   │        │
│    │            900 × 472                     │        │
│    │                                          │        │
│    │                                          │        │
│    └──────────────────────────────────────────┘        │
│ 40 px                                           40 px  │
└────────────────────────────────────────────────────────┘
```

- **Card**: 900 × 472 px (fills entire safe area)
- **Content area**: ~80 % fill recommended; leave internal padding 24–32 px
- **Best for**: hero metric, full-width diagram, single code block, big quote, key takeaway
- **Page templates**: `hero-metric`, `quote-highlight`, `image-showcase`

---

## Pattern: two-cols-symmetric

Two equal columns for side-by-side comparison.

```
┌──────────────────────── 980 px ────────────────────────┐
│                                                        │
│    ┌──── 435 px ────┐  30px  ┌──── 435 px ────┐       │
│    │                │  gap   │                │       │
│    │                │        │                │       │
│    │    column A    │        │    column B    │472 px │
│    │                │        │                │       │
│    │                │        │                │       │
│    │                │        │                │       │
│    └────────────────┘        └────────────────┘       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Each column**: 435 × 472 px (gap: 30 px → 435 + 30 + 435 = 900)
- **Best for**: comparison, problem / solution, before / after, code + explanation
- **Page templates**: `content-split`, `detail-two-col`

---

## Pattern: two-cols-asymmetric

Primary content gets 60 % width; secondary gets 40 %.

```
┌──────────────────────── 980 px ────────────────────────┐
│                                                        │
│    ┌────── 540 px ──────┐ 20px ┌─── 340 px ───┐       │
│    │                    │ gap  │              │       │
│    │                    │      │              │       │
│    │   primary card     │      │  secondary   │472 px │
│    │                    │      │    card      │       │
│    │                    │      │              │       │
│    │                    │      │              │       │
│    └────────────────────┘      └──────────────┘       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Primary**: 540 × 472 px | **Secondary**: 340 × 472 px (gap: 20 px)
- **Best for**: diagram + annotation, metric + context, code + highlights, narrative + evidence
- **Page templates**: `content-split` (with custom grid-cols)

---

## Pattern: three-cols

Three equal columns for parallel items.

```
┌──────────────────────── 980 px ────────────────────────┐
│                                                        │
│    ┌─ 280 px ─┐ 30px ┌─ 280 px ─┐ 30px ┌─ 280 px ─┐  │
│    │          │      │          │      │          │  │
│    │          │      │          │      │          │  │
│    │  col A   │      │  col B   │      │  col C   │  │
│    │          │      │          │ 472  │          │  │
│    │          │      │          │  px  │          │  │
│    │          │      │          │      │          │  │
│    └──────────┘      └──────────┘      └──────────┘  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Each column**: 280 × 472 px (gaps: 30 px × 2 → 280 + 30 + 280 + 30 + 280 = 900)
- **Max content per card**: 3 short bullet lines + 1 icon or small visual
- **Best for**: three features, step-by-step process, feature comparison, triple metric
- **Page templates**: `three-cards`

---

## Pattern: hero-top

Large top region for primary content, narrow bottom strip for supporting detail.

```
┌──────────────────────── 980 px ────────────────────────┐
│                                                        │
│    ┌──────────────── 900 px ──────────────────┐        │
│    │                                          │        │
│    │            hero card                     │ 300 px │
│    │            900 × 300                     │        │
│    │                                          │        │
│    └──────────────────────────────────────────┘        │
│                        20 px gap                       │
│    ┌──────────────── 900 px ──────────────────┐        │
│    │         support strip  900 × 152         │ 152 px │
│    └──────────────────────────────────────────┘        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Top card**: 900 × 300 px | **Bottom strip**: 900 × 152 px (gap: 20 px → 300 + 20 + 152 = 472)
- **Bottom strip** can subdivide into 2–4 mini-cards horizontally
- **Best for**: diagram + caption, metric + explanation row, chart + key insights
- **Page templates**: `hero-metric` with subtitle row

---

## Pattern: mixed-grid

Multi-cell arrangements for dashboard-style slides.

### Variant A — 2 × 2 equal grid

```
┌──────────────────────── 980 px ────────────────────────┐
│                                                        │
│    ┌──── 435 px ────┐  30px  ┌──── 435 px ────┐       │
│    │                │  gap   │                │       │
│    │    cell A1     │        │    cell A2     │226 px │
│    │                │        │                │       │
│    └────────────────┘        └────────────────┘       │
│                        20 px gap                       │
│    ┌──── 435 px ────┐  30px  ┌──── 435 px ────┐       │
│    │                │  gap   │                │       │
│    │    cell B1     │        │    cell B2     │226 px │
│    │                │        │                │       │
│    └────────────────┘        └────────────────┘       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Each cell**: 435 × 226 px (h-gap: 30 px, v-gap: 20 px)
- 435 + 30 + 435 = 900 ✓ | 226 + 20 + 226 = 472 ✓

### Variant B — 1 large + 2 stacked

```
┌──────────────────────── 980 px ────────────────────────┐
│                                                        │
│    ┌────── 540 px ──────┐ 20px ┌─── 340 px ───┐       │
│    │                    │ gap  │              │       │
│    │                    │      │   small A    │226 px │
│    │                    │      │              │       │
│    │   large card       │      └──────────────┘       │
│    │   540 × 472        │      20 px gap               │
│    │                    │      ┌─── 340 px ───┐       │
│    │                    │      │              │       │
│    │                    │      │   small B    │226 px │
│    │                    │      │              │       │
│    └────────────────────┘      └──────────────┘       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Large card**: 540 × 472 px | **Small cards**: 340 × 226 px each
- 540 + 20 + 340 = 900 ✓ | 226 + 20 + 226 = 472 ✓

**Best for**: dashboard view, multi-metric summary, feature grid, KPI overview
**Page templates**: `metrics-strip`, `three-cards` (dense variant)

---

## Pattern: L-shape

Primary content fills the left; two stacked supporting cards on the right.

```
┌──────────────────────── 980 px ────────────────────────┐
│                                                        │
│    ┌────── 540 px ──────┐ 20px ┌─── 340 px ───┐       │
│    │                    │ gap  │              │       │
│    │                    │      │  side-top    │226 px │
│    │                    │      │              │       │
│    │   main card        │      └──────────────┘       │
│    │   540 × 472        │      20 px gap               │
│    │                    │      ┌─── 340 px ───┐       │
│    │                    │      │              │       │
│    │                    │      │  side-bottom │226 px │
│    │                    │      │              │       │
│    └────────────────────┘      └──────────────┘       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Main card**: 540 × 472 px | **Side-top**: 340 × 226 px | **Side-bottom**: 340 × 226 px
- 540 + 20 + 340 = 900 ✓ | 226 + 20 + 226 = 472 ✓
- **Best for**: primary content + two supporting details, code block + output + explanation, architecture diagram + metrics + notes
- **Page templates**: `detail-two-col` variant

---

## Pattern: T-shape

Wide top banner spanning full width, two columns below.

```
┌──────────────────────── 980 px ────────────────────────┐
│                                                        │
│    ┌──────────────── 900 px ──────────────────┐        │
│    │                                          │        │
│    │         top banner  900 × 180            │ 180 px │
│    │                                          │        │
│    └──────────────────────────────────────────┘        │
│                        20 px gap                       │
│    ┌──── 435 px ────┐  30px  ┌──── 435 px ────┐       │
│    │                │  gap   │                │       │
│    │  bottom-left   │        │  bottom-right  │272 px │
│    │                │        │                │       │
│    │                │        │                │       │
│    └────────────────┘        └────────────────┘       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Top banner**: 900 × 180 px | **Bottom-left**: 435 × 272 px | **Bottom-right**: 435 × 272 px
- 435 + 30 + 435 = 900 ✓ | 180 + 20 + 272 = 472 ✓
- **Best for**: section header + two supporting columns, topic introduction + detail pair, headline metric + two breakdowns
- **Page templates**: `content-split` with section bar

---

## Pattern: full-bleed

No margins. Content fills the entire canvas for maximum visual impact.

```
┌──────────────────────── 980 px ────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░  full-bleed background image / gradient  ░░░░░░░│ 552 px
│░░░░░░                980 × 552                 ░░░░░░░│
│░░░░░░  ┌──── text overlay with backdrop ────┐  ░░░░░░░│
│░░░░░░  │  semi-transparent content card     │  ░░░░░░░│
│░░░░░░  └────────────────────────────────────┘  ░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└────────────────────────────────────────────────────────┘
```

- **Canvas**: 980 × 552 px (no safe-margin enforcement)
- **Text overlay**: centered card with `backdrop-filter: blur()` or semi-transparent `background`, internal padding 48–64 px
- **Best for**: image backgrounds, dramatic covers, visual section breaks, cinematic transitions
- **Page templates**: `cover`, `image-showcase`
- **Caution**: keep text large (≥ 28 px) and high-contrast for readability over busy backgrounds

---

## Anti-patterns

### Anti-pattern 1: The Wall of Text

```
┌────────────────────────────────────────────┐
│  • Bullet point one about the topic        │
│  • Bullet point two with more detail       │
│  • Bullet point three expanding further    │
│  • Bullet point four yet another item      │
│  • Bullet point five still going           │
│  • Bullet point six won't stop             │
│  • Bullet point seven almost done          │
│  • Bullet point eight finally              │
│  (no visuals, no hierarchy, no breathing)  │
└────────────────────────────────────────────┘
```

**Problem**: No visual hierarchy. Audience reads ahead of the speaker and disengages. Every bullet competes equally for attention — nothing stands out.

**Fix**: Split into 2–3 slides. Use `single-focus` for the key message, then `three-cols` or `two-cols-symmetric` for supporting details. Maximum 4 bullet points per card.

---

### Anti-pattern 2: The Everything Slide

```
┌────────────────────────────────────────────┐
│  ┌─code block──┐  ┌─diagram──────────┐    │
│  │ function()  │  │  ┌──┐    ┌──┐    │    │
│  │   return x  │  │  │A │───▶│B │    │    │
│  │ }           │  │  └──┘    └──┘    │    │
│  └─────────────┘  └──────────────────┘    │
│  • Bullet explaining the code              │
│  • Bullet explaining the diagram           │
│  • Bullet with extra context               │
│  ┌─────── data table ───────────────┐      │
│  │  col1  │  col2  │  col3  │ col4  │      │
│  └───────────────────────────────────┘      │
└────────────────────────────────────────────┘
```

**Problem**: Three visual heavyweights (code + diagram + table) compete for attention. The eye has no anchor point. Cognitive load is extreme.

**Fix**: One heavyweight per slide. Use `single-focus` for the code, a separate `two-cols-asymmetric` for diagram + annotation, and `hero-top` for the data table + insight.

---

### Anti-pattern 3: The Micro Grid

```
┌────────────────────────────────────────────┐
│ ┌──────┐ ┌──────┐ ┌──────┐                │
│ │tiny 1│ │tiny 2│ │tiny 3│                │
│ │ 8pt  │ │ 8pt  │ │ 8pt  │                │
│ └──────┘ └──────┘ └──────┘                │
│ ┌──────┐ ┌──────┐ ┌──────┐                │
│ │tiny 4│ │tiny 5│ │tiny 6│                │
│ │ 8pt  │ │ 8pt  │ │ 8pt  │                │
│ └──────┘ └──────┘ └──────┘                │
│        (all cards identical size)          │
└────────────────────────────────────────────┘
```

**Problem**: Six equal-sized cards with tiny text (< 12 px). Nothing signals importance. Unreadable beyond the first few rows of a venue. No visual hierarchy at all.

**Fix**: Promote the most important item to a primary card. Use `hero-top` (1 large + strip) or `L-shape` (1 primary + 2 secondary). If all six items are truly needed, split across two slides using `three-cols` each.

---

## Quick Reference

| Pattern              | Dimensions (px)                          | Cards | Best for                      |
|----------------------|------------------------------------------|-------|-------------------------------|
| single-focus         | 900 × 472                               | 1     | hero metric, big diagram      |
| two-cols-symmetric   | 435 × 472 each                           | 2     | comparison, A / B             |
| two-cols-asymmetric  | 540 × 472 + 340 × 472                   | 2     | primary + support             |
| three-cols           | 280 × 472 each                           | 3     | features, steps               |
| hero-top             | 900 × 300 + 900 × 152                   | 1 + 1 | diagram + caption             |
| mixed-grid (2×2)     | 435 × 226 each                           | 4     | dashboard, multi-KPI          |
| mixed-grid (1+2)     | 540 × 472 + 340 × 226 each              | 1 + 2 | feature focus + details       |
| L-shape              | 540 × 472 + 340 × 226 each              | 1 + 2 | code + output + notes         |
| T-shape              | 900 × 180 + 435 × 272 each              | 1 + 2 | section intro + columns       |
| full-bleed           | 980 × 552 (no margins)                  | 1     | covers, visual breaks         |
