import Model from './model'
import { CRUD } from 'interface/crud';
import { User as UserInterface } from '../interface/user'
import { TestEvent as TestEventInterface } from '../interface/test'
import { AssessmentReport as AssessmentReportInterface } from '../interface/assessment'
import { format, addMinutes } from 'date-fns'

class User extends Model /*implements CRUD*/ {
	add = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_users (id, username, password, first_name, last_name, role, is_active, created_by, created_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
		const data = await this.db.query(sql, body);

		if (data) {
			return {
				id: data?.insertId,
			}
		}
	}

	save = async (id: number, body: any /* interface */) => {
		const sql = `UPDATE wee_users SET first_name = ?, last_name = ?, role = ?, is_active = ?, modified_by = ?, modified_on = NOW() WHERE id = ?`;
		const data = await this.db.query(sql, [...body, id]);

		if (data) {
			return true;
		}
	}

	userByUsername = async (username: string) => {
		const sql = `SELECT
			u.id,
			u.password,
			u.first_name,
			u.last_name,
			u.role
		FROM wee_users u
		WHERE u.username = ?`;

		const data = await this.db.query(sql, [username]);

		if (data && data[0]) {
			const user = data[0];
			return {
				id: user.id,
				password: user.password,
				firstName: user.first_name,
				lastName: user.last_name,
				role: user.role
			}
		}
	}

	userById = async (id: number) => {
		const sql = `SELECT
			u.id,
			u.password,
			u.first_name,
			u.last_name,
			u.role
		FROM wee_users u
		WHERE u.id = ?`;

		const data = await this.db.query(sql, [id]);

		if (data && data[0]) {
			const user = data[0];
			return {
				id: user.id,
				firstName: user.first_name,
				lastName: user.last_name,
				role: user.role
			}
		}
	}

	list = async () => {
		const sql = `SELECT
			u.id,
			u.username,
			u.first_name,
			u.last_name,
			u.role,
			u.is_active,
			u.created_on
		FROM wee_users u`;

		const data = await this.db.query(sql);

		if (data) {
			return data.map((row: UserInterface) => ({
				id: row.id,
				username: row.username,
				firstName: row.first_name,
				lastName: row.last_name,
				role: row.role,
				isActive: row.is_active,
				createdOn: format(new Date(row.created_on), 'yyyy-MM-dd HH:mm')
			}));
		}
	}

	single = async (id: number) => {
		const sql = `SELECT
			u.id,
			u.username,
			u.first_name,
			u.last_name,
			u.role,
			u.is_active,
			u.created_on,
			u.modified_on,
			c.first_name AS created_by_first_name,
			c.last_name AS created_by_last_name,
			m.first_name AS modified_by_first_name,
			m.last_name AS modified_by_last_name
		FROM wee_users u
		LEFT JOIN wee_users c ON c.id = u.created_by
		LEFT JOIN wee_users m ON m.id = u.modified_by
		WHERE u.id = ?`;

		const data = await this.db.query(sql, [id]);

		if (data && data[0]) {
			const row = data[0];
			return {
				id: row.id,
				username: row.username,
				firstName: row.first_name,
				lastName: row.last_name,
				role: row.role,
				isActive: row.is_active,
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

	testEvents = async (id: number) => {
		const sql = `SELECT
				e.id,
				SUM(qa.checked = 1) AS count_total,
				SUM(ans.answer_id IS NOT NULL) AS count_correct,
				t.name,
				a.start_date AS assessment_start_date,
				e.start_date,
				e.end_date,
				e.duration,
				e.is_active,
				adm.first_name,
				adm.last_name
			FROM wee_tests_events e
				LEFT JOIN wee_tests t ON t.id = e.test_id
				LEFT JOIN wee_tests_questions q ON q.test_id = t.id
				LEFT JOIN wee_questions_answers qa ON qa.question_id = q.id
				LEFT JOIN wee_events_groups eg ON eg.event_id = e.id
				LEFT JOIN wee_groups_users gu ON gu.group_id = eg.group_id
				LEFT JOIN wee_tests_assessments a ON a.event_id = e.id AND a.user_id = gu.user_id
				LEFT JOIN wee_tests_assessments_answers ans ON qa.question_id = ans.question_id AND ans.answer_id = qa.id AND ans.assessment_id = a.id AND qa.checked = 1
				LEFT JOIN wee_users adm ON adm.id = t.created_by
			WHERE gu.user_id = ?
			GROUP BY e.id
			ORDER BY e.is_active DESC, e.start_date DESC`;

		const data = await this.db.query(sql, [id]);

		if (data) {
			return data.map((row: TestEventInterface) => {
				const nowTimestamp = new Date().getTime();
				const startDate = new Date(row.assessment_start_date);
				const expectedEndDate = addMinutes(startDate, Number(row.duration));

				return ({
					id: row.id,
					name: row.name,
					assessmentStarted: row.assessment_start_date !== null,
					countTotal: Number(row.count_total),
					countCorrect: Number(row.count_correct),
					startDate: format(new Date(row.start_date), 'yyyy-MM-dd HH:mm'),
					endDate: format(new Date(row.end_date), 'yyyy-MM-dd HH:mm'),
					duration: row.duration,
					administrator: row.first_name + ' ' + row.last_name,
					showScores: Boolean(row.assessment_start_date && expectedEndDate.getTime() < nowTimestamp),
					isActive: row.is_active
				})
			})
		}
	}

	assessmentReport = async (eventId: number, userId: number) => {
		const sql = `SELECT
				q.id,
				q.content,
				GROUP_CONCAT(qa_user.value ORDER BY qa_user.id SEPARATOR ", ") AS user_answer,
				GROUP_CONCAT(qa_correct.value ORDER BY qa.id SEPARATOR ", ") AS correct_answer,
				SUM(qa.checked = 1) AS count_total,
				SUM(ans.answer_id IS NOT NULL) AS count_correct
			FROM wee_questions_answers qa
				LEFT JOIN wee_tests_questions q ON q.id = qa.question_id
				LEFT JOIN wee_tests_events e ON e.test_id = q.test_id
				LEFT JOIN wee_tests_assessments a ON a.event_id = e.id
				LEFT JOIN wee_tests_assessments_answers ans ON qa.question_id = ans.question_id AND ans.answer_id = qa.id AND ans.assessment_id = a.id AND qa.checked = 1
				LEFT JOIN wee_questions_answers qa_user ON qa_user.id = ans.answer_id
				LEFT JOIN wee_questions_answers qa_correct ON qa_correct.id = qa.id AND qa.checked = 1
			WHERE e.id = ? AND a.user_id = ?
			GROUP BY q.id`;

		const data = await this.db.query(sql, [eventId, userId]);

		if (data) {
			return data.map((row: AssessmentReportInterface) => ({
				id: row.id,
				content: row.content,
				userAnswer: row.user_answer,
				correctAnswer: row.correct_answer,
				countTotal: Number(row.count_total),
				countCorrect: Number(row.count_correct)
			}))
		}
	}

}

export default new User();