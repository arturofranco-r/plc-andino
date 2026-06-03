const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const BASE = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css',
  '.js'  : 'application/javascript',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.svg' : 'image/svg+xml',
  '.ico' : 'image/x-icon',
  '.md'  : 'text/plain; charset=utf-8',
};

http.createServer((req, res) => {
  // Redirigir raíz a la presentación
  let url = req.url === '/' ? '/ColPLC_Presentacion.html' : req.url;
  // Quitar query strings
  url = url.split('?')[0];

  const filePath = path.join(BASE, url);
  const ext      = path.extname(filePath).toLowerCase();
  const mime     = MIME[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h2>404 — Archivo no encontrado</h2><p>' + filePath + '</p>');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log('  ║   ColPLC v1.0 — Servidor local activo        ║');
  console.log('  ╠══════════════════════════════════════════════╣');
  console.log('  ║   http://localhost:3000                      ║');
  console.log('  ╚══════════════════════════════════════════════╝');
  console.log('');
  console.log('  Presiona Ctrl+C para detener el servidor.');
  console.log('');
});
