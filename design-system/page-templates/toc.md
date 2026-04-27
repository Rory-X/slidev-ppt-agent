---
id: toc
contentTypes: [navigation, structure]
mood: [calm, organized]
density: medium
visualImpact: low
bestFor: "展示演讲整体脉络，帮助观众建立预期"
avoid: "内容少于 3 个章节时不需要单独目录页"
pairs_well_with: [cover, content-split, three-cards]
---

# Page Template: Table of Contents

Design intent: Section-bar title + numbered card grid. Uses CSS variables for dark/light mode compatibility.

```md
---
transition: fade-out
---

<div class="section-bar">

# 目录
<div class="text-xs tracking-[0.15em] mt-1" style="color:var(--ppt-text-muted)">TABLE OF CONTENTS</div>

</div>

<div class="grid grid-cols-2 gap-5 mt-8">

<div v-click class="glass-card flex items-center gap-4">
  <div class="text-2xl font-bold" style="color:var(--ppt-primary)">01</div>
  <div>
    <div class="font-semibold" style="color:var(--ppt-text)">章节标题</div>
    <div class="text-xs tracking-wider" style="color:var(--ppt-text-muted)">ENGLISH SUBTITLE</div>
  </div>
  <mdi-information-outline class="ml-auto text-lg" style="color:var(--ppt-primary)" />
</div>

<div v-click class="glass-card flex items-center gap-4">
  <div class="text-2xl font-bold" style="color:var(--ppt-primary)">02</div>
  <div>
    <div class="font-semibold" style="color:var(--ppt-text)">章节标题</div>
    <div class="text-xs tracking-wider" style="color:var(--ppt-text-muted)">ENGLISH SUBTITLE</div>
  </div>
  <mdi-layers-outline class="ml-auto text-lg" style="color:var(--ppt-primary)" />
</div>

<!-- Repeat for 03-06 as needed -->

</div>

<!--
演讲者备注：简要介绍分享的整体脉络。
-->
```
