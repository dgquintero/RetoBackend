import { ApiResponse, StatusCode, ErrorCode } from '@application/core';

export abstract class ApiSuccessResponse<T> extends ApiResponse<T> {
    constructor(status: StatusCode, code: ErrorCode, data?: T, message?: string) {
        super(false, status, code, null, message || 'Successful Operation', data);
    }
}

export class SuccessOKResponse<T> extends ApiSuccessResponse<T> {
    constructor(data: T, message?: string) {
        super(StatusCode.OK, ErrorCode.SUCCESS, data, message);
    }
}

export class SuccessCreatedResponse<T> extends ApiSuccessResponse<T> {
    constructor(data: T) {
        super(StatusCode.CREATED, ErrorCode.SUCCESS, data);
    }
}
