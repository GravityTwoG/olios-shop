import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryInput } from './dto/create-product-category.input';
import { UpdateProductCategoryInput } from './dto/update-product-category.input';
import { ProductCategoryType } from './product-category.type';

@Resolver(() => ProductCategoryType)
export class ProductCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Mutation(() => ProductCategoryType)
  createProductCategory(
    @Args('createProductCategoryInput')
    createProductCategoryInput: CreateProductCategoryInput,
  ) {
    return this.productCategoriesService.create(createProductCategoryInput);
  }

  @Query(() => [ProductCategoryType])
  productCategories(): Promise<ProductCategoryType[]> {
    return this.productCategoriesService.findAll();
  }

  @Query(() => ProductCategoryType, { name: 'productCategory' })
  category(@Args('id', { type: () => Int }) id: number) {
    return this.productCategoriesService.findOne(id);
  }

  @Mutation(() => ProductCategoryType)
  updateProductCategory(
    @Args('updateProductCategoryInput')
    updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<ProductCategoryType> {
    return this.productCategoriesService.update(
      updateProductCategoryInput.id,
      updateProductCategoryInput,
    );
  }

  @Mutation(() => ProductCategoryType)
  removeProductCategory(@Args('id', { type: () => Int }) id: number) {
    return this.productCategoriesService.remove(id);
  }
}
