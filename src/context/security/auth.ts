import jwt, { Secret } from "jsonwebtoken";
import Usuario from "../../usuarios/domain/Usuario";
import { NextFunction, Request, Response } from "express";

const SECRET_KEY: Secret = "mi-clave";

const decode = (token: string) =>{
    return jwt.decode(token);
}

const createToken = (usuario: Usuario): string =>{
    const payload = {
        emailPL: usuario.email,
        nombrePL: usuario.nombre
    }
    return jwt.sign(payload, SECRET_KEY, {expiresIn: "1 days"});
}

const isAuth = (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.headers["authorization"];
        const token: string | undefined = authHeader && authHeader.split(" ")[1];
        if(token){
            const decoded: any = jwt.verify(token, SECRET_KEY);
            request.body.emailPL = decoded.emailPL;
            request.body.nombrePL = decoded.nombrePL;

            next();
        }else{
            response.status(401).json({mensaje: "No autorizado"});
        }
    } catch (error) {
        console.error(error);
        response.status(401).json({mensaje: "No autorizado"});
    }
}

export {decode, createToken, isAuth}