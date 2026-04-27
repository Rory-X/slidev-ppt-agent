---
id: speaker-hero
contentTypes: [introduction, speaker, keynote]
mood: [warm, professional, personal]
density: light
visualImpact: medium
bestFor: "单人演讲者介绍、嘉宾引荐、Keynote 开场个人页"
avoid: "多人团队介绍用 team-grid；正文内容页不适合"
pairs_well_with: [cover, quote-highlight, content-split]
---

# Page Template: Speaker Hero

Design intent: Single-person spotlight for keynote introductions or guest speaker pages. Large icon placeholder for photo with name, title, and brief bio. Asymmetric layout creates visual interest while keeping focus on the person. Social links or credentials add authority.

## Light Variant (centered)

```md
---
layout: center
class: text-center
transition: fade
---

<div class="flex flex-col items-center justify-center h-full">

<div class="w-24 h-24 rounded-full flex items-center justify-center mb-6" style="background:color-mix(in srgb, var(--ppt-primary) 15%, transparent)">
  <mdi-account class="text-4xl" style="color:var(--ppt-primary)" />
</div>

<div class="text-2xl font-bold mb-2" style="color:var(--ppt-text)">张明远</div>

<div class="text-sm font-medium mb-4" style="color:var(--ppt-primary)">首席技术官 · TechCorp</div>

<div class="divider-line w-16 mx-auto mb-4"></div>

<div class="text-sm max-w-md leading-relaxed" style="color:var(--ppt-text-body)">
  15 年分布式系统经验，前某大厂技术 VP。<br>
  开源社区核心贡献者，著有《高可用架构设计》。
</div>

<div class="flex items-center gap-4 mt-6">
  <div class="text-xs flex items-center gap-1" style="color:var(--ppt-text-muted)">
    <mdi-github class="text-sm" /> @zhangmy
  </div>
  <div class="text-xs flex items-center gap-1" style="color:var(--ppt-text-muted)">
    <mdi-twitter class="text-sm" /> @zhangmy_tech
  </div>
</div>

</div>

<!--
演讲者备注：用于开场前的演讲者介绍页。图标区域可替换为真实照片（使用 img 标签 + rounded-full）。停留 5-10 秒让观众熟悉演讲者背景。
-->
```

## Heavy Variant (asymmetric with credentials)

```md
---
transition: fade
---

<div class="grid grid-cols-[1fr_1.5fr] gap-8 h-full items-center px-8">

<div class="flex flex-col items-center">
  <div class="w-32 h-32 rounded-full flex items-center justify-center mb-4" style="background:color-mix(in srgb, var(--ppt-primary) 15%, transparent)">
    <mdi-account class="text-5xl" style="color:var(--ppt-primary)" />
  </div>
  <div class="flex items-center gap-3 mt-4">
    <div class="text-xs flex items-center gap-1" style="color:var(--ppt-text-muted)">
      <mdi-github class="text-sm" /> @handle
    </div>
    <div class="text-xs flex items-center gap-1" style="color:var(--ppt-text-muted)">
      <mdi-linkedin class="text-sm" /> /in/name
    </div>
  </div>
</div>

<div>
  <div class="tag-badge mb-4">KEYNOTE SPEAKER</div>
  <div class="text-3xl font-bold mb-2" style="color:var(--ppt-text)">张明远</div>
  <div class="text-base font-medium mb-6" style="color:var(--ppt-primary)">首席技术官 · TechCorp</div>

  <div class="text-sm leading-relaxed mb-6" style="color:var(--ppt-text-body)">
    15 年分布式系统与 AI 基础设施经验。带领团队从 0 到 1 构建日均处理 10 亿请求的实时推理平台。
  </div>

  <div class="grid grid-cols-3 gap-3">
    <div v-click class="glass-card py-3 text-center">
      <div class="text-lg font-bold" style="color:var(--ppt-primary)">15+</div>
      <div class="text-xs" style="color:var(--ppt-text-muted)">年行业经验</div>
    </div>
    <div v-click class="glass-card py-3 text-center">
      <div class="text-lg font-bold" style="color:var(--ppt-primary)">3</div>
      <div class="text-xs" style="color:var(--ppt-text-muted)">技术专利</div>
    </div>
    <div v-click class="glass-card py-3 text-center">
      <div class="text-lg font-bold" style="color:var(--ppt-primary)">50K+</div>
      <div class="text-xs" style="color:var(--ppt-text-muted)">GitHub Stars</div>
    </div>
  </div>
</div>

</div>

<!--
演讲者备注：非对称布局增加视觉张力。左侧头像区域可替换为真实照片。右侧逐步展示成就数据，建立演讲者权威感。
[click] 展示经验年数
[click] 展示专利数
[click] 展示 GitHub Stars
-->
```
