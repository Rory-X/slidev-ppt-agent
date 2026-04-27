#!/usr/bin/env node

/**
 * Syncs live directories to assets/ for npm distribution.
 * Usage:
 *   node scripts/sync-assets.js          # sync (copy live -> assets)
 *   node scripts/sync-assets.js --check  # check only, exit 1 if divergent
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const ROOT = path.resolve(__dirname, '..');

const MAPPINGS = [
  { src: '.agents/skills', dest: 'assets/skills' },
  { src: '.agents/agents', dest: 'assets/agents' },
  { src: 'design-system', dest: 'assets/design-system' },
  { src: 'schemas', dest: 'assets/schemas' },
];

const SCRIPT_FILES = [
  'package.json',
  'harness-utils.js',
  'validate-outline.js',
  'validate-slides-density.js',
  'validate-style.js',
  'static-preview-server.js',
];

const checkMode = process.argv.includes('--check');

function hashFile(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

function walkFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      results.push(...walkFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function syncDirectory(srcRel, destRel) {
  const srcDir = path.join(ROOT, srcRel);
  const destDir = path.join(ROOT, destRel);
  const diffs = [];

  if (!fs.existsSync(srcDir)) {
    console.log(`  SKIP ${srcRel} (not found)`);
    return diffs;
  }

  const srcFiles = walkFiles(srcDir).map(f => path.relative(srcDir, f));
  const destFiles = fs.existsSync(destDir)
    ? walkFiles(destDir).map(f => path.relative(destDir, f))
    : [];

  // Check for files in src but not in dest, or different content
  for (const rel of srcFiles) {
    const srcPath = path.join(srcDir, rel);
    const destPath = path.join(destDir, rel);
    if (!fs.existsSync(destPath)) {
      diffs.push({ type: 'added', file: path.join(destRel, rel) });
    } else if (hashFile(srcPath) !== hashFile(destPath)) {
      diffs.push({ type: 'changed', file: path.join(destRel, rel) });
    }
  }

  // Check for files in dest but not in src (stale)
  for (const rel of destFiles) {
    if (!srcFiles.includes(rel)) {
      diffs.push({ type: 'removed', file: path.join(destRel, rel) });
    }
  }

  if (!checkMode && diffs.length > 0) {
    fs.rmSync(destDir, { recursive: true, force: true });
    fs.cpSync(srcDir, destDir, { recursive: true });
  }

  return diffs;
}

function syncScripts() {
  const srcDir = path.join(ROOT, 'scripts');
  const destDir = path.join(ROOT, 'assets', 'scripts');
  const diffs = [];

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const file of SCRIPT_FILES) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    if (!fs.existsSync(srcPath)) {
      // Source doesn't exist in scripts/, check if it's already in assets/scripts/
      if (fs.existsSync(destPath)) continue;
      console.log(`  WARN scripts/${file} not found`);
      continue;
    }

    if (!fs.existsSync(destPath)) {
      diffs.push({ type: 'added', file: `assets/scripts/${file}` });
    } else if (hashFile(srcPath) !== hashFile(destPath)) {
      diffs.push({ type: 'changed', file: `assets/scripts/${file}` });
    }

    if (!checkMode) {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  return diffs;
}

// Run
let allDiffs = [];

for (const { src, dest } of MAPPINGS) {
  const diffs = syncDirectory(src, dest);
  allDiffs.push(...diffs);
}

allDiffs.push(...syncScripts());

if (allDiffs.length === 0) {
  console.log('  Assets are in sync.');
  process.exit(0);
} else {
  const verb = checkMode ? 'Out of sync' : 'Synced';
  console.log(`\n  ${verb}: ${allDiffs.length} file(s)\n`);
  for (const d of allDiffs) {
    const icon = d.type === 'added' ? '+' : d.type === 'removed' ? '-' : '~';
    console.log(`    ${icon} ${d.file}`);
  }
  console.log();
  if (checkMode) process.exit(1);
}
