import { Injectable } from '@nestjs/common';

import { Product } from '@prisma/client';
import { ProductCategoriesService } from '../product-categories/product-categories.service';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const { name, oldPrice, realPrice, description, categoryId } =
      createProductInput;

    const category = await this.productCategoriesService.findOne(categoryId);

    const product = this.prisma.product.create({
      data: {
        name,
        oldPrice,
        realPrice,
        description,
        categoryId: category.id,
        thumbUrl: '',
      },
    });

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({});
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id },
    });

    return product;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
