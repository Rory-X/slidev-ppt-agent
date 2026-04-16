# Page Template: Table of Contents

Design intent: Section-bar title + numbered card grid. Clear wayfinding for audience.

```md
---
transition: fade-out
---

<div class="section-bar">

# 目录
<div class="text-xs tracking-[0.15em] text-[#6B7280] mt-1">TABLE OF CONTENTS</div>

</div>

<div class="grid grid-cols-2 gap-5 mt-8">

<div v-click class="glass-card flex items-center gap-4">
  <div class="text-2xl font-bold text-[#2DD4BF]">01</div>
  <div>
    <div class="font-semibold">章节标题</div>
    <div class="text-xs text-[#6B7280] tracking-wider">ENGLISH SUBTITLE</div>
  </div>
  <mdi-information-outline class="ml-auto text-[#2DD4BF] text-lg" />
</div>

<div v-click class="glass-card flex items-center gap-4">
  <div class="text-2xl font-bold text-[#2DD4BF]">02</div>
  <div>
    <div class="font-semibold">章节标题</div>
    <div class="text-xs text-[#6B7280] tracking-wider">ENGLISH SUBTITLE</div>
  </div>
  <mdi-layers-outline class="ml-auto text-[#2DD4BF] text-lg" />
</div>

<!-- Repeat for 03-06 as needed -->

</div>

<!--
演讲者备注：简要介绍分享的整体脉络。
-->
```
