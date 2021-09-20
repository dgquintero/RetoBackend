export interface AuditLog<T> {
    application: string;
    payload: Payload;
    response: Response<T>;
    id: string;
    url: string;
    method: string;
    timestamp: number;
    buffer: Record<string, unknown>;
    user_agent?: string | null;
}

export interface Payload {
    terminal: string;
}

export interface Response<T> {
    isError: boolean;
    status: number;
    code: string;
    message: string;
    stack: string | null;
    data?: T | null;
}
