import UserRepository from "../repositories/user.repository";

class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.findAll();
  }
}

export default UserService;