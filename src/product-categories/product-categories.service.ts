import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FileStorage } from '../common/FileStorage';

import { ProductCategory } from '@prisma/client';

import { CreateProductCategoryInput } from './dto/create-product-category.input';
import { UpdateProductCategoryInput } from './dto/update-product-category.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<ProductCategory> {
    const { name } = createProductCategoryInput;
    const category = await this.prisma.productCategory.create({
      data: { name, iconUrl: '' },
    });

    if ('iconFile' in createProductCategoryInput) {
      const { filename, createReadStream } =
        await createProductCategoryInput.iconFile;

      const stream = createReadStream();
      const iconName = `${randomUUID()}_${filename}`;
      await FileStorage.save(stream, iconName);
      category.iconUrl = iconName;
    }

    return category;
  }

  findAll() {
    return this.prisma.productCategory.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.productCategory.findUnique({
      where: { id },
    });

    return category;
  }

  async update(
    id: number,
    updateProductCategoryInput: UpdateProductCategoryInput,
  ) {
    const { name } = updateProductCategoryInput;

    const category = await this.prisma.productCategory.update({
      where: { id },
      data: { name },
    });

    return category;
  }

  remove(id: number) {
    return `This action removes a #${id} productCategory`;
  }
}
