export interface IEnvironments<T> {
    [key: string]: T;
    development: T;
    testing: T;
    trainning: T;
    beta: T;
    production: T;
}
