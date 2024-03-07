import executeQuery from "../../../context/connection/postgres.connector";
import Mensaje from "../../domain/Mensaje";
import MensajesRepository from "../../domain/mensajes.repository";

export default class MensajesRepositoryPostgreSQL implements MensajesRepository{


    //los endpoints del foro va con auth

    async publicarMensaje(mensaje: Mensaje): Promise<Mensaje> {
        const query = `insert into mensajes(mensaje, usuario, viaje, fechahora) values('${mensaje.mensaje}', '${mensaje.usuario.email}', '${mensaje.viaje.id}', now())`;
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
//eliminar/idMensaje y usuario de token
    async eliminarMensaje(mensaje: Mensaje) {
        const query = `delete from mensajes where id=${mensaje.id} and usuario='${mensaje.usuario}'`;
        const result: any[] = await executeQuery(query);
        console.log(result);
    }
}