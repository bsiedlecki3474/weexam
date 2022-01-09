import { Request, Response } from 'express';
import { user } from '../model';
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
      console.error(e)
      res.status(500).send(e);
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
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }
}

export const {
  add,
  list
} = new User();