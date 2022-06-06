import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

export default authMiddleware;