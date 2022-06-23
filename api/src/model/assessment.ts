import Model from './model'
import { CRUD } from 'interface/crud';
import { Assessment as AssessmentInterface } from '../interface/assessment'
import { formatISO, addMinutes } from 'date-fns'

class Assessment extends Model /*implements CRUD*/ {
	list = async (eventId: number) => {
		const sql = `SELECT
				a.id,
				u.first_name,
				u.last_name,
				a.start_date,
				a.user_finished,
				SUM(qa.checked = 1) AS count_total,
				SUM(ans.answer_id IS NOT NULL) AS count_correct
			FROM wee_questions_answers qa
				LEFT JOIN wee_tests_questions q ON q.id = qa.question_id
				LEFT JOIN wee_tests_events e ON e.test_id = q.test_id
				LEFT JOIN wee_tests_assessments a ON a.event_id = e.id
				LEFT JOIN wee_tests_assessments_answers ans ON qa.question_id = ans.question_id AND ans.answer_id = qa.id AND ans.assessment_id = a.id AND qa.checked = 1
				LEFT JOIN wee_users u ON u.id = a.user_id
			WHERE e.id = ?
			group by a.user_id`;

		const data = await this.db.query(sql, [eventId]);

		if (data) {
			return data.map((row: AssessmentInterface) => ({
				id: row.id,
				firstName: row.first_name,
				lastName: row.last_name,
				startDate: row.start_date,
				userFinished: Number(row.user_finished),
				countTotal: Number(row.count_total),
				countCorrect: Number(row.count_correct)
			}));
		}
	}

	start = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_tests_assessments (id, event_id, user_id, start_date, end_date, user_finished, created_on, created_by) VALUES (?, ?, ?, NOW(), NULL, 0, NOW(), ?)`;
		const data = await this.db.query(sql, body);

		if (data) {
			return {
				id: data?.insertId,
			}
		}
	}

	submit = async (assessmentId: number, userId: number) => {
		const sql = `UPDATE wee_tests_assessments SET user_finished = 1 WHERE id = ? AND user_id = ?`;
		const data = await this.db.query(sql, [assessmentId, userId]);
		console.log(data, assessmentId, userId)

		if (data) {
			return true;
		}
	}

	saveAnswers = async (assessmentId: number, userId: number, answers: any[]) => {
		let sql = `DELETE FROM wee_tests_assessments_answers WHERE assessment_id = ? AND created_by = ?`;
		let data = await this.db.query(sql, [assessmentId, userId]);

		if (data) {
			if (answers) {
				const rows = [];
				const params = [];

				for (const questionId in answers) {
					if (answers.hasOwnProperty(questionId)) {
						const answerIds = answers[questionId];
						if (answerIds?.length) {
							for (const answerId of answerIds) {
								rows.push('(?, ?, ?, ?, NOW())');
								params.push(
									assessmentId,
									Number(questionId),
									answerId,
									userId
								);
							}
						}
					}
				}

				if (rows.length) {
					sql = `INSERT INTO wee_tests_assessments_answers (assessment_id, question_id, answer_id, created_by, created_on) VALUES ${rows.join()}`;
					console.log(sql, params);
					data = await this.db.query(sql, params);
				}
			}

			return true;
		}

		return false;
	}

	getUserQuestionAnswers = async (assessmentId: number, userId: number) => {
		const sql = `SELECT answer_id FROM wee_tests_assessments_answers WHERE assessment_id = ? AND user_id = ?`;
		const data = await this.db.query(sql, [assessmentId, userId]);
		return data ?	data.map((row: { answer_id: number }) => Number(row.answer_id)) : []
	}


}

export default new Assessment();