import { db } from '../Db';

abstract class Model {
    public db:any = null;

    constructor() {
        this.db = db;
    }

    nextTableId = async (table: string): Promise<number> => {
        const sql = `SELECT MAX(id)+1 AS id FROM ${table}`;
        const data: any = await this.db.query(sql);

        return Number(data[0].id);
    }

    // getFoundRows = async (): Promise<number> => {
    //     const sql = `SELECT FOUND_ROWS() AS \`records_filtered\``;
    //     const data: any = await this.db.query(sql);

    //     return Number(data[0].records_filtered);
    // }

    // prepareParams = (arr: string[]): string => arr.map((): string => '?').join(',');

    // getLimit = (page: number, rowsPerPage: number): (string|number) => {
    //     return page && rowsPerPage
    //       ? `${page * rowsPerPage}, ${rowsPerPage}`
    //       : 25;
    // }
}

export default Model;