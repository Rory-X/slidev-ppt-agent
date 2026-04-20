#!/usr/bin/env node

import { program } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

program
  .name('slidev-ppt-agent')
  .description('Give any AI agent the ability to create high-quality Slidev presentations')
  .version(pkg.version);

program
  .command('create [project-name]')
  .description('Create a new PPT project with full agent capabilities')
  .option('--no-install', 'Skip npm install')
  .option('--no-git', 'Skip git init')
  .option('--platforms <list>', 'Comma-separated platform keys: claude,cursor,codex,opencode,codebuddy')
  .action(async (projectName, options) => {
    const { create } = await import('../src/commands/create.js');
    await create(projectName, options);
  });

program
  .command('init')
  .description('Inject PPT agent capabilities into the current project')
  .option('--force', 'Overwrite existing files without prompting')
  .option('--platforms <list>', 'Comma-separated platform keys: claude,cursor,codex,opencode,codebuddy')
  .action(async (options) => {
    const { init } = await import('../src/commands/init.js');
    await init(options);
  });

program
  .command('update')
  .description('Update skills and design system to the latest version')
  .option('--force', 'Overwrite modified files without prompting')
  .option('--dry-run', 'Show what would be updated without making changes')
  .action(async (options) => {
    const { update } = await import('../src/commands/update.js');
    await update(options);
  });

program
  .command('build [slides-file]')
  .description('Build slides into a static site')
  .option('--out <dir>', 'Output directory', 'dist')
  .action(async (slidesFile, options) => {
    const { build } = await import('../src/commands/build.js');
    await build(slidesFile, options);
  });

program
  .command('preview [slides-file]')
  .description('Preview slides locally (dev mode with .md file, static mode without)')
  .option('--port <port>', 'Port number', '3030')
  .action(async (slidesFile, options) => {
    const { preview } = await import('../src/commands/preview.js');
    await preview(slidesFile, options);
  });

program
  .command('export [slides-file]')
  .description('Export slides to PPTX, PDF, or PNG')
  .option('--format <format>', 'Export format: pptx, pdf, or png', 'pptx')
  .option('--output <file>', 'Output filename')
  .option('--with-clicks [bool]', 'Include click steps as separate pages (default: true for pptx)')
  .option('--dark', 'Export in dark mode')
  .option('--range <range>', 'Slide range (e.g., 1,4-7,10)')
  .option('--timeout <ms>', 'Timeout per slide in ms')
  .action(async (slidesFile, options) => {
    const { exportSlides } = await import('../src/commands/export.js');
    await exportSlides(slidesFile, options);
  });

program
  .command('publish')
  .description('Build and publish slides to Vercel or GitHub Pages')
  .option('--target <target>', 'Publish target: vercel or gh-pages')
  .option('--skip-build', 'Skip build step (use existing dist)')
  .action(async (options) => {
    const { publish } = await import('../src/commands/publish.js');
    await publish(options);
  });

program.parse();
