import Usuario from "../../usuarios/domain/Usuario";
import Viaje from "./Viaje";

export default interface Miembro {
    usuario: Usuario,
    viaje: Viaje,
    fechaDeUnion: string
}