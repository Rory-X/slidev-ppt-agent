import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { detectPlatforms } from '../src/lib/detect-platform.js';
import { mkdtempSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('detectPlatforms', () => {
  it('always includes agents and claude', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    const platforms = detectPlatforms(dir);
    assert.ok(platforms.includes('agents'));
    assert.ok(platforms.includes('claude'));
  });

  it('detects cursor when .cursor directory exists', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    mkdirSync(join(dir, '.cursor'));
    const platforms = detectPlatforms(dir);
    assert.ok(platforms.includes('cursor'));
  });

  it('does not include cursor without .cursor directory', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    const platforms = detectPlatforms(dir);
    assert.ok(!platforms.includes('cursor'));
  });
});
