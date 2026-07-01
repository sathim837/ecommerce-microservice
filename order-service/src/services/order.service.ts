import {prisma } from "../config/prisma";
import {Prisma} from "../generated/prisma/client";
import { createOrder, findAllOrders, findOrderById, updateOrderStatus, deleteOrder } from "../repositories/order.repository";
import { CreateOrderDto } from "../types/order.types";

export const createOrderService = async (orderData: CreateOrderDto) => {

  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;

    const orderItemsData = orderData.items.map((item) => {

        const price = 10; // Replace this with the actual price retrieval logic
        const subTotal = item.quantity * price;
        totalAmount += subTotal;
      return {
        productId: item.productId,
        productName: "Sample Product", // Replace this with the actual product name retrieval logic
        quantity: item.quantity,
        price: new Prisma.Decimal(price),
        subtotal: new Prisma.Decimal(subTotal),
      };
    });
     return await createOrder(tx, {
        userId: "sampleUserId", // Replace this with the actual user ID retrieval logic
        totalAmount: new Prisma.Decimal(totalAmount),
        items: {
          create: orderItemsData,
        },
      });
  });
}

export const getAllOrder = async () => {
  return await findAllOrders();
}

export const getOrderById = async (orderId: string) => {
  return await findOrderById(orderId);
}   

export const updateOrderStatusService = async (orderId: string, status: any) => {
  return await updateOrderStatus(orderId, status);
}

export const deleteOrderService = async (orderId: string) => {
  return await deleteOrder(orderId);
}
     
