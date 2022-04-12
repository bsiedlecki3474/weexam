import Model from './model'
import { CRUD } from 'interface/crud';
import { AnswerType as AnswerTypeInterface } from '../interface/question'

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
}

export default new Question();