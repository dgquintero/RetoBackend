import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER } from '@setup';
import { IDatabase, IMain } from 'pg-promise';
import { TYPES } from '@setup/dependencies/Types';
import { ISamplePostgresDao } from '@application/infrastructure-interfaces';

@injectable()
export class SamplePostgresDao implements ISamplePostgresDao {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.Postgresql);

    public async sample(): Promise<string> {
        try {
            const query = `SELECT 1`;
            await this.db.query(query);
            return 'connected successfully!';
        } catch (error) {
            return `couldn't connect to ${process.env.POSTGRES_HOST}, check the .env file!`;
        }
    }
}
