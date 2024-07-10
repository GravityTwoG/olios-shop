import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  categoryName: z.string(),
  categoryId: z.number().or(z.null()),
  realPrice: z.number(),
  oldPrice: z.number(),
  thumbUrl: z.string(),
  images: z.array(z.string()),
});

export type IProduct = z.infer<typeof ProductSchema>;
