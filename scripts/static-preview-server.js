const http = require("http");
const fs = require("fs");
const path = require("path");
const { parseArgs } = require("./harness-utils");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8"
};

function safeResolve(rootDir, reqPath) {
  const clean = reqPath.split("?")[0].split("#")[0];
  const decoded = decodeURIComponent(clean);
  const normalized = decoded === "/" ? "/index.html" : decoded;
  const full = path.resolve(path.join(rootDir, `.${normalized}`));
  if (!full.startsWith(rootDir)) return null;
  return full;
}

function createServer(rootDir) {
  return http.createServer((req, res) => {
    const target = safeResolve(rootDir, req.url || "/");
    if (!target) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Forbidden");
      return;
    }

    let filePath = target;
    if (!fs.existsSync(filePath)) {
      const spaFallback = path.join(rootDir, "index.html");
      if (fs.existsSync(spaFallback)) filePath = spaFallback;
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

function listenWithRetry(server, host, startPort, maxAttempts) {
  return new Promise((resolve, reject) => {
    let port = startPort;
    let attempts = 0;
    const tryListen = () => {
      attempts += 1;
      server.once("error", (err) => {
        if (err && err.code === "EADDRINUSE" && attempts < maxAttempts) {
          port += 1;
          setImmediate(tryListen);
          return;
        }
        reject(err);
      });
      server.listen(port, host, () => resolve(port));
    };
    tryListen();
  });
}

async function run() {
  const args = parseArgs(process.argv);
  const dir = path.resolve(args.dir || "dist");
  const host = args.host || "127.0.0.1";
  const startPort = Number(args.port || 3045);
  const statusFile = args.statusFile ? path.resolve(args.statusFile) : null;
  const maxAttempts = Number(args.maxAttempts || 30);

  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
    return;
  }

  const server = createServer(dir);
  try {
    const port = await listenWithRetry(server, host, startPort, maxAttempts);
    const url = `http://${host === "0.0.0.0" ? "localhost" : host}:${port}/`;
    const payload = {
      pid: process.pid,
      host,
      port,
      url,
      dir,
      startedAt: new Date().toISOString()
    };
    if (statusFile) {
      fs.mkdirSync(path.dirname(statusFile), { recursive: true });
      fs.writeFileSync(statusFile, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");
    }
    console.log(`PREVIEW_URL=${url}`);
  } catch (err) {
    console.error(`Failed to start preview server: ${err.message}`);
    process.exit(1);
  }
}

run();
