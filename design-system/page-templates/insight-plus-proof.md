# 页面模板：洞察 + 证明

设计意图：左侧承载强观点，右侧用 2-3 条证据或案例证明观点，避免“一个观点占半屏”的空泛页面。适合战略建议、产品定位、趋势判断和研究解读。

## 标准变体：左侧洞察 + 右侧证明链

```md
---
transition: slide-left
---

<div class="section-bar">

# 真正的瓶颈不是工具，而是采用路径
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">技术可用后，组织行为成为扩散速度的决定因素</div>

</div>

<div class="grid grid-cols-[1.2fr_1fr] gap-5 mt-7">
  <div class="glass-card p-6 flex flex-col justify-between">
    <div>
      <div class="tag-badge">核心洞察</div>
      <div class="text-2xl font-semibold mt-4 leading-snug" style="color:var(--ppt-text)">只优化工具能力，会把问题推迟到落地阶段；先设计采用路径，才能把试点变成规模化。</div>
    </div>
    <div class="mt-8 text-sm leading-relaxed" style="color:var(--ppt-text-body)">因此方案不应只回答“能不能做”，还要回答“谁先用、如何衡量、怎样扩散”。</div>
  </div>

  <div class="grid grid-rows-3 gap-4">
    <div class="glass-card p-4">
      <div class="text-xs font-bold" style="color:var(--ppt-primary)">证明 01</div>
      <div class="text-sm font-semibold mt-2" style="color:var(--ppt-text)">试点成功不等于规模成功</div>
      <div class="text-xs mt-1" style="color:var(--ppt-text-body)">很多团队卡在跨部门复制，而不是技术验证。</div>
    </div>
    <div class="glass-card p-4">
      <div class="text-xs font-bold" style="color:var(--ppt-primary)">证明 02</div>
      <div class="text-sm font-semibold mt-2" style="color:var(--ppt-text)">采用者画像决定首批场景</div>
      <div class="text-xs mt-1" style="color:var(--ppt-text-body)">高频、低风险、可量化场景更容易形成正反馈。</div>
    </div>
    <div class="glass-card p-4">
      <div class="text-xs font-bold" style="color:var(--ppt-primary)">证明 03</div>
      <div class="text-sm font-semibold mt-2" style="color:var(--ppt-text)">指标闭环推动预算延续</div>
      <div class="text-xs mt-1" style="color:var(--ppt-text-body)">从效率、质量、满意度三类指标证明价值。</div>
    </div>
  </div>
</div>

<!--
演讲者备注：这一页的重点是把“工具能力”重新框定为“采用路径”。右侧三条证明分别对应落地风险、场景选择和预算延续。证据来源：audience:F2, ops:F4。
-->
```
