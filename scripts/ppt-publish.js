const path = require("path");
const readline = require("readline");
const { spawnSync } = require("child_process");
const {
  parseArgs,
  writeJson,
  nowIso
} = require("./harness-utils");

function askTarget() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question("Select target [1] vercel [2] github-pages: ", (answer) => {
      rl.close();
      resolve(answer.trim() === "2" ? "github-pages" : "vercel");
    });
  });
}

function runShell(cmd, args, options = {}) {
  return spawnSync(cmd, args, { encoding: "utf-8", ...options });
}

function parseRepoFromRemote(remoteUrl) {
  const sshMatch = remoteUrl.match(/github\.com:([^/]+)\/(.+?)(\.git)?$/);
  if (sshMatch) return { owner: sshMatch[1], repo: sshMatch[2] };
  const httpsMatch = remoteUrl.match(/github\.com\/([^/]+)\/(.+?)(\.git)?$/);
  if (httpsMatch) return { owner: httpsMatch[1], repo: httpsMatch[2] };
  return null;
}

function publishVercel(distPath, scope, prod) {
  const args = ["deploy", distPath, "-y", "--no-wait"];
  if (scope) args.push("--scope", scope);
  if (prod) args.push("--prod");
  const result = runShell("vercel", args);
  const output = `${result.stdout || ""}\n${result.stderr || ""}`;
  const urlMatch = output.match(/https:\/\/[a-zA-Z0-9-]+\.vercel\.app/);
  return {
    ok: result.status === 0,
    siteUrl: urlMatch ? urlMatch[0] : null,
    rawOutput: output
  };
}

function publishGithubPages(distPath) {
  const remote = runShell("git", ["remote", "get-url", "origin"]);
  if (remote.status !== 0) {
    return { ok: false, error: "git remote origin not found." };
  }
  const remoteUrl = (remote.stdout || "").trim();
  const parsed = parseRepoFromRemote(remoteUrl);
  const push = runShell("git", ["subtree", "push", "--prefix", distPath, "origin", "gh-pages"]);
  if (push.status !== 0) {
    return { ok: false, error: (push.stderr || push.stdout || "").trim() };
  }
  const siteUrl = parsed ? `https://${parsed.owner}.github.io/${parsed.repo}/` : null;
  return {
    ok: true,
    siteUrl,
    rawOutput: `${push.stdout || ""}\n${push.stderr || ""}`.trim()
  };
}

async function run() {
  const args = parseArgs(process.argv);
  const distPath = args.distPath || "dist";
  const outPath = path.resolve(args.out || "publish-report.json");
  let target = args.target;
  if (!target) {
    if (!process.stdin.isTTY) {
      if (args.defaultTarget) {
        target = args.defaultTarget;
      } else {
        console.error("Missing --target for non-interactive mode.");
        process.exitCode = 1;
        return;
      }
    } else {
      target = await askTarget();
    }
  }

  let publishResult;
  if (target === "vercel") {
    publishResult = publishVercel(distPath, args.scope, args.prod === "true");
  } else if (target === "github-pages") {
    publishResult = publishGithubPages(distPath);
  } else {
    console.error(`Unsupported target: ${target}`);
    process.exitCode = 1;
    return;
  }

  const report = {
    target,
    distPath,
    generatedAt: nowIso(),
    success: Boolean(publishResult.ok),
    siteUrl: publishResult.siteUrl || null,
    deploymentId: publishResult.siteUrl || null,
    details: publishResult.rawOutput || publishResult.error || ""
  };
  writeJson(outPath, report);

  if (!report.success) {
    console.error(`Publish failed. See ${outPath}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Published to ${target}. URL: ${report.siteUrl || "(check report)"}`);
}

run();
