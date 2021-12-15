import { Request, Response, NextFunction } from 'express';

const isProduction = process.env.NODE_ENV === 'prod';

const errorMiddleware = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {
  const status = error.status || 500;
  const message = (!isProduction && error.message) || 'Internal server error';

  console.warn(error.stack);

  try {
    response
    .status(status)
    .send({
      error: {
        code: status,
        message
      }
    })
  } catch (err) {
    next(err);
  }
}

export default errorMiddleware;