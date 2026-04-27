---
id: architecture-annotated
contentTypes: [architecture, system-design, flow]
mood: [analytical, technical]
density: heavy
visualImpact: high
bestFor: "系统架构、数据流、平台能力的可视化展示配文字注释"
avoid: "非技术受众的高层汇报中避免过于复杂的架构图"
pairs_well_with: [code-showcase, content-split, detail-two-col]
---

# 页面模板：架构图 + 注释

设计意图：主区域放架构图或 Mermaid，侧边放 3 个注释点，让技术页既不空泛也不拥挤。适合系统架构、数据流、平台能力和方案设计。

## 标准变体：主图 + 3 个注释点

```md
---
transition: slide-left
---

<div class="section-bar">

# 三层架构把复杂度拆开
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">接入、编排、执行分层，降低扩展和治理成本</div>

</div>

<div class="grid grid-cols-[1.45fr_0.9fr] gap-5 mt-6">
  <div class="glass-card p-5">

```mermaid {scale: 0.5}
graph LR
    A[业务入口] --> B[接入层]
    B --> C[编排层]
    C --> D[执行层]
    D --> E[数据回流]
    E --> C
```

  </div>

  <div class="grid grid-rows-3 gap-4">
    <div class="glass-card p-4">
      <div class="text-xs font-bold" style="color:var(--ppt-primary)">01 接入层</div>
      <div class="text-sm mt-2" style="color:var(--ppt-text-body)">统一身份、权限和入口协议，减少业务方接入成本。</div>
    </div>
    <div class="glass-card p-4">
      <div class="text-xs font-bold" style="color:var(--ppt-primary)">02 编排层</div>
      <div class="text-sm mt-2" style="color:var(--ppt-text-body)">把策略、流程和模型选择集中管理，避免规则散落。</div>
    </div>
    <div class="glass-card p-4">
      <div class="text-xs font-bold" style="color:var(--ppt-primary)">03 执行层</div>
      <div class="text-sm mt-2" style="color:var(--ppt-text-body)">隔离具体工具和服务，便于替换、灰度和监控。</div>
    </div>
  </div>
</div>

<!--
演讲者备注：先看左侧三层结构，再解释右侧三个注释。强调分层带来的治理、扩展和替换能力。证据来源：tech:F4, tech:F8。
-->
```
