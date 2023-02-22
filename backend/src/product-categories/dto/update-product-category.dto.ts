import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

import { CreateProductCategoryDTO } from './create-product-category.dto';

export class UpdateProductCategoryDTO extends PartialType(
  CreateProductCategoryDTO,
) {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
