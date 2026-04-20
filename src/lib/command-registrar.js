import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import fse from 'fs-extra';
import { checkbox } from '@inquirer/prompts';
import { ASSETS_DIR, logStep, log } from '../utils.js';

const { ensureDirSync } = fse;

export const PLATFORM_REGISTRY = {
  claude: {
    name: 'Claude Code',
    dir: '.claude/commands',
    format: 'md',
    defaultSelected: true,
  },
  cursor: {
    name: 'Cursor',
    dir: '.cursor/rules',
    format: 'mdc',
    defaultSelected: true,
  },
  codex: {
    name: 'Codex',
    dir: '.codex/commands',
    format: 'md',
    defaultSelected: false,
  },
  opencode: {
    name: 'opencode',
    dir: '.opencode/command',
    format: 'md',
    defaultSelected: false,
  },
  codebuddy: {
    name: 'codebuddy',
    dir: '.codebuddy/commands',
    format: 'md',
    defaultSelected: false,
  },
};

export const PLATFORM_KEYS = Object.keys(PLATFORM_REGISTRY);

export async function promptPlatformSelection() {
  const choices = PLATFORM_KEYS.map((key) => ({
    name: `${PLATFORM_REGISTRY[key].name}  (${PLATFORM_REGISTRY[key].dir}/)`,
    value: key,
    checked: PLATFORM_REGISTRY[key].defaultSelected,
  }));

  const selected = await checkbox({
    message: 'Select agent tools to register slash commands for:',
    choices,
  });

  if (selected.length === 0) {
    log('  No platforms selected. AGENTS.md will still work as universal fallback.');
  }

  return selected;
}

export function parsePlatformsFlag(flagValue) {
  if (!flagValue) return null;
  const keys = flagValue.split(',').map((s) => s.trim().toLowerCase());
  const valid = keys.filter((k) => PLATFORM_KEYS.includes(k));
  if (valid.length === 0) {
    log(`  Warning: no valid platform keys in "${flagValue}". Valid: ${PLATFORM_KEYS.join(', ')}`);
    return null;
  }
  return valid;
}

export function registerCommands(targetDir, selectedPlatforms) {
  const commandsDir = join(ASSETS_DIR, 'commands');
  if (!existsSync(commandsDir)) return;

  const commandFiles = readdirSync(commandsDir).filter((f) => f.endsWith('.md'));

  for (const platformKey of selectedPlatforms) {
    const config = PLATFORM_REGISTRY[platformKey];
    if (!config) continue;

    // Cursor is handled by renderTemplates() via .mdc, not here
    if (platformKey === 'cursor') continue;

    const destDir = join(targetDir, config.dir);
    ensureDirSync(destDir);

    for (const cmdFile of commandFiles) {
      const src = join(commandsDir, cmdFile);
      const content = readFileSync(src, 'utf-8');
      const destFile = join(destDir, cmdFile);
      writeFileSync(destFile, content, 'utf-8');
    }

    logStep(`Registered ${commandFiles.length} commands for ${config.name} (${config.dir}/)`);
  }
}
