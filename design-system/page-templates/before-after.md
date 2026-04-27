---
id: before-after
contentTypes: [comparison, transformation, improvement]
mood: [dramatic, persuasive, engaging]
density: medium
visualImpact: high
bestFor: "展示变化前后的对比效果，如重构前后、方案优化前后、UI 改版前后"
avoid: "前后差异不明显时效果弱；超过 2 种状态时不适合"
pairs_well_with: [hero-metric, magic-move-code, content-split]
---

# Page Template: Before/After Comparison

Design intent: Uses Slidev's v-switch to toggle between two states in the same visual position. The audience sees a clear transformation — before state fades out, after state fades in. Optional metrics below quantify the improvement. Best for showing optimization results, UI redesigns, or process improvements.

## Light Variant (visual toggle)

```md
---
transition: fade
---

<div class="section-bar">

# 重构前后对比
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">同一模块的代码质量提升</div>

</div>

<div class="mt-6">

<v-switch>
<template #1>
<div class="glass-card p-6">
  <div class="flex items-center gap-2 mb-4">
    <div class="tag-badge" style="background:color-mix(in srgb, var(--ppt-danger) 15%, transparent);color:var(--ppt-danger)">BEFORE</div>
    <div class="text-xs" style="color:var(--ppt-text-muted)">点击查看优化后</div>
  </div>
  <div class="text-sm leading-relaxed" style="color:var(--ppt-text-body)">
    <ul class="space-y-2">
      <li>• 函数平均 120 行，职责混杂</li>
      <li>• 无类型注解，运行时错误频发</li>
      <li>• 测试覆盖率 23%，回归风险高</li>
      <li>• 响应时间 P95 = 3.2s</li>
    </ul>
  </div>
</div>
</template>
<template #2>
<div class="glass-card p-6">
  <div class="flex items-center gap-2 mb-4">
    <div class="tag-badge" style="background:color-mix(in srgb, var(--ppt-success) 15%, transparent);color:var(--ppt-success)">AFTER</div>
  </div>
  <div class="text-sm leading-relaxed" style="color:var(--ppt-text-body)">
    <ul class="space-y-2">
      <li>• 函数平均 25 行，单一职责</li>
      <li>• 完整 TypeScript 类型，编译期拦截错误</li>
      <li>• 测试覆盖率 89%，自动回归守护</li>
      <li>• 响应时间 P95 = 0.8s</li>
    </ul>
  </div>
</div>
</template>
</v-switch>

</div>

<div v-click class="flex gap-6 mt-5 justify-center">
  <div class="glass-card px-4 py-3 text-center">
    <div class="text-lg font-bold" style="color:var(--ppt-success)">-75%</div>
    <div class="text-xs" style="color:var(--ppt-text-muted)">函数行数</div>
  </div>
  <div class="glass-card px-4 py-3 text-center">
    <div class="text-lg font-bold" style="color:var(--ppt-success)">+66pp</div>
    <div class="text-xs" style="color:var(--ppt-text-muted)">测试覆盖率</div>
  </div>
  <div class="glass-card px-4 py-3 text-center">
    <div class="text-lg font-bold" style="color:var(--ppt-success)">4x</div>
    <div class="text-xs" style="color:var(--ppt-text-muted)">响应速度</div>
  </div>
</div>

<!--
演讲者备注：第一次点击切换 v-switch 从 Before 到 After 状态。第二次点击展示量化改进指标。让观众先感受对比冲击，再用数字锚定价值。
[click] 切换到 After 状态
[click] 展示改进指标
-->
```

## Heavy Variant (side-by-side with annotations)

```md
---
transition: fade
---

<div class="section-bar">

# 用户体验升级
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">新旧流程的直观对比</div>

</div>

<div class="grid grid-cols-2 gap-5 mt-6">

<div class="glass-card p-5">
  <div class="flex items-center gap-2 mb-4">
    <div class="tag-badge" style="background:color-mix(in srgb, var(--ppt-danger) 15%, transparent);color:var(--ppt-danger)">旧流程</div>
  </div>
  <div class="space-y-3">
    <div class="flex items-center gap-3">
      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs" style="background:var(--ppt-border);color:var(--ppt-text-muted)">1</div>
      <div class="text-sm" style="color:var(--ppt-text-body)">手动填写 5 页表单</div>
    </div>
    <div class="flex items-center gap-3">
      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs" style="background:var(--ppt-border);color:var(--ppt-text-muted)">2</div>
      <div class="text-sm" style="color:var(--ppt-text-body)">等待 3-5 个工作日审核</div>
    </div>
    <div class="flex items-center gap-3">
      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs" style="background:var(--ppt-border);color:var(--ppt-text-muted)">3</div>
      <div class="text-sm" style="color:var(--ppt-text-body)">邮件来回确认细节</div>
    </div>
    <div class="flex items-center gap-3">
      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs" style="background:var(--ppt-border);color:var(--ppt-text-muted)">4</div>
      <div class="text-sm" style="color:var(--ppt-text-body)">人工通知结果</div>
    </div>
  </div>
  <div class="mt-4 text-xs font-semibold" style="color:var(--ppt-danger)">平均耗时：7 天</div>
</div>

<div v-click class="glass-card p-5">
  <div class="flex items-center gap-2 mb-4">
    <div class="tag-badge" style="background:color-mix(in srgb, var(--ppt-success) 15%, transparent);color:var(--ppt-success)">新流程</div>
  </div>
  <div class="space-y-3">
    <div class="flex items-center gap-3">
      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs" style="background:color-mix(in srgb, var(--ppt-primary) 20%, transparent);color:var(--ppt-primary)">1</div>
      <div class="text-sm" style="color:var(--ppt-text-body)">智能表单自动填充</div>
    </div>
    <div class="flex items-center gap-3">
      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs" style="background:color-mix(in srgb, var(--ppt-primary) 20%, transparent);color:var(--ppt-primary)">2</div>
      <div class="text-sm" style="color:var(--ppt-text-body)">AI 即时审核 + 人工抽检</div>
    </div>
    <div class="flex items-center gap-3">
      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs" style="background:color-mix(in srgb, var(--ppt-primary) 20%, transparent);color:var(--ppt-primary)">3</div>
      <div class="text-sm" style="color:var(--ppt-text-body)">实时通知 + 在线签章</div>
    </div>
  </div>
  <div class="mt-4 text-xs font-semibold" style="color:var(--ppt-success)">平均耗时：15 分钟</div>
</div>

</div>

<!--
演讲者备注：左侧旧流程默认展示，点击后右侧新流程出现形成对比。重点强调从 7 天到 15 分钟的时间压缩，这是最直观的价值证明。
[click] 展示新流程对比
-->
```
