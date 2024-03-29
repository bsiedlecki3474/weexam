import { Request, Response } from 'express';
import { group } from '../model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcryptjs"

import { JWT_SECRET } from '../config'

class Group {
  add = async (req: Request, res: Response) => {
    try {
      const {
        name,
        isActive
      } = req.body;

      if (!name)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const id = await group.nextTableId('wee_groups');
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        id,
        name,
        isActive ?? 0,
        userId // createdBy
      ];

      const response = await group.add(data);

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
        isActive
      } = req.body;

      if (!name)
        return res.status(400).send();

      const token = req.cookies.jwt;
      const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const data = [
        name,
        isActive ?? 0,
        userId // modifiedBy
      ];

      const response = await group.save(Number(req.params.id), data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  _delete = async (req: Request, res: Response) => {
    try {
      const data = await group.delete(Number(req.params.id));
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
      const data = await group.list();
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
      const data = await group.single(Number(req.params.id));
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

  users = async (req: Request, res: Response) => {
    try {
      const data = await group.users(Number(req.params.id));
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

  addUserToGroup = async (req: Request, res: Response) => {
    try {
      const {
        userId,
        groupId
      } = req.body;

      if (!userId || !groupId)
        return res.status(400).send();

      const data = [
        userId,
        groupId
      ];

      const response = await group.addUserToGroup(data);

      res.status(200).send(response);
    } catch (e) {
      console.error(e)
      res.status(500).send(e);
    }
  }

  removeUserFromGroup = async (req: Request, res: Response) => {
    try {
      const {
        userId,
        groupId
      } = req.body;

      if (!userId || !groupId)
        return res.status(400).send();

      const data = [
        userId,
        groupId
      ];

      const response = await group.removeUserFromGroup(data);

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
  _delete,
  list,
  single,
  users,
  addUserToGroup,
  removeUserFromGroup
} = new Group();