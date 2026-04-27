---
name: ppt-slide-composer
description: Compose high-quality Slidev slides from outline and style plan. Use after outline is approved to write the final slides markdown.
---

# PPT Slide Composer

## When to Use

After outline (`outline.json`) and style plan (`style-plan.md`) are ready. This skill produces the final `slides-<topic>.md`.

## Required Inputs

- `outline.json` -- approved structural outline
- `style-plan.md` -- selected archetype, tokens, layout strategy
- `.agents/skills/slidev/SKILL.md` -- Slidev syntax and overflow rules
- `design-system/page-templates/*.md` -- visual design language examples
- `design-system/styles/` -- CSS classes and animation presets
- `design-system/reference-style.md` -- visual benchmark

## 便当网格 (Bento Grid) 布局系统

这是一种灵活的网格系统，其布局应由内容本身的需求驱动，而非僵硬的模板。通过组合不同尺寸的卡片，创造出动态且视觉有趣的布局。

### 核心原则
- **灵活性**: 卡片数量不固定。可以是 1, 2, 3, 4, 5 或更多个，取决于如何更好地呈现信息。
- **层级感**: 使用卡片尺寸建立视觉层级。最重要的信息放在最大的卡片上。
- **留白**: 在所有卡片之间保持至少 20px 的间距。

## 版面信息密度预算（关键）

每一页内容型幻灯片都要同时控制两个风险：溢出和空泛。不要为了避免溢出而把所有页面都做得很稀疏。生成时必须读取大纲中的 `density`、`page_type`、`content_budget`，据此判断该页应该承载多少信息。

| 密度 | 画布使用目标 | 最低内容量 | 常见布局 |
|------|--------------|------------|----------|
| `light` | 35-55%，刻意聚焦 | 1 个强主张 + 英雄视觉/引用/CTA | cover、section、quote、end、hero metric |
| `standard` | 60-80%，信息均衡 | 3 个有效信息块，或 1 个视觉 + 2 个支撑块 | two-cols、hero-top、3-4 cards |
| `dense` | 75-90%，丰富但可读 | 4 个以上信息块，或数据/代码/图表 + 明确解读 | mixed-grid、L-shape、dashboard、annotated architecture |

### 防空泛规则

普通内容页禁止出现“意外稀疏”。如果页面只有标题加一句短句、一个孤立小卡片，或 1-2 条 bullet 且没有强视觉支撑，就属于信息不足。

当页面显得空泛时，先增强内容，再考虑新增页面：
- 补充证据、案例、权衡、影响、下一步行动，或底部洞察条。
- 把普通 bullet 转换成 3-4 张带短标题和解释的卡片。
- 将紧凑图表、图像或 Mermaid 与 2-3 个解读卡片组合。
- 如果相邻两个低密度内容页表达同一个观点，优先合并。

### 受控组合规则

“单一视觉重心”用于避免两个重元素互相争夺注意力，不等于禁止上下文信息。只要各元素都在尺寸预算内，允许以下组合：
- 小型 Mermaid 或图示 + 2-3 个注释卡片。
- 短代码块（不超过 12 行）+ 解释卡 + 关键结论。
- 紧凑表格 + 1 条高亮洞察。
- 英雄指标 + 3 个支撑迷你卡片。

只有在分组、缩写、Bento 布局、`maxHeight` 或 `zoom: 0.8` 之后仍超过密度预算时，才拆分页面。

### 布局组合示例
- **单一焦点**: 一张大卡片覆盖大部分区域 (w=1200, h=580)。适用于单一、有力的信息或详细的图表。
- **两栏布局 (50/50 对称)**: 两张等宽的卡片。
- **两栏布局 (非对称)**: 一张较宽的卡片（如 2/3 宽度）用于主内容，一张较窄的（1/3 宽度）用于辅助信息、数据或图片。
- **三栏布局**: 三张等宽的卡片，适合并列比较三项内容。
- **主次结合**: 一张大的居中卡片，两侧各一张小的垂直卡片。
- **顶部英雄式**: 顶部一张宽幅"英雄"卡片，下方是 2-4 个较小的等宽卡片网格。
- **混合网格 (自由度最高)**: 自由混合各种尺寸的卡片，例如一个中等方块、两个小的水平矩形和一个垂直矩形。

