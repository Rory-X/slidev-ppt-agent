---
name: slidev
description: Create and present web-based slidedecks for developers using Slidev with Markdown, Vue components, code highlighting, animations, and interactive features. Use when building technical presentations, conference talks, code walkthroughs, teaching materials, or developer decks.
---

# Slidev - Presentation Slides for Developers

Web-based slides maker built on Vite, Vue, and Markdown.

Compatible with @slidev/cli ^52.0.0

## When to Use

- Technical presentations or slidedecks with live code examples
- Syntax-highlighted code snippets with animations
- Interactive demos (Monaco editor, runnable code)
- Mathematical equations (LaTeX) or diagrams (Mermaid, PlantUML)
- Record presentations with presenter notes
- Export to PDF, PPTX, or host as SPA
- Code walkthroughs for developer talks or workshops

## Quick Start

```bash
npx create-slidev     # Create project
npx slidev            # Start dev server (opens http://localhost:3030)
npx slidev build      # Build static SPA
npx slidev export     # Export to PDF (requires playwright-chromium)
```

**Verify**: After `npx slidev`, confirm slides load at `http://localhost:3030`. After `npx slidev export`, check the output PDF exists in the project root.

## Role in PPT Harness

This skill is the **Slidev syntax and quality reference**. It does NOT orchestrate the pipeline -- that is handled by `.cursor/rules/ppt-harness-commands.mdc` and the phase-specific skills (`ppt-slide-composer`, `ppt-outline-architect`, etc.).

When composing slides, the `ppt-slide-composer` skill references this file for:
- Markdown syntax and frontmatter options
- Content density / overflow prevention rules
- Code block, Mermaid, and table best practices
- Available layouts and components

## Basic Syntax

```md
---
theme: default
title: My Presentation
---

# First Slide

Content here

---

# Second Slide

More content

<!--
Presenter notes go here
-->
```

- `---` separates slides
- First frontmatter = headmatter (deck config)
- HTML comments = presenter notes

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Markdown Syntax | Slide separators, frontmatter, notes, code blocks | [core-syntax](references/core-syntax.md) |
| Animations | v-click, v-clicks, motion, transitions | [core-animations](references/core-animations.md) |
| Headmatter | Deck-wide configuration options | [core-headmatter](references/core-headmatter.md) |
| Frontmatter | Per-slide configuration options | [core-frontmatter](references/core-frontmatter.md) |
| CLI Commands | Dev, build, export, theme commands | [core-cli](references/core-cli.md) |
| Components | Built-in Vue components | [core-components](references/core-components.md) |
| Layouts | Built-in slide layouts | [core-layouts](references/core-layouts.md) |
| Exporting | PDF, PPTX, PNG export options | [core-exporting](references/core-exporting.md) |
| Hosting | Build and deploy to various platforms | [core-hosting](references/core-hosting.md) |
| Global Context | $nav, $slidev, composables API | [core-global-context](references/core-global-context.md) |

## Feature Reference

### Code & Editor

