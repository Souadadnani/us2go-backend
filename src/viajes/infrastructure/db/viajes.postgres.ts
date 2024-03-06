import executeQuery from "../../../context/connection/postgres.connector";
import Miembro from "../../domain/Miembro";
import Viaje from "../../domain/Viaje";
import ViajesRepository from "../../domain/viajes.repository";

export default class ViajesRepossitoryPostgreSQL implements ViajesRepository {
    //Todos  los endpoints de viajes se hace con auth

    async publicarViaje(viaje: Viaje): Promise<Viaje> {
        const query = `insert into viajes(destino, fechainicio, fechafin, itinerarios, usuario) values('${viaje.destino}', '${viaje.fechaInicio}', '${viaje.fechaFin}', '${viaje.itinerarios}', '${viaje.usuario.email}') returning*`;
        const result: any[] = await executeQuery(query);
        const viajeBD: Viaje = result[0];
        const travel : Viaje = {
            id: viajeBD.id,
            destino: viajeBD.destino,
            itinerarios: viajeBD.itinerarios,
            fechaInicio: viajeBD.fechaInicio,
            fechaFin: viajeBD.fechaFin,
            usuario: viajeBD.usuario
        }
        return travel;
    }

    async unirseAViaje(miembro: Miembro): Promise<Viaje> {
        const query = `insert into miembros(usuario, viaje, fechahora) values('${miembro.usuario}', '${miembro.viaje}', '${miembro.fechaDeUnion}') returning*`;
        const result: any[] = await executeQuery(query);
        const miembroBD: Miembro = result[0];
        const viaje: Viaje ={
            id: miembroBD.viaje.id
        }
        return viaje;
    }
}