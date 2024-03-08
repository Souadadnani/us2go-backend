import Mensaje from "../domain/Mensaje";
import MensajesRepository from "../domain/mensajes.repository";

export default class MensajesUseCases {
    constructor(private mensajesRepository: MensajesRepository){}

    async publicarMensaje(mensaje: Mensaje) {
        return await this.mensajesRepository.publicarMensaje(mensaje);
    }

    async eliminarMensaje(mensaje: Mensaje) {
        return await this.mensajesRepository.eliminarMensaje(mensaje);
    }
    
    async editarMensaje(mensaje: Mensaje) {
        return await this.mensajesRepository.editarMensaje(mensaje);
    }
}