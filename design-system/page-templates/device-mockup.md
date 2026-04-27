---
id: device-mockup
contentTypes: [product, demo, screenshot, ui]
mood: [polished, professional, inspiring]
density: medium
visualImpact: high
bestFor: "产品界面展示、App 截图演示、UI 设计成果呈现"
avoid: "无真实截图/界面时不要用空壳占位；纯代码/架构内容"
pairs_well_with: [image-showcase, hero-metric, content-split]
---

# Page Template: Device Mockup

Design intent: Product screenshot or UI demo displayed within a device frame (laptop/phone). The device shell adds perceived professionalism and context. CSS-only device frame ensures no external image dependencies. Content area accepts screenshots or iframe embeds.

## Light Variant (laptop frame)

```md
---
layout: center
transition: fade
---

<div class="flex flex-col items-center justify-center h-full">

<div class="text-xs tracking-[0.2em] uppercase mb-6" style="color:var(--ppt-text-muted)">PRODUCT DEMO</div>

<div class="relative w-[680px]">
  <div class="rounded-t-xl pt-6 pb-0 px-4" style="background:var(--ppt-surface)">
    <div class="flex items-center gap-2 mb-3 px-2">
      <div class="w-3 h-3 rounded-full" style="background:#ef4444"></div>
      <div class="w-3 h-3 rounded-full" style="background:#f59e0b"></div>
      <div class="w-3 h-3 rounded-full" style="background:#22c55e"></div>
      <div class="flex-1 mx-4 h-5 rounded-md" style="background:var(--ppt-border)"></div>
    </div>
    <div class="rounded-t-md overflow-hidden" style="background:var(--ppt-background);border:1px solid var(--ppt-border)">
      <img src="/screenshots/product-dashboard.png" class="w-full" alt="产品仪表盘界面" />
    </div>
  </div>
  <div class="h-4 rounded-b-xl" style="background:var(--ppt-surface)"></div>
</div>

<div v-click class="text-sm mt-6 max-w-md text-center" style="color:var(--ppt-text-body)">
  一站式仪表盘，关键指标实时可见
</div>

</div>

<!--
演讲者备注：笔记本外框展示产品真实界面。替换 img src 为实际截图路径。点击后出现一句话描述核心价值。
[click] 展示产品描述
-->
```

## Heavy Variant (phone + laptop side-by-side)

```md
---
transition: fade
---

<div class="section-bar">

# 多端适配体验
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">桌面端与移动端的一致性设计</div>

</div>

<div class="flex items-end justify-center gap-8 mt-8">

<div class="relative w-[480px]">
  <div class="rounded-t-xl pt-5 pb-0 px-3" style="background:var(--ppt-surface)">
    <div class="flex items-center gap-2 mb-2 px-2">
      <div class="w-2.5 h-2.5 rounded-full" style="background:#ef4444"></div>
      <div class="w-2.5 h-2.5 rounded-full" style="background:#f59e0b"></div>
      <div class="w-2.5 h-2.5 rounded-full" style="background:#22c55e"></div>
      <div class="flex-1 mx-3 h-4 rounded" style="background:var(--ppt-border)"></div>
    </div>
    <div class="rounded-t overflow-hidden" style="background:var(--ppt-background);border:1px solid var(--ppt-border)">
      <img src="/screenshots/desktop-view.png" class="w-full" alt="桌面端界面" />
    </div>
  </div>
  <div class="h-3 rounded-b-xl" style="background:var(--ppt-surface)"></div>
</div>

<div v-click class="relative w-[140px]">
  <div class="rounded-[24px] p-2" style="background:var(--ppt-surface)">
    <div class="rounded-[16px] overflow-hidden" style="border:1px solid var(--ppt-border)">
      <img src="/screenshots/mobile-view.png" class="w-full" alt="移动端界面" />
    </div>
  </div>
</div>

</div>

<div v-click class="flex justify-center gap-6 mt-6">
  <div class="glass-card px-4 py-3 text-center">
    <div class="text-lg font-bold" style="color:var(--ppt-primary)">98%</div>
    <div class="text-xs" style="color:var(--ppt-text-muted)">功能一致性</div>
  </div>
  <div class="glass-card px-4 py-3 text-center">
    <div class="text-lg font-bold" style="color:var(--ppt-primary)">< 2s</div>
    <div class="text-xs" style="color:var(--ppt-text-muted)">首屏加载</div>
  </div>
</div>

<!--
演讲者备注：先展示桌面端完整界面，点击出现手机端展示适配效果，再点击展示性能指标。替换 img src 为实际截图。
[click] 展示手机端
[click] 展示性能指标
-->
```
