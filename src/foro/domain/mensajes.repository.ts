import Mensaje from "./Mensaje";

export default interface MensajesRepository {
    publicarMensaje(mensaje: Mensaje): Promise<Mensaje>;
    eliminarMensaje(mensaje: Mensaje);
}