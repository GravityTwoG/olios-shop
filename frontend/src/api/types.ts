export type PaginationQueryDTO = {
  take: number;
  skip: number;
};

export type ListOutputDTO<T> = {
  count: number;

  list: T[];
};
