---
id: quote-highlight
contentTypes: [quote, persuasion, emotional]
mood: [inspiring, dramatic, calm]
density: light
visualImpact: high
bestFor: "权威引言或金句的情感锚定，为后续论点铺垫"
avoid: "引言与主题无关时、引言来源不可靠时"
pairs_well_with: [image-showcase, content-split, insight-plus-proof]
---

# Page Template: Quote Highlight

Design intent: Centered quote as the sole focus for persuasion or emotional anchoring. Oversized decorative quotation mark adds visual weight without competing with the text. The quote itself uses larger font, the attribution smaller italic. Optional `v-mark.highlight` on a key phrase draws the eye to the core message.

## Light Variant (single quote, minimal)

```md
---
layout: center
class: text-center
transition: fade
---

<div class="flex flex-col items-center justify-center h-full max-w-2xl mx-auto">

<div class="text-8xl leading-none font-serif opacity-20" style="color:var(--ppt-primary)">"</div>

<div class="text-xl leading-relaxed font-medium -mt-8 mb-6" style="color:var(--ppt-text)">
  最好的技术是<span v-mark.highlight="{color:'var(--ppt-primary)',opacity:0.2}">让人感觉不到技术的存在</span>，它融入日常，成为本能。
</div>

<div class="divider-line mb-4 w-16 mx-auto"></div>

<div class="text-sm italic" style="color:var(--ppt-text-muted)">—— Mark Weiser，普适计算之父</div>

</div>

<!--
演讲者备注：安静地展示引言，让观众自行阅读和消化。高亮部分是核心论点，与后续产品理念呼应。
-->
```

## Heavy Variant (quote with context framing)

```md
---
layout: center
class: text-center
transition: fade
---

<div class="flex flex-col items-center justify-center h-full max-w-2xl mx-auto">

<div class="tag-badge mb-6">行业洞察</div>

<div class="text-8xl leading-none font-serif opacity-20" style="color:var(--ppt-primary)">"</div>

<div class="text-lg leading-relaxed font-medium -mt-8 mb-4" style="color:var(--ppt-text)">
  AI 不会取代人类，但<span v-mark.highlight="{color:'var(--ppt-primary)',opacity:0.2}">善用 AI 的人会取代不用 AI 的人</span>。这不是技术革命，是工作方式的代际更替。
</div>

<div class="divider-line mb-4 w-16 mx-auto"></div>

<div class="text-sm italic mb-6" style="color:var(--ppt-text-muted)">—— Kai-Fu Lee，2025 年世界人工智能大会</div>

<div v-click class="glass-card text-left max-w-md mx-auto">
  <div class="text-xs font-semibold mb-2" style="color:var(--ppt-primary)">为什么这很重要</div>
  <ul class="text-xs space-y-1" style="color:var(--ppt-text-body)">
    <li>• 全球 78% 的知识工作者已开始使用 AI 工具</li>
    <li>• 早期采用者的生产力提升平均达 35%</li>
    <li>• 企业 AI 培训预算同比增长 240%</li>
  </ul>
</div>

</div>

<!--
演讲者备注：先让引言沉淀 3 秒，再点击展示数据支撑卡片。这组数据来自 McKinsey 2025 报告，用于强化引言的紧迫感。引导观众思考自己团队的 AI 采纳现状。
-->
```
