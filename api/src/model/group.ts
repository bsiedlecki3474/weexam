import Model from './model'
import { CRUD } from 'interface/crud';
import { Group as GroupInterface } from '../interface/group'
import { SimpleUser as UserInterface } from '../interface/user'
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

	save = async (id: number, body: any /* interface */) => {
		const sql = `UPDATE wee_groups SET name = ?, is_active = ?, modified_by = ?, modified_on = NOW() WHERE id = ?`;
		const data = await this.db.query(sql, [...body, id]);

		if (data) {
			return true;
		}
	}

	addUserToGroup = async (body: any /* interface */) => {
		const sql = `INSERT INTO wee_groups_users (user_id, group_id) VALUES (?, ?)`;
		const data = await this.db.query(sql, body);

		if (data) {
			return true;
		}
	}

	removeUserFromGroup = async (body: any /* interface */) => {
		const sql = `DELETE FROM wee_groups_users WHERE user_id = ? AND group_id = ?`;
		const data = await this.db.query(sql, body);

		if (data) {
			return true;
		}
	}

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
				createdOn: format(new Date(row.created_on), 'yyyy-MM-dd HH:mm')
			}));
		}
	}

	single = async (id: number) => {
		const sql = `SELECT
			g.id,
			g.name,
			g.is_active,
			g.created_on,
			g.modified_on,
			c.first_name AS created_by_first_name,
			c.last_name AS created_by_last_name,
			m.first_name AS modified_by_first_name,
			m.last_name AS modified_by_last_name
		FROM wee_groups g
		LEFT JOIN wee_users c ON c.id = g.created_by
		LEFT JOIN wee_users m ON m.id = g.modified_by
		WHERE g.id = ?`;

		const data = await this.db.query(sql, [id]);

		if (data && data[0]) {
			const group = data[0];
			return {
				id: group.id,
				name: group.name,
				isActive: group.is_active,
				recordAdministrator: this.prepareUserDateTime(
					group.created_by_first_name,
					group.created_by_last_name,
					group.created_on
				),
				recordModification: this.prepareUserDateTime(
					group.created_by_first_name,
					group.created_by_last_name,
					group.created_on
				),
			}
		}
	}

	users = async (id: number) => {
		const sql = `SELECT
			u.id,
			u.first_name,
			u.last_name
		FROM wee_users u
		LEFT JOIN wee_groups_users gu ON gu.user_id = u.id
		WHERE u.is_active = 1 AND gu.group_id = ?
		ORDER BY u.first_name, u.last_name`;

		const data = await this.db.query(sql, [id]);

		if (data) {
			return data.map((row: UserInterface) => ({
				id: row.id,
				firstName: row.first_name,
				lastName: row.last_name
			}));
		}
	}
}

export default new Group();