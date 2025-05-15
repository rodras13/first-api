// Este va a ser el punto de entrada de la aplicaión propiamete dicha
import expres from "express";

const app = expres();

const serverPort = 1234;

// Creamos un middleware que sirva como un log de todas las peticiones a la API
app.use((req, res, next) => {
  const nowLocaleDate = new Date().toLocaleString();
  console.log("HTTP Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("At time: ", nowLocaleDate);
  next();
});

// Esto tendría que ser un controlador, pero vamos a hacer que se así de momento
app.get("/", (req, res) => {
  // Guardamos en un objeto los parámetros de la respuesta
  const options = {
    root: "src/mocks",
    dotfiles: "deny"
  };

  const json = "wellcome.json";

  // Añadido como un archivo
  res.sendFile(json, options);

  // Añadido directamente con el método .json() UPDATE: no funciona, así por lo menos
  // res.type("json").json(`{"Message": "Bienvenido con una string", "Data": []}`);
});

// Aquí es donde esucha el servidor
app.listen(serverPort, () => {
  console.log(`El servidor está activo en el puerto http://localhost:${serverPort}`);
});