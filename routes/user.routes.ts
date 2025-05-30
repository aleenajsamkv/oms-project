import { Router } from "express";
import UserController from "../controller/user.controller";
import UserService from "../services/user.service";
import UserRepository from "../repositories/user.repository";
import dataSource from "../db/data-source";
import User from "../entities/user.entity";

const userRouter = Router();

const userRepository = new UserRepository(dataSource.getRepository(User));
const userService = new UserService(userRepository);

new UserController(userService, userRouter);

export default userRouter;