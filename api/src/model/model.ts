import { db } from '../Db';
import { format } from 'date-fns'

abstract class Model {
	public db:any = null;

	constructor() {
		this.db = db;
	}

	nextTableId = async (table: string): Promise<number> => {
		const sql = `SELECT MAX(id) AS id FROM ${table}`;
		const data: any = await this.db.query(sql);

		return Number(data[0].id) + 1;;
	}

	prepareParams = (arr: any[]) => arr ? `(${new Array(arr.length).fill('?').join()})` : null;

	prepareUserDateTime = async (
		firstName: string,
		lastName: string,
		datetime: string
	): Promise<string> => {
		const formattedDatetime = datetime ? format(new Date(datetime), 'yyyy-MM-dd HH:mm') : null;

		return firstName && lastName
			? `${firstName} ${lastName}, ${formattedDatetime}`
			: formattedDatetime
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