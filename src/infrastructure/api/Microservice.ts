// libraries
import dotenv from 'dotenv';
dotenv.config();
import 'module-alias/register';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@setup';
import routes from '@infrastructure/api/routers';
import { middlewares, errorMiddleware, metricsMiddleware } from '@infrastructure/api/middlewares';
import { NotFoundError } from '@application/core';

export const application: Application = express();

const getURI = (): string => {
    const URI = process.env.URI;
    return URI ? `/${URI}` : '';
};

// middlewares
application.use(metricsMiddleware);
middlewares(application);

// docs
application.use(`${getURI()}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
application.use(`${getURI()}/api/v1`, routes);
application.use((req, _res, next) => next(new NotFoundError('Route Not Found', req.originalUrl)));

// custom middlewares
application.use(errorMiddleware);
