import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryInput } from './dto/create-product-category.input';
import { UpdateProductCategoryInput } from './dto/update-product-category.input';
import { ProductCategory } from '@prisma/client';

@Controller()
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Post()
  async createProductCategory(
    @Body()
    createProductCategoryInput: CreateProductCategoryInput,
  ) {
    return this.productCategoriesService.create(createProductCategoryInput);
  }

  @Put()
  async updateCategoryIcon() {}

  @Get()
  productCategories(): Promise<ProductCategory[]> {
    return this.productCategoriesService.findAll();
  }

  @Get('/:id')
  category(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoriesService.findOne(id);
  }

  @Put()
  updateProductCategory(
    updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<ProductCategory> {
    return this.productCategoriesService.update(
      updateProductCategoryInput.id,
      updateProductCategoryInput,
    );
  }

  @Delete('/:id')
  removeProductCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoriesService.remove(id);
  }
}
