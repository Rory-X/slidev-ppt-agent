---
id: summary
contentTypes: [closing, recap, cta]
mood: [calm, conclusive]
density: light
visualImpact: medium
bestFor: "演讲收尾，回顾核心要点并留下深刻印象"
avoid: "不用于正文中间，不承载新信息"
pairs_well_with: [cover, metrics-strip, faq]
---

# Page Template: Summary / Ending

Design intent: Centered recap with 3 small cards + closing statement. Uses CSS variables for dark/light mode.

```md
---
layout: center
transition: fade-out
---

<div class="text-center">

<div class="font-bold text-2xl mb-8" style="color:var(--ppt-text)">核心要点回顾</div>

<div class="grid grid-cols-3 gap-6 max-w-3xl mx-auto">

<div v-click class="glass-card text-center py-6">
  <div class="icon-box mx-auto mb-3"><mdi-earth class="text-base" /></div>
  <div class="font-semibold mb-2" style="color:var(--ppt-text)">要点一标题</div>
  <div class="text-xs" style="color:var(--ppt-text-body)">一句话概括核心价值</div>
</div>

<div v-click class="glass-card text-center py-6">
  <div class="icon-box mx-auto mb-3"><mdi-code-tags class="text-base" /></div>
  <div class="font-semibold mb-2" style="color:var(--ppt-text)">要点二标题</div>
  <div class="text-xs" style="color:var(--ppt-text-body)">一句话概括核心价值</div>
</div>

<div v-click class="glass-card text-center py-6">
  <div class="icon-box mx-auto mb-3"><mdi-shield-check class="text-base" /></div>
  <div class="font-semibold mb-2" style="color:var(--ppt-text)">要点三标题</div>
  <div class="text-xs" style="color:var(--ppt-text-body)">一句话概括核心价值</div>
</div>

</div>

<div class="mt-12">
  <div class="text-4xl font-bold gradient-title">感谢聆听</div>
  <div class="text-xs tracking-[0.2em] mt-3" style="color:var(--ppt-text-muted)">THANKS FOR LISTENING</div>
</div>

</div>

<!--
演讲者备注：回顾三个核心要点，留下明确印象。感谢并开放提问。
-->
```
