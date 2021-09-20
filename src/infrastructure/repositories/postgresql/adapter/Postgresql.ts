import dotenv from 'dotenv';
dotenv.config();
import { IMain, IDatabase } from 'pg-promise';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
import pgPromise from 'pg-promise';

const PG_CONECTION: IConnectionParameters = {
    host: process.env.POSTGRES_HOST,
    port: process.env.PG_PORT ? Number(process.env.PG_PORT) : 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    connectionTimeoutMillis: 800,
    max: 30,
    idleTimeoutMillis: 3000,
    query_timeout: 2500,
};
const pgp: IMain = pgPromise();
export const cm = pgp(PG_CONECTION) as IDatabase<IMain>;
