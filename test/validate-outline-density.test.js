import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const rootDir = resolve(import.meta.dirname, '..');

function writeJson(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function baseBrief() {
  return {
    pageRequirements: {
      totalPages: 4,
      includeCover: true,
      includeToc: false,
      includeEndPage: true
    }
  };
}

function baseOutline(page) {
  return {
    ppt_outline: {
      cover: {
        title: '封面',
        sub_title: '副标题',
        content: []
      },
      table_of_contents: {
        title: '目录',
        content: []
      },
      parts: [
        {
          part_title: '第一部分',
          pages: [page]
        },
        {
          part_title: '第二部分',
          pages: [
            {
              title: '行动计划',
              key_message: '下一步需要聚焦试点落地',
              content: ['确定范围', '建立节奏', '复盘指标'],
              evidence_refs: ['market:F2'],
              density: 'standard',
              page_type: 'process',
              content_budget: '1 个主张 + 3 个行动卡'
            }
          ]
        }
      ],
      end_page: {
        title: '结束页',
        content: ['谢谢']
      }
    }
  };
}

function runValidateOutline(dir) {
  return spawnSync(
    process.execPath,
    [
      join(rootDir, 'scripts', 'validate-outline.js'),
      `--brief=${join(dir, 'brief.json')}`,
      `--outline=${join(dir, 'outline.json')}`,
      `--out=${join(dir, 'outline-validation.json')}`
    ],
    { cwd: rootDir, encoding: 'utf-8' }
  );
}

describe('validate-outline density fields', () => {
  it('缺少内容页密度字段时校验失败', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-outline-density-'));
    writeJson(join(dir, 'brief.json'), baseBrief());
    writeJson(join(dir, 'outline.json'), baseOutline({
      title: '市场机会',
      key_message: '市场正在快速增长',
      content: ['需求增长', '预算增加'],
      evidence_refs: ['market:F1']
    }));

    const result = runValidateOutline(dir);

    assert.notStrictEqual(result.status, 0);
    assert.match(result.stderr, /MISSING_DENSITY/);
    assert.match(result.stderr, /MISSING_PAGE_TYPE/);
    assert.match(result.stderr, /MISSING_CONTENT_BUDGET/);
  });

  it('内容页密度字段完整时校验通过', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-outline-density-'));
    writeJson(join(dir, 'brief.json'), baseBrief());
    writeJson(join(dir, 'outline.json'), baseOutline({
      title: '市场机会',
      key_message: '市场正在快速增长',
      content: ['需求增长', '预算增加', '竞争窗口打开'],
      evidence_refs: ['market:F1'],
      density: 'standard',
      page_type: 'evidence',
      content_budget: '1 个主张 + 3 个证据卡'
    }));

    const result = runValidateOutline(dir);

    assert.strictEqual(result.status, 0, result.stderr);
    assert.match(result.stdout, /Outline validation passed/);
  });
});
