import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config'

declare global {
  namespace Express {
    interface Request {
      userRole: string;
    }
  }
}

interface JwtPayload {
  role: string
}

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

export default authorization;