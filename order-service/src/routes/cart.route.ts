import { Router } from "express";
import * as cartController from "../controllers/cart.controller";

const router = Router();

router.post(
  "/add-to-cart",
  cartController.addToCart
);

export default router;