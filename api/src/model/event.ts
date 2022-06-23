import Model from './model'
import { CRUD } from 'interface/crud';
import { Answers as AnswersInterface } from '../interface/event'
import { SimpleGroup as GroupInterface } from '../interface/group'
import { format, formatISO, addMinutes } from 'date-fns'

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

	single = async (id: number) => {
		const sql = `SELECT
			t.name AS test_name,
			e.start_date,
			e.end_date,
			e.duration,
			e.is_active,
			c.first_name AS created_by_first_name,
			c.last_name AS created_by_last_name,
			m.first_name AS modified_by_first_name,
			m.last_name AS modified_by_last_name
		FROM wee_tests_events e
		LEFT JOIN wee_tests t ON t.id = e.test_id
		LEFT JOIN wee_users c ON c.id = t.created_by
		LEFT JOIN wee_users m ON m.id = t.modified_by
		WHERE e.id = ?`;

		const data = await this.db.query(sql, [id]);

		if (data && data[0]) {
			const event = data[0];
			return {
				id: event.id,
				testName: event.test_name,
				startDate: event.start_date,
				endDate: event.end_date,
				duration: event.duration,
				isActive: event.is_active,
				recordAdministrator: this.prepareUserDateTime(
					event.created_by_first_name,
					event.created_by_last_name,
					event.created_on
				),
				recordModification: this.prepareUserDateTime(
					event.created_by_first_name,
					event.created_by_last_name,
					event.created_on
				),
			}
		}
	}

	getAssessment = async (eventId: number, userId: number) => {
		const sql = `SELECT
			e.id,
			t.name,
			e.duration,
			e.start_date AS event_start_date,
			e.end_date AS event_end_date,
			e.is_active AS is_event_active,
			COUNT(DISTINCT q.id) AS questions,
			adm.first_name,
			adm.last_name,
			a.user_finished,
			a.id AS assessment_id,
			a.id IS NOT NULL AS assessment_started,
			a.start_date,
			a.end_date
		FROM wee_tests_events e
		LEFT JOIN wee_tests t ON t.id = e.test_id
		LEFT JOIN wee_events_groups eg ON eg.event_id = e.id
		LEFT JOIN wee_groups_users gu ON gu.group_id = eg.group_id
		LEFT JOIN wee_tests_assessments a ON a.event_id = e.id AND a.user_id = gu.user_id
		LEFT JOIN wee_users adm ON adm.id = t.created_by
		LEFT JOIN wee_tests_questions q ON q.test_id = t.id
		WHERE gu.user_id = ? AND e.id = ? GROUP BY e.id`;

		const data = await this.db.query(sql, [userId, eventId]);

		if (data && data[0]) {
			const row = data[0];
			const eventStartDate = new Date(row.event_start_date);
			const eventEndDate = new Date(row.event_end_date);
			const startDate = new Date(row.start_date);
			const endDate = new Date(row.end_date);
			const expectedEndDate = addMinutes(startDate, row.duration);
			const nowTimestamp = new Date().getTime();

			const isEventActive = Number(
				row.is_event_active &&
				row.event_start_date &&
				row.event_end_date &&
				(eventStartDate.getTime() <= nowTimestamp) &&
				(nowTimestamp <= eventEndDate.getTime())
			);

			const isActive = Number(
				row.start_date &&
				(startDate.getTime() <= nowTimestamp) &&
				(nowTimestamp <= expectedEndDate.getTime())
			)

			return {
				id: row.id,
				assessmentId: row.assessment_id,
				testName: row.name,
				startDate: row.start_date ? formatISO(startDate) : null,
				expectedEndDate: row.start_date ? formatISO(expectedEndDate) : null,
				endDate: row.end_date ? formatISO(endDate) : null,
				eventStartDate: row.event_start_date ? formatISO(eventStartDate) : null,
				eventEndDate: row.event_end_date ? formatISO(eventEndDate) : null,
				duration: row.duration,
				questions: row.questions,
				administrator: row.first_name + ' ' + row.last_name,
				isEventActive,
				isActive,
				userFinished: Number(row.user_finished),
				assessmentStarted: Number(row.assessment_started)
			}
		}
	}

	getParticipants = async (id: number) => {
		const sql = `SELECT COUNT(id) AS participants FROM wee_tests_assessments a WHERE event_id = ?`;
		const data = await this.db.query(sql, [id]);

		if (data && data[0])
			return data[0].participants;

	}

	getTotalUsers = async (id: number) => {
		const sql = `SELECT COUNT(DISTINCT gu.user_id) AS total_users FROM wee_events_groups eg LEFT JOIN wee_groups_users gu ON gu.group_id = eg.group_id WHERE eg.event_id = ?`;
		const data = await this.db.query(sql, [id]);

		if (data && data[0])
			return data[0].total_users;

	}

	getAnswers = async (id: number, userId?: number) => {
		const sql = `SELECT
				qa.id AS answer_id,
				q.id AS question_id,
				ans.answer_id IS NOT NULL AS is_correct
			FROM wee_tests_questions q
				LEFT JOIN wee_tests_events e ON q.test_id = e.test_id
				LEFT JOIN wee_questions_answers qa ON qa.question_id = q.id AND qa.checked = 1
				LEFT JOIN wee_tests_assessments a ON a.event_id = e.id AND a.user_id = ?
				LEFT JOIN wee_tests_assessments_answers ans ON ans.assessment_id = a.id AND ans.question_id = q.id AND ans.answer_id = qa.id
			WHERE e.id = ?`;
		const data = await this.db.query(sql, [userId, id]);
		const answers: any = {};

		if (data) {
			for (const row of data) {
				if (answers[row.question_id]?.length) {
					answers[row.question_id].push({ answerId: row.answer_id, isCorrect: row.is_correct });
				} else {
					answers[row.question_id] = [{ answerId: row.answer_id, isCorrect: row.is_correct }];
				}

			}

			return answers;
		}
	}

	getAllUsersAnswers = async (id: number) => {
		const sql = `SELECT
				a.user_id,
				ans.question_id,
				ans.answer_id,
				qa.id IS NOT NULL AS is_correct
			FROM wee_tests_assessments_answers ans
				LEFT JOIN wee_tests_assessments a ON a.id = ans.assessment_id
				LEFT JOIN wee_questions_answers qa ON qa.id = ans.answer_id AND qa.question_id = ans.question_id AND qa.checked = 1
			WHERE a.event_id = ?`;
		const data = await this.db.query(sql, [id]);
		const users: any = {};

 		if (data) {
			for (const row of data) {
				if (users[row.user_id]) {
						if (users[row.user_id][row.question_id]?.length) {
						users[row.user_id][row.question_id].push({
							answerId: row.answer_id,
							isCorrect: row.is_correct
						});
					} else {
						users[row.user_id] = {...users[row.user_id], [row.question_id]: [{
							answerId: row.answer_id,
							isCorrect: row.is_correct
						}] }
					}
				} else {
					users[row.user_id] = { [row.question_id]: [{
						answerId: row.answer_id,
						isCorrect: row.is_correct
					}] };
				}
			}

			return users;
		}
	}

	groups = async (id: number) => {
		const sql = `SELECT
			g.id,
			g.name
		FROM wee_groups g
		LEFT JOIN wee_events_groups eg ON eg.group_id = g.id
		WHERE g.is_active = 1 AND eg.event_id = ?
		ORDER BY g.name`;

		const data = await this.db.query(sql, [id]);

		if (data) {
			return data.map((row: GroupInterface) => ({
				id: row.id,
				name: row.name
			}));
		}
	}

	addGroup = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_events_groups (group_id, event_id) VALUES (?, ?)`;
		const data = await this.db.query(sql, body);

		if (data) {
			return true;
		}
	}

	removeGroup = async (body: any /* interface */) => {
		const sql = `DELETE FROM wee_events_groups WHERE group_id = ? AND event_id = ?`;
		const data = await this.db.query(sql, body);

		if (data) {
			return true;
		}
	}

	getTestId = async (id: number) => {
		const sql = `SELECT DISTINCT test_id FROM wee_tests_events WHERE id = ?`;
		const data = await this.db.query(sql, [id]);

		if (data)
			return Number(data[0].test_id);
	}

	getAssessmentId = async (id: number, userId: number) => {
		const sql = `SELECT DISTINCT id FROM wee_tests_assessments WHERE event_id = ? AND user_id = ? ORDER BY start_date DESC LIMIT 1`;
		const data = await this.db.query(sql, [id, userId]);

		if (data)
			return Number(data[0].id);
	}
}

export default new Event();