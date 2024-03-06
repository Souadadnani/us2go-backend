import Miembro from "./Miembro";
import Viaje from "./Viaje";

export default interface ViajesRepository {

    publicarViaje(viaje: Viaje): Promise<Viaje>;
    unirseAViaje(miembro: Miembro): Promise<Viaje>;
}