import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

import { CreateProductCategoryDTO } from './create-product-category.dto';
import { NotEqualsToField } from 'src/common/validators/NotEqualsToField';

export class UpdateProductCategoryDTO extends CreateProductCategoryDTO {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  @NotEqualsToField('parentId')
  id: number;
}
