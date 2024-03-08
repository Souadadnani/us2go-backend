import dotenv from "dotenv";
import express from "express";
import usuariosRouter from "./src/usuarios/infrastructure/rest/usuarios.router";
import viajesRouter from "./src/viajes/infrastructure/rest/viajes.router";
import mensajesRouter from "./src/foro/infrastructure/rest/mensajes.router";


dotenv.config();
const port = process.env.PORT;


const app = express();
app.use(express.json());
const api = "/api/";

app.use(`${api}usuarios`, usuariosRouter);
app.use(`${api}viajes`, viajesRouter);
app.use(`${api}foro`, mensajesRouter);

app.listen(port, ()=>{
    console.log(`Server is running in port ${port}`);
});