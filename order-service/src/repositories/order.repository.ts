import { prisma } from "../config/prisma";
import {Prisma} from "../generated/prisma/client";

export const createOrder = async (
  tx: Prisma.TransactionClient,
  orderData: Prisma.OrderCreateInput
) => {
  return await tx.order.create({
    data: orderData,
    include: {
      items: true,
    },
  });
}

export const findAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export const findOrderById = async (orderId: string) => {
  return await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: true,
    },
  });
}


export const updateOrderStatus = async (orderId: string, status: any) => {
  return await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
}


export const deleteOrder = async (orderId: string) => {
  return await prisma.order.delete({
    where: {  
      id: orderId,
    },
  });
}