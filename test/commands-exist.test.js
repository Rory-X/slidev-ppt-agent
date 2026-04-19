import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('command modules', () => {
  const commands = ['create', 'init', 'update', 'build', 'preview', 'publish'];

  for (const cmd of commands) {
    it(`src/commands/${cmd}.js exports a named function`, async () => {
      const mod = await import(`../src/commands/${cmd}.js`);
      assert.strictEqual(typeof mod[cmd], 'function', `Expected named export "${cmd}" to be a function`);
    });
  }
});
