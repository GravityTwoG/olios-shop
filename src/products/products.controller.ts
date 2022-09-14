import {
  Controller,
  Put,
  Post,
  Body,
  Get,
  Delete,
  ParseIntPipe,
  Param,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { mapProductEntityToProductType as mapProductEntityToProduct } from './mapProductEntityToProduct';
import { Product } from '@prisma/client';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Body()
    createProductInput: CreateProductInput,
  ): Promise<Product> {
    const product = await this.productsService.create(createProductInput);
    return mapProductEntityToProduct(product);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    const products = await this.productsService.findAll();
    return products.map(mapProductEntityToProduct);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    const product = await this.productsService.findOne(id);
    return mapProductEntityToProduct(product);
  }

  @Put()
  updateProduct(@Body() updateProductInput: UpdateProductInput) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Delete('/:id')
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
