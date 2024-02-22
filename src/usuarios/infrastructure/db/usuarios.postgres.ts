import { query } from "express";
import Usuario from "../../domain/Usuario";
import UsuariosRepository from "../../domain/usuarios.repository";
import executeQuery from "../../../context/connection/postgres.connector";

export default class UsuariosRepositoryPostgreSQl implements UsuariosRepository {

    async registro(usuario: Usuario): Promise<Usuario> {

        const query = `insert into usuarios(email, nombre, apellidos, password, telefono) values('${usuario.email}', '${usuario.nombre}', '${usuario.apellidos}', '${usuario.password}', '${usuario.telefono}')`;
        const result: any[] = await executeQuery(query);
        const user: Usuario = {
            email: result[0].email,
            nombre: result[0].nombre,
            apellidos: result[0].apellidos,
            password: result[0].password,
            telefono: result[0].telefono
        }
        return user;
    }

    async login(usuario: Usuario): Promise<Usuario> {
        const query = `select * from usuarios where email='${usuario.email}'`;
        const result: any[] = await executeQuery(query);
        const user: Usuario = {
            email: result[0].email,
            nombre: result[0].nombre,
            apellidos: result[0].apellidos,
            password: result[0].password,
            telefono: result[0].telefono
        }
        return user;
    }

    
}