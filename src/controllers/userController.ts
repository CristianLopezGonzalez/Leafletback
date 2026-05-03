import {Request,Response,NextFunction} from 'express';
import { UserService } from '../services/userService';
import { HttpResponse } from '../middlewares/httpResponse';

const http = new HttpResponse();

export class UserController {

    static async getUserProfile(req: Request, res: Response, next: NextFunction) {
        try {

            const userId = req.user?.id;
            if (!userId) {
                return http.UNAUTHORIZED(res, 'Usuario no autenticado');
            }

            const userProfile = await UserService.getUserProfile(userId);
            return http.OK(res, userProfile, 'Perfil de usuario obtenido exitosamente');

        }catch (error) {
            return next(error);
        }
    }

}