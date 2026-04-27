# 页面模板：证据仪表盘

设计意图：用于把一个核心判断和多条证据放在同一页。页面上方给出结论，下方用 4 张证据卡补足信息密度，适合市场判断、调研结论、竞品分析和管理汇报。

## 标准变体：1 个主张 + 4 个证据卡

```md
---
transition: slide-left
---

<div class="section-bar">

# 增长窗口已经打开
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">四类信号共同指向下一阶段投入机会</div>

</div>

<div class="glass-card mt-6 p-5">
  <div class="text-xl font-semibold" style="color:var(--ppt-text)">核心判断：现在是进入该市场的最佳 6-12 个月窗口</div>
  <div class="text-sm mt-2" style="color:var(--ppt-text-body)">需求端、供给端、政策端和资本端信号开始共振，先发团队可以建立渠道与认知优势。</div>
</div>

<div class="grid grid-cols-4 gap-4 mt-5">
  <div class="glass-card p-4">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">需求</div>
    <div class="text-sm font-semibold mt-2" style="color:var(--ppt-text)">客户预算上移</div>
    <div class="text-xs mt-2" style="color:var(--ppt-text-body)">采购从试点预算进入部门级年度预算。</div>
  </div>
  <div class="glass-card p-4">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">供给</div>
    <div class="text-sm font-semibold mt-2" style="color:var(--ppt-text)">方案成熟度提升</div>
    <div class="text-xs mt-2" style="color:var(--ppt-text-body)">核心技术栈稳定，交付周期明显缩短。</div>
  </div>
  <div class="glass-card p-4">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">竞争</div>
    <div class="text-sm font-semibold mt-2" style="color:var(--ppt-text)">格局尚未固化</div>
    <div class="text-xs mt-2" style="color:var(--ppt-text-body)">头部玩家仍在探索定位，细分入口可切入。</div>
  </div>
  <div class="glass-card p-4">
    <div class="text-xs font-bold tracking-wider" style="color:var(--ppt-primary)">行动</div>
    <div class="text-sm font-semibold mt-2" style="color:var(--ppt-text)">先抢样板客户</div>
    <div class="text-xs mt-2" style="color:var(--ppt-text-body)">以 3 个行业标杆案例建立信任飞轮。</div>
  </div>
</div>

<!--
演讲者备注：先讲核心判断，再按需求、供给、竞争、行动四个证据块解释。证据来源：market:F1, competitor:F3, customer:F5。
-->
```
