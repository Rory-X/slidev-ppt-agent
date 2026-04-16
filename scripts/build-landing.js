const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentations</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .container {
      max-width: 900px;
      width: 100%;
      padding: 2rem;
    }
    h1 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      text-align: center;
      color: rgba(255,255,255,0.5);
      margin-bottom: 3rem;
      font-size: 1.1rem;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
    }
    .card {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 2rem;
      text-decoration: none;
      color: #fff;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    .card:hover {
      transform: translateY(-4px);
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.25);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    .card .emoji {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .card h2 {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }
    .card p {
      color: rgba(255,255,255,0.6);
      font-size: 0.95rem;
      line-height: 1.5;
    }
    .card .meta {
      margin-top: 1rem;
      font-size: 0.8rem;
      color: rgba(255,255,255,0.35);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Presentations</h1>
    <p class="subtitle">Select a presentation to view</p>
    <div class="cards">
      <a class="card" href="/a2a/">
        <div class="emoji">\uD83E\uDD16</div>
        <h2>A2A \u534F\u8BAE</h2>
        <p>Google Agent-to-Agent \u534F\u8BAE\u6DF1\u5EA6\u89E3\u6790\uFF0C\u591A\u667A\u80FD\u4F53\u534F\u4F5C\u7684\u672A\u6765</p>
        <div class="meta">24 pages</div>
      </a>
      <a class="card" href="/agent-team/">
        <div class="emoji">\uD83D\uDC65</div>
        <h2>Claude Code Agent Team</h2>
        <p>Claude Code \u591A\u667A\u80FD\u4F53\u534F\u4F5C\u56E2\u961F\u5B9E\u8DF5</p>
        <div class="meta">27 pages</div>
      </a>
      <a class="card" href="/pitch/">
        <div class="emoji">\uD83D\uDE80</div>
        <h2>StarFlow AI Pitch</h2>
        <p>StarFlow AI \u4EA7\u54C1\u6F14\u793A\u4E0E\u8DEF\u6F14</p>
        <div class="meta">7 pages</div>
      </a>
    </div>
  </div>
</body>
</html>`;

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf-8');
console.log('Landing page created at dist/index.html');
