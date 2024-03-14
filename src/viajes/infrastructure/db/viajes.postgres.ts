import executeQuery from "../../../context/connection/postgres.connector";
import Usuario from "../../../usuarios/domain/Usuario";
import Miembro from "../../domain/Miembro";
import Viaje from "../../domain/Viaje";
import ViajesRepository from "../../domain/viajes.repository";

export default class ViajesRepossitoryPostgreSQL implements ViajesRepository {

    async publicarViaje(viaje: Viaje): Promise<Viaje> {
        if(!viaje.usuario) throw new Error("Falta el usuario");
        const query = `insert into viajes(origen, destino, fechainicio, fechafin, itinerarios, usuario) values('${viaje.origen}', '${viaje.destino}', '${(viaje.fechaInicio)?.toLocaleString()}', '${(viaje.fechaFin)?.toLocaleString()}', '${viaje.itinerarios}', '${viaje.usuario.email}') returning*`;
        const result: any[] = await executeQuery(query);
        const viajeBD: any = result[0];
        const travel : Viaje = {
            id: viajeBD.id,
            origen: viajeBD.origen,
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
        return miembroUnido;
    }

    async eliminarMiembro(miembro: Miembro): Promise<Miembro> {
        const query = `delete from miembros where usuario='${miembro.usuario.email}' and viaje=${miembro.viaje.id} returning*`;
        const result: any[] = await executeQuery(query);
        const eliminadoBD: any = result[0];
        const eliminado: Miembro = {
            usuario: eliminadoBD.usuario,
            viaje: eliminadoBD.viaje,
            fechaDeUnion: eliminadoBD.fechahora
        } 
        console.log(eliminado)
        return eliminado;
    }

    async getViajesPublicados(): Promise<Viaje[]> {
        const result: any[] = await executeQuery(`select v.*, u.nombre, u.apellidos from viajes v left join usuarios u on v.usuario=u.email`);
        const viajes = result.map(item=>{
            const usuario: Usuario = {
                nombre: item.nombre,
                apellidos: item.apellidos,
                email: item.usuario
            }
            const viaje: Viaje = {
                id: item.id,
                origen: item.origen,
                destino: item.destino,
                itinerarios: item.itinerarios,
                fechaInicio: item.fechainicio,
                fechaFin: item.fechafin,
                usuario: usuario
            }
            return viaje;
        });
        return viajes;
    }

    async eliminarViaje(viaje: Viaje): Promise<Viaje> {
        const result: any[] = await executeQuery(`delete from viajes where id=${viaje.id} and usuario=${viaje.usuario.email} returning*`);
        const viajeBD: any = result[0];
        const eliminado: Viaje = {
            id: viajeBD.id,
            origen: viajeBD.origen,
            destino: viajeBD.destino,
            itinerarios: viajeBD.itinerarios,
            fechaInicio: viajeBD.fechainicio,
            fechaFin: viajeBD.fechafin,
            usuario: viajeBD.usuario
        }
        return eliminado;
    }
}