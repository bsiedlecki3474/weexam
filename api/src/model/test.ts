import Model from './model'
import { CRUD } from 'interface/crud';
import { Test as TestInterface } from '../interface/test'
import { Event as EventInterface } from '../interface/test'
import { Question as QuestionInterface } from '../interface/question'
import { format, formatISO } from 'date-fns'

import question from './question'

class Test extends Model /*implements CRUD*/ {
	add = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_tests (id, name, is_active, show_scores, created_by, created_on) VALUES (?, ?, ?, ?, ?, NOW())`;
		const data = await this.db.query(sql, body);

		if (data) {
			return {
				id: data?.insertId,
			}
		}
	}

	save = async (id: number, body: any /* interface */) => {
		const sql = `UPDATE wee_tests SET name = ?, is_active = ?, show_scores = ?, modified_by = ?, modified_on = NOW() WHERE id = ?`;
		const data = await this.db.query(sql, [...body, id]);

		if (data) {
			return true;
		}
	}

	list = async () => {
		const sql = `SELECT
			t.id,
			t.name,
			GROUP_CONCAT(DISTINCT g.name SEPARATOR ", ") AS 'group_name',
			t.show_scores,
			t.is_active,
			COUNT(gu.user_id) AS participants,
			COUNT(DISTINCT a.user_id) AS completed_users,
			COUNT(DISTINCT q.id) AS questions
			t.created_on
		FROM wee_tests t
		LEFT JOIN wee_tests_events e ON e.test_id = t.id
		LEFT JOIN wee_events_groups eg ON eg.event_id = e.id
		LEFT JOIN wee_groups g ON g.id = eg.group_id
		LEFT JOIN wee_groups_users gu ON gu.group_id = g.id
		LEFT JOIN wee_tests_assessments a ON a.event_id = e.id
		LEFT JOIN wee_tests_questions q ON q.test_id = t.id
		GROUP BY t.id`;

		const data = await this.db.query(sql);

		if (data) {
			return data.map((row: TestInterface) => ({
				id: row.id,
				name: row.name,
				groupName: row.group_name,
				participants: row.participants,
				completedUsers: row.completed_users,
				questions: row.questions,
				showScores: row.show_scores,
				isActive: row.is_active,
				createdOn: formatISO(new Date(row.created_on))
			}));
		}
	}

	single = async (id: number) => {
		const sql = `SELECT
			t.id,
			t.name,
			t.is_active,
			t.show_scores,
			t.created_on,
			t.modified_on,
			c.first_name AS created_by_first_name,
			c.last_name AS created_by_last_name,
			m.first_name AS modified_by_first_name,
			m.last_name AS modified_by_last_name
		FROM wee_tests t
		LEFT JOIN wee_users c ON c.id = t.created_by
		LEFT JOIN wee_users m ON m.id = t.modified_by
		WHERE t.id = ?`;

		const data = await this.db.query(sql, [id]);

		if (data && data[0]) {
			const row = data[0];
			return {
				id: row.id,
				name: row.name,

				isActive: row.is_active,
				showScores: row.show_scores,
				recordAdministrator: this.prepareUserDateTime(
					row.created_by_first_name,
					row.created_by_last_name,
					row.created_on
				),
				recordModification: this.prepareUserDateTime(
					row.created_by_first_name,
					row.created_by_last_name,
					row.created_on
				),
			}
		}
	}

	events = async (id: number) => {
		const sql = `SELECT
			e.id,
			e.test_id,
			e.start_date,
			e.end_date,
			e.duration,
			e.is_active
		FROM wee_tests_events e
		WHERE e.test_id = ?
		ORDER BY e.start_date, e.end_date`;

		const data = await this.db.query(sql, [id]);

		if (data) {
			return data.map((row: EventInterface) => ({
				id: row.id,
				testId: row.test_id,
				startDate: formatISO(new Date(row.start_date)),
				endDate: formatISO(new Date(row.end_date)),
				duration: row.duration,
				isActive: row.is_active
			}));
		}
	}

	addEvent = async () => {
		return setTimeout(() => true, 100);
	}

	deleteEvent = async () => {
		return setTimeout(() => true, 100);
	}

	questions = async (id: number) => {
		const sql = `SELECT
			tq.id,
			tq.test_id,
			tq.answer_type_id,
			tq.content
		FROM wee_tests_questions tq
		WHERE tq.test_id = ?
		ORDER BY tq.id`;

		const data = await this.db.query(sql, [id]);

		if (data) {
			return Promise.all(data.map(async (row: QuestionInterface) => ({
				id: row.id,
				testId: row.test_id,
				answerTypeId: row.answer_type_id,
				content: row.content,
				answers: await question.answers(row.id) ?? []
			})));
		}
	}


}

export default new Test();