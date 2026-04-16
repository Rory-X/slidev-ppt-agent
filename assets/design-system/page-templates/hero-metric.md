# Page Template: Hero Metric

Design intent: Bold single-number focus for KPI reveals. The oversized metric anchored center draws instant attention, with a trend indicator and subtitle providing context. Minimal animation — just the number reveal — keeps pacing crisp. Uses `.metric-big` class and CSS variables for theming.

## Light Variant (3 items)

```md
---
layout: center
class: text-center
transition: fade
---

<div class="flex flex-col items-center justify-center h-full">

<div class="text-xs tracking-[0.2em] uppercase mb-4" style="color:var(--ppt-text-muted)">MONTHLY ACTIVE USERS</div>

<div v-click class="metric-big" style="color:var(--ppt-primary)">2.4M</div>

<div class="flex items-center gap-2 mt-4">
  <mdi-trending-up class="text-lg" style="color:var(--ppt-success, #22c55e)" />
  <span class="text-base font-semibold" style="color:var(--ppt-success, #22c55e)">+18.3%</span>
  <span class="text-sm" style="color:var(--ppt-text-muted)">vs 上月</span>
</div>

<div class="text-sm mt-6 max-w-md" style="color:var(--ppt-text-body)">
  连续第三个季度增长，核心市场渗透率突破历史新高
</div>

</div>

<!--
演讲者备注：数字点击出现后停顿 2 秒让观众消化，再口述趋势含义和业务影响。
-->
```

## Heavy Variant (with comparison context)

```md
---
layout: center
class: text-center
transition: fade
---

<div class="flex flex-col items-center justify-center h-full">

<div class="text-xs tracking-[0.2em] uppercase mb-2" style="color:var(--ppt-text-muted)">ANNUAL RECURRING REVENUE</div>

<div v-click class="metric-big" style="color:var(--ppt-primary)">$86.2M</div>

<div class="flex items-center gap-2 mt-4">
  <mdi-trending-up class="text-lg" style="color:var(--ppt-success, #22c55e)" />
  <span class="text-base font-semibold" style="color:var(--ppt-success, #22c55e)">+42.7%</span>
  <span class="text-sm" style="color:var(--ppt-text-muted)">YoY</span>
</div>

<div class="grid grid-cols-3 gap-6 mt-8 max-w-2xl w-full">

<div v-click class="glass-card text-center py-4">
  <div class="text-lg font-bold" style="color:var(--ppt-primary)">$5.8M</div>
  <div class="text-xs mt-1" style="color:var(--ppt-text-muted)">月均新增 ARR</div>
</div>

<div v-click class="glass-card text-center py-4">
  <div class="text-lg font-bold" style="color:var(--ppt-primary)">127%</div>
  <div class="text-xs mt-1" style="color:var(--ppt-text-muted)">净收入留存率</div>
</div>

<div v-click class="glass-card text-center py-4">
  <div class="text-lg font-bold" style="color:var(--ppt-primary)">1,240</div>
  <div class="text-xs mt-1" style="color:var(--ppt-text-muted)">企业客户数</div>
</div>

</div>

<div class="text-sm mt-6 max-w-lg" style="color:var(--ppt-text-body)">
  核心指标全面超过年度目标，企业级客户扩张驱动 ARR 加速增长
</div>

</div>

<!--
演讲者备注：先展示核心 ARR 数字，再逐步揭示三个支撑指标。强调净收入留存率大于 100% 意味着老客户也在持续扩展用量。
-->
```
