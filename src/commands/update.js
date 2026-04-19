import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { confirm } from '@inquirer/prompts';
import { copyAssets, computeFileHashes } from '../lib/scaffold.js';
import { getPkgVersion, logStep, logSuccess, logWarn, log } from '../utils.js';

export async function update(options) {
  const cwd = process.cwd();
  const configPath = join(cwd, '.ppt-agent.json');

  if (!existsSync(configPath)) {
    logWarn('No .ppt-agent.json found. Run "slidev-ppt-agent init" first.');
    process.exit(1);
  }

  const config = JSON.parse(readFileSync(configPath, 'utf-8'));
  const storedHashes = config.fileHashes || {};
  const currentHashes = computeFileHashes(cwd);

  const modified = [];
  for (const [file, hash] of Object.entries(currentHashes)) {
    if (storedHashes[file] && storedHashes[file] !== hash) {
      modified.push(file);
    }
  }

  if (modified.length > 0) {
    logWarn(`${modified.length} file(s) have been modified since last install/update:`);
    for (const f of modified) {
      log(`  - ${f}`);
    }

    if (!options.force) {
      if (options.dryRun) {
        log('\n  Dry run — no files changed.');
        return;
      }
      const proceed = await confirm({
        message: 'Overwrite modified files with latest version?',
        default: false,
      });
      if (!proceed) {
        logWarn('Aborted. Use --force to skip this prompt.');
        return;
      }
    }
  }

  if (options.dryRun) {
    logStep('Dry run: would update all agent skills, design system, and scripts');
    return;
  }

  logStep('Updating assets to latest version');
  copyAssets(cwd);

  const newHashes = computeFileHashes(cwd);
  config.fileHashes = newHashes;
  config.version = getPkgVersion();
  config.updatedAt = new Date().toISOString();
  writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');

  logSuccess(`Updated to v${config.version}`);
}
