// Este será el punto de entrada, el nexo de todo

import express from "express";

// Aquí guardamos la configuración de Express en el objeto app, que viene a ser nuestra aplicación
const app = express();

// Hay que desabilitar la "marca de agua" de express
app.disable("x-powered-by");

// Creamos nuestro puerto en el servidor
const port = 3210;

// Añadimos un middleware, que en Espress es .use
// Se pueden especificar las direcciones, si no se pone nada son todas
app.use((request, response, next) => {
  console.log("Se ha hecho la petición:", request.method);
  console.log("Contiene la dirección: ", request.path);
  const nowTime = new Date().toLocaleString();
  console.log("Fecha: ", nowTime);

  // ⚠️ Cuidado con no poner el next(), que sino se tira buscando todo el rato
  next();
});

// Y creamos nuestras llamadas
app.get("/", (request, response) => {
  // Express tiene un bug con el --watch que no refresca los Contemt-Type si no se cambia el status también
  response
    .status(200) // Método de Express para setear el status (similar a statusCode() de Node)
    .set("Content-Type", "text/plain") // Método que define los Header del HTTP
    .send("<h1>Buenas tardes</h1>"); // Mensaje que se envía finalmente
});

// Con esta route lo que le decimos es que vaya a midu y mande la imagen definida en back
app.get("/midu", (request, response) => {
  console.log("Estamos tratando de mandar una imagen");

  // Aquí guardamos las opciones del envío, que son necesarias para el método sendFile
  const options = {
    root: "public/images"
  };

  // El nombre del archivo
  const fileName = "midu-explicando.png";

  // ⚠️ sedFile() necesita como métodos el nombre del archivo (fileName), options (las opciones de la imagen de arriba)
  // y un error (si queremos)
  response
  .status(200)
  .set("Content-Type", "image/png")
  .sendFile(fileName, options, (error) => {
    if (error) {
      console.log("No se ha podido enviar la imagen");
      response.status(404).set("Content-Type", "text/plain").send("No se pudo recuperar la imagen");
    } else {
      console.log("Se ha enviado: ", fileName);
    }
  });
});

// Con esta route lo que le decimos es que vaya a midu y mande la imagen definida en la ruta de la URL
app.get("/midu/:name", (request, response) => {
  console.log("Estamos tratando de mandar una imagen");

  // Aquí guardamos las opciones del envío, que son necesarias para el método sendFile
  const options = {
    root: "public/images",
    dotfiles: "deny",
    headers: {
      "x-timestamp": new Date().toLocaleString(),
      "x-sent": true
    }
  };

  // El nombre del archivo
  const fileName = request.params.name;

  response
  .status(200)
  .set("Content-Type", "image/png")
  .sendFile(fileName, options, (error) => {
    if (error) {
      console.log("No se ha podido enviar la imagen");
      response.status(404).set("Content-Type", "text/plain").send("No se pudo recuperar la imagen");
    } else {
      console.log("Se ha enviado: ", fileName);
    }
  });
});

app.listen(port, () => {
  console.log(`Ejemplo de aplicación en http://localhost:${port}`);
});
