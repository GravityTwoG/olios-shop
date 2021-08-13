import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateProductCategoryInput {
  @IsString()
  @Field()
  name: string;
}
