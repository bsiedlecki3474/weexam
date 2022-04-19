import Model from './model'
import { CRUD } from 'interface/crud';
import {
	AnswerType as AnswerTypeInterface,
	Answer as AnswerInterface
} from '../interface/question'

class Question extends Model /*implements CRUD*/ {
	answerTypes = async () => {
		const sql = `SELECT
			t.id,
			t.name
		FROM wee_questions_answer_types t
		ORDER BY t.id`;

		const data = await this.db.query(sql);

		if (data) {
			return data.map((row: AnswerTypeInterface) => ({
				id: row.id,
				name: row.name
			}));
		}
	}

	answers = async (id: number) => {
		const sql = `SELECT
			qa.id,
			qa.value,
			qa.checked
		FROM wee_questions_answers qa
		WHERE qa.question_id = ?
		ORDER BY qa.id`;

		const data = await this.db.query(sql, [id]);

		if (data) {
			return data.map((row: AnswerInterface) => ({
				id: row.id,
				value: row.value,
				checked: row.checked,
				edit: false
			}));
		}
	}

	saveQuestions = async (testId: number, questions: any[]) => {
		let sql = `DELETE FROM wee_tests_questions WHERE test_id = ?`;
		let data = await this.db.query(sql, [testId]);

		if (data) {
			if (questions?.length) {
				const rows = [];
				const params = [];
				const answerRows = [];
				const answerParams = [];
				for (let q=0; q<questions.length; q++) {
					const question = questions[q];
					const questionId = await this.nextTableId('wee_tests_questions') + q;
					if (question?.content.trim().length && question?.answerTypeId && question?.answers.length) {
						rows.push('(?, ?, ?, ?)');
						params.push(
							questionId,
							testId,
							question.content.trim(),
							question.answerTypeId
						);
					}

					if (question.answers?.length) {
						for (let a=0; a<question.answers.length; a++) {
							const answer = question.answers[a];
							const answerId = await this.nextTableId('wee_questions_answers') + a;
							if (answer?.value.trim().length) {
								answerRows.push('(?, ?, ?, ?)');
								answerParams.push(
									answerId,
									questionId,
									answer.value.trim(),
									answer.checked
								);
							}
						}
					}
				}
				if (rows.length) {
					sql = `INSERT INTO wee_tests_questions (id, test_id, content, answer_type_id) VALUES ${rows.join()}`;
					console.log(sql, params);
					data = await this.db.query(sql, params);
					// console.log(data)

					if (data && answerRows.length) {
						sql = `INSERT INTO wee_questions_answers (id, question_id, value, checked) VALUES ${answerRows.join()}`;
						data = await this.db.query(sql, answerParams);
						console.log(data)
					}
				}

			}
		}

		if (data) {
			return true;
		}
	}
}

export default new Question();