---
id: three-cards
contentTypes: [comparison, features, categories]
mood: [organized, balanced]
density: medium
visualImpact: medium
bestFor: "三个并列维度的对等展示，如功能特性、团队分工、方案选项"
avoid: "内容不对等时（一项远多于其他）不适合强行三等分"
pairs_well_with: [content-split, detail-two-col, metrics-strip]
---

# Page Template: Three Cards

Design intent: Three equal glass cards for parallel comparison. Uses CSS variables for dark/light mode.

```md
---
transition: slide-left
---

<div class="section-bar">

# 2. 章节标题
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">副标题说明文字</div>

</div>

<div class="grid grid-cols-3 gap-5 mt-8">

<div v-click class="glass-card">
  <div class="icon-box mb-4"><mdi-check-decagram class="text-base" /></div>
  <div class="font-semibold mb-1" style="color:var(--ppt-text)">卡片标题</div>
  <div class="tag-badge mb-3">Category</div>
  <ul class="text-sm space-y-1 list-disc list-inside" style="color:var(--ppt-text-body)">
    <li>要点一，简洁有力</li>
    <li>要点二，结合 <strong class="accent-text">关键词</strong></li>
    <li>要点三，行动导向</li>
  </ul>
</div>

<div v-click class="glass-card">
  <div class="icon-box mb-4"><mdi-account-multiple class="text-base" /></div>
  <div class="font-semibold mb-1" style="color:var(--ppt-text)">卡片标题</div>
  <div class="tag-badge mb-3">Category</div>
  <ul class="text-sm space-y-1 list-disc list-inside" style="color:var(--ppt-text-body)">
    <li>要点一</li>
    <li>要点二</li>
    <li>要点三</li>
  </ul>
</div>

<div v-click class="glass-card">
  <div class="icon-box mb-4"><mdi-chart-bar class="text-base" /></div>
  <div class="font-semibold mb-1" style="color:var(--ppt-text)">卡片标题</div>
  <div class="tag-badge mb-3">Category</div>
  <ul class="text-sm space-y-1 list-disc list-inside" style="color:var(--ppt-text-body)">
    <li>要点一</li>
    <li>要点二</li>
    <li>要点三</li>
  </ul>
</div>

</div>

<!--
演讲者备注：三个维度并列展开，逐个点击出现。
-->
```
