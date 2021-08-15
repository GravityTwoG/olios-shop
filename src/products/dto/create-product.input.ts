import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

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

  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  thumbFile?: FileUpload;
}
