import Model from './model'
import { CRUD } from 'interface/crud';

class User extends Model /*implements CRUD*/ {
	add = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_users (id, username, password, first_name, last_name, is_active, created_by, created_on) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

		const data = await this.db.query(sql, body);

		if (data) {
			return {
				id: body.id,
			}
		}
	}

	single = async (username: string) => {
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

	list = async () => {
		const sql = `SELECT
			u.id,
			u.first_name,
			u.last_name
		FROM wee_users u`;

		const data = await this.db.query(sql);

		if (data) {
			return data.map((el: { id: any; first_name: any; last_name: any; }) => ({
				id: el.id,
				firstName: el.first_name,
				lastName: el.last_name
			}));
		}
	}
}

export default new User();