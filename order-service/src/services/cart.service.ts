import * as cartRepository from "../repositories/cart.repository";
import { getProduct } from "../clients/product.client";

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await getProduct(productId);

  let cart = await cartRepository.findCartByUser(userId);

  if (!cart) {
    cart = await cartRepository.createcart(userId);
  }

  const existingCartItem = await cartRepository.findCartItem(
    cart.id,
    productId,
  );

  if (existingCartItem) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }
    if (product.stock < quantity) {
      throw new Error("Insufficient stock.");
    }
    return await cartRepository.updateCartItemQuantity(
      existingCartItem.id,
      existingCartItem.quantity + quantity,
      existingCartItem.price.toNumber() *
        (existingCartItem.quantity + quantity),
    );
  }

  return await cartRepository.createCartItem({
    // cart: {
    //   connect: {
    //     id: cart.id,
    //   },
    // },
    cartId: cart?.id,
    productId: product._id,
    productName: product.name,
    price: product.price,
    quantity,
    subtotal: product.price * quantity,
  });
};

export const getCart = async (userId: string) => {
  const cart = await cartRepository.findCartByUser(userId);

  if (!cart) {
    return {
      items: [],
      totalAmount: 0,
    };
  }

  const items = cart.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    productName: item.productName,
    price: item.price.toNumber(),
    quantity: item.quantity,
    subtotal: item.price.toNumber() * item.quantity,
  }));

  const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    items,
    totalAmount,
  };
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  const cartItem = await cartRepository.findCartItemById(cartItemId);

  if (!cartItem) {
    throw new Error("Cart item not found.");
  }

  if (quantity < 0) {
    throw new Error("Quantity can't be negative.");
  }

   if (quantity === 0) {
    return await cartRepository.deleteCartItem(cartItemId);
  }

  const product = await getProduct(cartItem.productId);

  if (quantity > product.stock) {
    throw new Error("Insufficient stock.");
  }

 

  

  const subtotal = cartItem.price.toNumber() * quantity;

  return await cartRepository.updateCartItemQuantity(
    cartItemId,
    quantity,
    subtotal,
  );
};

export const removeCartItem = async (cartItemId: string) => {
  const cartItem = await cartRepository.findCartItemById(cartItemId);

  if (!cartItem) {
    throw new Error("Cart item not found.");
  }

  return await cartRepository.deleteCartItem(cartItemId);
};


export const clearCart = async (userId: string) => {

  const cart = await cartRepository.findCartByUser(userId);

  if (!cart) {
    throw new Error("Cart not found.");
  }

  await cartRepository.clearCart(cart.id);

  return;
};
