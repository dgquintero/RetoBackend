import { Router } from 'express';
import sampleRouter from './SampleRouter';
import healthCheckRouter from './HealthCheckRouter';

const routes = Router();
routes.use('/health', healthCheckRouter);
routes.use('/samples', sampleRouter);

export default routes;
