import Usuario from "./Usuario";

export default interface UsuariosRepository {
    registrar(usuario: Usuario): Promise<Usuario>;
    login(usuario: Usuario): Promise<Usuario>;
    recuperarPassword(usuario: Usuario): Promise<Usuario>;
}