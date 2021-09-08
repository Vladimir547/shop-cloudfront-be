import { Client } from 'pg';


const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
export const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
};
export class ConnectDB {
    constructor() {
        this.client = new Client(dbOptions);
    }

    async connect() {
        await this.client.connect();
        return this.client;
    }

    async disconnect() {
        await this.client.end();
    }

    async createTable(tableName, config) {
        await this.client.query(`
  create table if not exist ${tableName} (
    ${config}
  )`);
    }


    async getList(tableName) {
        const { rows } = await this.client.query(select * from `${tableName}`);
        return rows;
    }
}