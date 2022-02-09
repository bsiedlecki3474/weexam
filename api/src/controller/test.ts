import { Request, Response } from 'express';
import { test } from '../model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcryptjs"

import { JWT_SECRET } from '../config'

class Test {
  // add = async (req: Request, res: Response) => {
  //   try {
  //     const {
  //       name,
  //       startDate,
  //       firstName,
  //       lastName,
  //       role,
  //       isActive
  //     } = req.body;

  //     if (!username || !password)
  //       return res.status(400).send();

  //     const token = req.cookies.jwt;
  //     const hash = await bcrypt.hash(password, 10);
  //     const id = await user.nextTableId('wee_users');
  //     const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

  //     const data = [
  //       id,
  //       username,
  //       hash,
  //       firstName,
  //       lastName,
  //       role,
  //       isActive ?? 0,
  //       userId // createdBy
  //     ];

  //     const response = await user.add(data);

  //     res.status(200).send(response);
  //   } catch (e) {
  //     console.error(e)
  //     res.status(500).send(e);
  //   }
  // }

  list = async (req: Request, res: Response) => {
    try {
      const data = await test.list();
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
  // add,
  list
} = new Test();