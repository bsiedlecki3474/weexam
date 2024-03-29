import { Request, Response } from 'express';
import { user } from '../model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcryptjs"

import { JWT_SECRET } from '../config'
import { arrayIntersect } from '../helpers';

class User {
  add = async (req: Request, res: Response) => {
    try {
      const {
        username,
        password,
        firstName,
        lastName,
        role,
        isActive
      } = req.body;

      if (!username || !password || !firstName || !lastName || !role)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const hash = await bcrypt.hash(password, 10);
      const id = await user.nextTableId('wee_users');
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        id,
        username,
        hash,
        firstName,
        lastName,
        role,
        isActive ?? 0,
        userId // createdBy
      ];

      const response = await user.add(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  save = async (req: Request, res: Response) => {
    try {
      const {
        username,
        firstName,
        lastName,
        role,
        isActive
      } = req.body;

      if (!username || !firstName || !lastName || !role)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        firstName,
        lastName,
        role,
        isActive,
        userId // modifiedBy
      ];

      const response = await user.save(Number(req.params.id), data);

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

  single = async (req: Request, res: Response) => {
    try {
      const data = await user.single(Number(req.params.id));
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

  _delete = async (req: Request, res: Response) => {
    try {
      const data = await user.delete(Number(req.params.id));
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

  testEvents = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const data = await user.testEvents(userId);

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send(req);
      }
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  assessmentReport = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const eventId = req.params.eventId;

      if (!eventId)
        return res.status(400).send();

      const data = await user.assessmentReport(Number(eventId), Number(userId));

      if (data) {
        res.status(200).send(data);
      } else {
        res.status(400).send(req);
      }
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }
}

export const {
  add,
  save,
  list,
  single,
  _delete,
  testEvents,
  assessmentReport
} = new User();