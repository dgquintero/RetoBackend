import 'reflect-metadata';
import { Router, Request, Response } from 'express';
import { DEPENDENCY_CONTAINER } from '@setup';
import { asyncHandler } from '@infrastructure/api/helpers';
import { SuccessOKResponse, UnkownError } from '@application/core';
import { SampleService } from '@application/services';

const router = Router();

const sleep = (ms: number): Promise<boolean> => {
    return new Promise((resolve) => setTimeout(() => resolve(true), ms));
};

const sample = async (req: Request, res: Response): Promise<Response | void> => {
    const sampleService = DEPENDENCY_CONTAINER.get(SampleService);
    const response = await sampleService.sample(req.url);
    return new SuccessOKResponse(response).send(req, res);
};

const fast = async (req: Request, res: Response): Promise<Response | void> => {
    if (Math.random() > 0.2) {
        return new SuccessOKResponse({ status: 'ok' }).send(req, res);
    }
    return new UnkownError('', '').send(req, res);
};

const slow = async (req: Request, res: Response): Promise<Response | void> => {
    await sleep(4000);
    return new SuccessOKResponse({ status: 'ok' }).send(req, res);
};

router.get('/', asyncHandler(sample));
router.get('/fast', asyncHandler(fast));
router.get('/slow', asyncHandler(slow));

export default router;
