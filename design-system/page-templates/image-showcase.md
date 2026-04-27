---
id: image-showcase
contentTypes: [image, storytelling, product, case-study]
mood: [inspiring, immersive, dramatic]
density: medium
visualImpact: high
bestFor: "用全屏图片烘托氛围，讲述产品愿景或展示真实场景"
avoid: "无高质量图片素材时、纯数据/代码内容"
pairs_well_with: [quote-highlight, hero-metric, content-split]
---

# Page Template: Image Showcase

Design intent: Full-bleed imagery with overlaid text for visual storytelling, product screenshots, or scene-setting. Uses Slidev's `layout: image` or `layout: image-left` for native image handling. A semi-transparent glass overlay ensures text remains readable against any background. Alt-text documented in presenter notes for accessibility.

## Light Variant (full-bleed background)

```md
---
layout: image
image: https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&q=80
class: text-white
---

<div class="absolute inset-0 bg-black/40"></div>

<div class="relative z-10 flex flex-col justify-end h-full pb-16 px-16">

<div class="glass-card max-w-lg" style="background:rgba(0,0,0,0.5);backdrop-filter:blur(12px)">
  <div class="text-xs tracking-[0.2em] uppercase mb-2" style="color:var(--ppt-primary)">PRODUCT VISION</div>
  <div class="text-2xl font-bold mb-3" style="color:#fff">重新定义人机交互体验</div>
  <div class="text-sm leading-relaxed" style="color:rgba(255,255,255,0.8)">
    下一代界面不再是屏幕上的按钮，而是理解意图、预测需求的智能伙伴。
  </div>
</div>

</div>

<!--
演讲者备注：全屏科技感背景图烘托氛围。Alt-text: 深色调笔记本电脑屏幕发出蓝色光芒的技术工作场景。讲解产品愿景时保持视觉沉浸感。
-->
```

## Heavy Variant (image-left split layout)

```md
---
layout: image-left
image: https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=960&q=80
---

<div class="flex flex-col justify-center h-full">

<div class="text-xs tracking-[0.2em] uppercase mb-3" style="color:var(--ppt-primary)">CASE STUDY</div>

<div class="text-xl font-bold mb-4" style="color:var(--ppt-text)">跨部门协作效率提升 3 倍</div>

<div class="text-sm leading-relaxed mb-6" style="color:var(--ppt-text-body)">
  某头部互联网公司在引入统一协作平台后，项目交付周期从 6 周缩短到 2 周，跨团队沟通成本降低 60%。
</div>

<div class="flex gap-6 mb-6">
  <div v-click>
    <div class="text-lg font-bold" style="color:var(--ppt-primary)">3x</div>
    <div class="text-xs" style="color:var(--ppt-text-muted)">协作效率</div>
  </div>
  <div v-click>
    <div class="text-lg font-bold" style="color:var(--ppt-primary)">-60%</div>
    <div class="text-xs" style="color:var(--ppt-text-muted)">沟通成本</div>
  </div>
  <div v-click>
    <div class="text-lg font-bold" style="color:var(--ppt-primary)">2 周</div>
    <div class="text-xs" style="color:var(--ppt-text-muted)">交付周期</div>
  </div>
</div>

<div v-click class="glass-card py-3 px-4">
  <div class="text-xs italic" style="color:var(--ppt-text-body)">
    "这是我们数字化转型中 ROI 最高的一次投入。" —— 技术副总裁
  </div>
</div>

</div>

<!--
演讲者备注：左侧展示团队协作场景照片。Alt-text: 四位同事围坐在桌前用笔记本电脑协同工作的场景。右侧逐步展示量化成果，最后用客户引言收尾增强说服力。
-->
```
