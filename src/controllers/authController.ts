import { Response, Request, NextFunction } from "express";
import {AuthService} from "../services/authService";
import {HttpResponse} from "../middlewares/httpResponse";

const http = new HttpResponse();

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {

            const {username, email, password} = req.body;
            const result = await AuthService.register(username, email, password);
            return http.CREATED(res, result, 'Usuario registrado exitosamente');

        } catch (error) {
            return next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {

            const {email, password} = req.body;
            const result = await AuthService.login(email, password);
            return http.OK(res, result, 'Inicio de sesión exitoso');

        }catch (error) {
            return next(error);
        }
    }

    static async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {

            const { refreshToken } = req.body;
            const result = await AuthService.refreshToken(refreshToken);
            return http.OK(res, result, 'Token actualizado exitosamente');

        }catch (error) {
            return next(error);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {

            const { refreshToken } = req.body;
            await AuthService.logout(refreshToken);
            return http.OK(res, null, 'Cierre de sesión exitoso');

        }catch (error) {
            return next(error);
        }
    }

    static async logoutAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return http.UNAUTHORIZED(res, 'Usuario no autenticado');
            }

            await AuthService.logoutAll(userId);
            return http.OK(res, null, 'Cierre de sesión de todas las sesiones exitoso');

        }catch (error) {
            return next(error);
        }
    }
}