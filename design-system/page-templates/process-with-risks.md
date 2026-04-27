# 页面模板：流程 + 风险

设计意图：在一页内展示 3 步流程，并用底部风险条补充约束条件。适合项目计划、实施路线、迁移方案、培训流程和运营 SOP。

## 标准变体：3 步流程 + 底部风险条

```md
---
transition: slide-left
---

<div class="section-bar">

# 试点落地分三步推进
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">先收敛范围，再验证价值，最后复制扩散</div>

</div>

<div class="grid grid-cols-3 gap-4 mt-7">
  <div class="glass-card p-5">
    <div class="icon-box mb-4"><mdi-numeric-1 /></div>
    <div class="text-lg font-semibold" style="color:var(--ppt-text)">定义试点边界</div>
    <div class="text-sm mt-3 leading-relaxed" style="color:var(--ppt-text-body)">选择高频、低风险、可衡量的单一场景，明确参与角色和数据口径。</div>
  </div>
  <div class="glass-card p-5">
    <div class="icon-box mb-4"><mdi-numeric-2 /></div>
    <div class="text-lg font-semibold" style="color:var(--ppt-text)">建立指标闭环</div>
    <div class="text-sm mt-3 leading-relaxed" style="color:var(--ppt-text-body)">用效率、质量、满意度三类指标衡量改进，而不是只看使用次数。</div>
  </div>
  <div class="glass-card p-5">
    <div class="icon-box mb-4"><mdi-numeric-3 /></div>
    <div class="text-lg font-semibold" style="color:var(--ppt-text)">复制到相邻团队</div>
    <div class="text-sm mt-3 leading-relaxed" style="color:var(--ppt-text-body)">沉淀模板、培训材料和复盘机制，再扩展到相似流程。</div>
  </div>
</div>

<div class="grid grid-cols-[1fr_1fr_1fr] gap-4 mt-5">
  <div class="glass-card p-3 text-xs" style="color:var(--ppt-text-body)"><span class="font-semibold" style="color:var(--ppt-warning)">风险：</span>场景过大导致价值难以归因</div>
  <div class="glass-card p-3 text-xs" style="color:var(--ppt-text-body)"><span class="font-semibold" style="color:var(--ppt-warning)">风险：</span>指标只看活跃度而忽略业务结果</div>
  <div class="glass-card p-3 text-xs" style="color:var(--ppt-text-body)"><span class="font-semibold" style="color:var(--ppt-warning)">风险：</span>缺少模板导致复制成本过高</div>
</div>

<!--
演讲者备注：先按 3 步讲主流程，再用底部风险条提醒每一步的失败模式。证据来源：ops:F6, counter:F2。
-->
```
