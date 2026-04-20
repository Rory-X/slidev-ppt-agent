import { execSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { select, confirm, input } from '@inquirer/prompts';
import { logStep, logSuccess, logError, logWarn, log } from '../utils.js';

export async function runPublishWizard(cwd, config) {
  let target = config.publish?.defaultTarget;

  if (!target) {
    target = await select({
      message: 'Where do you want to publish?',
      choices: [
        { name: 'Vercel (recommended: global CDN, auto HTTPS)', value: 'vercel' },
        { name: 'GitHub Pages (free, requires GitHub repo)', value: 'gh-pages' },
      ],
    });
  }

  if (target === 'vercel') {
    return await publishVercel(cwd, config);
  } else {
    return await publishGithubPages(cwd, config);
  }
}

async function publishVercel(cwd, config) {
  // Check vercel CLI
  const hasVercel = commandExists('vercel');
  if (!hasVercel) {
    logWarn('Vercel CLI not found.');
    const installIt = await confirm({ message: 'Install vercel CLI globally?', default: true });
    if (installIt) {
      logStep('Installing vercel CLI...');
      try {
        execSync('npm install -g vercel', { stdio: 'inherit' });
      } catch {
        logError('Failed to install vercel. Install manually: npm install -g vercel');
        return null;
      }
    } else {
      logError('Vercel CLI required for deployment. Aborting.');
      return null;
    }
  }

  // Check auth
  const isLoggedIn = checkVercelAuth();
  if (!isLoggedIn) {
    logWarn('Not logged in to Vercel.');
    const loginNow = await confirm({ message: 'Login to Vercel now?', default: true });
    if (loginNow) {
      logStep('Opening Vercel login...');
      try {
        execSync('vercel login', { stdio: 'inherit' });
      } catch {
        logError('Vercel login failed.');
        return null;
      }
    } else {
      return null;
    }
  }

  // Scope
  let scope = config.publish?.vercel?.scope;
  if (!scope) {
    scope = await input({
      message: 'Vercel team scope (leave empty for personal):',
      default: '',
    });
    scope = scope.trim() || null;
  }

  // Deploy
  const distDir = resolve(cwd, config.build?.outDir || 'dist');
  const scopeFlag = scope ? `--scope ${scope}` : '';
  const prodFlag = config.publish?.vercel?.prod !== false ? '--prod' : '';

  logStep('Deploying to Vercel...');

  try {
    const result = spawnSync(
      'vercel',
      ['deploy', distDir, '-y', ...scopeFlag.split(' ').filter(Boolean), ...prodFlag.split(' ').filter(Boolean)],
      { cwd, encoding: 'utf-8', timeout: 120_000 }
    );

    const output = (result.stdout || '') + (result.stderr || '');
    const urlMatch = output.match(/https:\/\/[\w-]+\.vercel\.app\S*/);
    const siteUrl = urlMatch ? urlMatch[0] : null;

    if (result.status !== 0 && !siteUrl) {
      logError('Vercel deploy failed:');
      console.log(output);
      return null;
    }

    // Save config
    updateConfig(cwd, {
      'publish.defaultTarget': 'vercel',
      'publish.vercel.scope': scope,
      'publish.vercel.projectLinked': true,
    });

    return { target: 'vercel', siteUrl, output };
  } catch (err) {
    logError(`Vercel deploy error: ${err.message}`);
    return null;
  }
}

async function publishGithubPages(cwd, config) {
  // Check git remote
  let remoteUrl;
  try {
    remoteUrl = execSync('git remote get-url origin', { cwd, encoding: 'utf-8' }).trim();
  } catch {
    logError('No git remote "origin" found. Push to GitHub first.');
    return null;
  }

  log(`  Detected remote: ${remoteUrl}`);

  const { owner, repo } = parseGitHubUrl(remoteUrl);
  if (!owner || !repo) {
    logError('Could not parse GitHub owner/repo from remote URL.');
    return null;
  }

  const method = config.publish?.githubPages?.method || 'actions';

  if (method === 'actions') {
    return await publishViaActions(cwd, config, owner, repo);
  } else {
    return await publishViaSubtree(cwd, config, owner, repo);
  }
}

async function publishViaActions(cwd, config, owner, repo) {
  const workflowDir = resolve(cwd, '.github', 'workflows');
  const workflowPath = join(workflowDir, 'publish-gh-pages.yml');

  if (!existsSync(workflowPath)) {
    logStep('Creating GitHub Actions workflow for GitHub Pages...');
    const fseModule = await import('fs-extra');
    const { ensureDirSync } = fseModule.default;
    ensureDirSync(workflowDir);
    writeFileSync(workflowPath, GITHUB_PAGES_WORKFLOW, 'utf-8');

    logStep('Committing workflow file...');
    try {
      execSync('git add .github/workflows/publish-gh-pages.yml', { cwd, stdio: 'pipe' });
      execSync('git commit -m "ci: add GitHub Pages deployment workflow"', { cwd, stdio: 'pipe' });
    } catch {
      logWarn('Could not auto-commit workflow file. Commit it manually.');
    }
  }

  logStep('Pushing to trigger deployment...');
  try {
    execSync('git push', { cwd, stdio: 'inherit' });
  } catch {
    logError('git push failed. Push manually to trigger deployment.');
    return null;
  }

  const siteUrl = `https://${owner}.github.io/${repo}/`;

  updateConfig(cwd, {
    'publish.defaultTarget': 'gh-pages',
    'publish.githubPages.method': 'actions',
  });

  return { target: 'gh-pages', siteUrl, output: 'Deployed via GitHub Actions' };
}

async function publishViaSubtree(cwd, config, owner, repo) {
  const distDir = config.build?.outDir || 'dist';

  logStep(`Publishing via git subtree push (${distDir} -> gh-pages)...`);

  try {
    execSync(`git add ${distDir} -f`, { cwd, stdio: 'pipe' });
    execSync(`git commit -m "build: update dist for gh-pages" --allow-empty`, { cwd, stdio: 'pipe' });
    execSync(`git subtree push --prefix ${distDir} origin gh-pages`, { cwd, stdio: 'inherit' });
  } catch (err) {
    logError('git subtree push failed.');
    return null;
  }

  const siteUrl = `https://${owner}.github.io/${repo}/`;

  updateConfig(cwd, {
    'publish.defaultTarget': 'gh-pages',
    'publish.githubPages.method': 'subtree',
  });

  return { target: 'gh-pages', siteUrl, output: 'Deployed via git subtree' };
}

function commandExists(cmd) {
  try {
    execSync(
      process.platform === 'win32' ? `where ${cmd}` : `which ${cmd}`,
      { stdio: 'pipe' }
    );
    return true;
  } catch {
    return false;
  }
}

function checkVercelAuth() {
  try {
    const result = spawnSync('vercel', ['whoami'], { encoding: 'utf-8', timeout: 10_000 });
    return result.status === 0;
  } catch {
    return false;
  }
}

function parseGitHubUrl(url) {
  const sshMatch = url.match(/git@github\.com:(.+?)\/(.+?)(?:\.git)?$/);
  if (sshMatch) return { owner: sshMatch[1], repo: sshMatch[2] };

  const httpsMatch = url.match(/github\.com\/(.+?)\/(.+?)(?:\.git)?$/);
  if (httpsMatch) return { owner: httpsMatch[1], repo: httpsMatch[2] };

  return { owner: null, repo: null };
}

function updateConfig(cwd, updates) {
  const configPath = resolve(cwd, '.ppt-agent.json');
  try {
    const config = JSON.parse(readFileSync(configPath, 'utf-8'));
    for (const [path, value] of Object.entries(updates)) {
      setNestedValue(config, path, value);
    }
    config.updatedAt = new Date().toISOString();
    writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
  } catch {
    // Config file may not exist yet -- non-fatal
  }
}

function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

const GITHUB_PAGES_WORKFLOW = `name: Publish Slides to GitHub Pages

on:
  workflow_dispatch:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      - name: Install
        run: npm ci
      - name: Build
        run: npx slidev-ppt-agent build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;
