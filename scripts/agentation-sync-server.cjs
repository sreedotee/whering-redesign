const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4747;
const outputDir = path.join(__dirname, '..', '.agentation');
const outputFile = path.join(outputDir, 'latest-annotations.json');

fs.mkdirSync(outputDir, { recursive: true });

const sendJson = (res, statusCode, body) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(body));
};

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === 'GET' && req.url === '/annotations') {
    if (!fs.existsSync(outputFile)) {
      sendJson(res, 200, { annotations: [] });
      return;
    }

    const contents = fs.readFileSync(outputFile, 'utf8');
    sendJson(res, 200, JSON.parse(contents));
    return;
  }

  if (req.method === 'POST' && req.url === '/annotations') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2));
        sendJson(res, 200, { ok: true, count: payload.annotations?.length ?? 0 });
      } catch (error) {
        sendJson(res, 400, { ok: false, error: error.message });
      }
    });

    return;
  }

  sendJson(res, 404, { ok: false, error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`Agentation sync server listening on http://localhost:${PORT}`);
});
