// Este será el punto de entrada, el nexo de todo

import express from "express";

// Aquí guardamos la configuración de Express en el objeto app, que viene a ser nuestra aplicación
const app = express();

// Creamos nuestro puerto en el servidor
const port = 3210;

// Y creamos nuestras llamadas
app.get("/", (request, response) => {
  // Express tiene un bug con el --watch que no refresca los Contemt-Type si no se cambia el status también
  response
    .status(200) // Método de Express para setear el status (similar a statusCode() de Node)
    .set("Content-Type", "text/plain") // Método que define los Header del HTTP
    .send("<h1>Buenas tardes</h1>"); // Mensaje que se envía finalmente
});

app.listen(port, () => {
  console.log(`Ejemplo de aplicación en http://localhost:${port}`);
});
