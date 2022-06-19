import Model from './model'
import { CRUD } from 'interface/crud';
import { formatISO, addMinutes } from 'date-fns'

class Assessment extends Model /*implements CRUD*/ {
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