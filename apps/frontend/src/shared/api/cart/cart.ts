import { z } from 'zod';
import {
  ListDTO,
  axiosInstance,
  createListResponseSchema,
  createResponseSchema,
} from '../lib';
import {
  CartItemSchema,
  CartSchema,
  ICart,
  ICartItem,
} from '@/src/types/ICart';
import { AnonymousCart } from './AnonymousCart';

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

// Carts
export const createCart = async (name: string): Promise<ICart> => {
  const response = await axiosInstance.post(`${BASE_ROUTE}/cart/`, { name });

  return CartResponseSchema.parse(response.data).data;
};

export const fetchCarts = async ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}): Promise<ListDTO<ICartFromList>> => {
  if (!isAuthenticated) {
    const cart = await AnonymousCart.getCart();

    return {
      count: 1,
      list: [
        {
          id: cart.id,
          name: cart.name,
          isDefault: cart.isDefault,
        },
      ],
    };
  }

  const response = await axiosInstance.get(`${BASE_ROUTE}/carts/`);

  return CartsListResponseSchema.parse(response.data).data;
};

export const fetchCartById = async ({
  isAuthenticated,
  cartId,
}: {
  isAuthenticated: boolean;
  cartId: string;
}): Promise<ICart> => {
  if (!isAuthenticated) {
    return AnonymousCart.getCart();
  }

  const response = await axiosInstance.get(`${BASE_ROUTE}/cart/${cartId}`);

  return CartResponseSchema.parse(response.data).data;
};

export const selectAsDefault = async (cartId: string): Promise<ICart> => {
  const response = await axiosInstance.patch(
    `${BASE_ROUTE}/cart/${cartId}/default`,
  );

  return CartResponseSchema.parse(response.data).data;
};

export const deleteCart = async (cartId: string): Promise<void> => {
  await axiosInstance.delete(`${BASE_ROUTE}/cart/${cartId}`);
};

// Cart items
export const addToCart = async ({
  isAuthenticated,
  ...data
}: {
  isAuthenticated: boolean;
  productId: number;
  quantity: number;
}): Promise<ICartItem> => {
  if (!isAuthenticated) {
    return AnonymousCart.addToCart(data);
  }

  const response = await axiosInstance.post(`${BASE_ROUTE}/add-to-cart`, data);

  return IsInCartResponseSchema.parse(response.data).data;
};

export const isInCart = async ({
  isAuthenticated,
  productId,
}: {
  isAuthenticated: boolean;
  productId: number;
}): Promise<ICartItem> => {
  if (!isAuthenticated) {
    return AnonymousCart.checkIsInCart(productId);
  }

  const response = await axiosInstance.get(
    `${BASE_ROUTE}/is-in-cart/${productId}`,
  );

  return IsInCartResponseSchema.parse(response.data).data;
};

export const removeFromCart = async ({
  isAuthenticated,
  cartItemId,
}: {
  isAuthenticated: boolean;
  cartItemId: string;
}): Promise<void> => {
  if (!isAuthenticated) {
    await AnonymousCart.removeFromCart(cartItemId);
    return;
  }

  await axiosInstance.delete(`${BASE_ROUTE}/remove-from-cart/${cartItemId}`);
};

export type ItemToConvertDTO = {
  id: string;
  productId: number;
  quantity: number;
};

export const convertToCartFromIds = async (
  items: ItemToConvertDTO[],
): Promise<ICart> => {
  const response = await axiosInstance.post(
    `${BASE_ROUTE}/anonymous-cart/from-ids`,
    { items },
  );

  return CartResponseSchema.parse(response.data).data;
};

export const convertToCartItemFromId = async ({
  id,
  productId,
  quantity,
}: ItemToConvertDTO): Promise<ICartItem> => {
  const response = await axiosInstance.get(
    `${BASE_ROUTE}/anonymous-cart/item/from-id`,
    {
      params: { id, productId, quantity },
    },
  );

  return IsInCartResponseSchema.parse(response.data).data;
};

export const addFromAnonymousCart = async (): Promise<ICart> => {
  const items = AnonymousCart.getItems();

  const response = await axiosInstance.post(`${BASE_ROUTE}/add-to-cart/many`, {
    items,
  });

  AnonymousCart.clearCart();

  return CartResponseSchema.parse(response.data).data;
};
