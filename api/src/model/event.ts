import Model from './model'
import { CRUD } from 'interface/crud';
import { Event as EventInterface } from '../interface/test'
import { format } from 'date-fns'

class Event extends Model /*implements CRUD*/ {
	add = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_tests_events (id, test_id, start_date, end_date, duration, is_active) VALUES (?, ?, ?, ?, ?, ?)`;
		const data = await this.db.query(sql, body);

		if (data) {
			return {
				id: data?.insertId,
			}
		}
	}

	save = async (id: number, body: any /* interface */) => {
		const sql = `UPDATE wee_tests_events SET start_date = ?, end_date = ?, duration = ?, is_active = ? WHERE id = ?`;
		const data = await this.db.query(sql, [...body, id]);

		if (data) {
			return true;
		}
	}

	delete = async (id: number) => {
		const sql = `DELETE FROM wee_tests_events WHERE id = ?`;
		const data = await this.db.query(sql, [id]);

		if (data) {
			return true;
		}
	}
}

export default new Event();