import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { input } from '@inquirer/prompts';
import { copyAssets, renderTemplates, ensureProjectDirs, computeFileHashes } from '../lib/scaffold.js';
import { promptPlatformSelection, parsePlatformsFlag, registerCommands, PLATFORM_REGISTRY } from '../lib/command-registrar.js';
import { slugify, getPkgVersion, logStep, logSuccess, logError, log } from '../utils.js';

export async function create(projectName, options) {
  if (!projectName) {
    projectName = await input({
      message: 'Project name:',
      default: 'my-slides',
      validate: (v) => v.trim().length > 0 || 'Project name is required',
    });
  }

  const slug = slugify(projectName);
  const targetDir = resolve(process.cwd(), slug);

  if (existsSync(targetDir)) {
    logError(`Directory "${slug}" already exists. Choose a different name or remove it first.`);
    process.exit(1);
  }

  // Platform selection: --platforms flag or interactive prompt
  let platforms = parsePlatformsFlag(options.platforms);
  if (!platforms) {
    platforms = await promptPlatformSelection();
  }

  logStep(`Creating project: ${slug}`);

  ensureProjectDirs(targetDir);
  copyAssets(targetDir);

  // Register native slash commands for selected platforms
  registerCommands(targetDir, platforms);

  const version = getPkgVersion();
  const createdAt = new Date().toISOString();
  const fileHashes = computeFileHashes(targetDir);

  const templateData = {
    projectName: slug,
    version,
    createdAt,
    platforms,
    fileHashes,
  };

  renderTemplates(targetDir, templateData, platforms);

  if (options.git !== false) {
    logStep('Initializing git repository');
    try {
      execSync('git init', { cwd: targetDir, stdio: 'pipe' });
    } catch {
      // non-fatal
    }
  }

  if (options.install !== false) {
    logStep('Installing dependencies (this may take a minute)');
    try {
      execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
    } catch {
      logError('npm install failed. Run it manually inside the project.');
    }
  }

  const registeredNames = platforms
    .filter((k) => PLATFORM_REGISTRY[k])
    .map((k) => PLATFORM_REGISTRY[k].name)
    .join(', ');

  logSuccess(`Project "${slug}" created!`);
  console.log(`
  Registered platforms: ${registeredNames || 'none (AGENTS.md fallback)'}

  Next steps:
    cd ${slug}
    # Open in your AI editor (Cursor, Claude Code, etc.)
    # Then say: /ppt-creator <your topic>
`);
}
