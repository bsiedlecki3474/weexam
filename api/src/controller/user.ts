import { Request, Response } from 'express';
import user from '../model/user';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"

import { JWT_SECRET } from '../config'

class User {
  add = async (req: Request, res: Response) => {
    try {
      const {
        username,
        password,
        firstName,
        lastName
      } = req.body;

      if (!username || !password)
        return res.status(400).send();

      const id = await user.nextTableId('wee_users')
      const hash = await bcrypt.hash(password, 10);

      const data = [
        id,
        username,
        hash,
        firstName,
        lastName,
        1, // is_active
        1 // createdBy
      ];

      const response = await user.add(data);

      res.status(200).send(response);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  signIn = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).send();
      }

      console.log(req.body)

      const userData = await user.single(username);

      if (userData) {
        const valid = await bcrypt.compare(password, userData.password);

        if (valid) {
          // const decoded = jwt.verify(token, JWT_SECRET);
          const token = jwt.sign({ id: userData.id, username, password }, JWT_SECRET);
          const isTokenSet = await user.setUserToken({ token, id: userData.id });

          if (isTokenSet) {
            const response = {
              token,
              firstName: userData.firstName,
              lastName: userData.lastName
            }
            res.status(200).send(response);
          } else {
            res.status(500).send('query error');
          }
        } else {
          res.status(401).send('invalid password');
        }
      } else {
        res.status(400).send('user not found');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  list = async (req: Request, res: Response) => {
    try {
      const data = await user.list();
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send('no data');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export const {
  signIn,
  add,
  list
} = new User();