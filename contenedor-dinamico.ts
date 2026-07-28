import * as http from "http";
import { URL } from "url";
const PUERTO = 3006;

http.createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

  if (url.pathname === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });

    res.end(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Servidor dinámico</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 2rem; line-height: 1.5; }
          h1 { font-weight: 400; margin-bottom: 0.5rem; }
        </style>
      </head>
      <body>
        <h1>Servidor dinámico funcionando</h1>
        <p>Prueba el siguiente enlace:</p>
        <a href="/hora-saludo?nombre=Ander">/hora-saludo?nombre=Ander</a>
      </body>
      </html>
    `);
    return;
  }

  if (url.pathname !== "/hora-saludo") {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 - Ruta no encontrada");
    return;
  }

  const nombre = url.searchParams.get("nombre") ?? "Ander";
  const h = new Date().getHours();
  let saludo = "Buenas noches";
  if (h >= 5 && h < 12) saludo = "Buenos días";
  else if (h >= 12 && h < 19) saludo = "Buenas tardes";
  const minutos = new Date().getMinutes();

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><title>Saludo dinámico</title><style>body{font-family:Arial,sans-serif;margin:2rem;line-height:1.5;}h1{font-weight:400;margin-bottom:0.5rem;}p{margin:0.3rem 0;}</style></head><body><h1>${saludo}, ${nombre}</h1><p>Hora actual: ${h}:${minutos.toString().padStart(2, "0")}</p><p>Respuesta generada dinámicamente.</p></body></html>`);
}).listen(PUERTO, () => console.log(`Contenedor dinámico: http://localhost:${PUERTO}`));
