import express, { Request, Response } from "express";
import MensajesUseCases from "../../application/mensajes.useCases";
import MensajesRepositoryPostgreSQL from "../db/mensajes.postgres";
import Viaje from "../../../viajes/domain/Viaje";
import Mensaje from "../../domain/Mensaje";
import { isAuth } from "../../../context/security/auth";
import Usuario from "../../../usuarios/domain/Usuario";



const router = express.Router();
const mensajesUseCases: MensajesUseCases = new MensajesUseCases(new MensajesRepositoryPostgreSQL());

router.post("/publicar/mensaje/:viaje", isAuth, async(request: Request, response: Response)=>{
    try {
        const usuario: Usuario = {email: request.body.emailPL}     
        const viaje: Viaje ={
            id: parseInt(request.params.viaje)
        }
        const mensaje = request.body.mensaje;  

        const message: Mensaje = {
            usuario,
            viaje,
            mensaje
        }

        const mensajeBD = await mensajesUseCases.publicarMensaje(message);
        response.json(mensajeBD);
    } catch (error) {
        console.error(error);
    }
});

router.delete("/eliminar/:viaje/:mensaje", isAuth, async(request: Request, response: Response)=>{
    try {
        const usuario: Usuario = {email: request.body.emailPL};
        const viaje: Viaje = {id: parseInt(request.params.viaje)}
        const id = parseInt(request.params.mensaje);
        const mensaje: Mensaje ={
            id,
            usuario,
            viaje
        }
        await mensajesUseCases.eliminarMensaje(mensaje);
        response.json({mensaje: "mensaje eliminado"});
    } catch (error) {
        console.error(error);
    }
});

router.put("/editar/:id", isAuth, async(request: Request, response: Response)=>{
    try {
        const usuario: Usuario = {email: request.body.emailPL};
        const id = parseInt(request.params.id);
        const mensaje = request.body.mensaje;
        const message: Mensaje = {
            id,
            usuario,
            mensaje
        }
        const actualizado = await mensajesUseCases.editarMensaje(message);
        response.json(actualizado);
    } catch (error) {
        console.error(error);
    }
})

export default router;