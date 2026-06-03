import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { UserRegisterDto } from "../dtos/user-register";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

     getAllUsers = async (
        req: Request,
        res: Response
    ) => {
        try {
            console.log('Fetching users...');
            const users = await this.userService.getAllUsers();
            console.log({users});
            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: users
            });
        } catch (error) {
            console.log("Error fetching users:", error);
            res.status(500).json({ error: "Failed to retrieve users" });
        }
    }

    registerUser = async (
        req: Request,
        res: Response
    ) => {
        try {
            const { email, password, name } = UserRegisterDto.parse(req.body);
            console.log(`Registering user with email: ${email}`);
            const user = await this.userService.createUser({ email, password, name });
            console.log({ user });
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: user
            });
        } catch (error) {
            console.log("Error creating user:", error);
            res.status(400).json({ error: "Failed to create user" });
        }
    }
}