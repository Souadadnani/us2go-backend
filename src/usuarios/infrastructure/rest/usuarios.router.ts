import express, {Response, Request} from "express";
import UsuariosUseCases from "../../application/usuarios.usecases";
import UsuariosRepositoryPostgreSQl from "../db/usuarios.postgres";

const router = express.Router();
const usariosUseCases: UsuariosUseCases = new UsuariosUseCases(new UsuariosRepositoryPostgreSQl());

router.post("/registro", async(request: Request, response: Response)=>{

})