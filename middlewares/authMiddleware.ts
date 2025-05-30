import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";
import { JwtPayload } from "../dto/jwt-payload";

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

export default authMiddleware;
