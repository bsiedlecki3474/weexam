import Model from './model'
import { CRUD } from 'interface/crud';
import { User as UserInterface } from '../interface/user'
import { format } from 'date-fns'

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
				createdOn: format(new Date(row.created_on), 'yyyy-MM-dd hh:mm')
			}));
		}
	}
}

export default new User();