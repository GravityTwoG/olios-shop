import { z } from 'zod';

export const CartItemSchema = z.object({
  id: z.string(),
  quantity: z.number().int().gte(0),
  productId: z.number(),
  productName: z.string(),
  oldPrice: z.number().int().gte(0),
  realPrice: z.number().int().gte(0),
  thumbUrl: z.string(),
});

export type ICartItem = z.infer<typeof CartItemSchema>;

export const CartSchema = z.object({
  id: z.string(),
  items: z.array(CartItemSchema),
});

export type ICart = z.infer<typeof CartSchema>;
