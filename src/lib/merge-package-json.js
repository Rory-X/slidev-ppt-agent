import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { logStep, logWarn } from '../utils.js';

const SLIDEV_DEPS = {
  '@slidev/cli': '^52.0.0',
  '@slidev/theme-default': '^0.25.0',
  '@slidev/theme-seriph': '^0.25.0',
  '@iconify-json/mdi': '^1.2.3',
};

const SLIDEV_SCRIPTS = {
  'ppt:validate:outline': 'node scripts/validate-outline.js',
  'ppt:validate:style': 'node scripts/validate-style.js',
};

export function mergePackageJson(targetDir) {
  const pkgPath = join(targetDir, 'package.json');

  if (!existsSync(pkgPath)) {
    return false;
  }

  logStep('Merging slidev dependencies into existing package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  pkg.dependencies = pkg.dependencies || {};
  let added = 0;
  for (const [dep, ver] of Object.entries(SLIDEV_DEPS)) {
    if (!pkg.dependencies[dep]) {
      pkg.dependencies[dep] = ver;
      added++;
    }
  }

  pkg.scripts = pkg.scripts || {};
  for (const [name, cmd] of Object.entries(SLIDEV_SCRIPTS)) {
    if (!pkg.scripts[name]) {
      pkg.scripts[name] = cmd;
    }
  }

  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
  if (added > 0) {
    logWarn(`Added ${added} slidev dependencies to package.json`);
  }

  return true;
}

export function getSlidevDeps() {
  return SLIDEV_DEPS;
}

export function getSlidevScripts() {
  return SLIDEV_SCRIPTS;
}
