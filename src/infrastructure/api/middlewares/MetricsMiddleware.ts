import promBundle from 'express-prom-bundle';

export const metricsMiddleware = promBundle({
    includeMethod: true,
    buckets: [0.5, 1, 2, 5, 10],
    includePath: true,
});