| Feature | Usage | Reference |
|---------|-------|-----------|
| Line highlighting | `` ```ts {2,3} `` | [code-line-highlighting](references/code-line-highlighting.md) |
| Click-based highlighting | `` ```ts {1\|2-3\|all} `` | [code-line-highlighting](references/code-line-highlighting.md) |
| Line numbers | `lineNumbers: true` or `{lines:true}` | [code-line-numbers](references/code-line-numbers.md) |
| Scrollable code | `{maxHeight:'100px'}` | [code-max-height](references/code-max-height.md) |
| Code tabs | `::code-group` (requires `comark: true`) | [code-groups](references/code-groups.md) |
| Monaco editor | `` ```ts {monaco} `` | [editor-monaco](references/editor-monaco.md) |
| Run code | `` ```ts {monaco-run} `` | [editor-monaco-run](references/editor-monaco-run.md) |
| Edit files | `<<< ./file.ts {monaco-write}` | [editor-monaco-write](references/editor-monaco-write.md) |
| Code animations | `` ````md magic-move `` | [code-magic-move](references/code-magic-move.md) |
| TypeScript types | `` ```ts twoslash `` | [code-twoslash](references/code-twoslash.md) |
| Import code | `<<< @/snippets/file.js` | [code-import-snippet](references/code-import-snippet.md) |

### Diagrams & Math

| Feature | Usage | Reference |
|---------|-------|-----------|
| Mermaid diagrams | `` ```mermaid `` | [diagram-mermaid](references/diagram-mermaid.md) |
| PlantUML diagrams | `` ```plantuml `` | [diagram-plantuml](references/diagram-plantuml.md) |
| LaTeX math | `$inline$` or `$$block$$` | [diagram-latex](references/diagram-latex.md) |

### Layout & Styling

| Feature | Usage | Reference |
|---------|-------|-----------|
| Canvas size | `canvasWidth`, `aspectRatio` | [layout-canvas-size](references/layout-canvas-size.md) |
| Zoom slide | `zoom: 0.8` | [layout-zoom](references/layout-zoom.md) |
| Scale elements | `<Transform :scale="0.5">` | [layout-transform](references/layout-transform.md) |
| Layout slots | `::right::`, `::default::` | [layout-slots](references/layout-slots.md) |
| Scoped CSS | `<style>` in slide | [style-scoped](references/style-scoped.md) |
| Global layers | `global-top.vue`, `global-bottom.vue` | [layout-global-layers](references/layout-global-layers.md) |
| Draggable elements | `v-drag`, `<v-drag>` | [layout-draggable](references/layout-draggable.md) |
| Overflow prevention | Hard limits, fix techniques | [content-overflow-prevention](references/content-overflow-prevention.md) |
| Icons | `<mdi-icon-name />` | [style-icons](references/style-icons.md) |

### Animation & Interaction

| Feature | Usage | Reference |
|---------|-------|-----------|
| Click animations | `v-click`, `<v-clicks>` | [core-animations](references/core-animations.md) |
| Rough markers | `v-mark.underline`, `v-mark.circle` | [animation-rough-marker](references/animation-rough-marker.md) |
| Drawing mode | Press `C` or config `drawings:` | [animation-drawing](references/animation-drawing.md) |
| Direction styles | `forward:delay-300` | [style-direction](references/style-direction.md) |
| Note highlighting | `[click]` in notes | [animation-click-marker](references/animation-click-marker.md) |

### Syntax Extensions

| Feature | Usage | Reference |
|---------|-------|-----------|
| Comark syntax | `comark: true` + `{style="color:red"}` | [syntax-comark](references/syntax-comark.md) |
| Block frontmatter | `` ```yaml `` instead of `---` | [syntax-block-frontmatter](references/syntax-block-frontmatter.md) |
| Import slides | `src: ./other.md` | [syntax-importing-slides](references/syntax-importing-slides.md) |
| Merge frontmatter | Main entry wins | [syntax-frontmatter-merging](references/syntax-frontmatter-merging.md) |

### Presenter & Recording

| Feature | Usage | Reference |
|---------|-------|-----------|
| Recording | Press `G` for camera | [presenter-recording](references/presenter-recording.md) |
| Timer | `duration: 30min`, `timer: countdown` | [presenter-timer](references/presenter-timer.md) |
| Remote control | `slidev --remote` | [presenter-remote](references/presenter-remote.md) |
| Ruby text | `notesAutoRuby:` | [presenter-notes-ruby](references/presenter-notes-ruby.md) |

### Export & Build

| Feature | Usage | Reference |
|---------|-------|-----------|
| Export options | `slidev export` | [core-exporting](references/core-exporting.md) |
| Build & deploy | `slidev build` | [core-hosting](references/core-hosting.md) |
| Build with PDF | `download: true` | [build-pdf](references/build-pdf.md) |
| Cache images | Automatic for remote URLs | [build-remote-assets](references/build-remote-assets.md) |
| OG image | `seoMeta.ogImage` or `og-image.png` | [build-og-image](references/build-og-image.md) |
| SEO tags | `seoMeta:` | [build-seo-meta](references/build-seo-meta.md) |

**Export prerequisite**: `npm install -D playwright-chromium` is required for PDF/PPTX/PNG export. If export fails with a browser error, install this dependency first.

### Editor & Tools

| Feature | Usage | Reference |
|---------|-------|-----------|
| Side editor | Click edit icon | [editor-side](references/editor-side.md) |
| VS Code extension | Install `antfu.slidev` | [editor-vscode](references/editor-vscode.md) |
| Prettier | `prettier-plugin-slidev` | [editor-prettier](references/editor-prettier.md) |
| Eject theme | `slidev theme eject` | [tool-eject-theme](references/tool-eject-theme.md) |

### Lifecycle & API

| Feature | Usage | Reference |
|---------|-------|-----------|
| Slide hooks | `onSlideEnter()`, `onSlideLeave()` | [api-slide-hooks](references/api-slide-hooks.md) |
| Navigation API | `$nav`, `useNav()` | [core-global-context](references/core-global-context.md) |

## 内容密度规则（关键）

Slidev 默认画布是 **980×552px**。超出该区域的内容会被裁切，导致页面不可用。生成每一页时都必须遵守下方边界。

好的幻灯片也要避免意外空泛。普通内容页应该有意识地使用画布，用足够的证据、解读、对比或视觉结构支撑核心观点。不要为了防溢出而过度拆分或简化，导致内容页只占半屏。

### 单页密度预算

| 密度 | 目标 | 最低内容量 | 常见用途 |
|------|------|------------|----------|
| `light` | 刻意聚焦，使用 35-55% 画布 | 1 个强主张 + 英雄视觉/引用/CTA | cover、section、quote、end、hero metric |
| `standard` | 信息均衡，使用 60-80% 画布 | 3 个有效信息块，或 1 个视觉 + 2 个支撑块 | 默认内容页、对比页、流程页 |
| `dense` | 丰富但可读，使用 75-90% 画布 | 4 个以上信息块，或数据/代码/图表 + 明确解读 | dashboard、architecture、evidence page |

