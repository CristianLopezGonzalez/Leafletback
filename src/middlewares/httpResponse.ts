import { HttpStatusCode } from '../types/statusCodes';
import { Response } from 'express';

export class HttpResponse {

    OK(res: Response, data?: unknown, message?: string): Response {
        return res.status(HttpStatusCode.OK).json({
            status: HttpStatusCode.OK,
            message: message || 'Request successful',
            data: data,
        })
    }

    CREATED(res: Response, data?: unknown, message?: string): Response {
        return res.status(HttpStatusCode.CREATED).json({
            status: HttpStatusCode.CREATED,
            message: message || 'Resource created successfully',
            data: data,
        })
    }

    BAD_REQUEST(res: Response, message?: string): Response {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            status: HttpStatusCode.BAD_REQUEST,
            message: message || 'Bad request',
        })
    }

    UNAUTHORIZED(res: Response, message?: string): Response {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
            status: HttpStatusCode.UNAUTHORIZED,
            message: message || 'Unauthorized',
        })
    }

    FORBIDDEN(res: Response, message?: string): Response {
        return res.status(HttpStatusCode.FORBIDDEN).json({
            status: HttpStatusCode.FORBIDDEN,
            message: message || 'Forbidden',
        })
    }

    NOT_FOUND(res: Response, message?: string): Response {
        return res.status(HttpStatusCode.NOT_FOUND).json({
            status: HttpStatusCode.NOT_FOUND,
            message: message || 'Resource not found',
        })
    }

    INTERNAL_SERVER_ERROR(res: Response, message?: string): Response {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: message || 'Internal server error',
        })
    }

}

