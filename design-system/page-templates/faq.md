---
id: faq
contentTypes: [qa, objections, discussion]
mood: [conversational, reassuring]
density: medium
visualImpact: low
bestFor: "预判听众疑问并主动回答，消除顾虑建立信任"
avoid: "问题与主题关联弱时、答案需要大量图表支撑时"
pairs_well_with: [summary, comparison-table, metrics-strip]
---

# Page Template: FAQ

Design intent: Q&A format for addressing objections, pre-empting audience questions, or summarizing key takeaways in a conversational structure. Questions are bold and visually separated; answers appear on click for paced delivery. `.section-bar` separators keep the layout scannable even with dense content.

## Light Variant (3 questions)

```md
---
transition: slide-left
---

<div class="section-bar">

# 常见问题
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">关于本方案的核心疑问</div>

</div>

<div class="mt-8 space-y-6 max-w-2xl">

<div v-click>
  <div class="font-semibold mb-2" style="color:var(--ppt-text)">
    <mdi-help-circle-outline class="inline-block mr-2 align-middle" style="color:var(--ppt-primary)" />
    数据迁移需要多长时间？
  </div>
  <div class="text-sm ml-8" style="color:var(--ppt-text-body)">
    根据数据量级不同，通常 3-7 个工作日。我们提供全程迁移支持和验证工具，确保零数据丢失。
  </div>
  <div class="divider-line mt-4"></div>
</div>

<div v-click>
  <div class="font-semibold mb-2" style="color:var(--ppt-text)">
    <mdi-help-circle-outline class="inline-block mr-2 align-middle" style="color:var(--ppt-primary)" />
    现有系统能否并行运行？
  </div>
  <div class="text-sm ml-8" style="color:var(--ppt-text-body)">
    支持。我们推荐灰度切换策略——新旧系统并行 2 周，确认稳定后再完成全量切换。
  </div>
  <div class="divider-line mt-4"></div>
</div>

<div v-click>
  <div class="font-semibold mb-2" style="color:var(--ppt-text)">
    <mdi-help-circle-outline class="inline-block mr-2 align-middle" style="color:var(--ppt-primary)" />
    技术支持的响应时间是多少？
  </div>
  <div class="text-sm ml-8" style="color:var(--ppt-text-body)">
    Business 版 4 小时响应，Enterprise 版 1 小时响应，均含 7×24 紧急通道。
  </div>
</div>

</div>

<!--
演讲者备注：这些问题来自前期客户调研中出现频率最高的三个。逐一点击展开，回答后观察听众反应，看是否需要补充说明。
-->
```

## Heavy Variant (5 questions, denser)

```md
---
transition: slide-left
---

<div class="section-bar">

# 深度 Q&A
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">技术与商业层面的关键问题解答</div>

</div>

<div class="mt-6 space-y-4 max-w-2xl">

<div v-click>
  <div class="font-semibold text-sm mb-1" style="color:var(--ppt-text)">
    <mdi-help-circle-outline class="inline-block mr-2 align-middle" style="color:var(--ppt-primary)" />
    与现有竞品的核心差异是什么？
  </div>
  <div class="text-xs ml-8" style="color:var(--ppt-text-body)">
    端到端一体化架构，无需第三方中间件拼接。单一平台覆盖数据采集、分析、可视化全链路，TCO 降低 40%。
  </div>
  <div class="divider-line mt-3"></div>
</div>

<div v-click>
  <div class="font-semibold text-sm mb-1" style="color:var(--ppt-text)">
    <mdi-help-circle-outline class="inline-block mr-2 align-middle" style="color:var(--ppt-primary)" />
    私有化部署是否支持？
  </div>
  <div class="text-xs ml-8" style="color:var(--ppt-text-body)">
    完全支持。提供 Docker / K8s 两种部署方式，附带一键安装脚本和运维监控面板。
  </div>
  <div class="divider-line mt-3"></div>
</div>

<div v-click>
  <div class="font-semibold text-sm mb-1" style="color:var(--ppt-text)">
    <mdi-help-circle-outline class="inline-block mr-2 align-middle" style="color:var(--ppt-primary)" />
    数据安全合规性如何保障？
  </div>
  <div class="text-xs ml-8" style="color:var(--ppt-text-body)">
    已通过 SOC 2 Type II、ISO 27001 认证，支持国内等保三级。数据加密存储，审计日志完整保留。
  </div>
  <div class="divider-line mt-3"></div>
</div>

<div v-click>
  <div class="font-semibold text-sm mb-1" style="color:var(--ppt-text)">
    <mdi-help-circle-outline class="inline-block mr-2 align-middle" style="color:var(--ppt-primary)" />
    实施周期和人员投入预估？
  </div>
  <div class="text-xs ml-8" style="color:var(--ppt-text-body)">
    标准实施 4-6 周，客户侧需 1 名项目经理 + 1 名技术对接人。我们配备专属交付团队 3-5 人。
  </div>
  <div class="divider-line mt-3"></div>
</div>

<div v-click>
  <div class="font-semibold text-sm mb-1" style="color:var(--ppt-text)">
    <mdi-help-circle-outline class="inline-block mr-2 align-middle" style="color:var(--ppt-primary)" />
    ROI 预期和回本周期？
  </div>
  <div class="text-xs ml-8" style="color:var(--ppt-text-body)">
    根据已有客户数据，平均 6 个月回本。主要节省在人力成本（减少 30%）和系统维护成本（减少 50%）。
  </div>
</div>

</div>

<!--
演讲者备注：五个问题按"差异→部署→安全→实施→ROI"的决策逻辑排列。前三个打消技术顾虑，后两个聚焦商业价值。根据时间可选择性跳过中间问题。
-->
```
