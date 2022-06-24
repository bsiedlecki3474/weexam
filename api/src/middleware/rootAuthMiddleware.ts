import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config'

const rootAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    const { role } = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!['root', 'admin'].includes(role))
      return res.sendStatus(403);

    return next();
  } catch {
    return res.sendStatus(403);
  }
};

export default rootAuthMiddleware;