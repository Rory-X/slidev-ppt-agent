---
id: comparison-matrix-lite
contentTypes: [comparison, decision, evaluation]
mood: [analytical, decisive]
density: heavy
visualImpact: medium
bestFor: "2-3 个方案在 3 个维度上的紧凑比较，附带明确结论"
avoid: "选项超过 4 个或维度超过 5 个时会溢出"
pairs_well_with: [comparison-table, evidence-dashboard, insight-plus-proof]
---

# 页面模板：轻量对比矩阵

设计意图：替代容易溢出的宽表格。用 2-3 个对象 × 3 个维度做紧凑比较，并用高亮列或底部结论明确推荐方向。

## 标准变体：3 个方案 × 3 个维度

```md
---
transition: slide-left
---

<div class="section-bar">

# 三种路径的取舍很清楚
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">推荐从“混合试点”开始，兼顾速度和控制力</div>

</div>

<div class="grid grid-cols-[0.8fr_1fr_1fr_1fr] gap-3 mt-7 text-sm">
  <div></div>
  <div class="glass-card p-4 text-center font-semibold" style="color:var(--ppt-text)">自建</div>
  <div class="glass-card p-4 text-center font-semibold" style="color:var(--ppt-text);border-color:var(--ppt-primary)">混合试点 ★</div>
  <div class="glass-card p-4 text-center font-semibold" style="color:var(--ppt-text)">全量外采</div>

  <div class="glass-card p-4 font-semibold" style="color:var(--ppt-text)">上线速度</div>
  <div class="glass-card p-4" style="color:var(--ppt-text-body)">慢，需要完整团队与基础设施</div>
  <div class="glass-card p-4" style="color:var(--ppt-text-body);background:color-mix(in srgb, var(--ppt-primary) 8%, transparent)">中等，先复用外部能力</div>
  <div class="glass-card p-4" style="color:var(--ppt-text-body)">快，但深度定制受限</div>

  <div class="glass-card p-4 font-semibold" style="color:var(--ppt-text)">控制力</div>
  <div class="glass-card p-4" style="color:var(--ppt-text-body)">最高，但维护成本高</div>
  <div class="glass-card p-4" style="color:var(--ppt-text-body);background:color-mix(in srgb, var(--ppt-primary) 8%, transparent)">关键数据和流程可控</div>
  <div class="glass-card p-4" style="color:var(--ppt-text-body)">依赖供应商路线图</div>

  <div class="glass-card p-4 font-semibold" style="color:var(--ppt-text)">学习成本</div>
  <div class="glass-card p-4" style="color:var(--ppt-text-body)">高，需要长期投入</div>
  <div class="glass-card p-4" style="color:var(--ppt-text-body);background:color-mix(in srgb, var(--ppt-primary) 8%, transparent)">可控，边用边沉淀能力</div>
  <div class="glass-card p-4" style="color:var(--ppt-text-body)">低，但内部能力积累少</div>
</div>

<div class="glass-card mt-5 p-4 text-sm" style="color:var(--ppt-text-body)">
  <span class="font-semibold" style="color:var(--ppt-primary)">结论：</span>混合试点不是折中，而是用最小风险换取最快学习速度。
</div>

<!--
演讲者备注：按行解释速度、控制力、学习成本三类取舍。强调推荐列不是中庸选择，而是阶段性最优路径。证据来源：tech:F3, market:F7。
-->
```
