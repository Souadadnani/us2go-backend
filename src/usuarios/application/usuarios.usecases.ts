import { compare, hash } from "../../context/security/encrypter";
import Usuario from "../domain/Usuario";
import UsuariosRepository from "../domain/usuarios.repository";

export default class UsuariosUseCases {
   constructor(private usuariosRepository: UsuariosRepository){}

   async registrar(usuario: Usuario){
      if(!usuario.password) throw new Error("Contraseña incorrecta");
      const cifrada = hash(usuario.password);
      usuario.password = cifrada;
      return await this.usuariosRepository.registrar(usuario);
  }

  async login(usuario: Usuario){
      if(!usuario.password) throw new Error("Contraseña incorrecta");
      const usuarioBD = await this.usuariosRepository.login(usuario);
      if(!usuarioBD) throw new Error("Usuario no esta registrado");
      if(!usuarioBD.password) throw new Error("Usuario no tiene contraseña");
      const iguales = compare(usuario.password, usuarioBD.password);
      if(iguales){
          return usuarioBD;
      }else{
          throw new Error("Usuario/contraseña incorrectos");
      }
  }
}