import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { renderTemplate, computeFileHashes, copyAssets, ensureProjectDirs } from '../src/lib/scaffold.js';
import { mkdtempSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('renderTemplate', () => {
  it('renders AGENTS.md.ejs with data', () => {
    const result = renderTemplate('AGENTS.md.ejs', {
      projectName: 'test-project',
      version: '0.1.0',
      createdAt: '2025-01-01T00:00:00.000Z',
      platforms: ['agents', 'cursor', 'claude'],
      fileHashes: {},
    });
    assert.ok(result.includes('Agent Behavior Contract'));
    assert.ok(result.includes('Phase Dependency Graph'));
    assert.ok(result.includes('Subagent Prompt Template'));
  });
});

describe('ensureProjectDirs', () => {
  it('creates artifacts, public, dist directories', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    ensureProjectDirs(dir);
    assert.ok(existsSync(join(dir, 'artifacts')));
    assert.ok(existsSync(join(dir, 'public')));
    assert.ok(existsSync(join(dir, 'dist')));
  });
});

describe('copyAssets', () => {
  it('copies skills, agents, design-system, schemas, scripts to target', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    copyAssets(dir);
    assert.ok(existsSync(join(dir, '.agents', 'skills')));
    assert.ok(existsSync(join(dir, '.agents', 'agents')));
    assert.ok(existsSync(join(dir, 'design-system')));
    assert.ok(existsSync(join(dir, 'schemas')));
    assert.ok(existsSync(join(dir, 'scripts')));
  });
});

describe('computeFileHashes', () => {
  it('returns a hash map of files', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    const skillsDir = join(dir, '.agents', 'skills');
    mkdirSync(skillsDir, { recursive: true });
    writeFileSync(join(skillsDir, 'test.md'), '# Test', 'utf-8');
    const hashes = computeFileHashes(dir);
    const keys = Object.keys(hashes);
    assert.ok(keys.length > 0);
    assert.match(Object.values(hashes)[0], /^[a-f0-9]{16}$/);
  });
});
