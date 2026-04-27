---
id: code-showcase
contentTypes: [code, implementation, tutorial]
mood: [analytical, focused, technical]
density: heavy
visualImpact: medium
bestFor: "展示代码实现细节，逐步高亮解释关键逻辑"
avoid: "非技术受众的汇报、纯概念阐述无代码时"
pairs_well_with: [content-split, architecture-annotated, three-cards]
---

# Page Template: Code Showcase

Design intent: Code block with line highlighting on left, explanation cards on right. Uses CSS variables for dark/light mode.

```md
---
transition: slide-left
---

<div class="section-bar">

# 5. 代码示例

</div>

<div class="grid grid-cols-2 gap-6 mt-6">
<div>

```python {all|3-6|8-12|all}{maxHeight:'280px'}
from framework import Agent, Server

agent = Agent(
    name="research_assistant",
    model="claude-sonnet-4",
    description="Research and analysis agent"
)

server = Server(
    agent=agent,
    port=8080,
    capabilities={"streaming": True}
)
server.start()
```

</div>
<div class="flex flex-col gap-4">

<div v-click class="glass-card">
  <div class="icon-box mb-3"><mdi-code-braces class="text-base" /></div>
  <div class="font-semibold text-sm mb-2" style="color:var(--ppt-text)">关键步骤</div>
  <div class="text-xs" style="color:var(--ppt-text-body)">
    定义 Agent 实例，配置模型和能力描述，然后绑定到 Server 启动服务。
  </div>
</div>

<div v-click class="glass-card">
  <div class="icon-box mb-3"><mdi-lightning-bolt class="text-base" /></div>
  <div class="font-semibold text-sm mb-2" style="color:var(--ppt-text)">核心亮点</div>
  <div class="text-xs" style="color:var(--ppt-text-body)">
    三行代码完成从定义到上线，支持流式响应。
  </div>
</div>

</div>
</div>

<!--
演讲者备注：逐步高亮代码关键段落，配合右侧卡片解说。
-->
```