### 单页安全区间

| 元素 | 安全上限 | 溢出处理 |
|------|----------|----------|
| Bullet points | standard：4-6 条；dense：6-8 条并分组 | 转为卡片/分栏；超过预算才拆页 |
| Code block lines | 可见 10-12 行；12-18 行需要容器控制 | 使用 `{maxHeight:'200px'}`、减少可见行数，或拆页 |
| Mermaid diagram nodes | 8-10 个节点 | 使用 `{scale: 0.45}` 或简化；超过 8 个节点通常独立成页，除非非常紧凑 |
| Table rows | 5-6 行 | 增加 key takeaway、转置、卡片化，或拆页 |
| Two-col layout | 每栏约 250px 高 | 每栏不超过 6 条短内容 |
| Grid cards | standard：3-4 张；dense：4-6 张紧凑卡 | 使用 2x2、hero-top + mini cards 或 L-shape |
| Sequence diagram actors | 4-5 个参与者 | 简化或缩写名称 |

### 必用技巧

1. **代码块超过 10 行**：必须添加 `{maxHeight:'200px'}`、减少可见行数，或拆成多页
2. **Mermaid 图**：必须显式设置 `{scale: ...}`，不要使用默认缩放
   - 全宽页面：`{scale: 0.45}` 到 `{scale: 0.6}`
   - 双栏内部：`{scale: 0.3}` 到 `{scale: 0.4}`（可用宽度减半）
   - 节点文本：中文最多 8 字，英文最多 15 字
   - 超过 8 个节点：通常独立成页；只有在图非常紧凑且只搭配简短注释时才可同页
   - Mermaid 与其他内容同页时：用 `<div style="max-height:250px;overflow:hidden">` 包裹
   - 禁止 Mermaid + 代码块 + bullet list 三者同页
3. **高密度页面**：使用分组、Bento 布局和单页 frontmatter 的 `zoom: 0.8`，在不损害可读性的前提下多容纳约 20% 内容
4. **双栏布局**：每一栏都必须能独立放进约 250px 高度
5. **表格**：原始表格最多 6 行 × 5 列。对比项达到 7 个以上时，优先转置、缩写、卡片化或拆页
6. **组合元素**：禁止代码块 + 图示 + 列表三者同页；当其中一个元素明显轻量时，允许两类元素组合
7. **页面标题**：使用 `#` 标题（不要用 `##`），减少垂直空间占用
8. **自动目录**：超过 10 页的 deck 禁止使用 `<Toc>` 组件，容易溢出；改用手工摘要
9. **空泛内容页**：standard/dense 页面如果只有 1-2 条短 bullet 且没有强视觉，必须补充证据、案例、影响，或与相关页面合并

### 快速决策树

- 内容太多？→ 先分组、缩写、卡片化、使用 Bento 布局、添加 `maxHeight`/`zoom: 0.8`；仍超预算才拆页
- 内容太少？→ 补充支撑块、证据、案例、对比，或与相邻稀疏页面合并
- 代码太长？→ 使用 `{maxHeight:'200px'}` 滚动
- 图太大？→ 使用 `{scale: 0.45}` 或简化节点
- 表格太宽/太高？→ 减少列数、缩写单元格文本、转成卡片或拆页
- 仍然溢出？→ `zoom: 0.7` 作为最后手段

### 完成前自检

生成所有页面后，逐页检查：
1. 检查密度：standard/dense 页面是否至少有 3 个有效信息块，或等价视觉支撑？
2. 统计 bullet：超过 8 条时，是否已分组、卡片化或拆页？
3. 统计代码行：超过 12 行时，是否已添加 maxHeight 或拆页？
4. Mermaid 是否都有显式 scale？双栏中是否使用 `{scale: 0.35}` 左右？
5. 超过 8 个节点的 Mermaid 是否仍与重内容同页？如是，移到独立页面。
6. 双栏两侧都是代码块？通常会溢出，需要简化。
7. 表格超过 6 行？卡片化、转置或拆页。

See [content-overflow-prevention](references/content-overflow-prevention.md) for detailed examples.

## Common Layouts

| Layout | Purpose |
|--------|---------|
| `cover` | Title/cover slide |
| `center` | Centered content |
| `default` | Standard slide |
| `two-cols` | Two columns (use `::right::`) |
| `two-cols-header` | Header + two columns |
| `image` / `image-left` / `image-right` | Image layouts |
| `iframe` / `iframe-left` / `iframe-right` | Embed URLs |
| `quote` | Quotation |
| `section` | Section divider |
| `fact` / `statement` | Data/statement display |
| `intro` / `end` | Intro/end slides |

## Resources

- Documentation: https://sli.dev
- Theme Gallery: https://sli.dev/resources/theme-gallery
- Showcases: https://sli.dev/resources/showcases
