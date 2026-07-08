export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
//   price: number;
}

export interface CreateOrderDto {
  userId: string;
  items: CreateOrderItemDto[];
//   totalAmount: number;
//   status: 'pending' | 'completed' | 'cancelled';
}