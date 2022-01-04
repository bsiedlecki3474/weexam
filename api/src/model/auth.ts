import Model from './model'
import { url } from '../config'
// import { CRUD } from 'interface/crud';

class Auth extends Model {
	setUserToken = async (body: any /* interface */) => {
		const sql = `UPDATE wee_users SET token = ? WHERE id = ?`;

		const data = await this.db.query(sql, [body.token, body.id]);

		return data ? true : false;
	}
}

export default new Auth();