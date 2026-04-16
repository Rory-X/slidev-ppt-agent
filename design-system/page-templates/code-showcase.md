# Page Template: Code Showcase

Design intent: Code block with line highlighting on the left, explanation card on the right. Technical credibility with clarity.

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
  <div class="font-semibold text-sm mb-2">关键步骤</div>
  <div class="text-xs text-[#C7C9D9]">
    定义 Agent 实例，配置模型和能力描述，然后绑定到 Server 启动服务。
  </div>
</div>

<div v-click class="glass-card">
  <div class="icon-box mb-3"><mdi-lightning-bolt class="text-base" /></div>
  <div class="font-semibold text-sm mb-2">核心亮点</div>
  <div class="text-xs text-[#C7C9D9]">
    三行代码完成从定义到上线，支持流式响应。
  </div>
</div>

</div>
</div>

<!--
演讲者备注：逐步高亮代码关键段落，配合右侧卡片解说。
-->
```
