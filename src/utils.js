import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PKG_ROOT = join(__dirname, '..');
export const ASSETS_DIR = join(PKG_ROOT, 'assets');
export const TEMPLATES_DIR = join(PKG_ROOT, 'templates');

export function getPkgVersion() {
  const pkg = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf-8'));
  return pkg.version;
}

export function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function fileHash(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

export function log(msg) {
  console.log(`  ${msg}`);
}

export function logStep(msg) {
  console.log(`\n  \x1b[36m>\x1b[0m ${msg}`);
}

export function logSuccess(msg) {
  console.log(`\n  \x1b[32m✓\x1b[0m ${msg}`);
}

export function logWarn(msg) {
  console.log(`  \x1b[33m!\x1b[0m ${msg}`);
}

export function logError(msg) {
  console.error(`  \x1b[31m✗\x1b[0m ${msg}`);
}

export function checkNodeVersion() {
  const [major, minor] = process.versions.node.split('.').map(Number);
  if (major < 22 || (major === 22 && minor < 12)) {
    logError(`Node.js >=22.12.0 required (current: ${process.version})`);
    logError('Slidev dependencies (oxc-parser) require this version. Please upgrade Node.js.');
    process.exit(1);
  }
}
