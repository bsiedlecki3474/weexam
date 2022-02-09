import Model from './model'
import { CRUD } from 'interface/crud';
import { Group as GroupInterface } from '../interface/group'
import { format } from 'date-fns'

class Group extends Model /*implements CRUD*/ {
	add = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_groups (id, name, is_active, created_by, created_on) VALUES (?, ?, ?, ?, NOW())`;
		const data = await this.db.query(sql, body);

		if (data) {
			return {
				id: data?.insertId,
			}
		}
	}

	// userByUsername = async (username: string) => {
	// 	const sql = `SELECT
	// 		u.id,
	// 		u.password,
	// 		u.first_name,
	// 		u.last_name,
	// 		u.role
	// 	FROM wee_users u
	// 	WHERE u.username = ?`;

	// 	const data = await this.db.query(sql, [username]);

	// 	if (data && data[0]) {
	// 		const user = data[0];
	// 		return {
	// 			id: user.id,
	// 			password: user.password,
	// 			firstName: user.first_name,
	// 			lastName: user.last_name,
	// 			role: user.role
	// 		}
	// 	}
	// }

	// userById = async (id: number) => {
	// 	const sql = `SELECT
	// 		u.id,
	// 		u.password,
	// 		u.first_name,
	// 		u.last_name,
	// 		u.role
	// 	FROM wee_users u
	// 	WHERE u.id = ?`;

	// 	const data = await this.db.query(sql, [id]);

	// 	if (data && data[0]) {
	// 		const user = data[0];
	// 		return {
	// 			id: user.id,
	// 			firstName: user.first_name,
	// 			lastName: user.last_name,
	// 			role: user.role
	// 		}
	// 	}
	// }

	list = async () => {
		const sql = `SELECT
			g.id,
			g.name,
			g.is_active,
			g.created_on,
			COUNT(gu.user_id) AS members
		FROM wee_groups g
		LEFT JOIN wee_groups_users gu ON gu.group_id = g.id
		GROUP BY g.id`;

		const data = await this.db.query(sql);

		if (data) {
			return data.map((row: GroupInterface) => ({
				id: row.id,
				name: row.name,
				members: row.members,
				isActive: row.is_active,
				createdOn: format(new Date(row.created_on), 'yyyy-MM-dd hh:mm')
			}));
		}
	}
}

export default new Group();