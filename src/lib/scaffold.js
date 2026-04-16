import fse from 'fs-extra';
import { join, relative } from 'node:path';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import ejs from 'ejs';

const { copySync, ensureDirSync } = fse;
import crypto from 'node:crypto';
import { ASSETS_DIR, TEMPLATES_DIR, getPkgVersion } from '../utils.js';
import { logStep, log } from '../utils.js';

export function copyAssets(targetDir) {
  const mapping = [
    { src: 'skills', dest: '.agents/skills' },
    { src: 'agents', dest: '.agents/agents' },
    { src: 'design-system', dest: 'design-system' },
    { src: 'schemas', dest: 'schemas' },
    { src: 'scripts', dest: 'scripts' },
  ];

  for (const { src, dest } of mapping) {
    const srcPath = join(ASSETS_DIR, src);
    const destPath = join(targetDir, dest);
    logStep(`Copying ${src} -> ${dest}`);
    copySync(srcPath, destPath, { overwrite: true });
  }
}

export function renderTemplate(templateName, data) {
  const templatePath = join(TEMPLATES_DIR, templateName);
  const template = readFileSync(templatePath, 'utf-8');
  return ejs.render(template, data, { filename: templatePath });
}

export function renderTemplates(targetDir, data, platforms) {
  const files = [
    { template: 'AGENTS.md.ejs', dest: 'AGENTS.md' },
    { template: 'CLAUDE.md.ejs', dest: 'CLAUDE.md' },
    { template: 'package.json.ejs', dest: 'package.json' },
    { template: 'gitignore.ejs', dest: '.gitignore' },
    { template: 'README.md.ejs', dest: 'README.md' },
    { template: 'ppt-agent-config.json.ejs', dest: '.ppt-agent.json' },
  ];

  if (platforms.includes('cursor')) {
    files.push({ template: 'ppt-commands.mdc.ejs', dest: '.cursor/rules/ppt-commands.mdc' });
  }

  for (const { template, dest } of files) {
    logStep(`Rendering ${dest}`);
    const content = renderTemplate(template, data);
    const destPath = join(targetDir, dest);
    ensureDirSync(join(destPath, '..'));
    writeFileSync(destPath, content, 'utf-8');
  }
}

export function computeFileHashes(targetDir) {
  const hashMap = {};
  const coreDirs = ['.agents/skills', '.agents/agents', 'design-system', 'schemas', 'scripts'];

  for (const dir of coreDirs) {
    const fullDir = join(targetDir, dir);
    if (!existsSync(fullDir)) continue;
    walkFiles(fullDir, (filePath) => {
      const rel = relative(targetDir, filePath);
      const content = readFileSync(filePath, 'utf-8');
      hashMap[rel] = crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
    });
  }

  return hashMap;
}

function walkFiles(dir, callback) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkFiles(full, callback);
    } else {
      callback(full);
    }
  }
}

export function ensureProjectDirs(targetDir) {
  const dirs = ['artifacts', 'public', 'dist'];
  for (const d of dirs) {
    ensureDirSync(join(targetDir, d));
  }
}
