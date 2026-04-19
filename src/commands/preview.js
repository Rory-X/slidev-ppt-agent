import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { logStep, logSuccess, logError, checkNodeVersion } from '../utils.js';

export async function preview(slidesFile, options) {
  checkNodeVersion();
  const cwd = process.cwd();
  const port = options.port || '3030';

  if (slidesFile && existsSync(resolve(cwd, slidesFile))) {
    logStep(`Starting dev server for ${slidesFile} on port ${port}`);
    try {
      execSync(`npx slidev --port ${port} "${slidesFile}"`, {
        cwd,
        stdio: 'inherit',
      });
    } catch {
      // User likely Ctrl+C'd
    }
    return;
  }

  if (!slidesFile) {
    const mdFile = findSlidesFile(cwd);
    if (mdFile) {
      logStep(`Starting dev server for ${mdFile} on port ${port}`);
      try {
        execSync(`npx slidev --port ${port} "${mdFile}"`, {
          cwd,
          stdio: 'inherit',
        });
      } catch {
        // User likely Ctrl+C'd
      }
      return;
    }
  }

  const distDir = resolve(cwd, 'dist');
  if (existsSync(distDir)) {
    logStep(`Starting static preview server on port ${port}`);
    const serverScript = join(cwd, 'scripts', 'static-preview-server.js');
    if (existsSync(serverScript)) {
      try {
        execSync(`node "${serverScript}" --dir=dist --port=${port}`, {
          cwd,
          stdio: 'inherit',
        });
      } catch {
        // User likely Ctrl+C'd
      }
    } else {
      logError('scripts/static-preview-server.js not found. Run "slidev-ppt-agent init" to restore it.');
      process.exit(1);
    }
    return;
  }

  logError('No slides file or dist/ directory found. Create slides first or run build.');
  process.exit(1);
}

function findSlidesFile(cwd) {
  const files = readdirSync(cwd).filter(
    (f) => f.startsWith('slides-') && f.endsWith('.md')
  );
  return files[0] || null;
}
