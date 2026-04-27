---
id: comparison-table
contentTypes: [comparison, pricing, evaluation]
mood: [analytical, organized]
density: heavy
visualImpact: medium
bestFor: "结构化的方案/定价/功能对比，有明确推荐选项时"
avoid: "维度少于 3 行时表格显得空，可用 three-cards 替代"
pairs_well_with: [comparison-matrix-lite, metrics-strip, faq]
---

# Page Template: Comparison Table

Design intent: Structured side-by-side comparison for plan tiers, feature matrices, or option evaluation. One column visually promoted as "recommended" via primary-color header background. Wrapped in `.ppt-table` for consistent styling. Dense content uses `text-sm` to stay within overflow limits.

## Light Variant (2 columns, 5 rows)

```md
---
transition: slide-left
---

<div class="section-bar">

# 方案对比
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">选择最适合的部署策略</div>

</div>

<div class="mt-8 ppt-table">
<table class="w-full text-sm">
<thead>
<tr>
  <th class="text-left py-3 px-4" style="color:var(--ppt-text-muted)">评估维度</th>
  <th class="text-center py-3 px-4" style="color:var(--ppt-text)">方案 A：云托管</th>
  <th class="text-center py-3 px-4 rounded-t-lg" style="background:var(--ppt-primary);color:#fff">方案 B：混合部署 ★</th>
</tr>
</thead>
<tbody>
<tr v-click>
  <td class="py-2 px-4 font-medium" style="color:var(--ppt-text)">初始成本</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body)">低（按需付费）</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body);background:color-mix(in srgb, var(--ppt-primary) 6%, transparent)">中（一次性 + 按需）</td>
</tr>
<tr v-click>
  <td class="py-2 px-4 font-medium" style="color:var(--ppt-text)">数据主权</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body)">受限于供应商</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body);background:color-mix(in srgb, var(--ppt-primary) 6%, transparent)">完全自主可控</td>
</tr>
<tr v-click>
  <td class="py-2 px-4 font-medium" style="color:var(--ppt-text)">弹性扩展</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body)">优秀</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body);background:color-mix(in srgb, var(--ppt-primary) 6%, transparent)">良好</td>
</tr>
<tr v-click>
  <td class="py-2 px-4 font-medium" style="color:var(--ppt-text)">运维复杂度</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body)">低</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body);background:color-mix(in srgb, var(--ppt-primary) 6%, transparent)">中</td>
</tr>
<tr v-click>
  <td class="py-2 px-4 font-medium" style="color:var(--ppt-text)">合规性</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body)">需额外审计</td>
  <td class="text-center py-2 px-4" style="color:var(--ppt-text-body);background:color-mix(in srgb, var(--ppt-primary) 6%, transparent)">天然满足</td>
</tr>
</tbody>
</table>
</div>

<!--
演讲者备注：逐行展开对比维度。方案 B 列高亮为推荐选项，重点解释数据主权和合规性优势。
-->
```

## Heavy Variant (4 columns, 6 rows)

```md
---
transition: slide-left
---

<div class="section-bar">

# 定价方案对比
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">四个版本满足不同规模需求</div>

</div>

<div class="mt-6 ppt-table">
<table class="w-full text-sm">
<thead>
<tr>
  <th class="text-left py-2 px-3" style="color:var(--ppt-text-muted)">功能</th>
  <th class="text-center py-2 px-3" style="color:var(--ppt-text)">Free</th>
  <th class="text-center py-2 px-3" style="color:var(--ppt-text)">Pro</th>
  <th class="text-center py-2 px-3 rounded-t-lg" style="background:var(--ppt-primary);color:#fff">Business ★</th>
  <th class="text-center py-2 px-3" style="color:var(--ppt-text)">Enterprise</th>
</tr>
</thead>
<tbody>
<tr v-click>
  <td class="py-2 px-3 font-medium" style="color:var(--ppt-text)">月价格</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">¥0</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">¥99</td>
  <td class="text-center py-2 px-3 font-semibold" style="color:var(--ppt-text);background:color-mix(in srgb, var(--ppt-primary) 6%, transparent)">¥299</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">定制</td>
</tr>
<tr v-click>
  <td class="py-2 px-3 font-medium" style="color:var(--ppt-text)">用户数</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">1</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">5</td>
  <td class="text-center py-2 px-3" style="background:color-mix(in srgb, var(--ppt-primary) 6%, transparent);color:var(--ppt-text-body)">50</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">不限</td>
</tr>
<tr v-click>
  <td class="py-2 px-3 font-medium" style="color:var(--ppt-text)">存储空间</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">1 GB</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">50 GB</td>
  <td class="text-center py-2 px-3" style="background:color-mix(in srgb, var(--ppt-primary) 6%, transparent);color:var(--ppt-text-body)">500 GB</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">不限</td>
</tr>
<tr v-click>
  <td class="py-2 px-3 font-medium" style="color:var(--ppt-text)">API 调用</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">1K/月</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">50K/月</td>
  <td class="text-center py-2 px-3" style="background:color-mix(in srgb, var(--ppt-primary) 6%, transparent);color:var(--ppt-text-body)">500K/月</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">不限</td>
</tr>
<tr v-click>
  <td class="py-2 px-3 font-medium" style="color:var(--ppt-text)">SLA</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">—</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">99.5%</td>
  <td class="text-center py-2 px-3" style="background:color-mix(in srgb, var(--ppt-primary) 6%, transparent);color:var(--ppt-text-body)">99.9%</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">99.99%</td>
</tr>
<tr v-click>
  <td class="py-2 px-3 font-medium" style="color:var(--ppt-text)">专属支持</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">社区</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">邮件</td>
  <td class="text-center py-2 px-3" style="background:color-mix(in srgb, var(--ppt-primary) 6%, transparent);color:var(--ppt-text-body)">专属群</td>
  <td class="text-center py-2 px-3" style="color:var(--ppt-text-body)">CSM 1v1</td>
</tr>
</tbody>
</table>
</div>

<!--
演讲者备注：逐行展示功能差异。Business 列是推荐方案——性价比最高，满足绝大多数中型团队需求。最后引导关注 SLA 和支持差异。
-->
```
