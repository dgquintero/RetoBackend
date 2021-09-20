import { DEPENDENCY_CONTAINER, TYPES } from '@setup';
import { ISamplePostgresDao } from '@application/infrastructure-interfaces/postgres';

export const checkConnection = (): Promise<string> => {
    const samplePostgresDao = DEPENDENCY_CONTAINER.get<ISamplePostgresDao>(TYPES.SamplePostgresDao);
    return samplePostgresDao.sample();
};
