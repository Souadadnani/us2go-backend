import express, {Request, Response} from "express";
import { ViajesUseCases } from "../../application/viajesUseCase";
import ViajesRepossitoryPostgreSQL from "../db/viajes.postgres";
import { isAuth } from "../../../context/security/auth";


const router = express.Router();
const viajesUseCases: ViajesUseCases = new ViajesUseCases(new ViajesRepossitoryPostgreSQL());

router.post("/publicar", isAuth, async(request: Request, response: Response)=>{
    try {
        const email = request.body.emailPL;
        
    } catch (error) {
        
    }
})