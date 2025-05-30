import { Request, Response, NextFunction } from "express";
import HttpException from "../exception/httpException";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof HttpException) {
      const status: number = error.status || 500;
      const message: string = error.message || "Something went wrong";

      let response = { message: message };

      res.status(status).send(response);
    } else {
      console.error(error.stack);
      res.status(500).send({ error: error.message });
    }
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
