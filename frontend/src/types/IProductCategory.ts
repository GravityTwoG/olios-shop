export type IProductCategory = {
  id: number;
  name: string;
  iconUrl: string;
  parentId: number | null;
  children: number[];
};
