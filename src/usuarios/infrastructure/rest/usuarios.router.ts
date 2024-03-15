import express, {Response, Request} from "express";
import UsuariosUseCases from "../../application/usuarios.usecases";
import UsuariosRepositoryPostgreSQl from "../db/usuarios.postgres";
import Usuario from "../../domain/Usuario";
import { createToken, isAuth } from "../../../context/security/auth";

const router = express.Router();
const usariosUseCases: UsuariosUseCases = new UsuariosUseCases(new UsuariosRepositoryPostgreSQl());

router.post("/registrar", async(request: Request, response: Response)=>{
    try {
        const {email, nombre, apellidos, password, telefono} = request.body;
        const usuarioAPI: Usuario = {
            email,
            nombre,
            apellidos, 
            password,
            telefono
        }
        const usuarioBD = await usariosUseCases.registrar(usuarioAPI);
        response.json({email: usuarioBD.email, nombre: usuarioBD.nombre});
    } catch (error) {
       console.error(`No se ha podido realizar el registro ${error}`); 
    }
});

router.post("/login", async(request: Request, response: Response)=>{
    try {
        const {email, password} = request.body;
        const usuarioAPI: Usuario = {
            email,
            password
        }
        const usuarioBD = await usariosUseCases.login(usuarioAPI);
        if(usuarioBD === null){
            response.status(400).json({mensaje: "Usuario no encontrado"});
        }else{
            const token = createToken(usuarioBD);
            const usuario: Usuario = {
                email: usuarioBD.email,
                nombre: usuarioBD.nombre,
            }
            response.json({token: token, usuario: usuario});
        }
    } catch (error) {
        console.error(`No se ha podido realizar el inicio de sesión ${error}`);
    }
});

router.put("/recuperar", async(request: Request, response: Response)=>{
    try {
        const {email, password} = request.body;
        const usuarioAPI: Usuario = {
            email,
            password
        }
        console.log(usuarioAPI);
        
        const usuarioBD = await usariosUseCases.recuperarPassword(usuarioAPI);
        response.json(usuarioBD);
    } catch (error) {
        console.error(`No se ha podido realizar el inicio de sesión ${error}`);
    }
});

router.put("/modificar/perfil", isAuth, async(request: Request, resposnse: Response)=>{
    try {
        const {email, password, telefono} = request.body;
        const emailTK = request.body.emailPL;
        const usuario: Usuario = {
            email,
            password,
            telefono
        }
        const actualizado = await usariosUseCases.modificarPerfil(usuario, emailTK);
        resposnse.json(actualizado);
    } catch (error) {
        console.error(error);
    }
});



export default router;