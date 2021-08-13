import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Product')
export class ProductType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  categoryId: number;

  @Field()
  thumbUrl: string;

  @Field(() => [String])
  images: string[];

  @Field()
  oldPrice: number;

  @Field()
  realPrice: number;
}
