import { z } from 'zod';

export type PaginationQueryDTO = {
  take: number;
  skip: number;
};

export type ListOutputDTO<T> = {
  count: number;

  list: T[];
};

export function createListOutputSchema<T>(schema: z.ZodType<T>) {
  return z.object({
    count: z.number(),
    list: z.array(schema),
  });
}
