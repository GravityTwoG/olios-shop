import { BaseListResponseDTO } from 'src/common/dto/base-list.dto';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';

import { ProductCategoryDTO } from './product-category.dto';

export class ProductCategoryResponseDTO extends BaseResponseDTO(
  ProductCategoryDTO,
) {}

export class ProductCategoryListOutputDTO extends BaseListResponseDTO(
  ProductCategoryDTO,
) {}
