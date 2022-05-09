import { Request, Response } from 'express';
import { assessment } from '../model';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config'

class Assessment {
  single = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const eventId = Number(req.params.id);
      const data = await assessment.single(eventId, userId);
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

  start = async (req: Request, res: Response) => {
    try {
      const eventId = Number(req.params.id);

      if (!eventId)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const assessmentId = await assessment.nextTableId('wee_tests_assessments');
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        assessmentId,
        eventId,
        userId,
        userId
      ];

      const response = await assessment.start(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }
}

export const {
  single,
  start
} = new Assessment();