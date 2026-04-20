import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { runPublishWizard } from '../lib/publish-wizard.js';
import { logStep, logSuccess, logError, checkNodeVersion } from '../utils.js';

export async function publish(options) {
  checkNodeVersion();
  const cwd = process.cwd();

  let config = {};
  const configPath = join(cwd, '.ppt-agent.json');
  if (existsSync(configPath)) {
    config = JSON.parse(readFileSync(configPath, 'utf-8'));
  }

  if (options.target) {
    config.publish = config.publish || {};
    config.publish.defaultTarget = options.target;
  }

  if (!options.skipBuild) {
    const distDir = resolve(cwd, config.build?.outDir || 'dist');
    if (!existsSync(distDir)) {
      logStep('Building slides before publish');
      try {
        const slidesFile = findSlidesFile(cwd);
        if (!slidesFile) {
          logError('No slides file found. Create slides first.');
          process.exit(1);
        }
        const outDir = config.build?.outDir || 'dist';
        execSync(`npx slidev build "${slidesFile}" --out "${outDir}"`, {
          cwd,
          stdio: 'inherit',
        });
      } catch {
        logError('Build failed. Fix errors and retry.');
        process.exit(1);
      }
    }
  }

  const result = await runPublishWizard(cwd, config);

  if (result) {
    logSuccess(`Published to ${result.target}: ${result.siteUrl}`);
  }
}

function findSlidesFile(cwd) {
  const files = readdirSync(cwd).filter(
    (f) => f.startsWith('slides-') && f.endsWith('.md')
  );
  return files[0] || null;
}
