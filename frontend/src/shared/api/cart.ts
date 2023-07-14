import { axiosInstance, createResponseSchema } from './lib';
import {
  CartItemSchema,
  CartSchema,
  ICart,
  ICartItem,
} from '@/src/types/ICart';

const BASE_ROUTE = '/cart';

const CartResponseSchema = createResponseSchema(CartSchema);

const IsInCartResponseSchema = createResponseSchema(CartItemSchema);

export const fetchCart = async (): Promise<ICart> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/cart/`);

  return CartResponseSchema.parse(response.data).data;
};

export const isInCart = async (productId: number): Promise<ICartItem> => {
  const response = await axiosInstance.get(
    `${BASE_ROUTE}/is-in-cart/${productId}`,
  );

  return IsInCartResponseSchema.parse(response.data).data;
};

export const addToCart = async (data: {
  productId: number;
  quantity: number;
}): Promise<ICartItem> => {
  const response = await axiosInstance.post(`${BASE_ROUTE}/add-to-cart`, data);

  return IsInCartResponseSchema.parse(response.data).data;
};

export const removeFromCart = async (
  cartItemId: string,
): Promise<ICartItem> => {
  const response = await axiosInstance.delete(
    `${BASE_ROUTE}/remove-from-cart/${cartItemId}`,
  );

  return IsInCartResponseSchema.parse(response.data).data;
};
