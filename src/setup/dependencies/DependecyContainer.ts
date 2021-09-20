import { Container } from 'inversify';
import { SampleService } from '@application/services';
import { IDatabase, IMain } from 'pg-promise';
import { cm } from '@infrastructure/repositories';
import { TYPES } from './Types';
import { IHealthCheckDao, ISamplePostgresDao } from '@application/infrastructure-interfaces';
import { HealthCheckDao, SamplePostgresDao } from '@infrastructure/repositories';
export const DEPENDENCY_CONTAINER = new Container();

DEPENDENCY_CONTAINER.bind(SampleService).toSelf().inSingletonScope();
DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.Postgresql).toConstantValue(cm);
DEPENDENCY_CONTAINER.bind<ISamplePostgresDao>(TYPES.SamplePostgresDao).to(SamplePostgresDao);
DEPENDENCY_CONTAINER.bind<IHealthCheckDao>(TYPES.HealthCheckDao).to(HealthCheckDao);
