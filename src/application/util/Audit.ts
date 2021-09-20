import { AuditLog } from '@application/models';

export const logging = <T>(model: AuditLog<T>): void => {
    console.log(`Logging: ${JSON.stringify(model, null, 2)}`);
};
