import Model from './model'
import { url } from '../config'
import { CRUD } from 'interface/crud';

class Auth extends Model /*implements CRUD*/ {
	createUser = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_users (id, username, password, first_name, last_name, created_by, created_on) VALUES (?, ?, ?, ?, ?, ?, NOW())`;

		const data = await this.db.query(sql, body);

		if (data) {
			return {
				id: body.id,
			}
		}
	}

	setUserToken = async (body: any /* interface */) => {
		const sql = `UPDATE wee_users SET token = ? WHERE id = ?`;

		const data = await this.db.query(sql, [body.token, body.id]);

		return data ? true : false;
	}

	getUser = async (username: string) => {
		const sql = `SELECT
			u.id,
			u.password,
			u.first_name,
			u.last_name
		FROM wee_users u
		WHERE u.username = ?`;

		const data = await this.db.query(sql, [username]);

		if (data && data[0]) {
			const user = data[0];
			return {
				id: user.id,
				password: user.password,
				firstName: user.first_name,
				lastName: user.last_name
			}
		}
	}
}

export default new Auth();