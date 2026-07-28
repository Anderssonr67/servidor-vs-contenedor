import * as http from "http";
import * as fs from "fs";
import * as path from "path";
const PUERTO=3005;
http.createServer((req,res)=>{
 const archivo=path.join(__dirname,"publico","saludo.html");
 fs.readFile(archivo,(err,data)=>{
  if(err){res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});res.end("404 - Archivo no encontrado");return;}
  res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
  res.end(data);
 });
}).listen(PUERTO,()=>console.log(`Servidor estático: http://localhost:${PUERTO}`));
