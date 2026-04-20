import { existsSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { execSync, spawnSync } from 'node:child_process';
import { logStep, logSuccess, logError, logWarn, log } from '../utils.js';

export async function exportSlides(slidesFile, options) {
  const cwd = process.cwd();
  const format = options.format || 'pptx';

  if (!slidesFile) {
    const candidates = readdirSync(cwd).filter((f) => f.startsWith('slides') && f.endsWith('.md'));
    if (candidates.length === 0) {
      logError('No slides file found. Specify one: slidev-ppt-agent export slides-topic.md');
      process.exit(1);
    }
    slidesFile = candidates[0];
    log(`  Using: ${slidesFile}`);
  }

  const fullPath = resolve(cwd, slidesFile);
  if (!existsSync(fullPath)) {
    logError(`File not found: ${slidesFile}`);
    process.exit(1);
  }

  // Ensure playwright-chromium is installed
  logStep('Checking playwright-chromium...');
  try {
    execSync('node -e "require(\'playwright-chromium\')"', { cwd, stdio: 'pipe' });
  } catch {
    logWarn('playwright-chromium not found. Installing...');
    try {
      execSync('npm install -D playwright-chromium', { cwd, stdio: 'inherit' });
    } catch {
      logError('Failed to install playwright-chromium. Install manually: npm install -D playwright-chromium');
      process.exit(1);
    }
  }

  const outputName = options.output || `${basename(slidesFile, '.md')}.${format === 'png' ? 'zip' : format}`;
  const args = ['slidev', 'export', slidesFile, '--format', format, '--output', outputName];

  if (options.withClicks === false || options.withClicks === 'false') {
    args.push('--with-clicks', 'false');
  }
  if (options.dark) {
    args.push('--dark');
  }
  if (options.range) {
    args.push('--range', options.range);
  }
  if (options.timeout) {
    args.push('--timeout', options.timeout);
  }

  logStep(`Exporting ${slidesFile} as ${format.toUpperCase()}...`);

  const result = spawnSync('npx', args, { cwd, stdio: 'inherit', shell: true });

  if (result.status !== 0) {
    logError(`Export failed with exit code ${result.status}`);
    log('  Try: npx slidev export --timeout 60000 --wait 2000');
    process.exit(1);
  }

  logSuccess(`Exported: ${outputName}`);

  if (format === 'pptx') {
    console.log();
    log('  Note: slides are exported as images (text not editable in PowerPoint)');
    log('  Presenter notes are preserved in the PPTX file');
    if (options.withClicks !== false && options.withClicks !== 'false') {
      log('  Each v-click step is a separate page (disable with --with-clicks false)');
    }
  }
  console.log();
}
