import { Request, Response } from 'express';
import { test } from '../model';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config'

class Test {
  add = async (req: Request, res: Response) => {
    try {
      const {
        name,
        isActive,
        showScores
      } = req.body;

      if (!name)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const id = await test.nextTableId('wee_tests');
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        id,
        name,
        isActive ?? 0,
        showScores ?? 0,
        userId // createdBy
      ];

      const response = await test.add(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  save = async (req: Request, res: Response) => {
    try {
      const {
        name,
        isActive,
        showScores
      } = req.body;

      if (!name)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        name,
        isActive,
        showScores,
        userId // modifiedBy
      ];

      const response = await test.save(Number(req.params.id), data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  _delete = async (req: Request, res: Response) => {
    try {
      const testId = Number(req.params.id);
      const token = req.cookies.jwt;
      const { role } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      if (role === 'admin') {
        const startDate = await test.getStartDate(testId);
        if (startDate && new Date(startDate).getTime() <= new Date().getTime()) {
          return res.status(403).send();
        }
      }

      const data = await test.delete(testId);
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

  single = async (req: Request, res: Response) => {
    try {
      const data = await test.single(Number(req.params.id));
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

  events = async (req: Request, res: Response) => {
    try {
      const data = await test.events(Number(req.params.id));
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

  addEvent = () => {
    return true;
  }

  deleteEvent = () => {
    return true;
  }

  questions = async (req: Request, res: Response) => {
    try {
      const data = await test.questions(Number(req.params.id));
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
  save,
  _delete,
  list,
  single,
  events,
  addEvent,
  deleteEvent,
  questions
} = new Test();