import {Router} from "express";
import {UserController} from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/users", userController.getAllUsers);
router.post("/users/register", userController.registerUser);

export default router;