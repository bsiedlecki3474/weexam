import { Request, Response } from 'express';
import auth from '../model/auth';

class Auth {
	signIn = async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).send();
      }
      const data = {
        username,
        password,
			};

      const response = await auth.signIn(data);

      res.status(200).send(response);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export const {
	signIn
} = new Auth();