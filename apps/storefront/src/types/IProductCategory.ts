import { z } from 'zod';

export const ProductCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  iconUrl: z.string(),
  parentId: z.number().or(z.null()),
  parentName: z.string(),
  hasChildren: z.boolean(),
});

export type IProductCategory = z.infer<typeof ProductCategorySchema>;
