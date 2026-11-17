const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

http.createServer((req, res) => {
  const requestPath = req.url === '/' ? '/index.html' : req.url;
  const target = path.resolve(publicDir, '.' + requestPath);
  if (!target.startsWith(publicDir)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(target, (error, data) => {
    if (error) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(3000, () => console.log('http://localhost:3000'));

