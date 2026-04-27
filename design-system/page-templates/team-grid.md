---
id: team-grid
contentTypes: [team, people, credits]
mood: [warm, professional]
density: medium
visualImpact: low
bestFor: "多人团队介绍、项目致谢或组织架构展示"
avoid: "只介绍 1 个人时用 speaker-hero 更好"
pairs_well_with: [summary, cover, timeline]
---

# Page Template: Team Grid

Design intent: Grid of team member cards for introductions, credits, or org charts. Each card features an icon placeholder for avatar, name, and role. Uses `.glass-card` for visual consistency and CSS grid for responsive layout. Progressive reveal keeps focus on one member at a time during spoken introductions.

## Light Variant (3 members, single row)

```md
---
transition: slide-left
---

<div class="section-bar">

# 核心团队
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">三位联合创始人驱动项目落地</div>

</div>

<div class="grid grid-cols-3 gap-6 mt-10">

<div v-click class="glass-card text-center py-6">
  <div class="icon-box mx-auto mb-4 w-14 h-14 text-lg">
    <mdi-account class="text-xl" />
  </div>
  <div class="font-semibold" style="color:var(--ppt-text)">张明远</div>
  <div class="text-xs mt-1" style="color:var(--ppt-primary)">CEO / 战略负责人</div>
  <div class="text-xs mt-2" style="color:var(--ppt-text-muted)">前某大厂技术 VP，15 年行业经验</div>
</div>

<div v-click class="glass-card text-center py-6">
  <div class="icon-box mx-auto mb-4 w-14 h-14 text-lg">
    <mdi-account class="text-xl" />
  </div>
  <div class="font-semibold" style="color:var(--ppt-text)">李思琪</div>
  <div class="text-xs mt-1" style="color:var(--ppt-primary)">CTO / 技术负责人</div>
  <div class="text-xs mt-2" style="color:var(--ppt-text-muted)">分布式系统专家，开源社区核心贡献者</div>
</div>

<div v-click class="glass-card text-center py-6">
  <div class="icon-box mx-auto mb-4 w-14 h-14 text-lg">
    <mdi-account class="text-xl" />
  </div>
  <div class="font-semibold" style="color:var(--ppt-text)">王浩然</div>
  <div class="text-xs mt-1" style="color:var(--ppt-primary)">CPO / 产品负责人</div>
  <div class="text-xs mt-2" style="color:var(--ppt-text-muted)">连续创业者，曾主导 3 款百万级产品</div>
</div>

</div>

<!--
演讲者备注：逐一介绍团队成员，每人 15-20 秒。重点突出与本项目最相关的背景经历。
-->
```

## Heavy Variant (6 members, two rows)

```md
---
transition: slide-left
---

<div class="section-bar">

# 项目团队
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">跨职能团队覆盖技术、产品、设计、运营全链路</div>

</div>

<div class="grid grid-cols-3 gap-4 mt-6">

<div v-click class="glass-card text-center py-4">
  <div class="icon-box mx-auto mb-3 w-12 h-12">
    <mdi-shield-account class="text-base" />
  </div>
  <div class="font-semibold text-sm" style="color:var(--ppt-text)">张明远</div>
  <div class="text-xs" style="color:var(--ppt-primary)">项目总监</div>
  <div class="text-xs mt-1" style="color:var(--ppt-text-muted)">全局统筹与资源协调</div>
</div>

<div v-click class="glass-card text-center py-4">
  <div class="icon-box mx-auto mb-3 w-12 h-12">
    <mdi-code-braces class="text-base" />
  </div>
  <div class="font-semibold text-sm" style="color:var(--ppt-text)">李思琪</div>
  <div class="text-xs" style="color:var(--ppt-primary)">技术架构师</div>
  <div class="text-xs mt-1" style="color:var(--ppt-text-muted)">系统设计与技术选型</div>
</div>

<div v-click class="glass-card text-center py-4">
  <div class="icon-box mx-auto mb-3 w-12 h-12">
    <mdi-palette class="text-base" />
  </div>
  <div class="font-semibold text-sm" style="color:var(--ppt-text)">陈艺</div>
  <div class="text-xs" style="color:var(--ppt-primary)">设计主管</div>
  <div class="text-xs mt-1" style="color:var(--ppt-text-muted)">用户体验与视觉设计</div>
</div>

<div v-click class="glass-card text-center py-4">
  <div class="icon-box mx-auto mb-3 w-12 h-12">
    <mdi-chart-line class="text-base" />
  </div>
  <div class="font-semibold text-sm" style="color:var(--ppt-text)">王浩然</div>
  <div class="text-xs" style="color:var(--ppt-primary)">产品经理</div>
  <div class="text-xs mt-1" style="color:var(--ppt-text-muted)">需求分析与路线规划</div>
</div>

<div v-click class="glass-card text-center py-4">
  <div class="icon-box mx-auto mb-3 w-12 h-12">
    <mdi-test-tube class="text-base" />
  </div>
  <div class="font-semibold text-sm" style="color:var(--ppt-text)">赵琳</div>
  <div class="text-xs" style="color:var(--ppt-primary)">QA 负责人</div>
  <div class="text-xs mt-1" style="color:var(--ppt-text-muted)">质量保障与自动化测试</div>
</div>

<div v-click class="glass-card text-center py-4">
  <div class="icon-box mx-auto mb-3 w-12 h-12">
    <mdi-bullhorn class="text-base" />
  </div>
  <div class="font-semibold text-sm" style="color:var(--ppt-text)">刘畅</div>
  <div class="text-xs" style="color:var(--ppt-primary)">市场运营</div>
  <div class="text-xs mt-1" style="color:var(--ppt-text-muted)">GTM 策略与增长运营</div>
</div>

</div>

<!--
演讲者备注：六人团队逐个出现。前三人是核心决策层，后三人是执行层。可根据听众兴趣选择性展开介绍，不必每人平均分配时间。
-->
```
