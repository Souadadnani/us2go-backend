import Usuario from "../../usuarios/domain/Usuario";

export default interface Viaje {
    id?: number,
    destino?: string,
    itinerarios?: string,
    fechaInicio?: string,
    fechaFin?: string,
    usuario?: Usuario
}