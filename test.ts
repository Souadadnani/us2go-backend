import test from 'test';
import assert from 'assert';
import UsuariosUseCases from './src/usuarios/application/usuarios.usecases';
import UsuariosRepositoryPostgreSQl from './src/usuarios/infrastructure/db/usuarios.postgres';
import { ViajesUseCases } from './src/viajes/application/viajesUseCase';
import ViajesRepossitoryPostgreSQL from './src/viajes/infrastructure/db/viajes.postgres';
import Usuario from './src/usuarios/domain/Usuario';
import Viaje from './src/viajes/domain/Viaje';
import Miembro from './src/viajes/domain/Miembro';


const usuariosUseCases: UsuariosUseCases = new UsuariosUseCases(new UsuariosRepositoryPostgreSQl());
const viajesUsecases: ViajesUseCases = new ViajesUseCases(new ViajesRepossitoryPostgreSQL());

test('registrar', async (test) => {
    const usuario: Usuario = {
        email: "registrar@gmail.com",
        nombre: "Test",
        apellidos: "Test",
        password: "123",
        telefono: 654323232
    }
    const userRegistrado = await usuariosUseCases.registrar(usuario);
    assert.strictEqual(usuario.email, userRegistrado.email);
});

test('login', async(test)=>{
    const usuario: Usuario = {
        email: "login@gmail.com",
        nombre: "TestLogin",
        apellidos: "TestLogin",
        password: "123",
        telefono: 654323245
    }
    // este me devuelve nombre y el email del usuario
    const userRegistrado = await usuariosUseCases.registrar(usuario); 
    const userLogin: Usuario = {
        email: "login@gmail.com",
        password: "123"
    }
    const userLogueado = await usuariosUseCases.login(userLogin);
    assert.strictEqual(userLogin.email, userLogueado.email);
});

test('recuperar', async(test)=>{
    const usuario: Usuario = {
        email: "recuperar@gmail.com",
        nombre: "Test",
        apellidos: "Test",
        password: "123",
        telefono: 654323245
    }
    
    const userRegistrado = await usuariosUseCases.registrar(usuario);
    const userUpdate = await usuariosUseCases.recuperarPassword(userRegistrado);
    assert.strictEqual(userRegistrado.email, userUpdate.email);
}); 

test('viajes', async(test)=>{
    const viajes = await viajesUsecases.getViajesPublicados();
    assert.strictEqual(0, viajes.length)
})

test('publicar-viaje', async(test)=>{
    const usuario: Usuario = {
        email: "publicar@gmail.com",
        nombre: "Test",
        apellidos: "Test",
        password: "123",
        telefono: 654323232
    }
    const userRegistrado = await usuariosUseCases.registrar(usuario);

    const userLogin: Usuario = {
        email: userRegistrado.email,
        password: "123"
    }
    const userLogueado = await usuariosUseCases.login(userLogin);
console.log(userLogueado);
    const viaje: Viaje = {
        destino: "Destino1",
        itinerarios: "iti1, iti2, iti3",
        fechaInicio: "2024-04-23",
        fechaFin: "2024-05-02",
        usuario: userLogueado
    }
    console.log(viaje.usuario.email);
    const viajeBD = await viajesUsecases.publicarViaje(viaje);
    console.log(viajeBD)
    assert.strictEqual(viaje.usuario.email, viajeBD.usuario);
}); 

test('unirse-viaje', async(test)=>{
    const usuario: Usuario = {
        email: "miembro@gmail.com",
        nombre: "Test",
        apellidos: "Test",
        password: "123",
        telefono: 654323232
    }
    const userRegistrado = await usuariosUseCases.registrar(usuario);

    const userLogin: Usuario = {
        email: usuario.email,
        password: "123"
    }
    const userLogueado = await usuariosUseCases.login(userLogin);

    const viaje: Viaje = {
        destino: "Destino2",
        itinerarios: "iti1, iti2, iti3",
        fechaInicio: "2024-04-23",
        fechaFin: "2024-05-02",
        usuario: userLogueado
    }
    const viajeBD = await viajesUsecases.publicarViaje(viaje);

    const miembro: Miembro = {
        usuario: userRegistrado,
        viaje: viajeBD,
        fechaDeUnion: new Date().toISOString()
    }
    const miembroUnido = await viajesUsecases.unirseAViaje(miembro);
    assert.strictEqual(miembro.usuario.email, miembroUnido.usuario);
});

/* test('salir-del-grupo', async(test)=>{
    const usuario: Usuario = {
        email: "salirgrupo@gmail.com",
        nombre: "Test",
        apellidos: "Test",
        password: "123",
        telefono: 654323232
    }
    const userRegistrado = await usuariosUseCases.registrar(usuario);

    const userLogin: Usuario = {
        email: userRegistrado.email,
        password: "123"
    }
    const userLogueado = await usuariosUseCases.login(userLogin);
    const viaje: Viaje = {
        destino: "Destino3",
        itinerarios: "iti1, iti2, iti3",
        fechaInicio: "2024-05-06",
        fechaFin: "2024-05-20",
        usuario: userLogueado
    }
    const viajeBD = await viajesUsecases.publicarViaje(viaje);

    const miembro: Miembro = {
        usuario: userLogueado,
        viaje: viajeBD,
        fechaDeUnion: new Date().toISOString()
    }
    const miembroUnido = await viajesUsecases.unirseAViaje(miembro);
    console.log("miembro unido",miembroUnido)
    const elminidado = await viajesUsecases.eliminarMiembro(miembroUnido);
    console.log("eliminado",elminidado)
    assert.strictEqual(miembroUnido.usuario, elminidado.usuario);
}) */