## Dark/Light Mode Compatibility (CRITICAL)

Always use CSS variable names from `design-system/styles/global-tokens.css`, NEVER hardcode color hex values in slides. The design system automatically adapts to dark and light mode.

- Use `var(--ppt-primary)` not `#2DD4BF`
- Use `var(--ppt-text)` not `#FFFFFF`
- Use `var(--ppt-surface)` not `rgba(255,255,255,0.04)`
- Use `var(--ppt-border)` not `rgba(255,255,255,0.08)`

The ONLY exception: `style` attributes in the page-template examples may show hex values for illustration. When composing real slides, always replace with `var(--ppt-xxx)`.

## 创造力原则

- 范例定义设计语言底线，不定义创意上限。
- **强约束（必须遵守）**：配色体系、字体层级、卡片样式（glass-morphism）、间距规范、动画节制度 -- 保证视觉一致性。
- **创意空间（鼓励发挥）**：布局组合方式、图表形式、视觉隐喻、信息可视化手法、叙事节奏 -- 根据具体内容选择最佳表达。
- 当内容适合用范例中不存在的表现形式（如时间轴、对比矩阵、数据仪表盘）时，**主动创造**，而非降级为最近似的范例类型。

## Mermaid Diagram Rules (CRITICAL)

Mermaid diagrams are the #1 source of overflow issues. Follow these strictly:

1. **Always set explicit scale**:
   - Full-width slide: `{scale: 0.45}` to `{scale: 0.6}`
   - Inside two-column layout: `{scale: 0.3}` to `{scale: 0.4}`
2. **Keep node text short**: max 8 Chinese characters / 15 English characters per node. Use abbreviations.
3. **Dedicated slide for complex diagrams**: if >8 nodes, the Mermaid MUST be the only content on that slide.
4. **Height containment**: when Mermaid shares a slide with other content, wrap it:
   ```html
   <div style="max-height:250px;overflow:hidden">

   ```mermaid {scale: 0.4}
   graph TD
       A --> B --> C
   ```

   </div>
   ```
5. **Forbidden combo**: never place Mermaid + code block + bullet list on the same slide.
6. **Prefer simpler diagram types**: `graph TD` > `flowchart` for simple flows; avoid `classDiagram` unless truly needed.

## 组合流程

1. 阅读 outline 和 style plan。
2. 设置 headmatter（主题、标题、转场、来自 token set 的字体）。
3. 引入 `design-system/styles/` 中的全局样式。
4. 针对 outline 中的每一页：
   a. 根据内容判断最合适的页面类型和布局。
   b. 读取 `density`、`page_type`、`content_budget`；选择既满足最低内容量又不溢出的布局。
   c. 参考最接近的 page-template 作为设计语言基线。
   d. 使用 Slidev markdown 编写页面，并应用设计系统 CSS class。
   e. 应用合适的动画（见下方动画策略）。
   f. 添加演讲者备注（HTML 注释）。
5. 根据 slidev skill 的溢出规则进行自检。

## Animation Strategy

Per page type:
- **Cover**: fade-out transition, no reveal
- **TOC**: v-clicks to reveal cards sequentially
- **Content split**: left side first, right side v-click follow
- **Three cards**: v-clicks left to right
- **Detail two-col**: present together or left-right step
- **Code showcase**: line highlight step reveal
- **Summary**: v-clicks for cards + closing statement together

Global constraints:
- Max 2 reveal effects per slide
- Adjacent slides should not use the same transition
- Section dividers use fade, content slides use slide-left

## 质量门禁

- 每页都有演讲者备注
- 内容不溢出（遵守 slidev skill 的密度规则）
- 不出现意外空泛的内容页（standard/dense 页面必须满足 content_budget）
- 配色和字体匹配选定的 token set（必须）
- 动画符合页面场景
- 需要时使用双语标题（中文主标题 + 英文副标题）

