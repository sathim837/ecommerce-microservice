import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { UserRegisterDto } from "../dtos/user-register";
import { asyncHandler } from "../utils/AsyncHandler";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  });

  registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = UserRegisterDto.parse(req.body);

    const user = await this.userService.createUser({ email, password, name });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  });

  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await this.userService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  });
}
