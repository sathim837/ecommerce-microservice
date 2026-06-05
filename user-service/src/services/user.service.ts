import { AppError } from "../middlewares/AppError";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

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

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid email", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401);
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user,
      token,
    };
  }
}
