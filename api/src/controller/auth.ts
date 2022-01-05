import { Request, Response } from 'express';
import user from '../model/user';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"

import { JWT_SECRET } from '../config'

class Auth {
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
          const token = jwt.sign({ id: userData.id, username, password, role: 'root' }, JWT_SECRET);
          const isTokenSet = true;

          if (isTokenSet) {
            const response = {
              token,
              firstName: userData.firstName,
              lastName: userData.lastName
            }
            return res
              .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .status(200)
              .send(response);
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

  signOut = (req: Request, res: Response) => {
    return res
      .clearCookie("token")
      .status(200);
  }
}

export const {
  signIn,
  signOut
} = new Auth();