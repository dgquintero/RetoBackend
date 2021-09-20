import { Request, Response, NextFunction } from 'express';
import { ApiErrorResponse, IError, PostgresError, UnkownError, RuntimeError } from '@application/core';

export const errorMiddleware = (
    error: ApiErrorResponse | IError,
    req: Request,
    res: Response,
    _next: NextFunction,
): Response | void => {
    if (error instanceof ApiErrorResponse) return error.send(req, res);
    if (error?.code) {
        const postgresError = new PostgresError(error.code, error.message);
        return postgresError.send(req, res);
    }
    if (error.message.includes('Cannot read property') || error.message.includes('JSON at position'))
        return new RuntimeError(
            error.message,
            'Runtime Error: Ocurrió un error en el tiempo de ejecución, por favor revisar',
        ).send(req, res);
    return new UnkownError(
        error.message,
        'Error: por favor intente nuevamente, si el problema persiste por favor comunicarse con Mesa de Ayuda',
    ).send(req, res);
};
