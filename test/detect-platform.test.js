import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { detectPlatforms } from '../src/lib/detect-platform.js';
import { mkdtempSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('detectPlatforms', () => {
  it('默认包含 Claude Code 和 Cursor', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    const platforms = detectPlatforms(dir);
    assert.ok(platforms.includes('claude'));
    assert.ok(platforms.includes('cursor'));
  });

  it('存在平台目录时检测非默认平台', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    mkdirSync(join(dir, '.codex', 'commands'), { recursive: true });
    const platforms = detectPlatforms(dir);
    assert.ok(platforms.includes('codex'));
  });

  it('不存在平台目录时不包含非默认平台', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    const platforms = detectPlatforms(dir);
    assert.ok(!platforms.includes('codex'));
  });
});
