import Usuario from "../../usuarios/domain/Usuario";
import Viaje from "../../viajes/domain/Viaje";

export default interface Mensaje {
    id?: number,
    mensaje: string,
    usuario: Usuario,
    viaje: Viaje,
    fechaHora: string
}