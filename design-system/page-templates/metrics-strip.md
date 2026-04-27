---
id: metrics-strip
contentTypes: [metric, kpi, dashboard]
mood: [analytical, confident]
density: medium
visualImpact: medium
bestFor: "一行 KPI 数字概览，锚定叙述段落的数据支撑"
avoid: "只有 1 个数字时用 hero-metric；超过 5 个指标时拥挤"
pairs_well_with: [hero-metric, evidence-dashboard, content-split]
---

# Page Template: Metrics Strip

Design intent: Horizontal row of KPI cards for dashboard-style data presentation. Each metric displays a big number, label, and optional trend. Flex layout distributes items evenly. Light `.glass-card` background per metric creates visual rhythm. Numbers use `var(--ppt-primary)` for emphasis. Best placed after a narrative section to anchor claims with data.

## Light Variant (3 KPIs)

```md
---
transition: slide-left
---

<div class="section-bar">

# 关键成果
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">本季度核心业务指标概览</div>

</div>

<div class="flex gap-6 mt-12 justify-center">

<div v-click class="glass-card text-center flex-1 max-w-[200px] py-6">
  <div class="text-3xl font-bold" style="color:var(--ppt-primary)">98.5%</div>
  <div class="text-sm mt-2" style="color:var(--ppt-text)">系统可用性</div>
  <div class="flex items-center justify-center gap-1 mt-2">
    <mdi-trending-up class="text-xs" style="color:var(--ppt-success, #22c55e)" />
    <span class="text-xs" style="color:var(--ppt-success, #22c55e)">+0.3pp</span>
  </div>
</div>

<div v-click class="glass-card text-center flex-1 max-w-[200px] py-6">
  <div class="text-3xl font-bold" style="color:var(--ppt-primary)">1.2s</div>
  <div class="text-sm mt-2" style="color:var(--ppt-text)">平均响应时间</div>
  <div class="flex items-center justify-center gap-1 mt-2">
    <mdi-trending-down class="text-xs" style="color:var(--ppt-success, #22c55e)" />
    <span class="text-xs" style="color:var(--ppt-success, #22c55e)">-40ms</span>
  </div>
</div>

<div v-click class="glass-card text-center flex-1 max-w-[200px] py-6">
  <div class="text-3xl font-bold" style="color:var(--ppt-primary)">4.8</div>
  <div class="text-sm mt-2" style="color:var(--ppt-text)">用户满意度</div>
  <div class="flex items-center justify-center gap-1 mt-2">
    <mdi-trending-up class="text-xs" style="color:var(--ppt-success, #22c55e)" />
    <span class="text-xs" style="color:var(--ppt-success, #22c55e)">+0.2</span>
  </div>
</div>

</div>

<!--
演讲者备注：三个核心指标逐一出现。每个数字配合趋势箭头提供变化方向。停顿在可用性数字上——这是客户最关心的 SLA 指标。
-->
```

## Heavy Variant (5 KPIs)

```md
---
transition: slide-left
---

<div class="section-bar">

# 运营仪表盘
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">五大核心指标实时追踪</div>

</div>

<div class="flex gap-4 mt-10 justify-center">

<div v-click class="glass-card text-center flex-1 py-5 px-3">
  <div class="text-2xl font-bold" style="color:var(--ppt-primary)">$4.2M</div>
  <div class="text-xs mt-2" style="color:var(--ppt-text)">月收入</div>
  <div class="flex items-center justify-center gap-1 mt-1">
    <mdi-trending-up class="text-xs" style="color:var(--ppt-success, #22c55e)" />
    <span class="text-xs" style="color:var(--ppt-success, #22c55e)">+12%</span>
  </div>
</div>

<div v-click class="glass-card text-center flex-1 py-5 px-3">
  <div class="text-2xl font-bold" style="color:var(--ppt-primary)">32K</div>
  <div class="text-xs mt-2" style="color:var(--ppt-text)">付费用户</div>
  <div class="flex items-center justify-center gap-1 mt-1">
    <mdi-trending-up class="text-xs" style="color:var(--ppt-success, #22c55e)" />
    <span class="text-xs" style="color:var(--ppt-success, #22c55e)">+8.5%</span>
  </div>
</div>

<div v-click class="glass-card text-center flex-1 py-5 px-3">
  <div class="text-2xl font-bold" style="color:var(--ppt-primary)">2.3%</div>
  <div class="text-xs mt-2" style="color:var(--ppt-text)">月流失率</div>
  <div class="flex items-center justify-center gap-1 mt-1">
    <mdi-trending-down class="text-xs" style="color:var(--ppt-success, #22c55e)" />
    <span class="text-xs" style="color:var(--ppt-success, #22c55e)">-0.4pp</span>
  </div>
</div>

<div v-click class="glass-card text-center flex-1 py-5 px-3">
  <div class="text-2xl font-bold" style="color:var(--ppt-primary)">$131</div>
  <div class="text-xs mt-2" style="color:var(--ppt-text)">ARPU</div>
  <div class="flex items-center justify-center gap-1 mt-1">
    <mdi-trending-up class="text-xs" style="color:var(--ppt-success, #22c55e)" />
    <span class="text-xs" style="color:var(--ppt-success, #22c55e)">+$9</span>
  </div>
</div>

<div v-click class="glass-card text-center flex-1 py-5 px-3">
  <div class="text-2xl font-bold" style="color:var(--ppt-primary)">72</div>
  <div class="text-xs mt-2" style="color:var(--ppt-text)">NPS 评分</div>
  <div class="flex items-center justify-center gap-1 mt-1">
    <mdi-trending-up class="text-xs" style="color:var(--ppt-success, #22c55e)" />
    <span class="text-xs" style="color:var(--ppt-success, #22c55e)">+6</span>
  </div>
</div>

</div>

<!--
演讲者备注：五个指标按"收入→用户→留存→ARPU→NPS"排列，从顶线到质量的完整健康度画像。重点讲解流失率下降和 NPS 上升的正循环关系。
-->
```
