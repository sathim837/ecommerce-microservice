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
      existingCartItem.price.toNumber() * (existingCartItem.quantity + quantity)
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
    subtotal: product.price * quantity
  });
};
