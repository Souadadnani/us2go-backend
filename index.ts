import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usuariosRouter from "./src/usuarios/infrastructure/rest/usuarios.router";
import viajesRouter from "./src/viajes/infrastructure/rest/viajes.router";
import mensajesRouter from "./src/foro/infrastructure/rest/mensajes.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json"
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';



dotenv.config();
const port = process.env.PORT;

const allowedOrigins = ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));
const api = "/api/";

app.use(`${api}usuarios`, usuariosRouter);
app.use(`${api}viajes`, viajesRouter);
app.use(`${api}foro`, mensajesRouter);

app.post('/upload', async(request, response, next)=>{
  const form = formidable({});

  form.parse(request, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const fichero : any = files.fichero[0]
    const ruta = path.join(__dirname, '/uploads');
    
    const oldPath = fichero.filepath;
    const newPath = path.join(ruta, fichero.originalFilename);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        response.status(500).send('Error al guardar el archivo');
        return;
      }

      response.status(200).send('Archivo subido y guardado con éxito');
    });
  });
})

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {explorer: true})
);

app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`);
});