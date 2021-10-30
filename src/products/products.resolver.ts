import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { ProductsService } from './products.service';
import { ProductType } from './product.type';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { mapProductEntityToProductType } from './mapProductEntityToProductType';

@Resolver(() => ProductType)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => ProductType)
  async createProduct(
    @Args('createProductInput', { type: () => CreateProductInput })
    createProductInput,
  ): Promise<ProductType> {
    const product = await this.productsService.create(createProductInput);
    return mapProductEntityToProductType(product);
  }

  @Query(() => [ProductType], { name: 'products' })
  async findAll(): Promise<ProductType[]> {
    const products = await this.productsService.findAll();
    return products.map(mapProductEntityToProductType);
  }

  @Query(() => ProductType, { name: 'product' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ProductType> {
    const product = await this.productsService.findOne(id);
    return mapProductEntityToProductType(product);
  }

  @Mutation(() => ProductType)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => ProductType)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
