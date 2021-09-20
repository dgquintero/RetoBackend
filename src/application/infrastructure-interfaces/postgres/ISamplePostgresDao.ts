export interface ISamplePostgresDao {
    sample(): Promise<string>;
}
