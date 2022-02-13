import Model from './model'
import { CRUD } from 'interface/crud';
import { Test as TestInterface } from '../interface/test'
import { format } from 'date-fns'

class Test extends Model /*implements CRUD*/ {
	add = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_tests (id, name, start_date, end_date, duration, is_active, show_scores, created_by, created_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
		const data = await this.db.query(sql, body);

		if (data) {
			return {
				id: data?.insertId,
			}
		}
	}

	list = async () => {
		const sql = `SELECT
			t.id,
			t.name,
			GROUP_CONCAT(DISTINCT g.name SEPARATOR ", ") AS 'group_name',
			t.start_date,
			t.end_date,
			t.duration,
			t.show_scores,
			t.is_active,
			COUNT(gu.user_id) AS participants,
			t.created_on
		FROM wee_tests t
		LEFT JOIN wee_tests_groups tg ON tg.test_id = t.id
		LEFT JOIN wee_groups g ON g.id = tg.group_id
		LEFT JOIN wee_groups_users gu ON gu.group_id = g.id
		GROUP BY t.id`;

		const data = await this.db.query(sql);

		if (data) {
			return data.map((row: TestInterface) => ({
				id: row.id,
				name: row.name,
				groupName: row.group_name,
				startDate: format(new Date(row.start_date), 'yyyy-MM-dd HH:mm'),
				endDate: format(new Date(row.end_date), 'yyyy-MM-dd HH:mm'),
				duration: row.duration,
				showScores: row.show_scores,
				isActive: row.is_active,
				createdOn: format(new Date(row.created_on), 'yyyy-MM-dd HH:mm')
			}));
		}
	}
}

export default new Test();