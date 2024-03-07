import Usuario from "../../usuarios/domain/Usuario";

export default interface Viaje {
    id?: number,
    destino?: string,
    itinerarios?: string,
    fechaInicio?: Date,
    fechaFin?: Date,
    usuario?: Usuario
}