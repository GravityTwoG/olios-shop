import { InputType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProductCategoryInput {
  @IsString()
  @Field()
  name: string;

  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  iconFile?: FileUpload;
}
