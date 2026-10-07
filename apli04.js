const http = require('http');
const fs = require('fs');
const url = require('url');

const host = '127.0.0.1';
const port = 4000;
const TASA_CAMBIO = 0.85;

// Estilos CSS para la vista de respuesta
const estilosCSS = `
<style>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #e8f5e9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }
  .card {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 90%;
    border-top: 8px solid #2e7d32;
  }
  .icon { font-size: 50px; margin-bottom: 10px; }
  h1 { color: #2e7d32; margin-bottom: 25px; font-size: 24px; }
  .btn {
    display: block;
    width: 100%;
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    transition: 0.3s;
    box-sizing: border-box;
  }
  .btn:hover { background-color: #388e3c; }
  .resultado-box {
    color: #2e7d32;
    font-size: 36px;
    font-weight: bold;
    margin: 20px 0;
    background: #f1f8e9;
    padding: 15px;
    border-radius: 12px;
  }
  .monto-detalle { color: #666; font-size: 18px; }
</style>
`;

const server = http.createServer((req, res) => {
  const urlParseada = url.parse(req.url, true);
  const ruta = urlParseada.pathname;

  // RUTA PRINCIPAL: Carga index.html
  if (ruta === '/' || ruta === '/index.html') {
    fs.readFile('./index.html', (err, html) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<html><head>${estilosCSS}</head><body><div class="card"><h1>Error</h1><p>No se encontró el archivo index.html</p></div></body></html>`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(html);
      }
    });
  }
  // RUTA DE PROCESAMIENTO DE MONEDA
  else if (ruta === '/convertir') {
    const usd = parseFloat(urlParseada.query.cantidad);

    if (isNaN(usd) || usd < 0) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          ${estilosCSS}
        </head>
        <body>
          <div class="card">
            <div class="icon">⚠️</div>
            <h1>Monto Inválido</h1>
            <p class="monto-detalle">Por favor ingresa un número válido.</p>
            <a href="/" class="btn">Volver a intentar</a>
          </div>
        </body>
        </html>
      `);
    } else {
      const eur = (usd * TASA_CAMBIO).toFixed(2);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          ${estilosCSS}
        </head>
        <body>
          <div class="card">
            <div class="icon">✅</div>
            <h1>Conversión Lista</h1>
            <p class="monto-detalle">${usd} USD equivalen a:</p>
            <div class="resultado-box">${eur} EUR</div>
            <a href="/" class="btn">Hacer otro cambio</a>
          </div>
        </body>
        </html>
      `);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end("Página no encontrada");
  }
});

server.listen(port, host, () => {
  console.log(`Servidor corriendo en: http://${host}:${port}`);
});