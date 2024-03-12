import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usuariosRouter from "./src/usuarios/infrastructure/rest/usuarios.router";
import viajesRouter from "./src/viajes/infrastructure/rest/viajes.router";
import mensajesRouter from "./src/foro/infrastructure/rest/mensajes.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json"


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


app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {explorer: true})
);

app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`);
});