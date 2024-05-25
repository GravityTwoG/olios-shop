import { z } from 'zod';

export const OrderItemSchema = z.object({
  id: z.string(),
  productId: z.number(),
  name: z.string(),
  price: z.number().int().gte(0),
  quantity: z.number().int().gte(0),
  sum: z.number().int().gte(0),
  thumbUrl: z.string(),
});

export enum OrderStatus {
  CREATED = 'CREATED',
  CANCELED = 'CANCELED',
  PAID = 'PAID',
  DELIVERED = 'DELIVERED',
}

export type IOrderItem = z.infer<typeof OrderItemSchema>;

export const OrderSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(OrderStatus),
  country: z.string(),
  city: z.string(),
  street: z.string(),
  house: z.string(),
  flat: z.string(),
  floor: z.number().int(),

  name: z.string(),
  phoneNumber: z.string(),

  items: z.array(OrderItemSchema),
  total: z.number().int().gte(0),
});

export type IOrder = z.infer<typeof OrderSchema>;
