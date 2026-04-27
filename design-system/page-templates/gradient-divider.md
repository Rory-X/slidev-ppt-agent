---
id: gradient-divider
contentTypes: [section-break, transition, mood-shift]
mood: [dramatic, energetic, inspiring]
density: light
visualImpact: high
bestFor: "全页渐变章节分割页，用于大的叙事转折或情绪切换"
avoid: "连续使用多个分割页；正式企业汇报 (corporate-blue) 中慎用"
pairs_well_with: [cover, content-split, hero-metric]
incompatible_tokens: [corporate-blue, mono-editorial]
---

# Page Template: Gradient Divider

Design intent: Full-page gradient background with centered section title for dramatic narrative transitions. Breaks the visual rhythm to signal a major topic shift. Uses CSS gradient with token colors. Minimal content — just title and optional subtitle — lets the visual weight of color do the work.

## Light Variant (centered title)

```md
---
layout: center
class: text-center
transition: fade
---

<div class="absolute inset-0" style="background:linear-gradient(135deg, var(--ppt-primary), var(--ppt-secondary))"></div>

<div class="relative z-10 flex flex-col items-center justify-center h-full">

<div class="text-xs tracking-[0.3em] uppercase mb-4" style="color:rgba(255,255,255,0.6)">PART 02</div>

<div class="text-4xl font-bold mb-4" style="color:#fff">核心方案</div>

<div class="w-16 h-[2px] mx-auto mb-4" style="background:rgba(255,255,255,0.4)"></div>

<div class="text-base" style="color:rgba(255,255,255,0.8)">从架构设计到落地实施</div>

</div>

<!--
演讲者备注：全屏渐变分割页，标志从"背景分析"进入"方案阐述"的叙事转折。停留 3 秒让观众完成心理转换，然后开始讲解。
-->
```

## Heavy Variant (with icon and progress indicator)

```md
---
layout: center
class: text-center
transition: fade
---

<div class="absolute inset-0" style="background:linear-gradient(160deg, var(--ppt-primary), color-mix(in srgb, var(--ppt-secondary) 70%, var(--ppt-primary)))"></div>

<div class="relative z-10 flex flex-col items-center justify-center h-full">

<div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style="background:rgba(255,255,255,0.15);backdrop-filter:blur(8px)">
  <mdi-rocket-launch class="text-3xl" style="color:#fff" />
</div>

<div class="text-xs tracking-[0.3em] uppercase mb-3" style="color:rgba(255,255,255,0.6)">SECTION 3 OF 5</div>

<div class="text-4xl font-bold mb-3" style="color:#fff">产品演示</div>

<div class="text-sm max-w-sm" style="color:rgba(255,255,255,0.75)">让产品自己说话——三个核心场景的实时演示</div>

<div class="flex gap-2 mt-8">
  <div class="w-8 h-1 rounded-full" style="background:rgba(255,255,255,0.3)"></div>
  <div class="w-8 h-1 rounded-full" style="background:rgba(255,255,255,0.3)"></div>
  <div class="w-8 h-1 rounded-full" style="background:rgba(255,255,255,1)"></div>
  <div class="w-8 h-1 rounded-full" style="background:rgba(255,255,255,0.3)"></div>
  <div class="w-8 h-1 rounded-full" style="background:rgba(255,255,255,0.3)"></div>
</div>

</div>

<!--
演讲者备注：带进度指示器的渐变分割页，让观众知道"我们在哪"。图标呼应即将展示的内容主题。用于较长演讲（5 章节以上）的导航。
-->
```
