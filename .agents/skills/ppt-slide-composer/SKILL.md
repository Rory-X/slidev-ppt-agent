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

### 布局组合示例
- **单一焦点**: 一张大卡片覆盖大部分区域 (w=1200, h=580)。适用于单一、有力的信息或详细的图表。
- **两栏布局 (50/50 对称)**: 两张等宽的卡片。
- **两栏布局 (非对称)**: 一张较宽的卡片（如 2/3 宽度）用于主内容，一张较窄的（1/3 宽度）用于辅助信息、数据或图片。
- **三栏布局**: 三张等宽的卡片，适合并列比较三项内容。
- **主次结合**: 一张大的居中卡片，两侧各一张小的垂直卡片。
- **顶部英雄式**: 顶部一张宽幅"英雄"卡片，下方是 2-4 个较小的等宽卡片网格。
- **混合网格 (自由度最高)**: 自由混合各种尺寸的卡片，例如一个中等方块、两个小的水平矩形和一个垂直矩形。

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

## Composition Process

1. Read outline and style plan.
2. Set up headmatter (theme, title, transition, fonts from token set).
3. Import global styles from `design-system/styles/`.
4. For each page in outline:
   a. Determine the best page type / layout based on content.
   b. Reference the closest page-template as design language baseline.
   c. Write the slide using Slidev markdown, applying CSS classes from the design system.
   d. Apply appropriate animation (see Animation Strategy below).
   e. Add presenter notes (HTML comments).
5. Run self-check against overflow rules from slidev skill.

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

## Quality Gates

- Every slide has presenter notes
- No content overflow (follow slidev skill density rules)
- Colors and fonts match the selected token set (mandatory)
- Animation fits the page scenario
- Bilingual headings where appropriate (Chinese main + English subtitle)
