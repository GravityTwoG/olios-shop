import { Injectable } from '@nestjs/common';
import { Prisma, ProductCategory } from '@prisma/client';

import { PrismaService } from 'src/lib/prisma/prisma.service';
import { ImagesService } from 'src/lib/images';

import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from './dto/update-product-category.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}

  async create(
    createProductCategoryInput: CreateProductCategoryDTO,
    icon: Express.Multer.File,
  ): Promise<ProductCategory> {
    const { name, parentId } = createProductCategoryInput;

    const result = await this.imagesService.upload(icon, 'product-categories');
    const category = await this.prisma.productCategory.create({
      data: {
        name,
        iconUrl: `${result.path}`,
        iconObjectName: result.objectName,
        parentId,
      },
    });

    return category;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductCategoryWhereUniqueInput;
    where?: Prisma.ProductCategoryWhereInput;
    orderBy?: Prisma.Enumerable<Prisma.ProductCategoryOrderByWithRelationAndSearchRelevanceInput>;
  }) {
    const categories = await this.prisma.productCategory.findMany(params);
    const count = await this.prisma.productCategory.count({
      where: params.where,
    });

    return { count, list: categories };
  }

  async findOne(id: number) {
    const category = await this.prisma.productCategory.findUniqueOrThrow({
      where: { id },
      include: {
        children: true,
      },
    });

    return category;
  }

  async update(
    id: number,
    updateProductCategoryInput: UpdateProductCategoryDTO,
    icon?: Express.Multer.File,
  ) {
    const { name } = updateProductCategoryInput;

    if (icon) {
      const result = await this.imagesService.upload(
        icon,
        'product-categories',
      );
      return this.prisma.productCategory.update({
        where: { id },
        data: { name, iconUrl: result.path, iconObjectName: result.objectName },
      });
    }

    return this.prisma.productCategory.update({
      where: { id },
      data: { name },
    });
  }

  async remove(id: number) {
    await this.prisma.productCategory.delete({ where: { id } });
  }
}
