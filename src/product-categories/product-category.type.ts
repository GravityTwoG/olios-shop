import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('ProductCategory')
export class ProductCategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  iconUrl: string;
}
