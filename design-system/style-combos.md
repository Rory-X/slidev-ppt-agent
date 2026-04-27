# 风格组合套餐

验证过的模板组合方案。Designer Agent 在 style-plan 中应选择最接近的 combo 作为基线，Composer Agent 在逐页选模板时参考套餐保持风格连贯。

每个 combo 定义了：
- 适用原型和 Token
- 视觉冲击力节奏（波浪形）
- 每个叙事阶段推荐的模板序列
- 禁止组合（哪些模板不该出现在此套餐中）

---

## Combo 1: 技术深潜（Tech Deep Dive）

适用原型：technical-share, conference-talk
推荐 Token：tech-minimal
整体调性：专注、精确、渐进深入
节奏感：low → medium → high → high → medium → low

| 叙事阶段 | 推荐模板序列 | visualImpact | 说明 |
|----------|-------------|-------------|------|
| 开场 | cover → speaker-hero（可选） | low → medium | 平静建立信任 |
| 背景/问题 | content-split → quote-highlight | medium → high | 引出痛点 |
| 方案/架构 | architecture-annotated → detail-two-col | high → medium | 核心技术展示 |
| 代码演示 | magic-move-code → code-showcase | high → medium | 代码变形是高潮 |
| 证据/成果 | metrics-strip 或 evidence-dashboard | medium | 数据锚定 |
| 总结 | summary | low | 收束归纳 |

禁止组合：
- 不要在此套餐中使用 `device-mockup`（与纯代码技术氛围不搭）
- 不要使用 `gradient-divider`（tech-minimal 风格偏冷静，渐变分割过于戏剧化）

---

## Combo 2: 高管汇报（Executive Briefing）

适用原型：executive-briefing, quarterly-review
推荐 Token：corporate-blue
整体调性：权威、简洁、决策导向
节奏感：low → medium → high → medium → low

| 叙事阶段 | 推荐模板序列 | visualImpact | 说明 |
|----------|-------------|-------------|------|
| 开场 | cover | low | 简洁正式 |
| 背景/现状 | content-split → hero-metric | medium → high | 数据说话 |
| 发现/洞察 | evidence-dashboard → insight-plus-proof | high → high | 核心价值集中输出 |
| 建议/方案 | comparison-matrix-lite → three-cards | medium → medium | 选项清晰 |
| 下一步 | timeline → summary | medium → low | 行动导向 |

禁止组合：
- 不要使用 `magic-move-code`、`code-showcase`（高管不看代码）
- 不要使用 `gradient-divider`（正式场合慎用渐变）
- 不要使用 `speaker-hero`（汇报不需要自我介绍）

---

## Combo 3: 产品发布（Product Launch）

适用原型：product-launch, pitch-deck
推荐 Token：gradient-dark 或 pitch-modern
整体调性：激动人心、视觉冲击、面向未来
节奏感：high → medium → high → high → medium → high → low

| 叙事阶段 | 推荐模板序列 | visualImpact | 说明 |
|----------|-------------|-------------|------|
| 开场 | cover → gradient-divider | high → high | 强视觉开场 |
| 痛点 | before-after → quote-highlight | high → high | 制造共鸣 |
| 产品方案 | device-mockup → image-showcase | high → high | 让产品说话 |
| 功能展示 | three-cards → content-split | medium → medium | 呼吸空间 |
| 数据验证 | hero-metric → metrics-strip | high → medium | 用数字收尾 |
| CTA | summary | low | 明确行动号召 |

禁止组合：
- 不要使用 `architecture-annotated`（太技术化）
- 不要使用 `comparison-table`（定价对比用单独页面处理更好）
- 不要使用 `faq`（产品发布不是答疑会）

---

## Combo 4: 开发者大会演讲（Conference Talk）

适用原型：conference-talk
推荐 Token：tech-minimal 或 gradient-dark
整体调性：有故事感、交互性强、代码为王
节奏感：medium → low → medium → high → high → medium → low

| 叙事阶段 | 推荐模板序列 | visualImpact | 说明 |
|----------|-------------|-------------|------|
| 开场/钩子 | cover → speaker-hero | medium → medium | 建立人设 |
| 故事/问题 | content-split → image-showcase | medium → high | 场景代入 |
| 方案概览 | gradient-divider → architecture-annotated | high → high | 戏剧性转折 |
| 代码演示 | magic-move-code → code-showcase → before-after | high → medium → high | 核心高潮 |
| 收获 | three-cards → summary | medium → low | 三个 takeaway |

禁止组合：
- 不要使用 `evidence-dashboard`（太商务化）
- 不要使用 `comparison-table`（太结构化，不适合演讲节奏）
- 连续 3 页 `code-showcase` 会让非技术观众失去注意力

---

## Combo 5: 培训工作坊（Training Workshop）

适用原型：training-workshop
推荐 Token：warm-creative
整体调性：友好、循序渐进、实操为主
节奏感：low → medium → medium → high → medium → low

| 叙事阶段 | 推荐模板序列 | visualImpact | 说明 |
|----------|-------------|-------------|------|
| 目标 | cover → toc | low → low | 建立学习预期 |
| 概念讲解 | content-split → three-cards | medium → medium | 知识传递 |
| 步骤演示 | process-with-risks → code-showcase | medium → medium | 手把手教学 |
| 实操 | magic-move-code → before-after | high → high | 动手体验 |
| 练习 | faq → comparison-matrix-lite | medium → medium | 答疑巩固 |
| 回顾 | metrics-strip → summary | medium → low | 量化收获 |

禁止组合：
- 不要使用 `hero-metric`（培训不需要戏剧性数字揭示）
- 不要使用 `gradient-divider`（warm-creative 风格偏温暖，不适合强渐变）
- 不要使用 `insight-plus-proof`（培训不需要强观点证明）

---

## 如何使用本文件

1. **Designer Agent**：在 style-plan.md 中声明"参考 Combo N"，并注明是否有偏离
2. **Architect Agent**：大纲生成时参考对应 combo 的 visualImpact 节奏分配 `visual_impact` 字段
3. **Composer Agent**：逐页选模板时以 combo 推荐为基线，确保不触犯"禁止组合"
4. **Reviewer Agent**：检查最终 deck 是否偏离所选 combo 的节奏感和禁止规则

## 通用禁止规则（适用于所有 combo）

- 连续 3 页以上相同模板 → 视觉疲劳
- 连续 2 页 `visualImpact: high` 且无呼吸页 → 需要插入 medium/low 页
- cover 之后直接接 summary → 缺少内容
- code-showcase + architecture-annotated 同一页 → 违反单一视觉重心原则
