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

	// single = async (eventId: number, userId: number) => {
	// 	const sql = `SELECT
	// 		e.id,
	// 		t.name,
	// 		e.start_date,
	// 		e.end_date,
	// 		e.duration,
	// 		e.is_active,
	// 		COUNT(q.id) AS questions,
	// 		a.first_name,
	// 		a.last_name
	// 	FROM wee_tests_events e
	// 	LEFT JOIN wee_tests t ON t.id = e.test_id
	// 	LEFT JOIN wee_tests_groups tg ON tg.test_id = t.id
	// 	LEFT JOIN wee_groups_users gu ON gu.group_id = tg.group_id
	// 	LEFT JOIN wee_users a ON a.id = t.created_by
	// 	LEFT JOIN wee_tests_questions q ON q.test_id = t.id
	// 	WHERE gu.user_id = ? AND e.id = ?`;

	// 	const data = await this.db.query(sql, [userId, eventId]);

	// 	if (data && data[0]) {
	// 		const row = data[0];
	// 		return {
	// 			id: row.id,
	// 			name: row.name,
	// 			startDate: format(new Date(row.start_date), 'yyyy-MM-dd HH:mm'),
	// 			endDate: format(new Date(row.end_date), 'yyyy-MM-dd HH:mm'),
	// 			duration: row.duration,
	// 			questions: row.questions,
	// 			administrator: row.first_name + ' ' + row.last_name,
	// 			isActive: row.is_active
	// 		}
	// 	}
	// }
}

export default new Event();