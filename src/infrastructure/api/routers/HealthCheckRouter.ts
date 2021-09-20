import 'reflect-metadata';
import os from 'os';
import https from 'https';
import { performance } from 'perf_hooks';
import { Router, Request, Response } from 'express';
import { DEPENDENCY_CONTAINER, TYPES } from '@setup';
import { asyncHandler } from '@infrastructure/api/helpers';
import { IHealthCheckDao } from '@application/infrastructure-interfaces';

const router = Router();

const validateConnection = (): Promise<[boolean, number]> => {
    const start = performance.now();
    return new Promise((resolve) => {
        https
            .get('https://www.google.com', (res) => {
                res.on('data', (chunk) => chunk);

                res.on('end', () => {
                    const end = performance.now();
                    resolve([false, end - start]);
                });
            })
            .on('error', () => {
                resolve([true, 0]);
            });
    });
};

const healthCheck = async (_req: Request, res: Response): Promise<Response | void> => {
    const healthCheckDao = DEPENDENCY_CONTAINER.get<IHealthCheckDao>(TYPES.HealthCheckDao);
    const [[connError, millis], [dbError]] = await Promise.all([validateConnection(), healthCheckDao.query()]);
    const isError = dbError || connError;
    res.status(!isError ? 200 : 500).json({
        host: os.hostname(),
        status: !isError ? 'HEALTHY' : 'UNHEALTHY',
        db: !dbError ? 'HEALTHY' : 'UNHEALTHY',
        connection: !connError ? `${millis.toFixed(3)}ms` : 'UNHEALTHY',
    });
};

router.get('/', asyncHandler(healthCheck));
router.post('/', asyncHandler(healthCheck));

export default router;
