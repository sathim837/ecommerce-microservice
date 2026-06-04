import {Router} from "express";
import {UserController} from "../controllers/user.controller";
import {validate} from "../middlewares/validate.middleware";
import { UserRegisterDto } from "../dtos/user-register";

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

export default router;