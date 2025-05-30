import { JwtPayload } from "../dto/jwt-payload";
import User from "../entities/user.entity";
import HttpException from "../exception/httpException";
import UserRepository from "../repositories/user.repository";
import { JWT_VALIDITY, JWT_SECRET } from "../utils/constants";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException(404, "No such user found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(401, "Invalid password");
    }
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });

    return {
      tokenType: "Bearer",
      accessToken: token,
    };
  }

  async register(user: User) {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new HttpException(400, "User already exists");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    return newUser;
  }
}


