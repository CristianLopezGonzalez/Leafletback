import { Response, Request, NextFunction } from "express";
import { HttpResponse } from "./httpResponse";
import { config } from "../config/config";
import { JwtUtils } from "../utils/jwtUtils";

const httpRes = new HttpResponse();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return httpRes.UNAUTHORIZED(res, 'Token no proporcionado');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return httpRes.UNAUTHORIZED(res, 'Token no válido');
    }

    try {

        const payload = JwtUtils.verificarToken(token);
        req.user = payload;
        next();
        return

    } catch (error) {

        if (config.NODE_ENV === 'development') {
            console.error(error);
        }

        return httpRes.UNAUTHORIZED(res, 'Error en la autenticacion del token');
    }

}