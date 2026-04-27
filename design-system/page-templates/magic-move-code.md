---
id: magic-move-code
contentTypes: [code, refactoring, evolution, tutorial]
mood: [technical, engaging, progressive]
density: medium
visualImpact: high
bestFor: "展示代码演进过程，如重构、添加功能、模式转换，让观众跟踪每一步变化"
avoid: "代码差异超过 30% 时观众无法跟踪；非代码内容不要滥用"
pairs_well_with: [code-showcase, content-split, architecture-annotated]
---

# Page Template: Magic Move Code Evolution

Design intent: Multi-step code transformation using Slidev's Magic Move feature. Each step represents one logical concept change (max 3 steps, ≤30% diff per step). The audience visually tracks what changed between states. Best for refactoring demos, pattern evolution, and API migration walkthroughs.

## Light Variant (2 steps)

```md
---
transition: slide-left
---

<div class="section-bar">

# 代码演进：从回调到 async/await

</div>

<div class="mt-6">

````md magic-move
```typescript
function fetchUser(id: string, callback: (user: User) => void) {
  db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, rows) => {
    if (err) throw err;
    callback(rows[0]);
  });
}

fetchUser("123", (user) => {
  console.log(user.name);
});
```

```typescript
async function fetchUser(id: string): Promise<User> {
  const rows = await db.query(
    `SELECT * FROM users WHERE id = ?`, [id]
  );
  return rows[0];
}

const user = await fetchUser("123");
console.log(user.name);
```
````

</div>

<div v-click class="glass-card mt-4 p-4">
  <div class="flex items-center gap-3">
    <div class="icon-box"><mdi-lightning-bolt class="text-base" /></div>
    <div>
      <div class="font-semibold text-sm" style="color:var(--ppt-text)">关键变化</div>
      <div class="text-xs" style="color:var(--ppt-text-body)">消除嵌套回调，错误处理统一为 try/catch，返回值语义更清晰。</div>
    </div>
  </div>
</div>

<!--
演讲者备注：Magic Move 会自动动画化两段代码之间的差异。讲解时先展示回调版本，解释痛点，再过渡到 async 版本并用底部卡片总结收益。
[click] 展示关键变化总结卡片
-->
```

## Heavy Variant (3 steps)

```md
---
transition: slide-left
---

<div class="section-bar">

# 渐进式类型安全
<div class="text-sm mt-1" style="color:var(--ppt-text-body)">从 any 到完全类型推导的三步演进</div>

</div>

<div class="mt-4">

````md magic-move
```typescript
function processData(input: any): any {
  const result = input.map((item: any) => ({
    id: item.id,
    value: item.data * 2,
  }));
  return result;
}
```

```typescript
interface DataItem {
  id: string;
  data: number;
}

function processData(input: DataItem[]): { id: string; value: number }[] {
  const result = input.map((item) => ({
    id: item.id,
    value: item.data * 2,
  }));
  return result;
}
```

```typescript
interface DataItem {
  id: string;
  data: number;
}

type ProcessedItem = Pick<DataItem, 'id'> & { value: number };

function processData(input: DataItem[]): ProcessedItem[] {
  return input.map(({ id, data }) => ({
    id,
    value: data * 2,
  }));
}
```
````

</div>

<div class="flex gap-4 mt-3">
  <div v-click class="glass-card flex-1 p-3">
    <div class="text-xs font-bold" style="color:var(--ppt-primary)">Step 1</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">添加接口定义</div>
  </div>
  <div v-click class="glass-card flex-1 p-3">
    <div class="text-xs font-bold" style="color:var(--ppt-primary)">Step 2</div>
    <div class="text-xs mt-1" style="color:var(--ppt-text-body)">工具类型 + 解构</div>
  </div>
</div>

<!--
演讲者备注：三步 Magic Move 展示渐进式类型安全改造。每步只改一个概念：1) 消除 any 加接口；2) 加入类型别名和工具类型；3) 解构简化。
[click] Step 1 总结
[click] Step 2 总结
-->
```
