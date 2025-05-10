// Este será el punto de entrada, el nexo de todo

import express from "express";

// Aquí guardamos la configuración de Express en el objeto app, que viene a ser nuestra aplicación
const app = express();

// Creamos nuestro puerto en el servidor
const port = 3210;

// Y creamos nuestras llamadas
app.get("/", (request, response) => {
  console.log("El servidor está correcto dude");
  response.send("Muy buenas!");
});

app.listen(port, () => {
  console.log(`Ejemplo de aplicación en el puerto ${port}`);
});
