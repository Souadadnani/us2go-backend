import Usuario from "../domain/Usuario";
import UsuariosRepository from "../domain/usuarios.repository";

export default class UsuariosUseCases {
   constructor(private usariosRepository: UsuariosRepository){}
   async login(usuario: Usuario){

   }
}