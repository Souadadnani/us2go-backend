import test from 'test';
import assert from 'assert';
import UsuariosUseCases from './src/usuarios/application/usuarios.usecases';
import UsuariosRepositoryPostgreSQl from './src/usuarios/infrastructure/db/usuarios.postgres';
import { ViajesUseCases } from './src/viajes/application/viajesUseCase';
import ViajesRepossitoryPostgreSQL from './src/viajes/infrastructure/db/viajes.postgres';
import Usuario from './src/usuarios/domain/Usuario';


const usuariosUseCases: UsuariosUseCases = new UsuariosUseCases(new UsuariosRepositoryPostgreSQl());
const viajesUsecases: ViajesUseCases = new ViajesUseCases(new ViajesRepossitoryPostgreSQL());

/* test('registrar', async (test) => {
    const usuario: Usuario = {
        email: "test1@gmail.com",
        nombre: "Test1",
        apellidos: "Test2",
        password: "123",
        telefono: 654323232
    }
    const userRegistrado = await usuariosUseCases.registrar(usuario);
    assert.strictEqual(usuario.email, userRegistrado.email);
}); */

/* test('login', async(test)=>{
    const userARegistrar: Usuario = {
        email: "testlogin1@gmail.com",
        nombre: "TestLogin1",
        apellidos: "TestLogin1",
        password: "123",
        telefono: 654323245
    }
    // este me devuelve nombre y el email del usuario
    const userRegistrado = await usuariosUseCases.registrar(userARegistrar); 
    const userLogin: Usuario = {
        email: "test1@gmail.com",
        password: "123"
    }
    const userLogeado = await usuariosUseCases.login(userLogin);
    assert.strictEqual(userLogin.email, userLogeado.email);
}); */

test('recuperar', async(test)=>{
    const userARegistrar: Usuario = {
        email: "testlogin@gmail.com",
        nombre: "TestLogin",
        apellidos: "TestLogin",
        password: "123",
        telefono: 654323245
    }
    
    const userRegistrado = await usuariosUseCases.registrar(userARegistrar);
    const userLogin: Usuario = {
        email: userARegistrar.email,
        password: userARegistrar.password
    }
    const userLogeado = await usuariosUseCases.login(userLogin);
    const userUpdate = await usuariosUseCases.recuperarPassword(userLogeado);
    assert.strictEqual(userRegistrado.email, userUpdate.email);
}); 

