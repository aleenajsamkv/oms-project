import { Repository } from "typeorm";
import User from "../entities/user.entity";

class UserRepository {
  constructor(private repository: Repository<User>) {}

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
}

export default UserRepository;
