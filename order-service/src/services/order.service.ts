import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import {
  createOrder,
  findAllOrders,
  findOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../repositories/order.repository";
import { CreateOrderDto } from "../types/order.types";
import { getUser } from "../clients/user.client";
import { getProduct, reduceStock } from "../clients/product.client";
import { publishOrderCreated } from "../publishers/order.publisher";
import { randomUUID } from "crypto";
import * as cartRepository from "../repositories/cart.repository";

// export const createOrderService = async (orderData: CreateOrderDto) => {
//   // Verify user exists
//   await getUser(orderData.userId);

//   let totalAmount = 0;

//   type OrderItemData = {
//     productId: string;
//     productName: string;
//     quantity: number;
//     price: number;
//     subtotal: number;
//   };

//   // const orderItems = [];
//   const orderItems: OrderItemData[] = [];

//   // Fetch products & validate stock
//   for (const item of orderData.items) {
//     const product = await getProduct(item.productId);

//     if (!product) {
//       throw new Error("Product not found");
//     }

//     if (product.stock < item.quantity) {
//       throw new Error(`Insufficient stock for ${product.name}`);
//     }

//     const subtotal = product.price * item.quantity;

//     totalAmount += subtotal;

//     orderItems.push({
//       productId: product._id,
//       productName: product.name,
//       quantity: item.quantity,
//       price: product.price,
//       subtotal,
//     });
//   }

//   // Create order in a transaction
//   const order = await prisma.$transaction(async (tx) => {
//     return createOrder(tx, {
//       userId: orderData.userId,
//       totalAmount,
//       items: {
//         create: orderItems,
//       },
//     });
//   });

//   await publishOrderCreated({
//     eventId: randomUUID(),
//     orderId: order.id,
//     userId: order.userId,
//     totalAmount: Number(order.totalAmount),
//     status: order.status,
//     items: orderData.items.map((item) => ({
//       productId: item.productId,
//       quantity: item.quantity,
//     })),
//   });

//   // Reduce stock after successful order creation
//   // for (const item of orderData.items) {
//   //   await reduceStock(item.productId, item.quantity);
//   // }

//   return order;
// };

export const createOrderService = async (userId: string) => {
  // Fetch Cart
  const cart = await cartRepository.findCartByUser(userId);

  if (!cart) {
    throw new Error("Cart not found.");
  }

  if (cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  let totalAmount = 0;

  type OrderItemData = {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  };

  const orderItems: OrderItemData[] = [];

  // Validate products and calculate total
  for (const item of cart.items) {
    const product = await getProduct(item.productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }

    const subtotal = product.price * item.quantity;

    totalAmount += subtotal;

    orderItems.push({
      productId: product._id,
      productName: product.name,
      quantity: item.quantity,
      price: product.price,
      subtotal,
    });
  }

  // Transaction
  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await createOrder(tx, {
      userId,
      totalAmount,
      items: {
        create: orderItems,
      },
    });

    // Clear cart inside transaction
    await cartRepository.clearCartTx(tx, cart.id);

    return createdOrder;
  });

  // Reduce stock
  for (const item of cart.items) {
    await reduceStock(item.productId, item.quantity);
  }

  // Publish Event
  await publishOrderCreated({
    eventId: randomUUID(),
    orderId: order.id,
    userId: order.userId,
    totalAmount: Number(order.totalAmount),
    status: order.status,
    items: cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  });

  return order;
};

export const getAllOrder = async () => {
  return await findAllOrders();
};

export const getOrderById = async (orderId: string) => {
  return await findOrderById(orderId);
};

export const updateOrderStatusService = async (
  orderId: string,
  status: any,
) => {
  return await updateOrderStatus(orderId, status);
};

export const deleteOrderService = async (orderId: string) => {
  return await deleteOrder(orderId);
};
