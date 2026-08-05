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

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!;

    const user = await getCurrentUser(token);

    const cart = await cartService.getCart(user.id);

    return res.status(200).json({
      success: true,
      data: cart,
    });

  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!;

    // Verify authenticated user
    await getCurrentUser(token);

    
    const { quantity } = req.body;

    const itemId = req.params.itemId as string;

    const updatedCartItem = await cartService.updateCartItem(
      itemId,
      quantity
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      data: updatedCartItem,
    });
  } catch (error) {
    next(error);
  }
};

interface RemoveCartParams {
  itemId: string;
}

export const removeCartItem = async (
  req: Request<RemoveCartParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!;

    // Verify logged-in user
    await getCurrentUser(token);

    const { itemId } = req.params;

    await cartService.removeCartItem(itemId);

    return res.status(200).json({
      success: true,
      message: "Item removed from cart successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const token = req.headers.authorization!;

    const user = await getCurrentUser(token);

    await cartService.clearCart(user.id);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });

  } catch (error) {
    next(error);
  }
};