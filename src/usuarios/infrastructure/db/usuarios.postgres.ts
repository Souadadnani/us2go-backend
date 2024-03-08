import { query } from "express";
import Usuario from "../../domain/Usuario";
import UsuariosRepository from "../../domain/usuarios.repository";
import executeQuery from "../../../context/connection/postgres.connector";

export default class UsuariosRepositoryPostgreSQl implements UsuariosRepository {

    async registrar(usuario: Usuario): Promise<Usuario> {

        const query = `insert into usuarios(email, nombre, apellidos, password, telefono) values('${usuario.email}', '${usuario.nombre}', '${usuario.apellidos}', '${usuario.password}', '${usuario.telefono}') returning*`;
        const result: any[] = await executeQuery(query);
        const userBD = result[0];
        const user: Usuario = {
            email: userBD.email,
            nombre: userBD.nombre,
            apellidos: userBD.apellidos,
            password: userBD.password,
            telefono: userBD.telefono
        }
        return user; 
    }

    async login(usuario: Usuario): Promise<Usuario> {
  
        const query = `select * from usuarios where email='${usuario.email}'`;
        const result: any[] = await executeQuery(query);
        if(result.length === 0){
            throw new Error("Datos de login incorrectos");
        }else{
            const userBD = result[0];
            const user: Usuario = {
                email: userBD.email,
                nombre: userBD.nombre,
                apellidos: userBD.apellidos,
                password: userBD.password,
                telefono: userBD.telefono
            }
            return user;
        } 
    }
    
    async recuperarPassword(usuario: Usuario): Promise<Usuario> {
        const query = `update usuarios set password='${usuario.password}' where email='${usuario.email}' returning*`;
        const result: any = await executeQuery(query);
        console.log(result);
        if(result.length === 0){
            throw new Error("usuario no existe");
        }else{
            const userBD = result[0];
            const user: Usuario = {
                email: userBD.email,
                nombre: userBD.nombre,
                apellidos: userBD.apellidos,
                telefono: userBD.telefono
            }
            return user;
        }
    }

   /*  async modificarPerfil(usuario: Usuario): Promise<Usuario> {
        const query = ``
    } */

}