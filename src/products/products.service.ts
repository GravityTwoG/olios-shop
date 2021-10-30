import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductCategoriesService } from '../product-categories/product-categories.service';

import { ProductsRepository } from './products.repository';
import { ProductImagesRepository } from './product-images.repository';
import { Product } from './entities/product.entity';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly productImagesRepository: ProductImagesRepository,
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const { name, oldPrice, realPrice, description, categoryId } =
      createProductInput;

    const category = await this.productCategoriesService.findOne(categoryId);

    const product = this.productsRepository.create({
      name,
      oldPrice,
      realPrice,
      description,
      category,
      thumbUrl: '',
    });

    await this.productsRepository.save(product);
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      loadRelationIds: true,
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne(
      { id },
      { loadRelationIds: true },
    );

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
