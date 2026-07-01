import { Request, Response } from 'express';
import * as OrderService from '../services/order.service';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const newOrder = await OrderService.createOrderService(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrder();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }
    const order = await OrderService.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {   
    try {
      const orderId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
      }
      const { status } = req.body;
      const updatedOrder = await OrderService.updateOrderStatusService(orderId, status);
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };    

  export const deleteOrder = async (req: Request, res: Response) => {
    try {
      const orderId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;  
    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }
    const deletedOrder = await OrderService.deleteOrderService(orderId);
    res.status(200).json(deletedOrder);
  }  catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
