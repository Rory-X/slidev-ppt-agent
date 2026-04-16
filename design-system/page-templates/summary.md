# Page Template: Summary / Ending

Design intent: Centered recap with 3 small cards for key takeaways, followed by large closing statement. Memorable and clean.

```md
---
layout: center
transition: fade-out
---

<div class="text-center">

<div class="font-bold text-2xl mb-8">核心要点回顾</div>

<div class="grid grid-cols-3 gap-6 max-w-3xl mx-auto">

<div v-click class="glass-card text-center py-6">
  <div class="icon-box mx-auto mb-3"><mdi-earth class="text-base" /></div>
  <div class="font-semibold mb-2">要点一标题</div>
  <div class="text-xs text-[#C7C9D9]">一句话概括核心价值</div>
</div>

<div v-click class="glass-card text-center py-6">
  <div class="icon-box mx-auto mb-3"><mdi-code-tags class="text-base" /></div>
  <div class="font-semibold mb-2">要点二标题</div>
  <div class="text-xs text-[#C7C9D9]">一句话概括核心价值</div>
</div>

<div v-click class="glass-card text-center py-6">
  <div class="icon-box mx-auto mb-3"><mdi-shield-check class="text-base" /></div>
  <div class="font-semibold mb-2">要点三标题</div>
  <div class="text-xs text-[#C7C9D9]">一句话概括核心价值</div>
</div>

</div>

<div class="mt-12">
  <div class="text-4xl font-bold" style="background:linear-gradient(120deg,#2DD4BF,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
    感谢聆听
  </div>
  <div class="text-xs tracking-[0.2em] text-[#6B7280] mt-3">THANKS FOR LISTENING</div>
</div>

</div>

<!--
演讲者备注：回顾三个核心要点，留下明确印象。感谢并开放提问。
-->
```
