import { Request, Response } from 'express';
import { user } from '../model';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"

import { JWT_SECRET, COOKIE_PATH } from '../config'

class Auth {
  signIn = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).send();
      }

      const userData = await user.userByUsername(username);

      if (userData) {
        const valid = await bcrypt.compare(password, userData.password);
        if (valid) {

          const token = jwt.sign({
            userId: userData.id,
            role: userData.role
          }, JWT_SECRET);

          const response = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role
          }

          return res
            .cookie('jwt', token, {
              path: COOKIE_PATH,
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .send(response);
        } else {
          return res.status(401).send('invalid password');
        }
      } else {
        return res.status(400).send('user not found');
      }
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  signOut = (req: Request, res: Response) => {
    return res
      .clearCookie("jwt", {
        path: COOKIE_PATH,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200).send();
  }
}

export const {
  signIn,
  signOut
} = new Auth();