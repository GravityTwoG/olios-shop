import { ProductCategory } from '@prisma/client';
import { ProductCategoryDTO } from './dto/product-category.dto';

export function mapToProductCategoryOutputDTO(
  category: ProductCategory,
): ProductCategoryDTO {
  return {
    id: category.id,
    name: category.name,
    iconUrl: `http://localhost:9000/${category.iconUrl}`,
    parentId: category.parentId,
    children: [],
  };
}
