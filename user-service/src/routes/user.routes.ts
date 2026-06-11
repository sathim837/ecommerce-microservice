import {Router} from "express";
import {UserController} from "../controllers/user.controller";
import {validate} from "../middlewares/validate.middleware";
import { UserRegisterDto } from "../dtos/user-register";
import { UserLoginDto } from "../dtos/user-login.dto";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

router.get("/users", userController.getAllUsers);
router.post("/users/register", userController.registerUser);

router.post(
  "/register",
  validate(
    UserRegisterDto
  ),
  userController.registerUser
);

router.post(
  "/login",
  validate(UserLoginDto),
  userController.loginUser
);

// router.get("/profile", authenticate, userController.getProfile);
router.get(
  "/me",
  authenticate,
  userController.getProfile
);

export default router;