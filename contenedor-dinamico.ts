import * as http from "http";
import {URL} from "url";
const PUERTO=3006;
http.createServer((req,res)=>{
 const url=new URL(req.url??"/",`http://${req.headers.host}`);
 if(url.pathname!=="/hora-saludo"){
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

if (url.pathname === "/") {

    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    res.end(`
        <h2>Servidor dinámico funcionando </h2>

        <p>Prueba el siguiente enlace:</p>

        <a href="/hora-saludo?nombre=Ander">
            /hora-saludo?nombre=Ander
        </a>
    `);

    return;
}

// 👇 ESTE IF YA ESTABA
if (url.pathname !== "/hora-saludo") {

    res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("404 - Ruta no encontrada");
    return;
}
  res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});
  res.end("404 - Ruta no encontrada");return;
 }
 const nombre = url.searchParams.get("nombre") ?? "Ander";
 const h=new Date().getHours();
 const minutos = new Date().getMinutes();
 let saludo="Buenas noches";
 if(h>=5&&h<12) saludo="Buenos días";
 else if(h>=12&&h<19) saludo="Buenas tardes";
 res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
 res.end(`<!DOCTYPE html><html><body><h1>${saludo}, ${nombre}</h1><p>Hora actual: ${h}:${minutos.toString().padStart(2, "0")}</p><p>Respuesta generada dinámicamente.</p></body></html>`);
}).listen(PUERTO,()=>console.log(`Contenedor dinámico: http://localhost:${PUERTO}`));
