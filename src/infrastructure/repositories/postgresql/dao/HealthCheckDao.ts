import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER } from '@setup';
import { IDatabase, IMain } from 'pg-promise';
import { TYPES } from '@setup/dependencies/Types';
import { IHealthCheckDao } from '@application/infrastructure-interfaces';

@injectable()
export class HealthCheckDao implements IHealthCheckDao {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.Postgresql);

    public async query(): Promise<[boolean, string]> {
        try {
            const query = `SELECT 1`;
            await this.db.one(query);
            return [false, 'OK'];
        } catch (error) {
            return [true, error.message];
        }
    }
}
