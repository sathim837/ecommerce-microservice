import { Router } from "express";
import * as cartController from "../controllers/cart.controller";

const router = Router();

router.post(
  "/add-to-cart",
  cartController.addToCart
);

router.get("/", cartController.getCart);

router.patch("/:itemId", cartController.updateCartItem);

router.delete("/:itemId", cartController.removeCartItem);

router.delete("/", cartController.clearCart);

export default router;