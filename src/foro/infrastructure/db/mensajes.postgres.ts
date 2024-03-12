import executeQuery from "../../../context/connection/postgres.connector";
import Mensaje from "../../domain/Mensaje";
import MensajesRepository from "../../domain/mensajes.repository";

export default class MensajesRepositoryPostgreSQL implements MensajesRepository{

    async publicarMensaje(mensaje: Mensaje): Promise<Mensaje> {
        if(!mensaje.viaje) throw new Error(`Falta el usuario`);
        const query = `insert into mensajes(mensaje, usuario, viaje, fechahora) values('${mensaje.mensaje}', '${mensaje.usuario.email}', '${mensaje.viaje.id}', now()) returning*`;
        const result: any[] = await executeQuery(query);
        const mensajeBD: any = result[0];
        const message: Mensaje = {
            id: mensajeBD.id,
            mensaje: mensajeBD.mensaje,
            usuario: mensajeBD.usuario,
            viaje: mensajeBD.viaje,
            fechaHora: mensajeBD.fechahora
        }
        return message;
    }

    async eliminarMensaje(mensaje: Mensaje) {
        if(!mensaje.viaje) throw new Error(`Falta el usuario`);
        const query = `delete from mensajes where id=${mensaje.id} and usuario='${mensaje.usuario.email}' and viaje=${mensaje.viaje.id} returning*`;
        const result: any[] = await executeQuery(query);
        if(result){
            console.log("mensaje borrado");
        }
    }

    async editarMensaje(mensaje: Mensaje): Promise<Mensaje> {
        const query = `update mensajes set mensaje='${mensaje.mensaje}' where id=${mensaje.id} and usuario='${mensaje.usuario.email}' returning*`;
        const result: any[] = await executeQuery(query);
        const actualizadoBD: any = result[0];
        const actualizado: Mensaje = {
            id: actualizadoBD.id,
            mensaje: actualizadoBD.mensaje,
            viaje: actualizadoBD.viaje,
            usuario: actualizadoBD.usuario,
            fechaHora: actualizadoBD.fechahora
        }
        return actualizado;
    }

    async getForo(): Promise<Mensaje[]> {
        const result: any[] = await executeQuery(`select * from mensajes`);
        const mensajes: Mensaje[] = result.map(element=>{
            const mensaje: Mensaje = {
                id: element.id,
                viaje: element.viaje,
                mensaje: element.mensaje,
                usuario: element. usuario,
                fechaHora: element.fechahora
            }
            return mensaje;
        });
        return mensajes;
    }
}