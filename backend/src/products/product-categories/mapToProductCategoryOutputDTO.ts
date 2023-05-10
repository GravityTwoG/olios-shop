import { ProductCategory } from '@prisma/client';
import { ProductCategoryOutputDTO } from './dto/product-category-output.dto';

export function mapToProductCategoryOutputDTO(
  category: ProductCategory,
): ProductCategoryOutputDTO {
  return {
    id: category.id,
    name: category.name,
    iconUrl: `http://localhost:9000/${category.iconUrl}`,
    parentId: category.parentId,
    children: [],
  };
}
