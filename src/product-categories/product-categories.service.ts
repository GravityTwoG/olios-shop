import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductCategoryInput } from './dto/create-product-category.input';
import { UpdateProductCategoryInput } from './dto/update-product-category.input';
import { ProductCategoriesRepository } from './product-categories.repository';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    private readonly productCategoriesRepository: ProductCategoriesRepository,
  ) {}

  async create(
    createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<ProductCategory> {
    const { name } = createProductCategoryInput;

    try {
      const category = await this.productCategoriesRepository.create({
        name,
        iconUrl: '',
      });

      await this.productCategoriesRepository.save(category);
      return category;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`Category "${name}" already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  findAll() {
    return this.productCategoriesRepository.find();
  }

  async findOne(id: number) {
    const category = await this.productCategoriesRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async update(
    id: number,
    updateProductCategoryInput: UpdateProductCategoryInput,
  ) {
    const { name } = updateProductCategoryInput;

    const category = await this.productCategoriesRepository.findOne({ id });
    category.name = name;

    await this.productCategoriesRepository.save(category);
    return category;
  }

  remove(id: number) {
    return `This action removes a #${id} productCategory`;
  }
}
