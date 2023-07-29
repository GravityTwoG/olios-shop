import { z } from 'zod';
import {
  ListDTO,
  axiosInstance,
  createListResponseSchema,
  createResponseSchema,
} from './lib';
import {
  CartItemSchema,
  CartSchema,
  ICart,
  ICartItem,
} from '@/src/types/ICart';

const BASE_ROUTE = '/cart';

const CartResponseSchema = createResponseSchema(CartSchema);

const CartFromListSchema = z.object({
  id: z.string(),
  name: z.string(),
  isDefault: z.boolean(),
});

export type ICartFromList = z.infer<typeof CartFromListSchema>;

const CartsListResponseSchema = createListResponseSchema(CartFromListSchema);

const IsInCartResponseSchema = createResponseSchema(CartItemSchema);

export const createCart = async (name: string): Promise<ICart> => {
  const response = await axiosInstance.post(`${BASE_ROUTE}/cart/`, { name });

  return CartResponseSchema.parse(response.data).data;
};

export const selectAsDefault = async (cartId: string): Promise<ICart> => {
  const response = await axiosInstance.patch(
    `${BASE_ROUTE}/cart/${cartId}/default`,
  );

  return CartResponseSchema.parse(response.data).data;
};

export const fetchCarts = async (): Promise<ListDTO<ICartFromList>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/carts/`);

  return CartsListResponseSchema.parse(response.data).data;
};

export const fetchCartById = async (cartId: string): Promise<ICart> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/cart/${cartId}`);

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
