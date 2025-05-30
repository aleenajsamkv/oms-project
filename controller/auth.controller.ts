import User from "../entities/user.entity";
import HttpException from "../exception/httpException";
import {AuthService} from "../services/auth.service";
import { Router, Request, Response, NextFunction } from "express";

class AuthController {
  constructor(private authService: AuthService, private authRouter: Router) {
    authRouter.post("/login", this.login);
    authRouter.post("/register", this.register);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new HttpException(400, "Email and password are required");
      }
      const data = await this.authService.login(
        email,
        password
      );
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {name, email, password} = req.body;
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = password;
      const data = await this.authService.register(user);
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;


