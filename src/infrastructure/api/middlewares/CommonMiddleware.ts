import { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import methodOverride from 'method-override';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
import { nanoid } from 'nanoid';
import compression from 'compression';

const requestId = (req: Request, _res: Response, next: NextFunction) => {
    req.id = nanoid(15);
    next();
};

export const middlewares = (application: Application): void => {
    application.disable('x-powered-by');
    application.disable('etag');
    application.use(requestId);
    application.use(cors());
    application.use(json({ limit: '10mb' }));
    application.use(
        urlencoded({
            extended: true,
            limit: '10mb',
            parameterLimit: 1000000,
        }),
    );
    application.use(
        morgan('tiny', {
            skip: (_req, res) => res.statusCode < 400,
        }),
    );
    application.use(compression());
    application.use(methodOverride());
    application.use(helmet());
};
