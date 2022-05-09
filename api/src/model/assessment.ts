import Model from './model'
import { CRUD } from 'interface/crud';
import { formatISO, addMinutes } from 'date-fns'

class Assessment extends Model /*implements CRUD*/ {
	single = async (eventId: number, userId: number) => {
		const sql = `SELECT
			e.id,
			t.name,
			e.duration,
			e.start_date AS event_start_date,
			e.end_date AS event_end_date,
			e.is_active AS is_event_active,
			COUNT(q.id) AS questions,
			adm.first_name,
			adm.last_name,
			a.is_active,
			a.start_date,
			a.end_date
		FROM wee_tests_events e
		LEFT JOIN wee_tests t ON t.id = e.test_id
		LEFT JOIN wee_tests_groups tg ON tg.test_id = t.id
		LEFT JOIN wee_groups_users gu ON gu.group_id = tg.group_id
		LEFT JOIN wee_tests_assessments a ON a.event_id = e.id AND a.user_id = gu.user_id
		LEFT JOIN wee_users adm ON a.id = t.created_by
		LEFT JOIN wee_tests_questions q ON q.test_id = t.id
		WHERE gu.user_id = ? AND e.id = ? GROUP BY e.id`;

		const data = await this.db.query(sql, [userId, eventId]);

		if (data && data[0]) {
			const row = data[0];
			const eventStartDate = new Date(row.event_start_date);
			const eventEndDate = new Date(row.event_end_date);
			const startDate = new Date(row.start_date);
			const endDate = new Date(row.end_date);
			const expectedEndDate = addMinutes(new Date(row.start_date), row.duration);
			const nowTimestamp = new Date().getTime();

			const isEventActive = Number(
				row.is_event_active &&
				row.event_start_date &&
				row.event_end_date &&
				(eventStartDate.getTime() <= nowTimestamp) &&
				(nowTimestamp <= eventEndDate.getTime())
			);

			const isActive = Number(
				// row.is_active &&
				row.start_date &&
				(startDate.getTime() <= nowTimestamp) &&
				(nowTimestamp <= expectedEndDate.getTime())
			)

			return {
				id: row.id,
				name: row.name,
				startDate: row.start_date ? formatISO(startDate) : null,
				expectedEndDate: row.start_date ? formatISO(expectedEndDate) : null,
				endDate: row.end_date ? formatISO(endDate) : null,
				eventStartDate: row.event_start_date ? formatISO(eventStartDate) : null,
				eventEndDate: row.event_end_date ? formatISO(eventEndDate) : null,
				duration: row.duration,
				questions: row.questions,
				administrator: row.first_name + ' ' + row.last_name,
				isEventActive,
				isActive
			}
		}
	}

	start = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_tests_assessments (id, event_id, user_id, start_date, end_date, is_active, created_on, created_by) VALUES (?, ?, ?, NOW(), NULL, 1, NOW(), ?)`;
		const data = await this.db.query(sql, body);

		if (data) {
			return {
				id: data?.insertId,
			}
		}
	}
}

export default new Assessment();