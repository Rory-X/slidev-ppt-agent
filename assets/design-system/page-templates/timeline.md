# Page Template: Timeline

Design intent: Horizontal timeline for roadmaps, milestones, or historical progression. Each node is a `.glass-card` with date and description, connected visually by a CSS line. Progressive `v-clicks` reveal builds narrative momentum left-to-right. Flex layout ensures even spacing regardless of item count.

## Light Variant (3 milestones)

```md
---
transition: slide-left
---

<div class="section-bar">

# 里程碑规划
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">三个关键节点推动项目落地</div>

</div>

<div class="flex items-start gap-4 mt-10 relative">

<div class="absolute top-6 left-0 right-0 h-[2px]" style="background:var(--ppt-border)"></div>

<div v-click class="flex-1 relative pt-10">
  <div class="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2" style="background:var(--ppt-primary);border-color:var(--ppt-primary)"></div>
  <div class="glass-card text-center">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">2026 Q1</div>
    <div class="font-semibold text-sm mt-2" style="color:var(--ppt-text)">技术验证</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">完成核心架构 POC，性能基准测试通过</div>
  </div>
</div>

<div v-click class="flex-1 relative pt-10">
  <div class="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2" style="background:var(--ppt-primary);border-color:var(--ppt-primary)"></div>
  <div class="glass-card text-center">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">2026 Q2</div>
    <div class="font-semibold text-sm mt-2" style="color:var(--ppt-text)">内部灰度</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">种子用户测试，收集反馈迭代产品</div>
  </div>
</div>

<div v-click class="flex-1 relative pt-10">
  <div class="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2" style="background:var(--ppt-primary);border-color:var(--ppt-primary)"></div>
  <div class="glass-card text-center">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">2026 Q3</div>
    <div class="font-semibold text-sm mt-2" style="color:var(--ppt-text)">正式发布</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">全量上线，配合市场推广计划启动</div>
  </div>
</div>

</div>

<!--
演讲者备注：依次点击展开三个里程碑，每个停顿讲解该阶段目标与成功标准。强调时间节奏的合理性。
-->
```

## Heavy Variant (5 milestones)

```md
---
transition: slide-left
---

<div class="section-bar">

# 产品演进路线图
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">从概念到规模化的五个关键阶段</div>

</div>

<div class="flex items-start gap-3 mt-8 relative">

<div class="absolute top-6 left-0 right-0 h-[2px]" style="background:var(--ppt-border)"></div>

<div v-click class="flex-1 relative pt-10">
  <div class="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2" style="background:var(--ppt-primary);border-color:var(--ppt-primary)"></div>
  <div class="glass-card text-center px-3 py-3">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">Phase 1</div>
    <div class="font-semibold text-xs mt-1" style="color:var(--ppt-text)">需求调研</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">用户访谈 50+，竞品分析</div>
  </div>
</div>

<div v-click class="flex-1 relative pt-10">
  <div class="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2" style="background:var(--ppt-primary);border-color:var(--ppt-primary)"></div>
  <div class="glass-card text-center px-3 py-3">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">Phase 2</div>
    <div class="font-semibold text-xs mt-1" style="color:var(--ppt-text)">MVP 开发</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">核心功能闭环，6 周冲刺</div>
  </div>
</div>

<div v-click class="flex-1 relative pt-10">
  <div class="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2" style="background:var(--ppt-primary);border-color:var(--ppt-primary)"></div>
  <div class="glass-card text-center px-3 py-3">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">Phase 3</div>
    <div class="font-semibold text-xs mt-1" style="color:var(--ppt-text)">封闭测试</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">200 内测用户，NPS 跟踪</div>
  </div>
</div>

<div v-click class="flex-1 relative pt-10">
  <div class="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2" style="background:var(--ppt-primary);border-color:var(--ppt-primary)"></div>
  <div class="glass-card text-center px-3 py-3">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">Phase 4</div>
    <div class="font-semibold text-xs mt-1" style="color:var(--ppt-text)">公开发布</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">全渠道推广，媒体 PR</div>
  </div>
</div>

<div v-click class="flex-1 relative pt-10">
  <div class="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2" style="background:var(--ppt-primary);border-color:var(--ppt-primary)"></div>
  <div class="glass-card text-center px-3 py-3">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">Phase 5</div>
    <div class="font-semibold text-xs mt-1" style="color:var(--ppt-text)">规模扩张</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">国际化部署，生态建设</div>
  </div>
</div>

</div>

<!--
演讲者备注：五个阶段逐一展开。注意控制节奏——前三个阶段可以快速带过（已完成），重点讲解 Phase 4-5 的计划和资源需求。
-->
```
