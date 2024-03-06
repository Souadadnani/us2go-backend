import Miembro from "../domain/Miembro";
import Viaje from "../domain/Viaje";
import ViajesRepository from "../domain/viajes.repository";

export class ViajesUseCases {

    constructor(private viajesRepository: ViajesRepository){}

    async publicarViaje(viaje: Viaje) {
        return await this.viajesRepository.publicarViaje(viaje);
    }

    async unirseAViaje(miembro: Miembro) {
        return await this.viajesRepository.unirseAViaje(miembro);
    }
}