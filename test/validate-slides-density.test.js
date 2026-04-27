import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const rootDir = resolve(import.meta.dirname, '..');

function writeJson(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function runDensity(dir) {
  return spawnSync(
    process.execPath,
    [
      join(rootDir, 'scripts', 'validate-slides-density.js'),
      `--slides=${join(dir, 'slides.md')}`,
      `--outline=${join(dir, 'outline.json')}`,
      `--out=${join(dir, 'density-validation.json')}`
    ],
    { cwd: rootDir, encoding: 'utf-8' }
  );
}

describe('validate-slides-density', () => {
  it('输出空泛和密度不匹配 warning，但不让命令失败', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-density-'));
    writeFileSync(join(dir, 'slides.md'), `---
title: 测试
---

# 市场机会

- 增长

<!-- 备注 -->

---

# 技术架构

- 接入
- 编排

<!-- 备注 -->

---

# 附录说明

- A
- B
- C
- D
- E
- F

<!-- 备注 -->
`, 'utf-8');
    writeJson(join(dir, 'outline.json'), {
      ppt_outline: {
        parts: [
          {
            part_title: '第一部分',
            pages: [
              {
                title: '市场机会',
                density: 'standard',
                page_type: 'evidence',
                content_budget: '1 个主张 + 3 个证据卡'
              },
              {
                title: '技术架构',
                density: 'dense',
                page_type: 'architecture',
                content_budget: '1 个架构图 + 3 个注释点'
              },
              {
                title: '附录说明',
                density: 'light',
                page_type: 'quote',
                content_budget: '1 个轻量结论'
              }
            ]
          }
        ]
      }
    });

    const result = runDensity(dir);
    const report = JSON.parse(readFileSync(join(dir, 'density-validation.json'), 'utf-8'));
    const codes = report.warnings.map(w => w.code);

    assert.strictEqual(result.status, 0, result.stderr);
    assert.deepStrictEqual(report.valid, true);
    assert.ok(codes.includes('UNDERFILLED_CONTENT_SLIDE'));
    assert.ok(codes.includes('DENSITY_MISMATCH'));
    assert.ok(codes.includes('LIGHT_SLIDE_TOO_DENSE'));
  });
});
