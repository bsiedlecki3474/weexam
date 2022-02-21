import { Request, Response } from 'express';
import { test } from '../model';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config'

class Test {
  add = async (req: Request, res: Response) => {
    try {
      const {
        name,
        startDate,
        endDate,
        duration,
        isActive,
        showScores
      } = req.body;

      if (!name || !startDate || !endDate || !duration)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const id = await test.nextTableId('wee_tests');
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        id,
        name,
        startDate,
        endDate,
        duration,
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
        startDate,
        endDate,
        duration,
        isActive,
        showScores
      } = req.body;

      if (!name || !startDate || !endDate || !duration)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        name,
        startDate,
        endDate,
        duration,
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
    return true;
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

  groups = async (req: Request, res: Response) => {
    try {
      const data = await test.groups(Number(req.params.id));
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

  addGroupToTest = async (req: Request, res: Response) => {
    try {
      const {
        groupId,
        testId
      } = req.body;

      if (!groupId || !testId)
        return res.status(400).send();

      const data = [
        groupId,
        testId
      ];

      const response = await test.addGroupToTest(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  removeGroupFromTest = async (req: Request, res: Response) => {
    try {
      const {
        groupId,
        testId
      } = req.body;

      if (!groupId || !testId)
        return res.status(400).send();

      const data = [
        groupId,
        testId
      ];

      const response = await test.removeGroupFromTest(data);

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
  list,
  single,
  groups,
  addGroupToTest,
  removeGroupFromTest
} = new Test();