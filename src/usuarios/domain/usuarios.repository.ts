import Usuario from "./Usuario";

export default interface UsuariosRepository {
    registro(usuario: Usuario): Promise<Usuario>;
    login(usuario: Usuario): Promise<Usuario>;
}