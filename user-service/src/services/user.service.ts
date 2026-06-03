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

  createUser = async (userData: { email: string; password: string; name: string }) => {
    console.log(`UserService: Creating user with email: ${userData.email}`);
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await this.userRepository.create({ ...userData, password: hashedPassword });
  };
}