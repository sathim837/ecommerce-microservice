import { AppError } from "../middlewares/AppError";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getAllUsers = async () => {
    console.log("UserService: Fetching all users from repository...");
    return await this.userRepository.findAll();
  };

  createUser = async (userData: {
    email: string;
    password: string;
    name: string;
  }) => {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
  };
}
