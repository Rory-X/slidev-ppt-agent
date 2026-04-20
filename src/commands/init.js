import { existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { confirm } from '@inquirer/prompts';
import { copyAssets, renderTemplates, computeFileHashes } from '../lib/scaffold.js';
import { mergePackageJson } from '../lib/merge-package-json.js';
import { promptPlatformSelection, parsePlatformsFlag, registerCommands, PLATFORM_REGISTRY } from '../lib/command-registrar.js';
import { getPkgVersion, logStep, logSuccess, logWarn } from '../utils.js';

export async function init(options) {
  const cwd = process.cwd();

  const hasAgents = existsSync(join(cwd, '.agents'));
  const hasDesignSystem = existsSync(join(cwd, 'design-system'));

  if ((hasAgents || hasDesignSystem) && !options.force) {
    const proceed = await confirm({
      message: 'PPT agent files already exist. Overwrite?',
      default: false,
    });
    if (!proceed) {
      logWarn('Aborted.');
      return;
    }
  }

  // Platform selection: --platforms flag or interactive prompt
  let platforms = parsePlatformsFlag(options.platforms);
  if (!platforms) {
    platforms = await promptPlatformSelection();
  }

  logStep('Injecting PPT agent capabilities');

  copyAssets(cwd);

  // Register native slash commands for selected platforms
  registerCommands(cwd, platforms);

  const version = getPkgVersion();
  const createdAt = new Date().toISOString();
  const fileHashes = computeFileHashes(cwd);

  const templateData = {
    projectName: resolve(cwd).split(/[\\/]/).pop(),
    version,
    createdAt,
    platforms,
    fileHashes,
  };

  renderTemplates(cwd, templateData, platforms);

  const merged = mergePackageJson(cwd);
  if (!merged) {
    logWarn('No package.json found. Run "npm init" first, then re-run "slidev-ppt-agent init".');
  }

  const registeredNames = platforms
    .filter((k) => PLATFORM_REGISTRY[k])
    .map((k) => PLATFORM_REGISTRY[k].name)
    .join(', ');

  logSuccess('PPT agent capabilities injected!');
  console.log(`
  Registered platforms: ${registeredNames || 'none (AGENTS.md fallback)'}

  Added:
    .agents/skills/    — AI agent skills
    .agents/agents/    — Subagent role definitions
    design-system/     — Tokens, archetypes, templates, CSS
    schemas/           — Validation schemas
    scripts/           — Engineering scripts
    AGENTS.md          — Agent behavior contract
`);
}
