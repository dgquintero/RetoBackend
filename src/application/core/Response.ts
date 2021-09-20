import { Response, Request } from 'express';
import { logging } from '@application/util';
import { AuditLog } from '@application/models';
import { parse, decode } from '@util';

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    PRECONDITION_FAILED = 412,
    I_AM_A_TEAPOT = 418,
    PRECONDITION_REQUIRED = 428,
    INTERNAL_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
}

export enum ErrorCode {
    UNKNOWN = 'U001',
    SUCCESS = 'S001',
    FAILURE = '10001',
    RETRY = '10002',
    API_ERROR = 'A001',
    API_ERROR_TIMEOUT = 'A002',
    INVALID_ACCESS_TOKEN = '10003',
    POSTGRES_RAISE_EXCEPTION = 'P0001',
    POSTGRES_CONNECTION_FAILED = 'ECONNREFUSED',
    POSTGRES_INSERTING_DUPLICATE_PKEY = '23505',
    POSTGRES_CHECK_VIOLATION = '23514',
    POSTGRES_NOT_NULL_VIOLATION = '23502',
    POSTGRES_QUERY_CANCELLED = '57014',
    POSTGRES_UNDEFINED_FUNCTION = '42883',
    POSTGRES_UNDEFINED_TABLE = '42P01',
    POSTGRES_UNDEFINED_PARAMETER = '42P02',
    POSTGRES_UNDEFINED_OBJECT = '42704',
    POSTGRES_UNDEFINED_COLUMN = '42703',
}

const buildAuditResponse = <T>(model: ApiResponse<T>, req: Request): AuditLog<T> => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    return {
        application: 'REPLACE_THIS_WITH_PROJECT_NAME',
        payload: { ...req.params, ...req.query, ...req.body },
        buffer: parse(decode(req.body?.message?.data ?? 'eyJ0aW1lc3RhbXAiOiIyMDIwLTEyLTA3VDIyOjI3OjQ3LjgwN1oifQ==')),
        response: { ...model },
        id: req.id,
        url,
        method: req.method,
        user_agent: req.get('user-agent') ?? null,
        timestamp: Date.now(),
    };
};

export abstract class ApiResponse<T> {
    isError: boolean;
    status: StatusCode;
    code: ErrorCode;
    stack: string | null;
    message: string;
    data?: T | null;
    // eslint-disable-next-line max-params
    constructor(
        isError: boolean,
        status: StatusCode,
        code: ErrorCode,
        stack: string | null,
        message: string,
        data?: T,
    ) {
        this.isError = isError;
        this.status = status;
        this.code = code;
        this.message = message;
        this.stack = stack;
        this.data = data ?? null;
    }

    protected prepare(req: Request, res: Response): Response {
        logging(buildAuditResponse(this, req));
        return res.status(this.status).json({ ...this, id: req.id, timestamp: Date.now() });
    }

    public send(req: Request, res: Response): Response {
        return this.prepare(req, res);
    }
}
