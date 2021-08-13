import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsRepository } from './products.repository';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const { name, oldPrice, realPrice, description, categoryId } =
      createProductInput;

    const category = await this.productCategoriesService.findOne(categoryId);

    const product = this.productRepository.create({
      name,
      oldPrice,
      realPrice,
      description,
      category,
      thumbUrl: '',
    });

    await this.productRepository.save(product);
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      loadRelationIds: true,
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(
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
