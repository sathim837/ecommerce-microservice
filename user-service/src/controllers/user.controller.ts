import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { UserRegisterDto } from "../dtos/user-register";
import { asyncHandler } from "../utils/AsyncHandler";
import { AuthRequest } from "../types/auth-request";

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

  getProfile = asyncHandler(async (req: Request, res: Response) => {
    
     const userId =
      (req as AuthRequest).user.userId;

    const user = await this.userService.getProfile(userId);

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });
  });  
  
  adminDashboard = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the admin dashboard",
    });
  } );                                                                                      
}
