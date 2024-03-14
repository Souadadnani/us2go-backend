import express, {Request, Response} from "express";
import { ViajesUseCases } from "../../application/viajesUseCase";
import ViajesRepossitoryPostgreSQL from "../db/viajes.postgres";
import { isAuth } from "../../../context/security/auth";
import Viaje from "../../domain/Viaje";
import Usuario from "../../../usuarios/domain/Usuario";
import Miembro from "../../domain/Miembro";


const router = express.Router();
const viajesUseCases: ViajesUseCases = new ViajesUseCases(new ViajesRepossitoryPostgreSQL());

router.post("/publicar", isAuth, async(request: Request, response: Response)=>{
    try {
        const email = request.body.emailPL;
        const {destino, itinerarios, fechaInicio, fechaFin} = request.body;
        const usuario: Usuario = {email};
        const viaje: Viaje = {
            destino,
            itinerarios,
            fechaInicio,
            fechaFin,
            usuario
        }
        const viajeBD = await viajesUseCases.publicarViaje(viaje);
        response.json(viajeBD);
    } catch (error) {
        console.error(error);
    }
});

router.post("/unirse/:viaje", isAuth, async(request: Request, response: Response)=>{
    try {
        const usuario: Usuario = {email: request.body.emailPL}
        const viaje: Viaje = {id: parseInt(request.params.viaje)}
        const miembro: Miembro = {
            usuario,
            viaje
        }
        const miembroBD = await viajesUseCases.unirseAViaje(miembro);
        console.log("unido",miembroBD);
        response.json(miembroBD);
    } catch (error) {
        console.error(error);
    }
});

router.delete("/salir/miembro/:viaje", isAuth, async(request: Request, response: Response)=>{
    try {
        const usuario: Usuario = {email: request.body.emailPL};
        const viaje: Viaje = {id: parseInt(request.params.viaje)};
        const miembro: Miembro = {
            usuario,
            viaje
        }
        const miembroEliminado = await viajesUseCases.eliminarMiembro(miembro);
        response.json(miembroEliminado);
    } catch (error) {
        console.error(error);
    }
});

router.get("", async(request: Request, response: Response)=>{
    try {
        const viajes = await viajesUseCases.getViajesPublicados();
        response.json(viajes);
    } catch (error) {
        console.error(error);
    }
});

router.delete("/anular/:viaje",isAuth, async(request: Request, response: Response)=>{
    try {
        const id = parseInt(request.params.viaje);
        const usuario: Usuario = {email: request.body.emailPL};
        const viaje: Viaje = {
            id,
            usuario
        };
        const viajeEliminado = await viajesUseCases.eliminarViaje(viaje);
        response.json(viajeEliminado);
    } catch (error) {
        console.log(error);
    }
})

export default router;