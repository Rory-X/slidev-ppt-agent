# Page Template: Three Cards

Design intent: Three equal glass cards for parallel comparison. Icon-box + tag badge for categorization. Clean and scannable.

```md
---
transition: slide-left
---

<div class="section-bar">

# 2. 章节标题
<div class="text-sm text-[#C7C9D9] mt-1">副标题说明文字</div>

</div>

<div class="grid grid-cols-3 gap-5 mt-8">

<div v-click class="glass-card">
  <div class="icon-box mb-4"><mdi-check-decagram class="text-base" /></div>
  <div class="font-semibold mb-1">卡片标题</div>
  <div class="tag-badge mb-3">Category</div>
  <ul class="text-sm text-[#C7C9D9] space-y-1 list-disc list-inside">
    <li>要点一，简洁有力</li>
    <li>要点二，结合 <strong class="text-[#2DD4BF]">关键词</strong></li>
    <li>要点三，行动导向</li>
  </ul>
</div>

<div v-click class="glass-card">
  <div class="icon-box mb-4"><mdi-account-multiple class="text-base" /></div>
  <div class="font-semibold mb-1">卡片标题</div>
  <div class="tag-badge mb-3">Category</div>
  <ul class="text-sm text-[#C7C9D9] space-y-1 list-disc list-inside">
    <li>要点一</li>
    <li>要点二</li>
    <li>要点三</li>
  </ul>
</div>

<div v-click class="glass-card">
  <div class="icon-box mb-4"><mdi-chart-bar class="text-base" /></div>
  <div class="font-semibold mb-1">卡片标题</div>
  <div class="tag-badge mb-3">Category</div>
  <ul class="text-sm text-[#C7C9D9] space-y-1 list-disc list-inside">
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
