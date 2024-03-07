import executeQuery from "../../../context/connection/postgres.connector";
import Miembro from "../../domain/Miembro";
import Viaje from "../../domain/Viaje";
import ViajesRepository from "../../domain/viajes.repository";

export default class ViajesRepossitoryPostgreSQL implements ViajesRepository {
    //Todos  los endpoints de viajes se hace con auth

    async publicarViaje(viaje: Viaje): Promise<Viaje> {
        if(!viaje.usuario) throw new Error("Falta el usuario");
        const query = `insert into viajes(destino, fechainicio, fechafin, itinerarios, usuario) values('${viaje.destino}', '${(viaje.fechaInicio)?.toLocaleString()}', '${(viaje.fechaFin)?.toLocaleString()}', '${viaje.itinerarios}', '${viaje.usuario.email}') returning*`;
        const result: any[] = await executeQuery(query);
        const viajeBD: any = result[0];
        const travel : Viaje = {
            id: viajeBD.id,
            destino: viajeBD.destino,
            itinerarios: viajeBD.itinerarios,
            fechaInicio: viajeBD.fechainicio,
            fechaFin: viajeBD.fechafin,
            usuario: viajeBD.usuario
        }
        return travel;   
    }

    async unirseAViaje(miembro: Miembro): Promise<Miembro> {
        const query = `insert into miembros(usuario, viaje, fechahora) values('${miembro.usuario.email}', '${miembro.viaje.id}', now()) returning*`;
        const result: any[] = await executeQuery(query);
        const miembroBD: any = result[0];
        const miembroUnido: Miembro ={
            usuario: miembroBD.usuario,
            viaje: miembroBD.viaje,
            fechaDeUnion: miembroBD.fechahora
        }
        console.log("En postgres el return", miembroUnido);
        return miembroUnido;
    }
}