import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

export const findCartByUser = async (userId: string) => {
  return prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });
};

export const createcart = async (userId: string) => {
  return prisma.cart.create({
    data: {
      userId,
    },
    include: {
      items: true,
    },
  });
};

export const findCartItem = async (cartId: string, productId: string) => {
  return await prisma.cartItem.findFirst({
    where: {
      cartId,
      productId,
    },
  });
};

export const createCartItem = async (data: {
  cartId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
}) => {
  return await prisma.cartItem.create({
    data,
  });
};

export const updateCartItemQuantity = async (
  cartItemId: string,
  quantity: number,
  subtotal: number,
) => {
  return await prisma.cartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      quantity,
      subtotal,
    },
  });
};

export const findCartItemById = async (cartItemId: string) => {
  return await prisma.cartItem.findUnique({
    where: {
      id: cartItemId,
    },
  });
};

export const deleteCartItem = async (cartItemId: string) => {
  return await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
};


export const clearCart = async (cartId: string) => {
  return await prisma.cartItem.deleteMany({
    where: {
      cartId,
    },
  });
};


export const clearCartTx = async (
  tx: Prisma.TransactionClient,
  cartId: string
) => {
  return await tx.cartItem.deleteMany({
    where: {
      cartId,
    },
  });
};