---
id: cover
contentTypes: [opening, branding]
mood: [calm, authoritative]
density: light
visualImpact: medium
bestFor: "演讲开场第一页，建立主题权威感和视觉基调"
avoid: "不用于正文内容页或中间过渡"
pairs_well_with: [toc, content-split, gradient-divider]
---

# Page Template: Cover

Design intent: Centered symmetric hierarchy with glass-morphism frame. Calm, authoritative first impression. Uses CSS variables for dark/light mode compatibility.

```md
---
layout: center
class: text-center
---

<div class="flex flex-col items-center justify-center h-full">

<div class="glass-card px-16 py-12 max-w-3xl">

<div class="icon-box mx-auto mb-6">
  <mdi-cube-outline class="text-xl" />
</div>

<div class="text-xs tracking-[0.2em] uppercase" style="color:var(--ppt-primary)">CATEGORY LABEL</div>

# Presentation Title

<div class="text-xl font-bold mt-2 mb-4" style="color:var(--ppt-primary)">中文副标题</div>

<div class="divider-line mb-6"></div>

<div class="text-sm" style="color:var(--ppt-text-muted)">辅助说明文字</div>

<div class="text-xs mt-6 tracking-wider" style="color:var(--ppt-text-muted)">2026-04-15 · DOCUMENT TYPE</div>

</div>

</div>

<!--
演讲者备注：开场白，介绍主题背景和本次分享目标。
-->
```
