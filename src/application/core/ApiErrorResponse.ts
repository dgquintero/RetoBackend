import { ApiResponse, StatusCode, ErrorCode } from '@application/core';

export abstract class ApiErrorResponse extends ApiResponse<null> {
    constructor(status: StatusCode, code: ErrorCode, stack: string, message: string) {
        super(true, status, code, stack, message);
    }
}

export class NotFoundError extends ApiErrorResponse {
    url: string;
    constructor(stack: string, url: string) {
        super(StatusCode.NOT_FOUND, ErrorCode.FAILURE, stack, 'Resource Not Found');
        this.url = url;
    }
}

export class BadRequestError extends ApiErrorResponse {
    constructor(stack: string, message: string) {
        super(StatusCode.BAD_REQUEST, ErrorCode.FAILURE, stack, message);
    }
}

export class BadRequestPubSubError extends ApiErrorResponse {
    constructor(stack: string, message: string) {
        super(StatusCode.OK, ErrorCode.FAILURE, stack, message);
    }
}

export class UnkownError extends ApiErrorResponse {
    constructor(stack: string, message: string) {
        super(StatusCode.INTERNAL_ERROR, ErrorCode.RETRY, stack, message);
    }
}

export class RuntimeError extends ApiErrorResponse {
    constructor(stack: string, message: string) {
        super(StatusCode.OK, ErrorCode.RETRY, stack, message);
    }
}

export class OvertimeError extends ApiErrorResponse {
    constructor(stack: string, message: string) {
        super(StatusCode.OK, ErrorCode.API_ERROR_TIMEOUT, stack, message);
    }
}

export class PostgresError extends ApiErrorResponse {
    constructor(code: number | string, stack: string) {
        const message = 'Postgres Error: Intentar nuevamente, si el problema persiste avisar a Mesa de Ayuda';
        switch (code) {
            case 'P0001':
                super(StatusCode.OK, ErrorCode.POSTGRES_RAISE_EXCEPTION, 'Raise Exception', stack);
                break;
            case '23505':
                super(
                    StatusCode.OK,
                    ErrorCode.POSTGRES_INSERTING_DUPLICATE_PKEY,
                    stack,
                    'Intentando insertar llave única duplicada',
                );
                break;
            case '23514':
                super(
                    StatusCode.OK,
                    ErrorCode.POSTGRES_CHECK_VIOLATION,
                    stack,
                    'Acción viola una restricción de la tabla',
                );
                break;
            case '23502':
                super(
                    StatusCode.OK,
                    ErrorCode.POSTGRES_NOT_NULL_VIOLATION,
                    stack,
                    'Insertando una llave nula que no puede serlo',
                );
                break;
            case '42883':
                super(StatusCode.OK, ErrorCode.POSTGRES_UNDEFINED_FUNCTION, stack, 'llamado a funcion Inexistente');
                break;
            case '42P01':
                super(StatusCode.OK, ErrorCode.POSTGRES_UNDEFINED_TABLE, stack, 'llamado a tabla Inexistente');
                break;
            case '42P02':
                super(StatusCode.OK, ErrorCode.POSTGRES_UNDEFINED_PARAMETER, stack, 'llamado a parametro Inexistente');
                break;
            case '42704':
                super(StatusCode.OK, ErrorCode.POSTGRES_UNDEFINED_OBJECT, stack, 'llamado a objeto Inexistente');
                break;
            case '42703':
                super(StatusCode.OK, ErrorCode.POSTGRES_UNDEFINED_COLUMN, stack, 'llamado a columna Inexistente');
                break;
            case '57014':
                super(StatusCode.INTERNAL_ERROR, ErrorCode.POSTGRES_QUERY_CANCELLED, stack, message);
                break;
            case 'ECONNREFUSED':
                super(StatusCode.SERVICE_UNAVAILABLE, ErrorCode.POSTGRES_CONNECTION_FAILED, stack, message);
                break;
            default:
                super(StatusCode.INTERNAL_ERROR, ErrorCode.RETRY, stack, message);
                break;
        }
    }
}
