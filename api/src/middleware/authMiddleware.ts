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

const authorization = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('cookies: ', request.cookies)
  const token = request.cookies?.token;
  if (!token) {
    return response.sendStatus(403);
  }
  try {

    const data = jwt.verify(token, JWT_SECRET) as JwtPayload;
    request.userRole = data.role;
    return next();
  } catch {
    return response.sendStatus(403);
  }
};

export default authorization;