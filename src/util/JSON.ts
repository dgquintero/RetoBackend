import { BadRequestError, BadRequestPubSubError } from '@application/core';

export const parse = <T>(data: string, pubsub = true): T => {
    try {
        return JSON.parse(data);
    } catch (error) {
        const newError = !pubsub
            ? new BadRequestError(error.message, 'Json Invalido')
            : new BadRequestPubSubError(error.message, '');
        throw newError;
    }
};

export const hasOptionalFields = (obj: Record<string, unknown>, size = 2): boolean => Object.keys(obj).length >= size;

export const deleteFalsyValues = (obj: Record<string, unknown>): Record<string, unknown> => {
    const entries = Object.entries(obj);
    return Object.fromEntries(entries.filter(([, value]) => typeof value !== 'boolean' && !!value));
};
