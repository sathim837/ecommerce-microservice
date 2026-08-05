import { Request, Response, NextFunction } from "express";
import * as cartService from "../services/cart.service";
import { getCurrentUser } from "../clients/user.client";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const token = req.headers.authorization!;
    console.log({token});
    const user = await getCurrentUser(token);

    const { productId, quantity } = req.body;

    // console.log({productId,quantity,user});

    const cartItem = await cartService.addToCart(
      user.id,
      productId,
      quantity
    );

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully.",
      data: cartItem,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};