import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  description: string;

  @IsNumber()
  @Field({
    defaultValue: -1,
  })
  oldPrice?: number;

  @IsNumber()
  @Field()
  realPrice: number;

  @IsNumber()
  @Field()
  categoryId: number;
}
