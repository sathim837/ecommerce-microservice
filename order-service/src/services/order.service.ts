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

export const createOrderService = async (orderData: CreateOrderDto) => {
  // Verify user exists
  await getUser(orderData.userId);

  let totalAmount = 0;

  const orderItems = [];

  // Fetch products & validate stock
  for (const item of orderData.items) {
    const product = await getProduct(item.productId);

    if (!product) {
      throw new Error("Product not found");
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

  // Create order in a transaction
  const order = await prisma.$transaction(async (tx) => {
    return createOrder(tx, {
      userId: orderData.userId,
      totalAmount,
      items: {
        create: orderItems,
      },
    });
  });

  await publishOrderCreated({
    eventId: randomUUID(),
    orderId: order.id,
    userId: order.userId,
    totalAmount: Number(order.totalAmount),
    status: order.status,
    items: orderData.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  });

  // Reduce stock after successful order creation
  // for (const item of orderData.items) {
  //   await reduceStock(item.productId, item.quantity);
  // }

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
