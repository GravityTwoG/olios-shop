import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

import { CreateProductCategoryInput } from './create-product-category.input';

@InputType()
export class UpdateProductCategoryInput extends PartialType(
  CreateProductCategoryInput,
) {
  @IsInt()
  @Field(() => Int)
  id: number;
}
