import { z } from 'zod';

export type PaginationQueryDTO = {
  take: number;
  skip: number;
};

export type ListDTO<T> = {
  count: number;

  list: T[];
};

export function createResponseSchema<T>(schema: z.ZodType<T>) {
  return z.object({
    data: schema,
  });
}

export function createListResponseSchema<T>(schema: z.ZodType<T>) {
  return createResponseSchema(
    z.object({
      count: z.number(),
      list: z.array(schema),
    }),
  );
}
