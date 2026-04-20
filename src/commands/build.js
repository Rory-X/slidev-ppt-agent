import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { logStep, logSuccess, logError, checkNodeVersion } from '../utils.js';

export async function build(slidesFile, options) {
  checkNodeVersion();
  const cwd = process.cwd();

  if (!slidesFile) {
    slidesFile = findSlidesFile(cwd);
    if (!slidesFile) {
      logError('No slides file found. Pass a file: slidev-ppt-agent build slides.md');
      process.exit(1);
    }
  }

  if (!existsSync(resolve(cwd, slidesFile))) {
    logError(`File not found: ${slidesFile}`);
    process.exit(1);
  }

  const outDir = options.out || 'dist';
  logStep(`Building ${slidesFile} → ${outDir}/`);

  try {
    execSync(`npx slidev build "${slidesFile}" --out "${outDir}"`, {
      cwd,
      stdio: 'inherit',
    });
    logSuccess(`Build complete: ${outDir}/`);
  } catch {
    logError('Build failed. Check the output above for details.');
    process.exit(1);
  }
}

function findSlidesFile(cwd) {
  const files = readdirSync(cwd).filter(
    (f) => f.startsWith('slides-') && f.endsWith('.md')
  );
  return files[0] || null;
}
