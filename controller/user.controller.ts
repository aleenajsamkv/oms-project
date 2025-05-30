import { Request, Response, NextFunction, Router } from "express";
import UserService from "../services/user.service";

class UserController {
  constructor(private userService: UserService, private userRouter: Router) {
    userRouter.get("/", this.getAllUsers.bind(this));
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;