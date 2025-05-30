import express from "express";
import AuthController from "../controller/auth.controller";
import dataSource from "../db/data-source";
import User from "../entities/user.entity";
import UserRepository from "../repositories/user.repository";
import { AuthService } from "../services/auth.service";

const authRouter = express.Router();

const userRepository = new UserRepository(
  dataSource.getRepository(User)
);

export const authService = new AuthService(userRepository);

new AuthController(authService, authRouter);

export default authRouter;
