import { BaseListResponseDTO } from 'src/lib/dto/base-list.dto';
import { BaseResponseDTO } from 'src/lib/dto/base-response.dto';

import { ProductCategoryDTO } from './product-category.dto';

export class ProductCategoryResponseDTO extends BaseResponseDTO(
  ProductCategoryDTO,
) {}

export class ProductCategoryListOutputDTO extends BaseListResponseDTO(
  ProductCategoryDTO,
) {}
