# Page Template: Detail Two-Column

Design intent: Two glass cards side-by-side (can be unequal width) with internal sub-sections. Shows relationship or comparison between two major components.

```md
---
transition: slide-left
---

<div class="section-bar">

# 2. 核心组件：A & B

</div>

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="glass-card">
  <div class="flex items-center gap-3 mb-4">
    <div class="icon-box"><mdi-cog class="text-base" /></div>
    <div>
      <div class="font-semibold text-[#2DD4BF]">Component A</div>
      <div class="text-xs text-[#6B7280]">执行引擎与调度中枢</div>
    </div>
  </div>

  <div class="space-y-3">
    <div>
      <div class="font-medium text-sm flex items-center gap-2">
        <mdi-circle-small class="text-[#2DD4BF]" /> 子模块一
      </div>
      <div class="text-xs text-[#C7C9D9] ml-5">简要描述该子模块的职责和价值。</div>
    </div>
    <div>
      <div class="font-medium text-sm flex items-center gap-2">
        <mdi-circle-small class="text-[#2DD4BF]" /> 子模块二
      </div>
      <div class="text-xs text-[#C7C9D9] ml-5">简要描述。</div>
    </div>
  </div>
</div>

<div class="glass-card">
  <div class="flex items-center gap-3 mb-4">
    <div class="icon-box" style="background:rgba(167,139,250,0.12)">
      <mdi-brain class="text-base text-[#A78BFA]" />
    </div>
    <div>
      <div class="font-semibold text-[#A78BFA]">Component B</div>
      <div class="text-xs text-[#6B7280]">认知与长期规划大脑</div>
    </div>
  </div>

  <div class="space-y-3">
    <div>
      <div class="font-medium text-sm flex items-center gap-2">
        <mdi-circle-small class="text-[#A78BFA]" /> 子模块一
      </div>
      <div class="text-xs text-[#C7C9D9] ml-5">简要描述。</div>
    </div>
    <div>
      <div class="font-medium text-sm flex items-center gap-2">
        <mdi-circle-small class="text-[#A78BFA]" /> 子模块二
      </div>
      <div class="text-xs text-[#C7C9D9] ml-5">简要描述。</div>
    </div>
  </div>
</div>

</div>

<!--
演讲者备注：对比两个核心组件的职责分工与协作关系。
-->
```
