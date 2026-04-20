import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, getPkgVersion, fileHash, checkNodeVersion } from '../src/utils.js';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

describe('slugify', () => {
  it('lowercases and replaces spaces with dashes', () => {
    assert.strictEqual(slugify('My Cool Project'), 'my-cool-project');
  });

  it('strips special characters', () => {
    assert.strictEqual(slugify('Hello! @World#'), 'hello-world');
  });

  it('trims leading/trailing dashes', () => {
    assert.strictEqual(slugify('---test---'), 'test');
  });

  it('handles empty input', () => {
    assert.strictEqual(slugify(''), '');
  });
});

describe('getPkgVersion', () => {
  it('returns a semver string', () => {
    const version = getPkgVersion();
    assert.match(version, /^\d+\.\d+\.\d+/);
  });
});

describe('fileHash', () => {
  it('returns a 16-char hex hash', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppt-test-'));
    const file = join(dir, 'test.txt');
    writeFileSync(file, 'hello world', 'utf-8');
    const hash = fileHash(file);
    assert.match(hash, /^[a-f0-9]{16}$/);
  });
});
