import Model from './model'
import { url } from '../config'
import { CRUD } from 'interface/crud';

class Auth extends Model /*implements CRUD*/ {
	signIn = async (body: any) => {
		const sql = `SELECT
			u.id,
			u.first_name,
			u.last_name
		FROM wee_users u
		WHERE u.username = ? AND u.password = ?`;

		const data = await this.db.query(sql, [body.username, body.password]);

		return {
			data
		}
	}
}

export default new Auth();