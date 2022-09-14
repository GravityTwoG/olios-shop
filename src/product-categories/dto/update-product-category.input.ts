import { PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

import { CreateProductCategoryInput } from './create-product-category.input';

export class UpdateProductCategoryInput extends PartialType(
  CreateProductCategoryInput,
) {
  @IsInt()
  id: number;
}
