import mysql2, { Connection } from 'mysql2';
import { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } from './config';

class Db {
    connection: Connection;
    isInit: boolean;

    constructor() {
        this.isInit = false;
        this.init();
    }

    init = (): this => {
        if (!this.isInit) {
            try {
                this.connection = mysql2.createConnection({
                    host: DB_HOST,
                    user: DB_USER,
                    password: DB_PASS,
                    database: DB_DATABASE
                });

                this.checkConnection();
                this.isInit = true;
                return this;
            } catch (e) {
                console.error('Database connection error.\n' + e);
                process.exit();
            }
        } else throw new Error('Database connection is already initialised.\nTry to use getConnection() method.')
    }

    checkConnection = async () => {
        const result = await this.query('SELECT 1').catch(e => { throw e; });

        return result;
    }

    getInstance = (): this => this;
    getConnection = (): Connection => this.connection;
    closeConnection = () => this.connection.end();

    query = async (sql: string, values?: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            const callback = (error: any, result: any) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            // execute will internally call prepare and query
            this.connection.execute(sql, values, callback);
        }).catch((err: any) => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code)
                ? HttpStatusCodes[err.code]
                : err.status;

            throw err;
        });
    }
}

const HttpStatusCodes: any = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});

export const db = new Db();