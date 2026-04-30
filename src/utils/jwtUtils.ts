import jwt from 'jsonwebtoken';
import {JwtPayload} from '../types/index'
import {config} from '../config/config'

export class JwtUtils {


    // Metodos para access token
    static crearToken(payloasd:JwtPayload):string{
        return jwt.sign(payloasd, config.JWT_SECRET, {expiresIn: '1h'})
    }

    static verificarToken(token:string):JwtPayload{
        try {
            return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
        }catch (error) {
            throw new Error('Token inválido')
        }
    }

    // Metodos para refresh token
    static crearRefreshToken(payload:JwtPayload):string{
        return jwt.sign(payload, config.JWT_REFRESH_SECRET, {expiresIn: '7d'})
    }

    static verificarRefreshToken(token:string):JwtPayload{
        try {
            return jwt.verify(token, config.JWT_REFRESH_SECRET) as JwtPayload;
        }catch (error) {
            throw new Error('Refresh token inválido')
        }
    }

}