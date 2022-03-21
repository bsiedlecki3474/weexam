import { Request, Response } from 'express';
import { event } from '../model';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config'

class Event {
  add = async (req: Request, res: Response) => {
    try {
      const {
        testId,
        startDate,
        endDate,
        duration,
        isActive
      } = req.body;

      if (!testId || !startDate || !endDate || !duration)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const id = await event.nextTableId('wee_tests_events');
      // const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        id,
        testId,
        startDate,
        endDate,
        duration,
        isActive ?? 0,
        // userId // createdBy
      ];

      const response = await event.add(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  save = async (req: Request, res: Response) => {
    try {
      const {
        startDate,
        endDate,
        duration,
        isActive
      } = req.body;

      if (!startDate || !endDate || !duration)
        return res.status(400).send();

      const token = req.cookies.jwt;
      // const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        startDate,
        endDate,
        duration,
        isActive,
        // userId // modifiedBy
      ];

      const response = await event.save(Number(req.params.id), data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  _delete = async (req: Request, res: Response) => {
    try {
      const response = await event.delete(Number(req.params.id));
      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }
}

export const {
  add,
  save,
  _delete
} = new Event();