## 主动拆页规则

当 outline 标注页面为高密度时：
- **7-8 条 bullet**：先分组成卡片、分栏或洞察条，再考虑拆页
- **超过 8 条 bullet**：除非是紧凑 checklist 或表格型结构，否则拆页
- **超过 12 行代码**：使用 `maxHeight: '300px'`、减少可见行数，或在代码本身是叙事重点时拆页
- **超过 8 个 Mermaid 节点**：必须使用独立全宽页面
- **代码 + 大型图示同页**：禁止。短代码块可以与小型解释图搭配，但二者不能同时成为页面主视觉。

## Image Usage Rules

- Max height: 60% of canvas (330px on 552px canvas)
- Always use `object-fit: cover` for background images
- Every image must have alt-text in presenter notes: `<!-- alt: description of image -->`
- Prefer Unsplash URLs for stock imagery; never use broken/placeholder URLs
- For diagrams: use `.diagram-container` class for consistent sizing

## Table Overflow Rules

- **> 5 rows OR > 4 columns**: apply `text-sm` or `text-xs` class
- **> 8 rows**: MUST split into multiple slides or simplify
- **Wide tables** (> 4 columns with long text): consider transposing or using comparison cards instead
- Always wrap tables in `.ppt-table` class for consistent styling

## One-Focus-Per-Page Principle

Each slide has exactly ONE visual heavyweight:
- ONE code block, OR
- ONE diagram/Mermaid, OR
- ONE large metric/number, OR
- ONE comparison table, OR
- ONE quote block

禁止组合两个重元素（例如大型代码块 + 大型图示）。轻量元素（短文本、不超过 4 条的 bullet、小图标、迷你 KPI、1-2 个注释卡）应该作为重元素的上下文补充，避免页面显得空。

## Design System Enforcement

**Headmatter** (first slide's frontmatter) MUST include:
```yaml
css:
  - design-system/styles/global-tokens.css
  - design-system/styles/page-classes.css
  - design-system/styles/animation-presets.css
```

**Color rules**:
- FORBIDDEN: raw hex values (`#4DA3FF`), Tailwind color classes (`text-blue-500`, `bg-green-100`)
- REQUIRED: CSS variables (`var(--ppt-primary)`, `var(--ppt-surface)`, `var(--ppt-text-secondary)`)

**Typography rules**:
- Use design system classes: `.ppt-h1`, `.ppt-h2`, `.ppt-body`, `.ppt-caption`
- Or CSS variables: `font-size: var(--ppt-text-h1)`

## Animation Feature Selection Guide

Choose the right animation mechanism for each content type:

| Content Type | Mechanism | When to Use |
|-------------|-----------|-------------|
| Sequential list | `v-clicks` | List has > 3 items and order matters |
| Code evolution | `magic-move` | Showing code transformation (max 3 steps) |
| Key emphasis | `v-mark` | Highlighting a specific word/phrase during talk |
| Element entrance | `v-motion` | Hero element on focal slide (sparingly) |
| Content toggle | `v-switch` | Before/after comparison on same slide |
| Simple reveal | `v-click` | Any block needing click-to-show (max 2 per page) |

## magic-move Rules

- ONLY on code showcase pages
- Max 3 transformation steps
- Each step's code diff should be <= 30% changed lines
- Always set language explicitly in fence

## v-mark Color Constraints

Only use colors that match token accent palette:
- `v-mark.underline.orange` (maps to --ppt-accent-warm)
- `v-mark.circle.green` (maps to --ppt-success)
- `v-mark.highlight.red` (maps to --ppt-danger)

Do NOT use arbitrary colors like `v-mark.underline.pink`.

## Presenter Notes Requirements

Every slide MUST have presenter notes in HTML comments:
```html
<!-- 
Speaker notes for this slide.
[click] First reveal point discussion.
[click] Second reveal point discussion.
Evidence: F3, F7 (from research-report.md)
-->
```
- `[click]` markers must match the number of v-click/v-clicks on the page
- Evidence refs trace back to research finding IDs
