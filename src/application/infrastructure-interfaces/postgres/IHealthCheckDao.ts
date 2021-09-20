export interface IHealthCheckDao {
    query(): Promise<[boolean, string]>;
}
